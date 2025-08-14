DIGLETT_WIDTH = 24; //Width of the Diglett hitbox
DIGLETT_HEIGHT = 24; //Height of the Diglett hitbox

DIGLETT_TIME_OF_HURT = 500;

class Diglett {
    timeOfHurt = 0;
    disabled = false;

    sprite;
    timeToSpawn = 0
    creationTime = 0

    constructor(x, y, creationTime, timeToSpawn) {
        this.sprite = new Sprite(x, y, DIGLETT_WIDTH, DIGLETT_HEIGHT, "static");
        this.sprite.debug = DEBUG;

        this.creationTime = creationTime;
        this.timeToSpawn = timeToSpawn

        this.sprite.addAnimation("hurt", animDiglettHurt);
        this.sprite.addAnimation("idle", animDiglett);
        this.sprite.addAnimation("down", animDiglettDown);

        this.sprite.visible = false;
    }

    spawn(){
        this.sprite.visible = true;
        this.sprite.changeAnimation("idle");
    }

    update(ballSprite) {
        if (!this.disabled) {
            if(!this.sprite.visible && ((millis() - this.creationTime) > this.timeToSpawn)){
                this.spawn();
            }

            if (this.timeOfHurt == 0) {
                this.checkCollision(ballSprite);
            } else {
                if (this.isHurtTimeFinished()) {
                    this.disableSprite();
                } 
            }
        }
    }

        checkCollision(ballSprite) {
        if (this.sprite.collide(ballSprite)) {
            this.sprite.changeAnimation("hurt")
            sfx35.play();
            disableSprite(this.sprite);
            this.timeOfHurt = millis();
        }
    }

    isHurtTimeFinished() {
        return (millis() - this.timeOfHurt) > DIGLETT_TIME_OF_HURT
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.timeOfDissapearance = millis();
        this.disabled = true;
    }

}