/**
 * Created by Jelle on 4/26/2014.
 */

ItemHandler = function()
{
    this.curItem = null;
    this.gotoItem = null;

    this.loadedItems = [];
};

ItemHandler.prototype.setGotoItem = function(item)
{
    this.gotoItem = item;
};

ItemHandler.prototype.tick = function()
{
    if(this.gotoItem != null)
    {
        if(this.curItem != null)
        {
            this.curItem.deActivate();
        }

        var found = null;
        for(var i = 0; i < this.loadedItems.length; i++)
        {
            if(this.loadedItems[i].constructor == this.gotoItem)
            {
                found = this.loadedItems[i];
                break;
            }
        }

        if(found == undefined)
        {
            this.curItem = new this.gotoItem();
            this.loadedItems.push(this.curItem);
        }
        else
        {
            this.curItem = found;
        }

        this.gotoItem = null;

        if(!this.curItem.hasInitialized)
        {
            this.curItem.itemHandler = this;
            this.curItem.hasInitialized = true;
            this.curItem.initialize();
        }

        this.curItem.activate();
    }

    this.curItem.tick();
};

ItemHandler.prototype.draw = function(gfx)
{
    this.curItem.draw(gfx);
};
