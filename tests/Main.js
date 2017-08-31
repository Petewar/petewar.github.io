(function () {

    function Main(Iratio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();
    }
    
    var ratio;
    var instance;
    var textField;
    var rect;
    var xPos;
    var yPos;

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        ratio = this.ratio
        instance = this;

        textField = new createjs.Text();
        textField.font = "bold 24px Montserrat";
        textField.color = "#333333";
       
        textField.scaleX = ratio;
        textField.scaleY = ratio;
        instance.addChild(textField);

        rect = new createjs.Shape();
        rect.graphics.beginFill("#333333").drawRect(0, 0, 100*ratio,100*ratio);
        rect.regX = 50*ratio
        rect.regY = 50*ratio
        xPos = stage.canvas.width/2
        yPos = stage.canvas.height/2
        rect.x = xPos
        rect.y = yPos
        instance.addChild(rect);
    }

    p.posX = function(accelerationX,accelerationY,accelerationZ) {

        xPos = stage.canvas.width/2+(-1*(accelerationX * 2.5))*ratio;
        yPos = stage.canvas.height/2+(accelerationY * 2.5)*ratio;

        rect.x = xPos;
        rect.y = yPos;

        //textField.text = accelerationX+"\n"+accelerationY+"\n"+accelerationZ;
    } ; 

    p.resize = function() {

        rect.graphics.clear();
        rect.graphics.beginFill("#333333").drawRect(0, 0, 100*ratio,100*ratio);
        rect.x = stage.canvas.width/2-50*ratio
        rect.y = stage.canvas.height/2-50*ratio

    } ;  

window.Main = createjs.promote(Main, "Container");
}());