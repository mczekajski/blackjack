export class Deck {
  constructor(game) {
    this.game = game;
    this.id = "";
  }

  getNewDeckId = async () => {
    const resp = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
    )
      .then((res) => res.json())
      .then((data) => (this.id = data.deck_id))
      .catch(() => this.getNewDeckId());
  };

  drawCards = async (cardsNumber, player) => {
    await fetch(
      `https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=${cardsNumber}`
    )
      .then((res) => res.json())
      .then((data) => data.cards.forEach((card) => player.hand.push(card.code)))
      .catch(() => this.drawCards(cardsNumber, player));
  };

  shuffle = async () => {
    await fetch(`https://deckofcardsapi.com/api/deck/${this.id}/shuffle/`)
      .then((res) => res.json())
      .then((data) => data.shuffled)
      .catch(error => console.log(error));
  };
}
