/**
 * Created by Jelle on 5/6/2014.
 */

Player = function(dir)
{
    this.dir = dir;

    this.texture = Files.PIC_GAME_OBJECT_PLAYER.obj;

    this.x = (Align.width / 2) - (this.texture.width / 2);
    this.y = (Align.height / 2) + (((this.texture.height / 2) + 1) * this.dir);
    this.groundy = this.y;
    this.width = this.texture.width;
    this.height = this.texture.height;
    this.rotation = 0;

    this.gravity = 0.5;
    this.speedy = 0;
    this.shouldStomp = false;
    this.hasJumped = false;
};

Player.prototype.tryJump = function()
{
    if(this.hasJumped == false)
    {
        this.speedy = 20 * this.dir;
        this.hasJumped = true;
    }
    else
    {
        this.speedy = -50 * this.dir;
        this.shouldStomp = true;
    }
};

Player.prototype.tryStomp = function()
{
    if(this.y == this.groundy)
    {
        this.speedy = 20 * this.dir;
    }
};

Player.prototype.tick = function()
{
    this.speedy -= this.gravity * this.dir;
    this.y += this.speedy;

    if(this.y * this.dir <= this.groundy * this.dir)
    {
        this.y = this.groundy;
        this.hasJumped = false;
        if(this.shouldStomp)
        {
            this.shouldStomp = false;
            this.otherPlayer.tryStomp();
        }
    }
};

Player.prototype.draw = function(gfx)
{
    gfx.drawRotatedTexture(this.texture, this.x, this.y, this.width, this.height, this.rotation);
};
