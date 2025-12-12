const STAGE_WELL_RADIUS = 30;

class StageWell {
    constructor() {
        this.sprite = new Sprite(161, 282, 64, 64, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;

        this.sprite.addAnimation('openWell', Asset.getAnimation('openWell'));
        this.sprite.addAnimation('closedWell', Asset.getAnimation('closedWell'));


        this.auraSprite = new Sprite(161, 284, 66, 62, "none");
        this.auraSprite.debug = DEBUG;
        this.auraSprite.layer = SCENARIO_LAYER;
        this.auraSprite.addAnimation('wellAura', Asset.getAnimation('wellAura'));
        this.auraSprite.animation.visible = false;

        this.well = new Well(this.sprite.x, this.sprite.y, 5, STAGE_WELL_RADIUS);
        this.isOpen = false;
    }

    update(ball) {
        //TODO make the sprite.visible a function of ball is used everywhere
        if (this.isOpen && ball.sprite.visible) {
            this.well.applyGravity(
                ball.sprite,
                () => this.onCapturedBallByWellCallback(ball),
                () => { Audio.playSFX('sfx04', 6500); });
        }
    }

    onCapturedBallByWellCallback(ball) {
        ball.minimize(() => { this.onWellBallCapture && this.onWellBallCapture(); this.onWellBallCapture = undefined; });
        Audio.playSFX('sfx21', 6500);
    }

    open(onWellBallCapture) {
        this.isOpen = true;
        this.sprite.changeAnimation('openWell');
        this.auraSprite.animation.visible = true;
        this.onWellBallCapture = onWellBallCapture;
    }

    close() {
        this.isOpen = false;
        this.sprite.changeAnimation('closedWell');
        this.auraSprite.animation.visible = false;
    }

    spitBall(ball) {
        this.close();
        ball.stopOnCoordinates(this.sprite.x, this.sprite.y);
        ball.regainPhysics();
        ball.maximize();
    }

}