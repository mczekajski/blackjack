import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Screen } from "./Screen.js";

export class Game {
  constructor(
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
    initialBalance
  ) {
    this.windowDiv = windowDiv;
    this.menuDiv = menuDiv;
    this.gameDiv = gameDiv;

    this.btnHit = btnHit;
    this.btnStay = btnStay;
    this.btnDoubleDown = btnDoubleDown;
    this.btnSave = btnSave;
    this.btnLoad = btnLoad;
    this.dealersCardsDiv = dealersCardsDiv;
    this.playersCardsDiv = playersCardsDiv;

    this.roundSpan = roundSpan;

    this.round = 1;
    this.bet = 0;

    this.screen = new Screen();
    this.player = new Player("player", initialBalance);
    this.dealer = new Player("dealer");

    this.deck = new Deck(this);
    this.startGame(this.screen);
  }

  startGame = async (screen) => {
    screen.hideElement(menuDiv);
    screen.setGameWindowFull(this.windowDiv);
    screen.showElement(this.gameDiv);
    await this.deck.getNewDeckId();
    await this.startRound();
    this.addListeners();
  }

  startRound = async () => {
    this.player.hand.length = 0;
    this.dealer.hand.length = 0;
    this.roundSpan.textContent = this.round;
    await this.deck.drawCards(2, this.dealer);
    await this.deck.drawCards(2, this.player);
    this.screen.showCards(this, this.dealer);
    this.screen.showCards(this, this.player);
  }

  addListeners() {
      this.btnHit.addEventListener('click', this.hit)
      this.btnStay.addEventListener('click', this.stay)
      this.btnDoubleDown.addEventListener('click', this.doubleDown)
  }

  hit = async () => {
    await this.deck.drawCards(1, this.player);
    this.screen.showCards(this, this.player);
  }

  stay() {
    console.log('stay');
  }

  doubleDown() {
    console.log(('ddown'));
  }
}
