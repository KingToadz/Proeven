/**
 * Created by Yorick on 5/6/2014.
 */

ItemTutorial = function()
{
    this.tutHandler = new TutorialHandler(this);
};

ItemTutorial.prototype.initialize = function()
{
};

ItemTutorial.prototype.activate = function()
{
};

ItemTutorial.prototype.deActivate = function()
{
};

ItemTutorial.prototype.tick = function()
{
    this.tutHandler.tick();
};

ItemTutorial.prototype.draw = function(gfx)
{
    this.tutHandler.draw(gfx);
};
