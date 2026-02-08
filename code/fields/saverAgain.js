const SAVER_10_BLINK_RATE = 30;
const SAVER_10_BLINK_HALF_RATE = SAVER_10_BLINK_RATE / 2;
const SAVER_5_BLINK_RATE = 15;
const SAVER_5_BLINK_HALF_RATE = SAVER_5_BLINK_RATE / 2;

class SaverAgain {

    constructor() {
        this.saverSprite = new Sprite(160, 485, 64, 16, 'none');
        this.saverSprite.debug = DEBUG;
        this.saverSprite.layer = SCENARIO_LAYER;
        this.saverSprite.addAnimation('saver', Asset.getAnimation('saver'));
        this.saverSprite.ani.playing = false;
        //Fields start with the save active until the ball is launched
        this.saverSprite.ani.frame = 1;
        this.saver = true;


        this.againSprite = new Sprite(160, 501, 64, 16, 'none');
        this.againSprite.debug = DEBUG;
        this.againSprite.layer = SCENARIO_LAYER;
        this.againSprite.addAnimation('again', Asset.getAnimation('again'));
        this.againSprite.ani.playing = false;

        this.saverTimer = new EventTimer(Number.MAX_SAFE_INTEGER);
        this.saverTimer.restart();
    }

    update() {
        if (this.saverTimer.hasElapsed()) {
            this.saver = false;
            this.saverSprite.ani.frame = 0;
        } else if (this.saverTimer.hasLessThanMillisPending(5000)) {
            frameCount % SAVER_5_BLINK_RATE > SAVER_5_BLINK_HALF_RATE ?
                this.saverSprite.ani.frame = 0 :
                this.saverSprite.ani.frame = 1;
        } else if (this.saverTimer.hasLessThanMillisPending(10000)) {
            frameCount % SAVER_10_BLINK_RATE > SAVER_10_BLINK_HALF_RATE ?
                this.saverSprite.ani.frame = 0 :
                this.saverSprite.ani.frame = 1;
        }
    }

    set30sSaver() {
        this.setSaver(30000);
    }

    set60sSaver() {
        this.setSaver(60000);
    }

    set90sSaver() {
        this.setSaver(90000);
    }

    setSaver(time) {
        this.saver = true;
        this.saverTimer.changeCooldown(time);
        this.saverTimer.restart();
        this.saverSprite.ani.frame = 1;
    }

    isSaver() {
        return this.saver;
    }

    isExtra() {
        return this.againSprite.ani.frame === 1;
    }

    setExtra() {
        this.againSprite.ani.frame = 1;
    }

    disableExtra() {
        this.againSprite.ani.frame = 0;
    }

}