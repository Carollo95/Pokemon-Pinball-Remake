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
    BULBASAUR: { id: "001", name: "bulbasaur", type: "pokemon_type_seed", heightI: " 203", heightM: " 070", weightI: "  15", weightM: "  6 9", evolutionId: "002", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    IVYSAUR: { id: "002", name: "ivysaur", type: "pokemon_type_seed", heightI: " 303", heightM: " 100", weightI: "  28", weightM: " 13 0", evolutionId: "003", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    VENUSAUR: { id: "003", name: "venusaur", type: "pokemon_type_seed", heightI: " 606", heightM: " 200", weightI: " 220", weightM: "100 0", evolutionId: null, basic: false, evolutionMethod: null },
    CHARMANDER: { id: "004", name: "charmander", type: "pokemon_type_lizard", heightI: " 111", heightM: " 060", weightI: "  18", weightM: "  8 5", evolutionId: "005", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    CHARMELEON: { id: "005", name: "charmeleon", type: "pokemon_type_flame", heightI: " 307", heightM: " 110", weightI: "  41", weightM: " 19 0", evolutionId: "006", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    CHARIZARD: { id: "006", name: "charizard", type: "pokemon_type_flame", heightI: " 506", heightM: " 170", weightI: " 199", weightM: " 90 5", evolutionId: null, basic: false, evolutionMethod: null },
    SQUIRTLE: { id: "007", name: "squirtle", type: "pokemon_type_tiny_turtle", heightI: " 107", heightM: " 050", weightI: "  19", weightM: "  9 0", evolutionId: "008", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    WARTORTLE: { id: "008", name: "wartortle", type: "pokemon_type_turtle", heightI: " 303", heightM: " 100", weightI: "  49", weightM: " 22 5", evolutionId: "009", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    BLASTOISE: { id: "009", name: "blastoise", type: "pokemon_type_shellfish", heightI: " 502", heightM: " 160", weightI: " 188", weightM: " 85 5", evolutionId: null, basic: false, evolutionMethod: null },
    CATERPIE: { id: "010", name: "caterpie", type: "pokemon_type_worm", heightI: " 011", heightM: " 030", weightI: "   6", weightM: "  2 9", evolutionId: "011", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    METAPOD: { id: "011", name: "metapod", type: "pokemon_type_cocoon", heightI: " 203", heightM: " 070", weightI: "  21", weightM: "  9 9", evolutionId: "012", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    BUTTERFREE: { id: "012", name: "butterfree", type: "pokemon_type_butterfly", heightI: " 307", heightM: " 110", weightI: "  70", weightM: " 32 0", evolutionId: null, basic: false, evolutionMethod: null },
    WEEDLE: { id: "013", name: "weedle", type: "pokemon_type_hairy_bug", heightI: " 011", heightM: " 030", weightI: "   7", weightM: "  3 2", evolutionId: "014", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    KAKUNA: { id: "014", name: "kakuna", type: "pokemon_type_cocoon", heightI: " 111", heightM: " 060", weightI: "  22", weightM: " 10 0", evolutionId: "015", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    BEEDRILL: { id: "015", name: "beedrill", type: "pokemon_type_poison_bee", heightI: " 303", heightM: " 100", weightI: "  65", weightM: " 29 5", evolutionId: null, basic: false, evolutionMethod: null },
    PIDGEY: { id: "016", name: "pidgey", type: "pokemon_type_tiny_bird", heightI: " 011", heightM: " 030", weightI: "   3", weightM: "  1 8", evolutionId: "017", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PIDGEOTTO: { id: "017", name: "pidgeotto", type: "pokemon_type_bird", heightI: " 307", heightM: " 110", weightI: "  66", weightM: " 30 0", evolutionId: "018", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PIDGEOT: { id: "018", name: "pidgeot", type: "pokemon_type_bird", heightI: " 411", heightM: " 150", weightI: "  87", weightM: " 39 5", evolutionId: null, basic: false, evolutionMethod: null },
    RATTATA: { id: "019", name: "rattata", type: "pokemon_type_rat", heightI: " 011", heightM: " 030", weightI: "   7", weightM: "  3 5", evolutionId: "020", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    RATICATE: { id: "020", name: "raticate", type: "pokemon_type_mouse", heightI: " 203", heightM: " 070", weightI: "  40", weightM: " 18 5", evolutionId: null, basic: false, evolutionMethod: null },
    SPEAROW: { id: "021", name: "spearow", type: "pokemon_type_tiny_bird", heightI: " 011", heightM: " 030", weightI: "   4", weightM: "  2 0", evolutionId: "022", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    FEAROW: { id: "022", name: "fearow", type: "pokemon_type_beak", heightI: " 311", heightM: " 119", weightI: "  83", weightM: " 38 0", evolutionId: null, basic: false, evolutionMethod: null },
    EKANS: { id: "023", name: "ekans", type: "pokemon_type_snake", heightI: " 606", heightM: " 200", weightI: "  15", weightM: "  6 9", evolutionId: "024", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    ARBOK: { id: "024", name: "arbok", type: "pokemon_type_cobra", heightI: "1105", heightM: " 350", weightI: " 143", weightM: " 65 0", evolutionId: null, basic: false, evolutionMethod: null },
    PIKACHU: { id: "025", name: "pikachu", type: "pokemon_type_mouse", heightI: " 103", heightM: " 040", weightI: "  13", weightM: "  6 0", evolutionId: "026", basic: true, evolutionMethod: EVOLUTION_METHODS.THUNDER_STONE },
    RAICHU: { id: "026", name: "raichu", type: "pokemon_type_mouse", heightI: " 207", heightM: " 080", weightI: "  66", weightM: " 30 0", evolutionId: null, basic: false, evolutionMethod: null },
    SANDSHREW: { id: "027", name: "sandshrew", type: "pokemon_type_mouse", heightI: " 111", heightM: " 060", weightI: "  26", weightM: " 12 0", evolutionId: "028", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    SANDSLASH: { id: "028", name: "sandslash", type: "pokemon_type_mouse", heightI: " 303", heightM: " 100", weightI: "  65", weightM: " 29 5", evolutionId: null, basic: false, evolutionMethod: null },
    NIDORAN_F: { id: "029", name: "nidoran_f", type: "pokemon_type_poison_pin", heightI: " 103", heightM: " 040", weightI: "  15", weightM: "  7 0", evolutionId: "030", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    NIDORINA: { id: "030", name: "nidorina", type: "pokemon_type_poison_pin", heightI: " 207", heightM: " 080", weightI: "  44", weightM: " 20 0", evolutionId: "031", basic: false, evolutionMethod: EVOLUTION_METHODS.MOON_STONE },
    NIDOQUEEN: { id: "031", name: "nidoqueen", type: "pokemon_type_drill", heightI: " 403", heightM: " 130", weightI: " 132", weightM: " 60 0", evolutionId: null, basic: false, evolutionMethod: null },
    NIDORAN_M: { id: "032", name: "nidoran_m", type: "pokemon_type_poison_pin", heightI: " 107", heightM: " 050", weightI: "  19", weightM: "  9 0", evolutionId: "033", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    NIDORINO: { id: "033", name: "nidorino", type: "pokemon_type_poison_pin", heightI: " 211", heightM: " 090", weightI: "  42", weightM: " 19 5", evolutionId: "034", basic: false, evolutionMethod: EVOLUTION_METHODS.MOON_STONE },
    NIDOKING: { id: "034", name: "nidoking", type: "pokemon_type_drill", heightI: " 407", heightM: " 139", weightI: " 136", weightM: " 62 0", evolutionId: null, basic: false, evolutionMethod: null },
    CLEFAIRY: { id: "035", name: "clefairy", type: "pokemon_type_fairy", heightI: " 111", heightM: " 060", weightI: "  16", weightM: "  7 5", evolutionId: "036", basic: true, evolutionMethod: EVOLUTION_METHODS.MOON_STONE },
    CLEFABLE: { id: "036", name: "clefable", type: "pokemon_type_fairy", heightI: " 403", heightM: " 130", weightI: "  88", weightM: " 40 0", evolutionId: null, basic: false, evolutionMethod: null },
    VULPIX: { id: "037", name: "vulpix", type: "pokemon_type_fox", heightI: " 111", heightM: " 060", weightI: "  21", weightM: "  9 9", evolutionId: "038", basic: true, evolutionMethod: EVOLUTION_METHODS.FIRE_STONE },
    NINETALES: { id: "038", name: "ninetales", type: "pokemon_type_fox", heightI: " 307", heightM: " 110", weightI: "  43", weightM: " 19 8", evolutionId: null, basic: false, evolutionMethod: null },
    JIGGLYPUFF: { id: "039", name: "jigglypuff", type: "pokemon_type_balloon", heightI: " 107", heightM: " 050", weightI: "  12", weightM: "  5 5", evolutionId: "040", basic: true, evolutionMethod: EVOLUTION_METHODS.MOON_STONE },
    WIGGLYTUFF: { id: "040", name: "wigglytuff", type: "pokemon_type_balloon", heightI: " 303", heightM: " 100", weightI: "  26", weightM: " 12 0", evolutionId: null, basic: false, evolutionMethod: null },
    ZUBAT: { id: "041", name: "zubat", type: "pokemon_type_bat", heightI: " 207", heightM: " 080", weightI: "  16", weightM: "  7 5", evolutionId: "042", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GOLBAT: { id: "042", name: "golbat", type: "pokemon_type_bat", heightI: " 502", heightM: " 160", weightI: " 121", weightM: " 55 0", evolutionId: null, basic: false, evolutionMethod: null },
    ODDISH: { id: "043", name: "oddish", type: "pokemon_type_weed", heightI: " 107", heightM: " 050", weightI: "  11", weightM: "  5 4", evolutionId: "044", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GLOOM: { id: "044", name: "gloom", type: "pokemon_type_weed", heightI: " 207", heightM: " 080", weightI: "  18", weightM: "  8 5", evolutionId: "045", basic: false, evolutionMethod: EVOLUTION_METHODS.LEAF_STONE },
    VILEPLUME: { id: "045", name: "vileplume", type: "pokemon_type_flower", heightI: " 311", heightM: " 119", weightI: "  41", weightM: " 18 6", evolutionId: null, basic: false, evolutionMethod: null },
    PARAS: { id: "046", name: "paras", type: "pokemon_type_mushroom", heightI: " 011", heightM: " 030", weightI: "  11", weightM: "  5 4", evolutionId: "047", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PARASECT: { id: "047", name: "parasect", type: "pokemon_type_mushroom", heightI: " 303", heightM: " 100", weightI: "  65", weightM: " 29 5", evolutionId: null, basic: false, evolutionMethod: null },
    VENONAT: { id: "048", name: "venonat", type: "pokemon_type_insect", heightI: " 303", heightM: " 100", weightI: "  66", weightM: " 30 0", evolutionId: "049", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    VENOMOTH: { id: "049", name: "venomoth", type: "pokemon_type_poison_moth", heightI: " 411", heightM: " 150", weightI: "  27", weightM: " 12 5", evolutionId: null, basic: false, evolutionMethod: null },
    DIGLETT: { id: "050", name: "diglett", type: "pokemon_type_mole", heightI: " 007", heightM: " 020", weightI: "   1", weightM: "  0 8", evolutionId: "051", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DUGTRIO: { id: "051", name: "dugtrio", type: "pokemon_type_mole", heightI: " 203", heightM: " 070", weightI: "  73", weightM: " 33 2", evolutionId: null, basic: false, evolutionMethod: null },
    MEOWTH: { id: "052", name: "meowth", type: "pokemon_type_scratch_cat", heightI: " 103", heightM: " 040", weightI: "   9", weightM: "  4 2", evolutionId: "053", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PERSIAN: { id: "053", name: "persian", type: "pokemon_type_classy_cat", heightI: " 303", heightM: " 100", weightI: "  70", weightM: " 32 0", evolutionId: null, basic: false, evolutionMethod: null },
    PSYDUCK: { id: "054", name: "psyduck", type: "pokemon_type_duck", heightI: " 207", heightM: " 080", weightI: "  43", weightM: " 19 6", evolutionId: "055", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GOLDUCK: { id: "055", name: "golduck", type: "pokemon_type_duck", heightI: " 506", heightM: " 170", weightI: " 168", weightM: " 76 5", evolutionId: null, basic: false, evolutionMethod: null },
    MANKEY: { id: "056", name: "mankey", type: "pokemon_type_pig_monkey", heightI: " 107", heightM: " 050", weightI: "  61", weightM: " 28 0", evolutionId: "057", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    PRIMEAPE: { id: "057", name: "primeape", type: "pokemon_type_pig_monkey", heightI: " 303", heightM: " 100", weightI: "  70", weightM: " 32 0", evolutionId: null, basic: false, evolutionMethod: null },
    GROWLITHE: { id: "058", name: "growlithe", type: "pokemon_type_puppy", heightI: " 203", heightM: " 070", weightI: "  41", weightM: " 19 0", evolutionId: "059", basic: true, evolutionMethod: EVOLUTION_METHODS.FIRE_STONE },
    ARCANINE: { id: "059", name: "arcanine", type: "pokemon_type_legendary", heightI: " 602", heightM: " 189", weightI: " 341", weightM: "155 0", evolutionId: null, basic: false, evolutionMethod: null },
    POLIWAG: { id: "060", name: "poliwag", type: "pokemon_type_tadpole", heightI: " 111", heightM: " 060", weightI: "  27", weightM: " 12 4", evolutionId: "061", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    POLIWHIRL: { id: "061", name: "poliwhirl", type: "pokemon_type_tadpole", heightI: " 303", heightM: " 100", weightI: "  44", weightM: " 20 0", evolutionId: "062", basic: false, evolutionMethod: EVOLUTION_METHODS.WATER_STONE },
    POLIWRATH: { id: "062", name: "poliwrath", type: "pokemon_type_tadpole", heightI: " 403", heightM: " 130", weightI: " 119", weightM: " 54 0", evolutionId: null, basic: false, evolutionMethod: null },
    ABRA: { id: "063", name: "abra", type: "pokemon_type_psi", heightI: " 211", heightM: " 090", weightI: "  42", weightM: " 19 5", evolutionId: "064", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    KADABRA: { id: "064", name: "kadabra", type: "pokemon_type_psi", heightI: " 403", heightM: " 130", weightI: " 124", weightM: " 56 5", evolutionId: "065", basic: false, evolutionMethod: EVOLUTION_METHODS.LINK_CABLE },
    ALAKAZAM: { id: "065", name: "alakazam", type: "pokemon_type_psi", heightI: " 411", heightM: " 150", weightI: " 105", weightM: " 48 0", evolutionId: null, basic: false, evolutionMethod: null },
    MACHOP: { id: "066", name: "machop", type: "pokemon_type_superpower", heightI: " 207", heightM: " 080", weightI: "  42", weightM: " 19 5", evolutionId: "067", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    MACHOKE: { id: "067", name: "machoke", type: "pokemon_type_superpower", heightI: " 411", heightM: " 150", weightI: " 155", weightM: " 70 5", evolutionId: "068", basic: false, evolutionMethod: EVOLUTION_METHODS.LINK_CABLE },
    MACHAMP: { id: "068", name: "machamp", type: "pokemon_type_superpower", heightI: " 502", heightM: " 160", weightI: " 286", weightM: "130 0", evolutionId: null, basic: false, evolutionMethod: null },
    BELLSPROUT: { id: "069", name: "bellsprout", type: "pokemon_type_flower", heightI: " 203", heightM: " 070", weightI: "   8", weightM: "  4 0", evolutionId: "070", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    WEEPINBELL: { id: "070", name: "weepinbell", type: "pokemon_type_flycatcher", heightI: " 303", heightM: " 100", weightI: "  14", weightM: "  6 4", evolutionId: "071", basic: false, evolutionMethod: EVOLUTION_METHODS.LEAF_STONE },
    VICTREEBEL: { id: "071", name: "victreebel", type: "pokemon_type_flycatcher", heightI: " 506", heightM: " 170", weightI: "  34", weightM: " 15 5", evolutionId: null, basic: false, evolutionMethod: null },
    TENTACOOL: { id: "072", name: "tentacool", type: "pokemon_type_jellyfish", heightI: " 211", heightM: " 090", weightI: " 100", weightM: " 45 5", evolutionId: "073", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    TENTACRUEL: { id: "073", name: "tentacruel", type: "pokemon_type_jellyfish", heightI: " 502", heightM: " 160", weightI: " 121", weightM: " 55 0", evolutionId: null, basic: false, evolutionMethod: null },
    GEODUDE: { id: "074", name: "geodude", type: "pokemon_type_rock", heightI: " 103", heightM: " 040", weightI: "  44", weightM: " 20 0", evolutionId: "075", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GRAVELER: { id: "075", name: "graveler", type: "pokemon_type_rock", heightI: " 303", heightM: " 100", weightI: " 231", weightM: "105 0", evolutionId: "076", basic: false, evolutionMethod: EVOLUTION_METHODS.LINK_CABLE },
    GOLEM: { id: "076", name: "golem", type: "pokemon_type_megaton", heightI: " 407", heightM: " 139", weightI: " 661", weightM: "300 0", evolutionId: null, basic: false, evolutionMethod: null },
    PONYTA: { id: "077", name: "ponyta", type: "pokemon_type_fire_horse", heightI: " 303", heightM: " 100", weightI: "  66", weightM: " 30 0", evolutionId: "078", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    RAPIDASH: { id: "078", name: "rapidash", type: "pokemon_type_fire_horse", heightI: " 506", heightM: " 170", weightI: " 209", weightM: " 95 0", evolutionId: null, basic: false, evolutionMethod: null },
    SLOWPOKE: { id: "079", name: "slowpoke", type: "pokemon_type_dopey", heightI: " 311", heightM: " 119", weightI: "  79", weightM: " 36 0", evolutionId: "080", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    SLOWBRO: { id: "080", name: "slowbro", type: "pokemon_type_hermit_crab", heightI: " 502", heightM: " 160", weightI: " 173", weightM: " 78 5", evolutionId: null, basic: false, evolutionMethod: null },
    MAGNEMITE: { id: "081", name: "magnemite", type: "pokemon_type_magnet", heightI: " 011", heightM: " 030", weightI: "  13", weightM: "  6 0", evolutionId: "082", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    MAGNETON: { id: "082", name: "magneton", type: "pokemon_type_magnet", heightI: " 303", heightM: " 100", weightI: " 132", weightM: " 60 0", evolutionId: null, basic: false, evolutionMethod: null },
    FARFETCHD: { id: "083", name: "farfetchd", type: "pokemon_type_wild_duck", heightI: " 207", heightM: " 080", weightI: "  33", weightM: " 15 0", evolutionId: null, basic: true, evolutionMethod: null },
    DODUO: { id: "084", name: "doduo", type: "pokemon_type_twin_bird", heightI: " 407", heightM: " 139", weightI: "  86", weightM: " 39 2", evolutionId: "085", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DODRIO: { id: "085", name: "dodrio", type: "pokemon_type_triple_bird", heightI: " 510", heightM: " 180", weightI: " 187", weightM: " 85 2", evolutionId: null, basic: false, evolutionMethod: null },
    SEEL: { id: "086", name: "seel", type: "pokemon_type_sea_lion", heightI: " 307", heightM: " 110", weightI: " 198", weightM: " 90 0", evolutionId: "087", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DEWGONG: { id: "087", name: "dewgong", type: "pokemon_type_sea_lion", heightI: " 506", heightM: " 170", weightI: " 264", weightM: "120 0", evolutionId: null, basic: false, evolutionMethod: null },
    GRIMER: { id: "088", name: "grimer", type: "pokemon_type_sludge", heightI: " 211", heightM: " 090", weightI: "  66", weightM: " 30 0", evolutionId: "089", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    MUK: { id: "089", name: "muk", type: "pokemon_type_sludge", heightI: " 311", heightM: " 119", weightI: "  66", weightM: " 30 0", evolutionId: null, basic: false, evolutionMethod: null },
    SHELLDER: { id: "090", name: "shellder", type: "pokemon_type_bivalve", heightI: " 011", heightM: " 030", weightI: "   8", weightM: "  4 0", evolutionId: "091", basic: true, evolutionMethod: EVOLUTION_METHODS.WATER_STONE },
    CLOYSTER: { id: "091", name: "cloyster", type: "pokemon_type_bivalve", heightI: " 411", heightM: " 150", weightI: " 292", weightM: "132 5", evolutionId: null, basic: false, evolutionMethod: null },
    GASTLY: { id: "092", name: "gastly", type: "pokemon_type_gas", heightI: " 403", heightM: " 130", weightI: "   0", weightM: "  0 1", evolutionId: "093", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    HAUNTER: { id: "093", name: "haunter", type: "pokemon_type_gas", heightI: " 502", heightM: " 160", weightI: "   0", weightM: "  0 1", evolutionId: "094", basic: false, evolutionMethod: EVOLUTION_METHODS.LINK_CABLE },
    GENGAR: { id: "094", name: "gengar", type: "pokemon_type_shadow", heightI: " 411", heightM: " 150", weightI: "  89", weightM: " 40 5", evolutionId: null, basic: false, evolutionMethod: null },
    ONIX: { id: "095", name: "onix", type: "pokemon_type_rock_snake", heightI: "2810", heightM: " 880", weightI: " 462", weightM: "210 0", evolutionId: null, basic: true, evolutionMethod: null },
    DROWZEE: { id: "096", name: "drowzee", type: "pokemon_type_hypnosis", heightI: " 303", heightM: " 100", weightI: "  71", weightM: " 32 3", evolutionId: "097", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    HYPNO: { id: "097", name: "hypno", type: "pokemon_type_hypnosis", heightI: " 502", heightM: " 160", weightI: " 166", weightM: " 75 5", evolutionId: null, basic: false, evolutionMethod: null },
    KRABBY: { id: "098", name: "krabby", type: "pokemon_type_river_crab", heightI: " 103", heightM: " 040", weightI: "  14", weightM: "  6 5", evolutionId: "099", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    KINGLER: { id: "099", name: "kingler", type: "pokemon_type_pincer", heightI: " 403", heightM: " 130", weightI: " 132", weightM: " 60 0", evolutionId: null, basic: false, evolutionMethod: null },
    VOLTORB: { id: "100", name: "voltorb", type: "pokemon_type_ball", heightI: " 107", heightM: " 050", weightI: "  22", weightM: " 10 4", evolutionId: "101", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    ELECTRODE: { id: "101", name: "electrode", type: "pokemon_type_ball", heightI: " 311", heightM: " 119", weightI: " 146", weightM: " 66 5", evolutionId: null, basic: false, evolutionMethod: null },
    EXEGGCUTE: { id: "102", name: "exeggcute", type: "pokemon_type_egg", heightI: " 103", heightM: " 040", weightI: "   5", weightM: "  2 5", evolutionId: "103", basic: true, evolutionMethod: EVOLUTION_METHODS.LEAF_STONE },
    EXEGGUTOR: { id: "103", name: "exeggutor", type: "pokemon_type_coconut", heightI: " 606", heightM: " 200", weightI: " 264", weightM: "120 0", evolutionId: null, basic: false, evolutionMethod: null },
    CUBONE: { id: "104", name: "cubone", type: "pokemon_type_lonely", heightI: " 103", heightM: " 040", weightI: "  14", weightM: "  6 5", evolutionId: "105", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    MAROWAK: { id: "105", name: "marowak", type: "pokemon_type_bone_keeper", heightI: " 303", heightM: " 100", weightI: "  99", weightM: " 45 0", evolutionId: null, basic: false, evolutionMethod: null },
    HITMONLEE: { id: "106", name: "hitmonlee", type: "pokemon_type_kicking", heightI: " 411", heightM: " 150", weightI: " 109", weightM: " 49 7", evolutionId: null, basic: true, evolutionMethod: null },
    HITMONCHAN: { id: "107", name: "hitmonchan", type: "pokemon_type_punching", heightI: " 407", heightM: " 139", weightI: " 110", weightM: " 50 2", evolutionId: null, basic: true, evolutionMethod: null },
    LICKITUNG: { id: "108", name: "lickitung", type: "pokemon_type_licking", heightI: " 311", heightM: " 119", weightI: " 144", weightM: " 65 5", evolutionId: null, basic: true, evolutionMethod: null },
    KOFFING: { id: "109", name: "koffing", type: "pokemon_type_poison_gas", heightI: " 111", heightM: " 060", weightI: "   2", weightM: "  1 0", evolutionId: "110", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    WEEZING: { id: "110", name: "weezing", type: "pokemon_type_poison_gas", heightI: " 311", heightM: " 119", weightI: "  20", weightM: "  9 5", evolutionId: null, basic: false, evolutionMethod: null },
    RHYHORN: { id: "111", name: "rhyhorn", type: "pokemon_type_spikes", heightI: " 303", heightM: " 100", weightI: " 253", weightM: "115 0", evolutionId: "112", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    RHYDON: { id: "112", name: "rhydon", type: "pokemon_type_drill", heightI: " 602", heightM: " 189", weightI: " 264", weightM: "120 0", evolutionId: null, basic: false, evolutionMethod: null },
    CHANSEY: { id: "113", name: "chansey", type: "pokemon_type_egg", heightI: " 307", heightM: " 110", weightI: "  76", weightM: " 34 6", evolutionId: null, basic: true, evolutionMethod: null },
    TANGELA: { id: "114", name: "tangela", type: "pokemon_type_vine", heightI: " 303", heightM: " 100", weightI: "  77", weightM: " 35 0", evolutionId: null, basic: true, evolutionMethod: null },
    KANGASKHAN: { id: "115", name: "kangaskhan", type: "pokemon_type_parent", heightI: " 702", heightM: " 220", weightI: " 176", weightM: " 80 0", evolutionId: null, basic: true, evolutionMethod: null },
    HORSEA: { id: "116", name: "horsea", type: "pokemon_type_dragon", heightI: " 103", heightM: " 040", weightI: "  17", weightM: "  8 0", evolutionId: "117", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    SEADRA: { id: "117", name: "seadra", type: "pokemon_type_dragon", heightI: " 311", heightM: " 119", weightI: "  55", weightM: " 25 0", evolutionId: null, basic: false, evolutionMethod: null },
    GOLDEEN: { id: "118", name: "goldeen", type: "pokemon_type_goldfish", heightI: " 111", heightM: " 060", weightI: "  33", weightM: " 15 0", evolutionId: "119", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    SEAKING: { id: "119", name: "seaking", type: "pokemon_type_goldfish", heightI: " 403", heightM: " 130", weightI: "  85", weightM: " 39 0", evolutionId: null, basic: false, evolutionMethod: null },
    STARYU: { id: "120", name: "staryu", type: "pokemon_type_star_shape", heightI: " 207", heightM: " 080", weightI: "  76", weightM: " 34 5", evolutionId: "121", basic: true, evolutionMethod: EVOLUTION_METHODS.WATER_STONE },
    STARMIE: { id: "121", name: "starmie", type: "pokemon_type_mysterious", heightI: " 307", heightM: " 110", weightI: " 176", weightM: " 80 0", evolutionId: null, basic: false, evolutionMethod: null },
    MR_MIME: { id: "122", name: "mr_mime", type: "pokemon_type_barrier", heightI: " 403", heightM: " 130", weightI: " 120", weightM: " 54 5", evolutionId: null, basic: true, evolutionMethod: null },
    SCYTHER: { id: "123", name: "scyther", type: "pokemon_type_mantis", heightI: " 411", heightM: " 150", weightI: " 123", weightM: " 56 0", evolutionId: null, basic: true, evolutionMethod: null },
    JYNX: { id: "124", name: "jynx", type: "pokemon_type_human_shape", heightI: " 407", heightM: " 139", weightI: "  89", weightM: " 40 6", evolutionId: null, basic: true, evolutionMethod: null },
    ELECTABUZZ: { id: "125", name: "electabuzz", type: "pokemon_type_electric", heightI: " 307", heightM: " 110", weightI: "  66", weightM: " 30 0", evolutionId: null, basic: true, evolutionMethod: null },
    MAGMAR: { id: "126", name: "magmar", type: "pokemon_type_spitfire", heightI: " 403", heightM: " 130", weightI: "  98", weightM: " 44 5", evolutionId: null, basic: true, evolutionMethod: null },
    PINSIR: { id: "127", name: "pinsir", type: "pokemon_type_stag_beetle", heightI: " 411", heightM: " 150", weightI: " 121", weightM: " 55 0", evolutionId: null, basic: true, evolutionMethod: null },
    TAUROS: { id: "128", name: "tauros", type: "pokemon_type_wild_bull", heightI: " 407", heightM: " 139", weightI: " 194", weightM: " 88 4", evolutionId: null, basic: true, evolutionMethod: null },
    MAGIKARP: { id: "129", name: "magikarp", type: "pokemon_type_fish", heightI: " 211", heightM: " 090", weightI: "  22", weightM: " 10 0", evolutionId: "130", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    GYARADOS: { id: "130", name: "gyarados", type: "pokemon_type_atrocious", heightI: "2103", heightM: " 650", weightI: " 518", weightM: "235 0", evolutionId: null, basic: false, evolutionMethod: null },
    LAPRAS: { id: "131", name: "lapras", type: "pokemon_type_transport", heightI: " 802", heightM: " 250", weightI: " 485", weightM: "220 0", evolutionId: null, basic: true, evolutionMethod: null },
    DITTO: { id: "132", name: "ditto", type: "pokemon_type_transform", heightI: " 011", heightM: " 030", weightI: "   8", weightM: "  4 0", evolutionId: null, basic: true, evolutionMethod: null },
    EEVEE: { id: "133", name: "eevee", type: "pokemon_type_evolution", heightI: " 011", heightM: " 030", weightI: "  14", weightM: "  6 5", evolutionId: null, basic: true, evolutionMethod: null }, // TODO eevee evolution
    VAPOREON: { id: "134", name: "vaporeon", type: "pokemon_type_bubble_jet", heightI: " 303", heightM: " 100", weightI: "  63", weightM: " 29 0", evolutionId: null, basic: false, evolutionMethod: null },
    JOLTEON: { id: "135", name: "jolteon", type: "pokemon_type_lightning", heightI: " 207", heightM: " 080", weightI: "  54", weightM: " 24 5", evolutionId: null, basic: false, evolutionMethod: null },
    FLAREON: { id: "136", name: "flareon", type: "pokemon_type_flame", heightI: " 211", heightM: " 090", weightI: "  55", weightM: " 25 0", evolutionId: null, basic: false, evolutionMethod: null },
    PORYGON: { id: "137", name: "porygon", type: "pokemon_type_virtual", heightI: " 207", heightM: " 080", weightI: "  80", weightM: " 36 5", evolutionId: null, basic: true, evolutionMethod: null },
    OMANYTE: { id: "138", name: "omanyte", type: "pokemon_type_spiral", heightI: " 103", heightM: " 040", weightI: "  16", weightM: "  7 5", evolutionId: "139", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    OMASTAR: { id: "139", name: "omastar", type: "pokemon_type_spiral", heightI: " 303", heightM: " 100", weightI: "  77", weightM: " 35 0", evolutionId: null, basic: false, evolutionMethod: null },
    KABUTO: { id: "140", name: "kabuto", type: "pokemon_type_shellfish", heightI: " 107", heightM: " 050", weightI: "  25", weightM: " 11 5", evolutionId: "141", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    KABUTOPS: { id: "141", name: "kabutops", type: "pokemon_type_shellfish", heightI: " 403", heightM: " 130", weightI: "  89", weightM: " 40 5", evolutionId: null, basic: false, evolutionMethod: null },
    AERODACTYL: { id: "142", name: "aerodactyl", type: "pokemon_type_fossil", heightI: " 510", heightM: " 180", weightI: " 130", weightM: " 59 0", evolutionId: null, basic: true, evolutionMethod: null },
    SNORLAX: { id: "143", name: "snorlax", type: "pokemon_type_sleeping", heightI: " 610", heightM: " 210", weightI: "1014", weightM: "460 0", evolutionId: null, basic: true, evolutionMethod: null },
    ARTICUNO: { id: "144", name: "articuno", type: "pokemon_type_freeze", heightI: " 506", heightM: " 170", weightI: " 122", weightM: " 55 3", evolutionId: null, basic: true, evolutionMethod: null },
    ZAPDOS: { id: "145", name: "zapdos", type: "pokemon_type_electric", heightI: " 502", heightM: " 160", weightI: " 115", weightM: " 52 6", evolutionId: null, basic: true, evolutionMethod: null },
    MOLTRES: { id: "146", name: "moltres", type: "pokemon_type_flame", heightI: " 606", heightM: " 200", weightI: " 132", weightM: " 60 0", evolutionId: null, basic: true, evolutionMethod: null },
    DRATINI: { id: "147", name: "dratini", type: "pokemon_type_dragon", heightI: " 510", heightM: " 180", weightI: "   7", weightM: "  3 2", evolutionId: "148", basic: true, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DRAGONAIR: { id: "148", name: "dragonair", type: "pokemon_type_dragon", heightI: "1301", heightM: " 400", weightI: "  36", weightM: " 16 5", evolutionId: "149", basic: false, evolutionMethod: EVOLUTION_METHODS.EXPERIENCE },
    DRAGONITE: { id: "149", name: "dragonite", type: "pokemon_type_dragon", heightI: " 702", heightM: " 220", weightI: " 462", weightM: "210 0", evolutionId: null, basic: false, evolutionMethod: null },
    MEWTWO: { id: "150", name: "mewtwo", type: "pokemon_type_genetic", heightI: " 606", heightM: " 200", weightI: " 268", weightM: "122 0", evolutionId: null, basic: true, evolutionMethod: null },
    MEW: { id: "151", name: "mew", type: "pokemon_type_new_species", heightI: " 103", heightM: " 040", weightI: "   8", weightM: "  4 0", evolutionId: null, basic: true, evolutionMethod: null }
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