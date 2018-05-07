var demo = new Phaser.Scene('Demo');

demo.preload = function ()
{
    this.load.image('sky', 'assets/dali.jpg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('bombs', 'assets/bomb.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

demo.create = function ()
{
    this.add.image(658, 500, 'sky');

    platforms = this.physics.add.staticGroup();
    bombs = this.physics.add.group();
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    platforms.create(658, 875, 'ground').setScale(5).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    player = this.physics.add.sprite(100, 210, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    cursors = this.input.keyboard.createCursorKeys();

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

    var score = 0;
    var scoreText;

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bombs');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

    function hitBomb (player, bombs)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
    }
}

demo.update = function ()
{
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
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}