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

        this.screen = new Screen(
            initialLandmark,
            this.onCaptureThreeBallsCallback,
            this.onCaptureStartCaptureAnimationCallback,
            this.onCaptureStartAnimatedSpritePhaseCallback,
            this.onCaptureCompleteAnimationStartedCallback,
            this.onCapturePhaseFinishedCallback,
            this.captureOnPokemonAnimatedHitCallback,
            this.slotCallback
        );

        this.ballBonusScreen = new BallBonusScreen(this.status, this.onBonusScreenCompleteCallback);

        this.multiplierManager = new MultiplierManager(this.status, this.onLeftMultiplierHitCallback, this.onRightMultiplierHitCallback, this.onMultiplierUpgradeCallback, this.getLeftMultiplierTarget(), this.getRightMultiplierTarget());
        this.multiplierManager.setMultiplierLevel(multiplierLevel);

        this.well = new StageWell();

        this.pikachuSaverManager = this.getPikachuSaverManager();
        this.pikachuSaverManager.setState(pikachuSaverState);

        this.evolutionManager = new EvolutionManager(this.stageText, this.targetArrows, this.evolutionItems, this.addEvolutionExperienceCallback, this.onFullExperienceCallback);
        this.ballUpgraderManager = this.getBallUpgraderManager();

        this.saverAgain = new SaverAgain();

        this.evolutionItems = [];

        this.targetArrows = [];

        this.playMusic();

    }

    draw() {
        super.draw();

        this.updateScreen();
        this.well.update(this.getBall());
        this.saverAgain.update();

        this.caveDetectorManager.update(this.getBall().sprite);
        this.updateCave();

        this.multiplierManager.update(this.getBall().sprite);
        this.pikachuSaverManager.update(this.getBall());
        //TODO blue field ball upgrader manager
        this.ballUpgraderManager.update(this.getBall());

        this.leftRubberBand.update(this.getBall().sprite);
        this.rightRubberBand.update(this.getBall().sprite);

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
    /**
     * Callback for the left flipper is held down
     */
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

    /**
     * Callback for the center button
     */
    centerButtonCallback = () => {
        if (this.controls.hasControlCallbackTimePassed()) {
            this.controls.restartPressCallback();
            if (this.state === FIELD_STATE.EVOLUTION_CHOOSE_SCREEN) {
                this.evolutionScreenChooser.selectCurrent();
            }
        }
    }

    /**
     * Callback for the right flipper is held down
     */
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

    /**
     * Callback for the left flipper is pressed
     */
    leftFlipperPressCallback = () => {
        this.ballUpgraderManager.displaceLeft();
        this.pikachuSaverManager.doOnLeftFlipper();
        this.caveDetectorManager.shiftLeft();
    }

    /**
     * Callback for the right flipper is pressed
     */
    rightFlipperPressCallback = () => {
        this.ballUpgraderManager.displaceRight();
        this.pikachuSaverManager.doOnRightFlipper();
        this.caveDetectorManager.shiftRight();
        this.screen.slowDownSlotMachine();
    }

    //Utils
    /**
     * Checks if the ball is waiting on the ball launcher
     * @returns true if it is waiting, false otherwise
     */
    ballIsWaitingOnLauncher() {
        return this.getBall().sprite.pos.x > 330 && this.getBall().sprite.vel.y === 0;
    }

    /**
     * Sets the new state of the field
     * @param {*} state  the new state to set
     */
    setState(state) {
        this.state = state;
    }

    /**
     * Returns the next bonus stage
     * @returns the next bonus stage
     */
    getNextBonusLevel() {
        return this.bonusStages[this.nextBonusLevelIndex % this.bonusStages.length];
    }

    /**
     * Checks if the current state is a travel state
     * @returns true if it is a travel state, false otherwise
     */
    isTravelState() {
        return this.state === FIELD_STATE.TRAVEL_LEFT || this.state === FIELD_STATE.TRAVEL_RIGHT || this.state === FIELD_STATE.TRAVEL_CAVE;
    }

    /**
     * Opens the well
     * @param {*} callback the callback for when the well captures an arrow 
     */
    openWell(callback) {
        this.well.open(callback);
        this.arrows.turnOnCaveArrow();
    }

    /**
     * Closes the well
     */
    closeWell() {
        this.well.close();
        this.arrows.turnOffCaveArrow();
    }

    /**
     * Spits the ball from the well and closes it
     */
    spitAndCloseWell() {
        this.well.spitBall(this.getBall());
        this.arrows.turnOffCaveArrow();
    }

    /**
     * Interrupts the cave state
     */
    interruptCave() {
        this.screen.setState(SCREEN_STATE.LANDSCAPE);
        this.well.close();
    }

    /**
    * Gets the parameters for starting the slot machine
    * @returns The starting slots for the slot machine
     */
    getStartSlotMachineParams() {
        return new StartSlotMachineParams(this.pikachuSaverManager.isSuperCharged(), this.arrows.captureArrowsLevel, this.arrows.evolutionArrowsLevel, this.getBall().type, this.getNextBonusLevel(), this.saverAgain.isExtra());
    }

    /**
     * Show the result of the evolution jackpot
    */
    showAfterEvolutionJackpot = () => {
        Audio.stopMusic();
        Audio.playSFX('sfx26');
        //TODO how much points on jackpot
        this.addPointsAndShowText(I18NManager.translate("jackpot"), 123456, 3000, this.finishEvolutionPhaseCallback);
    }

    /**
     * Checks if the evolution cave should be opened
     * @returns true if it should be opened, false otherwise
     */
    shouldOpenEvolutionCave() {
        return this.arrows.evolutionArrowsLevel === 3;
    }


    //Updates

    /**
     * Updates the cave state 
     */
    updateCave() {
        if (this.state === FIELD_STATE.PLAYING && this.caveActive && this.well.isClosed()) {
            this.screen.showCaveStart();
            this.openWell(this.onCaveEnterCallback);
        }
    }

    /**
     * Updates the arrows
     */
    updateArrows() {
        this.arrows.update(this.state !== FIELD_STATE.CAPTURE && this.state !== FIELD_STATE.EVOLUTION);
    }

    /**
     * Sets active the extra ball
     */
    setExtraBall() {
        if (!this.saverAgain.isExtra()) {
            this.saverAgain.setExtra();
            this.stageText.setScrollText(I18NManager.translate("extra_ball"), I18NManager.translate("extra_ball"));
        }
    }

    /**
     * Updates the screen
     */
    updateScreen() {
        this.screen.update(this.getBall());
    }

    /**
     * Progresses the bonus ball screen if visible
     */
    progressBonusBallScreen() {
        if (this.ballBonusScreen.isVisible()) {
            this.ballBonusScreen.progress();
        }
    }

    //Callbacks

    /**
     * Callback for when the ball is upgraded while it is already a fully upgraded
     */
    onFullUpgradeAgainCallback = () => {
        EngineUtils.addPointsForBallHelper(POINTS.BALL_FULLY_UPGRADED);
    }


    /**
     * Callback for when there are three captured balls
     */
    onCaptureThreeBallsCallback = () => {
        this.screen.goToBonusScreen(this.getNextBonusLevel());
        this.openWell(this.goToBonusStageCallback);
    }

    /**
     * Callback to go to the next bonus stage
     */
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

    /**
     * Callback for when coming back from a bonus stage
     */
    onBackFromBonusStageCallback = () => {
        allSprites.remove();
        stage = this;
        this.nextBonusLevelIndex++;
        stage.setup(this.screen.screenLandscapes.currentLandmark, this.arrows.getState(), true, this.pikachuSaverManager.getState(), this.multiplierManager.multiplier, this.caveActive);
        EngineUtils.flashWhite();
    }

    /**
     * Callback for the capture state when the capture animation starts
     */
    onCaptureStartCaptureAnimationCallback = () => {
        this.disableTimer()
    }

    /**
     * Callback for the capture state when the animated sprite phase starts
     */
    onCaptureStartAnimatedSpritePhaseCallback = () => {
        this.disableCaptureTargetArrow();
    }

    /**
     * Callback for when the capture complete animation starts
     * @param {*} pokemonCaught the instance of the caught pokemon
     */
    onCaptureCompleteAnimationStartedCallback = (pokemonCaught) => {
        //TODO how many points on jackpot
        this.stageText.setScrollText(I18NManager.translate("you_got_a") + I18NManager.translate(pokemonCaught.name), I18NManager.translate(pokemonCaught.name), 1000, this.showAfterCaptureJackpot);
        this.status.addPokemonCaught(pokemonCaught);
    }

    /**
     * Callback to show jackpot after capture animation is complete
     */
    showAfterCaptureJackpot = () => {
        this.addPointsAndShowText(I18NManager.translate("jackpot"), 123456, 1000);
    }

    /**
     * Callback for when the capture phase is finished
     */
    onCapturePhaseFinishedCallback = () => {
        this.setState(FIELD_STATE.PLAYING);
        this.playMusic();
    }
    /**
     * Callback for when the pokemon animated sprite is hit
     */
    captureOnPokemonAnimatedHitCallback = () => {
        this.addPointsAndShowText(I18NManager.translate("hit"), POINTS.CAPTURE_HIT);
    }


    /**
     * Callback to add experience during evolution phase
     */
    addEvolutionExperienceCallback = () => {
        this.screen.progressEvolutionAnimation();
    }

    /**
     * Callback for when 3 evolution items are gathered during evolution phase
     */
    onFullExperienceCallback = () => {
        this.openWell(this.onEvolutionCompletedCallback);
    }

    /**
     * Callback for when evolution mode is evolution animation is finished
     */
    onEvolutionCompletedCallback = () => {
        this.getTimer().stop();
        //TODO how many points on jackpot
        let targetEvolution = this.screen.showTargetEvolution();
        this.status.addPokemonEvolved(targetEvolution);
        this.stageText.setScrollText(I18NManager.translate("it_evolved_into") + I18NManager.translate(targetEvolution.name), I18NManager.translate(targetEvolution.name), 1000, this.showAfterEvolutionJackpot);
    }

    /**
     * Callback for when evolution mode is finished
     */
    finishEvolutionPhaseCallback = () => {
        this.spitAndCloseWell();
        this.screen.addPokeballsToList(2);
        this.finishEvolutionPhase();
    }

    /** 
     * Callback for when the cave is entered
     */
    onCaveEnterCallback = () => {
        this.caveActive = false;
        this.status.caveShotsOnBall++;
        this.screen.startSlotMachine(this.getStartSlotMachineParams());
    }

    /**
     * Callback for the slot machine result
     * @param {*} index the result index
     * @param {*} subindex the result subindex for small, big or multiplier
     */
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

    /**
     * Callback for when the left multiplier is hit
     */
    onLeftMultiplierHitCallback = () => {
        if (this.state === FIELD_STATE.EVOLUTION) {
            this.onEvolutionTargetArrowHit(this.leftMultiplierTargetArrow);
        }
    }

    /**
     * Callback for when the right multiplier is hit
     */
    onRightMultiplierHitCallback = () => {
        if (this.state === FIELD_STATE.EVOLUTION) {
            this.onEvolutionTargetArrowHit(this.rightMultiplierTargetArrow);
        }
    }
    /**
     * Callback for when the multiplier is upgraded
     */
    onMultiplierUpgradeCallback = () => {
        this.status.fieldMultiplier = this.multiplierManager.multiplier;
        this.stageText.setScrollText(I18NManager.translate("bonus_multiplier_times") + this.multiplierManager.multiplier, I18NManager.translate("bonus_multiplier_times") + this.multiplierManager.multiplier);
    }


    /**
     * Callback for when the cave must be opened
     */
    onOpenCaveCallback = () => {
        this.caveActive = true;
    }

    /**
     * Callback for when the bonus ball screen is complete
     */
    onBonusScreenCompleteCallback = () => {
        this.stageText.setScrollText(I18NManager.translate("shoot_again"), I18NManager.translate("shoot_again"), 1000, () => this.createNewBallOrEndStage());
    }

    //Interface
    getLeftMultiplierTarget() { }
    getRightMultiplierTarget() { }

    getBallUpgraderManager() { }

    getPikachuSaverManager() { }

    /**
     * Disables the capture target arrow
     */
    disableCaptureTargetArrow() { }

    /**
     * Plays the field music
     */
    playMusic() { }

}