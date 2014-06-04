TransformObstacle = function(x)
{
    this.remove = false;
    
    this.texture = "";

    this.transformAnimation = new Animation(Files.PIC_GAME_OBSTACLE_TRANSFORM, 196, 320, 4, 6, 21);
    this.transformAnimation.stopAfterLastFrame = true;
    this.transformAnimation.setFPS(30);
    
    this.width = Files.PIC_GAME_OBJECT_OBSTACLESMALL.width;
    this.height = Files.PIC_GAME_OBJECT_OBSTACLESMALL.height;
    
    var difHeight = this.transformAnimation.height - Files.PIC_GAME_OBJECT_OBSTACLESMALL.height;

    this.collisionContainer = new CollisionContainer();
    
    this.collisionContainer.addBox(45, difHeight + this.height / 2, 85, this.height / 2); // medium left
    this.collisionContainer.addBox(this.width - 50, difHeight + this.height / 2, 85, this.height / 2); // medium right
    this.collisionContainer.addBox(60, difHeight + (this.height / 2) - 20, 50, 20); // small center left
    this.collisionContainer.addBox(this.width - 50, difHeight + (this.height / 2) - 20, 50, 20); // small center right
    this.collisionContainer.addBox(90, difHeight + 0, this.width - 100, this.height); // long middle
    //this.collisionContainer.addBox(0, 0, this.width, this.height);

    
    this.passedPlayer = false;

    this.collisionContainer.owner = this;
    this.collisionContainer.initialize();
    
    this.width = this.transformAnimation.width;
    this.height = this.transformAnimation.height;
    
    this.x = x;
    this.y = (Align.height / 2) - (this.height + 20);
    
    this.bigObstacle = false;
};

TransformObstacle.prototype.onPlayerCollision = function(player)
{
    this.collisionContainer.isColliding = true;
    player.onCollision();
};

TransformObstacle.prototype.tick = function()
{
    this.transformAnimation.tick();
    
    this.x -= this.objectHandler.moveSpeed;
    if(this.x < 0 - this.width)
    {
        this.remove = true;
    }
};

TransformObstacle.prototype.draw = function(gfx)
{
    this.transformAnimation.draw(gfx, this.x, this.y);

    this.collisionContainer.draw(gfx, this.x, this.y);
};
