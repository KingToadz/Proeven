/**
 * Created by Jelle on 4/26/2014.
 */

ItemInitialize = function(){};

ItemInitialize.prototype.initialize = function()
{
    this.loader = new Loader(Files.prefiles);
    this.loader.start();
};

ItemInitialize.prototype.activate = function()
{

};

ItemInitialize.prototype.deActivate = function()
{

};

ItemInitialize.prototype.tick = function()
{
    if(this.loader.done == true)
    {
        this.itemHandler.switchItem(ItemLoader);
    }
};

ItemInitialize.prototype.draw = function(gfx)
{
    gfx.clear("black");
};
