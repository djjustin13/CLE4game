module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			//Load main menu screen
			this.load.image('startBackground', 'assets/UI/Menu/startBackground.jpg')
			this.load.image('startButton', 'assets/UI/Menu/startButton.png')
			this.load.image('uiBackground', 'assets/UI/Menu/ui_background.jpg')
			this.load.image('bgElephant', 'assets/UnusedAssets/elephant.png')
			this.load.image('tree', 'assets/UnusedAssets/Boom.png')
			this.load.image('clock', 'assets/UnusedAssets/clock.png')

			//Load second menu screen
			this.load.spritesheet('daliButton', 'assets/UI/Menu/ui_dali.png', 218, 368, 2)
			this.load.image('locked1', 'assets/UI/Menu/ui_lockedcharacter1.png')
			this.load.image('locked2', 'assets/UI/Menu/ui_lockedcharacter2.png')
			this.load.spritesheet('menuGoButton', 'assets/UI/Menu/ui_go.png', 210, 80, 3)
			this.load.spritesheet('menuKunstwerkenButton', 'assets/UI/Menu/ui_kunstwerken.png', 460, 80, 2)
			this.load.image('uiBackground', 'assets/UI/Menu/ui_background.jpg')
			this.load.image('menuTitle', 'assets/UI/Menu/menu_title.png')

			// Load Gallery items
			this.load.image('galleryBackground', 'assets/UI/Menu/gallery_frame.png')
			this.load.image('uiOkButton', 'assets/UI/Menu/gallery_ui_okButton.png')
			this.load.image('uiArtLocked', 'assets/UI/Menu/gallery_ui_locked.png')
			this.load.image('uiDaliMelt', 'assets/UI/Menu/gallery_ui_melting-watch.png')
			this.load.image('uiDaliSphere', 'assets/UI/Menu/gallery_ui_galatea-of-the-spheres.png')
			this.load.image('daliMelt', 'assets/UI/Menu/dali_melting-watch.png')
			this.load.image('daliSphere', 'assets/UI/Menu/dali_galatea-of-the-spheres.png')
			this.load.image('bigDaliMelt', 'assets/UI/Menu/bg_melting-watch.jpg')
			this.load.image('bigDaliSphere', 'assets/UI/Menu/bg_galatea-of-the-spheres.jpg')

			//Load Ingame UI
			this.load.image('uiBase', 'assets/UI/Ingame/UI_base.png')
			this.load.image('gamePause', 'assets/UI/Ingame/UI_pauseButton.png')
			this.load.image('pauseBackground', 'assets/UI/Ingame/pause.png')
			this.load.image('pauseRestart', 'assets/UI/Ingame/pause_restart.png')
			this.load.image('pauseHome', 'assets/UI/Ingame/pause_home.png')

			// Load UI objects
			this.load.image('uiLife', 'assets/UI/Ingame/life.png')
			this.load.image('uiClock', 'assets/UI/Ingame/clock.png')
			this.load.image('uiPiece', 'assets/UI/Ingame/piece.png')

			// Load Game objects
			this.load.image('bgTile', 'assets/Misc/bgTile.png')
			this.load.image('tutorialSign', 'assets/Misc/tutorialSign.png')
			this.load.image('platform', 'assets/Platforms/platform.png')
			this.load.image('artPiece', 'assets/Collectibles/artPiece.png')
			this.load.image('platformTile', 'assets/Misc/platformTile.png')
			this.load.image('dynamicledge', 'assets/Platforms/platform_spikes_small.png')
			this.load.image('eye', 'assets/Enemies/eye.png')
			this.load.image('spikes', 'assets/Enemies/spikes.png')
			this.load.image('elephant', 'assets/IO/elephant.png')
			this.load.image('elephanttop', 'assets/IO/elephanttop.png')
			this.load.spritesheet('airflow', 'assets/Misc/airflow.png', 20, 32, 3)
			this.load.spritesheet('longlegs', 'assets/IO/Elephant_spritesheet.png', 150, 164, 7);
			this.load.spritesheet('dog', 'assets/Enemies/dogSheet.png', 68, 64, 8);

			this.load.image('uiBase', 'assets/UI/Ingame/uiBase.png')
			this.load.image('endSign', 'assets/Misc/endSign.png')

			//Load Player
			this.load.spritesheet('dude', 'assets/Misc/playerSheet.png', 64, 64, 16);

			// Load level completion
			this.load.image('level1Complete', 'assets/UI/Menu/UI_Levelcomplete1.png')
			this.load.image('level2Complete', 'assets/UI/Menu/UI_Levelcomplete2.png')
			this.load.image('nextLevelButton', 'assets/UI/Menu/startButton.png')

			// Load gameover screen
			this.load.image('gameCompleteBackground', 'assets/UI/Menu/startBackground.jpg')
			this.load.image('gameOverBackground', 'assets/UI/Menu/startBackground.jpg')
			this.load.image('restartLevelButton', 'assets/UI/Menu/startButton.png')
		}

		create() {
			this.game.state.start('StartScreen');
		}
	}
}