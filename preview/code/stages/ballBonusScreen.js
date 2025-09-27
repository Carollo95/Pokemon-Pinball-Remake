const PROGRESS_DELAY_MS = 1000;

const BALL_BONUS_SCREEN_YS = [484, 500, 516, 532, 548, 564];
//All characters
const BALL_BONUS_SCREEN_TEXT_XS = [CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR];
//Numbers up to 999,999
const BALL_BONUS_SCREEN_SHORT_NUMERIC_XS = [CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR];
//Numbers up to 999,999,999
const BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS = [CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR];
//Numbers up to 999,999,999,999
const BALL_BONUS_SCREEN_BIG_NUMERIC_XS = [CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.SEPARATOR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR];

const BONUS_BALL_SCREEN_LINES = {
    NONE: -1,
    POKEMON_CAUGHT: 0,
    POKEMON_EVOLVED: 1,
    BELLSPROUT: 2,
    DUGTRIO: 3,
    CAVE_SHOTS: 4,
    SPINNER_TURNS: 5,
    TOTAL: 6
}

class BallBonusScreen {
    constructor(status) {
        this.status = status;
        this.currentLines = [];

        this._lastProgress = 0;
    }

    createLine(y, xs) {
        let line = [];
        let offsetX = 24;
        for (let i = 0; i < xs.length; i++) {
            //FIXME, this crap is also on the stageText, should be on the stageCharacter, but I don't feel like doing math today
            let correctedX = xs[i] === CHAR_TYPE.SEPARATOR ? offsetX - 6 : offsetX;
            line.push(new StageCharacter(correctedX, y, xs[i]));
            offsetX += xs[i];
        }
        return line;
    }

    update(){
        if(this.state !== BONUS_BALL_SCREEN_LINES.NONE && millis() > this._lastProgress + PROGRESS_DELAY_MS){
            this._lastProgress = millis();
            this.progress();
        }
    }


    show() {
        this.state = BONUS_BALL_SCREEN_LINES.POKEMON_CAUGHT;
        this.showCurrentPage();
    }

    remove() {
        if (this.currentLines) {
            this.currentLines.forEach(row => row.forEach(char => char.remove()));
            this.currentLines = [];
        }
    }


    showPage(lines) {
        this.remove()
        for (let i = 0; i < 5; i++) {
            let line = this.createLine(BALL_BONUS_SCREEN_YS[i], lines[i][1]);
            for (let j = 0; j < Math.min(lines[i][0].length, lines[i][1].length); j++) {
                line[j].changeAnimation(`$${lines[i][0].charAt(j)}`);
            }
            this.currentLines.push(line);
        }
    }


    createProperFormatNumber(number, maxSize, addCommas = true) {
        let plainStr = typeof number === "bigint" ? number.toString() : String(number);

        if (plainStr.length > maxSize) {
            plainStr = plainStr.slice(-maxSize);
        } else if (plainStr === "0") {
            plainStr = "00";// Double zero for aesthetic reasons
        }
        if (addCommas) {
            let withCommas = plainStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (withCommas.length > maxSize) {
                withCommas = withCommas.slice(-maxSize);
            }
            return withCommas.padStart(maxSize, ' ');
        }
        return plainStr.padStart(maxSize, ' ');
    }

    createPokemonCaughtLine() {
        return this.status.pokemonCaughtOnBall + I18NManager.translate("pokemon_caught");
    }

    createBonusLine() {
        let bonus = 0;

        switch (this.state) {
            case BONUS_BALL_SCREEN_LINES.POKEMON_CAUGHT:
                bonus = this.status.getBonusForCaughtPokemonOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.POKEMON_EVOLVED:
                bonus = this.status.getBonusForEvolvedPokemonOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.BELLSPROUT:
                bonus = this.status.getBonusForCaughtStartedOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.DUGTRIO:
                bonus = this.status.getBonusForTravelOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.CAVE_SHOTS:
                bonus = this.status.getBonusForCaveShotsOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.SPINNER_TURNS:
                bonus = this.status.getBonusForSpinnerTurnsOnBall();
                break;
        }

        return I18NManager.translate("bonus") + this.createProperFormatNumber(bonus, 11) + " ";
    }


