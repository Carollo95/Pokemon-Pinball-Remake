class BlueFieldTravelPoliwag extends TravelButton {
    constructor(onTravelHitCallback, onFullPoliwagCallback) {
        super(onTravelHitCallback, onFullPoliwagCallback);
    }

    getColliderSprite() {
        return new Sprite(54, 364, 16, 16, "static");
    }

    getButtonSprite() {
        return new Sprite(30, 362, 22, 32, "none");
    }

    getCounterSprite() {
        return new Sprite(21, 328, 41, 20, "none");
    }

    getButtonSpriteIdleAnimation() {
        return Asset.getAnimation('blueFieldPoliwagIdle');
    }

    getButtonSpriteHurtAnimation() {
        return Asset.getAnimation('blueFieldPoliwagHurt');
    }

    getCounterAnimation() {
        return Asset.getAnimation('blueFieldPoliwagCounter');
    }

    getHitSFX() {
        //TODO change
        return 'sfx0F';
    }


}