const BONUS_MAX_CHARS = 19;
const BONUS_STATUS_CHARS = 23;

const STAGE_MAX_CHARS = 23;
const STAGE_STATUS_CHARS = 27;
const STAGE_TEXT_POINTS_CHARS = 24;

const TEXT_SCROLL_THRESHOLD_MILLIS = 100; // millis between movement while showing text
const DEFAULT_TEXT_PERSISTENCE_MILLIS = 3000; //Default millis to keep on screen the shown text
const DEFAULT_SHOW_TEXT_WITH_POINTS_PERSISTENCE_MILLIS = 2000; //Default millis to keep on screen the shown text with points

const STAGE_TEXT_STATE = {
    NONE: "none",
    STATUS: "status",
    TEXT: "text",
    TEXT_WITH_POINTS: "text_with_points"
}

const BANNER_TYPE = {
    STAGE: "stage",
    BONUS_STAGE: "bonus_stage"
}

//FIXME this class is a fucking mess
class StageStatusBanner {


    constructor(x, y, type, stageStatus) {
        this.type = type;
        this.textArray = new Array(this.getTextCharsLength());
        this.statusArray = new Array(this.getStateCharsLength());
        this.textWithPointsArray = new Array(this.getTextWithPointsCharsLength());
        this.lastMovement = 0;
        this.textQueue = '';
        this.endTextDisplayMillis = 0;
        this.persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS;

        this.stageStatus = stageStatus;
        this.state = STAGE_TEXT_STATE.STATUS;

        this.createTextSprites(x, y);
        this.createStatusSprites(x, y);
        this.createTextWithPointsSprites(x, y);

        this.showStatus();

        this.onlyPersistenceTimerStarted = false; // start persistence when only fixedPart remains
    }

    //Get char lengths
    getTextCharsLength() {
        return this.type === BANNER_TYPE.BONUS_STAGE ? BONUS_MAX_CHARS : STAGE_MAX_CHARS;
    }

    getStateCharsLength() {
        return this.type === BANNER_TYPE.BONUS_STAGE ? BONUS_STATUS_CHARS : STAGE_STATUS_CHARS;
    }

    getTextWithPointsCharsLength() {
        return STAGE_TEXT_POINTS_CHARS;
    }

    changeState(state) {
        this.state = state;
        this.setStatusArrayVisibility(state === STAGE_TEXT_STATE.STATUS);
        this.setTextWithPointsArrayVisibility(state === STAGE_TEXT_STATE.TEXT_WITH_POINTS);
        this.setTextArrayVisibility(state === STAGE_TEXT_STATE.TEXT);
    }

    //Create sprites
    createTextSprites(x, y) {
        for (var i = 0; i <= this.getTextCharsLength(); i++) {
            this.textArray[i] = this.createTextSprite(x, y, i);
        }
    }

