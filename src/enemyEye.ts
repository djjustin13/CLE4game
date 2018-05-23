module MyGame{

    export class EnemyEye extends Phaser.Sprite{

        enemyState: number
        timer: number
        facing: number

        followX:number
        followY:number
        constructor(game: Phaser.Game, x: number, y: number){
            
            super(game, x, y, 'eye', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 0);

            // this.animations.add('right', [5, 6, 7, 8], 10, true)
            // this.animations.add('left', [5, 6, 7, 8], 10, true)

            game.add.existing(this);

            this.enemyState = 0;
            this.timer = 0;
            this.facing = 1;
            this.body.velocity.x = 0;
            this.body.velocity.y = -25;
        }

        update(){
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0;
            this.scale.x = this.facing;

            switch(this.enemyState){

                case 0: // Idle
                    this.timer++;
                    if ((this.timer > 200) && (this.timer < 400)){
                        this.body.velocity.y = 0;
                        this.body.velocity.x = -25;
                    } else if ((this.timer > 400) && (this.timer < 600)){
                        this.body.velocity.y = 25;
                        this.body.velocity.x = 25;
                        this.facing == -1;
                        // this.animations.stop();
                        // this.animations.play('left');
                    } else if ((this.timer > 600) && (this.timer < 800)){
                        this.body.velocity.y = 0;
                        this.body.velocity.x = -25;
                    } else if (this.timer > 800){
                        this.body.velocity.y = -25;
                        this.body.velocity.x = 25;
                        this.facing == 1;
                        this.timer = 0;
                        // this.animations.stop();
                        // this.animations.play('right');
                    }
                break;

                case 1: // Following
                    let eyeX = this.body.position.x;
                    let eyeY = this.body.position.y;
                    let pieceX = this.followX;
                    let pieceY = this.followY;

                    if (eyeX > pieceX) {
                        this.body.position.x--
                        console.log("left")
                    }
                    if (eyeY > pieceY) {
                        this.body.position.y--
                        console.log("up")
                    }
                    if (eyeX < pieceX) {
                        this.body.position.x++
                        console.log("right");
                    }
                    if (eyeY < pieceY) {
                        this.body.position.y++
                        console.log("down")
                    }
                    if (eyeX-pieceX) <= 10 && (eyeX-pieceX) >= -10 && (eyeY-pieceY) <= 10 && (eyeY-pieceY) >= -10 {
                        this.enemyState = 0;
                        console.log("mine now");
                    }
                break;    
            }
        }
        follow(x:number, y:number){
            this.enemyState = 1;
            console.log("state 1");
            this.followX = x
            this.followY = y
        }
    }
}