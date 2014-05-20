/**
 * Created by Jelle on 4/25/2014.
 */

FileComponent = function()
{
    this.path = "";
    this.obj = null;
};

Files = function(){};
Files.prefiles = [];
Files.files = [];
Files.addPreFile = function(path)
{
    if(path != undefined && path != "")
    {
        var component = new FileComponent();
        component.path = path;

        Files.prefiles.push(component);
        return component;
    }
};

Files.addFile = function(path)
{
    if(path != undefined && path != "")
    {
        var component = new FileComponent();
        component.path = path;

        Files.files.push(component);
        return component;
    }
};

//////// ----- PreFile list ----- ////////
Files.PIC_LOADER_BACKGROUND = Files.addPreFile("PreAssets/Background.png");
Files.PIC_LOADER_LOADINGBAR = Files.addPreFile("PreAssets/LoadingBar.png");
Files.PIC_LOADER_LOADINGBAROUTLINE = Files.addPreFile("PreAssets/LoadingBarOutline.png");

//////// ----- File list ----- ////////
Files.PIC_MENU_BUTTON_BACK = Files.addFile("Assets/Menu/BackButton.png");

Files.PIC_MAINMENU_BACKGROUND = Files.addFile("Assets/Menu/Main/Background.png");
Files.PIC_MAINMENU_BUTTON_PLAY = Files.addFile("Assets/Menu/Main/PlayButton.png");
Files.PIC_MAINMENU_BUTTON_OPTIONS = Files.addFile("Assets/Menu/Main/OptionsButton.png");
Files.PIC_MAINMENU_BUTTON_CREDITS = Files.addFile("Assets/Menu/Main/CreditsButton.png");

Files.PIC_CREDITSMENU_BACKGROUND = Files.addFile("Assets/Menu/Credits/Background.png");

Files.PIC_OPTIONSMENU_BACKGROUND = Files.addFile("Assets/Menu/Options/Background.png");
Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEON = Files.addFile("Assets/Menu/Options/MasterVolumeOn.png");
Files.PIC_OPTIONSMENU_BUTTON_MASTERVOLUMEOFF = Files.addFile("Assets/Menu/Options/MasterVolumeOff.png");
Files.PIC_OPTIONSMENU_BUTTON_BACKGROUNDVOLUMEON = Files.addFile("Assets/Menu/Options/BackgroundVolumeOn.png");
Files.PIC_OPTIONSMENU_BUTTON_BACKGROUNDVOLUMEOFF = Files.addFile("Assets/Menu/Options/BackgroundVolumeOff.png");
Files.PIC_OPTIONSMENU_BUTTON_EFFECTSVOLUMEON = Files.addFile("Assets/Menu/Options/EffectsVolumeOn.png");
Files.PIC_OPTIONSMENU_BUTTON_EFFECTSVOLUMEOFF = Files.addFile("Assets/Menu/Options/EffectsVolumeOff.png");

Files.SND_MENU_BACKGROUND = "Assets/Audio/Background_mid.ogg";

Files.PIC_GAME_MENU_BUTTON_OPTION = Files.addFile("Assets/Menu/btnOptions.png");
Files.PIC_GAME_MENU_BUTTON_HELP = Files.addFile("Assets/Menu/btnHoofdscherm.png");
Files.PIC_GAME_MENU_BUTTON_BACK = Files.addFile("Assets/Menu/btnContinue.png");

Files.PIC_GAME__BACKGROUND_GREEN = Files.addFile("Assets/Game/Themes/Theme_01/bg_01_green.png");
Files.PIC_GAME__BACKGROUND_ORANGE = Files.addFile("Assets/Game/Themes/Theme_01/bg_01_orange.png");
Files.PIC_GAME__BACKGROUND_RED = Files.addFile("Assets/Game/Themes/Theme_01/bg_01_red.png");

Files.PIC_GAME__BACKGROUND_01 = Files.addFile("Assets/Game/Themes/Theme_01/bg_02.png");
Files.PIC_GAME__BACKGROUND_02 = Files.addFile("Assets/Game/Themes/Theme_01/bg_03.png");
Files.PIC_GAME__BACKGROUND_03 = Files.addFile("Assets/Game/Themes/Theme_01/bg_04.png");

Files.PIC_GAME_BUTTON_JUMP = Files.addFile("Assets/Game/wips_Jump.png");
Files.PIC_GAME_BUTTON_BACK = Files.addFile("Assets/Game/BackButton.png");

Files.PIC_GAME_OBJECT_PLAYER_STOMP      = Files.addFile("Assets/Game/Objects/character_stomp.png");
Files.PIC_GAME_OBJECT_PLAYER_STOMP_DUST = Files.addFile("Assets/Game/Objects/stomp_dust.png");
Files.PIC_GAME_OBJECT_PLAYER_RUN_DUST   = Files.addFile("Assets/Game/Objects/run_dust.png");
Files.PIC_GAME_OBJECT_PLAYER_JUMP_DUST  = Files.addFile("Assets/Game/Objects/jump_dust.png");

Files.PIC_GAME_OBJECT_PLAYER = Files.addFile("Assets/Game/Objects/character_run.png");
Files.PIC_GAME_OBJECT_PLAYER_JUMP = Files.addFile("Assets/Game/Objects/character_jump.png");

Files.PIC_GAME_OBJECT_OBSTACLESMALL = Files.addFile("Assets/Game/Objects/ObstacleSmall.png");
Files.PIC_GAME_OBJECT_OBSTACLENORMAL = Files.addFile("Assets/Game/Objects/ObstacleNormal.png");
Files.PIC_GAME_OBJECT_OBSTACLEBIG = Files.addFile("Assets/Game/Objects/ObstacleBig.png");

Files.SND_GAME_BACKGROUND = "Assets/Audio/Background_mid.ogg";
Files.SND_GAME_PLAYER_JUMP = "Assets/Audio/Jump.ogg";
Files.SND_GAME_PLAYER_STOMP = "Assets/Audio/Stomp.ogg";
Files.SND_GAME_PLAYER_DEATH = "Assets/Audio/Death.ogg";
