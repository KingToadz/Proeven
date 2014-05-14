/**
 * Created by Jelle on 5/7/2014.
 */

BigObstacle = function()
{
    this.remove = false;

    this.texture = Files.PIC_GAME_OBJECT_OBSTACLEWALLNORMAL.obj;

    this.width = this.texture.width;
    this.height = this.texture.height * 2;

    this.x = Align.width;
    this.y = (Align.height / 2) - (this.height + 20);

    this.collisionContainer = new CollisionContainer();
    this.collisionContainer.addBox(0, 0, this.width, this.height);

    this.collisionContainer.owner = this;
    this.collisionContainer.initialize();
};

BigObstacle.prototype.onPlayerCollision = function(player)
{
    this.collisionContainer.isColliding = true;
    player.onCollision();
};

BigObstacle.prototype.tick = function()
{
    this.x -= 10;
    if(this.x < 0 - this.width)
    {
        this.remove = true;
    }
};

BigObstacle.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.texture, this.x, this.y, this.width, this.height);

    this.collisionContainer.draw(gfx, this.x, this.y);
};
