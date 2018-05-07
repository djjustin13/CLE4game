//Define scene
var demo = new Phaser.Scene('Demo');

// Function to load in assets - mainly things that don't change throughout the level
demo.preload = function ()
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
demo.create = function ()
{
    this.add.image(658, 500, 'sky');

    // Area's used to detect collision on with the character and other items sp
    platforms = this.physics.add.staticGroup();
    bombs = this.physics.add.group();
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    // Creation of a set of platforms all with different dimensions but the same physics
    platforms.create(658, 875, 'ground').setScale(5).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    player = this.physics.add.sprite(100, 210, 'dude');

    //Bounce factor added to the character
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

     // Setting up controls for the character
    cursors = this.input.keyboard.createCursorKeys();

    //Creating animations upon key inputs
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //Score variables
    var score = 0;
    var scoreText;

    //Adding text to HTML
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
 
    // Adding mechanics upon collision between player and star
    function collectStar (player, star)
    {
        // Star which detects collision becomes hidden
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);
        
        // If the player collected all 10 stars, all stars respawn
        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

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
demo.update = function ()
{
    // Adding playing controls like moving/jumping aswell as adding mechanics to said control
    if (cursors.left.isDown)
    {
        console.log("left key");
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