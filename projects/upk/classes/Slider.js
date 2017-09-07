(function () {

    function Slider(Iratio,Images,Ititles,Iheaders,IshapePlay) {
        this.Container_constructor();
        this.images = Images
        this.ratio = Iratio;
        this.titles = Ititles;
        this.headers = Iheaders;
        this.shapePlay = IshapePlay;
        this.setup();
    }
    
    var instance;
    var ratio;
    var images;
    var titles;
    var headers;
    var nav;
    var shapePlay;

    var p = createjs.extend(Slider, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        images = this.images;
        titles = this.titles;
        headers = this.headers;
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

        var containerNavigationCircleSlider = new createjs.Container();
        containerNavigationCircleSlider.x = 75*ratio+40*ratio
        containerNavigationCircleSlider.y = 31*ratio
        containerNavigationCircleSlider.name = "containerNavigationCircleSlider";
        containerNavigationSlider.addChild(containerNavigationCircleSlider);

        for(var i=0;i<images.length;i++){
            var strokeCircle = new createjs.Shape();
            strokeCircle.name = "strokeCircle"
            strokeCircle.graphics.setStrokeStyle(1*ratio).beginStroke("#333333").drawCircle(0,0,5*ratio);
            strokeCircle.alpha = 0.25
            strokeCircle.x = (10*ratio+14*ratio)*i
            containerNavigationCircleSlider.addChild(strokeCircle);

            var fillCircle = new createjs.Shape();
            fillCircle.name = "fillCircle"
            fillCircle.graphics.beginFill("#8EC640").drawCircle(0,0,5*ratio);
            fillCircle.x = (10*ratio+14*ratio)*i
            containerNavigationCircleSlider.addChild(fillCircle);
        }

        var headerSlider = new createjs.Text();
        headerSlider.name = "headerSlider";
        headerSlider.font = "16px BwModelica-Regular";
        headerSlider.textBaseline = "alphabetic";
        headerSlider.color = "#333333";
        headerSlider.lineWidth = stage.canvas.width/2-100*ratio
        headerSlider.lineHeight = 30;
        headerSlider.scaleX = ratio;
        headerSlider.scaleY = ratio;
        instance.addChild(headerSlider);

        var titleSlider = new createjs.Text();
        titleSlider.name = "titleSlider";
        titleSlider.font = "58px BwModelica-ExtraBold";
        titleSlider.textBaseline = "alphabetic";
        titleSlider.color = "#333333";
        titleSlider.lineWidth = stage.canvas.width/2-100*ratio
        titleSlider.lineHeight = 70;
        titleSlider.scaleX = ratio;
        titleSlider.scaleY = ratio;
        instance.addChild(titleSlider);

        addContentSlider(0);
    }

    function addAnimation(){

        TweenMax.from(instance.getChildByName("bg"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("bgMask"), 1, {delay:1,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("strokeBgMask"), 1, {delay:1.25,scaleX:0,ease:Expo.easeInOut})

        TweenMax.from(instance.getChildByName("headerSlider"), 0.75, {delay:1,alpha:0,y:instance.getChildByName("headerSlider").y+100*ratio,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("titleSlider"), 0.75, {delay:1.25,alpha:0,y:instance.getChildByName("titleSlider").y+100*ratio,ease:Expo.easeInOut})

        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("bgNavigationSlider"), 1, {delay:1.5,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderDark"), 1, {delay:1.75,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderLight"), 1, {delay:1.75,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("playIcon"), 1, {delay:2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider"), 1, {delay:2,alpha:0,ease:Expo.easeInOut})


    }

    function addContentSlider(Ivalue){
        if(nav) instance.getChildByName("containerImgSlider").removeChild(images[nav]);
        nav = Ivalue;
        instance.getChildByName("containerImgSlider").addChild(images[nav]);

        instance.getChildByName("headerSlider").text = headers[nav]
        instance.getChildByName("headerSlider").x = 100*ratio+80*ratio
        instance.getChildByName("headerSlider").y = 172*ratio+instance.getChildByName("headerSlider").getBounds().height*ratio+60*ratio;

        instance.getChildByName("titleSlider").text = titles[nav]
        instance.getChildByName("titleSlider").x = 100*ratio+75*ratio
        instance.getChildByName("titleSlider").y = instance.getChildByName("headerSlider").y+instance.getChildByName("titleSlider").getBounds().height*ratio-100*ratio;
        
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

        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider"));

        instance.removeChild(instance.getChildByName("headerSlider"));
        instance.removeChild(instance.getChildByName("titleSlider"));

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