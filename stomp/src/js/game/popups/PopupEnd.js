PopupEnd = function(width, height)
{
    this.width = width;
    this.height = height;
    this.x = Align.width / 2 - this.width / 2;
    this.y = Align.height / 2 - this.height / 2;
    this.score = 0;
    this.show = false;

    this.buttons = [];
    var button = undefined;
     // Back button
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_BACK.obj);
    button.setPosition(Align.width / 2, Align.height / 2);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_BACK.obj.width - 50, Files.PIC_GAME_MENU_BUTTON_BACK.obj.height - 50);
    button.onClick = function(){this.item.itemHandler.setGotoItem(ItemGame);};
    this.buttons.push(button);

    // menu button
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_HELP.obj);
    button.setPosition(Align.width / 2, Align.height / 2 + Align.height / 4);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_HELP.obj.width - 50, Files.PIC_GAME_MENU_BUTTON_HELP.obj.height - 50);
    button.onClick = function(){this.item.itemHandler.setGotoItem(ItemMainMenu);};
    this.buttons.push(button);
};

PopupEnd.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this.item;
        this.buttons[i].popup = this;
        this.buttons[i].initialize();
    }
};

PopupEnd.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }
};

PopupEnd.prototype.draw = function(gfx)
{
    gfx.drawCenteredString("Score: " + this.score, Align.width / 2, this.height / 3, "#FFF", "40pt arial");
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};