class BlueFieldMultiplierTarget extends MultiplierTarget {
    constructor(colliderX, colliderY, displayX, displayY, callback) {
        super(colliderX, colliderY, displayX, displayY, callback);
    }

    getActiveMultiplierAnimation() {
        return Asset.getAnimation('blueFieldMultiplierActive');
    }

    getInactiveMultiplierAnimation() {
        return Asset.getAnimation('blueFieldMultiplier');
    }


    static createLeftMultiplierTarget(callback) {
        const collider = new Sprite(87, 302, 15, 15, "none");
        return new BlueFieldMultiplierTarget(collider, 75, 277, callback);
    }

    static createRightMultiplierTarget(callback) {
        const collider = new Sprite(231, 302, 15, 15, "none");
        return new BlueFieldMultiplierTarget(collider, 245, 277, callback);
    }

}