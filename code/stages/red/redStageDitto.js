class RedStageDitto {

    constructor() {
        this.close();
    }


    open() {

        if (this.closeSprite) { this.closeSprite.remove(); }

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
        this.openSprite.debug = DEBUG;
    }

    close() {
        if (this.openSprite) { this.openSprite.remove(); }


        this.closeSprite = new Sprite([
            [20, 188],
            [26, 156],
            [34, 138],
            [46, 120],
            [54, 108],
            [70, 92],
            [80, 84],
            [90, 70],
            [20, 44],
            [18, 160],
            [18, 190], 
            [20, 188],
        ], 'static');
        this.closeSprite.addAnimation(Asset.getAnimation('redStageDittoClosed'));
        this.closeSprite.debug = DEBUG;

    }

    fullyOpen() {

    }



}