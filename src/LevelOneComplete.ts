module MyGame {

	export class LevelOneComplete extends Phaser.State {
		game:Game
		background: Phaser.Sprite
		button: Phaser.Sprite
		okButton: Phaser.Sprite
		
		artPieceScoreDisplay:any
		timerDisplay:any
		livesDisplay:any

		create() {
			this.background = this.add.sprite(0, 0, 'levelCompleteBackground');

			// Next level button
			this.button = this.add.sprite(550, 168, 'nextLevelButton')
			this.button.anchor.setTo(0.5, 0)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true

			this.button.events.onInputDown.add(() => this.nextLevel())
			this.button.events.onInputOver.add(() => this.hover(1))
			this.button.events.onInputOut.add(() => this.hoverOut(1))

			// Back to menu button
			this.okButton = this.add.sprite(550, 500, 'uiOkButton')
            this.okButton.anchor.setTo(0.5, 0.5)

            this.okButton.inputEnabled = true
            this.okButton.input.useHandCursor = true

            this.okButton.events.onInputDown.add(() => this.mainMenu())
            this.okButton.events.onInputOver.add(() => this.hover(2))
            this.okButton.events.onInputOver.add(() => this.hoverOut(2))

			let style = { font: "bold 20px Assistant", fill: "#ffffff" };

			this.artPieceScoreDisplay = this.game.add.text(this.game.width - 236, 24, this.game.artpieces1 + '/4', style)

			this.timerDisplay = this.game.add.text(this.game.width - 146, 24, String(this.game.timer1), style)

			this.livesDisplay = this.game.add.text(this.game.width - 26, 24, String(this.game.lives), style)

			console.log("level one complete!")
		}

		hover(n:number) {
			this.button.scale.setTo(1.05, 1.05)
		}

		hoverOut(n:number) {
			this.button.scale.setTo(1, 1)
		}

		nextLevel() {
			this.game.state.start('Level2', true, false)
		}

		mainMenu() {
			this.game.state.start('MainMenu', true, false)		
		}
	}
}