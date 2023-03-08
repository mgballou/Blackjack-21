//------- app state
// declare my game state variables that will be used to track changing data

let deck // will hold the new instance of the deck class when init is run
let dCards // will hold an array of the dealer's cards
let pCards // will hold an array of the player's cards
let money // stores the player's current winnings
let active // truthyness of this variable will determine if render function clears existing cards & messages


//------ DOM elements
const dealerHandEl = document.querySelector('#dealer-hand') // display area to append card elements to
const playerHandEl = document.querySelector('#player-hand') // "" for player's hand
const messagesEl = document.querySelector('#messages') // location for messages to the player
1

//------ classes
/// This section's code is built by modifying this example of deck and card class organization given in class https://replit.com/@JoshuaSmith62/OOP-Entity#script.js


class Deck {
    static suits = ['Spade', 'Diamond', 'Heart', 'Club']
    static ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]

    constructor() {
        this.cards = []
    }

    makeDeck() {
        // refactored the nested for loops commented out beneath this into forEach loops
        Deck.suits.forEach(suit => {
            Deck.ranks.forEach(rank => {
                let newCard = new PlayingCard(suit, rank)
                this.cards.push(newCard, newCard) // this modification should now create a deck with 104 cards
            })
        })
        // will iterate over a set of static properties (suit and rank) -> nested for loop > generate 52 card objects 
        // for (let s = 0; s < Deck.suits.length; s++) {
        //     for (let r = 0; r < Deck.ranks.length; r++) {
        //         let suit = Deck.suits[s]
        //         let rank = Deck.ranks[r]
        //         let newCard = new PlayingCard(suit, rank)
        //         this.cards.push(newCard)
        //     }
        // }
    }

    shuffle() {
        /* implementing Fisher-Yates shuffle algorithm, referenced from
        https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
        https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
         */

        // starting at the last position of the array, iterates backwards
        for (let i = this.cards.length - 1; i > 0; i--) {
            // generates a random number to select a random position between the first and current positions
            let randomIndex = Math.floor(Math.random() * (i + 1))
            // stores the current position (last position on first iteration) in a placeholder varaible
            let temporaryValue = this.cards[i]
            // assigns the value at the random position to the current position in the array
            this.cards[i] = this.cards[randomIndex] 
            // assigns the temporary value (previously held at the current position) to the random position
            this.cards[randomIndex] = temporaryValue
        }

    }


}

class PlayingCard {
    static rankLookup = {
        "A": 11,
        "K": 10,
        "Q": 10,
        "J": 10
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
    dCards = []
    pCards = []
    active = 1
    money = 1000
    deck = new Deck()
    deck.makeDeck()
    deck.shuffle()
    render()
}

function render() {
    console.log('Rendering game')
    renderHands()
    renderMessages()

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

    /// this is identical to the above forEach, but for the player's cards
    pCards.forEach(card => {
        // if statement needed, as above
        let newCardEl = document.createElement('div')
        newCardEl.classList.add('card')
        newCardEl.textContent = card // refactor needed, as above
        playerHandEl.appendChild(newCardEl)
    })

}

function renderMessages() {
    let newMessage = document.createElement('p')
    newMessage.textContent ='This works'
    messagesEl.append(newMessage)

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

//------ event listeners


//------ Game

init()
