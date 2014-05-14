/**
 * Created by Jelle on 5/7/2014.
 */

ItemOptionsMenu = function()
{
    this.backgroundTexture = Files.PIC_MENU_BACKGROUND.obj;

    this.buttons = [];

    var button = undefined;

    // Play button
    button = new SlideButton();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_MENU_BUTTON_PLAY.obj);
    button.setTexture2(Files.PIC_MENU_BUTTON_PLAY2.obj);
    button.setPosition(0, 0);
    button.setSize(Files.PIC_MENU_BUTTON_PLAY.obj.width - 50, Files.PIC_MENU_BUTTON_PLAY.obj.height - 50);
    //button.onClick = function(){this.item.itemHandler.setGotoItem(ItemTutorial);};
    this.buttons.push(button);

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
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
