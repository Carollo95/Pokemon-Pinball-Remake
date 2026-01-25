class RedFieldRubberBand extends RubberBand {
    constructor(x, y, facingRight = true) {
        super(x, y, facingRight);
    }

    getAnimation() {
        return Asset.getAnimation('redFieldRubberBand');
    }

    static createLeftRubberBand() {
        return new RedFieldRubberBand(235, 446, true);
    }

    static createRightRubberBand() {
        return new RedFieldRubberBand(85, 446, false);
    }
}
