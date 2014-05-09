/**
 * Created by Jelle on 5/6/2014.
 */

RotatableButton = function()
{
    this.texture = null;
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.rotation = 0;

    this.item = undefined;

    this.alignx = Align.LEFT;
    this.aligny = Align.TOP;
};

RotatableButton.prototype.setTexture = function(texture)
{
    this.texture = texture;
};

RotatableButton.prototype.setPosition = function(x, y)
{
    this.x = x;
    this.y = y;
};

RotatableButton.prototype.setSize = function(width, height)
{
    this.width = width;
    this.height = height;
};

RotatableButton.prototype.initialize = function()
{
    if(this.item == undefined)
    {
        console.error("Item is undefined.");
    }

    this.x -= parseInt(this.width / 2);
    this.y -= parseInt(this.height / 2);
};

RotatableButton.prototype.tick = function()
{
    if(this.item.itemHandler.windowHandler.isMouseDown())
    {
        var mousesdown = this.item.itemHandler.windowHandler.getMousesDown();
        for(var i = 0; i < mousesdown.length; i++)
        {
            if(mousesdown[i].ticksAlive == 1 && mousesdown[i].x >= this.alignx.sx() + this.x && mousesdown[i].y >= this.aligny.sy() + this.y && mousesdown[i].x < this.alignx.sx() + this.x + this.width && mousesdown[i].y < this.aligny.sy() + this.y + this.height)
            {
                this.onClick();
                break;
            }
        }
    }
};

RotatableButton.prototype.draw = function(gfx)
{
    gfx.drawRotatedTexture(this.texture, this.alignx.sx() + this.x, this.aligny.sy() + this.y, this.width, this.height, this.rotation);
};

// events
RotatableButton.prototype.onClick = function(){};