    calculateSubtotal() {
        let subtotal = 0;

        switch (this.state) {
            case BONUS_BALL_SCREEN_LINES.TOTAL:
            case BONUS_BALL_SCREEN_LINES.SPINNER_TURNS:
                subtotal += this.status.getBonusForSpinnerTurnsOnBall();
            case BONUS_BALL_SCREEN_LINES.CAVE_SHOTS:
                subtotal += this.status.getBonusForCaveShotsOnBall();
            case BONUS_BALL_SCREEN_LINES.DUGTRIO:
                subtotal += this.status.getBonusForTravelOnBall();
            case BONUS_BALL_SCREEN_LINES.BELLSPROUT:
                subtotal += this.status.getBonusForCaughtStartedOnBall();
            case BONUS_BALL_SCREEN_LINES.POKEMON_EVOLVED:
                subtotal += this.status.getBonusForEvolvedPokemonOnBall();
            case BONUS_BALL_SCREEN_LINES.POKEMON_CAUGHT:
                subtotal += this.status.getBonusForCaughtPokemonOnBall();
                break;
        }

        return subtotal;
    }

    createSubtotalLine() {
        let subtotal = this.calculateSubtotal(this.state);
        return I18NManager.translate("subtotal") + this.createProperFormatNumber(subtotal, 11) + " ";
    }

    createMultiplierLine() {
        return I18NManager.translate("multiplier") + this.createProperFormatNumber(this.status.fieldMultiplier, 2, false) + " ";
    }

    createTotalLine() {
        let total = this.calculateSubtotal() * this.status.fieldMultiplier;
        return I18NManager.translate("total") + this.createProperFormatNumber(total, 15) + " ";
    }

    createScoreLine() {
        let total = this.calculateSubtotal() * this.status.fieldMultiplier;
        return I18NManager.translate("score") + this.createProperFormatNumber(this.status.points + total, 15) + " ";
    }

    centerTextForTextRow(text) {
        let totalLength = BALL_BONUS_SCREEN_TEXT_XS.length;

        if (text.length >= totalLength) return text.slice(0, totalLength);

        const pad = totalLength - text.length;
        const left = Math.floor(pad / 2);
        const right = pad - left;
        return " ".repeat(left) + text + " ".repeat(right);
    }

    createPokemonCaughtLine() {
        return this.centerTextForTextRow(this.status.pokemonCaughtOnBall + " " + I18NManager.translate("pokemon_caught"));
    }

    createPokemonEvolvedLine() {
        return this.centerTextForTextRow(this.status.pokemonEvolvedOnBall + " " + I18NManager.translate("pokemon_evolved"));
    }

    createCaughtStartedLine() {
        return this.centerTextForTextRow(this.status.caughtStartedOnBall + " " + I18NManager.translate("bellsprout"));
    }

    createTravelLine() {
        return this.centerTextForTextRow(this.status.travelOnBall + " " + I18NManager.translate("dugtrio"));
    }

    createCaveShotsLine() {
        return this.centerTextForTextRow(this.status.caveShotsOnBall + " " + I18NManager.translate("cave_shots"));
    }

    createSpinnerTurnsLine() {
        return this.centerTextForTextRow(this.status.spinnerTurnsOnBall + " " + I18NManager.translate("spinner_turns"));
    }

    showCurrentPage() {
        switch (this.state) {
            case BONUS_BALL_SCREEN_LINES.POKEMON_CAUGHT:
                this.showPage
                    ([
                        [this.createPokemonCaughtLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.POKEMON_EVOLVED:
                this.showPage
                    ([
                        [this.createPokemonEvolvedLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.BELLSPROUT:
                this.showPage
                    ([
                        [this.createCaughtStartedLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.DUGTRIO:
                this.showPage
                    ([
                        [this.createTravelLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.CAVE_SHOTS:
                this.showPage
                    ([
                        [this.createCaveShotsLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.SPINNER_TURNS:
                this.showPage
                    ([
                        [this.createSpinnerTurnsLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.TOTAL:
                this.showPage
                    ([
                        [this.createMultiplierLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createTotalLine(), BALL_BONUS_SCREEN_BIG_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createScoreLine(), BALL_BONUS_SCREEN_BIG_NUMERIC_XS]
                    ]);
                this.status.addPoints(this.calculateSubtotal());
                break;
        }
    }


    progress(onScreenEndCallback = () => { this.remove(); }) {

        if (this.state === BONUS_BALL_SCREEN_LINES.TOTAL) {
            this.remove();
            onScreenEndCallback();
        }
        this.state++;
        this.showCurrentPage();
    }



}