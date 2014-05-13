/**
 * Created by Jelle on 5/7/2014.
 */

TutorialObjectHandler = function(world)
{
    this.world = world;

    // obstacles
    this.obstacles = [];

    // player
    this.player = new Player(this.world.dir);
    this.player.objectHandler = this;
};

TutorialObjectHandler.prototype.initialize = function()
{
    this.player.otherPlayer = this.world.otherWorld.objectHandler.player;
};

TutorialObjectHandler.prototype.addObstacle = function(obj)
{
    this.obstacles.push(obj);
};

TutorialObjectHandler.prototype.tick = function()
{
    for(var i = 0; i < this.obstacles.length; i++)
    {
        this.obstacles[i].tick();
        if(this.obstacles[i].remove == true)
        {
            this.obstacles.splice(i, 1);
            i -= 1;
        }
    }
    this.player.tick();
};

TutorialObjectHandler.prototype.draw = function(gfx)
{
    for(var i = 0; i < this.obstacles.length; i++)
    {
        this.obstacles[i].draw(gfx);
    }

    this.player.draw(gfx);
};
