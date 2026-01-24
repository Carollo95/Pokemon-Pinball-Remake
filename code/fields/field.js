const FIELD_BONUS = {
    MOLE: "mole",
    GHOST: "ghost",
    CAT: "cat",
    SEAL: "seal",
    CLONE: "clone",
}

const TRAVEL_DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
    CAVE: 'cave'
}

const FIELD_CAPTURE_TIMER_MS = 121000;
const FIELD_EVOLUTION_TIMER_MS = 121000;
const FIELD_TRAVEL_TIMER_MS = 31000;

const FIELD_STATE = {
    PLAYING: "playing",
    GAME_START: "game_start",
    BALL_LOST: "ball_lost",
    GAME_OVER: "game_over",
    NEW_BALL_WAITING: "new_ball_waiting",
    CAPTURE: "capture",
    TRAVEL_LEFT: "travel_left",
    TRAVEL_RIGHT: "travel_right",
    TRAVEL_CAVE: "travel_cave",
    EVOLUTION_CHOOSE_SCREEN: "evolution_choose_screen",
    EVOLUTION: "evolution"
}

class Field extends Stage {
    constructor(status) {
        super(status);
    }


    draw() {
        super.draw();
    }

}