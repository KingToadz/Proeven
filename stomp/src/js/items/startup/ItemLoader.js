/**
 * Created by Jelle on 4/26/2014.
 */

ItemLoader = function()
{
    this.backgroundTexture = Files.PIC_LOADER_BACKGROUND.obj;

    this.loader = new Loader(Files.files);
    this.loader.start();
};

ItemLoader.prototype.initialize = function()
{

};

ItemLoader.prototype.activate = function()
{

};

ItemLoader.prototype.deActivate = function()
{

};

ItemLoader.prototype.tick = function()
{
    if(this.loader.done == true)
    {
        this.itemHandler.setGotoItem(ItemMainMenu);
    }
};

ItemLoader.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);


};
