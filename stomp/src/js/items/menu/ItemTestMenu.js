/**
 * Created by Jelle on 4/29/2014.
 */

ItemTestMenu = function()
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

ItemTestMenu.prototype.initialize = function()
{
    this.backButton.item = this;
    this.backButton.initialize();
};

ItemTestMenu.prototype.activate = function()
{

};

ItemTestMenu.prototype.deActivate = function()
{

};

ItemTestMenu.prototype.tick = function()
{
    this.backButton.tick();
};

ItemTestMenu.prototype.draw = function(gfx)
{
    gfx.clear("black");
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    this.backButton.draw(gfx);
};
