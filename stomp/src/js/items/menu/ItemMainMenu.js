/**
 * Created by Jelle on 4/27/2014.
 */

ItemMainMenu = function()
{
    this.backgroundTexture = Files.PIC_MAINMENU_BACKGROUND;

    //Util.imageChangeNonTransparencyToColor(this.backgroundTexture, [0, 0, 255]);

    this.buttons = [];

    var button = undefined;
    //721-H=862
    this.logoAnim = new Animation(Files.PIC_LOGO_ANIMATION, 721, 862, 3, 6, 18);
    this.logoAnim.setFPS(30);
    this.logoAnim.stopAfterLastFrame = true;
    this.logoAnim.pause();

    // Real PlayButton
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setPosition(0, 200);
    button.setSize(Align.width, 1000);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemTutorial); this.item.itemHandler.gotoItem.tutHandler.popup.hideAllPopups(); this.item.itemHandler.gotoItem.tutHandler.popup.showSkipPopup();};
    this.buttons.push(button);

    // Fake PlayButton
    button = new Button();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_MAINMENU_BUTTON_PLAY);
    button.setPosition(0, 400);
    button.setSize(Files.PIC_MAINMENU_BUTTON_PLAY.width, Files.PIC_MAINMENU_BUTTON_PLAY.height);
    this.buttons.push(button);

    // OptionsButton
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_MAINMENU_BUTTON_OPTIONS);
    button.setPosition(120, 120);
    button.setSize(Files.PIC_MAINMENU_BUTTON_OPTIONS.width, Files.PIC_MAINMENU_BUTTON_OPTIONS.height);
    button.onClick = function(){var func = function(){}; func.execute = function(){func.item.itemHandler.switchItem(ItemMainMenu, "up");}; this.item.itemHandler.switchItem(ItemOptionsMenu, "down"); this.item.itemHandler.gotoItem.setBackButtonFunction(func);};
    this.buttons.push(button);

    // CreditsButton
    button = new Button();
    button.alignx = Align.RIGHT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_MAINMENU_BUTTON_CREDITS);
    button.setPosition(-120, 120);
    button.setSize(Files.PIC_MAINMENU_BUTTON_CREDITS.width, Files.PIC_MAINMENU_BUTTON_CREDITS.height);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemCreditsMenu, "down");};
    this.buttons.push(button);

    SFX.setBackgroundSound(Files.SND_MENU_BACKGROUND);
    
    this.waitTime = 30;
};

ItemMainMenu.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this;
        this.buttons[i].initialize();
    }
};

ItemMainMenu.prototype.activate = function()
{
    this.highScore = 0;
    var data = Database.getItem("Stomp_HighScore");
    if(data != undefined) {this.highScore = Number(data);}
};

ItemMainMenu.prototype.deActivate = function()
{

};

ItemMainMenu.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }
    
    this.waitTime--;
    
    if(this.waitTime == 0)
    {
        this.logoAnim.reset();   
    }
    
    this.logoAnim.tick();
};

ItemMainMenu.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
    
    this.logoAnim.draw(gfx, Align.width / 2 - this.logoAnim.width / 2, Align.height / 2 - this.logoAnim.height / 1.2);

    gfx.drawString("HighScore: " + parseInt(this.highScore) + "m", 30, (Align.height / 2) + 180, "#FFF", "80pt " + Files.FNT_DEFAULT_FONT);
};
