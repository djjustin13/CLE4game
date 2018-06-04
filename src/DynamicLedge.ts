module MyGame {

    export class DynamicLedge extends Phaser.Sprite {

        timer:number = 0
        speed:number = 50
        behaviour:number

        constructor(game: Phaser.Game, x: number, y: number, behaviour:number) {
            
            super(game, x, y, 'dynamicledge', 0);
            this.behaviour = behaviour

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.body.immovable = true

            this.anchor.setTo(0.5, 0);

            game.add.existing(this);
        }

        update() {
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0;

            if(this.behaviour == 0) {
                this.sideToSide();
            } else if (this.behaviour == 1) {
                this.sideDownSideUp();
            } else if (this.behaviour == 2) {
                this.sideToSideLeft();
            } else if (this.behaviour == 3) {
                this.sideUpSideDownLeft();
            }
        }

        sideToSide() {
                
            this.timer++

            if (this.timer >= 0 && this.timer < 300) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 300 && this.timer < 400) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 400 && this.timer < 700) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 700 && this.timer < 800) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 800) {
                this.timer = 0;
            }
        }

        sideDownSideUp() {
                
            this.timer++

            if (this.timer >= 0 && this.timer < 300) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 300 && this.timer < 400) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed / 2;
            } else if (this.timer >= 400 && this.timer < 700) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 700 && this.timer < 800) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed / 2;
            } else if (this.timer >= 800) {
                this.timer = 0;
            }
        }

        sideToSideLeft() {
                
            this.timer++

            if (this.timer >= 0 && this.timer < 300) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 300 && this.timer < 400) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 400 && this.timer < 700) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 700 && this.timer < 800) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 800) {
                this.timer = 0;
            }
        }

        sideUpSideDownLeft() {
                
            this.timer++

            if (this.timer >= 0 && this.timer < 300) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 300 && this.timer < 400) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed / 2;
            } else if (this.timer >= 400 && this.timer < 700) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 700 && this.timer < 800) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed / 2;
            } else if (this.timer >= 800) {
                this.timer = 0;
            }
        }
    }
}