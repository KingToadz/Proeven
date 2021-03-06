/**
 * Created by Jelle on 5/7/2014.
 */

SmallObstacle = function()
{
    this.remove = false;

    this.texture = Files.PIC_GAME_OBJECT_OBSTACLESMALL;

    this.width = this.texture.width;
    this.height = this.texture.height;

    this.x = Align.width;
    this.y = (Align.height / 2) - (this.height + 20);

    this.collisionContainer = new CollisionContainer();
    
    this.collisionContainer.addBox(5, this.height / 2, 45, this.height / 2); // medium left
    this.collisionContainer.addBox(this.width - 50, this.height / 2, 45, this.height / 2); // medium right
    this.collisionContainer.addBox(20, (this.height / 2) - 20, 30, 20); // small center left
    this.collisionContainer.addBox(this.width - 50, (this.height / 2) - 20, 30, 20); // small center right
    this.collisionContainer.addBox(50, 0, this.width - 100, this.height); // long middle

    
    this.passedPlayer = false;

    this.collisionContainer.owner = this;
    this.collisionContainer.initialize();
    
    this.bigObstacle = false;
    this.xsmall = false;
};

SmallObstacle.prototype.onPlayerCollision = function(player)
{
    this.collisionContainer.isColliding = true;
    player.onCollision();
};

SmallObstacle.prototype.tick = function()
{
    this.x -= this.objectHandler.moveSpeed;
    if(this.x < 0 - this.width)
    {
        this.remove = true;
    }
};

SmallObstacle.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.texture, this.x, this.y, this.width, this.height);
};
