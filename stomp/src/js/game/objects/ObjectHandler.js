/**
 * Created by Jelle on 5/7/2014.
 */

ObjectHandler = function(world)
{
    this.world = world;

    // obstacles
    this.obstacleSpawner = new ObstacleSpawner();
    this.obstacleSpawner.objectHandler = this;
    this.obstacles = [];

    // player
    this.player = new Player(this.world.dir);
    this.player.objectHandler = this;
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

ObjectHandler.prototype.onPlayerSucces = function()
{
    this.world.backgroundHandler.onPlayerSucces();
};

ObjectHandler.prototype.onPlayerDead = function()
{
    this.world.backgroundHandler.onPlayerDead();
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
