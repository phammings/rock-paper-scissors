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

function playRound(playerSelection, computerSelection)
{
    if (equalsIgnoreCase(playerSelection, computerSelection))
    {
        let roundStatement = `It's a draw! ${playerSelection} ties with ${computerSelection}`;
        return roundStatement;
    }
    else if (equalsIgnoreCase(playerSelection, "Paper") && equalsIgnoreCase(computerSelection, "Rock") ||
        equalsIgnoreCase(playerSelection, "Rock") && equalsIgnoreCase(computerSelection, "Scissors") ||
        equalsIgnoreCase(playerSelection, "Scissors") && equalsIgnoreCase(computerSelection, "Paper"))
    {
        let roundStatement = `You Win! ${playerSelection} beats ${computerSelection}`;
        return roundStatement;
    }
    else
    {
        let roundStatement = `You Lose! ${computerSelection} beats ${playerSelection}`;
        return roundStatement;
    }
    
}

const playerSelection = "rock";
const computerSelection = computerPlay();
console.log(playRound(playerSelection, computerSelection));