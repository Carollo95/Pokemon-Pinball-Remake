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
        let collider = new Sprite(85, 300, 6, 9, "none");
        return new RedFieldMultiplierTarget(collider, 75, 281, callback);
    }
    
    static createRightMultiplierTarget(callback) {
        let collider = new Sprite(233, 298, 6, 9, "none");
        return new RedFieldMultiplierTarget(collider, 245, 281, callback);
    }

}