/**
 * Created by Jelle on 6/4/2014.
 */

BigObstacleXS = function()
{
    this.remove = false;

    this.texture = Files.PIC_GAME_OBJECT_OBSTACLEBIGXS;

    this.width = this.texture.width;
    this.height = this.texture.height;

    this.x = Align.width;
    this.y = (Align.height / 2) - (this.height + 20);

    this.collisionContainer = new CollisionContainer();
    this.collisionContainer.addBox(10, this.height / 2, 40, this.height / 2); // medium left
    this.collisionContainer.addBox(this.width - 50, this.height / 2 - 20, 25, this.height / 2 + 20); // medium right
    this.collisionContainer.addBox(25, (this.height / 2) - 25, 25, 25); // small center left
    this.collisionContainer.addBox(this.width - 25, this.height - 50, 25, 50); // small bottom right
    this.collisionContainer.addBox(50, 15, this.width - 100, this.height - 15); // long middle

    this.collisionContainer.owner = this;
    this.collisionContainer.initialize();
};

BigObstacleXS.prototype.onPlayerCollision = function(player)
{
    this.collisionContainer.isColliding = true;
    player.onCollision();
};

BigObstacleXS.prototype.tick = function()
{
    this.x -= this.objectHandler.moveSpeed;
    if(this.x < 0 - this.width)
    {
        this.remove = true;
    }
};

BigObstacleXS.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.texture, this.x, this.y, this.width, this.height);
};
