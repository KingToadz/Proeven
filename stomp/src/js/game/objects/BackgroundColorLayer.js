/**
 * Created by Yorick on 5/18/2014.
 */

BackgroundColorLayer = function()
{
    this.layers = [Files.PIC_GAME__BACKGROUND_GREEN.obj, Files.PIC_GAME__BACKGROUND_ORANGE.obj, Files.PIC_GAME__BACKGROUND_RED.obj]
    this.alpha = [1.0, 0.0, 0.0];
    this.currentLayer = 0;
    this.nextLayer = 0;
    this.switchLayer = false;
    this.transitSpeed = 0.005;
};

BackgroundColorLayer.prototype.changeLayer = function(dir)
{
    if(this.currentLayer + dir >= 0 || this.currentLayer + dir <= 2)
    {
        this.nextLayer = this.currentLayer + dir;
        this.switchLayer = true;
    }
};

BackgroundColorLayer.prototype.greenLayer = function()
{
    this.nextLayer = 0;
    this.switchLayer = true;
};

BackgroundColorLayer.prototype.orangeLayer = function()
{
    this.nextLayer = 1;
    this.switchLayer = true;
};

BackgroundColorLayer.prototype.redLayer = function()
{
    this.nextLayer = 2;
    this.switchLayer = true;
};

BackgroundColorLayer.prototype.tick = function()
{
    if(this.switchLayer)
    {
        if(this.currentLayer != this.nextLayer)
        {
            this.alpha[this.currentLayer] -= this.transitSpeed;
            this.alpha[this.nextLayer]    += this.transitSpeed;

            if(this.alpha[this.currentLayer] <= 0.0 || this.alpha[this.nextLayer] >= 1.0)
            {
                this.alpha[this.currentLayer] = 0.0;
                this.alpha[this.nextLayer] = 1.0;
                this.currentLayer = this.nextLayer;
                this.switchLayer = false;
            }
        }
        else
        {
            this.switchLayer = false;
        }
    }
};

BackgroundColorLayer.prototype.draw = function(gfx)
{
    gfx.drawTransparentTexture(this.layers[2], 0, 0, Align.width, Align.height / 2, this.alpha[2]);
    gfx.drawTransparentTexture(this.layers[1], 0, 0, Align.width, Align.height / 2, this.alpha[1]);
    gfx.drawTransparentTexture(this.layers[0], 0, 0, Align.width, Align.height / 2, this.alpha[0]);
};
