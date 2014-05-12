/**
 * Created by Jelle on 5/7/2014.
 */

TutorialObjectHandler = function(world)
{
    this.state = 0;
    this.waitCount = 0;

    this.world = world;

    // player
    this.player = new Player(this.world.dir);

    // obstacles
    this.obstacleSpawner = new ObstacleSpawner();
    this.obstacleSpawner.objectHandler = this;
    this.obstacles = [];
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
    this.player.tick();
    //this.obstacleSpawner.tick();

    for(var i = 0; i < this.obstacles.length; i++)
    {
        this.obstacles[i].tick();
        if(this.obstacles[i].remove == true)
        {
            this.obstacles.splice(i, 1);
            i -= 1;
        }
    }
};

TutorialObjectHandler.prototype.draw = function(gfx)
{
    this.player.draw(gfx);
    //this.obstacleSpawner.draw(gfx);

    for(var i = 0; i < this.obstacles.length; i++)
    {
        this.obstacles[i].draw(gfx);
    }
};
