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
        return new BlueFieldMultiplierTarget(85, 298, 75, 277, callback);
    }

    static createRightMultiplierTarget(callback) {
        return new BlueFieldMultiplierTarget(233, 298, 245, 277, callback);
    }

}