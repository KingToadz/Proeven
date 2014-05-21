/**
 * Created by Jelle on 5/8/2014.
 */

KeyEvent = function()
{
    this.keyCode = 0;
    this.ticksAlive = 0;
    this.isDown = false;
    this.remove = false;
};

KeyEvent.prototype.tick = function()
{
    this.ticksAlive++;
};
