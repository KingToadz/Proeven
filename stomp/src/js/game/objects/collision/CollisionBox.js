/**
 * Created by Jelle on 5/7/2014.
 */

CollisionBox = function(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

CollisionBox.prototype.isCollidingWith = function(box)
{
    var tx1 = this.container.owner.x + this.x;
    var ty1 = this.container.owner.y + this.y;
    var tx2 = tx1 + this.width;
    var ty2 = ty1 + this.height;

    var cx1 = box.container.owner.x + box.x;
    var cy1 = box.container.owner.y + box.y;
    var cx2 = cx1 + box.width;
    var cy2 = cy1 + box.height;

    return CollisionUtil.checkCollision(tx1, ty1, tx2, ty2, cx1, cy1, cx2, cy2);
};

CollisionBox.prototype.draw = function(gfx)
{
    //gfx.fillRect(this.container.owner.x + this.x, this.container.owner.y + this.y, this.width, this.height, "#F00");
    //gfx.drawRect(this.container.owner.x + this.x, this.container.owner.y + this.y, this.width, this.height, "#000", 1);
};
