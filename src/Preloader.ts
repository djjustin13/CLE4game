module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			//Load menu items
			this.load.image('startBackground', 'assets/startBackground.jpg')
			this.load.image('startButton', 'assets/startButton.png')
			this.load.image('title', 'assets/title.png')

			//Load items
			this.load.image('level1', 'assets/bg.jpg')
			this.load.image('bgTile', 'assets/bgTile.jpg')
			this.load.image('ground', 'assets/platform.png')
			this.load.image('artPiece', 'assets/artPiece.png')
			this.load.image('platformTile', 'assets/platformTile.png')
			this.load.image('eye', 'assets/eye.png')
			this.load.spritesheet('dude', 'assets/dude.png', 32, 48, 9);
		}

		create() {
			console.log("preload state..")
			this.game.state.start('MainMenu');
		}
	}
}