function computerPlay()
{
    let computerInput = (Math.round(Math.random() * 3));
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