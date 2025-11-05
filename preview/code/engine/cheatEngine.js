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

    startCapture() {
        if ((stage instanceof RedField)) {
            stage.onBellsproutEatCallback();
        }
    },

    flipCaptureTile() {
        if ((stage instanceof RedField)) {
            if (stage.state === RED_FIELD_STATUS.CAPTURE && stage.screen.screenCapture.hideSprite.hideLevel < 6) {
                stage.screen.screenCapture.flipCapture();
            }
        }
    },

    hitCapture() {
        if ((stage instanceof RedField)) {
            if (stage.state === RED_FIELD_STATUS.CAPTURE && stage.screen.screenCapture.animatedPokemon.visible) {
                stage.screen.screenCapture.onPokemonSpriteHit(stage.getBall());
            }
        }
    },

    blockBallLoss() {
        if ((stage instanceof RedField)) {
            stage.createScenarioGeometry([[110, 532], [207, 532], [207, 540], [110, 540], [110, 532]]);
        }
    },

    upgradeCaptureLevel() {
        if ((stage instanceof RedField)) {
            stage.arrows.upgradeCaptureArrows();
        }
    },

    activateStaryu() {
        if ((stage instanceof RedField)) {
            stage.staryu.invert();

        }
    }

}