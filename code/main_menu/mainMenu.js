class MainMenu extends Sketch {

    constructor() {
        super();
        this.createFrame();
        this.attachControls(new Controls(() => { }, () => { }, () => { }, this.leftFlipperCallback, this.centerFlipperCallback, this.rightFlipperCallback));

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

    leftFlipperCallback = () => {

    }

    rightFlipperCallback = () => {

    }

    centerFlipperCallback = () => {

    }

    setup() {

    }

    draw() {
        super.draw();

        if (this.backgroundTimer.hasElapsed()) {
            this.backgroundSprite.ani.playing = true;
            this.backgroundTimer.restart();
        }
    }

}
