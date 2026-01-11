const RUBBER_BAND_ANGLE = 63;
const RUBBER_BAND_RESTITUTION = 2;
const RUBBER_BAND_ANIMATION_TIME = 200;
const RUBBER_BAND_MAX_BOUNCE_ANGLE_DEG = 80;

class RubberBand {

    constructor(x, y, facingRight = true) {
        this.sprite = new Sprite(x, y, 30, 56, 'none');
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation('rubberBand', Asset.getAnimation('redFieldRubberBand'));
        this.sprite.ani.playing = false;
        this.sprite.mirror.x = facingRight;

        this.animationTimer = new EventTimer(RUBBER_BAND_ANIMATION_TIME);

        this.collider = new Sprite(x, y, 35, 3, 'static');
        this.collider.debug = DEBUG;
        this.collider.layer = SCENARIO_LAYER;
        this.collider.visible = DEBUG;
        if (facingRight) {
            this.collider.rotation = -RUBBER_BAND_ANGLE;
        } else {
            this.collider.rotation = RUBBER_BAND_ANGLE;
        }
    }

    update(ballSprite) {
        if (this.collider.collides(ballSprite) && this.isValidBounceAngle(ballSprite)) {
            this.bounceBall(ballSprite);
            this.sprite.ani.frame = 1;
            this.animationTimer.restart();
            Audio.playSFX('sfx41');
        }

        if (this.sprite.ani.frame === 1 && this.animationTimer.hasElapsed()) {
            this.sprite.ani.frame = 0;
        }
    }

    isValidBounceAngle(ballSprite) {
        const ang = this.collider.rotation * Math.PI / 180;
        const nx = -Math.sin(ang), ny = Math.cos(ang);
        const vx = ballSprite.velocity.x, vy = ballSprite.velocity.y;
        const vmag = Math.hypot(vx, vy);
        if (vmag === 0) return false;
        const cosTheta = Math.abs((vx * nx + vy * ny) / vmag);
        const thresholdCos = Math.cos(RUBBER_BAND_MAX_BOUNCE_ANGLE_DEG * Math.PI / 180);
        return cosTheta >= thresholdCos;
    }

    bounceBall(ballSprite) {
        const ang = this.collider.rotation * Math.PI / 180;
        const nx = -Math.sin(ang), ny = Math.cos(ang);
        const vx = ballSprite.velocity.x, vy = ballSprite.velocity.y;

        const vmag = Math.hypot(vx, vy);
        if (vmag === 0) return;

        const dot = vx * nx + vy * ny;
        let rx = vx - 2 * dot * nx;
        let ry = vy - 2 * dot * ny;

        rx *= RUBBER_BAND_RESTITUTION;
        ry *= RUBBER_BAND_RESTITUTION;

        ballSprite.pos.x += nx * 2;
        ballSprite.pos.y += ny * 2;

        ballSprite.velocity.x = rx;
        ballSprite.velocity.y = ry;
    }
}