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

            this.anchor.setTo(0.0, 0.0);

            game.add.existing(this);
        }

        update() {
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0;

            if(this.behaviour == 0) {
                this.leftToRight();
            
            } else if (this.behaviour == 1) {
                this.rightToLeft();
            
            } else if (this.behaviour == 2) {
                this.leftDownRightUp();
            
            } else if (this.behaviour == 3) {
                this.rightUpLeftDown();
            
            } else if (this.behaviour == 4) {
                this.upAndDown();
            
            } else if (this.behaviour == 5) {
                this.downAndUp();
            
            } else if(this.behaviour == 6) {
                this.leftToRightExtended();
            
            } else if (this.behaviour == 7) {
                this.rightToLeftExtended();
            
            } else if (this.behaviour == 8) {
                this.leftDownRightUpExtended();
            
            } else if (this.behaviour == 9) {
                this.rightUpLeftDownExtended();
            
            } else if (this.behaviour == 10) {
                this.upAndDownExtended();
            
            } else if (this.behaviour == 11) {
                this.downAndUpExtended();
            }
        }

        leftToRight() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 299) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 300 && this.timer <= 399) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 400 && this.timer <= 699) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 700 && this.timer <= 799) {
                this.body.velocity.x = 0;
            } else {
                this.timer = 0;
            }
        }

        rightToLeft() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 299) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 300 && this.timer <= 399) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 400 && this.timer <= 699) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 700 && this.timer <= 799) {
                this.body.velocity.x = 0;
            } else {
                this.timer = 0;
            }
        }

        leftDownRightUp() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 299) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 300 && this.timer <= 349) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else if (this.timer >= 350 && this.timer <= 649) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 650 && this.timer <= 699) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else {
                this.timer = 0;
            }
        }

        rightUpLeftDown() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 299) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 300 && this.timer <= 349) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else if (this.timer >= 350 && this.timer <= 649) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 650 && this.timer <= 699) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else {
                this.timer = 0;
            }
        }

        upAndDown() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 200) {
                this.body.velocity.y = -this.speed;
            } else if (this.timer >= 200 && this.timer <= 399) {
                this.body.velocity.y = this.speed;
            } else {
                this.timer = 0;
            }
        }

        downAndUp() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 200) {
                this.body.velocity.y = this.speed;
            } else if (this.timer >= 200 && this.timer <= 399) {
                this.body.velocity.y = -this.speed;
            } else {
                this.timer = 0;
            }
        }

        leftToRightExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 500) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 500 && this.timer <= 599) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 600 && this.timer <= 1099) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 1100 && this.timer <= 1199) {
                this.body.velocity.x = 0;
            } else {
                this.timer = 0;
            }
        }

        rightToLeftExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 500) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 500 && this.timer <= 599) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 600 && this.timer <= 1099) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 1100 && this.timer <= 1199) {
                this.body.velocity.x = 0;
            } else {
                this.timer = 0;
            }
        }

        leftDownRightUpExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 299) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 300 && this.timer <= 449) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else if (this.timer >= 450 && this.timer <= 749) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 750 && this.timer <= 899) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else {
                this.timer = 0;
            }
        }

        rightUpLeftDownExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 299) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 300 && this.timer <= 449) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else if (this.timer >= 450 && this.timer <= 749) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 750 && this.timer <= 899) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else {
                this.timer = 0;
            }
        }

        upAndDownExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 399) {
                this.body.velocity.y = -this.speed;
            } else if (this.timer >= 400 && this.timer <= 799) {
                this.body.velocity.y = this.speed;
            } else {
                this.timer = 0;
            }
        }

        downAndUpExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 399) {
                this.body.velocity.y = this.speed;
            } else if (this.timer >= 400 && this.timer <= 799) {
                this.body.velocity.y = -this.speed;
            } else {
                this.timer = 0;
            }
        }
    }
}