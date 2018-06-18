module MyGame{

    export class Enemy extends Phaser.Sprite{

        enemyState: number
        timer: number
        facing: number

        constructor(game: Phaser.Game, x: number, y: number){
            
            super(game, x, y, 'dog', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 0);

            this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 15, true)
            this.animations.frame = 0

            game.add.existing(this);

            this.enemyState = 0;
            this.timer = 0;
            this.facing = 1;
            this.body.velocity.x = 100;
        }

        update(){
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 300;
            this.scale.x = this.facing;

            switch(this.enemyState){ //The state indicates different behaviors for the enemy
                case 0: //idle
                    this.timer++;
                    if (this.timer > 100){
                        this.timer = 0;
                        if(this.facing == 1){ //walking left
                            this.facing = -1;
                            this.body.velocity.x = -100;
                            this.animations.stop();
                            this.animations.play('walk');
                        }
                        else{ //walking right
                            this.facing = 1;
                            this.body.velocity.x = 100;
                            this.animations.stop();
                            this.animations.play('walk');
                        }
                    }
                break;
            }
        }
    }
}