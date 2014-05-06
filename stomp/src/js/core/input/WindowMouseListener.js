/**
 * Created by Jelle on 4/25/2014.
 */

WindowMouseListener = function()
{
    this.mousedown = [];
    this.isMouseDown = false;

    // mouse down
    this.mouseDownEvent = new EventHandler(this, this.onMouseDown);
    window.onmousedown = this.mouseDownEvent.execute;
    window.ontouchstart = this.mouseDownEvent.execute;
};

WindowMouseListener.prototype.tick = function()
{
    for(var i = 0; i < this.mousedown.length; i++)
    {
        this.mousedown[i].tick();
        if(this.mousedown[i].remove == true)
        {
            this.mousedown.splice(i, 1);
            i--;
        }
    }

    this.isMouseDown = this.mousedown.length != 0;
};

// events
WindowMouseListener.prototype.onMouseDown = function(ev)
{
    ev.preventDefault();

    var mouseEvent = new MouseEvent();
    var rx = 0;
    var ry = 0;

    if(ev.touches)
    {
        var i = this.mousedown.length;
        rx = ev.touches[i].pageX;
        ry = ev.touches[i].pageY;
    }
    else
    {
        rx = ev.pageX;
        ry = ev.pageY;
    }

    if(this.windowHandler.canvas.rotated == true)
    {
        mouseEvent.y = Align.height - ((rx - this.windowHandler.canvas.x) * Align.ratiorevy);
        mouseEvent.x = ((ry - this.windowHandler.canvas.y) * Align.ratiorevx);
    }
    else
    {
        mouseEvent.x = ((rx - this.windowHandler.canvas.x) * Align.ratiorevx);
        mouseEvent.y = ((ry - this.windowHandler.canvas.y) * Align.ratiorevy);
    }

    this.mousedown.push(mouseEvent);
};
