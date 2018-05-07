// Not entirely sure what happens here; setting up defaults I assume
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// Function to load in assets - mainly things that don't change throughout the level
function preload ()
{
    this.load.image('sky', 'assets/dali.jpg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('bombs', 'assets/bomb.png');
    this.load.image('star', 'assets/star.png');

    // Character is animated using a spritesheet with 7 different frames
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

// Function where the assets, animations, etc. are put into the level
function create ()
{
    this.add.image(658, 500, 'sky');

    // Area's used to detect collision on with the character and other items sp
    // they don't fall infinitely
    platforms = this.physics.add.staticGroup();

    // Item in the level that kills the player
    bombs = this.physics.add.group();

    // Item in the level that give the player points
    stars = this.physics.add.group(
        {
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
        });

    // Creation of a set of platforms all with different dimensions but the same
    // physics
    platforms.create(658, 875, 'ground').setScale(5).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    player = this.physics.add.sprite(100, 210, 'dude');

    // Bounce factor added to the character
    player.setBounce(0.2);

    player.setCollideWorldBounds(true);

    // Setting up which items collide with each other and what happens if they do so
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    // Setting up controls for the character
    cursors = this.input.keyboard.createCursorKeys();

    // Creating animations for the character upon keyboard inputs
    this.anims.create(
        {
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
    this.anims.create(
        {
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });
    this.anims.create(
        {
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

    // Not sure if this is working
    stars.children.iterate(function (child)
    {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Variable for displaying points and counting amount of points
    var score = 0;
    var scoreText;

    // Adding the text to HTML
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // Adding mechanics upon collision between player and star
    function collectStar (player, star)
    {
        // Star which detects collision becomes hidden
        star.disableBody(true, true);
        // Each star gives 10 points
        score += 10;
        // 10 points are added to the variable score
        scoreText.setText('Score: ' + score);
        // If the player collected all 10 stars, all stars respawn
        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child)
            {
                child.enableBody(true, child.x, 0, true, true);
            });

            // If character sits on left side of the level create a random integer between 400 and 800 pixels
            // If character sits on the right side of the level create a random integer between 0 and 400 pixel
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            // Creating a variable bomb and set some physics
            var bomb = bombs.create(x, 16, 'bombs');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            // Set random velocity to the bombs falling velocity
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            // Disable default gravity for the bomb
            bomb.allowGravity = false;
        }
    }

    // Mechanics/settings when player and bomb collide
    function hitBomb (player, bombs)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
    }
}

// Function for items that need to repeatedly update throughout the level
function update ()
{
    // Adding playing controls like moving/jumping aswell as adding mechanics to said control
    if (cursors.left.isDown)
    {
        // console.log("left key");
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    // Standing still
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    // Jumping
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
