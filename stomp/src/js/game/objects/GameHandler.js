/**
 * Created by Jelle on 5/6/2014.
 */

GameHandler = function(item)
{
    this.item = item;

    SFX.setBackgroundSound(Files.SND_GAME_BACKGROUND);

    this.sharedSpawnOptions = new SharedSpawnOptions();

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
    this.world1.tick();
    this.world2.tick();
};

GameHandler.prototype.draw = function(gfx)
{
    this.world1.draw(gfx);
    this.world2.draw(gfx);
};
