const CHAR_SIZE = 16;
const MAX_CHARS = 19;
const MAX_CHARS_BONUS = 19;

const STATUS_CHARS = 21;

const TEXT_SCROLL_THRESHOLD_MILLIS = 100; // millis between movement while showing text
const DEFAULT_TEXT_PERSISTENCE_MILLIS = 10000; //Default millis to keep on screen the shown text

class StageStatusBanner {


    constructor(x, y, stageStatus) {
        this.textArray = new Array(MAX_CHARS);
        this.statusArray = new Array(STATUS_CHARS);
        this.lastMovement = 0;
        this.textQueue = '';
        this.show = false;
        this.endTextDisplayMillis = 0;
        this.persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS;

        this.stageStatus = stageStatus;

        this.createTextSprites(x, y);
        this.createStatusSprites(x, y);

        // initialize display
        //this.clearText();
    }

    createTextSprites(x, y) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        for (var i = 0; i <= MAX_CHARS; i++) {
            this.textArray[i] = this.createCharacterSprite(x, y, (CHAR_SIZE * i));

            // add letter animations ($a .. $z)
            for (const ch of letters) {
                this.textArray[i].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
            }

            // punctuation and space
            this.textArray[i].addAnimation('$$', Asset.getAnimation('stageTextDot'));
            this.textArray[i].addAnimation('$!', Asset.getAnimation('stageTextExcl'));
            this.textArray[i].addAnimation('$:', Asset.getAnimation('stageTextColon'));

            // last one so no need to change it on creation
            this.textArray[i].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));
        }
    }

    createCharacterSprite(x, y, padding, size = CHAR_SIZE) {
        let sprite = new Sprite(x - padding, y, size, CHAR_SIZE, "none");
        sprite.layer = HUD_LAYER;
        sprite.debug = DEBUG;

        return sprite;
    }

    createStatusSprites(x, y) {
        const numbers = '1234567890';

        this.statusArray[0] = this.createCharacterSprite(x, y, 0);

        for (const ch of numbers) {
            this.statusArray[0].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[0].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[1] = this.createCharacterSprite(x, y, 16);

        for (const ch of numbers) {
            this.statusArray[1].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[1].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[2] = this.createCharacterSprite(x, y, 32);

        for (const ch of numbers) {
            this.statusArray[2].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[2].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[3] = this.createCharacterSprite(x, y, 42, 4);
        this.statusArray[3].addAnimation('$,', Asset.getAnimation('stageTextCommaSeparator'));
        this.statusArray[3].addAnimation('$ ', Asset.getAnimation('stageTextSeparator'));

        //-------------------
        this.statusArray[4] = this.createCharacterSprite(x, y, 52);

        for (const ch of numbers) {
            this.statusArray[4].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[4].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[5] = this.createCharacterSprite(x, y, 68);

        for (const ch of numbers) {
            this.statusArray[5].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[5].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));


        //-------------------
        this.statusArray[6] = this.createCharacterSprite(x, y, 84);

        for (const ch of numbers) {
            this.statusArray[6].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[6].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));


        //-------------------
        this.statusArray[7] = this.createCharacterSprite(x, y, 94, 4);
        this.statusArray[7].addAnimation('$,', Asset.getAnimation('stageTextCommaSeparator'));
        this.statusArray[7].addAnimation('$ ', Asset.getAnimation('stageTextSeparator'));


        //-------------------
        this.statusArray[8] = this.createCharacterSprite(x, y, 104);

        for (const ch of numbers) {
            this.statusArray[8].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[8].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[9] = this.createCharacterSprite(x, y, 120);

        for (const ch of numbers) {
            this.statusArray[9].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[9].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));


        //-------------------
        this.statusArray[10] = this.createCharacterSprite(x, y, 136);

        for (const ch of numbers) {
            this.statusArray[10].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[10].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));


        //-------------------
        this.statusArray[11] = this.createCharacterSprite(x, y, 146, 4);
        this.statusArray[11].addAnimation('$,', Asset.getAnimation('stageTextCommaSeparator'));
        this.statusArray[11].addAnimation('$ ', Asset.getAnimation('stageTextSeparator'));

        //-------------------
        this.statusArray[12] = this.createCharacterSprite(x, y, 156);

        for (const ch of numbers) {
            this.statusArray[12].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[12].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));


        //-------------------
        this.statusArray[13] = this.createCharacterSprite(x, y, 172);

        for (const ch of numbers) {
            this.statusArray[13].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[13].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[14] = this.createCharacterSprite(x, y, 188);

        for (const ch of numbers) {
            this.statusArray[14].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[14].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));


        //-------------------
        this.statusArray[15] = this.createCharacterSprite(x, y, 196, 4);
        this.statusArray[15].addAnimation('$ ', Asset.getAnimation('stageTextSeparator'));

                //-------------------
        this.statusArray[16] = this.createCharacterSprite(x, y, 200, 4);
        this.statusArray[16].addAnimation('$ ', Asset.getAnimation('stageTextSeparator'));

        //-------------------
        this.statusArray[17] = this.createCharacterSprite(x, y, 208);
        this.statusArray[17].addAnimation('$/', Asset.getAnimation('stageTextThunder'));
        this.statusArray[17].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));
        
        //-------------------
        this.statusArray[18] = this.createCharacterSprite(x, y, 224);

        for (const ch of numbers) {
            this.statusArray[18].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[18].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[19] = this.createCharacterSprite(x, y, 240);
        this.statusArray[19].addAnimation('$º', Asset.getAnimation('stageTextBall'));
        this.statusArray[19].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[20] = this.createCharacterSprite(x, y, 256);

        for (const ch of numbers) {
            this.statusArray[20].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[20].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[21] = this.createCharacterSprite(x, y, 272);

        for (const ch of numbers) {
            this.statusArray[21].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[21].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));


        //-------------------
        this.statusArray[22] = this.createCharacterSprite(x, y, 288);

        for (const ch of numbers) {
            this.statusArray[22].addAnimation('$' + ch, Asset.getAnimation('stageText' + ch.toUpperCase()));
        }
        this.statusArray[22].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

        //-------------------
        this.statusArray[23] = this.createCharacterSprite(x, y, 304);
        this.statusArray[23].addAnimation('$ª', Asset.getAnimation('stageTextPokemon'));
        this.statusArray[23].addAnimation('$ ', Asset.getAnimation('stageTextSpace'));

    }

    showStatus() {
        this.statusArray.forEach(element => {
            element.visible = true;
        });

        this.textArray.forEach(element => {
            element.visible = false;
        });

        text = this.createCapturedStatus() + this.createBallsStatus() + this.createThunderStatus() + this.createPointsStatus(), DEFAULT_TEXT_PERSISTENCE_MILLIS;
        text = text.split('').reverse().join('');
        console.log(text);
        for (var i = 0; i <= 23; i++) {

            if (this.statusArray[i] === undefined) {
                return;
                //TODO remove
            }
            console.log(text[i] + "   " + this.statusArray[i]);
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
        return withCommas.padStart(17, ' ');
    }


    setText(text, persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS) {
        this.statusArray.forEach(element => {
            element.visible = false;
        });

        this.textArray.forEach(element => {
            element.visible = true;
        });

        text = text.replace(".", "$");
        this.show = true;
        this.clearText();
        this.persistenceMillis = persistenceMillis;
        this.textQueue += text;
    }

    clearText() {
        for (var i = MAX_CHARS; i >= 0; i--) {
            this.textArray[i].changeAnimation("$ ");
        }
    }

    hasPassedTextPersistence() {
        return (millis() - this.endTextDisplayMillis) > this.persistenceMillis;
    }

    draw() {
        if (this.show) {
            if ((this.textQueue.length > 0)) {
                if ((millis() - this.lastMovement) > TEXT_SCROLL_THRESHOLD_MILLIS) {
                    this.lastMovement = millis();
                    this.scrollText();
                    this.endTextDisplayMillis = millis();
                }
            } else if (this.hasPassedTextPersistence()) {
                this.drawGameStatus();
            }
        }
    }


    scrollText() {
        for (var i = MAX_CHARS; i > 0; i--) {
            this.textArray[i].changeAnimation(this.textArray[i - 1].ani.name);
        }
        this.textArray[0].changeAnimation('$' + this.textQueue[0]);
        this.textQueue = this.textQueue.substring(1);
    }

    hide() {
        this.show = false;
    }


}

function createBonusStageStatusBanner(stateStage) {
    return new StageStatusBanner(341, 380, stateStage);
}