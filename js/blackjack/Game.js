import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Screen } from "./Screen.js";
import { Saving } from "./Saving.js";
import { History } from "./History.js";
import { Action } from "./Action.js";

export const GAMESTATE = {
  BET: 0,
  PLAY: 1,
  ROUND_END: 2
}

export class Game {
  constructor(
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
    gameHistoryDiv,
    loadTopResults,
    initialBalance = 1000,
    bet = 0,
    round = 0,
    deckId = "",
    gamestate = GAMESTATE.BET
  ) {
    this.gameLoaded = gameLoaded;
    this.windowDiv = windowDiv;
    this.menuDiv = menuDiv;
    this.gameDiv = gameDiv;
    this.roundResultDiv = roundResultDiv;
    this.endGameDiv = endGameDiv;
    this.betInputDiv = betInputDiv;

    this.btnHit = btnHit;
    this.btnStay = btnStay;
    this.btnDoubleDown = btnDoubleDown;
    this.btnTopResults = btnTopResults;
    this.btnSave = btnSave;
    this.btnLoad = btnLoad;
    this.btnHistory = btnHistory;
    this.btnReset = btnReset;
    this.btnNextRound = btnNextRound;
    this.btnPlayAgain = btnPlayAgain;
    this.btnTakeBet = btnTakeBet;

    this.dealersCardsDiv = dealersCardsDiv;
    this.playersCardsDiv = playersCardsDiv;

    this.balanceSpan = balanceSpan;
    this.betSpan = betSpan;
    this.roundSpan = roundSpan;
    this.dealersCardsTotalValueSpan = dealersCardsTotalValueSpan;
    this.playersCardsTotalValueSpan = playersCardsTotalValueSpan;

    this.roundResultSpan = roundResultSpan;
    this.endGameBalanceSpan = endGameBalanceSpan;
    this.betInputBalanceSpan = betInputBalanceSpan;

    this.betInput = betInput;
    this.gameHistoryDiv = gameHistoryDiv;

    this.loadTopResults = loadTopResults;

    this.initialBalance = initialBalance;
    this.balance = initialBalance;
    this.bet = bet;
    this.round = round;
    this.doubleDownUsed = false;

    this.screen = new Screen();
    this.saving = new Saving();
    this.player = new Player("player");
    this.dealer = new Player("dealer");
    this.history = new History(this);
    this.action = new Action(this);

    this.gamestate = gamestate;

    this.deck = new Deck(this, deckId);
    this.disableGameButtons();
    this.addListeners();
    this.screen.showElement(this.gameDiv);
    this.gameLoaded ? this.saving.loadGame(this) : this.takeBet();
  }

  startGame = async () => {
    if (!this.gameLoaded) await this.deck.getNewDeckId();
    if (!this.gameLoaded) this.history.clearHistory();
    await this.startRound();
    this.screen.showElement(this.gameDiv);
  };

  restartGame = async () => {
    this.btnPlayAgain.disabled = true;
    this.round = 0;
    this.balance = this.initialBalance;
    this.player.hand.length = 0;
    this.dealer.hand.length = 0;
    this.screen.updateValues(this, this.player, this.dealer);
    this.history.clearHistory();
    await this.deck.shuffle();
    this.takeBet();
    this.screen.hideElement(this.endGameDiv);
    this.screen.hideElement(this.roundResultDiv);
  };

  startRound = async () => {
    this.gamestate = GAMESTATE.PLAY;
    this.btnNextRound.disabled = true;
    this.doubleDownUsed = false;
    this.player.hand.length = 0;
    this.dealer.hand.length = 0;
    this.round += 1;
    this.balance -= this.bet;
    await this.deck.drawCards(2, this.dealer);
    await this.deck.drawCards(2, this.player);
    this.screen.hideElement(this.betInputDiv);
    this.screen.updateValues(this, this.player, this.dealer);
    this.enableGameButtons();
    if (this.balance < this.bet) this.btnDoubleDown.disabled = true;
  };

