module MyGame{

    export class AirFlow extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'airflow', 0);

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;
            this.body.immovable = true;

            this.anchor.setTo(0.5, 1);

            this.animations.add('flow', [0, 1, 2, 1], 10, true)
            this.animations.play('flow')

            game.add.existing(this);
        }

        update() {
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0;
        }
    }
}