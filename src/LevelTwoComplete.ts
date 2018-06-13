module MyGame {

	export class LevelTwoComplete extends Phaser.State {
		game:Game
		background: Phaser.Sprite
		button: Phaser.Sprite	
		
		artPieceScoreDisplay:any
		timerDisplay:any
		livesDisplay:any

		create() {
			this.background = this.add.sprite(0, 0, 'levelCompleteBackground');
			this.button = this.add.sprite(550, 168, 'nextLevelButton')
			this.button.anchor.setTo(0.5, 0)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true;

			this.button.events.onInputDown.add(() => this.nextLevel())
			this.button.events.onInputOver.add(() => this.hover())
			this.button.events.onInputOut.add(() => this.hoverOut())

			let style = { font: "bold 20px Assistant", fill: "#ffffff" };

			this.artPieceScoreDisplay = this.game.add.text(this.game.width - 236, 24, this.game.artpieces2 + '/4', style);

			this.timerDisplay = this.game.add.text(this.game.width - 146, 24, String(this.game.timer2), style)

			this.livesDisplay = this.game.add.text(this.game.width - 26, 24, String(this.game.lives), style);

			console.log("level two complete!")
		}

		hover(){
			this.button.scale.setTo(1.05, 1.05)
		}

		hoverOut(){
			this.button.scale.setTo(1, 1)
		}

		nextLevel() {
			this.game.state.start('Level3', true, false);
		}

	}

}