(function () {

    function Gallery(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio
        this.lang = Ilang
        this.setup();
    }
    
    var instance;
    var instanceRefresh
    var dispatchInstance;
    var ratio;
    var aspectRatio;
    var lang;

    var preloadData;
    var loader
    var imagesLoaded;
    var navLayer;
    var containerGallery;
    var containerGalleryMask;
    var containerNext;
    var containerBack;
    var containerTitle
    var arrow;
    var arrowBack;
    var data;
    var nav;
    var overlayFill;
    var widthTitle
    var logo
    var loaderData

    var p = createjs.extend(Gallery, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio
        lang = this.lang;

    };

    p.addElements = function(Idata,Iarrow,IarrowBack,Ilogo,ILoaderData) {

        preloadDataJson(Idata)
        arrow = Iarrow;
        arrowBack = IarrowBack
        logo = Ilogo
        loaderData = ILoaderData
    }

    function preloadDataJson(Ijson){

        //Load Json File
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        console.log("Loader Data: Gallery")
        data = event.result.content[0]
        loadImages(event.result.content[0].img)
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles);
        loader.register(instance,lang,logo,loaderData,ratio)
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

        containerGallery = new createjs.Container();
        containerTitle  = new createjs.Container();

        for(var i=0;i<imagesLoaded.length;i++){
            var container = new createjs.Container;
            container.name = "container"+i;
            containerGallery.addChild(container);
        }

        navLayer = imagesLoaded.length-1
        nav = navLayer
        navData = 0

        for(var i=0;i<imagesLoaded.length;i++){
            containerGallery.getChildByName("container"+navLayer).addChild(imagesLoaded[i])
            navLayer--
        }

        containerGalleryMask = new createjs.Shape();
        containerGalleryMask.graphics.beginFill("#FFFFFF").drawRect(0, 0, 800, 500);

        containerGallery.mask = containerGalleryMask;

        containerNext = new createjs.Container();
        
        overlayFill = new createjs.Shape();
        overlayFill.graphics.beginFill("#FFFFFF").drawRect(0, 0, 800, 450);
        overlayFill.compositeOperation = "overlay";
        overlayFill.alpha = 0

        var containerNextArrowTitle = new createjs.Container();
        containerNextArrowTitle.name = "containerNextArrowTitle";
        
        containerBack = new createjs.Container();
        
        var containerBackArrowTitle = new createjs.Container();
        containerBackArrowTitle.name = "containerBackArrowTitle";

        var shapeNext = new createjs.Shape();
        shapeNext.name = "shapeNext"
        shapeNext.graphics.beginFill("#4b7ea3").drawRect(0, 0, 140*ratio, 50*ratio); 
        containerNext.addChild(shapeNext);

        var shapeNextColor = new createjs.Shape();
        shapeNextColor.name = "shapeNextColor"
        shapeNextColor.graphics.beginFill("#000000").drawRect(0, 0, 140*ratio, 50*ratio);
        shapeNextColor.scaleX = 0
        containerNext.addChild(shapeNextColor);

        var shapeBack = new createjs.Shape();
        shapeBack.name = "shapeBack"
        shapeBack.graphics.beginFill("#4b7ea3").drawRect(0, 0, 140*ratio, 50*ratio); 
        containerBack.addChild(shapeBack);

        var shapeBackColor = new createjs.Shape();
        shapeBackColor.name = "shapeBackColor"
        shapeBackColor.graphics.beginFill("#000000").drawRect(0, 0, 140*ratio, 50*ratio);
        shapeBackColor.scaleX = 0
        containerBack.addChild(shapeBackColor);

        var backTxt = new createjs.Text();
        backTxt.font = "12px OpenSans-Semibold";
        backTxt.textBaseline = "alphabetic";
        backTxt.color = "#ffffff";
        backTxt.text = data.titleBack[lang];
        backTxt.x = 15*ratio+20*ratio;
        backTxt.y = backTxt.getBounds().height*ratio;
        backTxt.scaleX = ratio;
        backTxt.scaleY = ratio;
        containerBackArrowTitle.addChild(backTxt);

        var nextTxt = new createjs.Text();
        nextTxt.font = "12px OpenSans-Semibold";
        nextTxt.textBaseline = "alphabetic";
        nextTxt.color = "#ffffff";
        nextTxt.text = data.titleNext[lang];
        nextTxt.y = nextTxt.getBounds().height*ratio;
        nextTxt.scaleX = ratio;
        nextTxt.scaleY = ratio;
        containerNextArrowTitle.addChild(nextTxt);

        var titleOneTxt = new createjs.Text();
        titleOneTxt.name = "titleOneTxt"
        titleOneTxt.font = "72px PathwayGothicOne-Regular";
        titleOneTxt.textBaseline = "alphabetic";
        titleOneTxt.color = "#4b7ea3";
        titleOneTxt.text = data.title[lang];
        titleOneTxt.scaleX = ratio;
        titleOneTxt.scaleY = ratio;

        var descGalleryTxt = new createjs.Text();
        descGalleryTxt.name = "descGalleryTxt"
        descGalleryTxt.font = "24px PathwayGothicOne-Regular";
        descGalleryTxt.textBaseline = "alphabetic";
        descGalleryTxt.color = "#131313";
        descGalleryTxt.text = data.label[lang][navData];
        descGalleryTxt.scaleX = ratio;
        descGalleryTxt.scaleY = ratio;
        descGalleryTxt.y = 450+descGalleryTxt.getBounds().height*ratio+10*ratio
        widthTitle = titleOneTxt.getBounds().width*ratio

        var shapeTitles = new createjs.Shape();
        shapeTitles.name = "shapeTitles"
        shapeTitles.graphics.beginFill("#4b7ea3").drawRect(0, 0, titleOneTxt.getBounds().width*ratio, 6*ratio);
        shapeTitles.y = 10*ratio
        containerTitle.addChild(shapeTitles)

        containerGallery.x = Math.floor(stage.canvas.width/2-800/2)
        containerGallery.y = Math.floor(stage.canvas.height/2-450/2)

        containerGalleryMask.x = Math.floor(stage.canvas.width/2-800/2)
        containerGalleryMask.y = Math.floor(stage.canvas.height/2-450/2)

        overlayFill.x = Math.floor(stage.canvas.width/2-800/2)
        overlayFill.y = Math.floor(stage.canvas.height/2-450/2)

        containerBack.x = stage.canvas.width/2-800/2-140*ratio-100*ratio
        containerBack.y = stage.canvas.height/2-50/2*ratio

        containerNext.x = stage.canvas.width/2+800/2+100*ratio;
        containerNext.y = stage.canvas.height/2-50/2*ratio

        arrow.x = nextTxt.getBounds().width*ratio+20*ratio;
        arrow.y = 4*ratio

        arrowBack.y = 4*ratio

        var widthBack = backTxt.x+backTxt.getBounds().width*ratio
        var widthNext = arrow.x+15*ratio;

        containerBackArrowTitle.x = 140/2*ratio-widthBack/2
        containerBackArrowTitle.y = 50/2*ratio-backTxt.getBounds().height*ratio+5*ratio
        containerNextArrowTitle.x = 140/2*ratio-widthNext/2
        containerNextArrowTitle.y = 50/2*ratio-nextTxt.getBounds().height*ratio+5*ratio

        containerTitle.x = stage.canvas.width/2-widthTitle/2
        containerTitle.y = stage.canvas.height/2-450/2-25*ratio-80*ratio

        containerBackArrowTitle.addChild(arrowBack);
        containerNextArrowTitle.addChild(arrow);

        containerNext.addChild(containerNextArrowTitle);
        containerBack.addChild(containerBackArrowTitle);

        containerTitle.addChild(titleOneTxt);

        containerGallery.addChild(descGalleryTxt);

        instance.addChild(containerGallery);
        instance.addChild(containerBack);
        instance.addChild(containerNext);
        instance.addChild(containerTitle);
        instance.addChild(overlayFill)

        addAnimation();

    }

    function addAnimation(){

        TweenMax.from(containerTitle.getChildByName("titleOneTxt"), 0.7, {delay:1.8,y:containerTitle.getChildByName("titleOneTxt").y+50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerTitle.getChildByName("shapeTitles"), 0.7, {delay:2,scaleX:0,ease:Expo.easeInOut})

        TweenMax.from(containerBack.getChildByName("shapeBack"), 0.5, {delay:2.5,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(containerBack.getChildByName("containerBackArrowTitle"), 0.7, {delay:2.5,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(containerGalleryMask, 0.7, {delay:2.8,scaleX:0,ease:Expo.easeInOut})

        TweenMax.from(containerNext.getChildByName("shapeNext"), 0.7, {delay:3.2,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(containerNext.getChildByName("containerNextArrowTitle"), 0.7, {delay:3.2,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(overlayFill, 0.5, {delay:3,alpha:1,ease:Expo.easeInOut,onComplete:continueAddAnimation})
        
        TweenMax.from(containerTitle, 1, {delay:1.8,y:containerTitle.y-50*ratio,ease:Expo.easeInOut})
    }

    function continueAddAnimation(){
        
        TweenMax.to(overlayFill, 1, {alpha:0,ease:Expo.easeInOut,onComplete:addHits})
    }

    p.removeAnimation = function(){

        removeHits();

        TweenMax.to(containerNext.getChildByName("shapeNext"), 0.7, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(containerNext.getChildByName("containerNextArrowTitle"), 0.5, {alpha:0,ease:Expo.easeInOut})

        TweenMax.to(containerGalleryMask, 0.7, {delay:0.5,scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(containerBack.getChildByName("shapeBack"), 0.7, {delay:0.7,scaleX:0,ease:Expo.easeInOut,onComplete:kill})
        TweenMax.to(containerBack.getChildByName("containerBackArrowTitle"), 0.5, {delay:0.7,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(containerTitle.getChildByName("titleOneTxt"), 0.7, {delay:1,y:containerTitle.getChildByName("titleOneTxt").y-50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(containerTitle.getChildByName("shapeTitles"), 0.7, {delay:0.5,scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(containerTitle, 1, {delay:0.7,y:containerTitle.y+100*ratio,ease:Expo.easeInOut})

    }

    function kill(){
        instance.removeChild(containerGalleryMask);
        containerGalleryMask = null
        instance.removeChild(containerGallery);
        containerGallery = null
        instance.removeChild(containerNext);
        containerNext = null
        instance.removeChild(containerBack);
        containerBack= null
        instance.removeChild(overlayFill);
        overlayFill= null
        instance.removeChild(containerTitle);
        containerTitle= null
    }

    function handlerOver(event){
        switch(event.target.type){
            case "back":
                TweenMax.to(containerBack.getChildByName("shapeBackColor"), 0.7, {scaleX:1,ease:Expo.easeInOut})
            break;
             case "next":
                TweenMax.to(containerNext.getChildByName("shapeNextColor"), 0.7, {scaleX:1,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerOut(event){
        switch(event.target.type){
            case "back":
                TweenMax.to(containerBack.getChildByName("shapeBackColor"), 0.7, {scaleX:0,ease:Expo.easeInOut})
            break;
            case "next":
                TweenMax.to(containerNext.getChildByName("shapeNextColor"), 0.7, {scaleX:0,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerClick(event){

        containerBack.getChildByName("shapeBack").removeEventListener("click", handlerClick);
        containerNext.getChildByName("shapeNext").removeEventListener("click", handlerClick);

        switch(event.target.type){
            case "back":
                if(nav<imagesLoaded.length-1){
                    nav++
                    navData--
                    TweenMax.to(containerGallery.getChildByName("container"+nav), 0.7, {alpha:1,ease:Expo.easeInOut})
                    containerGallery.getChildByName("descGalleryTxt").text = data.label[lang][navData]
                }
            break;
            case "next":
                if(nav>0){
                    TweenMax.to(containerGallery.getChildByName("container"+nav), 0.7, {alpha:0,ease:Expo.easeInOut})
                    nav--
                    navData++
                    containerGallery.getChildByName("descGalleryTxt").text = data.label[lang][navData]
                }
            break;
        }

        overlayFill.alpha = 1;
        TweenMax.to(overlayFill, 1, {alpha:0,ease:Expo.easeInOut,onComplete:addClicks})
    }

    function addClicks(){
        containerBack.getChildByName("shapeBack").addEventListener("click", handlerClick);
        containerNext.getChildByName("shapeNext").addEventListener("click", handlerClick);
    }   

    function addHits(){

        containerNext.getChildByName("shapeNext").cursor = "pointer";
        containerNext.getChildByName("shapeNext").type = "next";
        containerNext.getChildByName("shapeNext").addEventListener("mouseover", handlerOver);
        containerNext.getChildByName("shapeNext").addEventListener("mouseout", handlerOut)
        containerNext.getChildByName("shapeNext").addEventListener("click", handlerClick);

        containerBack.getChildByName("shapeBack").cursor = "pointer";
        containerBack.getChildByName("shapeBack").type = "back";
        containerBack.getChildByName("shapeBack").addEventListener("mouseover", handlerOver);
        containerBack.getChildByName("shapeBack").addEventListener("mouseout", handlerOut)
        containerBack.getChildByName("shapeBack").addEventListener("click", handlerClick);

    }

    function removeHits(){

        containerNext.getChildByName("shapeNext").cursor = "auto";
        containerNext.getChildByName("shapeNext").removeEventListener("mouseover", handlerOver);
        containerNext.getChildByName("shapeNext").removeEventListener("mouseout", handlerOut)
        containerNext.getChildByName("shapeNext").removeEventListener("click", handlerClick);

        containerBack.getChildByName("shapeBack").cursor = "auto";
        containerBack.getChildByName("shapeBack").removeEventListener("mouseover", handlerOver);
        containerBack.getChildByName("shapeBack").removeEventListener("mouseout", handlerOut)
        containerBack.getChildByName("shapeBack").removeEventListener("click", handlerClick);
        
    }


    p.resize = function() {

        if(containerGallery){

            containerGallery.x = Math.floor(stage.canvas.width/2-800/2)
            containerGallery.y = Math.floor(stage.canvas.height/2-450/2)

            containerGalleryMask.x = Math.floor(stage.canvas.width/2-800/2)
            containerGalleryMask.y = Math.floor(stage.canvas.height/2-450/2)

        }

        if(overlayFill){
            overlayFill.x = Math.floor(stage.canvas.width/2-800/2)
            overlayFill.y = Math.floor(stage.canvas.height/2-450/2)
        }

        if(containerBack){
            containerBack.x = stage.canvas.width/2-800/2-140*ratio-100*ratio
            containerBack.y = stage.canvas.height/2-50/2*ratio
        }

        if(containerNext){
            containerNext.x = stage.canvas.width/2+800/2+100*ratio;
            containerNext.y = stage.canvas.height/2-50/2*ratio
        }

        if(containerTitle){
            containerTitle.x = stage.canvas.width/2-widthTitle/2
            containerTitle.y = stage.canvas.height/2-450/2-25*ratio-80*ratio
        }

        if(loader)loader.resize();

    } ; 

window.Gallery = createjs.promote(Gallery, "Container");
}());