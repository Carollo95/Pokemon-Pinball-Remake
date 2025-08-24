const CHAR_SIZE = 16;
const MAX_CHARS = 19;
const MAX_CHARS_BONUS = 19;

const TEXT_SCROLL_THRESHOLD_MILLIS = 100; // millis between movement while showing text
const DEFAULT_TEXT_PERSISTENCE_MILLIS = 10000; //Default millis to keep on screen the shown text

class StageStatusBanner {


    constructor(x, y) {
        this.textArray = new Array(MAX_CHARS);
        this.lastMovement = 0;
        this.textQueue = '';
        this.show = false;
        this.endTextDisplayMillis = 0;
        this.persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS;
        
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        for (var i = 0; i <= MAX_CHARS; i++) {
            this.textArray[i] = new Sprite(x - (CHAR_SIZE * i + 1), y, CHAR_SIZE, CHAR_SIZE, "none");
            this.textArray[i].layer = 10;

            // add letter animations ($a .. $z)
            for (const ch of letters) {
                this.textArray[i].addAnimation('$' + ch, Asset.getAnimationClone('stageText' + ch.toUpperCase()));
            }

            // punctuation and space
            this.textArray[i].addAnimation('$$', Asset.getAnimationClone('stageTextDot'));
            this.textArray[i].addAnimation('$!', Asset.getAnimationClone('stageTextExcl'));
            this.textArray[i].addAnimation('$:', Asset.getAnimationClone('stageTextColon'));

            // last one so no need to change it on creation
            this.textArray[i].addAnimation('$ ', Asset.getAnimationClone('stageTextSpace'));

            this.textArray[i].debug = DEBUG;
        }

        // initialize display
        this.clearText();
    }

    setText(text, persistenceMillis = DEFAULT_TEXT_PERSISTENCE_MILLIS) {
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

    drawGameStatus() {
        //TODO temporary
        for (var i = MAX_CHARS; i >= 0; i--) {
            this.textArray[i].changeAnimation("$ ");
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

function createBonusStageStatusBanner() {
    return new StageStatusBanner(341, 380);
}