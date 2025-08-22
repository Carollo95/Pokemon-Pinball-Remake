const COIN_MULTIPLIER_BLINKING_FRAMES = 6; //Frame count between visible and not visible while blinking

const COIN_WIDTH = 36; //Width of the coin collider
const COIN_HEIGHT = 36; //Height of the coin collider

const COIN_HIGH_LANE = 244; //Height for the higher row of coins
const COIN_LOW_LANE = 286; //Height for the lower row of coins

const COIN_MULTIPLIER_THRESHOLD_MILLIS = 1000; //Number of milliseconds between coin catches to get a multiplier

//Horizontal positions for the coins on the higher row
const COIN_HIGH_SLOT_1 = 62;
const COIN_HIGH_SLOT_2 = 98;
const COIN_HIGH_SLOT_3 = 135;
const COIN_HIGH_SLOT_4 = 172;
const COIN_HIGH_SLOT_5 = 208;
const COIN_HIGH_SLOT_6 = 244;
const COIN_HIGH_SLOT_7 = 278;
const COIN_HIGH_SLOT_8 = 314;

//Horizontal positions for the coins on the lower row
const COIN_LOW_SLOT_1 = 100;
const COIN_LOW_SLOT_2 = 135;
const COIN_LOW_SLOT_3 = 170;
const COIN_LOW_SLOT_4 = 205;
const COIN_LOW_SLOT_5 = 240;
const COIN_LOW_SLOT_6 = 275;

class Coin {
    // shared multiplier state (per-level)
    static timeOfLastCoinTaken = 0;
    static coinMultiplier = 1;

    constructor(x, isHighLane) {
        this.disabled = false;
        this.timeOfLastHit = -10000;
        this.localMultiplier = 1;

        this.dissapearAnimationMillis = 0;

        const y = isHighLane ? COIN_HIGH_LANE : COIN_LOW_LANE;

        this.sprite = new Sprite(x, y, COIN_WIDTH, COIN_HEIGHT, "static");
        this.createAuxiliarySpriteIfNeeded();

        this.sprite.addAnimation("dissapear", animCoinDisappear);
        this.sprite.addAnimation("idle", animCoinIdle);
        this.sprite.debug = DEBUG;

        this.multiplierSprite = new Sprite(x, y - 16, 32, 16, "none");
        this.multiplierSprite.addAnimation("6", animCoinMultiplier6);
        this.multiplierSprite.addAnimation("5", animCoinMultiplier5);
        this.multiplierSprite.addAnimation("4", animCoinMultiplier4);
        this.multiplierSprite.addAnimation("3", animCoinMultiplier3);
        this.multiplierSprite.addAnimation("2", animCoinMultiplier2);
        this.multiplierSprite.visible = false;
        this.multiplierSprite.debug = DEBUG;

        this.disableSprite();
        this.dissapearAnimationMillis = animCoinDisappear.length * animCoinDisappear.frameDelay;
    }

    /**
     * The sprites for the coins on the lower coin have a gap on the sides, where a flying coin 
     * can fall and on top of that the ball can fall, making it unable to touch the coin and 
     * making it dissapear, softlocking the bonus level. This sprite prevents anything to 
     * fall there 
     */
    createAuxiliarySpriteIfNeeded() {
        if (this.sprite.pos.y == COIN_LOW_LANE) {
            if (this.sprite.pos.x == COIN_LOW_SLOT_1) {
                this.auxiliarySprite = new Sprite([
                    [40, 268],
                    [82, 268],
                    [82, 268 + COIN_HEIGHT],
                    [40, 268]], "static");
                //this.auxiliarySprite.visible = false;
            } else if (this.sprite.pos.x == COIN_LOW_SLOT_6) {
                this.auxiliarySprite = new Sprite([
                    [290, 268],
                    [340, 268],
                    [290, 268 + COIN_HEIGHT],
                    [290, 268]], "static");
                //this.auxiliarySprite.visible = false;
            }
        }

    }

    update(ballSprite) {
        if (!this.disabled) {
            if (this.isCoinHit(ballSprite)) {
                this.onCoinHit();
                return Coin.coinMultiplier;
            } else if (this.timeToDisappear()) {
                this.disableSprite();
            }
        }

        this.blinkMultiplierIfNecessary();

        return 0;
    }


    blinkMultiplierIfNecessary() {
        if (millis() - this.timeOfLastHit > COIN_MULTIPLIER_THRESHOLD_MILLIS) {
            this.multiplierSprite.visible = false;
        } else if (this.localMultiplier > 1) {
            this.blinkMultiplier();
        }
    }

    isCoinHit(ballSprite) {
        return this.sprite.animation.name == "idle" && (this.sprite.collide(ballSprite) || (this.auxiliarySprite != null && this.auxiliarySprite.collide(ballSprite)))
    }

    timeToDisappear() {
        return this.sprite.animation.name == "dissapear" && millis() - this.timeOfLastHit > (this.dissapearAnimationMillis)
    }

    onCoinHit() {
        EngineUtils.disableSprite(this.sprite);
        sfx32.play();
        this.sprite.changeAnimation("dissapear");
        this.timeOfLastHit = millis();

        if (millis() - Coin.timeOfLastCoinTaken < COIN_MULTIPLIER_THRESHOLD_MILLIS) {
            if (Coin.coinMultiplier < 6) Coin.coinMultiplier++;
            this.localMultiplier = Coin.coinMultiplier;
            this.multiplierSprite.changeAnimation(Coin.coinMultiplier.toString());
            this.multiplierSprite.visible = true;
        } else {
            Coin.coinMultiplier = 1;
            this.multiplierSprite.visible = false;
        }
        Coin.timeOfLastCoinTaken = millis();
    }

    disableSprite() {
        EngineUtils.disableSprite(this.sprite);
        if (this.auxiliarySprite != null) {
            this.auxiliarySprite.remove()
        }
        this.sprite.visible = false;
        this.disabled = true;
    }

    enableSprite() {
        EngineUtils.enableSprite(this.sprite);
        if (this.auxiliarySprite != null) {
            this.createAuxiliarySpriteIfNeeded();
        }
        this.sprite.changeAnimation("idle");
        sfx34.play();
        this.sprite.visible = true;
        this.disabled = false;
    }

    isClose(thrown) {
        const dx = this.sprite.pos.x - thrown.pos.x;
        const dy = this.sprite.pos.y - thrown.pos.y;
        return dx * dx + dy * dy < 325;
    }

    blinkMultiplier() {
        this.multiplierSprite.visible = (frameCount % (COIN_MULTIPLIER_BLINKING_FRAMES * 2) < COIN_MULTIPLIER_BLINKING_FRAMES);
    }

}