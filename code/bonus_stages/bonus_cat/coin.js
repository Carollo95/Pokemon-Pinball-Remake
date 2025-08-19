const COIN_MULTIPLIER_BLINKING_FRAMES = 6; //Frame count between visible and not visible while blinking

const COIN_WIDTH = 36;
const COIN_HEIGHT = 36;

const COIN_HIGH_LANE = 244;
const COIN_LOW_LANE = 286;

const COIN_CLOSENESS_COLLIDER_DIAMETER = 38;

const COIN_MULTIPLIER_THRESHOLD_MILLIS = 1000;

const COIN_HIGH_SLOT_1 = 62;
const COIN_HIGH_SLOT_2 = 98;
const COIN_HIGH_SLOT_3 = 135;
const COIN_HIGH_SLOT_4 = 172;
const COIN_HIGH_SLOT_5 = 208;
const COIN_HIGH_SLOT_6 = 244;
const COIN_HIGH_SLOT_7 = 278;
const COIN_HIGH_SLOT_8 = 314;

const COIN_LOW_SLOT_1 = 100;
const COIN_LOW_SLOT_2 = 135;
const COIN_LOW_SLOT_3 = 170;
const COIN_LOW_SLOT_4 = 205;
const COIN_LOW_SLOT_5 = 240;
const COIN_LOW_SLOT_6 = 275;

let timeOfLastCoinTaken = 0;
let coinMultiplier = 1;

class Coin {
    disabled = false;
    timeOfLastHit = -10000;
    dissapearAnimationMillis;
    sprite;
    multiplierSprite;

    constructor(x, isHighLane) {
        let y = isHighLane ? COIN_HIGH_LANE : COIN_LOW_LANE;
        this.sprite = new Sprite(x, y, COIN_WIDTH, COIN_HEIGHT, "static");
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

        this.disableSprite();
        this.dissapearAnimationMillis = animCoinDisappear.length * animCoinDisappear.frameDelay;
    }

    update(ballSprite) {
        if (!this.disabled) {
            if (this.sprite.animation.name == "idle" && this.sprite.collide(ballSprite)) {
                this.onCoinHit();
                return coinMultiplier;
            } else if (this.sprite.animation.name == "dissapear" && millis() - this.timeOfLastHit > (this.dissapearAnimationMillis)) {
                this.disableSprite();
            }
        }

        if (millis() - this.timeOfLastHit > 1000) {
            this.multiplierSprite.visible = false;
        } else {
            this.blinkMultiplier();
        }

        return 0;
    }

    onCoinHit() {
        disableSprite(this.sprite);
        this.sprite.changeAnimation("dissapear");
        this.timeOfLastHit = millis();

        if (millis() - timeOfLastCoinTaken < COIN_MULTIPLIER_THRESHOLD_MILLIS) {
            if (coinMultiplier < 6) {
                coinMultiplier++;
            }
            this.multiplierSprite.changeAnimation(coinMultiplier.toString());
            this.multiplierSprite.visible = true;
        } else {
            coinMultiplier = 1;
            this.multiplierSprite.visible = false;
        }
        timeOfLastCoinTaken = millis();
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.disabled = true;
    }

    enableSprite() {
        enableSprite(this.sprite);
        this.sprite.changeAnimation("idle");
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