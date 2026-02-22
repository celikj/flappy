# Flappy Bird in Vanilla JavaScript

A simple Flappy Bird clone implemented in vanilla JavaScript using HTML5 Canvas. Features include a main menu, scoring system, and modular code structure.

## Features
- **Main Menu**: Start screen with button to begin the game.
- **Scoring System**: Score increases each time the bird passes a pipe.
- **Gameplay**: Bird flaps on space key or click, avoids pipes.
- **Vanilla JS**: No external libraries; uses ES6 modules, classes for modularity.
- **Larger Game Area**: Upscaled canvas (400x700) positioned near top of screen for improved visibility.
- **Responsive Structure**: Organized like a typical web project.

## Project Structure
```
flappy/
├── index.html          # Main HTML entry point
├── css/
│   └── style.css       # Styles for menu, score, and layout
├── js/
│   ├── game.js         # Main game class, loop, logic, scoring
│   ├── bird.js         # Bird class (movement, drawing, collisions)
│   ├── pipe.js         # Pipe class (obstacles, spawning, passing detection)
│   └── menu.js         # Menu class (main menu, game over handling)
├── assets/             # (Placeholder for future images/sounds)
├── package.json        # NPM scripts for serving
├── README.md           # This file
└── .gitignore          # (If needed for node_modules etc.)
```

## How to Run
1. Ensure Node.js is installed.
2. Run `npm start` to start a local server (uses `npx serve` on port 3000).
3. Open http://localhost:3000 in your browser.
4. Click "Start Game" and use Space key or click to flap the bird.

Alternatively, open `index.html` directly in browser (may have CORS issues with modules; server recommended).

## Controls
- **Start/Restart Game** (from main menu or game over screen): Spacebar, Enter, or Click Button
- **Flap** (during gameplay): Spacebar or Mouse Click / Tap
- Goal: Pass through pipes without colliding to increase score.
- *Note: Game tuned to be beginner-friendly with slower speeds, larger gaps, and forgiving physics.*

## Development Notes
- Code is commented with JSDoc for readability.
- Uses simple shapes (rectangles) for bird/pipes; easy to extend with sprites.
- Game elements (bird, pipes, UI) scaled for larger 400x700 canvas area positioned near top.
- Game loop via `requestAnimationFrame`.
- Collision detection and scoring implemented.
- Extendable: Add sounds, better graphics, high scores, etc.

## License
MIT License - see LICENSE file (if added).

Author: Grok Build Agent