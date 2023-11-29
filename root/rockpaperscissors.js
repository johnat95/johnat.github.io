/*
1. Rock, Paper, Scissors
Write a program that plays the popular rock-paper-scissors game.
The program randomly generates a number 0, 1, or 2 representing rock, paper, and scissors.
The program prompts the user to enter "rock", "paper", or "scissors" and then
displays a message indicating whether the "Player wins", "Computer wins" or "It's a draw".
Handle situations where the user enters a word other than those prompted.
*/


const SVG_USER = "svg-user-select"
const SVG_COMP = "svg-comp-select"


games = 0
wins = 0

const startPlay =() => {

    initSVGEventListeners()
    resetIconColors()
    //addIconHover()

}

const runTurnOnClick = (event) => {
    id = event.target.id,
    //mark player choice
    setIconColor(id, SVG_USER)

    //calulate results also marks computer choice
    wins = wins + calcResults(id)

    // trun finised, update game count and reset game
    games++

    endTurnReset()
}

function calcResults(choiceIndex){

    compChoice = Math.floor(Math.random() * 3)

    setIconColor(compChoice, SVG_COMP)
    //removeIconHover()

    scoreIncrease = 0


    // uses the index of OPTIONS_ARRAY to score game
    if(choiceIndex == compChoice){// if the index is the same, the choice was the same, thus a draw

        //is draw
        updateMessageDisplay("DRAW!")
        return scoreIncrease

    // two indicates scissors, and 0 rock
    }else if(choiceIndex== 2 && compChoice == 0){

        //comp win
        updateMessageDisplay("LOSE!")
        return scoreIncrease

    //same here
    }else if(choiceIndex== 0 && compChoice == 2){

        //player win
        updateMessageDisplay("WIN!")
        scoreIncrease = 1

    // handles rock/paper and paper/scissors
    //rock has a lesser index than paper
    //and paper has a lesser index than scissors.
    }else if(choiceIndex < compChoice){

        //comp win
        updateMessageDisplay("LOSE!")
        return scoreIncrease

    }else if(choiceIndex >  compChoice){

        //player win
        updateMessageDisplay("WIN!")
        scoreIncrease = 1
    }

    return scoreIncrease

}


function updateScores(){
    scoreDisplay = document.getElementById("score-label")

    scoreDisplay.innerText = wins + " out of " + games

}

function updateMessageDisplay(display_string){

    messageDisplay = document.getElementById("message-display")

    messageDisplay.innerText = display_string

}

function updateButtonText(text){
    button = document.getElementById("play-button")
    button.innerText = text
}

function setIconColor(iconId, newClass){
    elem = document.getElementById(iconId)
    elem.classList.add(newClass)
}

function addIconHover(){

    for (let id = 0; id < 3; id++) {

        elem = document.getElementById(String(id))

        elem.addEventListener("mouseover", () =>{elem.classList.add("hover")})
        elem.addEventListener("mouseout", () =>{elem.classList.remove("hover")})

    }

}

function removeIconHover(){

    for (let id = 0; id < 3; id++) {

        elem = document.getElementById(String(id))

        elem.removeEventListener("mouseenter", () =>{elem.classList.add("hover")})
        elem.removeEventListener("mouseleave", () =>{elem.classList.remove("hover")})

    }

}

function resetIconColors(){

    for (let id = 0; id < 3; id++) {

        elem = document.getElementById(String(id))

        if(elem.classList.contains(SVG_USER)){
            elem.classList.remove(SVG_USER)
        }

        if(elem.classList.contains(SVG_COMP)){
            elem.classList.remove(SVG_COMP)
        }

    }
}

function endTurnReset(){
    //display new score
    updateScores()

    //remove runTurnOnClick
    removeSVGListeners()

    updateButtonText("Play Again")


    //set startPlay on play button to re-add svg click and hover listeners
    document.getElementById('play-button').addEventListener('click', startPlay)
}

function initSVGEventListeners(){
    document.getElementById("0").addEventListener("click", runTurnOnClick)
    document.getElementById("1").addEventListener("click", runTurnOnClick)
    document.getElementById("2").addEventListener("click", runTurnOnClick)
}

function removeSVGListeners(){
    document.getElementById("0").removeEventListener("click", runTurnOnClick)
    document.getElementById("1").removeEventListener("click", runTurnOnClick)
    document.getElementById("2").removeEventListener("click", runTurnOnClick)
}


window.onload = () =>{
    document.getElementById("play-button").addEventListener("click", startPlay)
}
