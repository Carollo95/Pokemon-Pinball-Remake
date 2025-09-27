function preload() {
  preLoadBackgrounds();
  preloadAnimations();

  this._incrementPreload();
  preloadAudioAssets().then(() => this._decrementPreload());
}

function setup() {
  //Create canvas and asign it to its div on html
  let cnv = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  cnv.parent("canvas-container");

  //Start I18N
  let userLang = navigator.language || navigator.userLanguage;
  I18NManager.setLanguage(userLang);

  //Init physics
  EngineUtils.initPhysics();

  // Start level
  CheatEngine.startRedField();
}

function draw() {
  EngineUtils.drawStage();
}

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

