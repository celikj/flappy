// bird.js - Defines the Bird class for Flappy Bird game

/**
 * Bird class represents the player-controlled bird.
 * Handles position, velocity, gravity, and drawing.
 */
export class Bird {
    /**
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} canvasWidth - Width of the game canvas.
     * @param {number} canvasHeight - Height of the game canvas.
     */
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // Bird properties scaled for larger canvas (400x700 area)
        // Maintains proportions for easier maneuvering; visual/hitbox consistent
        // Gravity/jump tuned for even easier, forgiving gameplay on bigger field
        this.width = 42;  // Bird width (scaled up ~1.4x)
        this.height = 28; // Bird height (scaled up ~1.4x)
        this.x = 70;      // Starting x position (scaled for left offset in wider canvas)
        this.y = canvasHeight / 2; // Starting y position (center, relative to height)
        this.velocity = 0; // Vertical velocity
        this.gravity = 0.2;  // Gravity pulling down (further reduced for slower, easier fall)
        this.jumpStrength = -7; // Upward velocity on jump (gentler for more controlled flaps)
        this.color = '#ffcc00'; // Yellow color for bird
    }

    /**
     * Updates bird's position based on gravity and velocity.
     */
    update() {
        this.velocity += this.gravity; // Apply gravity
        this.y += this.velocity;       // Update position
        
        // Prevent bird from falling below canvas
        if (this.y + this.height > this.canvasHeight) {
            this.y = this.canvasHeight - this.height;
            this.velocity = 0;
        }
        
        // Prevent bird from going above canvas
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    /**
     * Makes the bird jump by setting upward velocity.
     */
    flap() {
        this.velocity = this.jumpStrength;
    }

    /**
     * Draws the bird on the canvas as a simple rectangle (for vanilla JS, no images).
     * In a real game, replace with sprite/image.
     */
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Simple eye for better visibility (adjusted for scaled-up bird size on larger canvas)
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.x + 30, this.y + 4, 8, 8);  // Scaled eye
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.x + 33, this.y + 6, 3, 3);
    }

    /**
     * Resets bird to initial state for new game.
     */
    reset() {
        this.y = this.canvasHeight / 2;
        this.velocity = 0;
    }

    /**
     * Gets bounding box for collision detection.
     * @returns {Object} Bounding box {x, y, width, height}
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}