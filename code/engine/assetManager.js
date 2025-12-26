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
    this.animTemplates = new Map(); // animKey -> p5.play.Animation
    this.backgrounds = new Map();   // bgKey -> p5.Image
  }

  // Load and cache a PNG image (path without extension)
  getImage(path) {
    if (this.imageCache.has(path)) return this.imageCache.get(path);
    const img = loadImage(path + '.png', (loadedImg) => {
      if (DEBUG) {
        img.filter(GRAY);
      }
    });
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

  dispose() {
    for (const [, anim] of this.animTemplates) {
      try {
        if (anim) {
          if (anim.images && Array.isArray(anim.images)) anim.images.length = 0;
          if (anim.frames && Array.isArray(anim.frames)) anim.frames.length = 0;
          if (anim.spriteSheet) anim.spriteSheet = null;
        }
      } catch { }
    }
    this.animTemplates.clear();

    for (const [, img] of this.imageCache) {
      try {
        if (img && img.canvas) {
          img.canvas.width = 1;
          img.canvas.height = 1;
        }
      } catch { }
    }
    this.imageCache.clear();
    this.backgrounds.clear();
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

  Asset.registerBackground('redFieldBackground', 'assets/img/red-field/background');
}


// --- Register all sprite sheets and templates used across the project ---
function preloadAnimations() {

  // Register animation templates
  Asset.registerAnimationTemplate('animPokeBall', 'assets/img/ball/poke_ball', 32, 32, 8);
  Asset.registerAnimationTemplate('animPokeBallSmall', 'assets/img/ball/poke_ball_small', 32, 32, 8);
  Asset.registerAnimationTemplate('animPokeBallSmall2', 'assets/img/ball/poke_ball_small_2', 32, 32, 8);
  Asset.registerAnimationTemplate('animGreatBall', 'assets/img/ball/great_ball', 32, 32, 8);
  Asset.registerAnimationTemplate('animGreatBallSmall', 'assets/img/ball/great_ball_small', 32, 32, 8);
  Asset.registerAnimationTemplate('animGreatBallSmall2', 'assets/img/ball/great_ball_small_2', 32, 32, 8);
  Asset.registerAnimationTemplate('animUltraBall', 'assets/img/ball/ultra_ball', 32, 32, 8);
  Asset.registerAnimationTemplate('animUltraBallSmall', 'assets/img/ball/ultra_ball_small', 32, 32, 8);
  Asset.registerAnimationTemplate('animUltraBallSmall2', 'assets/img/ball/ultra_ball_small_2', 32, 32, 8);
  Asset.registerAnimationTemplate('animMasterBall', 'assets/img/ball/master_ball', 32, 32, 8);
  Asset.registerAnimationTemplate('animMasterBallSmall', 'assets/img/ball/master_ball_small', 32, 32, 8);
  Asset.registerAnimationTemplate('animMasterBallSmall2', 'assets/img/ball/master_ball_small_2', 32, 32, 8);

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

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890É";
  // stage text templates
  for (const ch of letters) {
    Asset.registerAnimationTemplate('stageText' + ch, `assets/img/stage-text/${ch.toLowerCase()}`, 16, 16, 1);
  }

  Asset.registerAnimationTemplate('stageTextDot', 'assets/img/stage-text/dot', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextApostrophe', 'assets/img/stage-text/apostrophe', 16, 16, 1);
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
  Asset.registerAnimationTemplate('stageTextMale', 'assets/img/stage-text/male', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextFemale', 'assets/img/stage-text/female', 16, 16, 1);
  Asset.registerAnimationTemplate('stageTextCommaSeparator', 'assets/img/stage-text/comma_separator', 4, 16, 1);
  Asset.registerAnimationTemplate('stageTextDotSeparator', 'assets/img/stage-text/dot_separator', 4, 16, 1);
  Asset.registerAnimationTemplate('stageTextSeparator', 'assets/img/stage-text/separator', 4, 16, 1);

  Asset.registerAnimationTemplate('evolutionMethods', 'assets/img/field/evolution_methods', 16, 20, 7);
  Asset.registerAnimationTemplate('evolveExperience', 'assets/img/field/evolve_experience', 96, 16, 4);
  Asset.registerAnimationTemplate('evolveFire', 'assets/img/field/evolve_fire', 96, 16, 4);
  Asset.registerAnimationTemplate('evolveWater', 'assets/img/field/evolve_water', 96, 16, 4);
  Asset.registerAnimationTemplate('evolveLeaf', 'assets/img/field/evolve_leaf', 96, 16, 4);
  Asset.registerAnimationTemplate('evolveThunder', 'assets/img/field/evolve_thunder', 96, 16, 4);
  Asset.registerAnimationTemplate('evolveMoon', 'assets/img/field/evolve_moon', 96, 16, 4);
  Asset.registerAnimationTemplate('evolveCable', 'assets/img/field/evolve_cable', 96, 16, 4);

  Asset.registerAnimationTemplate('ballUpgraderElement', 'assets/img/field/ball_upgrader_element', 12, 26, 2, 7);

  Asset.registerAnimationTemplate('catch', 'assets/img/field/catch', 96, 16, 4);
  Asset.registerAnimationTemplate('capture-puff', 'assets/img/field/capture_puff', 96, 112, 4);
  Asset.registerAnimationTemplate('captured-ball', 'assets/img/field/captured_ball', 32, 16, 1);

  Asset.registerAnimationTemplate('travelLeft', 'assets/img/field/travel_left', 96, 64, 1);
  Asset.registerAnimationTemplate('travelRight', 'assets/img/field/travel_right', 96, 64, 1);
  Asset.registerAnimationTemplate('travelCave', 'assets/img/field/travel_cave', 96, 64, 1);

  Asset.registerAnimationTemplate('caveDetector', 'assets/img/field/cave_detectors', 14, 14, 5);

  Asset.registerAnimationTemplate('redArea1Landmarks', 'assets/img/landmarks/red_landmarks_area_1', 96, 64, 7);
  Asset.registerAnimationTemplate('redArea1LandmarksBW', 'assets/img/landmarks/red_landmarks_area_1_bw', 96, 64, 7);
  Asset.registerAnimationTemplate('redArea2Landmarks', 'assets/img/landmarks/red_landmarks_area_2', 96, 64, 4);
  Asset.registerAnimationTemplate('redArea2LandmarksBW', 'assets/img/landmarks/red_landmarks_area_2_bw', 96, 64, 4);
  Asset.registerAnimationTemplate('Area3Landmarks', 'assets/img/landmarks/landmarks_area_3', 96, 64, 1);
  Asset.registerAnimationTemplate('Area3LandmarksBW', 'assets/img/landmarks/landmarks_area_3_bw', 96, 64, 1);

  Asset.registerAnimationTemplate('pikachuSaverIdle', 'assets/img/field/pikachu_idle', 32, 32, 2);
  Asset.registerAnimationTemplate('pikachuSaverHurt', 'assets/img/field/pikachu_hurt', 32, 32, 1);
  Asset.registerAnimationTemplate('pikachuSaverLightning', 'assets/img/field/pikachu_lightning', 32, 48, 23, 9);

  Asset.registerAnimationTemplate('redFieldDittoOpen', 'assets/img/red-field/ditto-open', 53, 106, 1);
  Asset.registerAnimationTemplate('redFieldDittoClosed', 'assets/img/red-field/ditto-closed', 78, 140, 1);
  Asset.registerAnimationTemplate('redFieldDittoFullyOpen', 'assets/img/red-field/ditto-fully-open', 16, 44, 1);
  Asset.registerAnimationTemplate('redFieldOuterLoopDoor', 'assets/img/red-field/outer_loop_door', 104, 104, 1);

  Asset.registerAnimationTemplate('redFieldPaddle', 'assets/img/red-field/paddle', 28, 16, 6);
  Asset.registerAnimationTemplate('redFieldChargeIndicator', 'assets/img/red-field/charge_indicator', 36, 40, 17);

  Asset.registerAnimationTemplate('redFieldMultiplier', 'assets/img/red-field/multiplier', 14, 14, 10);
  Asset.registerAnimationTemplate('redFieldMultiplierActive', 'assets/img/red-field/multiplier_active', 14, 14, 10);

  Asset.registerAnimationTemplate('redFieldDiglettIdle', 'assets/img/red-field/diglett_idle', 24, 32, 2);
  Asset.registerAnimationTemplate('redFieldDiglettHurt', 'assets/img/red-field/diglett_hurt', 24, 32, 1);
  Asset.registerAnimationTemplate('redFieldDugtrio', 'assets/img/red-field/dugtrio', 48, 64, 4);
  Asset.registerAnimationTemplate('redFieldVoltorbIdle', 'assets/img/red-field/voltorb_idle', 32, 32, 1);
  Asset.registerAnimationTemplate('redFieldVoltorbHurt', 'assets/img/red-field/voltorb_hurt', 32, 32, 1);
  Asset.registerAnimationTemplate('redFieldStaryuActive', 'assets/img/red-field/staryu_active', 48, 48, 1);
  Asset.registerAnimationTemplate('redFieldStaryuInactive', 'assets/img/red-field/staryu_inactive', 48, 48, 1);
  Asset.registerAnimationTemplate('redFieldSmallStaryuActive', 'assets/img/red-field/small_staryu_active', 32, 32, 1);
  Asset.registerAnimationTemplate('redFieldSmallStaryuInactive', 'assets/img/red-field/small_staryu_inactive', 32, 32, 1);
  Asset.registerAnimationTemplate('redFieldUpgradeBlockerLeft', 'assets/img/red-field/ball_upgrade_blocker_left', 28, 46, 1);
  Asset.registerAnimationTemplate('redFieldUpgradeBlockerCenter', 'assets/img/red-field/ball_upgrade_blocker_center', 28, 38, 1);
  Asset.registerAnimationTemplate('redFieldUpgradeBlockerRight', 'assets/img/red-field/ball_upgrade_blocker_right', 28, 54, 1);

  Asset.registerAnimationTemplate('redFieldCaptureArrows', 'assets/img/red-field/capture_arrows', 46, 68, 4);
  Asset.registerAnimationTemplate('redFieldEvolutionArrows', 'assets/img/red-field/evolution_arrows', 46, 68, 5);
  Asset.registerAnimationTemplate('redFieldBellsproutArrow', 'assets/img/red-field/bellsprout_arrow', 34, 32, 2);
  Asset.registerAnimationTemplate('redFieldLeftInnerArrow', 'assets/img/red-field/left_inner_arrow', 34, 32, 2);
  Asset.registerAnimationTemplate('redFieldCaveArrow', 'assets/img/red-field/cave_arrow', 26, 22, 2);
  Asset.registerAnimationTemplate('redFieldTargetArrows', 'assets/img/red-field/target_arrows', 16, 16, 14);
  Asset.registerAnimationTemplate('redFieldBellsproutIdle', 'assets/img/red-field/bellsprout_idle', 64, 80, 2);
  Asset.registerAnimationTemplate('redFieldBellsproutEat', 'assets/img/red-field/bellsprout_eat', 64, 80, 1, DEFAULT_ANIMATION_DELAY * 2);
  Asset.registerAnimationTemplate('redFieldBellsproutSpit', 'assets/img/red-field/bellsprout_spit', 64, 80, 1, DEFAULT_ANIMATION_DELAY * 3);

  Asset.registerAnimationTemplate('goToBonusMole', 'assets/img/field/go_to_bonus_mole', 96, 64, 1);
  Asset.registerAnimationTemplate('goToBonusGhost', 'assets/img/field/go_to_bonus_ghost', 96, 64, 1);
  Asset.registerAnimationTemplate('goToBonusClone', 'assets/img/field/go_to_bonus_clone', 96, 64, 1);

  Asset.registerAnimationTemplate('openWell', 'assets/img/field/open_well', 30, 30, 1);
  Asset.registerAnimationTemplate('closedWell', 'assets/img/field/closed_well', 30, 30, 1);
  Asset.registerAnimationTemplate('wellAura', 'assets/img/field/well_aura', 66, 62, 3);

  for (let i = 1; i <= 151; i++) {
    Asset.registerAnimationTemplate(pad3(i), 'assets/img/dex/' + pad3(i), 96, 64, 1);
    Asset.registerAnimationTemplate(pad3(i) + '-bw', 'assets/img/dex/' + pad3(i) + '-bw', 96, 64, 1);
  }

  for (let i = 0; i < BASIC_POKEMON.length; i++) {
    Asset.registerAnimationTemplate(BASIC_POKEMON[i].id + '-idle', 'assets/img/dex/' + BASIC_POKEMON[i].id + '-idle', 64, 64, 2);
    Asset.registerAnimationTemplate(BASIC_POKEMON[i].id + '-idle-hurt', 'assets/img/dex/' + BASIC_POKEMON[i].id + '-idle-hurt', 64, 64, 3);
  }
}

function pad3(num) {
  return String(num).padStart(3, '0');
}

if (typeof window !== 'undefined') {
  if (window.__ASSET_SINGLETON__ && window.__ASSET_SINGLETON__ !== Asset) {
    try { window.__ASSET_SINGLETON__.dispose(); } catch { }
  }
  window.__ASSET_SINGLETON__ = Asset;

  window.addEventListener('pagehide', () => {
    try { Asset.dispose(); } catch { }
  }, { once: true });
}


