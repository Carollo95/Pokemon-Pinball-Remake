const DUGTRIO_WIDTH = 58;
const DUGTRIO_HEIGHT = 58;
const DUGTRIO_TIME_OF_HURT = 500;
const DUGTRIO_MAX_PHASE = 4;

class Dugtrio {
  constructor(x, y) {
    this.sprite = new Sprite(x, y, DUGTRIO_WIDTH, DUGTRIO_HEIGHT, "static");
    this.sprite.debug = DEBUG;

    this.sprite.addAnimation("idle1", Asset.getAnimationClone('animDugtrio1'));
    this.sprite.addAnimation("hurt1", Asset.getAnimationClone('animDugtrio1Hurt'));
    this.sprite.addAnimation("idle2", Asset.getAnimationClone('animDugtrio2'));
    this.sprite.addAnimation("hurt2", Asset.getAnimationClone('animDugtrio2Hurt'));
    this.sprite.addAnimation("idle3", Asset.getAnimationClone('animDugtrio3'));
    this.sprite.addAnimation("hurt3", Asset.getAnimationClone('animDugtrio3Hurt'));
    this.sprite.addAnimation("idle4", Asset.getAnimationClone('animDugtrio4'));
    this.sprite.addAnimation("hurt4", Asset.getAnimationClone('animDugtrio4Hurt'));

    this.sprite.visible = false;
    EngineUtils.disableSprite(this.sprite);

    this.timeOfHurt = 0;
    this.timeOfDisappearance = 0;
    this.disabled = false;
    this.phase = 1;
    this.sprite.layer = 9;
  }

  spawn() {
    EngineUtils.enableSprite(this.sprite);
    this.sprite.visible = true;
    this.sprite.changeAnimation("idle1");
  }

  update(ballSprite) {
    if (this.disabled) return;

    if (this.isHurtTimeFinished()) {
      if (this.phase == 4) {
        this.phase++;
        this.timeOfHurt = millis();
        this.sprite.changeAnimation("idle4");
      } else if (this.phase == 5) {
        this.disableSprite();
      } else {
        this.sprite.changeAnimation("idle" + this.phase);
        this.checkCollision(ballSprite);
      }
    }
  }

  checkCollision(ballSprite) {
    if (this.sprite.collide(ballSprite)) {
      this.sprite.changeAnimation("hurt" + this.phase);
      this.phase++;
      Audio.playSFX('sfx36');
      this.timeOfHurt = millis();
    }
  }

  isHurtTimeFinished() {
    return (millis() - this.timeOfHurt) > DUGTRIO_TIME_OF_HURT;
  }

  disableSprite() {
    EngineUtils.disableSprite(this.sprite);
    this.sprite.visible = false;
    this.timeOfDisappearance = millis();
    this.disabled = true;
  }
}