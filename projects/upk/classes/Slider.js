(function () {

    function Slider(Iratio,Images,Ititles,Iheaders,IviewMore,IshapePlay,IshapePause,IaspectRatio) {
        this.Container_constructor();
        this.images = Images
        this.ratio = Iratio;
        this.titles = Ititles;
        this.headers = Iheaders;
        this.buttonTitle = IviewMore;
        this.shapePlay = IshapePlay;
        this.shapePause = IshapePause;
        this.aspectRatio = IaspectRatio;
        this.setup();
    }
    
    var instance;
    var ratio;
    var images;
    var titles;
    var headers;
    var buttonTitle;
    var nav;
    var shapePlay;
    var shapePause;
    var aspectRatio;
    var playSlider = true;

    var p = createjs.extend(Slider, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        images = this.images;
        titles = this.titles;
        headers = this.headers;
        shapePlay = this.shapePlay;
        shapePause = this.shapePause;
        aspectRatio = this.aspectRatio;
        buttonTitle = this.buttonTitle;

        addElements();
        addAnimation();
        addContentSlider(0);
        addContenSliderAnimation();

    };

    function addElements(){

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#F1F3F0").drawRect(0, 0, Math.floor(stage.canvas.width/2-100*ratio), 500*ratio);
        bg.x = 100*ratio;
        bg.y = 172*ratio
        instance.addChild(bg);

        var containerImgSlider = new createjs.Container();
        containerImgSlider.name = "containerImgSlider";
        containerImgSlider.x = Math.floor(stage.canvas.width/2);
        containerImgSlider.y = 172*ratio-30*ratio
        instance.addChild(containerImgSlider)

        var bgMask = new createjs.Shape();
        bgMask.name = "bgMask";
        bgMask.graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width/2), 560*ratio);
        bgMask.x = Math.floor(stage.canvas.width/2);
        bgMask.y = 172*ratio-30*ratio
        bgMask.alpha =0.01
        containerImgSlider.mask = bgMask;
        instance.addChild(bgMask);

        var strokeBgMask = new createjs.Shape();
        strokeBgMask.name = "strokeBgMask";
        strokeBgMask.graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width/2), 4*ratio);
        strokeBgMask.x = Math.floor(stage.canvas.width/2)
        strokeBgMask.y = 172*ratio-30*ratio
        instance.addChild(strokeBgMask);

        var containerNavigationSlider = new createjs.Container();
        containerNavigationSlider.name = "containerNavigationSlider";
        containerNavigationSlider.x = stage.canvas.width-256*ratio;
        containerNavigationSlider.y = 672*ratio
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
        strokeNavigationSliderLight.scaleX = 0;
        strokeNavigationSliderLight.name = "strokeNavigationSliderLight";
        strokeNavigationSliderLight.graphics.beginFill("#8EC640").drawRect(0, 0, 256*ratio, 2*ratio);
        strokeNavigationSliderLight.y = 60*ratio
        containerNavigationSlider.addChild(strokeNavigationSliderLight);
        
        var playIcon = shapePlay;
        playIcon.name="playIcon";
        playIcon.x = 45*ratio
        playIcon.y = 17*ratio
        playIcon.visible = false;
        containerNavigationSlider.addChild(playIcon);

        var pauseIcon = shapePause;
        pauseIcon.name="pauseIcon";
        pauseIcon.x = 45*ratio
        pauseIcon.y = 17*ratio
        containerNavigationSlider.addChild(pauseIcon);

        var hitPlayPause = new createjs.Shape();
        hitPlayPause.name = "hitPlayPause"
        hitPlayPause.graphics.beginFill("#ffffff").drawRect(0, 0, 26*ratio, 26*ratio);
        hitPlayPause.alpha = 0.01;
        hitPlayPause.x = 45*ratio
        hitPlayPause.y = 17*ratio
        containerNavigationSlider.addChild(hitPlayPause);

        var containerNavigationCircleSlider = new createjs.Container();
        containerNavigationCircleSlider.x = 75*ratio+40*ratio
        containerNavigationCircleSlider.y = 31*ratio
        containerNavigationCircleSlider.name = "containerNavigationCircleSlider";
        containerNavigationSlider.addChild(containerNavigationCircleSlider);

        for(var j=0;j<images.length;j++){

            var strokeCircle = new createjs.Shape();
            strokeCircle.name = "strokeCircle"+j
            strokeCircle.graphics.setStrokeStyle(1*ratio).beginStroke("#333333").drawCircle(0,0,5*ratio);
            strokeCircle.alpha = 0.25
            strokeCircle.x = (10*ratio+14*ratio)*j
            containerNavigationCircleSlider.addChild(strokeCircle);

            var fillCircle = new createjs.Shape();
            fillCircle.name = "fillCircle"+j
            fillCircle.graphics.beginFill("#8EC640").drawCircle(0,0,5*ratio);
            fillCircle.visible = 0;
            fillCircle.x = (10*ratio+14*ratio)*j
            containerNavigationCircleSlider.addChild(fillCircle);

            var hitCircle = new createjs.Shape();
            hitCircle.name = "hitCircle"+j
            hitCircle.graphics.beginFill("#FFFFFF").drawCircle(0,0,10*ratio);
            hitCircle.x = (10*ratio+14*ratio)*j
            hitCircle.alpha = 0.01;
            containerNavigationCircleSlider.addChild(hitCircle);

        }

        var headerSlider = new createjs.Text();
        headerSlider.name = "headerSlider";
        headerSlider.font = "16px BwModelica-Regular";
        headerSlider.textBaseline = "alphabetic";
        headerSlider.color = "#333333";
        headerSlider.lineWidth = stage.canvas.width/2-200*ratio
        headerSlider.lineHeight = 30;
        headerSlider.text = "."
        headerSlider.scaleX = ratio;
        headerSlider.scaleY = ratio;
        headerSlider.x = 100*ratio+80*ratio
        headerSlider.y = 172*ratio+headerSlider.getBounds().height*ratio+60*ratio;
        instance.addChild(headerSlider);

        var titleSlider = new createjs.Text();
        titleSlider.name = "titleSlider";
        titleSlider.font = "58px BwModelica-ExtraBold";
        titleSlider.textBaseline = "alphabetic";
        titleSlider.color = "#333333";
        if(ratio==1)titleSlider.lineWidth = stage.canvas.width/2-200*ratio
        if(ratio==2)titleSlider.lineWidth = stage.canvas.width/2-400*ratio
        titleSlider.lineHeight = 70;
        titleSlider.text = "."
        titleSlider.scaleX = ratio;
        titleSlider.scaleY = ratio;
        titleSlider.x = 100*ratio+75*ratio
        titleSlider.y = headerSlider.y+headerSlider.getBounds().height*2*ratio+50*ratio;
        instance.addChild(titleSlider);

        var viewMore = new createjs.Text();
        viewMore.name = "viewMore";
        viewMore.font = "16px BwModelica-Bold";
        viewMore.textBaseline = "alphabetic";
        viewMore.color = "#8EC640";
        viewMore.text = "."
        viewMore.scaleX = ratio;
        viewMore.scaleY = ratio;
        viewMore.x = 100*ratio+75*ratio
        viewMore.y = titleSlider.y+titleSlider.getBounds().height*2*ratio+50*ratio+viewMore.getBounds().height*ratio;
        instance.addChild(viewMore);

        var strokeButton = new createjs.Shape();
        strokeButton.name = "strokeButton"
        strokeButton.scaleX = 0;
        strokeButton.graphics.beginFill("#8EC640").drawRect(0, 0, 70*ratio, 4*ratio);
        strokeButton.x = 100*ratio+75*ratio
        strokeButton.y = titleSlider.y+titleSlider.getBounds().height*2*ratio+50*ratio+viewMore.getBounds().height*ratio+5*ratio;
        instance.addChild(strokeButton);

        var hitButton = new createjs.Shape();
        hitButton.name = "hitButton"
        hitButton.graphics.beginFill("#333333").drawRect(0, 0, 70*ratio, 28*ratio);
        hitButton.alpha = 0.01;
        hitButton.x = 100*ratio+75*ratio
        hitButton.y = titleSlider.y+titleSlider.getBounds().height*2*ratio+50*ratio;
        instance.addChild(hitButton);

    }

    function addAnimation(){

        TweenMax.from(instance.getChildByName("bg"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("bgNavigationSlider"), 1, {delay:1.5,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderDark"), 1, {delay:1.75,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("playIcon"), 1, {delay:2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("pauseIcon"), 1, {delay:2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider"), 1, {delay:2,alpha:0,ease:Expo.easeInOut,onComplete:addHits})
        
        TweenMax.from(instance.getChildByName("bgMask"), 1, {delay:1,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("strokeBgMask"), 1, {delay:1.25,scaleX:0,ease:Expo.easeInOut})
        
        TweenMax.from(instance.getChildByName("headerSlider"), 0.75, {delay:1,alpha:0,y:instance.getChildByName("headerSlider").y+100*ratio,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("titleSlider"), 0.75, {delay:1.25,alpha:0,y:instance.getChildByName("titleSlider").y+100*ratio,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("viewMore"), 0.75, {delay:1.5,alpha:0,y:instance.getChildByName("viewMore").y+100*ratio,ease:Expo.easeInOut})

    }

    function addHits(){

        for(var i=0;i<images.length;i++){

            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).cursor = "pointer";
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).type = "navigationSlider";
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).instance = i;
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).addEventListener("mouseover", handlerOver);
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).addEventListener("mouseout", handlerOut)
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).addEventListener("click", handlerClick);

        }

        instance.getChildByName("containerNavigationSlider").getChildByName("hitPlayPause").cursor = "pointer";
        instance.getChildByName("containerNavigationSlider").getChildByName("hitPlayPause").type = "playPause";
        instance.getChildByName("containerNavigationSlider").getChildByName("hitPlayPause").addEventListener("mouseover", handlerOver);
        instance.getChildByName("containerNavigationSlider").getChildByName("hitPlayPause").addEventListener("mouseout", handlerOut)
        instance.getChildByName("containerNavigationSlider").getChildByName("hitPlayPause").addEventListener("click", handlerClick);

        instance.getChildByName("hitButton").cursor = "pointer";
        instance.getChildByName("hitButton").type = "button";
        instance.getChildByName("hitButton").addEventListener("mouseover", handlerOver);
        instance.getChildByName("hitButton").addEventListener("mouseout", handlerOut)
        instance.getChildByName("hitButton").addEventListener("click", handlerClick);

        addTimerSlider();
    }

    function handlerOver(event){

        switch(event.target.type){
            case "navigationSlider":
                
            break;

            case "playPause":
                
            break;

            case "button":
                if(playSlider)TweenMax.pauseAll(true, true)
                TweenMax.to(instance.getChildByName("strokeButton"), 0.5, {scaleX:1,ease:Expo.easeInOut})
            break;
        }

    }

    function handlerOut(event){

        switch(event.target.type){
            case "navigationSlider":
            
            break;

            case "playPause":
                
            break;

            case "button":
                TweenMax.to(instance.getChildByName("strokeButton"), 0.5, {scaleX:0,ease:Expo.easeInOut})
                if(playSlider)TweenMax.resumeAll(true, true)
            break;
        }

    }

    function handlerClick(event){

        switch(event.target.type){
            case "navigationSlider":

                if(nav!=event.target.instance){

                    if(playSlider){
                        TweenMax.killAll();
                        addTimerSlider();
                    }

                    instance.getChildByName("containerImgSlider").removeChild(images[nav]);
                    instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("fillCircle"+nav).visible = false;
                    addContentSlider(event.target.instance);
                    addContenSliderAnimation();

                }

            break;

            case "playPause":
                
                if(playSlider){
                    TweenMax.pauseAll(true, true)
                    playSlider = false
                    instance.getChildByName("containerNavigationSlider").getChildByName("playIcon").visible = true
                    instance.getChildByName("containerNavigationSlider").getChildByName("pauseIcon").visible = false
                }else {
                    TweenMax.resumeAll(true, true)
                    playSlider = true
                    instance.getChildByName("containerNavigationSlider").getChildByName("playIcon").visible = false
                    instance.getChildByName("containerNavigationSlider").getChildByName("pauseIcon").visible = true
                }

            break;

            case "button":
                
            break;
        }
    }

    function addContentSlider(Ivalue){

        nav = Ivalue;
        aspectRatio.resize(images[nav],images[nav].getBounds().width,images[nav].getBounds().height,"area")
        instance.getChildByName("containerImgSlider").addChild(images[nav]);
        instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("fillCircle"+nav).visible = true;

        instance.getChildByName("headerSlider").text = headers[nav]
        instance.getChildByName("titleSlider").text = titles[nav]
        instance.getChildByName("viewMore").text = buttonTitle

    }

    function addContenSliderAnimation(){

        TweenMax.from(instance.getChildByName("bgMask"), 1, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("strokeBgMask"), 1, {delay:0.25,scaleX:0,ease:Expo.easeInOut})

        TweenMax.from(instance.getChildByName("headerSlider"), 0.75, {alpha:0,y:instance.getChildByName("headerSlider").y+100*ratio,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("titleSlider"), 0.75, {delay:0.25,alpha:0,y:instance.getChildByName("titleSlider").y+100*ratio,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("viewMore"), 0.75, {delay:0.5,alpha:0,y:instance.getChildByName("viewMore").y+100*ratio,ease:Expo.easeInOut})

    }

    function addTimerSlider(){
    
            instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderLight").scaleX = 0;
            TweenMax.to(instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderLight"), 5, {scaleX:1,onComplete:addAutomaticNavSlider})
    }

    function addAutomaticNavSlider(){

            instance.getChildByName("containerImgSlider").removeChild(images[nav]);
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("fillCircle"+nav).visible = false;
            
            if(nav==images.length-1){
                nav=0
            }else{
                nav++;
            }

            addContentSlider(nav);
            addContenSliderAnimation();
            addTimerSlider();

    }

    p.kill = function() {

        TweenMax.killAll();
        playSlider = true

        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("bgMask").graphics.clear();
        instance.removeChild(instance.getChildByName("bgMask"));

        instance.getChildByName("strokeBgMask").graphics.clear();
        instance.removeChild(instance.getChildByName("strokeBgMask"));

        for(var i=0;i<images.length;i++){

            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).cursor = "auto";
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).removeEventListener("mouseover", handlerOver);
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).removeEventListener("mouseout", handlerOut)
            instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider").getChildByName("hitCircle"+i).removeEventListener("click", handlerClick);

        }

        instance.getChildByName("containerNavigationSlider").getChildByName("bgNavigationSlider").graphics.clear();
        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("bgNavigationSlider"));

        instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderLight").graphics.clear();
        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderLight"));

        instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderDark").graphics.clear();
        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("strokeNavigationSliderDark"));

        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("playIcon"));
        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("pauseIcon"));

        instance.getChildByName("containerNavigationSlider").removeChild(instance.getChildByName("containerNavigationSlider").getChildByName("containerNavigationCircleSlider"));

        instance.removeChild(instance.getChildByName("headerSlider"));
        instance.removeChild(instance.getChildByName("titleSlider"));

        instance.removeChild(instance.getChildByName("viewMore"));
        instance.removeChild(instance.getChildByName("strokeButton"));
        instance.removeChild(instance.getChildByName("hitButton"));

        instance.removeChild(instance.getChildByName("containerNavigationSlider"));
        instance.removeChild(instance.getChildByName("containerImgSlider"));

    } ; 

    p.getHeight = function() {
        return instance.getChildByName("containerNavigationSlider").y
    }

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#F1F3F0").drawRect(0, 0, Math.floor(stage.canvas.width/2-100*ratio), 500*ratio);
        instance.getChildByName("bg").x = 100*ratio;
        instance.getChildByName("bg").y = 172*ratio

        instance.getChildByName("bgMask").graphics.clear();
        instance.getChildByName("bgMask").graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width/2), 560*ratio);
        instance.getChildByName("bgMask").x = Math.floor(stage.canvas.width/2)
        instance.getChildByName("bgMask").y = 172*ratio-30*ratio

        aspectRatio.resize(images[nav],images[nav].getBounds().width,images[nav].getBounds().height,"area")

        instance.getChildByName("strokeBgMask").graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width/2), 4*ratio);
        instance.getChildByName("strokeBgMask").x = Math.floor(stage.canvas.width/2)
        instance.getChildByName("strokeBgMask").y = 172*ratio-30*ratio

        instance.getChildByName("containerImgSlider").x = Math.floor(stage.canvas.width/2)
        instance.getChildByName("containerImgSlider").y = 172*ratio-30*ratio

        instance.getChildByName("containerNavigationSlider").x = stage.canvas.width-256*ratio;
        instance.getChildByName("containerNavigationSlider").y = 672*ratio

        if(ratio==1)instance.getChildByName("titleSlider").lineWidth = stage.canvas.width/2-200*ratio
        if(ratio==2)instance.getChildByName("titleSlider").lineWidth = stage.canvas.width/2-400*ratio

    } ; 


window.Slider = createjs.promote(Slider, "Container");
}());