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

Files.PIC_GAME__BACKGROUND = Files.addFile("Assets/Game/Themes/Theme_01/bg_01.png");
Files.PIC_GAME__BACKGROUND_01 = Files.addFile("Assets/Game/Themes/Theme_01/bg_02.png");
Files.PIC_GAME__BACKGROUND_02 = Files.addFile("Assets/Game/Themes/Theme_01/bg_03.png");
Files.PIC_GAME__BACKGROUND_03 = Files.addFile("Assets/Game/Themes/Theme_01/bg_04.png");

Files.PIC_GAME_BUTTON_JUMP = Files.addFile("Assets/Game/JumpButton.png");
Files.PIC_GAME_BUTTON_BACK = Files.addFile("Assets/Game/BackButton.png");

Files.PIC_GAME_OBJECT_PLAYER      = Files.addFile("Assets/Game/Objects/Player.png");
Files.PIC_GAME_OBJECT_PLAYER_JUMP = Files.addFile("Assets/Game/Objects/PlayerJump.png");
Files.PIC_GAME_OBJECT_OBSTACLEWALLNORMAL = Files.addFile("Assets/Game/Objects/ObstacleWallNormal.png");

Files.SND_GAME_BACKGROUND = "Assets/Audio/Background_mid.ogg";
Files.SND_GAME_PLAYER_JUMP = "Assets/Audio/Jump.ogg";
Files.SND_GAME_PLAYER_STOMP = "Assets/Audio/Stomp.ogg";
Files.SND_GAME_PLAYER_DEATH = "Assets/Audio/Death.ogg";
