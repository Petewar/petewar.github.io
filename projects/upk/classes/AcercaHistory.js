(function () {

    function AcercaHistory(Iratio,IposY) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var posY;

    var p = createjs.extend(AcercaHistory, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        posY = this.posY;

        addElements();
        addAnimation();

    };

    function addElements(){

        var bgWhite = new createjs.Shape();
        bgWhite.y = posY
        bgWhite.name = "bgWhite";
        bgWhite.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width/2, 502*ratio);
        instance.addChild(bgWhite);

        var bgGrey = new createjs.Shape();
        bgGrey.y = posY+502*ratio
        bgGrey.name = "bgGrey";
        bgGrey.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width/2, 467*ratio);
        instance.addChild(bgGrey);

        var bgGreen = new createjs.Shape();
        bgGreen.x = stage.canvas.width/2
        bgGreen.y = posY
        bgGreen.name = "bgGreen";
        bgGreen.graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width/2, 763*ratio);
        instance.addChild(bgGreen);

        var bgWhiteWhiteTwo = new createjs.Shape();
        bgWhiteWhiteTwo.x = stage.canvas.width/2
        bgWhiteWhiteTwo.y = posY+763*ratio
        bgWhiteWhiteTwo.name = "bgWhiteWhiteTwo";
        bgWhiteWhiteTwo.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width/2, 206*ratio);
        instance.addChild(bgWhiteWhiteTwo);

    }

    function addAnimation(){
       
    }

    function addHits(){

    }

    p.kill = function() {

        instance.getChildByName("bgWhite").graphics.clear();
        instance.getChildByName("bgGrey").graphics.clear();
        instance.getChildByName("bgGreen").graphics.clear();
        instance.getChildByName("bgWhiteWhiteTwo").graphics.clear();

        instance.removeChild(instance.getChildByName("bgWhite"))
        instance.removeChild(instance.getChildByName("bgGrey"))
        instance.removeChild(instance.getChildByName("bgGreen"))
        instance.removeChild(instance.getChildByName("bgWhiteWhiteTwo"))
        
    } ; 

    p.getHeight = function() {
        return 969*ratio
    }

    p.resize = function() {
        
        instance.getChildByName("bgWhite").graphics.clear();
        instance.getChildByName("bgWhite").graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width/2, 502*ratio);

        instance.getChildByName("bgGrey").graphics.clear();
        instance.getChildByName("bgGrey").graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width/2, 467*ratio);

        instance.getChildByName("bgGreen").x = stage.canvas.width/2
        instance.getChildByName("bgGreen").graphics.clear();
        instance.getChildByName("bgGreen").graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width/2, 763*ratio);

        instance.getChildByName("bgWhiteWhiteTwo").x = stage.canvas.width/2
        instance.getChildByName("bgWhiteWhiteTwo").graphics.clear();
        instance.getChildByName("bgWhiteWhiteTwo").graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width/2, 206*ratio);

    } ; 


window.AcercaHistory = createjs.promote(AcercaHistory, "Container");
}());