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

    var obstacle = undefined;

    this.nextSpawn = 0;

    if(this.sharedSpawnOptions.canSpawnBigObstacle() == true && this.themeHandler.curTheme.bigObject != undefined)
    {
        var r = Math.random() * 3;
        if(r <= 1)
        {
            obstacle = new this.themeHandler.curTheme.bigObject(this.objectHandler.world.dir);
            obstacle.x += (25 * this.objectHandler.moveSpeed) + 200;
            this.nextSpawn += 1200 / this.objectHandler.moveSpeed;
            this.objectHandler.world.otherWorld.objectHandler.obstacleSpawner.nextSpawn += 900 / this.objectHandler.moveSpeed;
            this.sharedSpawnOptions.onSpawnBigObstacle();
        }
    }

    if(obstacle == undefined)
    {
        obstacle = new this.themeHandler.curTheme.smallObject(this.objectHandler.world.dir);
    }

    this.nextSpawn += ((obstacle.width) / this.objectHandler.moveSpeed) + 50;

    this.nextSpawn += parseInt(Math.random() * 50);

    this.objectHandler.addObstacle(obstacle);
};

ObstacleSpawner.prototype.tick = function()
{
    if(this.objectHandler.canSpawnItems == true && (this.objectHandler.themeHandler.curTheme.switchAtScore - 20 > this.objectHandler.world.gameHandler.score || this.objectHandler.themeHandler.curTheme.switchAtScore == -1) && this.objectHandler.themeHandler.curTheme.startAtScore + 20 < this.objectHandler.world.gameHandler.score)
    {
        this.curTick++;
    }

    if(this.curTick > this.nextSpawn)
    {
        this.spawn();
    }
};
