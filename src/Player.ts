module MyGame {

    export class Player extends Phaser.Sprite {
        private startX:number
        private startY:number
        public lives:number = 9
        private timer: number = 0
        private enemyState: number
        private jumpPressed:boolean
        private speed: number = 250;
        private jumpheight: number = 275;
        private playerState:number = 0;
        private respawnTimer:number = 0;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'dude', 0);

            this.startX = x
            this.startY = y

            this.jumpPressed = false

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 1.0);

            this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 40, true)
            this.animations.add('jump',[8, 9, 10, 11, 12, 13, 14, 9, 9, 9, 9, 9, 9, 9, 8], 15, false)
            this.animations.frame = 0

            game.add.existing(this)
        }

        update() {
            this.body.velocity.x = 0
            this.body.bounce.y = 0.0
            this.body.gravity.y = 500

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A) || this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

                this.body.velocity.x = -this.speed
                if(this.body.touching.down)this.animations.play('walk')

                if (this.scale.x == 1) {
                    this.scale.x = -1
                }

            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

                this.body.velocity.x = this.speed;
                if(this.body.touching.down)this.animations.play('walk')

                if (this.scale.x == -1) {
                    this.scale.x = 1
                }
            } else {
                this.animations.stop('walk')
            }
            
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) && this.body.touching.down && this.jumpPressed == false){
                this.body.velocity.y = -this.jumpheight;
                this.animations.frame = 8
                this.animations.play('jump')
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)|| this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
                this.jumpPressed = true
            }else{
                this.jumpPressed = false
            }
            if (this.lives <= 0) {
                this.gameOver();
            }
        }

        spawn() {
            switch(this.playerState) {
                case 0: {
                    this.respawnTimer++
                    this.death();

                    if (this.respawnTimer > 40) {
                        this.playerState = 1;
                    }
                break;
                }

                case 1: {
                    this.normal();
                    this.x = this.startX
                    this.y = this.startY
                    this.lives -= 1
                    this.playerState = 0;
                    this.respawnTimer = 0;
                    console.log(this.lives)

                break;
                }
            }
        }

        gameOver() {
            this.game.state.start('GameOver', true, false);
        }

        fly() {
            this.timer++
            console.log("FLY!!")

            if (this.timer <= 5) {
                this.game.input.keyboard.isDown(Phaser.Keyboard.UP)
                this.body.velocity.y = -500;
            } else {
                this.timer = 0
            }
        }

        death() {
            this.loadTexture('dead');
        }

        normal() {
            this.loadTexture('dude');
        }
    }
}