// game.js - Main game logic for Flappy Bird game
// Uses ES modules to import Bird, Pipe, and Menu classes

import { Bird } from './bird.js';
import { Pipe } from './pipe.js';
import { Menu } from './menu.js';

/**
 * Game class orchestrates the Flappy Bird game.
 * Handles game loop, rendering, input, collisions, scoring, and menu integration.
 */
class Game {
    /**
     * Initializes the game, sets up canvas, entities, and event listeners.
     */
    constructor() {
        // Canvas setup
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        // Game entities
        this.bird = new Bird(this.ctx, this.canvasWidth, this.canvasHeight);
        
        // Pipes array for multiple pipes
        this.pipes = [];
        this.pipeGap = 150; // Horizontal gap between pipes
        this.frameCount = 0; // For spawning pipes

        // Scoring system
        this.score = 0;
        this.scoreDisplay = document.getElementById('score-display');

        // Menu system
        const menuElement = document.getElementById('menu');
        const startButton = document.getElementById('start-button');
        this.menu = new Menu(menuElement, startButton, this.startGame.bind(this));

        // Game state
        this.isRunning = false;
        this.isGameOver = false;

        // Bind event listeners for input (flap)
        this.setupInputListeners();

        // Show main menu initially
        this.menu.show();
        this.gameLoop(); // Start the loop (will render menu state)
    }

    /**
     * Sets up keyboard and mouse/touch input for flapping.
     */
    setupInputListeners() {
        // Space key or click/tap to flap (only during game)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.isRunning && !this.isGameOver) {
                e.preventDefault();
                this.bird.flap();
            }
        });

        this.canvas.addEventListener('click', () => {
            if (this.isRunning && !this.isGameOver) {
                this.bird.flap();
            }
        });
    }

    /**
     * Starts a new game: resets entities, score, and state.
     */
    startGame() {
        this.bird.reset();
        this.pipes = [];
        this.score = 0;
        this.updateScoreDisplay();
        this.isRunning = true;
        this.isGameOver = false;
        this.frameCount = 0;
        this.scoreDisplay.style.display = 'block'; // Show score
        // Spawn first pipe
        this.spawnPipe();
    }

    /**
     * Spawns a new pipe at the right edge.
     */
    spawnPipe() {
        const pipeX = this.canvasWidth;
        this.pipes.push(new Pipe(this.ctx, this.canvasWidth, this.canvasHeight, pipeX));
    }

    /**
     * Updates game state: bird, pipes, collisions, scoring.
     */
    update() {
        if (!this.isRunning || this.isGameOver) return;

        // Update bird
        this.bird.update();

        // Update pipes
        this.pipes.forEach(pipe => pipe.update());

        // Remove off-screen pipes
        this.pipes = this.pipes.filter(pipe => !pipe.isOffScreen());

        // Spawn new pipes periodically
        this.frameCount++;
        if (this.frameCount % this.pipeGap === 0) {
            this.spawnPipe();
        }

        // Check for scoring
        this.pipes.forEach(pipe => {
            if (pipe.isPassed(this.bird.x)) {
                this.score++;
                this.updateScoreDisplay();
            }
        });

        // Check collisions
        if (this.checkCollisions()) {
            this.gameOver();
        }
    }

    /**
     * Checks for collisions between bird and pipes or ground/ceiling.
     * @returns {boolean} True if collision detected.
     */
    checkCollisions() {
        const birdBounds = this.bird.getBounds();

        // Ground/ceiling collision (already handled in bird, but for game over)
        if (this.bird.y + this.bird.height >= this.canvasHeight || this.bird.y <= 0) {
            return true;
        }

        // Pipe collisions
        for (const pipe of this.pipes) {
            for (const pipeBounds of pipe.getBounds()) {
                if (this.rectsIntersect(birdBounds, pipeBounds)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Simple rectangle intersection for collision detection.
     * @param {Object} rect1 - {x, y, width, height}
     * @param {Object} rect2 - {x, y, width, height}
     * @returns {boolean} True if intersecting.
     */
    rectsIntersect(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    /**
     * Updates the score display in the UI.
     */
    updateScoreDisplay() {
        this.scoreDisplay.textContent = `Score: ${this.score}`;
    }

    /**
     * Renders the game: clears canvas, draws bird, pipes, etc.
     */
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw background (simple sky, could add gradient/clouds)
        this.ctx.fillStyle = '#70c5ce';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw pipes if game running
        if (this.isRunning) {
            this.pipes.forEach(pipe => pipe.draw());
        }

        // Draw bird
        this.bird.draw();
    }

    /**
     * Main game loop using requestAnimationFrame for smooth animation.
     */
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    /**
     * Handles game over: stop running, show menu via Menu class.
     */
    gameOver() {
        this.isRunning = false;
        this.isGameOver = true;
        this.scoreDisplay.style.display = 'none'; // Hide score
        this.menu.showGameOver(this.score);
    }
}

// Initialize the game when script loads
new Game();