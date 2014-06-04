
Animation = function(spritesheet, width, height, rows, cols, totalFrames)
{
    if(totalFrames == undefined)
    {
        totalFrames = rows * cols;
    }

    this.width = width; // Width per frame
    this.height = height; // Height per frame
    this.totalFrames = totalFrames - 1; // -1 because first frame will be 0
    this.rows = rows; // Amount of rows
    this.cols = cols; // Amount of cols
    this.currentRow = 0; // The current row 
    this.currentCol = 0; // The current Col
    this.sheet = spritesheet; // The spritesheet with the animation
    this.currentFrame = 0; // The current frame
    this.timePerFrame = 1000 / 5; // The time in ms that the frame needs to be shown
    this.startFrameTime = Date.now(); // the time when this frame became visible
    this.paused = false; // is the animation paused
    this.visible = true; // is the animatuion visible
    this.visibleForOneLoop = false; // should the animation hide after one loop
    this.stopAfterLastFrame = false; // should the animation be stopped after the last frame
    this.reverse = false; // is the animation played in reverse
};

Animation.prototype.setFPS = function(fps)
{
    // The time is messured in MS. 1000ms = 1s
    this.timePerFrame = 1000 / fps;
};

// Reset the animation and play it 
Animation.prototype.reset = function()
{
    this.currentFrame = 0;
    this.startFrameTime = Date.now();
    this.visible = true;
    this.paused = false;
    this.currentCol = 0;
    this.currentRow = 0;
};

// Pause the animation
Animation.prototype.pause = function()
{
    this.paused = true;
};

// Resume the animation
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
        // Check if the time between bow and last frame update is bigger then the time per frame
        if(timeNow - this.startFrameTime > this.timePerFrame)
        {
            this.startFrameTime = timeNow;
            
            // Check if the animation should be played in reverse
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
                            // Hide the animation and pause it 
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

            // Get the current row from the current frame. the Math.floor(this.currentFrame / this.cols); doesn't work if there is only one row
            if(this.rows > 1){
                this.currentRow = Math.floor(this.currentFrame / this.cols);
            }else{ 
                this.currentRow = 0; 
            }

            // Get the right col from the current frame
            this.currentCol = this.currentFrame % this.cols;
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
    // draw animation frame with an lesser alpha
    if(this.visible){
        gfx.drawTransparentClippedTexture(this.sheet, x, y, this.width, this.height, this.currentCol * this.width, this.currentRow * this.height, this.width, this.height, alpha);
    }
};
