module MyGame {

    export class DynamicLedge extends Phaser.Sprite {

        timer:number = 0
        speed:number = 100
        distance:number = 50
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

            if (this.timer >= 0 && this.timer <= 3*this.distance-1) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 3*this.distance && this.timer <= 4*this.distance-1) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 4*this.distance && this.timer <= 7*this.distance-1) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 7*this.distance && this.timer <= 8*this.distance-1) {
                this.body.velocity.x = 0;
            } else {
                this.timer = 0;
            }
        }

        rightToLeft() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 3*this.distance-1) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 3*this.distance && this.timer <= 3*this.distance-1) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 4*this.distance && this.timer <= 7*this.distance-1) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 7*this.distance && this.timer <= 7*this.distance-1) {
                this.body.velocity.x = 0;
            } else {
                this.timer = 0;
            }
        }

        leftDownRightUp() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 3*this.distance-1) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 3*this.distance && this.timer <= 3.5*this.distance-1) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else if (this.timer >= 3.5*this.distance && this.timer <= 6.5*this.distance-1) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 6.5*this.distance && this.timer <= 7*this.distance-1) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else {
                this.timer = 0;
            }
        }

        rightUpLeftDown() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 3*this.distance-1) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 3*this.distance && this.timer <= 3.5*this.distance-1) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else if (this.timer >= 3.5*this.distance && this.timer <= 6.5*this.distance-1) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 6.5*this.distance && this.timer <= 7*this.distance-1) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else {
                this.timer = 0;
            }
        }

        upAndDown() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 2*this.distance-1) {
                this.body.velocity.y = -this.speed;
            } else if (this.timer >= 2*this.distance && this.timer <= 4*this.distance-1) {
                this.body.velocity.y = this.speed;
            } else {
                this.timer = 0;
            }
        }

        downAndUp() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 2*this.distance-1) {
                this.body.velocity.y = this.speed;
            } else if (this.timer >= 2*this.distance && this.timer <= 4*this.distance-1) {
                this.body.velocity.y = -this.speed;
            } else {
                this.timer = 0;
            }
        }

        leftToRightExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 5*this.distance-1) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 5*this.distance && this.timer <= 6*this.distance-1) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 6*this.distance && this.timer <= 11*this.distance-1) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 11*this.distance && this.timer <= 12*this.distance-1) {
                this.body.velocity.x = 0;
            } else {
                this.timer = 0;
            }
        }

        rightToLeftExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 5*this.distance-1) {
                this.body.velocity.x = this.speed;
            } else if (this.timer >= 5*this.distance && this.timer <= 6*this.distance-1) {
                this.body.velocity.x = 0;
            } else if (this.timer >= 6*this.distance && this.timer <= 11*this.distance-1) {
                this.body.velocity.x = -this.speed;
            } else if (this.timer >= 11*this.distance && this.timer <= 12*this.distance-1) {
                this.body.velocity.x = 0;
            } else {
                this.timer = 0;
            }
        }

        leftDownRightUpExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 3*this.distance-1) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 3*this.distance && this.timer <= 4.5*this.distance-1) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else if (this.timer >= 4.5*this.distance && this.timer <= 7.5*this.distance-1) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 7.5*this.distance && this.timer <= 9*this.distance-1) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else {
                this.timer = 0;
            }
        }

        rightUpLeftDownExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 3*this.distance-1) {
                this.body.velocity.x = this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 3*this.distance && this.timer <= 4.5*this.distance-1) {
                this.body.velocity.x = 0;
                this.body.velocity.y = -this.speed;
            } else if (this.timer >= 4.5*this.distance && this.timer <= 7.5*this.distance-1) {
                this.body.velocity.x = -this.speed;
                this.body.velocity.y = 0;
            } else if (this.timer >= 7.5*this.distance && this.timer <= 9*this.distance-1) {
                this.body.velocity.x = 0;
                this.body.velocity.y = this.speed;
            } else {
                this.timer = 0;
            }
        }

        upAndDownExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 4*this.distance-1) {
                this.body.velocity.y = -this.speed;
            } else if (this.timer >= 4*this.distance && this.timer <= 8*this.distance-1) {
                this.body.velocity.y = this.speed;
            } else {
                this.timer = 0;
            }
        }

        downAndUpExtended() {
                
            this.timer++

            if (this.timer >= 0 && this.timer <= 4*this.distance-1) {
                this.body.velocity.y = this.speed;
            } else if (this.timer >= 4*this.distance && this.timer <= 8*this.distance-1) {
                this.body.velocity.y = -this.speed;
            } else {
                this.timer = 0;
            }
        }
    }
}