module MyGame{

    export class Enemy extends Phaser.Sprite{

        enemyState: number
        timer: number
        facing: number

        constructor(game: Phaser.Game, x: number, y: number){
            
            super(game, x, y, 'dude', 0);

            this.game.physics.arcade.enableBody(this)

            this.anchor.setTo(0.5, 0);

            this.animations.add('right', [5, 6, 7, 8], 10, true)
            this.animations.add('left', [5, 6, 7, 8], 10, true)

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

            switch(this.enemyState){
                case 0: //idle
                    this.timer++;
                    if (this.timer > 100){
                        this.timer = 0;
                        if(this.facing == 1){
                            this.facing = -1;
                            this.body.velocity.x = -100;
                            this.animations.stop();
                            this.animations.play('left');
                        }
                        //if(this.facing == 0){
                            else{
                            this.facing = 1;
                            this.body.velocity.x = 100;
                            this.animations.stop();
                            this.animations.play('right');
                        }
                    }

                    break;
            }
        }
    }
}