/**
 * Created by Jelle on 5/7/2014.
 */

ItemOptionsMenu = function()
{
    this.buttons = [];

    var button = undefined;

    // Back button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_MENU_BUTTON_BACK.obj);
    button.setPosition(0, 350);
    button.setSize(Files.PIC_MENU_BUTTON_BACK.obj.width - 50, Files.PIC_MENU_BUTTON_BACK.obj.height - 50);
    button.onClick = function(){this.item.itemHandler.setGotoItem(ItemMainMenu);};
    this.buttons.push(button);
};

ItemOptionsMenu.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this;
        this.buttons[i].initialize();
    }
};

ItemOptionsMenu.prototype.activate = function()
{
};

ItemOptionsMenu.prototype.deActivate = function()
{
};

ItemOptionsMenu.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }
};

ItemOptionsMenu.prototype.draw = function(gfx)
{
    gfx.clear("#000");

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
