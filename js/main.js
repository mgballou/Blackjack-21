//------- app state
// declare my game state variables that will be used to track changing data

let deck // will hold the new instance of the deck class when init is run
let game // will hold a new instance of the game class
let nextMessage // holds a string of the next message to be added to the game's messages window
let wonHand // stores who won the current hand
let toggle // will handle state of active and inactive buttons


//------ DOM elements

const dealerHandEl = document.querySelector('#dealer-hand') // display area to append card elements to
const playerHandEl = document.querySelector('#player-hand') // "" for player's hand
const messagesEl = document.querySelector('#messages') // location for messages to the player
const buttonContainerEl = document.querySelector('#buttons') // all buttons located here
const dealerValueEl = document.querySelector('#dealer-value')
const playerValueEl = document.querySelector('#player-value')
const moneyEl = document.querySelector('#money')

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


class Game {

    constructor() {
        this.messageLog = []
        this.dealerCards = []
        this.dealerValue = 0
        this.playerCards = []
        this.playerValue = 0
        this.money = 1000
        this.currentBet = 0
    }

    deal() {
        // deals the intiial four cards, one by one, to player and dealer
        let i = 0
        while (i < 4) {
            let drawnCard = deck.cards.shift()
            i % 2 === 0 ? game.playerCards.push(drawnCard) : game.dealerCards.push(drawnCard)
            i++
        }
        render.cards.atNewHand()
        this.tallyValues()
        checkNatural21()
    }


    hit() {
        let drawnCard = deck.cards.shift()
        game.playerCards.push(drawnCard)
        render.cards.atHit()
        this.tallyValues()
        checkNatural21()
        checkBust()
        checkFiveCardCharlie()


    }

    dealerHit() {
        let drawnCard = deck.cards.shift()
        game.dealerCards.push(drawnCard)
        render.cards.atDealerHit()

    }

    stand() {

        if (this.dealerCards) {
            while (this.dealerValue <= 16) {
                this.dealerHit()
                this.tallyValues()
            }
            checkDealer21()
            checkBust()
            checkHigherValue()
        } else {
            return
        }


    }

    takeBet(number) {
        this.currentBet = number
        game.money -= this.currentBet
        
        render.money()

    }

    completeHand(number, string) {
        this.returnBet(number)
        this.buttonSwitch()
        render.messages.atWinOrLoss(string)
        if (game.money <= 0) {
            render.messages.atGameOver()
            this.buttonSwitch()
        } else {
            render.messages.atEndofHand()
        }


    }

    returnBet(number) {
        game.money += this.currentBet * number
        render.money()
    }

    tallyValues() {
        // tallies current value of dealer's cards and player's cards
        this.dealerValue = 0
        this.playerValue = 0
        this.dealerCards.forEach(card => {
            switch (card.rank) {
                case undefined:
                    this.dealerValue += 0
                case 'A':
                    this.dealerValue += 11
                    break;
                case 'J':
                    this.dealerValue += 10
                    break;
                case 'Q':
                    this.dealerValue += 10
                    break;
                case 'K':
                    this.dealerValue += 10
                    break;
                default:
                    this.dealerValue += Number(card.rank)

            }
        })

        this.playerCards.forEach(card => {
            switch (card.rank) {
                case undefined:
                    this.playerValue += 0
                case 'A':
                    this.playerValue += 11
                    break;
                case 'J':
                    this.playerValue += 10
                    break;
                case 'Q':
                    this.playerValue += 10
                    break;
                case 'K':
                    this.playerValue += 10
                    break;
                default:
                    this.playerValue += Number(card.rank)

            }
        })
        render.values()
    }

    clearBoard() {
        this.playerCards = []
        this.dealerCards = []
        this.buttonSwitch()
        this.tallyValues()
        render.clearBoard()

    }

    buttonSwitch () {
        render.buttons()
        toggle *= -1
    }

}

//------- Objects
// I'm adding an Object literal rather than a class here
// Looking to solve my issues in rendering by having different functions completely for different phases of the game, and storing the necessary information in the object rather than loosely

