
PopupHandler = function(item2, width, height)
{
    this.popups = [];

    var popupPause = new PopupPause(width, height);
    this.popups.push(popupPause);

    var endPopup = new PopupEnd(width, height);
    endPopup.item = item2;
    endPopup.initialize();
    this.popups.push(endPopup);

    for(var i = 0; i < this.popups.length; i++)
    {
        this.popups[i].item = item2;
        this.popups[i].initialize();
    }

    //this.ShowEnd(10000);
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

PopupHandler.prototype.ShowEnd = function(score)
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
            gfx.fillTransparentRect(0,0, Align.width, Align.height, "#000", 0.25);
            this.popups[i].draw(gfx);
        }
    }
};
