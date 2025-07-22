let playerScore = 0;
let computerScore = 0;
const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const buttons = document.querySelectorAll("#rock, #paper, #scissors");

function computerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection) {
    const player = playerSelection.toUpperCase();
    const computer = computerChoice().toUpperCase();

    let message = `You chose: ${player}<br>Computer chose: ${computer}`;
    let roundResult = "";

    if (player === computer) {
        roundResult = `<br>It's a tie!`;
    } else if (
        (player === "ROCK" && computer === "SCISSORS") ||
        (player === "SCISSORS" && computer === "PAPER") ||
        (player === "PAPER" && computer === "ROCK")
    ) {
        playerScore++;
        roundResult = `<br>You win this round! ${player} beats ${computer}.`;
    } else {
        computerScore++;
        roundResult = `<br>You lose this round! ${computer} beats ${player}.`;
    }

    resultDiv.innerHTML = message + roundResult;
    updateScoreDisplay();

    if (playerScore === 5 || computerScore === 5) {
        declareWinner();
    }
}

function updateScoreDisplay() {
    scoreDiv.textContent = `Score — You: ${playerScore} | Computer: ${computerScore}`;
}

function declareWinner() {
    let winnerMessage = playerScore === 5
        ? "🎉 You win the game!"
        : "😢 Computer wins the game.";

    resultDiv.innerHTML += `<br><strong>${winnerMessage}</strong>`;
    
    // Disable buttons
    buttons.forEach(button => button.disabled = true);
}

function playGame() {
    playerScore = 0;
    computerScore = 0;
    resultDiv.textContent = "Choose Rock, Paper, or Scissors!";
    updateScoreDisplay();

    buttons.forEach(button => {
        button.disabled = false;
        button.addEventListener("click", () => {
            playRound(button.id);
        });
    });
}

playGame();
