let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;

const resultDiv = document.getElementById("result");
const playerScoreDiv = document.getElementById("player-score");
const computerScoreDiv = document.getElementById("computer-score");
const roundNumberDiv = document.getElementById("round-number");
const historyList = document.getElementById("history");
const resetButton = document.getElementById("reset");
const buttons = document.querySelectorAll("#rock, #paper, #scissors");

const emojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

function computerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
}

function formatChoice(choice) {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function playRound(playerSelection) {
    const player = playerSelection;
    const computer = computerChoice();

    let message = `You picked ${emojis[player]} ${formatChoice(player)}. Computer picked ${emojis[computer]} ${formatChoice(computer)}.`;
    let roundResult = "tie";
    let headline = "A clean tie.";

    if (player === computer) {
        headline = "Great minds match.";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")
    ) {
        playerScore++;
        roundResult = "win";
        headline = `${formatChoice(player)} beats ${formatChoice(computer)}. You win the round!`;
    } else {
        computerScore++;
        roundResult = "lose";
        headline = `${formatChoice(computer)} beats ${formatChoice(player)}. Computer takes it.`;
    }

    resultDiv.className = `result-panel ${roundResult}`;
    resultDiv.innerHTML = `<strong>${headline}</strong><span>${message}</span>`;
    updateScoreDisplay();
    addHistoryItem(roundResult, player, computer);

    if (playerScore === 5 || computerScore === 5) {
        declareWinner();
    } else {
        roundNumber++;
        roundNumberDiv.textContent = roundNumber;
    }
}

function updateScoreDisplay() {
    playerScoreDiv.textContent = playerScore;
    computerScoreDiv.textContent = computerScore;
}

function addHistoryItem(roundResult, player, computer) {
    const item = document.createElement("li");
    const label = roundResult === "win" ? "Win" : roundResult === "lose" ? "Loss" : "Tie";

    item.className = roundResult;
    item.textContent = `${label}: ${emojis[player]} ${formatChoice(player)} vs ${emojis[computer]} ${formatChoice(computer)}`;
    historyList.prepend(item);
}

function declareWinner() {
    let winnerMessage = playerScore === 5
        ? "🎉 You win the game!"
        : "💫 Computer wins the game.";

    resultDiv.classList.add("game-over");
    resultDiv.innerHTML += `<span class="final-message">${winnerMessage}</span>`;
    
    buttons.forEach(button => button.disabled = true);
    resetButton.classList.add("show");
}

function playGame() {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    resultDiv.textContent = "Choose Rock, Paper, or Scissors!";
    resultDiv.className = "result-panel";
    historyList.innerHTML = "";
    roundNumberDiv.textContent = roundNumber;
    resetButton.classList.remove("show");
    updateScoreDisplay();

    buttons.forEach(button => {
        button.disabled = false;
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        playRound(button.id);
    });
});

resetButton.addEventListener("click", playGame);

playGame();
