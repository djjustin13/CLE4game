module MyGame {

	export class Gallery extends Phaser.State {
        game:Game
        ui_locked1: Phaser.Sprite
        ui_locked2: Phaser.Sprite
		ui_painting1: Phaser.Sprite
        ui_painting2: Phaser.Sprite
        painting1: Phaser.Sprite
        painting2: Phaser.Sprite

        selectedPainting: Phaser.Sprite
        
        okButton: Phaser.Sprite

		create() {
            this.add.sprite(0, 0, 'uiBackground')
            this.add.sprite(0, 0, 'galleryBackground')

            if (this.game.gameprogression <= 0) {
                this.ui_locked1 = this.add.sprite(500, 300-50 , 'uiArtLocked')
                this.ui_locked2 = this.add.sprite(500, 300+80 , 'uiArtLocked')

                this.ui_locked1.anchor.setTo(0.5, 0.5)
                this.ui_locked2.anchor.setTo(0.5, 0.5)

                this.game.gameprogression = 0
            }
            
            if (this.game.gameprogression == 1) {
                this.ui_painting1 = this.add.sprite(500-75.5, 300-50 , 'uiDaliMelt')
                this.ui_locked2 = this.add.sprite(500, 300+80 , 'uiArtLocked')

                this.ui_painting1.anchor.setTo(0.5, 0.5)
                this.ui_locked2.anchor.setTo(0.5, 0.5)

                this.ui_painting1.inputEnabled = true
                this.ui_painting1.input.useHandCursor = true

                this.ui_painting1.events.onInputDown.add(() => this.selectPainting(this.ui_painting1, 1))
                this.ui_painting1.events.onInputOver.add(() => this.hoverOn(this.ui_painting1))    
                this.ui_painting1.events.onInputOut.add(() => this.hoverOut(this.ui_painting1))

                this.game.gameprogression = 1
            }

            if (this.game.gameprogression >= 2) {
                this.ui_painting1 = this.add.sprite(500-56.5, 300-50 , 'uiDaliMelt')
                this.ui_painting2 = this.add.sprite(500, 300+80 , 'uiDaliSphere')

                this.ui_painting1.anchor.setTo(0.5, 0.5)
                this.ui_painting2.anchor.setTo(0.5, 0.5)

                this.ui_painting1.inputEnabled = true
                this.ui_painting1.input.useHandCursor = true
                this.ui_painting2.inputEnabled = true
                this.ui_painting2.input.useHandCursor = true

                this.ui_painting1.events.onInputDown.add(() => this.selectPainting(this.ui_painting1, 1))
                this.ui_painting1.events.onInputOver.add(() => this.hoverOn(this.ui_painting1))    
                this.ui_painting1.events.onInputOut.add(() => this.hoverOut(this.ui_painting1))
                this.ui_painting2.events.onInputDown.add(() => this.selectPainting(this.ui_painting2, 2))
                this.ui_painting2.events.onInputOver.add(() => this.hoverOn(this.ui_painting2))
                this.ui_painting2.events.onInputOut.add(() => this.hoverOut(this.ui_painting2))

                this.game.gameprogression = 2
            }
            
            this.okButton = this.add.sprite(500, 300+215 , 'uiOkButton')

            this.okButton.anchor.setTo(0.5, 0.5)

            this.okButton.inputEnabled = true
            this.okButton.input.useHandCursor = true

            this.okButton.events.onInputDown.add(() => this.mainMenu())
            this.okButton.events.onInputOver.add(() => this.hoverOn(this.okButton))
            this.okButton.events.onInputOut.add(() => this.hoverOut(this.okButton))

            this.game.input.onDown.add(this.unPause.bind(this), self)

			console.log("gallery of galleries")
		}

		selectPainting(el:Phaser.Sprite, n:number) {
            if(this.game.paused ==  false){
                if (n == 1) {
                    this.painting1 = this.add.sprite(500, 300 , 'daliMelt')
                    this.painting1.anchor.setTo(0.5, 0.5)
                    this.selectedPainting = this.painting1
                    this.game.paused = true
                }
                if (n == 2) {
                    this.painting2 = this.add.sprite(500, 300, 'daliSphere')
                    this.painting2.anchor.setTo(0.5, 0.5)
                    this.selectedPainting = this.painting2
                    this.game.paused = true
                }
                if(this.ui_painting1)this.ui_painting1.input.useHandCursor = false
                if(this.ui_painting2)this.ui_painting2.input.useHandCursor = false

                if (Math.random() < 0.33) {
                    console.log('such amazing art')
                } else if (Math.random() > 0.33 && Math.random() < 0.66) {
                    console.log('very wow') 
                } else {
                    console.log('so talented')
                }
            }
        }

        hoverOn(el:Phaser.Sprite) {
            if(this.game.paused ==  false){
                el.scale.setTo(1.05, 1.05)
            }
        }

        hoverOut(el:Phaser.Sprite) {
            if(this.game.paused == false){
                el.scale.setTo(1, 1)
            }
        }
        
        mainMenu() {
            this.game.state.start('MainMenu', true, false);
        }

        unPause(event:any){
            if(this.selectedPainting){
                var x1 = 320, x2 = 666,
                y1 = 20, y2 = 300
                if((event.x < x1 || event.x > x2) || (event.y < y1 || event.y > y2)){
                    this.game.paused = false
                    this.selectedPainting.kill()
                    if(this.ui_painting1)this.ui_painting1.input.useHandCursor = true
                    if(this.ui_painting2)this.ui_painting2.input.useHandCursor = true

                }else{
                    this.clickImage(this.selectedPainting)
                }
            }
        }

        clickImage(el:Phaser.Sprite){
            //Do something..
        }
	}
}