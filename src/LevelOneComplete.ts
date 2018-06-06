module MyGame {

	export class LevelOneComplete extends Phaser.State {

		background: Phaser.Sprite
		button: Phaser.Sprite	

		create() {
			this.background = this.add.sprite(0, 0, 'levelCompleteBackground');
			this.button = this.add.sprite(550, 168, 'nextLevelButton')
			this.button.anchor.setTo(0.5, 0)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true;

			this.button.events.onInputDown.add(() => this.nextLevel())
			this.button.events.onInputOver.add(() => this.hover())
			this.button.events.onInputOut.add(() => this.hoverOut())

			console.log("level one complete!")
		}

		hover(){
			this.button.scale.setTo(1.05, 1.05)
		}

		hoverOut(){
			this.button.scale.setTo(1, 1)
		}

		nextLevel() {
			this.game.state.start('Level2', true, false);
		}

	}

}