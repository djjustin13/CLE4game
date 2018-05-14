module MyGame {

	export class Level1 extends Phaser.State {
		background: Phaser.Sprite
		ground: Phaser.Sprite
		ledge: Phaser.Sprite


		create() {
			this.background = this.add.sprite(0, 0, 'level1')
			this.background.width = this.game.width
			this.background.height = this.game.height

			let platforms = this.add.group()
			platforms.enableBody = true

			this.ground = platforms.create(0, this.world.height - 64, 'ground')
			
			this.ground.body.immovable = true
			this.ground.scale.setTo(2, 2)

			this.ledge = platforms.create(400, 400, 'ground')
			this.ledge.body.immovable = true
			this.ledge = platforms.create(-150, 250, 'ground')
			this.ledge.body.immovable = true



			console.log("level started")
		}

	}

} 