module MyGame {

    export class Spikes extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'spikes', 0);

            this.game.physics.arcade.enableBody(this)
            
            this.body.immovable = true;

            game.add.existing(this);
        }
    }
}