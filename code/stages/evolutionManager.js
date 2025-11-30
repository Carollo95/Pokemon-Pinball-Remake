const EVOLUTION_TIRED_TIME_MS = 5000;

class EvolutionManager {

    constructor(targetArrows, evolutionTargets) {

        this.targetArrows = targetArrows;
        this.evolutionTargets = evolutionTargets;
        this.validTargetArrows = [];
        this.lastTiredTime = -10000;
        this.isTired = false;
    }

    update(ballSprite) {
        if (this.isTired && this.hasTiredTimePassed()) {
            this.showTargetArrows();
            this.isTired = false;
        }

        this.evolutionTargets.forEach(et => et.update(ballSprite));
    }

    onEvolutionTargetArrowHit(targetArrow) {
        if (targetArrow.active && targetArrow.visible) {
            if (this.validTargetArrows.includes(targetArrow)) {
                this.spawnEvolutionItem();
            } else {
                this.setPokemonTired();
            }
            targetArrow.setActive(false);
        }
    }

    startEvolution(target) {
        //Pick 3 random target arrows to be evolution, the rest just get the pokemon tired
        const pool = [...this.targetArrows];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        this.validTargetArrows = pool.slice(0, Math.min(3, pool.length));

        this.targetArrows.forEach(ta => { ta.setVisible(true); });
        this.evolutionTargets.forEach(et => et.setEvolutionMethod(target.evolutionMethod));
    }

    hasTiredTimePassed() {
        return millis() - this.lastTiredTime >= EVOLUTION_TIRED_TIME_MS;
    }

    showTargetArrows() {
        this.targetArrows.forEach(arrow => arrow.setVisible(true));
    }


    hideTargetArrows() {
        this.targetArrows.forEach(arrow => arrow.setVisible(false));
    }

    setPokemonTired() {
        this.isTired = true;
        this.lastTiredTime = millis();
        this.hideTargetArrows();
        console.log("pokemon is tired")
        //TODO text "Try next place" or whatever else
    }

    spawnEvolutionItem() {
        this.hideTargetArrows();
        let n = this.randInt0N(this.evolutionTargets.length);
        console.log("get evolution item")
        this.evolutionTargets[n].setActive(true, this.onEvolutionTargetHit);
    }

    onEvolutionTargetHit = () => {
        this.showTargetArrows();
        console.log("got it, this sholud call a callback to add experience and so on");
        //TODO add experience
        //TODO IF enough experience open well (Callback)
    }


    randInt0N(n) {
        return Math.floor(Math.random() * (n));
    }

}