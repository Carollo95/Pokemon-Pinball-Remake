function preload() {
  preLoadBackgrounds();
  preloadAnimations();

  this._incrementPreload();
  preloadAudioAssets().then(() => this._decrementPreload());
}

function setup() {
  // Quick fix to reduce spritesheet bleeding
  pixelDensity(1);
  noSmooth();
  //Create canvas and asign it to its div on html
  let cnv = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  cnv.parent("canvas-container");

  // Ensure the 2D context doesn't smooth scaled images
  drawingContext.imageSmoothingEnabled = false;

  //Start I18N
  let userLang = navigator.language || navigator.userLanguage;
  I18NManager.setLanguage(userLang);

  initializeMainPageContent();

  //Init physics
  EngineUtils.initPhysics();

  // Start level
  EngineUtils.startMainMenu();
}

function draw() {
  EngineUtils.drawStage();
}

