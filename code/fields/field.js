const FIELD_BONUS = {
    MOLE: "mole",
    GHOST: "ghost",
    CAT: "cat",
    SEAL: "seal",
    CLONE: "clone",
}

const TRAVEL_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
    CAVE: 'cave'
}

const FIELD_CAPTURE_TIMER_MS = 121000;
const FIELD_EVOLUTION_TIMER_MS = 121000;
const FIELD_TRAVEL_TIMER_MS = 31000;

const FIELD_STATE = {
    PLAYING: "playing",
    GAME_START: "game_start",
    BALL_LOST: "ball_lost",
    GAME_OVER: "game_over",
    NEW_BALL_WAITING: "new_ball_waiting",
    CAPTURE: "capture",
    TRAVEL_LEFT: "travel_left",
    TRAVEL_RIGHT: "travel_right",
    TRAVEL_CAVE: "travel_cave",
    EVOLUTION_CHOOSE_SCREEN: "evolution_choose_screen",
    EVOLUTION: "evolution"
}

class Field extends Stage {
    constructor(status) {
        super(status);
        this.nextBonusLevelIndex = 0;
        this._closeBallOnWayDown = true;
    }

    setup(initialLandmark = undefined, arrowsState = undefined, spawnOnWell = false, pikachuSaverState = undefined, multiplierLevel = undefined, caveActive = false) {
        this.attachBall(Ball.spawnFieldBall(this.onFullUpgradeAgainCallback));

        this.attachFlippers(createTableFlippers());
        this.attachStageText(createStageStatusBanner(this.status));

        this.attachControls(new Controls(this.leftFlipperCallback, this.centerButtonCallback, this.rightFlipperCallback,
            this.leftFlipperPressCallback, () => { }, this.rightFlipperPressCallback
        ));

        this.caveDetectorManager = new CaveDetectorManager(this.onOpenCaveCallback);
        this.caveActive = caveActive;

        this.arrows = this.getArrows();
        if (arrowsState != undefined) {
            this.arrows.setState(arrowsState);
        }

        this.screen = new Screen(
            initialLandmark,
            this.onCaptureThreeBallsCallback,
            this.onCaptureStartCaptureAnimationCallback,
            this.onCaptureStartAnimatedSpritePhaseCallback,
            this.onCaptureCompleteAnimationStartedCallback,
            this.onCapturePhaseFinishedCallback,
            this.captureOnPokemonAnimatedHitCallback,
            this.slotCallback,
            this.getScreenLandscapes()
        );

        this.ballBonusScreen = new BallBonusScreen(this.status, this.getBonusStateStates(), this.onBonusScreenCompleteCallback);

        this.multiplierManager = new MultiplierManager(this.status, this.onLeftMultiplierHitCallback, this.onRightMultiplierHitCallback, this.onMultiplierUpgradeCallback, this.getLeftMultiplierTarget(), this.getRightMultiplierTarget());
        this.multiplierManager.setMultiplierLevel(multiplierLevel);

        this.well = new StageWell();

        if (spawnOnWell) {
            this.setState(FIELD_STATE.PLAYING);
            this.onSpawnOnWell();
            this.spitAndCloseWell();
        } else {
            this.setState(FIELD_STATE.GAME_START);
        }

        this.pikachuSaverManager = this.getPikachuSaverManager();
        this.pikachuSaverManager.setState(pikachuSaverState);

        this.evolutionManager = new EvolutionManager(this.stageText, this.targetArrows, this.evolutionItems, this.addEvolutionExperienceCallback, this.onFullExperienceCallback);
        this.ballUpgraderManager = this.getBallUpgraderManager();

        this.saverAgain = new SaverAgain();

        this.evolutionItems = [];

        this.targetArrows = [];

        this.speedPad = [];

        this.bumpers = [];

        this.playMusic();

    }

