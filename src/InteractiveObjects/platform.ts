module MyGame {

    export class Platform extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'platform', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.body.immovable = true

            this.anchor.setTo(0.0, 0.0);

            game.add.existing(this);
        }

        update() {
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0;
        }
    }
}