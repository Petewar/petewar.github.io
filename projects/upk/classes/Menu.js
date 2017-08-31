(function () {

    function Menu(Iratio,Isvg,IaspectRatio) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.svg = Isvg;
        this.aspectRatio = IaspectRatio;
        this.setup();
    }
    
    var instance;
    var instanceRefresh;
    var ratio;
    var aspectRatio;
    var svg;

    var preloadData;
    var loader;

    var data;
    var imageData;

    var p = createjs.extend(Menu, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh = instance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        svg = this.svg;

    }

     p.init = function() {
        if((imageData==null)&&(data==null)){
            preloadDataJson("data/menu.json")
        }else{
            addElements();
            addAnimation();
        }
     }

    function preloadDataJson(Ijson){

        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        data = event.result.menu[0]
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        loadImages([data.bg])
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

    }

    function addElements(){

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);

        imageData[0].regX = 1690/2;
        imageData[0].regY = 1050/2;
        imageData[0].x = stage.canvas.width/2
        imageData[0].y = stage.canvas.height/2
        aspectRatio.resize(imageData[0],1690,1050);
        instance.addChild(imageData[0]);

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
    }

    function addAnimation(){

        TweenMax.from(instance.getChildByName("bg"), 1, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("closeIcon"), 1, {delay:1,alpha:0,rotation:180,ease:Expo.easeInOut,onComplete:addHits()});
        TweenMax.from(imageData[0], 2, {alpha:0,ease:Expo.easeInOut});

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

    }

    function handlerOver(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
                
            break;

        }
    }

    function handlerOut(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
                
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
        }
    }

    p.kill = function() {

        instance.removeChild(imageData[0]);

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").removeEventListener("mouseover", handlerOver);
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("closeIconHit").graphics.clear();
        instance.getChildByName("closeIconHit").removeEventListener("mouseover", handlerOver);
        instance.getChildByName("closeIconHit").removeEventListener("mouseout", handlerOut)
        instance.getChildByName("closeIconHit").removeEventListener("click", handlerClick);
        instance.removeChild(instance.getChildByName("closeIconHit"));

        instance.removeChild(instance.getChildByName("closeIcon"));


    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        instance.getChildByName("closeIcon").x = 40*ratio
        instance.getChildByName("closeIcon").y = 66*ratio

        instance.getChildByName("closeIconHit").x = 40*ratio
        instance.getChildByName("closeIconHit").y = 66*ratio
        
        imageData[0].regX = 1690/2;
        imageData[0].regY = 1050/2;
        imageData[0].x = stage.canvas.width/2
        imageData[0].y = stage.canvas.height/2
        aspectRatio.resize(imageData[0],1690,1050);
    

    } ; 


window.Menu = createjs.promote(Menu, "Container");
}());