const COIN_MULTIPLIER_BLINKING_FRAMES = 6; //Frame count between visible and not visible while blinking

const COIN_WIDTH = 36; //Width of the coin collider
const COIN_HEIGHT = 36; //Height of the coin collider

const COIN_HIGH_LANE = 244; //Height for the higher row of coins
const COIN_LOW_LANE = 286; //Height for the lower row of coins

const COIN_MULTIPLIER_THRESHOLD_MILLIS = 1000; //Number of milliseconds for the multiplier to show on screen

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

    constructor(x, isHighLane, onHitCallback) {
        this.disabled = false;
        this.timeOfLastHit = -10000;
        this.localMultiplier = 1;

        this.dissapearAnimationMillis = 0;

        this.onHitCallback = onHitCallback;

        const y = isHighLane ? COIN_HIGH_LANE : COIN_LOW_LANE;

        this.sprite = new Sprite(x, y, COIN_WIDTH, COIN_HEIGHT, "static");
        this.sprite.layer = SPRITE_LAYER;
        this.createAuxiliarySpriteIfNeeded();

        this.dissapearAnim = Asset.getAnimation('animCoinDisappear');
        this.idleAnim = Asset.getAnimation('animCoinIdle');
        this.sprite.addAnimation("dissapear", this.dissapearAnim);
        this.sprite.addAnimation("idle", this.idleAnim);
        this.sprite.debug = DEBUG;

        this.multiplierSprite = new Sprite(x, y - 16, 32, 16, "none");
        this.multiplierSprite.layer = SPRITE_LAYER;
        this.multiplierSprite.addAnimation("6", Asset.getAnimation('animCoinMultiplier6'));
        this.multiplierSprite.addAnimation("5", Asset.getAnimation('animCoinMultiplier5'));
        this.multiplierSprite.addAnimation("4", Asset.getAnimation('animCoinMultiplier4'));
        this.multiplierSprite.addAnimation("3", Asset.getAnimation('animCoinMultiplier3'));
        this.multiplierSprite.addAnimation("2", Asset.getAnimation('animCoinMultiplier2'));
        this.multiplierSprite.visible = false;
        this.multiplierSprite.debug = DEBUG;

        this.disableSprite();
        const framesCount = (this.dissapearAnim.images && this.dissapearAnim.images.length) || (this.dissapearAnim.length || 1);
        this.dissapearAnimationMillis = framesCount * (this.dissapearAnim.frameDelay || 1);
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
                this.auxiliarySprite.visible = false;
                this.auxiliarySprite.debug = DEBUG;
                this.auxiliarySprite.layer = SPRITE_LAYER;
            } else if (this.sprite.pos.x == COIN_LOW_SLOT_6) {
                this.auxiliarySprite = new Sprite([
                    [290, 268],
                    [340, 268],
                    [290, 268 + COIN_HEIGHT],
                    [290, 268]], "static");
                this.auxiliarySprite.visible = false;
                this.auxiliarySprite.debug = DEBUG;
                this.auxiliarySprite.layer = SPRITE_LAYER;
            }
        }

    }

    update(ballSprite, lastElementHit) {
        if (!this.disabled) {
            if (this.isCoinHit(ballSprite)) {
                this.onCoinHit(lastElementHit);
                return Coin.coinMultiplier;
            } else if (this.timeToDisappear()) {
                this.disableSprite();
            }
        }

        this.updateMultiplierVisibility(lastElementHit);

        return 0;
    }


    updateMultiplierVisibility() {
        if (millis() > this.timeOfLastHit + COIN_MULTIPLIER_THRESHOLD_MILLIS) {
            this.multiplierSprite.visible = false;
        } else if (this.localMultiplier > 1) {
            EngineUtils.blinkSprite(this.multiplierSprite);
        }
    }

    isCoinHit(ballSprite) {
        return this.sprite.animation.name == "idle" && (this.sprite.collide(ballSprite) || (this.auxiliarySprite != null && this.auxiliarySprite.collide(ballSprite)))
    }

    timeToDisappear() {
        return this.sprite.animation.name == "dissapear" && millis() - this.timeOfLastHit > (this.dissapearAnimationMillis)
    }

    onCoinHit(lastElementHit) {
        EngineUtils.disableSprite(this.sprite);
        Audio.playSFX('sfx32');
        this.sprite.changeAnimation("dissapear");

        if (lastElementHit === CAT_STAGE_LAST_HIT.COIN) {
            if (Coin.coinMultiplier < 6) Coin.coinMultiplier++;
            this.localMultiplier = Coin.coinMultiplier;
            this.multiplierSprite.changeAnimation(Coin.coinMultiplier.toString());
            this.multiplierSprite.visible = true;
        } else {
            Coin.coinMultiplier = 1;
            this.multiplierSprite.visible = false;
        }
        this.onHitCallback(Coin.coinMultiplier);
        this.timeOfLastHit = millis();
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
        Audio.playSFX('sfx34');
        this.sprite.visible = true;
        this.disabled = false;
    }

    isClose(thrown) {
        const dx = this.sprite.pos.x - thrown.pos.x;
        const dy = this.sprite.pos.y - thrown.pos.y;
        return dx * dx + dy * dy < 325;
    }

}