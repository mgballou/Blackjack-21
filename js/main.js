//------- app state
// declare my game state variables that will be used to track changing data

let deck // will hold the new instance of the deck class when init is run
let dCards // will hold an array of the dealer's cards
let pCards // will hold an array of the player's cards
let money // stores the player's current winnings

//------ DOM elements
const dealerHandEl = document.querySelector('#dealer-hand') // display area to append card elements to
const playerHandEl = document.querySelector('#player-hand') // "" for player's hand
const messagesEl = document.querySelector('#messages') // location for messages to the player

//------ classes

class Deck {

}

class PlayingCard {

}

class Dealer {

}


//------ functions
function init() {
    
    console.log('Game start')
    dCards = [1,2,3]
    pCards = ['Ace',7,2]
    render()
}

function render() {
    console.log('Rendering game')
    renderHands()

}
function renderHands() {
    //// iterates over dCards array, creating a new DOM element and appending it to the parent div
    dCards.forEach(card => {
        // will need to add an if-statement here to check if an element already exists and to skip that index of the array if so on subsequent calls of render
        let newCardEl = document.createElement('div')
        newCardEl.classList.add('card')
        newCardEl.textContent = card // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
        dealerHandEl.appendChild(newCardEl)
    })

    pCards.forEach(card => {
        // will need to add an if-statement here to check if an element already exists and to skip that index of the array if so on subsequent calls of render
        let newCardEl = document.createElement('div')
        newCardEl.classList.add('card')
        newCardEl.textContent = card // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
        playerHandEl.appendChild(newCardEl)
    })

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
