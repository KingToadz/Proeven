/**
 * Created by Jelle on 5/7/2014.
 */

ItemCreditsMenu = function()
{
    this.backgroundTexture = Files.PIC_MENU_BACKGROUND.obj;

    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.backButton = new Button();
    this.backButton.alignx = Align.CENTER;
    this.backButton.aligny = Align.CENTER;
    this.backButton.setTexture(Files.PIC_MENU_BUTTON_BACK.obj);
    this.backButton.setPosition(0, 0);
    this.backButton.setSize(Files.PIC_MENU_BUTTON_BACK.obj.width, Files.PIC_MENU_BUTTON_BACK.obj.height);
    this.backButton.onClick = function(){this.item.itemHandler.setGotoItem(ItemMainMenu);};
};

ItemCreditsMenu.prototype.initialize = function()
{
    this.backButton.item = this;
    this.backButton.initialize();
};

ItemCreditsMenu.prototype.activate = function()
{
};

ItemCreditsMenu.prototype.deActivate = function()
{
};

ItemCreditsMenu.prototype.tick = function()
{
    this.backButton.tick();
};

ItemCreditsMenu.prototype.draw = function(gfx)
{
    gfx.clear("black");
    //gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    this.backButton.draw(gfx);
};
