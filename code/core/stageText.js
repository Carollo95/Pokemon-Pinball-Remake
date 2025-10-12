const BONUS_MAX_CHARS = 19;
const BONUS_STATUS_CHARS = 23;

const STAGE_MAX_CHARS = 23;
const STAGE_STATUS_CHARS = 27;

const TEXT_SCROLL_THRESHOLD_MILLIS = 100; // millis between movement while showing text
const DEFAULT_TEXT_PERSISTENCE_MILLIS = 10000; //Default millis to keep on screen the shown text

const STAGE_TEXT_STATE = {
    NONE: 0,
    STATUS: 1,
    TEXT: 2
}

const BANNER_TYPE = {
    STAGE: 0,
    BONUS_STAGE: 1
}

class StageStatusBanner {


    constructor(x, y, type, stageStatus) {
        this.type = type;
        this.textArray = new Array(this.getTextChars());
        this.statusArray = new Array(this.getStateChars());
        this.lastMovement = 0;
        this.textQueue = '';
        this.endTextDisplayMillis = 0;
        this.persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS;

        this.stageStatus = stageStatus;
        this.state = STAGE_TEXT_STATE.STATUS;

        this.createTextSprites(x, y);
        this.createStatusSprites(x, y);

        this.showStatus();

    }

    getTextChars() {
        return this.type === BANNER_TYPE.BONUS_STAGE ? BONUS_MAX_CHARS : STAGE_MAX_CHARS;
    }

    getStateChars() {
        return this.type === BANNER_TYPE.BONUS_STAGE ? BONUS_STATUS_CHARS : STAGE_STATUS_CHARS;
    }

    changeState(state) {
        this.state = state;
        this.setStatusArrayVisibility(state === STAGE_TEXT_STATE.STATUS);
        this.setTextArrayVisibility(state === STAGE_TEXT_STATE.TEXT);
    }

    createTextSprites(x, y) {
        for (var i = 0; i <= this.getTextChars(); i++) {
            this.textArray[i] = this.createTextSprite(x, y, i);
        }
    }

    createStatusSprites(x, y) {

        this.statusArray[0] = this.createStatusNumericSprite(x, y, 0, 0);
        this.statusArray[1] = this.createStatusNumericSprite(x, y, 1, 0);
        this.statusArray[2] = this.createStatusNumericSprite(x, y, 2, 0);
        this.statusArray[3] = this.createStatusSeparatorSprite(x, y, 3, 0);

        this.statusArray[4] = this.createStatusNumericSprite(x, y, 3, 1);
        this.statusArray[5] = this.createStatusNumericSprite(x, y, 4, 1);
        this.statusArray[6] = this.createStatusNumericSprite(x, y, 5, 1);
        this.statusArray[7] = this.createStatusSeparatorSprite(x, y, 6, 1);

        this.statusArray[8] = this.createStatusNumericSprite(x, y, 6, 2);
        this.statusArray[9] = this.createStatusNumericSprite(x, y, 7, 2);
        this.statusArray[10] = this.createStatusNumericSprite(x, y, 8, 2);
        this.statusArray[11] = this.createStatusSeparatorSprite(x, y, 9, 2);

        this.statusArray[12] = this.createStatusNumericSprite(x, y, 9, 3);
        this.statusArray[13] = this.createStatusNumericSprite(x, y, 10, 3);
        this.statusArray[14] = this.createStatusNumericSprite(x, y, 11, 3);
        this.statusArray[15] = this.createStatusSeparatorSprite(x, y, 12, 3);

        this.statusArray[16] = this.createStatusNumericSprite(x, y, 12, 4);
        this.statusArray[17] = this.createStatusNumericSprite(x, y, 13, 4);
        this.statusArray[18] = this.createStatusNumericSprite(x, y, 14, 4);
        this.statusArray[19] = this.createStatusNumericSprite(x, y, 15, 4);
        this.statusArray[20] = this.createStatusNumericSprite(x, y, 16, 4);
        this.statusArray[21] = this.createStatusNumericSprite(x, y, 17, 4);
        this.statusArray[22] = this.createStatusNumericSprite(x, y, 18, 4);

        if (this.type === BANNER_TYPE.STAGE) {
            this.statusArray[23] = this.createStatusNumericSprite(x, y, 19, 4);
            this.statusArray[24] = this.createStatusNumericSprite(x, y, 20, 4);
            this.statusArray[25] = this.createStatusNumericSprite(x, y, 21, 4);
            this.statusArray[26] = this.createStatusNumericSprite(x, y, 22, 4);
        }

    }

    createTextSprite(initialX, y, letterPadding) {
        return this.createCharacterSprite(initialX, y, (CHAR_SIZE * letterPadding));
    }


