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
     * Removes .hidden class (CSS handles flex display) - ensures "Flappy Bird"
     * screen disappears completely when game active.
     */
    show() {
        // Remove hidden class for reliability (!important in CSS overrides any conflicts)
        // Base CSS sets flex for centering overlay
        this.menuElement.classList.remove('hidden');
    }

    /**
     * Hides the main menu using robust .hidden class.
     * Guarantees screen disappears (no persistence) when game active.
     */
    hide() {
        // Add hidden class (with !important in CSS) for override-proof hiding
        this.menuElement.classList.add('hidden');
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
        // Hide main menu first to avoid overlap, then show game over
        this.hide();
        // Remove hidden class (CSS base flex + !important ensure visibility)
        this.gameOverElement.classList.remove('hidden');
    }

    /**
     * Hides the game over UI overlay using robust .hidden class.
     * Ensures screen disappears completely, fixing any persistence issues
     * for both keyboard and button flows.
     */
    hideGameOver() {
        // Add hidden class (!important in CSS) for reliability
        this.gameOverElement.classList.add('hidden');
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