    draw() {
        super.draw();

        this.updateScreen();
        this.well.update(this.getBall());
        this.saverAgain.update();

        this.caveDetectorManager.update(this.getBall().sprite);
        this.updateCave();

        this.updateSensors();

        this.multiplierManager.update(this.getBall().sprite);
        this.pikachuSaverManager.update(this.getBall());
        this.ballUpgraderManager.update(this.getBall());

        this.leftRubberBand.update(this.getBall().sprite);
        this.rightRubberBand.update(this.getBall().sprite);

        this.updateArrows();

        this.captureWell.update(this.getBall().sprite);

        this.bumpers.forEach(bumper => bumper.update(this.getBall().sprite));

        this.targetArrows.forEach(ta => ta.update());

        if (this.state === FIELD_STATE.PLAYING || this.state === FIELD_STATE.CAPTURE || this.state === FIELD_STATE.EVOLUTION || this.isTravelState()) {
            this.checkForBallLoss();

            this.speedPad.forEach(pad => pad.update(this.getBall()));

            if (this.state === FIELD_STATE.EVOLUTION) {
                this.evolutionManager.update(this.getBall().sprite);
            }

        } else if (this.state === FIELD_STATE.BALL_LOST) {
            this.ballBonusScreen.update();
        }

    }

    //Controls
    leftFlipperCallback = () => {
        if (this.controls.hasControlCallbackTimePassed()) {
            this.controls.restartPressCallback();
            if (this.state === FIELD_STATE.EVOLUTION_CHOOSE_SCREEN) {
                this.evolutionScreenChooser.previous();
            }
        }
        if (this.state !== FIELD_STATE.EVOLUTION_CHOOSE_SCREEN && this.state !== FIELD_STATE.BALL_LOST) {
            this.getFlippers().moveLeftFlipper();
        }
    }

    centerButtonCallback = () => {
        if (this.controls.hasControlCallbackTimePassed()) {
            this.controls.restartPressCallback();
            if (this.state === FIELD_STATE.EVOLUTION_CHOOSE_SCREEN) {
                this.evolutionScreenChooser.selectCurrent();
            }
        }
    }

    rightFlipperCallback = () => {
        if (this.controls.hasControlCallbackTimePassed()) {
            this.controls.restartPressCallback();
            if (this.state === FIELD_STATE.EVOLUTION_CHOOSE_SCREEN) {
                this.evolutionScreenChooser.next();
            }
        }

        if (this.state === FIELD_STATE.GAME_START || this.state === FIELD_STATE.NEW_BALL_WAITING) {
            this.launchNewBallWaiting();
            this.saverAgain.set30sSaver();
            this.setState(FIELD_STATE.PLAYING);
        } else if (this.state === FIELD_STATE.BALL_LOST) {
            this.progressBonusBallScreen();
        } else if (this.ballIsWaitingOnLauncher()) {
            this.launchNewBallWaiting();
        } else if (this.state !== FIELD_STATE.EVOLUTION_CHOOSE_SCREEN && this.state !== FIELD_STATE.BALL_LOST) {
            this.getFlippers().moveRightFlipper();
        }
    }

    leftFlipperPressCallback = () => {
        this.ballUpgraderManager.displaceLeft();
        this.pikachuSaverManager.doOnLeftFlipper();
        this.caveDetectorManager.shiftLeft();
    }

    rightFlipperPressCallback = () => {
        this.ballUpgraderManager.displaceRight();
        this.pikachuSaverManager.doOnRightFlipper();
        this.caveDetectorManager.shiftRight();
        this.screen.slowDownSlotMachine();
    }

    //Utils
    ballIsWaitingOnLauncher() {
        return this.getBall().sprite.pos.x > 330 && this.getBall().sprite.vel.y === 0;
    }

    setState(state) {
        this.state = state;
    }

    getNextBonusLevel() {
        return this.bonusStages[this.nextBonusLevelIndex % this.bonusStages.length];
    }

    isTravelState() {
        return this.state === FIELD_STATE.TRAVEL_LEFT || this.state === FIELD_STATE.TRAVEL_RIGHT || this.state === FIELD_STATE.TRAVEL_CAVE;
    }

    openWell(callback) {
        this.well.open(callback);
        this.arrows.turnOnCaveArrow();
    }

    closeWell() {
        this.well.close();
        this.arrows.turnOffCaveArrow();
    }

    spitAndCloseWell() {
        this.well.spitBall(this.getBall());
        this.arrows.turnOffCaveArrow();
    }

    interruptCave() {
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        this.well.close();
    }

    getStartSlotMachineParams() {
        return new StartSlotMachineParams(this.pikachuSaverManager.isSuperCharged(), this.arrows.captureArrowsLevel, this.arrows.evolutionArrowsLevel, this.getBall().type, this.getNextBonusLevel(), this.saverAgain.isExtra());
    }

    showAfterEvolutionJackpot = () => {
        Audio.stopMusic();
        Audio.playSFX('sfx26');
        //TODO how much points on jackpot
        this.addPointsAndShowText(I18NManager.translate("jackpot"), 123456, 3000, this.finishEvolutionPhaseCallback);
    }

