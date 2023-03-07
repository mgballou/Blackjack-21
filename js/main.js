//------- app state
// declare my game state variables that will be used to track changing data

let deck // will hold the new instance of the deck class when init is run
let dCards // will hold an array of the dealer's cards
let pCards // will hold an array of the player's cards

//------ DOM elements
const dealerHandEl = document.querySelector('#dealer-hand') // display area to append card elements to
const playerHandEl = document.querySelector('#player-hand') // "" for player's hand
const messagesEl = document.querySelector('#messages') // location for messages to the player

//------ classes


//------ functions
function init() {
    console.log('Game start')
    render()
}

function render() {
    console.log('Rendering game')
}

function hit() {

}

function stand () {

}

function checkWinner() {
    checkNatural21()
    checkFiveCardCharlie()
    checkHigherValue()
}

function checkNatural21() {

}


function checkFiveCardCharlie() {

}


function checkHigherValue() {

}

//------ event ;isteners


//------ Game

init()
