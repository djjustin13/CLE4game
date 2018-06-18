module MyGame {

    export class ElephantBackGround extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'bgElephant', 0);

            if (Math.random() < 0.5) {
                this.scale.x = -1
            }

            this.anchor.setTo(0.5, 1.0);

            game.add.existing(this);
        }
    }
}