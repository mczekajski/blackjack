import { GAMESTATE } from "./Game.js";

export class Saving {
  constructor() {}

  saveGame = (game) => {
    localStorage.setItem(
      "save",
      JSON.stringify({
        balance: game.balance,
        round: game.round,
        bet: game.bet,
        player: {
          hand: game.player.hand,
        },
        dealer: {
          hand: game.dealer.hand,
        },
        buttons: {
          hit: {
            disabled: game.btnHit.disabled,
          },
          stay: {
            disabled: game.btnStay.disabled,
          },
          doubleDown: {
            disabled: game.btnDoubleDown.disabled,
          },
        },
        deckId: game.deck.deckId,
        gamestate: game.gamestate,
      })
    );
    game.btnLoad.disabled = false;
  };

  loadGame = (game) => {
    game.screen.hideElement(game.menuDiv);
    game.screen.setGameWindowFull(game.windowDiv);
    const save = JSON.parse(localStorage.save);
    const {
      balance,
      round,
      bet,
      player,
      dealer,
      buttons,
      deckId,
      gamestate,
    } = save;
    game.balance = balance;
    game.round = round;
    game.bet = bet;
    game.player.hand = player.hand;
    game.dealer.hand = dealer.hand;
    game.btnHit.disabled = buttons.hit.disabled;
    game.btnStay.disabled = buttons.stay.disabled;
    game.btnDoubleDown.disabled = buttons.doubleDown.disabled;
    game.deck.deckId = deckId;
    game.gamestate = gamestate;
    switch (gamestate) {
      case GAMESTATE.BET:
        game.screen.updateValues(game, game.player, game.dealer);
        game.takeBet();
        break;
      case GAMESTATE.PLAY:
        game.screen.updateValues(game, game.player, game.dealer);
        game.screen.hideElement(game.betInputDiv);
        game.screen.hideElement(game.roundResultDiv);
        game.screen.hideElement(game.endGameDiv);
        break;
      case GAMESTATE.ROUND_END:
        game.screen.updateValues(game, game.player, game.dealer);
        game.endRound();
        break;
      default:
        game.screen.updateValues(game, game.player, game.dealer);
        game.startRound();
        break;
    }
  };

  saveResult = (balance) => {
    let results = [];
    if (localStorage.topScore) results = JSON.parse(localStorage.topScore);
    const result = {
      date: this.getSaveDate(),
      balance: balance,
    };
    results.push(result);
    localStorage.setItem("topScore", JSON.stringify(results));
  };

  getSaveDate() {
    const d = new Date();
    return d.toLocaleString();
  }

  loadHistory = () => {
      console.log("loading game history");
  }
}
