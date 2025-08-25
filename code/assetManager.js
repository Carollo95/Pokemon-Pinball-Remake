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
    this.sheetMeta = new Map();     // sheetKey -> { path, frameW, frameH, count }
    this.sheetFrames = new Map();   // sheetKey -> [p5.Image ...]
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

  // Register a sprite sheet.
  registerSpriteSheet(sheetKey, path, frameW, frameH, count) {
    if (this.sheetMeta.has(sheetKey)) return;
    this.sheetMeta.set(sheetKey, { path, frameW, frameH, count });
    // ensure image is queued in preload
    this.getImage(path);
  }

  // Internal: compute unique key for sheet usage
  _sheetLookupKey(path, frameW, frameH, count) {
    return `${path}|${frameW}x${frameH}|${count}`;
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

  Asset.registerBackground('bonusStageFrame', 'assets/img/bonus_state_frame');
}


// --- Register all sprite sheets and templates used across the project ---
function preloadAnimations() {
  // sprite sheet registrations (ensure images queued)
  Asset.registerSpriteSheet('animLeftFlipperUp', 'assets/img/left_flipper_up', 48, 48, 1);
  Asset.registerSpriteSheet('animLeftFlipperMiddle', 'assets/img/left_flipper_middle', 48, 48, 1);
  Asset.registerSpriteSheet('animLeftFlipperDown', 'assets/img/left_flipper_down', 48, 48, 1);
  Asset.registerSpriteSheet('animLeftFlipperDownDisabled', 'assets/img/left_flipper_down_disabled', 48, 48, 1);
  Asset.registerSpriteSheet('animRightFlipperUp', 'assets/img/right_flipper_up', 48, 48, 1);
  Asset.registerSpriteSheet('animRightFlipperMiddle', 'assets/img/right_flipper_middle', 48, 48, 1);
  Asset.registerSpriteSheet('animRightFlipperDown', 'assets/img/right_flipper_down', 48, 48, 1);
  Asset.registerSpriteSheet('animRightFlipperDownDisabled', 'assets/img/right_flipper_down_disabled', 48, 48, 1);

  for (let i = 0; i < 10; i++) {
    Asset.registerSpriteSheet('animTimer' + i, 'assets/img/timer/timer_' + i, 32, 16, 1);
  }
  Asset.registerSpriteSheet('animTimerColon', 'assets/img/timer/timer_colon', 32, 16, 1);

  Asset.registerSpriteSheet('animGastly', 'assets/img/bonus-ghost/gastly', 64, 64, 1);
  Asset.registerSpriteSheet('animGastlyHurt', 'assets/img/bonus-ghost/gastly_hurt', 64, 64, 1);
  Asset.registerSpriteSheet('animHaunter', 'assets/img/bonus-ghost/haunter', 96, 80, 4);
  Asset.registerSpriteSheet('animHaunterHurt', 'assets/img/bonus-ghost/haunter_hurt', 96, 80, 1);
  Asset.registerSpriteSheet('animGengar', 'assets/img/bonus-ghost/gengar', 96, 128, 4);
  Asset.registerSpriteSheet('animGengarHurt', 'assets/img/bonus-ghost/gengar_hurt', 112, 128, 1);
  Asset.registerSpriteSheet('animGengarWalk', 'assets/img/bonus-ghost/gengar_walk', 96, 128, 4);

  Asset.registerSpriteSheet('animDiglett', 'assets/img/bonus-mole/diglett', 32, 32, 4);
  Asset.registerSpriteSheet('animDiglettHurt', 'assets/img/bonus-mole/diglett_hurt', 32, 32, 1);
  Asset.registerSpriteSheet('animDiglettDown', 'assets/img/bonus-mole/diglett_down', 32, 32, 1);
  Asset.registerSpriteSheet('animDugtrio1', 'assets/img/bonus-mole/dugtrio1', 64, 64, 3);
  Asset.registerSpriteSheet('animDugtrio1Hurt', 'assets/img/bonus-mole/dugtrio1_hurt', 64, 64, 1);
  Asset.registerSpriteSheet('animDugtrio2', 'assets/img/bonus-mole/dugtrio2', 64, 64, 3);
  Asset.registerSpriteSheet('animDugtrio2Hurt', 'assets/img/bonus-mole/dugtrio2_hurt', 64, 64, 1);
  Asset.registerSpriteSheet('animDugtrio3', 'assets/img/bonus-mole/dugtrio3', 64, 64, 2);
  Asset.registerSpriteSheet('animDugtrio3Hurt', 'assets/img/bonus-mole/dugtrio3_hurt', 64, 64, 1);
  Asset.registerSpriteSheet('animDugtrio4', 'assets/img/bonus-mole/dugtrio4', 64, 64, 1);
  Asset.registerSpriteSheet('animDugtrio4Hurt', 'assets/img/bonus-mole/dugtrio4_hurt', 64, 64, 1);

  Asset.registerSpriteSheet('animMeowthWalk', 'assets/img/bonus-cat/meowth_walk', 64, 64, 3);
  Asset.registerSpriteSheet('animMeowthHurt', 'assets/img/bonus-cat/meowth_hurt', 64, 64, 1);
  Asset.registerSpriteSheet('animMeowthSmug', 'assets/img/bonus-cat/meowth_smug', 64, 64, 2);
  Asset.registerSpriteSheet('animCoinIdle', 'assets/img/bonus-cat/coin', 32, 32, 2);
  Asset.registerSpriteSheet('animCoinDisappear', 'assets/img/bonus-cat/coin_disappear', 32, 32, 5);
  Asset.registerSpriteSheet('animFlyingCoin1', 'assets/img/bonus-cat/flying_coin_1', 16, 32, 1);
  Asset.registerSpriteSheet('animFlyingCoin2', 'assets/img/bonus-cat/flying_coin_2', 32, 32, 1);
  Asset.registerSpriteSheet('animCoinCounter', 'assets/img/bonus-cat/coin_counter', 16, 16, 1);
  Asset.registerSpriteSheet('animCoinCounterShine', 'assets/img/bonus-cat/coin_counter_shine', 16, 16, 2);
  Asset.registerSpriteSheet('animCoinMultiplier2', 'assets/img/bonus-cat/coin_multiplier_2', 32, 16, 1);
  Asset.registerSpriteSheet('animCoinMultiplier3', 'assets/img/bonus-cat/coin_multiplier_3', 32, 16, 1);
  Asset.registerSpriteSheet('animCoinMultiplier4', 'assets/img/bonus-cat/coin_multiplier_4', 32, 16, 1);
  Asset.registerSpriteSheet('animCoinMultiplier5', 'assets/img/bonus-cat/coin_multiplier_5', 32, 16, 1);
  Asset.registerSpriteSheet('animCoinMultiplier6', 'assets/img/bonus-cat/coin_multiplier_6', 32, 16, 1);

  // stage text sheets
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const ch of letters) {
    Asset.registerSpriteSheet('stageText' + ch, `assets/img/stage-text/${ch.toLowerCase()}`, 16, 16, 1);
  }
  Asset.registerSpriteSheet('stageTextDot', 'assets/img/stage-text/dot', 16, 16, 1);
  Asset.registerSpriteSheet('stageTextColon', 'assets/img/stage-text/colon', 16, 16, 1);
  Asset.registerSpriteSheet('stageTextExcl', 'assets/img/stage-text/excl', 16, 16, 1);
  Asset.registerSpriteSheet('stageTextSpace', 'assets/img/stage-text/space', 16, 16, 1);

  // Register animation templates (use sheet keys as anim keys for simplicity)
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

  // stage text templates
  for (const ch of letters) {
    Asset.registerAnimationTemplate('stageText' + ch, `assets/img/stage-text/${ch.toLowerCase()}`, 16, 16, 1);
  }
  Asset.registerAnimationTemplate('stageTextDot', 'assets/img/stage-text/dot', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextColon', 'assets/img/stage-text/colon', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextExcl', 'assets/img/stage-text/excl', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextSpace', 'assets/img/stage-text/space', 16, 16, 1);
}



