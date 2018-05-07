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

var game = new Phaser.Game(config);

