/**
 * Created by Jelle on 5/6/2014.
 */

Player = function()
{
    this.texture = Files.PIC_GAME_OBJECT_PLAYER;

    this.runAnimation = new Animation(this.texture, 97, 91, 1, 5, 5);
    //this.runAnimation = new Animation(Files.PIC_CHARACTER_RUN, 900, 600, 1, 16, 16);
    this.runAnimation.setFPS(15); // 24

    this.runAnimationDust = new Animation(Files.PIC_GAME_OBJECT_PLAYER_RUN_DUST, 94, 75, 1, 5, 5);
    this.runAnimationDust.setFPS(15);

    this.jumpAnimation = new Animation(Files.PIC_GAME_OBJECT_PLAYER_JUMP, 107, 101, 2, 5, 5);
    //this.jumpAnimation = new Animation(Files.PIC_CHARACTER_JUMP, 900, 650, 1, 21, 21);
    this.jumpAnimation.setFPS(15); // 24
    this.stompAnimation = new Animation(Files.PIC_GAME_OBJECT_PLAYER_STOMP, 158, 300, 3, 4, 11);
    //this.stompAnimation = new Animation(Files.PIC_CHARACTER_STOMP, 900, 650, 1, 21, 21);
    this.stompAnimation.setFPS(15); //24
    this.stompAnimation.visibleForOneLoop = true;

    this.jumpAnimationDust = new Animation(Files.PIC_GAME_OBJECT_PLAYER_JUMP_DUST, 112, 92, 2, 5, 10);
    this.jumpAnimationDust.setFPS(20);
    this.jumpAnimationDust.visibleForOneLoop = true;
    
    this.deadAnimation = new Animation(Files.PIC_GAME_OBJECT_PLAYER_DEATH, 158,130, 3, 6, 16);
    this.deadAnimation.setFPS(15);
    this.deadAnimation.pause();
    this.deadAnimation.visible = false;
    this.deadAnimation.visibleForOneLoop = false;
    
    this.animationHandler = new AnimationHandler();
    this.animationHandler.player = this;

    this.showJumpAnimation = false;

    this.width = this.runAnimation.width;
    this.height = this.runAnimation.height;

    this.collisionContainer = new CollisionContainer();
    this.collisionContainer.addBox(10, 10, this.width - 20, this.height - 10);

    this.collisionContainer.owner = this;
    this.collisionContainer.initialize();

    this.hasCollided = false;
    this.isImmuneFor = 0;

    this.x = (Align.width / 2) - (this.width / 2);
    this.y = (Align.height / 2) - ((this.collisionContainer.height + 20) + this.collisionContainer.y);
    this.groundy = this.y;

    this.gravity = 0.9;
    this.speedy = 0;
    this.shouldStomp = false;
    this.hasJumped = false;
    this.isStomping = false;
    
    this.canStomp = true;
};

Player.prototype.tryJump = function()
{
    //if(this.hasCollided == false)
    {
        if(this.y == this.groundy)
        {
            if(this.hasJumped == false)
            {
                this.showJumpAnimation = true;
                this.jumpAnimation.reset();
                this.animationHandler.addJumpSmoke(this.x, this.y);

                this.speedy = -20;
                this.hasJumped = true;
                SFX.playSound(Files.SND_GAME_PLAYER_JUMP);
            }
        }
        else
        {
            if(this.canStomp)
            {
                this.speedy = 50;
                this.shouldStomp = true;
                this.isStomping = true;
                this.stompAnimation.reset();
                this.stompAnimation.currentFrame = 9;
                this.animationHandler.addStompSmoke(this.x - 50, this.groundy);
            }
        }
    }
};

Player.prototype.tryStomp = function()
{
    if(this.y == this.groundy)
    {
        this.speedy = -25;
        this.showJumpAnimation = true;
        this.jumpAnimation.reset();
        this.animationHandler.addGroundStomp(this.x - this.width / 2, this.groundy + 65);
    }
};

Player.prototype.removeBigObstacles = function()
{
    this.otherPlayer.objectHandler.world.objectHandler.removeBigObstacles();
    this.objectHandler.world.objectHandler.removeBigObstacles();
};

