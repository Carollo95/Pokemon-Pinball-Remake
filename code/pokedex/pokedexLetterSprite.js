class PokedexLetterSprite {
    static CHAR_MAP = {
        // Uppercase A-Z (0-25)
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
        'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
        'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25,
        // Lowercase a-z (26-51)
        'a': 26, 'b': 27, 'c': 28, 'd': 29, 'e': 30, 'f': 31, 'g': 32, 'h': 33, 'i': 34, 'j': 35,
        'k': 36, 'l': 37, 'm': 38, 'n': 39, 'o': 40, 'p': 41, 'q': 42, 'r': 43, 's': 44, 't': 45,
        'u': 46, 'v': 47, 'w': 48, 'x': 49, 'y': 50, 'z': 51,
        // Numbers 0-9 (52-61)
        '0': 52, '1': 53, '2': 54, '3': 55, '4': 56, '5': 57, '6': 58, '7': 59, '8': 60, '9': 61,
        // Special characters
        ' ': 62,
        '♀': 63,
        '♂': 64,
        '-': 65,
        ',': 66,
        '.': 67,
        'é': 68,
        "'": 69
    };

    constructor(x, y, value = 0, invert = false) {
        this.sprite = new Sprite(x, y, 16, 16, "static");
        this.sprite.debug = DEBUG;
        this.sprite.layer = BACK;
        this.sprite.addAnimation("letter", Asset.getAnimation(invert ? "pokedexLetterInv" : "pokedexLetter"));
        this.sprite.ani.playing = false;
        this.sprite.ani.frame = this.getValue(value);
    }

    changeValue(value) {
        this.sprite.ani.frame = this.getValue(value);
    }

    getValue(character) {
        return PokedexLetterSprite.CHAR_MAP[character] ?? 62; // Default to space (62) if not found
    }

}