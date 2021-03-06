AnimationHandler = function()
{
    this.animations = [];
    this.yPositions = [];
    this.xPositions = [];
};

AnimationHandler.prototype.addAnimation = function(anim, x, y)
{
    this.animations.push(anim);
    this.xPositions.push(x);
    this.yPositions.push(y);
};

AnimationHandler.prototype.addGroundStomp = function(x, y)
{
    var stompGroundAnimation = new Animation(Files.PIC_GAME_OBJECT_GROUND_STOMP, 837, 86, 21, 1, 21);

    stompGroundAnimation.stopAfterLastFrame = true;
    stompGroundAnimation.setFPS(30);
    this.addAnimation(stompGroundAnimation, x - stompGroundAnimation.width / 3, y - stompGroundAnimation.height / 2);
};

AnimationHandler.prototype.addStompSmoke = function(x, y)
{
    var stompAnimationDust = new Animation(Files.PIC_GAME_OBJECT_PLAYER_STOMP_DUST, 251, 192, 2, 4, 8);
    stompAnimationDust.visible = true;
    stompAnimationDust.setFPS(17);
    stompAnimationDust.visibleForOneLoop = true;
    
    this.addAnimation(stompAnimationDust, x, y - stompAnimationDust.height / 2);
};

AnimationHandler.prototype.addJumpSmoke = function(x, y)
{
    var jumpAnimationDust = new Animation(Files.PIC_GAME_OBJECT_PLAYER_JUMP_DUST, 112, 92, 2, 5, 10);
    jumpAnimationDust.setFPS(30);
    jumpAnimationDust.visibleForOneLoop = true;
    
    this.addAnimation(jumpAnimationDust, x - 50, y);
};

AnimationHandler.prototype.tick = function()
{
    for(var i = 0; i < this.animations.length; i++)
    {
        this.animations[i].tick();
        this.xPositions[i] -= this.player.objectHandler.moveSpeed;
        
        if(this.xPositions[i] + this.animations[i].width < 0)
        {
            this.animations.splice(i, 1);
            this.xPositions.splice(i, 1);
            this.yPositions.splice(i, 1);
        }
    }
};

AnimationHandler.prototype.draw = function(gfx)
{
    for(var i = 0; i < this.animations.length; i++)
    {
        this.animations[i].draw(gfx, this.xPositions[i], this.yPositions[i]);
    }
};

