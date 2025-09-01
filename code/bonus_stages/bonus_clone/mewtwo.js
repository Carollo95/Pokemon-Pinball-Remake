const MEWTWO_HITBOX_DIAMETER = 52;
const MEWTWO_INVINCIBILITY_MS = 1000;
const MEWTWO_BLINKING_RATE = 5;

class Mewtwo {

    constructor(x, y) {
        this.hitPoints = 25;

        this.sprite = new Sprite(x, y, MEWTWO_HITBOX_DIAMETER, "static");

        this.sprite.addAnimation("hurt", Asset.getAnimation('animMewtwoHurt'));
        this.sprite.addAnimation("idle", Asset.getAnimation('animMewtwoIdle'));
        this.sprite.layer = SPRITE_LAYER;
    }

    update(ballSprite, onHitCallback) {
        if (this.hitPoints > 0) {
            this.checkCollision(ballSprite, onHitCallback);
        } else {
            //TODO dissapear?
        }
    }

    checkCollision(ballSprite, onHitCallback) {
        if (this.sprite.collide(ballSprite) && this.sprite.ani.name !== "hurt") {
            this.sprite.changeAnimation("hurt");
            this.hitPoints--;
            //Audio.playSFX('sfx35');
            this.sprite.ani.frame = 0;
            this.sprite.ani.playing = true;
            this.sprite.ani.looping = false;
            this.sprite.ani.onComplete = () => {
                this.sprite.changeAnimation("idle");
            };

            if (onHitCallback) {
                onHitCallback();
            }
            
        }
    }
}
