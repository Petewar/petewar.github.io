(function () {

    function Servicos(IdispatchInstance,Iratio) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance
        this.ratio = Iratio;
        this.setup();
    }
    
    var instance;
    var ratio;
    var dispatchInstance;

    var p = createjs.extend(Servicos, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        dispatchInstance = this.dispatchInstance;

    };

    p.init = function() {
        
        addElements();
        addAnimation();

        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);
    }

    function addElements(){
        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);
    }

    function addAnimation(){
        TweenMax.from(instance.getChildByName("bg"), 0.75, {scaleX:0,ease:Expo.easeInOut})
    }

    p.kill = function() {
        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));
    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

    } ; 


window.Servicos = createjs.promote(Servicos, "Container");
}());