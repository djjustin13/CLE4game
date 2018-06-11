module MyGame{

    export class LongLegs extends Phaser.Sprite{

        facing: number
        moving: boolean = false

        constructor(game: Phaser.Game, x: number, y: number){
            
            super(game, x, y, 'longlegs', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.0, 0.0);

            this.facing = 1;
            this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6], 10, true)

            game.add.existing(this);
        }

        update(){
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 300;
            this.scale.x = this.facing;

            if(this.moving){
                this.body.velocity.x = this.facing * 100;
            }
        }

        startmoving(){
            this.moving = true;
            this.animations.play('walk');
        }

        turnAround(){
            this.facing *= -1
        }
    }
}