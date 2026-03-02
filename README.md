# Pokémon Pinball Remake

Web remake of **Pokémon Pinball** built with p5play.

## Folder Structure (Summary)

```text
code/
	engine/          # EngineUtils, asset/audio/i18n managers, cheats
	core/            # Game foundation: Sketch, Stage, Ball, Controls, Timer...
	fields/          # Main field logic + red/blue variants and managers
	bonus_stages/    # BonusStage and implementations (gengar/diglett/meowth/seel/mewtwo)
	main_menu/       # MainMenu and field selector
	pokedex/         # Pokédex UI and logic
	high_scores/     # High score screen
	main.js          # p5 hooks: preload, setup, draw

assets/
	img/             # sprites, backgrounds, UI
	audio/           # music, sfx
	text/            # translations
```

## Class Diagrams (Mermaid)

### Red Field

```mermaid
classDiagram
direction LR

class Sketch
class Stage
class Field
class RedField
class Ball
class Flippers
class Timer
class Controls
class StageStatus
class StageStatusBanner
class Screen
class ScreenLandscapes
class ScreenSlot
class ScreenCaptureEvolution
class Arrows
class RubberBand
class CaptureWell
class SaverAgain
class MultiplierManager
class MultiplierTarget
class EvolutionManager
class EvolutionItem
class TargetArrow
class CaveDetectorManager
class CaveDetector
class PikachuSaverManager
class PikachuSaver
class BallUpgraderManager
class BallUpgraderElement
class StageWell
class BallBonusScreen
class EvolutionChooserScreen
class TravelButton
class Charger
class Bumper
class Sensor
class SpeedPad
class RedFieldArrows
class RedFieldRubberBand
class RedFieldMultiplierTarget
class RedFieldScreenLandscapes
class RedFieldCharger
class RedFieldVoltorb
class RedFieldBellsprout
class RedFieldDitto
class RedFieldStaryu
class TravelDiglett

Stage --|> Sketch
Field --|> Stage
RedField --|> Field
RedField *-- RedFieldDitto
RedField *-- RedFieldStaryu
RedField *-- TravelDiglett
RedField *-- RedFieldVoltorb
RedField *-- TargetArrow
RedField *-- EvolutionItem
RedField *-- Sensor
RedField *-- SpeedPad
TravelDiglett --|> TravelButton
RedFieldArrows --|> Arrows
RedFieldRubberBand --|> RubberBand
RedFieldMultiplierTarget --|> MultiplierTarget
RedFieldScreenLandscapes --|> ScreenLandscapes
RedFieldCharger --|> Charger
RedFieldVoltorb --|> Bumper
RedFieldBellsprout --|> CaptureWell

Stage *-- Ball
Stage *-- Flippers
Stage *-- Timer
Stage o-- Controls
Stage *-- StageStatus
Stage *-- StageStatusBanner
Field *-- Screen
Field *-- Arrows
Field *-- RubberBand
Field *-- CaptureWell
Field *-- SaverAgain
Field *-- MultiplierManager
Field *-- EvolutionManager
Field *-- CaveDetectorManager
Field *-- PikachuSaverManager
Field *-- BallUpgraderManager
Field *-- StageWell
Field *-- BallBonusScreen
Field *-- EvolutionChooserScreen
Screen *-- ScreenLandscapes
Screen *-- ScreenSlot
Screen *-- ScreenCaptureEvolution
MultiplierManager *-- MultiplierTarget
EvolutionManager *-- EvolutionItem
CaveDetectorManager *-- CaveDetector
PikachuSaverManager *-- PikachuSaver
BallUpgraderManager *-- BallUpgraderElement
```

### Blue Field

