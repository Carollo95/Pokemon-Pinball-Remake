const SEEL_VISIBLE_PEARLS = 20;

class PearlCounter {
    constructor() {
        this.pearls = new Array(SEEL_VISIBLE_PEARLS);
        this.counter = 0;

        for (let i = 0; i < SEEL_VISIBLE_PEARLS; i++) {
            let sprite = new Sprite(35 + i * 16, 106, 16, 16, "none");
            sprite.addAnimation("pearl", Asset.getAnimation('animPearl'));
            sprite.addAnimation("shiningPearl", Asset.getAnimation('animShiningPearl'));
            sprite.visible = false;
            sprite.debug = DEBUG;
            this.pearls[i] = sprite;
        }

    }

    addPearl() {
        if (this.counter < SEEL_VISIBLE_PEARLS) {
            this.pearls[this.counter].visible = true;
        }

        if (this.counter > 0 && this.counter < SEEL_VISIBLE_PEARLS + 1) {
            this.pearls[this.counter - 1].changeAnimation("pearl");
        }

        this.counter++;
    }

    getCount() {
        return this.count;
    }
}
