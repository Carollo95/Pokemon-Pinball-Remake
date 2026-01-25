class BallUpgraderManager {

    constructor(xl, yl, xc, yc, xr, yr, animation) {
        this.leftElement = new BallUpgraderElement(xl, yl, animation);
        this.centerElement = new BallUpgraderElement(xc, yc, animation);
        this.rightElement = new BallUpgraderElement(xr, yr, animation);
    }

    update(ball) {
        this.leftElement.update(ball.sprite);
        this.centerElement.update(ball.sprite);
        this.rightElement.update(ball.sprite);

        if (this.leftElement.active && this.centerElement.active && this.rightElement.active) {
            ball.upgrade();
            this.leftElement.setActive(false);
            this.centerElement.setActive(false);
            this.rightElement.setActive(false);
            this.leftElement.animate();
            this.centerElement.animate();
            this.rightElement.animate();
        }
    }

    displaceLeft() {
        let pivot = this.leftElement.active;
        this.leftElement.setActive(this.centerElement.active);
        this.centerElement.setActive(this.rightElement.active);
        this.rightElement.setActive(pivot);
    }

    displaceRight() {
        let pivot = this.rightElement.active;
        this.rightElement.setActive(this.centerElement.active);
        this.centerElement.setActive(this.leftElement.active);
        this.leftElement.setActive(pivot);
    }

    static createBlueFieldBallUpgraderManager() {
        return new BallUpgraderManager(112, 77, 160, 61, 208, 77, Asset.getAnimation('blueFieldBallUpgraderElement'));
    }

    static createRedFieldBallUpgraderManager() {
        return new BallUpgraderManager(116, 129, 160, 107, 204, 109, Asset.getAnimation('redFieldBallUpgraderElement'));
    }

}