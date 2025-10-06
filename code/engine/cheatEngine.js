let SHOW_FPS = false; // true to show FPS
let DEBUG = true; //true to start the game on debug mode

const CheatEngine = {

    showFPS() {
        SHOW_FPS = true;
    },

    hideFPS() {
        SHOW_FPS = false;
    },

    startGhostStage() {
        allSprites.remove();
        stage = new BonusStageGhost(EngineUtils.getGameStatus());
        stage.setup();
    },

    startMoleStage() {
        allSprites.remove();
        stage = new BonusStageMole(EngineUtils.getGameStatus());
        stage.setup();
    },

    startCatStage() {
        allSprites.remove();
        stage = new BonusStageCat(EngineUtils.getGameStatus());
        stage.setup();
    },

    startSealStage() {
        allSprites.remove();
        stage = new BonusStageSeal(EngineUtils.getGameStatus());
        stage.setup();
    },

    startCloneStage() {
        allSprites.remove();
        stage = new BonusStageClone(EngineUtils.getGameStatus());
        stage.setup();
    },

    startRedField() {
        allSprites.remove();
        stage = new RedField(EngineUtils.getGameStatus());
        stage.setup();
    },

}