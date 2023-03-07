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
/// This section's code is built by modifying this example of deck and card class organization given in class https://replit.com/@JoshuaSmith62/OOP-Entity#script.js


class Deck {
    static suits = ['Spade', 'Diamond', 'Heart', 'Club']
    static ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]

    constructor() {
        this.cards = []
    }

    makeDeck() {
        // will iterate over a set of static properties (suit and rank) -> nested for loop > generate 52 card objects 
        console.log(this.cards)
        Deck.suits.forEach(s => {
            Deck.ranks.forEach(r => {
                let suit = Deck.suits[s]
                let rank = Deck.ranks[r]
                let newCard = new PlayingCard(suit, rank)
                this.cards.push(newCard)

            })
        })
        // for (let s = 0; s < Deck.suits.length; s++) {
        //     for (let r = 0; r < Deck.ranks.length; r++) {
        //         let suit = Deck.suits[s]
        //         let rank = Deck.ranks[r]
        //         let newCard = new PlayingCard(suit, rank)
        //         this.cards.push(newCard)
        //     }
        // }
    }

    // shuffle(){

    //}

    // draw () {

    // }
}

class PlayingCard {
    static rankLookup = {
        "A": 14,
        "K": 13,
        "Q": 12,
        "J": 11
    }

    constructor(suit, rank) {
        this.suit = suit // ( symbol - spade diamond heart clubs )
        this.rank = rank
        this.image = ""
    }

}
///////


class Dealer {

}


//------ functions
function init() {

    console.log('Game start')
    dCards = [1, 2, 3]
    pCards = ['Ace', 7, 2]
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
        let nextCardEl = document.createElement('div')
        nextCardEl.classList.add('card')
        nextCardEl.textContent = card // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
        dealerHandEl.appendChild(nextCardEl)
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

function stand() {

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
