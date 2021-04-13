const selection = ["rock", "paper", "scissors"];

//Helper function for computer to randomly generate a play
function computerPlay() {
  return selection[Math.round(Math.random() * (selection.length - 1))];
}

//Helper function to compare two strings that are case insensitive
function equalsIgnoreCase(a, b) {
  /*  localeCompare() returns -1 if a is sorted before b (ab and cd), 0 if equal, 1 if a is sorted after b (cd and ab)
        { sensitivity: "accent" } treats two variables of same base letter equal unless different accents
        { sensitivity: "base" }   treats two characters of same base letter equal */
  return typeof a === "string" && typeof b === "string"
    ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0
    : a === b;
}

//Plays 1 round of rock, paper, scissors
function playRound(playerSelection, computerSelection) {
  computerSelection = computerPlay();
  if (equalsIgnoreCase(playerSelection, computerSelection)) {
    console.log(
      `It's a draw! ${playerSelection} ties with ${computerSelection}, try again!`
    );
  } else if (
    (equalsIgnoreCase(playerSelection, "Paper") &&
      equalsIgnoreCase(computerSelection, "Rock")) ||
    (equalsIgnoreCase(playerSelection, "Rock") && //make into a function
      equalsIgnoreCase(computerSelection, "Scissors")) ||
    (equalsIgnoreCase(playerSelection, "Scissors") &&
      equalsIgnoreCase(computerSelection, "Paper"))
  ) {
    playerScore++;
    console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
  } else {
    computerScore++;
    console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
  }
}

//Checks final score to determine winner
function declareWinner(playerScore, computerScore) {
  console.log(`Score:
    Player:     ${playerScore}
    Computer    ${computerScore}`);
  if (playerScore > computerScore) {
    console.log(
      `Congratulations! You won by ${playerScore - computerScore} points!`
    );
  } else {
    console.log(`You lost by ${computerScore - playerScore} points!`);
  }
  playAgain();
}

//Reset game scores and selections
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerSelection = "";
  computerSelection = "";
  location.reload();
}

//Prompts user to play again
function playAgain() {
  let ans = prompt("Play again? (Y/N)");
  return equalsIgnoreCase(ans, "Y")
    ? resetGame()
    : console.log("Thanks for playing!");
}

//window.onload = intro();

//Global variables
let playerScore = 0;
let computerScore = 0;
let playerSelection = "";
let computerSelection = "";

const button = document.querySelectorAll(".button");
button.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    playerSelection = img.alt.toLowerCase();

    playRound(playerSelection, computerSelection);
    if (playerScore === 5 || computerScore === 5) {
      declareWinner(playerScore, computerScore);
    }
  });
});
//add div to display results and change the console.log into DOM methods
