/**
 * Created by Jelle on 5/6/2014.
 */

ItemGame = function()
{
    this.gameHandler = new GameHandler(this);
};

ItemGame.prototype.initialize = function()
{
};

ItemGame.prototype.activate = function()
{
};

ItemGame.prototype.deActivate = function()
{
};

ItemGame.prototype.tick = function()
{
    this.gameHandler.tick();
};

ItemGame.prototype.draw = function(gfx)
{
    this.gameHandler.draw(gfx);
};
