/**
 * Created by Jelle on 4/25/2014.
 */

GFX = function(canvas)
{
    this.canvas = canvas;
    this.gfx = this.canvas.canvas.getContext("2d");

    this.gfx.imageSmoothingEnabled = false;
    this.gfx.mozImageSmoothingEnabled = false;
    this.gfx.webkitImageSmoothingEnabled = false;

    this.gfx.save();

    this.flipText = false;
};

GFX.prototype.tick = function()
{
    this.gfx.setTransform(1, 0, 0, 1, 0, 0);

    this.gfx.scale(this.scaleX, this.scaleY);
    this.gfx.translate(this.offsetX, this.offsetY);
    this.gfx.rotate(this.rotation);
};

GFX.prototype.clear = function(style)
{
    this.gfx.fillStyle = style;
    this.gfx.fillRect(0, 0, Align.width, Align.height);
};

GFX.prototype.drawLine = function(x, y, w, h, strokeStyle, lineWidth)
{
    this.gfx.lineWidth = lineWidth;
    this.gfx.strokeStyle = strokeStyle;
    this.gfx.beginPath();
    this.gfx.moveTo(x, y);
    this.gfx.lineTo(x + w, y + h);
    this.gfx.stroke();
};

GFX.prototype.drawCurve = function(x1, y1, x2, y2, x3, y3, strokeStyle, lineWidth)
{
    this.gfx.lineWidth = lineWidth;
    this.gfx.strokeStyle = strokeStyle;
    this.gfx.beginPath();
	this.gfx.quadraticCurveTo(x1, y1, x2, y2);
	this.gfx.quadraticCurveTo(x2, y2, x3, y3);
    this.gfx.stroke();
};

GFX.prototype.fillCircle = function(x, y, radius, fillStyle)
{
    this.gfx.fillStyle = fillStyle;
    this.gfx.beginPath();
	this.gfx.arc(x, y, radius, 0, 2 * Math.PI);
    this.gfx.fill();
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

GFX.prototype.fillTransparentRect = function(x, y, w, h, fillStyle, alpha)
{
    this.gfx.globalAlpha = alpha;
    this.gfx.fillStyle = fillStyle;
    this.gfx.fillRect(x, y, w, h);
    this.gfx.globalAlpha = 1.0;
};

GFX.prototype.drawString = function(text, x, y, fillstyle, font)
{
    this.gfx.fillStyle = fillstyle;
    this.gfx.font = font;

    if(this.flipText == true)
    {
        this.drawReversedString(text, x, y, fillstyle, font);
    }
    else
    {
        this.gfx.fillText(text, x, (y + 6));
    }
};

GFX.prototype.drawCorrectCenteredString = function(text, x, y, fillstyle, font)
{
    this.gfx.fillStyle = fillstyle;
    this.gfx.font = font;

    if(this.flipText == true)
    {
        this.drawReversedCenteredString(text, x, y, fillstyle, font);
    }
    else
    {
        this.drawCenteredString(text, x, (y + 6), fillstyle, font);
    }
};

GFX.prototype.drawReversedString = function(text, x, y, fillstyle, font)
{
    this.gfx.fillStyle = fillstyle;
    this.gfx.font = font;

    this.gfx.save();

    this.gfx.scale(-1, 1);

    this.gfx.fillText(text, -Align.width + (x), (y + 6));

    this.gfx.restore();
};

GFX.prototype.drawCenteredString = function(text, x, y, fillstyle, font)
{
    this.gfx.font = font;
    var metrics = this.gfx.measureText(text);
    this.drawString(text, (x - (metrics.width / 2)), y, fillstyle, font);
};

GFX.prototype.drawReversedCenteredString = function(text, x, y, fillstyle, font)
{
    this.gfx.font = font;
    var metrics = this.gfx.measureText(text);

    this.gfx.save();

    this.gfx.scale(-1, -1);

    this.drawString(text, -(x - (-metrics.width / 2)), -((Align.height / 2) + y), fillstyle, font);

    this.gfx.restore();
};

GFX.prototype.drawTexture = function(texture, x, y, width, height)
{
    this.gfx.drawImage(texture, parseInt(x), parseInt(y), parseInt(width), parseInt(height));
};

GFX.prototype.drawRotatedTexture = function(texture, x, y, width, height, rotation)
{
    this.gfx.save();

    this.gfx.translate(x + (width / 2), y + (height / 2));

    this.gfx.rotate(rotation * (Math.PI / 180));

    this.gfx.drawImage(texture, parseInt(-(width / 2)), parseInt(-(height / 2)), parseInt(width), parseInt(height));

    this.gfx.restore();
};

GFX.prototype.drawTransparentTexture = function(texture, x, y, width, height, alpha)
{
    this.gfx.globalAlpha = alpha;
    this.gfx.drawImage(texture, parseInt(x), parseInt(y), parseInt(width), parseInt(height));
    this.gfx.globalAlpha = 1.0;
};

GFX.prototype.drawClippedTexture = function(texture, x, y, width, height, cx, cy, cwidth, cheight)
{
    this.gfx.drawImage(texture, parseInt(cx), parseInt(cy), parseInt(cwidth), parseInt(cheight), parseInt(x), parseInt(y), parseInt(width), parseInt(height));
};

GFX.prototype.drawTransparentClippedTexture = function(texture, x, y, width, height, cx, cy, cwidth, cheight, alpha)
{
    this.gfx.globalAlpha = alpha;
    this.gfx.drawImage(texture, parseInt(cx), parseInt(cy), parseInt(cwidth), parseInt(cheight), parseInt(x), parseInt(y), parseInt(width), parseInt(height));
    this.gfx.globalAlpha = 1.0;
};
