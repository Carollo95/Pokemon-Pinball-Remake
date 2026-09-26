const LEFT_BUTTON_KEY = 'a'; //Key for the movement of the left flipper
const RIGHT_BUTTON_KEY = 'l'; //Key for the movement of the right flipper
const CENTER_BUTTON_KEY = ' '; //Key for the pressing of the accept button
const CANCEL_BUTTON_KEY = 'Backspace'; //Key for the pressing of the cancel button

const CALLBACK_DELAY_MS = 200;

export class Controls {
    constructor(leftIsPressedCallback = () => { }, acceptIsPressedCallback = () => { }, rightIsPressedCallback = () => { },
        leftPressCallback = () => { }, acceptPressCallback = () => { }, rightPressCallback = () => { },
        cancelIsPressedCallback = () => { }, cancelPressCallback = () => { }) {
        this.createHtmlButtonControls();

        this.leftIsPressedCallback = leftIsPressedCallback;
        this.acceptIsPressedCallback = acceptIsPressedCallback;
        this.rightIsPressedCallback = rightIsPressedCallback;

        this.leftPressCallback = leftPressCallback;
        this.acceptPressCallback = acceptPressCallback;
        this.rightPressCallback = rightPressCallback;
        this.cancelIsPressedCallback = cancelIsPressedCallback;
        this.cancelPressCallback = cancelPressCallback;

        this._leftDownPrev = false;
        this._rightDownPrev = false;
        this._acceptDownPrev = false;
        this._cancelDownPrev = false;

        this._lastCallbackCall = 0;
        this.callbackDelay = CALLBACK_DELAY_MS;
    }

    setCallbackDelay(delay) {
        this.callbackDelay = delay;
    }

    update() {
        const leftDown = this.isLeftButtonAction();
        if (leftDown) {
            if (!this._leftDownPrev) this.leftPressCallback();
            else this.leftIsPressedCallback();
        }
        this._leftDownPrev = leftDown;

        const rightDown = this.isRightButtonAction();
        if (rightDown) {
            if (!this._rightDownPrev) this.rightPressCallback();
            else this.rightIsPressedCallback();
        }
        this._rightDownPrev = rightDown;

        const acceptDown = this.isAcceptButtonAction();
        if (acceptDown) {
            if (!this._acceptDownPrev) this.acceptPressCallback();
            else this.acceptIsPressedCallback();
        }
        this._acceptDownPrev = acceptDown;

        const cancelDown = this.isCancelButtonAction();
        if (cancelDown) {
            if (!this._cancelDownPrev) this.cancelPressCallback();
            else this.cancelIsPressedCallback();
        }
        this._cancelDownPrev = cancelDown;
    }

    createHtmlButtonControls() {
        this.createLeftButton();
        this.createAcceptButton();
        this.createCancelButton();
        this.createRightButton();

        document.addEventListener("mouseup", () => {
            this.leftButtonPressed = false;
            this.rightButtonPressed = false;
            this.acceptButtonPressed = false;
            this.cancelButtonPressed = false;
        });
        document.addEventListener("touchend", () => {
            this.leftButtonPressed = false;
            this.rightButtonPressed = false;
            this.acceptButtonPressed = false;
            this.cancelButtonPressed = false;
        });
    }

    createLeftButton() {
        document.getElementById("leftButton").addEventListener("mousedown", () => {
            this.leftButtonPressed = true;
        });
        document.getElementById("leftButton").addEventListener("mouseup", () => {
            this.leftButtonPressed = false;
        });
        document.getElementById("leftButton").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.leftButtonPressed = true;
        }, { passive: false });
        document.getElementById("leftButton").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.leftButtonPressed = false;
        }, { passive: false });
    }

    createRightButton() {
        document.getElementById("rightButton").addEventListener("mousedown", () => {
            this.rightButtonPressed = true;
        });
        document.getElementById("rightButton").addEventListener("mouseup", () => {
            this.rightButtonPressed = false;
        });
        document.getElementById("rightButton").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.rightButtonPressed = true;
        }, { passive: false });
        document.getElementById("rightButton").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.rightButtonPressed = false;
        }, { passive: false });
    }

    createAcceptButton() {

        document.getElementById("acceptButton").addEventListener("mousedown", () => {
            this.acceptButtonPressed = true;
        });
        document.getElementById("acceptButton").addEventListener("mouseup", () => {
            this.acceptButtonPressed = false;
        });
        document.getElementById("acceptButton").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.acceptButtonPressed = true;
        }, { passive: false });
        document.getElementById("acceptButton").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.acceptButtonPressed = false;
        }, { passive: false });

    }

    createCancelButton() {

        document.getElementById("cancelButton").addEventListener("mousedown", () => {
            this.cancelButtonPressed = true;
        });
        document.getElementById("cancelButton").addEventListener("mouseup", () => {
            this.cancelButtonPressed = false;
        });
        document.getElementById("cancelButton").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.cancelButtonPressed = true;
        }, { passive: false });
        document.getElementById("cancelButton").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.cancelButtonPressed = false;
        }, { passive: false });

    }

    isLeftButtonAction() {
        return kb.pressing(LEFT_BUTTON_KEY) || this.leftButtonPressed;
    }

    isRightButtonAction() {
        return kb.pressing(RIGHT_BUTTON_KEY) || this.rightButtonPressed;
    }

    isAcceptButtonAction() {
        return kb.pressing(CENTER_BUTTON_KEY) || this.acceptButtonPressed;
    }

    isCancelButtonAction() {
        return kb.pressing(CANCEL_BUTTON_KEY) || this.cancelButtonPressed;
    }

    hasControlCallbackTimePassed() {
        return millis() > (this._lastCallbackCall + this.callbackDelay);
    }

    restartPressCallback() {
        this._lastCallbackCall = millis();
    }

}
