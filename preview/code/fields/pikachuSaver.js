const PIKACHU_LEFT_POSITION_X = 32;
const PIKACHU_RIGHT_POSITION_X = 294;

const PIKACHU_ANIMATION_LENGTH = 3200;

class PikachuSaver {

    constructor(dischargeCallback) {
        this.sprite = new Sprite(PIKACHU_LEFT_POSITION_X, 506, 32, 32, 'none');
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;

        this.sprite.addAnimation('hurt', Asset.getAnimation('pikachuSaverHurt'));
        this.sprite.addAnimation('idle', Asset.getAnimation('pikachuSaverIdle'));

        this.charged = false;
        this.superCharged = false;

        this.animationStart = -10000;
        this.inAnimation = false;


        this.lightningSprite = new Sprite(PIKACHU_LEFT_POSITION_X, 474, 24, 48, 'none');
        this.lightningSprite.debug = DEBUG;
        this.lightningSprite.layer = OVER_BALL_LAYER;
        this.lightningSprite.addAnimation('lightning', Asset.getAnimation('pikachuSaverLightning'));
        this.lightningSprite.visible = false;
        this.dischargeCallback = dischargeCallback;
    }

    update(ball) {
        if (millis() - this.animationStart < PIKACHU_ANIMATION_LENGTH) {
            this.sprite.changeAnimation('hurt')
            return;
        }

        if (this.sprite.overlapping(ball.sprite)) {
            this.sprite.changeAnimation('hurt')
            if (this.inAnimation) {
                this.inAnimation = false
                this.lightningSprite.visible = false;
                if (!this.superCharged) {
                    this.charged = false;
                    this.dischargeCallback();
                }
                ball.launchFromGutter();
                this.sprite.changeAnimation('idle');
            } else if (this.isCharged()) {
                Audio.playSFXsequence(["sfx4E", "sfx10"])
                ball.stop();
                this.animationStart = millis();
                this.lightningSprite.ani.frame = 0;
                this.inAnimation = true;
                this.lightningSprite.visible = true;
            } else {
                this.sprite.ani.onComplete = () => {
                    EngineUtils.addPointsForBallHelper(POINTS.PIKACHU_SAVER);
                    this.sprite.changeAnimation('idle');
                }
            }
        } else if (this.superCharged) {
            this.blinkSuperChargedPikachu();
        }
    }

    isCharged() {
        return this.charged || this.superCharged;
    }

    blinkSuperChargedPikachu() {
        if (!(frameCount % 5)) {
            if (this.sprite.pos.x === PIKACHU_RIGHT_POSITION_X) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        }
    }

    charge() {
        this.charged = true;
    }

    superCharge() {
        this.superCharged = true;
    }
    
    isSuperCharged() {
        return this.superCharged;
    }

    fullyDischarge() {
        this.charged = false;
        this.superCharged = false;
    }

    moveLeft() {
        if (!this.inAnimation) {
            this.sprite.pos.x = PIKACHU_LEFT_POSITION_X;
            this.lightningSprite.pos.x = PIKACHU_LEFT_POSITION_X;
        }
    }

    moveRight() {
        if (!this.inAnimation) {
            this.sprite.pos.x = PIKACHU_RIGHT_POSITION_X;
            this.lightningSprite.pos.x = PIKACHU_RIGHT_POSITION_X;
        }
    }
}