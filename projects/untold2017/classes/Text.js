(function () {

    function Text(Iinstance,Iratio,Imargin,ItweenTime,IaspectRatio,IdataToLoad) {

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
    var marginWidth = 400
    var tweenTime;
    var ratio;
    var dataToLoad;
    var preloadDataText;
    var loaderText
    var image;
    var dispatchInstance;
    var dataLoaded;

    var titleText;
    var colOneText;
    var colTwoText;

    var p = createjs.extend(Text, createjs.Container);

    p.setup = function() {

    	instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        dataToLoad = this.dataToLoad
        dispatchInstance = this.dispatchInstance;

        //Load Json File
        preloadDataText = new createjs.LoadQueue(true);
        preloadDataText.addEventListener("fileload", preloadDataComplete);
        preloadDataText.loadFile(dataToLoad, true);

    } ;

    function preloadDataComplete(event) {

        console.log("New Module Text:"+dataToLoad);

        dataLoaded = event.result.text[0];

        //load images for Projects
        loadImages(dataLoaded.image);

        //remove preloadData
        preloadDataText.removeEventListener("fileload", preloadDataComplete);
        preloadDataText = null;
    }

    function loadImages(iFiles){
        
        //New Loader
        loaderText = new Loader(iFiles);
        loaderText.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    }
    
    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);
        image = evt.contentLoader[0];
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loaderText.kill();
        loaderText = null;

        addElements();

    }

    function addElements(){

        titleText = new createjs.Text();
        titleText.textBaseline = "alphabetic";
        titleText.font = "18px BebasNeueBold";
        titleText.color = "#171820";
        titleText.text = dataLoaded.title;
        titleText.scaleX = ratio;
        titleText.scaleY = ratio;
        titleText.x = marginWidth/2*ratio
        titleText.y = margin*4*ratio
        instance.addChild(titleText);

        colOneText = new createjs.Text();
        colOneText.textBaseline = "alphabetic";
        colOneText.lineWidth = (((stage.canvas.width-marginWidth*ratio)/ratio)-margin*ratio)/2
        colOneText.lineHeight = 30;
        colOneText.font = "14px BwModelicaLight ";
        colOneText.color = "#171820";
        colOneText.text = dataLoaded.colOne;
        colOneText.scaleX = ratio;
        colOneText.scaleY = ratio;
        colOneText.x = marginWidth/2*ratio
        colOneText.y = titleText.y+titleText.getBounds().height*ratio+20*ratio;
        instance.addChild(colOneText);

        colTwoText = new createjs.Text();
        colTwoText.textBaseline = "alphabetic";
        colTwoText.lineWidth = (((stage.canvas.width-marginWidth*ratio)/ratio)-margin*ratio)/2
        colTwoText.lineHeight = 30;
        colTwoText.font = "14px BwModelicaLight ";
        colTwoText.color = "#171820";
        colTwoText.text = dataLoaded.colTwo;
        colTwoText.scaleX = ratio;
        colTwoText.scaleY = ratio;
        colTwoText.x = colOneText.x + colOneText.getBounds().width*ratio+margin*2*ratio
        colTwoText.y = titleText.y+titleText.getBounds().height*ratio+20*ratio;
        instance.addChild(colTwoText);

        aspectRatio.resize(image,1600,image.getBounds().height,"less",marginWidth*ratio)
        image.x = marginWidth/2*ratio
        image.y = colOneText.y+colOneText.getBounds().height*ratio+margin*ratio;
        instance.addChild(image);

        setCurrentDimensions("add");
        
    }

    function setCurrentDimensions(Itype){
        var scaledPixels = image.getBounds().height*aspectRatio.getScalingFactor()
        var customEvent = new createjs.Event("TextLoadComplete");
        customEvent.currentHeight = image.y+scaledPixels+160*ratio;
        if(Itype=="add"){
           customEvent.currentType = "add"; 
        }else{
            customEvent.currentType = "resize";
        }
        dispatchInstance.dispatchEvent(customEvent);
    }

     p.kill = function(){

        console.log("kill Text Module")
        instance.removeChild(titleText);
        instance.removeChild(colOneText);
        instance.removeChild(colTwoText);
        instance.removeChild(image);

        image = null;
        titleText = null;
        colOneText = null;
        colTwoText = null;
        dataLoaded = null;
        
    }

    p.resize = function() {

        if(image){

            titleText.x = marginWidth/2*ratio
            titleText.y = margin*4*ratio
            colOneText.lineWidth = (((stage.canvas.width-marginWidth*ratio)/ratio)-margin*ratio)/2
            colOneText.x = marginWidth/2*ratio
            colOneText.y = titleText.y+titleText.getBounds().height*ratio+20*ratio;

            colTwoText.lineWidth = (((stage.canvas.width-marginWidth*ratio)/ratio)-margin*ratio)/2
            colTwoText.x = colOneText.x + colOneText.getBounds().width*ratio+margin*2*ratio
            colTwoText.y = titleText.y+titleText.getBounds().height*ratio+20*ratio;

            aspectRatio.resize(image,1600,image.getBounds().height,"less",marginWidth*ratio)
            image.x = marginWidth/2*ratio
            image.y = colOneText.y+colOneText.getBounds().height*ratio+margin*ratio;

            setCurrentDimensions("resize")
        }

    } ;

window.Text = createjs.promote(Text, "Container");
}());