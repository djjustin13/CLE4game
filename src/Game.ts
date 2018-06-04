module MyGame {

	export class Game extends Phaser.Game {

		constructor() {
			
			super(1020, 600, Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('StartScreen', StartScreen, false);
			this.state.add('MainMenu', MainMenu, false);
			this.state.add('Level1', Level1, false);
			this.state.add('Level2', Level2, false);
			this.state.add('Level2', Level3, false);
			this.state.add('TestLevel', TestLevel, false)
			this.state.add('LevelComplete', LevelOneComplete, false);
			this.state.add('LevelComplete', LevelTwoComplete, false);
			this.state.add('LevelComplete', LevelThreeComplete, false);
			this.state.add('GameOver', GameOver, false);

			this.state.start('Boot');

		}

	}

}