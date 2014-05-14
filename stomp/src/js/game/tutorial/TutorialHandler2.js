/**
 * Created by Yorick on 5/9/2014.
 */

TutorialHandler = function(item)
{
    this.item = item;

    this.world1 = new TutorialWorld(1, this);
    this.world2 = new TutorialWorld(-1, this);

    this.world1.gameHandler = this;
    this.world2.gameHandler = this;

    this.world1.otherWorld = this.world2;
    this.world2.otherWorld = this.world1;

    this.world1.initialize();
    this.world2.initialize();

    // For the stomp jump
    this.world1Learning = true;
    this.world1Step = 0;
    this.world2Step = 0;

    this.tutorialDone = false;
    this.doneCounter = 0;
};

TutorialHandler.prototype.pauseWorld = function()
{

};

TutorialHandler.prototype.tryNextState = function()
{
    // 1.) Spawn small block
    // 2.) Spawn big block
    // 3.) Start a game

    if(this.world1.jumpDoing == true && this.world2.jumpDoing == true && this.world1.jumpDone == true && this.world2.jumpDone == true)
    {
        // state++
        this.world1.jumpDoing = false;
        this.world2.jumpDoing = false;
    }
};

TutorialHandler.prototype.handleJump = function(worldDir)
{
    if(this.world1Learning)
    {
        if(worldDir == 1)
        {
            if(this.world1Step == 4 && this.world2Step == 3)
            {
                this.world2.worldPaused = false;
                this.world1.worldPaused = false;
                return true;
            }

            return false;
        }
        else if(worldDir == -1)
        {
            if(this.world2Step == 1)
            {
                this.world1.worldPaused = false;
                return true;
            }
            else if(this.world2Step == 2)
            {
                this.world2.worldPaused = false;
                this.world1.worldPaused = false;
                this.world1Step++;
                return true;
            }
            return false;
        }
    }
    else
    {
        if(worldDir == -1)
        {
            if(this.world2Step == 4 && this.world1Step == 3)
            {
                this.world2.worldPaused = false;
                this.world1.worldPaused = false;
                return true;
            }

            return false;
        }
        else if(worldDir == 1)
        {
            if(this.world1Step == 1)
            {
                this.world2.worldPaused = false;
                return true;
            }
            else if(this.world1Step == 2)
            {
                this.world2.worldPaused = false;
                this.world1.worldPaused = false;
                return true;
            }
            return false;
        }
    }
};

