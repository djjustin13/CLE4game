module MyGame {

	export class LevelThreeComplete extends Phaser.State {
		game:Game
		background: Phaser.Sprite
		button: Phaser.Sprite
		galleryButton: Phaser.Sprite
		life: Phaser.Sprite
		clock: Phaser.Sprite
		piece: Phaser.Sprite
		
		artPieceScoreDisplay:any
		timerDisplay:any
		livesDisplay:any

		create() {
			this.background = this.add.sprite(0, 0, 'levelCompleteBackground');

			// Next level button
			this.button = this.add.sprite((this.game.width/1.5)+50, this.game.height/1.1, 'nextLevelButton')
			this.button.anchor.setTo(0.5, 0.5)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true

			this.button.events.onInputDown.add(() => this.nextLevel())
			this.button.events.onInputOver.add(() => this.hover(this.button, 1))
			this.button.events.onInputOut.add(() => this.hoverOut(this.button, 1))

			// Back to menu button
			this.galleryButton = this.add.sprite((this.game.width/3.5)+50, this.game.height/1.1, 'menuKunstwerkenButton')
            this.galleryButton.anchor.setTo(0.5, 0.5)

            this.galleryButton.inputEnabled = true
            this.galleryButton.input.useHandCursor = true

            this.galleryButton.events.onInputDown.add(() => this.mainMenu())
            this.galleryButton.events.onInputOver.add(() => this.hover(this.galleryButton, 2))
            this.galleryButton.events.onInputOut.add(() => this.hoverOut(this.galleryButton, 2))

			let style = { font: "bold 50px Assistant", fill: "#ffffff" };

			this.artPieceScoreDisplay = this.game.add.text(this.game.width/2, this.game.height/2-70, this.game.artpieces3 + '/4', style)

			this.timerDisplay = this.game.add.text(this.game.width/2, this.game.height/2-20, String(this.game.timer3), style)

			this.livesDisplay = this.game.add.text(this.game.width/2, this.game.height/2+30, String(this.game.lives), style)

			// Loading icons
			this.life = this.add.sprite((this.game.width/2)-50, this.game.height/2+38, 'uiLife')
			this.piece = this.add.sprite((this.game.width/2)-50, this.game.height/2-16, 'uiClock')
			this.clock = this.add.sprite((this.game.width/2)-50, this.game.height/2-70, 'uiPiece')

			this.life.anchor.setTo(0.5, 0)
			this.clock.anchor.setTo(0.5, 0)
			this.piece.anchor.setTo(0.5, 0)


			console.log("level one complete!")
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

		nextLevel() {
			this.game.state.start('GameOver', true, false)
		}

		mainMenu() {
			this.game.state.start('MainMenu', true, false)		
		}
	}
}