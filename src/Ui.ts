module MyGame {

    export class Ui{
        game: Game
        constructor(g:Game){
            this.game = g
            let ui:Phaser.Sprite = this.game.add.sprite(this.game.width, 0, 'uiBase');
            ui.anchor.setTo(1, 0)
            ui.fixedToCamera = true

            let pauseButton:Phaser.Sprite = this.game.add.sprite(0, 0, 'gamePause');
            pauseButton.fixedToCamera = true

        }

    }

}