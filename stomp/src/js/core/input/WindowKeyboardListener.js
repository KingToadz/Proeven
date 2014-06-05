/**
 * Created by Jelle on 4/25/2014.
 */

WindowKeyboardListener = function()
{
    this.keys = [];
    for(var i = 0; i < 256; i++)
    {
        var keyEvent = new KeyEvent();
        keyEvent.keyCode = i;
        this.keys.push(keyEvent);
    }

    this.keysDown = [];

    window.onkeydown = new EventHandler(this, this.onKeyDown);
    window.onkeyup = new EventHandler(this, this.onKeyUp);
};

WindowKeyboardListener.prototype.tick = function()
{
    for(var i = 0; i < this.keysDown.length; i++)
    {
        this.keysDown[i].tick();

        if(this.keysDown[i].remove == true)
        {
            this.keysDown[i].remove = false;
            this.keysDown[i].isDown = false;
            this.keysDown[i].ticksAlive = 0;

            this.keysDown.splice(i, 1);
            i--;
        }
    }
};

WindowKeyboardListener.prototype.isKeyDown = function()
{
    return this.keysDown.length > 0;
};

// events
WindowKeyboardListener.prototype.onKeyDown = function(ev)
{
    ev.preventDefault();

    var keyCode = ev.keyCode;
    var keyEvent = this.keys[keyCode];

    if(keyEvent.isDown == false)
    {
        this.keysDown.push(keyEvent);
        keyEvent.isDown = true;
    }
};

WindowKeyboardListener.prototype.onKeyUp = function(ev)
{
    ev.preventDefault();

    var keyCode = ev.keyCode;
    var keyEvent = this.keys[keyCode];
    keyEvent.remove = true;
};
