/**
 * Created by Jelle on 5/7/2014.
 */

ObstacleSpawner = function()
{
    this.curTick = 0;
    this.nextSpawn = 50;
};

ObstacleSpawner.prototype.initialize = function()
{
    this.sharedSpawnOptions = this.objectHandler.world.gameHandler.sharedSpawnOptions;
};

ObstacleSpawner.prototype.spawn = function()
{
    this.curTick = 0;
    this.nextSpawn = 50 + (Math.random() * 200);

    var obstacle = undefined;

    if(this.sharedSpawnOptions.canSpawnBigObstacle() == true)
    {
        var r = Math.random() * 5;
        if(r <= 1)
        {
            obstacle = new BigObstacle(this.objectHandler.world.dir);
            this.sharedSpawnOptions.onSpawnBigObstacle();
        }
    }

    if(obstacle == undefined)
    {
        obstacle = new SmallObstacle(this.objectHandler.world.dir);
    }

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
