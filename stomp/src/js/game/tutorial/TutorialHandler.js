/**
 * Created by Yorick on 5/9/2014.
 */

TutorialHandler = function(item)
{
    this.item = item;

    this.popup = new PopupHandler(this.item, Align.width, Align.height);

    this.startNewGame();

    this.popup.showSkipPopup();
};

TutorialHandler.prototype.startNewGame = function()
{
    this.world1 = new TutorialWorld(1, this);
    this.world2 = new TutorialWorld(-1, this);

    this.world1.gameHandler = this;
    this.world2.gameHandler = this;

    this.world1.otherWorld = this.world2;
    this.world2.otherWorld = this.world1;

    this.world1.jumpDone = false;
    this.world2.jumpDone = false;
    
    this.world1.initialize();
    this.world2.initialize();
    
    this.world1Step = 0;
    this.world2Step = 0;
    
    // To skip first tutorial   this.state = [2,2];
    // To skip second           this.state = [5,5];
    // to skip first bigstone   this.state = [11,11];
    
    this.state = [11,11];
    this.waitTimer = 0;
    this.testW1 = true;
    this.stoneDone = true;
    
    this.smallDone = false;
    
    if(this.state[0] == 0 && this.state[1] == 0)
    {
        this.world2.worldPaused = true;
        this.world1.objectHandler.addObstacle(new SmallObstacle());   
    }
};

TutorialHandler.prototype.handleJump = function(worldDir)
{    
    if(worldDir == this.world1.dir)
    {
        console.log("World 1 jump called");
        
        // If the screen is paused to learn the jump
        if(this.state[0] == 1)
        {
            this.world1.worldPaused = false;
            return true;
        }
        // Both busy with jump
        else if(this.state[0] >= 2 && this.state[0] < 5) 
        {
            return true;
        }
        // Big stone tutorial
        else if(this.state[0] == 7)
        {
            this.state[0]++;
            this.world2.worldPaused = false;
            this.world1.worldPaused = false;
            return true;   
        }
        // Big stone multiple
        else if(this.state[0] == 9)
        {
            this.state[0]++;
            this.world2.worldPaused = false;
            this.world1.worldPaused = false;
            return true;   
        }
        else if(this.state[0] > 11 && this.state[0] < 15)   
        {
            return true;
        }
    }
    else
    {
        console.log("World 2 jump called");
        
        // If the screen is paused for the jump
        if(this.state[1] == 1)
        {
            this.world2.worldPaused = false;
            return true;
        }
        // Both busy with jump 
        else if(this.state[1] >= 2 && this.state[1] < 5)
        {
            return true;
        }
        else if(this.state[1] == 7)
        {
            this.state[1]++;
            this.world2.worldPaused = false;
            this.world1.worldPaused = false;
            return true;   
        }
        else if(this.state[1] == 9)
        {
            this.state[1]++;
            this.world2.worldPaused = false;
            this.world1.worldPaused = false;
            return true;   
        }
        else if(this.state[1] > 11 && this.state[1] < 15)   
        {
            return true;
        }
    }
    
    return false;
};

TutorialHandler.prototype.checkFirstPart = function()
{
    if(this.state[0] > 1 && this.state[1] > 1)
    {
        return true;   
    }
    
    this.world1.objectHandler.player.canStomp = false;
    this.world2.objectHandler.player.canStomp = false;
    
    if(this.state[0] == 0)
    {
        this.world2.dark = true;
        var distance = this.world1.distanceToPlayer();
        if(distance > 0 && distance < 200 && this.state[0] == 0)
        {
            this.world1.worldPaused = true;
            this.state[0] = 1;
        }
    }
    else if(this.state[0] == 1)
    {
        var w1 = this.world1.playerPastObstacle();
        if(w1 == 1)
        {
            this.state[0] = 2;   
            this.world1.worldPaused = true;
            this.world2.worldPaused = false;
            this.world2.dark = false;
            this.world1.dark = true;
            this.world2.objectHandler.addObstacle(new SmallObstacle());
        }
    }
    else if(this.state[1] == 0 && this.state[0] > 1)
    {
        var distance = this.world2.distanceToPlayer();
        if(distance > 0 && distance < 200)
        {
            this.world2.worldPaused = true;
            this.state[1] = 1;
        }
    } 
    else if(this.state[1] == 1)
    {
        var w2 = this.world2.playerPastObstacle();
        if(w2 == 1)
        {
            this.state[1] = 2;   
            this.world1.worldPaused = false;
            this.world2.worldPaused = false;
            this.world1.dark = false;
            
            // Spawn the next object this is the start for the 3 blocks
            this.world1.objectHandler.addObstacle(new SmallObstacle());
            this.world2.objectHandler.addObstacle(new SmallObstacle());
        }
    }
    
    return false;
};

