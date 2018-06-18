module MyGame {

	export class LevelTwoComplete extends Phaser.State {
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
			this.background = this.add.sprite(0, 0, 'level2Complete');

			// Next level button
			this.button = this.add.sprite((this.game.width/1.5)+85, (this.game.height/1.1)-25, 'uiOkButton')
			this.button.anchor.setTo(0.5, 0.5)

			this.button.inputEnabled = true
			this.button.input.useHandCursor = true

			this.button.events.onInputDown.add(() => this.nextLevel())
			this.button.events.onInputOver.add(() => this.hover(this.button, 1))
			this.button.events.onInputOut.add(() => this.hoverOut(this.button, 1))

			// Back to menu button
			this.galleryButton = this.add.sprite((this.game.width/3.5)+85, (this.game.height/1.1)-25, 'menuKunstwerkenButton')
            this.galleryButton.anchor.setTo(0.5, 0.5)

            this.galleryButton.inputEnabled = true
            this.galleryButton.input.useHandCursor = true

            this.galleryButton.events.onInputDown.add(() => this.gallary())
            this.galleryButton.events.onInputOver.add(() => this.hover(this.galleryButton, 2))
            this.galleryButton.events.onInputOut.add(() => this.hoverOut(this.galleryButton, 2))

			let style = { font: "bold 50px Assistant", fill: "#ffffff" };

			this.artPieceScoreDisplay = this.game.add.text((this.game.width/2)-175, this.game.height/2+110, this.game.artpieces1 + '/4', style)

			this.timerDisplay = this.game.add.text((this.game.width/2)-15, this.game.height/2+110, String(this.game.timer1), style)

			this.livesDisplay = this.game.add.text((this.game.width/2)+170, this.game.height/2+110, String(this.game.lives), style)

			// Loading icons
			this.life = this.add.sprite((this.game.width/2)+140, (this.game.height/2)+117, 'uiLife')
			this.piece = this.add.sprite((this.game.width/2)-60, (this.game.height/2)+100, 'uiClock')
			this.clock = this.add.sprite((this.game.width/2)-215, (this.game.height/2)+112, 'uiPiece')

			// this.life.anchor.setTo(0.5, 0.5)
			// this.clock.anchor.setTo(0.5, 0.5)
			// this.piece.anchor.setTo(0.5, 0.5)
			this.life.anchor.setTo(0.5, 0)
			this.clock.anchor.setTo(0.5, 0)
			this.piece.anchor.setTo(0.5, 0)


			console.log("level two complete!")
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
			this.game.state.start('Level3', true, false)
		}

		gallary() {
			this.game.state.start('GalleryLevel', true, false)		
		}
	}
}