    createStatusNumericSprite(initialX, y, numericPadding, separatorPadding) {
        return this.createCharacterSprite(initialX, y, numericPadding * CHAR_SIZE + separatorPadding * SEPARATOR_SIZE, CHAR_SIZE);
    }

    createStatusSeparatorSprite(initialX, y, numericPadding, separatorPadding) {
        return this.createCharacterSprite(initialX, y, numericPadding * CHAR_SIZE + separatorPadding * SEPARATOR_SIZE - 6, SEPARATOR_SIZE, SEPARATOR_SIZE);

    }

    createCharacterSprite(x, y, padding, size = CHAR_SIZE) {
        return new StageCharacter(x - padding, y, size, CHAR_SIZE);
    }

    showStatus() {
        this.changeState(STAGE_TEXT_STATE.STATUS);
        text = this.createCapturedStatus() + this.createBallsStatus() + this.createThunderStatus() + this.createPointsStatus(), DEFAULT_TEXT_PERSISTENCE_MILLIS;
        text = text.split('').reverse().join('');
        for (var i = 0; i < this.getStateChars(); i++) {
            this.statusArray[i].changeAnimation("$" + text[i]);
        }
    }

    createCapturedStatus() {
        let captured;
        if (this.stageStatus.captured < 10) {
            captured = "ª" + this.stageStatus.captured.toString() + "  ";
        } else if (this.stageStatus.captured < 100) {
            captured = "ª" + this.stageStatus.captured.toString() + " ";
        } else if (this.stageStatus.captured > 999) {
            captured = "ª999";
        } else {
            captured = "ª" + this.stageStatus.captured.toString();
        }

        return captured;
    }

    createBallsStatus() {
        let balls;
        if (this.stageStatus.balls <= 0) {
            balls = "º0";
        } else if (this.stageStatus.balls > 9) {
            balls = "º9";
        } else {
            balls = "º" + (this.stageStatus.balls - 1).toString();
        }
        return balls;
    }

    createThunderStatus() {
        let thunder = " ";

        if (this.stageStatus.activeThunder) {
            thunder = "/";
        }

        return thunder;
    }

    createPointsStatus() {
        let points = this.stageStatus.points <= 999999999999 ? this.stageStatus.points.toString() : "999999999999";
        let withCommas = points.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return withCommas.padStart(this.getStateChars() - 7, ' ');
    }

    showText(text, persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS, callback = () => { }) {
        this.changeState(STAGE_TEXT_STATE.TEXT);

        text = text.replace(".", "$");
        this.clearTextImmediately();

        this.persistenceMillis = persistenceMillis;
        for (var i = 0; i < this.getStateChars(); i++) {
            this.statusArray[i].changeAnimation("$" + text[i]);
        }
    }

    setScrollText(text, persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS, callback = () => { }) {
        this.changeState(STAGE_TEXT_STATE.TEXT);
                
        text = text.replace(".", "$");
        this.clearTextImmediately();
        this.persistenceMillis = persistenceMillis;
        this.textQueue += text;
        this.callback = callback;
    }

    clearText() {
        this.setScrollText('                   ');
    }

    clearTextImmediately() {
        this.textQueue = '';
        this.textArray.forEach(element => {
            element.changeAnimation('$ ');
        });
    }


    hasPassedTextPersistence() {
        return (millis() - this.endTextDisplayMillis) > this.persistenceMillis;
    }

    draw() {
        if (this.state === STAGE_TEXT_STATE.TEXT) {
            if ((this.textQueue.length > 0)) {
                if ((millis() - this.lastMovement) > TEXT_SCROLL_THRESHOLD_MILLIS) {
                    this.lastMovement = millis();
                    this.scrollText();
                    this.endTextDisplayMillis = millis();
                }
            } else if (this.hasPassedTextPersistence()) {
                if (this.callback) this.callback();
                this.showStatus();
            }
        } else if (this.state === STAGE_TEXT_STATE.STATUS) {
            this.showStatus();
        }
    }

    scrollText() {
        for (var i = this.getTextChars(); i > 0; i--) {
            this.textArray[i].changeAnimation(this.textArray[i - 1].getAni().name);
        }
        this.textArray[0].changeAnimation('$' + this.textQueue[0]);
        this.textQueue = this.textQueue.substring(1);
    }



    setTextArrayVisibility(visible) {
        this.textArray.forEach(element => {
            element.setVisible(visible);
        });
    }

    setStatusArrayVisibility(visible) {
        this.statusArray.forEach(element => {
            element.setVisible(visible);
        });
    }

    hide() {
        this.changeState(STAGE_TEXT_STATE.NONE);
    }
}

function createBonusStageStatusBanner(stateStage) {
    return new StageStatusBanner(341, 380, BANNER_TYPE.BONUS_STAGE, stateStage);
}

function createStageStatusBanner(stateStage) {
    return new StageStatusBanner(376, 564, BANNER_TYPE.STAGE, stateStage);
}