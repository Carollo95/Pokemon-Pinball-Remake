const POKEDEX_ROW_NUMBER_YS = [225, 257, 289, 321, 353, 385, 417, 449, 481, 513, 545, 577, 609, 641, 673, 705, 737, 769, 801, 833, 865, 897, 929, 961, 993, 1025, 1057, 1089, 1121, 1153, 1185, 1217, 1249, 1281, 1313, 1345, 1377, 1409, 1441, 1473, 1505, 1537, 1569, 1601, 1633, 1665, 1697, 1729, 1761, 1793, 1825, 1857, 1889, 1921, 1953, 1985, 2017, 2049, 2081, 2113, 2145, 2177, 2209, 2241, 2273, 2305, 2337, 2369, 2401, 2433, 2465, 2497, 2529, 2561, 2593, 2625, 2657, 2689, 2721, 2753, 2785, 2817, 2849, 2881, 2913, 2945, 2977, 3009, 3041, 3073, 3105, 3137, 3169, 3201, 3233, 3265, 3297, 3329, 3361, 3393, 3425, 3457, 3489, 3521, 3553, 3585, 3617, 3649, 3681, 3713, 3745, 3777, 3809, 3841, 3873, 3905, 3937, 3969, 4001, 4033, 4065, 4097, 4129, 4161, 4193, 4225, 4257, 4289, 4321, 4353, 4385, 4417, 4449, 4481, 4513, 4545, 4577, 4609, 4641, 4673, 4705, 4737, 4769, 4801, 4833, 4865, 4897, 4929, 4961, 4993, 5025];
const POKEDEX_CURSOR_YS = [235, 267, 299, 331, 363];
const POKEDEX_SELECTED_NUMBER_XS = [92, 108, 124];
const POKEDEX_SELECTED_NAME_XS = [172, 188, 204, 220, 236, 252, 268, 284, 300, 316];
const POKEDEX_SELECTED_HEIGHT_XS = [164, 180, 198, 214];
const POKEDEX_SELECTED_WEIGHT_XS = [274, 290, 306, 322];

class Pokedex extends Sketch {

    constructor() {
        super();

        this.seen = getSeenPokemonIds();
        this.captured = getObtainedPokemonIds();

        background(255)
        this.createFrame();
        this.attachControls(new Controls(() => { }, () => { }, () => { }, this.leftFlipperCallback, this.centerFlipperCallback, this.rightFlipperCallback));

        this.background = Asset.getBackground("pokedex");

        this.createNumberRows();

        this.createBackgroundSprite();
        this.createCursor();

        this.createPokemonImage();
        this.createCurrentPokemonNumber();
        this.createCurrentPokemonName();
        this.createCurrentPokemonType();
        this.createCurrentPokemonHeight();
        this.createCurrentPokemonWeight();
        this.updatePokemonDataData();

        this.createScrollbar();

    }

    createScrollbar() {
        this.scrollbar = new Sprite(324, 247, 16, 4, "static");
        this.scrollbar.debug = DEBUG;
        this.scrollbar.layer = SCENARIO_LAYER;
        this.scrollbar.addAnimation("scrollbar", Asset.getAnimation("pokedexScrollbar"));
    }

    updateSelectedPokemonNumber() {
        for (let i = 0; i < 3; i++) {
            this.currentPokemonNumber[i].changeValue(this.getSelectedByCursor().id.toString()[i]);
        }
    }

    createCurrentPokemonNumber() {
        this.currentPokemonNumber = [];
        for (let i = 0; i < POKEDEX_SELECTED_NUMBER_XS.length; i++) {
            let number = new PokedexNumberSprite(POKEDEX_SELECTED_NUMBER_XS[i], 124, this.getSelectedByCursor().id.toString()[i], true);
            number.sprite.layer = OVER_SCENARIO_LAYER;
            this.currentPokemonNumber.push(number);
        }
    }

