const ANGULAR_SPEED = 4;
const TEMPORARY_DISABLE_MS = 1000;

class Shield {

    constructor(x, y) {
        this.sprite = new Sprite(x, y, 32, "static");

        this.sprite.addAnimation("create", Asset.getAnimation('animShieldCreate'));
        this.sprite.addAnimation("idle", Asset.getAnimation('animShield'));
        this.sprite.layer = SPRITE_LAYER;


        this.orbitCenter = { x: 189, y: 136 }; // center point
        this.radius = dist(x, y, this.orbitCenter.x, this.orbitCenter.y) || 60;
        this.angle = atan2(y - this.orbitCenter.y, x - this.orbitCenter.x); // initial angle

        this.disabled = false;
        this.temporaryDisableTime = 0;
    }

    update(ballSprite) {
        if (this.disabled && millis() - this.temporaryDisableTime > TEMPORARY_DISABLE_MS) {
            this.enable();
        }

        this.move();
    }

    move() {
        this.angle += ANGULAR_SPEED;
        this.sprite.pos.x = this.orbitCenter.x + cos(this.angle) * this.radius;
        this.sprite.pos.y = this.orbitCenter.y + sin(this.angle) * this.radius;
    }

    temporaryDisable() {
        this.temporaryDisableTime = millis();
        this.disable();
    }

    disable() {
        this.disabled = true;
        EngineUtil.disableSprite(this.sprite);
        this.sprite.visible = false;
    }

    enable() {
        this.disabled = false;
        EngineUtil.enableSprite(this.sprite);
        this.sprite.visible = true;
    }

}