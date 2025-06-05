const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const resultText = document.getElementById("result-text");
const gameOverDiv = document.getElementById("game-over");

const playerHearts = document.querySelectorAll(".player .heart");
const computerHearts = document.querySelectorAll(".computer .heart");

let playerLives = 3;
let computerLives = 3;

const choices = ["rock", "paper", "scissors"];

const handImages = {
  rock: "Img/rock.png",
  paper: "Img/paper.png",
  scissors: "Img/scissors.png",
  normal: "Img/normal.png"
};

function getComputerChoice() {
  const index = Math.floor(Math.random() * 3);
  return choices[index];
}

function determineWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) return "player";
  return "computer";
}

function updateHearts(winner) {
  if (winner === "player") {
    computerLives--;
    if (computerLives >= 0) {
      computerHearts[computerLives].src = "img/empty.png"; 
    }
  } else if (winner === "computer") {
    playerLives--;
    if (playerLives >= 0) {
      playerHearts[playerLives].src = "img/empty.png"; 
    }
  }
}

function checkGameOver() {
  if (playerLives === 0 || computerLives === 0) {
    const winner = playerLives === 0 ? "Computer" : "Player";
    gameOverDiv.innerHTML = `<h1>GAME OVER - ${winner} Wins</h1>`;
    gameOverDiv.style.display = "block";

    setTimeout(() => {
      resetGame();
    }, 2500);
    return true;
  }
  return false;
}

function playGame(playerChoice) {
  if (playerLives === 0 || computerLives === 0) return;

  const computerChoice = getComputerChoice();

  // Show selected images
  playerHand.src = handImages[playerChoice];
  computerHand.src = handImages[computerChoice];

  const winner = determineWinner(playerChoice, computerChoice);

  if (winner === "draw") {
    resultText.textContent = "It's a draw!";
  } else if (winner === "player") {
    resultText.textContent = "You win this round!";
  } else {
    resultText.textContent = "Computer wins this round!";
  }

  updateHearts(winner);

  if (!checkGameOver()) {
    setTimeout(() => {
      playerHand.src = handImages["normal"];
      computerHand.src = handImages["normal"];
    }, 1000);
  }
}

function resetGame() {
  playerLives = 3;
  computerLives = 3;
  resultText.textContent = "Choose your move!";
  gameOverDiv.style.display = "none";

  // Reset hearts
  playerHearts.forEach(heart => heart.src = "img/heartFull.png");
  computerHearts.forEach(heart => heart.src = "img/heartFull.png");

  playerHand.src = handImages["normal"];
  computerHand.src = handImages["normal"];
}

// Add button listeners
document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));
