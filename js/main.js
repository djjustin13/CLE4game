//Define game settings
var config = {
    type: Phaser.AUTO,
    width: 1316,
    height: 800,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
    },
    scene: demo
};

//Setup game
var game = new Phaser.Game(config);

