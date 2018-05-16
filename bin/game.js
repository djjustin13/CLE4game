var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyGame;
(function (MyGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(480, 260, 1024, 768);
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
            }
        };
        Boot.prototype.preload = function () {
        };
        Boot.prototype.create = function () {
            console.log("Boot state");
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    MyGame.Boot = Boot;
})(MyGame || (MyGame = {}));
var myGame;
(function (myGame) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(game, x, y) {
            var _this = _super.call(this, game, x, y, 'enemy', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            game.add.existing(_this);
            return _this;
        }
        Enemy.prototype.update = function () {
        };
        return Enemy;
    }(Phaser.Sprite));
    myGame.Enemy = Enemy;
})(myGame || (myGame = {}));
var MyGame;
(function (MyGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, window.innerWidth - 100, 600, Phaser.AUTO, 'content', null) || this;
            _this.state.add('Boot', MyGame.Boot, false);
            _this.state.add('Preloader', MyGame.Preloader, false);
            _this.state.add('MainMenu', MyGame.MainMenu, false);
            _this.state.add('Level1', MyGame.Level1, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    MyGame.Game = Game;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level1.prototype.create = function () {
            var h = this.game.world.height;
            this.game.world.setBounds(0, 0, 6000, 600);
            this.background = this.add.tileSprite(0, 0, this.world.width, 600, 'bgTile');
            this.platforms = this.add.group();
            this.platforms.enableBody = true;
            this.ground = this.platforms.create(0, h - 32, 'ground');
            this.ground.body.immovable = true;
            this.ground.width = this.world.height;
            this.ground.scale.x = 100;
            this.ledge = this.platforms.create(400, h - 120, 'ground');
            this.ledge.body.immovable = true;
            this.ledge = this.platforms.create(0, 400, 'ground');
            this.ledge.body.immovable = true;
            this.objects = this.add.group();
            this.objects.create(600, h - 80, 'item');
            this.enemy = this.add.group();
            this.enemy.enableBody = true;
            this.enemy = this.enemy.create(260, 360, 'eye');
            this.game.physics.arcade.enable(this.enemy);
            this.player = new MyGame.Player(this.game, 30, 284);
            this.game.physics.arcade.enable(this.player);
            this.game.camera.follow(this.player);
            console.log("level started");
        };
        Level1.prototype.update = function () {
            this.physics.arcade.collide(this.player, this.platforms);
            this.physics.arcade.collide(this.player, this.platforms);
            this.physics.arcade.collide(this.player, this.enemy);
        };
        return Level1;
    }(Phaser.State));
    MyGame.Level1 = Level1;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            console.log("menu state");
            this.startGame();
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    MyGame.MainMenu = MainMenu;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, 'dude', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.body.collideWorldBounds = true;
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('right', [5, 6, 7, 8], 10, true);
            _this.animations.add('left', [5, 6, 7, 8], 10, true);
            game.add.existing(_this);
            return _this;
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 350;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A) || this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('left');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('right');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.stop();
            }
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) && this.body.touching.down) {
                this.body.velocity.y = -250;
            }
        };
        return Player;
    }(Phaser.Sprite));
    MyGame.Player = Player;
})(MyGame || (MyGame = {}));
var MyGame;
(function (MyGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ready = false;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.load.image('level1', 'assets/bg.jpg');
            this.load.image('bgTile', 'assets/bgTile.jpg');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('item', 'assets/artPiece.png');
            this.load.image('platformTile', 'assets/platformTile');
            this.load.image('eye', 'assets/eye.png');
            this.load.spritesheet('dude', 'assets/dude.png', 32, 48, 9);
        };
        Preloader.prototype.create = function () {
            console.log("preload state..");
            this.game.state.start('MainMenu');
        };
        return Preloader;
    }(Phaser.State));
    MyGame.Preloader = Preloader;
})(MyGame || (MyGame = {}));
//# sourceMappingURL=game.js.map