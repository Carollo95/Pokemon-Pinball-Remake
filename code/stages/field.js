const FIELD_BONUS = {
    MOLE: "mole",
    GHOST: "ghost",
    CAT: "cat",
    SEAL: "seal",
    CLONE: "clone",
}

const TRAVEL_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
    CAVE: 'cave'
}

class Field extends Stage {
    constructor(status) {
        super(status);

        centerButton.addEventListener("mousedown", () => {
            this.centerButtonPressed = true;
        });
        centerButton.addEventListener("mouseup", () => {
            this.centerButtonPressed = false;
        });
        centerButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.centerButtonPressed = true;
        }, { passive: false });
        centerButton.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.centerButtonPressed = false;
        }, { passive: false });

        document.addEventListener("mouseup", () => {
            this.centerButtonPressed = false;
        });
        document.addEventListener("touchend", () => {
            this.centerButtonPressed = false;
        });

        this.centralButtonCallback = undefined;

    }


    draw() {
        super.draw();
        this.controlCentralButton();
    }


    controlCentralButton() {
        if (this.isCentralButtonAction()) {
            if (this.centralButtonCallback) this.centralButtonCallback();
        }
    }

    isCentralButtonAction() {
        return kb.pressing(CENTER_BUTTON_KEY) || this.centerButtonPressed;
    }


    setCentralButtonCallback(callback) {
        this.centralButtonCallback = callback;
    }

}