TutorialHandler.prototype.check3SmallObstacles = function()
{
    // At the start of this one the state should both be 2
    // Every stone adds 1 tot the state.
    
    if(this.state[0] >= 5 && this.state[1] >= 5)
    {
        return true;   
    }
    
    var w1 = this.world1.playerPastObstacle();
    if(w1 >= 0)
    {
        // Check if the player is over the first obstacle
        if(w1 == 1)
        {
            this.state[0]++;
            this.world1.succes++;
        }
        
        if(this.state[0] < 5){
            this.world1.objectHandler.addObstacle(new SmallObstacle());
        }
    }
    
    var w2 = this.world2.playerPastObstacle();
    if(w2 >= 0)
    {
        if(w2 == 1)
        {
            this.state[1]++;
            this.world2.succes++;
        }
        
        if(this.state[1] < 5){
            this.world2.objectHandler.addObstacle(new SmallObstacle());
        }
    }
    
    return false;
};

TutorialHandler.prototype.beginBigObstacles = function()
{
    if(this.state[0] >= 11 && this.state[1] >= 11)
    {
        return true;   
    }
    
    this.world1.objectHandler.player.canStomp = true;
    this.world2.objectHandler.player.canStomp = true;
    
    // Start with an object
    if(this.state[0] == 5)
    {
        this.world2.objectHandler.addObstacle(new BigObstacle());   
        this.state[0]++;
    }
    else
    // check the distance for first jump
    if(this.state[0] == 6)
    {
        var distance = this.world2.distanceToPlayer();
        if(distance > 0 && distance < 450)
        {
            this.world2.worldPaused = true;
            this.world1.worldPaused = true;
            this.state[0] = 7;
        }
        
    }
    else if(this.state[0] == 8)
    {
        var distance = this.world2.distanceToPlayer();
        if(distance > 0 && distance < 300)
        {
            this.world2.worldPaused = true;
            this.world1.worldPaused = true;
            this.state[0] = 9;
        }
    }
    else if(this.state[0] == 10)
    {
        var w2 = this.world2.playerPastObstacle();
        if(w2 == 1)
        {
            this.state[0] = 11;
            this.waitTimer = 50;
        }
        else if (w2 == 0)
        {
            this.state[0] = 5;   
        }
    }
    else if(this.state[0] == 11 && this.waitTimer <= 0)
    {
        if(this.state[1] == 5)
        {
            this.world1.objectHandler.addObstacle(new BigObstacle());   
            this.state[1]++;
        }
        else
        // check the distance for first jump
        if(this.state[1] == 6)
        {
            var distance = this.world1.distanceToPlayer();
            if(distance > 0 && distance < 450)
            {
                this.world2.worldPaused = true;
                this.world1.worldPaused = true;
                this.state[1] = 7;
            }

        }
        else if(this.state[1] == 8)
        {
            var distance = this.world1.distanceToPlayer();
            if(distance > 0 && distance < 300)
            {
                this.world2.worldPaused = true;
                this.world1.worldPaused = true;
                this.state[1] = 9;
            }
        }
        else if(this.state[1] == 10)
        {
            var w2 = this.world1.playerPastObstacle();
            if(w2 == 1)
            {
                this.state[0] = 12;
                this.state[1] = 12;
                this.waitTimer = 50;
            }
            else if (w2 == 0)
            {
                this.state[1] = 5;   
            }
        }
    }
    
    return false;  
};

