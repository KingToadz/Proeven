/**
 * Created by Jelle on 4/29/2014.
 */

ItemTestMenu = function()
{
    this.firstDraw = true;
};

ItemTestMenu.prototype.initialize = function()
{
};

ItemTestMenu.prototype.activate = function()
{
};

ItemTestMenu.prototype.deActivate = function()
{
};

ItemTestMenu.prototype.tick = function()
{
};

ItemTestMenu.prototype.draw = function(gfx)
{
    if(this.firstDraw == true)
    {
        this.firstDraw = false;
        gfx.clear("#FFF");
    }

    if(this.itemHandler.windowHandler.isMouseDown())
    {
        var mousesdown = this.itemHandler.windowHandler.getMousesDown();
        for (var i = 0; i < mousesdown.length; i++)
        {
            if(mousesdown[i].lastX != mousesdown[i].x || mousesdown[i].lastY != mousesdown[i].y)
            {
                gfx.drawLine(mousesdown[i].lastX, mousesdown[i].lastY, mousesdown[i].x - mousesdown[i].lastX, mousesdown[i].y - mousesdown[i].lastY, mousesdown[i].color, 10);
            }
        }
    }
};
