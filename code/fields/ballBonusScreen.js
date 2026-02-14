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
    NONE: "None",
    POKEMON_CAUGHT: "pokemon_caught",
    POKEMON_EVOLVED: "pokemon_evolved",
    BELLSPROUT: "bellsprout",
    DUGTRIO: "dugtrio",
    SLOWBRO: "slowbro",
    CLOYSTER: "cloyster",
    POLIWAG: "poliwag",
    PSYDUCK: "psyduck",
    CAVE_SHOTS: "cave_shots",
    SPINNER_TURNS: "spinner_turns",
    TOTAL: "total",
    GAME_OVER: "game_over"
}

const RED_FIELD_BALL_SCREEN_LINES_ORDER = [
    BONUS_BALL_SCREEN_LINES.NONE,
    BONUS_BALL_SCREEN_LINES.POKEMON_CAUGHT,
    BONUS_BALL_SCREEN_LINES.POKEMON_EVOLVED,
    BONUS_BALL_SCREEN_LINES.BELLSPROUT,
    BONUS_BALL_SCREEN_LINES.DUGTRIO,
    BONUS_BALL_SCREEN_LINES.CAVE_SHOTS,
    BONUS_BALL_SCREEN_LINES.SPINNER_TURNS,
    BONUS_BALL_SCREEN_LINES.TOTAL
];

const BLUE_FIELD_BALL_SCREEN_LINES_ORDER = [
    BONUS_BALL_SCREEN_LINES.NONE,
    BONUS_BALL_SCREEN_LINES.POKEMON_CAUGHT,
    BONUS_BALL_SCREEN_LINES.POKEMON_EVOLVED,
    BONUS_BALL_SCREEN_LINES.CLOYSTER,
    BONUS_BALL_SCREEN_LINES.SLOWBRO,
    BONUS_BALL_SCREEN_LINES.POLIWAG,
    BONUS_BALL_SCREEN_LINES.PSYDUCK,
    BONUS_BALL_SCREEN_LINES.CAVE_SHOTS,
    BONUS_BALL_SCREEN_LINES.SPINNER_TURNS,
    BONUS_BALL_SCREEN_LINES.TOTAL
];

class BallBonusScreen {
    constructor(status, states, onScreenEndCallback) {
        this.onScreenEndCallback = onScreenEndCallback;
        this.status = status;
        this.states = states;
        this.currentStateIndex = 0;
        this.state = this.states[this.currentStateIndex];

        this.currentLines = [];

        this.progressTimer = new EventTimer(PROGRESS_DELAY_MS);
    }

    createLine(y, xs) {
        let line = [];
        let offsetX = 16;
        for (let i = 0; i < xs.length; i++) {
            //FIXME, this crap is also on the stageText, should be on the stageCharacter, but I don't feel like doing math today
            let correctedX = xs[i] === CHAR_TYPE.SEPARATOR ? offsetX - 6 : offsetX;
            line.push(new StageCharacter(correctedX, y, xs[i]));
            offsetX += xs[i];
        }
        return line;
    }

    update() {
        if (this.state !== BONUS_BALL_SCREEN_LINES.NONE && this.progressTimer.hasElapsed()) {
            this.progressTimer.restart();
            this.progress();
        }
    }


    show() {
        this.currentStateIndex = 1;

        if (this.status.balls < 0) {
            this.states.push(BONUS_BALL_SCREEN_LINES.GAME_OVER);
        }

        this.state = this.states[this.currentStateIndex];
        this.progressTimer.restart();
        this.showCurrentPage();
    }

    remove() {
        if (this.currentLines) {
            this.currentLines.forEach(row => row.forEach(char => char.remove()));
            this.currentLines = [];
        }
    }


    showPage(lines) {
        this.remove();
        Audio.playSFX('sfx3E');
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
                bonus = this.status.getBonusForBellsproutOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.DUGTRIO:
                bonus = this.status.getBonusForDugtrioOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.SLOWBRO:
                bonus = this.status.getBonusForSlowbroOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.CLOYSTER:
                bonus = this.status.getBonusForCloysterOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.PSYDUCK:
                bonus = this.status.getBonusForPsyduckOnBall();
                break;
            case BONUS_BALL_SCREEN_LINES.POLIWAG:
                bonus = this.status.getBonusForPoliwagOnBall();
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

        for (let i = 0; i < this.currentStateIndex.length; i++) {
            subtotal += this.getSubtotalForLine(this.states[i]);
        }

        return subtotal;
    }

