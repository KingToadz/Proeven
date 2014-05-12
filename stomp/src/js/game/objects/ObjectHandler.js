/**
 * Created by Jelle on 5/7/2014.
 */

ObjectHandler = function(world)
{
    this.world = world;

    // player
    this.player = new Player(this.world.dir);
    this.player.objectHandler = this;

    // obstacles
    this.obstacleSpawner = new ObstacleSpawner();
    this.obstacleSpawner.objectHandler = this;
    this.obstacles = [];
};

ObjectHandler.prototype.initialize = function()
{
    this.obstacleSpawner.initialize();
    this.player.otherPlayer = this.world.otherWorld.objectHandler.player;
};

ObjectHandler.prototype.addObstacle = function(obj)
{
    this.obstacles.push(obj);
};

ObjectHandler.prototype.tick = function()
{
    this.obstacleSpawner.tick();

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

ObjectHandler.prototype.draw = function(gfx)
{
    for(var i = 0; i < this.obstacles.length; i++)
    {
        this.obstacles[i].draw(gfx);
    }

    this.player.draw(gfx);
};
