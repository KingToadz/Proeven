/**
 * Created by Jelle on 5/9/2014.
 */

SharedSpawnOptions = function()
{
    this.lastBigObstacle = 400;
};

SharedSpawnOptions.prototype.canSpawnBigObstacle = function()
{
    return this.lastBigObstacle <= 0;
};

SharedSpawnOptions.prototype.onSpawnBigObstacle = function()
{
    this.lastBigObstacle = 400;
};

SharedSpawnOptions.prototype.tick = function()
{
    this.lastBigObstacle -= 1;
};
