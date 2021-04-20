//Helper function for computer to randomly generate a play
function computerPlay()
{
    computerInput = (Math.round(Math.random() * 3));
    if (computerInput === 1)
    {
        return "Rock";
    }
    else if (computerInput === 2)
    {
        return "Paper";
    }
    else 
    {
        return "Scissors";
    }
}

//Helper function to compare two strings that are case insensitive
function equalsIgnoreCase(a, b)
{
    /*  localeCompare() returns -1 if a is sorted before b (ab and cd), 0 if equal, 1 if a is sorted after b (cd and ab)
        { sensitivity: "accent" } treats two variables of same base letter equal unless different accents
        { sensitivity: "base" }   treats two characters of same base letter equal */
    return typeof a === "string" && typeof b === "string"
        ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0  
        : a === b;
}

//Helper function to check if user input is a valid play
function isValidPlay(playerSelection)
{
    return equalsIgnoreCase(playerSelection, "Rock") || 
            equalsIgnoreCase(playerSelection, "Paper") || 
            equalsIgnoreCase(playerSelection, "Scissors");
}

//Plays 1 round of rock, paper, scissors
function playRound(playerSelection, computerSelection)
{
    playerSelection = prompt("Enter your play");
    computerSelection = computerPlay();
    if (!(isValidPlay(playerSelection)))
    {
        console.log("Invalid Play. Choose either rock, paper, or scissors.");
        playRound(playerSelection, computerPlay());
    }
    else if (equalsIgnoreCase(playerSelection, computerSelection))
    {
        console.log(`It's a draw! ${playerSelection} ties with ${computerSelection}, try again!`);
        playRound(playerSelection, computerPlay());
    }
    else if (equalsIgnoreCase(playerSelection, "Paper") && equalsIgnoreCase(computerSelection, "Rock") ||
        equalsIgnoreCase(playerSelection, "Rock") && equalsIgnoreCase(computerSelection, "Scissors") ||
        equalsIgnoreCase(playerSelection, "Scissors") && equalsIgnoreCase(computerSelection, "Paper"))
    {
        let roundStatement = console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
        playerScore++;
        return roundStatement;
    }
    else
    {
        let roundStatement = console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
        computerScore++;
        return roundStatement;
    }
    
}

//Checks final score to determine winner
function checkScore(playerScore, computerScore)
{
    if (playerScore>computerScore)
    {
        return `Congratulations! You won by ${ playerScore - computerScore } points!`
    }
    else{
        return `You lost by ${ computerScore - playerScore } points!`
    }
}

//Reset game scores and selections
function resetGame()
{
    playerScore = 0;
    computerScore = 0;
    playerSelection = "";
    computerSelection= "";
    return;
}

//Prompts user to play again
function playAgain()
{
    let ans = prompt("Play again? (Y/N)");
    return equalsIgnoreCase(ans, "Y") ? game() : console.log("Thanks for playing!");
}

//Plays a full game of 5 rounds of rock, paper, scissors with a score 
function game()
{
    console.log("Rock Paper Scissors (5 Rounds):")
    for (var i=1; i<=5; i++)
    {
        console.log(`Round ${i}:`);
        playRound(playerSelection, computerSelection);
    }
    console.log(`Score:
                Player:     ${ playerScore }
                Computer    ${ computerScore }`
                );
    console.log(checkScore(playerScore, computerScore));
    playAgain();
    resetGame();
}

//Global variables
let playerScore = 0;
let computerScore = 0;
let playerSelection = "";
let computerSelection= "";
