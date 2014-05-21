/**
 * Created by Jelle on 5/6/2014.
 */

Player = function()
{
    this.texture = Files.PIC_GAME_OBJECT_PLAYER.obj;

    this.runAnimation = new Animation(this.texture, 97, 91, 1, 5, 5);
    this.runAnimation.setFPS(15);

    this.runAnimationDust = new Animation(Files.PIC_GAME_OBJECT_PLAYER_RUN_DUST.obj, 94, 75, 1, 5, 5);
    this.runAnimationDust.setFPS(15);

    this.jumpAnimation = new Animation(Files.PIC_GAME_OBJECT_PLAYER_JUMP.obj, 107, 101, 2, 5, 5);
    this.jumpAnimation.setFPS(15);

    this.stompAnimation = new Animation(Files.PIC_GAME_OBJECT_PLAYER_STOMP.obj, 158, 300, 3, 4, 11);
    this.stompAnimation.setFPS(15);
    this.stompAnimation.visibleForOneLoop = true;

    this.jumpAnimationDust = new Animation(Files.PIC_GAME_OBJECT_PLAYER_JUMP_DUST.obj, 112, 92, 2, 5, 10);
    this.jumpAnimationDust.setFPS(30);
    this.jumpAnimationDust.visibleForOneLoop = true;
    
    this.animationHandler = new AnimationHandler();

    this.showJumpAnimation = false;

    this.width = this.runAnimation.width;
    this.height = this.runAnimation.height;

    this.collisionContainer = new CollisionContainer();
    this.collisionContainer.addBox(0, 0, this.width, this.height);


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
};

Player.prototype.tryJump = function()
{
    if(this.hasCollided == false)
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
        else
        {
            this.speedy = 50;
            this.shouldStomp = true;
            this.isStomping = true;
            this.stompAnimation.reset();
            this.animationHandler.addStompSmoke(this.x - 50, this.groundy);
        }
    }
};

Player.prototype.tryStomp = function()
{
    if(this.hasCollided == false && this.y == this.groundy)
    {
        this.speedy = -25;
        this.showJumpAnimation = true;
        this.jumpAnimation.reset();
        //this.stompGroundAnimation.reset();
        this.animationHandler.addGroundStomp(this.x - this.width / 2, this.groundy + 65);
    }
};

Player.prototype.onCollision = function()
{
    if(this.hasCollided == false)
    {
        this.collisionContainer.isColliding = true;
        this.hasCollided = true;
        this.shouldStomp = false;
        this.objectHandler.world.backgroundHandler.onPlayerDead();

        this.isImmuneFor = 180;
        this.objectHandler.canSpawnItems = false;
        //this.objectHandler.obstacleSpawner.nextSpawn = ((Align.width / 2) / 10) + 100;
        SFX.playSound(Files.SND_GAME_PLAYER_DEATH);
    }
};

Player.prototype.tick = function()
{
    this.runAnimation.tick();
    this.runAnimationDust.tick();
    
    this.animationHandler.tick();

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
            this.collisionContainer.tick(this.objectHandler.obstacles);
        }
    }
};

Player.prototype.draw = function(gfx)
{
    if(this.isImmuneFor > 0)
    {
        if(this.showJumpAnimation)
        {
            this.jumpAnimation.drawTransparent(gfx, this.x, this.y, 0.3);
        }
        else
        {
            this.runAnimation.drawTransparent(gfx, this.x, this.y, 0.3);
            this.runAnimationDust.drawTransparent(gfx, this.x - this.width + 10, this.y + 20, 0.3);
        }
    }
    else
    {
        /*if(this.isStomping)
        {
            this.stompAnimation.draw(gfx, this.x, this.y);
        }
        else */if(this.showJumpAnimation)
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

    this.collisionContainer.draw(gfx);
};
