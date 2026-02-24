
const POKEDEX_ROW_NUMBER_XS = [141, 157, 173];
const POKEDEX_ROW_LETTERS_XS = [141, 157, 173, 189, 205, 221, 237, 253, 269, 285];
const POKEDEX_ROW_HEIGHT = 32;

class PokedexPokemon {

    constructor(pokemon, y, seen = false) {
        this.numberMarker = new Sprite(113, y + 1, 34, 12, "static");
        this.numberMarker.debug = DEBUG;
        this.numberMarker.layer = BACK;
        this.numberMarker.addAnimation("numberMarker", Asset.getAnimation("pokedexNumberMarker"));
        this.numberMarker.ani.playing = false;

        this.numbers = [];
        for (let i = 0; i < POKEDEX_ROW_NUMBER_XS.length; i++) {
            this.numbers.push(new PokedexNumberSprite(POKEDEX_ROW_NUMBER_XS[i], y, pokemon.id[i]));
        }

        if (seen) {
            this.letters = [];
            const name = I18NManager.translate(pokemon.name).toUpperCase().padEnd(10, " ");
            for (let i = 0; i < POKEDEX_ROW_LETTERS_XS.length; i++) {
                this.letters.push(new PokedexLetterSprite(POKEDEX_ROW_LETTERS_XS[i], y + 20, name[i]));
            }
        }

    }


    moveUp() {
        this.numberMarker.position.y -= POKEDEX_ROW_HEIGHT;
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbers[i].sprite.position.y -= POKEDEX_ROW_HEIGHT;
        }
        if (this.letters) {
            for (let i = 0; i < this.letters.length; i++) {
                this.letters[i].sprite.position.y -= POKEDEX_ROW_HEIGHT;
            }
        }

    }

    moveDown() {
        this.numberMarker.position.y += POKEDEX_ROW_HEIGHT;
        for (let i = 0; i < this.numbers.length; i++) {
            this.numbers[i].sprite.position.y += POKEDEX_ROW_HEIGHT;
        }
        if (this.letters) {
            for (let i = 0; i < this.letters.length; i++) {
                this.letters[i].sprite.position.y += POKEDEX_ROW_HEIGHT;
            }
        }

    }

}