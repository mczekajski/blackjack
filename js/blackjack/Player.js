export class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.totalCardsValue = 0;
    }

    updateTotalCardsValue() {
        this.totalCardsValue = this.countTotalCardsValue();
    }

    countTotalCardsValue() {
        if (this.hand.length === 0) return 0;
        if (this.hand.filter(card => card[0] === 'A').length === 2 && this.hand.length === 2) {
            return 21;
        }
        const cards = this.hand.map(card => {
            if (['K', 'Q', 'J', '0'].includes(card[0])) {
                return 10;
            }
            if (this.hand.length === 2 && card[0] === 'A') {
                return 11;
            }
            if (this.hand.length > 2 && card[0] === 'A') {
                return 1;
            }
            return parseInt(card[0]); 
        });
        return cards.reduce(function(sum, weight) {
            return parseInt(sum) + parseInt(weight);
        });
    }
}