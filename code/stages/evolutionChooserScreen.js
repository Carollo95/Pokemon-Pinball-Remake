
const EVOLUTION_CHOOSER_SCREEN_YS = [484, 500, 516, 532, 548, 564];

const EVOLUTION_CHOOSER_SCREEN_TEXT_XS = [CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR];

class EvolutionChooserScreen {
    constructor(basicPokemonList, onScreenEndCallback) {
        this.onScreenEndCallback = onScreenEndCallback;
        this.currentLines = [];
        this.basicPokemonList = [POKEDEX.BULBASAUR, POKEDEX.CHARMANDER, POKEDEX.SQUIRTLE, POKEDEX.CATERPIE, POKEDEX.WEEDLE, POKEDEX.PIDGEY, POKEDEX.RATTATA, POKEDEX.SPEAROW, POKEDEX.EKANS, POKEDEX.PIKACHU, POKEDEX.SANDSHREW];

        //this.basicPokemonList = [POKEDEX.BULBASAUR, POKEDEX.CHARMANDER, POKEDEX.SQUIRTLE];
        this.currentlySelectedIndex = 0;
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
        if (this.state !== BONUS_BALL_SCREEN_LINES.NONE && millis() > this._lastProgress + PROGRESS_DELAY_MS) {
            this._lastProgress = millis();
            this.progress();
        }
    }

    show() {
        for (let i = 0; i <= 5; i++) {
            let line = this.createLine(EVOLUTION_CHOOSER_SCREEN_YS[i], EVOLUTION_CHOOSER_SCREEN_TEXT_XS)
            let name = this.createNameToPrint(i);
            for (let j = 0; j < EVOLUTION_CHOOSER_SCREEN_TEXT_XS.length; j++) {
                line[j].changeAnimation(`$${name.charAt(j)}`);
            }

        }
    }

    createNameToPrint(i) {
        if (i >= this.basicPokemonList.length) {
            return ''.padEnd(EVOLUTION_CHOOSER_SCREEN_TEXT_XS.length, ' ');
        }
        return (i == this.currentlySelectedIndex ? ' >' : '  ') + this.basicPokemonList[i].name.padEnd(EVOLUTION_CHOOSER_SCREEN_TEXT_XS.length - 2, ' ');
    }

    next() {
        this.currentlySelectedIndex = this.currentlySelectedIndex < this.basicPokemonList.length-1 ? this.currentlySelectedIndex + 1 : this.currentlySelectedIndex;
        this.show();
    }

    previous() {
        this.currentlySelectedIndex = this.currentlySelectedIndex > 0 ? this.currentlySelectedIndex - 1 : this.currentlySelectedIndex;
        this.show();
    }


}