module MyGame {

	export class Level1 extends Phaser.State {
		background: Phaser.TileSprite
		ground: Phaser.TileSprite
		ledge: Phaser.Group
		player: MyGame.Player
		platforms: Phaser.Group
		artPieces: Phaser.Group
		enemies: Phaser.Group
		eye: MyGame.EnemyEye
		elephant1: any
		elephant2: any
		spikes: Phaser.Group
		timerSec:number = 0
		timerMin:number = 0
		endTile: Phaser.Sprite

		artPieceScore: number = 0
		artPieceScoreDisplay: any
		timerDisplay: any
		livesDisplay: any

		create() {
			let h = this.game.world.height
			this.game.world.setBounds(0, 0, 6000, 600);
			this.background = this.add.tileSprite(0, 0, this.world.width, 600, 'bgTile')

			// Creation of platforms: ground, platforms, ledges e.d.
			this.platforms = this.add.group()
			this.platforms.enableBody = true
			
			//start level
			this.ground = this.add.tileSprite(0, h-32, this.world.width, 32, 'platformTile')
			this.game.physics.arcade.enableBody(this.ground)
			this.ground.body.collideWorldBounds = true;
			this.ground.body.immovable = true;
			this.ground.body.allowGravity = false;

			this.ledge = this.add.group()
			this.ledge.add(new Platform(this.game, 400, h-64));
			this.ledge.add(new Platform(this.game, 800, h-64));
			this.ledge.add(new Platform(this.game, 800, h-96));
			this.ledge.add(new Platform(this.game, 800, h-98));
			this.ledge.add(new Platform(this.game, 1050, h-64));
			this.ledge.add(new Platform(this.game, 1050, h-96));
			this.ledge.add(new Platform(this.game, 1050, h-128));
			this.ledge.add(new Platform(this.game, 1600, 400));
			this.ledge.add(new Platform(this.game, 1900, 360));
			this.ledge.add(new Platform(this.game, 2300, 360));
			this.ledge.add(new Platform(this.game, 2705, h-64));
			this.ledge.add(new Platform(this.game, 2705, h-96));
			this.ledge.add(new Platform(this.game, 3105, h-64));
			this.ledge.add(new Platform(this.game, 3105, h-96));
			this.ledge.add(new Platform(this.game, 3523, h-75));
			this.ledge.add(new Platform(this.game, 4325, h-96));
			this.ledge.add(new Platform(this.game, 4482, h-96));
			this.ledge.add(new Platform(this.game, 4639, h-96));


			// Creation of singular spikes
			this.spikes = this.add.group()
			this.spikes.add(new Spikes(this.game, 960, h-69));
		

			// Creation of spiked floor
			for(let i = 0; i < 15; i++){
				this.spikes.add(new Spikes(this.game, 1400 + i * 87, h-69));
			}
			for(let i = 0; i < 3; i++){
				this.spikes.add(new Spikes(this.game, 3265 + i * 87, h-69));
			}
			for(let i = 0; i < 20; i++){
				this.spikes.add(new Spikes(this.game, 3800 + i * 87, h-69));
			}

			// Creation of puzzle pieces
			this.artPieces = this.add.group()
			this.artPieces.add(new ArtPiece(this.game, 1650, 100));
			this.artPieces.add(new ArtPiece(this.game, 2600, 225));
			this.artPieces.add(new ArtPiece(this.game, 3650, 150));
			this.artPieces.add(new ArtPiece(this.game, 4150, 100));
			//end level

			// Creation of Enemies
			this.enemies = this.add.group()
			let enemy = this.enemies.add(new Enemy(this.game, 2900, h-100));

			// Creation of Eye
			//this.eye = new EnemyEye(this.game, 570, 150);

			// Creation of the Player
			this.player = new Player(this.game, 130, 400);
			// this.player = new Player(this.game, 2750, 400);

			this.game.camera.follow(this.player)

			// Creation of Elephant
			//this.elephant = new Elephant(this.game, 650, this.world.height - this.ground.height)
			this.elephant1 = new Elephant(this.game, 1350, this.world.height - this.ground.height);
			this.elephant2 = new Elephant(this.game, 3750, this.world.height - this.ground.height);

			// Creation of End-tile
			this.endTile = new EndTile(this.game, 4750, h-150);

			// Creation on UI
			let ui:Phaser.Sprite = this.add.sprite(this.game.width, 0, 'uiBase');
			ui.anchor.setTo(1, 0)
			ui.fixedToCamera = true;

			// Creation of text
			let style = { font: "20px Arial", fill: "#ffffff" };

			this.artPieceScoreDisplay = this.game.add.text(16, 16, '0/4', style);
			this.artPieceScoreDisplay.x = this.game.width - 300
			this.artPieceScoreDisplay.fixedToCamera = true;

			this.timerDisplay = this.game.add.text(16, 16, "00:00", style);
			this.timerDisplay.x = this.game.width - 210
			this.timerDisplay.fixedToCamera = true;

			this.livesDisplay = this.game.add.text(16, 16, String(this.player.lives), style);
			this.livesDisplay.x = this.game.width - 90
			this.livesDisplay.fixedToCamera = true;
		

			this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
		}

		update(){
			// Platform collision
			this.physics.arcade.collide(this.enemies, this.platforms);
			this.physics.arcade.collide(this.enemies, this.ground);
			this.physics.arcade.collide(this.platforms, this.artPieces);
			this.physics.arcade.collide(this.ground, this.artPieces);
			this.physics.arcade.collide(this.player, this.ledge);
			this.physics.arcade.collide(this.artPieces, this.ledge);

			// Player collision
			this.physics.arcade.collide(this.player, this.platforms);
			this.physics.arcade.collide(this.player, this.ground);
			this.physics.arcade.collide(this.player, this.elephant1);
			this.physics.arcade.overlap(this.player, this.elephant1.airflow, () => this.player.fly(), null, this);
			this.physics.arcade.collide(this.player, this.elephant2);
			this.physics.arcade.overlap(this.player, this.elephant2.airflow, () => this.player.fly(), null, this);
			this.physics.arcade.overlap(this.player, this.enemies, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.eye, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.spikes, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.artPieces, this.collectArtPiece, null, this);
			this.physics.arcade.overlap(this.player, this.endTile, this.completeLevelCheck, null, this);

			this.livesDisplay.text = String(this.player.lives)

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
				this.resetLevel()
			}
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)){
				this.completeLevel()
			}
		}

		updateTimer(){
			let secText:string = ""
			let minText:string = ""
			this.timerSec++
			if (this.timerSec == 60){
				this.timerSec = 0
				this.timerMin++
			}
			if(this.timerSec < 10){
				secText = "0"+this.timerSec
			}else{
				secText = String(this.timerSec)
			}

			if(this.timerMin < 10){
				minText = "0"+this.timerMin
			}
			else{
				minText = String(this.timerMin)
			}
			let timerText:string = minText+":"+secText
			this.timerDisplay.text = timerText;
		}
		
		resetLevel(){
			this.game.state.start('Level1', true, false);
		}

		completeLevelCheck(){
			if (this.artPieceScore == this.artPieces.length) {
				this.completeLevel()
				console.log("level complete, such amaze")
			} else {
				console.log("needs more pieces")
			}
		}

		completeLevel(){
			this.game.state.start('LevelComplete', true, false);
		}
	
		collectArtPiece(player:Player, artPiece:ArtPiece){
			artPiece.kill()
			if(this.eye){
				this.eye.follow(player.position.x, player.position.y)
			}
			this.artPieceScore += 1;
			this.artPieceScoreDisplay.text = this.artPieceScore + '/4';
		}
	}
} 