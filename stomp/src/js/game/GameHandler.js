/**
 * Created by Jelle on 5/6/2014.
 */

GameHandler = function(item)
{
    this.item = item;

    this.sharedSpawnOptions = new SharedSpawnOptions();

    this.popup = new PopupHandler(item, Align.width * 0.8, Align.height * 0.8);

    this.world1 = new World(1);
    this.world2 = new World(-1);

    this.world1.gameHandler = this;
    this.world2.gameHandler = this;

    this.world1.otherWorld = this.world2;
    this.world2.otherWorld = this.world1;

    this.world1.initialize();
    this.world2.initialize();
};

GameHandler.prototype.tick = function()
{
    if(!this.popup.show)
    {
        this.world1.tick();
        this.world2.tick();
    }
    else
    {
        this.popup.tick();
    }
};

GameHandler.prototype.draw = function(gfx)
{
    gfx.clear("#000");

    this.world1.draw(gfx);
    this.world2.draw(gfx);

    this.popup.draw(gfx);
};
