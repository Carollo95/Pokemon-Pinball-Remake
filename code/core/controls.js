const LEFT_BUTTON_KEY = 'a'; //Key for the movemenet of the left flipper
const RIGHT_BUTTON_KEY = 'l'; //Key for the movemenet of the right flipper
const CENTER_BUTTON_KEY = ' '; //Key for the pressing of the accept button
const CANCEL_BUTTON_KEY = 'Backspace'; //Key for the pressing of the cancel button

const CALLBACK_DELAY_MS = 200;

class Controls {
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

    createAcceptButton() {

        acceptButton.addEventListener("mousedown", () => {
            this.acceptButtonPressed = true;
        });
        acceptButton.addEventListener("mouseup", () => {
            this.acceptButtonPressed = false;
        });
        acceptButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.acceptButtonPressed = true;
        }, { passive: false });
        acceptButton.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.acceptButtonPressed = false;
        }, { passive: false });

    }

    createCancelButton() {

        cancelButton.addEventListener("mousedown", () => {
            this.cancelButtonPressed = true;
        });
        cancelButton.addEventListener("mouseup", () => {
            this.cancelButtonPressed = false;
        });
        cancelButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.cancelButtonPressed = true;
        }, { passive: false });
        cancelButton.addEventListener("touchend", (e) => {
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