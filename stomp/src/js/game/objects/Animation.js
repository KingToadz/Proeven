
Animation = function(spritesheet, width, height, rows, cols, totalFrames)
{
    if(totalFrames == undefined)
    {
        totalFrames = rows * cols;
    }

    this.width = width;
    this.height = height;
    this.totalFrames = totalFrames - 1; // -1 because first frame will be 0
    this.rows = rows;
    this.cols = cols;
    this.currentRow = 0;
    this.currentCol = 0;
    this.sheet = spritesheet;
    this.currentFrame = 0;
    this.timePerFrame = 1000 / 5;
    this.startFrameTime = Date.now();
    this.paused = false;
    this.visible = true;
    this.visibleForOneLoop = false;
    this.stopAfterLastFrame = false;
    this.reverse = false;
};

Animation.prototype.setFPS = function(fps)
{
    this.timePerFrame = 1000 / fps;
};

Animation.prototype.reset = function()
{
    this.currentFrame = 0;
    this.startFrameTime = Date.now();
    this.visible = true;
    this.paused = false;
    
    if(this.rows > 1){
        this.currentRow = Math.floor(this.currentFrame / this.cols);
    }else{ this.currentRow = 0; }

    this.currentCol = this.currentFrame % this.cols;
};

Animation.prototype.pause = function()
{
    this.paused = true;
};

Animation.prototype.resume = function()
{
    this.paused = false;
};

Animation.prototype.tick = function()
{
    // check if it's time to go to next frame

    if(!this.paused)
    {
        var timeNow = Date.now();

        if(timeNow - this.startFrameTime > this.timePerFrame)
        {
            //console.log("Old Frame: " + this.currentFrame);
            this.startFrameTime = timeNow;

            if(this.reverse)
            {
                this.currentFrame--;
                if(this.currentFrame <= 0)
                {
                    if(this.stopAfterLastFrame)
                    {
                        this.paused = true;
                    }
                    else
                    {                  
                        this.currentFrame = this.totalFrames - 1;
                        if(this.visibleForOneLoop)
                        {
                            this.visible = false;
                            this.paused = true;
                        }   
                    }
                }
            }
            else
            {
                this.currentFrame++;
                if(this.currentFrame > this.totalFrames - 1)
                {
                    if(this.stopAfterLastFrame)
                    {
                        this.paused = true;
                    }
                    else
                    {                  
                        this.currentFrame = 0;

                        if(this.visibleForOneLoop)
                        {
                            this.visible = false;
                            this.paused = true;
                        }   
                    }
                }
            }

            if(this.rows > 1){
                this.currentRow = Math.floor(this.currentFrame / this.cols);
            }else{ this.currentRow = 0; }

            this.currentCol = this.currentFrame % this.cols;

            //console.log("CurrentRow: " + this.currentRow + " CurrentCol: " + this.currentCol);
        }
    }
};

Animation.prototype.draw = function(gfx, x, y)
{
    // draw animation frame
    if(this.visible){
        gfx.drawClippedTexture(this.sheet, x, y, this.width, this.height, this.currentCol * this.width, this.currentRow * this.height, this.width, this.height);
    }
};

Animation.prototype.drawTransparent = function(gfx, x, y, alpha)
{
    // draw animation frame
    if(this.visible){
        gfx.drawTransparentClippedTexture(this.sheet, x, y, this.width, this.height, this.currentCol * this.width, this.currentRow * this.height, this.width, this.height, alpha);
    }
};
