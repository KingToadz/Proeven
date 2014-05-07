/**
 * Created by Jelle on 5/7/2014.
 */

ObstacleSpawner = function()
{
    this.curTick = 0;
};

ObstacleSpawner.prototype.spawn = function()
{
    this.curTick = 0;
    var obstacle = new Obstacle();
    this.objectHandler.addObstacle(obstacle);
};

ObstacleSpawner.prototype.tick = function()
{
    this.curTick++;

    if(this.curTick > 300)
    {
        this.spawn();
    }
};

ObstacleSpawner.prototype.draw = function(gfx)
{

};
