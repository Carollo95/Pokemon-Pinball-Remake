class BlueFieldTravelPsyduck extends TravelButton {
    constructor(onTravelHitCallback, onFullPsyduckCallback) {
        super(onTravelHitCallback, onFullPsyduckCallback);
        this.buttonSprite.addAni('hurt2', Asset.getAnimation('blueFieldPsyduckHurt2'));
        this.buttonSprite.addAni('hurt3', Asset.getAnimation('blueFieldPsyduckHurt3'));
        this.buttonSprite.changeAnimation('idle');
    }


    changeAnimationToHurt() {
        if (this.counterLevel === 1) {
            this.buttonSprite.changeAnimation('hurt');
        } else if (this.counterLevel === 2) {
            this.buttonSprite.changeAnimation('hurt2');
        } else if (this.counterLevel === 3) {
            this.buttonSprite.changeAnimation('hurt3');
        }
    }

    getColliderSprite() {
        return new Sprite(268, 365, 16, "static");
    }

    getButtonSprite() {
        return new Sprite(279, 355, 22, 32, "none");
    }

    getCounterSprite() {
        return new Sprite(296, 370, 41, 20, "none");
    }

    getButtonSpriteIdleAnimation() {
        return Asset.getAnimation('blueFieldPsyduckIdle');
    }

    getButtonSpriteHurtAnimation() {
        return Asset.getAnimation('blueFieldPsyduckHurt1');
    }

    getCounterAnimation() {
        return Asset.getAnimation('blueFieldPsyduckCounter');
    }

    getHitSFX() {
        //TODO change
        return 'sfx0F';
    }


}