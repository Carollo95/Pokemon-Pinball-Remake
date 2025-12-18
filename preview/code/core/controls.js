const LEFT_BUTTON_KEY = 'a'; //Key for the movemenet of the left flipper
const RIGHT_BUTTON_KEY = 'l'; //Key for the movemenet of the right flipper
const CENTER_BUTTON_KEY = ' '; //Key for the pressing of the center button

class Controls {
    constructor(leftIsPressedCallback = () => { }, centerIsPressedCallback = () => { }, rightIsPressedCallback = () => { },
        leftPressCallback = () => { }, centerPressCallback = () => { }, rightPressCallback = () => { }) {
        this.createHtmlButtonControls();

        this.leftIsPressedCallback = leftIsPressedCallback;
        this.centerIsPressedCallback = centerIsPressedCallback;
        this.rightIsPressedCallback = rightIsPressedCallback;

        this.leftPressCallback = leftPressCallback;
        this.centerPressCallback = centerPressCallback;
        this.rightPressCallback = rightPressCallback;

        this._leftDownPrev = false;
        this._rightDownPrev = false;
        this._centerDownPrev = false;
    }

    update() {
        const leftDown = this.isLeftButtonAction();
        if (leftDown) {
            if (!this._leftDownPrev) this.leftPressCallback();
            else this.leftButtonCallback();
        }
        this._leftDownPrev = leftDown;

        const rightDown = this.isRightButtonAction();
        if (rightDown) {
            if (!this._rightDownPrev) this.rightPressCallback();
            else this.rightButtonCallback();
        }
        this._rightDownPrev = rightDown;

        const centerDown = this.isCenterButtonAction();
        if (centerDown) {
            if (!this._centerDownPrev) this.centerPressCallback();
            else this.centerButtonCallback();
        }
        this._centerDownPrev = centerDown;
    }

    createHtmlButtonControls() {
        this.createLeftButton();
        this.createCenterButton();
        this.createRightButton();

        document.addEventListener("mouseup", () => {
            this.leftButtonPressed = false;
            this.rightButtonPressed = false;
            this.centerButtonPressed = false;
        });
        document.addEventListener("touchend", () => {
            this.leftButtonPressed = false;
            this.rightButtonPressed = false;
            this.centerButtonPressed = false;
        });
    }

    createLeftButton() {
        leftButton.addEventListener("mousedown", () => {
            this.leftButtonPressed = true;
        });
        leftButton.addEventListener("mouseup", () => {
            this.leftButtonPressed = false;
        });
        leftButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.leftButtonPressed = true;
        }, { passive: false });
        leftButton.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.leftButtonPressed = false;
        }, { passive: false });
    }

    createRightButton() {
        rightButton.addEventListener("mousedown", () => {
            this.rightButtonPressed = true;
        });
        rightButton.addEventListener("mouseup", () => {
            this.rightButtonPressed = false;
        });
        rightButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.rightButtonPressed = true;
        }, { passive: false });
        rightButton.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.rightButtonPressed = false;
        }, { passive: false });
    }

    createCenterButton() {

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

    }

    isLeftButtonAction() {
        return kb.pressing(LEFT_BUTTON_KEY) || this.leftButtonPressed;
    }

    isRightButtonAction() {
        return kb.pressing(RIGHT_BUTTON_KEY) || this.rightButtonPressed;
    }

    isCenterButtonAction() {
        return kb.pressing(CENTER_BUTTON_KEY) || this.centerButtonPressed;
    }
}