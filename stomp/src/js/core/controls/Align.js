/**
 * Created by Jelle on 4/28/2014.
 */

Align = function(ratiox, ratioy)
{
    this.ratiox = ratiox;
    this.ratioy = ratioy;

    this.set();

    Align.aligns.push(this);
};

Align.aligns = [];

Align.screenW = 0;
Align.screenH = 0;

Align.width = 1920;
Align.height = 1080;

Align.ratiox = 0;
Align.ratioy = 0;

Align.setSS = function(w, h)
{
    Align.screenW = w;
    Align.screenH = h;

    Align.ratiox = Align.screenW / Align.width;
    Align.ratioy = Align.screenH / Align.height;

    Align.ratiorevx = Align.width / Align.screenW;
    Align.ratiorevy = Align.height / Align.screenH;

    for(var i = 0; i < Align.aligns.length; i++)
    {
        Align.aligns[i].set();
    }
};

Align.prototype.set = function()
{
    this.sw = this.x(Align.width);
    this.sh = this.y(Align.height);
};

Align.prototype.sx = function()
{
    return this.sw;
};

Align.prototype.sy = function()
{
    return this.sh;
};

Align.prototype.x = function(w)
{
    return parseInt(w * this.ratiox);
};

Align.prototype.y = function(h)
{
    return parseInt(h * this.ratioy);
};

Align.LEFT = new Align(0.0, 0.0);
Align.TOP = new Align(0.0, 1.0);
Align.CENTER = new Align(0.5, 0.5);
Align.RIGHT = new Align(1.0, 0.0);
Align.BOTTOM = new Align(0.0, 1.0);
