/**
 * Created by Jelle on 5/7/2014.
 */

ItemOptionsMenu = function()
{
    this.backgroundTexture = Files.PIC_OPTIONSMENU_BACKGROUND.obj;

    this.buttons = [];

    var button = undefined;

    // MasterVolume button
    button = new SlideButton();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEOFF.obj);
    button.setTexture2(Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEON.obj);
    button.setPosition(0, -250);
    button.setSize(Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEON.obj.width, Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEON.obj.height);
    button.onClick = function(sender){SFX.masterVolume = sender.value / 100.0; SFX.onChangeVolume();};
    button.setValue(100.0 * SFX.masterVolume);
    this.buttons.push(button);

    // BackgroundVolume button
    button = new SlideButton();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_OPTIONSMENU_BUTTON_BACKGROUNDVOLUMEOFF.obj);
    button.setTexture2(Files.PIC_OPTIONSMENU_BUTTON_BACKGROUNDVOLUMEON.obj);
    button.setPosition(0, 0);
    button.setSize(Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEON.obj.width, Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEON.obj.height);
    button.onClick = function(sender){SFX.backgroundVolume = sender.value / 100.0; SFX.onChangeVolume();};
    button.setValue(100.0 * SFX.backgroundVolume);
    this.buttons.push(button);

    // EffectsVolume button
    button = new SlideButton();
    button.alignx = Align.CENTER;
    button.aligny = Align.CENTER;
    button.setTexture(Files.PIC_OPTIONSMENU_BUTTON_EFFECTSVOLUMEOFF.obj);
    button.setTexture2(Files.PIC_OPTIONSMENU_BUTTON_EFFECTSVOLUMEON.obj);
    button.setPosition(0, 250);
    button.setSize(Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEON.obj.width, Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEON.obj.height);
    button.onClick = function(sender){SFX.effectsVolume = sender.value / 100.0; SFX.onChangeVolume();};
    button.setValue(100.0 * SFX.effectsVolume);
    this.buttons.push(button);

    // BackButton
    button = new Button();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_MENU_BUTTON_BACK.obj);
    button.setPosition(120, 120);
    button.setSize(Files.PIC_MENU_BUTTON_BACK.obj.width, Files.PIC_MENU_BUTTON_BACK.obj.height);
    button.onClick = function(){this.item.itemHandler.switchItem(ItemMainMenu, "up");};
    this.buttons.push(button);
};

ItemOptionsMenu.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this;
        this.buttons[i].initialize();
    }
};

ItemOptionsMenu.prototype.activate = function()
{
};

ItemOptionsMenu.prototype.deActivate = function()
{
};

ItemOptionsMenu.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }
};

ItemOptionsMenu.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
