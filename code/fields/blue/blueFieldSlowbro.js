const SLOWBRO_WELL_RADIUS_EAST = 65;
const SLOWBRO_WELL_RADIUS_WEST = 20;
const SLOWBRO_WELL_RADIUS_Y = 20;
const SLOWBRO_WELL_STRENGHT = 10;

class BlueFieldSlowbro {

    constructor(onCapturedBallCallback) {
        this.sprite = new Sprite(65, 221, 64, 64, "none");
        this.sprite.addAni('eat', Asset.getAnimation('blueFieldSlowbroEat'));
        this.sprite.addAni('spit', Asset.getAnimation('blueFieldSlowbroIdle'));
        this.sprite.addAni('idle', Asset.getAnimation('blueFieldSlowbroIdle'));
        this.sprite.debug = DEBUG;
        this.sprite.layer = FIELD_ELEMENTS_LAYER;

        this.onCapturedBallCallback = onCapturedBallCallback;
        this.well = new Well(73, 208, SLOWBRO_WELL_STRENGHT, SLOWBRO_WELL_RADIUS_EAST, SLOWBRO_WELL_RADIUS_Y, SLOWBRO_WELL_RADIUS_WEST, SLOWBRO_WELL_RADIUS_Y);
        this.gravityActive = true;
    }


    update(ball) {
        if (this.gravityActive) {
            this.well.applyGravity(ball.sprite);
        }
        if (this.sprite.ani.name === 'idle' && this.well.capturedBall(ball.sprite)) {
            this.sprite.changeAni('eat');
            //TODO change SFX
            Audio.playSFX('sfx05');
            this.gravityActive = false;
            ball.sprite.visible = false;
            this.onCapturedBallCallback();
        }
    }

    spitBall(ball) {
        ball.regainPhysics();
        this.sprite.changeAni('spit');
        //TODO change SFX
        Audio.playSFX('sfx06');
        ball.sprite.velocity.x = -5;
        ball.sprite.visible = true;
        this.sprite.ani.onComplete = () => {
            this.sprite.changeAni('idle');
            this.gravityActive = true;
        }
    }

}