module MyGame {

	export class Level2 extends Phaser.State {
		game:Game
		background: Phaser.TileSprite
		ground: Phaser.TileSprite
		ledge: Phaser.Group
		player: MyGame.Player
		platforms: Phaser.Group
		artPieces: Phaser.Group
		enemies: Phaser.Group
		eye: MyGame.EnemyEye
		endTile: Phaser.Sprite
		elephant1: any
		elephant2: any
		spikes: Phaser.Group
		timerSec:number = 0
		timerMin:number = 0
		dynamicLedge:any

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
			this.ledge.add(new Platform(this.game, 0, h-400));
			this.ledge.add(new Platform(this.game, 1970, h-460));
			this.ledge.add(new Platform(this.game, 1970, h-460));
			this.ledge.add(new Platform(this.game, 1970+157, h-460+41));
			this.ledge.add(new Platform(this.game, 1970+157*2, h-460+41*2));
			this.ledge.add(new Platform(this.game, 1970+157*3, h-460+41*3));
			this.ledge.add(new Platform(this.game, 1970+157*4, h-460+41*4));
			this.ledge.add(new Platform(this.game, 1970+157*5, h-460+41*5));
			this.ledge.add(new Platform(this.game, 1970+157*6, h-460+41*6));
			this.ledge.add(new Platform(this.game, 1970+157*7, h-460+41*7));



			// Creation of moving platforms
			this.dynamicLedge = this.add.group()
			this.dynamicLedge.add(new DynamicLedge(this.game, 300, 350, 9))
			this.dynamicLedge.add(new DynamicLedge(this.game, 934, 350, 8))
			this.dynamicLedge.add(new DynamicLedge(this.game, 1068, 350, 9))
			this.dynamicLedge.add(new DynamicLedge(this.game, 1702, 350, 8))

			this.dynamicLedge.add(new DynamicLedge(this.game, 1836, 470, 10))
			this.dynamicLedge.add(new DynamicLedge(this.game, 2441+(157-114)/2, h-this.ground.height-38, 4))
			this.dynamicLedge.add(new DynamicLedge(this.game, 2441+(157-144)/2+114+20, h-this.ground.height-38, 7))


			// Creation of singular spikes
			this.spikes = this.add.group()
			this.spikes.add(new Spikes(this.game, 1970+32+157, h-454));
			this.spikes.add(new Spikes(this.game, 1970+32+157*3, h-454+41*2));
			this.spikes.add(new Spikes(this.game, 1970+32+157*5, h-454+41*4));
			this.spikes.add(new Spikes(this.game, 1970+32+157*6, h-454+41*5));


			// Creation of spiked floor
			for(let i = 0; i < 35; i++){
				this.spikes.add(new Spikes(this.game, 0 + i * 87, h-69));
			}

			// Creation of puzzle pieces
			this.artPieces = this.add.group()
			this.artPieces.add(new ArtPiece(this.game, 2500, h-460+41*4));

			// Creation of Enemies
			this.enemies = this.add.group()
			let enemy = this.enemies.add(new Enemy(this.game, 3300, h-100));

			// Creation of Eye
			this.eye = new EnemyEye(this.game, 4820, 350);

			// Creation of the Player
			this.player = new Player(this.game, 130, 190);
			// this.player = new Player(this.game, 1970+157/2, h-500);			
			// this.player = new Player(this.game, 2750, 400);
			this.game.camera.follow(this.player)

			// Creation of Elephant
			this.elephant1 = new Elephant(this.game, 3000000, this.world.height - this.ground.height);

			// Creation of End-tile
			this.endTile = new EndTile(this.game, 4750, h-150);

			// Creation on UI
			let ui:Phaser.Sprite = this.add.sprite(this.game.width, 0, 'uiBase');
			ui.anchor.setTo(1, 0)
			ui.fixedToCamera = true;

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
			console.log("LEVEL TWO STARTED - GOGOGO!")
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

			// Player collision
			this.physics.arcade.collide(this.player, this.platforms);
			this.physics.arcade.collide(this.player, this.ground);
			this.physics.arcade.collide(this.player, this.elephant1);
			this.physics.arcade.overlap(this.player, this.elephant1.airflow, () => this.player.fly(), null, this);
			this.physics.arcade.overlap(this.player, this.enemies, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.eye, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.spikes, () => this.player.spawn(), null, this);
			this.physics.arcade.overlap(this.player, this.artPieces, this.collectArtPiece, null, this);
			this.physics.arcade.overlap(this.player, this.endTile, this.completeLevelCheck, null, this);

			this.livesDisplay.text = String(this.game.lives)

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
			this.game.timer2 = minText+":"+secText
			this.timerDisplay.text = this.game.timer2;
		}
		
		resetLevel(){
			this.game.state.start('Level2', true, false);
		}

		completeLevelCheck(){
			if (this.game.artpieces2 == 4) {
				this.completeLevel()
				console.log("level complete, such amaze")
			} else {
				console.log("needs more pieces")
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
	}
} 