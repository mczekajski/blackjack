export class History {
    constructor(game) {
        this.game = game;
        this.history = [];
    }

    addRoundToHistory = () => {
        const round = {
            round: this.game.round,
            playersCards: [...this.game.player.hand],
            dealersCards: [...this.game.dealer.hand],
            winner: this.game.checkWinner()
        };
        this.history.push(round);
    }

    showHistory = () => {
        let roundHistoryHTML = "";
        this.history.map(round => {
            roundHistoryHTML = roundHistoryHTML + `
            <h5>Round: ${round.round}</h5>
            <p class="mb-1">Winner: <span style="text-transform: capitalize">${round.winner}</span></p>
            <small>Dealer's cards:</small>
            <p class="mb-1">${round.dealersCards.join(' ')}</p>
            <small>Player's cards:</small>
            <p class="mb-3">${round.playersCards.join(' ')}</p>
            `
        })
        if (this.history.length) this.game.gameHistoryDiv.innerHTML = roundHistoryHTML;
    }

    clearHistory = () => {
        this.game.gameHistoryDiv.innerHTML = "";
        this.history = [];
    }
}