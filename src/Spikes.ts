module MyGame{

    export class Spikes extends Phaser.Sprite{

        constructor(game: Phaser.Game, x: number, y: number){
            super(game, x, y, 'spikes', 0);

            game.add.existing(this);
        }
    }
}