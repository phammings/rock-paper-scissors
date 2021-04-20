window.onload = intro();

let playerScore = 0;
let computerScore = 0;
let playerSelection = "";
let computerSelection = "";

const button = document.querySelectorAll(".button");
button.forEach((button) => {
  button.addEventListener("click", () => {
    const img = button.querySelector("img");
    playerSelection = img.alt;

    playRound(playerSelection, computerSelection);
    if (playerScore === 5 || computerScore === 5) {
      declareWinner(playerScore, computerScore);
    }

    roundResultContainer.appendChild(roundResult);
    scoreContainer.appendChild(playerScoreDiv);
    scoreContainer.appendChild(computerScoreDiv);
  });
});

const playAgainContainer = document.querySelector(".playAgain");
const playAgainBtn = document.createElement("button");
playAgainBtn.classList.add("playAgain");

playAgainBtn.addEventListener("click", () => {
  resetGame();
});

const roundResultContainer = document.querySelector(".roundResult");
const roundResult = document.createElement("div");
roundResult.classList.add("roundResult");

const roundWinnerContainer = document.querySelector(".roundWinner");
const roundWinner = document.createElement("p");
roundWinner.classList.add("roundWinner");

const scoreContainer = document.querySelector(".score");
const playerScoreDiv = document.querySelector("#you-label");
const computerScoreDiv = document.querySelector("#haters-label");
playerScoreDiv.classList.add("score");
computerScoreDiv.classList.add("score");

const selection = ["Rock", "Paper", "Scissors"];

function computerPlay() {
  return selection[Math.round(Math.random() * (selection.length - 1))];
}

function playRound(playerSelection, computerSelection) {
  computerSelection = computerPlay();
  if (playerSelection === computerSelection) {
    roundResult.textContent = `It's a draw! ${playerSelection} ties with ${computerSelection}, try again!`;
  } else if (
    (playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Scissors" && computerSelection === "Paper")
  ) {
    playerScoreDiv.textContent = ++playerScore;
    roundResult.textContent = `You Win! ${playerSelection} beats ${computerSelection}`;
  } else {
    computerScoreDiv.textContent = ++computerScore;
    roundResult.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`;
  }
}

function removeMainScreen() {
  const gameCtn = document.querySelector("#game-container");
  const main = document.querySelector("main");

  gameCtn.classList.remove("fade");
  gameCtn.classList.remove("game-fade-in");
  main.classList.add("img-fade-out");
  gameCtn.classList.add("hidden");
  main.classList.add("hidden");
  return;
}

function winningEnd() {
  roundWinner.textContent = "Less Go! You saved DaBaby!";
  return;
}

function losingEnd() {
  roundWinner.textContent = "Huh? Who will save DaBaby now?";
  return;
}

function declareWinner(playerScore, computerScore) {
  removeMainScreen();
  const endScreen = document.querySelector("#end-screen");
  const video = document.getElementById("end-video");
  const audio = document.getElementById("end-audio");
  const source = document.createElement("source");
  const source2 = document.createElement("source");

  if (playerScore > computerScore) {
    winningEnd();
    source.setAttribute("src", "Video/WinningScreen2.mp4");
    source2.setAttribute("src", "Audio/WinningSong2.wav");
  } else {
    losingEnd();
    source.setAttribute("src", "Video/LosingScreen.mp4");
    source2.setAttribute("src", "Audio/LosingSong.wav");
  }
  roundWinnerContainer.appendChild(roundWinner);
  playAgain();
  endScreen.classList.remove("hidden");
  endScreen.classList.add("end-fade-in");
  endScreen.classList.remove("endScreen");
  endScreen.classList.add("fade");
  video.appendChild(source);
  audio.appendChild(source2);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerSelection = "";
  computerSelection = "";
  location.reload();
}

function playAgain() {
  playAgainBtn.textContent = "Play Again?";
  playAgainContainer.appendChild(playAgainBtn);
}

function intro() {
  const endScreen = document.querySelector("#end-screen");
  endScreen.classList.add("hidden");

  fadeIn();
  //need to turn nodelist of spans into an array so we can access last value for ontransitionend
  const intro1 = document.querySelector("#intro1");
  const intro2 = document.querySelector("#intro2");
  const intro3 = document.querySelector("#intro3");
  const introImg = document.querySelector(".introImg");

  let intro1Span = intro1.querySelectorAll("span");
  intro1Span = Array.from(intro1Span);

  intro1Span[intro1Span.length - 1].ontransitionend = () => {
    introImg.classList.remove("img-fade-in");
    intro1.classList.add("fade-out");
    introImg.classList.add("img-fade-out");

    intro1.addEventListener("animationend", () => {
      introImg.remove();
      intro1.classList.add("hidden");
      intro1.classList.remove("animate");
      intro2.classList.remove("hidden");
      intro2.classList.add("animate");
      fadeIn();
      let intro2Span = intro2.querySelectorAll("span");
      intro2Span = Array.from(intro2Span);

      intro2Span[intro2Span.length - 1].ontransitionend = () => {
        intro2.classList.add("fade-out");
        intro2.addEventListener("animationend", () => {
          intro2.classList.add("hidden");
          intro2.classList.remove("animate");
          intro3.classList.remove("hidden");
          intro3.classList.add("animate");
          fadeIn();

          let intro3Span = intro3.querySelectorAll("span");
          intro3Span = Array.from(intro3Span);

          intro3Span[intro3Span.length - 1].ontransitionend = () => {
            const subtitle = document.querySelector("#subtitle");

            subtitle.classList.add("drop-down");

            subtitle.addEventListener("animationend", () => {
              const gameCtn = document.querySelector("#game-container");

              setTimeout(function () {
                gameCtn.classList.remove("opacity0");
                gameCtn.classList.remove("hidden");
                gameCtn.classList.add("game-fade-in");
                gameCtn.classList.add("fade");
              }, 300);
            });
          };
        });
      };
    });
  };
}

function fadeIn() {
  let text = document.querySelector(".animate");

  let strText = text.textContent;
  let splitText = strText.split("");
  text.textContent = "";
  //append span tags to each character in string
  for (i = 0; i < splitText.length; i++) {
    text.innerHTML += `<span>${splitText[i]}</span>`;
  }

  let char = 0;
  let timer = setInterval(onTick, 50);

  function onTick() {
    const span = text.querySelectorAll("span")[char];
    span.classList.add("fade");
    char++;
    //stops function at end of string
    if (char === splitText.length) {
      complete();
      return;
    }
  }
  function complete() {
    clearInterval(timer);
    timer = null;
  }
}

//add function to skip intro
//after playAgain() skip intro screen instead of window.reload()
//add media queries
