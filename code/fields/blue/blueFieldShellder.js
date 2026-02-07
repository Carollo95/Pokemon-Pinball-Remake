class BlueFieldShellder extends Bumper {

    constructor(x, y, onHitCallback) {
        super(x, y, onHitCallback);
    }

    getIdleAnimation() {
        return Asset.getAnimation('blueFieldShellderIdle');
    }

    getHurtAnimation() {
        return Asset.getAnimation('blueFieldShellderHurt');
    }


    update(ball) {
        super.update(ball);
    }

}