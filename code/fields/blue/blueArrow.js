const BLUE_ARROW_DIRECTION = {
    NORTH: "NORTH",
    SOUTH: "SOUTH",
    EAST: "EAST",
    WEST: "WEST"
}

const UPDATE_EVENT_TIMER = 1000;
const BLUE_ARROW_SPEED_PUSH_MULTIPLIER = 3;
const BLUE_ARROW_SPEED_DECREASE_MULTIPLIER = 0.25;

class BlueArrow {

    constructor(callback) {
        this.callback = callback;

        this.sprite = new Sprite(159, 210, 1, 1, "none");
        this.sprite.debug = DEBUG;
        this.sprite.layer = SCENARIO_LAYER;
        this.sprite.addAnimation('blueArrow', Asset.getAnimation('blueFieldBlueArrow'));
        this.sprite.ani.playing = false;

        this.updateTimer = new EventTimer(UPDATE_EVENT_TIMER);
        this.changeDirection(BLUE_ARROW_DIRECTION.NORTH);
    }

    update(ballSprite, captureGateOpen, evolutionGateOpen, fieldState) {
        if (this.updateTimer.hasElapsed()) {
            this.updateTimer.restart();
            const direction = this.getRandomDirection(this.getValidDirections(captureGateOpen, evolutionGateOpen, fieldState, ballSprite));
            this.changeDirection(direction);
        }

        if (ballSprite.overlaps(this.sprite)) {
            switch (this.direction) {
                case BLUE_ARROW_DIRECTION.NORTH:
                    this.multiplyBallVelocity(ballSprite, BLUE_ARROW_SPEED_DECREASE_MULTIPLIER, BLUE_ARROW_SPEED_PUSH_MULTIPLIER);
                    break;
                case BLUE_ARROW_DIRECTION.SOUTH:
                    this.multiplyBallVelocity(ballSprite, BLUE_ARROW_SPEED_DECREASE_MULTIPLIER, BLUE_ARROW_SPEED_PUSH_MULTIPLIER / 2);
                    break;
                case BLUE_ARROW_DIRECTION.EAST:
                    this.multiplyBallVelocity(ballSprite, BLUE_ARROW_SPEED_PUSH_MULTIPLIER, BLUE_ARROW_SPEED_DECREASE_MULTIPLIER);
                    break;
                case BLUE_ARROW_DIRECTION.WEST:
                    this.multiplyBallVelocity(ballSprite, BLUE_ARROW_SPEED_PUSH_MULTIPLIER, BLUE_ARROW_SPEED_DECREASE_MULTIPLIER);
                    break;
            }
        }
    }

    multiplyBallVelocity(ballSprite, multiplierX, multiplierY, maxSpeed = 10) {
        ballSprite.velocity.x = Math.max(ballSprite.velocity.x * multiplierX, maxSpeed * Math.sign(ballSprite.velocity.x));
        ballSprite.velocity.y = Math.max(ballSprite.velocity.y * multiplierY, maxSpeed * Math.sign(ballSprite.velocity.y));
    }

    restartTimer() {
        this.updateTimer.restart();
    }

    getValidDirections(captureGateOpen, evolutionGateOpen, ballSprite, fieldState) {
        let validDirections = [];

        if (captureGateOpen && fieldState === FIELD_STATE.PLAYING) {
            validDirections.push(BLUE_ARROW_DIRECTION.EAST);
        }

        if (evolutionGateOpen && fieldState === FIELD_STATE.PLAYING) {
            validDirections.push(BLUE_ARROW_DIRECTION.WEST);
        }

        //TODO extract variable
        if (ballSprite.y < this.sprite.y) {
            validDirections = [];
            validDirections.push(BLUE_ARROW_DIRECTION.SOUTH);
        } else {
            validDirections.push(BLUE_ARROW_DIRECTION.NORTH);
        }

        return validDirections;
    }

    getRandomDirection(directions) {
        return directions[Math.floor(Math.random() * directions.length)];
    }

    changeDirection(newDirection) {
        this.direction = newDirection;
        this.callback(newDirection);

        switch (newDirection) {
            case BLUE_ARROW_DIRECTION.NORTH:
                this.sprite.ani.frame = 0;
                break;
            case BLUE_ARROW_DIRECTION.EAST:
                this.sprite.ani.frame = 1;
                break;
            case BLUE_ARROW_DIRECTION.SOUTH:
                this.sprite.ani.frame = 2;
                break;
            case BLUE_ARROW_DIRECTION.WEST:
                this.sprite.ani.frame = 3;
                break;
        }
    }
}