class SaverAgain {

    constructor() {
        this.saverSprite = new Sprite(160, 485, 64, 16, 'none');
        this.saverSprite.debug = DEBUG;
        this.saverSprite.layer = SCENARIO_LAYER;
        this.saverSprite.addAnimation('saver', Asset.getAnimation('saver'));
        this.saverSprite.ani.playing = false;


        this.againSprite = new Sprite(160, 501, 64, 16, 'none');
        this.againSprite.debug = DEBUG;
        this.againSprite.layer = SCENARIO_LAYER;
        this.againSprite.addAnimation('again', Asset.getAnimation('again'));
        this.againSprite.ani.playing = false;

        this.saverTimer = new EventTimer(0);
    }

    update() {
        if (this.saverTimer.hasElapsed()) {
            this.saverSprite.ani.frame = 0;
        }
    }

    set30sSaver() {
        this.setSaver(30000);
    }

    setSaver(time) {
        this.saverTimer.changeCooldown(time);
        this.saverSprite.ani.frame = 1;
    }

    isSaver() {
        return this.saverSprite.ani.frame === 1;
    }



}