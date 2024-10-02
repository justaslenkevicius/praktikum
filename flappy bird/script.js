const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const startButton = document.getElementById('startButton');
const difficultySelect = document.getElementById('difficultySelect');

// Load images
const birdImage = new Image();
birdImage.src = 'bird.png';

const backgroundImage = new Image();
backgroundImage.src = 'background.jpg'; // Load background image

const pipeImage = new Image();
pipeImage.src = 'pipe.png'; // Load pipe image

let bird;
let pipes = [];
let score = 0;
let gameInterval;
let gravity = 0.6;
let isGameOver = false;
let gap = 150; // Initial gap between pipes
const birdWidth = 40; // Width of the bird
const pipeSpacing = birdWidth * 5; // Space between two sets of pipes
let lastPipeX = -pipeSpacing; // Track the last X position of pipes

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function startGame() {
    bird = { x: 50, y: canvas.height / 2, width: birdWidth, height: 40, velocity: 0 };
    pipes = [];
    score = 0;
    gap = parseInt(difficultySelect.value); // Use the selected difficulty value
    isGameOver = false;
    lastPipeX = -pipeSpacing; // Reset last pipe X
    menu.style.display = 'none';
    game.style.display = 'block';
    document.addEventListener('keydown', handleKeyDown);
    gameInterval = setInterval(update, 1000 / 60);
    generatePipe();
}

function generatePipe() {
    const minPipeHeight = 50; // Minimum height for the top pipe
    const maxPipeHeight = canvas.height - gap - 50; // Max height for the top pipe

    let pipeHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;

    // Generate the X position for the new pipe group
    let pipeX = lastPipeX + pipeSpacing;

    // Create top pipe
    pipes.push({
        x: pipeX,
        height: pipeHeight, // This is the height from the bottom of the canvas
        isBottom: false // Flag for top pipe
    });

    // Create bottom pipe
    pipes.push({
        x: pipeX,
        height: pipeHeight, // This is the same height for the bottom pipe
        isBottom: true // Flag for bottom pipe
    });

    lastPipeX = pipeX; // Update last pipe X
    setTimeout(generatePipe, 2000);
}

function handleKeyDown(event) {
    if (event.code === 'Space' && !isGameOver) {
        bird.velocity = -10;
    }
}

function update() {
    if (isGameOver) return;

    // Gravity
    bird.velocity += gravity;
    bird.y += bird.velocity;

    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Draw background image

    // Draw bird
    ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    // Update pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 3;

        // Draw pipes using the pipe image
        if (!pipes[i].isBottom) {
            // Top pipe
            ctx.save(); // Save the current state
            ctx.translate(pipes[i].x + 25, 0); // Translate to the center of the pipe
            ctx.rotate(Math.PI); // Rotate 180 degrees
            ctx.drawImage(pipeImage, -25, -pipes[i].height, 50, pipes[i].height); // Draw the pipe centered, starting from the top
            ctx.restore(); // Restore the previous state
        } else {
            // Bottom pipe
            ctx.drawImage(pipeImage, pipes[i].x, pipes[i].height + gap, 50, canvas.height - pipes[i].height - gap);
        }

        // Collision detection
        if (bird.x + bird.width > pipes[i].x && bird.x < pipes[i].x + 50) {
            if (bird.y < pipes[i].height || bird.y + bird.height > pipes[i].height + gap) {
                endGame();
            }
        }

        // Scoring
        if (pipes[i].x + 50 < bird.x && !pipes[i].scored) {
            score++;
            pipes[i].scored = true;
        }

        // Remove pipes that are off-screen
        if (pipes[i].x + 50 < 0) {
            pipes.splice(i, 1);
        }
    }

    // Draw score
    scoreElement.textContent = `Score: ${score}`;

    // Check if bird is out of bounds
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    isGameOver = true;
    
    // Display final score in the finalScore div
    const finalScoreElement = document.getElementById('score');
    const ScoreElement = document.getElementById('scoreMenu');

    finalScoreElement.textContent = score;
    ScoreElement.style.display = 'flex'; // Show the score
    
    menu.style.display = 'flex';
    game.style.display = 'none';
    document.removeEventListener('keydown', handleKeyDown);
}


// Resize canvas when the window is resized
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call to set canvas size

startButton.addEventListener('click', startGame);
