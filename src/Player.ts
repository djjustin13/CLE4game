module MyGame {

    export class Player extends Phaser.Sprite {
        game:Game
        private startX:number
        private startY:number
        private timer: number = 0
        private jumpPressed:boolean
        private speed: number = 250;
        private jumpheight: number = 275;
        private jumpState: number = 0;
        private played: boolean
        private level: any

        constructor(game: Phaser.Game, x: number, y: number, level:any) {
            super(game, x, y, 'dude', 0);

            this.played = false
            this.startX = x
            this.startY = y
            this.level = level;

            this.jumpPressed = false

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 1.0);

            this.animations.add('idle', [0], 40, false)
            this.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 0], 40, true)
            this.animations.add('jump', [8, 9, 10, 11, 12, 13, 13, 14, 14, 14], 15, false)
            this.animations.add('fall', [5, 6, 15], 10, false)

            this.animations.frame = 0

            game.add.existing(this)
        }

        update() {
            this.body.velocity.x = 0
            this.body.bounce.y = 0.0
            this.body.gravity.y = 500

            // Player keyboard controls
            // Moving left
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A) || this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) 
            {
                this.body.velocity.x = -this.speed

                if (this.scale.x == 1) {
                    this.scale.x = -1
                }
            }

            // Moving right
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.body.velocity.y == 0)
            {
                this.body.velocity.x = this.speed;

                if (this.scale.x == -1) {
                    this.scale.x = 1
                }
            }

            // Jumping
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) && this.body.touching.down && this.jumpPressed == false){
                this.body.velocity.y = -this.jumpheight;
            }

            // Something with jumpPressed..
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
                this.jumpPressed = true

            } else {
                this.jumpPressed = false
            }
            
            // Player animations
            // Idle animation when player is standing still
            if (this.body.velocity.y == 0 && this.body.velocity.x == 0)
            {
                this.animations.play('idle')
            }

            // Falling animation if velocity y is negative
            if (this.body.velocity.y < 0 && this.jumpState == 0 && this.played == false) 
            {
                this.animations.play('jump')
            }

            
            // Falling animation if velocity y is positive
            if (this.body.velocity.y > 120 && (this.body.velocity.x != 0 || this.body.velocity.x == 0) && this.played == false) 
            {
                this.animations.play('fall')
                this.played = true
                this.jumpState = 0
            }
            
            if (this.body.velocity.y == 0)
            {
                this.played = false
            }
        
            // Walking animation if velocity x != 0
            if (this.body.velocity.x != 0 && this.body.velocity.y == 0 && this.played == false)
            {
                this.animations.play('walk')
            }

            // No lives mechanic
            // If player lost all lives go to gameOver()
            if (this.game.lives <= 0) {
                this.gameOver();
            }
        }

        // When collision between player and something deadly is detected, one life is deducted
        spawn() {
            console.log(this.game.levelProgression1)
            if (this.game.levelProgression1 == 1) {
                console.log("spawn new")
                this.x = 5650
                this.y = 350
            }else if(this.game.levelProgression2 == 1){
                this.x = 2000
                this.y = 125
            }else{
                this.x = this.startX
                this.y = this.startY
            }

            this.game.lives--
            this.level.respawnElements();
        }

        // When you're all out of lives
        gameOver() {
            this.game.state.start('GameOver', true, false);
        }

        // When collision between player and airflow is detected
        fly() {
            this.timer++
            this.played = false

            if (this.timer <= 7) {
                this.animations.play('jump')
                this.game.input.keyboard.isDown(Phaser.Keyboard.UP)
                this.body.velocity.y = -550;
                this.jumpState = 1
            } else {
                this.timer = 0
            }
        }

        //
        cancelfall() {
            this.played == true
        }
    }
}