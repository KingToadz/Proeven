/**
 * Created by Jelle on 5/13/2014.
 */

BackgroundHandler = function(x)
{
    this.x = x * 400;

    this.minX = 0;
    this.maxX = Align.width;

    this.layers = [];
    this.switchLayers = [];
    this.switchLayersX = 0;
    this.switchingLayers = false;

    this.backgroundColor = new BackgroundColorLayer();

    this.fails = 0;
    this.timer = 0;

    this.ground = new Ground();
};

BackgroundHandler.prototype.initialize = function()
{
    this.switchToTheme(this.themeHandler.curTheme, true);
};

BackgroundHandler.prototype.switchToTheme = function(theme, instant)
{
    var layers = [];
    layers.push(new BackgroundLayer(theme.layers[0], 0.25));
    layers.push(new BackgroundLayer(theme.layers[1], 0.5));
    layers.push(new BackgroundLayer(theme.layers[2], 1.0));

    for(var i = 0; i < layers.length; i++)
    {
        layers[i].x -= this.x;
        layers[i].backgroundHandler = this;
    }

    this.nextLayerSwitch = theme.switchAtScore;
    this.world.objectHandler.gotoSpeed = theme.moveSpeed;

    if(instant == true)
    {
        this.layers = layers;
    }
    else
    {
        this.switchLayersX = Align.width + 50;
        this.switchingLayers = true;

        this.switchLayers = layers;
    }
};

BackgroundHandler.prototype.tick = function()
{
    this.backgroundColor.tick();

    if(this.nextLayerSwitch != -1 && this.world.gameHandler.score > this.nextLayerSwitch)
    {
        this.switchToTheme(this.themeHandler.nextTheme(), false);
    }

    if(this.switchingLayers == true)
    {
        this.switchLayersX -= this.world.objectHandler.moveSpeed;
        if(this.switchLayersX < -50)
        {
            this.layers = this.switchLayers;
            this.switchingLayers = false;
        }
        else
        {
            for(var i = 0; i < this.layers.length; i++)
            {
                this.layers[i].minX = 0;
                this.layers[i].maxX = this.switchLayersX;
                this.layers[i].tick();
            }

            for(var i = 0; i < this.switchLayers.length; i++)
            {
                this.switchLayers[i].minX = this.switchLayersX;
                this.switchLayers[i].maxX = Align.width;
                this.switchLayers[i].tick();
            }
        }
    }
    else
    {
        for(var i = 0; i < this.layers.length; i++)
        {
            this.layers[i].tick();
        }
    }

    if(this.fails > 0)
    {
        this.timer++;
        if(this.timer == 450)
        {
            this.onPlayerSucces();
            this.timer = 0;
        }
    }
    else
    {
        this.timer = 0;
    }
};

BackgroundHandler.prototype.onPlayerDead = function()
{
    if(!this.backgroundColor.manualOverride)
    {
        this.timer = 0;
        if(this.fails < 3)
        {
            this.fails++;
            this.checkBackground();
        }
    }
};

BackgroundHandler.prototype.onPlayerSucces = function()
{
    if(!this.backgroundColor.manualOverride)
    {
        this.fails--;

        if(this.fails < 0)
        {
            this.fails = 0;
        }

        this.checkBackground();
    }
};

BackgroundHandler.prototype.checkBackground = function()
{
    switch(this.fails)
    {
        case 0:
            this.backgroundColor.greenLayer();
            break;
        case 1:
            this.backgroundColor.orangeLayer();
            break;
        case 2:
            this.backgroundColor.redLayer();
            break;
    }
};

BackgroundHandler.prototype.draw = function(gfx)
{
    this.backgroundColor.draw(gfx);
    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].draw(gfx);
    }

    if(this.switchingLayers == true)
    {
        for(var i = 0; i < this.switchLayers.length; i++)
        {
            this.switchLayers[i].draw(gfx);
        }

        gfx.drawTexture(Files.PIC_GAME_THEME_TRANSITION, this.switchLayersX - (Files.PIC_GAME_THEME_TRANSITION.width / 2), 0, Files.PIC_GAME_THEME_TRANSITION.width, Align.height / 2);
    }

    this.ground.draw(gfx);
};
