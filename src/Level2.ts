module MyGame {

	export class Level2 extends Phaser.State {
		game:Game
		background: Phaser.TileSprite
		ground: Phaser.TileSprite
		ledge: Phaser.Group
		player: MyGame.Player
		platforms: Phaser.Group
		bgElephant: Phaser.Group
		artPieces: Phaser.Group
		enemies: Phaser.Group
		eye: MyGame.EnemyEye
		endTile: Phaser.Sprite
		elephant1: any
		// elephant2: any
		longlegs1: LongLegs
		spikes: Phaser.Group
		timerSec:number = 0
		timerMin:number = 0
		dynamicLedge:any
		trees: Phaser.Group
		ui:UI

		artPieceScore: number = 0
		artPieceScoreDisplay: any
		timerDisplay: any
		livesDisplay: any

		create() {
			let h = this.game.world.height
			this.game.world.setBounds(0, 0, 8919, 600);
			this.background = this.add.tileSprite(0, 0, this.world.width, 600, 'bgTile')

			// TODO: make elephant not look shite
			this.bgElephant = this.add.group()
			for (let i =0; i < 2; i++)
			{
				// this.bgElephant.add(new ElephantBackGround(this.game,  2000 * Math.random() + i * (2000+Math.random()*6000), h))
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


			// Creation of scenery; which in this case means some dead trees
			this.trees = this.add.group()
			for (let i = 0; i < 25; i++)
			{
				this.trees.add(new Tree(this.game, 750 + i * (500+Math.random()*350), h-this.ground.height))	
			}

			// Creation of End-tile
			this.endTile = new EndTile(this.game, 8076+157/2, h-this.ground.height*2-332-(89/2));

			this.ledge = this.add.group()
			this.ledge.add(new Platform(this.game, 0, h-400));
			this.ledge.add(new Platform(this.game, 1970, h-460));
			this.ledge.add(new Platform(this.game, 1970, h-460));
			for(let i = 0; i < 7; i++){
				this.ledge.add(new Platform(this.game, 1970+157*i, h-460+41*i));
			}
			this.ledge.add(new Platform(this.game, 3114, h-this.ground.height*2-6));
			this.ledge.add(new Platform(this.game, 5260, h-this.ground.height*2));
			this.ledge.add(new Platform(this.game, 7400, h-this.ground.height-30));
			for(let i = 0; i < 5; i++){
				this.ledge.add(new Platform(this.game, 7588 + i * (87+157), h-this.ground.height-30));
			}
			this.ledge.add(new Platform(this.game, 7588+(2*(87+157)), h-this.ground.height*2-332));


			// Creation of moving platforms
			this.dynamicLedge = this.add.group()
			this.dynamicLedge.add(new DynamicLedge(this.game, 300, 350, 9))
			this.dynamicLedge.add(new DynamicLedge(this.game, 934, 350, 8))
			this.dynamicLedge.add(new DynamicLedge(this.game, 1068, 350, 9))
			this.dynamicLedge.add(new DynamicLedge(this.game, 1702, 350, 8))

			this.dynamicLedge.add(new DynamicLedge(this.game, 1836, 470, 10))
			this.dynamicLedge.add(new DynamicLedge(this.game, 2441+(157-114)/2, h-this.ground.height-38, 4))
			this.dynamicLedge.add(new DynamicLedge(this.game, 2441+(157-144)/2+114+20, h-this.ground.height-38, 7))

			for (let i = 0; i < 5; i++) {
				this.dynamicLedge.add(new DynamicLedge(this.game, 3500 + i * 400, h-this.ground.height*2-4, 10))
			}
			for (let i = 0; i < 5; i++) {
				this.dynamicLedge.add(new DynamicLedge(this.game, 3700 + i * 400, h-364-this.ground.height-4, 11))
			}

			this.dynamicLedge.add(new DynamicLedge(this.game, 8805, h-this.ground.height*2, 10))
			this.dynamicLedge.add(new DynamicLedge(this.game, 8805-114, h-this.ground.height*2-332, 6))


			// Creation of singular spikes
			this.spikes = this.add.group()
			this.spikes.add(new Spikes(this.game, 1970+5+157, h-454));
			this.spikes.add(new Spikes(this.game, 1970+5+157*3, h-454+41*2));
			this.spikes.add(new Spikes(this.game, 1970-5-87+157*6, h-454+41*4));
			this.spikes.add(new Spikes(this.game, 1970+5+157*6, h-454+41*5));
			this.spikes.add(new Spikes(this.game, 5300+114, h-this.ground.height*2-4));
			this.ledge.add(new Spikes(this.game, 7588+157 + 4 * (87+157) + 87, h-this.ground.height*2-4));
			this.ledge.add(new Spikes(this.game, 7588+157 + 4 * (87+157) + 87*2, h-this.ground.height*2-4));


			// Creation of spiked floor
			for(let i = 0; i < 36; i++){
				this.spikes.add(new Spikes(this.game, 0 + i * 87, h-69));
			}
			for(let i = 0; i < 25; i++){
				this.spikes.add(new Spikes(this.game, 5300+114+87*i, h-this.ground.height*2-4));
			}
			for(let i = 0; i < 3; i++){
				this.spikes.add(new Spikes(this.game, 7214+114+87*i, h-this.ground.height*2-15));
			}
			for(let i = 0; i < 5; i++){
				this.spikes.add(new Spikes(this.game, 7588+157 + i * (87+157), h-this.ground.height*2-4));
			}


			// Creation of puzzle pieces
			this.artPieces = this.add.group()
			this.artPieces.add(new ArtPiece(this.game, 2500+24, h-460+41*4));
			this.artPieces.add(new ArtPiece(this.game, 4900+57, h-500));
			this.artPieces.add(new ArtPiece(this.game, 6650, h-500));
			this.artPieces.add(new ArtPiece(this.game, 8295, h-225));


			// Creation of Enemies
			this.enemies = this.add.group()
			for (let i = 0; i < 5; i++) {
				this.enemies.add(new Enemy(this.game, 3470 + i * 400, h-150))
			}
			for (let i = 0; i < 5; i++) {
				this.enemies.add(new Enemy(this.game, 3670 + i * 200, h-672))
			}

			// Creation of Eye
			//this.eye = new EnemyEye(this.game, 4820, 350);

			// Creation of the Player
			this.player = new Player(this.game, 130, 190, this);
			// this.player = new Player(this.game, 7800, 350, this); //debug position
			
			this.game.camera.follow(this.player)

			// Creation of Elephant
			this.elephant1 = new Elephant(this.game, 6500, h-this.ground.height);

			// Creation of Longlegs
			this.longlegs1 = new LongLegs(this.game, 5700, h-this.ground.height-164);

			// Creation on UI
			this.ui = new UI(this.game, this)

			// Creation of text
			let style = { font: "bold 20px Assistant", fill: "#ffffff" };

			this.artPieceScoreDisplay = this.game.add.text(this.game.width - 236, 24, '0/4', style);
			this.artPieceScoreDisplay.fixedToCamera = true;

			this.timerDisplay = this.game.add.text(this.game.width - 146, 24, "00:00", style)
			this.timerDisplay.fixedToCamera = true;

			this.livesDisplay = this.game.add.text(this.game.width - 26, 24, String(this.game.lives), style);
			this.livesDisplay.fixedToCamera = true;

			this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);

			// Console level has started
		}

		update(){
			// Platform collision
			this.physics.arcade.collide(this.player, this.longlegs1);
			this.physics.arcade.collide(this.enemies, this.platforms);
			this.physics.arcade.collide(this.enemies, this.dynamicLedge);
			this.physics.arcade.collide(this.enemies, this.ground);
			this.physics.arcade.collide(this.platforms, this.artPieces);
			this.physics.arcade.collide(this.ground, this.artPieces);
			this.physics.arcade.collide(this.player, this.ledge);
			this.physics.arcade.collide(this.artPieces, this.ledge);
			this.physics.arcade.collide(this.player, this.dynamicLedge, () => this.player.cancelfall(), null, this);
			this.physics.arcade.collide(this.longlegs1, this.ground);
			this.physics.arcade.collide(this.longlegs1, this.ledge);

			// Player collision
			this.physics.arcade.collide(this.player, this.platforms);
			this.physics.arcade.collide(this.player, this.ground);
			this.physics.arcade.collide(this.player, this.elephant1);
			this.physics.arcade.overlap(this.player, this.longlegs1, () => this.longlegs1.startMoving(), null, this);
			this.physics.arcade.overlap(this.player, this.elephant1.airflow, () => this.player.fly(), null, this);
			this.physics.arcade.overlap(this.player, this.enemies, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.eye, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.spikes, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.artPieces, this.collectArtPiece, null, this);
			this.physics.arcade.overlap(this.player, this.endTile, this.completeLevelCheck, null, this);

			this.livesDisplay.text = String(this.game.lives)

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
				this.ui.pauseLevel()
			}
			// if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)){
			// 	this.completeLevel()
			// }

			// setting a respawn location if the player exceeds a certain milestone
			if (this.player.position.x >= 2000 && this.player.position.x < 5250) {
				this.game.levelProgression2 = 1
			}
			if (this.player.position.x >= 5250) {
				this.game.levelProgression2 = 2
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
			this.game.timer2 = minText+":"+secText
			this.timerDisplay.text = this.game.timer2;
		}
		
		resetLevel(){
			this.game.artpieces2 = 0
			this.game.state.start('Level2', true, false);
		}

		completeLevelCheck(){
			if (this.game.artpieces2 == 4) {
				this.completeLevel()
			}
		}

		completeLevel(){
			this.game.state.start('LevelTwoComplete', true, false);
			this.game.gameprogression = 2
		}
	
		collectArtPiece(player:Player, artPiece:ArtPiece){
			artPiece.kill()
			// if(this.eye){
			// 	this.eye.follow(player.position.x, player.position.y)
			// }
			this.game.artpieces2++
			this.artPieceScoreDisplay.text = this.game.artpieces2 + '/4';
		}

		respawnElements(){
			this.longlegs1.respawn();
		}
	}
} 