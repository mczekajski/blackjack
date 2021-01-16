import { Game } from "./blackjack/Game.js";

const btnNewGame = document.getElementById('btnNewGame');
const btnLoadGame = document.getElementById('btnLoadGame');
const btnTopScore = document.getElementById('btnTopScore');

btnNewGame.addEventListener('click', () => {
    const game = new Game();
})