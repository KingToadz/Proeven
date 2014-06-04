/**
 * Created by Jelle on 4/25/2014.
 */

Canvas = function()
{
    if(Util.isCocoonJS)
    {
        // screencanvas is only supported in CocoonJS, but when used the performace is much higher
        this.canvas = document.createElement("screencanvas");
    }
    else
    {
        // just the default HTML5 canvas for the browsers
        this.canvas = document.createElement("canvas");
    }

    document.body.appendChild(this.canvas);

    this.gfx = new GFX(this);

    this.rescale();
};

Canvas.prototype.rescale = function()
{
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.x = 0;
    this.y = 0;

    this.canvasWidth = this.width;
    this.canvasHeight = this.height;

    var arg_width = Arguments.get("w");
    var arg_height = Arguments.get("h");

    if(arg_width != undefined)
    {
        this.canvasWidth = parseInt(arg_width);
    }

    if(arg_height != undefined)
    {
        this.canvasHeight = parseInt(arg_height);
    }

    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;

    this.canvas.style.position = "absolute";
    this.canvas.style.width = window.innerWidth + "px";
    this.canvas.style.height = window.innerHeight + "px";
    this.canvas.style.left = 0 + "px";
    this.canvas.style.top = 0 + "px";
    this.canvas.style.imageRendering = "-webkit-optimize-contrast";

    // rotate
    this.rotated = false;

    if(this.height > this.width)
    {
        Align.setSS(this.height, this.width);

        this.rotated = true;

        this.gfx.scaleX = this.canvasWidth / Align.height;
        this.gfx.scaleY = this.canvasHeight / Align.width;

        this.gfx.offsetX = Align.height;
        this.gfx.offsetY = 0;

        this.gfx.rotation = 90 * Math.PI / 180;
    }
    else
    {
        Align.setSS(this.width, this.height);

        this.gfx.scaleX = this.canvasWidth / Align.width;
        this.gfx.scaleY = this.canvasHeight / Align.height;

        this.gfx.offsetX = 0;
        this.gfx.offsetY = 0;

        this.gfx.rotation = 0;
    }

    this.gfx.gfx.save();
};
