import { Game } from "./blackjack/Game.js";

const btnNewGame = document.getElementById("btnNewGame");
const btnLoadGame = document.getElementById("btnLoadGame");
const btnTopScore = document.getElementById("btnTopScore");

const btnHit = document.getElementById("btnHit");
const btnStay = document.getElementById("btnStay");
const btnDoubleDown = document.getElementById("btnDoubleDown");
const btnSave = document.getElementById("btnSave");
const btnLoad = document.getElementById("btnLoad");

const windowDiv = document.getElementById("windowDiv");
const gameDiv = document.getElementById("gameDiv");
const menuDiv = document.getElementById("menuDiv");

const dealersCardsDiv = document.getElementById("dealersCards");
const playersCardsDiv = document.getElementById("playersCards");

const roundSpan = document.getElementById("roundSpan");

btnNewGame.addEventListener("click", () => {
  const game = new Game(
    windowDiv,
    menuDiv,
    gameDiv,
    btnHit,
    btnStay,
    btnDoubleDown,
    btnSave,
    btnLoad,
    dealersCardsDiv,
    playersCardsDiv,
    roundSpan,
    1000
  );
});
