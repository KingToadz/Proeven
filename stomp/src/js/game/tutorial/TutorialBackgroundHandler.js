/**
 * Created by Jelle on 5/13/2014.
 */

TutorialBackgroundHandler = function(x)
{
    this.x = x * 400;

    this.minX = 0;
    this.maxX = Align.width;

    this.layers = [];

    this.backgroundColor = new BackgroundColorLayer();

    this.fails = 0;

    this.ground = new Ground();
};

TutorialBackgroundHandler.prototype.initialize = function()
{
    this.switchToTheme(this.themeHandler.curTheme, true);
};

TutorialBackgroundHandler.prototype.switchToTheme = function(theme, instant)
{
    var layers = [];
    layers.push(new BackgroundLayer(theme.layers[0], 1.0 / 5 * theme.moveSpeed));
    layers.push(new BackgroundLayer(theme.layers[1], 2.5 / 5 * theme.moveSpeed));
    layers.push(new BackgroundLayer(theme.layers[2], theme.moveSpeed));

    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].speed = layers[i].speed;
    }

    this.nextLayerSwitch = theme.switchAtScore;

    //this.world.objectHandler.moveSpeed = theme.moveSpeed;
    

    if(instant == true)
    {
        this.layers = layers;
    }
};

TutorialBackgroundHandler.prototype.tick = function()
{
    this.backgroundColor.tick();

    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].tick();
    }
};

TutorialBackgroundHandler.prototype.onPlayerDead = function()
{
    if(!this.backgroundColor.manualOverride)
    {
        this.timer = 0;
        if(this.fails < 7)
        {
            //this.fails++;
            //this.checkBackground();
        }
    }
};

TutorialBackgroundHandler.prototype.onPlayerSucces = function()
{
    if(!this.backgroundColor.manualOverride)
    {
        this.fails--;

        if(this.fails < 0)
        {
            this.fails = 0;
        }

        //this.checkBackground();
    }
};

TutorialBackgroundHandler.prototype.checkBackground = function()
{
    switch(this.fails)
    {
        case 0:
        case 1:
            this.backgroundColor.greenLayer();
            break;
        case 2:
        case 3:
        case 4:
            this.backgroundColor.orangeLayer();
            break;
        case 5:
        case 6:
            this.backgroundColor.redLayer();
            break;
    }
};

TutorialBackgroundHandler.prototype.draw = function(gfx)
{
    this.backgroundColor.draw(gfx);
    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].draw(gfx);
    }

    this.ground.draw(gfx);
};
