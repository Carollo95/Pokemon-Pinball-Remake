const MAIN_MENU_ROWS_Y = [310, 334]//, 358];

class MainMenu extends Sketch {

    constructor() {
        super();
        this.createFrame();
        this.attachControls(new Controls(() => { }, () => { }, () => { }, this.leftFlipperCallback, this.centerFlipperCallback, this.rightFlipperCallback));

        this.createBackgroundSprite();
        this.createSelectorSprite();
        //TODO remove if options are implemented
        this.createHiderRowSprite()
    }

    createBackgroundSprite() {
        this.backgroundSprite = new Sprite(188, 244, 1, 1, "static");
        this.backgroundSprite.debug = DEBUG;
        this.backgroundSprite.layer = SCENARIO_LAYER;
        this.backgroundSprite.addAnimation("mainMenuBackground", Asset.getAnimation("mainMenuBackground"));
        this.backgroundSprite.ani.playing = false;
        this.backgroundTimer = new EventTimer(2000);
        this.backgroundSprite.ani.onComplete = () => {
            this.backgroundSprite.ani.playing = false;
        }
    }

    createSelectorSprite() {
        this.selectorSprite = new Sprite(54, MAIN_MENU_ROWS_Y[0], 1, 1, "static");
        this.selectorSprite.debug = DEBUG;
        this.selectorSprite.layer = OVER_SCENARIO_LAYER;
        this.selectorSprite.addAnimation("mainMenuSelector", Asset.getAnimation("mainMenuSelector"));
        this.row = 0;

    }

    createHiderRowSprite() {
        this.hiderRowSprite = new Sprite(100, 364, 100, 32, "static");
        this.hiderRowSprite.layer = SCENARIO_LAYER;
        this.hiderRowSprite.color = "rgb(248, 248, 248)";
        this.hiderRowSprite.stroke = "rgb(248, 248, 248)";
        this.hiderRowSprite.strokeWeight = 0;
        
    }

    leftFlipperCallback = () => {
        this.row = (this.row - 1 + MAIN_MENU_ROWS_Y.length) % MAIN_MENU_ROWS_Y.length;
        this.selectorSprite.position.y = MAIN_MENU_ROWS_Y[this.row];
    }

    rightFlipperCallback = () => {
        this.row = (this.row + 1) % MAIN_MENU_ROWS_Y.length;
        this.selectorSprite.position.y = MAIN_MENU_ROWS_Y[this.row];

    }

    centerFlipperCallback = () => {
        switch (this.row) {
            case 0:
                EngineUtils.flashWhite();
                EngineUtils.startFieldMenu();
                break;
            case 1:
                console.log("Move to pokedex");
                break;
            case 2:
                console.log("Move to options");
                break;
        }
    }

    setup() {
        Audio.playMusic("titleScreen");
    }

    draw() {
        super.draw();

        if (this.backgroundTimer.hasElapsed()) {
            this.backgroundSprite.ani.playing = true;
            this.backgroundTimer.restart();
        }
    }

}
