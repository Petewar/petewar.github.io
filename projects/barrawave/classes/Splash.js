(function () {

    function Splash(IdispatchInstance,Iratio,IaspectRatio) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var aspectRatio;

    //props
    var lang;
    var data;

    //elements
    var cloudBg;
    var cloudPng;
    var cloudPngTwo;
    var logo;
    var containerTitle;
    var titleColorOneTxt;
    var buttonPt;
    var buttonPtBlue;
    var buttonEn;
    var buttonEnBlue;
    var ptTxt;
    var ptTxtWhite;
    var enTxt;
    var enTxtWhite;
    var totalWidth;
    var containerText;
    var containerIntro;
    var intro;
    var arrow;
    var arrowBlue;

    var p = createjs.extend(Splash, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;

    };

    p.addElements = function(IcloudPng,IcloudBg,IcloudPngTwo,Ilogo,Idata,Iarrow,IarrowBlue) {

        console.log("Splash - addElements")

        data = Idata;
        arrow = Iarrow;
        arrowBlue = IarrowBlue;

        cloudBg = IcloudBg;
        cloudBg.regX = 1920/2
        cloudBg.regY = 1080/2
        cloudBg.x = stage.canvas.width/2
        cloudBg.y = stage.canvas.height/2
        aspectRatio.resize(cloudBg,1920,1080,"more",50*ratio);
        instance.addChild(cloudBg)
       
        containerIntro = new createjs.Container();
        instance.addChild(containerIntro);
       
        cloudPng = IcloudPng;
        cloudPng.regX = 1920/2
        cloudPng.regY = 1080/2
        cloudPng.x = stage.canvas.width/2
        cloudPng.y = stage.canvas.height/2
        aspectRatio.resize(cloudPng,1920,1080);
        cloudPng.scaleX = 1.5*ratio,
        cloudPng.scaleY = 1.5*ratio,
        instance.addChild(cloudPng);

        cloudPngTwo = IcloudPngTwo;
        cloudPngTwo.regX = 1920/2
        cloudPngTwo.regY = 1080/2
        cloudPngTwo.x = stage.canvas.width/2
        cloudPngTwo.y = stage.canvas.height/2
        aspectRatio.resize(cloudPngTwo,1920,1080);
        cloudPng.scaleX = 1.5*ratio,
        cloudPng.scaleY = 1.5*ratio,
        instance.addChild(cloudPngTwo);

        container = new createjs.Container();

        containerText = new createjs.Container();
        totalWidth = 180*ratio+30*ratio+180*ratio

        logo = Ilogo

        if(ratio>1){
            logo.scaleX = ratio/2.5;
            logo.scaleY = ratio/2.5;
            logo.x = totalWidth/2-155/2*ratio
        }else{
            logo.scaleX = ratio/2;
            logo.scaleY = ratio/2;
            logo.x = totalWidth/2-200/2*ratio
        }
         
        container.addChild(logo)
        

        titleColorOneTxt = new createjs.Text();
        titleColorOneTxt.font = "30px PathwayGothicOne-Regular";
        titleColorOneTxt.textBaseline = "alphabetic";
        titleColorOneTxt.color = "#1c3b52";
        titleColorOneTxt.text = data.titleColorOne;
        titleColorOneTxt.scaleX = ratio;
        titleColorOneTxt.scaleY = ratio;
        containerText.addChild(titleColorOneTxt);
        
        titleColorTwoTxt = new createjs.Text();
        titleColorTwoTxt.font = "30px PathwayGothicOne-Regular";
        titleColorTwoTxt.textBaseline = "alphabetic";
        titleColorTwoTxt.color = "#4b7ea3";
        titleColorTwoTxt.text = data.titleColorTwo;
        titleColorTwoTxt.scaleX = ratio;
        titleColorTwoTxt.scaleY = ratio;
        titleColorTwoTxt.x = titleColorOneTxt.getBounds().width*ratio+5*ratio;
        containerText.addChild(titleColorTwoTxt);

        if(ratio>1)containerText.y = 75*ratio+60*ratio;
        else containerText.y = 95*ratio+60*ratio;
        containerText.x = totalWidth/2-((titleColorOneTxt.getBounds().width*ratio+titleColorTwoTxt.getBounds().width*ratio+5*ratio)/2)
        instance.addChild(containerText);
        container.addChild(containerText);

        buttonPt = new createjs.Shape();
        buttonPt.graphics.beginFill("#ffffff").drawRect(0, 0, 180*ratio, 50*ratio);
        buttonPt.y = containerText.y+30*ratio;
        container.addChild(buttonPt);

        buttonPtBlue = new createjs.Shape();
        buttonPtBlue.graphics.beginFill("#4b7ea3").drawRect(0, 0, 180*ratio, 50*ratio);
        buttonPtBlue.y = containerText.y+30*ratio;
        buttonPtBlue.scaleX=0;
        container.addChild(buttonPtBlue);
 
        ptTxt = new createjs.Text();
        ptTxt.font = "12px OpenSans-Semibold";
        ptTxt.textBaseline = "alphabetic";
        ptTxt.color = "#4b7ea3";
        ptTxt.text = data.langOne;
        ptTxt.scaleX = ratio;
        ptTxt.scaleY = ratio;
        ptTxt.x = buttonPt.x+180/2*ratio-ptTxt.getBounds().width/2*ratio
        ptTxt.y = buttonPt.y+ptTxt.getBounds().height/2*ratio+50/2*ratio;
        container.addChild(ptTxt);

        ptTxtWhite = new createjs.Text();
        ptTxtWhite.font = "12px OpenSans-Semibold";
        ptTxtWhite.textBaseline = "alphabetic";
        ptTxtWhite.color = "#ffffff";
        ptTxtWhite.text = data.langOne;
        ptTxtWhite.scaleX = ratio;
        ptTxtWhite.scaleY = ratio;
        ptTxtWhite.alpha = 0;
        ptTxtWhite.x = buttonPt.x+180/2*ratio-ptTxt.getBounds().width/2*ratio
        ptTxtWhite.y = buttonPt.y+ptTxt.getBounds().height/2*ratio+50/2*ratio;
        container.addChild(ptTxtWhite);

        buttonEn = new createjs.Shape();
        buttonEn.graphics.beginFill("#ffffff").drawRect(0, 0, 180*ratio, 50*ratio);
        buttonEn.x = 180*ratio+30*ratio
        buttonEn.y = containerText.y+30*ratio;
        container.addChild(buttonEn);

        buttonEnBlue = new createjs.Shape();
        buttonEnBlue.graphics.beginFill("#4b7ea3").drawRect(0, 0, 180*ratio, 50*ratio);
        buttonEnBlue.x = 180*ratio+30*ratio
        buttonEnBlue.y = containerText.y+30*ratio;
        buttonEnBlue.scaleX=0;
        container.addChild(buttonEnBlue);

        enTxt = new createjs.Text();
        enTxt.font = "12px OpenSans-Semibold";
        enTxt.textBaseline = "alphabetic";
        enTxt.color = "#4b7ea3";
        enTxt.text = data.langTwo;
        enTxt.scaleX = ratio;
        enTxt.scaleY = ratio;
        enTxt.x = buttonEn.x+180/2*ratio-enTxt.getBounds().width/2*ratio
        enTxt.y = buttonEn.y+enTxt.getBounds().height/2*ratio+50/2*ratio;
        container.addChild(enTxt);

        enTxtWhite = new createjs.Text();
        enTxtWhite.font = "12px OpenSans-Semibold";
        enTxtWhite.textBaseline = "alphabetic";
        enTxtWhite.color = "#ffffff";
        enTxtWhite.text = data.langTwo;
        enTxtWhite.scaleX = ratio;
        enTxtWhite.scaleY = ratio;
        enTxtWhite.alpha = 0;
        enTxtWhite.x = buttonEn.x+180/2*ratio-enTxt.getBounds().width/2*ratio
        enTxtWhite.y = buttonEn.y+enTxt.getBounds().height/2*ratio+50/2*ratio;
        container.addChild(enTxtWhite);

        container.x = stage.canvas.width/2-totalWidth/2
        container.y = stage.canvas.height/2-totalWidth/3
        instance.addChild(container);

        addAnimation();
        
    }

    function removeElements(){

        console.log("Splash - removeElements")

        container.removeChild(logo)
        logo = null
        containerText.removeChild(titleColorOneTxt);
        titleColorOneTxt=null
        containerText.removeChild(titleColorTwoTxt);
        titleColorTwoTxt = null
        container.removeChild(containerText);
        containerText = null
        container.removeChild(buttonPt);
        buttonPt= null
        container.removeChild(buttonPtBlue);
        buttonPtBlue = null
        container.removeChild(ptTxt);
        ptTxt = null
        container.removeChild(ptTxtWhite);
        ptTxtWhite = null
        container.removeChild(buttonEn);
        buttonEn = null
        container.removeChild(buttonEnBlue);
        buttonEnBlue = null
        container.removeChild(enTxt);
        enTxt = null
        container.removeChild(enTxtWhite);
        enTxtWhite = null
        instance.removeChild(container);
        container = null
    }

    function removeElementsComplete(){

        var customEvent = new createjs.Event("stopParallax");
        dispatchInstance.dispatchEvent(customEvent);

        instance.removeChild(cloudPng);
        cloudPng = null;
        instance.removeChild(cloudPngTwo);
        cloudPng = null;
        instance.removeChild(cloudBg);
        cloudBg = null;
    }

    function addAnimation(){

        TweenMax.from(logo, 1, {y:logo.y-50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerText, 1, {delay:0.5,y:containerText.y+50*ratio,alpha:0,ease:Expo.easeInOut})
        
        TweenMax.from(buttonPt, 1, {delay:0.7,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(ptTxt, 1, {delay:1,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(buttonEn, 1, {delay:1,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(enTxt, 1, {delay:1.3,alpha:0,ease:Expo.easeInOut,onComplete:addHits})

        TweenMax.from(container, 1, {y:container.y-100*ratio,ease:Expo.easeInOut})

    }

    function removeAnimation(event){

        if(event=="pt"){

            TweenMax.to(buttonPtBlue, 0.7, {scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(ptTxtWhite, 0.5, {alpha:0,ease:Expo.easeOut})

            TweenMax.to(buttonPt, 0.7, {scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(ptTxt, 0.5, {delay:0.3,alpha:0,ease:Expo.easeOut})

            TweenMax.to(buttonEn, 0.7, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(enTxt, 0.5, {delay:0.7,alpha:0,ease:Expo.easeOut})
        
        }else{

            TweenMax.to(buttonEnBlue, 0.7, {scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(enTxtWhite, 0.5, {delay:0.3,alpha:0,ease:Expo.easeOut})

            TweenMax.to(buttonEn, 0.7, {scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(enTxt, 0.5, {delay:0.3,alpha:0,ease:Expo.easeOut})

            TweenMax.to(buttonPt, 0.7, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(ptTxt, 0.5, {delay:0.7,alpha:0,ease:Expo.easeOut})

        }

        TweenMax.to(logo, 1, {delay:1,y:logo.y-50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(containerText, 1, {delay:1,y:containerText.y+50*ratio,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(container, 1, {delay:1,y:container.y-100*ratio,ease:Expo.easeInOut,onComplete:removeElements})

    }

    function addHits(){

        buttonEn.name = "en"
        buttonEn.cursor = "pointer";
        buttonEn.addEventListener("mouseover", handlerOver);
        buttonEn.addEventListener("mouseout", handlerOut);
        buttonEn.addEventListener("click", handlerClick);

        buttonPt.name = "pt"
        buttonPt.cursor = "pointer";
        buttonPt.addEventListener("mouseover", handlerOver);
        buttonPt.addEventListener("mouseout", handlerOut);
        buttonPt.addEventListener("click", handlerClick);

    }

    function removeHits(){

        buttonEn.cursor = "auto";
        buttonEn.removeEventListener("mouseover", handlerOver);
        buttonEn.removeEventListener("mouseout", handlerOut);
        buttonEn.removeEventListener("click", handlerClick);
        buttonPt.cursor = "auto";
        buttonPt.removeEventListener("mouseover", handlerOver);
        buttonPt.removeEventListener("mouseout", handlerOut);
        buttonPt.removeEventListener("click", handlerClick);

    }

    function handlerOver(event){
        switch(event.target.name){
            case "en":
                TweenMax.to(buttonEnBlue, 0.5, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(enTxtWhite, 0.5, {alpha:1,ease:Expo.easeInOut})
            break;
            case "pt":
                TweenMax.to(buttonPtBlue, 0.5, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(ptTxtWhite, 0.5, {alpha:1,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerOut(event){
        switch(event.target.name){
            case "en":
                TweenMax.to(buttonEnBlue, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(enTxtWhite, 0.5, {alpha:0,ease:Expo.easeInOut})
            break;
            case "pt":
                TweenMax.to(buttonPtBlue, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(ptTxtWhite, 0.5, {alpha:0,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerClick(event){

        switch(event.target.name){
            case "en":
                lang = 0
            break;
            case "pt":
                lang = 1
            break;
        }

        
        removeHits();
        removeAnimation(event.target.name);
        addIntro();

    }

    function addIntro(){

        intro = new Intro(dispatchInstance,ratio,aspectRatio,lang);
        intro.addElements(data,arrow,arrowBlue);
        containerIntro.addChild(intro);

        TweenMax.to(cloudPngTwo, 4, {delay:1,scaleX:5,scaleY:5,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(cloudPng, 4, {delay:1,scaleX:5,scaleY:5,alpha:0,ease:Expo.easeInOut,onComplete:removeElementsComplete})

    }

    p.getCloudPng = function() {
       return cloudPng;
    }

    p.getCloudPngTwo = function() {
       return cloudPngTwo;
    }

     p.getCloudBg = function() {
       return cloudBg;
    }

     p.getIntro = function() {
       return intro;
    }

    p.resize = function() {
        if(cloudBg){
            cloudBg.regX = 1920/2
            cloudBg.regY = 1080/2
            cloudBg.x = stage.canvas.width/2
            cloudBg.y = stage.canvas.height/2
            aspectRatio.resize(cloudBg,1920,1080,"more",50*ratio);
        }
        
        if(cloudPng){
            cloudPng.regX = 1920/2
            cloudPng.regY = 1080/2
            cloudPng.x = stage.canvas.width/2
            cloudPng.y = stage.canvas.height/2
            aspectRatio.resize(cloudPng,1920,1080);
            cloudPng.scaleX = 1.5*ratio;
            cloudPng.scaleY = 1.5*ratio;
        }

        if(cloudPngTwo){
            cloudPngTwo.regX = 1920/2
            cloudPngTwo.regY = 1080/2
            cloudPngTwo.x = stage.canvas.width/2
            cloudPngTwo.y = stage.canvas.height/2
            aspectRatio.resize(cloudPngTwo,1920,1080);
            cloudPngTwo.scaleX = 1.5*ratio;
            cloudPngTwo.scaleY = 1.5*ratio;
        }

        if(container){
            container.x = stage.canvas.width/2-totalWidth/2
            container.y = stage.canvas.height/2-totalWidth/3
        }

        if(intro){
            intro.resize();
        }
        
    } ;  

window.Splash = createjs.promote(Splash, "Container");
}());