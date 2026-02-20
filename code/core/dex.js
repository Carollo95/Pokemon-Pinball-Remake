const EVOLUTION_METHODS = {
    EXPERIENCE: "EX",
    THUNDER_STONE: "TS",
    WATER_STONE: "WS",
    FIRE_STONE: "FS",
    LEAF_STONE: "LS",
    MOON_STONE: "MS",
    LINK_CABLE: "LC"
}

const POKEDEX = {
    BULBASAUR: { id: "001", name: "bulbasaur", type: "pokemon_type_seed", evolutionId: "002", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    IVYSAUR: { id: "002", name: "ivysaur", type: "pokemon_type_seed", evolutionId: "003", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    VENUSAUR: { id: "003", name: "venusaur", type: "pokemon_type_seed", evolutionId: null, basic: false, evolutionMethod: null },
    CHARMANDER: { id: "004", name: "charmander", type: "pokemon_type_lizard", evolutionId: "005", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    CHARMELEON: { id: "005", name: "charmeleon", type: "pokemon_type_flame", evolutionId: "006", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    CHARIZARD: { id: "006", name: "charizard", type: "pokemon_type_flame", evolutionId: null, basic: false, evolutionMethod: null },
    SQUIRTLE: { id: "007", name: "squirtle", type: "pokemon_type_tiny_turtle", evolutionId: "008", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    WARTORTLE: { id: "008", name: "wartortle", type: "pokemon_type_turtle", evolutionId: "009", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    BLASTOISE: { id: "009", name: "blastoise", type: "pokemon_type_shellfish", evolutionId: null, basic: false, evolutionMethod: null },
    CATERPIE: { id: "010", name: "caterpie", type: "pokemon_type_worm", evolutionId: "011", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    METAPOD: { id: "011", name: "metapod", type: "pokemon_type_cocoon", evolutionId: "012", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    BUTTERFREE: { id: "012", name: "butterfree", type: "pokemon_type_butterfly", evolutionId: null, basic: false, evolutionMethod: null },
    WEEDLE: { id: "013", name: "weedle", type: "pokemon_type_hairy_bug", evolutionId: "014", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    KAKUNA: { id: "014", name: "kakuna", type: "pokemon_type_cocoon", evolutionId: "015", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    BEEDRILL: { id: "015", name: "beedrill", type: "pokemon_type_poison_bee", evolutionId: null, basic: false, evolutionMethod: null },
    PIDGEY: { id: "016", name: "pidgey", type: "pokemon_type_tiny_bird", evolutionId: "017", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PIDGEOTTO: { id: "017", name: "pidgeotto", type: "pokemon_type_bird", evolutionId: "018", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PIDGEOT: { id: "018", name: "pidgeot", type: "pokemon_type_bird", evolutionId: null, basic: false, evolutionMethod: null },
    RATTATA: { id: "019", name: "rattata", type: "pokemon_type_rat", evolutionId: "020", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    RATICATE: { id: "020", name: "raticate", type: "pokemon_type_mouse", evolutionId: null, basic: false, evolutionMethod: null },
    SPEAROW: { id: "021", name: "spearow", type: "pokemon_type_tiny_bird", evolutionId: "022", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    FEAROW: { id: "022", name: "fearow", type: "pokemon_type_beak", evolutionId: null, basic: false, evolutionMethod: null },
    EKANS: { id: "023", name: "ekans", type: "pokemon_type_snake", evolutionId: "024", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    ARBOK: { id: "024", name: "arbok", type: "pokemon_type_cobra", evolutionId: null, basic: false, evolutionMethod: null },
    PIKACHU: { id: "025", name: "pikachu", type: "pokemon_type_mouse", evolutionId: "026", basic: true, evolutionMethod: EVOLUTION_METHODS.THUNDER_STONE },
    RAICHU: { id: "026", name: "raichu", type: "pokemon_type_mouse", evolutionId: null, basic: false, evolutionMethod: null },
    SANDSHREW: { id: "027", name: "sandshrew", type: "pokemon_type_mouse", evolutionId: "028", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    SANDSLASH: { id: "028", name: "sandslash", type: "pokemon_type_mouse", evolutionId: null, basic: false, evolutionMethod: null },
    NIDORAN_F: { id: "029", name: "nidoran_f", type: "pokemon_type_poison_pin", evolutionId: "030", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    NIDORINA: { id: "030", name: "nidorina", type: "pokemon_type_poison_pin", evolutionId: "031", basic: false, evolutionMethod: EVOLUTION_METHODS.MOON_STONE },
    NIDOQUEEN: { id: "031", name: "nidoqueen", type: "pokemon_type_drill", evolutionId: null, basic: false, evolutionMethod: null },
    NIDORAN_M: { id: "032", name: "nidoran_m", type: "pokemon_type_poison_pin", evolutionId: "033", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    NIDORINO: { id: "033", name: "nidorino", type: "pokemon_type_poison_pin", evolutionId: "034", basic: false, evolutionMethod: EVOLUTION_METHODS.MOON_STONE },
    NIDOKING: { id: "034", name: "nidoking", type: "pokemon_type_drill", evolutionId: null, basic: false, evolutionMethod: null },
    CLEFAIRY: { id: "035", name: "clefairy", type: "pokemon_type_fairy", evolutionId: "036", basic: true, evolutionMethod: EVOLUTION_METHODS.MOON_STONE },
    CLEFABLE: { id: "036", name: "clefable", type: "pokemon_type_fairy", evolutionId: null, basic: false, evolutionMethod: null },
    VULPIX: { id: "037", name: "vulpix", type: "pokemon_type_fox", evolutionId: "038", basic: true, evolutionMethod: EVOLUTION_METHODS.FIRE_STONE },
    NINETALES: { id: "038", name: "ninetales", type: "pokemon_type_fox", evolutionId: null, basic: false, evolutionMethod: null },
    JIGGLYPUFF: { id: "039", name: "jigglypuff", type: "pokemon_type_balloon", evolutionId: "040", basic: true, evolutionMethod: EVOLUTION_METHODS.MOON_STONE },
    WIGGLYTUFF: { id: "040", name: "wigglytuff", type: "pokemon_type_balloon", evolutionId: null, basic: false, evolutionMethod: null },
    ZUBAT: { id: "041", name: "zubat", type: "pokemon_type_bat", evolutionId: "042", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GOLBAT: { id: "042", name: "golbat", type: "pokemon_type_bat", evolutionId: null, basic: false, evolutionMethod: null },
    ODDISH: { id: "043", name: "oddish", type: "pokemon_type_weed", evolutionId: "044", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GLOOM: { id: "044", name: "gloom", type: "pokemon_type_weed", evolutionId: "045", basic: false, evolutionMethod: EVOLUTION_METHODS.LEAF_STONE },
    VILEPLUME: { id: "045", name: "vileplume", type: "pokemon_type_flower", evolutionId: null, basic: false, evolutionMethod: null },
    PARAS: { id: "046", name: "paras", type: "pokemon_type_mushroom", evolutionId: "047", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PARASECT: { id: "047", name: "parasect", type: "pokemon_type_mushroom", evolutionId: null, basic: false, evolutionMethod: null },
    VENONAT: { id: "048", name: "venonat", type: "pokemon_type_insect", evolutionId: "049", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    VENOMOTH: { id: "049", name: "venomoth", type: "pokemon_type_poison_moth", evolutionId: null, basic: false, evolutionMethod: null },
    DIGLETT: { id: "050", name: "diglett", type: "pokemon_type_mole", evolutionId: "051", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DUGTRIO: { id: "051", name: "dugtrio", type: "pokemon_type_mole", evolutionId: null, basic: false, evolutionMethod: null },
    MEOWTH: { id: "052", name: "meowth", type: "pokemon_type_scratch_cat", evolutionId: "053", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PERSIAN: { id: "053", name: "persian", type: "pokemon_type_classy_cat", evolutionId: null, basic: false, evolutionMethod: null },
    PSYDUCK: { id: "054", name: "psyduck", type: "pokemon_type_duck", evolutionId: "055", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GOLDUCK: { id: "055", name: "golduck", type: "pokemon_type_duck", evolutionId: null, basic: false, evolutionMethod: null },
    MANKEY: { id: "056", name: "mankey", type: "pokemon_type_pig_monkey", evolutionId: "057", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PRIMEAPE: { id: "057", name: "primeape", type: "pokemon_type_pig_monkey", evolutionId: null, basic: false, evolutionMethod: null },
    GROWLITHE: { id: "058", name: "growlithe", type: "pokemon_type_puppy", evolutionId: "059", basic: true, evolutionMethod: EVOLUTION_METHODS.FIRE_STONE },
    ARCANINE: { id: "059", name: "arcanine", type: "pokemon_type_legendary", evolutionId: null, basic: false, evolutionMethod: null },
    POLIWAG: { id: "060", name: "poliwag", type: "pokemon_type_tadpole", evolutionId: "061", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    POLIWHIRL: { id: "061", name: "poliwhirl", type: "pokemon_type_tadpole", evolutionId: "062", basic: false, evolutionMethod: EVOLUTION_METHODS.WATER_STONE },
    POLIWRATH: { id: "062", name: "poliwrath", type: "pokemon_type_tadpole", evolutionId: null, basic: false, evolutionMethod: null },
    ABRA: { id: "063", name: "abra", type: "pokemon_type_psi", evolutionId: "064", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    KADABRA: { id: "064", name: "kadabra", type: "pokemon_type_psi", evolutionId: "065", basic: false, evolutionMethod: EVOLUTION_METHODS.LINK_CABLE },
    ALAKAZAM: { id: "065", name: "alakazam", type: "pokemon_type_psi", evolutionId: null, basic: false, evolutionMethod: null },
    MACHOP: { id: "066", name: "machop", type: "pokemon_type_superpower", evolutionId: "067", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    MACHOKE: { id: "067", name: "machoke", type: "pokemon_type_superpower", evolutionId: "068", basic: false, evolutionMethod: EVOLUTION_METHODS.LINK_CABLE },
    MACHAMP: { id: "068", name: "machamp", type: "pokemon_type_superpower", evolutionId: null, basic: false, evolutionMethod: null },
    BELLSPROUT: { id: "069", name: "bellsprout", type: "pokemon_type_flower", evolutionId: "070", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    WEEPINBELL: { id: "070", name: "weepinbell", type: "pokemon_type_flycatcher", evolutionId: "071", basic: false, evolutionMethod: EVOLUTION_METHODS.LEAF_STONE },
    VICTREEBEL: { id: "071", name: "victreebel", type: "pokemon_type_flycatcher", evolutionId: null, basic: false, evolutionMethod: null },
    TENTACOOL: { id: "072", name: "tentacool", type: "pokemon_type_jellyfish", evolutionId: "073", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    TENTACRUEL: { id: "073", name: "tentacruel", type: "pokemon_type_jellyfish", evolutionId: null, basic: false, evolutionMethod: null },
    GEODUDE: { id: "074", name: "geodude", type: "pokemon_type_rock", evolutionId: "075", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GRAVELER: { id: "075", name: "graveler", type: "pokemon_type_rock", evolutionId: "076", basic: false, evolutionMethod: EVOLUTION_METHODS.LINK_CABLE },
    GOLEM: { id: "076", name: "golem", type: "pokemon_type_megaton", evolutionId: null, basic: false, evolutionMethod: null },
    PONYTA: { id: "077", name: "ponyta", type: "pokemon_type_fire_horse", evolutionId: "078", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    RAPIDASH: { id: "078", name: "rapidash", type: "pokemon_type_fire_horse", evolutionId: null, basic: false, evolutionMethod: null },
    SLOWPOKE: { id: "079", name: "slowpoke", type: "pokemon_type_dopey", evolutionId: "080", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    SLOWBRO: { id: "080", name: "slowbro", type: "pokemon_type_hermit_crab", evolutionId: null, basic: false, evolutionMethod: null },
    MAGNEMITE: { id: "081", name: "magnemite", type: "pokemon_type_magnet", evolutionId: "082", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    MAGNETON: { id: "082", name: "magneton", type: "pokemon_type_magnet", evolutionId: null, basic: false, evolutionMethod: null },
    FARFETCHD: { id: "083", name: "farfetchd", type: "pokemon_type_wild_duck", evolutionId: null, basic: true, evolutionMethod: null },
    DODUO: { id: "084", name: "doduo", type: "pokemon_type_twin_bird", evolutionId: "085", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DODRIO: { id: "085", name: "dodrio", type: "pokemon_type_triple_bird", evolutionId: null, basic: false, evolutionMethod: null },
    SEEL: { id: "086", name: "seel", type: "pokemon_type_sea_lion", evolutionId: "087", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DEWGONG: { id: "087", name: "dewgong", type: "pokemon_type_sea_lion", evolutionId: null, basic: false, evolutionMethod: null },
    GRIMER: { id: "088", name: "grimer", type: "pokemon_type_sludge", evolutionId: "089", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    MUK: { id: "089", name: "muk", type: "pokemon_type_sludge", evolutionId: null, basic: false, evolutionMethod: null },
    SHELLDER: { id: "090", name: "shellder", type: "pokemon_type_bivalve", evolutionId: "091", basic: true, evolutionMethod: EVOLUTION_METHODS.WATER_STONE },
    CLOYSTER: { id: "091", name: "cloyster", type: "pokemon_type_bivalve", evolutionId: null, basic: false, evolutionMethod: null },
    GASTLY: { id: "092", name: "gastly", type: "pokemon_type_gas", evolutionId: "093", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    HAUNTER: { id: "093", name: "haunter", type: "pokemon_type_gas", evolutionId: "094", basic: false, evolutionMethod: EVOLUTION_METHODS.LINK_CABLE },
    GENGAR: { id: "094", name: "gengar", type: "pokemon_type_shadow", evolutionId: null, basic: false, evolutionMethod: null },
    ONIX: { id: "095", name: "onix", type: "pokemon_type_rock_snake", evolutionId: null, basic: true, evolutionMethod: null },
    DROWZEE: { id: "096", name: "drowzee", type: "pokemon_type_hypnosis", evolutionId: "097", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    HYPNO: { id: "097", name: "hypno", type: "pokemon_type_hypnosis", evolutionId: null, basic: false, evolutionMethod: null },
    KRABBY: { id: "098", name: "krabby", type: "pokemon_type_river_crab", evolutionId: "099", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    KINGLER: { id: "099", name: "kingler", type: "pokemon_type_pincer", evolutionId: null, basic: false, evolutionMethod: null },
    VOLTORB: { id: "100", name: "voltorb", type: "pokemon_type_ball", evolutionId: "101", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    ELECTRODE: { id: "101", name: "electrode", type: "pokemon_type_ball", evolutionId: null, basic: false, evolutionMethod: null },
    EXEGGCUTE: { id: "102", name: "exeggcute", type: "pokemon_type_egg", evolutionId: "103", basic: true, evolutionMethod: EVOLUTION_METHODS.LEAF_STONE },
    EXEGGUTOR: { id: "103", name: "exeggutor", type: "pokemon_type_coconut", evolutionId: null, basic: false, evolutionMethod: null },
    CUBONE: { id: "104", name: "cubone", type: "pokemon_type_lonely", evolutionId: "105", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    MAROWAK: { id: "105", name: "marowak", type: "pokemon_type_bone_keeper", evolutionId: null, basic: false, evolutionMethod: null },
    HITMONLEE: { id: "106", name: "hitmonlee", type: "pokemon_type_kicking", evolutionId: null, basic: true, evolutionMethod: null },
    HITMONCHAN: { id: "107", name: "hitmonchan", type: "pokemon_type_punching", evolutionId: null, basic: true, evolutionMethod: null },
    LICKITUNG: { id: "108", name: "lickitung", type: "pokemon_type_licking", evolutionId: null, basic: true, evolutionMethod: null },
    KOFFING: { id: "109", name: "koffing", type: "pokemon_type_poison_gas", evolutionId: "110", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    WEEZING: { id: "110", name: "weezing", type: "pokemon_type_poison_gas", evolutionId: null, basic: false, evolutionMethod: null },
    RHYHORN: { id: "111", name: "rhyhorn", type: "pokemon_type_spikes", evolutionId: "112", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    RHYDON: { id: "112", name: "rhydon", type: "pokemon_type_drill", evolutionId: null, basic: false, evolutionMethod: null },
    CHANSEY: { id: "113", name: "chansey", type: "pokemon_type_egg", evolutionId: null, basic: true, evolutionMethod: null },
    TANGELA: { id: "114", name: "tangela", type: "pokemon_type_vine", evolutionId: null, basic: true, evolutionMethod: null },
    KANGASKHAN: { id: "115", name: "kangaskhan", type: "pokemon_type_parent", evolutionId: null, basic: true, evolutionMethod: null },
    HORSEA: { id: "116", name: "horsea", type: "pokemon_type_dragon", evolutionId: "117", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    SEADRA: { id: "117", name: "seadra", type: "pokemon_type_dragon", evolutionId: null, basic: false, evolutionMethod: null },
    GOLDEEN: { id: "118", name: "goldeen", type: "pokemon_type_goldfish", evolutionId: "119", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    SEAKING: { id: "119", name: "seaking", type: "pokemon_type_goldfish", evolutionId: null, basic: false, evolutionMethod: null },
    STARYU: { id: "120", name: "staryu", type: "pokemon_type_star_shape", evolutionId: "121", basic: true, evolutionMethod: EVOLUTION_METHODS.WATER_STONE },
    STARMIE: { id: "121", name: "starmie", type: "pokemon_type_mysterious", evolutionId: null, basic: false, evolutionMethod: null },
    MR_MIME: { id: "122", name: "mr_mime", type: "pokemon_type_barrier", evolutionId: null, basic: true, evolutionMethod: null },
    SCYTHER: { id: "123", name: "scyther", type: "pokemon_type_mantis", evolutionId: null, basic: true, evolutionMethod: null },
    JYNX: { id: "124", name: "jynx", type: "pokemon_type_human_shape", evolutionId: null, basic: true, evolutionMethod: null },
    ELECTABUZZ: { id: "125", name: "electabuzz", type: "pokemon_type_electric", evolutionId: null, basic: true, evolutionMethod: null },
    MAGMAR: { id: "126", name: "magmar", type: "pokemon_type_spitfire", evolutionId: null, basic: true, evolutionMethod: null },
    PINSIR: { id: "127", name: "pinsir", type: "pokemon_type_stag_beetle", evolutionId: null, basic: true, evolutionMethod: null },
    TAUROS: { id: "128", name: "tauros", type: "pokemon_type_wild_bull", evolutionId: null, basic: true, evolutionMethod: null },
    MAGIKARP: { id: "129", name: "magikarp", type: "pokemon_type_fish", evolutionId: "130", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GYARADOS: { id: "130", name: "gyarados", type: "pokemon_type_atrocious", evolutionId: null, basic: false, evolutionMethod: null },
    LAPRAS: { id: "131", name: "lapras", type: "pokemon_type_transport", evolutionId: null, basic: true, evolutionMethod: null },
    DITTO: { id: "132", name: "ditto", type: "pokemon_type_transform", evolutionId: null, basic: true, evolutionMethod: null },
    EEVEE: { id: "133", name: "eevee", type: "pokemon_type_evolution", evolutionId: null, basic: true, evolutionMethod: null }, // evoluciones por piedra (WS/TS/FS) gestionadas fuera
    VAPOREON: { id: "134", name: "vaporeon", type: "pokemon_type_bubble_jet", evolutionId: null, basic: false, evolutionMethod: null },
    JOLTEON: { id: "135", name: "jolteon", type: "pokemon_type_lightning", evolutionId: null, basic: false, evolutionMethod: null },
    FLAREON: { id: "136", name: "flareon", type: "pokemon_type_flame", evolutionId: null, basic: false, evolutionMethod: null },
    PORYGON: { id: "137", name: "porygon", type: "pokemon_type_virtual", evolutionId: null, basic: true, evolutionMethod: null },
    OMANYTE: { id: "138", name: "omanyte", type: "pokemon_type_spiral", evolutionId: "139", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    OMASTAR: { id: "139", name: "omastar", type: "pokemon_type_spiral", evolutionId: null, basic: false, evolutionMethod: null },
    KABUTO: { id: "140", name: "kabuto", type: "pokemon_type_shellfish", evolutionId: "141", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    KABUTOPS: { id: "141", name: "kabutops", type: "pokemon_type_shellfish", evolutionId: null, basic: false, evolutionMethod: null },
    AERODACTYL: { id: "142", name: "aerodactyl", type: "pokemon_type_fossil", evolutionId: null, basic: true, evolutionMethod: null },
    SNORLAX: { id: "143", name: "snorlax", type: "pokemon_type_sleeping", evolutionId: null, basic: true, evolutionMethod: null },
    ARTICUNO: { id: "144", name: "articuno", type: "pokemon_type_freeze", evolutionId: null, basic: true, evolutionMethod: null },
    ZAPDOS: { id: "145", name: "zapdos", type: "pokemon_type_electric", evolutionId: null, basic: true, evolutionMethod: null },
    MOLTRES: { id: "146", name: "moltres", type: "pokemon_type_flame", evolutionId: null, basic: true, evolutionMethod: null },
    DRATINI: { id: "147", name: "dratini", type: "pokemon_type_dragon", evolutionId: "148", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DRAGONAIR: { id: "148", name: "dragonair", type: "pokemon_type_dragon", evolutionId: "149", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DRAGONITE: { id: "149", name: "dragonite", type: "pokemon_type_dragon", evolutionId: null, basic: false, evolutionMethod: null },
    MEWTWO: { id: "150", name: "mewtwo", type: "pokemon_type_genetic", evolutionId: null, basic: true, evolutionMethod: null },
    MEW: { id: "151", name: "mew", type: "pokemon_type_new_species", evolutionId: null, basic: true, evolutionMethod: null }
};


const BASIC_POKEMON = Object.values(POKEDEX).filter(pokemon => pokemon.basic);
const ALL_POKEMON = Object.values(POKEDEX);

function saveObtainedPokemon(pokemonId) {
    const obtainedPokemon = JSON.parse(localStorage.getItem("obtainedPokemon") || "[]");
    if (!obtainedPokemon.includes(pokemonId)) {
        obtainedPokemon.push(pokemonId);
        localStorage.setItem("obtainedPokemon", JSON.stringify(obtainedPokemon));
    }
}

function getObtainedPokemonIds() {
    return JSON.parse(localStorage.getItem("obtainedPokemon") || "[]");
}

function saveSeenPokemon(pokemonId) {
    const seenPokemon = JSON.parse(localStorage.getItem("seenPokemon") || "[]");
    if (!seenPokemon.includes(pokemonId)) {
        seenPokemon.push(pokemonId);
        localStorage.setItem("seenPokemon", JSON.stringify(seenPokemon));
    }
}

function getSeenPokemonIds() {
    return JSON.parse(localStorage.getItem("seenPokemon") || "[]");
}

function getPokemonById(id) {
    const key = String(id).padStart(3, '0');
    return Object.values(POKEDEX).find(p => p.id === key) || null;
}
function getPokemonNextEvolution(pokemon) {
    let evolutionId = pokemon.evolutionId;
    return evolutionId !== null ? getPokemonById(evolutionId) : pokemon;
}

function canEvolve(id) {
    const currentPokemon = getPokemonById(id);
    return !!(currentPokemon && currentPokemon.evolutionId);
}

function getEvolutionMethod(pokemon) {
    if (pokemon.evolutionMethod === null) {
        return EVOLUTION_METHODS.EXPERIENCE;
    }
    return pokemon.evolutionMethod;
}