class TravelDiglett extends TravelButton {
    constructor(onDiglettHitCallback, onFullDugtrioCallback, mirror = false) {
        super(onDiglettHitCallback, onFullDugtrioCallback);
        this.buttonSprite.mirror.x = mirror;
        this.counterSprite.mirror.x = mirror;

        this.counterSprite.x = mirror ? 296 : 24;
        this.buttonSprite.x = mirror ? 262 : 58;
        this.collider.x = mirror ? 268 : 54;
    }

    getColliderSprite() {
        return new Sprite(0, 364, 16, "static");
    }

    getButtonSprite() {
        return new Sprite(0, 364, 22, 32, "none");
    }

    getCounterSprite() {
        return new Sprite(0, 364, 48, 32, "none");
    }

    getButtonSpriteIdleAnimation() {
        return Asset.getAnimation('redFieldDiglettIdle');
    }

    getButtonSpriteHurtAnimation() {
        return Asset.getAnimation('redFieldDiglettHurt');
    }

    getCounterAnimation() {
        return Asset.getAnimation('redFieldDugtrio');
    }
}