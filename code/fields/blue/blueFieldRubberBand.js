class BlueFieldRubberBand extends RubberBand {
    constructor(x, y, facingRight = true) {
        super(x, y, facingRight);
    }

    getAnimation() {
        return Asset.getAnimation('blueFieldRubberBand');
    }

    static createLeftRubberBand() {
        return new BlueFieldRubberBand(235, 446, true);
    }

    static createRightRubberBand() {
        return new BlueFieldRubberBand(85, 446, false);
    }
}
