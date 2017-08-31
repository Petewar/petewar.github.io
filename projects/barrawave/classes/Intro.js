(function () {

    function Intro(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio
        this.lang = Ilang
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var aspectRatio;
    var data;
    var lang;

    //elements
    var buttonSkip;
    var buttonSkipBlue;
    var skipTxt;
    var skipTxtWhite;
    var timer;
    var arrow;
    var arrowBlue;
    var containerTextIcon;
    var totalWidth;

    var p = createjs.extend(Intro, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio
        lang = this.lang;

    };

    p.createVideo = function(){
        
        
    }

    p.addElements = function(Idata,Iarrow,IarrowBlue) {

        console.log("Intro - addElements");

        arrow = Iarrow;
        arrowBlue = IarrowBlue;
        containerTextIcon = new createjs.Container(); 

        instance.addEventListener("videoEnded", videoEndedHandler);

        video = new Video(Idata.video,instance,false);
        video.regX = 1920/2;
        video.regY = 1080/2;
        video.x = stage.canvas.width/2
        video.y = stage.canvas.height/2
        aspectRatio.resize(video,1600,1000,"more",100*ratio);
        instance.addChild(video);

        buttonSkip = new createjs.Shape();
        buttonSkip.graphics.beginFill("#ffffff").drawRect(0, 0, 262*ratio, 50*ratio);
        buttonSkip.x = stage.canvas.width-262*ratio;
        buttonSkip.y = stage.canvas.height-50*ratio;
        instance.addChild(buttonSkip);

        buttonSkipBlue = new createjs.Shape();
        buttonSkipBlue.graphics.beginFill("#4b7ea3").drawRect(0, 0, 262*ratio, 50*ratio);
        buttonSkipBlue.scaleX=0;
        buttonSkipBlue.x = stage.canvas.width-262*ratio;
        buttonSkipBlue.y = stage.canvas.height-50*ratio;
        instance.addChild(buttonSkipBlue);        

        skipTxt = new createjs.Text();
        skipTxt.font = "12px OpenSans-Semibold";
        skipTxt.textBaseline = "alphabetic";
        skipTxt.color = "#4b7ea3";
        skipTxt.text = Idata.skip[lang];
        skipTxt.scaleX = ratio;
        skipTxt.scaleY = ratio;
        containerTextIcon.addChild(skipTxt);

        totalWidth = skipTxt.getBounds().width*ratio+20*ratio+14*ratio;
        
        skipTxtWhite = new createjs.Text();
        skipTxtWhite.font = "12px OpenSans-Semibold";
        skipTxtWhite.textBaseline = "alphabetic";
        skipTxtWhite.color = "#ffffff";
        skipTxtWhite.text = Idata.skip[lang];
        skipTxtWhite.scaleX = ratio;
        skipTxtWhite.scaleY = ratio;
        skipTxtWhite.alpha = 0;
        containerTextIcon.addChild(skipTxtWhite);

        arrowBlue.x = skipTxt.getBounds().width*ratio+20*ratio
        arrowBlue.y = Math.floor(-9*ratio);
        containerTextIcon.addChild(arrowBlue);

        arrow.x = skipTxt.getBounds().width*ratio+20*ratio
        arrow.y = Math.floor(-9*ratio);
        arrow.alpha = 0;
        containerTextIcon.addChild(arrow);

        containerTextIcon.x = stage.canvas.width-262/2*ratio-totalWidth/2
        containerTextIcon.y = stage.canvas.height-50*ratio+skipTxt.getBounds().height/2*ratio+50/2*ratio;
        instance.addChild(containerTextIcon);

        addAnimation();
       
    } ;

    function removeElements(){

        console.log("Intro - removeElements")

        instance.removeChild(buttonSkip);
        buttonSkip = null;
        instance.removeChild(buttonSkipBlue);
        buttonSkipBlue = null;
        containerTextIcon.removeChild(skipTxt);
        skipTxt = null;
        containerTextIcon.removeChild(skipTxtWhite);
        skipTxtWhite = null;
        containerTextIcon.removeChild(arrow);
        arrow = null;
        containerTextIcon.removeChild(arrowBlue);
        arrowBlue = null;
        instance.removeChild(containerTextIcon);
        containerTextIcon = null;
        video.kill();
        instance.removeChild(video);
        video = null;

        instance.removeEventListener("videoEnded", videoEndedHandler);

        var customEvent = new createjs.Event("introComplete");
        customEvent.lang = lang;
        dispatchInstance.dispatchEvent(customEvent);

    }

    function videoEndedHandler(event){

        removeAnimation();
    }

    function addAnimation(){

        TweenMax.from(video, 5, {alpha:0,ease:Expo.easeInOut})
        TweenMax.from(buttonSkip, 1, {delay:0.7,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(skipTxt, 1, {delay:1,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(arrowBlue, 1, {delay:1,alpha:0,ease:Expo.easeInOut})

        timer = setTimeout(addHits, 3500);

    }

    function removeAnimation(event){

        TweenMax.to(buttonSkipBlue, 0.7, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(skipTxtWhite, 0.5, {alpha:0,ease:Expo.easeOut})

        TweenMax.to(buttonSkip, 0.7, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(skipTxt, 0.5, {alpha:0,ease:Expo.easeOut})

        TweenMax.to(arrow, 0.5, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(arrowBlue, 0.5, {alpha:0,ease:Expo.easeInOut})

        TweenMax.to(video, 2.5, {alpha:0,ease:Expo.easeInOut,onComplete:removeElements})

    }

    function addHits(){

        buttonSkip.name = "skip"
        buttonSkip.cursor = "pointer";
        buttonSkip.addEventListener("mouseover", handlerOver);
        buttonSkip.addEventListener("mouseout", handlerOut);
        buttonSkip.addEventListener("click", handlerClick);

    }

    function handlerOver(event){
        switch(event.target.name){
            case "skip":
                TweenMax.to(buttonSkipBlue, 0.5, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(skipTxtWhite, 0.5, {alpha:1,ease:Expo.easeInOut})
                TweenMax.to(arrow, 0.5, {alpha:1,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerOut(event){
        switch(event.target.name){
            case "skip":
                TweenMax.to(buttonSkipBlue, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(skipTxtWhite, 0.5, {alpha:0,ease:Expo.easeInOut})
                TweenMax.to(arrow, 0.5, {alpha:0,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerClick(event){

        removeHits();
        removeAnimation();

    }

    function removeHits(){

        buttonSkip.cursor = "auto";
        buttonSkip.removeEventListener("mouseover", handlerOver);
        buttonSkip.removeEventListener("mouseout", handlerOut);
        buttonSkip.removeEventListener("click", handlerClick);
    }

    p.getVideo = function() {
        return instance
    }

    p.resize = function() {

       if(video){
            video.regX = 1920/2;
            video.regY = 1080/2;
            video.x = stage.canvas.width/2
            video.y = stage.canvas.height/2
            aspectRatio.resize(video,1600,1000,"more",100*ratio);
       }

       if(buttonSkip){
            buttonSkip.x = stage.canvas.width-262*ratio;
            buttonSkip.y = stage.canvas.height-50*ratio;
       }

       if(buttonSkipBlue){
            buttonSkipBlue.x = stage.canvas.width-262*ratio;
            buttonSkipBlue.y = stage.canvas.height-50*ratio;
       }

       if(containerTextIcon){
            containerTextIcon.x = stage.canvas.width-262/2*ratio-totalWidth/2
            containerTextIcon.y = stage.canvas.height-50*ratio+skipTxt.getBounds().height/2*ratio+50/2*ratio;
       }

    } ; 

window.Intro = createjs.promote(Intro, "Container");
}());