PopupSkipTutorial = function(width, height)
{
    this.width = width;
    this.height = height;
    this.x = Align.width / 2 - this.width / 2;
    this.y = Align.height / 2 - this.height / 2;
    this.show = false;

    this.buttons = [];

    var button;

     // JA button
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_BACK.obj);
    button.setPosition(Align.width / 2, this.y  + this.height / 2);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_BACK.obj.width - 50, Files.PIC_GAME_MENU_BUTTON_BACK.obj.height - 50);
    button.onClick = function(){this.popup.show = false;};
    this.buttons.push(button);

    // NEE button
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_HELP.obj);
    button.setPosition(Align.width / 2, this.height / 2 + button.texture.height * 2);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_HELP.obj.width - 50, Files.PIC_GAME_MENU_BUTTON_HELP.obj.height - 50);
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
    gfx.drawCenteredString("Wil je de tutorial spelen?", Align.width / 2, 200, "#FFF", "40pt arial");
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};