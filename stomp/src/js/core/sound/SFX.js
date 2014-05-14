/**
 * Created by Jelle on 4/25/2014.
 */

SFX = function(){};

SFX.volume = 0.0;

SFX.setVolume = function(volume)
{
    SFX.volume = volume;
    if(SFX.backgroundSound != undefined)
    {
        SFX.backgroundSound.volume = volume;
    }
};

SFX.backgroundSound = undefined;
SFX.backgroundSoundSrc = undefined;

SFX.setBackgroundSound = function(src)
{
    SFX.stopBackgroundSound();

    SFX.backgroundSound = new Audio();
    SFX.backgroundSound.volume = SFX.volume;

    SFX.backgroundSound.addEventListener("canplay", function()
    {
        console.log("Play BackgroundSound " + src + ".");

        SFX.backgroundSound.play();

        SFX.backgroundSound.addEventListener("ended", function()
        {
            console.log("Ended BackgroundSound " + src + ".");

            SFX.setBackgroundSound(SFX.backgroundSoundSrc);
        }, false);
    }, false);

    SFX.backgroundSoundSrc = src;
    SFX.backgroundSound.src = src;
    SFX.backgroundSound.load();
};

SFX.stopBackgroundSound = function()
{
    if(SFX.backgroundSound != undefined)
    {
        SFX.backgroundSound.pause();
        SFX.backgroundSound.currentTime = 0;
        SFX.backgroundSound.src = "";

        SFX.backgroundSound = undefined;
    }
};

SFX.playSound = function(src)
{
    var audio = new Audio();
    audio.volume = SFX.volume / 4;

    audio.addEventListener("canplay", function()
    {
        audio.play();
    });

    audio.src = src;
    audio.load();
};
