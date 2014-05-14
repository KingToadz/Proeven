/**
 * Created by Jelle on 5/14/2014.
 */

SlideButton = function()
{
    this.texture = null;
    this.texture2 = null;
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;

    this.item = undefined;

    this.alignx = Align.LEFT;
    this.aligny = Align.TOP;

    this.widths = 0;
    this.value = 0;
    this.selectedMouse = undefined;
};

SlideButton.prototype.setTexture = function(texture)
{
    this.texture = texture;
};

SlideButton.prototype.setTexture2 = function(texture2)
{
    this.texture2 = texture2;
};

SlideButton.prototype.setPosition = function(x, y)
{
    this.x = x;
    this.y = y;
};

SlideButton.prototype.setSize = function(width, height)
{
    this.width = width;
    this.height = height;
};

SlideButton.prototype.setValue = function(value)
{
    this.value = value;
};

SlideButton.prototype.initialize = function()
{
    if(this.item == undefined)
    {
        console.error("Item is undefined.");
    }

    this.x -= parseInt(this.width / 2);
    this.y -= parseInt(this.height / 2);
};

SlideButton.prototype.tick = function()
{
    if(this.selectedMouse != undefined)
    {
        if(this.selectedMouse.remove == true)
        {
            this.selectedMouse = undefined;
            this.onClick();
        }
        else
        {
            var mx = this.selectedMouse.x - (this.x + this.alignx.sx());
            if(mx < 0) mx = 0;
            if(mx > this.width) mx = this.width;

            this.widths = mx;
            this.value = (100.0 / this.width) * this.widths;
        }
    }
    else
    {
        if(this.item.itemHandler.windowHandler.isMouseDown())
        {
            var mousesdown = this.item.itemHandler.windowHandler.getMousesDown();
            for(var i = 0; i < mousesdown.length; i++)
            {
                if(mousesdown[i].ticksAlive == 1 && mousesdown[i].x >= this.alignx.sx() + this.x && mousesdown[i].y >= this.aligny.sy() + this.y && mousesdown[i].x < this.alignx.sx() + this.x + this.width && mousesdown[i].y < this.aligny.sy() + this.y + this.height)
                {
                    //this.onClick();
                    this.selectedMouse = mousesdown[i];
                    break;
                }
            }
        }
    }
};

SlideButton.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.texture, this.alignx.sx() + this.x, this.aligny.sy() + this.y, this.width, this.height);
    gfx.drawClippedTexture(this.texture2, this.alignx.sx() + this.x, this.aligny.sy() + this.y, this.widths, this.height, 0, 0, (this.widths / this.width) * this.texture2.width, this.texture2.height);
};

SlideButton.prototype.onClick = function()
{

};
