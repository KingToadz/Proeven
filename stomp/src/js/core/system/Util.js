/**
 * Created by Jelle on 4/25/2014.
 */

Util = function(){};

Util.isCocoonJS = false;

Util.fakeCanvas = undefined;
Util.fakeCanvasGraphics = undefined;

Util.initialize = function()
{
    Util.fakeCanvas = document.createElement("canvas");
    Util.fakeCanvas.width = 100;
    Util.fakeCanvas.height = 100;
    Util.fakeCanvasGraphics = Util.fakeCanvas.getContext("2d");

    if(navigator)
    {
        if(navigator.isCocoonJS != undefined)
        {
            Util.isCocoonJS = navigator.isCocoonJS == true;
        }
    }
};

Util.stringBeginsWith = function(haystack, needle)
{
    return (haystack.substr(0, needle.length) == needle);
};

Util.imageChangeNonTransparencyToColor = function(image, rgb)
{
    var w = image.width;
    var h = image.height;
    var length = w * h * 4;

    Util.fakeCanvas.width = w;
    Util.fakeCanvas.height = h;

    Util.fakeCanvasGraphics.drawImage(image, 0, 0, w, h);

    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];

    var imgData = Util.fakeCanvasGraphics.getImageData(0, 0, w, h);
    for (var i=0; i < length; i+=4)
    {
        if(imgData.data[i + 4] > 0)
        {
            imgData.data[i + 0] = (imgData.data[i + 0] / 255.0) * r;
            imgData.data[i + 1] = (imgData.data[i + 1] / 255.0) * g;
            imgData.data[i + 2] = (imgData.data[i + 2] / 255.0) * b;
        }
    }

    Util.fakeCanvasGraphics.putImageData(imgData, 0, 0);
    image.src = Util.fakeCanvas.toDataURL("image/png");
};
