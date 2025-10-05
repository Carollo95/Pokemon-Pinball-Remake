const MEOWTH_VISIBLE_COINS = 20;
class CoinCounter {

    constructor() {
        this.coins = new Array(MEOWTH_VISIBLE_COINS);
        this.counter = 0;

        for (let i = 0; i < MEOWTH_VISIBLE_COINS; i++) {
            let sprite = new Sprite(35 + i * 16, 106, 16, 16, "none");
            sprite.layer = SPRITE_LAYER;
            sprite.addAnimation("coin", Asset.getAnimation('animCoinCounter'));
            sprite.addAnimation("coinShine", Asset.getAnimation('animCoinCounterShine'));
            sprite.mirror.x = i % 2;
            sprite.visible = false;
            sprite.debug = DEBUG;
            this.coins[i] = sprite;
        }
    }

    addCoins(coins) {
        for (let i = 0; i < coins; i++) {
            this.addCoin();
        }
    }

    addCoin() {
        if (this.counter < MEOWTH_VISIBLE_COINS) {
            this.coins[this.counter].visible = true;
        }

        if (this.counter > 0 && this.counter < MEOWTH_VISIBLE_COINS +1) {
            this.coins[this.counter - 1].changeAnimation("coin");
        }

        this.counter++;
    }

}