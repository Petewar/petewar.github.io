(function () {

    function Footer(Iratio,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var posY;

    var p = createjs.extend(Footer, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        posY =  this.posY

        addElements();
        addAnimation();

    };

    function addElements(){
        
        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width, 505*ratio);
        bg.y = posY
        instance.addChild(bg);

    }

    function addAnimation(){

    }

    function addHits(){

    }

    p.kill = function() {
        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"))
    } ; 

    p.getHeight = function() {
        return 500*ratio
    }

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width, 500*ratio);
    
    } ; 


window.Footer = createjs.promote(Footer, "Container");
}());