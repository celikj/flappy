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
     */
    constructor(ctx, canvasWidth, canvasHeight, x) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // Pipe properties
        this.width = 52;          // Pipe width
        this.x = x;               // Starting x position (off-screen initially)
        this.speed = 1.5;         // Movement speed to the left (reduced for slower, more playable gameplay)
        this.gap = 100;           // Gap between top and bottom pipe
        this.passed = false;      // Flag for scoring (bird passed this pipe)
        
        // Random height for top pipe, ensuring gap fits
        this.topHeight = Math.floor(Math.random() * (canvasHeight / 2 - 50)) + 50;
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