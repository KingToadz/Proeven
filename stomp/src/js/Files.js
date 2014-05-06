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
Files.PIC_MENU_BACKGROUND = Files.addFile("Assets/Menu/background.jpg");
Files.PIC_MENU_BUTTON_PLAY = Files.addFile("Assets/Menu/PlayButton.png");
Files.PIC_MENU_BUTTON_BACK = Files.addFile("Assets/Menu/BackButton.png");
Files.PIC_MENU_BUTTON_CREDITS = Files.addFile("Assets/Menu/CreditsButton.png");
