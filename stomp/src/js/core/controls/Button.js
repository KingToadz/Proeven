/**
 * Created by Jelle on 4/27/2014.
 */

Button = function()
{
    this.texture = null;
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;

    this.item = undefined;

    this.alignx = Align.LEFT;
    this.aligny = Align.TOP;
};

Button.prototype.setTexture = function(texture)
{
    this.texture = texture;
};

Button.prototype.setPosition = function(x, y)
{
    this.x = x;
    this.y = y;
};

Button.prototype.setSize = function(width, height)
{
    this.width = width;
    this.height = height;
};

Button.prototype.initialize = function()
{
    if(this.item == undefined)
    {
        console.error("Item is undefined.");
    }

    this.x -= parseInt(this.width / 2);
    this.y -= parseInt(this.height / 2);
};

Button.prototype.tick = function()
{
    if(this.item.itemHandler.windowHandler.isMouseDown())
    {
        var mousesdown = this.item.itemHandler.windowHandler.getMousesDown();
        for(var i = 0; i < mousesdown.length; i++)
        {
            if(mousesdown[i].ticksAlive == 1 && mousesdown[i].x >= this.alignx.sx() + this.x && mousesdown[i].y >= this.aligny.sy() + this.y && mousesdown[i].x < this.alignx.sx() + this.x + this.width && mousesdown[i].y < this.aligny.sy() + this.y + this.height)
            {
                this.onClick(this);
                break;
            }
        }
    }
};

Button.prototype.draw = function(gfx)
{
    if(this.texture != undefined)
    {
        gfx.drawTexture(this.texture, this.item.x + this.alignx.sx() + this.x, this.item.y + this.aligny.sy() + this.y, this.width, this.height);
    }
};

// events
Button.prototype.onClick = function(sender){};
