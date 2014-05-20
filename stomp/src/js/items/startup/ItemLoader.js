/**
 * Created by Jelle on 4/26/2014.
 */

ItemLoader = function()
{
    this.backgroundTexture = Files.PIC_LOADER_BACKGROUND.obj;

    this.loader = new Loader(Files.files);
    this.loader.start();

    this.loadingBar = Files.PIC_LOADER_LOADINGBAR.obj;
    this.loadingBarOutline = Files.PIC_LOADER_LOADINGBAROUTLINE.obj;
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
        this.itemHandler.switchItem(ItemMainMenu);
    }
};

ItemLoader.prototype.draw = function(gfx)
{
    gfx.drawTexture(this.backgroundTexture, 0, 0, Align.width, Align.height);

    gfx.drawTexture(this.loadingBarOutline, (Align.width / 2) - (this.loadingBarOutline.width / 2), Align.height - 400, this.loadingBarOutline.width, this.loadingBarOutline.height);
    var w = (this.loadingBar.width / this.loader.length) * this.loader.index;

    gfx.drawClippedTexture(this.loadingBar, (Align.width / 2) - (this.loadingBar.width / 2), Align.height - 400, w, this.loadingBar.height, 0, 0, w, this.loadingBar.height);
};
