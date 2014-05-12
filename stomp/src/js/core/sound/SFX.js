/**
 * Created by Jelle on 4/25/2014.
 */

SFX = function(){};

SFX.volume = 1.0;

SFX.setVolume = function(volume)
{
    SFX.volume = volume;
    if(SFX.backgroundSound != undefined)
    {
        SFX.backgroundSound.volume = volume;
    }
};

SFX.backgroundSound = undefined;

SFX.setBackgroundSound = function(src)
{
    SFX.stopBackgroundSound();

    var audio = new Audio();

    audio.addEventListener("canplay", function()
    {
        audio.loop = true;

        console.log("Play BackgroundSound " + src + ".");

        audio.addEventListener("ended", function()
        {
            console.log("Ended BackgroundSound " + src + ".");
            audio.currentTime = 0;
            audio.play();
            audio.loop = true;
        }, false);

        audio.play();
        audio.loop = true;
    }, false);

    audio.src = src;
    audio.load();

    SFX.backgroundSound = audio;
};

SFX.stopBackgroundSound = function()
{
    if(SFX.backgroundSound != undefined)
    {
        SFX.backgroundSound.stop();
        SFX.backgroundSound.pause();
        SFX.backgroundSound.currentTime = 0;
        SFX.backgroundSound.src = "";

        SFX.backgroundSound = undefined;
    }
};

SFX.playSound = function(src)
{
    var audio = new Audio();

    audio.addEventListener("canplay", function()
    {
        audio.play();
    });

    audio.src = src;
    audio.load();
};
