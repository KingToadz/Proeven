/**
 * Created by Yorick on 5/9/2014.
 */

TutorialHandler = function(item)
{
    this.item = item;

    this.world1 = new TutorialWorld(1);
    this.world2 = new TutorialWorld(-1);

    this.world1.gameHandler = this;
    this.world2.gameHandler = this;

    this.world1.otherWorld = this.world2;
    this.world2.otherWorld = this.world1;

    this.world1.initialize();
    this.world2.initialize();

    this.worldPaused = false;
};

TutorialHandler.prototype.pauseWorld = function()
{

};

TutorialHandler.prototype.tryNextState = function()
{
    // 1.) Spawn small block
    // 2.) Spawn big block
    // 3.) Start a game

    if(this.world1.stateDone == true && this.world2.stateDone == true)
    {
        // state++
        this.world1.nextState();
        this.world2.nextState();
    }
};

TutorialHandler.prototype.resetState = function()
{
    // 1.) Spawn small block again
    // 2.) Spawn big block again
    // 3.) can't be resetted
};

TutorialHandler.prototype.tick = function()
{
    this.world1.tick();
    this.world2.tick();

    this.tryNextState();
};

TutorialHandler.prototype.draw = function(gfx)
{
    gfx.clear("#000");

    this.world1.draw(gfx);
    this.world2.draw(gfx);
};
