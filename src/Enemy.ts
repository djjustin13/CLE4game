module myGame {
    export class Enemy extends Phaser.Sprite {
        
        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'enemy', 0); // Name

            this.game.physics.arcade.enableBody(this)

            this.anchor.setTo(0.5, 0);

            // this.animations.add('right', [5, 6, 7, 8], 10, true)
            // this.animations.add('left', [5, 6, 7, 8], 10, true)

            game.add.existing(this);
        }

        update(){
            
            // this.body.velocity.x = 0;
            // this.body.bounce.y = 0.2;
            // this.body.gravity.y = 300;
        }
    }
}