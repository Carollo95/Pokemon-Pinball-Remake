const COIN_WIDTH = 36;
const COIN_HEIGHT = 36;

const COIN_HIGH_LANE = 244;
const COIN_LOW_LANE = 286;

const COIN_CLOSENESS_COLLIDER_DIAMETER = 38;

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

class Coin {
    disabled = false;
    timeOfLastHit = 0;
    dissapearAnimationMillis;
    sprite;

    constructor(x, isHighLane) {
        let y = isHighLane ? COIN_HIGH_LANE : COIN_LOW_LANE;
        this.sprite = new Sprite(x, y, COIN_WIDTH, COIN_HEIGHT, "static");
        this.sprite.addAnimation("dissapear", animCoinDisappear);
        this.sprite.addAnimation("idle", animCoinIdle);
        this.sprite.debug = DEBUG;
        this.disableSprite();
        this.dissapearAnimationMillis = animCoinDisappear.length * animCoinDisappear.frameDelay;
    }

    update(ballSprite) {
        if (!this.disabled) {
            if (this.sprite.animation.name == "idle" && this.sprite.collide(ballSprite)) {
                disableSprite(this.sprite);
                this.sprite.changeAnimation("dissapear");
                this.timeOfLastHit = millis();
                return true;
            } else if (this.sprite.animation.name == "dissapear" && millis() - this.timeOfLastHit > (this.dissapearAnimationMillis)) {
                this.disableSprite();
            }
        }
        return false;
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.disabled = true;
    }

    enableSprite() {
        enableSprite(this.sprite);
        this.sprite.visible = true;
        this.disabled = false;
    }

    isClose(thrown) {
        const dx = this.sprite.pos.x - thrown.pos.x;
        const dy = this.sprite.pos.y - thrown.pos.y;
        return dx * dx + dy * dy < 325;
    }

}