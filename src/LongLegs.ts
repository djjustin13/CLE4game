module MyGame{

    export class LongLegs extends Phaser.Sprite{

        facing: number
        moving: boolean = false

        constructor(game: Phaser.Game, x: number, y: number){
            
            super(game, x, y, 'longlegs', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 0);
            
            this.body.immovable = true;

            game.add.existing(this);
        
            this.facing = 1;

        }

        update(){
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 300;
            this.scale.x = this.facing;

            if(this.moving){
                this.body.velocity.x = this.facing * 100;
            }
            if(this.facing == 1 && this.body.touching.right){
                this.facing = -1;
            }
            if(this.facing == -1 && this.body.touching.left){
                this.facing = 1;
            }
        }

        startmoving(){
            this.moving = true;
        }
    }
}