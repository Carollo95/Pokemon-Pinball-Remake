const MEWTWO_HITBOX_DIAMETER = 52;
const MEWTWO_INVINCIBILITY_MS = 1000;
const MEWTWO_BLINKING_RATE = 5;

const MEWTWO_SHIELD_CREATION_COOLDOWN = 1000;
const MEWTWO_BLINKING_MILLIS_AFTER_DEFEAT = 1000;

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

    constructor(x, y, onCheckCreateShield, onDefeat) {
        this.hitPoints = 25;

        this.sprite = new Sprite(x, y, MEWTWO_HITBOX_DIAMETER, "static");

        this.sprite.addAnimation("hurt", Asset.getAnimation('animMewtwoHurt'));
        this.sprite.addAnimation("psychic1", Asset.getAnimation('animMewtwoPsychic1'));
        this.sprite.addAnimation("psychic2", Asset.getAnimation('animMewtwoPsychic2'));
        this.sprite.addAnimation("idle", Asset.getAnimation('animMewtwoIdle'));
        this.sprite.layer = SPRITE_LAYER;
        this.sprite.debug = DEBUG;

        this.changeToIdleAnimation();

        this.checkCreateShield = onCheckCreateShield;
        this.onDefeat = onDefeat;

        this.shieldCreationCooldown = 0;
        this.timeOfDefeat = 0;
    }

    update(ballSprite, onHitCallback) {
        if (this.hitPoints > 0) {
            this.checkCollision(ballSprite, onHitCallback);
        } else {
            if (millis() - this.timeOfDefeat < MEWTWO_BLINKING_MILLIS_AFTER_DEFEAT) {
                EngineUtils.blinkSprite(this.sprite, 2);
            }
            else {
                this.sprite.visible = false;
            }
        }
    }

    checkCollision(ballSprite, onHitCallback) {
        if (this.sprite.collide(ballSprite) && this.sprite.ani.name !== "hurt") {
            this.hitPoints--;
            this.sprite.changeAnimation("hurt");
            Audio.playSFX('sfx39');
            this.sprite.ani.frame = 0;
            this.sprite.ani.playing = true;
            this.sprite.ani.looping = false;

            if (this.hitPoints > 0) {
                this.sprite.ani.onComplete = () => {
                    this.sprite.changeAnimation("idle");
                }
            } else {
                this.timeOfDefeat = millis();
                this.onDefeat();
            }

            if (onHitCallback) {
                onHitCallback();
            }
        };

    }

    changeToIdleAnimation() {
        this.sprite.changeAnimation("idle");
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = true;
        this.sprite.ani.onComplete = () => {
            if (millis() - this.shieldCreationCooldown > MEWTWO_SHIELD_CREATION_COOLDOWN) {
                this.checkCreateShield();
            }
        };
    }

    createShieldAnimation(shield) {
        this.sprite.changeAnimation("psychic1");
        this.sprite.ani.frame = 0;
        this.sprite.ani.playing = true;
        this.sprite.ani.looping = false;
        this.sprite.ani.onComplete = () => {
            this.sprite.changeAnimation("psychic2");
            this.sprite.ani.frame = 0;
            this.sprite.ani.playing = true;
            this.sprite.ani.looping = false;
            this.sprite.ani.onComplete = () => {
                shield.respawn();
                this.changeToIdleAnimation();
                this.shieldCreationCooldown = millis();
            };
        };
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
