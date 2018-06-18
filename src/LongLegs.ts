module MyGame{

    export class LongLegs extends Phaser.Sprite {

        facing: number
        moving: boolean = false
        startX: number
        startY: number

        constructor(game: Phaser.Game, x: number, y: number){
            
            super(game, x, y, 'longlegs', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            // TODO: make colliding with longlegs trigger a funtion that makes longlegs move
            // making it immovable will make ur character stand on its back without the elephant
            // moving away from underneath it
            // this.body.immovable = true

            this.anchor.setTo(0.0, 0.0);

            this.facing = 1;
            this.animations.add('walk', [0, 4, 6, 5], 6, true)

            this.startX = x;
            this.startY = y;

            game.add.existing(this);
        }

        update(){
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0; 
            this.scale.x = this.facing;

            if (this.moving){
                this.body.velocity.x = this.facing * 100
            }
        }

        startMoving(){
            this.moving = true;
            this.animations.play('walk');
        }

        turnAround(){
            this.facing *= -1
        }

        respawn(){
            this.moving = false;
            this.body.velocity.x = 0;
            this.facing = 1;
            this.x = this.startX;
            this.y = this.startY;
            this.animations.stop();
        }
    }
}