const render = {
    // atNewHand() wil lbe called only on the initial deal of each betting round

    cards: {
        atNewHand: function () {
            console.log('Rendering new hand deal')
            //// iterates over dCards array, creating a new DOM element and appending it to the parent div
            game.dealerCards.forEach(card => {
                let nextCardEl = document.createElement('div')
                nextCardEl.classList.add('card')
                nextCardEl.textContent = card.rank // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
                dealerHandEl.appendChild(nextCardEl)
            })
            /// this is identical to the above forEach, but for the player's cards
            game.playerCards.forEach(card => {
                // if statement needed, as above
                let newCardEl = document.createElement('div')
                newCardEl.classList.add('card')
                newCardEl.textContent = card.rank // refactor needed, as above
                playerHandEl.appendChild(newCardEl)
            })

        },

        // atHit() will be called when the player selects hit, and will only render the most recent card in the player's array
        atHit: function () {
            console.log('Rendering hit')
            let nextCardEl = document.createElement('div')
            nextCardEl.classList.add('card')
            nextCardEl.textContent = game.playerCards[game.playerCards.length - 1].rank // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
            playerHandEl.appendChild(nextCardEl)
        },

        // atStand() will be called when the player stands, and will render any additional cards that the dealer draws

        atDealerHit: function () {
            let nextCardEl = document.createElement('div')
            nextCardEl.classList.add('card')
            nextCardEl.textContent = game.dealerCards[game.dealerCards.length - 1].rank // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
            dealerHandEl.appendChild(nextCardEl)

        },

        // atStand: function () {
        //     console.log('Rendering stand')

        // }
    },

    messages: {

        atGameStart: function () {
            let newMessageEl = document.createElement('p')
            newMessageEl.textContent = "Select a bet to start playing"
            messagesEl.append(newMessageEl)

        },

        atNewHand: function () {
            let newMessageEl = document.createElement('p')
            newMessageEl.textContent = "New deal"
            messagesEl.append(newMessageEl)

        },

        atWinOrLoss: function (string) {
            let newMessageEl = document.createElement('p')
            newMessageEl.textContent = nextMessage
            messagesEl.append(newMessageEl)

        },


        atEndofHand: function () {
            let newMessageEl = document.createElement('p')
            newMessageEl.textContent = "Select a bet to play next hand"
            messagesEl.append(newMessageEl)

        },

        atGameOver: function () {
            let newMessageEl = document.createElement('p')
            newMessageEl.textContent = "You ran out of money, game over! Reset Game to play again"
            messagesEl.append(newMessageEl)

        }

    },

    clearBoard: function () {
        let allCardEls = document.querySelectorAll('.card')
        allCardEls.forEach(cardEl => {
            cardEl.remove()
        })
    },

    values: function () {
        dealerValueEl.textContent = game.dealerValue
        playerValueEl.textContent = game.playerValue
    },

    money: function () {
        moneyEl.textContent = `$${game.money}`

    },

    buttons: function () {
        if (toggle > 0) {
            document.querySelectorAll(".bets").forEach(button => {
                button.disabled = true
            })
            document.querySelectorAll('.other-button').forEach(button => {
                button.disabled = false
            })
        } else {
            document.querySelectorAll(".bets").forEach(button => {
                button.disabled = false
            })
            document.querySelectorAll('.other-button').forEach(button => {
                button.disabled = true
            })
        }
    }

}

//------ functions
function init() {

    console.log('Game start')
    toggle = 1
    game = new Game()
    deck = new Deck()
    deck.makeDeck()
    deck.shuffle()
    render.messages.atGameStart()
    render.money()
    render.values()
}

// function render() {
//     console.log('Rendering game')
//     renderHands()
//     renderMessages()


