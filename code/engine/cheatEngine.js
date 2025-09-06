let SHOW_FPS = true; // true to show FPS
let DEBUG = false; //true to start the game on debug mode

const CheatEngine = {

    showFPS(){
        SHOW_FPS = true;
    },

    hideFPS(){
        SHOW_FPS = false;
    },

    startGhostStage() {
        allSprites.remove();
        stage = new BonusStageGhost();
        stage.setup();
    },

    startMoleStage() {
        allSprites.remove();
        stage = new BonusStageMole();
        stage.setup();
    },

    startCatStage() {
        allSprites.remove();
        stage = new BonusStageCat();
        stage.setup();
    },

    startSealStage() {
        allSprites.remove();
        stage = new BonusStageSeal();
        stage.setup();
    },

    startCloneStage() {
        allSprites.remove();
        stage = new BonusStageClone();
        stage.setup();
    }

}