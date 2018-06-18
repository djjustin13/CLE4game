module MyGame{

    export class Clock extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'clock', 0);

            this.anchor.setTo(0.5, 1);

            game.add.existing(this);
        }
    }
}