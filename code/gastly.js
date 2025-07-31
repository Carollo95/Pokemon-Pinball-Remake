class Gastly {
    radius = 32;
    max_horizontal_movement = 60;

    movement_speed = 0.5;

    advance;
    sprite;
    start_x;

    constructor(x, y) {
        this.start_x = x;
        this.advance = true;
        this.sprite = new Sprite(x, y, this.radius, this.radius, "static");
        this.sprite.debug = DEBUG;
    }

    update() {
        this.checkCollision();
        this.move();
    }

    move() {
        if (this.advance) {
            this.sprite.pos.x += this.movement_speed;
            if (this.sprite.pos.x > this.start_x + this.max_horizontal_movement) {
                this.advance = false;
            }
        } else {
            this.sprite.pos.x -= this.movement_speed;
            if (this.sprite.pos.x < this.start_x) {
                this.advance = true;
            }
        }
    }

    checkCollision() {
        if (this.sprite.collide(ball)) {
            console.log("HIT!");
            disableScript(this.sprite);
            this.sprite.visible = false;
        }
    }

    isDisabled(){
        return this.sprite.sleeping;
    }

}