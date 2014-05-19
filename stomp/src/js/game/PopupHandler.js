
PopupHandler = function(item2, width, height)
{
    //this.background = Files.PIC_GAME_MENU_BACKGROUND.obj;
    this.show = true;
    this.width = width;
    this.height = height;
    this.x = Align.width / 2 - this.width / 2;
    this.y = Align.height / 2 - this.height / 2;
    this.item = item2;

    this.buttons = [];

    var button = undefined;

    // Back button
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_BACK.obj);
    button.setPosition(Align.width / 2, this.y  + this.height / 2 - button.texture.height * 2);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_BACK.obj.width - 50, Files.PIC_GAME_MENU_BUTTON_BACK.obj.height - 50);
    button.onClick = function(){this.popup.show = false;};
    this.buttons.push(button);

    // Option button
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_OPTION.obj);
    button.setPosition(Align.width / 2, this.y  + this.height / 2);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_OPTION.obj.width - 50, Files.PIC_GAME_MENU_BUTTON_OPTION.obj.height - 50);
    button.onClick = function(){this.item.itemHandler.setGotoItem(ItemOptionsMenu);};
    this.buttons.push(button);

    // menu button
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_HELP.obj);
    button.setPosition(Align.width / 2, this.y  + this.height / 2 + button.texture.height * 2);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_HELP.obj.width - 50, Files.PIC_GAME_MENU_BUTTON_HELP.obj.height - 50);
    button.onClick = function(){this.item.itemHandler.setGotoItem(ItemMainMenu);};
    this.buttons.push(button);

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this.item;
        this.buttons[i].popup = this;
        this.buttons[i].initialize();
    }
};

PopupHandler.prototype.tick = function()
{
    if(this.show)
    {
        for(var i = 0; i < this.buttons.length; i++)
        {
            this.buttons[i].tick();
        }
    }
};

PopupHandler.prototype.draw = function(gfx)
{
    if(this.show)
    {
        gfx.fillTransparentRect(0,0, Align.width, Align.height, "#000", 0.25);

        for(var i = 0; i < this.buttons.length; i++)
        {
            this.buttons[i].draw(gfx);
        }
    }
};