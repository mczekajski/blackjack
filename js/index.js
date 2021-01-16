import { Game } from "./blackjack/Game.js";

const btnNewGame = document.getElementById("btnNewGame");
const btnLoadGame = document.getElementById("btnLoadGame");
const btnTopScore = document.getElementById("btnTopScore");

const btnHit = document.getElementById("btnHit");
const btnStand = document.getElementById("btnStand");
const btnDoubleDown = document.getElementById("btnDoubleDown");
const btnSave = document.getElementById("btnSave");
const btnLoad = document.getElementById("btnLoad");

const windowDiv = document.getElementById("windowDiv");
const gameDiv = document.getElementById("gameDiv");
const menuDiv = document.getElementById("menuDiv");

const dealersCardsDiv = document.getElementById("dealersCards");
const playersCardsDiv = document.getElementById("playersCards");

btnNewGame.addEventListener("click", () => {
  const game = new Game(
    windowDiv,
    menuDiv,
    gameDiv,
    btnHit,
    btnStand,
    btnDoubleDown,
    btnSave,
    btnLoad,
    dealersCardsDiv,
    playersCardsDiv,
    1000
  );
});
