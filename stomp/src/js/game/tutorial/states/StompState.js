/// Other world is the world that needs to jump over the obstacle
/// 1) wait until the obstacle is close enough
/// 2) let this world player jump
/// 3) let this world player stomp
/// 4) let other player jump

StompState = function(firstWorld, secondWorld)
{
    this.world = firstWorld;
    this.otherWorld = secondWorld;
    this.objectHandler = this.world.objectHandler;
    this.innerState = 0;
    this.done = false;
};

StompState.prototype.nextInnerState = function()
{
    var oldInner = this.innerState;
    this.innerState++;
    console.log("InnerState changed from " + oldInner + " to " + this.innerState);
};

StompState.prototype.start = function()
{
    this.innerState = 0;
    this.spawnBlock();
    this.nextInnerState();
    this.world.otherWorld.objectHandler.obstacles = [];
};

StompState.prototype.handleJump = function()
{
    if(this.innerState >= 1){

        if(this.innerState == 2)
        {
            this.otherWorld.worldPaused = false;
            this.world.worldPaused = false;
            this.world.setNextInnerState(3);
            return true;
        }
        else if(this.innerState == 3)
        {
            this.otherWorld.worldPaused = false;
            this.world.worldPaused = false;
            this.world.setNextInnerState(4);
            return true;
        }
        else if(this.innerState == 4)
        {
           this.otherWorld.worldPaused = false;
           this.world.worldPaused = false;
           return true;
        }


    /*
        if(this.innerState == 1)
        {
            return true;
        }
        else if(this.innerState == 2)
        {
            this.world.worldPaused = false;
            this.world.otherWorld.worldPaused = false;
            this.nextInnerState();
            this.world.otherWorld.forceNextInnerState();
            return true;
        }
        else if(this.innerState == 3)
        {
            this.world.worldPaused = false;
            this.world.otherWorld.worldPaused = false;
            this.nextInnerState();
            this.world.otherWorld.forceNextInnerState();
            return true;
        }
        */
        return true;
    } else {
        return false;
    }
};

StompState.prototype.spawnBlock = function()
{
    this.world.objectHandler.obstacles = [];
    this.world.objectHandler.addObstacle(new Obstacle(this.world.dir));
};

StompState.prototype.reset = function()
{
    this.innerState = 0;
    this.done = false;
    this.start();
};

StompState.prototype.tick = function()
{
    var distToPlayer = this.world.otherWorld.currentObstacleFromPlayer();

    if(this.innerState == 1)
    {
        if(distToPlayer > 0 && distToPlayer < 350)
        {
            this.otherWorld.worldPaused = true;
            this.world.setNextInnerState(2);
            this.innerState = 6;
        }
    }
    else if(this.innerState == 3)
    {
        //
        if(distToPlayer > 0 && distToPlayer < 250)
        {
            this.otherWorld.worldPaused = true;
            this.world.worldPaused = true;
            this.world.setNextInnerState(5);
        }
    }
    else if(this.innerState == 6)
    {
        this.done;
    }


    /*
    if(this.innerState == 1)
    {
        if(distToPlayer > 0 && distToPlayer < 350)
        {
            this.world.otherWorld.worldPaused = true;
            this.nextInnerState();
            this.world.otherWorld.forceNextInnerState();

            // After the jump the innerState will be incremented to 2
        }
    }
    else if(this.innerState == 3)
    {
        if(distToPlayer > 0 && distToPlayer < 200)
        {
            this.world.worldPaused = true;
            this.world.otherWorld.worldPaused = true;
        }
    }
    else if(this.innerState == 4)
    {
        this.done = true;
    }
    */
};

StompState.prototype.HandleInnerStateOtherWorld = function()
{

};

StompState.prototype.draw = function(gfx)
{
    gfx.drawCenteredString("INNERSTATE: " + this.innerState, Align.width / 2, 200, "#FFF", "20pt Arial");

    if(this.done == true)
    {
        gfx.drawCenteredString("Wacht op de andere speler!", 800, 400, "#FFF", "20pt Arial");
    }
    if(this.innerState == 0)
    {
        gfx.drawCenteredString("stomp tutorial", 800, 400, "#FFF", "20pt Arial");
    }
    else if(this.innerState == 1)
    {
        gfx.drawCenteredString("Block should wait", 800, 400, "#FFF", "20pt Arial");
    }
    else if(this.innerState == 3)
    {
        gfx.drawCenteredString("Spring ofzo ", 800, 400, "#FFF", "20pt Arial");
    }
};