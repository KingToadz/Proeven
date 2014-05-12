/**
 * Created by Yorick on 5/9/2014.
 */

TutorialWorld = function(dir, tutorialHandler)
{
    this.dir = dir;

    this.backgroudTexture = Files.PIC_GAME__BACKGROUND.obj;

    this.buttons = [];

    var button = undefined;

    this.state = 0;
    this.stateDone = false;
    this.waitCount = 0;
    this.innerState = 0;

    this.worldPaused = false;

    // Jump button
    button = new RotatableButton();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_BUTTON_JUMP.obj);
    button.setSize(Files.PIC_GAME_BUTTON_JUMP.obj.width, Files.PIC_GAME_BUTTON_JUMP.obj.height);

    var screenPosX = -(Align.width / 2) * (dir - 1);
    var screenPosY = -(Align.height / 2) * (dir - 1);

    var objPosX = (button.width / 2) * (dir);
    var objPosY = (button.height / 2) * (dir);

    button.setPosition(screenPosX + objPosX, screenPosY + objPosY);

    button.rotation = (dir + 1) * 90;
    button.world = this;
    button.onClick = function(){this.world.otherWorld.continueJump(); this.world.otherWorld.objectHandler.player.tryJump();};
    this.buttons.push(button);

    // Back button
    button = new RotatableButton();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_BUTTON_BACK.obj);
    button.setSize(Files.PIC_GAME_BUTTON_BACK.obj.width, Files.PIC_GAME_BUTTON_BACK.obj.height);

    var screenPosX = (Align.width / 2) * (dir + 1);
    var screenPosY = -(Align.height / 2) * (dir - 1);

    var objPosX = -(button.width / 2) * (dir);
    var objPosY = (button.height / 2) * (dir);

    button.setPosition(screenPosX + objPosX, screenPosY + objPosY);

    button.rotation = (dir + 1) * 90;
    button.world = this;
    button.onClick = function(){this.world.gameHandler.item.itemHandler.setGotoItem(ItemMainMenu)};
    this.buttons.push(button);

    this.objectHandler = new TutorialObjectHandler(this);
};

TutorialWorld.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this.gameHandler.item;
        this.buttons[i].initialize();
    }

    this.objectHandler.initialize();
};

TutorialWorld.prototype.nextState = function()
{
    this.state++;
    this.stateDone = false;
    this.innerState = 0;

    if(this.state == 1)
    {
        // Spawn small block
        this.currentObstacle = new Obstacle(this.objectHandler.world.dir);
        this.objectHandler.addObstacle(this.currentObstacle);
    }
};

TutorialWorld.prototype.currentObatacleFromPlayer = function()
{
    return this.currentObstacle.x - this.objectHandler.player.x;
};

TutorialWorld.prototype.continueJump = function()
{
    if(this.stateDone == false && this.worldPaused == true)
    {
        this.worldPaused = false;
        this.innerState++;
    }
};

TutorialWorld.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }

    if(this.state == 0)
    {
        this.waitCount++;
        if(this.TouchDownInWorld() && this.waitCount >= 50)
        {
            this.stateDone = true;
        }
    }
    else if(this.state == 1)
    {
        var distToPlayer = this.currentObatacleFromPlayer();

        if(distToPlayer < 200 && distToPlayer > 0 && this.innerState == 0)
        {
            this.worldPaused = true;
        }
        else if(distToPlayer < -200 && this.innerState == 1)
        {
            // spawn new block
            this.currentObstacle = new Obstacle(this.objectHandler.world.dir);
            this.objectHandler.addObstacle(this.currentObstacle);
            this.innerState++;
        }
        else if(distToPlayer < -200 && this.innerState == 2)
        {
            this.stateDone = true;
        }
    }

    if(!this.worldPaused){
        this.objectHandler.tick();
    }
};

TutorialWorld.prototype.TouchDownInWorld = function()
{
    if(this.gameHandler.item.itemHandler.windowHandler.isMouseDown())
    {
        var mousesdown = this.gameHandler.item.itemHandler.windowHandler.getMousesDown();
        for(var i = 0; i < mousesdown.length; i++)
        {
            if(mousesdown[i].ticksAlive == 1)
            {
                if(this.dir == -1 && mousesdown[i].y > Align.height / 2)
                {
                    //console.log("BOTTOM SCREEN!" + mousesdown[i].y);
                    return true;
                }
                else if(this.dir == 1 && mousesdown[i].y < Align.height / 2)
                {
                    //console.log("TOP SCREEN!" + mousesdown[i].y);
                    return true;
                }
            }
        }
    }
    return false;
}

TutorialWorld.prototype.draw = function(gfx)
{
    // prepare draw
    gfx.gfx.save();
    gfx.gfx.scale(1, this.dir);
    gfx.gfx.translate(0, (Align.height / 2) * (this.dir - 1));

    //gfx.fillRect(100, 200, 100, 100, "#00f");
    gfx.drawString("State = " + this.state + this.waitCount, 600, 300, "#FFF", "20pt Arial");

    //gfx.drawTexture(this.backgroudTexture, 0, 0, this.backgroudTexture.width, this.backgroudTexture.height);
    this.objectHandler.draw(gfx);

    if(this.stateDone)
    {
        gfx.drawCenteredString("Wacht op de andere speler!", 800, 400, "#FFF", "20pt Arial");
    }
    else if(this.state == 0)
    {
        gfx.drawCenteredString("Leer springen.\r\n Druk op het scherm om door te gaan", 800, 400, "#FFF", "20pt Arial");
    }
    else if(this.state == 1)
    {
        if(this.worldPaused && this.innerState == 0)
        {
            gfx.drawCenteredString("Druk nu op de spring knop!", 800, 400, "#FFF", "20pt Arial");
        }
        else if(this.worldPaused && this.innerState == 1)
        {
            //gfx.drawCenteredString("ontwijk de obstakels!", 800, 400, "#FFF", "20pt Arial");
        }
    }

    gfx.gfx.restore();

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
