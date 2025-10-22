const POKEDEX = [
    BULBASAUR = {
        id: "001",
        name: "Bulbasaur",
        evolutionId: "002"
    },
    IVYSAUR = {
        id: "002",
        name: "Ivysaur",
        evolutionId: "003"
    },
    VENUSAUR = {
        id: "003",
        name: "Venusaur",
        evolutionId: null
    }
]


function getPokemonById(id) {
    for (let i = 0; i < POKEDEX.length; i++) {
        if (POKEDEX[i].id === id) {
            return POKEDEX[i];
        }
    }
    return null;
}   

function canEvolve(id){
    const currentPokemon = getPokemonById(id);
    if (currentPokemon && currentPokemon.evolutionId) {
        return true;
    }
    return false;
}