    shouldOpenEvolutionCave() {
        return this.arrows.evolutionArrowsLevel === 3;
    }

    launchNewBallWaiting() {
        if (this.state === FIELD_STATE.GAME_START) {
            this.screen.stopSpin();
            this.stageText.setScrollText(I18NManager.translate("start_from") + this.screen.getLandmarkText(), this.screen.getLandmarkText());
        }
        this._closeBallOnWayDown = true;
        this.onLaunchNewBallWaiting();
        this.getBall().launchFromSpawn();
    }

    startTravelCave() {
        this.setState(FIELD_STATE.TRAVEL_CAVE);
        this.screen.setTravelDirection(TRAVEL_DIRECTION.CAVE);
        this.arrows.setTravel(TRAVEL_DIRECTION.CAVE);
        this.openWell(this.onTravelCaveCallback);
    }



    interruptTravel() {
        if (this.isTravelState()) {
            this.disableTimer()
            this.closeWell();
            this.arrows.resetFromTravel();
            this.setState(FIELD_STATE.PLAYING);
            this.resetTravelTriggers();
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            this.playMusic();
        }
    }


    //Updates

    updateCave() {
        if (this.state === FIELD_STATE.PLAYING && this.caveActive && this.well.isClosed()) {
            this.screen.showCaveStart();
            this.openWell(this.onCaveEnterCallback);
        }
    }

    updateArrows() {
        this.arrows.update(this.state !== FIELD_STATE.CAPTURE && this.state !== FIELD_STATE.EVOLUTION);
    }

    setExtraBall() {
        if (!this.saverAgain.isExtra()) {
            this.saverAgain.setExtra();
            this.stageText.setScrollText(I18NManager.translate("extra_ball"), I18NManager.translate("extra_ball"));
        }
    }

    updateScreen() {
        this.screen.update(this.getBall());
    }

    progressBonusBallScreen() {
        if (this.ballBonusScreen.isVisible()) {
            this.ballBonusScreen.progress();
        }
    }

    checkForBallLoss() {
        if (this.ball.getPositionY() > SCREEN_HEIGHT) {
            if (this.saverAgain.isSaver()) {
                this.launchNewBall();
                this.playNewSaverBallEffects();
            } else {
                this.startNewBall();
            }
        }
    }

    interruptCapture() {
        if (this.state === FIELD_STATE.CAPTURE) {
            this.disableTimer()
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            this.setState(FIELD_STATE.PLAYING);
            this.bumpersTargetArrow.setVisible(false);
        }
    }


    interruptEvolution() {
        if (this.state === FIELD_STATE.EVOLUTION) {
            this.disableTimer()
            this.evolutionManager.interruptEvolution();
            this.screen.setState(SCREEN_STATE.LANDSCAPE);
            this.setState(FIELD_STATE.PLAYING);
            this.onInterruptEvolution();
        }
    }

    createNewBallOrEndStage() {
        if (this.status.balls > 0 || this.saverAgain.isExtra()) {
            if (this.saverAgain.isExtra()) {
                this.status.startExtraBall()
                this.saverAgain.disableExtra();
            } else {
                this.status.startNewBall()
            }
            this.caveDetectorManager.reset();
            this.multiplierManager.setInitialState();
            this.resetTravelTriggers();
            this.pikachuSaverManager.reset();
            this.lastSensor = undefined;
            this.launchNewBall();
            this.arrows.setCaptureArrowsLevel(2);
            this.setState(FIELD_STATE.NEW_BALL_WAITING);
            this.playMusic
        } else {
            this.setState(FIELD_STATE.GAME_OVER);
            console.log("GAME OVER");
        }
    }

    launchNewBallWaiting() {
        if (this.state === FIELD_STATE.GAME_START) {
            this.screen.stopSpin();
            this.stageText.setScrollText(I18NManager.translate("start_from") + this.screen.getLandmarkText(), this.screen.getLandmarkText());
        }
        this._closeBallOnWayDown = true;
        this.onLaunchNewBallWaiting();
        this.getBall().launchFromSpawn();
    }


    launchNewBall() {
        this.attachBall(Ball.spawnFieldBall(this.onFullUpgradeAgainCallback));
        this.onLaunchNewBall();
    }



