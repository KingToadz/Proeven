/**
 * Created by Jelle on 4/25/2014.
 */

SFX = function(){};

SFX.initialize = function()
{
    SFX.masterVolume = 1.0;
    SFX.backgroundVolume = 0.75;
    SFX.effectsVolume = 0.5;

    SFX.backgroundSound = undefined;
    SFX.backgroundSoundSrc = undefined;

    var data = undefined;

    data = Database.getItem("Stomp_MasterVolume");
    if(data != undefined) SFX.masterVolume = Number(data);

    data = Database.getItem("Stomp_BackgroundVolume");
    if(data != undefined) SFX.backgroundVolume = Number(data);

    data = Database.getItem("Stomp_EffectsVolume");
    if(data != undefined) SFX.effectsVolume = Number(data);
};

SFX.onChangeVolume = function()
{
    var v = (SFX.masterVolume * SFX.backgroundVolume);
    if(v == 0.0)
    {
        SFX.stopBackgroundSound();
    }
    else
    {
        if(SFX.backgroundSound != undefined)
        {
            SFX.backgroundSound.volume = v;
        }
        else
        {
            if(SFX.backgroundSoundSrc != undefined)
            {
                SFX.setBackgroundSound(SFX.backgroundSoundSrc, true);
            }
        }
    }

    Database.setItem("Stomp_MasterVolume", SFX.masterVolume);
    Database.setItem("Stomp_BackgroundVolume", SFX.backgroundVolume);
    Database.setItem("Stomp_EffectsVolume", SFX.effectsVolume);
};

SFX.setBackgroundSound = function(src, force)
{
    var v = (SFX.masterVolume * SFX.backgroundVolume);
    if(v == 0.0)
    {
        SFX.backgroundSoundSrc = src;
        return;
    }

    if(SFX.backgroundSoundSrc != src || force == true)
    {
        SFX.stopBackgroundSound();

        SFX.backgroundSoundSrc = src;
        SFX.backgroundSound = new Audio();
        SFX.backgroundSound.volume = (SFX.masterVolume * SFX.backgroundVolume);

        SFX.backgroundSound.addEventListener("canplay", function()
        {
            SFX.backgroundSound.play();

            SFX.backgroundSound.addEventListener("ended", function()
            {
                SFX.setBackgroundSound(SFX.backgroundSoundSrc, true);
            }, false);
        }, false);

        SFX.backgroundSound.src = src;
        SFX.backgroundSound.load();
    }
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
    var v = (SFX.masterVolume * SFX.effectsVolume) / 4;
    if(v == 0.0)
    {
        return;
    }

    var audio = new Audio();
    audio.volume =

    audio.addEventListener("canplay", function()
    {
        audio.play();
    });

    audio.src = src;
    audio.load();
};
