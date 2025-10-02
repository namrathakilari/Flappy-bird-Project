const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  gravity: 0.6,
  lift: -10,
  velocity: 0
};

let pipes = [];
let pipeWidth = 60;
let pipeGap = 140;
let frame = 0;
let score = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "#007acc";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "#00cc00";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
  });
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    endGame();
  }
}

function updatePipes() {
  if (frame % 100 === 0) {
    let top = Math.random() * (canvas.height - pipeGap - 100) + 50;
    pipes.push({ x: canvas.width, top: top });
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    
    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.top + pipeGap)
    ) {
      endGame();
    }

    
    if (pipe.x + pipeWidth === bird.x) {
      score++;
    }
  });

  
  pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}

function endGame() {
  gameOver = true;
  alert("Game Over! Your score: " + score);
  document.location.reload();
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawPipes();
  drawScore();

  updateBird();
  updatePipes();

  frame++;
  requestAnimationFrame(gameLoop);
}

function jump() {
  bird.velocity = bird.lift;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

canvas.addEventListener("click", () => {
  jump();
});

gameLoop();