    startNewBall() {
        if (this.state === FIELD_STATE.CAPTURE) {
            this.interruptCapture();
        } else if (this.state === FIELD_STATE.EVOLUTION) {
            this.interruptEvolution();
        } else if (this.isTravelState()) {
            this.interruptTravel();
        }
        this.interruptCave();
        this.caveActive = false;
        this.screen.restartSlotNumber();
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        //TODO probably not needed since it is closed on interrupt cave
        this.closeWell();
        this.onStartNewBall();
        this.setState(FIELD_STATE.BALL_LOST);
        this.arrows.restart();
        Audio.playSFX('sfx24');
        this.stageText.setScrollText(I18NManager.translate("end_of_ball_bonus"), "", 1000, () => { this.ballBonusScreen.show(); });
        Audio.stopMusic();
    }


    finishEvolutionPhase() {
        this.getTimer().disable();
        this.setState(FIELD_STATE.PLAYING);
        this.onFinishEvolutionPhase();
        this.arrows.resetEvolutionArrows();
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        this.playMusic();
    }


    startCaptureSequence() {
        this.interruptCave();
        this.interruptTravel();
        this.setState(FIELD_STATE.CAPTURE);
        this.attachTimer(Timer.createFieldTimer(FIELD_CAPTURE_TIMER_MS, this.doOnCaptureTimeupCallback));
        this.stageText.setScrollText(I18NManager.translate("lets_get_pokemon"), "");

        this.screen.startCapture(this.arrows.captureArrowsLevel);
        this.arrows.resetCaptureArrows();
        this.bumpersTargetArrow.setVisible(true);
        this.bumpersTargetArrow.setActive(true);

        this.saverAgain.set60sSaver();

        this.playCatchemEvolutionMusic();
    }

    onEvolutionWellCallback = () => {
        EngineUtils.addPointsForBallHelper(POINTS.EVOLUTION_HOLE);
        this.openEvolutionChooserScreen(this.onEvolutionTargetSelectedOnEvolutionHole);
    }

    openEvolutionChooserScreen = (onEvolutionTargetSelectedCallback) => {
        this.evolutionScreenChooser = new EvolutionChooserScreen(this.status.captured, onEvolutionTargetSelectedCallback);
        this.evolutionScreenChooser.show();
        this.setState(FIELD_STATE.EVOLUTION_CHOOSE_SCREEN);
    }

    onEvolutionTargetSelectedOnEvolutionHole = (selected) => {
        if (selected !== null) {
            this.startEvolutionSequence(selected);
        } else {
            this.setState(FIELD_STATE.PLAYING);
        }

        this.onAfterEvolutionTargetSelectedOnEvolutionHole();

        this.evolutionScreenChooser.remove();
        this.arrows.evolutionArrowsLevel = 0;
    }

    //Callbacks
    onFullUpgradeAgainCallback = () => {
        EngineUtils.addPointsForBallHelper(POINTS.BALL_FULLY_UPGRADED);
    }

    onBumperHitCallback = () => {
        EngineUtils.addPointsForBallHelper(POINTS.BUMPER);
        if (this.state === FIELD_STATE.CAPTURE && this.bumpersTargetArrow.visible) {
            this.screen.flipCapture();
            this.addPointsAndShowText(I18NManager.translate("flipped"), POINTS.CAPTURE_FLIPPED);
        } else if (this.state === FIELD_STATE.EVOLUTION && this.bumpersTargetArrow.active) {
            this.onEvolutionTargetArrowHit(this.bumpersTargetArrow);
        }
    }


    onCaptureThreeBallsCallback = () => {
        this.screen.goToBonusScreen(this.getNextBonusLevel());
        this.openWell(this.goToBonusStageCallback);
    }

    goToBonusStageCallback = () => {
        //TODO scroll text "go to X stage" and SFX
        let nextLevel = this.getNextBonusLevel();
        if (nextLevel === FIELD_BONUS.MOLE) {
            EngineUtils.startMoleStage(this.onBackFromBonusStageCallback);
        } else if (nextLevel === FIELD_BONUS.GHOST) {
            EngineUtils.startGhostStage(this.onBackFromBonusStageCallback);
        } else if (nextLevel === FIELD_BONUS.CLONE) {
            EngineUtils.startCloneStage(this.onBackFromBonusStageCallback);
        } else if (nextLevel === FIELD_BONUS.CAT) {
            EngineUtils.startCatStage(this.onBackFromBonusStageCallback);
        } else if (nextLevel === FIELD_BONUS.SEAL) {
            EngineUtils.startSealStage(this.onBackFromBonusStageCallback);
        }
    }

