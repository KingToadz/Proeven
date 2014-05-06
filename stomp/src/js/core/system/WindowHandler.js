/**
 * Created by Jelle on 4/26/2014.
 */

WindowHandler = function()
{
    // prepare body
    document.body.style.overflow = "hidden";

    // add components
    this.canvas = new Canvas();
    this.gfx = this.canvas.gfx;
    this.keyboardListener = new WindowKeyboardListener();
    this.mouseListener = new WindowMouseListener();

    this.keyboardListener.windowHandler = this;
    this.mouseListener.windowHandler = this;

    this.ticker = new Ticker();
    this.itemHandler = new ItemHandler();
    this.itemHandler.windowHandler = this;

    this.ticker.handler = this;
    this.itemHandler.setGotoItem(ItemInitialize);

    this.ticker.start();
};

WindowHandler.prototype.isMouseDown = function()
{
    return this.mouseListener.isMouseDown;
};

WindowHandler.prototype.getMousesDown = function()
{
    return this.mouseListener.mousedown;
};

WindowHandler.prototype.tick = function()
{
    // check if should rescale
    if(window.innerWidth != this.canvas.width || window.innerHeight != this.canvas.height)
    {
        this.canvas.rescale();
    }

    this.mouseListener.tick();

    this.itemHandler.tick();
    this.itemHandler.draw(this.gfx);

    this.gfx.drawString("FPS: " + this.ticker.curFPS + ";", 0, 80, "#FF0", "90px Arial");

    //this.gfx.drawString("Mouses: " + this.mouseListener.mousedown.length + ";", 100, 100, "#FFFF00", "30px Arial");
    /*
    for(var i = 0; i < this.mouseListener.mousedown.length; i++)
    {
        this.gfx.drawString("Mouse[" + i + "]: " + this.mouseListener.mousedown[i].ticksAlive + ";", 100, 130 + (i * 30), "#FFFF00", "30px Arial");
    }
    */
};
