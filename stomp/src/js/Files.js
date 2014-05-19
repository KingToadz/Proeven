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
Files.PIC_LOADER_BACKGROUND = Files.addPreFile("PreAssets/Background.jpg");
Files.PIC_LOADER_LOADINGBAR = Files.addPreFile("PreAssets/LoadingBar.png");
Files.PIC_LOADER_LOADINGBAROUTLINE = Files.addPreFile("PreAssets/LoadingBarOutline.png");

//////// ----- File list ----- ////////
Files.PIC_MENU_BACKGROUND = Files.addFile("Assets/Menu/Background.jpg");
Files.PIC_MENU_BUTTON_PLAY = Files.addFile("Assets/Menu/PlayButton.png");
Files.PIC_MENU_BUTTON_PLAY2 = Files.addFile("Assets/Menu/PlayButton2.png");
Files.PIC_MENU_BUTTON_OPTIONS = Files.addFile("Assets/Menu/OptionsButton.png");
Files.PIC_MENU_BUTTON_CREDITS = Files.addFile("Assets/Menu/CreditsButton.png");
Files.PIC_MENU_BUTTON_BACK = Files.addFile("Assets/Menu/BackButton.png");

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

Files.PIC_GAME_BUTTON_JUMP = Files.addFile("Assets/Game/JumpButton.png");
Files.PIC_GAME_BUTTON_BACK = Files.addFile("Assets/Game/BackButton.png");

Files.PIC_GAME_OBJECT_PLAYER            = Files.addFile("Assets/Game/Objects/Player.png");
Files.PIC_GAME_OBJECT_PLAYER_STOMP      = Files.addFile("Assets/Game/Objects/character_stomp.png");
Files.PIC_GAME_OBJECT_PLAYER_STOMP_DUST = Files.addFile("Assets/Game/Objects/stomp_dust.png");
Files.PIC_GAME_OBJECT_PLAYER_RUN_DUST   = Files.addFile("Assets/Game/Objects/run_dust.png");
Files.PIC_GAME_OBJECT_PLAYER_JUMP       = Files.addFile("Assets/Game/Objects/PlayerJump.png");
Files.PIC_GAME_OBJECT_PLAYER_JUMP_DUST  = Files.addFile("Assets/Game/Objects/jump_dust.png");
Files.PIC_GAME_OBJECT_OBSTACLEWALLNORMAL = Files.addFile("Assets/Game/Objects/ObstacleWallNormal.png");

Files.SND_GAME_BACKGROUND = "Assets/Audio/Background_mid.ogg";
Files.SND_GAME_PLAYER_JUMP = "Assets/Audio/Jump.ogg";
Files.SND_GAME_PLAYER_STOMP = "Assets/Audio/Stomp.ogg";
Files.SND_GAME_PLAYER_DEATH = "Assets/Audio/Death.ogg";