TutorialHandler.prototype.tick = function()
{
    this.world1.tick();
    this.world2.tick();

    if(this.tutorialDone)
    {
        this.doneCounter++;

        if(this.doneCounter > 50)
        {
            this.item.itemHandler.setGotoItem(ItemGame);
        }
    }
    else
    {
        if(this.world1.jumpDone && this.world2.jumpDone)
        {
            if(this.world1.jumpDoing || this.world2.jumpDoing)
            {
                this.world1.jumpDoing = false;
                this.world2.jumpDoing = false;
            }

            // Stomp tutorial hier
            if(this.world1Learning)
            {
                if(this.world1Step == 0)
                {
                    this.world1.objectHandler.addObstacle(new Obstacle(this.world1.dir));
                    this.world1Step = 3;
                }


                if(this.world2Step == 0)
                {
                    if(this.world1.objectHandler.obstacles[0] != undefined)
                    {
                        var distance = this.world1.currentObstacleFromPlayer();
                        if(distance > 0 && distance < 350)
                        {
                            this.world1.worldPaused = true;
                            //this.world2.worldPaused = false;
                            this.world2.canPlayerJump = true;
                            this.world2Step++;
                        }
                    }
                }
                else if(this.world2Step == 1)
                {
                    var distance = this.world1.currentObstacleFromPlayer();
                    if(distance > 0 && distance < 250)
                    {
                        this.world2.worldPaused = true;
                        this.world1.worldPaused = true;
                        this.world2Step++;
                    }
                }
                else if(this.world2Step == 2)
                {
                    var distance = this.world1.currentObstacleFromPlayer();
                    if(distance > 0 && distance < 150)
                    {
                        this.world2.worldPaused = true;
                        this.world1.worldPaused = true;
                        this.world2Step++;
                    }
                }

                if(this.world1Step == 4 && this.world2Step == 3)
                {
                    var distance = this.world1.currentObstacleFromPlayer();
                    if(distance < -100)
                    {
                        this.world1Learning = false;
                        this.world1Step = 0;
                        this.world2Step = 0;
                    }
                }
            }
            else // Switch world1 with world2
            {
                if(this.world2Step == 0)
                {
                    this.world2.objectHandler.addObstacle(new Obstacle(this.world2.dir));
                    this.world2Step = 4;
                }


                if(this.world1Step == 0)
                {
                    if(this.world2.objectHandler.obstacles[0] != undefined)
                    {
                        var distance = this.world2.currentObstacleFromPlayer();
                        if(distance > 0 && distance < 350)
                        {
                            this.world2.worldPaused = true;
                            //this.world2.worldPaused = false;
                            this.world1.canPlayerJump = true;
                            this.world1Step++;
                        }
                    }
                }
                else if(this.world1Step == 1)
                {
                    var distance = this.world2.currentObstacleFromPlayer();
                    if(distance > 0 && distance < 250)
                    {
                        this.world2.worldPaused = true;
                        this.world1.worldPaused = true;
                        this.world1Step++;
                    }
                }
                else if(this.world1Step == 2)
                {
                    var distance = this.world2.currentObstacleFromPlayer();
                    if(distance > 0 && distance < 150)
                    {
                        this.world2.worldPaused = true;
                        this.world1.worldPaused = true;
                        this.world1Step++;
                    }
                }

                if(this.world1Step == 3 && this.world2Step == 4)
                {
                    var distance = this.world2.currentObstacleFromPlayer();
                    console.log(distance);
                    if(distance < -100)
                    {
                        this.tutorialDone = true;
                    }
                }
            }
        }
    }

    this.tryNextState();
};

TutorialHandler.prototype.draw = function(gfx)
{
    gfx.clear("#000");

    this.world1.draw(gfx);
    this.world2.draw(gfx);

    if(this.tutorialDone)
    {
        this.world1.drawString(gfx, "Goed gedaan je bent klaar voor het echte werk!");
        this.world2.drawString(gfx, "Goed gedaan je bent klaar voor het echte werk!");
    }
    else if(this.world1Learning)
    {
        switch(this.world1Step)
        {
            case 1:
                this.world1.drawString(gfx, "Sommige obstakels zijn te groot om alleen over heen te komen");
            break;
            case 4:
                this.world1.drawString(gfx, "Spring nu om extra hoog te komen");
            break;
            default:
                this.world1.drawString(gfx, "De andere speler is bezig met zijn deel");
                break;
        }

        switch(this.world2Step)
        {
            case 0:
                this.world2.drawString(gfx, "Sommige obstakels zijn te groot om alleen over heen te komen");
            break;
            case 1:
                this.world2.drawString(gfx, "Spring");
            break;
            case 2:
                this.world2.drawString(gfx, "Als je nu nog eens op spring drukt stomp je de andere omhoog");
            break;
            case 3:
                this.world2.drawString(gfx, "De andere speler is bezig met zijn deel");
            break;
            default:
                this.world2.drawString(gfx, "De andere speler is bezig met zijn deel");
                break;
        }
    }
    else
    {
        switch(this.world2Step)
        {
            case 1:
                this.world2.drawString(gfx, "Sommige obstakels zijn te groot om alleen over heen te komen");
            break;
            case 4:
                this.world2.drawString(gfx, "Spring nu om extra hoog te komen");
            break;
            default:
                this.world2.drawString(gfx, "Wacht op andere speler");
                break;
        }

        switch(this.world1Step)
        {
            case 0:
                this.world1.drawString(gfx, "Sommige obstakels zijn te groot om alleen over heen te komen");
            break;
            case 1:
                this.world1.drawString(gfx, "Spring");
            break;
            case 2:
                this.world1.drawString(gfx, "Als je nu nog eens op spring drukt stomp je de andere omhoog");
            break;
            case 3:
                this.world1.drawString(gfx, "Wacht op de andere speler");
            break;
            default:
                this.world1.drawString(gfx, "Wacht op andere speler");
                break;
        }
    }
};