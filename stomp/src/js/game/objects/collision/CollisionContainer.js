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
};

CollisionContainer.prototype.addBox = function(x, y, width, height)
{
    var box = new CollisionBox(x, y, width, height);
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

CollisionContainer.prototype.draw = function(gfx, x, y)
{
    if(this.boxes.length > 0)
    {
        for(var i = 0; i < this.boxes.length; i++)
        {
            this.boxes[i].draw(gfx, x, y);
        }
    }

    //gfx.drawRect(x + this.x, y + this.y, this.width, this.height, "#FF0", 2);
};
