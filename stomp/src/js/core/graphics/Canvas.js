/**
 * Created by Jelle on 4/25/2014.
 */

Canvas = function()
{
    this.canvas = document.createElement("canvas");
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
    this.gfx.gfx.translate(0, 0);
    this.gfx.gfx.rotate(0);
    this.gfx.gfx.scale(1, 1);

    if(this.height > this.width)
    {
        Align.setSS(this.height, this.width);

        this.rotated = true;

        this.gfx.gfx.scale(this.canvasWidth / Align.height, this.canvasHeight / Align.width);
        this.gfx.gfx.translate(Align.height, 0);
        this.gfx.gfx.rotate(90 * Math.PI / 180);
    }
    else
    {
        Align.setSS(this.width, this.height);
        this.gfx.gfx.rotate(0);
        this.gfx.gfx.scale(this.canvasWidth / Align.width, this.canvasHeight / Align.height);
    }
};
