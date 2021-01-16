import { Game } from "./blackjack/Game.js";

const btnNewGame = document.getElementById('btnNewGame');
const btnLoadGame = document.getElementById('btnLoadGame');
const btnTopScore = document.getElementById('btnTopScore');
const windowDiv = document.getElementById('windowDiv');
const gameDiv = document.getElementById('gameDiv');
const menuDiv = document.getElementById('menuDiv');

btnNewGame.addEventListener('click', () => {
    const game = new Game(windowDiv, menuDiv, gameDiv);
})