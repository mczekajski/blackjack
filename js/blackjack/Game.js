import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Screen } from "./Screen.js";

export class Game {
  constructor(
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
    initialBalance
  ) {
    this.windowDiv = windowDiv;
    this.menuDiv = menuDiv;
    this.gameDiv = gameDiv;

    this.btnHit = btnHit;
    this.btnStand = btnStand;
    this.btnDoubleDown = btnDoubleDown;
    this.btnSave = btnSave;
    this.btnLoad = btnLoad;
    this.dealersCardsDiv = dealersCardsDiv;
    this.playersCardsDiv = playersCardsDiv;

    this.round = 1;
    this.bet = 0;

    this.screen = new Screen();
    this.player = new Player("player", initialBalance);
    this.dealer = new Player("dealer");

    this.deck = new Deck(this);
    this.startGame(this.screen, this.deck);
  }

  startGame(screen, deck) {
    screen.hideElement(menuDiv);
    screen.setGameWindowFull(this.windowDiv);
    screen.showElement(this.gameDiv);
  }

  startRound() {
    this.player.hand.length = 0;
    this.dealer.hand.length = 0;
    this.deck.drawCards(2, this.player);
    this.deck.drawCards(2, this.dealer);
  }
}
