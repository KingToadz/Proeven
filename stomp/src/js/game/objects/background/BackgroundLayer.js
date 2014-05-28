/**
 * Created by Jelle on 5/13/2014.
 */

BackgroundLayer = function(textureObj, speed)
{
    this.texture = textureObj;
    this.speed = speed;

    this.width = Align.width * 2;
    this.height = Align.height / 2;

    this.x = 0;
};

BackgroundLayer.prototype.tick = function()
{
    this.x -= this.speed;
    this.x = this.x % this.width;
};

BackgroundLayer.prototype.draw = function(gfx)
{
    // left
    {
        var x1 = this.x;
        var y1 = 0;
        var x2 = this.width + 2;
        var y2 = 540;
        var cx1 = 0;
        var cy1 = 0;
        var cx2 = this.texture.width;
        var cy2 = this.texture.height;
        gfx.drawClippedTexture(this.texture, x1, y1, x2, y2, cx1, cy1, cx2, cy2);
    }

    // right
    {
        var x1 = this.x + this.width;
        var y1 = 0;
        var x2 = this.width + 2;
        var y2 = 540;
        var cx1 = 0;
        var cy1 = 0;
        var cx2 = this.texture.width;
        var cy2 = this.texture.height;
        gfx.drawClippedTexture(this.texture, x1, y1, x2, y2, cx1, cy1, cx2, cy2);
    }
};
