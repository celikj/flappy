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
        
        // Difficulty state (standard modes: easy/normal/hard - defaults to normal)
        // Easy impl using data attrs and active class for selection
        this.difficulty = 'normal';

        // Bind event listeners for start and restart (both trigger game start)
        this.startButton.addEventListener('click', this.startGame.bind(this));
        this.restartButton.addEventListener('click', this.restartGame.bind(this));

        // Bind difficulty buttons (query by class/data attr - simple and consistent with standards)
        const diffButtons = this.menuElement.querySelectorAll('.diff-btn');
        diffButtons.forEach(btn => {
            btn.addEventListener('click', () => this.setDifficulty(btn.dataset.difficulty, diffButtons));
        });
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
     * Updates best/high score display in both menu and game over UI.
     * @param {number} bestScore - Current best score from game.
     * @param {boolean} newBest - If true, highlight new best (green flash).
     */
    updateBestScoreDisplay(bestScore = 0, newBest = false) {
        // Update main menu best score
        const bestMenuEl = document.getElementById('best-score-menu');
        if (bestMenuEl) {
            bestMenuEl.textContent = `Best: ${bestScore}`;
            if (newBest) {
                bestMenuEl.style.color = '#00ff00';  // Green flash for new best
                setTimeout(() => { bestMenuEl.style.color = '#ffcc00'; }, 1500);
            } else {
                bestMenuEl.style.color = '#ffcc00';  // Default gold
            }
        }

        // Update game over best score
        const bestGameOverEl = document.getElementById('best-score-gameover');
        if (bestGameOverEl) {
            bestGameOverEl.textContent = `Best: ${bestScore}`;
            if (newBest) {
                bestGameOverEl.style.color = '#00ff00';  // Green flash
                setTimeout(() => { bestGameOverEl.style.color = '#ffcc00'; }, 1500);
            } else {
                bestGameOverEl.style.color = '#ffcc00';  // Default gold
            }
        }
    }

    /**
     * Shows the game over UI overlay.
     * @param {number} score - The final score to display.
     * @param {number} bestScore - Best/high score to display.
     * @param {boolean} newBest - True if new best achieved (for highlight).
     */
    showGameOver(score, bestScore = 0, newBest = false) {
        // Update final score display
        const finalScoreEl = this.gameOverElement.querySelector('#final-score');
        if (finalScoreEl) {
            finalScoreEl.textContent = `Your Score: ${score}`;
        }
        // Update best score display and highlight if new best (green flash)
        this.updateBestScoreDisplay(bestScore, newBest);
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
     * Passes current difficulty to game start for applying settings (standard mode handling).
     */
    startGame() {
        this.hide();
        this.hideGameOver();  // Ensure game over is hidden on start
        if (this.onStart) {
            // Pass difficulty for game to apply settings (easy impl)
            this.onStart(this.difficulty);
        }
    }

    /**
     * Handles restart (reuses startGame logic for simplicity).
     * Triggered by restart button in game over UI.
     * Passes current difficulty to game start.
     */
    restartGame() {
        this.hideGameOver();
        if (this.onStart) {
            // Pass difficulty for game to apply settings (standard mode handling)
            this.onStart(this.difficulty);
        }
    }

    /**
     * Sets the difficulty mode (easy/normal/hard).
     * Updates active button styling and state - simple impl consistent with standard game menus.
     * @param {string} difficulty - 'easy', 'normal', or 'hard'.
     * @param {NodeList} diffButtons - All difficulty buttons for active class toggle.
     */
    setDifficulty(difficulty, diffButtons) {
        this.difficulty = difficulty;
        // Update active class on buttons (standard UX for mode selection)
        diffButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
        });
    }
}