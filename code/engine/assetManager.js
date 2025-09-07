const DEFAULT_ANIMATION_DELAY = 12; //Default delay between frames of animation

/*
  AssetManager for images / spritesheets / animations / backgrounds.
  - load images in preload
  - slice sheets once and cache frames
  - register animation templates (key -> frames + delay)
  - register backgrounds and return cached images
  - provide getAnimatione(key) to obtain independent p5.play.Animation instances
*/

class AssetManager {
  constructor() {
    this.imageCache = new Map();    // path -> p5.Image
    this.animTemplates = new Map(); // animKey -> { frames: [p5.Image], delay }
    this.backgrounds = new Map();   // bgKey -> p5.Image
  }

  // Load and cache a PNG image (path without extension)
  getImage(path) {
    if (this.imageCache.has(path)) return this.imageCache.get(path);
    const img = loadImage(path + '.png');
    this.imageCache.set(path, img);
    return img;
  }

  // Background registration API
  registerBackground(key, path) {
    if (this.backgrounds.has(key)) return;
    const img = this.getImage(path);
    this.backgrounds.set(key, img);
  }
  getBackground(key) {
    return this.backgrounds.get(key) || null;
  }


  // Register an animation template from a registered sheet.
  // animKey: identifier to request with getAnimatione(animKey)
  // sheetPath: path used when calling registerSpriteSheet
  registerAnimationTemplate(animKey, sheetPath, frameW, frameH, sheetFrameCount, delay = DEFAULT_ANIMATION_DELAY) {
    if (this.animTemplates.has(animKey)) return;

    let sheet = this.getImage(sheetPath);
    let animation = loadAnimation(sheet, { frameSize: [frameW, frameH], frameCount: sheetFrameCount });
    animation.frameDelay = delay;
    this.animTemplates.set(animKey, animation);
  }

  // Return the p5.play.Animation.
  getAnimation(animKey) {
    if (this.animTemplates.has(animKey)) {
      return this.animTemplates.get(animKey);
    }

    throw new Error(`Animation not registered and no fallback provided: ${animKey}`);
  }
}

const Asset = new AssetManager();


// --- Register all backgrounds used across the project ---
function preLoadBackgrounds() {
  // register backgrounds
  Asset.registerBackground('bonusGhostBackgroundOpen', 'assets/img/bonus-ghost/bonus_ghost_background_open');
  Asset.registerBackground('bonusGhostBackgroundClosed', 'assets/img/bonus-ghost/bonus_ghost_background');
  Asset.registerBackground('bonusGhostBackgroundP2Open', 'assets/img/bonus-ghost/bonus_ghost_background_open_p2');
  Asset.registerBackground('bonusGhostBackgroundP2Closed', 'assets/img/bonus-ghost/bonus_ghost_background_p2');

  Asset.registerBackground('bonusMoleBackgroundOpen', 'assets/img/bonus-mole/bonus_mole_background_open');
  Asset.registerBackground('bonusMoleBackgroundClosed', 'assets/img/bonus-mole/bonus_mole_background');

  Asset.registerBackground('bonusCatBackgroundOpen', 'assets/img/bonus-cat/bonus_cat_background_open');
  Asset.registerBackground('bonusCatBackgroundClosed', 'assets/img/bonus-cat/bonus_cat_background');

  Asset.registerBackground('bonusSealBackgroundOpen', 'assets/img/bonus-seal/bonus_seal_background_open');
  Asset.registerBackground('bonusSealBackgroundClosed', 'assets/img/bonus-seal/bonus_seal_background');

  Asset.registerBackground('bonusCloneBackgroundOpen', 'assets/img/bonus-clone/bonus_clone_background_open');
  Asset.registerBackground('bonusCloneBackgroundClosed', 'assets/img/bonus-clone/bonus_clone_background');

  Asset.registerBackground('bonusStageFrame', 'assets/img/bonus_state_frame');
}


