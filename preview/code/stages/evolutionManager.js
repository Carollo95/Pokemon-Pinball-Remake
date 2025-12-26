const EVOLUTION_TIRED_TIME_MS = 10000;

class EvolutionManager {

    constructor(stageText, targetArrows, evolutionItems, addExperienceCallback, onFullExperienceCallback) {

        this.stageText = stageText;
        this.targetArrows = targetArrows;
        this.evolutionItems = evolutionItems;
        this.validTargetArrows = [];
        this.lastTiredTime = -10000;
        this.isTired = false;
        this.evolutionLevel = 0;
        this.addExperienceCallback = addExperienceCallback;
        this.onFullExperienceCallback = onFullExperienceCallback;
    }

    update(ballSprite) {
        if (this.isTired && this.hasTiredTimePassed()) {
            this.recoverPokemon();
        }

        this.evolutionItems.forEach(et => et.update(ballSprite, this.evolutionLevel));
    }

    recoverPokemon() {
        if (this.isTired) {
            this.showTargetArrows();
            this.isTired = false;
            this.stageText.setScrollText(I18NManager.translate("pokemon_recovered"));
        }

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
        this.targetArrows.forEach(ta => ta.setActive(false));
        
        this.targetPokemon = target;
        const pool = this.chooseTargetsForTheEvolutionPhase(this.targetArrows);
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        this.validTargetArrows = pool.slice(0, Math.min(3, pool.length));

        pool.forEach(ta => { ta.setActive(true); });
        this.evolutionItems.forEach(et => et.setEvolutionMethod(getEvolutionMethod(target)));
        this.evolutionLevel = 0;

        if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.EXPERIENCE) {
            this.stageText.setScrollText(I18NManager.translate("start_training"))
        } else {
            this.stageText.setScrollText(I18NManager.translate("find_items"))
        }

    }

    chooseTargetsForTheEvolutionPhase(allTargetArrows) {
        if(allTargetArrows.length <=4) return allTargetArrows;

        const allTargetArrowsCopy = [...allTargetArrows];
        for (let i = allTargetArrowsCopy.length - 1; i > 0; i--) {
            const j = this.randInt0N(i + 1);
            [allTargetArrowsCopy[i], allTargetArrowsCopy[j]] = [allTargetArrowsCopy[j], allTargetArrowsCopy[i]];
        }
        
        return allTargetArrowsCopy.slice(0, 4);
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
        Audio.playSFX('sfx47');

        if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.EXPERIENCE) {
            this.stageText.setScrollText(I18NManager.translate("pokemon_is_tired"));
        } else {
            this.stageText.setScrollText(I18NManager.translate("try_next_place"));
        }
    }

    spawnEvolutionItem() {
        this.hideTargetArrows();
        let n = this.randInt0N(this.evolutionItems.length);

        this.evolutionItems[n].setActive(true, this.onevolutionItemHit);
        Audio.playSFX('sfx46');

        if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.EXPERIENCE) {
            this.stageText.setScrollText(I18NManager.translate("get_experience"));
        } else if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.THUNDER_STONE) {
            this.stageText.setScrollText(I18NManager.translate("get_thunder_stone"))
        } else if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.FIRE_STONE) {
            this.stageText.setScrollText(I18NManager.translate("get_fire_stone"))
        } else if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.WATER_STONE) {
            this.stageText.setScrollText(I18NManager.translate("get_water_stone"))
        } else if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.LEAF_STONE) {
            this.stageText.setScrollText(I18NManager.translate("get_leaf_stone"))
        } else if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.MOON_STONE) {
            this.stageText.setScrollText(I18NManager.translate("get_moon_stone"))
        } else if (this.targetPokemon.evolutionMethod === EVOLUTION_METHODS.LINK_CABLE) {
            this.stageText.setScrollText(I18NManager.translate("get_link_cable"))
        }
    }

    onevolutionItemHit = () => {
        this.stageText.setScrollText(I18NManager.translate("you_got_it"));
        this.addExperienceCallback();

        this.evolutionLevel++;
        if (this.evolutionLevel >= 3) {
            this.onFullExperienceCallback();
        } else {
            this.showTargetArrows();
        }
    }


    randInt0N(n) {
        return Math.floor(Math.random() * (n));
    }

    interruptEvolution() {
        this.hideTargetArrows();
        this.evolutionItems.forEach(et => et.setActive(false));
    }

}