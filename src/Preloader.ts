module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			// Load Start items
			this.load.image('startBackground', 'assets/startBackground.jpg')
			this.load.image('startButton', 'assets/startButton.png')
			this.load.image('uiBackground', 'assets/ui_background.jpg')

			//Load menu items
			this.load.spritesheet('daliButton', 'assets/ui_dali.png',218 ,368 ,2 )
			this.load.image('locked1', 'assets/ui_lockedcharacter1.png')
			this.load.image('locked2', 'assets/ui_lockedcharacter2.png')
			this.load.spritesheet('menuGoButton', 'assets/ui_go.png',210, 80, 3)
			this.load.image('uiBackground', 'assets/ui_background.jpg')
			this.load.image('menuTitle', 'assets/menu_title.png')
		
			//Load ui
			this.load.image('uiBase', 'assets/ui_base.png')
			this.load.image('gamePause', 'assets/ui_pauseButton.png')
			this.load.image('pauseBackground', 'assets/pause.png')

			// Load items
			this.load.image('bgTile', 'assets/bgTile.png')
			this.load.image('platform', 'assets/platform.png')
			this.load.image('artPiece', 'assets/artPiece.png')
			this.load.image('platformTile', 'assets/platformTile.png')
			this.load.image('dynamicledge', 'assets/platform_spikes_small.png')
			this.load.image('eye', 'assets/eye.png')
			this.load.image('spikes', 'assets/spikes.png')
			this.load.image('elephant', 'assets/elephant.png')
			this.load.image('elephanttop', 'assets/elephanttop.png')
			this.load.spritesheet('airflow', 'assets/airflow.png', 20, 32, 3)
			this.load.spritesheet('longlegs', 'assets/Elephant_spritesheet.png', 150, 164, 7);

			this.load.image('uiBase', 'assets/uiBase.png')
			this.load.image('endSign', 'assets/endSign.png')

			//Load Player
			this.load.spritesheet('dude', 'assets/playerSheet.png', 64, 64, 16);

			// Load level completion
			this.load.image('levelCompleteBackground', 'assets/startBackground.jpg')
			this.load.image('nextLevelButton', 'assets/startButton.png')

			// Load gameover screen
			this.load.image('gameOverBackground', 'assets/startBackground.jpg')
			this.load.image('restartLevelButton', 'assets/startButton.png')
		}

		create() {
			console.log("preload state..")
			this.game.state.start('StartScreen');
		}
	}
}