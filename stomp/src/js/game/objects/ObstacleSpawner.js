/**
 * Created by Jelle on 5/7/2014.
 */

ObstacleSpawner = function()
{
    this.curTick = 0;
    this.nextSpawn = 0;
};

ObstacleSpawner.prototype.initialize = function()
{
    this.sharedSpawnOptions = this.objectHandler.world.gameHandler.sharedSpawnOptions;
};

ObstacleSpawner.prototype.spawn = function()
{
    this.curTick = 0;
    this.nextSpawn = 3 + (Math.random() * 0);

    var obstacle = new Obstacle(this.objectHandler.world.dir);
    this.objectHandler.addObstacle(obstacle);
};

ObstacleSpawner.prototype.tick = function()
{
    if(this.objectHandler.canSpawnItems == true)
    {
        this.curTick++;
    }

    if(this.curTick > this.nextSpawn)
    {
        this.spawn();
    }
};
