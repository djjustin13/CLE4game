module MyGame {

    export class Ui{
        game: Phaser.Game
        pauseButton:Phaser.Sprite
        pauseBackground:Phaser.Sprite

        homeButton:Phaser.Sprite
        restartButton:Phaser.Sprite

        constructor(g:Phaser.Game){
            this.game = g
            let ui:Phaser.Sprite = this.game.add.sprite(this.game.width, 0, 'uiBase');
            ui.anchor.setTo(1, 0)
            ui.fixedToCamera = true

            this.pauseButton = this.game.add.sprite(0, 0, 'gamePause');
            this.pauseButton.fixedToCamera = true
            this.pauseButton.inputEnabled = true
            this.pauseButton.input.useHandCursor = true;

			this.pauseButton.events.onInputDown.add(() => this.pauseLevel())
			this.pauseButton.events.onInputOver.add(() => this.hover(this.pauseButton))
            this.pauseButton.events.onInputOut.add(() => this.hoverOut(this.pauseButton))
            
            this.game.input.onDown.add(() => this.unPause(), self)

        }

        hover(el:Phaser.Sprite){
			el.scale.setTo(1.05, 1.05)
		}

		hoverOut(el:Phaser.Sprite){
			el.scale.setTo(1, 1)
        }

        pauseLevel(){
            this.game.paused = true
            this.pauseBackground = this.game.add.sprite(this.game.camera.x, this.game.camera.y, 'pauseBackground');
            this.pauseBackground.fixedToCamera = true
            
            this.restartButton = this.game.add.sprite(this.game.width/2-50, this.game.height/2+100, 'pauseRestart');
            this.restartButton.fixedToCamera = true
            this.restartButton.inputEnabled = true
            this.restartButton.input.useHandCursor = true;
            this.restartButton.anchor.setTo(0.5, 0.5)

            this.homeButton = this.game.add.sprite(this.game.width/2+50, this.game.height/2+100, 'pauseHome');
            this.homeButton.fixedToCamera = true
            this.homeButton.inputEnabled = true
            this.homeButton.input.useHandCursor = true;
            this.homeButton.anchor.setTo(0.5, 0.5)
        }

        unPause(){
            if(this.game.paused == true){
                this.game.paused = false
                this.pauseBackground.kill()
                this.homeButton.kill()
                this.restartButton.kill()
            }
        }
    }
}