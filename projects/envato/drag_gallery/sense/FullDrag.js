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
    var imageWidth;
    var imageHewight;

    var nav =0;

    var offset;
    var dragToNavigate = 300;
    var pauseContentDrag = true;
    var currentContainerDrag;

    p.setup = function() {

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

        loadVideoFirstFrames(imageFiles)
        instance.addEventListener("loaderComplete", loadVideoFirstFramesComplete);

    } ;

    function loadVideoFirstFrames(Ifiles){

        var customInstance = instance;
        loader = new Loader(Ifiles,ratio,false);
        loader.register(customInstance);
    }

    function loadVideoFirstFramesComplete(evt) {

        instance.removeEventListener("loaderComplete", loadVideoFirstFramesComplete);
        videoFirstFrames = evt.contentLoader;

        lengthProjects = videoFirstFrames.length;
        loader.kill();
        loader = null;

        var customEvent = new createjs.Event("fullDragLoadComplete");
        customEvent.state = "complete"
        instanceDispatch.dispatchEvent(customEvent);

        createProjects();

    }

    function createProjects(){

        for(var i=lengthProjects;i>-1;i--){

           var maskShape = new createjs.Shape();
           maskShape.graphics.drawRect(0, 0, stage.canvas.width,stage.canvas.height);
           maskShape.name = "Mask"+i;
           
           maskShape.scaleY = 0;
           createjs.Tween.get(maskShape).to({scaleY:1}, 800, createjs.Ease.circInOut)

           var projectContainer = new createjs.Container();
           projectContainer.name = "Project"+i;
           projectContainer.mouseChildren = false

           if(i==lengthProjects) projectContainer.x = 0
           else projectContainer.x = stage.canvas.width

           projectContainer.addChild(videoFirstFrames[i]);
           container.addChild(maskShape);
           container.addChild(projectContainer);

           projectContainer.mask = maskShape;

        }

        registerDrag(projectContainer);
        playVideo(videosFiles[nav],projectContainer)
    }

    function playVideo(IprojectVideo,Icontainer){

        video = new Video(IprojectVideo)
        Icontainer.x=0;
        Icontainer.addChild(video);

        resizeImages();

    }

    function resizeImages(){

        for(var i=lengthProjects;i>-1;i--){

            if(i>0){
                aspectRatio.resize(videoFirstFrames[i-1],videoFirstFrames[i-1].getBounds().width,videoFirstFrames[i-1].getBounds().height); 
                aspectRatio.resize(video,videoFirstFrames[i-1].getBounds().width,videoFirstFrames[i-1].getBounds().height); 
            }

        }

    }

    function registerDrag(Icontainer){
        offset = new createjs.Point();
        currentContainerDrag = Icontainer;
        currentContainerDrag.addEventListener("mousedown", startDrag);
    }
    
    function startDrag(event) {
        offset.x = stage.mouseX - event.target.x;
        event.target.projectsLength = videoFirstFrames.length-1
        event.target.addEventListener("pressmove", doDrag);
    }

    function doDrag(event) {

        event.target.addEventListener("pressup", stopDrag);
        event.target.x = event.stageX - offset.x;
        container.getChildByName("Mask"+nav).x = event.stageX - offset.x;

        if(pauseContentDrag==false){
            pauseContentDrag = true;
            video.pause();   
        }

        var navigationOrientation;
        
        if(event.target.x>0) navigationOrientation = "less";
        else navigationOrientation = "more";

        if(navigationOrientation=="more"){
             if(nav<lengthProjects-1){
                container.getChildByName("Project"+(nav+1)).x = event.stageX - offset.x + stage.canvas.width;
                container.getChildByName("Mask"+(nav+1)).x = event.stageX - offset.x + stage.canvas.width;   
            }
        }else{
            if(nav>0){
                container.getChildByName("Project"+(nav-1)).x = event.stageX - offset.x - stage.canvas.width;
                container.getChildByName("Mask"+(nav-1)).x = event.stageX - offset.x - stage.canvas.width;   
            }
        }
        
        if(dispatchDrag){
            var customEvent = new createjs.Event("Dragging");
            customEvent.posX = event.stageX - offset.x;
            customEvent.posY = event.stageY - offset.y;
            customEvent.navigationOrientation = navigationOrientation;
            instanceDispatch.dispatchEvent(customEvent);
        }

    }

    function stopDrag(event) {

        currentContainerDrag.alpha = 1

        var navigationOrientation;

        if(pauseContentDrag==true){
            pauseContentDrag=false;
            video.play();
        }
        
        if(event.target.x>0) navigationOrientation = "less";
        else navigationOrientation = "more";

       if(Math.abs(event.target.x)>dragToNavigate){
            if(navigationOrientation=="more"){
                if(nav<lengthProjects-1){
                    navigateMore(event.target,0)
                }else{
                   if(nav<lengthProjects-1){
                        createjs.Tween.get(container.getChildByName("Project"+(nav+1))).to({x:stage.canvas.width}, 400, createjs.Ease.circInOut) 
                        createjs.Tween.get(container.getChildByName("Mask"+(nav+1))).to({x:stage.canvas.width}, 400, createjs.Ease.circInOut) 
                    }else{
                        createjs.Tween.get(event.target).to({x:0}, 400, createjs.Ease.circInOut)
                        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:0}, 400, createjs.Ease.circInOut)
                    }
                }
            }else{
                if(nav>0){
                    navigateLess(event.target,0)
                }else{
                   if(nav>0){
                        createjs.Tween.get(container.getChildByName("Project"+(nav-1))).to({x:-stage.canvas.width}, 400, createjs.Ease.circInOut) 
                        createjs.Tween.get(container.getChildByName("Mask"+(nav-1))).to({x:-stage.canvas.width}, 400, createjs.Ease.circInOut) 
                    }else{
                        createjs.Tween.get(event.target).to({x:0}, 400, createjs.Ease.circInOut)
                        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:0}, 400, createjs.Ease.circInOut)
                    }
                }
            }
        }else{

            if(navigationOrientation=="more"){
                if(nav<lengthProjects-1){
                    createjs.Tween.get(container.getChildByName("Project"+(nav+1))).to({x:stage.canvas.width}, 400, createjs.Ease.circInOut) 
                    createjs.Tween.get(container.getChildByName("Mask"+(nav+1))).to({x:stage.canvas.width}, 400, createjs.Ease.circInOut) 
                }
            }else{
                if(nav>0){
                    createjs.Tween.get(container.getChildByName("Project"+(nav-1))).to({x:-stage.canvas.width}, 400, createjs.Ease.circInOut) 
                    createjs.Tween.get(container.getChildByName("Mask"+(nav-1))).to({x:-stage.canvas.width}, 400, createjs.Ease.circInOut) 
                }
            }

            createjs.Tween.get(event.target).to({x:0}, 400, createjs.Ease.circInOut)
            createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:0}, 400, createjs.Ease.circInOut)
        }

         if(dispatchDrag){
            var customEvent = new createjs.Event("DraggingStop");
            customEvent.nav = nav
            instanceDispatch.dispatchEvent(customEvent);
        }
    }

    function navigateMore(target,ifactor){
        
        createjs.Tween.get(target)
        .to({x:-stage.canvas.width}, 800+ifactor, createjs.Ease.circInOut)

        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:-stage.canvas.width}, 800+ifactor, createjs.Ease.circInOut)
        nav++
        killEventDrag(target);
        registerDrag(container.getChildByName("Project"+nav))
        createjs.Tween.get(container.getChildByName("Project"+nav)).to({x:0}, 400+ifactor, createjs.Ease.circInOut)
        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:0}, 400+ifactor, createjs.Ease.circInOut)
        .call(function(){
            video.kill();
            playVideo(videosFiles[nav],container.getChildByName("Project"+nav))
         });
    }


    function navigateLess(target,ifactor){
    
            createjs.Tween.get(target)
            .to({x:stage.canvas.width}, 800+ifactor, createjs.Ease.circInOut)

            createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:stage.canvas.width}, 800+ifactor, createjs.Ease.circInOut)
            nav--
            killEventDrag(target);
            registerDrag(container.getChildByName("Project"+nav))
            createjs.Tween.get(container.getChildByName("Project"+nav)).to({x:0}, 400+ifactor, createjs.Ease.circInOut)
            createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:0}, 400+ifactor, createjs.Ease.circInOut)
            .call(function(){
                video.kill();
                playVideo(videosFiles[nav],container.getChildByName("Project"+nav))
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

     p.navigateTo = function(INav,ifactor,Iposition) {
        
        if(Iposition=="more"){
            createjs.Tween.get(currentContainerDrag)
        .to({x:-stage.canvas.width}, 800+ifactor, createjs.Ease.circInOut)

        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:-stage.canvas.width}, 800+ifactor, createjs.Ease.circInOut)

        }else{
             createjs.Tween.get(currentContainerDrag)
            .to({x:stage.canvas.width}, 800+ifactor, createjs.Ease.circInOut)

            createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:stage.canvas.width}, 800+ifactor, createjs.Ease.circInOut)
        }

        
        nav=INav
        killEventDrag(currentContainerDrag);
        registerDrag(container.getChildByName("Project"+nav))
        createjs.Tween.get(container.getChildByName("Project"+nav)).to({x:0}, 400+ifactor, createjs.Ease.circInOut)
        createjs.Tween.get(container.getChildByName("Mask"+nav)).to({x:0}, 400+ifactor, createjs.Ease.circInOut)
        .call(function(){
            video.kill();
            playVideo(videosFiles[nav],container.getChildByName("Project"+nav))
         });

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

            if(i==nav){
                container.getChildByName("Project"+i).x = 0;
                container.getChildByName("Mask"+i).x = 0;
            }else if(i<nav){
                container.getChildByName("Project"+i).x = -stage.canvas.width;
                container.getChildByName("Mask"+i).x = -stage.canvas.width;
            }else{
                container.getChildByName("Project"+i).x = stage.canvas.width;
                container.getChildByName("Mask"+i).x = stage.canvas.width;
            }
            
        }

        resizeImages();

        if(loader)loader.resize();

    } ;

window.FullDrag = createjs.promote(FullDrag, "Container");
}());