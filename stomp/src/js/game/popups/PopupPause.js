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
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_BACK.obj);
    button.setPosition(0, -(button.texture.height + 10));
    button.setSize(Files.PIC_GAME_MENU_BUTTON_BACK.obj.width, Files.PIC_GAME_MENU_BUTTON_BACK.obj.height);
    button.onClick = function(){this.popup.show = false;};
    this.buttons.push(button);

    // Option button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_OPTION.obj);
    button.setPosition(0, 0);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_OPTION.obj.width, Files.PIC_GAME_MENU_BUTTON_OPTION.obj.height);
    //button.onClick = function(){this.item.itemHandler.switchItem(ItemOptionsMenu);};
    this.buttons.push(button);

    // menu button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_HELP.obj);
    button.setPosition(0, button.texture.height + 10);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_HELP.obj.width, Files.PIC_GAME_MENU_BUTTON_HELP.obj.height);
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