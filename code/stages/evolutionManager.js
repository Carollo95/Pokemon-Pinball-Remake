const EVOLUTION_TIRED_TIME_MS = 5000;

class EvolutionManager {

    constructor(stageText, targetArrows, evolutionTargets, addExperienceCallback, onFullExperienceCallback) {

        this.stageText = stageText;
        this.targetArrows = targetArrows;
        this.evolutionTargets = evolutionTargets;
        this.validTargetArrows = [];
        this.lastTiredTime = -10000;
        this.isTired = false;
        this.evolutionLevel = 0;
        this.addExperienceCallback = addExperienceCallback;
        this.onFullExperienceCallback = onFullExperienceCallback;
    }

    update(ballSprite) {
        if (this.isTired && this.hasTiredTimePassed()) {
            this.showTargetArrows();
            this.isTired = false;
            this.stageText.setScrollText(I18NManager.translate("pokemon_recovered"));
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
        this.evolutionTargets.forEach(et => et.setEvolutionMethod(getEvolutionMethod(target)));
        this.evolutionLevel = 0;

        this.stageText.setScrollText(I18NManager.translate("start_training"))

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
        this.stageText.setScrollText(I18NManager.translate("pokemon_is_tired"));
    }

    spawnEvolutionItem() {
        this.hideTargetArrows();
        let n = this.randInt0N(this.evolutionTargets.length);
        this.stageText.setScrollText(I18NManager.translate("get_experience"));
        this.evolutionTargets[n].setActive(true, this.onEvolutionTargetHit);
    }

    onEvolutionTargetHit = () => {
        this.showTargetArrows();
        this.stageText.setScrollText(I18NManager.translate("you_got_it"));
        this.addExperienceCallback();

        this.evolutionLevel++;
        if (this.evolutionLevel >= 3) {
            this.onFullExperienceCallback();
        }
    }


    randInt0N(n) {
        return Math.floor(Math.random() * (n));
    }

}