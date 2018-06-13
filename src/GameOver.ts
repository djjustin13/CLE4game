module MyGame {

	export class GameOver extends Phaser.State {
		game:Game
		background: Phaser.Sprite
		button: Phaser.Sprite
		
		artPieceScoreDisplay1:any
		timerDisplay1:any
		artPieceScoreDisplay2:any
		timerDisplay2:any
		artPieceScoreDisplay3:any
		timerDisplay3:any

		create() {
			
			this.background = this.add.sprite(0, 0, 'gameOverBackground');
			this.button = this.add.sprite(550, 168, 'restartLevelButton')
			this.button.anchor.setTo(0.5, 0)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true;

			this.button.events.onInputDown.add(() => this.restartLevel())
			this.button.events.onInputOver.add(() => this.hover())
			this.button.events.onInputOut.add(() => this.hoverOut())

			let style = { font: "bold 20px Assistant", fill: "#ffffff" };

			this.artPieceScoreDisplay1 = this.game.add.text(this.game.width - 236, 24, this.game.artpieces1 + '/4', style);

			this.timerDisplay1 = this.game.add.text(this.game.width - 146, 24, String(this.game.timer1), style)

			this.artPieceScoreDisplay2 = this.game.add.text(this.game.width - 236, 48, this.game.artpieces2 + '/4', style);

			this.timerDisplay2 = this.game.add.text(this.game.width - 146, 48, String(this.game.timer2), style)

			this.artPieceScoreDisplay3 = this.game.add.text(this.game.width - 236, 72, this.game.artpieces3 + '/4', style);

			this.timerDisplay3 = this.game.add.text(this.game.width - 146, 72, String(this.game.timer3), style)


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