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
    this.itemHandler.switchItem(ItemInitialize);

    // events
    window.onfocus = function(){};
    window.onblur = function(){};

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
    this.keyboardListener.tick();

    this.gfx.tick();

    this.itemHandler.tick();
    this.itemHandler.draw(this.gfx);
};