// }
// function renderHands() {
//     if (playerHandEl.childNodes.length < 2) {
//         //// iterates over dCards array, creating a new DOM element and appending it to the parent div
//         game.dealerCards.forEach(card => {
//             let nextCardEl = document.createElement('div')
//             nextCardEl.classList.add('card')
//             nextCardEl.textContent = card.rank // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
//             dealerHandEl.appendChild(nextCardEl)
//         })
//         /// this is identical to the above forEach, but for the player's cards
//         game.playerCards.forEach(card => {
//             // if statement needed, as above
//             let newCardEl = document.createElement('div')
//             newCardEl.classList.add('card')
//             newCardEl.textContent = card.rank // refactor needed, as above
//             playerHandEl.appendChild(newCardEl)
//         })
//     }
//     if (game.playerCards.length > 2) {
//         let nextCardEl = document.createElement('div')
//         nextCardEl.classList.add('card')
//         nextCardEl.textContent = game.playerCards[game.playerCards.length - 1].rank // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
//         playerHandEl.appendChild(nextCardEl)
//     }
//     if (game.dealerCards.length > 2) {
//         let nextCardEl = document.createElement('div')
//         nextCardEl.classList.add('card')
//         nextCardEl.textContent = game.dealerCards[game.dealerCards.length - 1].rank // will need to refactor this to accept all the information that will actually be contained in each card in the array (suit, value)
//         dealerHandEl.appendChild(nextCardEl)
//     }
// }

// function renderMessages() {
//     let newMessageEl = document.createElement('p')
//     newMessageEl.textContent = nextMessage
//     messagesEl.append(newMessageEl)
//     nextMessage = ''

// }

// function checkWinner() {
//     checkNatural21()
//     checkBust()
//     checkFiveCardCharlie()
//     checkHigherValue()
// }

function checkNatural21() {
    if (game.playerValue === 21) {
        nextMessage = `21! You won $${game.currentBet * 2}!`
        wonHand = 2
        game.completeHand(wonHand, nextMessage)
    }
}

function checkDealer21() {
    if (game.dealerValue === 21) {
        nextMessage = `Dealer hits 21! You lost $${game.currentBet}!`
        wonHand = 0
        game.completeHand(wonHand, nextMessage)
    }
}

function checkBust() {
    if (game.playerValue > 21) {
        nextMessage = `Bust! You lost $${game.currentBet}`
        wonHand = 0
        game.completeHand(wonHand, nextMessage)
    }
    if (game.dealerValue > 21) {
        nextMessage = `Dealer busts! You won $${game.currentBet * 2}!`
        wonHand = 2
        game.completeHand(wonHand, nextMessage)
    }

}

function checkFiveCardCharlie() {
    if (game.playerValue < 21 && game.playerCards.length === 5) {
        nextMessage = `Five Card Charlie! You won $${game.currentBet * 2}`
        wonHand = 2
        game.completeHand(wonHand, nextMessage)
    }

}

function checkHigherValue() {
    if (game.dealerValue >= 21) {
        return
    } else {
        if (game.playerValue > game.dealerValue) {
            nextMessage = `You have ${game.playerValue}, dealer has ${game.dealerValue}. You won $${game.currentBet * 2}!`
            wonHand = 2
        } else if (game.playerValue < game.dealerValue) {
            nextMessage = `You have ${game.playerValue}, dealer has ${game.dealerValue}. You lost $${game.currentBet}`
            wonHand = 0
        } else {
            nextMessage = `Tie hand, dealer gives you back $${game.currentBet}`
            wonHand = 1
        }
        game.completeHand(wonHand, nextMessage)
    }
}

//------ event listeners

function handleClick(evt) {
    switch (evt.target.id) {
        case 'buttons':
            break;
        case 'hit':
            game.hit()
            break;
        case 'stand':
            game.stand()
            break;
        case 'reset':
            game.clearBoard()
            init()
            break;
        case 'all-in':
            game.clearBoard()
            game.takeBet(game.money)
            game.deal()
            break;
        default:
            game.clearBoard()
            game.takeBet(evt.target.id)
            game.deal()
            break;

    }


}

buttonContainerEl.addEventListener('click', handleClick)




//------ Game

init()
