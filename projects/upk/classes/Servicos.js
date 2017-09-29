(function () {

    function Servicos(IdispatchInstance,Iratio,IaspectRatio,Isvg) {
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
    var servicesImage;
    var imageClient;
    var imageGallery;
    var aspectRatio;
    var svg;
    var timer;

    var p = createjs.extend(Servicos, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh = instance;
        ratio = this.ratio;
        dispatchInstance = this.dispatchInstance;
        aspectRatio = this.aspectRatio;
        svg = this.svg;

    };

    p.init = function() {
        
        if(data==null){
            
            preloadDataJson("data/services.json")

        }else{
            
            addElements();
            addScroll();
            addAnimation();

            timer = setTimeout(show, 10);
            
        }
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
        
        data = event.result.services[0]
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        imageGalleryLength = data.imagesGallery.length

        var imagesToLoad = [data.headerImage,data.servicesImage,data.clientImage].concat(data.imagesGallery)

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
        servicesImage = evt.contentLoader[1]
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

        var servicesQuote = new ServicesQuote(ratio,servicesImage,svg.createSvg(data.comaShape,"#8EC640"),data.servicesQuote,aspectRatio,headerSlider.getHeight());
        servicesQuote.name = "servicesQuote";

        var sectionOne = new Section(ratio,null,data.sectionServicesTitle,aspectRatio,headerSlider.getHeight()+servicesQuote.getHeight());
        sectionOne.name = "sectionServices"

        var gallery = new Gallery(instance,ratio,aspectRatio,imageGallery,data.galleryTitle,data.galleryDesc,svg.createSvg(data.shapeDrag,"#8EC640"),headerSlider.getHeight()+servicesQuote.getHeight()+sectionOne.getHeight(),920*ratio);
        gallery.name = "gallery";

        var clients = new Clients(ratio,imageClient,data.titleClients,aspectRatio,headerSlider.getHeight()+servicesQuote.getHeight()+sectionOne.getHeight()+gallery.getHeight());
        clients.name = "clients";

        var footer = new Footer(ratio,data.titleFooter,data.headerFooter,data.buttonFooter,data.yearFooter,svg.createSvg(data.certificationOne,"#ffffff"),svg.createSvg(data.certificationTwo,"#ffffff"),headerSlider.getHeight()+servicesQuote.getHeight()+sectionOne.getHeight()+gallery.getHeight()+clients.getHeight());
        footer.name = "footer"

        containerContent.addChild(servicesQuote)
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

        totalHeight = instance.getChildByName("containerContent").getChildByName("headerSlider").getHeight()+instance.getChildByName("containerContent").getChildByName("servicesQuote").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionServices").getHeight()+instance.getChildByName("containerContent").getChildByName("gallery").getHeight()+instance.getChildByName("containerContent").getChildByName("clients").getHeight()+instance.getChildByName("containerContent").getChildByName("footer").getHeight()

        var scrollBar = new ScrollBar(ratio,instance.getChildByName("containerContent").y,instance,instance.getChildByName("containerContent"),totalHeight,0.15);
        scrollBar.name = "scrollBar";
        scrollBar.y = 2*ratio
        scrollBar.x = stage.canvas.width-7*ratio
        dispatchInstance.addChild(scrollBar);

    }


    function goToGalleryPosHandler(event){
        dispatchInstance.getChildByName("scrollBar").updatePos(-(instance.getChildByName("containerContent").getChildByName("headerSlider").getHeight()+instance.getChildByName("containerContent").getChildByName("servicesQuote").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionServices").getHeight()-140*ratio))
    }

    p.kill = function() {

        instance.removeEventListener("goToGalleryPos", goToGalleryPosHandler);

        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("containerContent").getChildByName("headerSlider").kill();
        instance.getChildByName("containerContent").getChildByName("servicesQuote").kill();
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
        instance.getChildByName("containerContent").getChildByName("servicesQuote").resize();
        instance.getChildByName("containerContent").getChildByName("sectionServices").resize();
        instance.getChildByName("containerContent").getChildByName("gallery").resize();
        instance.getChildByName("containerContent").getChildByName("clients").resize();
        instance.getChildByName("containerContent").getChildByName("footer").resize();

        totalHeight = instance.getChildByName("containerContent").getChildByName("headerSlider").getHeight()+instance.getChildByName("containerContent").getChildByName("servicesQuote").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionServices").getHeight()+instance.getChildByName("containerContent").getChildByName("gallery").getHeight()+instance.getChildByName("containerContent").getChildByName("clients").getHeight()+instance.getChildByName("containerContent").getChildByName("footer").getHeight()

        if(dispatchInstance.getChildByName("scrollBar")){
            dispatchInstance.getChildByName("scrollBar").y = 2*ratio
            dispatchInstance.getChildByName("scrollBar").x = stage.canvas.width-7*ratio
            dispatchInstance.getChildByName("scrollBar").updateResize(totalHeight,instance.getChildByName("containerContent").x,instance.getChildByName("containerContent").y);
        }

    } ; 


window.Servicos = createjs.promote(Servicos, "Container");
}());