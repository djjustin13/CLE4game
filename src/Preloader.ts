module MyGame {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {

			//Load all sprites

		}

		create() {
			console.log("preload state..")
			this.game.state.start('MainMenu');
		}
	}
}