/**
 * Created by Jelle on 5/13/2014.
 */

Ground = function()
{
    this.color = "#000000";//"#191919";
    this.width = Align.width;
    this.height = 20;
};

Ground.prototype.draw = function(gfx)
{
    gfx.fillRect(0, 540 - this.height, Align.width, this.height + 1, this.color);
};