Player.prototype.onCollision = function()
{
    if(this.hasCollided == false)
    {
        this.hasCollided = true;
        this.objectHandler.world.backgroundHandler.onPlayerDead();
        
        // Dead animation
        this.deadAnimation.reset();
        this.deadAnimation.currentFrame = 0;
        
        this.removeBigObstacles();

        this.isImmuneFor = 180;
        this.objectHandler.canSpawnItems = false;
        SFX.playSound(Files.SND_GAME_PLAYER_DEATH);
    }
};

Player.prototype.tick = function()
{
    this.runAnimation.tick();
    this.runAnimationDust.tick();
    
    this.animationHandler.tick();
    
    this.deadAnimation.tick();
    
    // This will only be 0 if it played the animation forwards and backwards
    // The frame starts at 1 and ends with 0
    if(this.isImmuneFor > 0)
    {
        if(this.deadAnimation.currentFrame == this.deadAnimation.totalFrames - 1 && !this.deadAnimation.reverse)
        {
            this.deadAnimation.reverse = true;
        }
        else if(this.deadAnimation.currentFrame == 1 && this.deadAnimation.reverse)
        {
            this.deadAnimation.reverse = false;
            this.isImmuneFor = 1;
        }
    }

    this.speedy += this.gravity;
    this.y += this.speedy;

    if(this.y >= this.groundy)
    {
        this.y = this.groundy;
        this.hasJumped = false;
        this.showJumpAnimation = false;
        if(this.shouldStomp)
        {
            this.shouldStomp = false;
            this.isStomping = false;
            this.otherPlayer.tryStomp();
            SFX.playSound(Files.SND_GAME_PLAYER_STOMP);
        }
    }

    if(this.showJumpAnimation)
    {
        this.jumpAnimationDust.tick();
    }

    if(this.isStomping)
    {
        this.stompAnimation.tick();
    }

    if(this.isImmuneFor > 0)
    {
        if(this.isImmuneFor == 1)
        {
            
            if(this.distanceToClosest() < 80)
            {
                this.isImmuneFor++;   
            }
        }
        this.isImmuneFor--;
        if(this.isImmuneFor == 0)
        {
            this.hasCollided = false;
            this.objectHandler.canSpawnItems = true;
        }
    }
    else
    {
        if(this.hasCollided == false)
        {
            this.collisionContainer.collisionCheck(this.objectHandler.obstacles);
        }
    }
};

Player.prototype.distanceToClosest =function()
{
    var distance = 1000000;
    
    for(var i = 0; i < this.objectHandler.obstacles.length; i++)
    {
        if(this.x - this.objectHandler.obstacles[i] < distance && this.x - this.objectHandler.obstacles[i] > -this.objectHandler.obstacles[i].width)
        {
            distance = this.x - this.objectHandler.obstacles[i];
        }
    }
    
    return distance;
};

Player.prototype.draw = function(gfx)
{
    if(this.isImmuneFor > 0)
    {
        this.deadAnimation.draw(gfx, this.x - this.width / 2 - this.width / 4, this.y - this.height / 2);
        /*
        if(this.showJumpAnimation)
        {
            this.jumpAnimation.drawTransparent(gfx, this.x, this.y, 0.3);
        }
        else
        {
            this.runAnimation.drawTransparent(gfx, this.x, this.y, 0.3);
            this.runAnimationDust.drawTransparent(gfx, this.x - this.width + 10, this.y + 20, 0.3);
        }
        */
    }
    else
    {
        /* 
        if(this.isStomping)
        {
            this.stompAnimation.draw(gfx, this.x, this.y);
        }
        else */
        if(this.showJumpAnimation)
        {
            this.jumpAnimation.draw(gfx, this.x, this.y);
        }
        else
        {
            this.runAnimation.draw(gfx, this.x, this.y);
            this.runAnimationDust.draw(gfx, this.x - this.width + 10, this.y + 20);
        }
    }
    this.animationHandler.draw(gfx);
};
