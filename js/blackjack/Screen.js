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
    player.hand.map(cardCode => {
        div.innerHTML += 
        `<div class="col-2">
        <img
        src="https://deckofcardsapi.com/static/img/${cardCode}.png"
        alt=""
        class="img-fluid"
        />
        </div>`
    })
  }
}
