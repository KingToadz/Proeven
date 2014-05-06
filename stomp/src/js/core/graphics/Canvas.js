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

    var arg_width = Arguments.get("w");
    var arg_height = Arguments.get("h");

    if(arg_width != undefined)
    {
        this.width = parseInt(arg_width);
        this.x = parseInt((window.innerWidth / 2) - (this.width / 2));
    }

    if(arg_height != undefined)
    {
        this.height = parseInt(arg_height);
        this.y = parseInt((window.innerHeight / 2) - (this.height / 2));
    }

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    Align.setSS(this.width, this.height);

    this.canvas.style.position = "absolute";
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.canvas.style.left = this.x + "px";
    this.canvas.style.top = this.y + "px";

    // rotate
    this.rotated = false;
    this.gfx.gfx.translate(0, 0);
    this.gfx.gfx.rotate(0);
    this.gfx.gfx.scale(1, 1);

    if(this.height > this.width)
    {
        Align.setSS(this.height, this.width);

        this.rotated = true;

        this.gfx.gfx.scale(Align.ratioy, Align.ratiox);
        this.gfx.gfx.translate(Align.height, 0);
        this.gfx.gfx.rotate(90 * Math.PI / 180);
    }
    else
    {
        Align.setSS(this.width, this.height);
        this.gfx.gfx.rotate(0);
        this.gfx.gfx.scale(Align.ratiox, Align.ratioy);
    }
};
