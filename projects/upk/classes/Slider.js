(function () {

    function Slider(Iratio,Images,IshapePlay) {
        this.Container_constructor();
        this.images = Images
        this.ratio = Iratio;
        this.shapePlay = IshapePlay;
        this.setup();
    }
    
    var instance;
    var ratio;
    var images;
    var currentImage;
    var shapePlay;

    var p = createjs.extend(Slider, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        images = this.images;
        shapePlay = this.shapePlay;

        addElements();
        addAnimation();

    };

    function addElements(){

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width/2-100*ratio, stage.canvas.height-172*ratio-122/2*ratio);
        bg.x = 100*ratio;
        bg.y = 172*ratio
        instance.addChild(bg);

        var containerImgSlider = new createjs.Container();
        containerImgSlider.name = "containerImgSlider";
        containerImgSlider.x = stage.canvas.width/2;
        containerImgSlider.y = 172*ratio-30*ratio
        instance.addChild(containerImgSlider)

        var bgMask = new createjs.Shape();
        bgMask.name = "bgMask";
        bgMask.graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width/2, stage.canvas.height-172*ratio-122/2*ratio+60*ratio);
        bgMask.x = stage.canvas.width/2;
        bgMask.y = 172*ratio-30*ratio
        bgMask.alpha =0.01
        containerImgSlider.mask = bgMask;
        instance.addChild(bgMask);

        var strokeBgMask = new createjs.Shape();
        strokeBgMask.name = "strokeBgMask";
        strokeBgMask.graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width/2, 4*ratio);
        strokeBgMask.x = stage.canvas.width/2
        strokeBgMask.y = 172*ratio-30*ratio
        instance.addChild(strokeBgMask);

        var containerNavigationSlider = new createjs.Container();
        containerNavigationSlider.name = "containerNavigationSlider";
        containerNavigationSlider.x = stage.canvas.width-256*ratio;
        containerNavigationSlider.y = stage.canvas.height-62*ratio
        instance.addChild(containerNavigationSlider);

        var bgNavigationSlider = new createjs.Shape();
        bgNavigationSlider.name = "bgNavigationSlider";
        bgNavigationSlider.graphics.beginFill("#ffffff").drawRect(0, 0, 256*ratio, 60*ratio);
        containerNavigationSlider.addChild(bgNavigationSlider);

        var strokeNavigationSliderDark = new createjs.Shape();
        strokeNavigationSliderDark.name = "strokeNavigationSliderDark";
        strokeNavigationSliderDark.graphics.beginFill("#333333").drawRect(0, 0, 256*ratio, 2*ratio);
        strokeNavigationSliderDark.y = 60*ratio
        containerNavigationSlider.addChild(strokeNavigationSliderDark);

        var strokeNavigationSliderLight = new createjs.Shape();
        strokeNavigationSliderLight.name = "strokeNavigationSliderLight";
        strokeNavigationSliderLight.graphics.beginFill("#8EC640").drawRect(0, 0, 256*ratio, 2*ratio);
        strokeNavigationSliderLight.y = 60*ratio
        containerNavigationSlider.addChild(strokeNavigationSliderLight);
        
        var playIcon = shapePlay;
        playIcon.name="playIcon";
        playIcon.x = 45*ratio
        playIcon.y = 17*ratio
        containerNavigationSlider.addChild(playIcon);

        addSliderImage(images[0]);
    }

    function addAnimation(){
        TweenMax.from(instance.getChildByName("bg"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("bgMask"), 1, {delay:1,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("strokeBgMask"), 1, {delay:1,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider"), 1, {delay:1.5,alpha:0,ease:Expo.easeInOut})

    }

    function addSliderImage(Image){
        if(currentImage) instance.getChildByName("containerImgSlider").removeChild(currentImage);
        currentImage = Image;
        instance.getChildByName("containerImgSlider").addChild(Image);
    }

    p.kill = function() {
        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("bgMask").graphics.clear();
        instance.removeChild(instance.getChildByName("bgMask"));

        instance.getChildByName("strokeBgMask").graphics.clear();
        instance.removeChild(instance.getChildByName("strokeBgMask"));

        instance.getChildByName("containerNavigationSlider").getChildByName("bgNavigationSlider").graphics.clear();
        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("bgNavigationSlider"));

        instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderDark").graphics.clear();
        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderDark"));

        instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderLight").graphics.clear();
        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderLight"));

        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("playIcon"));

        instance.removeChild(instance.getChildByName("containerNavigationSlider"));
        instance.removeChild(instance.getChildByName("containerImgSlider"));

    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width/2-100*ratio, stage.canvas.height-172*ratio-122/2*ratio);
        instance.getChildByName("bg").x = 100*ratio;
        instance.getChildByName("bg").y = 172*ratio

        instance.getChildByName("bgMask").graphics.clear();
        instance.getChildByName("bgMask").graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width/2, stage.canvas.height-172*ratio-122/2*ratio+60*ratio);
        instance.getChildByName("bgMask").x = stage.canvas.width/2;
        instance.getChildByName("bgMask").y = 172*ratio-30*ratio

        instance.getChildByName("strokeBgMask").graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width/2, 4*ratio);
        instance.getChildByName("strokeBgMask").x = stage.canvas.width/2
        instance.getChildByName("strokeBgMask").y = 172*ratio-30*ratio

        instance.getChildByName("containerImgSlider").x = stage.canvas.width/2;
        instance.getChildByName("containerImgSlider").y = 172*ratio-30*ratio

        instance.getChildByName("containerNavigationSlider").x = stage.canvas.width-256*ratio;
        instance.getChildByName("containerNavigationSlider").y = stage.canvas.height-62*ratio

    } ; 


window.Slider = createjs.promote(Slider, "Container");
}());