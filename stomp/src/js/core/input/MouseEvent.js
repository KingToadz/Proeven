/**
 * Created by Jelle on 5/5/2014.
 */

MouseEvent = function()
{
    this.x = 0;
    this.y = 0;
    this.newX = 0;
    this.newY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.ticksAlive = 0;
    this.remove = false;
    this.isMouse = false;
    this.isTouch = false;

    this.color = "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
};

MouseEvent.prototype.tick = function()
{
    this.ticksAlive++;

	this.beforeLastX = this.lastX;
	this.beforeLastY = this.lastY;
	
    this.lastX = this.x;
    this.lastY = this.y;

    this.x = this.newX;
    this.y = this.newY;
};
