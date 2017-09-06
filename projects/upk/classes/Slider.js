(function () {

    function Slider(Iratio,Images) {
        this.Container_constructor();
        this.images = Images
        this.ratio = Iratio;
        this.setup();
    }
    
    var instance;
    var ratio;
    var images;

    var p = createjs.extend(Slider, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        images = this.images;

        addElements();
        addAnimation();

    };

    function addElements(){
        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width/2-100*ratio, stage.canvas.height-180*ratio-122/2*ratio);
        bg.x = 100*ratio;
        bg.y = 180*ratio
        instance.addChild(bg);
    }

    function addAnimation(){
        TweenMax.from(instance.getChildByName("bg"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
    }

    p.kill = function() {
        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));
    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width/2-100*ratio, stage.canvas.height-180*ratio-122/2*ratio);
        instance.getChildByName("bg").x = 100*ratio;
        instance.getChildByName("bg").y = 180*ratio

    } ; 


window.Slider = createjs.promote(Slider, "Container");
}());