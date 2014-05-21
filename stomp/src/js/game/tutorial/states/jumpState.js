JumpState = function(pWorld)
{
    this.world = pWorld;
    this.objectHandler = this.world.objectHandler;
    this.innerState = -1;
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
    this.world.objectHandler.addObstacle(new SmallObstacle(this.world.dir));
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
    
    if(this.innerState == -1)
    {
        this.reset();
    }

    if(this.innerState == 0)
    {
        if(distToPlayer > 0 && distToPlayer < 200)
        {
            this.world.worldPaused = true;
            this.nextInnerState();
            // After the jump the innerState will be incremented to 2
        }
    }
    else if(this.innerState == 2)
    {
        if(distToPlayer < -400 && distToPlayer > -1000)
        {
            this.spawnBlock();
            this.nextInnerState();
        }
        else if(this.objectHandler.player.hasCollided)
        {
            this.objectHandler.player.isImmuneFor = 0;
            this.objectHandler.player.hasCollided = 0;
            this.objectHandler.obstacles = [];
            this.spawnBlock();
            this.innerState--;
        }
    }
    else if(this.innerState == 3)
    {
        if(distToPlayer < -400 && distToPlayer > -1000)
        {
            this.nextInnerState();
        }
        else if(this.objectHandler.player.hasCollided)
        {
            this.objectHandler.player.isImmuneFor = 0;
            this.objectHandler.player.hasCollided = 0;
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
    if(this.done == true)
    {
        this.world.drawString(gfx, "Goedzo! Wacht nu op de andere speler!");
    }
    else if(this.innerState == 0)
    {
        this.world.drawString(gfx, "Wacht tot het obstakel dicht bij is");
    }
    else if(this.innerState == 1)
    {
        this.world.drawString(gfx, "Druk op springen om er over heen te komen");
    }
    else if(this.innerState == 3)
    {
        this.world.drawString(gfx, "Probeer het nu zonder hulp");
    }
};
