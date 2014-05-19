/**
 * Created by Jelle on 4/27/2014.
 */

ItemMainMenu = function()
{
    this.backgroundTexture = Files.PIC_MAINMENU_BACKGROUND.obj;

    this.buttons = [];

    var button = undefined;

    // Play button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setPosition(0, 200);
    button.setSize(Align.width, 1000);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemTutorial);};
    this.buttons.push(button);

    // Options button
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_MAINMENU_BUTTON_OPTIONS.obj);
    button.setPosition(120, 120);
    button.setSize(Files.PIC_MAINMENU_BUTTON_OPTIONS.obj.width, Files.PIC_MAINMENU_BUTTON_OPTIONS.obj.height);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemOptionsMenu, "down");};
    this.buttons.push(button);

    // Credits button
    button = new Button();
    button.alignx = Align.RIGHT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_MAINMENU_BUTTON_CREDITS.obj);
    button.setPosition(-120, 120);
    button.setSize(Files.PIC_MAINMENU_BUTTON_CREDITS.obj.width, Files.PIC_MAINMENU_BUTTON_CREDITS.obj.height);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemCreditsMenu, "down");};
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
    gfx.drawTexture(this.backgroundTexture, this.x, this.y, Align.width, Align.height);

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
