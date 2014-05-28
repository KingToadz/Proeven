/**
 * Created by Jelle on 4/25/2014.
 */

// sort 0 = pre-asset loader
// sort 1 = asset loader
Loader = function(sort)
{
    this.completeEventHandler = new EventHandler(this, this.loadComplete);

    this.fileComponents = [];

    var prefix = "";
    if(sort == 0)
    {
        prefix = "PRE";
    }

    var fields = Object.getOwnPropertyNames(Files);
    for(var i = 0; i < fields.length; i++)
    {
        var field = fields[i].toString();
        var value = Files[field];
        if (typeof value == "string" || value instanceof String)
        {
            if(prefix == "" || (Util.stringBeginsWith(field, prefix)))
            {
                var fileComponent = function(){};
                var preName = field.substr(0 + prefix.length, 3);

                fileComponent.loadFunc = undefined;

                if(Util.stringBeginsWith(preName, "PIC"))
                {
                    fileComponent.loadFunc = this.loadImage;
                }

                if(Util.stringBeginsWith(preName, "SND"))
                {
                    fileComponent.loadFunc = this.loadSound;
                }

                if(Util.stringBeginsWith(preName, "FNT"))
                {
                    fileComponent.loadFunc = this.loadFont;
                }

                if(fileComponent.loadFunc != undefined)
                {
                    fileComponent.field = field;
                    fileComponent.value = value;
                    fileComponent.completeEventHandler = this.completeEventHandler;

                    this.fileComponents.push(fileComponent);
                }
            }
        }
    }

    this.index = 0;
    this.length = this.fileComponents.length;
    this.done = false;
};

Loader.prototype.start = function()
{
    if(this.hasNext() == true)
    {
        this.loadNext();
    }
    else
    {
        this.done = true;
    }
};

Loader.prototype.stringEndsWidth = function(text, suffix)
{
    return text.indexOf(suffix, text.length - suffix.length) !== -1;
};

Loader.prototype.hasNext = function()
{
    return this.index < this.length;
};

Loader.prototype.loadNext = function()
{
    this.fileComponents[this.index].loadFunc();
};

Loader.prototype.loadComplete = function()
{
    this.index += 1;

    if(this.hasNext() == true)
    {
        this.loadNext();
    }
    else
    {
        this.done = true;
    }
};

// --- LOAD FUNCTIONS --- //
Loader.prototype.loadImage = function()
{
    var obj = new Image();

    // rewrite the value
    Files[this.field] = obj;

    obj.onload = this.completeEventHandler;
    obj.onerror = this.completeEventHandler;
    obj.src = this.value;
};

Loader.prototype.loadSound = function()
{
    setTimeout(this.completeEventHandler, 1);
};

Loader.prototype.loadFont = function()
{
    /*
    var split = this.value.split("/");
    var name = split[split.length - 1].substr(0, split[split.length - 1].indexOf("."));

    // force load
    Util.fakeCanvasGraphics.fillStyle = "#FFF";
    Util.fakeCanvasGraphics.font = "30pt " + name;
    Util.fakeCanvasGraphics.fillText("Load me", 0, 0);
*/
    setTimeout(this.completeEventHandler, 1);
};
