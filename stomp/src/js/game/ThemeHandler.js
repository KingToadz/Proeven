/**
 * Created by Jelle on 5/26/2014.
 */

ThemeHandler = function()
{
    this.themes = [];
    this.addTheme("THEME01", SmallObstacleXXS, undefined, 400, 5);
    this.addTheme("THEME02", SmallObstacleXS, BigObstacleXS, 1000, 7);
    this.addTheme("THEME03", SmallObstacle, BigObstacle, 2000, 9);
    this.addTheme("THEME04", SmallObstacle, BigObstacle, 3000, 11);
    this.addTheme("THEME05", SmallObstacle, BigObstacle, 5000, 13);
    this.addTheme("THEME06", SmallObstacle, BigObstacle, -1, 15);
    this.curTheme = this.themes[0];
    this.curThemeIndex = 1;
};

ThemeHandler.prototype.addTheme = function(themeName, smallObject, bigObject, switchAtScore, moveSpeed)
{
    var theme = function(){};
    theme.themeName = themeName;
    theme.layers = [];
    theme.layers.push(Files["PIC_GAME_" + themeName + "_BACKGROUND_01"]);
    theme.layers.push(Files["PIC_GAME_" + themeName + "_BACKGROUND_02"]);
    theme.layers.push(Files["PIC_GAME_" + themeName + "_BACKGROUND_03"]);
    theme.smallObject = smallObject;
    theme.bigObject = bigObject;
    theme.switchAtScore = switchAtScore;
    if(this.themes.length == 0)
    {
        theme.startAtScore = 0;
    }
    else
    {
        theme.startAtScore = this.themes[this.themes.length - 1].switchAtScore;
    }

    theme.moveSpeed = moveSpeed;

    this.themes.push(theme);
};

ThemeHandler.prototype.nextTheme = function()
{
    this.curTheme = this.themes[this.curThemeIndex];
    this.curThemeIndex++;

    return this.curTheme;
};
