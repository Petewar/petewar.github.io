(function () {

    function Main(Iratio) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();
    }
    
    var instance;
    var instanceRefresh;
    var ratio;

    //sense library
    var loader;
    var svg;

    //Fonts Files
    var fonts = ["PathwayGothicOne-Regular","OpenSans-Bold","OpenSans-Semibold","OpenSans-Regular"];
    
    //data
    var splashData;
    var menuData;
    var sideBarData
    var viewOneData;
    var viewTwoData;
    var viewThreeData;
    var viewFourData;
    var viewFiveData;
    var viewSixData;
    var viewSevenData;

    //images
    var imagesLoaded = [];

    //Navigations
    var nav = -1
    var lang;
    var visitQuick = false

    //classes Library
    var splash;
    var view;
    var viewsNavigator;
    var quickNavigator
    var menu;
    var sideBar;

    //parallax
    var parallax;

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh= this;
        ratio = this.ratio;
        svg = new Svg(ratio);
        aspectRatio = new AspectRatio(ratio);

        var fontLoader = new FontLoader(fonts, {
            
            "fontLoaded": function(font) {
                // One of the fonts was loaded
                //console.log("Font Loaded: " + font.family);
            },

            "complete": function(error) {
                if (error !== null) {
                    // Reached the timeout but not all fonts were loaded
                    //console.log(error.message);
                    //console.log(error.notLoadedFonts);

                } else {
                    console.log("Fonts Loaded: "+fonts);
                    // All fonts were loaded
                    preloadDataJson()
                }
            }
        }, 3000);

        fontLoader.loadFonts();

    };

    function preloadDataJson(){

        //Load Json File
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile("data/content.json", true);

    }

    function preloadDataComplete(event) {
        
        console.log("Loader Data: "+"data/content.json")

        //remove preloadData
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        splashData = event.result.content[0];
        sideBarData = event.result.content[1];
        menuData = event.result.content[2];
        
        viewOneData = event.result.content[3];
        viewTwoData = event.result.content[4];
        viewThreeData = event.result.content[5];
        viewFourData = event.result.content[6];
        viewFiveData = event.result.content[7];
        viewSixData = event.result.content[8];
        viewSevenData = event.result.content[9];

        //load images for videos
        loadImages([splashData.cloudsPng,splashData.cloudsBg,splashData.cloudsPngtwo,splashData.logo],false);
    }

    function loadImages(iFiles,Ianimated){
        
        //New Loader
        loader = new Loader(iFiles);

        if(Ianimated==false)loader.register(instance)
        else loader.register(instance,lang,svg.createSvg(splashData.logoVector,"#4b7ea3"),splashData,ratio)
        
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

        if(nav==-1)addSplash();
        else {

            instance.addEventListener("stopParallaxView", stopParallaxViewHandler);
            instance.addEventListener("runParallaxView", runParallaxViewHandler);
            instance.addEventListener("removeView", removeElementsViewHandler);
            instance.addEventListener("hideMenu", hideMenuHandler);
            instance.addEventListener("showMenu", showMenuHandler);
            instance.addEventListener("hideBuy", hideBuyHandler);
            instance.addEventListener("showBuy", showBuyHandler);
            instance.addEventListener("openBuy", openBuyHandler);

            viewsNavigator = new ViewsNavigator(instance,ratio,aspectRatio,lang);
            viewsNavigator.addElements(splashData,svg.createSvg(splashData.views,"#FFFFFF"),svg.createSvg(splashData.views,"#4b7ea3"),[imagesLoaded[7],imagesLoaded[8],imagesLoaded[9],imagesLoaded[10],imagesLoaded[11],imagesLoaded[12],imagesLoaded[13]],[viewOneData,viewTwoData,viewThreeData,viewFourData,viewFiveData,viewSixData,viewSevenData],svg.createSvg(splashData.close,"#4b7ea3"),svg.createSvg(splashData.close,"#ffffff"));

            view = new View(instance,ratio,aspectRatio,lang);
            view.addElements(getImagesView(),getViewData(),getFeatureHotSpot(),getFeatureVideoHotSpot(),getVideoFx(),splashData.labelTour[lang],splashData.labelFeatureVideo[lang],splashData.labelFeatureImage[lang],nav);
            
            quickNavigator = new QuickNavigator(instance,ratio,aspectRatio,lang);
            quickNavigator.addElements(splashData);

            sideBar = new SideBar(instance,ratio,aspectRatio,lang);
            sideBar.addElements(sideBarData,svg.createSvg(splashData.arrow,"#FFFFFF"),svg.createSvg(splashData.arrowBack,"#FFFFFF"),svg.createSvg(splashData.arrow,"#a49a88"),svg.createSvg(splashData.arrowBack,"#a49a88"),svg.createSvg(splashData.arrow,"#000000"),svg.createSvg(splashData.arrowBack,"#000000"));

            menu = new Menu(instance,ratio,aspectRatio,lang);
            menu.addElements(menuData,svg.createSvg(splashData.logoVector,"#4b7ea3"),svg.createSvg(splashData.close,"#4b7ea3"),svg.createSvg(splashData.close,"#FFFFFF"),svg.createSvg(splashData.arrow,"#FFFFFF"),svg.createSvg(splashData.arrowBack,"#FFFFFF"),splashData,svg.createSvg(splashData.mouse,"#FFFFFF"));

            instance.addChild(view);
            instance.addChild(quickNavigator);
            instance.addChild(viewsNavigator);
            instance.addChild(sideBar);
            instance.addChild(menu);
            
            runParallaxView();

        }

    }

    function addSplash(){

        instance.addEventListener("stopParallax", stopParallax);
        instance.addEventListener("introComplete", loadImagesViews);

        splash = new Splash(instance,ratio,aspectRatio);
        splash.addElements(imagesLoaded[0],imagesLoaded[1],imagesLoaded[2],imagesLoaded[3],splashData,svg.createSvg(splashData.arrow,"#FFFFFF"),svg.createSvg(splashData.arrow,"#4b7ea3"));
        instance.addChild(splash);
        
        runParallaxSplash();

    }

    function removeSplash(){

        instance.removeEventListener("stopParallax", stopParallax);
        instance.removeEventListener("introComplete", loadImagesViews);

        instance.removeChild(splash);
        splash = null;

    }

    function runParallaxSplash(){

        console.log("runParallaxSplash")

        parallax = new zim.Parallax(stage, .1, [
                {obj:splash.getCloudPng(), prop:"x", propChange:100},
                {obj:splash.getCloudPng(), prop:"y", propChange:-100},
                {obj:splash.getCloudPngTwo(), prop:"x", propChange:50},
                {obj:splash.getCloudPngTwo(), prop:"y", propChange:50},
                {obj:splash.getCloudBg(), prop:"x", propChange:25},
                {obj:splash.getCloudBg(), prop:"y", propChange:25},
                ]
        );
    }

    function runParallaxView(){

        console.log("runParallaxView")

        parallax = new zim.Parallax(stage, .1, [
                {obj:view.getImageBg(), prop:"x", propChange:100},
                {obj:view.getImageOne(), prop:"x", propChange:-100},
                {obj:view.getImageTwo(), prop:"x", propChange:200},
                {obj:view.getHotSpotOne(), prop:"x", propChange:50},
                {obj:view.getHotSpotTwo(), prop:"x", propChange:50},
                {obj:view.getHotSpotThree(), prop:"x", propChange:50},
                {obj:view.getHotSpotTour(), prop:"x", propChange:50},
                {obj:view.getHotSpotFeature(), prop:"x", propChange:50},
                ]
        );
    }

    function hideMenuHandler(event){

        menu.hide();
    }

    function showMenuHandler(event){

        menu.show();
    }

    function hideBuyHandler(event){

        sideBar.hide();
    }

    function showBuyHandler(event){

        sideBar.show();
    }

    function openBuyHandler(event){

        timer = setTimeout(showBuyHome, 2500);

    }

    function showBuyHome(event){

        sideBar.openFromSideBar();
    }

    function stopParallax(event){

        console.log("Stop Parallax")

        if(parallax)parallax.dispose();
        parallax = null;
    }


    function removeElementsViewHandler(event){

        view.removeElements();

        if(parallax)parallax.dispose();
        parallax = null;

        nav = event.nav

        view.checkToolTip();
        view.checkVideo();

        view.addElements(getImagesView(),getViewData(),getFeatureHotSpot(),getFeatureVideoHotSpot(),getVideoFx(),splashData.labelTour[lang],splashData.labelFeatureVideo[lang],splashData.labelFeatureImage[lang],nav);
        runParallaxView();

        if((nav>1)&&(nav<6)){
            if(visitQuick==false){
                var timer = setTimeout(addQuickNavigatorAnimation, 1500);
            }else{
                quickNavigator.refresh(nav)
            }
        }else{
            quickNavigator.hide();
        }

    }

    function addQuickNavigatorAnimation(){
        visitQuick = true;
        quickNavigator.addAnimation(nav)
    }

    function stopParallaxViewHandler(event){

        console.log("Stop Parallax")
        view.checkToolTip();
        view.checkVideo();
        if(parallax)parallax.dispose();
        parallax = null;

    }

    function runParallaxViewHandler(event){
        
        view.updateViewPos(); 
        runParallaxView();
    }

    function getViewData(){
        switch(nav){
            case 0:
                return viewOneData;
            break;
            case 1:
                return viewTwoData;
            break;
            case 2:
                return viewThreeData;
            break;
            case 3:
                return viewFourData;
            break;
            case 4:
                return viewFiveData;
            break;
            case 5:
                return viewSixData;
            break;
            case 6:
                return viewSevenData;
            break;
        }
    }

    function getImagesView(){
        switch(nav){
            case 0:
                return [imagesLoaded[0],imagesLoaded[14],imagesLoaded[15]];
            break;
            case 1:
                return [imagesLoaded[1],imagesLoaded[16],imagesLoaded[17]];
            break;
            case 2:
                return [imagesLoaded[2],imagesLoaded[18],imagesLoaded[19]];
            break;
            case 3:
                return [imagesLoaded[3],imagesLoaded[20],imagesLoaded[21]];
            break;
            case 4:
                return [imagesLoaded[4],imagesLoaded[22],imagesLoaded[23]];
            break;
            case 5:
                return [imagesLoaded[5],imagesLoaded[24],imagesLoaded[25]];
            break;
            case 6:
                return [imagesLoaded[6],imagesLoaded[26],imagesLoaded[27]];
            break;
        }
    }

    function loadImagesViews(event){

        removeSplash();
        lang = event.lang
        
        nav++

        //load images for videos
        loadImages([viewOneData.imageParallax,
            viewTwoData.imageParallax,
            viewThreeData.imageParallax,
            viewFourData.imageParallax,
            viewFiveData.imageParallax,
            viewSixData.imageParallax,
            viewSevenData.imageParallax,
            viewOneData.imageNavigator,
            viewTwoData.imageNavigator,
            viewThreeData.imageNavigator,
            viewFourData.imageNavigator,
            viewFiveData.imageNavigator,
            viewSixData.imageNavigator,
            viewSevenData.imageNavigator,
            viewOneData.parallaxOne[0],
            viewOneData.parallaxTwo[0],
            viewTwoData.parallaxOne[0],
            viewTwoData.parallaxTwo[0],
            viewThreeData.parallaxOne[0],
            viewThreeData.parallaxTwo[0],
            viewFourData.parallaxOne[0],
            viewFourData.parallaxTwo[0],
            viewFiveData.parallaxOne[0],
            viewFiveData.parallaxTwo[0],
            viewSixData.parallaxOne[0],
            viewSixData.parallaxTwo[0],
            viewSevenData.parallaxOne[0],
            viewSevenData.parallaxOne[0],
            splashData.backFirstFrame,
            splashData.poolFirstFrame]);

    }

    function getFeatureHotSpot(){
        switch(nav){
            case 0:
                return null;
            break;
            case 1:
                return null;
            break;
            case 2:
                return svg.createSvg(splashData.eye,"#eb8813");
            break;
            case 3:
                return svg.createSvg(splashData.eye,"#eb8813");
            break;
            case 4:
                return svg.createSvg(splashData.eye,"#eb8813");
            break;
            case 5:
                return svg.createSvg(splashData.eye,"#eb8813");
            break;
            case 6:
                return null;
            break;
        }
    }

    function getFeatureVideoHotSpot(){

        switch(nav){
            case 0:
                return null;
            break;
            case 1:
                return null;
            break;
            case 2:
                return svg.createSvg(splashData.eye,"#eb8813");
            break;
            case 3:
                return null;
            break;
            case 4:
                return null;
            break;
            case 5:
                return null;
            break;
            case 6:
                return svg.createSvg(splashData.eye,"#eb8813");
            break;
        }
    }

    function getVideoFx(){

        var object = new Object();

        switch(nav){
            case 0:
                return null;
            break;
            case 1:
                object.firstFrame = imagesLoaded[28]
                object.video = "video/back_view_lights_motion.mp4";
                return object;
            break;
            case 2:
                return null;
            break;
            case 3:
                return null;
            break;
            case 4:
                return null;
            break;
            case 5:
                return null;
            break;
            case 6:
                object.firstFrame = imagesLoaded[29]
                object.video = "video/pool_final_1.mp4";
                return object;
            break;
        }
    }

    p.resize = function() {

        if(splash){
            if(parallax)stopParallax();
            splash.resize();
            if(splash.getIntro()==null) runParallaxSplash();
         }

         if(view){
            if(parallax)stopParallax();
            view.resize();
            runParallaxView();
         }

         if(viewsNavigator)viewsNavigator.resize();

         if(quickNavigator)quickNavigator.resize();

         if(menu)menu.resize();

         if(sideBar)sideBar.resize();

         if(loader)loader.resize();

    } ; 


window.Main = createjs.promote(Main, "Container");
}());