module MyGame {

	export class MainMenu extends Phaser.State {

		level1: Phaser.Sprite
		goButton: Phaser.Sprite
		selectedLevel:number = 0

		create() {
			
			this.level1 = this.add.sprite(200, this.world.centerY-50 , 'levelButton')
			this.goButton = this.add.sprite(this.game.width-200, this.game.height-120 , 'menuGoButton')


			this.level1.anchor.setTo(0.5, 0.5)
			this.goButton.anchor.setTo(0.5, 0.5)

			this.level1.inputEnabled = true
			this.level1.input.useHandCursor = true;

			this.goButton.inputEnabled = true
			this.goButton.input.useHandCursor = true;

			this.level1.events.onInputDown.add(() => this.selectLevel(this.level1, 1))
			this.level1.events.onInputOver.add(() => this.hover(this.level1))
			this.level1.events.onInputOut.add(() => this.hoverOut(this.level1))

			this.goButton.events.onInputDown.add(() => this.startGame())
			this.goButton.events.onInputOver.add(() => this.hover(this.goButton))
			this.goButton.events.onInputOut.add(() => this.hoverOut(this.goButton))

			console.log("menu state")
		}

		hover(el:Phaser.Sprite){
			el.scale.setTo(1.05, 1.05)
		}

		hoverOut(el:Phaser.Sprite){
			el.scale.setTo(1, 1)
		}

		selectLevel(el:Phaser.Sprite, n:number){
			el.tint = 0xff00ff;
			this.selectedLevel = n
		}

		startGame() {
			if(this.selectedLevel == 1){
				this.game.state.start('Level1', true, false);
			}
		}
	}
}