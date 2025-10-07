const BELLSPROUT_WELL_RADIUS_X = 20;
const BELLSPROUT_WELL_RADIUS_Y = 50;
const BELLSPROUT_WELL_STRENGHT = 10;

class RedFieldBellsprout {

    constructor(eatCallback) {
        this.sprite = new Sprite(240, 196, 64, 80, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = FIELD_ELEMENTS_LAYER;
        this.sprite.addAni('eat', Asset.getAnimation('redFieldBellsproutEat'));
        this.sprite.addAni('spit', Asset.getAnimation('redFieldBellsproutSpit'));
        this.sprite.addAni('idle', Asset.getAnimation('redFieldBellsproutIdle'));

        this.eatCallback = eatCallback;

        this.well = new Well(248, 178, BELLSPROUT_WELL_STRENGHT, BELLSPROUT_WELL_RADIUS_X, BELLSPROUT_WELL_RADIUS_Y);
        this.gravityActive = true;
    }

    update(ballSprite) {
        if (this.gravityActive) {
            this.well.applyGravity(ballSprite)
        }
        if (this.well.capturedBall(ballSprite)) {
            this.sprite.changeAni('eat');
            this.eatCallback();
            ballSprite.visible = false;
            this.sprite.ani.onComplete = () => {
                this.gravityActive = false; 
                this.sprite.changeAni('spit');
                ballSprite.visible = true;
                this.sprite.ani.onComplete = () => {
                    this.sprite.changeAni('idle');
                    this.gravityActive = true;
                }
            }
        }
    }




}