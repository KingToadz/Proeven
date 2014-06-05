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

    this.themeHandler = new ThemeHandler();
    
    this.backgroundHandler = new TutorialBackgroundHandler((-(this.dir - 1)));
    this.backgroundHandler.world = this;
    this.backgroundHandler.themeHandler = this.themeHandler;

    this.buttons = [];

    var button = undefined;

    // Vars for the jump tutorial
    // This is handled sperated per world
    this.jumpDone = false;
    this.jumpDoing = true;
    this.canPlayerJump = false;
    this.handler = tutorialHandler;

    // Jump button
    /*
    button = new RotatableButton();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_BUTTON_JUMP);
    button.setSize(Files.PIC_GAME_BUTTON_JUMP.width, Files.PIC_GAME_BUTTON_JUMP.height);
    

    var screenPosX = -(Align.width / 2) * (dir - 1);
    var screenPosY = -(Align.height / 2) * (dir - 1);

    var objPosX = (button.width / 2) * (dir);
    var objPosY = (button.height / 2) * (dir);

    button.setPosition(screenPosX + objPosX, screenPosY + objPosY);

    button.rotation = (dir + 1) * 90;
    button.world = this;
    this.buttons.push(button);
    */

    // Back button
    button = new RotatableButton();
    button.alignx = Align.LEFT;
    button.aligny = Align.TOP;
    button.setTexture(Files.PIC_GAME_BUTTON_BACK);
    button.setSize(Files.PIC_GAME_BUTTON_BACK.width, Files.PIC_GAME_BUTTON_BACK.height);

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
    this.succes = 0;
    this.dark = false;
};

// this will initialize the tutorial world
TutorialWorld.prototype.initialize = function()
{
    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].item = this.gameHandler.item;
        this.buttons[i].initialize();
    }

    this.backgroundHandler.initialize();
    this.objectHandler.initialize();
};

// Check if the player can jump
// Returns: if the player can jump
TutorialWorld.prototype.continueJump = function()
{
    return this.gameHandler.handleJump(this.dir);
};

TutorialWorld.prototype.tick = function()
{
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

    if(!this.worldPaused){
        this.backgroundHandler.tick();
        this.objectHandler.tick();
    }
};

TutorialWorld.prototype.distanceToPlayer = function()
{
    var max = -10000;
    for(var i = 0; i < this.objectHandler.obstacles.length; i++)
    {
        if(this.objectHandler.obstacles[i].x + this.objectHandler.obstacles[i].width > this.objectHandler.player.x && !this.objectHandler.obstacles[i].passedPlayer)
        {
            if(this.objectHandler.obstacles[i].x - this.objectHandler.player.x > max)
            {
                max = this.objectHandler.obstacles[i].x - this.objectHandler.player.x
            }
        }
    }
    
    return max;
};

//  1 Over obstacle no dead
//  0 Over obstacle with dead
// -1 Not over obstacle
TutorialWorld.prototype.playerPastObstacle = function()
{
    for(var i = 0; i < this.objectHandler.obstacles.length; i++)
    {
        if(this.objectHandler.obstacles[i].x + this.objectHandler.obstacles[i].width < this.objectHandler.player.x && !this.objectHandler.obstacles[i].passedPlayer)
        {            
            this.objectHandler.obstacles[i].passedPlayer = true;
            if(this.objectHandler.player.isImmuneFor <= 0)
            {
                return 1;
            }
            else
            {
                return 0; 
            }
        }
    }
    
    return -1;
};

TutorialWorld.prototype.TouchDownInWorld = function()
{
    if(this.gameHandler.item.itemHandler.windowHandler.isKeyDown())
    {
        var keysdown = this.gameHandler.item.itemHandler.windowHandler.getKeysDown();
        for (var i = 0; i < keysdown.length; i++)
        {
            if (keysdown[i].ticksAlive == 1 && keysdown[i].keyCode == 90 && this.dir == -1)
            {
                return true;
            }
            
            if (keysdown[i].ticksAlive == 1 && keysdown[i].keyCode == 77 && this.dir == 1)
            {
                return true;
            }
        }
    }
    
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

TutorialWorld.prototype.draw = function(gfx, text)
{
    // prepare draw
    gfx.gfx.save();
    gfx.gfx.scale(1, this.dir);
    gfx.gfx.translate(0, (Align.height / 2) * (this.dir - 1));
    
    gfx.flipText = (this.dir == -1);

    this.backgroundHandler.draw(gfx);

    this.objectHandler.draw(gfx);
    
    for(var i = 0; i < 3; i++)
    {
        if(i < this.succes)
        {
            gfx.drawTexture(Files.PIC_GAME_TUTORIAL_FILLED, (Align.width / 2 - Files.PIC_GAME_TUTORIAL_FILLED.width) - Files.PIC_GAME_TUTORIAL_FILLED.width + i * 50, 100, Files.PIC_GAME_TUTORIAL_FILLED.width, Files.PIC_GAME_TUTORIAL_FILLED.height);  
        }
        else   
        {
            gfx.drawTexture(Files.PIC_GAME_TUTORIAL_EMPTY, (Align.width / 2 - Files.PIC_GAME_TUTORIAL_FILLED.width) - Files.PIC_GAME_TUTORIAL_FILLED.width + i * 50, 100, Files.PIC_GAME_TUTORIAL_FILLED.width, Files.PIC_GAME_TUTORIAL_FILLED.height);  
        }
         
    }
    
    if(this.dark)
    {
        gfx.fillTransparentRect(0,0,Align.width, Align.height / 2, "#000", 0.8);   
    }
    
    gfx.gfx.font = "75pt " + Files.FNT_DEFAULT_FONT;
    var metrics = gfx.gfx.measureText(text);
    gfx.drawString(text, (Align.width / 2 - (metrics.width / 2)), Align.height / 4, "#FFF", "75pt " + Files.FNT_DEFAULT_FONT);
    
    //gfx.drawString(text, Align.width / 2, Align.height / 4, "#FFF", "60pt " + Files.FNT_DEFAULT_FONT);

    gfx.gfx.restore();
    
    gfx.flipText = false;

    for(var i = 0; i < this.buttons.length; i++)
    {
        this.buttons[i].draw(gfx);
    }
};
