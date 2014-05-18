/**
 * Created by Jelle on 5/13/2014.
 */

BackgroundHandler = function(x)
{
    this.x = x * 400;

    this.layers = [];

    //this.backgroundTexture = Files.PIC_GAME__BACKGROUND.obj;

    this.backgroundColor = new BackgroundColorLayer();

    this.layers.push(new BackgroundLayer(Files.PIC_GAME__BACKGROUND_01, 1));
    this.layers.push(new BackgroundLayer(Files.PIC_GAME__BACKGROUND_02, 2));
    this.layers.push(new BackgroundLayer(Files.PIC_GAME__BACKGROUND_03, 3));

    this.fails = 0;
    this.timer = 0;

    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].x -= this.x;
    }
    this.ground = new Ground();
};

BackgroundHandler.prototype.tick = function()
{
    this.backgroundColor.tick();
    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].tick();
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
    this.timer = 0;
    if(this.fails < 7)
    {
        this.fails++;
        this.checkBackground();
    }
};

BackgroundHandler.prototype.onPlayerSucces = function()
{
    this.fails--;
    console.log(this.fails);

    if(this.fails < 0)
    {
        this.fails = 0 ;
    }

    this.checkBackground();
};

BackgroundHandler.prototype.checkBackground = function()
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

BackgroundHandler.prototype.draw = function(gfx)
{
    this.backgroundColor.draw(gfx);
    for(var i = 0; i < this.layers.length; i++)
    {
        this.layers[i].draw(gfx);
    }

    this.ground.draw(gfx);
};
