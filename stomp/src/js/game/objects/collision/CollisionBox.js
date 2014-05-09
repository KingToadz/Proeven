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

CollisionBox.prototype.draw = function(gfx, x, y)
{
    //gfx.fillRect(x + this.x, y + this.y, this.width, this.height, "#F00");
    //gfx.drawRect(x + this.x, y + this.y, this.width, this.height, "#000");
};
