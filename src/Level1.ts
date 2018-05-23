module MyGame {

	export class Level1 extends Phaser.State {
		background: Phaser.TileSprite
		ground: Phaser.TileSprite
		ledge: Phaser.Sprite
		player: MyGame.Player
		platforms: Phaser.Group
		artPieces: Phaser.Group
		enemys: Phaser.Group
		eye: MyGame.EnemyEye
		spike: MyGame.Spikes

		artPieceScore: number = 0
		artPieceScoreDisplay: any

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
			
			this.spike = new Spikes(this.game, 200, 200);

			// Creation of Puzzle pieces
			this.artPieces = this.add.group()
			this.artPieces.enableBody = true
			for (var i = 0; i < 4; i++) {
				let artPiece = this.artPieces.add(new ArtPiece(this.game, 250*i+1, 100))
			}

			// Creation of Enemies
			this.enemys = this.add.group()
			let e = this.enemys.add(new Enemy(this.game, 300, 200));

			// Creation of Eye
			this.eye = new EnemyEye(this.game, 570, 150);

			// Creation of the player
			this.player = new Player(this.game, 130, 284);
			this.game.camera.follow(this.player)

			// Creation of text
			this.artPieceScoreDisplay = this.game.add.text(16, 16, '0/4');
			this.artPieceScoreDisplay.x = this.game.width - 100
		}

		update(){
			this.physics.arcade.collide(this.player, this.platforms)
			this.physics.arcade.collide(this.player, this.ground)
			this.physics.arcade.overlap(this.player, this.enemys, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.eye, () => this.player.spawn(), null, this);
			this.physics.arcade.collide(this.enemys, this.platforms)
			this.physics.arcade.collide(this.enemys, this.ground)
			this.physics.arcade.collide(this.platforms, this.artPieces)
			this.physics.arcade.collide(this.ground, this.artPieces)
			this.physics.arcade.overlap(this.player, this.artPieces, this.collectArtPiece, null, this);
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
				this.resetLevel()
			}
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)){
				this.completeLevel()
			}

		}
		
		resetLevel(){
			this.game.state.start('Level1', true, false);
		}

		completeLevel(){
			this.game.state.start('MainMenu', true, false);
		}
	
		collectArtPiece(player:Player, artPiece:ArtPiece){
			artPiece.kill()
			this.eye.follow(player.position.x, player.position.y)
			this.artPieceScore += 1;
			this.artPieceScoreDisplay.text = this.artPieceScore + '/4';
			
		}
	}

} 