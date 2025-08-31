
class BonusStageClone extends BonusStage {

  constructor() {
    super();

  }

  setup() {
    super.replaceBackground(Asset.getBackground('bonusCloneBackgroundOpen'));
    super.createBonusScenarioGeometry();

    Audio.playMusic('cloneStage');
  }

  draw() {
    super.draw();
    this.drawStage();
  }

  drawStage(){
    
  }

  getBackground() {
    return Asset.getBackground('bonusCloneBackgroundClosed');
  }

  getOpenGateBackground() {
    return Asset.getBackground('bonusCloneBackgroundOpen');
  }

}
