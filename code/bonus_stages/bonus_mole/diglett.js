const DIGLETT_WIDTH = 24; // Width of the Diglett hitbox
const DIGLETT_HEIGHT = 24; // Height of the Diglett hitbox

class Diglett {
  constructor(x, y, creationTime, timeToSpawn) {
    this.disabled = false;
    this.timeToSpawn = timeToSpawn || 0;
    this.creationTime = creationTime || millis();

    this.sprite = new Sprite(x, y, DIGLETT_WIDTH, DIGLETT_HEIGHT, "static");
    this.sprite.addAnimation("hurt", Asset.getAnimation('animDiglettHurt'));
    this.sprite.addAnimation("idle", Asset.getAnimation('animDiglett'));
    this.sprite.addAnimation("down", Asset.getAnimation('animDiglettDown'));
    this.sprite.debug = DEBUG;
    this.sprite.layer = SPRITE_LAYER;
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

    this.checkCollision(ballSprite);
  }

  checkCollision(ballSprite) {
    if (this.sprite.collide(ballSprite) && this.sprite.ani.name !== "hurt") {
      this.sprite.changeAnimation("hurt");
      Audio.playSFX('sfx35');
      this.sprite.ani.frame = 0;
      this.sprite.ani.playing = true;
      this.sprite.ani.looping = false;
      this.sprite.ani.onComplete = () => {
        this.disableSprite();
      };
    }
  }

  disableSprite() {
    EngineUtils.disableSprite(this.sprite);
    this.sprite.visible = false;
    this.disabled = true;
  }
}