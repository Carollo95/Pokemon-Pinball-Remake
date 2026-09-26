import {EngineUtils, stage} from "./engine.js";
import {BlueField} from "../fields/blue/blueField.js";
import {Field, FIELD_STATE} from "../fields/field.js";
import {HIGH_SCORE_TABLES} from "../high_scores/highScore.js";
import {RedField} from "../fields/red/redField.js";

export let SHOW_FPS = false; // true to show FPS
export const DEBUG = new URLSearchParams(window.location.search)
  .get('debug')
  ?.toLowerCase() === 'true';
export const RESOLUTION = window.location.pathname
    .split('/')
    .some(part => part.toLowerCase() === 'hd')
    ? "HD"
    : "SD";

export const CheatEngine = {

    showFPS() {
        SHOW_FPS = true;
    },

    hideFPS() {
        SHOW_FPS = false;
    },

    startGhostStage() {
        EngineUtils.startGhostStage();
    },

    startMoleStage() {
        EngineUtils.startMoleStage();
    },

    startCatStage() {
        EngineUtils.startCatStage();
    },

    startSealStage() {
        EngineUtils.startSealStage();
    },

    startCloneStage() {
        EngineUtils.startCloneStage();
    },

    startRedField() {
        EngineUtils.startRedField();
    },

    startBlueField() {
        EngineUtils.startBlueField();
    },

    startCapture() {
        if ((stage instanceof Field)) {
            stage.captureWell.eatCallback();
        }
    },

    startEvolution() {
        if (stage instanceof BlueField) {
            stage.evolutionWell.onCapturedBallCallback();
        } else if (stage instanceof RedField) {
            stage.ditto.fullyOpen();
            stage.ditto.onCapturedBallCallback();
        }
    },

    flipCaptureTile() {
        if ((stage instanceof Field)) {
            if (stage.state === FIELD_STATE.CAPTURE && stage.screen.screenCapture.hideSprite.hideLevel < 6) {
                stage.screen.screenCapture.flipCapture();
            }
        }
    },

    hitCapture() {
        if ((stage instanceof Field)) {
            if (stage.state === FIELD_STATE.CAPTURE && stage.screen.screenCapture.animatedPokemon.visible) {
                stage.screen.screenCapture.onPokemonSpriteHit(stage.getBall());
            }
        }
    },

    blockBallLoss() {
        if ((stage instanceof Field)) {
            stage.createScenarioGeometry([[110, 532], [207, 532], [207, 540], [110, 540], [110, 532]]);
        }
    },

    upgradeCaptureLevel() {
        if ((stage instanceof Field)) {
            stage.arrows.upgradeCaptureArrows();
        }
    },

    activateStaryu() {
        if (stage instanceof RedField) {
            stage.staryu.invert();

        }
    },

    unstuckBall() {
        if ((stage instanceof Field) && stage && stage.getBall()) {
            stage.ball.sprite.pos.x = 150;
            stage.ball.sprite.pos.y = 300;
        }
    },

    upgradeBall() {
        if ((stage instanceof Field) && stage && stage.getBall()) {
            stage.getBall().upgrade();
        }
    },

    showLevelChooseControls() {
        const controlsDiv = document.getElementById('bonus-stage-selector-buttons');
        if (controlsDiv) {
            controlsDiv.style.display = 'flex';
        }
    },
    
    openCave() {
        if (stage instanceof Field) {
            stage.caveDetectorManager.detectorE.setActive(true);
            stage.caveDetectorManager.detectorA.setActive(true);
            stage.caveDetectorManager.detectorV.setActive(true);
            stage.caveDetectorManager.detectorC.setActive(true);
        }
    },

    clearHighScores() {
        localStorage.removeItem('highScoreData-' + HIGH_SCORE_TABLES.RED);
        localStorage.removeItem('highScoreData-' + HIGH_SCORE_TABLES.BLUE);
    }

}
