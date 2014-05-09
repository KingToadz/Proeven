/**
 * Created by Jelle on 4/25/2014.
 */

WindowMouseListener = function()
{
    this.mousedown = [];
    this.touchIdToMouseEvent = [];
    this.mouseButtonToMouseEvent = [];

    this.isMouseDown = false;

    // mouse down
    window.onmousedown = new EventHandler(this, this.onMouseDown);
    window.onmousemove = new EventHandler(this, this.onMouseMove);
    window.onmouseup = new EventHandler(this, this.onMouseUp);

    window.ontouchstart = new EventHandler(this, this.onTouchDown);
    window.ontouchmove = new EventHandler(this, this.onTouchMove);
    window.ontouchend = new EventHandler(this, this.onTouchUp);
    window.ontouchcancel = new EventHandler(this, this.onTouchUp);

    window.oncontextmenu = function(){return false;};
};

WindowMouseListener.prototype.tick = function()
{
    for(var i = 0; i < this.mousedown.length; i++)
    {
        this.mousedown[i].tick();
        if(this.mousedown[i].remove == true)
        {
            if(this.mousedown[i].isMouse == true)
            {
                this.mouseButtonToMouseEvent[this.mousedown[i].id] = null;
            }

            if(this.mousedown[i].isTouch == true)
            {
                this.touchIdToMouseEvent[this.mousedown[i].id] = null;
            }
            this.mousedown.splice(i, 1);
            i--;
        }
    }

    this.isMouseDown = this.mousedown.length != 0;
};

WindowMouseListener.prototype.setMousePosition = function(mouseEvent, rx, ry)
{
    if(this.windowHandler.canvas.rotated == true)
    {
        mouseEvent.newY = Align.height - ((rx - this.windowHandler.canvas.x) * Align.ratiorevy);
        mouseEvent.newX = ((ry - this.windowHandler.canvas.y) * Align.ratiorevx);
    }
    else
    {
        mouseEvent.newX = ((rx - this.windowHandler.canvas.x) * Align.ratiorevx);
        mouseEvent.newY = ((ry - this.windowHandler.canvas.y) * Align.ratiorevy);
    }
};

// events
WindowMouseListener.prototype.onMouseDown = function(ev)
{
    ev.preventDefault();

    var id = parseInt(ev.button);

    var mouseEvent = new MouseEvent();

    mouseEvent.isMouse = true;

    mouseEvent.id = id;

    this.setMousePosition(mouseEvent, ev.pageX, ev.pageY);

    mouseEvent.lastX = mouseEvent.newX;
    mouseEvent.lastY = mouseEvent.newY;
    mouseEvent.x = mouseEvent.newX;
    mouseEvent.y = mouseEvent.newY;

    this.mouseButtonToMouseEvent[id] = mouseEvent;

    this.mousedown.push(mouseEvent);
};

WindowMouseListener.prototype.onMouseMove = function(ev)
{
    //ev.preventDefault();

    var id = parseInt(ev.button);
    var mouseEvent = this.mouseButtonToMouseEvent[id];

    if(mouseEvent != undefined)
    {
        this.setMousePosition(mouseEvent, ev.pageX, ev.pageY);
    }
    else
    {
        console.log("wut?");
    }
};

WindowMouseListener.prototype.onMouseUp = function(ev)
{
    ev.preventDefault();

    var id = parseInt(ev.button);
    var mouseEvent = this.mouseButtonToMouseEvent[id];

    mouseEvent.remove = true;
};

WindowMouseListener.prototype.onTouchDown = function(ev)
{
    ev.preventDefault();

    for(var i = 0; i < ev.changedTouches.length; i++)
    {
        var touch = ev.changedTouches[i];
        var id = parseInt(touch.identifier);

        var mouseEvent = new MouseEvent();

        mouseEvent.isTouch = true;

        mouseEvent.id = id;

        this.setMousePosition(mouseEvent, touch.pageX, touch.pageY);

        mouseEvent.lastX = mouseEvent.newX;
        mouseEvent.lastY = mouseEvent.newY;
        mouseEvent.x = mouseEvent.newX;
        mouseEvent.y = mouseEvent.newY;

        this.touchIdToMouseEvent[id] = mouseEvent;

        this.mousedown.push(mouseEvent);
    }
};

WindowMouseListener.prototype.onTouchMove = function(ev)
{
    ev.preventDefault();

    for(var i = 0; i < ev.changedTouches.length; i++)
    {
        var touch = ev.changedTouches[i];
        var id = parseInt(touch.identifier);
        var mouseEvent = this.touchIdToMouseEvent[id];

        this.setMousePosition(mouseEvent, touch.pageX, touch.pageY);
    }
};

WindowMouseListener.prototype.onTouchUp = function(ev)
{
    ev.preventDefault();

    for(var i = 0; i < ev.changedTouches.length; i++)
    {
        var touch = ev.changedTouches[i];
        var id = parseInt(touch.identifier);
        var mouseEvent = this.touchIdToMouseEvent[id];
        mouseEvent.remove = true;
    }
};
