module MyGame {

	export class GameOver extends Phaser.State {
		game:Game
		background: Phaser.Sprite
		button: Phaser.Sprite
		galleryButton: Phaser.Sprite
		clock: Phaser.Sprite
		piece: Phaser.Sprite
		
		levelOneDisplay: any
		levelTwoDisplay: any
		levelThreeDisplay: any
		artPieceScoreDisplay1:any
		timerDisplay1:any
		artPieceScoreDisplay2:any
		timerDisplay2:any
		artPieceScoreDisplay3:any
		timerDisplay3:any

		create() {
			this.background = this.add.sprite(0, 0, 'gameCompleteBackground');

			// Next level button
			this.button = this.add.sprite((this.game.width/1.5)+50, this.game.height/1.1, 'nextLevelButton')
			this.button.anchor.setTo(0.5, 0.5)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true

			this.button.events.onInputDown.add(() => this.restartGame())
			this.button.events.onInputOver.add(() => this.hover(this.button, 1))
			this.button.events.onInputOut.add(() => this.hoverOut(this.button, 1))

			// Back to menu button
			this.galleryButton = this.add.sprite((this.game.width/3.5)+50, this.game.height/1.1, 'menuKunstwerkenButton')
            this.galleryButton.anchor.setTo(0.5, 0.5)

            this.galleryButton.inputEnabled = true
            this.galleryButton.input.useHandCursor = true

            this.galleryButton.events.onInputDown.add(() => this.showGallery())
            this.galleryButton.events.onInputOver.add(() => this.hover(this.galleryButton, 2))
            this.galleryButton.events.onInputOut.add(() => this.hoverOut(this.galleryButton, 2))

			let style = { font: "bold 30px Assistant", fill: "#ffffff" };

			this.levelOneDisplay = this.game.add.text(this.game.width/2-65, this.game.height/2-100, '1', style)
			this.artPieceScoreDisplay1 = this.game.add.text(this.game.width/2-65, this.game.height/2-50, this.game.artpieces1 + '/4', style)
			this.timerDisplay1 = this.game.add.text(this.game.width/2-65, this.game.height/2, String(this.game.timer1), style)

			this.levelTwoDisplay = this.game.add.text(this.game.width/2+40, this.game.height/2-100, '2', style)
			this.artPieceScoreDisplay2 = this.game.add.text(this.game.width/2+40, this.game.height/2-50, this.game.artpieces2 + '/4', style)
			this.timerDisplay2 = this.game.add.text(this.game.width/2+40, this.game.height/2, String(this.game.timer2), style)

			this.levelThreeDisplay = this.game.add.text(this.game.width/2+145, this.game.height/2-100, '3', style)
			this.artPieceScoreDisplay3 = this.game.add.text(this.game.width/2+145, this.game.height/2-50, this.game.artpieces3 + '/4', style)
			this.timerDisplay3 = this.game.add.text(this.game.width/2+145, this.game.height/2, String(this.game.timer3), style)

			// Loading icons
			this.piece = this.add.sprite((this.game.width/2)-125, this.game.height/2-8, 'uiClock')
			this.clock = this.add.sprite((this.game.width/2)-125, this.game.height/2-62, 'uiPiece')

			this.clock.anchor.setTo(0.5, 0)
			this.piece.anchor.setTo(0.5, 0)


			console.log("GAME OVER ... :(")
		}

		hover(el:Phaser.Sprite, n:number) {
			if (n == 1){
				el.scale.setTo(1.05, 1.05)
			}
			if (n == 2){
				el.scale.setTo(1.05, 1.05)
			}
		}

		hoverOut(el:Phaser.Sprite, n:number) {
			if (n == 1){
				el.scale.setTo(1, 1)
			}
			if (n == 2){
				el.scale.setTo(1, 1)
			}		
		}

		restartGame() {
			console.log('.. OR NOT!!!')
			this.game.lives = 9
			this.game.state.start('Level1', true, false);
		}

		showGallery() {
			this.game.state.start('Gallery', true, false)		
		}
	}
}