(function () {

    function View(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.lang = Ilang;
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var aspectRatio;
    var lang

    //elements
    var bgImage;
    var imageOne;
    var imageTwo;
    var containerTitleText;
    var titleOneTxt;
    var titleTwoTxt;
    var shapeTitles;
    var hotSpotOne;
    var hotSpotTwo;
    var hotSpotThree;
    var hotSpotTour;
    var hotSpotFeature
    var overlayBlock;
    var data;
    var toolTip;
    var refreshHotspot
    var refreshCloneContainer
    var refreshData;
    var containerTour;
    var tour;
    var scaleFactor;
    var type;
    var video;
    var videoFx
    var containerFeature;
    var fx;
    var labelTour;
    var labelFeature;
    var colorAnimHotSpot
    var colorAnimFeature
    var videoFirstFrame
    var instanceNav;
    var imageFeature;

    //props
    var iconHotSpot;
    var iconVideoHotSpot

    var p = createjs.extend(View, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        lang = this.lang;

        instance.addEventListener("startTour", startTourHandler);
        instance.addEventListener("ResetView", resetAnimation);

        containerTour = new createjs.Container;
        instance.addChild(containerTour);

        containerFeature = new createjs.Container;
        instance.addChild(containerFeature);

    };

    p.updateViewPos = function() {

        bgImage.x = stage.canvas.width/2
        bgImage.y = stage.canvas.height/2

        imageOne.regX = imageOne.getBounds().width/2
        imageOne.regY = imageOne.getBounds().height/2
        imageOne.x = setParalalx(data.parallaxOne[1]).pos
        imageOne.y = setParalalx(data.parallaxOne[2]).pos
        aspectRatio.resize(imageOne,imageOne,imageOne.getBounds().height);
        
        imageTwo.regX = imageTwo.getBounds().width/2
        imageTwo.regY = imageTwo.getBounds().height/2
        imageTwo.x = setParalalx(data.parallaxTwo[1]).pos
        imageTwo.y = setParalalx(data.parallaxTwo[2]).pos
        aspectRatio.resize(imageTwo,imageTwo,imageTwo.getBounds().height);
        
        hotSpotOne.x = setHotSpot(data.hotSpotOne).posX
        hotSpotOne.y = setHotSpot(data.hotSpotOne).posY

        hotSpotTwo.x = setHotSpot(data.hotSpotTwo).posX
        hotSpotTwo.y = setHotSpot(data.hotSpotTwo).posY

        hotSpotThree.x = setHotSpot(data.hotSpotThree).posX
        hotSpotThree.y = setHotSpot(data.hotSpotThree).posY

        if(iconHotSpot!=null){
            hotSpotTour.x = setHotSpot(data.hotSpotTour).posX
            hotSpotTour.y = setHotSpot(data.hotSpotTour).posY
        }

        if(iconVideoHotSpot){
            hotSpotFeature.x = setHotSpot(data.hotSpotFeature).posX
            hotSpotFeature.y = setHotSpot(data.hotSpotFeature).posY
        }
       
    }

    p.addElements = function(Images,Idata,IiconHotSpot,IiconVideoHotSpot,Ifx,IlabelIconHotspot,IlabelVideoHotspot,IlabelImageHotspot,Inav) {

        data = Idata
        iconHotSpot = IiconHotSpot;
        iconVideoHotSpot = IiconVideoHotSpot;
        fx = Ifx
        labelTour = IlabelIconHotspot
        instanceNav = Inav;

        if(instanceNav==6)labelFeature = IlabelImageHotspot
        else labelFeature = IlabelVideoHotspot

        bgImage = Images[0];
        bgImage.regX = 2048/2
        bgImage.regY = 1080/2
        bgImage.x = stage.canvas.width/2
        bgImage.y = stage.canvas.height/2
        aspectRatio.resize(bgImage,bgImage.getBounds().width,bgImage.getBounds().height,"more",100*ratio);
        scaleFactor = aspectRatio.getScalingFactor();

        imageOne = Images[1];
        imageOne.regX = imageOne.getBounds().width/2
        imageOne.regY = imageOne.getBounds().height/2
        imageOne.x = setParalalx(data.parallaxOne[1]).pos
        imageOne.y = setParalalx(data.parallaxOne[2]).pos
        aspectRatio.resize(imageOne,imageOne,imageOne.getBounds().height);

        imageTwo = Images[2];
        imageTwo.regX = imageTwo.getBounds().width/2
        imageTwo.regY = imageTwo.getBounds().height/2
        imageTwo.x = setParalalx(data.parallaxTwo[1]).pos
        imageTwo.y = setParalalx(data.parallaxTwo[2]).pos
        aspectRatio.resize(imageTwo,imageTwo,imageTwo.getBounds().height);

        containerTitleText = new createjs.Container();

        titleOneTxt = new createjs.Text();
        titleOneTxt.font = "120px PathwayGothicOne-Regular";
        titleOneTxt.textBaseline = "alphabetic";
        titleOneTxt.color = "#FFFFFF";
        titleOneTxt.text = data.titleOne[lang];
        titleOneTxt.scaleX = ratio;
        titleOneTxt.scaleY = ratio;
        titleOneTxt.y = titleOneTxt.getBounds().height*ratio
        containerTitleText.addChild(titleOneTxt);

        titleTwoTxt = new createjs.Text();
        titleTwoTxt.font = "120px PathwayGothicOne-Regular";
        titleTwoTxt.textBaseline = "alphabetic";
        titleTwoTxt.color = "#FFFFFF";
        titleTwoTxt.text = data.titleTwo[lang];
        titleTwoTxt.scaleX = ratio;
        titleTwoTxt.scaleY = ratio;
        titleOneTxt.x = titleTwoTxt.getBounds().width/2*ratio-titleOneTxt.getBounds().width/2*ratio
        titleTwoTxt.y = titleOneTxt.y+titleOneTxt.getBounds().height*ratio+35*ratio
        containerTitleText.addChild(titleTwoTxt);

        shapeTitles = new createjs.Shape();
        shapeTitles.graphics.beginFill("#FFFFFF").drawRect(0, 0, titleTwoTxt.getBounds().width*ratio, 12*ratio);
        shapeTitles.y = titleTwoTxt.y+25*ratio
        containerTitleText.addChild(shapeTitles)

        containerTitleText.x = stage.canvas.width/2-titleTwoTxt.getBounds().width/2*ratio
        containerTitleText.y = stage.canvas.height/2-(shapeTitles.y+12*ratio)/2

        hotSpotOne = generateHotSpot("default",data.hotSpotOne);
        hotSpotOne.x = setHotSpot(data.hotSpotOne).posX
        hotSpotOne.y = setHotSpot(data.hotSpotOne).posY

        hotSpotTwo = generateHotSpot("default",data.hotSpotTwo);
        hotSpotTwo.x = setHotSpot(data.hotSpotTwo).posX
        hotSpotTwo.y = setHotSpot(data.hotSpotTwo).posY

        hotSpotThree = generateHotSpot("default",data.hotSpotThree);
        hotSpotThree.x = setHotSpot(data.hotSpotThree).posX
        hotSpotThree.y = setHotSpot(data.hotSpotThree).posY

        instance.addChild(bgImage)
        instance.addChild(imageOne)
        instance.addChild(imageTwo)
        instance.addChild(containerTitleText)

        instance.addChild(hotSpotOne)
        instance.addChild(hotSpotTwo)
        instance.addChild(hotSpotThree)
        
        if(iconHotSpot!=null){
            hotSpotTour = generateHotSpot("tour",data.hotSpotTour);
            hotSpotTour.x = setHotSpot(data.hotSpotTour).posX
            hotSpotTour.y = setHotSpot(data.hotSpotTour).posY
            instance.addChild(hotSpotTour)
        }

        if(iconVideoHotSpot){
            hotSpotFeature = generateHotSpot("feature",data.hotSpotFeature);
            hotSpotFeature.x = setHotSpot(data.hotSpotFeature).posX
            hotSpotFeature.y = setHotSpot(data.hotSpotFeature).posY
            instance.addChild(hotSpotFeature);
        }

        overlayFill = new createjs.Shape();
        overlayFill.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        overlayFill.compositeOperation = "overlay";
        instance.addChild(overlayFill)

        if(fx!=null){

            videoFirstFrame = fx.firstFrame
            videoFirstFrame.compositeOperation = "screen";
            videoFirstFrame.regX = 2048/2;
            videoFirstFrame.regY = 1080/2;
            videoFirstFrame.x = stage.canvas.width/2
            videoFirstFrame.y = stage.canvas.height/2
            aspectRatio.resize(videoFirstFrame,2048,1080,"more",100*ratio);
            instance.addChild(videoFirstFrame)

            videoFx = new Video(fx.video,instance,true);
            videoFx.compositeOperation = "screen";
            videoFx.regX = 2048/2;
            videoFx.regY = 1080/2;
            videoFx.x = stage.canvas.width/2
            videoFx.y = stage.canvas.height/2
            aspectRatio.resize(videoFx,2048,1080,"more",100*ratio);
            instance.addChild(videoFx);
        }

        addAnimation();

    }

    function addAnimation(){

        TweenMax.from(bgImage, 2, {alpha:0,ease:Expo.easeInOut})

        TweenMax.from(titleOneTxt, 1, {delay:1.5,y:titleOneTxt.y-50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(titleTwoTxt, 1, {delay:2,y:titleTwoTxt.y+50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(shapeTitles, 1, {delay:2.5,scaleX:0,ease:Expo.easeInOut})

        TweenMax.from(hotSpotOne, 1.5, {delay:2.5,scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(hotSpotTwo, 1.5, {delay:2.6,scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(hotSpotThree, 1.5, {delay:2.7,scaleX:0,scaleY:0,ease:Expo.easeInOut})

        if(iconHotSpot!=null)TweenMax.from(hotSpotTour, 1.5, {delay:2.8,scaleX:0,scaleY:0,ease:Expo.easeInOut})
        if(iconVideoHotSpot!=null)TweenMax.from(hotSpotFeature, 1.5, {delay:2.8,scaleX:0,scaleY:0,ease:Expo.easeInOut})

        TweenMax.to(overlayFill, 4, {alpha:0,ease:Expo.easeOut,onComplete:removeOverlay})

        TweenMax.from(containerTitleText, 1, {delay:1.5,y:containerTitleText.y-100*ratio,ease:Expo.easeInOut})

    }

    function resetAnimation(){

        overlayFill = new createjs.Shape();
        overlayFill.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        overlayFill.compositeOperation = "overlay";
        instance.addChild(overlayFill)

        TweenMax.to(overlayFill, 1.5, {alpha:0,ease:Expo.easeInOut,onComplete:removeOverlay})

        TweenMax.to(bgImage, 1, {scaleX:scaleFactor,scaleY:scaleFactor,alpha:1,ease:Expo.easeInOut})
        
        TweenMax.to(titleOneTxt, 1, {delay:0.5,y:titleOneTxt.y+50*ratio,alpha:1,ease:Expo.easeInOut})
        TweenMax.to(titleTwoTxt, 1, {delay:0.75,y:titleTwoTxt.y-50*ratio,alpha:1,ease:Expo.easeInOut})
        TweenMax.to(shapeTitles, 1, {delay:1,scaleX:1,ease:Expo.easeInOut})

        TweenMax.to(hotSpotOne, 1.5, {delay:0.75,scaleX:1,scaleY:1,ease:Expo.easeInOut})
        TweenMax.to(hotSpotTwo, 1.5, {delay:0.76,scaleX:1,scaleY:1,ease:Expo.easeInOut})
        TweenMax.to(hotSpotThree, 1.5, {delay:0.77,scaleX:1,scaleY:1,ease:Expo.easeInOut})

        if(iconHotSpot!=null)TweenMax.to(hotSpotTour, 0.75, {delay:0.75,scaleX:1,scaleY:1,ease:Expo.easeInOut})
        if(iconVideoHotSpot!=null)TweenMax.to(hotSpotFeature, 0.75, {delay:0.75,scaleX:1,scaleY:1,ease:Expo.easeInOut})

        TweenMax.to(containerTitleText, 1, {delay:0.75,y:containerTitleText.y+100*ratio,ease:Expo.easeInOut})

        var blurFilter = new createjs.BlurFilter(0,0,1);
        bgImage.filters = [blurFilter];
        bgImage.cache(0,0,2048,1080);

    }

    function removeAnimation(){


        TweenMax.to(shapeTitles, 0.75, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(titleOneTxt, 0.75, {delay:0.75,y:titleOneTxt.y-50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(titleTwoTxt, 0.75, {delay:0.75,y:titleTwoTxt.y+50*ratio,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(hotSpotOne, 0.75, {delay:0.75,scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(hotSpotTwo, 0.75, {delay:0.76,scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(hotSpotThree, 0.75, {delay:0.77,scaleX:0,scaleY:0,ease:Expo.easeInOut})

        if(iconHotSpot!=null)TweenMax.to(hotSpotTour, 0.75, {delay:0.78,scaleX:0,scaleY:0,ease:Expo.easeInOut})
        if(iconVideoHotSpot!=null)TweenMax.to(hotSpotFeature, 0.75, {delay:0.79,scaleX:0,scaleY:0,ease:Expo.easeInOut})

        TweenMax.to(containerTitleText, 1, {delay:0.5,y:containerTitleText.y-100*ratio,ease:Expo.easeInOut})

        var timer = setTimeout(continueRemoveAnimation, 1500); 
    }

    function continueRemoveAnimation(){
        
        overlayFill = new createjs.Shape();
        overlayFill.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        overlayFill.compositeOperation = "overlay";
        instance.addChild(overlayFill)

        TweenMax.to(overlayFill, 1.5, {alpha:0,ease:Expo.easeInOut,onComplete:removeOverlay})

        TweenMax.to(bgImage, 1, {scaleX:5,scaleY:5,alpha:0,ease:Expo.easeInOut})

        var blurFilter = new createjs.BlurFilter(100,100,1);
        bgImage.filters = [blurFilter];
        bgImage.cache(0,0,2048,1080);

        if(type == "tour"){
            tour.addTourStep();
        }
        else {

            if(instanceNav!=6){

                instance.addEventListener("videoEnded", videoEndedHandler);

                video = new Video(refreshData[2],instance,false);
                video.regX = 2048/2;
                video.regY = 1080/2;
                video.x = stage.canvas.width/2
                video.y = stage.canvas.height/2
                aspectRatio.resize(video,2048,1080,"more",100*ratio);
                containerFeature.addChild(video);

            }else{

                var image = new Image();
                image.src = refreshData[2];
                imageFeature = new createjs.Bitmap(image);
                imageFeature.regX = 2048/2;
                imageFeature.regY = 1080/2;
                imageFeature.x = stage.canvas.width/2
                imageFeature.y = stage.canvas.height/2
                aspectRatio.resize(imageFeature,2048,1080,"more",100*ratio);
                instance.addChild(imageFeature);

                videoFx.visible = false;
                videoFx.alpha = 0
                videoFirstFrame.visible = false;
                videoFirstFrame.alpha = 0

                var timer = setTimeout(imageEndedHandler, 5000); 

            }
        }

    }

    function videoEndedHandler(event){

        resetAnimation();

        video.kill();
        instance.removeEventListener("videoEnded", videoEndedHandler);
        containerFeature.removeChild(video);
        video = null;

    }

    function imageEndedHandler(event){

        resetAnimation();

        instance.removeChild(imageFeature);
        imageFeature = null;

        videoFx.visible = true;
        videoFirstFrame.visible = true;
        TweenMax.to(videoFx, 1, {delay:1,alpha:1,ease:Expo.easeInOut})
        TweenMax.to(videoFirstFrame, 1, {delay:1,alpha:1,ease:Expo.easeInOut})

    }

    function removeOverlay(){
        if(overlayFill){
            overlayFill.graphics.clear();
            instance.removeChild(overlayFill)
            overlayFill = null
        }
    }

    function generateHotSpot(Itype,Idata){

        var containerHotSpot = new createjs.Container();

        if(Itype=="default"){
            
            var colorHotSpot = new createjs.Shape();
            colorHotSpot.alpha = 0.5;
            colorHotSpot.graphics.beginFill("#4b7ea3").drawCircle(0, 0, 15*ratio)
            
            var whiteHotSpot = new createjs.Shape();
            whiteHotSpot.graphics.beginFill("#ffffff").drawCircle(0, 0, 4*ratio)
            
            var strokeHotSpot = new createjs.Shape();
            strokeHotSpot.graphics.setStrokeStyle(1*ratio).beginStroke("#4b7ea3").drawCircle(0, 0, 19*ratio)
            
            colorHotSpot.type = "hotSpot"

            containerHotSpot.addChild(colorHotSpot)
            containerHotSpot.addChild(whiteHotSpot)
            containerHotSpot.addChild(strokeHotSpot)
            
        }else{


            var colorHotSpot = new createjs.Shape();
            colorHotSpot.graphics.beginFill("#eb8813").drawCircle(0, 0, 30*ratio)
            containerHotSpot.addChild(colorHotSpot)

            var whiteHotSpot = new createjs.Shape();
            whiteHotSpot.graphics.beginFill("#ffffff").drawCircle(0, 0, 18*ratio)

            var cloneIcon

            if(Itype=="tour"){

                cloneIcon = iconHotSpot.clone(true);
                colorAnimHotSpot = colorHotSpot;

                var labelTourText = new createjs.Text();
                labelTourText.font = "12px OpenSans-Bold";
                labelTourText.textBaseline = "alphabetic";
                labelTourText.color = "#FFFFFF";
                labelTourText.text = labelTour
                labelTourText.scaleX = ratio;
                labelTourText.scaleY = ratio;
                labelTourText.x = -labelTourText.getBounds().width/2*ratio
                labelTourText.y = 50*ratio
                containerHotSpot.addChild(labelTourText);

                animInColorTour();

            }else {

                cloneIcon = iconVideoHotSpot.clone(true);
                colorAnimFeature = colorHotSpot;

                var labelFeatureText = new createjs.Text();
                labelFeatureText.font = "12px OpenSans-Bold";
                labelFeatureText.textBaseline = "alphabetic";
                if(instanceNav!=6)labelFeatureText.color = "#eb8813";
                else labelFeatureText.color = "#FFFFFF";
                labelFeatureText.text = labelFeature
                labelFeatureText.scaleX = ratio;
                labelFeatureText.scaleY = ratio;
                labelFeatureText.x = -labelFeatureText.getBounds().width/2*ratio
                labelFeatureText.y = 50*ratio
                containerHotSpot.addChild(labelFeatureText);

                animInFeatureTour();

             }

            if(ratio>1){
                cloneIcon.regX = 12/2*ratio
                cloneIcon.regY = 7/2*ratio
            }else{
                cloneIcon.regX = 12*ratio
                cloneIcon.regY = 7*ratio
            }

            
            if(Itype=="tour"){
                colorHotSpot.type = "tour";
            }else {
                colorHotSpot.type = "feature";
            }
            
            containerHotSpot.addChild(colorHotSpot)
            containerHotSpot.addChild(whiteHotSpot)
            containerHotSpot.addChild(cloneIcon);
        
        }

        colorHotSpot.data = Idata;
        colorHotSpot.cursor = "pointer"
        colorHotSpot.cloneContainer = containerHotSpot
        colorHotSpot.addEventListener("mouseover", handlerOver);
        colorHotSpot.addEventListener("mouseout", handlerOut);
        colorHotSpot.addEventListener("click", handlerClick);

        return containerHotSpot
    }

    function handlerOver(event){
        
        switch(event.target.type){
            case "hotSpot":
                TweenMax.to(event.target, 0.5, {alpha:1,ease:Expo.easeInOut})
            break;
            case "tour":
               
            break;
            case "feature":
                
            break;
            case "overlayBlock":
                
            break;
            
        }
    }


    function handlerOut(event){
        switch(event.target.type){
            case "hotSpot":
                TweenMax.to(event.target, 0.5, {alpha:0.5,ease:Expo.easeInOut})
            break;
            case "tour":
                
            break;
            case "feature":
                
            break;
             case "overlayBlock":
                
            break;
            
        }
    }

    function handlerClick(event){

         switch(event.target.type){
            case "hotSpot":
                refreshHotspot = event.target
                refreshCloneContainer = event.target.cloneContainer
                refreshData = event.target.data
                event.target.cursor = "auto"
                event.target.removeEventListener("mouseover", handlerOver);
                event.target.removeEventListener("mouseout", handlerOut);
                event.target.removeEventListener("click", handlerClick);
                addTooTip(event.target.cloneContainer,event.target.data)
            break;
             case "overlayBlock":
                removeTooltip();
            break;

            case "tour":

                refreshHotspot = event.target
                refreshCloneContainer = event.target.cloneContainer
                refreshData = event.target.data
                event.target.cursor = "auto"
                event.target.removeEventListener("mouseover", handlerOver);
                event.target.removeEventListener("mouseout", handlerOut);
                event.target.removeEventListener("click", handlerClick);
                addTour(event.target.cloneContainer,event.target.data)
            break;

            case "feature":

                refreshHotspot = event.target
                refreshCloneContainer = event.target.cloneContainer
                refreshData = event.target.data
                event.target.cursor = "auto"
                event.target.removeEventListener("mouseover", handlerOver);
                event.target.removeEventListener("mouseout", handlerOut);
                event.target.removeEventListener("click", handlerClick);
                addFeature();
            break;
            
        }
    }

    function setHotSpot(Idata){

        var string = "{posX:"+Idata[0]+", posY:"+Idata[1]+"}";
        eval('var obj='+string);
        return obj
    }

    function setParalalx(Idata){
        var string = "{pos:"+Idata+"}";
        eval('var obj='+string);
        return obj
    }

    function addTour(Iclone,Idata){

        var hotSpotClone = Iclone.clone(true);

        tour = new Tour(instance,ratio,aspectRatio,lang);
        tour.addElements(hotSpotClone,Idata)
        containerTour.addChild(tour);
    }

    function startTourHandler(event){

        refreshHotspot.cursor = "pointer"
        refreshHotspot.data = refreshData;
        refreshHotspot.type = "tour"
        refreshHotspot.cloneContainer = refreshCloneContainer
        refreshHotspot.addEventListener("mouseover", handlerOver);
        refreshHotspot.addEventListener("mouseout", handlerOut);
        refreshHotspot.addEventListener("click", handlerClick);

        type = "tour";

        removeAnimation();

    }

    function addFeature(){

        refreshHotspot.cursor = "pointer"
        refreshHotspot.data = refreshData;
        refreshHotspot.type = "feature"
        refreshHotspot.cloneContainer = refreshCloneContainer
        refreshHotspot.addEventListener("mouseover", handlerOver);
        refreshHotspot.addEventListener("mouseout", handlerOut);
        refreshHotspot.addEventListener("click", handlerClick);

        type = "feature";

        removeAnimation();

    }

    function removeTooltip(){
        refreshHotspot.cursor = "pointer"
        refreshHotspot.data = refreshData;
        refreshHotspot.type = "hotSpot"
        refreshHotspot.cloneContainer = refreshCloneContainer
        refreshHotspot.alpha = 0.5;
        refreshHotspot.addEventListener("mouseover", handlerOver);
        refreshHotspot.addEventListener("mouseout", handlerOut);
        refreshHotspot.addEventListener("click", handlerClick);
        overlayBlock.removeEventListener("mouseover", handlerOver);
        overlayBlock.removeEventListener("mouseout", handlerOut);
        overlayBlock.removeEventListener("click", handlerClick);
        toolTip.kill();
        TweenMax.to(refreshHotspot.cloneContainer, 1, {delay:1,alpha:1,ease:Expo.easeInOut})
        TweenMax.to(overlayBlock, 0.5, {delay:1,alpha:0,ease:Expo.easeInOut,onComplete:removeOverlayBlock})
    }

    function addTooTip(Iclone,Idata){

        var hotSpotClone = Iclone.clone(true);

        overlayBlock = new createjs.Shape();
        overlayBlock.alpha = 0.35;
        overlayBlock.cursor = "auto"
        overlayBlock.type = "overlayBlock";
        overlayBlock.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        overlayBlock.addEventListener("mouseover", handlerOver);
        overlayBlock.addEventListener("mouseout", handlerOut);
        overlayBlock.addEventListener("click", handlerClick);
        instance.addChild(overlayBlock)

        TweenMax.from(overlayBlock, 1, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(Iclone, 0.1, {alpha:0,ease:Expo.easeInOut})

        toolTip = new Tooltip(instance,ratio,lang);
        toolTip.addElements(hotSpotClone,Idata)
        instance.addChild(toolTip);

    }

    function removeOverlayBlock(){

       instance.removeChild(overlayBlock)
       overlayBlock = null;

       instance.removeChild(toolTip)
       toolTip = null;

    }

    p.checkToolTip = function() {
       if(toolTip)removeTooltip();
    }

    p.checkVideo = function() {
       if(video){
            video.kill();
            instance.removeEventListener("videoEnded", videoEndedHandler);
            containerFeature.removeChild(video);
            video = null;
        }
    }

    p.getImageBg = function() {
       return bgImage;
    }

    p.getImageOne = function() {
       return imageOne;
    }

    p.getImageTwo = function() {
       return imageTwo;
    }

    p.getHotSpotOne = function() {
       return hotSpotOne;
    }

    p.getHotSpotTwo = function() {
       return hotSpotTwo;
    }

    p.getHotSpotThree = function() {
       return hotSpotThree;
    }

    p.getHotSpotTour = function() {
        if(iconHotSpot!=null){
            return hotSpotTour;     
        }
       
    }

    p.getHotSpotFeature = function() {
        if(iconVideoHotSpot!=null){
            return hotSpotFeature;     
        }
    }

    p.getContainerText = function() {
       return containerTitleText;
    }

    function animInColorTour(){
        TweenMax.to(colorAnimHotSpot, 1, {alpha:0.5,ease:Expo.easeOut,onComplete:animOutColorTour})
    }

    function animOutColorTour(){
        TweenMax.to(colorAnimHotSpot, 1, {alpha:1,ease:Expo.easeOut,onComplete:animInColorTour})
    }

    function animInFeatureTour(){
        TweenMax.to(colorAnimFeature, 1, {delay:0.5,alpha:0.5,ease:Expo.easeOut,onComplete:animOutFeatureTour})
    }

    function animOutFeatureTour(){
        TweenMax.to(colorAnimFeature, 1, {alpha:1,ease:Expo.easeOut,onComplete:animInFeatureTour})
    }

    p.removeElements = function() {
        
        TweenMax.killAll();

        bgImage.scaleX = 1*ratio;
        bgImage.scaleY = 1*ratio;
        bgImage.alpha = 1;
        var blurFilter = new createjs.BlurFilter(0,0,1);
        bgImage.filters = [blurFilter];
        bgImage.cache(0,0,2048,1080);

        if(tour){
            tour.kill();
        }

        instance.removeChild(bgImage)
        bgImage = null;
        instance.removeChild(imageOne)
        imageOne = null
        instance.removeChild(imageTwo)
        imageTwo = null
        instance.removeChild(containerTitleText)
        containerTitleText = null

        instance.removeChild(hotSpotOne)
        hotSpotOne = null
        instance.removeChild(hotSpotTwo) 
        hotSpotTwo = null
        instance.removeChild(hotSpotThree)
        hotSpotThree = null
        
        if(iconHotSpot!=null){
            instance.removeChild(hotSpotTour)
            hotSpotTour = null
            iconHotSpot = null
        }

        if(iconVideoHotSpot){
            instance.removeChild(hotSpotFeature)
            hotSpotFeature= null
            iconVideoHotSpot = null
        }

        if(videoFx){

            instance.removeChild(videoFirstFrame)

            videoFx.kill();
            //instance.removeEventListener("videoEnded", videoEndedHandler);
            instance.removeChild(videoFx);
            videoFx = null;
        }

    }

    p.resize = function() {

        if(bgImage){
            bgImage.regX = 2048/2
            bgImage.regY = 1080/2
            bgImage.x = stage.canvas.width/2
            bgImage.y = stage.canvas.height/2
            aspectRatio.resize(bgImage,bgImage.getBounds().width,bgImage.getBounds().height,"more",100*ratio);
            getScalingFactor = aspectRatio.getScalingFactor();
        }

        if(imageOne){
            imageOne.regX = imageOne.getBounds().width/2
            imageOne.regY = imageOne.getBounds().height/2
            imageOne.x = -imageOne.getBounds().width*ratio
            imageOne.y = stage.canvas.height/2
            aspectRatio.resize(imageOne,imageOne,imageOne.getBounds().height);
        }

        if(imageTwo){
            imageTwo.regX = imageTwo.getBounds().width/2
            imageTwo.regY = imageTwo.getBounds().height/2
            imageTwo.x = stage.canvas.width+300*ratio
            imageTwo.y = stage.canvas.height-imageTwo.getBounds().height/4
            aspectRatio.resize(imageTwo,imageTwo,imageTwo.getBounds().height);
        }

        if(containerTitleText){
            containerTitleText.x = stage.canvas.width/2-titleTwoTxt.getBounds().width/2*ratio
            containerTitleText.y = stage.canvas.height/2-(shapeTitles.y+12*ratio)/2
        }

        if(overlayFill){
            overlayFill.graphics.clear();
            overlayFill.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

        if(overlayBlock){
            overlayBlock.graphics.clear();
            overlayBlock.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

        if(toolTip)toolTip.resize();

        if(tour)tour.resize();

         if(video){
            video.regX = 2048/2;
            video.regY = 1080/2;
            video.x = stage.canvas.width/2
            video.y = stage.canvas.height/2
            aspectRatio.resize(video,2048,1080,"more",100*ratio);
        }

        if(videoFx){

            videoFirstFrame.regX = 2048/2;
            videoFirstFrame.regY = 1080/2;
            videoFirstFrame.x = stage.canvas.width/2
            videoFirstFrame.y = stage.canvas.height/2
            aspectRatio.resize(videoFirstFrame,2048,1080,"more",100*ratio);

            videoFx.regX = 2048/2;
            videoFx.regY = 1080/2;
            videoFx.x = stage.canvas.width/2
            videoFx.y = stage.canvas.height/2
            aspectRatio.resize(videoFx,2048,1080,"more",100*ratio);
        }

        if(imageFeature){
            imageFeature.regX = 2048/2;
            imageFeature.regY = 1080/2;
            imageFeature.x = stage.canvas.width/2
            imageFeature.y = stage.canvas.height/2
            aspectRatio.resize(imageFeature,2048,1080,"more",100*ratio);
        }
        
    } ; 


window.View = createjs.promote(View, "Container");
}());