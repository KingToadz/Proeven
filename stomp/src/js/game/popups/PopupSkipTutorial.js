PopupSkipTutorial = function(width, height)
{
    this.width = width;
    this.height = height;
    this.x = Align.width / 2 - this.width / 2;
    this.y = Align.height / 2 - this.height / 2;
    this.show = false;
    this.alpha = 0.8;

    this.buttons = [];

    var button;

     // JA button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_POPUP_MENU_YES_BUTTON);
    button.setPosition(0, 0);
    button.setSize(Files.PIC_POPUP_MENU_YES_BUTTON.width, Files.PIC_POPUP_MENU_YES_BUTTON.height);
    button.onClick = function(){this.popup.show = false; this.item.itemHandler.curItem.tutHandler.startNewGame();};
    this.buttons.push(button);

    // NEE button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_POPUP_MENU_NO_BUTTON);
    button.setPosition(0, button.texture.height + 10);
    button.setSize(Files.PIC_POPUP_MENU_NO_BUTTON.width, Files.PIC_POPUP_MENU_NO_BUTTON.height);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemGame); this.item.itemHandler.gotoItem.gameHandler.startNewGame();};
    this.buttons.push(button);
};

PopupSkipTutorial.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this.item;
        this.buttons[i].popup = this;
        this.buttons[i].initialize();
    }
};

PopupSkipTutorial.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }
};

PopupSkipTutorial.prototype.draw = function(gfx)
{
    gfx.drawCenteredString("Wil je de tutorial spelen?", Align.width / 2, 400, "#FFF", "120pt " + Files.FNT_DEFAULT_FONT);
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};