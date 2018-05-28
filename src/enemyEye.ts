module MyGame{

    export class EnemyEye extends Phaser.Sprite{

        enemyState: number
        timer: number
        facing: number

        followX:number
        followY:number

        speed:number = 2

        constructor(game: Phaser.Game, x: number, y: number){
            
            super(game, x, y, 'eye', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 0.5);

            // this.animations.add('right', [5, 6, 7, 8], 10, true)
            // this.animations.add('left', [5, 6, 7, 8], 10, true)

            game.add.existing(this);

            this.enemyState = 0;
            this.timer = 0;
            this.facing = 1;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }

        update(){
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0;
            this.scale.x = this.facing;

            switch(this.enemyState){

                case 0: // Idle
                    this.timer++;
                    if (this.timer < 200) {
                        this.body.velocity.y = 0;
                        this.body.velocity.x = -40;

                        this.facing == -1;

                    } else if ((this.timer > 200) && (this.timer < 400)){
                        this.body.velocity.y = 40;
                        this.body.velocity.x = 40;

                        // this.animations.stop();
                        // this.animations.play('left');

                        this.facing == 1;

                    } else if ((this.timer > 400) && (this.timer < 600)){
                        this.body.velocity.y = 0;
                        this.body.velocity.x = -40;

                        this.facing == -1;

                    } else if ((this.timer > 600) && (this.timer < 800)){
                        this.body.velocity.y = -40;
                        this.body.velocity.x = 40;

                        // this.animations.stop();
                        // this.animations.play('right');

                        this.facing == 1;

                    } else if (this.timer >= 800) {
                        this.timer = 0;
                    }
                break;

                case 1: // Following

                    let eyeX = this.body.position.x;
                    let eyeY = this.body.position.y;
                    let pieceX = this.followX;
                    let pieceY = this.followY;
                    let returnX = 570;
                    let returnY = 150;

                    if (eyeX > pieceX-2) {
                        this.body.position.x-=this.speed
                    }
                    if (eyeY > pieceY+2) {
                        this.body.position.y-=this.speed
                    }
                    if (eyeX < pieceX+2) {
                        this.body.position.x+=this.speed
                    }
                    if (eyeY < pieceY-2) {
                        this.body.position.y+=this.speed
                    }
                    if (((eyeX-pieceX) < 10 && (eyeX-pieceX) > -10) && ((eyeY-pieceY) < 10 && (eyeY-pieceY) > -10)) {
                        this.enemyState = 0;
                        this.returnToDefaultLocation()
                        console.log("eye arrived on location");
                    }
    
                break;    
            }
        }
        follow(x:number, y:number) {
            this.enemyState = 1 
            this.followX = x
            this.followY = y
            console.log("started following")
        }

        returnToDefaultLocation() {
            // if (eyeX > returnX) {}
            //     this.body.position.x-=this.speed
            // }
            // if (eyeY > returnY) {
            //     this.body.position.y-=this.speed
            // }
            // if (eyeX < returnX) {
            //     this.body.position.x+=this.speed
            // }
            // if (eyeY < returnY) {
            //     this.body.position.y+=this.speed
            // }
            console.log("eye started returning")
        }
    }
}