/**
 * Created by Yorick on 5/9/2014.
 */

// The constructor
// Args:
// Dir:             The direction of the world. Should be 1 or -1
// tutorialHandler: The parent of this world.
TutorialWorld = function(dir, tutorialHandler)
{
    this.dir = dir;

    this.backgroundHandler = new BackgroundHandler((-(this.dir - 1)));

    this.buttons = [];

    var button = undefined;

    // Vars for the jump tutorial
    // This is handled sperated per world
    this.jumpDone = false;
    this.jumpDoing = true;
    this.canPlayerJump = false;
    this.handler = tutorialHandler;

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
    button.onClick = function(){this.world.gameHandler.popup.popups[0].show = true;};
    this.buttons.push(button);

    this.objectHandler = new TutorialObjectHandler(this);
    this.worldPaused = false;
};

// this will initialize the tutorial world
TutorialWorld.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this.gameHandler.item;
        this.buttons[i].initialize();
    }

    this.objectHandler.initialize();

    this.jumpState = new JumpState(this);
};

TutorialWorld.prototype.startJumpTutorial = function()
{
    // If it's set to true before the initialize it will skip the jump tutorial
    if(!this.jumpDone)
    {
        this.jumpState.reset();
    }
    else
    {
        this.jumpState.done = true
    }
};

// Get the distance between the player and the first obstacle in the object handler.
// All the tutorials only use 1 object
// Returns: if the first obstacle is undefined it will return -77777 else it will return the distance
TutorialWorld.prototype.currentObstacleFromPlayer = function()
{
    if(this.objectHandler.obstacles[0] === undefined)
    {
        return -77777;
    }

    return this.objectHandler.obstacles[0].x - this.objectHandler.player.x;
};

// Check if the player can jump
// Returns: if the player can jump
TutorialWorld.prototype.continueJump = function()
{
    // if the jump tutorial is busy check that one
    if(this.jumpDoing)
    {
        return this.jumpState.handleJump();
    }

    return this.handler.handleJump(this.dir);
};

TutorialWorld.prototype.tick = function()
{
    this.jumpDone = this.jumpState.done;

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }

    if(this.TouchDownInWorld())
    {
        if(this.otherWorld.continueJump()){
            this.otherWorld.objectHandler.player.tryJump();
        }
    }

    if(this.jumpDoing){
        this.jumpState.tick();
    }

    if(!this.worldPaused){
        this.backgroundHandler.tick();
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
};

TutorialWorld.prototype.draw = function(gfx)
{
    // prepare draw
    gfx.gfx.save();
    gfx.gfx.scale(1, this.dir);
    gfx.gfx.translate(0, (Align.height / 2) * (this.dir - 1));

    this.backgroundHandler.draw(gfx);

    this.objectHandler.draw(gfx);

    gfx.gfx.restore();

    if(this.jumpDoing)
    {
        this.jumpState.draw(gfx);
    }

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};

TutorialWorld.prototype.drawString = function(gfx, text)
{
    if(this.dir == -1)
    {
        gfx.drawReversedCenteredString(text, Align.width / 2, 200, "#FFF", "52pt Arial");
    }
    else
    {
        gfx.drawCenteredString(text, Align.width / 2, 200, "#FFF", "52pt Arial");
    }
};
