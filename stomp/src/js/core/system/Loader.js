/**
 * Created by Jelle on 4/25/2014.
 */

Loader = function(fileComponents)
{
    this.completeEventHandler = new EventHandler(this, this.loadComplete);

    this.fileComponents = fileComponents;
    this.index = 0;
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
    return this.index < this.fileComponents.length;
};

Loader.prototype.loadImage = function(path)
{
    console.log("Image path: " + path);
    var obj = new Image();
    obj.onload = this.completeEventHandler;
    obj.onerror = this.completeEventHandler;
    obj.src = path;
    return obj;
};

Loader.prototype.loadNext = function()
{
    if(this.stringEndsWidth(this.fileComponents[this.index].path, ".jpg"))
    {
        this.fileComponents[this.index].obj = this.loadImage(this.fileComponents[this.index].path);
    }

    if(this.stringEndsWidth(this.fileComponents[this.index].path, ".png"))
    {
        this.fileComponents[this.index].obj = this.loadImage(this.fileComponents[this.index].path);
    }
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