    onBackFromBonusStageCallback = () => {
        allSprites.remove();
        stage = this;
        this.nextBonusLevelIndex++;
        stage.setup(this.screen.screenLandscapes.currentLandmark, this.arrows.getState(), true, this.pikachuSaverManager.getState(), this.multiplierManager.multiplier, this.caveActive);
        EngineUtils.flashWhite();
    }

    onCaptureStartCaptureAnimationCallback = () => {
        this.disableTimer()
    }

    onCaptureStartAnimatedSpritePhaseCallback = () => {
        this.bumpersTargetArrow.setActive(false);
    }

    onCaptureCompleteAnimationStartedCallback = (pokemonCaught) => {
        //TODO how many points on jackpot
        this.stageText.setScrollText(I18NManager.translate("you_got_a") + I18NManager.translate(pokemonCaught.name), I18NManager.translate(pokemonCaught.name), 1000, this.showAfterCaptureJackpot);
        this.status.addPokemonCaught(pokemonCaught);
    }

    showAfterCaptureJackpot = () => {
        this.addPointsAndShowText(I18NManager.translate("jackpot"), 123456, 1000);
    }

    onCapturePhaseFinishedCallback = () => {
        this.setState(FIELD_STATE.PLAYING);
        this.playMusic();
    }
    captureOnPokemonAnimatedHitCallback = () => {
        this.addPointsAndShowText(I18NManager.translate("hit"), POINTS.CAPTURE_HIT);
    }


    addEvolutionExperienceCallback = () => {
        this.screen.progressEvolutionAnimation();
    }

    onFullExperienceCallback = () => {
        this.openWell(this.onEvolutionCompletedCallback);
    }

    onEvolutionCompletedCallback = () => {
        this.getTimer().stop();
        //TODO how many points on jackpot
        let targetEvolution = this.screen.showTargetEvolution();
        this.status.addPokemonEvolved(targetEvolution);
        this.stageText.setScrollText(I18NManager.translate("it_evolved_into") + I18NManager.translate(targetEvolution.name), I18NManager.translate(targetEvolution.name), 1000, this.showAfterEvolutionJackpot);
    }

    finishEvolutionPhaseCallback = () => {
        this.spitAndCloseWell();
        this.screen.addPokeballsToList(2);
        this.finishEvolutionPhase();
    }

    onCaveEnterCallback = () => {
        this.caveActive = false;
        this.status.caveShotsOnBall++;
        this.screen.startSlotMachine(this.getStartSlotMachineParams());
    }

    slotCallback = (index, subindex) => {
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        switch (index) {
            case SLOT_STATES.SMALL:
                EngineUtils.addPointsForBallHelper(subindex * 100);
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.BIG:
                EngineUtils.addPointsForBallHelper(subindex * 1000000);
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.BONUS_MULTIPLIER:
                for (let i = 0; i <= subindex; i++) {
                    this.multiplierManager.upgradeMultiplier();
                }
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.SMALL_SAVER:
                this.saverAgain.set30sSaver();
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.GREAT_SAVER:
                this.saverAgain.set60sSaver();
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.ULTRA_SAVER:
                this.spitAndCloseWell();
                this.saverAgain.set90sSaver();
                break;
            case SLOT_STATES.PIKACHU:
                this.pikachuSaverManager.superCharge();
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.GREAT_UPGRADE:
            case SLOT_STATES.ULTRA_UPGRADE:
            case SLOT_STATES.MASTER_UPGRADE:
                this.ball.upgrade();
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.EXTRA_BALL:
                this.saverAgain.setExtra();
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.CATCHEM_STARTER:
                this.startCaptureSequence();
                this.spitAndCloseWell();
                break;
            case SLOT_STATES.EVOLUTION_STARTER:
                this.openEvolutionChooserScreen(this.onEvolutionModeSelectedOnSlots);
                break;
            case SLOT_STATES.GO_TO_BONUS_DUGTRIO:
                EngineUtils.startMoleStage(this.onBackFromBonusStageCallback);
                break;
            case SLOT_STATES.GO_TO_BONUS_GASTLY:
                EngineUtils.startGhostStage(this.onBackFromBonusStageCallback);
                break;
            case SLOT_STATES.GO_TO_BONUS_MEOWTH:
                EngineUtils.startCatStage(this.onBackFromBonusStageCallback);
                break;
            case SLOT_STATES.GO_TO_BONUS_SEAL:
                EngineUtils.startSealStage(this.onBackFromBonusStageCallback);
                break;
            case SLOT_STATES.GO_TO_BONUS_MEWTWO:
                EngineUtils.startCloneStage(this.onBackFromBonusStageCallback);
                break;
            default:
                break;
        }
    }

