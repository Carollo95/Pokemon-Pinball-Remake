const TABLE_SELECTOR_X = [116, 260]

class FieldSelector extends Sketch {

    constructor() {
        super();
        this.background = Asset.getBackground('fieldSelector');
        this.createFrame();
        this.attachControls(new Controls(() => { }, () => { }, () => { }, this.leftFlipperCallback, this.centerFlipperCallback, this.rightFlipperCallback));
        this.createSelectorSprite();

        this.pressWaitTimer = new EventTimer(1000);
        this.pressWaitTimer.restart();

    }

    createSelectorSprite() {
        this.selectorSprite = new Sprite(TABLE_SELECTOR_X[0], 232, 1, 1, "static");
        this.selectorSprite.debug = DEBUG;
        this.selectorSprite.layer = OVER_SCENARIO_LAYER;
        this.selectorSprite.addAnimation("tableSelector", Asset.getAnimation("tableSelector"));
        this.column = 0;

    }

    leftFlipperCallback = () => {
        //TODO missing sfx
        this.column = (this.column - 1 + TABLE_SELECTOR_X.length) % TABLE_SELECTOR_X.length;
        this.selectorSprite.position.x = TABLE_SELECTOR_X[this.column];
    }

    rightFlipperCallback = () => {
        //TODO missing sfx
        this.column = (this.column + 1) % TABLE_SELECTOR_X.length;
        this.selectorSprite.position.x = TABLE_SELECTOR_X[this.column];

    }

    centerFlipperCallback = () => {
        if (this.pressWaitTimer.hasElapsed()) {
            switch (this.column) {
                case 0:
                        Audio.stopMusic();
                        Audio.playSFX("sfx02", 0, () => {
                            EngineUtils.flashWhite(5, 10, 255, () => {
                                EngineUtils.startRedField();
                            });
                        });
                    break;
                case 1:
                    Audio.stopMusic();
                    Audio.playSFX("sfx02", 0, () => {
                        EngineUtils.flashWhite(5, 10, 255, () => {
                            EngineUtils.startBlueField();
                        });
                    });
                    break;
            }
        }
    }

    setup() {
        Audio.playMusic("fieldSelect");
    }

    draw() {
        super.draw();
    }

}
