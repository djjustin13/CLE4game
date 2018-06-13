module MyGame {

	export class Gallary extends Phaser.State {

		painting1: Phaser.Sprite
		painting2: Phaser.Sprite
        okButton: Phaser.Sprite
		selectedPainting:number = 0

		create() {
            this.add.sprite(0, 0, 'gallaryBackground')
            
			this.painting1 = this.add.sprite(this.world.centerX-56.5, this.world.centerY-50 , 'uiDaliMelt')
            this.painting2 = this.add.sprite(this.world.centerX, this.world.centerY+80 , 'uiDaliSphere')
            this.okButton = this.add.sprite(this.world.centerX, this.world.centerY+215 , 'uiOkButton')

            this.painting1.anchor.setTo(0.5, 0.5)
			this.painting2.anchor.setTo(0.5, 0.5)
			this.okButton.anchor.setTo(0.5, 0.5)

			this.painting1.inputEnabled = true
            this.painting1.input.useHandCursor = true
            this.painting2.inputEnabled = true
            this.painting2.input.useHandCursor = true
            this.okButton.inputEnabled = true
            this.okButton.input.useHandCursor = true

			this.painting1.events.onInputDown.add(() => this.selectPainting(this.painting1, 1))
            this.painting2.events.onInputDown.add(() => this.selectPainting(this.painting2, 2))
            this.okButton.events.onInputDown.add(() => this.mainMenu())

			this.painting1.events.onInputOver.add(() => this.hover(this.painting1))            
            this.painting2.events.onInputOver.add(() => this.hover(this.painting2))

            this.painting1.events.onInputOut.add(() => this.hoverOut(this.painting1))
			this.painting2.events.onInputOut.add(() => this.hoverOut(this.painting2))

			console.log("gallary of gallaries")
		}

		selectPainting(el:Phaser.Sprite, n:number) {


            if (Math.random() < 0.33) {
                console.log('such amazing art')
            } else if (Math.random() > 0.33 && Math.random() < 0.66) {
                console.log('very wow') 
            } else {
                console.log('so talented')
            }
        }
        
        mainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
	}
}