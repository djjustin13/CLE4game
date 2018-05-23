module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			//Load menu items
			this.load.image('startBackground', 'assets/startBackground.jpg')
			this.load.image('startButton', 'assets/startButton.png')

			//Load items
			this.load.image('bgTile', 'assets/bgTile.png')
			this.load.image('ground', 'assets/platform.png')
			this.load.image('artPiece', 'assets/artPiece.png')
			this.load.image('platformTile', 'assets/platformTile.png')
			this.load.image('eye', 'assets/eye.png')
			this.load.spritesheet('dude', 'assets/dude.png', 32, 48, 9);

			this.load.image('uiBase', 'assets/uiBase.png')
		}

		create() {
			console.log("preload state..")
			this.game.state.start(
			'MainMenu');
		}
	}
}