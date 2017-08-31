(function () {

    function Tour(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.lang = Ilang
        this.aspectRatio = IaspectRatio;
        this.setup();
    }
    
    var instance;
    var aspectRatio;
    var dispatchInstance;
    var ratio;
    var data;
    var lang;
    var preloadData;
    var imagesLoaded;
    var instanceRefresh;
    var hotSpotPos;
    var currentContainer;
    var totalNav;
    var nav

    //elements
    var hotSpot
    var hotSpotSymbol;
    
    var p = createjs.extend(Tour, createjs.Container);

    p.setup = function() {

        instance = this;
        aspectRatio = this.aspectRatio;
        instanceRefresh = instance;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        lang = this.lang;

    };

    p.addElements = function(Ihotspot,Idata) {

        data = Idata;
        hotSpotSymbol = Ihotspot
        nav = 0;
        preloadDataJson(data[2])

    }

    function preloadDataJson(Ijson){

        //Load Json File
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        console.log("Loader Data: Tour")

        //remove preloadData
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        hotSpotPos = event.result.content[0].hotSpotPos
        loadImages(event.result.content[0].img);
        
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles);
        loader.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    }

    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;

        imagesLoaded = evt.contentLoader;
        instance = instanceRefresh;
        totalNav = imagesLoaded.length

        for(var i=0;i<imagesLoaded.length;i++){
            var container = new createjs.Container;
            container.name = "container"+i;
            container.x = stage.canvas.width/2
            container.y = stage.canvas.height/2
            instance.addChild(container);
        }

        navLayer = imagesLoaded.length-1

        var customEvent = new createjs.Event("startTour");
        dispatchInstance.dispatchEvent(customEvent);

    }

    p.addTourStep = function(){

        imagesLoaded[nav].regX = 2048/2
        imagesLoaded[nav].regY = 1080/2
        instance.getChildByName("container"+navLayer).addChild(imagesLoaded[nav]);
        aspectRatio.resize(imagesLoaded[nav],imagesLoaded[nav].getBounds().width,imagesLoaded[nav].getBounds().height);

        overlayFill = new createjs.Shape();
        overlayFill.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        overlayFill.compositeOperation = "overlay";
        instance.addChild(overlayFill)

        hotSpot = hotSpotSymbol.clone(true);
        hotSpot.x = setHotSpot(hotSpotPos[nav]).posX
        hotSpot.y = setHotSpot(hotSpotPos[nav]).posY

        var colorHotSpot = new createjs.Shape();
        colorHotSpot.graphics.beginFill("#eb8813").drawCircle(0, 0, 30*ratio)
        colorHotSpot.alpha = 0.01;
        colorHotSpot.x = hotSpot.x
        colorHotSpot.y = hotSpot.y
        colorHotSpot.cursor = "pointer"
        colorHotSpot.addEventListener("mouseover", handlerTourOver);
        colorHotSpot.addEventListener("mouseout", handlerTourOut);
        colorHotSpot.addEventListener("click", handlerTourClick);

        instance.addChild(hotSpot)
        instance.addChild(colorHotSpot)

        navLayer--
        addAnimation();

    }

    function handlerTourOver(event){
        
    }

    function handlerTourOut(event){
        
    }

    function handlerTourClick(event){

        event.target.cursor = "auto"
        event.target.removeEventListener("mouseover", handlerTourOver);
        event.target.removeEventListener("mouseout", handlerTourOut);
        event.target.removeEventListener("click", handlerTourClick);

        if(nav<totalNav-1)removeAnimation();
        else removeAnimationToDispatch();
        
        
    }

    function addAnimation(){
        TweenMax.from(hotSpot, 1.5, {delay:0.5,scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(overlayFill, 1.5, {alpha:0,ease:Expo.easeInOut})
    }

    function removeAnimation(){

        TweenMax.to(hotSpot, 0.75, {scaleX:0,scaleY:0,ease:Expo.easeInOut});

        var timer = setTimeout(continueRemoveAnimation, 500);

    }

    function removeAnimationToDispatch(){

        var customEvent = new createjs.Event("ResetView");
        dispatchInstance.dispatchEvent(customEvent);

        TweenMax.to(hotSpot, 0.75, {scaleX:0,scaleY:0,ease:Expo.easeInOut});

        TweenMax.to(imagesLoaded[nav], 1, {scaleX:5,scaleY:5,alpha:0,ease:Expo.easeInOut,onComplete:instance.kill})

        var blurFilter = new createjs.BlurFilter(100,100,1);
        imagesLoaded[nav].filters = [blurFilter];
        imagesLoaded[nav].cache(0,0,2048,1080);

    }

    function removeHotSpot(){
        instance.removeChild(hotSpot);
    }

    function continueRemoveAnimation(){
        
        instance.removeChild(hotSpot);

        TweenMax.to(imagesLoaded[nav], 1, {scaleX:5,scaleY:5,alpha:0,ease:Expo.easeInOut})

        var blurFilter = new createjs.BlurFilter(100,100,1);
        imagesLoaded[nav].filters = [blurFilter];
        //imagesLoaded[nav].cache(0,0,2048,1080);

        nav++
        instance.addTourStep();
    }

    function setHotSpot(Idata){

        var string = "{posX:"+Idata[0]+", posY:"+Idata[1]+"}";
        eval('var obj='+string);
        return obj
    }

    p.kill = function() {

        for(var i=0;i<imagesLoaded.length;i++){
            if(instance.getChildByName("container"+i))instance.removeChild(instance.getChildByName("container"+i))
        }

        instance.removeChild(hotSpot);

        nav = 0;

    } ;

    p.resize = function() {
        aspectRatio.resize(imagesLoaded[nav],imagesLoaded[nav].getBounds().width,imagesLoaded[nav].getBounds().height);
    } ; 

window.Tour = createjs.promote(Tour, "Container");
}());