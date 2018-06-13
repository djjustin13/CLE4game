module MyGame {

	export class Gallary extends Phaser.State {

		ui_painting1: Phaser.Sprite
        ui_painting2: Phaser.Sprite
        painting1: Phaser.Sprite
        painting2: Phaser.Sprite
        
        okButton: Phaser.Sprite
		selectedPainting:number = 0

		create() {
            this.add.sprite(0, 0, 'uiBackground')
            this.add.sprite(0, 0, 'gallaryBackground')
            
			this.ui_painting1 = this.add.sprite(this.world.centerX-56.5, this.world.centerY-50 , 'uiDaliMelt')
            this.ui_painting2 = this.add.sprite(this.world.centerX, this.world.centerY+80 , 'uiDaliSphere')
            this.okButton = this.add.sprite(this.world.centerX, this.world.centerY+215 , 'uiOkButton')

            this.ui_painting1.anchor.setTo(0.5, 0.5)
			this.ui_painting2.anchor.setTo(0.5, 0.5)
			this.okButton.anchor.setTo(0.5, 0.5)

			this.ui_painting1.inputEnabled = true
            this.ui_painting1.input.useHandCursor = true
            this.ui_painting2.inputEnabled = true
            this.ui_painting2.input.useHandCursor = true
            this.okButton.inputEnabled = true
            this.okButton.input.useHandCursor = true

			this.ui_painting1.events.onInputDown.add(() => this.selectPainting(this.ui_painting1, 1))
            this.ui_painting2.events.onInputDown.add(() => this.selectPainting(this.ui_painting2, 2))
            this.okButton.events.onInputDown.add(() => this.mainMenu())

			this.ui_painting1.events.onInputOver.add(() => this.hoverOn(this.ui_painting1, 1))            
            this.ui_painting2.events.onInputOver.add(() => this.hoverOn(this.ui_painting2, 2))
            this.okButton.events.onInputOver.add(() => this.hoverOn(this.okButton, 3))

            this.ui_painting1.events.onInputOut.add(() => this.hoverOut(this.ui_painting1, 1))
            this.ui_painting2.events.onInputOut.add(() => this.hoverOut(this.ui_painting2, 2))
            this.okButton.events.onInputOver.add(() => this.hoverOut(this.okButton, 3))


			console.log("gallary of gallaries")
		}

		selectPainting(el:Phaser.Sprite, n:number) {

            if (n == 1) {
                this.painting1 = this.add.sprite(this.world.centerX, this.world.centerY , 'daliMelt')
                this.painting1.anchor.setTo(0.5, 0.5)
            }
            if (n == 2) {
                this.painting2 = this.add.sprite(this.world.centerX, this.world.centerY , 'daliSphere')
                this.painting2.anchor.setTo(0.5, 0.5)
            }

            if (Math.random() < 0.33) {
                console.log('such amazing art')
            } else if (Math.random() > 0.33 && Math.random() < 0.66) {
                console.log('very wow') 
            } else {
                console.log('so talented')
            }
        }

        hoverOn(el:Phaser.Sprite, n:number) {
            if (n == 1) {
                el.scale.setTo(1.05, 1.05)
            }
            if (n == 2) {
                el.scale.setTo(1.05, 1.05)
            }
            if (n == 3) {
                el.scale.setTo(1.05, 1.05)
            }
        }

        hoverOut(el:Phaser.Sprite, n:number) {
            if (n == 1) {
                el.scale.setTo(1, 1)
            }
            if (n == 2) {
                el.scale.setTo(1, 1)
            }
            if (n == 3) {
                el.scale.setTo(1, 1)
            }
        }
        
        mainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
	}
}