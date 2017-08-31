(function () {

    function Details(Iinstance,Iratio,Imargin,ItweenTime,IaspectRatio,IdataToLoad,IarrowLeft,IarrowRight) {

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
    var preloadDataDetails;

    var preloadDetails;
    var loaderDetails;

    var titleText;
    var containerGallerySlider_details;
    var containerGallery_details;
    var bgHitDetails;

    var arrowLeft_details;
    var arrowRight_details;
    var gallery_details

    var offset_details;
    var currentPos_details
    var frequency_details;
    var timer_details;
    var direction_details;
    var startX_details;
    var oldX_details;
    var nav_details=0;
    var marginWidth=88;
    var marginWidthImage = 160;
    var endX_details
    var totalsize_details

    var maskWidth_details;
    var maskHeight_details;

    var p = createjs.extend(Details, createjs.Container);

    p.setup = function() {

    	instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        dataToLoad = this.dataToLoad

        arrowLeft_details = this.arrowLeft.clone(true);
        arrowRight_details = this.arrowRight.clone(true);

        //Load Json File
        preloadDataDetails = new createjs.LoadQueue(true);
        preloadDataDetails.addEventListener("fileload", preloadDataComplete);
        preloadDataDetails.loadFile(dataToLoad, true);

    } ;

    function preloadDataComplete(event) {

        console.log("New Module Details:"+dataToLoad);
        
        dataLoaded = event.result.details[0];

        //load images for Projects
        var imagesToLoad = dataLoaded.gallery;
        loadImages(imagesToLoad);

        //remove preloadData
        preloadDataDetails.removeEventListener("fileload", preloadDataComplete);
        preloadDataDetails = null;
    }

    function loadImages(iFiles){
        
        //New Loader
        loaderDetails = new Loader(iFiles);
        loaderDetails.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    }

    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);

        gallery_details = evt.contentLoader
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loaderDetails.kill();
        loaderDetails = null;

        addElements();
        addGallery();
        registerDrag(instance);
        setCurrentDimensions("add");

    }

    function setCurrentDimensions(Itype){
        var customEvent = new createjs.Event("DetailsLoadComplete");
        if(Itype=="add"){
           customEvent.currentType = "add"; 
        }else{
            customEvent.currentType = "resize";
        }
        customEvent.currentHeight = arrowRight_details.y+160*ratio
        dispatchInstance.dispatchEvent(customEvent);
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
        titleText.y = titleText.getBounds().height*ratio

        containerGallerySlider_details = new createjs.Container();
        containerGallery_details = new createjs.Container();

        bgHitDetails = new createjs.Shape();
        bgHitDetails.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 700*ratio);
        bgHitDetails.y = titleText.y-titleText.getBounds().height*ratio
        bgHitDetails.alpha=0.01

        instance.addChild(titleText);

        containerGallery_details.addChild(containerGallerySlider_details);
        instance.addChild(containerGallery_details);
        
        instance.addChild(arrowLeft_details);
        instance.addChild(arrowRight_details);
        instance.addChild(bgHitDetails);

    }


    function addGallery(){

        if(ratio<2){

            maskWidth_details = 551/2
            maskHeight_details = 690/2

        }else{

            maskWidth_details = 551
            maskHeight_details = 690

        }

        containerGallery_details.x = stage.canvas.width/2-maskWidth_details/2
        containerGallery_details.y = titleText.y-(margin*2)*ratio

        arrowLeft_details.x = Math.floor((stage.canvas.width/2-15*ratio)-margin*ratio);
        arrowLeft_details.y = Math.floor(containerGallery_details.y+maskHeight_details+116*ratio)
        arrowLeft_details.alpha = 0.25;

        arrowRight_details.x = Math.floor((stage.canvas.width/2-15*ratio)+margin*ratio);
        arrowRight_details.y = Math.floor(containerGallery_details.y+maskHeight_details+116*ratio)
        arrowRight_details.alpha = 0.25;

        for(var i=0;i<gallery_details.length;i++){

            if(ratio<2){
                gallery_details[i].scaleX = ratio/2
                gallery_details[i].scaleY = ratio/2
            }

            if(i>0)gallery_details[i].x = ((marginWidth*i))*ratio+maskWidth_details*i;
            if(i==1)gallery_details[i].y = 0
            else gallery_details[i].y = Math.floor((Math.random() * 100) + 1)*ratio
            containerGallerySlider_details.addChild(gallery_details[i]);
        }

        totalsize_details = ((marginWidth*i)*ratio+maskWidth_details*i)-marginWidth*ratio;
    }

    function registerDrag(){
        offset_details = new createjs.Point();
        bgHitDetails.cursor = "move";
        bgHitDetails.addEventListener("mousedown", startDrag);        
    }

    function startDrag(event) {

        startX_details = stage.mouseX
        offset_details.x = stage.mouseX-containerGallerySlider_details.x;
        bgHitDetails.addEventListener("pressmove", doDrag);

    }

    function doDrag(event) {

        endX_details = stage.mouseX;
        currentPos_details = event.stageX-offset_details.x

        bgHitDetails.addEventListener("pressup", stopDrag);
        TweenMax.to(containerGallerySlider_details, tweenTime/2, {x:currentPos_details,ease:Expo.easeOut})

        if (stage.mouseX < oldX_details) {
            direction_details = "left"
        } else if (stage.mouseX > oldX_details) {
            direction_details = "right"
        }

        timer_details = setTimeout(animDirection, 150);
        oldX_details = stage.mouseX;

        frequency_details = Math.abs(startX_details-endX_details);
        
    }

    function animDirection(){

        if(direction_details == "right"){   
            arrowRight_details.alpha = 1
            arrowLeft_details.alpha = 0.25
        }

        if(direction_details == "left"){
             arrowRight_details.alpha = 0.25
            arrowLeft_details.alpha = 1
        }

        //abort
        if(containerGallerySlider_details.x>0){
            TweenMax.killAll();
            stopDragRequest();
            TweenMax.to(containerGallerySlider_details, tweenTime, {x:0,ease:Expo.easeOut});
        }else{
            
            if(containerGallerySlider_details.x<-totalsize_details+maskWidth_details){
                TweenMax.killAll();
                stopDragRequest();
                TweenMax.to(containerGallerySlider_details, tweenTime, {x:-(totalsize_details-maskWidth_details),ease:Expo.easeOut});
            }
        }

    }

    function stopDrag(event) {
        
        stopDragRequest();

    }

    function stopDragRequest(){

        if(frequency_details>200){
            
            if(direction_details == "left")if(nav_details<gallery_details.length-1)nav_details++
            if(direction_details == "right")if(nav_details>0)nav_details--

        }

        TweenMax.to(containerGallerySlider_details, tweenTime, {x:-(((marginWidth*nav_details))*ratio+maskWidth_details*nav_details),ease:Expo.easeOut})

        direction_details = "";
        oldX_details = 0;
        arrowLeft_details.alpha = 0.25;
        arrowRight_details.alpha = 0.25;

        bgHitDetails.cursor = "auto";
        bgHitDetails.removeEventListener("mousedown", startDrag);
        bgHitDetails.removeEventListener("pressmove", doDrag);
        bgHitDetails.removeEventListener("pressup", stopDrag);

        registerDrag();

    }

     p.kill = function(){

        console.log("kill Details Module")
        
        instance.removeChild(titleText);
        titleText = null;

        bgHitDetails.addEventListener("mousedown", startDrag);        

        instance.removeChild(containerGallery_details);
        containerGallery_details = null;

        instance.removeChild(bgHitDetails)
        bgHitDetails = null;

        instance.removeChild(arrowRight_details)
        arrowRight_details = null;
       
        instance.removeChild(arrowLeft_details)
        arrowLeft_details = null;   

        totalsize_details = null
        nav_details = 0
    }

    p.resize = function() {

            if(titleText){
                titleText.x = stage.canvas.width/2-titleText.getBounds().width/2*ratio
                titleText.y = titleText.getBounds().height*ratio
            }
            
            if(bgHitDetails){
                bgHitDetails.graphics.clear();
                bgHitDetails.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 700*ratio);
                bgHitDetails.y = titleText.y-titleText.getBounds().height*ratio
            }

            if(containerGallery_details){
                containerGallery_details.x = stage.canvas.width/2-maskWidth_details/2
                containerGallery_details.y = titleText.y-(margin*2)*ratio
            }


            if((arrowLeft_details)&&(arrowRight_details)){
                arrowLeft_details.x = Math.floor((stage.canvas.width/2-15*ratio)-margin*ratio);
                arrowLeft_details.y = Math.floor(containerGallery_details.y+maskHeight_details+116*ratio)

                arrowRight_details.x = Math.floor((stage.canvas.width/2-15*ratio)+margin*ratio);
                arrowRight_details.y = Math.floor(containerGallery_details.y+maskHeight_details+116*ratio)

            }

         setCurrentDimensions("resize")
    } ;

window.Details = createjs.promote(Details, "Container");
}());