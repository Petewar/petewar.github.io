(function () {

    function Main(Iratio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();

    }
    
    var ratio;
    var instance;
    var aspectRatio;

    var maskIntro;
    var newsReader;
    var introVideo;
    var home;
    var menu;
    var scrollBar;
    var scrollBar2;
    var totalSizeHome;
    var totalSizeNews;
    var wireframe;
    var credits;
    var loader;
    
    var assets = ["images/agency_services.jpg","images/port_services.jpg","images/solutions.jpg","images/container_services.jpg","images/departure_services.jpg","images/office1.jpg","images/office2.jpg","images/oporto.jpg","images/map.jpg"]
    var loadedAssets;
    var loadingGif;

    var width=28;
    var height=33;
    var menuHeight = 129
    var viewCredits;

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        aspectRatio = new AspectRatio();
        ratio = this.ratio;
        instance = this;

        //playIntro();
        init();
    } ;

    function playIntro(){

        loadingGif = new Gif(ratio);
        loadingGif.x = stage.canvas.width/2-75/1.5*ratio
        loadingGif.y = stage.canvas.height/2-75/1.5*ratio-25*ratio
        instance.addChild(loadingGif)

        introVideo = new Video("video/Peninsular_intro.mov",instance,false)
        aspectRatio.resize(introVideo,1920,1080);
        instance.addChild(introVideo);

        maskIntro = new createjs.Shape();
        maskIntro.graphics.drawRect(0, 0, stage.canvas.width,stage.canvas.height);
        introVideo.mask = maskIntro;

        instance.addEventListener("end", endIntro);
    }

    function endIntro(event){

        loadingGif.kill();
        loadingGif = null;

        createjs.Tween.get(maskIntro).to({scaleY:0}, 800, createjs.Ease.circInOut)
        .call(function(){
            maskIntro.graphics.clear();
            maskIntro = null;
            introVideo.kill();
            instance.removeChild(introVideo);
            introVideo = null;
            instance.removeEventListener("end", endIntro);
            init();
         });
    }

    function init(){

        loader = new Loader(assets,ratio,false);
        loader.register(instance);
        instance.addEventListener("loaderComplete", loadAssetsComplete);

    }

    function createSvg(Isvg,Icolor){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        svg.scaleX = ratio*2.5;
        svg.scaleY = ratio*2.5;
        return svg;
    }

    function loadAssetsComplete(evt) {

        instance.removeEventListener("loaderComplete", loadAssetsComplete);
        loader.kill();
        loader = null;
        loadedAssets = evt.contentLoader;

        home = new Home(instance,ratio,aspectRatio,loadedAssets);
        instance.addChild(home);

        wireframe = home.getWireframe()
        totalSizeHome = stage.canvas.height+wireframe[0]+wireframe[1]+wireframe[2]+wireframe[3]+wireframe[4]-5*ratio

        menu = new Menu(instance,ratio);
        instance.addChild(menu);

        scrollBar = new ScrollBar(instance,home,totalSizeHome);
        scrollBar.x = stage.canvas.width-5*ratio;
        instance.addChild(scrollBar);
        
        instance.addEventListener("scrollChange",handlerUpdateScroll);
        instance.addEventListener("changeMenu",handlerUpdateNavigation);
        instance.addEventListener("changeToBlockScroll",handlerChangeToBlockScroll);

        instance.addEventListener("openOverlay",handlerOpenOverlay);
        instance.addEventListener("closeOverlay",handlerCloseOverlay);
    
    }

    function handlerOpenOverlay(event){       

       instance.removeEventListener("scrollChange",handlerUpdateScroll);

       home.mouseChildren = false;
       menu.mouseChildren = false;
       
       scrollBar.kill();
       instance.removeChild(scrollBar);
       scrollBar = null

       if((event.titleN==null)&&(event.dateN==null)&&(event.galleryN==null)){

           viewCredits= true
           credits = new Credits(ratio,instance);
           instance.addChild(credits);

       }else{

           viewCredits= false
           newsReader = new NewsReader(instance,ratio,aspectRatio,event.titleN,event.dateN,event.galleryN);
           instance.addChild(newsReader);
           
           /*
           totalSizeNews = newsReader.getHeight()
           if(totalSizeNews>stage.canvas.height){
                if(!scrollBar2){
                     scrollBar2 = new ScrollBar(instance,newsReader,totalSizeNews);
                     scrollBar2.updatePos(0);
                     scrollBar2.x = stage.canvas.width-5*ratio;
                     instance.addChild(scrollBar2);
                }
           }*/
       }

    }

    function handlerCloseOverlay(event){

         home.mouseChildren = true;
         menu.mouseChildren = true;

        if(viewCredits==false){
           instance.removeChild(newsReader);
           newsReader = null
        }else{
           instance.removeChild(credits);
           newsReader = null
        }

       wireframe = home.getWireframe()
       totalSizeHome = stage.canvas.height+wireframe[0]+wireframe[1]+wireframe[2]+wireframe[3]+wireframe[4]-5*ratio

       scrollBar = new ScrollBar(instance,home,totalSizeHome);
       scrollBar.x = stage.canvas.width-5*ratio;
       instance.addChild(scrollBar);

       instance.addEventListener("scrollChange",handlerUpdateScroll);

    }

    function handlerUpdateScroll(event){
        
        if((menu)&&(menu.getStateMenu()!="skrink")&&(event.yPos<-150*ratio)){
            menu.shrinkMenu();
        }else if ((menu)&&(menu.getStateMenu()!="expand")&&(event.yPos>-100*ratio)){
            menu.expandMenu();
        }

        if(event.yPos>=-stage.canvas.height){
            menu.updateNavigation(0)
        }

        if(event.yPos<=-stage.canvas.height+menuHeight*ratio){
            menu.updateNavigation(1)
        }

        if(event.yPos<=-stage.canvas.height-wireframe[0]+menuHeight*ratio){
            menu.updateNavigation(2)
        }
        
        if(event.yPos<=-stage.canvas.height-wireframe[0]-wireframe[1]+menuHeight*ratio){
            menu.updateNavigation(3)
            
        }

         if(event.yPos<=-stage.canvas.height-wireframe[0]-wireframe[1]-wireframe[2]+menuHeight*ratio){
            menu.updateNavigation(4)
           
        }
    }

    function handlerChangeToBlockScroll(event){
       wireframe = home.getWireframe()
       totalSizeHome = stage.canvas.height+wireframe[0]+wireframe[1]+wireframe[2]+wireframe[3]+wireframe[4]-5*ratio
       scrollBar.updateResize(totalSizeHome);
       scrollBar.updatePos(-stage.canvas.height-wireframe[0]+menuHeight*ratio-event.yPos);
    }

    function handlerUpdateNavigation(event){
        
        switch(event.nav) {
            case 0:
                scrollBar.updatePos(0);
            break;
            case 1:
                scrollBar.updatePos(-stage.canvas.height+menuHeight*ratio);
            break;
            case 2:
                scrollBar.updatePos(-stage.canvas.height-wireframe[0]+menuHeight*ratio);
            break;
            case 3:
                scrollBar.updatePos(-stage.canvas.height-wireframe[0]-wireframe[1]+menuHeight*ratio);
            break;
            case 4:
                scrollBar.updatePos(-stage.canvas.height-wireframe[0]-wireframe[1]-wireframe[2]+menuHeight*ratio);
            break;
        }
    }

    p.resize = function() {

        if(introVideo){
            maskIntro.graphics.clear();
            maskIntro.graphics.drawRect(0, 0, stage.canvas.width,stage.canvas.height);
            aspectRatio.resize(introVideo,1920,1080);   
        }

        if(loadingGif){
            loadingGif.x = stage.canvas.width/2-75/1.5*ratio
            loadingGif.y = stage.canvas.height/2-75/1.5*ratio-25*ratio
        }

        if(home){
            home.resize();
        }
    
        if(scrollBar){
            scrollBar.x = stage.canvas.width-5*ratio
            wireframe = home.getWireframe()
            totalSizeHome = stage.canvas.height+wireframe[0]+wireframe[1]+wireframe[2]+wireframe[3]+wireframe[4]-5*ratio
            scrollBar.updateResize(totalSizeHome);
        }

        if(menu)menu.resize();

        if(loader)loader.resize();

        if(newsReader)newsReader.resize();

        if(credits)credits.resize();
        /*if(scrollBar2) {
            if(totalSizeNews>stage.canvas.height){
                scrollBar2.x = stage.canvas.width-5*ratio;
                totalSizeNews = newsReader.getHeight()
                scrollBar2.updateResize(totalSizeNews);
            }
        }*/

    } ;  

window.Main = createjs.promote(Main, "Container");
}());