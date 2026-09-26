import {Asset} from "../engine/assetManager.js";
import {BACK} from "../engine/engine.js";
import {DEBUG} from "../engine/cheatEngine.js";

export class PokedexNumberSprite {
    constructor(x, y, value = 0, invert = false) {
        this.sprite = new Sprite(x, y, 16, 16, "static");
        this.sprite.debug = DEBUG;
        this.sprite.layer = BACK;
        this.sprite.addAnimation("number", Asset.getAnimation(invert ? "pokedexNumberInv" : "pokedexNumber"));
        this.sprite.ani.playing = false;
        this.sprite.ani.frame = value;
    }

    changeValue(value) {
        if (value === " ") {
            this.sprite.ani.frame = 10;
        } else {
            this.sprite.ani.frame = value;
        }

    }

}
