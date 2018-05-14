module MyGame {

	export class MainMenu extends Phaser.State {

		background: Phaser.Sprite;
		

		create() {
			
			// this.background = this.add.sprite(0, 0, 'titlepage');
			// this.background.alpha = 0;

			//trigger with something..
			console.log("menu state")
			this.startGame()
		}

		startGame() {
			
			this.game.state.start('Level1', true, false);

		}

	}

}