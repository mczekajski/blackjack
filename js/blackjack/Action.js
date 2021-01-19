export class Action {
  constructor(game) {
    this.game = game;
  }
  hit = async () => {
    this.game.btnHit.disabled = true;
    if (this.game.doubleDownUsed) {
      this.game.btnHit.disabled = true;
    }
    this.game.btnDoubleDown.disabled = true;
    await this.game.deck.drawCards(1, this.game.player);
    this.game.screen.updateValues(this.game, this.game.player, this.game.dealer);
    setTimeout(() => this.game.btnHit.disabled = false, 500);
    if (this.game.player.totalCardsValue >= 21 || this.game.player.hand.length === 5)
      this.game.endRound();
  };

  stay = async () => {
    this.game.btnDoubleDown.disabled = true;
    if (this.game.dealer.totalCardsValue < 17) {
      await this.game.deck.drawCards(1, this.game.dealer);
      this.game.screen.updateValues(this.game, this.game.player, this.game.dealer);
      if (this.game.dealer.totalCardsValue < 17) {
        setTimeout(this.game.action.stay, 500);
      } else {
        this.game.endRound();
      }
    } else {
      this.game.endRound();
    }
  };

  doubleDown = () => {
    this.game.doubleDownUsed = true;
    this.game.btnDoubleDown.disabled = true;
    this.game.balance -= this.game.bet;
    this.game.bet += this.game.bet;
    this.game.screen.updateValues(this.game, this.game.player, this.game.dealer);
  };
}
