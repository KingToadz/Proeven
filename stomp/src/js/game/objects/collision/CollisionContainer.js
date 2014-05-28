/**
 * Created by Jelle on 5/7/2014.
 */

CollisionContainer = function()
{
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.boxes = [];

    this.isColliding = false;

    this.collidingWith = [];
};

CollisionContainer.prototype.addBox = function(x, y, width, height)
{
    var box = new CollisionBox(x, y, width, height);
    box.container = this;
    this.boxes.push(box);
};

CollisionContainer.prototype.initialize = function()
{
    var px1 = undefined;
    var py1 = undefined;
    var px2 = undefined;
    var py2 = undefined;

    for(var i = 0; i < this.boxes.length; i++)
    {
        var box = this.boxes[i];

        var cx1 = box.x;
        var cy1 = box.y;
        var cx2 = box.x + box.width;
        var cy2 = box.y + box.height;

        if(cx1 < px1 || px1 == undefined)
            px1 = cx1;
        if(cy1 < py1 || py1 == undefined)
            py1 = cy1;
        if(cx2 > px2 || px2 == undefined)
            px2 = cx2;
        if(cy2 > py2 || py2 == undefined)
            py2 = cy2;
    }

    if(px1 != undefined){this.x = px1;}else{this.x = 0;}
    if(py1 != undefined){this.y = py1;}else{this.y = 0;}
    if(px2 != undefined){this.width = px2 - px1;}else{this.width = 0;}
    if(py2 != undefined){this.height = py2 - py1;}else{this.height = 0;}
};

CollisionContainer.prototype.isCollidingWith = function(checkContainer)
{
    var tx1 = this.owner.x + this.x;
    var ty1 = this.owner.y + this.y;
    var tx2 = tx1 + this.width;
    var ty2 = ty1 + this.height;

    var cx1 = checkContainer.owner.x + checkContainer.x;
    var cy1 = checkContainer.owner.y + checkContainer.y;
    var cx2 = cx1 + checkContainer.width;
    var cy2 = cy1 + checkContainer.height;

    return CollisionUtil.checkCollision(tx1, ty1, tx2, ty2, cx1, cy1, cx2, cy2);
};

CollisionContainer.prototype.collisionCheck = function(obstacles)
{
    for(var i = 0; i < obstacles.length; i++)
    {
        if(obstacles[i].collisionContainer.isCollidingWith(this))
        {
            if(obstacles[i].collisionContainer.boxes.length == 1 && this.boxes.length == 1)
            {
                obstacles[i].onPlayerCollision(this.owner);
            }
            else
            {
                var checkBoxes = obstacles[i].collisionContainer.boxes;
                for(var j = 0; j < this.boxes.length; j++)
                {
                    for (var k = 0; k < checkBoxes.length; k++)
                    {
                        if (checkBoxes[k].isCollidingWith(this.boxes[j]))
                        {
                            obstacles[i].onPlayerCollision(this.owner);
                            break;
                        }
                    }
                }
            }
        }
    }
};

CollisionContainer.prototype.draw = function(gfx)
{
    //gfx.drawRect(this.owner.x + this.x, this.owner.y + this.y, this.width, this.height, "#F00", 2);

    for(var i = 0; i < this.boxes.length; i++)
    {
        this.boxes[i].draw(gfx);
    }
};
