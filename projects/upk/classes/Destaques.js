(function () {

    function Destaques(IdispatchInstance,Iratio,IaspectRatio,Isvg) {
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

    var data;
    var imageGalleryLength;
    var loader;
    var bgImage;
    var destaqueImage;
    var imageClient;
    var imageGallery;
    var aspectRatio;
    var svg;
    var timer;
    var valueDestaque;
    var nav;
    var comumData
    var newsLength;

    var p = createjs.extend(Destaques, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh = instance;
        ratio = this.ratio;
        dispatchInstance = this.dispatchInstance;
        aspectRatio = this.aspectRatio;
        svg = this.svg;
        

    };

    p.init = function(Ivalue) {

        nav = Ivalue
        preloadDataJson("data/destaques.json")

    }

    function show(){
        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);
    }

    function preloadDataJson(Ijson){

        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        newsLength = event.result.destaques.length-2
        comumData = event.result.destaques[0]
        data = event.result.destaques[Number(nav)+1]

        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        imageGalleryLength = data.imagesGallery.length

        var imagesToLoad = [data.headerImage,data.destaqueImage,comumData.clientImage].concat(data.imagesGallery)

        loadImages(imagesToLoad)
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

        bgImage = evt.contentLoader[0]
        destaqueImage = evt.contentLoader[1]
        imageClient = evt.contentLoader[2]
        imageGallery = evt.contentLoader.slice(3, 3+imageGalleryLength);
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
        bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);

        var containerContent = new createjs.Container();
        containerContent.name = "containerContent";
        instance.addChild(containerContent);

        var headerSlider = new HeaderSlider(ratio,bgImage,data.headerTitle,data.titleSlider,aspectRatio,true);
        headerSlider.name = "headerSlider";

        var destaqueNews = new DestaqueNews(ratio,nav,newsLength,svg.createSvg(comumData.shapeArrow,"#ffffff"),destaqueImage,data.destaqueItem,comumData.next,aspectRatio,headerSlider.getHeight());
        destaqueNews.name = "destaqueNews";

        var sectionOne = new Section(ratio,null,data.sectionGalleryTitle,aspectRatio,headerSlider.getHeight()+destaqueNews.getHeight());
        sectionOne.name = "sectionServices"

        var gallery = new Gallery(instance,ratio,aspectRatio,imageGallery,null,null,svg.createSvg(comumData.shapeDrag,"#8EC640"),headerSlider.getHeight()+destaqueNews.getHeight()+sectionOne.getHeight(),535*ratio);
        gallery.name = "gallery";

        var clients = new Clients(ratio,imageClient,comumData.titleClients,aspectRatio,headerSlider.getHeight()+destaqueNews.getHeight()+sectionOne.getHeight()+gallery.getHeight());
        clients.name = "clients";

        var footer = new Footer(ratio,comumData.titleFooter,comumData.headerFooter,comumData.buttonFooter,comumData.yearFooter,svg.createSvg(comumData.certificationOne,"#ffffff"),svg.createSvg(comumData.certificationTwo,"#ffffff"),headerSlider.getHeight()+destaqueNews.getHeight()+sectionOne.getHeight()+gallery.getHeight()+clients.getHeight());
        footer.name = "footer"

        containerContent.addChild(destaqueNews)
        containerContent.addChild(headerSlider)
        containerContent.addChild(sectionOne)
        containerContent.addChild(gallery)
        containerContent.addChild(clients)
        containerContent.addChild(footer)
        
    }

    function addAnimation(){

        TweenMax.from(instance.getChildByName("bg"), 0.75, {scaleX:0,ease:Expo.easeInOut})
    }

    function addScroll(){

        instance.addEventListener("goToGalleryPos", goToGalleryPosHandler);

        totalHeight = instance.getChildByName("containerContent").getChildByName("headerSlider").getHeight()+instance.getChildByName("containerContent").getChildByName("destaqueNews").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionServices").getHeight()+instance.getChildByName("containerContent").getChildByName("gallery").getHeight()+instance.getChildByName("containerContent").getChildByName("clients").getHeight()+instance.getChildByName("containerContent").getChildByName("footer").getHeight()

        var scrollBar = new ScrollBar(ratio,instance.getChildByName("containerContent").y,instance,instance.getChildByName("containerContent"),totalHeight,0.15);
        scrollBar.name = "scrollBar";
        scrollBar.y = 2*ratio
        scrollBar.x = stage.canvas.width-7*ratio
        dispatchInstance.addChild(scrollBar);

    }


    function goToGalleryPosHandler(event){
        dispatchInstance.getChildByName("scrollBar").updatePos(-(instance.getChildByName("containerContent").getChildByName("headerSlider").getHeight()+instance.getChildByName("containerContent").getChildByName("destaqueNews").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionServices").getHeight()-140*ratio))
    }

    p.kill = function() {

        comumData = null
        data = null
        newsLength = null
        instance.removeEventListener("goToGalleryPos", goToGalleryPosHandler);

        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("containerContent").getChildByName("headerSlider").kill();
        instance.getChildByName("containerContent").getChildByName("destaqueNews").kill();
        instance.getChildByName("containerContent").getChildByName("sectionServices").kill();
        instance.getChildByName("containerContent").getChildByName("gallery").kill();
        instance.getChildByName("containerContent").getChildByName("clients").kill();
        instance.getChildByName("containerContent").getChildByName("footer").kill();

        dispatchInstance.getChildByName("scrollBar").kill()
        dispatchInstance.removeChild(dispatchInstance.getChildByName("scrollBar"))

        instance.removeChild(instance.getChildByName("containerContent"));
    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.getChildByName("containerContent").getChildByName("headerSlider").resize();
        instance.getChildByName("containerContent").getChildByName("destaqueNews").resize();
        instance.getChildByName("containerContent").getChildByName("sectionServices").resize();
        instance.getChildByName("containerContent").getChildByName("gallery").resize();
        instance.getChildByName("containerContent").getChildByName("clients").resize();
        instance.getChildByName("containerContent").getChildByName("footer").resize();

        totalHeight = instance.getChildByName("containerContent").getChildByName("headerSlider").getHeight()+instance.getChildByName("containerContent").getChildByName("destaqueNews").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionServices").getHeight()+instance.getChildByName("containerContent").getChildByName("gallery").getHeight()+instance.getChildByName("containerContent").getChildByName("clients").getHeight()+instance.getChildByName("containerContent").getChildByName("footer").getHeight()

        if(dispatchInstance.getChildByName("scrollBar")){
            dispatchInstance.getChildByName("scrollBar").y = 2*ratio
            dispatchInstance.getChildByName("scrollBar").x = stage.canvas.width-7*ratio
            dispatchInstance.getChildByName("scrollBar").updateResize(totalHeight,instance.getChildByName("containerContent").x,instance.getChildByName("containerContent").y);
        }

    } ; 


window.Destaques = createjs.promote(Destaques, "Container");
}());