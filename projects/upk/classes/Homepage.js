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
    var imageData;

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

        loadImages(data.imagesSlider)
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles);
        loader.register(instance)
        instance.addEventListener("loaderComplete", loadImagesComplete);

    }

    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;

        imageData = evt.contentLoader;
        instance = instanceRefresh;

        addElements();
        addAnimation();

        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);

    }

    function addElements(){

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);
        
        var slider = new Slider(ratio,imageData,data.titleSlider,data.headerSlider,svg.createSvg(data.shapePlay,"#333333"),aspectRatio);
        slider.name = "slider";
        instance.addChild(slider);

    }

    function addAnimation(){
        TweenMax.from(instance.getChildByName("bg"), 1, {scaleX:0,ease:Expo.easeInOut})
    }

    p.kill = function() {
        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("slider").kill();
    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.getChildByName("slider").resize();

    } ; 


window.Homepage = createjs.promote(Homepage, "Container");
}());