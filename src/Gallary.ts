module MyGame {

	export class Gallary extends Phaser.State {

		painting1: Phaser.Sprite
		painting2: Phaser.Sprite
		painting3: Phaser.Sprite
		selectedPainting:number = 0

		create() {
			this.add.sprite(0, 0, 'uiBackground')

			this.add.sprite(this.world.centerX, 45, 'menuTitle').anchor.setTo(0.5, 0.5)

			this.painting1 = this.add.sprite(this.world.centerX-245, this.world.centerY , '')
			this.painting2 = this.add.sprite(this.world.centerX, this.world.centerY , '')
			this.painting3 = this.add.sprite(this.world.centerX+245, this.world.centerY , '')

			this.painting1.anchor.setTo(0.5, 0.5)
			this.painting1.anchor.setTo(0.5, 0.5)
			this.painting1.anchor.setTo(0.5, 0.5)

			this.painting1.inputEnabled = true
			this.painting1.input.useHandCursor = true;

			this.painting1.events.onInputDown.add(() => this.selectPainting(this.painting1, 1))
			this.painting1.events.onInputOver.add(() => this.hover(this.painting1))
			this.painting1.events.onInputOut.add(() => this.hoverOut(this.painting1))

			console.log("menu state")
		}

		hover(el:Phaser.Sprite){
			if(el == this.painting1){
				if(this.selectedPainting != 0)el.animations.frame = 2
			}else{
				el.scale.setTo(1.05, 1.05)
				el.animations.frame = 1
			}			
		}

		hoverOut(el:Phaser.Sprite){
			if(el == this.painting1){
				if(this.selectedLevel == 0){
					el.animations.frame = 0
				}else{
					el.animations.frame = 1
				}
			}else{
				if(this.selectedLevel == 0)el.animations.frame = 0
				el.scale.setTo(1, 1)
            }			
		}

		// selectLevel(el:Phaser.Sprite, n:number){
		// 	if(this.selectedLevel == n){
		// 		this.selectedLevel = 0
		// 		this.goButton.animations.frame = 0
		// 	}else{
		// 		this.goButton.animations.frame = 1
		// 		el.animations.frame = 1
		// 		this.selectedLevel = n
		// 	}
		// }

		// startGame() {
		// 	if(this.selectedLevel != 0)this.game.state.start('Level1', true, false, 'test123');
		// }

		selectPainting() {
			console.log('such amazing art')
		}
	}
}