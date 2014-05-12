TutorialState = function(world)
{
    this.world = world;
    this.innerState = 0;
    this.done = false;
};

TutorialState.prototype.start = function()
{

};

TutorialState.prototype.Reset = function()
{
    this.innerState = 0;
    this.done = false;
    this.start();
};

TutorialState.prototype.tick = function()
{

};

TutorialState.prototype.draw = function(gfx)
{

};