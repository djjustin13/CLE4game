module myGame {

    export class ArtPiece extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'artPiece', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 0);

            game.add.existing(this);
        }

        update() {
            this.body.velocity.y = -225
            this.body.velocity.x = 0
            this.body.bounce.y = 1.0
            this.body.gravity.y = 400
        }
    }
}