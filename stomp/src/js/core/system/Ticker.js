/**
 * Created by Jelle on 4/25/2014.
 */

Ticker = function()
{
    this.tickEventHandler = new EventHandler(this, this.tick);

    this.fps = 60;

    this.curTime = 0;
    this.lastTickTime = 0;
    this.curFPSCount = 0;
    this.lastFPSCountTime = 0;
    this.curFPS = 0;
    this.lastSleep = 0;
    this.restSleep = 0;

    this.handler = function(){};
    this.handler.tick = function(){};
};

Ticker.prototype.start = function()
{
    this.curTime = this.getCurTime();
    this.lastTickTime = this.curTime;
    this.lastFPSCountTime = this.curTime;
    setTimeout(this.tickEventHandler, 1);
};

Ticker.prototype.getCurTime = function()
{
    return Date.now();
};

Ticker.prototype.tick = function()
{
    // execute
    this.handler.tick();

    // calculate
    this.lastTickTime = this.curTime + this.lastSleep;
    this.curTime = this.getCurTime();

    if(this.curTime - this.lastFPSCountTime >= 1000)
    {
        this.lastFPSCountTime = this.curTime;
        this.curFPS = this.curFPSCount;
        this.curFPSCount = 0;
    }

    this.curFPSCount++;

    var delta = this.curTime - this.lastTickTime;
    var sleep = (1000.0 / this.fps) - delta + this.restSleep;
    this.restSleep = sleep % 1;

    // sleep
    if(sleep >= 1)
    {
        sleep = parseInt(sleep);
        this.lastSleep = sleep;
        setTimeout(this.tickEventHandler, sleep);
    }
    else
    {
        this.lastSleep = 1;
        setTimeout(this.tickEventHandler, 1);
    }
};
