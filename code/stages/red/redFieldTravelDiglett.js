const TIME_FOR_DUGTRIO_UP = 10000;

class TravelDiglett {
    constructor(mirror = false) {
        if (mirror) {
            this.diglettX = 261;
            this.dugtrioX = 296;
            this.colliderX = 268;
        } else {
            this.diglettX = 59;
            this.dugtrioX = 24;
            this.colliderX = 54;
        }

        this.collider = new Sprite(this.colliderX, 364, 16, 16, "static");
        this.collider.debug = DEBUG;
        this.collider.visible = DEBUG;

        this.diglettSprite = new Sprite(this.diglettX, 364, 22, 32, "none");
        this.diglettSprite.debug = DEBUG;
        this.diglettSprite.layer = SCENARIO_LAYER;
        this.diglettSprite.mirror.x = mirror;

        this.diglettSprite.addAnimation('hurt', Asset.getAnimation('redFieldDiglettHurt'));
        this.diglettSprite.addAnimation('idle', Asset.getAnimation('redFieldDiglettIdle'));


        this.timeOfLasDugtrioUpgrade = 0;
        this.dugtrioSprite = new Sprite(this.dugtrioX, 364, 48, 32, "none");
        this.dugtrioSprite.debug = DEBUG;
        this.dugtrioSprite.layer = SCENARIO_LAYER;
        this.dugtrioSprite.mirror.x = mirror;
        this.dugtrioSprite.addAnimation('idle', Asset.getAnimation('redFieldDugtrio'));
        this.dugtrioLevel = 0;
        this.dugtrioSprite.ani.frame = this.dugtrioLevel;
        this.dugtrioSprite.ani.playing = false;

    }

    update(ball) {
        if (this.collider.collide(ball)) {
            this.upgradeDugtrio();
            this.diglettSprite.changeAnimation('hurt');

            this.diglettSprite.ani.frame = 0;
            this.diglettSprite.ani.playing = true;
            this.diglettSprite.ani.looping = false;
            this.diglettSprite.ani.onComplete = () => {
                this.diglettSprite.changeAnimation('idle');
            };

        }

        if (millis() > this.timeOfLasDugtrioUpgrade + TIME_FOR_DUGTRIO_UP) {
            this.degradeDugtrio();
        }

    }

    upgradeDugtrio() {
        if (this.diglettSprite.ani.name === 'idle' && this.dugtrioLevel < 3) {
            this.dugtrioLevel++;
            this.dugtrioSprite.ani.frame = this.dugtrioLevel;
            this.timeOfLasDugtrioUpgrade = millis();
        }
    }

    degradeDugtrio() {
        if (this.dugtrioLevel > 0) {
            this.dugtrioLevel--;
            this.dugtrioSprite.ani.frame = this.dugtrioLevel;
            this.timeOfLasDugtrioUpgrade = millis();
        }
    }


}