/**
 * Created by Jelle on 5/7/2014.
 */

World = function(dir)
{
    this.dir = dir;

    this.themeHandler = new ThemeHandler();

    this.backgroundHandler = new BackgroundHandler((-(this.dir - 1)));
    this.backgroundHandler.world = this;
    this.backgroundHandler.themeHandler = this.themeHandler;

    this.buttons = [];

    // world position
    this.x1 = 0;
    this.x2 = Align.width;
    this.y2 = Align.height / 2;
    this.y1 = this.y2 + ((Align.height / 2) * -this.dir);

    this.ry1 = this.y1;
    this.ry2 = this.y2;

    if(this.y1 > this.y2)
    {
        var y1 = this.y1;
        this.y1 = this.y2;
        this.y2 = y1;
    }

    var button = undefined;

    // Back button
    button = new RotatableButton();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_BUTTON_BACK);
    button.setSize(Files.PIC_GAME_BUTTON_BACK.width, Files.PIC_GAME_BUTTON_BACK.height);

    var screenPosX = (Align.width / 2) * (dir + 1);
    var screenPosY = -(Align.height / 2) * (dir - 1);

    var objPosX = (-(button.width / 2)) * (dir);
    var objPosY = ((button.height / 2)) * (dir);

    button.setPosition(screenPosX + objPosX, screenPosY + objPosY);

    button.rotation = (dir + 1) * 90;
    button.world = this;
    button.onClick = function(){this.world.gameHandler.popup.popups[0].show = true;};
    this.buttons.push(button);

    this.objectHandler = new ObjectHandler(this);
    this.objectHandler.themeHandler = this.themeHandler;
};

World.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this.gameHandler.item;
        this.buttons[i].initialize();
    }

    this.backgroundHandler.initialize();
    this.objectHandler.initialize();
};

World.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }

    if(this.gameHandler.item.itemHandler.windowHandler.isMouseDown())
    {
        var mousesdown = this.gameHandler.item.itemHandler.windowHandler.getMousesDown();
        for (var i = 0; i < mousesdown.length; i++)
        {
            if (mousesdown[i].ticksAlive == 1 && mousesdown[i].y > this.y1 && mousesdown[i].y < this.y2)
            {
                // make sure the pause popup is not showing
                if(this.gameHandler.popup.popups[0].show == false)
                {
                    this.otherWorld.objectHandler.player.tryJump();
                    break;
                }
            }
        }
    }

    this.backgroundHandler.tick();

    this.objectHandler.tick();
};

World.prototype.draw = function(gfx)
{
    // prepare draw
    gfx.gfx.save();
    gfx.gfx.scale(1, this.dir);
    gfx.gfx.translate(0, (Align.height / 2) * (this.dir - 1));

    gfx.flipText = (this.dir == -1);

    this.backgroundHandler.draw(gfx);
    this.objectHandler.draw(gfx);

    gfx.drawString("" + parseInt(this.gameHandler.score) + "m", 50, 120, "#FFF", "80pt " + Files.FNT_DEFAULT_FONT);

    gfx.gfx.restore();

    gfx.flipText = false;

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
