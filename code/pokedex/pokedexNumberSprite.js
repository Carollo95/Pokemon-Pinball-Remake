class PokedexNumberSprite {
    constructor(x, y, value = 0, invert = false) {
        this.sprite = new Sprite(x, y, 16, 16, "static");
        this.sprite.debug = DEBUG;
        this.sprite.layer = BACK;
        this.sprite.addAnimation("number", Asset.getAnimation(invert ? "pokedexNumberInv" : "pokedexNumber"));
        this.sprite.ani.playing = false;
        this.sprite.ani.frame = value;
    }

    changeValue(value) {
        this.sprite.ani.frame = value;
    }

}