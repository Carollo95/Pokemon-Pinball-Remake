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
    POKEMON_CAUGHT: 0,
    POKEMON_EVOLVED: 1,
    CAUGHT_STARTED: 2,
    TRAVEL: 3,
    CAVE_SHOTS: 4,
    SPINNER_TURNS: 5,
    TOTAL: 6
}

class BallBonusScreen {
    constructor(state) {
        this.state = state;
        this.currentLines = [];
    }

    createText() {
        console.log(this.state.pokemonCaughtOnBall + I18NManager.translate("pokemon_caught"));
        console.log(I18NManager.translate("bonus") + this.state.getBonusForCaughtPokemonOnBall());
        console.log(this.state.pokemonEvolvedOnBall + I18NManager.translate("pokemon_evolved"));
        console.log(I18NManager.translate("bonus") + this.state.getBonusForEvolvedPokemonOnBall());
        console.log(this.state.caughtStartedOnBall + I18NManager.translate("bellsprout"));
        console.log(I18NManager.translate("bonus") + this.state.getBonusForCaughtStartedOnBall());
        console.log(this.state.travelOnBall + I18NManager.translate("dugtrio"));
        console.log(I18NManager.translate("bonus") + this.state.getBonusForTravelOnBall());
        console.log(this.state.caveShotsOnBall + I18NManager.translate("cave_shots"));
        console.log(I18NManager.translate("bonus") + this.state.getBonusForCaveShotsOnBall());
        console.log(this.state.spinnerTurnsOnBall + I18NManager.translate("spinner_turns"));
        console.log(I18NManager.translate("bonus") + this.state.getBonusForSpinnerTurnsOnBall());
        console.log(I18NManager.translate("multiplier") + this.state.ballMultiplier);
        console.log(I18NManager.translate("total") + this.state.getTotalPointsForBall());
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
        console.log(lines);
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
        let clampedNumber = Math.min(parseInt("9".repeat(maxSize), 10), number).toString();
        if (addCommas) {
            let withCommas = clampedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return withCommas.padStart(maxSize, ' ');
        } else {
            return clampedNumber.padStart(maxSize, ' ');
        }
    }

    createPokemonCaughtLine() {
        return this.state.pokemonCaughtOnBall + I18NManager.translate("pokemon_caught");
    }

    createBonusLine() {
        return I18NManager.translate("bonus") + this.createProperFormatNumber(999999999999999999999, 9) + " ";
    }

    createSubtotalLine() {
        return I18NManager.translate("subtotal") + this.createProperFormatNumber(999999999999999999999, 9) + " ";
    }

    createMultiplierLine() {
        return I18NManager.translate("multiplier") + this.createProperFormatNumber(99999999999999999999, 6, false) + " ";
    }

    createTotalLine() {
        return I18NManager.translate("total") + this.createProperFormatNumber(99999999999999999999, 12) + " ";
    }

    createScoreLine() {
        return I18NManager.translate("score") + this.createProperFormatNumber(99999999999999999999, 12) + " ";
    }

    showCurrentPage() {
        switch (this.state) {
            case BONUS_BALL_SCREEN_LINES.POKEMON_CAUGHT:
                this.showPage
                    ([
                        ["  3    pokémon caught", BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.POKEMON_EVOLVED:
                this.showPage
                    ([
                        ["  3  pokémon evolved", BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.CAUGHT_STARTED:
                this.showPage
                    ([
                        ["  3  bellsprout    ", BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.TRAVEL:
                this.showPage
                    ([
                        ["  3  dugtrio    ", BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.CAVE_SHOTS:
                this.showPage
                    ([
                        ["  3  cave shots ", BALL_BONUS_SCREEN_TEXT_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createBonusLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS],
                        [" ".repeat(BALL_BONUS_SCREEN_TEXT_XS.length), BALL_BONUS_SCREEN_TEXT_XS],
                        [this.createSubtotalLine(), BALL_BONUS_SCREEN_MEDIUM_NUMERIC_XS]
                    ]);
                break;
            case BONUS_BALL_SCREEN_LINES.SPINNER_TURNS:
                this.showPage
                    ([
                        ["  3  spinner turns ", BALL_BONUS_SCREEN_TEXT_XS],
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
                break;
        }
    }


    progress(onScreenEndCallback = () => { }) {

        if (this.state === BONUS_BALL_SCREEN_LINES.TOTAL) {
            this.remove();
            onScreenEndCallback();
        }
        this.state++;
        this.showCurrentPage();
    }



}