    createCurrentPokemonHeight() {
        this.currentPokemonHeight = [];
        //TODO internationalize
        let heightString = this.getSelectedByCursor().heightI;
        for (let i = 0; i < POKEDEX_SELECTED_HEIGHT_XS.length; i++) {
            let height = new PokedexNumberSprite(POKEDEX_SELECTED_HEIGHT_XS[i], 190, heightString[i], true);
            height.sprite.layer = OVER_SCENARIO_LAYER;
            this.currentPokemonHeight.push(height);
        }
    }

    updateCurrentPokemonHeight(seen = false) {
        let height = "     ";
        if (seen) {
            height = this.getSelectedByCursor().heightI;
        }
        for (let i = 0; i < POKEDEX_SELECTED_HEIGHT_XS.length; i++) {
            this.currentPokemonHeight[i].changeValue(height[i]);
        }
    }

    createCurrentPokemonWeight() {
        this.currentPokemonWeight = [];
        //TODO internationalize
        let weightString = this.getSelectedByCursor().weightM;
        for (let i = 0; i < POKEDEX_SELECTED_WEIGHT_XS.length; i++) {
            let weight = new PokedexNumberSprite(POKEDEX_SELECTED_WEIGHT_XS[i], 190, weightString[i], true);
            weight.sprite.layer = OVER_SCENARIO_LAYER;
            this.currentPokemonWeight.push(weight);
        }
    }

    updateCurrentPokemonWeight(seen = false) {
        let weight = "    ";
        if (seen) {
            weight = this.getSelectedByCursor().weightM;
        }
        for (let i = 0; i < POKEDEX_SELECTED_WEIGHT_XS.length; i++) {
            this.currentPokemonWeight[i].changeValue(weight[i]);
        }
    }

    updateSelectedPokemonName(seen = false) {
        let name = "          ";
        if (seen) {
            name = I18NManager.translate(this.getSelectedByCursor().name).toUpperCase().padEnd(10, " ");
        }
        for (let i = 0; i < POKEDEX_SELECTED_NAME_XS.length; i++) {
            this.currentPokemonName[i].changeValue(name[i]);
        }
    }

    createCurrentPokemonName() {
        this.currentPokemonName = [];
        const name = I18NManager.translate(this.getSelectedByCursor().name).toUpperCase().padEnd(10, " ");
        for (let i = 0; i < POKEDEX_SELECTED_NAME_XS.length; i++) {
            let letter = new PokedexLetterSprite(POKEDEX_SELECTED_NAME_XS[i], 138, name[i], true);
            letter.sprite.layer = OVER_SCENARIO_LAYER;
            this.currentPokemonName.push(letter);
        }
    }

    updateSelectedPokemonType(captured = false) {
        let type = "          ";
        if (captured) {
            type = I18NManager.translate(this.getSelectedByCursor().type).toUpperCase().padEnd(10, " ");
        }
        for (let i = 0; i < POKEDEX_SELECTED_NAME_XS.length; i++) {
            this.currentPokemonType[i].changeValue(type[i]);
        }
    }

    createCurrentPokemonType() {
        this.currentPokemonType = [];
        const type = I18NManager.translate(this.getSelectedByCursor().type).toUpperCase().padEnd(10, " ");
        for (let i = 0; i < POKEDEX_SELECTED_NAME_XS.length; i++) {
            let letter = new PokedexLetterSprite(POKEDEX_SELECTED_NAME_XS[i], 160, type[i], true);
            letter.sprite.layer = OVER_SCENARIO_LAYER;
            this.currentPokemonType.push(letter);
        }
    }

    createPokemonImage() {
        this.pokemonImageSprite = new Sprite(92, 164, 96, 64, "static");
        this.pokemonImageSprite.debug = DEBUG;
        this.pokemonImageSprite.layer = SCENARIO_LAYER;
        for (let i = 0; i < ALL_POKEMON.length; i++) {
            this.pokemonImageSprite.addAnimation(ALL_POKEMON[i].id, Asset.getAnimation(ALL_POKEMON[i].id));
            this.pokemonImageSprite.addAnimation(ALL_POKEMON[i].id + "-bw", Asset.getAnimation(ALL_POKEMON[i].id + "-bw"));
        }
    }

