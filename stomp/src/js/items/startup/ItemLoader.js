/**
 * Created by Jelle on 4/26/2014.
 */

ItemLoader = function()
{
    this.backgroundTexture = Files.PREPIC_LOADER_BACKGROUND;

    this.loader = new Loader(1);
    this.loader.start();

    this.loadingBar = Files.PREPIC_LOADER_LOADINGBAR;
    this.loadingBarOutline = Files.PREPIC_LOADER_LOADINGBAROUTLINE;
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
        this.itemHandler.switchItem(ItemMainMenu, "left");
    }
};

ItemLoader.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    gfx.drawTexture(this.loadingBarOutline, (Align.width / 2) - (this.loadingBarOutline.width / 2), Align.height - 400, this.loadingBarOutline.width, this.loadingBarOutline.height);
    var w = (this.loadingBar.width / this.loader.length) * this.loader.index;

    gfx.drawClippedTexture(this.loadingBar, (Align.width / 2) - (this.loadingBar.width / 2), Align.height - 400, w, this.loadingBar.height, 0, 0, w, this.loadingBar.height);
};
