export class Player {
    constructor(name, balance = 0) {
        this.name = name;
        this.balance = balance;
        this.hand = [];
    }

    countTotalCardsValue() {
        console.log(this.hand);
    }
}