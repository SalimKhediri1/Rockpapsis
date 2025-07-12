function computerChoice() {
    let choix = Math.floor(Math.random() * 3);
    let lst = ['Rock', 'Paper', 'Scissors'];
    return lst[choix];
}
function YourChoix() {
    let playerChoice = prompt("Enter Rock, Paper, or Scissors:");
    return playerChoice
}


function playaround(pChoice,cChoice) {
    ppChoice=pChoice.toUpperCase()
    ccChoice=cChoice.toUpperCase()
    if (ppChoice===ccChoice) {
        alert(`The computer's choice is ${cChoice}. It's a tie.`);
        return 0
    }
    else if ((ppChoice==="ROCK" && ccChoice ==="SCISSORS")|| 
    (ppChoice==="SCISSORS" && ccChoice ==="PAPER") ||
    (ppChoice==="PAPER" && ccChoice ==="ROCK")) {
        alert(`The computer's choice is ${cChoice}. You won`);
        return 1
    }
    else{
        alert(`The computer's choice is ${cChoice}. You Lost.`);
        return 0
    }
}
function playGame() {
    let s=0
    for (let i = 0; i < 5; i++) {
        const pChoice=YourChoix()
        const cChoice=computerChoice()
        let score=playaround(pChoice,cChoice)
        s=s+score
    }
    alert(`Your score is ${s}.`);
}
playGame()