    updatePokemonDataData() {
        const pokemonId = this.getSelectedByCursor().id;
        this.updateSelectedPokemonNumber();

        if (this.seen.includes(pokemonId)) {
            this.pokemonImageSprite.visible = true;
            this.pokemonImageSprite.changeAnimation(pokemonId + "-bw");
            this.updateSelectedPokemonName(true);

            if (this.captured.includes(pokemonId)) {
                this.pokemonImageSprite.changeAnimation(pokemonId);
                this.updateSelectedPokemonType(true);
                this.updateCurrentPokemonHeight(true);
                this.updateCurrentPokemonWeight(true);
            } else {
                this.updateSelectedPokemonType(false);
                this.updateCurrentPokemonHeight(false);
                this.updateCurrentPokemonWeight(false);
            }
        } else {
            this.pokemonImageSprite.visible = false;
            this.updateSelectedPokemonName(false);
            this.updateSelectedPokemonType(false);
            this.updateCurrentPokemonHeight(false);
            this.updateCurrentPokemonWeight(false);
        }
    }

    createCursor() {
        this.cursorSprite = new Sprite(70, POKEDEX_CURSOR_YS[0], 16, 16, "static");
        this.cursorPosition = 0;
        this.cursorSprite.debug = DEBUG;
        this.cursorSprite.layer = SCENARIO_LAYER;
        this.cursorSprite.addAnimation("cursor", Asset.getAnimation("pokedexCursor"));
    }


    createBackgroundSprite() {
        this.backgroundSprite = new Sprite(188, 244, 1, 1, "static");
        this.backgroundSprite.debug = DEBUG;
        this.backgroundSprite.layer = SCENARIO_LAYER;
        this.backgroundSprite.addAnimation("pokedexBackground", Asset.getAnimation("pokedexBackground"));
        this.backgroundSprite.ani.playing = false;
        this.backgroundTimer = new EventTimer(2000);
        this.backgroundSprite.ani.onComplete = () => {
            this.backgroundSprite.ani.playing = false;
        }
    }

    createNumberRows() {
        this.rows = [];
        for (let i = 0; i < ALL_POKEMON.length; i++) {
            this.rows.push(new PokedexPokemon(ALL_POKEMON[i], POKEDEX_ROW_NUMBER_YS[i], this.seen.includes(ALL_POKEMON[i].id)));
        }
        this.listOffset = 0;
    }


    leftFlipperCallback = () => {
        if (this.cursorPosition > 0) {
            this.cursorPosition--;
            this.cursorSprite.y = POKEDEX_CURSOR_YS[this.cursorPosition];
            this.updatePokemonDataData();
        } else if (this.listOffset > 0) {
            this.listOffset--;
            //Dont scroll the scollbar once every six scrolls
            if (this.listOffset % 6) {
                this.scrollbar.y--;
            }
            this.rows.forEach(row => row.moveDown());
            this.updatePokemonDataData();
        }
    }

    getSelectedByCursor() {
        return ALL_POKEMON[this.cursorPosition + this.listOffset];
    }

    rightFlipperCallback = () => {
        if (this.cursorPosition < POKEDEX_CURSOR_YS.length - 1) {
            this.cursorPosition++
            this.cursorSprite.y = POKEDEX_CURSOR_YS[this.cursorPosition];
            this.updatePokemonDataData();
        } else if (this.listOffset < POKEDEX_ROW_NUMBER_YS.length - 5) {
            this.listOffset++;
            if (this.listOffset % 6) {
                this.scrollbar.y++;
            }
            this.rows.forEach(row => row.moveUp());
            this.updatePokemonDataData();
        }

    }

    centerFlipperCallback = () => {

    }

    setup() {
        Audio.playMusic("titleScreen");
    }

    draw() {
        super.draw();

    }

}
