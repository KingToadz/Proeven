/**
 * Created by Jelle on 5/7/2014.
 */

Obstacle = function()
{
    this.remove = false;

    this.texture = Files.PIC_GAME_OBJECT_OBSTACLEWALLNORMAL.obj;

    this.width = this.texture.width;
    this.height = this.texture.height;

    this.x = Align.width;
    this.y = (Align.height / 2) - (this.height + 1);

    this.collisionContainer = new CollisionContainer();
    this.collisionContainer.addBox(0, 0, this.width, this.height);

    this.collisionContainer.owner = this;
    this.collisionContainer.initialize();
};

Obstacle.prototype.onPlayerCollision = function(player)
{
    this.collisionContainer.isColliding = true;
    player.onCollision();
};

Obstacle.prototype.tick = function()
{
    this.x -= 10;
    if(this.x < 0 - this.width)
    {
        this.remove = true;
    }
};

Obstacle.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.texture, this.x, this.y, this.width, this.height);

    this.collisionContainer.draw(gfx, this.x, this.y);
};
