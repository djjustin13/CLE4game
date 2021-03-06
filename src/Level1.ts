module MyGame {

	export class Level1 extends Phaser.State {
		game:Game
		trees: Phaser.Group
		endTile: Phaser.Sprite
		background: Phaser.TileSprite
		bgElephant: Phaser.Group
		ground: Phaser.TileSprite
		ledge: Phaser.Group
		player: MyGame.Player
		platforms: Phaser.Group
		artPieces: Phaser.Group
		enemies: Phaser.Group
		eye: MyGame.EnemyEye
		elephant1: any
		elephant2: any
		longlegs1: LongLegs
		longlegs2: LongLegs
		spikes: Phaser.Group
		timerSec:number = 0
		timerMin:number = 0
		dynamicLedge:any
		ui: UI

		artPieceScore: number = 0
		artPieceScoreDisplay: any
		timerDisplay: any
		livesDisplay: any

		create() {
			let h = this.game.world.height
			this.game.world.setBounds(0, 0, 9000, 600);
			this.background = this.add.tileSprite(0, 0, this.world.width, 600, 'bgTile')

			// TODO: make elephant not look shite
			this.bgElephant = this.add.group()
			for (let i = 0; i < 2; i++)
			{
				// this.bgElephant.add(new ElephantBackGround(this.game, 2000 * Math.random() + i * (2000+Math.random()*6000), h))
			}

			// Creation of platforms: ground, platforms, ledges e.d.
			this.platforms = this.add.group()
			this.platforms.enableBody = true

			//start level
			this.ground = this.add.tileSprite(0, h-32, this.world.width, 32, 'platformTile')
			this.game.physics.arcade.enableBody(this.ground)
			this.ground.body.collideWorldBounds = true;
			this.ground.body.immovable = true;
			this.ground.body.allowGravity = false;

			// Creation of scenery
			this.trees = this.add.group()
			for (let i = 0; i < 25; i++)
			{
				this.trees.add(new Tree(this.game, 1500 + i * (500+Math.random()*350), h-this.ground.height))	
			}

			// creation of tutorial-sign
			let tutSign = this.game.add.sprite(250-170/2, h-213-this.ground.height, 'tutorialSign')

			// Creation of End-tile
			this.endTile = new EndTile(this.game, 8888, 357);

			this.ledge = this.add.group()
			this.ledge.add(new Platform(this.game, 400, h-64));
			this.ledge.add(new Platform(this.game, 800, h-64));
			this.ledge.add(new Platform(this.game, 800, h-91));
			this.ledge.add(new Platform(this.game, 1050, h-64));
			this.ledge.add(new Platform(this.game, 1050, h-91));
			this.ledge.add(new Platform(this.game, 1050, h-118));
			this.ledge.add(new Platform(this.game, 1600, 400));
			this.ledge.add(new Platform(this.game, 1900, 360));
			this.ledge.add(new Platform(this.game, 2300, 360));
			this.ledge.add(new Platform(this.game, 2705, h-64));
			this.ledge.add(new Platform(this.game, 2705, h-91));
			this.ledge.add(new Platform(this.game, 3105, h-64));
			this.ledge.add(new Platform(this.game, 3105, h-91));
			this.ledge.add(new Platform(this.game, 3523, h-64));
			this.ledge.add(new Platform(this.game, 3523, h-91));
			this.ledge.add(new Platform(this.game, 3523, h-118));
			this.ledge.add(new Platform(this.game, 4325, h-96));
			this.ledge.add(new Platform(this.game, 4482, h-96));
			this.ledge.add(new Platform(this.game, 4639, h-96));
			this.ledge.add(new Platform(this.game, 5000, 500));
			this.ledge.add(new Platform(this.game, 5200, 450));
			this.ledge.add(new Platform(this.game, 5400, 400));
			this.ledge.add(new Platform(this.game, 5600, 400));
			this.ledge.add(new Platform(this.game, 6300, 400));
			this.ledge.add(new Platform(this.game, 6550, 350));
			this.ledge.add(new Platform(this.game, 6800, 300));
			this.ledge.add(new Platform(this.game, 7050, 250));
			this.ledge.add(new Platform(this.game, 7300, 200));
			this.ledge.add(new Platform(this.game, 7500, 300));
			this.ledge.add(new Platform(this.game, 7700, 350));
			this.ledge.add(new Platform(this.game, 7900, 400));
			this.ledge.add(new Platform(this.game, 8100, 450));
			this.ledge.add(new Platform(this.game, 8300, 500));
			this.ledge.add(new Platform(this.game, 8800, 400));

			// Creation of moving platforms
			this.dynamicLedge = this.add.group()
			this.dynamicLedge.add(new DynamicLedge(this.game, 80, 200, 3))
			this.dynamicLedge.add(new DynamicLedge(this.game, 710, 200, 2))
			this.dynamicLedge.add(new DynamicLedge(this.game, 840, 200, 3))

			// Creation of singular spikes
			this.spikes = this.add.group()
			this.spikes.add(new Spikes(this.game, 960, h-69));
			this.spikes.add(new Spikes(this.game, 7500, 263));
			this.spikes.add(new Spikes(this.game, 7570, 263));
			this.spikes.add(new Spikes(this.game, 7700, 313));
			this.spikes.add(new Spikes(this.game, 7770, 313));
			this.spikes.add(new Spikes(this.game, 7900, 363));
			this.spikes.add(new Spikes(this.game, 7970, 363));
			this.spikes.add(new Spikes(this.game, 8100, 413));
			this.spikes.add(new Spikes(this.game, 8170, 413));
			this.spikes.add(new Spikes(this.game, 8300, 463));
			this.spikes.add(new Spikes(this.game, 8370, 463));

			// Creation of spiked floor
			for(let i = 0; i < 15; i++){
				this.spikes.add(new Spikes(this.game, 1400 + i * 87, h-69));
			}
			for(let i = 0; i < 3; i++){
				this.spikes.add(new Spikes(this.game, 3265 + i * 87, h-69));
			}
			for(let i = 0; i < 60; i++){
				this.spikes.add(new Spikes(this.game, 3800 + i * 87, h-69));
			}

			// Creation of puzzle pieces
			this.artPieces = this.add.group()
			this.artPieces.add(new ArtPiece(this.game, 260, 90));
			this.artPieces.add(new ArtPiece(this.game, 1600, 100));
			this.artPieces.add(new ArtPiece(this.game, 4050, 90));
			this.artPieces.add(new ArtPiece(this.game, 6000, 250));

			// Creation of Enemies
			this.enemies = this.add.group()
			let enemy = this.enemies.add(new Enemy(this.game, 2900, h-100));

			// Creation of Eye
			//this.eye = new EnemyEye(this.game, 4820, 350);

			// Creation of the Player
			this.player = new Player(this.game, 100, this.world.height-this.ground.height-25, this);

			this.game.camera.follow(this.player)

			// Creation of Elephant
			this.elephant1 = new Elephant(this.game, 1315, this.world.height - this.ground.height);
			this.elephant2 = new Elephant(this.game, 3750, this.world.height - this.ground.height);

			// Creation of Longlegs
			this.longlegs1 = new LongLegs(this.game, 5800, 400);
			this.longlegs2 = new LongLegs(this.game, 7500, 130);

			// Creation on UI
			this.ui = new UI(this.game, this)

			// Creation of text
			let style = { font: "bold 20px Assistant", fill: "#ffffff" };

			this.artPieceScoreDisplay = this.game.add.text(this.game.width - 236, 24, this.game.artpieces1 + '/4', style);
			this.artPieceScoreDisplay.fixedToCamera = true;

			this.timerDisplay = this.game.add.text(this.game.width - 146, 24, "00:00", style)
			this.timerDisplay.fixedToCamera = true;

			this.livesDisplay = this.game.add.text(this.game.width - 26, 24, String(this.game.lives), style);
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
			this.physics.arcade.collide(this.player, this.dynamicLedge, () => this.player.cancelfall(), null, this);
			this.physics.arcade.collide(this.player, this.longlegs1);
			this.physics.arcade.collide(this.player, this.longlegs2);

			this.physics.arcade.collide(this.longlegs1, this.ground);
			this.physics.arcade.collide(this.longlegs1, this.ledge);
			this.physics.arcade.collide(this.longlegs2, this.ground);
			this.physics.arcade.collide(this.longlegs2, this.ledge);

			// Player collision
			this.physics.arcade.collide(this.player, this.platforms);
			this.physics.arcade.collide(this.player, this.ground);
			this.physics.arcade.collide(this.player, this.elephant1);
			this.physics.arcade.overlap(this.player, this.elephant1.airflow, () => this.player.fly(), null, this);
			this.physics.arcade.collide(this.player, this.elephant2);
			this.physics.arcade.overlap(this.player, this.elephant2.airflow, () => this.player.fly(), null, this);
			this.physics.arcade.overlap(this.player, this.longlegs1, () => this.longlegs1.startMoving(),null, this);
			this.physics.arcade.overlap(this.player, this.longlegs2, () => this.longlegs2.startMoving(), null, this);
			this.physics.arcade.overlap(this.player, this.enemies, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.eye, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.spikes, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.artPieces, this.collectArtPiece, null, this);
			this.physics.arcade.overlap(this.player, this.endTile, this.completeLevelCheck, null, this);

			this.livesDisplay.text = String(this.game.lives)

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
				// this.ui.pauseLevel()
			}
			// if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)){
			// 	this.completeLevel()
			// }

			// setting a respawn location if the player exceeds a certain milestone
			if (this.player.position.x >= 2700 && this.player.position.x < 5500) {
				this.game.levelProgression1 = 1
			}
			if (this.player.position.x >= 5500) {
				this.game.levelProgression1 = 2
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
			this.game.timer1 = minText+":"+secText
			this.timerDisplay.text = this.game.timer1;
		}
		
		resetLevel(){
			this.game.artpieces1 = 0
			this.game.state.start('Level1', true, false);
		}

		completeLevelCheck(){
			if (this.game.artpieces1 == 4) {
				this.completeLevel()
			}
		}

		completeLevel() {
			this.game.state.start('LevelOneComplete', true, false);
			this.game.gameprogression = 1
		}
	
		collectArtPiece(player:Player, artPiece:ArtPiece){
			artPiece.kill()
			// if(this.eye){
			// 	this.eye.follow(player.position.x, player.position.y)
			// }
			this.game.artpieces1++
			this.artPieceScoreDisplay.text = this.game.artpieces1 + '/4';
		}

		respawnElements(){
			this.longlegs1.respawn();
			this.longlegs2.respawn();
		}
	}
} 