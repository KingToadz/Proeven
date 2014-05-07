/**
 * Created by Jelle on 5/6/2014.
 */

GameHandler = function()
{
    this.objectHandler = new ObjectHandler();
};

GameHandler.prototype.tick = function()
{
    this.objectHandler.tick();
};

GameHandler.prototype.draw = function(gfx)
{
    //gfx.clear("#000");
    this.objectHandler.draw(gfx);
};
