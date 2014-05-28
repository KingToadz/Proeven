PopupPause = function(width, height)
{
    this.width = width;
    this.height = height;
    this.x = Align.width / 2 - this.width / 2;
    this.y = Align.height / 2 - this.height / 2;
    this.show = false;

    this.alpha = 0.6;
    
    this.buttons = [];

    var button;

     // Back button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_BACK);
    button.setPosition(0, -(button.texture.height + 10));
    button.setSize(Files.PIC_GAME_MENU_BUTTON_BACK.width, Files.PIC_GAME_MENU_BUTTON_BACK.height);
    button.onClick = function(){this.popup.show = false;};
    this.buttons.push(button);

    // Option button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_OPTION);
    button.setPosition(0, 0);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_OPTION.width, Files.PIC_GAME_MENU_BUTTON_OPTION.height);
    button.onClick = function(){var switchItem = this.item.constructor; var func = function(){}; func.execute = function(){func.item.itemHandler.switchItem(switchItem, "up");}; this.item.itemHandler.switchItem(ItemOptionsMenu, "down"); this.item.itemHandler.gotoItem.setBackButtonFunction(func);};
    this.buttons.push(button);

    // menu button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_HELP);
    button.setPosition(0, button.texture.height + 10);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_HELP.width, Files.PIC_GAME_MENU_BUTTON_HELP.height);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemMainMenu);};
    this.buttons.push(button);
};

PopupPause.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this.item;
        this.buttons[i].popup = this;
        this.buttons[i].initialize();
    }
};

PopupPause.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }
};

PopupPause.prototype.draw = function(gfx)
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};