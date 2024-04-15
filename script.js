let dino = document.querySelector('.dino');
let obstacle = document.querySelector('.obstacle');
let scoreElement = document.querySelector('.score');
let gameContainer = document.querySelector('.game-container');

let jumping = false;
let gameIsOver = false;
let score = 0;

function startGame() {
    obstacle.classList.add('moveObstacle');
    updateScore();
}

function jump() {
    if (dino.classList.contains('jump')) {
        return; // Prevent double jumps
    }
    dino.classList.add('jump');
    setTimeout(() => {
        dino.classList.remove('jump');
    }, 500);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Space') {
        if (gameIsOver) return;
        jump();
    }
});

let checkCollision = setInterval(function() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft < 40 && obstacleLeft > 0 && dinoTop < 60) {
        gameOver();
    }
}, 10);

function updateScore() {
    score += 1;
    scoreElement.innerHTML = `Score: ${score}`;
    if (!gameIsOver) {
        setTimeout(updateScore, 100);
    }
}

function gameOver() {
    gameIsOver = true;
    obstacle.classList.remove('moveObstacle');
    alert(`Game Over! Final Score: ${score}`);
    clearInterval(checkCollision);
}

startGame();
