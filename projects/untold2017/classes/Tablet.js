(function () {

    function Tablet(Iinstance,Iratio,Imargin,ItweenTime,IaspectRatio,IdataToLoad,IarrowLeft,IarrowRight) {

        this.Container_constructor();
        this.dispatchInstance = Iinstance;
        this.ratio = Iratio;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.aspectRatio = IaspectRatio;
        this.dataToLoad = IdataToLoad;
        this.arrowLeft = IarrowLeft;
        this.arrowRight = IarrowRight;
        this.setup();
        

    }

    //elements
    var aspectRatio;
    var margin;
    var tweenTime;
    var ratio;
    var dataToLoad;
    var dataLoaded;
    var preloadDataTablet;
    var loaderTablet;
    var titleText;
    var ipad;
    var maskIpad;
    var ipadWidth;
    var ipadHeight;
    var maskWidth_tablet;
    var maskHeight_tablet;
    var gallery_tablet;
    var containerGallerySlider_tablet
    var containerGallerySliderGhost_tablet
    var containerGalleryGhost_tablet
    var containerGallery
    var extraImage;
    var arrowLeft_tablet;
    var arrowRight_tablet;
    var bgHitTablet

    var offset_tablet;
    var currentPos_tablet
    var frequency_tablet;
    var timer_tablet;
    
    var direction_tablet;
    var startX_tablet
    var endX_tablet
    var oldX_tablet
    var nav_tablet=0;
    var marginWidth=88;
    var marginWidthImage = 160;
    var totalsize_tablet

    var p = createjs.extend(Tablet, createjs.Container);

    p.setup = function() {

    	instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        dataToLoad = this.dataToLoad
        arrowLeft_tablet = this.arrowLeft;
        arrowRight_tablet = this.arrowRight;

        //Load Json File
        preloadDataTablet = new createjs.LoadQueue(true);
        preloadDataTablet.addEventListener("fileload", preloadDataComplete);
        preloadDataTablet.loadFile(dataToLoad, true);

    } ;

    function preloadDataComplete(event) {

        console.log("New Module Tablet:"+dataToLoad);

        dataLoaded = event.result.tablet[0];

        var elements = [dataLoaded.bg,dataLoaded.ipad,dataLoaded.extra]
        var imagesToLoad = elements.concat(dataLoaded.gallery);

        loadImages(imagesToLoad);

        //remove preloadData
        preloadDataTablet.removeEventListener("fileload", preloadDataComplete);
        preloadDataTablet = null;
    }

    function loadImages(iFiles){
        
        //New Loader
        loaderTablet = new Loader(iFiles);
        loaderTablet.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    }

    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);
        image_tablet = evt.contentLoader[0];
        ipad = evt.contentLoader[1];
        extraImage = evt.contentLoader[2];

        gallery_tablet = evt.contentLoader.splice(3,evt.contentLoader.length)
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loaderTablet.kill();
        loaderTablet = null;

        addElements();
        addGallery();
        registerDrag(instance);
        setCurrentDimensions("add");
    }

    function addElements(){
        
        titleText = new createjs.Text();
        titleText.textBaseline = "alphabetic";
        titleText.font = "320px BebasNeueBold";
        titleText.color = "#171820";
        titleText.text = dataLoaded.title;
        titleText.scaleX = ratio;
        titleText.scaleY = ratio;
        titleText.x = stage.canvas.width/2-titleText.getBounds().width/2*ratio
        titleText.y = titleText.getBounds().height*ratio+20*ratio+160*ratio;

        aspectRatio.resize(image_tablet,1600,image_tablet.getBounds().height,undefined,undefined)
        image_tablet.alpha = 0.1;
        image_tablet.y = titleText.y-120*ratio

        if(ratio<2){

            ipadWidth = 904/2;
            ipadHeight = 1282/2;
            maskWidth_tablet = 786/2
            maskHeight_tablet = 1048/2

            ipad.scaleX = ratio/2
            ipad.scaleY = ratio/2
            
        }else{

            ipadWidth = 904;
            ipadHeight = 1282;
            
            maskWidth_tablet = 786
            maskHeight_tablet = 1048

            
        }
        
        ipad.x = stage.canvas.width/2-(ipadWidth/2)
        ipad.y = titleText.y-margin*ratio

        maskIpad = new createjs.Shape();
        maskIpad.graphics.beginFill("#52ff3b").drawRect(0, 0, maskWidth_tablet, maskHeight_tablet);

        maskIpad.x = stage.canvas.width/2-(maskWidth_tablet/2)
        maskIpad.y = ipad.y+(margin*2)*ratio

        arrowLeft_tablet.x = Math.floor((stage.canvas.width/2-15*ratio)-margin*ratio);
        arrowLeft_tablet.y = Math.floor(maskIpad.y+maskHeight_tablet+116*ratio)
        arrowLeft_tablet.alpha = 0.25;

        arrowRight_tablet.x = Math.floor((stage.canvas.width/2-15*ratio)+margin*ratio);
        arrowRight_tablet.y = Math.floor(maskIpad.y+maskHeight_tablet+116*ratio)
        arrowRight_tablet.alpha = 0.25;


        containerGallerySlider_tablet = new createjs.Container();
        containerGallerySliderGhost_tablet = new createjs.Container();
        
        containerGallery_tablet = new createjs.Container();
        containerGallery_tablet.x = maskIpad.x
        containerGallery_tablet.y = maskIpad.y

        containerGalleryGhost_tablet = new createjs.Container();
        containerGalleryGhost_tablet.x = maskIpad.x
        containerGalleryGhost_tablet.y = maskIpad.y

        extraImage.x = marginWidthImage/2*ratio
        extraImage.y = arrowRight_tablet.y+160*ratio

        bgHitTablet = new createjs.Shape();
        bgHitTablet.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, ipadHeight+image_tablet.y);
        
        bgHitTablet.y = image_tablet.y
        bgHitTablet.alpha=0.01

        aspectRatio.resize(extraImage,1600,extraImage.getBounds().height,"less",marginWidthImage*ratio)

        instance.addChild(image_tablet);
        instance.addChild(titleText);

        //containerGalleryGhost_tablet.alpha = 0.5;
        containerGalleryGhost_tablet.addChild(containerGallerySliderGhost_tablet);
        instance.addChild(containerGalleryGhost_tablet);

        instance.addChild(ipad);

        containerGallery_tablet.addChild(containerGallerySlider_tablet);
        instance.addChild(containerGallery_tablet);
        instance.addChild(extraImage);
        instance.addChild(arrowLeft_tablet);
        instance.addChild(arrowRight_tablet);
        instance.addChild(bgHitTablet);

        containerGallery_tablet.mask = maskIpad
    }

    function addGallery(){

        for(var i=0;i<gallery_tablet.length;i++){

            if(ratio<2){
                gallery_tablet[i].scaleX = ratio/2
                gallery_tablet[i].scaleY = ratio/2
            }

            var bitmapClone = gallery_tablet[i].clone();

            if(i>0)gallery_tablet[i].x = ((marginWidth*i))*ratio+maskWidth_tablet*i;
            if(i>0)bitmapClone.x = ((marginWidth*i))*ratio+maskWidth_tablet*i;

            containerGallerySlider_tablet.addChild(gallery_tablet[i]);
            containerGallerySliderGhost_tablet.addChild(bitmapClone);
        }

        totalsize_tablet = ((marginWidth*i)*ratio+maskWidth_tablet*i)-marginWidth*ratio;
    }

    function registerDrag(){
        offset_tablet = new createjs.Point();
        bgHitTablet.cursor = "move";
        bgHitTablet.addEventListener("mousedown", startDrag);        
    }

    function startDrag(event) {

        startX_tablet = stage.mouseX
        offset_tablet.x = stage.mouseX-containerGallerySlider_tablet.x;
        bgHitTablet.addEventListener("pressmove", doDrag);

    }

    function doDrag(event) {

        endX_tablet = stage.mouseX;
        currentPos_tablet = event.stageX-offset_tablet.x

        bgHitTablet.addEventListener("pressup", stopDrag);
        TweenMax.to(containerGallerySlider_tablet, tweenTime/2, {x:currentPos_tablet,ease:Expo.easeOut})
        TweenMax.to(containerGallerySliderGhost_tablet, tweenTime*1.5, {x:currentPos_tablet,ease:Expo.easeOut})

        if (stage.mouseX < oldX_tablet) {
            direction_tablet = "left"
        } else if (stage.mouseX > oldX_tablet) {
            direction_tablet = "right"
        }

        timer_tablet = setTimeout(animDirectionTablet, 150);
        oldX_tablet = stage.mouseX;

        frequency_tablet = Math.abs(startX_tablet-endX_tablet);
        
    }

    function animDirectionTablet(){

        if(direction_tablet == "right"){   
            arrowRight_tablet.alpha = 1
            arrowLeft_tablet.alpha = 0.25
        }

        if(direction_tablet == "left"){
             arrowRight_tablet.alpha = 0.25
            arrowLeft_tablet.alpha = 1
        }

        //abort
        if(containerGallerySlider_tablet.x>0){
            TweenMax.killAll();
            stopDragRequest();
            TweenMax.to(containerGallerySlider_tablet, tweenTime, {x:0,ease:Expo.easeOut});
            TweenMax.to(containerGallerySliderGhost_tablet, tweenTime*2, {x:0,ease:Expo.easeOut});
        }else{
            
            if(containerGallerySlider_tablet.x<-totalsize_tablet+maskWidth_tablet){
                TweenMax.killAll();
                stopDragRequest();
                TweenMax.to(containerGallerySlider_tablet, tweenTime, {x:-(totalsize_tablet-maskWidth_tablet),ease:Expo.easeOut});
                TweenMax.to(containerGallerySliderGhost_tablet, tweenTime*2, {x:-(totalsize_tablet-maskWidth_tablet),ease:Expo.easeOut});
            }
        }

    }

    function stopDrag(event) {
        
        stopDragRequest();

    }

    function stopDragRequest(){

        if(frequency_tablet>200){
            
            if(direction_tablet == "left")if(nav_tablet<gallery_tablet.length-1)nav_tablet++
            if(direction_tablet == "right")if(nav_tablet>0)nav_tablet--

        }

        TweenMax.to(containerGallerySlider_tablet, tweenTime, {x:-(((marginWidth*nav_tablet))*ratio+maskWidth_tablet*nav_tablet),ease:Expo.easeOut})
        TweenMax.to(containerGallerySliderGhost_tablet, tweenTime*2, {x:-(((marginWidth*nav_tablet))*ratio+maskWidth_tablet*nav_tablet),ease:Expo.easeOut})

        direction_tablet = "";
        oldX_tablet = 0;
        arrowLeft_tablet.alpha = 0.25;
        arrowRight_tablet.alpha = 0.25;

        bgHitTablet.cursor = "auto";
        bgHitTablet.removeEventListener("mousedown", startDrag);
        bgHitTablet.removeEventListener("pressmove", doDrag);
        bgHitTablet.removeEventListener("pressup", stopDrag);

        registerDrag();

    }

    function setCurrentDimensions(Itype){
        var scaledPixels = extraImage.getBounds().height*aspectRatio.getScalingFactor()
        var customEvent = new createjs.Event("TabletLoadComplete");
        if(Itype=="add"){
           customEvent.currentType = "add"; 
        }else{
            customEvent.currentType = "resize";
        }
        customEvent.currentHeight = extraImage.y+scaledPixels;
        dispatchInstance.dispatchEvent(customEvent);
    }

     p.kill = function(){

        console.log("kill Tablet Module")

        instance.removeChild(image_tablet);
        image_tablet = null;
        dataLoaded = null;
        
        instance.removeChild(titleText);
        titleText = null;

        bgHitTablet.addEventListener("mousedown", startDrag);        

        maskIpad.graphics.clear();
        instance.removeChild(maskIpad);
        maskIpad = null

        instance.removeChild(containerGallery_tablet);
        containerGallery_tablet = null;

        instance.removeChild(containerGalleryGhost_tablet);
        containerGalleryGhost_tablet = null;

        instance.removeChild(extraImage);
        extraImage = null;

        instance.removeChild(bgHitTablet)
        bgHitTablet = null;
        
        instance.removeChild(arrowRight_tablet)
        arrowRight_tablet = null;
       
        instance.removeChild(arrowLeft_tablet)
        arrowLeft_tablet = null;

        instance.removeChild(ipad)
        ipad = null;

        totalsize_tablet = null
        nav_tablet = 0
    }

    p.resize = function() {

         if(titleText){
                titleText.x = stage.canvas.width/2-titleText.getBounds().width/2*ratio
                titleText.y = titleText.getBounds().height*ratio+20*ratio+160*ratio;
            }

            if(image_tablet){
                aspectRatio.resize(image_tablet,1600,image_tablet.getBounds().height,undefined,undefined)
                image_tablet.y = titleText.y-120*ratio
            }
            
            if(bgHitTablet){
                bgHitTablet.graphics.clear();
                bgHitTablet.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, ipadHeight+image_tablet.y);
                bgHitTablet.y = image_tablet.y
            }

            if(ipad){
                ipad.x = stage.canvas.width/2-(ipadWidth/2)
                ipad.y = titleText.y-margin*ratio
            }

            if(maskIpad){
                maskIpad.x = stage.canvas.width/2-(maskWidth_tablet/2)
                maskIpad.y = ipad.y+(margin*2)*ratio
            }

            if(containerGallery_tablet){
                containerGallery_tablet.x = maskIpad.x
                containerGallery_tablet.y = maskIpad.y
            }

            if(containerGalleryGhost_tablet){
                containerGalleryGhost_tablet.x = maskIpad.x
                containerGalleryGhost_tablet.y = maskIpad.y
            }

            if(extraImage){
                extraImage.x = marginWidthImage/2*ratio
                extraImage.y = arrowRight_tablet.y+160*ratio
                aspectRatio.resize(extraImage,1600,extraImage.getBounds().height,"less",marginWidthImage*ratio)
            }

            if((arrowLeft_tablet)&&(arrowRight_tablet)){
                arrowLeft_tablet.x = Math.floor((stage.canvas.width/2-15*ratio)-margin*ratio);
                arrowLeft_tablet.y = Math.floor(maskIpad.y+maskHeight_tablet+116*ratio)

                arrowRight_tablet.x = Math.floor((stage.canvas.width/2-15*ratio)+margin*ratio);
                arrowRight_tablet.y = Math.floor(maskIpad.y+maskHeight_tablet+116*ratio)

            }

            setCurrentDimensions("resize")
        
    } ;

window.Tablet = createjs.promote(Tablet, "Container");
}());