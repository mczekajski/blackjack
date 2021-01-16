export class Deck {
  constructor(game) {
    this.game = game;
    this.id = "";
    this.getNewDeckId();
  }

  getNewDeckId() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((res) => res.json())
      .then((data) => (this.id = data.deck_id))
      .then(() => this.game.startRound());
  }

  drawCards(cardsNumber, player) {
    fetch(
      `https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=${cardsNumber}`
    )
      .then((res) => res.json())
      .then((data) => data.cards.forEach((card) => player.hand.push(card.code))).then(() => this.game.screen.showCard(this.game, player))
  }

  shuffle() {
    fetch(`https://deckofcardsapi.com/api/deck/${this.id}/shuffle/`)
      .then((res) => res.json())
      .then((data) => data.shuffled);
  }
}
