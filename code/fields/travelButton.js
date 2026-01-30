const TIME_FOR_COUNTER_UP = 10000;

class TravelButton {

    constructor(onHitCallback, onFullTravelCallback) {
        this.onHitCallback = onHitCallback;
        this.onFullTravelCallback = onFullTravelCallback;

        this.collider = this.getColliderSprite();
        this.collider.debug = DEBUG;
        this.collider.visible = DEBUG;

        this.buttonSprite = this.getButtonSprite();
        this.buttonSprite.debug = DEBUG;
        this.buttonSprite.layer = SCENARIO_LAYER;

        this.buttonSprite.anis.cutFrames = true;


        this.buttonSprite.addAni('hurt', this.getButtonSpriteHurtAnimation());
        this.buttonSprite.addAni('idle', this.getButtonSpriteIdleAnimation());


        this.timeOfLastCounterUpgrade = 0;
        this.counterSprite = this.getCounterSprite();
        this.counterSprite.debug = DEBUG;
        this.counterSprite.layer = SCENARIO_LAYER;
        this.counterSprite.addAni('idle', this.getCounterAnimation());
        this.counterLevel = 0;
        this.counterSprite.ani.frame = this.counterLevel;
        this.counterSprite.ani.playing = false;

    }

    update(ball) {
        if (this.collider.collide(ball)) {
            this.updateCounter();
            this.onHitCallback();
            this.changeAnimationToHurt();
            Audio.playSFX(this.getHitSFX());

            this.buttonSprite.ani.frame = 0;
            this.buttonSprite.ani.playing = true;
            this.buttonSprite.ani.looping = false;
            this.buttonSprite.ani.onComplete = () => {
                this.buttonSprite.changeAnimation('idle');
            };

        }

        if (millis() > this.timeOfLastCounterUpgrade + TIME_FOR_COUNTER_UP) {
            this.degradeCounter();
        }

    }

    changeAnimationToHurt() {
        this.buttonSprite.changeAnimation('hurt');
    }

    updateCounter() {
        if (this.buttonSprite.ani.name === 'idle' && this.counterLevel < 3) {
            this.counterLevel++;
            this.counterSprite.ani.frame = this.counterLevel;
            this.timeOfLastCounterUpgrade = millis();
            if (this.counterLevel === 3) {
                this.onFullTravelCallback();
            }
        }
    }

    degradeCounter() {
        if (this.counterLevel > 0) {
            this.counterLevel--;
            this.counterSprite.ani.frame = this.counterLevel;
            this.timeOfLastCounterUpgrade = millis();
        }
    }

    reset() {
        this.counterLevel = 0;
        this.counterSprite.ani.frame = this.counterLevel;
    }





}
