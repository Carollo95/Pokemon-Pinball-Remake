const HIGH_SCORE_STATE = {
    VIEW: 'VIEW',
    EDIT: 'EDIT'
}

class HighScore extends Sketch {

    constructor() {
        super();
        this.background = Asset.getBackground('highScoreRed');
        this.createFrame();
    }

    setup(){
    }

    draw() {
        super.draw();
    }

}