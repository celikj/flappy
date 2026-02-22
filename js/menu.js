// menu.js - Handles main menu functionality for Flappy Bird game

/**
 * Menu class manages the main menu display and start button interaction.
 * Integrates with the game to start new games.
 */
export class Menu {
    /**
     * @param {HTMLElement} menuElement - The menu DOM element.
     * @param {HTMLElement} startButton - The start button DOM element.
     * @param {Function} onStart - Callback function to start the game.
     */
    constructor(menuElement, startButton, onStart) {
        this.menuElement = menuElement;
        this.startButton = startButton;
        this.onStart = onStart;
        
        // Bind event listeners
        this.startButton.addEventListener('click', this.startGame.bind(this));
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
     * Handles starting the game when button is clicked.
     */
    startGame() {
        this.hide();
        if (this.onStart) {
            this.onStart();
        }
    }

    /**
     * Shows game over state (can extend for restart).
     * For simplicity, returns to menu on game over.
     */
    showGameOver(score) {
        // Could enhance with game over screen, but for now, alert and show menu
        alert(`Game Over! Your score: ${score}`);
        this.show();
    }
}