module MyGame {

	export class Level1 extends Phaser.State {
		background: Phaser.TileSprite
		ground: Phaser.TileSprite
		ledge: Phaser.Sprite
		player: MyGame.Player
		platforms: Phaser.Group
		objects: Phaser.Group
		enemy: Phaser.Group


		create() {
			let h = this.game.world.height
			this.game.world.setBounds(0, 0, 6000, 600)
			this.background = this.add.tileSprite(0, 0, this.world.width, 600, 'bgTile')

			// Creation of platforms: ground, platforms, ledges e.d.
			this.platforms = this.game.add.physicsGroup()
			this.platforms.enableBody = true
			
			this.ground = this.add.tileSprite(0, h-32, this.world.width, 32, 'platformTile')
			this.game.physics.arcade.enableBody(this.ground)
			this.ground.body.collideWorldBounds = true;
			this.ground.body.immovable = true;
			this.ground.body.allowGravity = false;

			this.ledge = this.platforms.create(400, h-120, 'ground')
			this.ledge.body.immovable = true
			this.ledge = this.platforms.create(0, 400, 'ground')
			this.ledge.body.immovable = true

			this.objects = this.add.group()
			this.objects.create(600 ,h-80, 'item')
			
			// Creation of Enemies
			this.enemy = this.add.group()
			this.enemy.enableBody = true

			this.enemy = this.enemy.create(260, 360, 'eye');
			this.game.physics.arcade.enable(this.enemy);

			// Creation of the player
			this.player = new Player(this.game, 30, 284);
			this.game.physics.arcade.enable(this.player);

			this.game.camera.follow(this.player)
			console.log("level started")
		}

		update(){
			this.physics.arcade.collide(this.player, this.platforms)
			this.physics.arcade.collide(this.player, this.ground)
			this.physics.arcade.collide(this.player, this.enemy)
		}
	}

} 