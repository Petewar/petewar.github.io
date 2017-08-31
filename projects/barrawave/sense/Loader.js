(function () {

    function Loader(Ifiles) {

        this.Container_constructor();
        this.files = Ifiles;
        this.setup();

    }
    
    var files;
    var content;
    var preload;
    var dispatchInstanceLoader;
    var containerLoading;
    
    var instance;
    var logo;
    var lang;
    var ratio;
    var i=0;

    var p = createjs.extend(Loader, createjs.Container);

    p.setup = function() {

        instance = this;
        content = [];
        files = this.files;
    
    } ;

    function handleProgress(event) {
    }

    function handleFileLoad(event) {

        var bmp = new createjs.Bitmap(event.result);
        content.push(bmp)

    }

    function handleComplete(event) {

        if(containerLoading){
            removeAnimation()  
        }
        else {
            disptach();
        }

    }

     /**
         *  event handlers
     */  

     p.register = function(Iinstance,Ilang,Ilogo,Idata,Iratio) {

        if(Ilogo!=undefined){

            ratio = Iratio

            containerLoading = new createjs.Container();
            Ilogo.name = "logo";
            containerLoading.addChild(Ilogo);
            
            var gif = new Gif(ratio);
            gif.name = "gif";
            gif.regX = 90/2;
            gif.scaleX = ratio
            gif.scaleY = ratio
            gif.x = 118/2*ratio
            gif.y = 44*ratio+100*ratio;
            gif.getAnim(Idata.animations,Idata.frames,true);
            gif.playAnimation();
            containerLoading.addChild(gif);

            containerTilteColors = new createjs.Container();

            var titleColorOneTxt = new createjs.Text();
            titleColorOneTxt.font = "18px PathwayGothicOne-Regular";
            titleColorOneTxt.textBaseline = "alphabetic";
            titleColorOneTxt.color = "#1c3b52";
            titleColorOneTxt.text = Idata.loadingOne[Ilang];
            titleColorOneTxt.scaleX = ratio;
            titleColorOneTxt.scaleY = ratio;

            var titleColorTwoTxt = new createjs.Text();
            titleColorTwoTxt.font = "18px PathwayGothicOne-Regular";
            titleColorTwoTxt.textBaseline = "alphabetic";
            titleColorTwoTxt.color = "#4b7ea3";
            titleColorTwoTxt.text = Idata.loadingTwo[Ilang];
            titleColorTwoTxt.scaleX = ratio;
            titleColorTwoTxt.scaleY = ratio;
            titleColorTwoTxt.x = titleColorOneTxt.getBounds().width*ratio+2*ratio

            containerTilteColors.x = 118/2*ratio-(titleColorOneTxt.getBounds().width*ratio+titleColorTwoTxt.getBounds().width*ratio+2*ratio)/2
            containerTilteColors.y = gif.y + 90*ratio + titleColorOneTxt.getBounds().height*ratio + 20*ratio
            
            containerTilteColors.addChild(titleColorOneTxt);
            containerTilteColors.addChild(titleColorTwoTxt);
            containerLoading.addChild(containerTilteColors)
            Iinstance.addChild(containerLoading);

            containerLoading.x = stage.canvas.width/2-118/2*ratio;
            containerLoading.y = stage.canvas.height/2 - (44*ratio+100*ratio+90*ratio+20*ratio)

            addAnimation();
        }


        dispatchInstanceLoader = Iinstance;
        preload = new createjs.LoadQueue();
        preload.on("progress", handleProgress);
        preload.on("complete", handleComplete);
        preload.on("fileload", handleFileLoad);
        preload.loadManifest(files, true);
        

    } ; 

    function addAnimation(){

        TweenMax.from(containerLoading.getChildByName("logo"), 1, {y:containerLoading.getChildByName("logo").y-50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerLoading.getChildByName("gif"), 1, {delay:0.5,y:containerLoading.getChildByName("gif").y+50*ratio,alpha:0,ease:Expo.easeInOut})
        
        TweenMax.from(containerTilteColors, 1, {delay:0.75,y:containerTilteColors.y+50*ratio,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(containerLoading, 1, {y:containerLoading.y-100*ratio,ease:Expo.easeInOut})

    }

    function removeAnimation(){

        TweenMax.to(containerLoading.getChildByName("logo"), 1, {delay:0.75,y:containerLoading.getChildByName("logo").y-50*ratio,alpha:0,ease:Expo.easeInOut,onComplete:disptach})
        TweenMax.to(containerLoading.getChildByName("gif"), 1, {delay:0.5,y:containerLoading.getChildByName("gif").y+50*ratio,alpha:0,ease:Expo.easeInOut})
        
        TweenMax.to(containerTilteColors, 1, {y:containerTilteColors.y+50*ratio,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(containerLoading, 1, {y:stage.canvas.height/2,ease:Expo.easeInOut})

    }

    function disptach(){

        var customEvent = new createjs.Event("loaderComplete");
        customEvent.contentLoader = content;
        dispatchInstanceLoader.dispatchEvent(customEvent);
    }

    p.resize = function() {
        if(containerLoading){
            containerLoading.x = stage.canvas.width/2-118/2*ratio;
            containerLoading.y = stage.canvas.height/2 - (44*ratio+100*ratio+90*ratio+20*ratio)    
        }
    }

     p.kill = function() {

        preload.removeEventListener("progress", handleProgress);
        preload.removeEventListener("complete", handleComplete);
        preload.removeEventListener("fileload", handleFileLoad);

        if(containerLoading){

            containerLoading.removeChild(containerLoading.getChildByName("logo"));

            containerLoading.getChildByName("gif").stopAnimation();
            containerLoading.getChildByName("gif").kill();
            containerLoading.removeChild(containerLoading.getChildByName("gif"));

            containerLoading.removeChild(containerTilteColors)

            dispatchInstanceLoader.removeChild(containerLoading);
            containerLoading= null

        }

        /*preload = null;
        content = null;
        files = null;
        dispatchInstanceLoader = null;
        instance = null;*/
    } ; 

window.Loader = createjs.promote(Loader, "Container");
}());