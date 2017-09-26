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
    var imageSliderLength
    var imageServices;
    var imageSection;
    var imageTeam;
    var imageTeamLength;
    var imageClient;
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

        imageSliderLength = data.imagesSlider.length
        imageTeamLength = data.imagesTeam.length

        data.imagesSlider.push(data.bgServices)
        data.imagesSlider.push(data.imgFeatureServices);
        data.imagesSlider.push(data.sectionTestimonialsImage);
        data.imagesSlider.push(data.sectionTeamImage);
        data.imagesSlider.push(data.clientImage);

        var imagesToLoad = data.imagesSlider.concat(data.imagesTeam)

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

        imageSlider = evt.contentLoader.slice(0, imageSliderLength);
        imageServices = [evt.contentLoader[imageSliderLength],evt.contentLoader[imageSliderLength+1]];
        imageSection = [evt.contentLoader[imageSliderLength+2],evt.contentLoader[imageSliderLength+3]]
        imageClient = evt.contentLoader[imageSliderLength+4]
        imageTeam = evt.contentLoader.slice(imageSliderLength+5, imageSliderLength+5+imageTeamLength);
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

        var servicosHome = new ServicosHome(ratio,imageServices,data.titleServices,data.textServices,data.headerFeatureServices,data.titleFeatureServices,data.textFeatureServices,data.buttonCaps,data.imgTitleFeatureServices,svg.createSvg(data.shapeArrow,"#8EC640"),aspectRatio,slider.getHeight());
        servicosHome.name = "servicosHome";

        var sectionOne = new Section(ratio,imageSection[0],data.sectionTestimonialsTitle,aspectRatio,slider.getHeight()+servicosHome.getHeight());
        sectionOne.name = "sectionTestimonials"

        var testimonials = new Testimonials(ratio,data.testimonialsTitles,data.testimonialsText,data.testimonialsStars,data.shapeStar,data.shapeStarStroke,svg,slider.getHeight()+servicosHome.getHeight()+sectionOne.getHeight());
        testimonials.name = "testimonials"

        var sectionTwo = new SectionColor(ratio,imageSection[1],data.sectionTeamTitle,aspectRatio,slider.getHeight()+servicosHome.getHeight()+sectionOne.getHeight()+testimonials.getHeight());
        sectionTwo.name = "sectionTeam"

        var team = new Team(ratio,aspectRatio,imageTeam,data.teamNames,data.teamPosition,svg.createSvg(data.shapeDrag,"#8EC640"),slider.getHeight()+servicosHome.getHeight()+sectionOne.getHeight()+testimonials.getHeight()+sectionTwo.getHeight());
        team.name = "team";

        var clients = new Clients(ratio,imageClient,data.titleClients,aspectRatio,slider.getHeight()+servicosHome.getHeight()+sectionOne.getHeight()+testimonials.getHeight()+sectionTwo.getHeight()+team.getHeight());
        clients.name = "clients";

        var footer = new Footer(ratio,data.titleFooter,data.headerFooter,data.buttonFooter,data.yearFooter,svg.createSvg(data.certificationOne,"#ffffff"),svg.createSvg(data.certificationTwo,"#ffffff"),slider.getHeight()+servicosHome.getHeight()+sectionOne.getHeight()+testimonials.getHeight()+sectionTwo.getHeight()+team.getHeight()+clients.getHeight());
        footer.name = "footer"

        containerContent.addChild(servicosHome);
        containerContent.addChild(slider);
        containerContent.addChild(sectionOne);
        containerContent.addChild(testimonials);
        containerContent.addChild(sectionTwo);
        containerContent.addChild(team);
        containerContent.addChild(clients);
        containerContent.addChild(footer);

    }

    function addAnimation(){
        TweenMax.from(instance.getChildByName("bg"), 0.75, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(dispatchInstance.getChildByName("scrollBar"), 1, {delay:0.75,alpha:0,ease:Expo.easeInOut})
    }

    function addScroll(){

        totalHeight = instance.getChildByName("containerContent").getChildByName("slider").getHeight()+instance.getChildByName("containerContent").getChildByName("servicosHome").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionTestimonials").getHeight()+instance.getChildByName("containerContent").getChildByName("testimonials").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionTeam").getHeight()+instance.getChildByName("containerContent").getChildByName("team").getHeight()+instance.getChildByName("containerContent").getChildByName("clients").getHeight()+instance.getChildByName("containerContent").getChildByName("footer").getHeight()

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
        instance.getChildByName("containerContent").getChildByName("sectionTestimonials").kill();
        instance.getChildByName("containerContent").getChildByName("testimonials").kill();
        instance.getChildByName("containerContent").getChildByName("sectionTeam").kill();
        instance.getChildByName("containerContent").getChildByName("team").kill();
        instance.getChildByName("containerContent").getChildByName("clients").kill();
        instance.getChildByName("containerContent").getChildByName("footer").kill();

        dispatchInstance.getChildByName("scrollBar").kill()
        dispatchInstance.removeChild(dispatchInstance.getChildByName("scrollBar"))
        
        instance.removeChild(instance.getChildByName("containerContent"))

    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        
        instance.getChildByName("containerContent").getChildByName("slider").resize();
        instance.getChildByName("containerContent").getChildByName("servicosHome").resize();
        instance.getChildByName("containerContent").getChildByName("sectionTestimonials").resize();
        instance.getChildByName("containerContent").getChildByName("testimonials").resize();
        instance.getChildByName("containerContent").getChildByName("sectionTeam").resize();
        instance.getChildByName("containerContent").getChildByName("team").resize();
        instance.getChildByName("containerContent").getChildByName("clients").resize();
        instance.getChildByName("containerContent").getChildByName("footer").resize();

        totalHeight = instance.getChildByName("containerContent").getChildByName("slider").getHeight()+instance.getChildByName("containerContent").getChildByName("servicosHome").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionTestimonials").getHeight()+instance.getChildByName("containerContent").getChildByName("testimonials").getHeight()+instance.getChildByName("containerContent").getChildByName("sectionTeam").getHeight()+instance.getChildByName("containerContent").getChildByName("team").getHeight()+instance.getChildByName("containerContent").getChildByName("clients").getHeight()+instance.getChildByName("containerContent").getChildByName("footer").getHeight()

        if(dispatchInstance.getChildByName("scrollBar")){
            dispatchInstance.getChildByName("scrollBar").y = 2*ratio
            dispatchInstance.getChildByName("scrollBar").x = stage.canvas.width-7*ratio
            dispatchInstance.getChildByName("scrollBar").updateResize(totalHeight,instance.getChildByName("containerContent").x,instance.getChildByName("containerContent").y);
        }

    } ; 


window.Homepage = createjs.promote(Homepage, "Container");
}());