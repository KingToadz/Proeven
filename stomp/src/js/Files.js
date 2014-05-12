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
Files.PIC_LOADER_BACKGROUND = Files.addPreFile("PreAssets/background.jpg");

//////// ----- File list ----- ////////
Files.PIC_MENU_BACKGROUND = Files.addFile("Assets/Menu/Background.jpg");
Files.PIC_MENU_BUTTON_PLAY = Files.addFile("Assets/Menu/PlayButton.png");
Files.PIC_MENU_BUTTON_OPTIONS = Files.addFile("Assets/Menu/OptionsButton.png");
Files.PIC_MENU_BUTTON_CREDITS = Files.addFile("Assets/Menu/CreditsButton.png");
Files.PIC_MENU_BUTTON_BACK = Files.addFile("Assets/Menu/BackButton.png");

Files.SND_MENU_BACKGROUND = "Assets/Menu/Background.ogg";

Files.PIC_GAME__BACKGROUND = Files.addFile("Assets/Game/Background.jpg");

Files.PIC_GAME_BUTTON_JUMP = Files.addFile("Assets/Game/JumpButton.png");
Files.PIC_GAME_BUTTON_BACK = Files.addFile("Assets/Game/BackButton.png");

Files.PIC_GAME_OBJECT_PLAYER = Files.addFile("Assets/Game/Objects/Player.png");
Files.PIC_GAME_OBJECT_OBSTACLEWALLNORMAL = Files.addFile("Assets/Game/Objects/ObstacleWallNormal.png");
