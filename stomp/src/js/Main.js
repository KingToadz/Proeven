/**
 * Created by Jelle on 4/25/2014.
 */

// run main when the document is ready
window.onload = function(){new Main();};

Main = function()
{
    Util.initialize();
    Arguments.initialize();
    SFX.initialize();

    var mywindow = new WindowHandler();
};
