class PokemonCounter{

    constructor() {
        this.pokedexText = new Sprite(294, 112, 98, 16, "static");
        this.pokedexText.debug = DEBUG;
        this.pokedexText.layer = OVER_SPRITE_LAYER;
        this.pokedexText.addAnimation("pokedex", Asset.getAnimation("pokedex"));
    }

}