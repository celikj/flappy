// pipe.js - Defines the Pipe class for Flappy Bird game

/**
 * Pipe class represents obstacles (pipes) in the game.
 * Pipes move left, have a gap for bird to pass, and track scoring.
 */
export class Pipe {
    /**
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} canvasWidth - Width of the game canvas.
     * @param {number} canvasHeight - Height of the game canvas.
     * @param {number} x - Initial x position of the pipe.
     * @param {Object} settings - Difficulty settings (easy/normal/hard) for params - standard mode impl.
     */
    constructor(ctx, canvasWidth, canvasHeight, x, settings = { pipeSpeed: 1.45, pipeVerticalGap: 250 }) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // Pipe properties scaled for larger canvas (400x700) + tuned per difficulty mode
        // Width/gap increased proportionally; random height range adapted to new height
        // Maintains difficulty balance while fitting expanded area (easy param override)
        this.width = 72;          // Pipe width (scaled up ~1.4x)
        this.x = x;               // Starting x position (off-screen initially, relative to canvasWidth)
        this.speed = settings.pipeSpeed;  // Movement speed from difficulty (e.g., 1.0 easy, 2.0 hard)
        this.gap = settings.pipeVerticalGap;  // Vertical gap from difficulty (larger for easy)
        this.passed = false;      // Flag for scoring (bird passed this pipe)
        
        // Random height for top pipe, ensuring gap fits AND easier gameplay
        // Adjusted range for more centered/moderate pipe positions (less extreme highs/lows)
        this.topHeight = Math.floor(Math.random() * (canvasHeight / 3 - 50)) + 60;  // Narrower, bird-friendly range
        this.bottomY = this.topHeight + this.gap;
        this.bottomHeight = canvasHeight - this.bottomY;
        
        this.color = '#228B22'; // Green color for pipes
    }

    /**
     * Updates pipe's position by moving left.
     */
    update() {
        this.x -= this.speed;
    }

    /**
     * Draws the top and bottom pipes on the canvas as rectangles.
     * In a real game, use images for pipes.
     */
    draw() {
        // Top pipe
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, 0, this.width, this.topHeight);
        
        // Bottom pipe
        this.ctx.fillRect(this.x, this.bottomY, this.width, this.bottomHeight);
    }

    /**
     * Checks if pipe is off-screen (for removal).
     * @returns {boolean} True if pipe should be removed.
     */
    isOffScreen() {
        return this.x + this.width < 0;
    }

    /**
     * Checks if bird has passed the pipe for scoring.
     * @param {number} birdX - Bird's x position.
     * @returns {boolean} True if bird passed this pipe.
     */
    isPassed(birdX) {
        if (!this.passed && birdX > this.x + this.width) {
            this.passed = true;
            return true;
        }
        return false;
    }

    /**
     * Gets bounding boxes for top and bottom pipes for collision detection.
     * @returns {Array} Array of bounding boxes.
     */
    getBounds() {
        return [
            // Top pipe bounds
            { x: this.x, y: 0, width: this.width, height: this.topHeight },
            // Bottom pipe bounds
            { x: this.x, y: this.bottomY, width: this.width, height: this.bottomHeight }
        ];
    }
}