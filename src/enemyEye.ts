module MyGame{

    export class EnemyEye extends Phaser.Sprite{

        enemyState: number
        timer: number
        facing: number

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
            this.body.velocity.y = -50;
        }

        update(){
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0;
            this.scale.x = this.facing;

            switch(this.enemyState){
                case 0:
                    this.timer++;
                    if ((this.timer > 200) && (this.timer < 400)){
                        this.body.velocity.y = 0;
                        this.body.velocity.x = -25;
                    } else if ((this.timer > 400) && (this.timer < 600)){
                        this.body.velocity.y = 50;
                        this.body.velocity.x = 50;
                        this.facing == -1;
                        // this.animations.stop();
                        // this.animations.play('left');
                    } else if ((this.timer > 600) && (this.timer < 800)){
                        this.body.velocity.y = 0;
                        this.body.velocity.x = -50;
                    } else if (this.timer > 800){
                        this.body.velocity.y = -50;
                        this.body.velocity.x = 25;
                        this.facing == 1;
                        this.timer = 0;
                        // this.animations.stop();
                        // this.animations.play('right');
                    }
                break;
            }
        }
    }
}