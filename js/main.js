//Define game settings
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
    },
    scene: scene1
};

//Setup game
var game = new Phaser.Game(config);

