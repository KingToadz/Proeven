/**
 * Created by Jelle on 5/13/2014.
 */

BackgroundLayer = function(textureObj, speed)
{
    this.texture = textureObj;

    this.width = Align.width * 2;
    this.height = Align.height / 2;

    this.speedRatio = speed;

    this.x = 0;
    this.cratio = this.width / this.texture.width;

    this.minX = 0;
    this.maxX = Align.width;
};

BackgroundLayer.prototype.tick = function()
{
    this.x -= this.backgroundHandler.world.objectHandler.moveSpeed * this.speedRatio;
    this.x = this.x % this.width;
};

BackgroundLayer.prototype.draw = function(gfx)
{
    // left
    {
        var x1 = this.x;
        var y1 = 0;
        var x2 = this.width;
        var y2 = 540;
        var cx1 = 0;
        var cy1 = 0;
        var cx2 = this.texture.width;
        var cy2 = this.texture.height;

        if(x1 < this.minX)
        {
            cx1 += (this.minX - x1) / this.cratio;
            x1 = this.minX;
        }

        if(x1 + x2 > this.maxX)
        {
            var w = this.maxX - x1;
            cx2 = w / this.cratio;
            x2 = w;
        }

        if(cx1 >= 0 && cy1 >= 0 && cx2 >= 0 && cy2 >= 0 && x2 > 0 && y2 > 0)
            gfx.drawClippedTexture(this.texture, x1, y1, x2, y2, cx1, cy1, cx2, cy2);
    }

    // right
    {
        var x1 = this.x + this.width;
        var y1 = 0;
        var x2 = this.width;
        var y2 = 540;
        var cx1 = 0;
        var cy1 = 0;
        var cx2 = this.texture.width;
        var cy2 = this.texture.height;

        if(x1 < this.minX)
        {
            cx1 += (this.minX - x1) / this.cratio;
            x1 = this.minX;
        }

        if(x1 + x2 > this.maxX)
        {
            var w = this.maxX - x1;
            cx2 = w / this.cratio;
            x2 = w;
        }

        if(cx1 >= 0 && cy1 >= 0 && cx2 >= 0 && cy2 >= 0 && x2 > 0 && y2 > 0)
            gfx.drawClippedTexture(this.texture, x1, y1, x2, y2, cx1, cy1, cx2, cy2);
    }
};
