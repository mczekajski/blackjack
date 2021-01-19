export class Action {
  constructor(game) {
    this.game = game;
  }
  hit = async () => {
    if (this.game.doubleDownUsed) {
      this.game.btnHit.disabled = true;
    }
    this.game.btnDoubleDown.disabled = true;
    await this.game.deck.drawCards(1, this.game.player);
    this.game.screen.updateValues(this.game, this.game.player, this.game.dealer);
    if (this.game.player.totalCardsValue >= 21 || this.game.player.hand.length === 5)
      this.game.endRound();
  };

  stay = async () => {
    if (this.game.dealer.totalCardsValue < 17) {
      await this.game.deck.drawCards(1, this.game.dealer);
      this.game.screen.updateValues(this.game, this.game.player, this.game.dealer);
      if (this.game.dealer.totalCardsValue < 17) {
        setTimeout(this.game.stay, 500);
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
