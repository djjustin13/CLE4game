module MyGame {

	export class StartScreen extends Phaser.State {

		background: Phaser.Sprite
		button: Phaser.Sprite
		

		create() {
			this.background = this.add.sprite(0, 0, 'startBackground');
			this.button = this.add.sprite(this.world.centerX, this.world.centerY, 'startButton')
			this.button.anchor.setTo(0.5, 0.5)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true;

			this.button.events.onInputDown.add(() => this.mainMenu())
			this.button.events.onInputOver.add(() => this.hover())
			this.button.events.onInputOut.add(() => this.hoverOut())
		}

		hover(){
			this.button.scale.setTo(1.05, 1.05)
		}

		hoverOut(){
			this.button.scale.setTo(1, 1)
		}

		mainMenu() {
			this.game.state.start('MainMenu', true, false);
		}

	}

}