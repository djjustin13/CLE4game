module MyGame {

    export class Tree extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'tree', 0);

            this.anchor.setTo(0.5, 1.0);

            game.add.existing(this);
        }
    }
}