class StageStatus {

    constructor() {
        this.points = 0;
        this.captured = 0;
        this.activeThunder = false;
        this.balls = 3;
    }

    decreaseBall() {
        this.balls--;
    }

    addPoints(pts, ball) {
        this.points += ball.multiplyPoints(pts);
    }

}