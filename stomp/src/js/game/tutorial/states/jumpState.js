JumpState = function(pWorld, objHandle)
{
    this.world = pWorld;
    this.objectHandler = this.world.objectHandler;
    this.innerState = 0;
    this.done = false;
};

JumpState.prototype.nextInnerState = function()
{
    this.innerState++;
    console.log("Next inner state " + this.innerState);
};

JumpState.prototype.start = function()
{
    this.spawnBlock();
    this.innerState++;
};

JumpState.prototype.handleJump = function()
{
    if(this.innerState >= 1){
        if(this.innerState == 1)
        {
            this.world.worldPaused = false;
            this.nextInnerState();
        }
        return true;
    } else {
        return false;
    }
};

JumpState.prototype.spawnBlock = function()
{
    this.world.objectHandler.obstacles = [];
    this.world.objectHandler.addObstacle(new Obstacle(this.world.dir));
};

JumpState.prototype.reset = function()
{
    this.innerState = 0;
    this.done = false;
    this.start();
};

JumpState.prototype.tick = function()
{
    var distToPlayer = this.world.currentObstacleFromPlayer();

    if(this.innerState == 1)
    {
        if(distToPlayer > 0 && distToPlayer < 200)
        {
            this.world.worldPaused = true;
            // After the jump the innerState will be incremented to 2
        }
    }
    else if(this.innerState == 2)
    {
        if(distToPlayer < -200 && distToPlayer > -1000)
        {
            this.spawnBlock();
            this.nextInnerState();
        }
        else if(this.objectHandler.player.x < Align.width / 2 - 300)
        {
            this.objectHandler.player.respawn();
            this.objectHandler.obstacles = [];
            this.spawnBlock();
            this.innerState--;
        }
    }
    else if(this.innerState == 3)
    {
        if(distToPlayer < -200 && distToPlayer > -1000)
        {
            this.nextInnerState();
        }
        else if(this.objectHandler.player.x < Align.width / 2 - 600)
        {
            this.objectHandler.player.respawn();
            this.objectHandler.obstacles = [];
            this.spawnBlock();
        }
    }
    else if(this.innerState == 4)
    {
        this.done = true;
    }

    // Players aren't allowed to jump
    this.objectHandler.player.shouldStomp = false;
};

JumpState.prototype.draw = function(gfx)
{
    gfx.drawCenteredString("INNERSTATE: " + this.innerState, Align.width / 2, 200, "#FFF", "20pt Arial");

    if(this.done == true)
    {
        gfx.drawCenteredString("Wacht op de andere speler!", 800, 400, "#FFF", "20pt Arial");
    }
    if(this.innerState == 0)
    {
        gfx.drawCenteredString("Tutorial time", 800, 400, "#FFF", "20pt Arial");
    }
    else if(this.innerState == 1)
    {
        gfx.drawCenteredString("Springen", 800, 400, "#FFF", "20pt Arial");
    }
    else if(this.innerState == 2)
    {
        gfx.drawCenteredString("SPRINGEN", 800, 400, "#FFF", "20pt Arial");
    }
};