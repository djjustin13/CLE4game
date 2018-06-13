module MyGame {

	export class Game extends Phaser.Game {

		// Overall
		public lives:number = 9
		public gameprogression = 0

		// Level 1
		public artpieces1:number = 0
		public timer1:string = "00:00"

		// Level 2
		public artpieces2:number = 0
		public timer2:string = "00:00"

		// Level 3
		public artpieces3:number = 0
		public timer3:string = "00:00"

		constructor() {
			super(1020, 600, Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('StartScreen', StartScreen, false);
			this.state.add('MainMenu', MainMenu, false);
			this.state.add('Gallary', Gallary, false);
			this.state.add('Level1', Level1, false);
			this.state.add('Level2', Level2, false);
			this.state.add('Level3', Level3, false);
			this.state.add('TestLevel', TestLevel, false)
			this.state.add('LevelOneComplete', LevelOneComplete, false);
			this.state.add('LevelTwoComplete', LevelTwoComplete, false);
			this.state.add('LevelThreeComplete', LevelThreeComplete, false);
			this.state.add('GameOver', GameOver, false);

			this.state.start('Boot');

		}

	}

}