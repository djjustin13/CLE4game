module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {

			//Load all sprites
			this.load.image('level1', 'assets/bg.jpg')
			this.load.image('ground', 'assets/platform.png')
			this.load.spritesheet('dude', 'assets/dude.png', 32, 48, 9);

		}

		create() {
			console.log("preload state..")
			this.game.state.start('MainMenu');
		}
	}
}