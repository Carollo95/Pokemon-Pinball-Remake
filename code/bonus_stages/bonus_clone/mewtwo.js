const MEWTWO_HITBOX_DIAMETER = 52;
const MEWTWO_INVINCIBILITY_MS = 1000;
const MEWTWO_BLINKING_RATE = 5;

const SHIELD6_POINTS = [
    [134, 136],
    [161, 89],
    [215, 89],
    [242, 136],
    [215, 183],
    [161, 183]
]

const SHIELD5_POINTS = [
    [180, 82],
    [240, 120],
    [220, 180],
    [158, 180],
    [138, 120]
]

const SHIELD4_POINTS = [
    [189, 82],
    [236, 136],
    [135, 136],
    [189, 190]
]

const SHIELD3_POINTS = [
    [189, 82],
    [236, 163],
    [142, 163]
]

const SHIELD2_POINTS = [
    [135, 136],
    [236, 136]
]

const SHIELD1_POINTS = [
    [189, 190]
]

class Mewtwo {

    constructor(x, y, onCheckCreateShield) {
        this.hitPoints = 25;

        this.sprite = new Sprite(x, y, MEWTWO_HITBOX_DIAMETER, "static");

        this.sprite.addAnimation("hurt", Asset.getAnimation('animMewtwoHurt'));
        this.sprite.addAnimation("idle", Asset.getAnimation('animMewtwoIdle'));
        this.sprite.layer = SPRITE_LAYER;
        this.sprite.debug = DEBUG;

        this.changeToIdleAnimation();

        this.checkCreateShield = onCheckCreateShield;
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

    changeToIdleAnimation() {
        this.sprite.changeAnimation("idle");
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = true;
        this.sprite.ani.onComplete = () => {
            this.checkCreateShield();
        };
    }

    createShieldAnimation(){
        console.log("NOW");
    }

    getShieldPoints() {
        if (this.hitPoints > 22) return SHIELD6_POINTS;
        if (this.hitPoints > 19) return SHIELD5_POINTS;
        if (this.hitPoints > 13) return SHIELD4_POINTS;
        if (this.hitPoints > 10) return SHIELD3_POINTS;
        if (this.hitPoints > 7) return SHIELD2_POINTS;
        if (this.hitPoints > 0) return SHIELD1_POINTS;
        return [];
    }
}
