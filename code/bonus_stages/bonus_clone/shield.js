const ANGULAR_SPEED = 4;
const TEMPORARY_DISABLE_MS = 1000;

class Shield {

    constructor(x, y) {
        this.sprite = new Sprite(x, y, 32, "static");

        this.sprite.addAnimation("create", Asset.getAnimation('animShieldCreate'));
        this.sprite.addAnimation("destroy", Asset.getAnimation('animShieldDestroy'));
        this.sprite.addAnimation("idle", Asset.getAnimation('animShield'));
        this.sprite.layer = SPRITE_LAYER;
        this.sprite.debug = DEBUG;


        this.orbitCenter = { x: 189, y: 136 }; // center point
        this.radius = dist(x, y, this.orbitCenter.x, this.orbitCenter.y) || 60;
        this.angle = atan2(y - this.orbitCenter.y, x - this.orbitCenter.x); // initial angle

        this.disabled = false;
    }

    update(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.destroy();
        }

        this.move();
    }

    destroy() {
        EngineUtils.disableSprite(this.sprite);
        this.disabled = true;
        this.sprite.changeAnimation('destroy');
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;
        this.sprite.ani.onComplete = () => {
            this.sprite.visible = false;
            this.sprite.remove();
        };
    }

    respawn() {
        this.sprite.changeAnimation('create');
        this.sprite.visible = true;
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;
        this.sprite.ani.onComplete = () => {
            this.enable();
        };
    }

    move() {
        this.angle += ANGULAR_SPEED;
        this.sprite.pos.x = this.orbitCenter.x + cos(this.angle) * this.radius;
        this.sprite.pos.y = this.orbitCenter.y + sin(this.angle) * this.radius;
    }

    disable() {
        EngineUtils.disableSprite(this.sprite);
        this.disabled = true;
        this.sprite.remove();
    }

    enable() {
        this.disabled = false;
        EngineUtils.enableSprite(this.sprite);
    }

}