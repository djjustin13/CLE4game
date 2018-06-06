module MyGame {

	export class MainMenu extends Phaser.State {

		button: Phaser.Sprite
		

		create() {
			
			this.button = this.add.sprite(this.world.centerX+40, this.world.centerY-130, 'startButton')
			this.button.anchor.setTo(0.5, 0)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true;

			this.button.events.onInputDown.add(() => this.startGame())
			this.button.events.onInputOver.add(() => this.hover())
			this.button.events.onInputOut.add(() => this.hoverOut())

			console.log("menu state")
		}

		hover(){
			this.button.scale.setTo(1.05, 1.05)
		}

		hoverOut(){
			this.button.scale.setTo(1, 1)
		}

		startGame() {
			this.game.state.start('Level1', true, false, 'test123');
		}
	}
}