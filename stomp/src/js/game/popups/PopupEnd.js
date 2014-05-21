PopupEnd = function(width, height)
{
    this.width = width;
    this.height = height;
    this.x = Align.width / 2 - this.width / 2;
    this.y = Align.height / 2 - this.height / 2;
    this.score = 0;
    this.show = false;
    
    this.alpha = 0.6;

    this.buttons = [];
    var button = undefined;
     // Back button
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_GAME_MENU_BUTTON_TRYAGAIN.obj);
    button.setPosition(0, 0);
    button.setSize(Files.PIC_GAME_MENU_BUTTON_TRYAGAIN.obj.width, Files.PIC_GAME_MENU_BUTTON_TRYAGAIN.obj.height);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemGame); this.item.itemHandler.gotoItem.gameHandler.startNewGame();};
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
    gfx.drawString("Score: " + this.score, Align.width / 2 - 250, 350, "#FFF", "50pt arial");
    gfx.drawString("HighScore: " + this.item.gameHandler.highScore, Align.width / 2 - 250, 410, "#FFF", "50pt arial");
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};