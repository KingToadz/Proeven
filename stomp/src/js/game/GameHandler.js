/**
 * Created by Jelle on 5/6/2014.
 */

GameHandler = function(item)
{
    this.item = item;

    this.highScore = 0;
    var data = Database.getItem("Stomp_HighScore");
    if(data != undefined) {this.highScore = Number(data);}
};

GameHandler.prototype.startNewGame = function()
{
    this.score = 0.0;

    this.popup = new PopupHandler(this.item, Align.width * 0.8, Align.height * 0.8);

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

GameHandler.prototype.startGameFromTutorial = function(tutorialHandler)
{
    this.startNewGame();

    // sync backgrounds
    for(var i = 0; i < tutorialHandler.world1.backgroundHandler.layers.length; i++)
    {
        this.world1.backgroundHandler.layers[i].x = tutorialHandler.world1.backgroundHandler.layers[i].x;
    }

    for(var i = 0; i < tutorialHandler.world2.backgroundHandler.layers.length; i++)
    {
        this.world2.backgroundHandler.layers[i].x = tutorialHandler.world2.backgroundHandler.layers[i].x;
    }

    // sync obstacles
    for(var i = 0; i < tutorialHandler.world1.objectHandler.obstacles.length; i++)
    {
        this.world1.objectHandler.obstacles.push(tutorialHandler.world1.objectHandler.obstacles[i]);
    }

    for(var i = 0; i < tutorialHandler.world2.objectHandler.obstacles.length; i++)
    {
        this.world2.objectHandler.obstacles.push(tutorialHandler.world2.objectHandler.obstacles[i]);
    }
};

GameHandler.prototype.newHighScore = function(score)
{
    this.highScore = score;
    Database.setItem("Stomp_HighScore", this.highScore);
};

GameHandler.prototype.endCurrentGame = function()
{
    if(this.score > this.highScore)
    {
        this.newHighScore(this.score);
    }
    this.popup.showEnd(this.score);
};

GameHandler.prototype.tick = function()
{
    if(!this.popup.isPopupShowing())
    {
        this.sharedSpawnOptions.tick();

        this.world1.tick();
        this.world2.tick();

        this.score += 0.254; // 55 km/h / 3.6 = 15.27 m/s / 60fps = 0.254 m/tick

        if(this.world1.backgroundHandler.fails > 6 || this.world2.backgroundHandler.fails > 6)
        {
            this.endCurrentGame();
        }
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

    //gfx.drawCenteredString("Score: " + this.score, Align.width / 2, 60, "#FFF", "70pt " + Files.FNT_DEFAULT_FONT);
    //gfx.drawReversedCenteredString("Score: " + this.score, Align.width / 2, 480, "#FFF", "70pt " + Files.FNT_DEFAULT_FONT);

    this.popup.draw(gfx);
};
