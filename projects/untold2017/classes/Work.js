(function () {

    function Work(Igif,IdispatchInstance,Iratio,Imargin,ItweenTime,IaspectRatio,Ihome,Ibg,IThumbs,IarrowLeft,IarrowRight,IarrowLeftBlack,IarrowRightBlack,IshapeStroke,IshapeFill,IupArrow,IdownArrow,IsoundsInstance,IdragTitle) {

        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.aspectRatio = IaspectRatio;
        this.homeText = Ihome;
        this.bg = Ibg;
        this.thumbs = IThumbs;
        this.gif = Igif;
        this.arrowLeft = IarrowLeft;
        this.arrowRight = IarrowRight;
        this.arrowLeftBlack = IarrowLeftBlack;
        this.arrowRightBlack = IarrowRightBlack;
        this.shapeStroke = IshapeStroke
        this.shapeFill = IshapeFill
        this.upArrow = IupArrow
        this.downArrow = IdownArrow
        this.soundsInstance = IsoundsInstance;
        this.dragTitle = IdragTitle;
        this.setup();

    }

    //elements
    var ratio;
    var margin;
    var tweenTime;
    var maskBg
    var aspectRatio;
    var bg;
    var thumbsData;
    var homeTitlteText;
    var squareTop;
    var maskThumbs
    var homeHit;
    var cursorTransformed=false
    var containerThumbs
    var lastX;
    var gif;
    var maskGif;
    var arrowLeft;
    var arrowRight;
    var arrowLeftBlack;
    var arrowRightBlack;
    var dragTitle
    var shapeDrag
    var shapeDragStroke
    var shapeDragTitle

    var shapeStroke
    var shapeFill
    var upArrow
    var downArrow
    var fade;
    var maskArrowRight
    var maskArrowLeft

    //Props
    var thumbs = [];
    var thumbsBw = [];
    var thumbsColor = [];

    var titles = [];
    var titlesX = [];
    var thumbsX = [];
    var dates = [];
    var datesX = [];
    var datesY = [];
    
    var totalsize;
    var loader
    
    var soundsInstance
    
    var homeText;
    var offset;
    var startX;
    var endX;
    var frequency;
    var currentPos;

    var direction = "";
    var oldX = 0;
    var timer;
    var containerThumbSize = 1/1.5;
    var scaleThumb = 1.4;
    var spaceThumbs = 4;

    var isOver =false;
    var isOverInstance;

    var isLoading=false;
    var viewProject = false
    var preloadData;
    var featureData;
    var project;
    var instance;
    var loadingMore
    var useScaleOnDrag = false
    var firsTime = true;
    

    var p = createjs.extend(Work, createjs.Container);

    p.setup = function() {

    	instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        bg = this.bg;
        thumbsData = this.thumbs
        lengthProjects = thumbsData.title.length;
        homeText = this.homeText;
        gif  = this.gif;
        arrowLeft = this.arrowLeft
        arrowRight = this.arrowRight
        arrowLeftBlack = this.arrowLeftBlack
        arrowRightBlack = this.arrowRightBlack
        dragTitle = this.dragTitle;

        shapeStroke = this.shapeStroke
        shapeFill = this.shapeFill
        upArrow = this.upArrow
        downArrow = this.downArrow;
        soundsInstance = this.soundsInstance;

        instance.addChild(bg)
        bg.alpha = 0;
        aspectRatio.resize(bg,1600,1000);

        maskBg = new createjs.Shape();
        maskBg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        bg.mask = maskBg
    } ;

    function addElements(){

        //stroke top
        squareTop = new createjs.Shape();
        squareTop.graphics.beginFill("#FFFFFF").drawRect(0, 0, 1*ratio, 23*ratio);
        squareTop.alpha = 0.25;
        squareTop.x = Math.floor(stage.canvas.width/2);
        squareTop.y = 0;
        squareTop.visible = true
        instance.addChild(squareTop);

        homeTitlteText = new createjs.Text();
        homeTitlteText.textBaseline = "alphabetic";
        homeTitlteText.font = "14px BebasNeueLight ";
        homeTitlteText.color = "#ffffff";
        homeTitlteText.text = homeText;
        homeTitlteText.scaleX = ratio;
        homeTitlteText.scaleY = ratio;
        homeTitlteText.alpha = 0.5;
        homeTitlteText.visible = true
        instance.addChild(homeTitlteText);

        homeHit = new createjs.Shape();
        homeHit.graphics.beginFill("#000000").drawRect(0, 0, 100*ratio, 43*ratio);
        homeHit.alpha = 0.01;
        homeHit.x = Math.floor(stage.canvas.width/2-50*ratio);
        homeHit.y = 23*ratio;
        instance.addChild(homeHit);

        //homeHit.name = "home";
        homeHit.type = "home";
        homeHit.cursor = "pointer";
        homeHit.visible = true
        homeHit.addEventListener("mouseover", handlerOver);
        homeHit.addEventListener("mouseout", handlerOut);
        homeHit.addEventListener("click", handlerClick);

        homeTitlteText.x = stage.canvas.width/2-homeTitlteText.getBounds().width/2*ratio
        homeTitlteText.y = 23*ratio+homeTitlteText.getBounds().height*ratio+10*ratio
        
        fade = new createjs.Shape();
        fade.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        fade.alpha = 0;
        instance.addChild(fade);

        shapeDrag = new createjs.Shape();
        shapeDrag.regX = 120/2*ratio
        shapeDrag.regY = 120/2*ratio
        shapeDrag.rotation = 45
        shapeDrag.graphics.beginFill("#FFFFFF").drawRect(0, 0, 120*ratio, 120*ratio);
        shapeDrag.x = stage.canvas.width/2
        shapeDrag.y = stage.canvas.height/2
        shapeDrag.scaleX = 0;
        shapeDrag.scaleY = 0;
        shapeDrag.alpha = 0;
        instance.addChild(shapeDrag);

        shapeDragStroke = new createjs.Shape();
        shapeDragStroke.regX = 120/2*ratio
        shapeDragStroke.regY = 120/2*ratio
        shapeDragStroke.rotation = 45
        shapeDragStroke.graphics.beginStroke("#ffffff").setStrokeStyle(2*ratio).drawRect(0, 0, 120*ratio, 120*ratio);
        shapeDragStroke.x = stage.canvas.width/2
        shapeDragStroke.y = stage.canvas.height/2
        shapeDragStroke.alpha = 0;
        instance.addChild(shapeDragStroke);

        shapeDragTitle = new createjs.Text();
        shapeDragTitle.textBaseline = "alphabetic";
        shapeDragTitle.font = "11px BebasNeueBold ";
        shapeDragTitle.color = "#000000";
        shapeDragTitle.textAlign = "center"
        shapeDragTitle.lineWidth = 95
        shapeDragTitle.lineHeight = 15
        shapeDragTitle.text = dragTitle;
        shapeDragTitle.x = stage.canvas.width/2
        shapeDragTitle.y = stage.canvas.height/2
        shapeDragTitle.alpha = 0;
        shapeDragTitle.scaleX = ratio
        shapeDragTitle.scaleY = ratio
        instance.addChild(shapeDragTitle);

        arrowRight.x = Math.floor(stage.canvas.width/2)+45*ratio-15*ratio
        arrowRight.y = Math.floor(stage.canvas.height/2)-2*ratio
        arrowRight.alpha = 0;
        instance.addChild(arrowRight);

        maskArrowRight = new createjs.Shape();
        maskArrowRight.graphics.beginFill("#FFFFFF").drawRect(0, 0, 29*ratio, 5*ratio)
        maskArrowRight.x = Math.floor(stage.canvas.width/2)+45*ratio
        maskArrowRight.y = Math.floor(stage.canvas.height/2)-2*ratio
        //instance.addChild(maskArrowRight)

        arrowLeft.x = Math.floor(stage.canvas.width/2)-74*ratio+15*ratio
        arrowLeft.y = Math.floor(stage.canvas.height/2)-2*ratio
        arrowLeft.alpha = 0;
        instance.addChild(arrowLeft);
        
        maskArrowLeft = new createjs.Shape();
        maskArrowLeft.graphics.beginFill("#FFFFFF").drawRect(0, 0, 29*ratio, 5*ratio)
        maskArrowLeft.x = Math.floor(stage.canvas.width/2)-74*ratio
        maskArrowLeft.y = Math.floor(stage.canvas.height/2)-2*ratio
        //instance.addChild(maskArrowLeft)

        arrowLeft.mask = maskArrowLeft
        arrowRight.mask = maskArrowRight

    }

    function animTour(){

        TweenMax.to(fade, tweenTime, {delay:tweenTime*2,alpha:0.75,ease:Expo.easeOut})
        TweenMax.to(shapeDrag, tweenTime, {delay:tweenTime*2.5,scaleX:1,scaleY:1,alpha:1,ease:Expo.easeOut})
        TweenMax.to(shapeDragTitle, tweenTime, {delay:tweenTime*3,alpha:1,ease:Expo.easeInOut,onComplete:animTourArrow})

    }

    function animTourArrow(){

        arrowRight.alpha = 1
        arrowLeft.alpha = 1
        
        TweenMax.to(shapeDragTitle, tweenTime/2, {delay:tweenTime,alpha:0,ease:Expo.easeOut});
        TweenMax.to(shapeDrag, tweenTime/2, {delay:tweenTime*1.5,alpha:0,ease:Expo.easeOut});
        TweenMax.to(shapeDragStroke, tweenTime/2, {delay:tweenTime*1.5,alpha:1,scaleX:0.5,scaleY:0.5,ease:Expo.easeOut})

        TweenMax.to(arrowLeft, tweenTime/2, {delay:tweenTime*1.5,x:Math.floor(stage.canvas.width/2)-74*ratio,ease:Expo.easeOut});
        TweenMax.to(arrowLeft, tweenTime/2, {delay:tweenTime*2,x:Math.floor(stage.canvas.width/2)-74*ratio+15*ratio,ease:Expo.easeOut});

        TweenMax.to(arrowRight, tweenTime/2, {delay:tweenTime*2,x:Math.floor(stage.canvas.width/2)+45*ratio,ease:Expo.easeOut});
        TweenMax.to(arrowRight, tweenTime/2, {delay:tweenTime*2.5,x:Math.floor(stage.canvas.width/2)+45*ratio-15*ratio,ease:Expo.easeOut});
        
        TweenMax.to(arrowLeft, tweenTime/2, {delay:tweenTime*3,x:Math.floor(stage.canvas.width/2)-74*ratio,ease:Expo.easeOut});
        TweenMax.to(arrowLeft, tweenTime/2, {delay:tweenTime*3.5,x:Math.floor(stage.canvas.width/2)-74*ratio+15*ratio,ease:Expo.easeOut});

        TweenMax.to(arrowRight, tweenTime/2, {delay:tweenTime*3.5,x:Math.floor(stage.canvas.width/2)+45*ratio,ease:Expo.easeOut});
        TweenMax.to(arrowRight, tweenTime/2, {delay:tweenTime*4,x:Math.floor(stage.canvas.width/2)+45*ratio-15*ratio,ease:Expo.easeOut,onComplete:onCompleteAnimTour});
        
    }

    function onCompleteAnimTour(){
        
        arrowRight.alpha = 0
        arrowLeft.alpha = 0
        if(shapeDragStroke)TweenMax.to(shapeDragStroke, tweenTime/2, {x:stage.mouseX,y:stage.mouseY,scaleX:0.4,scaleY:0.4,ease:Expo.easeOut,onComplete:registerFollow});
        if(fade)TweenMax.to(fade, tweenTime, {delay:tweenTime,alpha:0,ease:Expo.easeOut})
        
    }

    function registerFollow(){

        if((cursorTransformed==false)&&(shapeDragStroke)){

            firsTime = false;
            useScaleOnDrag=true;
            cursorTransformed = true
            instance.cursor = "none";
            stage.addEventListener("stagemousemove", followTheMouse);
            shapeDragStroke.alpha = 1;
            shapeDragStroke.scaleX = 0.4;
            shapeDragStroke.scaleY = 0.4;

            arrowLeft.visible = true
            arrowRight.visible = true

            TweenMax.to(shapeDragStroke, tweenTime/2, {x:stage.mouseX,y:stage.mouseY,scaleX:0.4,scaleY:0.4,ease:Expo.easeOut});
        }
        
        if(shapeDragStroke)timer = setTimeout(addHits, 1000)
    }

    function addProjects(iDelay,Iset){

        if(maskThumbs)maskThumbs.graphics.clear();
        maskThumbs = new createjs.Shape();
        maskThumbs.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        for(var i=0;i<lengthProjects;i++){

            var containerThumb = new createjs.Container();
            thumbs.push(containerThumb);

            //ThumbsBw
            var thumbsBw_ = thumbsData.bw[i]
            thumbsBw_.alpha = 0.5
            thumbsBw_.regX = 800/2
            thumbsBw_.regY = 500/2
            thumbsBw.push(thumbsBw_);

            //ThumbsColor
            var thumbsColor_ = thumbsData.color[i]
            thumbsColor_.alpha = 0;
            thumbsColor_.regX = 800/2
            thumbsColor_.regY = 500/2
            thumbsColor.push(thumbsColor_);
            thumbsX.push(thumbsColor_.x)

            containerThumb.scaleX = containerThumbSize*ratio;
            containerThumb.scaleY = containerThumbSize*ratio;
            containerThumb.x = Math.floor(i*(800*(containerThumbSize)*ratio+spaceThumbs*(margin*ratio))); 

            //project titles
            var titleProjectText = new createjs.Text();            
            titleProjectText.textBaseline = "alphabetic";
            titleProjectText.font = "72px BebasNeueBold ";
            titleProjectText.color = "#ffffff";
            titleProjectText.text = thumbsData.title[i];
            titleProjectText.scaleX = ratio;
            titleProjectText.scaleY = ratio;
            
            titles.push(titleProjectText);

            titleProjectText.x = containerThumb.x-titleProjectText.getBounds().width/2*ratio
            titleProjectText.y = titleProjectText.getBounds().height*ratio;
            titlesX.push(titleProjectText.x);

            //Date
            var containerDate = new createjs.Container();
            containerDate.x = Math.floor(i*(800*(containerThumbSize)*ratio+spaceThumbs*(margin*ratio))+400*(containerThumbSize)*ratio-68*ratio-20*ratio); 
            containerDate.y = -250*(containerThumbSize)*ratio-15*ratio
            dates.push(containerDate);
            datesX.push(containerDate.x);
            datesY.push(containerDate.y);

             //LabelDate
            var labelDate = new createjs.Shape();
            labelDate.graphics.beginFill("#FFFFFF").drawRect(0, 0, 68*ratio, 30*ratio);
            
            var dateTxt = new createjs.Text();
            dateTxt.textBaseline = "alphabetic";
            dateTxt.font = "14px BebasNeueLight ";
            dateTxt.color = "#171820";
            dateTxt.text = thumbsData.date[i];
            dateTxt.x = 68/2*ratio-dateTxt.getBounds().width/2*ratio
            dateTxt.y = 15*ratio+4*ratio
            dateTxt.scaleX = ratio;
            dateTxt.scaleY = ratio;

            //project hits
            var projectHit = new createjs.Shape();
            projectHit.graphics.beginFill("#000000").drawRect(0, 0, (1100*(containerThumbSize)*ratio), (400*(containerThumbSize)*ratio));
            projectHit.x = thumbs[i].x-(1100*(containerThumbSize)*ratio)/2;
            projectHit.y = -(400*(containerThumbSize)*ratio)/2;
            projectHit.alpha = 0.01;
            
            projectHit.name = "project"+i;
            projectHit.type = "project";
            projectHit.instance=i;

            containerThumb.addChild(thumbsBw_);
            containerThumb.addChild(thumbsColor_);
            containerDate.addChild(labelDate);
            containerDate.addChild(dateTxt);
            containerThumbs.addChild(containerThumb);
            containerThumbs.addChild(containerDate);
            containerThumbs.addChild(titleProjectText);            
            containerThumbs.addChild(projectHit);

        }

        totalsize = Math.floor(i*(800*(containerThumbSize)*ratio+spaceThumbs*(margin*ratio)))+stage.canvas.width/2;

        containerThumbs.x = stage.canvas.width/2
        containerThumbs.y = stage.canvas.height/2
        containerThumbs.mask = maskThumbs;

        if(Iset) {

            project.kill(true)
            containerThumbs.x = stage.canvas.width/2-Math.floor(isOverInstance*(800*(containerThumbSize)*ratio+spaceThumbs*(margin*ratio)))
            
        }else {

            TweenMax.from(containerThumbs, tweenTime*3, {x:0-totalsize,ease:Expo.easeInOut})
        }
        
    }

    function addHits(){
        
         for(var i=0;i<lengthProjects;i++){

            containerThumbs.getChildByName("project"+i).cursor = "pointer";
            containerThumbs.getChildByName("project"+i).addEventListener("mouseover", handlerOver);
            containerThumbs.getChildByName("project"+i).addEventListener("mouseout", handlerOut);
            containerThumbs.getChildByName("project"+i).addEventListener("click", handlerClick);

        }

        registerDrag(instance);
    }

    function followTheMouse(event){
        
        shapeDrag.x = stage.mouseX
        shapeDrag.y = stage.mouseY

        shapeDragTitle.x = stage.mouseX
        shapeDragTitle.y = stage.mouseY

        shapeDragStroke.x = stage.mouseX
        shapeDragStroke.y = stage.mouseY

        arrowRight.x = Math.floor(stage.mouseX)+45*ratio-15*ratio
        arrowRight.y = Math.floor(stage.mouseY)-2*ratio

        arrowLeft.x = Math.floor(stage.mouseX)-74*ratio+15*ratio
        arrowLeft.y = Math.floor(stage.mouseY)-2*ratio

        maskArrowRight.x = Math.floor(stage.mouseX)+45*ratio
        maskArrowRight.y = Math.floor(stage.mouseY)-2*ratio
        
        maskArrowLeft.x = Math.floor(stage.mouseX)-74*ratio
        maskArrowLeft.y = Math.floor(stage.mouseY)-2*ratio

    }

    function registerDrag(){

        offset = new createjs.Point();
        //instance.cursor = "move";
        instance.addEventListener("mousedown", startDrag);
        
    }

    function startDrag(event) {

        startX = stage.mouseX
        offset.x = stage.mouseX - containerThumbs.x;
        instance.addEventListener("pressmove", doDrag);

    }

    function doDrag(event) {

        endX = stage.mouseX;
        currentPos = event.stageX-offset.x

        instance.addEventListener("pressup", stopDrag);
        TweenMax.to(containerThumbs, tweenTime/2, {x:currentPos,ease:Expo.easeOut})

        if (stage.mouseX < oldX) {
        direction = "left"
        } else if (stage.mouseX > oldX) {
        direction = "right"
        }

        timer = setTimeout(animDirection, 150);
        oldX = stage.mouseX;

        frequency = Math.abs(startX-endX);

        if(useScaleOnDrag){
            shapeDragStroke.scaleX = 0.5
            shapeDragStroke.scaleY = 0.5
        }
            
    }

    function stopDrag(event) {
        
        stopDragRequest(true);

    }

    function stopDragRequest(Irefresh){

        direction = "";
        oldX = 0;

        //instance.cursor = "auto";
        instance.removeEventListener("mousedown", startDrag);
        instance.removeEventListener("pressmove", doDrag);
        instance.removeEventListener("pressup", stopDrag);


        for(var i=0;i<lengthProjects;i++){

            if(isOver==false){
                
                TweenMax.to(thumbsColor[i], tweenTime/2, {scaleX:1,scaleY:1,ease:Expo.easeOut})
                TweenMax.to(thumbsBw[i], tweenTime/2, {scaleX:1,scaleY:1,ease:Expo.easeOut})
                
                TweenMax.to(thumbsColor[i], tweenTime/2, {x:thumbsX[i],ease:Expo.easeOut})
                TweenMax.to(thumbsBw[i], tweenTime/2, {x:thumbsX[i],ease:Expo.easeOut})
                TweenMax.to(titles[i], tweenTime, {x:titlesX[i],ease:Power1.easeOut})
                TweenMax.to(dates[i], tweenTime, {x:datesX[i],y:datesY[i],ease:Power1.easeOut}) 
            }
        }

        if(Irefresh==true){
            registerDrag(instance);
        }

        arrowLeft.alpha = 0;
        arrowRight.alpha = 0; 

        if(currentPos>containerThumbs.x){
            TweenMax.to(containerThumbs, tweenTime, {x:(currentPos)+frequency/2*ratio,ease:Expo.easeOut})
        }else{
            TweenMax.to(containerThumbs, tweenTime, {x:(currentPos)-frequency/2*ratio,ease:Expo.easeOut})
        }

        TweenMax.to(shapeDragStroke, tweenTime/2, {scaleX:0.4,scaleY:0.4,ease:Expo.easeInOut})

    }

    function animDirection(){

        if(direction == "right"){   
            for(var i=0;i<lengthProjects;i++){
                if(isOver==false){
                    TweenMax.to(thumbsColor[i], tweenTime/2*(i+2), {scaleX:scaleThumb-0.6,scaleY:scaleThumb-0.6,ease:Expo.easeOut})
                    TweenMax.to(thumbsBw[i], tweenTime/2*(i+2), {scaleX:scaleThumb-0.6,scaleY:scaleThumb-0.6,ease:Expo.easeOut})
                    TweenMax.to(titles[i], tweenTime/2, {x:titlesX[i]+(50*ratio),ease:Expo.easeOut})
                    TweenMax.to(dates[i], tweenTime/2*(i+1), {x:datesX[i]-20*ratio,y:datesY[i]+(34*ratio),ease:Expo.easeOut})
                    
                }
            }

            arrowLeft.alpha = 0
            arrowRight.alpha = 1
        }

        if(direction == "left"){
            for(var i=0;i<lengthProjects;i++){
                if(isOver ==false){
                        TweenMax.to(thumbsColor[i], tweenTime/2*(i+2), {scaleX:scaleThumb-0.6,scaleY:scaleThumb-0.6,ease:Expo.easeOut})
                        TweenMax.to(thumbsBw[i], tweenTime/2*(i+2), {scaleX:scaleThumb-0.6,scaleY:scaleThumb-0.6,ease:Expo.easeOut})
                        TweenMax.to(titles[i], tweenTime/2, {x:titlesX[i]-(50*ratio),ease:Expo.easeOut})
                        TweenMax.to(dates[i], tweenTime/2*(i+1), {x:datesX[i]-20*ratio,y:datesY[i]+(34*ratio),ease:Expo.easeOut})
                }      
            }

            arrowLeft.alpha = 1
            arrowRight.alpha = 0

        }

        if(containerThumbs.x>stage.canvas.width-stage.canvas.width/4){
            TweenMax.killAll();
            stopDragRequest(true);
            TweenMax.to(containerThumbs, tweenTime, {x:stage.canvas.width/2,ease:Expo.easeOut});
        }else{
            if(containerThumbs.x+totalsize<stage.canvas.width+stage.canvas.width/4){
                TweenMax.killAll();
                stopDragRequest(true);
                TweenMax.to(containerThumbs, tweenTime, {x:containerThumbs.x+stage.canvas.width/2,ease:Expo.easeOut});
            }
        }


    }

    p.hideDrag = function() {
        if(cursorTransformed==true){
            shapeDrag.visible = false
            shapeDragStroke.visible = false
            shapeDragTitle.visible = false
            arrowLeft.visible = false
            arrowRight.visible = false
        }
    }

    p.showDrag = function() {
        if(cursorTransformed==true){
            shapeDrag.visible = true
            shapeDragStroke.visible = true
            shapeDragTitle.visible = true
            arrowLeft.visible = true
            arrowRight.visible = true
        }
    }

    function handlerOver(event){


        switch(event.target.type){
            case "project":

                if(cursorTransformed==true){
                    shapeDrag.visible = false
                    shapeDragStroke.visible = false
                    shapeDragTitle.visible = false
                    arrowLeft.visible = false
                    arrowRight.visible = false
                }
                

                soundsInstance.menuHoverThumbs();
                instance.removeEventListener("mousedown", startDrag);
                instance.removeEventListener("pressmove", doDrag);
                instance.removeEventListener("pressup", stopDrag);
                
                isOver = true
                isOverInstance = event.target.instance
                
                showGif();

                thumbsColor[event.target.instance].alpha = 1;
                TweenMax.to(thumbsColor[event.target.instance], tweenTime/2, {scaleX:scaleThumb,scaleY:scaleThumb,ease:Expo.easeOut})
                TweenMax.to(thumbsBw[event.target.instance], tweenTime/2, {scaleX:scaleThumb,scaleY:scaleThumb,ease:Expo.easeOut})
                
                var countLeft=0
                var countRight=0

                for(var i=0;i<lengthProjects;i++){

                    if(i!=event.target.instance){

                        if(i>event.target.instance+1){
                            
                            //console.log("I's at Right",i);

                            countRight++
                            
                            TweenMax.to(thumbsColor[i], tweenTime/2, {x:countRight*(thumbsX[i]-250),ease:Expo.easeOut})
                            TweenMax.to(thumbsBw[i], tweenTime/2, {x:countRight*(thumbsX[i]-250),ease:Expo.easeOut})

                        }

                        if(i<event.target.instance-1){
                            
                            countLeft++

                            //console.log("I's at Left",i);

                            TweenMax.to(thumbsColor[i], tweenTime/2, {x:countLeft*(thumbsX[i]+250),ease:Expo.easeOut})
                            TweenMax.to(thumbsBw[i], tweenTime/2, {x:countLeft*(thumbsX[i]+250),ease:Expo.easeOut}) 
                           
                            
                        }

                        TweenMax.to(thumbsColor[i], tweenTime/2, {scaleX:0.8,scaleY:0.8,ease:Expo.easeOut})
                        TweenMax.to(thumbsBw[i], tweenTime/2, {scaleX:0.8,scaleY:0.8,ease:Expo.easeOut})

                        titles[i].alpha = 0;
                        dates[i].alpha = 0;

                    }else{

                        TweenMax.to(dates[i], tweenTime/2, {x:datesX[i]+(106*ratio),y:datesY[i]-(35*ratio)-32*ratio,ease:Expo.easeOut})
                    }

                    countLeft=0
                }

            break;
            case "home":

                if(cursorTransformed==true){
                    shapeDrag.visible = false
                    shapeDragStroke.visible = false
                    shapeDragTitle.visible = false
                    arrowLeft.visible = false
                    arrowRight.visible = false
                }

                soundsInstance.textSound();
                TweenMax.to(squareTop, tweenTime/4, {scaleY:0.7,alpha:1,ease:Expo.easeInOut})
                TweenMax.to(homeTitlteText, tweenTime/2, {y:homeTitlteText.y = 23*ratio+homeTitlteText.getBounds().height*ratio+10*ratio-5*ratio,alpha:1,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerOut(event){

        switch(event.target.type){
            case "project":
                
                if(cursorTransformed==true){
                    shapeDrag.visible = true
                    shapeDragStroke.visible = true
                    shapeDragTitle.visible = true
                    arrowLeft.visible = true
                    arrowRight.visible = true
                }

               TweenMax.killAll();

                if(isOverInstance!=null){titles[isOverInstance].alpha = 0;
                        dates[isOverInstance].alpha = 0;
                    }
                   
                   thumbsColor[event.target.instance].alpha = 0;
                   TweenMax.to(dates[event.target.instance], tweenTime/2, {x:datesX[event.target.instance],y:datesY[event.target.instance],ease:Expo.easeOut})
                   TweenMax.to(thumbsColor[event.target.instance], tweenTime/2, {scaleX:1,scaleY:1,ease:Expo.easeOut})
                   TweenMax.to(thumbsBw[event.target.instance], tweenTime/2, {scaleX:1,scaleY:1,ease:Expo.easeOut})

                   for(var i=0;i<lengthProjects;i++){
                        if(i!=event.target.instance){
                            TweenMax.to(thumbsColor[i], tweenTime/2, {scaleX:1,scaleY:1,ease:Expo.easeOut})
                            TweenMax.to(thumbsBw[i], tweenTime/2, {scaleX:1,scaleY:1,ease:Expo.easeOut})
                            TweenMax.to(thumbsColor[i], tweenTime/2, {x:thumbsX[i],ease:Expo.easeOut})
                            TweenMax.to(thumbsBw[i], tweenTime/2, {x:thumbsX[i],ease:Expo.easeOut})    
                        }
                        titles[i].alpha = 1;
                        dates[i].alpha = 1;
                    }

                    if(isOver==true){
                        gif.stopAnimation();
                        gif.kill();
                        thumbs[event.target.instance].removeChild(gif);

                        maskGif.graphics.clear();
                        thumbs[isOverInstance].removeChild(maskGif);
                        
                        isOver = false

                        registerDrag(instance)
                    }
                

            break;
            case "home":

                if(cursorTransformed==true){
                    shapeDrag.visible = true
                    shapeDragStroke.visible = true
                    shapeDragTitle.visible = true
                    arrowLeft.visible = true
                    arrowRight.visible = true
                }

                TweenMax.to(squareTop, tweenTime/4, {scaleY:1,alpha:0.25,ease:Expo.easeInOut})
                TweenMax.to(homeTitlteText, tweenTime/2, {y:23*ratio+homeTitlteText.getBounds().height*ratio+10*ratio,alpha:0.5,ease:Expo.easeInOut}) 
            break;
        }
    }

    function handlerClick(event){

        switch(event.target.type){
            case "project":

                TweenMax.killAll();

                if(cursorTransformed==false){
                    TweenMax.to(shapeDrag, tweenTime/2, {alpha:0,ease:Expo.easeOut})
                    TweenMax.to(shapeDragTitle, tweenTime, {alpha:0,ease:Expo.easeOut})
                    TweenMax.to(shapeDragStroke, tweenTime, {alpha:0,scaleX:0,scaleY:0,ease:Expo.easeInOut})  
                }

                completeGifEndAnimation()
                
            break;
            case "home":

                if(cursorTransformed==false){
                    TweenMax.to(shapeDrag, tweenTime/2, {alpha:0,ease:Expo.easeOut})
                    TweenMax.to(shapeDragTitle, tweenTime, {alpha:0,ease:Expo.easeOut})
                    TweenMax.to(shapeDragStroke, tweenTime, {alpha:0,scaleX:0,scaleY:0,ease:Expo.easeInOut})   
                }

                killHits()

                TweenMax.to(squareTop, tweenTime/4, {scaleY:1,alpha:0.25,ease:Expo.easeInOut})
                TweenMax.to(homeTitlteText, tweenTime/2, {y:23*ratio+homeTitlteText.getBounds().height*ratio+10*ratio,alpha:0.5,ease:Expo.easeInOut})      
                backHome();

            break;
        }
    }


    function showGif(){

            maskGif = new createjs.Shape();
            maskGif.graphics.beginFill("#FFFFFF").drawRect(0, 0, 800*scaleThumb, 500*scaleThumb);

            maskGif.regX = 800*scaleThumb/2
            maskGif.regY = 500*scaleThumb/2
            
            gif.x = 0;
            gif.y = 0;

            gif.regX = 800/2;
            gif.regY = 500/2;

            gif.scaleX = scaleThumb
            gif.scaleY = scaleThumb

            gif.mask = maskGif;
            gif.getAnim(thumbsData.animations[isOverInstance],thumbsData.frames[isOverInstance],true); 

            thumbs[isOverInstance].addChild(gif);
            //thumbs[isOverInstance].addChild(maskGif);

            TweenMax.from(maskGif, tweenTime/2, {delay:0.3,scaleX:0,scaleY:0,ease:Expo.easeOut,onComplete:completeGifAnimation});
            TweenMax.from(gif, tweenTime/2, {delay:0.6,scaleX:scaleThumb+0.1,scaleY:scaleThumb+0.1,ease:Expo.easeOut});
            
    }

    function completeGifAnimation(){

        TweenMax.to(titles[isOverInstance], tweenTime/2, {alpha:0,ease:Expo.easeOut});
        if(((stage.mouseX<stage.canvas.width/2)&&(stage.mouseX>stage.canvas.width/2-stage.canvas.width/6))||((stage.mouseX>stage.canvas.width/2)&&(stage.mouseX<stage.canvas.width/2+stage.canvas.width/6))) TweenMax.to(containerThumbs, tweenTime/2, {x:stage.canvas.width/2-Math.floor(isOverInstance*(800*(containerThumbSize)*ratio+spaceThumbs*(margin*ratio))),ease:Power2.easeOut});
        gif.playAnimation();
    }

    function completeGifEndAnimation(){

        gif.stopAnimation();
        gif.kill();
        thumbs[isOverInstance].removeChild(gif);

        maskGif.graphics.clear();
        thumbs[isOverInstance].removeChild(maskGif);

        for(var i=0;i<lengthProjects;i++){

            if(isOverInstance!=i){
                TweenMax.to(thumbsColor[i], tweenTime/4, {alpha:0,ease:Expo.easeOut})
                TweenMax.to(thumbsBw[i], tweenTime/4, {alpha:0,ease:Expo.easeOut})
            }
            
            dates[i].alpha = 0;
            titles[i].alpha = 0;

            containerThumbs.getChildByName("project"+i).cursor = "auto"
            containerThumbs.getChildByName("project"+i).removeEventListener("mouseover", handlerOver);
            containerThumbs.getChildByName("project"+i).removeEventListener("mouseout", handlerOut);
            containerThumbs.getChildByName("project"+i).removeEventListener("click", handlerClick);
        }

        isOver = false
        stopDragRequest(false);
        
        TweenMax.to(containerThumbs, tweenTime/2, {x:stage.canvas.width/2-Math.floor(isOverInstance*(800*(containerThumbSize)*ratio+spaceThumbs*(margin*ratio))),ease:Expo.easeOut,onComplete:loadProjectData});
        
    }

    function loadProjectData(){

        isLoading=true;

        var customEvent = new createjs.Event("goToProject");
        dispatchInstance.dispatchEvent(customEvent);

        

        homeHit.visible = false
        squareTop.visible = false
        homeTitlteText.visible = false

        //Load Json File
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(thumbsData.projectData[isOverInstance], true);

    }

    p.loadProjectDataMore = function(Iinstance){

        //Load Json File
        if(isOverInstance<lengthProjects){
            dispatchInstance = Iinstance
            loadingMore = true
            isOverInstance = isOverInstance+1

            preloadData = new createjs.LoadQueue(true);
            preloadData.addEventListener("fileload", preloadDataComplete);
            preloadData.loadFile(thumbsData.projectData[isOverInstance], true);
        }
    }

    function preloadDataComplete(event) {

        featureData = new Object();
        featureData.projectTitle = thumbsData.title[isOverInstance];
        featureData.projectDate = thumbsData.date[isOverInstance];
        featureData.projectDesc = event.result.project[0].projectDescription;
        featureData.projectClient = event.result.project[0].projectClient;
        featureData.projectRole = event.result.project[0].projectRole;
        featureData.projectIndustry = event.result.project[0].projectIndustry;
        featureData.visit = event.result.project[0].visit;
        featureData.awardsLogos = event.result.project[0].awardsLogos;
        featureData.projectFeature = event.result.project[0].projectFeature;
        featureData.projectBackgrond = event.result.project[0].projectBackgrond;
        featureData.projectSheme = event.result.project[0].projectSheme;
        featureData.projectShemeData = event.result.project[0].projectShemeData;
        featureData.bgColor = event.result.project[0].bgColor;

        var featureGroupImg = [featureData.projectFeature,featureData.projectBackgrond]
        var thumbsToLoad = featureGroupImg.concat(featureData.awardsLogos);

        //load images for Projects
        loadImages(thumbsToLoad);

        //remove preloadData
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;
    }

    function loadImages(iFiles){

        //New Loader
        loader = new Loader(iFiles);
        
        loader.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    
    }
    
    function loadImagesComplete(evt) {

        bg.alpha = 0.8;
        TweenMax.to(bg, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
        
        console.log("Loader Images: "+evt.contentLoader.length);
        
        var featureImg = evt.contentLoader[0]
        var bgImg = evt.contentLoader[1];

        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;
        
        if(loadingMore!=true){
            thumbsBw[isOverInstance].alpha = 1;
            TweenMax.to(thumbsColor[isOverInstance], tweenTime, {alpha:0,ease:Expo.easeInOut,onComplete:openProject})
        }else{
             project.kill(false);
        }

        project = new Project(instance,dispatchInstance,ratio,margin,tweenTime,aspectRatio,featureImg,bgImg,featureData,arrowLeftBlack,arrowRightBlack,gif,shapeStroke,shapeFill, upArrow, downArrow,soundsInstance);
        instance.addChild(project);
        
        if(loadingMore==true)project.introFeature();

        loadingMore = false
        viewProject = true;

    }

    function openProject(){

        soundsInstance.stopDrumsSound();
        kill();
        soundsInstance.revealSound();
        project.introFeature();
    }

     p.viewProject = function(){
        return viewProject;
     }

    p.open = function(Iinstance){

        console.log("View Work");
        dispatchInstance = Iinstance

        kill();
        viewProject = false
        //killHits();
        if(project)project.kill(false);

        containerThumbs = new createjs.Container();
        instance.addChild(containerThumbs);

        bg.alpha = 1;
        TweenMax.to(bg, tweenTime*2, {delay:tweenTime,alpha:0.8,ease:Expo.easeInOut})

        addElements();
        addProjects(2000,false);
        soundsInstance.drumsSound();

        if(firsTime==true){

            animTour();

        }else{
            
            registerFollow()
        }
        
    }

    p.close = function(Iinstance,Itarget){

        if(viewProject){

            bg.alpha = 1;
            TweenMax.to(bg, tweenTime*2, {delay:tweenTime,alpha:0.8,ease:Expo.easeInOut})

            viewProject = false
            project.resetScrollBar()
            dispatchInstance = Iinstance;
            
            if(Itarget=="Home") timer = setTimeout(projectKillToHome, 1000);
            else projectKill()
            
            var customEvent = new createjs.Event("goToWork");
            dispatchInstance.dispatchEvent(customEvent);

        }else{

            bg.alpha = 0.8;
            TweenMax.to(bg, tweenTime/2, {alpha:1,ease:Expo.easeInOut})

            killHits();
            timer = setTimeout(kill, 1000);
            TweenMax.to(containerThumbs, tweenTime*2, {x:0-totalsize,ease:Expo.easeInOut})
            
        }

        soundsInstance.stopDrumsSound();
        
    }

    p.closeProjectToHome = function(Iinstance){

        dispatchInstance = Iinstance

        if(viewProject){
            viewProject = false
            project.resetScrollBar();     
        }else{
            viewProject = false
            kill();
        }
    }

    function projectKill(){


        project.addFeatureInfoReverseAnimation();

        timer = setTimeout(waitForReverseAnim, 1750);        
        
    }

    function waitForReverseAnim(){
        
        containerThumbs = new createjs.Container();
        instance.addChild(containerThumbs);

        addElements();
        addProjects(0,true);//kill project after animation
        registerFollow()
        //soundsInstance.drumsSound();
    }

    function projectKillToHome(){

        project.kill(false);

        
    }

    function backHome(){

        
        var customEvent = new createjs.Event("returningHome");
        dispatchInstance.dispatchEvent(customEvent);
        
    }

    function kill(){

        instance.cursor = "auto";
        stage.removeEventListener("stagemousemove", followTheMouse);
        cursorTransformed = false
        useScaleOnDrag = false

        //isOverInstance = null
        isLoading = null;

        thumbs = [];
        thumbsBw = [];
        thumbsColor = [];

        titles = [];
        titlesX = [];
        thumbsX = [];
        dates = [];
        datesX = [];
        datesY = []
        

        if(containerThumbs){
            instance.removeChild(containerThumbs);
            containerThumbs = null;
        } 
        

        if(homeTitlteText){
            instance.removeChild(homeTitlteText);
            homeTitlteText = null;
        }

        if(squareTop){
            instance.removeChild(squareTop);
            squareTop = null;
        }

        if(shapeDrag){
            instance.removeChild(shapeDrag);
            shapeDrag = null;
        }

        if(shapeDragStroke){
            instance.removeChild(shapeDragStroke);
            shapeDragStroke = null;
        }

        if(shapeDragTitle){
            instance.removeChild(shapeDragTitle);
            shapeDragTitle = null;
        }
        
        if(fade)instance.removeChild(fade);
        
        if(maskArrowRight)instance.removeChild(maskArrowRight);
        if(maskArrowLeft)instance.removeChild(maskArrowLeft);

        if(arrowLeft)instance.removeChild(arrowLeft);
        if(arrowRight)instance.removeChild(arrowRight)
        
        totalsize = null
        featureData = null;
        
        
    }

    function killHits(){

        for(var i=0;i<lengthProjects;i++){
            if(containerThumbs.getChildByName("project"+i)){
                containerThumbs.getChildByName("project"+i).cursor = "auto"
                containerThumbs.getChildByName("project"+i).removeEventListener("mouseover", handlerOver);
                containerThumbs.getChildByName("project"+i).removeEventListener("mouseout", handlerOut);
                containerThumbs.getChildByName("project"+i).removeEventListener("click", handlerClick);
            }
            
        }

        instance.removeEventListener("mousedown", startDrag);
        instance.removeEventListener("pressmove", doDrag);
        instance.removeEventListener("pressup", stopDrag);

        if(homeHit){
            instance.removeChild(homeHit);
            homeHit.removeEventListener("mouseover", handlerOver);
            homeHit.removeEventListener("mouseout", handlerOut);
            homeHit.removeEventListener("click", handlerClick);
            homeHit = null;
        }

    }

    p.resize = function() {

        if(cursorTransformed==false){

            if(shapeDrag){
                shapeDrag.x = stage.canvas.width/2
                shapeDrag.y = stage.canvas.height/2
            }
            
            if(shapeDragStroke){
                shapeDragStroke.x = stage.canvas.width/2
                shapeDragStroke.y = stage.canvas.height/2  
            }
            
                
            if(shapeDragTitle){
                shapeDragTitle.x = stage.canvas.width/2
                shapeDragTitle.y = stage.canvas.height/2
            }

            if(maskArrowLeft){
                maskArrowLeft.x = Math.floor(stage.canvas.width/2)-74*ratio
                maskArrowLeft.y = Math.floor(stage.canvas.height/2)-2*ratio
            }

            if(maskArrowRight){
                maskArrowRight.x = Math.floor(stage.canvas.width/2)+45*ratio
                maskArrowRight.y = Math.floor(stage.canvas.height/2)-2*ratio
            }

            if(arrowRight){
                arrowRight.x = Math.floor(stage.canvas.width/2)+45*ratio-15*ratio
                arrowRight.y = Math.floor(stage.canvas.height/2)-2*ratio
            }

            if(arrowLeft){
                arrowLeft.x = Math.floor(stage.canvas.width/2)-74*ratio+15*ratio
                arrowLeft.y = Math.floor(stage.canvas.height/2)-2*ratio
            }
            
        }

        if(bg){
            aspectRatio.resize(bg,1600,1000);
        }

        if(maskBg){
            maskBg.graphics.clear();
            maskBg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

        if(maskThumbs){
            maskThumbs.graphics.clear();
            maskThumbs.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

        if(fade){
            fade.graphics.clear();
            fade.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

        if(squareTop){
            squareTop.x = Math.floor(stage.canvas.width/2);
            squareTop.y = 0;
        }

         if(homeTitlteText){
             homeTitlteText.x = stage.canvas.width/2-homeTitlteText.getBounds().width/2*ratio
            homeTitlteText.y = 23*ratio+homeTitlteText.getBounds().height*ratio+10*ratio
        }

        if(homeHit){
            homeHit.x = Math.floor(stage.canvas.width/2-50*ratio);
            homeHit.y = 23*ratio;
        }

        if(containerThumbs){

            if(isLoading==true)containerThumbs.x = stage.canvas.width/2-Math.floor(isOverInstance*(800*(containerThumbSize)*ratio+spaceThumbs*(margin*ratio)));
            
            containerThumbs.y = stage.canvas.height/2
        }

        if(project)project.resize();
    } ;

window.Work = createjs.promote(Work, "Container");
}());