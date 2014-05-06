/**
 * Created by Jelle on 4/25/2014.
 */

GFX = function(canvas)
{
    this.canvas = canvas;
    this.gfx = this.canvas.canvas.getContext("2d");
};

GFX.prototype.clear = function(style)
{
    this.gfx.fillStyle = style;
    this.gfx.fillRect(0, 0, Align.width, Align.height);
};

GFX.prototype.drawRect = function(x, y, w, h, strokeStyle, lineWidth)
{
    this.gfx.lineWidth = lineWidth;
    this.gfx.strokeStyle = strokeStyle;
    this.gfx.strokeRect(x, y, w, h);
};

GFX.prototype.fillRect = function(x, y, w, h, fillStyle)
{
    this.gfx.fillStyle = fillStyle;
    this.gfx.fillRect(x, y, w, h);
};

GFX.prototype.drawString = function(text, x, y, fillstyle, font)
{
    this.gfx.fillStyle = fillstyle;
    this.gfx.font = font;
    this.gfx.fillText(text, x, (y + 6));
};

GFX.prototype.drawCenteredString = function(text, x, y, fillstyle, font)
{
    var metrics = this.gfx.measureText(text);
    this.drawString(text, (x - (metrics.width / 2)), y, fillstyle, font);
};

GFX.prototype.drawTexture = function(texture, x, y, width, height)
{
    this.gfx.drawImage(texture, x, y, width, height);
};
