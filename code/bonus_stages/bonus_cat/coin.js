const COIN_WIDTH = 32;
const COIN_HEIGHT = 32;

const COIN_HIGH_LANE = 244;
const COIN_LOW_LANE = 278;

const COIN_HIGH_SLOT_1 = 65;
const COIN_HIGH_SLOT_2 = 100;
const COIN_HIGH_SLOT_3 = 135;
const COIN_HIGH_SLOT_4 = 170;
const COIN_HIGH_SLOT_5 = 210;
const COIN_HIGH_SLOT_6 = 245;
const COIN_HIGH_SLOT_7 = 280;
const COIN_HIGH_SLOT_8 = 315;

const COIN_LOW_SLOT_1 = 100;
const COIN_LOW_SLOT_2 = 135;
const COIN_LOW_SLOT_3 = 170;
const COIN_LOW_SLOT_4 = 205;
const COIN_LOW_SLOT_5 = 240;
const COIN_LOW_SLOT_6 = 275;

class Coin {
    disabled = false;

    constructor(x, isHighLane) {
        let y = isHighLane ? COIN_HIGH_LANE : COIN_LOW_LANE;
        this.sprite = new Sprite(x, y, COIN_WIDTH, COIN_HEIGHT, "static");
        this.sprite.addAnimation("idle", animCoinIdle);
        this.disableSprite();
    }

    update(ballSprite) {

    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.disabled = true;
    }

    enableSprite(){
        enableSprite(this.sprite);
        this.sprite.visible = true;
        this.disabled = false;
    }


}