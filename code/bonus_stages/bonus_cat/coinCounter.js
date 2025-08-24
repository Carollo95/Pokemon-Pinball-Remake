class CoinCounter {

    constructor() {
        this.coins = new Array(20);
        this.counter = 0;
        
        for (let i = 0; i < 20; i++) {
            let sprite = new Sprite(35 + i * 16, 106, 16, 16, "none");
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
        if (this.counter < 20) {
            this.coins[this.counter].visible = true;
        }

        if (this.counter > 0 && this.counter < 21) {
            this.coins[this.counter - 1].changeAnimation("coin");
        }

        this.counter++;
    }

}