//Define scene
var scene1 = new Phaser.Scene('Demo');

// Function to load in assets - mainly things that don't change throughout the level
scene1.preload = function ()
{
    this.load.image('sky', 'assets/dali.jpg');
    this.load.image('ground', 'assets/platform.png');

    // Character is animated using a spritesheet with 7 different frames
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

// Function where the assets, animations, etc. are put into the level
scene1.create = function ()
{

    this.add.image(658, 500, 'sky');

    // Area's used to detect collision on with the character and other items sp
    platforms = this.physics.add.staticGroup();

    // Creation of a set of platforms all with different dimensions but the same physics
    platforms.create(658, 875, 'ground').setScale(5).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    player = this.physics.add.sprite(100, 210, 'dude');

    //Bounce factor added to the character
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    scene1.physics.add.collider(player, platforms);

    this.cameras.main.startFollow(player);

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

}

// Function for items that need to repeatedly update throughout the level
scene1.update = function (time, delta)
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