```mermaid
classDiagram
direction LR

class Sketch
class Stage
class Field
class BlueField
class Ball
class Flippers
class Timer
class Controls
class StageStatus
class StageStatusBanner
class Screen
class ScreenLandscapes
class ScreenSlot
class ScreenCaptureEvolution
class Arrows
class RubberBand
class CaptureWell
class SaverAgain
class MultiplierManager
class MultiplierTarget
class EvolutionManager
class EvolutionItem
class TargetArrow
class CaveDetectorManager
class CaveDetector
class PikachuSaverManager
class PikachuSaver
class BallUpgraderManager
class BallUpgraderElement
class StageWell
class BallBonusScreen
class EvolutionChooserScreen
class TravelButton
class Charger
class Bumper
class Sensor
class SpeedPad
class BlueFieldArrows
class BlueFieldRubberBand
class BlueFieldMultiplierTarget
class BlueFieldScreenLandscapes
class BlueFieldCharger
class BlueFieldShellder
class BlueFieldCloyster
class BlueFieldSlowbro
class BlueArrow
class BlueFieldTravelPoliwag
class BlueFieldTravelPsyduck

Stage --|> Sketch
Field --|> Stage
BlueField --|> Field
BlueField *-- BlueFieldSlowbro
BlueField *-- BlueArrow
BlueField *-- BlueFieldTravelPoliwag
BlueField *-- BlueFieldTravelPsyduck
BlueField *-- BlueFieldShellder
BlueField *-- BlueFieldCloyster
BlueField *-- TargetArrow
BlueField *-- EvolutionItem
BlueField *-- Sensor
BlueField *-- SpeedPad
BlueFieldArrows --|> Arrows
BlueFieldRubberBand --|> RubberBand
BlueFieldMultiplierTarget --|> MultiplierTarget
BlueFieldScreenLandscapes --|> ScreenLandscapes
BlueFieldCharger --|> Charger
BlueFieldShellder --|> Bumper
BlueFieldCloyster --|> CaptureWell
BlueFieldTravelPoliwag --|> TravelButton
BlueFieldTravelPsyduck --|> TravelButton

Stage *-- Ball
Stage *-- Flippers
Stage *-- Timer
Stage o-- Controls
Stage *-- StageStatus
Stage *-- StageStatusBanner
Field *-- Screen
Field *-- Arrows
Field *-- RubberBand
Field *-- CaptureWell
Field *-- SaverAgain
Field *-- MultiplierManager
Field *-- EvolutionManager
Field *-- CaveDetectorManager
Field *-- PikachuSaverManager
Field *-- BallUpgraderManager
Field *-- StageWell
Field *-- BallBonusScreen
Field *-- EvolutionChooserScreen
Screen *-- ScreenLandscapes
Screen *-- ScreenSlot
Screen *-- ScreenCaptureEvolution
MultiplierManager *-- MultiplierTarget
EvolutionManager *-- EvolutionItem
CaveDetectorManager *-- CaveDetector
PikachuSaverManager *-- PikachuSaver
BallUpgraderManager *-- BallUpgraderElement
```

### Ghost Bonus

```mermaid
classDiagram
direction LR

class Sketch
class Stage
class BonusStage
class BonusStageGhost
class Ball
class Flippers
class Timer
class Controls
class StageStatus
class StageStatusBanner
class Ghost
class SmallGhost
class Gastly
class Haunter
class Gengar

Stage --|> Sketch
BonusStage --|> Stage
BonusStageGhost --|> BonusStage
SmallGhost --|> Ghost
Gastly --|> SmallGhost
Haunter --|> SmallGhost
Gengar --|> Ghost

Stage *-- Ball
Stage *-- Flippers
Stage *-- Timer
Stage o-- Controls
Stage *-- StageStatus
Stage *-- StageStatusBanner
BonusStageGhost *-- Ghost
```

### Mole Bonus

```mermaid
classDiagram
direction LR

class Sketch
class Stage
class BonusStage
class BonusStageMole
class Ball
class Flippers
class Timer
class Controls
class StageStatus
class StageStatusBanner
class Diglett
class Dugtrio

Stage --|> Sketch
BonusStage --|> Stage
BonusStageMole --|> BonusStage

Stage *-- Ball
Stage *-- Flippers
Stage *-- Timer
Stage o-- Controls
Stage *-- StageStatus
Stage *-- StageStatusBanner
BonusStageMole *-- Diglett
BonusStageMole *-- Dugtrio
```

### Cat Bonus

```mermaid
classDiagram
direction LR

class Sketch
class Stage
class BonusStage
class BonusStageCat
class Ball
class Flippers
class Timer
class Controls
class StageStatus
class StageStatusBanner
class Meowth
class Coin
class CoinCounter
class FlyingCoin

Stage --|> Sketch
BonusStage --|> Stage
BonusStageCat --|> BonusStage

Stage *-- Ball
Stage *-- Flippers
Stage *-- Timer
Stage o-- Controls
Stage *-- StageStatus
Stage *-- StageStatusBanner
BonusStageCat *-- Meowth
BonusStageCat *-- Coin
BonusStageCat *-- CoinCounter
BonusStageCat *-- FlyingCoin
```

### Clone Bonus

```mermaid
classDiagram
direction LR

class Sketch
class Stage
class BonusStage
class BonusStageClone
class Ball
class Flippers
class Timer
class Controls
class StageStatus
class StageStatusBanner
class Mewtwo
class Shield

Stage --|> Sketch
BonusStage --|> Stage
BonusStageClone --|> BonusStage

Stage *-- Ball
Stage *-- Flippers
Stage *-- Timer
Stage o-- Controls
Stage *-- StageStatus
Stage *-- StageStatusBanner
BonusStageClone *-- Mewtwo
BonusStageClone *-- Shield
```

### Seal Bonus

```mermaid
classDiagram
direction LR

class Sketch
class Stage
class BonusStage
class BonusStageSeal
class Ball
class Flippers
class Timer
class Controls
class StageStatus
class StageStatusBanner
class Seal
class PearlCounter

Stage --|> Sketch
BonusStage --|> Stage
BonusStageSeal --|> BonusStage

Stage *-- Ball
Stage *-- Flippers
Stage *-- Timer
Stage o-- Controls
Stage *-- StageStatus
Stage *-- StageStatusBanner
BonusStageSeal *-- Seal
BonusStageSeal *-- PearlCounter
```
