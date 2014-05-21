/**
 * Created by Jelle on 4/25/2014.
 */

Loader = function(fileComponents)
{
    this.completeEventHandler = new EventHandler(this, this.loadComplete);

    this.fileComponents = fileComponents;
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

Loader.prototype.loadImage = function(component)
{
    console.log("Image path: " + component.path);
    var obj = new Image();
    obj.onload = this.completeEventHandler;
    obj.onerror = this.completeEventHandler;
    obj.src = component.path;
    return obj;
};

Loader.prototype.loadFont = function(component)
{
    var split = component.path.split("/");
    var name = split[split.length - 1].substr(0, split[split.length - 1].indexOf("."));

    console.log("Font path: " + component.path + "with the name: " + name);

    var fontFace = "@font-face { font-family: \"" + name + "\"; src: url(" + component.path + "); }";

    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = fontFace;

    document.head.appendChild(style);

    // force load
    Util.fakeCanvasGraphics.fillStyle = "#FFF";
    Util.fakeCanvasGraphics.font = "30pt " + name;
    Util.fakeCanvasGraphics.fillText("Load me", 0, 0);

    setTimeout(this.completeEventHandler, 1);

    return name;
};

Loader.prototype.loadNext = function()
{
    if(this.stringEndsWidth(this.fileComponents[this.index].path, ".jpg"))
    {
        this.fileComponents[this.index].obj = this.loadImage(this.fileComponents[this.index]);
    }

    if(this.stringEndsWidth(this.fileComponents[this.index].path, ".png"))
    {
        this.fileComponents[this.index].obj = this.loadImage(this.fileComponents[this.index]);
    }

    if(this.stringEndsWidth(this.fileComponents[this.index].path, ".ttf"))
    {
        this.fileComponents[this.index].obj = this.loadFont(this.fileComponents[this.index]);
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