// --- Register all sprite sheets and templates used across the project ---
function preloadAnimations() {

  // Register animation templates
  Asset.registerAnimationTemplate('animPokeBall', 'assets/img/ball/poke_ball', 32, 32, 8);

  Asset.registerAnimationTemplate('animLeftFlipperUp', 'assets/img/left_flipper_up', 48, 48, 1);
  Asset.registerAnimationTemplate('animLeftFlipperMiddle', 'assets/img/left_flipper_middle', 48, 48, 1);
  Asset.registerAnimationTemplate('animLeftFlipperDown', 'assets/img/left_flipper_down', 48, 48, 1);
  Asset.registerAnimationTemplate('animLeftFlipperDownDisabled', 'assets/img/left_flipper_down_disabled', 48, 48, 1);
  Asset.registerAnimationTemplate('animRightFlipperUp', 'assets/img/right_flipper_up', 48, 48, 1);
  Asset.registerAnimationTemplate('animRightFlipperMiddle', 'assets/img/right_flipper_middle', 48, 48, 1);
  Asset.registerAnimationTemplate('animRightFlipperDown', 'assets/img/right_flipper_down', 48, 48, 1);
  Asset.registerAnimationTemplate('animRightFlipperDownDisabled', 'assets/img/right_flipper_down_disabled', 48, 48, 1);

  for (let i = 0; i < 10; i++) {
    Asset.registerAnimationTemplate('animTimer' + i, 'assets/img/timer/timer_' + i, 16, 32, 1);
  }
  Asset.registerAnimationTemplate('animTimerColon', 'assets/img/timer/timer_colon', 16, 32, 1);

  Asset.registerAnimationTemplate('animGastly', 'assets/img/bonus-ghost/gastly', 64, 64, 1);
  Asset.registerAnimationTemplate('animGastlyHurt', 'assets/img/bonus-ghost/gastly_hurt', 64, 64, 1);
  Asset.registerAnimationTemplate('animHaunter', 'assets/img/bonus-ghost/haunter', 96, 80, 4);
  Asset.registerAnimationTemplate('animHaunterHurt', 'assets/img/bonus-ghost/haunter_hurt', 96, 80, 1);
  Asset.registerAnimationTemplate('animGengar', 'assets/img/bonus-ghost/gengar', 96, 128, 4);
  Asset.registerAnimationTemplate('animGengarHurt', 'assets/img/bonus-ghost/gengar_hurt', 112, 128, 1);
  Asset.registerAnimationTemplate('animGengarWalk', 'assets/img/bonus-ghost/gengar_walk', 96, 128, 4);

  Asset.registerAnimationTemplate('animDiglett', 'assets/img/bonus-mole/diglett', 32, 32, 4, 8);
  Asset.registerAnimationTemplate('animDiglettHurt', 'assets/img/bonus-mole/diglett_hurt', 32, 32, 1);
  Asset.registerAnimationTemplate('animDiglettDown', 'assets/img/bonus-mole/diglett_down', 32, 32, 1);
  Asset.registerAnimationTemplate('animDugtrio1', 'assets/img/bonus-mole/dugtrio1', 64, 64, 3);
  Asset.registerAnimationTemplate('animDugtrio1Hurt', 'assets/img/bonus-mole/dugtrio1_hurt', 64, 64, 1);
  Asset.registerAnimationTemplate('animDugtrio2', 'assets/img/bonus-mole/dugtrio2', 64, 64, 3);
  Asset.registerAnimationTemplate('animDugtrio2Hurt', 'assets/img/bonus-mole/dugtrio2_hurt', 64, 64, 1);
  Asset.registerAnimationTemplate('animDugtrio3', 'assets/img/bonus-mole/dugtrio3', 64, 64, 2);
  Asset.registerAnimationTemplate('animDugtrio3Hurt', 'assets/img/bonus-mole/dugtrio3_hurt', 64, 64, 1);
  Asset.registerAnimationTemplate('animDugtrio4', 'assets/img/bonus-mole/dugtrio4', 64, 64, 1);
  Asset.registerAnimationTemplate('animDugtrio4Hurt', 'assets/img/bonus-mole/dugtrio4_hurt', 64, 64, 1);

  Asset.registerAnimationTemplate('animMeowthWalk', 'assets/img/bonus-cat/meowth_walk', 64, 64, 3);
  Asset.registerAnimationTemplate('animMeowthHurt', 'assets/img/bonus-cat/meowth_hurt', 64, 64, 1);
  Asset.registerAnimationTemplate('animMeowthSmug', 'assets/img/bonus-cat/meowth_smug', 64, 64, 2);
  Asset.registerAnimationTemplate('animCoinIdle', 'assets/img/bonus-cat/coin', 32, 32, 2);
  Asset.registerAnimationTemplate('animCoinDisappear', 'assets/img/bonus-cat/coin_disappear', 32, 32, 5);
  Asset.registerAnimationTemplate('animFlyingCoin1', 'assets/img/bonus-cat/flying_coin_1', 16, 32, 1);
  Asset.registerAnimationTemplate('animFlyingCoin2', 'assets/img/bonus-cat/flying_coin_2', 32, 32, 1);
  Asset.registerAnimationTemplate('animCoinCounter', 'assets/img/bonus-cat/coin_counter', 16, 16, 1);
  Asset.registerAnimationTemplate('animCoinCounterShine', 'assets/img/bonus-cat/coin_counter_shine', 16, 16, 2);
  Asset.registerAnimationTemplate('animCoinMultiplier2', 'assets/img/bonus-cat/coin_multiplier_2', 32, 16, 1);
  Asset.registerAnimationTemplate('animCoinMultiplier3', 'assets/img/bonus-cat/coin_multiplier_3', 32, 16, 1);
  Asset.registerAnimationTemplate('animCoinMultiplier4', 'assets/img/bonus-cat/coin_multiplier_4', 32, 16, 1);
  Asset.registerAnimationTemplate('animCoinMultiplier5', 'assets/img/bonus-cat/coin_multiplier_5', 32, 16, 1);
  Asset.registerAnimationTemplate('animCoinMultiplier6', 'assets/img/bonus-cat/coin_multiplier_6', 32, 16, 1);

  Asset.registerAnimationTemplate('animSealSwim', 'assets/img/bonus-seal/seel_swim', 64, 32, 3);
  Asset.registerAnimationTemplate('animSealTurn', 'assets/img/bonus-seal/seel_turn', 64, 32, 5, 8);
  Asset.registerAnimationTemplate('animSealSurface', 'assets/img/bonus-seal/seel_surface', 64, 32, 5, 8);
  Asset.registerAnimationTemplate('animSealIdle', 'assets/img/bonus-seal/seel_idle', 64, 48, 4);
  Asset.registerAnimationTemplate('animSealDive', 'assets/img/bonus-seal/seel_dive', 64, 48, 1);
  Asset.registerAnimationTemplate('animSealHurt', 'assets/img/bonus-seal/seel_hurt', 64, 48, 1);
  Asset.registerAnimationTemplate('animPearl', 'assets/img/bonus-seal/pearl', 16, 16, 1);
  Asset.registerAnimationTemplate('animShiningPearl', 'assets/img/bonus-seal/shining_pearl', 16, 16, 2);
  Asset.registerAnimationTemplate('animPearlMultiplier2', 'assets/img/bonus-seal/pearl_multiplier_2', 32, 16, 1);
  Asset.registerAnimationTemplate('animPearlMultiplier4', 'assets/img/bonus-seal/pearl_multiplier_4', 32, 16, 1);
  Asset.registerAnimationTemplate('animPearlMultiplier8', 'assets/img/bonus-seal/pearl_multiplier_8', 32, 16, 1);
  Asset.registerAnimationTemplate('animPearlMultiplier16', 'assets/img/bonus-seal/pearl_multiplier_16', 48, 16, 1);
  Asset.registerAnimationTemplate('animPearlMultiplier32', 'assets/img/bonus-seal/pearl_multiplier_32', 48, 16, 1);
  Asset.registerAnimationTemplate('animPearlMultiplier64', 'assets/img/bonus-seal/pearl_multiplier_64', 48, 16, 1);
  Asset.registerAnimationTemplate('animPearlMultiplier128', 'assets/img/bonus-seal/pearl_multiplier_128', 64, 16, 1);
  Asset.registerAnimationTemplate('animPearlMultiplier256', 'assets/img/bonus-seal/pearl_multiplier_256', 64, 16, 1);

  Asset.registerAnimationTemplate('animMewtwoIdle', 'assets/img/bonus-clone/mewtwo', 64, 64, 3, 16);
  Asset.registerAnimationTemplate('animMewtwoHurt', 'assets/img/bonus-clone/mewtwo_hurt', 64, 64, 1, 16);
  Asset.registerAnimationTemplate('animMewtwoPsychic1', 'assets/img/bonus-clone/mewtwo_psychic_1', 64, 64, 8, 4);
  Asset.registerAnimationTemplate('animMewtwoPsychic2', 'assets/img/bonus-clone/mewtwo_psychic_2', 64, 64, 1, 16);
  Asset.registerAnimationTemplate('animShieldCreate', 'assets/img/bonus-clone/shield_create', 32, 32, 7, 6);
  Asset.registerAnimationTemplate('animShieldDestroy', 'assets/img/bonus-clone/shield_destroy', 32, 32, 7, 6);
  Asset.registerAnimationTemplate('animShield', 'assets/img/bonus-clone/shield', 32, 32, 4);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  // stage text templates
  for (const ch of letters) {
    Asset.registerAnimationTemplate('stageText' + ch, `assets/img/stage-text/${ch.toLowerCase()}`, 16, 16, 1);
  }

  Asset.registerAnimationTemplate('stageTextDot', 'assets/img/stage-text/dot', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextColon', 'assets/img/stage-text/colon', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextExcl', 'assets/img/stage-text/excl', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextSpace', 'assets/img/stage-text/space', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextBall', 'assets/img/stage-text/pokeball', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextCross', 'assets/img/stage-text/cross', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextThunder', 'assets/img/stage-text/thunder', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextUp', 'assets/img/stage-text/up', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextDown', 'assets/img/stage-text/down', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextRight', 'assets/img/stage-text/right', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextStar', 'assets/img/stage-text/star', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextPokemon', 'assets/img/stage-text/pokemon', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextCommaSeparator', 'assets/img/stage-text/comma_separator', 4, 16, 1);
  Asset.registerAnimationTemplate('stageTextDotSeparator', 'assets/img/stage-text/dot_separator', 16, 16, 1);

}



