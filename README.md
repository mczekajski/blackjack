# BlackJack

My implementation of a BlackJack game written in JavaScript. 

## Live demo
https://mczekajski.github.io/blackjack/

## Menu
Initial menu consists of 3 buttons:
1. Start new game.
2. Load game - if you have saved game this button is enabled.
3. Top results - if you have any previous results this button is enabled.

## Rules

Whole game consists of 5 rounds. The goal in every round is to get as close as posibble to 21 total cards value or to get 5 cards without exceeding 21 limit. Dealer is obligued to draw a card until he has at least 17 points.

### Bet window
First step in every round is to set your bet. Your bet has to be between $100 and your total balance. Game ends automatically when you do not have at least $100 balance.

### Actual game
When your bet is set, the actual game starts. Action buttons enable, and than you can:
1. Hit - that means you draw another card.
2. Stay - that means you do not want more cards and wait for dealer's move. 
3. Double down - if you have enough balance left you can double your bet. Works only if you did not click hit or stay button.

At the end of the round the result is shown on screen. 

## Save and load game
You can save your game in every moment and when game is saved, load button is enabled. Your save is in your browser memory in local storage which means you can close your browser and all the data is still saved. 

## History
In every moment of your game you can view game history with History button. 

## Top Results
During the game you have access to Top Results. Result is automatically saved when game ends in your browsers memory in local storage, which means you can close your browser and all the data is still saved. 

## Responsivity
This game uses Bootstrap for its appearance, however, it has only basic responsivity yet. It is designed for desktop and laptop screens and doesn't support small devices.

## Cards API
This game uses [Deck of Cards API](https://deckofcardsapi.com/)

