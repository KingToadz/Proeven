/**
 * Created by Jelle on 5/6/2014.
 */

Player = function()
{
    this.texture = Files.PIC_GAME_OBJECT_PLAYER.obj;

    this.width = this.texture.width;
    this.height = this.texture.height;

    this.collisionContainer = new CollisionContainer();
    this.collisionContainer.addBox(0, 0, this.width, this.height);

    this.collisionContainer.owner = this;
    this.collisionContainer.initialize();

    this.hasCollided = false;
    this.isImmuneFor = 0;

    this.x = (Align.width / 2) - (this.width / 2);
    this.y = (Align.height / 2) - ((this.collisionContainer.height + 20) + this.collisionContainer.y);
    this.groundy = this.y;

    this.gravity = 0.8;
    this.speedy = 0;
    this.shouldStomp = false;
    this.hasJumped = false;
};

Player.prototype.tryJump = function()
{
    if(this.hasCollided == false)
    {
        if(this.hasJumped == false)
        {
            this.speedy = -20;
            this.hasJumped = true;
            SFX.playSound(Files.SND_GAME_PLAYER_JUMP);
        }
        else
        {
            this.speedy = 50;
            this.shouldStomp = true;
        }
    }
};

Player.prototype.tryStomp = function()
{
    if(this.hasCollided == false && this.y == this.groundy)
    {
        this.speedy = -20;
    }
};

Player.prototype.onCollision = function()
{
    this.collisionContainer.isColliding = true;
    this.hasCollided = true;
    this.shouldStomp = false;

    this.isImmuneFor = 180;
    SFX.playSound(Files.SND_GAME_PLAYER_DEATH);
};

Player.prototype.tick = function()
{
    this.speedy += this.gravity;
    this.y += this.speedy;

    if(this.y >= this.groundy)
    {
        this.y = this.groundy;
        this.hasJumped = false;
        if(this.shouldStomp)
        {
            this.shouldStomp = false;
            this.otherPlayer.tryStomp();
            SFX.playSound(Files.SND_GAME_PLAYER_STOMP);
        }
    }

    if(this.isImmuneFor > 0)
    {
        this.isImmuneFor--;
        if(this.isImmuneFor == 0)
        {
            this.hasCollided = false;
        }
    }
    else
    {
        if(this.hasCollided == false)
        {
            this.collisionContainer.tick(this.objectHandler.obstacles);
        }
    }
};

Player.prototype.draw = function(gfx)
{
    if(this.isImmuneFor > 0)
    {
        gfx.drawTransparentTexture(this.texture, this.x, this.y, this.width, this.height, 0.3);
    }
    else
    {
        gfx.drawTexture(this.texture, this.x, this.y, this.width, this.height);
    }

    this.collisionContainer.draw(gfx);
};
