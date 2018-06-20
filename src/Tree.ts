module MyGame {

    export class Tree extends Phaser.Sprite {

        private clock:Phaser.Sprite

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'tree', 0);

            if (Math.random() < 0.33) {
                this.clock = new Clock(this.game, x+55, y-115)
            }

            if (Math.random() < 0.20) {
                this.clock = new Clock(this.game, x-40, y-75)
                this.clock.scale.x = -1
            }


            this.anchor.setTo(0.5, 1.0);

            game.add.existing(this);
        }
    }
}