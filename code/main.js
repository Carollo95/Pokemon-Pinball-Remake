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

  //Init physics
  EngineUtils.initPhysics();

  // Start level
  EngineUtils.startMainMenu();
}

function draw() {
  EngineUtils.drawStage();
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("red-field").addEventListener("click", CheatEngine.startRedField);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("blue-field").addEventListener("click", CheatEngine.startBlueField);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ghost-stage").addEventListener("click", CheatEngine.startGhostStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("mole-stage").addEventListener("click", CheatEngine.startMoleStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cat-stage").addEventListener("click", CheatEngine.startCatStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("seal-stage").addEventListener("click", CheatEngine.startSealStage);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("clone-stage").addEventListener("click", CheatEngine.startCloneStage);
});

document.addEventListener('DOMContentLoaded', function () {
  const controlsDiv = document.getElementById('bonus-stage-selector-buttons');
  if (controlsDiv && typeof DEBUG !== 'undefined' && !DEBUG) {
    controlsDiv.style.display = 'none';
  }
});

