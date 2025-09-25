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
    }
    
    getBonusForCaughtPokemonOnBall() {

    }
    getBonusForEvolvedPokemonOnBall() {

    }
    getBonusForCaughtStartedOnBall() {

    }
    getBonusForTravelOnBall() {

    }
    getBonusForCaveShotsOnBall() {

    }
    getBonusForSpinnerTurnsOnBall() {

    }
    getTotalPointsForBall() {

    }

    startNewBall() {
        this.balls--;

        this.pokemonCaughtOnBall = 0;
        this.pokemonEvolvedOnBall = 0;
        this.caughtStartedOnBall = 0;
        this.travelOnBall = 0;
        this.caveShotsOnBall = 0;
        this.spinnerTurnsOnBall = 0;
    }

    addPoints(pts, ball) {
        this.points += ball.multiplyPoints(pts);
    }

}