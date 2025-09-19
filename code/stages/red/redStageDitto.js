class RedStageDitto {

    constructor() {
        this.openSprite = new Sprite([
            [18, 142],
            [24, 116],
            [30, 100],
            [38, 84],
            [44, 76],
            [56, 63],
            [64, 58],
            [4, 34],
            [4, 144],
            [18, 142]
        ], 'static');

        this.openSprite.addAnimation(Asset.getAnimation('redStageDittoOpen'));
    }


}