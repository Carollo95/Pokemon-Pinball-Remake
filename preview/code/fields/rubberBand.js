const RUBBER_BAND_ANGLE = 63;
const RUBBER_BAND_RESTITUTION = 4;
const RUBBER_BAND_ANIMATION_TIME = 200;
const RUBBER_BAND_MAX_BOUNCE_ANGLE_DEG = 70;

class RubberBand {
    constructor(x, y, facingRight = true) {
        this.sprite = new Sprite(x, y, 25, 56, 'none');
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation('rubberBand', Asset.getAnimation('redFieldRubberBand'));
        this.sprite.ani.playing = false;
        this.sprite.mirror.x = facingRight;

        this.animationTimer = new EventTimer(RUBBER_BAND_ANIMATION_TIME);

        this.collider = new Sprite(x, y - 5, 35, 3, 'static');
        this.collider.debug = DEBUG;
        this.collider.layer = SCENARIO_LAYER;
        this.collider.visible = DEBUG;
        this.collider.rotation = facingRight ? -RUBBER_BAND_ANGLE : RUBBER_BAND_ANGLE;
    }

    update(ballSprite) {
        if (this.collider.collides(ballSprite) && this.isValidBounceAngle(ballSprite)) {
            this.bounceBall(ballSprite);
            this.sprite.ani.frame = 1;
            this.animationTimer.restart();
            Audio.playSFX('sfx41');
        }

        if (DEBUG) this.drawNormal();

        if (this.sprite.ani.frame === 1 && this.animationTimer.hasElapsed()) {
            this.sprite.ani.frame = 0;
        }
    }

    colliderAngleRad() {
        return this.collider.rotation * Math.PI / 180;
    }

    normal() {
        const a = this.colliderAngleRad();
        return { normalX: -Math.sin(a), normalY: Math.cos(a) };
    }

    thresholdCos() {
        return Math.cos(RUBBER_BAND_MAX_BOUNCE_ANGLE_DEG * Math.PI / 180);
    }

    velocity(ballSprite) {
        const velocityX = ballSprite.velocity.x, velocityY = ballSprite.velocity.y;
        const velocity = Math.hypot(velocityX, velocityY);
        return { velocityX, velocityY, velocity };
    }

    reflect(velocityX, velocityY, normalX, normalY, restitution) {
        const dot = velocityX * normalX + velocityY * normalY;
        let reflectionAngleX = velocityX - 2 * dot * normalX;
        let reflectionAngleY = velocityY - 2 * dot * normalY;
        reflectionAngleX *= restitution; reflectionAngleY *= restitution;
        return { reflectionAngleX, reflectionAngleY, dot };
    }

    isValidBounceAngle(ballSprite) {
        const { normalX, normalY } = this.normal();
        const { velocityX, velocityY, velocity } = this.velocity(ballSprite);
        if (velocity === 0) return false;

        const dot = velocityX * normalX + velocityY * normalY;
        if (dot >= 0) return false;
        const cosIncidence = (-dot) / velocity;
        return cosIncidence >= this.thresholdCos();
    }

    bounceBall(ballSprite) {
        const { normalX, normalY } = this.normal();
        const { velocityX, velocityY } = this.velocity(ballSprite);
        const { reflectionAngleX, reflectionAngleY } = this.reflect(velocityX, velocityY, normalX, normalY, RUBBER_BAND_RESTITUTION);

        ballSprite.pos.x += normalX * 2;
        ballSprite.pos.y += normalY * 2;

        ballSprite.velocity.x = reflectionAngleX;
        ballSprite.velocity.y = reflectionAngleY;
    }

    maxBounceAngleRad() {
        return RUBBER_BAND_MAX_BOUNCE_ANGLE_DEG * Math.PI / 180;
    }

    drawRay(cx, cy, angle, len) {
        line(cx, cy, cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    }

    drawNormal() {
        const { normalX, normalY } = this.normal();
        const length = 30;

        const normalAngle = Math.atan2(normalY, normalX);
        const incidenceAngle = normalAngle + Math.PI;
        const theta = this.maxBounceAngleRad();
        const angle1 = incidenceAngle - theta;
        const angle2 = incidenceAngle + theta;

        push();
        strokeWeight(2);

        // borders
        stroke(255, 200, 0);
        this.drawRay(this.collider.pos.x, this.collider.pos.y, angle1, length);
        this.drawRay(this.collider.pos.x, this.collider.pos.y, angle2, length);
        noFill();
        arc(this.collider.pos.x, this.collider.pos.y, length * 2, length * 2, angle1, angle2);

        // conce center
        stroke(255, 60, 60);
        this.drawRay(this.collider.pos.x, this.collider.pos.y, incidenceAngle, length);

        pop();
    }
}