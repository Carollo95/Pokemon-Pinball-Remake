
const EVOLUTION_CHOOSER_SCREEN_YS = [484, 500, 516, 532, 548, 564];

const EVOLUTION_CHOOSER_SCREEN_TEXT_XS = [CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR, CHAR_TYPE.CHAR];

class EvolutionChooserScreen {
    constructor(basicPokemonList, onScreenEndCallback) {
        this.onScreenEndCallback = onScreenEndCallback;
        this.currentLines = [];

        basicPokemonList = [POKEDEX.BULBASAUR, POKEDEX.CHARMANDER, POKEDEX.SQUIRTLE, POKEDEX.PIKACHU, POKEDEX.EEVEE, POKEDEX.JIGGLYPUFF, POKEDEX.MEOWTH, POKEDEX.PSYDUCK, POKEDEX.MACHOP, POKEDEX.GEODUDE, POKEDEX.MAGIKARP];

        this.basicPokemonList = basicPokemonList.map(e => e.name).concat("exit");

        this.currentlySelectedIndex = 0;
        this.shownList = this.basicPokemonList.slice(this.currentlySelectedIndex, this.currentlySelectedIndex + 5);
        this.scroll = 0;
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
            this.currentLines.push(line);
        }
    }

    createNameToPrint(i) {
        if (i >= this.shownList.length) {
            return ''.padEnd(EVOLUTION_CHOOSER_SCREEN_TEXT_XS.length, ' ');
        }
        let prefix = (i + this.scroll == this.currentlySelectedIndex ? ' >' : '  ');
        return prefix + this.shownList[i].padEnd(EVOLUTION_CHOOSER_SCREEN_TEXT_XS.length - 2, ' ');
    }

    next() {
        if (this.currentlySelectedIndex < this.basicPokemonList.length - 1) {
            this.currentlySelectedIndex++;
            if (this.currentlySelectedIndex >= 5) {
                this.scroll++;
                this.shownList = this.basicPokemonList.slice(this.currentlySelectedIndex - 4, this.currentlySelectedIndex + 1);
            }
            this.show();
        }
    }

    previous() {
        if (this.currentlySelectedIndex > 0) {
            this.currentlySelectedIndex--;
            if (this.currentlySelectedIndex < this.scroll) {
                this.scroll--;
                this.shownList = this.basicPokemonList.slice(this.currentlySelectedIndex, this.currentlySelectedIndex + 5);
            }
            this.show();
        }
    }

    getSelected() {
        if (this.currentlySelectedIndex >= this.basicPokemonList.length) {
            return null;
        }
        return this.basicPokemonList[this.currentlySelectedIndex];
    }

    remove() {
        if (this.currentLines) {
            this.currentLines.forEach(row => row.forEach(char => char.remove()));
            this.currentLines = [];
        }
    }
}