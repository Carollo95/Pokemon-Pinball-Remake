const SHAKE_STRENGTH = 4; // Strength of the screen shake
const DEFAULT_SHAKE_DURATION_MS = 300; // default shake duration in milliseconds

class Stage extends Sketch{

    constructor(status = new StageStatus()) {
        super();
        this.status = status;

        // common objects present on every stage (attach in setup())
        this.ball = null;
        this.timer = null;
        this.flippers = null;
        this.stageText = null;
        this.controls = null;
    }
    /**
     * Single entry point to draw stage visuals.
     */
    draw() {
        super.draw();

        if (this.getBall()) this.getBall().update();
        if (this.getFlippers()) this.getFlippers().update();
        if (this.getTimer()) this.getTimer().update();
        if (this.getStageText()) this.getStageText().draw();
    }

    addPointsAndShowText(text, pts, peristence = DEFAULT_TEXT_PERSISTENCE_MILLIS, callback = () => { }) {
        if (this.getStageText()) this.stageText.showTextWithPoints(text, pts, peristence, callback);
        EngineUtils.addPointsForBallHelper(pts);
    }

    createScenarioGeometry(positions) {
        let scenario = new Sprite(positions, "static");
        scenario.layer = SCENARIO_LAYER;
        scenario.debug = DEBUG;
        scenario.visible = DEBUG;

        return scenario;
    }

    playNewSaverBallEffects(){
        Audio.playSFX('sfx02');
        EngineUtils.flashWhite();
    }


    // --- helpers to attach common per-stage components ---
    attachBall(ballInstance) { this.ball = ballInstance; }
    attachTimer(timerInstance) { this.timer = timerInstance; }
    attachFlippers(flippersInstance) { this.flippers = flippersInstance; }
    attachStageText(stageTextInstance) { this.stageText = stageTextInstance; }

    
    getBall() { return this.ball; }
    getTimer() { return this.timer; }
    getFlippers() { return this.flippers; }
    getStageText() { return this.stageText; }
    getBallSprite() { return this.getBall().sprite; }

    disableTimer() {
        if (this.getTimer()) {
            this.getTimer().disable();
        }
    }
}