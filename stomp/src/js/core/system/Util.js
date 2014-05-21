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
