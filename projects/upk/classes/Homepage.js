(function () {

    function Homepage(Iratio) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();
    }
    
    var instance;
    var ratio;

    var p = createjs.extend(Homepage, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;

    };

    p.init = function() {
        addElements();
        addAnimation();
    }

    function addElements(){
        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);
    }

    function addAnimation(){
        TweenMax.from(instance.getChildByName("bg"), 1, {scaleX:0,ease:Expo.easeInOut})
    }

    p.kill = function() {
        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));
    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

    } ; 


window.Homepage = createjs.promote(Homepage, "Container");
}());