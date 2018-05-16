module MyGame {

	export class Level1 extends Phaser.State {
		background: Phaser.Sprite
		ground: Phaser.Sprite
		ledge: Phaser.Sprite
		player: MyGame.Player
		platforms: Phaser.Group
		enemy: Phaser.Group


		create() {
			this.game.world.setBounds(0, 0, 6000, 600);
			this.background = this.add.sprite(0, 0, 'level1')
			this.background.width = this.game.width
			this.background.height = this.game.height

			// Creation of platforms: ground, platforms, ledges e.d.
			this.platforms = this.add.group()
			this.platforms.enableBody = true

			this.ground = this.platforms.create(0, this.world.height - 64, 'ground')
			
			this.ground.body.immovable = true
			this.ground.scale.setTo(2, 2)

			this.ledge = this.platforms.create(400, 400, 'ground')
			this.ledge.body.immovable = true
			this.ledge = this.platforms.create(-150, 250, 'ground')
			this.ledge.body.immovable = true

			// Creation of Enemies
			this.enemy = this.add.group()
			this.enemy.enableBody = true

			this.enemy = this.enemy.create(260, 360, 'eye');
			this.game.physics.arcade.enable(this.enemy);

			// Creation of the player
			this.player = new Player(this.game, 130, 284);
			this.game.physics.arcade.enable(this.player);

			this.game.camera.follow(this.player);
			console.log("level started")
		}

		update(){
			this.physics.arcade.collide(this.player, this.platforms);
			this.physics.arcade.collide(this.player, this.enemy);
		}
	}

} 