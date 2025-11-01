class Well {
    constructor(x, y, strength, radiusX, radiusY = radiusX){
        this.x = x;
        this.y = y;
        this.strength = strength;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }

    applyGravity(sprite){
        let dx = this.x - sprite.x;
        let dy = this.y - sprite.y;


        let normX = dx / this.radiusX;
        let normY = dy / this.radiusY;
        let ellipseDist = Math.sqrt(normX * normX + normY * normY);

        if (DEBUG) {
            push();
            noFill();
            stroke(0, 0, 255);
            ellipse(this.x, this.y, this.radiusX * 2, this.radiusY * 2);
            pop();
        }

        if (ellipseDist < 1) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            let directionX = dx / distance;
            let directionY = dy / distance;

            sprite.velocity.x += directionX * this.strength;
            sprite.velocity.y += directionY * this.strength;
        }

    }

    capturedBall(ballSprite){
        let dx = this.x - ballSprite.x;
        let dy = this.y - ballSprite.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 6;
    }
}