const DIGLETT_WIDTH = 24; // Width of the Diglett hitbox
const DIGLETT_HEIGHT = 24; // Height of the Diglett hitbox
const DIGLETT_TIME_OF_HURT = 500;

class Diglett {
  constructor(x, y, creationTime, timeToSpawn) {
    this.disabled = false;
    this.timeToSpawn = timeToSpawn || 0;
    this.creationTime = creationTime || millis();
    this.timeOfHurt = 0;
    this.timeOfDisappearance = 0;

    this.sprite = new Sprite(x, y, DIGLETT_WIDTH, DIGLETT_HEIGHT, "static");
    this.sprite.addAnimation("hurt", Asset.getAnimationClone('animDiglettHurt'));
    this.sprite.addAnimation("idle", Asset.getAnimationClone('animDiglett'));
    this.sprite.addAnimation("down", Asset.getAnimationClone('animDiglettDown'));
    this.sprite.debug = DEBUG;
    this.sprite.visible = false;
    this.sprite.layer = 8;
  }

  spawn() {
    this.sprite.visible = true;
    this.sprite.changeAnimation("idle");
  }

  update(ballSprite) {
    if (this.disabled) return;

    if (!this.sprite.visible && (millis() - this.creationTime) > this.timeToSpawn) {
      this.spawn();
    }

    if (this.timeOfHurt === 0) {
      this.checkCollision(ballSprite);
    } else if (this.isHurtTimeFinished()) {
      this.disableSprite();
    }
  }

  checkCollision(ballSprite) {
    if (this.sprite.collide(ballSprite)) {
      this.sprite.changeAnimation("hurt");
      Audio.playSFX('sfx35');
      this.timeOfHurt = millis();
    }
  }

  isHurtTimeFinished() {
    return (millis() - this.timeOfHurt) > DIGLETT_TIME_OF_HURT;
  }

  disableSprite() {
    EngineUtils.disableSprite(this.sprite);
    this.sprite.visible = false;
    this.timeOfDisappearance = millis();
    this.disabled = true;
  }
}