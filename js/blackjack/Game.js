export class Game {
    GAME_STATE = {
        MENU: 0,
        RUNNING: 1,
        TOPSCORE: 2
    }

    constructor(windowDiv, menuDiv, gameDiv) {
        this.windowDiv = windowDiv;
        this.menuDiv = menuDiv;
        this.gameDiv = gameDiv;
        this.gamestate = this.GAME_STATE.RUNNING;
        this.balance = 1000;

        console.log("New game starts!");
        this.hideElement(menuDiv);
        this.setFullWindow();
    }

    startGame() {
        this.hideElement(menuDiv);
        this.setFullWindow();
    }

    setFullWindow() {
        this.windowDiv.classList.remove('col-8');
        this.windowDiv.classList.remove('offset-2');
        this.windowDiv.classList.add('col-12');
        this.windowDiv.style.height = "80vh";
    }

    hideElement(element) {
        console.log("hiding");
        element.classList.remove('d-flex');
        element.classList.add('d-none');
    } 

    showElement(element) {
        console.log("showing");
        element.classList.remove('d-none');
        element.classList.add('d-flex');
    }
}