/**
 * Created by Jelle on 5/13/2014.
 */

BackgroundLayer = function(textureObj, speed)
{
    this.texture = textureObj.obj;
    this.speed = speed;

    this.width = this.texture.width;

    this.x = 0;
};

BackgroundLayer.prototype.tick = function()
{
    this.x -= this.speed;
    this.x = this.x % this.width;
};

BackgroundLayer.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.texture, this.x, 0, this.width + 2, 540);
    gfx.drawTexture(this.texture, this.x + this.width, 0, this.width + 2, 540);
};
