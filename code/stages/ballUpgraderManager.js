class BallUpgraderManager {

    constructor(xl,yl,xc,yc,xr,yr) {
        this.leftElement = new BallUpgraderElement(xl, yl);
        this.centerElement = new BallUpgraderElement(xc, yc);
        this.rightElement = new BallUpgraderElement(xr, yr);
    }

    update(ball) {
        this.leftElement.update(ball.sprite);
        this.centerElement.update(ball.sprite);
        this.rightElement.update(ball.sprite);

        if(this.leftElement.active && this.centerElement.active && this.rightElement.active) {
            ball.upgrade();
            this.leftElement.setActive(false);
            this.centerElement.setActive(false);
            this.rightElement.setActive(false);
        }
    }

    displaceLeft() {
        //TODO
    }

    displaceRight() {
        //TODO
    }

}