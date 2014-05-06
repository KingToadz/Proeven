/**
 * Created by Jelle on 4/27/2014.
 */

ItemMainMenu = function()
{
    this.backgroundTexture = Files.PIC_MENU_BACKGROUND.obj;

    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.playButton = new Button();
    this.playButton.alignx = Align.CENTER;
    this.playButton.aligny = Align.CENTER;
    this.playButton.setTexture(Files.PIC_MENU_BUTTON_PLAY.obj);
    this.playButton.setPosition(0, 0);
    this.playButton.setSize(Files.PIC_MENU_BUTTON_PLAY.obj.width, Files.PIC_MENU_BUTTON_PLAY.obj.height);
    this.playButton.onClick = function(){this.item.itemHandler.setGotoItem(ItemTestMenu);};
};

ItemMainMenu.prototype.initialize = function()
{
    this.playButton.item = this;
    this.playButton.initialize();
};

ItemMainMenu.prototype.activate = function()
{

};

ItemMainMenu.prototype.deActivate = function()
{

};

ItemMainMenu.prototype.tick = function()
{
    this.playButton.tick();

    if(this.itemHandler.windowHandler.isMouseDown() == true)
    {
        var mouse = this.itemHandler.windowHandler.getMousesDown()[0];
        this.lastMouseX = mouse.x;
        this.lastMouseY = mouse.y;
    }
};

ItemMainMenu.prototype.draw = function(gfx)
{
    gfx.clear("black");
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    gfx.fillRect(this.lastMouseX - 10, this.lastMouseY - 10, 20, 20, "yellow");

    this.playButton.draw(gfx);
};
