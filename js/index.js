import { Game } from "./blackjack/Game.js";

const btnNewGame = document.getElementById("btnNewGame");
const btnLoadGame = document.getElementById("btnLoadGame");
const btnTopScore = document.getElementById("btnTopScore");

const windowDiv = document.getElementById("windowDiv");
const menuDiv = document.getElementById("menuDiv");
const gameDiv = document.getElementById("gameDiv");
const roundResultDiv = document.getElementById("roundResultDiv");
const endGameDiv = document.getElementById("endGameDiv");
const betInputDiv = document.getElementById("betInputDiv");

const btnHit = document.getElementById("btnHit");
const btnStay = document.getElementById("btnStay");
const btnDoubleDown = document.getElementById("btnDoubleDown");
const btnSave = document.getElementById("btnSave");
const btnLoad = document.getElementById("btnLoad");
const btnNextRound = document.getElementById("btnNextRound");
const btnPlayAgain = document.getElementById("btnPlayAgain");
const btnTakeBet = document.getElementById("btnTakeBet");

const dealersCardsDiv = document.getElementById("dealersCards");
const playersCardsDiv = document.getElementById("playersCards");

const balanceSpan = document.getElementById("balanceSpan");
const betSpan = document.getElementById("betSpan");
const roundSpan = document.getElementById("roundSpan");
const dealersCardsTotalValueSpan = document.getElementById("dealersCardsTotalValueSpan");
const playersCardsTotalValueSpan = document.getElementById("playersCardsTotalValueSpan");

const roundResultSpan = document.getElementById("roundResultSpan");
const endGameBalanceSpan = document.getElementById("endGameBalanceSpan");
const betInputBalanceSpan = document.getElementById("betInputBalanceSpan");

const betInput = document.getElementById("betInput");

let gameLoaded = false;

const loadGame = () => {
  gameLoaded = true;
  createGame();
}

const showTopScore = () => {
  console.log('topscores');
  localStorage.topScore ? console.log(localStorage.topScore) : console.log('There is no TopScore yet');
}

const addListeners = () => {
  btnNewGame.addEventListener('click', createGame);
  btnLoadGame.addEventListener('click', loadGame);
  btnTopScore.addEventListener('click', showTopScore);
}

const disableMenuButtons = () => {
  btnNewGame.disabled = true;
  btnLoadGame.disabled = true;
  btnTopScore.disabled = true;
}

const disableNonActiveButtons = () => {
  localStorage.topScore ? btnTopScore.disabled = false : btnTopScore.disabled = true;
  localStorage.save ? btnLoadGame.disabled = false : btnLoadGame.disabled = true;
}

const createGame = () => {
  disableMenuButtons();
  new Game(
    gameLoaded,
    windowDiv,
    menuDiv,
    gameDiv,
    roundResultDiv,
    endGameDiv,
    betInputDiv,
    btnHit,
    btnStay,
    btnDoubleDown,
    btnSave,
    btnLoad,
    btnNextRound,
    btnPlayAgain,
    btnTakeBet,
    dealersCardsDiv,
    playersCardsDiv,
    balanceSpan,
    betSpan,
    roundSpan,
    dealersCardsTotalValueSpan,
    playersCardsTotalValueSpan,
    roundResultSpan,
    endGameBalanceSpan,
    betInputBalanceSpan,
    betInput,
    showTopScore,
    1000
  );
}

disableNonActiveButtons();
addListeners();



