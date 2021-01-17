import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Screen } from "./Screen.js";

export class Game {
  constructor(
    windowDiv,
    menuDiv,
    gameDiv,
    roundResultDiv,
    btnHit,
    btnStay,
    btnDoubleDown,
    btnSave,
    btnLoad,
    btnNextRound,
    dealersCardsDiv,
    playersCardsDiv,
    balanceSpan,
    betSpan,
    roundSpan,
    dealersCardsTotalValueSpan,
    playersCardsTotalValueSpan,
    roundResultSpan,
    initialBalance,
    bet = 100,
    round = 0
  ) {
    this.windowDiv = windowDiv;
    this.menuDiv = menuDiv;
    this.gameDiv = gameDiv;
    this.roundResultDiv = roundResultDiv;

    this.btnHit = btnHit;
    this.btnStay = btnStay;
    this.btnDoubleDown = btnDoubleDown;
    this.btnSave = btnSave;
    this.btnLoad = btnLoad;
    this.btnNextRound = btnNextRound;

    this.dealersCardsDiv = dealersCardsDiv;
    this.playersCardsDiv = playersCardsDiv;

    this.balanceSpan = balanceSpan;
    this.betSpan = betSpan;
    this.roundSpan = roundSpan;
    this.dealersCardsTotalValueSpan = dealersCardsTotalValueSpan;
    this.playersCardsTotalValueSpan = playersCardsTotalValueSpan;

    this.roundResultSpan = roundResultSpan;

    this.balance = initialBalance;
    this.bet = bet;
    this.round = round;
    this.doubleDownUsed = false;

    this.screen = new Screen();
    this.player = new Player("player");
    this.dealer = new Player("dealer");

    this.deck = new Deck(this);
    this.startGame(this.screen);
  }

  startGame = async (screen) => {
    await this.deck.getNewDeckId();
    await this.startRound();
    screen.hideElement(menuDiv);
    screen.setGameWindowFull(this.windowDiv);
    this.addListeners();
    screen.showElement(this.gameDiv);
  };

  startRound = async () => {
    this.btnNextRound.disabled = true;
    this.doubleDownUsed = false;
    this.player.hand.length = 0;
    this.dealer.hand.length = 0;
    this.round += 1;
    this.balance -= this.bet;
    await this.deck.drawCards(2, this.dealer);
    await this.deck.drawCards(2, this.player);
    this.screen.hideElement(this.roundResultDiv);
    this.screen.updateValues(this, this.player, this.dealer);
    this.enableGameButtons();
  };

  endRound() {
    this.disableGameButtons();
    let msg = "";
    switch (this.checkWinner()) {
      case 'dealer':
        msg = 'You lose';
        break;
      case 'draw':
        msg = 'It\'s a draw';
        break;
      case 'player':
        msg = 'You win';
        break;
    }
    this.roundResultSpan.textContent = msg;
  
    this.screen.showElement(this.roundResultDiv);
    this.btnNextRound.disabled = false;
  }

  checkWinner() {
    if (this.player.hand.length === 5 && this.player.totalCardsValue <= 21) {
      return 'player';
    }
    if (this.player.totalCardsValue > this.dealer.totalCardsValue && this.player.totalCardsValue <= 21) {
      return 'player';
    }
    if (this.dealer.totalCardsValue > 21 && this.player.totalCardsValue <= 21) {
      return 'player';
    }
    if (this.player.totalCardsValue === this.dealer.totalCardsValue && this.player.totalCardsValue <= 21) {
      return 'draw';
    }
    if (this.dealer.totalCardsValue > this.player.totalCardsValue && this.dealer.totalCardsValue <= 21) {
      return 'dealer';
    }
    if (this.player.totalCardsValue > 21 && this.dealer.totalCardsValue <= 21) {
      return 'dealer';
    }
  }

  disableGameButtons() {
    this.btnHit.disabled = true;
    this.btnStay.disabled = true;
    this.btnDoubleDown.disabled = true;  
  }

  enableGameButtons() {
    this.btnHit.disabled = false;
    this.btnStay.disabled = false;
    this.btnDoubleDown.disabled = false;
  }

  addListeners() {
    this.btnHit.addEventListener("click", this.hit);
    this.btnStay.addEventListener("click", this.stay);
    this.btnDoubleDown.addEventListener("click", this.doubleDown);
    this.btnNextRound.addEventListener("click", this.startRound);
  }

  // game action funcs:
  hit = async () => {
    if (this.doubleDownUsed) {
      this.btnHit.disabled = true;
    }
    this.btnDoubleDown.disabled = true;
    await this.deck.drawCards(1, this.player);
    this.screen.updateValues(this, this.player, this.dealer);
    if (this.player.totalCardsValue >= 21 || this.player.hand.length === 5)
      this.endRound();
  };

  stay = async () => {
    if (this.dealer.totalCardsValue < 17) {
      await this.deck.drawCards(1, this.dealer);
      this.screen.updateValues(this, this.player, this.dealer);
      if (this.dealer.totalCardsValue < 17) {
        setTimeout(this.stay, 500);
      } else {
        this.endRound();
      }
    } else {
      this.endRound();
    }
  };

  doubleDown = () => {
    this.doubleDownUsed = true;
    this.btnDoubleDown.disabled = true;
    this.balance -= this.bet;
    this.bet += this.bet;
    this.screen.updateValues(this, this.player, this.dealer);
  };
}
