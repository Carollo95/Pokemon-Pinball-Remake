class CoinCounter {
    coins = new Array(20);
    counter = 0;

    constructor() {
        for (let i = 0; i < 20; i++) {
            let sprite = new Sprite(34 + i * 16, 106, 16, 16, "none");
            sprite.addAnimation("coin", animCoinCounter);
            sprite.addAnimation("coinShine", animCoinCounterShine);
            sprite.mirror.x = i % 2;
            sprite.visible = false;
            sprite.debug = DEBUG;
            this.coins[i] = sprite;
        }
    }

    addCoin() {
        if (this.counter < 20) {
            this.coins[this.counter].visible = true;
        }

        if (this.counter > 0 && this.counter < 21) {
            this.coins[this.counter - 1].changeAnimation("coin");
        }

        this.counter++;
    }

}