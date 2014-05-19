/**
 * Created by Jelle on 5/9/2014.
 */

SharedSpawnOptions = function()
{
    this.lastBigObstacle = 200;
};

SharedSpawnOptions.prototype.tick = function()
{
    this.lastBigObstacle -= 1;
};
