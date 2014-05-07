/**
 * Created by Jelle on 5/6/2014.
 */

ItemGame = function()
{
    this.jumpButton1 = new RotatableButton();
    this.jumpButton1.alignx = Align.LEFT;
    this.jumpButton1.aligny = Align.TOP;
    this.jumpButton1.setTexture(Files.PIC_GAME_BUTTON_JUMP.obj);
    this.jumpButton1.setPosition(Files.PIC_GAME_BUTTON_JUMP.obj.width / 2, Files.PIC_GAME_BUTTON_JUMP.obj.height / 2);
    this.jumpButton1.setSize(Files.PIC_GAME_BUTTON_JUMP.obj.width, Files.PIC_GAME_BUTTON_JUMP.obj.height);
    this.jumpButton1.rotation = 180;
    this.jumpButton1.onClick = function(){this.item.gameHandler.objectHandler.player1.tryJump();};

    this.jumpButton2 = new Button();
    this.jumpButton2.alignx = Align.RIGHT;
    this.jumpButton2.aligny = Align.BOTTOM;
    this.jumpButton2.setTexture(Files.PIC_GAME_BUTTON_JUMP.obj);
    this.jumpButton2.setPosition(-Files.PIC_GAME_BUTTON_JUMP.obj.width / 2, -Files.PIC_GAME_BUTTON_JUMP.obj.height / 2);
    this.jumpButton2.setSize(Files.PIC_GAME_BUTTON_JUMP.obj.width, Files.PIC_GAME_BUTTON_JUMP.obj.height);
    this.jumpButton2.onClick = function(){this.item.gameHandler.objectHandler.player2.tryJump();};

    this.gameHandler = new GameHandler();
};

ItemGame.prototype.initialize = function()
{
    this.jumpButton1.item = this;
    this.jumpButton1.initialize();

    this.jumpButton2.item = this;
    this.jumpButton2.initialize();
};

ItemGame.prototype.activate = function()
{

};

ItemGame.prototype.deActivate = function()
{

};

ItemGame.prototype.tick = function()
{
    this.gameHandler.tick();

    this.jumpButton1.tick();
    this.jumpButton2.tick();
};

ItemGame.prototype.draw = function(gfx)
{
    this.gameHandler.draw(gfx);

    this.jumpButton1.draw(gfx);
    this.jumpButton2.draw(gfx);
};
