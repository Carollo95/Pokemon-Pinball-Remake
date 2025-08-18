class FlyingCoin {
    sprite
    disabled = false;

    constructor(x, y) {
        this.sprite = new Sprite(x, y, 10, 10, "dynamic");
        this.sprite.addAnimation("2", animFlyingCoin2);
        this.sprite.addAnimation("1", animFlyingCoin1);
        this.sprite.rotationLock = true;
        this.sprite.bounciness = 0.4;

        this.sprite.velocity.x = random(-8, 8);
        this.sprite.velocity.y = -6;

        this.allSprites = new Group();
    }

    update() {
        if (this.sprite.animation.name == "1" && this.sprite.velocity.y > 0) {
            this.sprite.changeAnimation("2");
        }

        this.bounceOnCollision();

        if (this.sprite.y > 300) {
            this.bounce();
        }


    }

    bounce() {
        this.sprite.applyForce(random([1, -1]) * 6, -14);
    }

    bounceOnCollision() {
        for (let other of allSprites) {
            if (this.sprite.collides(other)) {
                this.bounce();
            }
        }
    }

    disableSprite() {
        disableSprite(this.sprite);
        this.sprite.visible = false;
        this.disabled = true;
    }

}