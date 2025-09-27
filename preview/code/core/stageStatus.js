const BONUS_FOR_POKEMON_CAUGHT_ON_BALL = 500000;
const BONUS_FOR_POKEMON_EVOLVED_ON_BALL = 750000;
const BONUS_FOR_CAVE_SHOTS_ON_BALL = 25000;
const BONUS_FOR_CAUGHT_STARTED_ON_BALL = 75000;
const BONUS_FOR_SPINNER_TURNS_ON_BALL  =100000;
const BONUS_FOR_TRAVEL_ON_BALL = 50000;

class StageStatus {

    constructor() {
        this.points = 0;
        this.captured = 0;
        this.activeThunder = false;
        this.balls = 4;

        this.pokemonCaughtOnBall = 0;
        this.pokemonEvolvedOnBall = 0;
        this.caughtStartedOnBall = 0;
        this.travelOnBall = 0;
        this.caveShotsOnBall = 0;
        this.spinnerTurnsOnBall = 0;
        this.fieldMultiplier = 0;
    }

    getBonusForCaughtPokemonOnBall() {
        return this.pokemonCaughtOnBall * BONUS_FOR_POKEMON_CAUGHT_ON_BALL;
    }
    
    getBonusForEvolvedPokemonOnBall() {
        return this.pokemonEvolvedOnBall * BONUS_FOR_POKEMON_EVOLVED_ON_BALL;
    }
    
    getBonusForCaughtStartedOnBall() {
        return this.caughtStartedOnBall * BONUS_FOR_CAUGHT_STARTED_ON_BALL;
    }
    
    getBonusForTravelOnBall() {
        return this.travelOnBall * BONUS_FOR_TRAVEL_ON_BALL;
    }
    
    getBonusForCaveShotsOnBall() {
        return this.caveShotsOnBall * BONUS_FOR_CAVE_SHOTS_ON_BALL;
    }
    
    getBonusForSpinnerTurnsOnBall() {
        return this.spinnerTurnsOnBall * BONUS_FOR_SPINNER_TURNS_ON_BALL;
    }

    startNewBall() {
        this.balls--;

        this.pokemonCaughtOnBall = 0;
        this.pokemonEvolvedOnBall = 0;
        this.caughtStartedOnBall = 0;
        this.travelOnBall = 0;
        this.caveShotsOnBall = 0;
        this.spinnerTurnsOnBall = 0;
        this.fieldMultiplier = 0;
    }

    addPoints(pts, ball) {
        this.points += ball.multiplyPoints(pts);
    }

    addPoints(pts){
        this.points += pts;
    }

}