TutorialHandler.prototype.check3BigObstacles = function()
{
    if(this.state[0] >= 15 && this.state[1] >= 15)
    {
        return true;   
    }
    
    if(this.stoneDone && this.waitTimer <= 0)
    {
        this.stoneDone = false;
        
        if(this.testW1 && this.state[0] < 15)
        {
            this.world2.objectHandler.addObstacle(new BigObstacle());   
        }
        else if(this.state[1] < 15)
        {
            this.world1.objectHandler.addObstacle(new BigObstacle());   
        }
    }
    
    if(this.testW1)
    {
        var w1 = this.world2.playerPastObstacle();
        if(w1 >= 0)
        {            
            if(w1 == 1)
            {
                this.state[0]++;
                this.world1.succes++;
                console.log(this.state[0]);
            }
            else
            {
                this.world2.objectHandler.player.isImmuneFor = 5;   
            }
            
            this.waitTimer = 30;
            this.stoneDone = true;
            
            // If the other one is less then 15 spawn a new one
            if(this.state[1] < 15){
                // spawn object in the other world
                this.testW1 = false;
            }
        }
    }
    else
    {
        var w2 = this.world1.playerPastObstacle();
        if(w2 >= 0)
        {            
            if(w2 == 1)
            {
                this.state[1]++;
                this.world2.succes++;
                console.log(this.state[1]);
            }
            else
            {
                this.world1.objectHandler.player.isImmuneFor = 5;   
            }
            

            this.waitTimer = 30;
            this.stoneDone = true;
            
            // If the other one is less then 15 spawn a new one
            if(this.state[0] < 15){
                // spawn object in the other world
                this.testW1 = true;
            }
        }   
    }
    
    return false;
};

TutorialHandler.prototype.tick = function()
{
    if(!this.popup.isPopupShowing())
    {
        this.world1.tick();
        this.world2.tick();  
        
        if(this.waitTimer > 0)
        {
            this.waitTimer--;   
        }
        
        if(this.checkFirstPart())
        {
            if(this.check3SmallObstacles())
            {
                if(!this.smallDone)
                {
                    this.smallDone = true; 
                    this.world1.succes = 0;
                    this.world2.succes = 0;
                }
                
                if(this.beginBigObstacles())
                {
                    if(this.check3BigObstacles())
                    {
                        this.item.itemHandler.switchItem(ItemGame);
                        this.item.itemHandler.gotoItem.gameHandler.startGameFromTutorial(this);
                    }
                }
            }
        }

    }
    else
    {
        this.popup.tick();
    }
};

TutorialHandler.prototype.draw = function(gfx)
{
    var textW1 = "";
    var textW2 = "";
    
    if(this.state[0] > 1 && this.state[1] > 1)
    {
        if(this.state[0] >= 5 && this.state[1] >= 5)
        {
            if(this.state[0] > 11 && this.state[1] >= 11)
            {
                if(this.state[0] >= 15 && this.state[1] >= 15)
                {
                    // Done
                }
                else
                {
                    textW1 = "Probeer het nu";
                    textW2 = "Probeer het nu";
                }
            }
            else
            {// Big stone tutorial
                if(this.state[0] < 11)
                {// world2 obstacle
                    if(this.state[0] == 5)
                    {
                        textW1 = "Je kan ook stompen om de andere te helpen";
                    }
                    else if(this.state[0] == 7)
                    {
                        textW1 = "Spring!";
                    }
                    else if(this.state[0] == 9)
                    {
                        textW1 = "Druk nog eens om te stompen";
                    }
                }
                else
                {// World1 obstacle
                    if(this.state[1] == 5)
                    {
                        textW2 = "Je kan ook stompen om de andere te helpen";
                    }
                    else if(this.state[1] == 7)
                    {
                        textW2 = "Spring!";
                    }
                    else if(this.state[1] == 9)
                    {
                        textW2 = "Druk nog eens om te stompen";
                    }
                }
            }
        }
        else
        { // 2e tutorial
            if(this.state[0] == 2)
            {
                textW1 = "Doe het nu zelf 3x";       
            }
            
            if(this.state[1] == 2)
            {
                textW1 = "Doe het nu zelf 3x";       
            }
        }
    }
    else
    { // Eerste tutorial
        if(this.state[0] == 1)
        {
            textW1 = "Druk op het zwarten gebied om te springen"; 
        }
        else if(this.state[0] > 1 && this.state[1] == 1)
        {
            textW2 = "Druk op het zwarten gebied om te springen"; 
        }
    }
    
    
    this.world1.draw(gfx, textW1);
    this.world2.draw(gfx, textW2);    
    
    this.popup.draw(gfx);
};
