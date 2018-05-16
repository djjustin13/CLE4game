module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			//Load all sprites
			this.load.image('level1', 'assets/bg.jpg')
			this.load.image('bgTile', 'assets/bgTile.jpg')
			this.load.image('ground', 'assets/platform.png')
<<<<<<< HEAD
			this.load.image('item', 'assets/artPiece.png')
			this.load.image('platformTile', 'assets/platformTile')
=======
			this.load.image('eye', 'assets/eye.png')
>>>>>>> b57af236d57585df350ae3996d2c728cec760469
			this.load.spritesheet('dude', 'assets/dude.png', 32, 48, 9);
		}

		create() {
			console.log("preload state..")
			this.game.state.start('MainMenu');
		}
	}
}