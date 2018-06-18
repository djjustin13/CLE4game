module MyGame{

    export class Elephant extends Phaser.Sprite {

        public airflow:Phaser.Sprite
        game:Phaser.Game

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'elephant', 0);
            this.game = game
            this.game.add.sprite(this.x - 60, this.y - 118, 'elephanttop')

		    this.airflow = new AirFlow(this.game, x+55, y-100)
			this.airflow.body.immovable = true

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;
            this.body.immovable = true;

            this.anchor.setTo(0.5, 1);

            // this.animations.add('right', [5, 6, 7, 8], 10, true)
            // this.animations.add('left', [5, 6, 7, 8], 10, true)

            game.add.existing(this);
        }

        update() {
            this.body.bounce.y = 0.0;
            this.body.gravity.y = 0.0;
        }
    }
}