    onLeftMultiplierHitCallback = () => {
        if (this.state === FIELD_STATE.EVOLUTION) {
            this.onEvolutionTargetArrowHit(this.leftMultiplierTargetArrow);
        }
    }

    onRightMultiplierHitCallback = () => {
        if (this.state === FIELD_STATE.EVOLUTION) {
            this.onEvolutionTargetArrowHit(this.rightMultiplierTargetArrow);
        }
    }
    onMultiplierUpgradeCallback = () => {
        this.status.fieldMultiplier = this.multiplierManager.multiplier;
        this.stageText.setScrollText(I18NManager.translate("bonus_multiplier_times") + this.multiplierManager.multiplier, I18NManager.translate("bonus_multiplier_times") + this.multiplierManager.multiplier);
    }


    onOpenCaveCallback = () => {
        this.caveActive = true;
    }

    onBonusScreenCompleteCallback = () => {
        this.stageText.setScrollText(I18NManager.translate("shoot_again"), I18NManager.translate("shoot_again"), 1000, () => this.createNewBallOrEndStage());
    }

    onTravelToLeft() {
        if (this.state === FIELD_STATE.PLAYING) {
            this.interruptCave();
            this.setState(FIELD_STATE.TRAVEL_LEFT);
            this.screen.setTravelDirection(TRAVEL_DIRECTION.LEFT);
            this.arrows.setTravel(TRAVEL_DIRECTION.LEFT);
            this.attachTimer(Timer.createFieldTimer(FIELD_TRAVEL_TIMER_MS, this.doOnTravelTimeupCallback));
            Audio.playMusic('mapMode');
        }
    }

    onTravelToRight() {
        if (this.state === FIELD_STATE.PLAYING) {
            this.interruptCave();
            this.setState(FIELD_STATE.TRAVEL_RIGHT);
            this.screen.setTravelDirection(TRAVEL_DIRECTION.RIGHT);
            this.arrows.setTravel(TRAVEL_DIRECTION.RIGHT);
            this.attachTimer(Timer.createFieldTimer(FIELD_TRAVEL_TIMER_MS, this.doOnTravelTimeupCallback));
            Audio.playMusic('mapMode');
        }
    }

    doOnTravelTimeupCallback = () => {
        this.interruptTravel();
    }

    onTravelCaveCallback = () => {
        this.disableTimer()
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        Audio.stopMusic();
        Audio.playSFX('sfx25');
        this.screen.progressLandmark();
        this.stageText.setScrollText(I18NManager.translate("arrived_at") + this.screen.getLandmarkText(), this.screen.getLandmarkText(), DEFAULT_TEXT_PERSISTENCE_MILLIS, () => {
            this.setState(FIELD_STATE.PLAYING);
            this.arrows.resetFromTravel();
            this.spitAndCloseWell();
            this.resetTravelTriggers();
            this.playMusic();
        });
    }

    onTravelHitCallback = (isRight) => {
        //TODO rename this
        EngineUtils.addPointsForBallHelper(POINTS.RED_FIELD_TRAVEL_DIGLETT);
        if (this.state === FIELD_STATE.EVOLUTION) {
            if (isRight) {
                this.onEvolutionTargetArrowHit(this.rightDiglettTargetArrow);
            } else {
                this.onEvolutionTargetArrowHit(this.leftDiglettTargetArrow);
            }
        }
    }

    //Interface
    getLeftMultiplierTarget() { }
    getRightMultiplierTarget() { }
    getArrows() { }
    getScreenLandscapes() { }
    getBonusStateStates() {}

    getBallUpgraderManager() { }

    getPikachuSaverManager() { }

    onLaunchNewBallWaiting() { }
    resetTravelTriggers() { }
    onStartNewBall() { }
    onInterruptEvolution() { }
    onFinishEvolutionPhase() { }
    onSpawnOnWell() { }
    onAfterEvolutionTargetSelectedOnEvolutionHole() { }
    onLaunchNewBall() { }

    playMusic() { }
    playCatchemEvolutionMusic() { }

    updateSensors() { }

    

}