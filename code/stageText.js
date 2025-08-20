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
        
        for (var i = 0; i <= MAX_CHARS; i++) {
            this.textArray[i] = new Sprite(x - (CHAR_SIZE * i + 1), y, CHAR_SIZE, CHAR_SIZE, "none");
            this.textArray[i].layer = 10;

            this.textArray[i].addAnimation("$a", stageTextA);
            this.textArray[i].addAnimation("$b", stageTextB);
            this.textArray[i].addAnimation("$c", stageTextC);
            this.textArray[i].addAnimation("$d", stageTextD);
            this.textArray[i].addAnimation("$e", stageTextE);
            this.textArray[i].addAnimation("$f", stageTextF);
            this.textArray[i].addAnimation("$g", stageTextG);
            this.textArray[i].addAnimation("$h", stageTextH);
            this.textArray[i].addAnimation("$i", stageTextI);
            this.textArray[i].addAnimation("$j", stageTextJ);
            this.textArray[i].addAnimation("$k", stageTextK);
            this.textArray[i].addAnimation("$l", stageTextL);
            this.textArray[i].addAnimation("$m", stageTextM);
            this.textArray[i].addAnimation("$n", stageTextN);
            this.textArray[i].addAnimation("$o", stageTextO);
            this.textArray[i].addAnimation("$p", stageTextP);
            this.textArray[i].addAnimation("$q", stageTextQ);
            this.textArray[i].addAnimation("$r", stageTextR);
            this.textArray[i].addAnimation("$s", stageTextS);
            this.textArray[i].addAnimation("$t", stageTextT);
            this.textArray[i].addAnimation("$u", stageTextU);
            this.textArray[i].addAnimation("$v", stageTextV);
            this.textArray[i].addAnimation("$w", stageTextW);
            this.textArray[i].addAnimation("$x", stageTextX);
            this.textArray[i].addAnimation("$y", stageTextY);
            this.textArray[i].addAnimation("$z", stageTextZ);
            this.textArray[i].addAnimation("$$", stageTextDot); //Calling it $. throws an unexpected error that I don' care about enought to deal with
            this.textArray[i].addAnimation("$!", stageTextExcl);
            this.textArray[i].addAnimation("$:", stageTextColon);

            //Last one so no need to change it on creation
            this.textArray[i].addAnimation("$ ", stageTextSpace);
            this.clearText;
        }
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