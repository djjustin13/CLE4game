module MyGame {

	export class MainMenu extends Phaser.State {

		background: Phaser.Sprite;
		

		create() {
			
			this.background = this.add.sprite(0, 0, 'startBackground');
			let title = this.add.sprite(this.world.centerX, 50, 'title')
			title.anchor.setTo(0.5, 0)
			let button = this.add.sprite(this.world.centerX, this.world.centerY, 'startButton')
			button.anchor.setTo(0.5, 0)

			button.inputEnabled = true;

			button.events.onInputDown.add(() => this.startGame());

			//trigger with something..
			console.log("menu state")
			// this.startGame()
		}

		startGame() {
			
			this.game.state.start('Level1', true, false);

		}

	}

}