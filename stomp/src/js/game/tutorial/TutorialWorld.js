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
    button.onClick = function(){if(this.world.otherWorld.continueJump()){ this.world.otherWorld.objectHandler.player.tryJump();}};
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

    this.currentState = 0;
    this.states = [];

    var jumpState = new JumpState(this);
    jumpState.start();

    this.states.push(jumpState);

    jumpState = new JumpState(this);
    jumpState.start();
    this.states.push(jumpState);

    this.worldPaused = false;
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
    this.currentState++;
    this.states[this.currentState].start();
};

TutorialWorld.prototype.currentStateDone = function()
{
    return this.states[this.currentState].done;
};

TutorialWorld.prototype.currentObatacleFromPlayer = function()
{
    return this.currentObstacle.x - this.objectHandler.player.x;
};

TutorialWorld.prototype.continueJump = function()
{
    return this.states[this.currentState].handleJump();
};

TutorialWorld.prototype.tick = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].tick();
    }

    this.states[this.currentState].tick();

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

    gfx.drawCenteredString("State = " + this.currentState, Align.width / 2, 300, "#FFF", "20pt Arial");

    this.objectHandler.draw(gfx);

    this.states[this.currentState].draw(gfx);

    gfx.gfx.restore();

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