    getSubtotalForLine(line) {
        switch (line) {
            case BONUS_BALL_SCREEN_LINES.TOTAL:
                return 0;
            case BONUS_BALL_SCREEN_LINES.SPINNER_TURNS:
                return this.status.getBonusForSpinnerTurnsOnBall();
            case BONUS_BALL_SCREEN_LINES.CAVE_SHOTS:
                return this.status.getBonusForCaveShotsOnBall();
            case BONUS_BALL_SCREEN_LINES.DUGTRIO:
                return this.status.getBonusForDugtrioOnBall();
            case BONUS_BALL_SCREEN_LINES.BELLSPROUT:
                return this.status.getBonusForBellsproutOnBall();
            case BONUS_BALL_SCREEN_LINES.CLOYSTER:
                return this.status.getBonusForCloysterOnBall();
            case BONUS_BALL_SCREEN_LINES.SLOWBRO:
                return this.status.getBonusForSlowbroOnBall();
            case BONUS_BALL_SCREEN_LINES.PSYDUCK:
                return this.status.getBonusForPsyduckOnBall();
            case BONUS_BALL_SCREEN_LINES.POLIWAG:
                return this.status.getBonusForPoliwagOnBall();
            case BONUS_BALL_SCREEN_LINES.POKEMON_EVOLVED:
                return this.status.getBonusForEvolvedPokemonOnBall();
            case BONUS_BALL_SCREEN_LINES.POKEMON_CAUGHT:
                return this.status.getBonusForCaughtPokemonOnBall();
        }
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

    createGameOverLine() {
        return this.centerTextForTextRow(I18NManager.translate("game_over"));
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

    createBellsproutLine() {
        return this.centerTextForTextRow(this.status.bellsproutOnBall + " " + I18NManager.translate("bellsprout"));
    }

    createDugtrioLine() {
        return this.centerTextForTextRow(this.status.dugtrioOnBall + " " + I18NManager.translate("dugtrio"));
    }

    createCloysterLine() {
        return this.centerTextForTextRow(this.status.cloysterOnBall + " " + I18NManager.translate("cloyster"));
    }

    createSlowbroLine() {
        return this.centerTextForTextRow(this.status.slowbroOnBall + " " + I18NManager.translate("slowbro"));
    }

    createPoliwagLine() {
        return this.centerTextForTextRow(this.status.poliwagOnBall + " " + I18NManager.translate("poliwag"));
    }

    createPsyduckLine() {
        return this.centerTextForTextRow(this.status.psyduckOnBall + " " + I18NManager.translate("psyduck"));
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
                        [this.createBellsproutLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.DUGTRIO:
                this.showPage
                    ([
                        [this.createDugtrioLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.CLOYSTER:
                this.showPage
                    ([
                        [this.createCloysterLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.SLOWBRO:
                this.showPage
                    ([
                        [this.createSlowbroLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.PSYDUCK:
                this.showPage
                    ([
                        [this.createPsyduckLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.POLIWAG:
                this.showPage
                    ([
                        [this.createPoliwagLine(), BALL_BONUS_SCREEN_TEXT_XS],
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
            case BONUS_BALL_SCREEN_LINES.GAME_OVER:
                this.showPage
                    ([
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createGameOverLine(), BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createScoreLine(), BALL_BONUS_SCREEN_BIG_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS]

                    ]);
                break;
        }
    }


    progress() {
        if ((this.state === BONUS_BALL_SCREEN_LINES.TOTAL && this.status.balls >= 0) || this.state === BONUS_BALL_SCREEN_LINES.GAME_OVER) {
            if (this.state !== BONUS_BALL_SCREEN_LINES.GAME_OVER) {
                this.remove();
            }
            this.onScreenEndCallback(this.state === BONUS_BALL_SCREEN_LINES.GAME_OVER);
        }

        this.currentStateIndex++;
        this.state = this.states[this.currentStateIndex];
        this.showCurrentPage();
    }


    isVisible() {
        return this.currentLines.length > 0;
    }


}