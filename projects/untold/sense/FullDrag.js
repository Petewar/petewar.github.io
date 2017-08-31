(function () {

    function FullDrag(IinstanceDispatch,Iratio,IaspectRatio,Ivideos,Images,IDispatch) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.instanceDispatch = IinstanceDispatch;
        this.aspectRatio = IaspectRatio;
        this.videoFiles = Ivideos;
        this.imageFiles = Images;
        this.dispatchDrag = IDispatch;
        this.setup();

    }

    var p = createjs.extend(FullDrag, createjs.Container);

    var loader;
    var videoFiles;
    var imageFiles;

    var videoFirstFrames;
    var lengthProjects;
    var video;
    
    var instance;
    var instanceDispatch;
    var dispatchDrag;
    var maskContainer;
    var mask;
    
    var aspectRatio;
    var ratio;

    var nav =0;

    var offset;
    var dragToNavigate = 300;
    var pauseContentDrag = null;
    var currentContainerDrag;
    var logo2 = "M51.250,31.000 C51.250,31.000 51.228,38.329 49.656,43.354 C48.640,46.599 47.219,50.061 44.416,53.829 C40.314,59.342 32.750,62.500 32.750,62.500 C32.750,62.500 39.148,57.548 38.553,52.652 C34.778,54.672 30.350,55.807 25.499,55.807 C10.812,55.807 -0.204,45.584 -0.204,30.968 C-0.204,30.961 -0.203,30.955 -0.203,30.948 L-0.250,31.000 C-0.250,31.000 -0.228,23.671 1.344,18.646 C2.360,15.401 3.781,11.939 6.584,8.171 C10.686,2.658 18.250,-0.500 18.250,-0.500 C18.250,-0.500 11.920,4.403 12.443,9.275 C16.225,7.260 20.655,6.129 25.499,6.129 C40.187,6.129 51.130,16.353 51.130,30.968 C51.130,31.027 51.122,31.082 51.122,31.141 L51.250,31.000 ZM25.499,17.073 C17.507,17.073 12.396,23.121 12.396,30.968 C12.396,38.744 17.507,44.864 25.499,44.864 C33.419,44.864 38.531,38.744 38.531,30.968 C38.531,23.121 33.419,17.073 25.499,17.073 Z";
    var logoIcon2;

    p.setup = function() {

        console.log("Full Drag")
        instance = this;
        instanceDispatch = this.instanceDispatch;
        dispatchDrag = this.dispatchDrag;
        aspectRatio = this.aspectRatio;
        videosFiles = this.videoFiles;
        imageFiles = this.imageFiles
        ratio = this.ratio

        container = new createjs.Container();
        container.addChild(maskContainer);
        this.addChild(container);

        logoIcon2 = new createSvg(logo2);
        if(ratio>1){
            logoIcon2.regX = 11*ratio
            logoIcon2.regY = 11*ratio
        }else{
            logoIcon2.regX = 22*ratio
            logoIcon2.regY = 22*ratio
            
        }
        
        logoIcon2.x = stage.canvas.width/2
        logoIcon2.y = stage.canvas.height/2
        instance.addChild(logoIcon2);

        reanime();

        loadVideoFirstFrames(imageFiles)
        instance.addEventListener("loaderComplete", loadVideoFirstFramesComplete);

    } ;

    function reanime(){

        logoIcon2.alpha = 1;
        logoIcon2.scaleX = 4;
        logoIcon2.scaleY = 4;
        logoIcon2.rotation = 0;
        createjs.Tween.get(logoIcon2)
        .to({alpha:0,scaleX:2,scaleY:2,rotation:360}, 500, createjs.Ease.circInOut)
        .call(function(){
            createjs.Tween.get(logoIcon2)
            .to({alpha:1,scaleX:1,scaleY:1}, 200, createjs.Ease.circInOut)
        });

        timer = setTimeout(reanime, 1200);

    }

    function createSvg(Isvg,Icolor){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        svg.scaleX = ratio;
        svg.scaleY = ratio;
        return svg;
    }

    function loadVideoFirstFrames(Ifiles){
        loader = new Loader(Ifiles,false);
        loader.register(instance);
    }

    function loadVideoFirstFramesComplete(evt) {

        clearTimeout(timer)

        instance.removeEventListener("loaderComplete", loadVideoFirstFramesComplete);
        videoFirstFrames = evt.contentLoader;
        lengthProjects = videoFirstFrames.length;
        loader.kill();
        loader = null;
        
        console.log("Load Video Images Complete",lengthProjects)

        createjs.Tween.get(logoIcon2)
        .to({alpha:0}, 800, createjs.Ease.circInOut)
        .call(function(){
            instance.removeChild(logoIcon2);
            logoIcon2 = null
            init(videoFirstFrames);
        });
        
        
    }

    function init(IvideoFirstFrames){
        createProjects(IvideoFirstFrames,container);
    }

    function createProjects(Iprojects,Icontainer){

        for(var i=lengthProjects;i>-1;i--){

           var maskShape = new createjs.Shape();
           maskShape.graphics.drawRect(0, 0, stage.canvas.width,stage.canvas.height);
           maskShape.name = "Mask"+i;

           var projectContainer = new createjs.Container();
           projectContainer.name = "Project"+i;
           projectContainer.mouseChildren = false
           projectContainer.cursor = "move";
           
           if(i==lengthProjects) projectContainer.y = 0
           else projectContainer.y = stage.canvas.height

           aspectRatio.resize(projectContainer,1600,1000)
           projectContainer.addChild(Iprojects[i]);
           Icontainer.addChild(maskShape);
           Icontainer.addChild(projectContainer);

           projectContainer.mask = maskShape;
        }

        projectContainer.alpha = 0;
         createjs.Tween.get(projectContainer)
        .to({alpha:1}, 400, createjs.Ease.linear)

        registerDrag(projectContainer);
        playVideo(videosFiles[nav],projectContainer)
    }

    function playVideo(IprojectVideo,Icontainer){
        video = new Video(IprojectVideo)
        Icontainer.y=0;
        Icontainer.addChild(video);
    }

    function registerDrag(Icontainer){
        offset = new createjs.Point();
        currentContainerDrag = Icontainer;
        currentContainerDrag.addEventListener("mousedown", startDrag);
    }

    function startDrag(event) {
        offset.y = stage.mouseY - event.target.y;
        event.target.projectsLength = videoFirstFrames.length-1
        event.target.addEventListener("pressmove", doDrag);
    }

    function doDrag(event) {

        event.target.addEventListener("pressup", stopDrag);
        event.target.y = event.stageY - offset.y;
        container.getChildByName("Mask"+nav).y = event.stageY - offset.y;

        if(pauseContentDrag==false){
            pauseContentDrag = true;
            video.pause();   
        }

        var navigationOrientation;
        
        if(event.target.y>0) navigationOrientation = "less";
        else navigationOrientation = "more";

        if(navigationOrientation=="more"){
             if(nav<lengthProjects-1){
                container.getChildByName("Project"+(nav+1)).y = event.stageY - offset.y + stage.canvas.height;
                container.getChildByName("Mask"+(nav+1)).y = event.stageY - offset.y + stage.canvas.height;   
            }
        }else{
            if(nav>0){
                container.getChildByName("Project"+(nav-1)).y = event.stageY - offset.y - stage.canvas.height;
                container.getChildByName("Mask"+(nav-1)).y = event.stageY - offset.y - stage.canvas.height;   
            }
        }
        
        if(dispatchDrag){
            var customEvent = new createjs.Event("Dragging");
            customEvent.yPos = event.stageY - offset.y;
            customEvent.navigationOrientation = navigationOrientation;
            instanceDispatch.dispatchEvent(customEvent);
        }

    }

    function stopDrag(event) {

        var navigationOrientation;

        if(pauseContentDrag==true){
            pauseContentDrag=false;
            video.play();
        }
        
        if(event.target.y>0) navigationOrientation = "less";
        else navigationOrientation = "more";

       if(Math.abs(event.target.y)>dragToNavigate){
            if(navigationOrientation=="more"){
                if(nav<lengthProjects-1){
                    navigateMore(event.target,0)
                }else{
                   if(nav<lengthProjects-1){
                        createjs.Tween.get(container.getChildByName("Project"+(nav+1))).to({y:stage.canvas.height}, 400, createjs.Ease.backOut) 
                        createjs.Tween.get(container.getChildByName("Mask"+(nav+1))).to({y:stage.canvas.height}, 400, createjs.Ease.backOut) 
                    }else{
                        createjs.Tween.get(event.target).to({y:0}, 400, createjs.Ease.backOut)
                        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({y:0}, 400, createjs.Ease.backOut)
                    }
                }
            }else{
                if(nav>0){
                    navigateLess(event.target,0)
                }else{
                   if(nav>0){
                        createjs.Tween.get(container.getChildByName("Project"+(nav-1))).to({y:-stage.canvas.height}, 400, createjs.Ease.backOut) 
                        createjs.Tween.get(container.getChildByName("Mask"+(nav-1))).to({y:-stage.canvas.height}, 400, createjs.Ease.backOut) 
                    }else{
                        createjs.Tween.get(event.target).to({y:0}, 400, createjs.Ease.backOut)
                        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({y:0}, 400, createjs.Ease.backOut)
                    }
                }
            }
        }else{

            if(navigationOrientation=="more"){
                if(nav<lengthProjects-1){
                    createjs.Tween.get(container.getChildByName("Project"+(nav+1))).to({y:stage.canvas.height}, 400, createjs.Ease.backOut) 
                    createjs.Tween.get(container.getChildByName("Mask"+(nav+1))).to({y:stage.canvas.height}, 400, createjs.Ease.backOut) 
                }
            }else{
                if(nav>0){
                    createjs.Tween.get(container.getChildByName("Project"+(nav-1))).to({y:-stage.canvas.height}, 400, createjs.Ease.backOut) 
                    createjs.Tween.get(container.getChildByName("Mask"+(nav-1))).to({y:-stage.canvas.height}, 400, createjs.Ease.backOut) 
                }
            }

            createjs.Tween.get(event.target).to({y:0}, 400, createjs.Ease.backOut)
            createjs.Tween.get(container.getChildByName("Mask"+nav)).to({y:0}, 400, createjs.Ease.backOut)
        }

         if(dispatchDrag){
            var customEvent = new createjs.Event("DraggingStop");
            customEvent.nav = nav
            instanceDispatch.dispatchEvent(customEvent);
        }
    }

    function navigateMore(target,ifactor){
        
        createjs.Tween.get(target)
        .to({y:-stage.canvas.height}, 800+ifactor, createjs.Ease.backOut)

        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({y:-stage.canvas.height}, 800+ifactor, createjs.Ease.backOut)
        nav++
        killEventDrag(target);
        registerDrag(container.getChildByName("Project"+nav))
        createjs.Tween.get(container.getChildByName("Project"+nav)).to({y:0}, 400+ifactor, createjs.Ease.backOut)
        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({y:0}, 400+ifactor, createjs.Ease.backOut)
        .call(function(){
            video.kill();
            playVideo(videosFiles[nav],container.getChildByName("Project"+nav))
            console.log("Next Project",videosFiles[nav],container.getChildByName("Project"+nav));
         });
    }


    function navigateLess(target,ifactor){
    
            createjs.Tween.get(target)
            .to({y:stage.canvas.height}, 800+ifactor, createjs.Ease.backOut)

            createjs.Tween.get(container.getChildByName("Mask"+nav)).to({y:stage.canvas.height}, 800+ifactor, createjs.Ease.backOut)
            nav--
            killEventDrag(target);
            registerDrag(container.getChildByName("Project"+nav))
            createjs.Tween.get(container.getChildByName("Project"+nav)).to({y:0}, 400+ifactor, createjs.Ease.backOut)
            createjs.Tween.get(container.getChildByName("Mask"+nav)).to({y:0}, 400+ifactor, createjs.Ease.backOut)
            .call(function(){
                video.kill();
                playVideo(videosFiles[nav],container.getChildByName("Project"+nav))
                console.log("Previous Project",videosFiles[nav],container.getChildByName("Project"+nav));
            });
    }
    
    function killEventDrag(Itarget){
        //video.pause();
        Itarget.removeEventListener("pressmove", doDrag);
        Itarget.removeEventListener("pressup", stopDrag);
        Itarget.removeEventListener("mousedown", startDrag);

    }
    /**
         *  event handlers
     */    

     p.navigateFrom = function(Iaction) {
        if(Iaction=="down") {
            if(nav<lengthProjects-1) navigateMore(currentContainerDrag,200);
        }
        else {
           if(nav>0)navigateLess(currentContainerDrag,200);   
        }

        if(dispatchDrag){
            var customEvent = new createjs.Event("DraggingStop");
            customEvent.nav = nav
            instanceDispatch.dispatchEvent(customEvent);
        }

     }

     p.pauseVideo = function() {
        video.pause();
     }

     p.playVideo = function() {
        video.play();
     }

     p.resize = function() {
        
        for(var j=0;j<lengthProjects;j++){
            container.getChildByName("Mask"+j).graphics.clear();
            container.removeChild(container.getChildByName("Mask"+j))
        }

        for(var k=0;k<lengthProjects;k++){
           var maskShape = new createjs.Shape();
           maskShape.graphics.drawRect(0, 0, stage.canvas.width,stage.canvas.height);
           maskShape.name = "Mask"+k;
           container.addChild(maskShape);
           container.getChildByName("Project"+k).mask = maskShape;
        }
        
        for(var i=0;i<lengthProjects;i++){

            aspectRatio.resize(container.getChildByName("Project"+i),1600,1000);

            if(i==nav){
                container.getChildByName("Project"+i).y = 0;
                container.getChildByName("Mask"+i).y = 0;
            }else if(i<nav){
                container.getChildByName("Project"+i).y = -stage.canvas.height;
                container.getChildByName("Mask"+i).y = -stage.canvas.height;
            }else{
                container.getChildByName("Project"+i).y = stage.canvas.height;
                container.getChildByName("Mask"+i).y = stage.canvas.height;
            }
            
        }

        if(logoIcon2) {
            logoIcon2.x = stage.canvas.width/2-25*ratio
            logoIcon2.y = stage.canvas.height/2-25*ratio
        }

    } ;

window.FullDrag = createjs.promote(FullDrag, "Container");
}());