
PopupHandler = function(item2, width, height)
{
    this.popups = [];

    var popupPause = new PopupPause(width, height);
    this.popups.push(popupPause);

    var endPopup = new PopupEnd(width, height);
    this.popups.push(endPopup);

    var popupSkip = new PopupSkipTutorial(width, height);
    this.popups.push(popupSkip);


    for(var i = 0; i < this.popups.length; i++)
    {
        this.popups[i].item = item2;
        this.popups[i].initialize();
    }
    //this.ShowEnd(10000);
};

PopupHandler.prototype.showSkipPopup = function()
{
    this.popups[2].show = true;
};

PopupHandler.prototype.hideAllPopups = function()
{
    for(var i = 0; i < this.popups.length; i++)
    {
        this.popups[i].show = false;
    }
};

PopupHandler.prototype.isPopupShowing = function()
{
    for(var i = 0; i < this.popups.length; i++)
    {
        if(this.popups[i].show){
            return true;
        }
    }

    return false;
};

PopupHandler.prototype.showEnd = function(score)
{
    this.popups[1].score = score;
    this.popups[1].show = true;
};

PopupHandler.prototype.tick = function()
{
    for(var i = 0; i < this.popups.length; i++)
    {
        if(this.popups[i].show){
            this.popups[i].tick();
        }
    }
};

PopupHandler.prototype.draw = function(gfx)
{
    for(var i = 0; i < this.popups.length; i++)
    {
        if(this.popups[i].show){
            gfx.fillTransparentRect(0,0, Align.width, Align.height, "#000", 0.6);
            this.popups[i].draw(gfx);
        }
    }
};
