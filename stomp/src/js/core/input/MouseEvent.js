/**
 * Created by Jelle on 5/5/2014.
 */

MouseEvent = function()
{
    this.x = 0;
    this.y = 0;
    this.ticksAlive = 0;
    this.remove = false;
};

MouseEvent.prototype.tick = function()
{
    this.ticksAlive++;
    if(this.ticksAlive > 1)
    {
        this.remove = true;
    }
};
