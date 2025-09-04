const ANGULAR_SPEED = 4;
const TEMPORARY_DISABLE_MS = 1000;

class Shield {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.createSprite();

        this.orbitCenter = { x: 189, y: 136 }; // center point
        this.radius = dist(x, y, this.orbitCenter.x, this.orbitCenter.y) || 60;
        this.angle = atan2(y - this.orbitCenter.y, x - this.orbitCenter.x); // initial angle

        this.disabled = false;
    }

    createSprite() {
        this.sprite = new Sprite(this.x, this.y, 32, "static");

        this.sprite.addAnimation("create", Asset.getAnimation('animShieldCreate'));
        this.sprite.addAnimation("destroy", Asset.getAnimation('animShieldDestroy'));
        this.sprite.addAnimation("idle", Asset.getAnimation('animShield'));
        this.sprite.layer = SPRITE_LAYER;
        this.sprite.debug = DEBUG;

    }

    update(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.destroy();
        }

        this.move();
    }

    destroy() {
        EngineUtils.disableSprite(this.sprite);
        this.sprite.changeAnimation('destroy');
        Audio.playSFX('sfx38');
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;
        this.sprite.ani.onComplete = () => {
            this.sprite.remove();
            this.disabled = true;
        };
    }

    respawn() {
        this.createSprite();
        this.sprite.changeAnimation('create');
        this.sprite.visible = true;
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;
        this.sprite.ani.onComplete = () => {
            this.disabled = false;
            EngineUtils.enableSprite(this.sprite);
            this.sprite.changeAnimation('idle');
        };
    }

    move() {
        this.angle += ANGULAR_SPEED;

        this.x = this.orbitCenter.x + cos(this.angle) * this.radius;
        this.y = this.orbitCenter.y + sin(this.angle) * this.radius;
        this.sprite.pos.x = this.x;
        this.sprite.pos.y = this.y;
    }

    remove() {
        this.disable();
        this.sprite.remove();
    }

    disable() {
        EngineUtils.disableSprite(this.sprite);
        this.sprite.visible = false;
        this.disabled = true;
    }

}