    createTextWithPointsSprites(x, y) {

        for (let i = 0; i <= 5; i++) {
            this.textWithPointsArray[i] = this.createStatusNumericSprite(x, y, i, 0);
        }

        this.textWithPointsArray[6] = this.createStatusNumericSprite(x, y, 5, 0);
        this.textWithPointsArray[7] = this.createStatusNumericSprite(x, y, 6, 0);
        this.textWithPointsArray[8] = this.createStatusNumericSprite(x, y, 7, 0);
        this.textWithPointsArray[9] = this.createStatusSeparatorSprite(x, y, 8, 0);

        this.textWithPointsArray[10] = this.createStatusNumericSprite(x, y, 8, 1);
        this.textWithPointsArray[11] = this.createStatusNumericSprite(x, y, 9, 1);
        this.textWithPointsArray[12] = this.createStatusNumericSprite(x, y, 10, 1);
        this.textWithPointsArray[13] = this.createStatusSeparatorSprite(x, y, 11, 1);

        for (let i = 0; i <= 11; i++) {
            this.textWithPointsArray[i + 14] = this.createStatusNumericSprite(x, y, i + 11, 2);
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

    //Text handling
    /**
     * Show the status of the game
     */
    showStatus() {
        this.changeState(STAGE_TEXT_STATE.STATUS);
        text = this.createCapturedStatus() + this.createBallsStatus() + this.createThunderStatus() + this.createPointsStatus(), DEFAULT_TEXT_PERSISTENCE_MILLIS;
        text = text.split('').reverse().join('');
        for (var i = 0; i < this.getStateCharsLength(); i++) {
            this.statusArray[i].changeAnimation("$" + text[i]);
        }
    }

    createCapturedStatus() {
        let captured;
        if (this.stageStatus.captured.length < 10) {
            captured = "ª" + this.stageStatus.captured.length.toString() + "  ";
        } else if (this.stageStatus.captured.length < 100) {
            captured = "ª" + this.stageStatus.captured.length.toString() + " ";
        } else if (this.stageStatus.captured.length > 999) {
            captured = "ª999";
        } else {
            captured = "ª" + this.stageStatus.captured.length.toString();
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
        return withCommas.padStart(this.getStateCharsLength() - 7, ' ');
    }

    /**
     * Shows an alfanumeric text immediatly
     * @param {*} text 
     * @param {*} persistenceMillis 
     * @param {*} callback 
     */
    showText(text, persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS) {
        this.changeState(STAGE_TEXT_STATE.TEXT);

        text = this.centerPad(text.split('').reverse().join(''),this.getTextCharsLength()).replace(".", "$");
        this.clearTextImmediately();

        this.persistenceMillis = persistenceMillis;
        for (var i = 0; i < this.getTextCharsLength(); i++) {
            this.textArray[i].changeAnimation("$" + text[i]);
        }
    }

    /**
     * Shows a centered text with points
     * @param {*} text 
     * @param {*} points 
     * @param {*} persistenceMillis 
     * @param {*} callback 
     */
    showTextWithPoints(text, points, persistenceMillis = DEFAULT_SHOW_TEXT_WITH_POINTS_PERSISTENCE_MILLIS, callback = () => { }) {
        this.changeState(STAGE_TEXT_STATE.TEXT_WITH_POINTS);

        this.callback = callback;
        this.persistenceMillis = persistenceMillis;
        this.endTextDisplayMillis = millis();

        // Left part
        let left = (text ?? '').toString();
        if (left.length > 9) left = left.substring(0, 9);
        left = left.padStart(9, ' ');

        // Right part
        let pointsStr = points <= 99999999 ? points.toString() : "99999999";
        let withCommas = pointsStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let right = withCommas.padStart(10, ' ');

        let full = left + right + '      ';
        full = full.split('').reverse().join('');
        for (var i = 0; i < this.getTextWithPointsCharsLength(); i++) {
            this.textWithPointsArray[i].changeAnimation("$ ");
        }
        for (var i = 0; i < this.getTextWithPointsCharsLength(); i++) {
            this.textWithPointsArray[i].changeAnimation("$" + full[i]);
        }
    }

    /**
     * Sets the text to be scrolled
     * @param {*} text 
     * @param {*} fixedPart 
     * @param {*} persistenceMillis 
     * @param {*} callback 
     */
    setScrollText(text, fixedPart, persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS, callback = () => { }) {
        this.changeState(STAGE_TEXT_STATE.TEXT);

        if (text.length <= this.getTextCharsLength()) {
            text = this.centerPad(text, this.getTextCharsLength());
        }

        text = text.replace(".", "$");
        this.clearTextImmediately();
        this.persistenceMillis = persistenceMillis;
        this.textQueue += text;
        this.fixedPart = fixedPart === "" ? undefined : fixedPart;
        this.onlyPersistenceTimerStarted = false;
        this.callback = callback;
    }

    clearTextScrolling() {
        this.setScrollText('                   ', '');
    }

    clearTextImmediately() {
        this.textQueue = '';
        this.onlyPersistenceTimerStarted = false;
        this.textArray.forEach(element => {
            element.changeAnimation('$ ');
        });
    }


    hasPassedTextPersistence() {
        return (millis() - this.endTextDisplayMillis) > this.persistenceMillis;
    }

    draw() {
        if (this.state === STAGE_TEXT_STATE.TEXT) {
            this.drawTextState();
        } else if (this.state === STAGE_TEXT_STATE.STATUS) {
            this.showStatus();
        } else if (this.state === STAGE_TEXT_STATE.TEXT_WITH_POINTS) {
            if (this.hasPassedTextPersistence()) {
                if (this.callback) this.callback();
                this.showStatus();
            }
        }
    }

    drawTextState() {
        if ((this.textQueue.length > 0)) {
            this.scrollTextQueue();
        } else {
            if (!this.fixedPart) {
                // No fixedPart: pause showing the last frame for persistence, then blank out
                if (!this.onlyPersistenceTimerStarted) {
                    this.endTextDisplayMillis = millis();
                    this.onlyPersistenceTimerStarted = true;
                }
                if (this.hasPassedTextPersistence()) {
                    if (this.textArrayIsBlank()) {
                        if (this.callback) this.callback();
                        this.showStatus();
                    } else if (this.timeToScrollText()) {
                        this.scrollText(' ');
                    }
                }
            } else {
                // fixedPart present: keep scrolling blanks until only fixedPart remains
                if (!this.textArrayIsOnlyPersistence()) {
                    if (this.timeToScrollText()) {
                        this.scrollText(' ');
                        this.onlyPersistenceTimerStarted = false;
                    }
                    if(this.textArrayIsBlank()){
                        this.showStatus();
                    }
                } else {
                    if (!this.onlyPersistenceTimerStarted) {
                        this.endTextDisplayMillis = millis();
                        this.onlyPersistenceTimerStarted = true;
                    }
                    if (this.hasPassedTextPersistence()) {
                        if (this.textArrayIsBlank()) {
                            if (this.callback) this.callback();
                            this.showStatus();
                        } else if (this.timeToScrollText()) {
                            this.scrollText(' ');
                        }
                    }
                }
            }
        }
    }

    scrollTextQueue() {
        if (this.timeToScrollText()) {
            this.scrollText(this.textQueue);
            this.endTextDisplayMillis = millis();
            this.onlyPersistenceTimerStarted = false;
        }
    }

    textArrayIsOnlyPersistence() {
        if (!this.fixedPart) return false;
        const width = this.textArray.length;
        let persistence = this.centerPad(this.fixedPart, width)
            .split('')
            .reverse();
        if (persistence.length > width) persistence = persistence.slice(0, width);
        return this.textArray.every((ch, i) => ch?.getAni?.().name === ('$' + persistence[i]));
    }

    textArrayIsBlank() {
        return this.textArray.every(ch => ch?.getAni?.().name === '$ ');
    }

    timeToScrollText() {
        return millis() > (this.lastMovement + TEXT_SCROLL_THRESHOLD_MILLIS);
    }

    scrollText(textQueue) {
        const width = this.textArray.length;
        let textArrayEndWithFixedPart = false;
        if (this.fixedPart) {
            const ref = this.centerPad(this.fixedPart, width)
                .trimStart()
                .split('')
                .reverse();
            textArrayEndWithFixedPart = ref.every((ch, i) => this.textArray[i]?.getAni?.().name === ('$' + ch));
        }

        if (textArrayEndWithFixedPart) {
            const last = this.textArray.length - 1;
            // After persistence has elapsed, we are in the blanking phase: do a full scroll to push out fixedPart
            if (this.onlyPersistenceTimerStarted && this.hasPassedTextPersistence()) {
                for (let i = last; i > 0; i--) {
                    this.textArray[i].changeAnimation(this.textArray[i - 1].getAni().name);
                }
                this.textArray[0].changeAnimation('$ ');
                this.lastMovement = millis();
            } else {
                // Before persistence elapses: keep fixedPart static, scroll only the suffix
                const boundary = this.centerPad(this.fixedPart, width).trimStart().length;
                for (let i = last; i > boundary; i--) {
                    this.textArray[i].changeAnimation(this.textArray[i - 1].getAni().name);
                }
                if ((boundary < this.textArray.length)) {
                    this.textArray[boundary].changeAnimation('$ ');
                }
                this.lastMovement = millis();
            }
        } else {
            const last = this.textArray.length - 1;
            for (let i = last; i > 0; i--) {
                this.textArray[i].changeAnimation(this.textArray[i - 1].getAni().name);
            }
            const nextChar = (textQueue && textQueue.length > 0) ? textQueue[0] : ' ';
            this.textArray[0].changeAnimation('$' + nextChar);
            if (textQueue && textQueue.length > 0) {
                this.textQueue = textQueue.substring(1);
            }
            this.lastMovement = millis();
        }


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

    setTextWithPointsArrayVisibility(visible) {
        this.textWithPointsArray.forEach(element => {
            element.setVisible(visible);
        });
    }

    hide() {
        this.changeState(STAGE_TEXT_STATE.NONE);
    }


    centerPad(str, width) {
        width = width + 1;
        const s = String(str);
        const len = s.length;
        if (len >= width) return s;
        const right = Math.floor((width - len) / 2);
        const left = width - len - right;
        return ' '.repeat(left) + s + ' '.repeat(right);
    }

}

function createBonusStageStatusBanner(stateStage) {
    return new StageStatusBanner(341, 380, BANNER_TYPE.BONUS_STAGE, stateStage);
}

function createStageStatusBanner(stateStage) {
    return new StageStatusBanner(376, 564, BANNER_TYPE.STAGE, stateStage);
}