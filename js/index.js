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
const btnTopResults = document.getElementById("btnTopResults");
const btnSave = document.getElementById("btnSave");
const btnLoad = document.getElementById("btnLoad");
const btnHistory = document.getElementById("btnHistory");
const btnReset = document.getElementById("btnReset");
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
const topResultsDiv = document.getElementById("topResults");

let gameLoaded = false;

const loadGame = () => {
  gameLoaded = true;
  createGame();
}

const loadTopResults = () => {
  let topResultsData = JSON.parse(localStorage.topScore);
  let topResultsHTML = '';
  topResultsData = topResultsData.sort((a, b) => (a.balance > b.balance) ? -1 : 1)
  topResultsData.map((result) => {
    let resultHTML = `
    <h5>$${result.balance}</h5>
    <p><small>${result.date}</small></p>
    `;
    topResultsHTML = topResultsHTML + resultHTML;
  })
  topResultsDiv.innerHTML = topResultsHTML;
}

const addListeners = () => {
  btnNewGame.addEventListener('click', createGame);
  btnLoadGame.addEventListener('click', loadGame);
  btnTopScore.addEventListener('click', loadTopResults);
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
    btnTopResults,
    btnSave,
    btnLoad,
    btnHistory,
    btnReset,
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
    loadTopResults,
    1000
  );
}

disableNonActiveButtons();
addListeners();



