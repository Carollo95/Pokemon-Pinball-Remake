const POKEDEX_TEXT_STATES = {
    HIDDEN: "HIDDEN",
    FIRST_PAGE: "FIRST_PAGE",
    SECOND_PAGE: "SECOND_PAGE",
}

const POKEDEX_TEXT_XS = [48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304, 320];
const POKEDEX_TEXT_YS = [246, 274, 302];

class PokedexText {

    constructor() {
        this.background = new Sprite(188, 276, 400, 400, "static");
        this.background.debug = DEBUG;
        this.background.layer = SPRITE_LAYER;
        this.background.addAnimation("pokedexText", Asset.getAnimation("pokedexText"));
        this.background.visible = false;

        this.state = POKEDEX_TEXT_STATES.HIDDEN;

        this.textSprites = [];
        for (let i = 0; i < POKEDEX_TEXT_YS.length; i++) {
            this.textSprites[i] = [];
            for (let j = 0; j < POKEDEX_TEXT_XS.length; j++) {
                let textSprite = new PokedexLetterSprite(POKEDEX_TEXT_XS[j], POKEDEX_TEXT_YS[i]);
                textSprite.sprite.visible = false;
                textSprite.sprite.layer = OVER_SPRITE_LAYER;
                this.textSprites[i][j] = textSprite;
            }
        }

    }

    show(text) {
        if (this.state === POKEDEX_TEXT_STATES.HIDDEN) {
            this.background.visible = true;
            this.state = POKEDEX_TEXT_STATES.FIRST_PAGE;
            for (let i = 0; i < POKEDEX_TEXT_YS.length; i++) {
                for (let j = 0; j < POKEDEX_TEXT_XS.length; j++) {
                    this.textSprites[i][j].sprite.visible = true;
                    this.textSprites[i][j].changeValue(text[i][j]);
                }
            }

        } else if (this.state === POKEDEX_TEXT_STATES.FIRST_PAGE) {
            this.state = POKEDEX_TEXT_STATES.SECOND_PAGE;
            for (let i = 0; i < POKEDEX_TEXT_YS.length; i++) {
                for (let j = 0; j < POKEDEX_TEXT_XS.length; j++) {
                    this.textSprites[i][j].sprite.visible = true;
                    this.textSprites[i][j].changeValue(text[i + 3][j]);
                }
            }


        } else if (this.state === POKEDEX_TEXT_STATES.SECOND_PAGE) {
            this.state = POKEDEX_TEXT_STATES.HIDDEN;
            this.background.visible = false;
            for (let i = 0; i < POKEDEX_TEXT_YS.length; i++) {
                for (let j = 0; j < POKEDEX_TEXT_XS.length; j++) {
                    this.textSprites[i][j].sprite.visible = false;
                }
            }

        }


    }


}