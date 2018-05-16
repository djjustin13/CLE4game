module MyGame {

	export class Level1 extends Phaser.State {
		background: Phaser.TileSprite
		ground: Phaser.TileSprite
		ledge: Phaser.Sprite
		player: MyGame.Player
		platforms: Phaser.Group
		artPiece: Phaser.Group
		enemy: Phaser.Group


		create() {
			let h = this.game.world.height
			this.game.world.setBounds(0, 0, 6000, 600);
			this.background = this.add.tileSprite(0, 0, this.world.width, 600, 'bgTile')

			// Creation of platforms: ground, platforms, ledges e.d.
			this.platforms = this.add.group()
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

			// Creation of Puzzle pieces
			this.artPiece = this.add.group()
			this.artPiece.enableBody = true
			for (var i = 0; i < 4; i++) {
				this.artPiece.create(250+100*i, this.world.height-90, 'artPiece')
			}
			this.game.physics.arcade.enable(this.artPiece);


			// Creation of Enemies
			this.enemy = this.add.group()
			this.enemy.enableBody = true
			this.enemy = this.enemy.create(260, 360, 'eye');
			this.game.physics.arcade.enable(this.enemy);


			// Creation of the player
			this.player = new Player(this.game, 130, 284);
			this.game.camera.follow(this.player)
		}

		update(){
			this.physics.arcade.collide(this.player, this.platforms)
			this.physics.arcade.collide(this.player, this.ground)
			this.physics.arcade.collide(this.player, this.enemy)
			this.physics.arcade.collide(this.platforms, this.artPiece)
			this.physics.arcade.overlap(this.player, this.artPiece, () => this.collectArtPiece())

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
				this.resetLevel()
			}

		}
		
		resetLevel(){
			this.game.state.start('Level1', true, false);
		}

		collectArtPiece(){
			this.artPiece.kill();
		}
	}

} 