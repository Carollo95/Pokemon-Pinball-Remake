class StageStatus {

    constructor() {
        this.points = 0;
        this.captured = []
        this.activeThunder = false;
        this.balls = 4;

        this.pokemonCaughtOnBall = 0;
        this.pokemonEvolvedOnBall = 0;

        this.captureWellOnBall = 0;
        this.dugtrioOnBall = 0;

        this.poliwagOnBall = 0;
        this.psyduckOnBall = 0;
        this.slowbroOnBall = 0;

        this.caveShotsOnBall = 0;
        this.spinnerTurnsOnBall = 0;
        this.fieldMultiplier = 0;

        this.pikachuKickbacksOnBall = 0;

        this.extraBallEarned = false;

        this.onExtraBallEarnedCallback = () => { };
    }

    setOnExtraBallEarnedCallback(callback) {
        this.onExtraBallEarnedCallback = callback;
    }

    getBonusForCaughtPokemonOnBall() {
        return this.pokemonCaughtOnBall * POINTS.END_OF_BALL_BONUS_POKEMON_CAUGHT;
    }

    getBonusForEvolvedPokemonOnBall() {
        return this.pokemonEvolvedOnBall * POINTS.END_OF_BALL_BONUS_POKEMON_EVOLVED;
    }

    getBonusForBellsproutOnBall() {
        return this.captureWellOnBall * POINTS.END_OF_BALL_BONUS_BELLSPROUT;
    }

    getBonusForDugtrioOnBall() {
        return this.dugtrioOnBall * POINTS.END_OF_BALL_BONUS_DUGTRIO;
    }

    getBonusForSlowbroOnBall() {
        return this.slowbroOnBall * POINTS.END_OF_BALL_BONUS_SLOWBRO;
    }

    getBonusForCloysterOnBall() {
        return this.captureWellOnBall * POINTS.END_OF_BALL_BONUS_CLOYSTER;
    }

    getBonusForPsyduckOnBall() {
        return this.psyduckOnBall * POINTS.END_OF_BALL_BONUS_PSYDUCK;
    }

    getBonusForPoliwagOnBall() {
        return this.poliwagOnBall * POINTS.END_OF_BALL_BONUS_POLIWAG;
    }

    getBonusForCaveShotsOnBall() {
        return this.caveShotsOnBall * POINTS.END_OF_BALL_BONUS_CAVE_SHOT;
    }

    getBonusForSpinnerTurnsOnBall() {
        return this.spinnerTurnsOnBall * POINTS.END_OF_BALL_BONUS_SPINNER_TURNS;
    }

    addPokemonCaught(pokemon) {
        this.pokemonCaughtOnBall++;
        this.captured.push(pokemon);
    }

    addPokemonEvolved(pokemon) {
        this.pokemonEvolvedOnBall++;
        this.removeCapturedPokemon(pokemon);
        this.captured.push(getPokemonNextEvolution(pokemon));
    }

    removeCapturedPokemon(pokemon) {
        const idx = this.captured.findIndex(p => p && p.id === pokemon.id);
        if (idx !== -1) this.captured.splice(idx, 1);
    }

    startNewBall() {
        this.balls--;
        this.startExtraBall();
    }

    startExtraBall() {
        this.balls--;

        this.pokemonCaughtOnBall = 0;
        this.pokemonEvolvedOnBall = 0;
        this.captureWellOnBall = 0;
        this.dugtrioOnBall = 0;

        this.poliwagOnBall = 0;
        this.psyduckOnBall = 0;
        this.slowbroOnBall = 0;

        this.caveShotsOnBall = 0;
        this.spinnerTurnsOnBall = 0;
        this.fieldMultiplier = 0;

        this.pikachuKickbacksOnBall = 0;

        this.extraBallEarned = false;
    }

    addPikachuKickbackOnBall() {
        this.pikachuKickbacksOnBall++;
        if (this.pikachuKickbacksOnBall === 5 && !this.extraBallEarned) {
            this.extraBallEarned = true;
            this.onExtraBallEarnedCallback();
        }
    }

    addCaveShotOnBall() {
        this.caveShotsOnBall++;
        if (this.caveShotsOnBall === 10 && !this.extraBallEarned) {
            this.extraBallEarned = true;
            this.onExtraBallEarnedCallback();
        }
    }

    addCaptureWellOnBall() {
        console.log("capture well on ball", this.captureWellOnBall);
        this.captureWellOnBall++;

        if (this.captureWellOnBall === 15 && !this.extraBallEarned) {
            this.extraBallEarned = true;
            this.onExtraBallEarnedCallback();
        }
    }

    addSlowbroOnBall() {
        this.slowbroOnBall++;
        if (this.slowbroOnBall === 10 && !this.extraBallEarned) {
            this.extraBallEarned = true;
            this.onExtraBallEarnedCallback();
        }

    }

    addPoints(pts, ball = null) {
        this.points += ball ? ball.multiplyPoints(pts) : pts;
    }

}