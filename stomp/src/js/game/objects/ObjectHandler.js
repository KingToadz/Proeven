/**
 * Created by Jelle on 5/7/2014.
 */

ObjectHandler = function()
{
    // players
    this.player1 = new Player(1);
    this.player2 = new Player(-1);

    this.player1.otherPlayer = this.player2;
    this.player2.otherPlayer = this.player1;

    // obstacles
    this.obstacleSpawner = new ObstacleSpawner();
    this.obstacleSpawner.objectHandler = this;
    this.obstacles = [];
};

ObjectHandler.prototype.addObstacle = function(obj)
{
    this.obstacles.push(obj);
};

ObjectHandler.prototype.tick = function()
{
    this.player1.tick();
    this.player2.tick();

    this.obstacleSpawner.tick();

    for(var i = 0; i < this.obstacles.length; i++)
    {
        this.obstacles[i].tick();
    }
};

ObjectHandler.prototype.draw = function(gfx)
{
    this.player1.draw(gfx);
    this.player2.draw(gfx);

    this.obstacleSpawner.draw(gfx);

    for(var i = 0; i < this.obstacles.length; i++)
    {
        this.obstacles[i].draw(gfx);
    }
};
