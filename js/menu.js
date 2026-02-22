// menu.js - Handles main menu functionality for Flappy Bird game

/**
 * Menu class manages the main menu, game over UI, and interactions.
 * Replaces browser alert() with in-game overlays for better UX and practice.
 * Integrates with the game to start/restart games.
 */
export class Menu {
    /**
     * @param {HTMLElement} menuElement - The main menu DOM element.
     * @param {HTMLElement} startButton - The start button DOM element.
     * @param {HTMLElement} gameOverElement - The game over UI DOM element.
     * @param {HTMLElement} restartButton - The restart button DOM element.
     * @param {Function} onStart - Callback function to start/restart the game.
     */
    constructor(menuElement, startButton, gameOverElement, restartButton, onStart) {
        this.menuElement = menuElement;
        this.startButton = startButton;
        this.gameOverElement = gameOverElement;
        this.restartButton = restartButton;
        this.onStart = onStart;
        
        // Bind event listeners for start and restart (both trigger game start)
        this.startButton.addEventListener('click', this.startGame.bind(this));
        this.restartButton.addEventListener('click', this.restartGame.bind(this));
    }

    /**
     * Shows the main menu.
     */
    show() {
        this.menuElement.style.display = 'flex';
    }

    /**
     * Hides the main menu.
     */
    hide() {
        this.menuElement.style.display = 'none';
    }

    /**
     * Shows the game over UI overlay.
     * @param {number} score - The final score to display.
     */
    showGameOver(score) {
        // Update final score display
        const finalScoreEl = this.gameOverElement.querySelector('#final-score');
        if (finalScoreEl) {
            finalScoreEl.textContent = `Your Score: ${score}`;
        }
        // Show as flex for centering (matches CSS)
        this.gameOverElement.style.display = 'flex';
        // Hide main menu and score to avoid overlap
        this.hide();
    }

    /**
     * Hides the game over UI overlay.
     */
    hideGameOver() {
        this.gameOverElement.style.display = 'none';
    }

    /**
     * Handles starting the game when button is clicked.
     */
    startGame() {
        this.hide();
        this.hideGameOver();  // Ensure game over is hidden on start
        if (this.onStart) {
            this.onStart();
        }
    }

    /**
     * Handles restart (reuses startGame logic for simplicity).
     * Triggered by restart button in game over UI.
     */
    restartGame() {
        this.hideGameOver();
        if (this.onStart) {
            this.onStart();
        }
    }
}