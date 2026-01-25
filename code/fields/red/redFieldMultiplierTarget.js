class RedFieldMultiplierTarget extends MultiplierTarget {
    constructor(colliderX, colliderY, displayX, displayY, callback) {
        super(colliderX, colliderY, displayX, displayY, callback);
    }

    getActiveMultiplierAnimation() {
        return Asset.getAnimation('redFieldMultiplierActive');
    }

    getInactiveMultiplierAnimation() {
        return Asset.getAnimation('redFieldMultiplier');
    }

    static createLeftMultiplierTarget(callback) {
        return new RedFieldMultiplierTarget(85, 298, 75, 281, callback);
    }
    
    static createRightMultiplierTarget(callback) {
        return new RedFieldMultiplierTarget(233, 298, 245, 281, callback);
    }

}