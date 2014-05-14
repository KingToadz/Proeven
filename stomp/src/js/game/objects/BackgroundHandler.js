/**
 * Created by Jelle on 5/13/2014.
 */

BackgroundHandler = function(x)
{
    this.x = x * 400;

    this.layers = [];

    this.backgroundTexture = Files.PIC_GAME__BACKGROUND.obj;

    this.layers.push(new BackgroundLayer(Files.PIC_GAME__BACKGROUND_01, 1));
    this.layers.push(new BackgroundLayer(Files.PIC_GAME__BACKGROUND_02, 2));
    this.layers.push(new BackgroundLayer(Files.PIC_GAME__BACKGROUND_03, 3));

    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].x -= this.x;
    }

    this.ground = new Ground();
};

BackgroundHandler.prototype.tick = function()
{
    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].tick();
    }
};

BackgroundHandler.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, 540);

    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].draw(gfx);
    }

    this.ground.draw(gfx);
};
