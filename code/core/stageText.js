const CHAR_SIZE = 16;
const SEPARATOR_SIZE = 4;

const MAX_CHARS = 19;

const STATUS_CHARS = 23;

const TEXT_SCROLL_THRESHOLD_MILLIS = 100; // millis between movement while showing text
const DEFAULT_TEXT_PERSISTENCE_MILLIS = 10000; //Default millis to keep on screen the shown text

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '1234567890';

const STAGE_TEXT_STATE = {
    NONE: 0,
    STATUS: 1,
    TEXT: 2
}


class StageStatusBanner {


    constructor(x, y, stageStatus) {
        this.textArray = new Array(MAX_CHARS);
        this.statusArray = new Array(STATUS_CHARS);
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

    changeState(state) {
        this.state = state;
        this.setStatusArrayVisibility(state === STAGE_TEXT_STATE.STATUS);
        this.setTextArrayVisibility(state === STAGE_TEXT_STATE.TEXT);
    }

    createTextSprites(x, y) {
        for (var i = 0; i <= MAX_CHARS; i++) {
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

    }

    createTextSprite(initialX, y, letterPadding) {
        let sprite = this.createCharacterSprite(initialX, y, (CHAR_SIZE * letterPadding));


        for (const ch of LETTERS) {
            sprite.addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }

        sprite.addAnimation('$$', Asset.getAnimation('stageTextDot'));
        sprite.addAnimation('$!', Asset.getAnimation('stageTextExcl'));
        sprite.addAnimation('$:', Asset.getAnimation('stageTextColon'));

        sprite.addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        return sprite;
    }


    createStatusNumericSprite(initialX, y, numericPadding, separatorPadding) {
        let sprite = this.createCharacterSprite(initialX, y, numericPadding * CHAR_SIZE + separatorPadding * SEPARATOR_SIZE, CHAR_SIZE);

        for (const ch of NUMBERS) {
            sprite.addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        sprite.addAnimation('$ª', Asset.getAnimation('stageTextPokemon'));
        sprite.addAnimation('$º', Asset.getAnimation('stageTextBall'));
        sprite.addAnimation('$/', Asset.getAnimation('stageTextThunder'));
        sprite.addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        return sprite;
    }

    createStatusSeparatorSprite(initialX, y, numericPadding, separatorPadding) {
        let sprite = this.createCharacterSprite(initialX, y, numericPadding * CHAR_SIZE + separatorPadding * SEPARATOR_SIZE - 6, SEPARATOR_SIZE, SEPARATOR_SIZE);

        sprite.addAnimation('$,', Asset.getAnimation('stageTextCommaSeparator'));
        sprite.addAnimation('$ ', Asset.getAnimation('stageTextSeparator'));

        return sprite;
    }

    createCharacterSprite(x, y, padding, size = CHAR_SIZE) {
        let sprite = new Sprite(x - padding, y, size, CHAR_SIZE, "none");
        sprite.layer = HUD_LAYER;
        sprite.debug = DEBUG;

        return sprite;
    }

    showStatus() {
        this.changeState(STAGE_TEXT_STATE.STATUS);
        text = this.createCapturedStatus() + this.createBallsStatus() + this.createThunderStatus() + this.createPointsStatus(), DEFAULT_TEXT_PERSISTENCE_MILLIS;
        text = text.split('').reverse().join('');
        for (var i = 0; i < STATUS_CHARS; i++) {
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
        if (this.stageStatus.balls > 9) {
            balls = "º9";
        } else {
            balls = "º" + this.stageStatus.balls.toString();
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
        return withCommas.padStart(16, ' ');
    }


    setText(text, persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS) {
        this.changeState(STAGE_TEXT_STATE.TEXT);

        text = text.replace(".", "$");
        this.clearTextImmediately();
        this.persistenceMillis = persistenceMillis;
        this.textQueue += text;
    }

    clearText() {
        this.setText('                   ');
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
                this.showStatus();
            }
        }else if(this.state === STAGE_TEXT_STATE.STATUS){
            this.showStatus();
        }
    }

    scrollText() {
        for (var i = MAX_CHARS; i > 0; i--) {
            this.textArray[i].changeAnimation(this.textArray[i - 1].ani.name);
        }
        this.textArray[0].changeAnimation('$' + this.textQueue[0]);
        this.textQueue = this.textQueue.substring(1);
    }

    setTextArrayVisibility(visible) {
        this.textArray.forEach(element => {
            element.visible = visible;
        });
    }

    setStatusArrayVisibility(visible) {
        this.statusArray.forEach(element => {
            element.visible = visible;
        });
    }

    hide() {
        this.changeState(STAGE_TEXT_STATE.NONE);
    }
}

function createBonusStageStatusBanner(stateStage) {
    return new StageStatusBanner(341, 380, stateStage);
}

function createStageStatusBanner(stateStage) {
    return new StageStatusBanner(316, 564, stateStage);
}