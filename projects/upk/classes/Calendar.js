(function () {

    function Calendar(IdispatchInstance,Iratio,IaspectRatio,Isvg) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.svg = Isvg;
        this.aspectRatio = IaspectRatio
        this.setup();

    }
    
    var instance;
    var instanceRefresh
    var aspectRatio
    var ratio;
    var svg;
    var dispatchInstance

    var preloadData;
    var data;
    var timer
    var loader;
    var bgImageOne;
    var bgImageTwo;
    var bgImageThree;
    var parallax;
    var nextView;
    var nav

    var titleOnePosY;
    var titleOneWidth
    var descOnePosY;
    var buttonOnePosY;
    var shapeOnePosY;

    var titleTwoPosY;
    var descTwoPosY;
    var buttonTwoPosY;
    var shapeTwoPosY;

    var p = createjs.extend(Calendar, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh = instance
        ratio = this.ratio;
        dispatchInstance = this.dispatchInstance
        svg = this.svg;
        aspectRatio = this.aspectRatio

    }

    p.init = function() {
        if(data==null){
            preloadDataJson("data/calendar.json")
        }else{
            addElements();
            addAnimation();
            addParallax()

            timer = setTimeout(show, 10);
        }
    }

    function show(){
        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);
    }

    function preloadDataJson(Ijson){

        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        data = event.result.calendar[0]
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        loadImages(data.bgImages)
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles,ratio);
        loader.register(instance)
        instance.addEventListener("loaderComplete", loadImagesComplete);

    }

    function loadImagesComplete(evt) {

        console.log("Loader Images Homepage: "+evt.contentLoader.length);
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;

        bgImageOne = evt.contentLoader[0]
        bgImageTwo = evt.contentLoader[1]
        bgImageThree = evt.contentLoader[2]
        
        instance = instanceRefresh;

        addElements();
        addAnimation();
        addParallax();

        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);

    }

    function addElementsNextView(Iinstance){

        nextView = true;
        nav = Iinstance
        
        instance.getChildByName("containerImgBg").addChild(bgImageTwo);
        instance.getChildByName("calendarTitleText").text = data.serviceTitleNextView;
        instance.getChildByName("calendarDescText").text = data.serviceDescNextView;
        instance.getChildByName("containerButton").getChildByName("titleServices").text = data.formTitle;

        instance.removeChild(instance.getChildByName("shapeOne"));

        var shapeTwo = svg.createSvg(data.shapeTwo,"#333333")
        shapeTwo.alpha = 0.05
        shapeTwo.name = "shapeTwo"
        instance.addChild(shapeTwo);

        instance.getChildByName("calendarTitleText").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio-50*ratio
        instance.getChildByName("calendarDescText").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio-50*ratio+instance.getChildByName("calendarTitleText").getBounds().height*ratio-30*ratio+40*ratio

        instance.getChildByName("shapeTwo").x = instance.getChildByName("calendarTitleText").x-25*ratio
        instance.getChildByName("shapeTwo").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio-50*ratio-80*ratio
        
        instance.getChildByName("containerButton").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio-50*ratio+instance.getChildByName("calendarTitleText").getBounds().height*ratio-30*ratio+40*ratio+instance.getChildByName("calendarDescText").getBounds().height*ratio+50*ratio

        var boxGreenAnim = new createjs.Shape();
        boxGreenAnim.regX = Math.floor(stage.canvas.width/2)
        boxGreenAnim.x = Math.floor(stage.canvas.width/2)
        boxGreenAnim.name = "boxGreenAnim";
        boxGreenAnim.graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width/2), Math.floor(stage.canvas.width/2));
        instance.getChildByName("containerBox").addChild(boxGreenAnim);

        var boxGreenMask = new createjs.Shape();
        boxGreenMask.name = "boxGreenMask";
        boxGreenMask.graphics.beginFill("#333333").drawRect(0, 0, Math.floor(stage.canvas.width/2), Math.floor(stage.canvas.width/2));
        instance.getChildByName("containerBox").addChild(boxGreenMask);

        aspectRatio.resize(bgImageThree,bgImageThree.getBounds().width,bgImageThree.getBounds().height,"areaCalendar")
        instance.getChildByName("containerBox").addChild(bgImageThree);

        bgImageThree.mask = boxGreenMask

        var iconWhiteNext = svg.createSvg(data.shapeIcons[nav],"#FFFFFF")
        iconWhiteNext.name = "iconWhiteNext";
        iconWhiteNext.x = 110*ratio
        iconWhiteNext.y = 80*ratio
        instance.getChildByName("containerBox").addChild(iconWhiteNext);

        var shapeTextNext = new createjs.Text();
        shapeTextNext.name = "shapeTextNext";
        shapeTextNext.font = "13px BwModelica-Bold";
        shapeTextNext.textBaseline = "alphabetic";
        shapeTextNext.color = "#FFFFFF"
        if(ratio==1)shapeTextNext.lineWidth = 138*ratio
        if(ratio==2)shapeTextNext.lineWidth = 50*ratio
        shapeTextNext.lineHeight = 18;
        shapeTextNext.text = data.shapeTitles[nav];
        shapeTextNext.scaleX = ratio;
        shapeTextNext.scaleY = ratio;
        shapeTextNext.x = 110*ratio
        shapeTextNext.y = 110*ratio+30*ratio+25*ratio
        instance.getChildByName("containerBox").addChild(shapeTextNext);

        var posY = 110*ratio+30*ratio+25*ratio+60*ratio

        for(var i=0;i<data.shapeTitlesSevices[nav].length;i++){
            var shapeTitlesSevicesText = new createjs.Text();
            shapeTitlesSevicesText.name = "shapeTitlesSevicesText"+i;
            shapeTitlesSevicesText.font = "14px BwModelica-Regular";
            shapeTitlesSevicesText.textBaseline = "alphabetic";
            shapeTitlesSevicesText.color = "#FFFFFF"
            shapeTitlesSevicesText.text = data.shapeTitlesSevices[nav][i];
            shapeTitlesSevicesText.scaleX = ratio;
            shapeTitlesSevicesText.scaleY = ratio;
            shapeTitlesSevicesText.x = 110*ratio
            shapeTitlesSevicesText.y = posY+(20*ratio)*i
            instance.getChildByName("containerBox").addChild(shapeTitlesSevicesText);
        }

        instance.getChildByName("containerButton").getChildByName("greenCircle").type = "form";
    }

    function addAnimationNextView(){

        TweenMax.from(bgImageTwo, 1, {alpha:0,ease:Expo.easeInOut});

        TweenMax.from(instance.getChildByName("calendarTitleText"), 1, {y:titleOnePosY,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("calendarDescText"), 1, {y:descOnePosY,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerButton"), 1, {y:buttonOnePosY,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("shapeTwo"), 1, {y:shapeOnePosY,ease:Expo.easeInOut});

        TweenMax.from(instance.getChildByName("containerBox").getChildByName("boxGreenAnim"), 1, {scaleX:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerBox").getChildByName("boxGreenMask"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerBox").getChildByName("iconWhiteNext"), 1, {delay:1,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerBox").getChildByName("shapeTextNext"), 1, {delay:1.25,alpha:0,ease:Expo.easeInOut});

        for(var i=0;i<data.shapeTitlesSevices[nav].length;i++){
            TweenMax.from(instance.getChildByName("containerBox").getChildByName("shapeTitlesSevicesText"+i), 1, {delay:1.25,alpha:0,ease:Expo.easeInOut});
        }
    }

    function addElements(){

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);

        var containerImgBg = new createjs.Container();
        containerImgBg.name = "containerImgBg"
        instance.addChild(containerImgBg);

        containerImgBg.regX = 1690/2;
        containerImgBg.regY = 1050/2;
        containerImgBg.x = stage.canvas.width/2
        containerImgBg.y = stage.canvas.height/2
        aspectRatio.resize(containerImgBg,1680,1050,"more",100*ratio);
        containerImgBg.addChild(bgImageOne);

        var closeIcon = svg.createSvg(data.shapeClose,"#333333");
        closeIcon.name="closeIcon";
        closeIcon.x = 40*ratio
        closeIcon.y = 66*ratio
        instance.addChild(closeIcon);

        var closeIconHit = new createjs.Shape();
        closeIconHit.name = "closeIconHit";
        closeIconHit.alpha = 0.01
        closeIconHit.graphics.beginFill("#FFFFFF").drawRect(0, 0, 22*ratio, 22*ratio);
        closeIconHit.x = 40*ratio
        closeIconHit.y = 66*ratio
        instance.addChild(closeIconHit);

        var containerBox = new createjs.Container();
        containerBox.name="containerBox"
        containerBox.x = Math.floor(stage.canvas.width/2)
        instance.addChild(containerBox);        

        var j=0;
        var alphaValue = 0.7

        for(var i=0;i<data.shapeTitles.length;i++){
            
            var boxGreen = new createjs.Shape();
            boxGreen.name = "boxGreen"+i;
            boxGreen.scaleX = 0;
            boxGreen.graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width/4), Math.floor(stage.canvas.width/4));
            boxGreen.x = Math.floor((stage.canvas.width/4)*j)

            var boxWhite = new createjs.Shape();
            boxWhite.name = "boxWhite"+i;
            boxWhite.alpha = alphaValue
            boxWhite.alphaInstance = alphaValue
            alphaValue += 0.1
            boxWhite.graphics.beginFill("#ffffff").drawRect(0, 0, Math.floor(stage.canvas.width/4), Math.floor(stage.canvas.width/4));
            boxWhite.x = Math.floor((stage.canvas.width/4)*j)

            j++

            if(i>1){
                if(i==2)j=0
                boxGreen.x = Math.floor((stage.canvas.width/4)*j)
                boxGreen.y = Math.floor((stage.canvas.width/4))
                boxWhite.x = Math.floor((stage.canvas.width/4)*j)
                boxWhite.y = Math.floor((stage.canvas.width/4))
            }

            var iconGreen = svg.createSvg(data.shapeIcons[i],"#8EC640")
            iconGreen.name = "iconGreen"+i
            iconGreen.x = boxGreen.x+50*ratio
            iconGreen.y = boxGreen.y+80*ratio

            var iconWhite = svg.createSvg(data.shapeIcons[i],"#FFFFFF")
            iconWhite.name = "iconWhite"+i
            iconWhite.visible = false
            iconWhite.x = boxGreen.x+50*ratio
            iconWhite.y = boxGreen.y+80*ratio

            var shapeText = new createjs.Text();
            shapeText.name = "shapeText"+i;
            shapeText.font = "13px BwModelica-Bold";
            shapeText.textBaseline = "alphabetic";
            shapeText.color = "#333333"
            if(ratio==1)shapeText.lineWidth = 138*ratio
            if(ratio==2)shapeText.lineWidth = 50*ratio
            shapeText.lineHeight = 18;
            shapeText.text = data.shapeTitles[i];
            shapeText.scaleX = ratio;
            shapeText.scaleY = ratio;
            shapeText.x = iconGreen.x
            shapeText.y = iconGreen.y+58*ratio+25*ratio

            var stroke = new createjs.Shape();
            stroke.name = "stroke"+i;
            stroke.graphics.beginFill("#333333").drawRect(0, 0, 44*ratio, 4*ratio);
            stroke.x = shapeText.x
            stroke.y = shapeText.y+shapeText.getBounds().height*ratio
 
            containerBox.addChild(boxWhite);
            containerBox.addChild(boxGreen);
            containerBox.addChild(iconGreen);
            containerBox.addChild(iconWhite);
            containerBox.addChild(shapeText);
            containerBox.addChild(stroke);

        }

        var calendarTitleText = new createjs.Text();
        calendarTitleText.name = "calendarTitleText";
        calendarTitleText.font = "36px BwModelica-ExtraBold";
        calendarTitleText.textBaseline = "alphabetic";
        calendarTitleText.color = "#333333"
        if(ratio==1)calendarTitleText.lineWidth = 280*ratio
        if(ratio==2)calendarTitleText.lineWidth = 140*ratio
        calendarTitleText.lineHeight = 40;
        calendarTitleText.text = data.calendarTitle;
        calendarTitleText.scaleX = ratio;
        calendarTitleText.scaleY = ratio;
        calendarTitleText.x = stage.canvas.width/2-stage.canvas.width/4-calendarTitleText.getBounds().width/2*ratio
        calendarTitleText.y = stage.canvas.height/4+calendarTitleText.getBounds().height/2*ratio
        titleOnePosY = stage.canvas.height/4+calendarTitleText.getBounds().height/2*ratio
        titleOneWidth = calendarTitleText.getBounds().width*ratio

        var shapeOne = svg.createSvg(data.shapeOne,"#333333")
        shapeOne.alpha = 0.05
        shapeOne.name = "shapeOne"
        shapeOne.x = calendarTitleText.x-25*ratio
        shapeOne.y = calendarTitleText.y-80*ratio
        shapeOnePosY = calendarTitleText.y-80*ratio

        var calendarDescText = new createjs.Text();
        calendarDescText.name = "calendarDescText";
        calendarDescText.font = "14px BwModelica-Regular";
        calendarDescText.textBaseline = "alphabetic";
        calendarDescText.color = "#333333"
        if(ratio==1)calendarDescText.lineWidth = 280*ratio
        if(ratio==2)calendarDescText.lineWidth = 140*ratio
        calendarDescText.lineHeight = 30;
        calendarDescText.text = data.calendarDesc;
        calendarDescText.scaleX = ratio;
        calendarDescText.scaleY = ratio;
        calendarDescText.x = calendarTitleText.x
        calendarDescText.y = calendarTitleText.y+calendarTitleText.getBounds().height*ratio-30*ratio+40*ratio
        descOnePosY = calendarTitleText.y+calendarTitleText.getBounds().height*ratio-30*ratio+40*ratio

        var containerButton = new createjs.Container();
        containerButton.name = "containerButton";
        containerButton.x = calendarTitleText.x+30*ratio
        containerButton.y = calendarDescText.y+calendarDescText.getBounds().height*ratio+50*ratio
        buttonOnePosY = calendarDescText.y+calendarDescText.getBounds().height*ratio+50*ratio

        var greenCircle = new createjs.Shape();
        greenCircle.name = "greenCircle"
        greenCircle.graphics.beginFill("#8EC640").drawCircle(0,0,30*ratio);
        
        var containerButtonFeature = new createjs.Container();
        containerButtonFeature.name = "containerButtonFeature";
        containerButtonFeature.x = -30*ratio
        containerButtonFeature.y = -5*ratio
        
        var shapeArrow = svg.createSvg(data.arrowShape,"#FFFFFF")
        shapeArrow.name = "shapeArrow"
        shapeArrow.x = -20*ratio

        var maskButton = new createjs.Shape();
        maskButton.name = "maskButton"
        maskButton.graphics.beginFill("#FFFFFF").drawRect(0, 0, 120*ratio, 28*ratio);
        maskButton.alpha = 0.01;

        shapeArrow.mask = maskButton;

        var titleServices = new createjs.Text();
        titleServices.name = "titleServices";
        titleServices.font = "11px BwModelica-Bold";
        titleServices.textBaseline = "alphabetic";
        titleServices.color = "#8EC640"
        if(ratio==1)titleServices.lineWidth = 120*ratio
        if(ratio==2)titleServices.lineWidth = 60*ratio
        titleServices.lineHeight = 15;
        titleServices.text = data.serviceTitle;
        titleServices.scaleX = ratio;
        titleServices.scaleY = ratio;
        titleServices.x = 30*ratio+20*ratio
        titleServices.y = -2*ratio

        instance.addChild(shapeOne);
        instance.addChild(calendarTitleText);
        instance.addChild(calendarDescText);
        containerButtonFeature.addChild(shapeArrow);
        containerButton.addChild(containerButtonFeature);
        containerButtonFeature.addChild(maskButton);
        containerButton.addChild(greenCircle);
        containerButton.addChild(containerButtonFeature);
        instance.addChild(containerButton);
        containerButton.addChild(titleServices);

    }

    function addAnimation(){

       TweenMax.from(instance.getChildByName("bg"), 0.75, {scaleX:0,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("closeIcon"), 1, {alpha:0,rotation:180,ease:Expo.easeInOut});
       TweenMax.from(bgImageOne, 1, {alpha:0,ease:Expo.easeInOut});
       TweenMax.from(instance.getChildByName("calendarTitleText"), 1, {y:instance.getChildByName("calendarTitleText").y+100*ratio,alpha:0,ease:Expo.easeInOut});
       TweenMax.from(instance.getChildByName("calendarDescText"), 1, {y:instance.getChildByName("calendarDescText").y+300*ratio,alpha:0,ease:Expo.easeInOut});
       TweenMax.from(instance.getChildByName("shapeOne"), 1, {delay:0.5,alpha:0,ease:Expo.easeInOut});
       TweenMax.from(instance.getChildByName("containerButton"), 1, {y:instance.getChildByName("containerButton").y+20*ratio,delay:0.5,alpha:0,ease:Expo.easeInOut,onComplete:addHits()});


       for(var i=0;i<data.shapeTitles.length;i++){
            TweenMax.from(instance.getChildByName("containerBox").getChildByName("boxWhite"+i), 0.5*(i+1), {delay:0.75,scaleX:0,ease:Expo.easeInOut});
            TweenMax.from(instance.getChildByName("containerBox").getChildByName("iconGreen"+i), 0.5*(i+1), {y:instance.getChildByName("containerBox").getChildByName("iconGreen"+i).y-20*ratio,delay:1,alpha:0,ease:Expo.easeInOut});
            TweenMax.from(instance.getChildByName("containerBox").getChildByName("shapeText"+i), 0.3*(i+1), {y:instance.getChildByName("containerBox").getChildByName("shapeText"+i).y+20*ratio,delay:1,alpha:0,ease:Expo.easeInOut});
            TweenMax.from(instance.getChildByName("containerBox").getChildByName("stroke"+i), 0.5*(i+1), {y:instance.getChildByName("containerBox").getChildByName("stroke"+i).y+20*ratio,delay:1.25,scaleX:0,ease:Expo.easeInOut});
       }
    }

    function removeHitsMenu(){
        for(var i=0;i<data.shapeTitles.length;i++){
            
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).cursor = "auto";
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).removeEventListener("mouseover", handlerOver);
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).removeEventListener("mouseout", handlerOut)
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).removeEventListener("click", handlerClick);

        }
    }

    function addHitsMenu(){
        for(var i=0;i<data.shapeTitles.length;i++){
            
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).addEventListener("mouseover", handlerOver);
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).addEventListener("mouseout", handlerOut)
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).addEventListener("click", handlerClick);
        }
    }

    function addHits(){

        instance.getChildByName("bg").cursor = "auto";
        instance.getChildByName("bg").type = "block";
        instance.getChildByName("bg").addEventListener("mouseover", handlerOver);

        instance.getChildByName("closeIconHit").cursor = "pointer";
        instance.getChildByName("closeIconHit").type = "close";
        instance.getChildByName("closeIconHit").addEventListener("mouseover", handlerOver);
        instance.getChildByName("closeIconHit").addEventListener("mouseout", handlerOut)
        instance.getChildByName("closeIconHit").addEventListener("click", handlerClick);

        instance.getChildByName("containerButton").getChildByName("greenCircle").cursor = "pointer";
        instance.getChildByName("containerButton").getChildByName("greenCircle").type = "services";
        instance.getChildByName("containerButton").getChildByName("greenCircle").addEventListener("mouseover", handlerOver);
        instance.getChildByName("containerButton").getChildByName("greenCircle").addEventListener("mouseout", handlerOut)
        instance.getChildByName("containerButton").getChildByName("greenCircle").addEventListener("click", handlerClick);

        for(var i=0;i<data.shapeTitles.length;i++){
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).cursor = "pointer";
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).type = "box";
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).instance = i
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).addEventListener("mouseover", handlerOver);
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).addEventListener("mouseout", handlerOut)
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).addEventListener("click", handlerClick);
        }
    }

    function addParallax(){
        stage.setBounds(0,0,stage.canvas.width,stage.canvas.height);
        parallax = new zim.Parallax(stage, .1, [{obj:instance.getChildByName("containerImgBg"), prop:"x", propChange:-15}]);
    }

    function handlerOver(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":

            break;

            case "box":
                TweenMax.to(instance.getChildByName("containerBox").getChildByName("boxGreen"+event.target.instance), 0.5, {scaleX:1,ease:Expo.easeInOut})
                instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance).graphics.clear()
                instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance).graphics.beginFill("#FFFFFF").drawRect(0, 0, 44*ratio, 4*ratio);
                TweenMax.to(instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance), 0.5, {scaleX:2,ease:Expo.easeInOut})
                instance.getChildByName("containerBox").getChildByName("shapeText"+event.target.instance).color = "#ffffff"
                instance.getChildByName("containerBox").getChildByName("iconGreen"+event.target.instance).visible = false
                instance.getChildByName("containerBox").getChildByName("iconWhite"+event.target.instance).visible = true
                TweenMax.from(instance.getChildByName("containerBox").getChildByName("iconWhite"+event.target.instance), 0.5, {alpha:0,ease:Expo.easeInOut})
            break;

            case "services":
                TweenMax.to(instance.getChildByName("containerButton").getChildByName("greenCircle"), 0.5, {scaleX:1.2,scaleY:1.2,ease:Expo.easeInOut})
                TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature"), 0.5, {x:-36*ratio,scaleY:1.2,ease:Expo.easeInOut})
                TweenMax.to(instance.getChildByName("containerButton").getChildByName("titleServices"), 0.5, {x:60*ratio,ease:Expo.easeInOut})
                TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature").getChildByName("shapeArrow"), 0.5, {x:0,ease:Expo.easeInOut})
            break;

             case "form":
                TweenMax.to(instance.getChildByName("containerButton").getChildByName("greenCircle"), 0.5, {scaleX:1.2,scaleY:1.2,ease:Expo.easeInOut})
                TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature"), 0.5, {x:-36*ratio,scaleY:1.2,ease:Expo.easeInOut})
                TweenMax.to(instance.getChildByName("containerButton").getChildByName("titleServices"), 0.5, {x:60*ratio,ease:Expo.easeInOut})
                TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature").getChildByName("shapeArrow"), 0.5, {x:0,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerOut(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
              
            break;
            case "box":
                TweenMax.to(instance.getChildByName("containerBox").getChildByName("boxGreen"+event.target.instance), 0.5, {scaleX:0,ease:Expo.easeInOut})
                instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance).graphics.clear()
                instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance).graphics.beginFill("#333333").drawRect(0, 0, 44*ratio, 4*ratio);
                TweenMax.to(instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance), 0.5, {scaleX:1,ease:Expo.easeInOut})
                instance.getChildByName("containerBox").getChildByName("shapeText"+event.target.instance).color = "#333333"
                instance.getChildByName("containerBox").getChildByName("iconGreen"+event.target.instance).visible = true
                instance.getChildByName("containerBox").getChildByName("iconWhite"+event.target.instance).visible = false
                TweenMax.from(instance.getChildByName("containerBox").getChildByName("iconGreen"+event.target.instance), 0.5, {alpha:0,ease:Expo.easeInOut})
            break;  
            case "services":
               TweenMax.to(instance.getChildByName("containerButton").getChildByName("greenCircle"), 0.5, {scaleX:1,scaleY:1,ease:Expo.easeInOut})
               TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature"), 0.5, {x:-30*ratio,scaleY:1.2,ease:Expo.easeInOut})
               TweenMax.to(instance.getChildByName("containerButton").getChildByName("titleServices"), 0.6, {x:50*ratio,ease:Expo.easeInOut})
               TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature").getChildByName("shapeArrow"), 0.5, {x:-20*ratio,ease:Expo.easeInOut})
            break;
            case "form":
               TweenMax.to(instance.getChildByName("containerButton").getChildByName("greenCircle"), 0.5, {scaleX:1,scaleY:1,ease:Expo.easeInOut})
               TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature"), 0.5, {x:-30*ratio,scaleY:1.2,ease:Expo.easeInOut})
               TweenMax.to(instance.getChildByName("containerButton").getChildByName("titleServices"), 0.6, {x:50*ratio,ease:Expo.easeInOut})
               TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature").getChildByName("shapeArrow"), 0.5, {x:-20*ratio,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerClick(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
                 SWFAddress.setValue("/home");
            break;

            case "box":

                TweenMax.to(instance.getChildByName("containerBox").getChildByName("boxGreen"+event.target.instance), 0.5, {scaleX:0,ease:Expo.easeInOut})
                instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance).graphics.clear()
                instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance).graphics.beginFill("#333333").drawRect(0, 0, 44*ratio, 4*ratio);
                TweenMax.to(instance.getChildByName("containerBox").getChildByName("stroke"+event.target.instance), 0.5, {scaleX:1,ease:Expo.easeInOut})
                instance.getChildByName("containerBox").getChildByName("shapeText"+event.target.instance).color = "#333333"
                instance.getChildByName("containerBox").getChildByName("iconGreen"+event.target.instance).visible = true
                instance.getChildByName("containerBox").getChildByName("iconWhite"+event.target.instance).visible = false
                TweenMax.from(instance.getChildByName("containerBox").getChildByName("iconGreen"+event.target.instance), 0.5, {alpha:0,ease:Expo.easeInOut})                

                addElementsNextView(event.target.instance)
                addAnimationNextView();
                removeHitsMenu();

            break;

            case "services":

                instance.getChildByName("containerButton").getChildByName("greenCircle").removeEventListener("mouseover", handlerOver);
                instance.getChildByName("containerButton").getChildByName("greenCircle").removeEventListener("mouseout", handlerOut)
                instance.getChildByName("containerButton").getChildByName("greenCircle").removeEventListener("click", handlerClick);

                SWFAddress.setValue("/servicos");

            break;

            case "form":

               

            break;

        }
    }

    p.kill = function() {

        if(parallax!=undefined){
            parallax.dispose();
            parallax = undefined
        }

        if(nextView){

            instance.getChildByName("containerBox").removeChild(instance.getChildByName("boxGreenAnim"));
            instance.getChildByName("containerBox").removeChild(instance.getChildByName("boxGreenMask"));
            instance.getChildByName("containerBox").removeChild(instance.getChildByName("bgImageThree"));
            instance.getChildByName("containerBox").removeChild(instance.getChildByName("iconWhiteNext"));
            instance.getChildByName("containerImgBg").removeChild(bgImageTwo)
            instance.removeChild(instance.getChildByName("shapeTwo"));

            for(var i=0;i<data.shapeTitlesSevices[nav].length;i++){
                    instance.getChildByName("containerBox").removeChild("shapeTitlesSevicesText"+i);
            }

        }else{

            instance.getChildByName("containerImgBg").removeChild(bgImageOne)
            instance.removeChild(instance.getChildByName("shapeOne"));
            
        }
        
        instance.removeChild(instance.getChildByName("containerImgBg"));
        nextView = false

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").removeEventListener("mouseover", handlerOver);
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("closeIconHit").graphics.clear();
        instance.getChildByName("closeIconHit").removeEventListener("mouseover", handlerOver);
        instance.getChildByName("closeIconHit").removeEventListener("mouseout", handlerOut)
        instance.getChildByName("closeIconHit").removeEventListener("click", handlerClick);
        instance.removeChild(instance.getChildByName("closeIconHit"));

        instance.removeChild(instance.getChildByName("closeIcon"));

        for(var i=0;i<data.shapeTitles.length;i++){
            
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).removeEventListener("mouseover", handlerOver);
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).removeEventListener("mouseout", handlerOut)
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).removeEventListener("click", handlerClick);

            instance.getChildByName("containerBox").removeChild(instance.getChildByName("containerBox").getChildByName("boxGreen"+i))
            instance.getChildByName("containerBox").removeChild(instance.getChildByName("containerBox").getChildByName("boxWhite"+i))
            instance.getChildByName("containerBox").removeChild(instance.getChildByName("containerBox").getChildByName("iconGreen"+i))
            instance.getChildByName("containerBox").removeChild(instance.getChildByName("containerBox").getChildByName("shapeText"+i))
            instance.getChildByName("containerBox").removeChild(instance.getChildByName("containerBox").getChildByName("stroke"+i))
        }

        instance.removeChild(instance.getChildByName("calendarTitleText"));
        instance.removeChild(instance.getChildByName("calendarDescText"));
        instance.getChildByName("containerButton").getChildByName("containerButtonFeature").removeChild(instance.getChildByName("containerButton").getChildByName("containerButtonFeature").getChildByName("shapeArrow"));
        instance.getChildByName("containerButton").getChildByName("containerButtonFeature").removeChild(instance.getChildByName("containerButton").getChildByName("containerButtonFeature").getChildByName("maskButton"));
        instance.getChildByName("containerButton").removeChild(instance.getChildByName("containerButton").getChildByName("containerButtonFeature"));
        instance.getChildByName("containerButton").removeChild(instance.getChildByName("containerButton").getChildByName("greenCircle"));
        instance.getChildByName("containerButton").removeChild(instance.getChildByName("containerButton").getChildByName("titleServices"));
        instance.removeChild(instance.getChildByName("containerButton"));
    
        instance.removeChild(instance.getChildByName("containerBox"))

    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        instance.getChildByName("closeIcon").x = 40*ratio
        instance.getChildByName("closeIcon").y = 66*ratio

        instance.getChildByName("closeIconHit").x = 40*ratio
        instance.getChildByName("closeIconHit").y = 66*ratio

        instance.getChildByName("containerBox").x = Math.floor(stage.canvas.width/2);

        var j=0;

        for(var i=0;i<data.shapeTitles.length;i++){
            
            instance.getChildByName("containerBox").getChildByName("boxGreen"+i).graphics.clear();
            instance.getChildByName("containerBox").getChildByName("boxGreen"+i).graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width/4), Math.floor(stage.canvas.width/4));
            instance.getChildByName("containerBox").getChildByName("boxGreen"+i).x = Math.floor((stage.canvas.width/4)*j)

            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).graphics.clear();
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).graphics.beginFill("#FFFFFF").drawRect(0, 0, Math.floor(stage.canvas.width/4), Math.floor(stage.canvas.width/4));
            instance.getChildByName("containerBox").getChildByName("boxWhite"+i).x = Math.floor((stage.canvas.width/4)*j)

            j++

            if(i>1){
                if(i==2)j=0
                instance.getChildByName("containerBox").getChildByName("boxGreen"+i).x = Math.floor((stage.canvas.width/4)*j)
                instance.getChildByName("containerBox").getChildByName("boxGreen"+i).y = Math.floor((stage.canvas.width/4))

                instance.getChildByName("containerBox").getChildByName("boxWhite"+i).x = Math.floor((stage.canvas.width/4)*j)
                instance.getChildByName("containerBox").getChildByName("boxWhite"+i).y = Math.floor((stage.canvas.width/4))
            }

            instance.getChildByName("containerBox").getChildByName("iconGreen"+i).x = instance.getChildByName("containerBox").getChildByName("boxGreen"+i).x+50*ratio
            instance.getChildByName("containerBox").getChildByName("iconGreen"+i).y = instance.getChildByName("containerBox").getChildByName("boxGreen"+i).y+80*ratio

            instance.getChildByName("containerBox").getChildByName("iconWhite"+i).x = instance.getChildByName("containerBox").getChildByName("boxGreen"+i).x+50*ratio
            instance.getChildByName("containerBox").getChildByName("iconWhite"+i).y = instance.getChildByName("containerBox").getChildByName("boxGreen"+i).y+80*ratio

            instance.getChildByName("containerBox").getChildByName("shapeText"+i).x = instance.getChildByName("containerBox").getChildByName("iconGreen"+i).x
            instance.getChildByName("containerBox").getChildByName("shapeText"+i).y = instance.getChildByName("containerBox").getChildByName("iconGreen"+i).y+58*ratio+25*ratio

            instance.getChildByName("containerBox").getChildByName("shapeText"+i).x = instance.getChildByName("containerBox").getChildByName("iconWhite"+i).x
            instance.getChildByName("containerBox").getChildByName("shapeText"+i).y = instance.getChildByName("containerBox").getChildByName("iconWhite"+i).y+58*ratio+25*ratio

            instance.getChildByName("containerBox").getChildByName("stroke"+i).x = instance.getChildByName("containerBox").getChildByName("shapeText"+i).x
            instance.getChildByName("containerBox").getChildByName("stroke"+i).y = instance.getChildByName("containerBox").getChildByName("shapeText"+i).y+instance.getChildByName("containerBox").getChildByName("shapeText"+i).getBounds().height*ratio
        }

            instance.getChildByName("calendarTitleText").x = stage.canvas.width/2-stage.canvas.width/4-titleOneWidth/2
            instance.getChildByName("calendarDescText").x = instance.getChildByName("calendarTitleText").x
            instance.getChildByName("containerButton").x = instance.getChildByName("calendarTitleText").x+30*ratio

        if(nextView){

            instance.getChildByName("calendarTitleText").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio-50*ratio
            instance.getChildByName("calendarDescText").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio-50*ratio+instance.getChildByName("calendarTitleText").getBounds().height*ratio-30*ratio+40*ratio

            instance.getChildByName("shapeTwo").x = instance.getChildByName("calendarTitleText").x-25*ratio
            instance.getChildByName("shapeTwo").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio-50*ratio-80*ratio
        
            instance.getChildByName("containerButton").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio-50*ratio+instance.getChildByName("calendarTitleText").getBounds().height*ratio-30*ratio+40*ratio+instance.getChildByName("calendarDescText").getBounds().height*ratio+50*ratio

            instance.getChildByName("containerBox").getChildByName("boxGreenAnim").graphics.clear();
            instance.getChildByName("containerBox").getChildByName("boxGreenAnim").x = Math.floor(stage.canvas.width/2)
            instance.getChildByName("containerBox").getChildByName("boxGreenAnim").regX = Math.floor(stage.canvas.width/2)
            instance.getChildByName("containerBox").getChildByName("boxGreenAnim").graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width/2), Math.floor(stage.canvas.width/2));

            instance.getChildByName("containerBox").getChildByName("boxGreenMask").graphics.clear();
            instance.getChildByName("containerBox").getChildByName("boxGreenMask").graphics.beginFill("#333333").drawRect(0, 0, Math.floor(stage.canvas.width/2), Math.floor(stage.canvas.width/2));

            aspectRatio.resize(bgImageThree,bgImageThree.getBounds().width,bgImageThree.getBounds().height,"areaCalendar")

        }else{
            
            instance.getChildByName("calendarTitleText").y = stage.canvas.height/4+instance.getChildByName("calendarTitleText").getBounds().height/2*ratio
            instance.getChildByName("calendarDescText").y = instance.getChildByName("calendarTitleText").y+instance.getChildByName("calendarTitleText").getBounds().height*ratio-30*ratio+40*ratio

            instance.getChildByName("shapeOne").x = instance.getChildByName("calendarTitleText").x-25*ratio
            instance.getChildByName("shapeOne").y = instance.getChildByName("calendarTitleText").y-80*ratio
            
            instance.getChildByName("containerButton").y = instance.getChildByName("calendarDescText").y+instance.getChildByName("calendarDescText").getBounds().height*ratio+50*ratio
        }



        instance.getChildByName("containerImgBg").regX = 1690/2;
        instance.getChildByName("containerImgBg").regY = 1050/2;
        instance.getChildByName("containerImgBg").x = stage.canvas.width/2
        instance.getChildByName("containerImgBg").y = stage.canvas.height/2
        aspectRatio.resize(instance.getChildByName("containerImgBg"),1680,1050,"more",100*ratio);

    } ; 


window.Calendar = createjs.promote(Calendar, "Container");
}());