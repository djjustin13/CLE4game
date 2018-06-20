module MyGame {

	export class MainMenu extends Phaser.State {

		dali: Phaser.Sprite
		rembrandt: Phaser.Sprite
		picasso: Phaser.Sprite
		goButton: Phaser.Sprite
		kunstwerkenButton: Phaser.Sprite
		selectedLevel:number = 0
		game:Game

		create() {
			this.add.sprite(0, 0, 'uiBackground')

			this.add.sprite(500, 45, 'menuTitle').anchor.setTo(0.5, 0.5)
			// Character selection
			this.dali = this.add.sprite(500-245, 300, 'daliButton')
			this.rembrandt = this.add.sprite(500, 300 , 'locked1')
			this.picasso = this.add.sprite(500+245, 300 , 'locked2')
			// Button sprites
			this.goButton = this.add.sprite(500+235, this.game.height-60 , 'menuGoButton')
			this.kunstwerkenButton = this.add.sprite(500-245-107, this.game.height-60 , 'menuKunstwerkenButton')
			// Character position
			this.dali.anchor.setTo(0.5, 0.5)
			this.rembrandt.anchor.setTo(0.5, 0.5)
			this.picasso.anchor.setTo(0.5, 0.5)
			// Button position
			this.goButton.anchor.setTo(0.5, 0.5)

			this.kunstwerkenButton.anchor.setTo(0.0, 0.5)

			this.dali.inputEnabled = true
			this.dali.input.useHandCursor = true;

			this.goButton.inputEnabled = true
			this.goButton.input.useHandCursor = true

			this.kunstwerkenButton.inputEnabled = true
			this.kunstwerkenButton.input.useHandCursor = true;
			// Button inputs
			this.dali.events.onInputDown.add(() => this.selectLevel(this.dali, 1))
			this.dali.events.onInputOver.add(() => this.hover(this.dali))
			this.dali.events.onInputOut.add(() => this.hoverOut(this.dali))

			this.goButton.events.onInputDown.add(() => this.startGame())
			this.goButton.events.onInputOver.add(() => this.hover(this.goButton))
			this.goButton.events.onInputOut.add(() => this.hoverOut(this.goButton))

			this.kunstwerkenButton.events.onInputDown.add(() => this.showGallary())
			this.kunstwerkenButton.events.onInputOver.add(() => this.hover(this.kunstwerkenButton))
			this.kunstwerkenButton.events.onInputOut.add(() => this.hoverOut(this.kunstwerkenButton))
		}

		hover(el:Phaser.Sprite){
			if(el == this.dali){
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
			// starting the correct level according to gameprogression
			// WARNING: as of right now, level one starts below 0 and level 3 above 2 aswell, make sure to change
			// when extending levels
			if (this.selectedLevel != 0){
				if (this.game.gameprogression <= 0)
				{
					this.game.state.start('Level1', true, false)
				}

				if (this.game.gameprogression == 1)
				{
					this.game.state.start('Level2', true, false)
				}

				if (this.game.gameprogression >= 2)
				{
					this.game.state.start('GameOver', true, false)
				}
			}
		}

		showGallary() {
			this.game.state.start('Gallery', true, false);
		}
	}
}