export class Screen {
  setGameWindowFull(windowDiv) {
    windowDiv.classList.remove("col-8");
    windowDiv.classList.remove("offset-2");
    windowDiv.classList.remove("py-5");
    windowDiv.classList.add("col-12");
    windowDiv.classList.add("py-4");
  }

  hideElement(element) {
    element.classList.remove("d-flex");
    element.classList.add("d-none");
  }

  showElement(element) {
    element.classList.remove("d-none");
    element.classList.add("d-flex");
  }

  updateValues(game, player, dealer) {
    this.showCards(game, player);
    this.showCards(game, dealer);
    player.updateTotalCardsValue();
    dealer.updateTotalCardsValue();
    game.playersCardsTotalValueSpan.textContent = player.totalCardsValue;
    game.dealersCardsTotalValueSpan.textContent = dealer.totalCardsValue;
    game.balanceSpan.textContent = game.balance;
    game.betSpan.textContent = game.bet;
    game.roundSpan.textContent = game.round;
  }

  showCards(game, player) {
    let div;
    if (player.name === "player") {
      div = game.playersCardsDiv;
    }
    if (player.name === "dealer") {
      div = game.dealersCardsDiv;
    }
    div.innerHTML = "";
    player.hand.map((cardCode) => {
      if (cardCode === "AD") {
        div.innerHTML += `<div class="col-2">
        <img
        src="https://deckofcardsapi.com/static/img/aceDiamonds.png"
        alt="Ace Diamonds Card"
        class="img-fluid"
        />
        </div>`;
      } 
      else {
        div.innerHTML += `<div class="col-2">
        <img
        src="https://deckofcardsapi.com/static/img/${cardCode}.png"
        alt="${cardCode} Card"
        class="img-fluid"
        />
        </div>`;
      }
    });
  }
}
