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
    //this.collisionContainer.addBox(this.width, (this.height / 2) - 30, 30, 30);
    //this.collisionContainer.addBox(-30, (this.height / 2) - 30, 30, 30);
    //this.collisionContainer.addBox(-120, (this.height / 2) - 100, 30, 30);
    //this.collisionContainer.addBox(100, (this.height / 2) + 100, 30, 30);
    this.collisionContainer.initialize();

    this.x = (Align.width / 2) - (this.width / 2);
    this.y = (Align.height / 2) - ((this.collisionContainer.height + 1) + this.collisionContainer.y);
    this.groundy = this.y;

    this.gravity = 0.8;
    this.speedy = 0;
    this.shouldStomp = false;
    this.hasJumped = false;
};

Player.prototype.tryJump = function()
{
    if(this.hasJumped == false)
    {
        this.speedy = -20;
        this.hasJumped = true;
    }
    else
    {
        this.speedy = 50;
        this.shouldStomp = true;
    }
};

Player.prototype.tryStomp = function()
{
    if(this.y == this.groundy)
    {
        this.speedy = -20;
    }
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
        }
    }
};

Player.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.texture, this.x, this.y, this.width, this.height);

    this.collisionContainer.draw(gfx, this.x, this.y);
};
