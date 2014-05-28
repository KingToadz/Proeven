/**
 * Created by Jelle on 5/7/2014.
 */

ItemCreditsMenu = function()
{
    this.backgroundTexture = Files.PIC_CREDITSMENU_BACKGROUND;

    this.buttons = [];

    var button = undefined;

    // BackButton
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_MENU_BUTTON_BACK);
    button.setPosition(120, 120);
    button.setSize(Files.PIC_MENU_BUTTON_BACK.width, Files.PIC_MENU_BUTTON_BACK.height);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemMainMenu, "up");};
    this.buttons.push(button);
};

ItemCreditsMenu.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this;
        this.buttons[i].initialize();
    }
};

ItemCreditsMenu.prototype.activate = function()
{
};

ItemCreditsMenu.prototype.deActivate = function()
{
};

ItemCreditsMenu.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }
};

ItemCreditsMenu.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
