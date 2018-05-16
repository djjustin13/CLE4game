module MyGame {

    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'dude', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 0);

            this.animations.add('right', [5, 6, 7, 8], 10, true)
            this.animations.add('left', [5, 6, 7, 8], 10, true)

            game.add.existing(this);

        }

        update() {
            this.body.velocity.x = 0
            this.body.bounce.y = 0.2
            this.body.gravity.y = 350


            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A) || this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

                this.body.velocity.x = -150
                this.animations.play('left')

                if (this.scale.x == 1) {
                    this.scale.x = -1
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){

                this.body.velocity.x = 150;
                this.animations.play('right')

                if (this.scale.x == -1) {
                    this.scale.x = 1
                }
            }
            else {
                this.animations.stop()
            }
            
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) && this.body.touching.down){
                this.body.velocity.y = -250
            }

        }

    }

}