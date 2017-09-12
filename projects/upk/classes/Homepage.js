(function () {

    function Homepage(IdispatchInstance,Iratio,IaspectRatio,Isvg) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.svg = Isvg;
        this.setup();
    }
    
    var instance;
    var instanceRefresh;
    var ratio;
    var dispatchInstance;
    var svg;
    var aspectRatio;

    var preloadData;
    var loader;

    var data;
    var imageSlider;
    var imageServices;
    var totalHeight;

    var p = createjs.extend(Homepage, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh = instance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        dispatchInstance = this.dispatchInstance;
        svg = this.svg;
    
    };

    p.init = function() {

        if(data==null){
            preloadDataJson("data/homepage.json")
        }else{
            
            addElements();
            addScroll();
            addAnimation();

            var customEvent = new createjs.Event("show");
            dispatchInstance.dispatchEvent(customEvent);
        }
    }

    function preloadDataJson(Ijson){

        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        data = event.result.homepage[0]
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        data.imagesSlider.push(data.bgServices)

        loadImages(data.imagesSlider)
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles);
        loader.register(instance)
        instance.addEventListener("loaderComplete", loadImagesComplete);

    }

    function loadImagesComplete(evt) {

        console.log("Loader Images Homepage: "+evt.contentLoader.length);
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;

        imageSlider = evt.contentLoader.slice(0, 3);
        imageServices = [evt.contentLoader[3]];
        instance = instanceRefresh;

        addElements();
        addScroll();
        addAnimation();

        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);

    }

    function addElements(){

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);

        var containerContent = new createjs.Container();
        containerContent.name = "containerContent";
        instance.addChild(containerContent);

        var slider = new Slider(ratio,imageSlider,data.titleSlider,data.headerSlider,data.button,svg.createSvg(data.shapePlay,"#333333"),svg.createSvg(data.shapePause,"#333333"),aspectRatio);
        slider.name = "slider";

        var servicosHome = new ServicosHome(ratio,imageServices,data.titleServices,data.textServices,aspectRatio,slider.getHeight());
        servicosHome.name = "servicosHome";

        containerContent.addChild(servicosHome);
        containerContent.addChild(slider);

    }

    function addAnimation(){
        TweenMax.from(instance.getChildByName("bg"), 1, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(dispatchInstance.getChildByName("scrollBar"), 1, {delay:1,alpha:0,ease:Expo.easeInOut})
    }

    function addScroll(){

        totalHeight = instance.getChildByName("containerContent").getChildByName("slider").getHeight()+instance.getChildByName("containerContent").getChildByName("servicosHome").getHeight()

        var scrollBar = new ScrollBar(ratio,instance.getChildByName("containerContent").y,instance,instance.getChildByName("containerContent"),totalHeight,0.15);
        scrollBar.name = "scrollBar";
        scrollBar.y = 2*ratio
        scrollBar.x = stage.canvas.width-7*ratio
        dispatchInstance.addChild(scrollBar);

    }

    p.kill = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("containerContent").getChildByName("slider").kill();
        instance.getChildByName("containerContent").getChildByName("servicosHome").kill();

        dispatchInstance.getChildByName("scrollBar").kill()
        dispatchInstance.removeChild(dispatchInstance.getChildByName("scrollBar"))
        
        instance.removeChild(instance.getChildByName("containerContent"))

    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.getChildByName("containerContent").getChildByName("slider").resize();
        instance.getChildByName("containerContent").getChildByName("servicosHome").resize();

        totalHeight = instance.getChildByName("containerContent").getChildByName("slider").getHeight()+instance.getChildByName("containerContent").getChildByName("servicosHome").getHeight()

        if(dispatchInstance.getChildByName("scrollBar")){
            dispatchInstance.getChildByName("scrollBar").y = 2*ratio
            dispatchInstance.getChildByName("scrollBar").x = stage.canvas.width-7*ratio
            dispatchInstance.getChildByName("scrollBar").updateResize(totalHeight,instance.getChildByName("containerContent").x,instance.getChildByName("containerContent").y);
        }

    } ; 


window.Homepage = createjs.promote(Homepage, "Container");
}());