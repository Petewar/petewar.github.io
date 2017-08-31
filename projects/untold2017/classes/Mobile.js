(function () {

    function Mobile(Iinstance,Iratio,Imargin,ItweenTime,IaspectRatio,IdataToLoad,IarrowLeft,IarrowRight,Igif) {

        this.Container_constructor();
        this.dispatchInstance = Iinstance;
        this.ratio = Iratio;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.aspectRatio = IaspectRatio;
        this.dataToLoad = IdataToLoad;
        this.arrowLeft = IarrowLeft;
        this.arrowRight = IarrowRight;
        this.gif = Igif;
        this.setup();

    }

    //elements
    
    var aspectRatio;
    var margin;
    var tweenTime;
    var ratio;
    var dataToLoad;
    var dataLoaded;
    var preloadMobile;
    var loaderMobile;
    
    var titleText;
    var iphone;
    var iphoneClone
    var maskIphone;
    var maskIphoneClone
    var iphoneWidth;
    var iphoneHeight;
    var maskWidth;
    var maskHeight;
    var staticImage;
    var gallery;
    var containerGallery;
    var gif;
    var containerGif
    var maskGif;
    
    var arrowLeft;
    var arrowRight;
    var bgHit;

    var offset;
    var currentPos
    var frequency;
    var timer;
    
    var direction;
    var startX;
    var oldX;
    var endX
    var nav=0;
    var marginWidth=88;
    var marginWidthImage = 160;
    
    var bgColor;
    var playGif = true
    var frameImage;
    var hitgif


    var p = createjs.extend(Mobile, createjs.Container);

    p.setup = function() {

    	instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        dataToLoad = this.dataToLoad;
        gif = this.gif

        arrowLeft = this.arrowLeft.clone(true);
        arrowRight = this.arrowRight.clone(true);
        
        //Load Json File
        preloadMobile = new createjs.LoadQueue(true);
        preloadMobile.addEventListener("fileload", preloadDataComplete);
        preloadMobile.loadFile(dataToLoad, true);

    } ;

    function preloadDataComplete(event) {
        
        console.log("New Module Mobile:"+dataToLoad);

        dataLoaded = event.result.mobile[0];

        var elements = [dataLoaded.bg,dataLoaded.iphone,dataLoaded.staticImage,dataLoaded.frameGif]
        var imagesToLoad = elements.concat(dataLoaded.gallery);

        loadImages(imagesToLoad);

        //remove preloadData
        preloadMobile.removeEventListener("fileload", preloadDataComplete);
        preloadMobile = null;
    }

     function loadImages(iFiles){
        
        //New Loader
        loaderMobile = new Loader(iFiles);
        loaderMobile.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    }

    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);

        image = evt.contentLoader[0];
        iphone = evt.contentLoader[1];
        staticImage = evt.contentLoader[2];
        frameImage = evt.contentLoader[3];

        iphoneClone = iphone.clone();

        gallery = evt.contentLoader.splice(4,evt.contentLoader.length)
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loaderMobile.kill();
        loaderMobile = null;

        addElements();
        addGallery();
        registerDrag(instance);
        setCurrentDimensions("add");

    }

    function addElements(){

        bgColor = new createjs.Shape();
        bgColor.graphics.beginFill(dataLoaded.color).drawRect(0, 0, 800*ratio, 600*ratio);
        bgColor.x = stage.canvas.width/2-150*ratio
        bgColor.y = (margin*5)*ratio+60*ratio

        titleText = new createjs.Text();
        titleText.textBaseline = "alphabetic";
        titleText.font = "320px BebasNeueBold";
        titleText.color = "#171820";
        titleText.text = dataLoaded.title;
        titleText.scaleX = ratio;
        titleText.scaleY = ratio;
        titleText.x = stage.canvas.width/2-titleText.getBounds().width/2*ratio
        titleText.y = (margin*5)*ratio+60*ratio+600*ratio+titleText.getBounds().height*ratio+20*ratio+40*ratio;

        aspectRatio.resize(image,1600,image.getBounds().height,undefined,undefined)
        image.alpha = 0.1;
        image.y = (margin*5)*ratio+120*ratio

        if(ratio<2){

            iphoneWidth = 435/2;
            iphoneHeight = 884/2;

            maskWidth = 379/2
            maskHeight = 670/2

            iphone.scaleX = ratio/2
            iphone.scaleY = ratio/2

            iphoneClone.scaleX = ratio/2
            iphoneClone.scaleY = ratio/2
            
        }else{

            iphoneWidth = 435;
            iphoneHeight = 884;
            
            maskWidth = 379
            maskHeight = 670

        }

        iphone.x = stage.canvas.width/2-(iphoneWidth/2)
        iphone.y = titleText.y-margin*ratio

        iphoneClone.x = stage.canvas.width/2+(iphoneWidth)+120*ratio
        iphoneClone.y = bgColor.y+280*ratio;

        maskIphone = new createjs.Shape();
        maskIphone.graphics.beginFill("#52ff3b").drawRect(0, 0, maskWidth, maskHeight);

        maskIphone.x = stage.canvas.width/2-(maskWidth/2)
        maskIphone.y = iphone.y+(margin*2)*ratio-10*ratio

        maskIphoneClone = new createjs.Shape();
        maskIphoneClone.graphics.beginFill("#52ff3b").drawRect(0, 0, maskWidth, maskHeight);

        maskIphoneClone.x = iphoneClone.x+(iphoneWidth/2)-maskWidth/2
        maskIphoneClone.y = iphoneClone.y+(margin*2)*ratio-10*ratio

        staticImage.x = maskIphoneClone.x
        staticImage.y = maskIphoneClone.y

        if(ratio<2){
            staticImage.scaleX = ratio/2
            staticImage.scaleY = ratio/2
        }

        arrowLeft.x = Math.floor((stage.canvas.width/2-15*ratio)-margin*ratio);
        arrowLeft.y = Math.floor(maskIphone.y+maskHeight+116*ratio)
        arrowLeft.alpha = 0.25;

        arrowRight.x = Math.floor((stage.canvas.width/2-15*ratio)+margin*ratio);
        arrowRight.y = Math.floor(maskIphone.y+maskHeight+116*ratio)
        arrowRight.alpha = 0.25;

        containerGallerySlider = new createjs.Container();
        containerGallerySliderGhost = new createjs.Container();
        
        containerGallery = new createjs.Container();
        containerGallery.x = maskIphone.x
        containerGallery.y = maskIphone.y

        containerGalleryGhost = new createjs.Container();
        containerGalleryGhost.x = maskIphone.x
        containerGalleryGhost.y = maskIphone.y

        bgHit = new createjs.Shape();
        bgHit.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, iphoneHeight+iphoneClone.y-160*ratio);
        
        bgHit.y = titleText.y-titleText.getBounds().height*ratio
        bgHit.alpha=0.01

        instance.addChild(image);
        instance.addChild(bgColor);

        addGif();
        
        instance.addChild(titleText);

        containerGalleryGhost.addChild(containerGallerySliderGhost);
        instance.addChild(containerGalleryGhost);

        instance.addChild(iphone);
        instance.addChild(iphoneClone);
        instance.addChild(staticImage)

        containerGallery.addChild(containerGallerySlider);
        instance.addChild(containerGallery);
        
        instance.addChild(arrowLeft);
        instance.addChild(arrowRight);
        instance.addChild(bgHit);

        containerGallery.mask = maskIphone
        staticImage.mask = maskIphoneClone
    }


    function addGallery(){

        for(var i=0;i<gallery.length;i++){

            if(ratio<2){
                gallery[i].scaleX = ratio/2
                gallery[i].scaleY = ratio/2
            }

            var bitmapClone = gallery[i].clone();

            if(i>0)gallery[i].x = ((marginWidth*i))*ratio+maskWidth*i;
            if(i>0)bitmapClone.x = ((marginWidth*i))*ratio+maskWidth*i;

            containerGallerySlider.addChild(gallery[i]);
            containerGallerySliderGhost.addChild(bitmapClone);
        }

        totalsize = ((marginWidth*i)*ratio+maskWidth*i)-marginWidth*ratio;
    }

    function addGif(){

        containerGif = new createjs.Container();

        hitgif = new createjs.Shape();
        hitgif.graphics.beginFill("#FFFFFF").drawRect(0, 0, 800*ratio, 600*ratio);

        containerGif.x = stage.canvas.width/2-800*ratio+150*ratio
        containerGif.y = (margin*5)*ratio

        hitgif.x = containerGif.x
        hitgif.y = containerGif.y
        hitgif.alpha = 0.01

        frameImage.scaleX = ratio
        frameImage.scaleY = ratio

        containerGif.addChild(frameImage);
        instance.addChild(containerGif);
        instance.addChild(hitgif);
        
        hitgif.cursor = "pointer";
        hitgif.addEventListener("click", handlerClick);
        hitgif.addEventListener("mouseout", handlerOut);

    }

    function handlerOut(event){

        if(playGif==false){
            playGif = true
            gif.stopAnimation();
            gif.kill();
            containerGif.removeChild(gif);

            maskGif.graphics.clear();
            containerGif.removeChild(maskGif);
        }
    }

    function handlerClick(event){

        if(playGif==true){

            playGif = false
            maskGif = new createjs.Shape();
            maskGif.graphics.beginFill("#FFFFFF").drawRect(0, 0, 800*ratio, 600*ratio);
        
            maskGif.regX = 400*ratio
            maskGif.regY = 300*ratio        

            maskGif.x = 400*ratio
            maskGif.y = 300*ratio

            gif.regX = 400
            gif.regY = 300
            
            gif.x = 400*ratio
            gif.y = 300*ratio

            gif.scaleX = ratio
            gif.scaleY = ratio

            gif.mask = maskGif;
            gif.getAnim(dataLoaded.animation,dataLoaded.frames,true); 

            containerGif.addChild(gif);
            //containerGif.addChild(maskGif);

            TweenMax.from(maskGif, tweenTime/2, {delay:0.3,scaleX:0,scaleY:0,ease:Expo.easeOut,onComplete:completeGifAnimation});
            TweenMax.from(gif, tweenTime/2, {delay:0.6,scaleX:1.2,scaleY:1.2,ease:Expo.easeOut});

        }else{

            playGif = true
            gif.stopAnimation();
            gif.kill();
            containerGif.removeChild(gif);

            maskGif.graphics.clear();
            containerGif.removeChild(maskGif);
        }
        
    }

    function completeGifAnimation(){
        gif.playAnimation();
    }

    function registerDrag(){
        offset = new createjs.Point();
        bgHit.cursor = "move";
        bgHit.addEventListener("mousedown", startDrag);        
    }

    function startDrag(event) {

        startX = stage.mouseX
        offset.x = stage.mouseX-containerGallerySlider.x;
        bgHit.addEventListener("pressmove", doDrag);

    }

    function doDrag(event) {

        endX = stage.mouseX;
        currentPos = event.stageX-offset.x

        bgHit.addEventListener("pressup", stopDrag);
        TweenMax.to(containerGallerySlider, tweenTime/2, {x:currentPos,ease:Expo.easeOut})
        TweenMax.to(containerGallerySliderGhost, tweenTime*1.5, {x:currentPos,ease:Expo.easeOut})

        if (stage.mouseX < oldX) {
            direction = "left"
        } else if (stage.mouseX > oldX) {
            direction = "right"
        }

        timer = setTimeout(animDirection, 150);
        oldX = stage.mouseX;

        frequency = Math.abs(startX-endX);
        
    }

    function animDirection(){

        if(direction == "right"){   
            arrowRight.alpha = 1
            arrowLeft.alpha = 0.25
        }

        if(direction == "left"){
             arrowRight.alpha = 0.25
            arrowLeft.alpha = 1
        }

        //abort
        if(containerGallerySlider.x>0){
            TweenMax.killAll();
            stopDragRequest();
            TweenMax.to(containerGallerySlider, tweenTime, {x:0,ease:Expo.easeOut});
            TweenMax.to(containerGallerySliderGhost, tweenTime*2, {x:0,ease:Expo.easeOut});
        }else{
            
            if(containerGallerySlider.x<-totalsize+maskWidth){
                TweenMax.killAll();
                stopDragRequest();
                TweenMax.to(containerGallerySlider, tweenTime, {x:-(totalsize-maskWidth),ease:Expo.easeOut});
                TweenMax.to(containerGallerySliderGhost, tweenTime*2, {x:-(totalsize-maskWidth),ease:Expo.easeOut});
            }
        }

    }

    function stopDrag(event) {
        
        stopDragRequest();

    }

    function stopDragRequest(){

        if(frequency>200){
            
            if(direction == "left")if(nav<gallery.length-1)nav++
            if(direction == "right")if(nav>0)nav--

        }

        TweenMax.to(containerGallerySlider, tweenTime, {x:-(((marginWidth*nav))*ratio+maskWidth*nav),ease:Expo.easeOut})
        TweenMax.to(containerGallerySliderGhost, tweenTime*2, {x:-(((marginWidth*nav))*ratio+maskWidth*nav),ease:Expo.easeOut})

        direction = "";
        oldX = 0;
        arrowLeft.alpha = 0.25;
        arrowRight.alpha = 0.25;

        bgHit.cursor = "auto";
        bgHit.removeEventListener("mousedown", startDrag);
        bgHit.removeEventListener("pressmove", doDrag);
        bgHit.removeEventListener("pressup", stopDrag);

        registerDrag();

    }

    function setCurrentDimensions(Itype){
        var customEvent = new createjs.Event("MobileLoadComplete");
        if(Itype=="add"){
           customEvent.currentType = "add"; 
        }else{
            customEvent.currentType = "resize";
        }
        customEvent.currentHeight = arrowRight.y+160*ratio
        dispatchInstance.dispatchEvent(customEvent);
    }

     p.kill = function(){

        console.log("kill Mobile Module")

        instance.removeChild(image);
        image = null;
        dataLoaded = null;
        
        instance.removeChild(titleText);
        titleText = null;

        bgHit.addEventListener("mousedown", startDrag);        

        maskIphone.graphics.clear();
        instance.removeChild(maskIphone);
        maskIphone = null

        instance.removeChild(containerGallery);
        containerGallery = null;

        instance.removeChild(containerGalleryGhost);
        containerGalleryGhost = null;

        instance.removeChild(bgHit)
        bgHit = null;

        instance.removeChild(arrowRight)
        arrowRight = null;
       
        instance.removeChild(arrowLeft)
        arrowLeft = null;   

        bgColor.graphics.clear()
        instance.removeChild(bgColor)
        bgColor = null

        instance.removeChild(arrowRight)
        arrowRight = null;

        instance.removeChild(containerGif);
        containerGif = null

        instance.removeChild(staticImage);
        staticImage = null

        hitgif.graphics.clear()
        hitgif.removeEventListener("click", handlerClick);
        hitgif.removeEventListener("mouseout", handlerOut);
        instance.removeChild(hitgif);
        hitgif=null

        totalsize = null
        nav = 0
        
    }

    p.resize = function() {

            if(containerGif){
                 
                 containerGif.x = stage.canvas.width/2-800*ratio+150*ratio
                containerGif.y = (margin*5)*ratio

                hitgif.x = containerGif.x
                hitgif.y = containerGif.y
            }

            if(bgColor){
                bgColor.x = stage.canvas.width/2-150*ratio
                bgColor.y = (margin*5)*ratio+60*ratio
            }

            if(titleText){
                titleText.x = stage.canvas.width/2-titleText.getBounds().width/2*ratio
                titleText.y = (margin*5)*ratio+60*ratio+600*ratio+titleText.getBounds().height*ratio+20*ratio+40*ratio;
            }

            if(image){
                aspectRatio.resize(image,1600,image.getBounds().height,undefined,undefined)
                image.y = (margin*5)*ratio+120*ratio
            }
            
            if(bgHit){
                bgHit.graphics.clear();
                bgHit.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, iphoneHeight+iphoneClone.y-160*ratio);
                bgHit.y = titleText.y-titleText.getBounds().height*ratio
            }

            if(iphone){
                iphone.x = stage.canvas.width/2-(iphoneWidth/2)
                iphone.y = titleText.y-margin*ratio
                iphoneClone.x = stage.canvas.width/2+(iphoneWidth)+120*ratio
                iphoneClone.y = bgColor.y+280*ratio;
            }

            if(maskIphone){
                maskIphone.x = stage.canvas.width/2-(maskWidth/2)
                maskIphone.y = iphone.y+(margin*2)*ratio-10*ratio
                maskIphoneClone.x = iphoneClone.x+(iphoneWidth/2)-maskWidth/2
                maskIphoneClone.y = iphoneClone.y+(margin*2)*ratio-10*ratio
            }

            if(staticImage){
                staticImage.x = maskIphoneClone.x
                staticImage.y = maskIphoneClone.y
            }

            if(containerGallery){
                containerGallery.x = maskIphone.x
                containerGallery.y = maskIphone.y
            }

            if(containerGalleryGhost){
                containerGalleryGhost.x = maskIphone.x
                containerGalleryGhost.y = maskIphone.y
            }


            if((arrowLeft)&&(arrowRight)){
                arrowLeft.x = Math.floor((stage.canvas.width/2-15*ratio)-margin*ratio);
                arrowLeft.y = Math.floor(maskIphone.y+maskHeight+116*ratio)

                arrowRight.x = Math.floor((stage.canvas.width/2-15*ratio)+margin*ratio);
                arrowRight.y = Math.floor(maskIphone.y+maskHeight+116*ratio)

            }

        setCurrentDimensions("resize")

    } ;

window.Mobile = createjs.promote(Mobile, "Container");
}());