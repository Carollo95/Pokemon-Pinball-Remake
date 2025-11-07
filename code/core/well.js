const WELL_EVENT_HORIZON_RADIUS = 18;

class Well {
    constructor(x, y, strength, radiusX, radiusY = radiusX) {
        this.x = x;
        this.y = y;
        this.strength = strength;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }

    applyGravity(sprite, ballOnCenterCallback = () => { }) {
        let dx = this.x - sprite.x;
        let dy = this.y - sprite.y;


        let normX = dx / this.radiusX;
        let normY = dy / this.radiusY;
        let ellipseDist = Math.sqrt(normX * normX + normY * normY);

        this.drawActionRadius();

        if (ellipseDist < 1) {
            let distance = Math.sqrt(dx * dx + dy * dy);

            //Clamp to center if very close
            if (distance <= WELL_EVENT_HORIZON_RADIUS) {
                sprite.x = this.x;
                sprite.y = this.y;
                sprite.velocity.x = 0;
                sprite.velocity.y = 0;
                ballOnCenterCallback();
                return;
            }

            let directionX = dx / distance;
            let directionY = dy / distance;

            sprite.velocity.x += directionX * this.strength;
            sprite.velocity.y += directionY * this.strength;
        }

    }

    drawActionRadius() {
        if (!DEBUG) return;

        push();
        noFill();
        ellipseMode(CENTER);
        strokeWeight(1);

        stroke(0, 0, 255);


        ellipse(this.x, this.y, this.radiusX *2, this.radiusY *2);
        ellipse(this.x, this.y, WELL_EVENT_HORIZON_RADIUS *2, WELL_EVENT_HORIZON_RADIUS *2);
        pop();

    }

    capturedBall(ballSprite) {
        let dx = this.x - ballSprite.x;
        let dy = this.y - ballSprite.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 6;
    }
}