  takeBet = () => {
    this.gamestate = GAMESTATE.BET;
    if (this.round === 5 || this.balance < 100) {
      this.endGame();
      return;
    }
    this.screen.hideElement(this.menuDiv);
    this.screen.hideElement(this.roundResultDiv);
    this.screen.setGameWindowFull(this.windowDiv);
    this.betInputBalanceSpan.textContent = this.balance;
    this.betInput.max = this.balance;
    this.betInput.addEventListener("change", (e) => this.handleBetInput(e));
    this.btnTakeBet.addEventListener("click", this.handleTakeBetButton);
    this.btnTakeBet.disabled = false;
    this.screen.showElement(this.betInputDiv);
  };

  handleBetInput = (e) => {
    if (e.target.value < 100) e.target.value = 100;
    if (e.target.value > this.balance) e.target.value = this.balance;
    if (e.target.value % 10 !== 0)
      e.target.value = e.target.value - (e.target.value % 10);
  };

  handleTakeBetButton = () => {
    this.btnTakeBet.disabled = true;
    this.bet = parseInt(this.betInput.value);
    if (this.bet > this.balance) this.bet = this.balance;
    if (this.round === 0) {
      this.startGame();
    } else {
      this.startRound();
    }
  };

  endGame = () => {
    this.btnNextRound.disabled = true;
    this.disableGameButtons();
    this.endGameBalanceSpan.textContent = this.balance;
    this.screen.hideElement(this.roundResultDiv);
    this.screen.showElement(this.endGameDiv);
    this.saving.saveResult(this.balance);
    setTimeout(() => {this.btnPlayAgain.disabled = false}, 2000)
  }

  endRound = () => {
    this.gamestate = GAMESTATE.ROUND_END;
    this.disableGameButtons();
    let msg = "";
    switch (this.checkWinner()) {
      case "dealer":
        msg = "You lose";
        break;
      case "draw":
        msg = "It's a draw";
        this.balance += this.bet;
        break;
      case "player":
        msg = "You win";
        this.balance += 1.5 * this.bet;
        break;
    }
    this.bet = 0;
    this.roundResultSpan.textContent = msg;
    this.history.addRoundToHistory();
    this.screen.showElement(this.roundResultDiv);
  }

  checkWinner = () => {
    if (this.player.hand.length === 5 && this.player.totalCardsValue <= 21) {
      return "player";
    }
    if (
      this.player.totalCardsValue > this.dealer.totalCardsValue &&
      this.player.totalCardsValue <= 21
    ) {
      return "player";
    }
    if (this.dealer.totalCardsValue > 21 && this.player.totalCardsValue <= 21) {
      return "player";
    }
    if (
      this.player.totalCardsValue === this.dealer.totalCardsValue &&
      this.player.totalCardsValue <= 21
    ) {
      return "draw";
    }
    if (
      this.dealer.totalCardsValue > this.player.totalCardsValue &&
      this.dealer.totalCardsValue <= 21
    ) {
      return "dealer";
    }
    if (this.player.totalCardsValue > 21 && this.dealer.totalCardsValue <= 21) {
      return "dealer";
    }
  }

  disableGameButtons = () => {
    this.btnHit.disabled = true;
    this.btnStay.disabled = true;
    this.btnDoubleDown.disabled = true;
    this.btnPlayAgain.disabled = true;
    localStorage.topScore ? this.btnTopResults.disabled = false : this.btnTopResults.disabled = true;
    localStorage.save ? this.btnLoad.disabled = false : btnLoad.disabled = true;
  }

  enableGameButtons = () => {
    this.btnHit.disabled = false;
    this.btnStay.disabled = false;
    this.btnDoubleDown.disabled = false;
    this.btnNextRound.disabled = false;
    this.btnPlayAgain.disabled = false;
    this.btnHistory.disabled = false;
    this.btnReset.disabled = false;
  }

  addListeners = () => {
    this.btnHit.addEventListener("click", this.action.hit);
    this.btnStay.addEventListener("click", this.action.stay);
    this.btnDoubleDown.addEventListener("click", this.action.doubleDown);
    this.btnTopResults.addEventListener("click", this.loadTopResults)
    this.btnNextRound.addEventListener("click", this.takeBet);
    this.btnPlayAgain.addEventListener("click", this.restartGame);
    this.btnSave.addEventListener("click", () => this.saving.saveGame(this));
    this.btnLoad.addEventListener("click", () => this.saving.loadGame(this));
    this.btnHistory.addEventListener("click", this.history.showHistory);
    this.btnReset.addEventListener("click", this.restartGame);
  }
}
