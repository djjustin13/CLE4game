module MyGame {

	export class GameOver extends Phaser.State {

		background: Phaser.Sprite
		button: Phaser.Sprite
		

		create() {
			
			this.background = this.add.sprite(0, 0, 'gameOverBackground');
			this.button = this.add.sprite(550, 168, 'restartLevelButton')
			this.button.anchor.setTo(0.5, 0)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true;

			this.button.events.onInputDown.add(() => this.restartLevel())
			this.button.events.onInputOver.add(() => this.hover())
			this.button.events.onInputOut.add(() => this.hoverOut())

			console.log("Game ended..")
		}

		hover(){
			this.button.scale.setTo(1.05, 1.05)
		}

		hoverOut(){
			this.button.scale.setTo(1, 1)
		}

		restartLevel() {
			console.log('.. OR NOT!!!')
			this.game.state.start('Level1', true, false);
		}
	}
}