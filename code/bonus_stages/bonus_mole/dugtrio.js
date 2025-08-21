const DUGTRIO_WIDTH = 58;
const DUGTRIO_HEIGHT = 58;
const DUGTRIO_TIME_OF_HURT = 500;
const DUGTRIO_MAX_PHASE = 4;

class Dugtrio {
  constructor(x, y) {
    this.sprite = new Sprite(x, y, DUGTRIO_WIDTH, DUGTRIO_HEIGHT, "static");
    this.sprite.debug = DEBUG;

    this.sprite.addAnimation("idle1", animDugtrio1);
    this.sprite.addAnimation("hurt1", animDugtrio1Hurt);
    this.sprite.addAnimation("idle2", animDugtrio2);
    this.sprite.addAnimation("hurt2", animDugtrio2Hurt);
    this.sprite.addAnimation("idle3", animDugtrio3);
    this.sprite.addAnimation("hurt3", animDugtrio3Hurt);
    this.sprite.addAnimation("idle4", animDugtrio4);
    this.sprite.addAnimation("hurt4", animDugtrio4Hurt);

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

    // if currently showing hurt animation, wait until hurt time finishes
    if (this.timeOfHurt !== 0) {
      if (this.isHurtTimeFinished()) {
        // after hurt finishes, if phase exceeded max -> disappear
        if (this.phase > DUGTRIO_MAX_PHASE) {
          this.disableSprite();
        } else {
          // show idle for current phase and reset hurt timer
          this.sprite.changeAnimation("idle" + this.phase);
          this.timeOfHurt = 0;
        }
      }
      return;
    }

    // normal behavior: show idle of current phase and check collision
    this.sprite.changeAnimation("idle" + this.phase);
    this.checkCollision(ballSprite);
  }

  checkCollision(ballSprite) {
    if (this.sprite.collide(ballSprite)) {
      this.sprite.changeAnimation("hurt" + this.phase);
      this.phase++;
      sfx36 && sfx36.play();
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