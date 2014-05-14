/**
 * Created by Jelle on 4/27/2014.
 */

ItemMainMenu = function()
{
    this.backgroundTexture = Files.PIC_MENU_BACKGROUND.obj;

    this.buttons = [];

    var button = undefined;

    // Play button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_MENU_BUTTON_PLAY.obj);
    button.setPosition(0, -350);
    button.setSize(Files.PIC_MENU_BUTTON_PLAY.obj.width - 50, Files.PIC_MENU_BUTTON_PLAY.obj.height - 50);
    button.onClick = function(){this.item.itemHandler.setGotoItem(ItemTutorial);};
    this.buttons.push(button);

    // Options button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_MENU_BUTTON_OPTIONS.obj);
    button.setPosition(0, 0);
    button.setSize(Files.PIC_MENU_BUTTON_OPTIONS.obj.width - 50, Files.PIC_MENU_BUTTON_OPTIONS.obj.height - 50);
    button.onClick = function(){this.item.itemHandler.setGotoItem(ItemOptionsMenu);};
    this.buttons.push(button);

    // Credits button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_MENU_BUTTON_CREDITS.obj);
    button.setPosition(0, 350);
    button.setSize(Files.PIC_MENU_BUTTON_CREDITS.obj.width - 50, Files.PIC_MENU_BUTTON_CREDITS.obj.height - 50);
    button.onClick = function(){this.item.itemHandler.setGotoItem(ItemCreditsMenu);};
    this.buttons.push(button);

    SFX.setBackgroundSound(Files.SND_MENU_BACKGROUND);
};

ItemMainMenu.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this;
        this.buttons[i].initialize();
    }
};

ItemMainMenu.prototype.activate = function()
{

};

ItemMainMenu.prototype.deActivate = function()
{

};

ItemMainMenu.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }
};

ItemMainMenu.prototype.draw = function(gfx)
{
    gfx.clear("#000");
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    var mouses = this.itemHandler.windowHandler.getMousesDown();
    for(var i = 0; i < mouses.length; i++)
    {
        gfx.fillRect(mouses[i].x - 10, mouses[i].y - 10, 20, 20, "yellow");
    }

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }

    gfx.drawString("Navigator: " + navigator.isCocoonJS, 10, 40, "#FF0", "30px Arial");
};
