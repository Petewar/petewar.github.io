(function () {

    function Desktop(Iinstance,Iratio,Imargin,ItweenTime,IaspectRatio,IdataToLoad) {

        this.Container_constructor();
        this.dispatchInstance = Iinstance;
        this.ratio = Iratio;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.aspectRatio = IaspectRatio;
        this.dataToLoad = IdataToLoad;
        this.setup();

    }

    //elements
    var aspectRatio;
    var margin;
    var tweenTime;
    var ratio;
    var dataToLoad;
    var dataLoaded;
    var preloadDataDesktop;
    var dispatchInstance;
    var loaderDesktop;
    var image;

    //props
    var marginWidth = 160;

    var p = createjs.extend(Desktop, createjs.Container);

    p.setup = function() {

    	instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        dataToLoad = this.dataToLoad

        //Load Json File
        preloadDataDesktop = new createjs.LoadQueue(true);
        preloadDataDesktop.addEventListener("fileload", preloadDataComplete);
        preloadDataDesktop.loadFile(dataToLoad, true);

    } ;

    function preloadDataComplete(event) {

        console.log("New Module Desktop:"+dataToLoad);

        dataLoaded = event.result.desktop[0];

        //load images for Projects
        loadImages(dataLoaded.image);

        //remove preloadData
        preloadDataDesktop.removeEventListener("fileload", preloadDataComplete);
        preloadDataDesktop = null;
    }

    function loadImages(iFiles){
        
        //New Loader
        loaderDesktop = new Loader(iFiles);
        loaderDesktop.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    }

    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);
        image = evt.contentLoader[0];
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loaderDesktop.kill();
        loaderDesktop = null;

        addElements();

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
        instance.addChild(titleText);

        aspectRatio.resize(image,1600,image.getBounds().height,"less",marginWidth*ratio)
        image.x = marginWidth/2*ratio
        image.y = titleText.y-margin*ratio
        instance.addChild(image);

        setCurrentDimensions("add");
    }

    function setCurrentDimensions(Itype){
        var scaledPixels = image.getBounds().height*aspectRatio.getScalingFactor()
        var customEvent = new createjs.Event("DesktopLoadComplete");
        if(Itype=="add"){
           customEvent.currentType = "add"; 
        }else{
            customEvent.currentType = "resize";
        }
        customEvent.currentHeight = image.y+scaledPixels;
        dispatchInstance.dispatchEvent(customEvent);
    }

     p.kill = function(){

        console.log("kill Desktop Module")

        instance.removeChild(image);
        image = null;
        dataLoaded = null;
        
        instance.removeChild(titleText);
        titleText = null;
        
    }

    p.resize = function() {

            if(titleText){
                titleText.x = stage.canvas.width/2-titleText.getBounds().width/2*ratio
                titleText.y = titleText.getBounds().height*ratio+20*ratio+160*ratio;
            }

            if(image){
                aspectRatio.resize(image,1600,image.getBounds().height,"less",marginWidth*ratio)
                image.x = marginWidth/2*ratio;
                image.y = titleText.y-margin*ratio;
            }
            

            setCurrentDimensions("resize")

    } ;

window.Desktop = createjs.promote(Desktop, "Container");
}());