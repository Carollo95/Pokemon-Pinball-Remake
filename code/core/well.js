const WELL_EVENT_HORIZON_RADIUS = 18;

class Well {
    constructor(x, y, strength, radiusEast, radiusNorth = radiusEast, radiusWest = radiusEast, radiusSouth = radiusNorth) {
        this.x = x;
        this.y = y;
        this.strength = strength;
        this.radiusNorth = radiusNorth;
        this.radiusEast = radiusEast;
        this.radiusSouth = radiusSouth;
        this.radiusWest = radiusWest;
    }

    applyGravity(sprite, ballOnCenterCallback = () => { }, ballOnAreaOfInfluenceCallback = () => { }) {
        let dx = this.x - sprite.x;
        let dy = this.y - sprite.y;

        this.drawActionRadius();

        // Determine which radius to use based on direction
        let radiusX = dx > 0 ? this.radiusWest : this.radiusEast;
        let radiusY = dy > 0 ? this.radiusNorth : this.radiusSouth;

        // Normalize coordinates by their respective radii
        let normX = dx / radiusX;
        let normY = dy / radiusY;
        let ellipseDist = Math.sqrt(normX * normX + normY * normY);

        if (ellipseDist < 1) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            ballOnAreaOfInfluenceCallback();

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
        strokeWeight(1);
        stroke(0, 0, 255);

        beginShape();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
            let cosAngle = Math.cos(angle);
            let sinAngle = Math.sin(angle);

            let radiusX = cosAngle > 0 ? this.radiusEast : this.radiusWest;
            let radiusY = sinAngle > 0 ? this.radiusSouth : this.radiusNorth;

            let x = this.x + cosAngle * radiusX;
            let y = this.y + sinAngle * radiusY;

            vertex(x, y);
        }
        endShape(CLOSE);

        pop();
    }

    capturedBall(ballSprite) {
        let dx = this.x - ballSprite.x;
        let dy = this.y - ballSprite.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 6;
    }
}