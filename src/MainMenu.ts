module MyGame {

	export class MainMenu extends Phaser.State {

		level1: Phaser.Sprite
		level2: Phaser.Sprite
		level3: Phaser.Sprite
		goButton: Phaser.Sprite
		kunstwerkenButton: Phaser.Sprite
		selectedLevel:number = 0

		create() {
			this.add.sprite(0, 0, 'uiBackground')

			this.add.sprite(this.world.centerX, 45, 'menuTitle').anchor.setTo(0.5, 0.5)

			this.level1 = this.add.sprite(this.world.centerX-245, this.world.centerY , 'daliButton')
			this.level2 = this.add.sprite(this.world.centerX, this.world.centerY , 'locked1')
			this.level3 = this.add.sprite(this.world.centerX+245, this.world.centerY , 'locked2')

			this.goButton = this.add.sprite(this.world.centerX+235, this.game.height-60 , 'menuGoButton')
			this.kunstwerkenButton = this.add.sprite(this.world.centerX-245-107, this.game.height-60 , 'menuKunstwerkenButton')

			this.level1.anchor.setTo(0.5, 0.5)
			this.level2.anchor.setTo(0.5, 0.5)
			this.level3.anchor.setTo(0.5, 0.5)

			this.goButton.anchor.setTo(0.5, 0.5)

			this.kunstwerkenButton.anchor.setTo(0.0, 0.5)

			this.level1.inputEnabled = true
			this.level1.input.useHandCursor = true;

			this.goButton.inputEnabled = true
			this.goButton.input.useHandCursor = true

			this.kunstwerkenButton.inputEnabled = true
			this.kunstwerkenButton.input.useHandCursor = true;

			this.level1.events.onInputDown.add(() => this.selectLevel(this.level1, 1))
			this.level1.events.onInputOver.add(() => this.hover(this.level1))
			this.level1.events.onInputOut.add(() => this.hoverOut(this.level1))

			this.goButton.events.onInputDown.add(() => this.startGame())
			this.goButton.events.onInputOver.add(() => this.hover(this.goButton))
			this.goButton.events.onInputOut.add(() => this.hoverOut(this.goButton))

			this.kunstwerkenButton.events.onInputDown.add(() => this.showGallary())
			this.kunstwerkenButton.events.onInputOver.add(() => this.hover(this.kunstwerkenButton))
			this.kunstwerkenButton.events.onInputOut.add(() => this.hoverOut(this.kunstwerkenButton))

			console.log("menu state")
		}

		hover(el:Phaser.Sprite){
			if(el == this.level1){
				el.scale.setTo(1.05, 1.05)
			}
			
			if(el == this.goButton){
				if(this.selectedLevel != 0)el.animations.frame = 2
			}else{
				el.animations.frame = 1
			}
			
		}

		hoverOut(el:Phaser.Sprite){
			if(el == this.goButton){
				if(this.selectedLevel == 0){
					el.animations.frame = 0
				}else{
					el.animations.frame = 1
				}
			}else{
				if(this.selectedLevel == 0)el.animations.frame = 0
				el.scale.setTo(1, 1)
			}

			if (el == this.kunstwerkenButton){
				el.animations.frame = 0
			}
			
		}

		selectLevel(el:Phaser.Sprite, n:number){
			if(this.selectedLevel == n){
				this.selectedLevel = 0
				this.goButton.animations.frame = 0
			}else{
				this.goButton.animations.frame = 1
				el.animations.frame = 1
				this.selectedLevel = n
			}
			
		}

		startGame() {
			if(this.selectedLevel != 0)this.game.state.start('Level1', true, false);
		}

		showGallary() {
			this.game.state.start('Gallary', true, false);
		}
	}
}