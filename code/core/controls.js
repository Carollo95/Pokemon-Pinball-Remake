const LEFT_BUTTON_KEY = 'a'; //Key for the movemenet of the left flipper
const RIGHT_BUTTON_KEY = 'l'; //Key for the movemenet of the right flipper
const CENTER_BUTTON_KEY = ' '; //Key for the pressing of the center button

class Controls {


    constructor(leftButtonCallback = () => { }, centerButtonCallback = () => { }, rightButtonCallback = () => { }) {
        this.createHtmlButtonControls();

        this.leftButtonCallback = leftButtonCallback;
        this.centerButtonCallback = centerButtonCallback;
        this.rightButtonCallback = rightButtonCallback;
    }

    update(){
        if (this.isLeftButtonAction()) {
            this.leftButtonCallback();
        }
        
        if (this.isRightButtonAction()) {
            this.rightButtonCallback();
        }

        if (this.isCenterButtonAction()) {
            this.centerButtonCallback();
        }
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