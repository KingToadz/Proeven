/**
 * Created by Jelle on 4/26/2014.
 */

ItemHandler = function()
{
    this.curItem = null;
    this.gotoItem = null;

    this.loadedItems = [];

    this.instantSwitch = false;
    this.pastHalf = false;
    this.speed = 0;
};

ItemHandler.prototype.switchItem = function(item, flow)
{
    this.gotoItem = item;

    // create
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
        this.gotoItem = new this.gotoItem();
        this.loadedItems.push(this.gotoItem);
    }
    else
    {
        this.gotoItem = found;
    }

    if(!this.gotoItem.hasInitialized)
    {
        this.gotoItem.itemHandler = this;
        this.gotoItem.hasInitialized = true;
        this.gotoItem.initialize();
    }

    this.gotoItem.activate();

    this.gotoItem.x = 0;
    this.gotoItem.y = 0;

    // flow
    if(flow != undefined)
    {
        this.instantSwitch = false;
        this.pastHalf = false;
        this.speed = 0;

        if(flow == "left")
        {
            this.gotoItem.x = Align.width;
        }
        else if(flow == "up")
        {
            this.gotoItem.y = Align.height;
        }
        else if (flow == "right")
        {
            this.gotoItem.x = -Align.width;
        }
        else if (flow == "down")
        {
            this.gotoItem.y = -Align.height;
        }
    }
    else
    {
        this.instantSwitch = true;

        if(this.curItem == undefined)
        {
            this.curItem = this.gotoItem;
            this.gotoItem = null;
        }
    }
};

ItemHandler.prototype.tick = function()
{
    if(this.gotoItem != null)
    {
        if(this.instantSwitch == true)
        {
            if(this.curItem != null)
            {
                this.curItem.deActivate();
            }

            this.curItem = this.gotoItem;
            this.gotoItem = null;

            this.curItem.activate();
        }
        else
        {
            if(this.pastHalf == true)
            {
                this.speed -= 3;

                if(this.speed < 9)
                {
                    this.speed = 9;
                }
            }
            else
            {
                this.speed += 3;
            }

            if(this.gotoItem.x > 0)
            {
                this.gotoItem.x -= this.speed;
                this.curItem.x -= this.speed;

                if(this.pastHalf == true)
                {
                    if(this.gotoItem.x <= 0)
                    {
                        this.gotoItem.x = 0;
                    }
                }
                else
                {
                    if(this.gotoItem.x < Align.width / 2)
                    {
                        this.pastHalf = true;
                    }
                }
            }
            else if (this.gotoItem.x < 0)
            {
                this.gotoItem.x += this.speed;
                this.curItem.x += this.speed;

                if(this.pastHalf == true)
                {
                    if(this.gotoItem.x >= 0)
                    {
                        this.gotoItem.x = 0;
                    }
                }
                else
                {
                    if(this.gotoItem.x > -Align.width / 2)
                    {
                        this.pastHalf = true;
                    }
                }
            }

            if(this.gotoItem.y > 0)
            {
                this.gotoItem.y -= this.speed;
                this.curItem.y -= this.speed;

                if(this.pastHalf == true)
                {
                    if(this.gotoItem.y <= 0)
                    {
                        this.gotoItem.y = 0;
                    }
                }
                else
                {
                    if(this.gotoItem.y < Align.height / 2)
                    {
                        this.pastHalf = true;
                    }
                }
            }
            else if (this.gotoItem.y < 0)
            {
                this.gotoItem.y += this.speed;
                this.curItem.y += this.speed;

                if(this.pastHalf == true)
                {
                    if(this.gotoItem.y >= 0)
                    {
                        this.gotoItem.y = 0;
                    }
                }
                else
                {
                    if(this.gotoItem.y > -Align.height / 2)
                    {
                        this.pastHalf = true;
                    }
                }
            }

            if(this.gotoItem.x == 0 && this.gotoItem.y == 0)
            {
                this.curItem = this.gotoItem;
                this.gotoItem = null;
            }
        }
    }
    else
    {
        this.curItem.tick();
    }
};

ItemHandler.prototype.draw = function(gfx)
{
    gfx.clear("#000");
    gfx.gfx.save();
    gfx.gfx.translate(this.curItem.x, this.curItem.y);
    this.curItem.draw(gfx);
    gfx.gfx.restore();

    if(this.gotoItem != null)
    {
        gfx.gfx.save();
        gfx.gfx.translate(this.gotoItem.x, this.gotoItem.y);
        this.gotoItem.draw(gfx);
        gfx.gfx.restore();
    }
};
