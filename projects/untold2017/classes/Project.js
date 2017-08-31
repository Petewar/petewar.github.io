(function () {

    function Project(IdispatchInstance,IdispatchInstanceRoot,Iratio,Imargin,ItweenTime,IaspectRatio,IfeatureImg,Ibg,Idata,IarrowLeft,IarrowRight,Igif,IshapeStroke,IshapeFill,IupArrow,IdownArrow,SoundInstance) {
        
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.dispatchInstanceRoot = IdispatchInstanceRoot;
        this.ratio = Iratio;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.aspectRatio = IaspectRatio;
        this.featureImg = IfeatureImg;
        this.bg = Ibg;
        this.arrowLeft = IarrowLeft;
        this.arrowRight = IarrowRight;
        this.data = Idata;
        this.gif = Igif;
        this.shapeStroke = IshapeStroke
        this.shapeFill = IshapeFill
        this.upArrow = IupArrow
        this.downArrow = IdownArrow
        this.soundInstance = SoundInstance;
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var dispatchInstanceRoot;
    var ratio;
    var margin;
    var tweenTime;
    var aspectRatio;
    var maskfeatureImg;
    var data;
    var scrollBar;

    var shapeStroke
    var shapeFill
    var upArrow
    var downArrow

    //elements
    var featureImg;
    var bg;
    var bgFill;
    var titleText
    var descText
    var containerInfo;
    var scrollContainer
    var soundInstance;

    //
    var titleClient;
    var titleRole;
    var titleIndustry;
    var labelDate
    var labelDateText
    var buttonProject
    var clientText;
    var roleText;
    var industryText
    var visitText;
    var hitProject
    var buttonProjectGhost;
    var gif

    //props
    var marginWidth = 400;
    var totalHeight=0;
    var currentScrollY = 0;
    var nav = 0;
    var navResize = 0;
    var count
    var grid;

    var modules = [];
    var dispatchedScroll = false;
    var dispatchedScrollFade = false;

    var arrowRight;
    var arrowLeft;

    var currentHandler;
    var blackFade

    var p = createjs.extend(Project, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        bg = this.bg;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        dispatchInstanceRoot = this.dispatchInstanceRoot;
        arrowRight = this.arrowRight
        arrowLeft = this.arrowLeft
        gif = this.gif;

        shapeStroke = this.shapeStroke
        shapeFill = this.shapeFill
        upArrow = this.upArrow
        downArrow = this.downArrow;

        featureImg = this.featureImg;
        bg = this.bg;
        data = this.data;

        soundInstance = this.soundInstance;

    };

    p.introFeature = function(){

        instance.addChild(featureImg);

        featureImg.regX = 1600/2
        featureImg.regY = 1000/2

        featureImg.x = stage.canvas.width/2
        featureImg.y = stage.canvas.height/2
        
        aspectRatio.resize(featureImg,1600,1000);

        maskfeatureImg = new createjs.Shape();
        maskfeatureImg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        featureImg.mask = maskfeatureImg
        
        containerInfo = new createjs.Container();
        scrollContainer = new createjs.Container();
        bgFill = new createjs.Shape();

        addFeatureInfo();
        addFeatureInfoAnimation();

        blackFade = new createjs.Shape();
        blackFade.graphics.beginFill("#171820").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        blackFade.visible = false
        instance.addChild(blackFade)

        //updated by scroll
        scrollContainer.y = stage.canvas.height
        aspectRatio.resizeSquare(bg,1600,1600);
        scrollContainer.addChild(bgFill);
        scrollContainer.addChild(bg);
        instance.addChild(scrollContainer);

        getSchemeType(data.projectSheme[nav])

    }

    function addFeatureInfo(){

        titleText = new createjs.Text();
        titleText.textBaseline = "alphabetic";
        titleText.font = "72px BebasNeueBold ";
        titleText.color = "#ffffff";
        titleText.text = data.projectTitle;
        titleText.scaleX = ratio;
        titleText.scaleY = ratio;
        containerInfo.addChild(titleText);

        titleTextSquare = new createjs.Shape();
        titleTextSquare.compositeOperation = "overlay";
        titleTextSquare.graphics.beginFill("#FFFFFF").drawRect(0, 0, titleText.getBounds().width*ratio+20*ratio, titleText.getBounds().height*ratio+5*ratio+20*ratio);
        titleTextSquare.x = titleText.x-10*ratio
        titleTextSquare.y = titleText.y-titleText.getBounds().height*ratio-5*ratio-10*ratio
        containerInfo.addChild(titleTextSquare);

        descText = new createjs.Text();
        descText.lineWidth = (stage.canvas.width-marginWidth*ratio)/ratio
        descText.textBaseline = "alphabetic";
        descText.font = "16px BwModelicaLight ";
        descText.color = "#ffffff";
        descText.lineHeight = 30;
        descText.text = data.projectDesc;
        descText.scaleX = ratio;
        descText.scaleY = ratio;
        descText.y = (margin*2)*ratio;
        containerInfo.addChild(descText);

        titleClient = new createjs.Text();
        titleClient.textBaseline = "alphabetic";
        titleClient.font = "12px BebasNeueLight ";
        titleClient.color = "#ffffff";
        titleClient.text = "C L I E N T";
        titleClient.scaleX = ratio;
        titleClient.scaleY = ratio;
        titleClient.y = descText.y + descText.getBounds().height*ratio+margin*ratio
        containerInfo.addChild(titleClient);

        clientText = new createjs.Text();
        clientText.textBaseline = "alphabetic";
        clientText.alpha = 0.5;
        clientText.lineWidth = (100*ratio)/ratio
        clientText.lineHeight = 20;
        clientText.font = "14px BwModelicaLight ";
        clientText.color = "#ffffff";
        clientText.text = data.projectClient;
        clientText.scaleX = ratio;
        clientText.scaleY = ratio;
        clientText.y = titleClient.y+30*ratio
        containerInfo.addChild(clientText);

        grid = ((stage.canvas.width-marginWidth*ratio)/ratio)/5*ratio

        titleRole = new createjs.Text();
        titleRole.textBaseline = "alphabetic";
        titleRole.font = "12px BebasNeueLight ";
        titleRole.color = "#ffffff";
        titleRole.text = "R O L E";
        titleRole.scaleX = ratio;
        titleRole.scaleY = ratio;
        titleRole.x = grid
        titleRole.y = titleClient.y
        containerInfo.addChild(titleRole);

        roleText = new createjs.Text();
        roleText.textBaseline = "alphabetic";
        roleText.alpha = 0.5;
        roleText.lineWidth = (150*ratio)/ratio
        roleText.lineHeight = 20;
        roleText.font = "14px BwModelicaLight ";
        roleText.color = "#ffffff";
        roleText.text = data.projectRole;
        roleText.scaleX = ratio;
        roleText.scaleY = ratio;
        roleText.x = titleRole.x
        roleText.y = titleRole.y+30*ratio
        containerInfo.addChild(roleText);

        titleIndustry = new createjs.Text();
        titleIndustry.textBaseline = "alphabetic";
        titleIndustry.font = "12px BebasNeueLight ";
        titleIndustry.color = "#ffffff";
        titleIndustry.text = "I N D U S T R Y";
        titleIndustry.scaleX = ratio;
        titleIndustry.scaleY = ratio;
        titleIndustry.x = grid*2
        titleIndustry.y = titleClient.y
        containerInfo.addChild(titleIndustry);

        industryText = new createjs.Text();
        industryText.textBaseline = "alphabetic";
        industryText.alpha = 0.5;
        industryText.lineHeight = 20;
        industryText.lineWidth = (150*ratio)/ratio
        industryText.font = "14px BwModelicaLight ";
        industryText.color = "#ffffff";
        industryText.text = data.projectIndustry;
        industryText.scaleX = ratio;
        industryText.scaleY = ratio;
        industryText.x = titleIndustry.x
        industryText.y = titleIndustry.y+30*ratio
        containerInfo.addChild(industryText);

        labelDate = new createjs.Shape();
        labelDate.graphics.beginFill("#FFFFFF").drawRect(0, 0, 68*ratio, 30*ratio);
        labelDate.x = grid*3
        labelDate.y = titleClient.y-8*ratio
        containerInfo.addChild(labelDate);

        labelDateText = new createjs.Text();
        labelDateText.textBaseline = "alphabetic";
        labelDateText.font = "14px BebasNeueBook";
        labelDateText.color = "#171820";
        labelDateText.text = data.projectDate;
        labelDateText.scaleX = ratio;
        labelDateText.scaleY = ratio;
        labelDateText.x = labelDate.x+(68*ratio)/2-(labelDateText.getBounds().width*ratio)/2
        labelDateText.y = labelDate.y+labelDateText.getBounds().height*ratio+12*ratio
        containerInfo.addChild(labelDateText);

        buttonProject = new createjs.Shape();
        buttonProject.graphics.beginStroke("#ffffff").setStrokeStyle(1*ratio).drawRect(0, 0, 190*ratio, 30*ratio);
        buttonProject.x = grid*4
        buttonProject.y = titleClient.y-8*ratio
        containerInfo.addChild(buttonProject);

        buttonProjectGhost = new createjs.Shape();
        buttonProjectGhost.graphics.beginFill("#ffffff").drawRect(0, 0, 190*ratio, 30*ratio);
        buttonProjectGhost.x = grid*4
        buttonProjectGhost.y = titleClient.y-8*ratio
        buttonProjectGhost.scaleX = 0;
        containerInfo.addChild(buttonProjectGhost);

        visitText = new createjs.Text();
        visitText.textBaseline = "alphabetic";
        visitText.font = "12px BebasNeueBook";
        visitText.color = "#FFFFFF";
        visitText.text = data.visit;
        visitText.scaleX = ratio;
        visitText.scaleY = ratio;
        visitText.x = buttonProject.x+190/2*ratio-visitText.getBounds().width/2*ratio;
        visitText.y = buttonProject.y+30/2*ratio+4*ratio;
        containerInfo.addChild(visitText);

        hitProject = new createjs.Shape();
        hitProject.graphics.beginFill("#ffffff").drawRect(0, 0, 190*ratio, 30*ratio);
        hitProject.alpha = 0.1;
        hitProject.x = grid*4
        hitProject.y = titleClient.y-8*ratio
        containerInfo.addChild(hitProject);

        hitProject.type = "project";
        hitProject.cursor = "pointer";
        hitProject.addEventListener("mouseover", handlerOver);
        hitProject.addEventListener("mouseout", handlerOut);
        hitProject.addEventListener("click", handlerClick);

        containerInfo.x = stage.canvas.width/2-(descText.getBounds().width*ratio)/2
        containerInfo.y = stage.canvas.height/2-stage.canvas.height/8;

        instance.addChild(containerInfo);

    }

    function getSchemeType(IType){

        var newModule;

        switch(IType){

            case "Text":
                currentHandler = "TextLoadComplete"
                instance.addEventListener(currentHandler, sizeModulesHandler);
                newModule = new Text(instance,ratio,margin,tweenTime,aspectRatio,data.projectShemeData[nav]);
            break;

            case "Desktop":
                currentHandler = "DesktopLoadComplete"
                instance.addEventListener(currentHandler, sizeModulesHandler);
                newModule = new Desktop(instance,ratio,margin,tweenTime,aspectRatio,data.projectShemeData[nav]);
            break;

            case "Tablet":
                currentHandler = "TabletLoadComplete"
                instance.addEventListener(currentHandler, sizeModulesHandler);
                newModule = new Tablet(instance,ratio,margin,tweenTime,aspectRatio,data.projectShemeData[nav],arrowLeft,arrowRight);
            break;

            case "Mobile":
                currentHandler = "MobileLoadComplete"
                instance.addEventListener(currentHandler, sizeModulesHandler);
                newModule = new Mobile(instance,ratio,margin,tweenTime,aspectRatio,data.projectShemeData[nav],arrowLeft,arrowRight,gif);
            break;

            case "Details":
                currentHandler = "DetailsLoadComplete"
                instance.addEventListener(currentHandler, sizeModulesHandler);
                newModule = new Details(instance,ratio,margin,tweenTime,aspectRatio,data.projectShemeData[nav],arrowLeft,arrowRight);
            break;

            case "Footer":
                currentHandler = "FooterLoadComplete"
                instance.addEventListener("backToTop", backToTopHandler);
                instance.addEventListener(currentHandler, sizeModulesHandler);
                newModule = new Footer(dispatchInstanceRoot,instance,ratio,margin,tweenTime,aspectRatio,data.projectShemeData[nav],shapeStroke,shapeFill, upArrow, downArrow,soundInstance);
            break;
            
        }

        modules.push(newModule);
        newModule.y = totalHeight;
        scrollContainer.addChild(newModule);

    }

    function sizeModulesHandler(event){

        //instance.removeEventListener(currentHandler, sizeModulesHandler);

        totalHeight += event.currentHeight
        var updateHeight = totalHeight+stage.canvas.height-100*ratio

        if(scrollBar){
            
            bgFill.graphics.clear();
            bgFill.graphics.beginFill(data.bgColor).drawRect(0, 0, stage.canvas.width, totalHeight);
            scrollBar.updateResize(updateHeight,(stage.canvas.height-100*ratio),currentScrollY);

        }else{
            
            bgFill.graphics.beginFill(data.bgColor).drawRect(0, 0, stage.canvas.width, totalHeight);

            scrollBar = new ScrollBar(ratio,stage.canvas.height-100*ratio,instance,scrollContainer,updateHeight);

            TweenMax.from(bg, tweenTime, {y:100*ratio,ease:Expo.easeInOut})
            TweenMax.from(bgFill, tweenTime, {y:100*ratio,ease:Expo.easeInOut})

            scrollBar.x = stage.canvas.width-10*ratio;
            instance.addChild(scrollBar);

            instance.addEventListener("scrollChange",scrollChangeHandler)

        }

        if(event.currentType=="add"){
           if((data.projectSheme.length>1)&&(nav<data.projectSheme.length-1)){
            nav++;
            getSchemeType(data.projectSheme[nav]); 
           }else{
            var customEventProject = new createjs.Event("addSticky");
            dispatchInstanceRoot.dispatchEvent(customEventProject);
           }
        }

        if(event.currentType=="resize"){
            if((navResize<data.projectSheme.length-1)){
                if(navResize==0){
                    modules[navResize].y = 0
                    modules[navResize+1].y = totalHeight 
                }else{
                  modules[navResize+1].y = totalHeight   
                }
                navResize++
            }
        }
    }

    function backToTopHandler(event){
        scrollBar.updatePos(0);
    }

    function scrollChangeHandler(event){

        if(currentScrollY>event.yPos){
            currentScrollDirection = "down"
        }else{
            currentScrollDirection = "up"
        }

        currentScrollY = event.yPos
        
        if((Math.abs(currentScrollY)>stage.canvas.height-100*ratio-80*ratio)&&(dispatchedScroll==false)){
            dispatchedScroll = true
            var customEvent = new createjs.Event("openSticky");
            dispatchInstanceRoot.dispatchEvent(customEvent);
        }

        if((Math.abs(currentScrollY)<stage.canvas.height-100*ratio-80*ratio)&&(dispatchedScroll==true)){
            dispatchedScroll = false
            var customEvent = new createjs.Event("closeSticky");
            dispatchInstanceRoot.dispatchEvent(customEvent);
        }

        if(dispatchedScrollFade==false){
            dispatchedScrollFade=true;
            blackFade.visible=true;
            blackFade.alpha=0;
        }else{

            if(currentScrollDirection=="up"){
                if(blackFade.alpha>0)blackFade.alpha -= 0.05
                
            }

            if(currentScrollDirection=="down") {
                if(blackFade.alpha<1)blackFade.alpha += 0.05
            }
        }
        
    }

    function addFeatureInfoAnimation(){

        titleText.alpha = 0;

        TweenMax.from(titleTextSquare, tweenTime, {scaleX:0,delay:tweenTime,ease:Expo.easeInOut,onComplete:endAnimationTitle})

        TweenMax.from(descText, tweenTime, {delay:tweenTime+tweenTime/4,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(titleClient, tweenTime, {delay:tweenTime+tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(clientText, tweenTime, {delay:tweenTime+tweenTime/3,alpha:0,ease:Expo.easeInOut})  
        TweenMax.from(titleRole, tweenTime, {delay:tweenTime+tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(roleText, tweenTime, {delay:tweenTime+tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(titleIndustry, tweenTime, {delay:tweenTime+tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(industryText, tweenTime, {delay:tweenTime+tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(labelDate, tweenTime, {delay:tweenTime+tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(labelDateText, tweenTime, {delay:tweenTime+tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(buttonProject, tweenTime, {delay:tweenTime+tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(visitText, tweenTime, {delay:tweenTime+tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(hitProject, tweenTime, {delay:tweenTime+tweenTime/2,alpha:0,ease:Expo.easeInOut})


        TweenMax.from(containerInfo, tweenTime, {y:stage.canvas.height/2-stage.canvas.height/6,ease:Expo.easeInOut})

        TweenMax.from(featureImg, tweenTime, {scaleX:1/1.5,scaleY:1/1.5,ease:Expo.easeOut})
        TweenMax.to(featureImg, tweenTime, {alpha:0.25,ease:Expo.easeOut})

    }


    function endAnimationTitle(){

        titleTextSquare.regX = titleText.getBounds().width*ratio;
        titleTextSquare.x = titleText.x-10*ratio+titleText.getBounds().width*ratio
        TweenMax.to(titleTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(titleText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut,onComplete:endAnimationTitleClean})
        
    }

    function endAnimationTitleClean(){
        instance.removeChild(titleText);
    }

    p.addFeatureInfoReverseAnimation = function(){

        TweenMax.to(titleText, tweenTime, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(descText, tweenTime, {delay:tweenTime/4,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(titleClient, tweenTime, {delay:tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(clientText, tweenTime, {delay:tweenTime/3,alpha:0,ease:Expo.easeInOut})  
        TweenMax.to(titleRole, tweenTime, {delay:tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(roleText, tweenTime, {delay:tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(titleIndustry, tweenTime, {delay:tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(industryText, tweenTime, {delay:tweenTime/3,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(labelDate, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(labelDateText, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(buttonProject, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(visitText, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(hitProject, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(scrollBar, tweenTime, {alpha:0,ease:Expo.easeInOut})

        TweenMax.to(containerInfo, tweenTime, {y:stage.canvas.height/2-stage.canvas.height/6,ease:Expo.easeInOut,onComplete:completeAnimationReverse})
        TweenMax.to(bg, tweenTime, {y:100*ratio,ease:Expo.easeInOut})
        TweenMax.to(bgFill, tweenTime, {y:100*ratio,ease:Expo.easeInOut})
    }

    function completeAnimationReverse(){
        if(ratio>1)TweenMax.to(featureImg, tweenTime, {scaleX:(1/1.5),scaleY:(1/1.5),ease:Expo.easeInOut})
        else TweenMax.to(featureImg, tweenTime, {scaleX:1-(1/1.5),scaleY:1-(1/1.5),ease:Expo.easeInOut})
        TweenMax.to(featureImg, tweenTime, {alpha:1,ease:Expo.easeOut})
    }

    function handlerOver(event){

        switch(event.target.type){
            case "project":
                soundInstance.textSound();
                visitText.color = "#171820";
                buttonProjectGhost.regX = 0
                buttonProjectGhost.x = grid*4
                TweenMax.to(buttonProjectGhost, tweenTime/2, {scaleX:1,ease:Expo.easeOut})
            break;
            
        }
    }

    function handlerOut(event){

        switch(event.target.type){
            case "project":
                soundInstance.textSound();
                visitText.color = "#FFFFFF";
                buttonProjectGhost.regX = 190*ratio
                buttonProjectGhost.x = grid*4+190*ratio
                TweenMax.to(buttonProjectGhost, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
            break;
            
        }
    }

    function handlerClick(event){

        switch(event.target.type){
            case "project":

            break;
            
        }
    }

    function killComplete(){
        instance.removeChild(featureImg);
        featureImg=null;
    }

    p.kill = function(Ialpha) {

        if(featureImg){
            if(Ialpha){
                TweenMax.to(featureImg, tweenTime, {alpha:0,ease:Expo.easeOut,onComplete:killComplete})
            }else{
                instance.removeChild(featureImg);
                featureImg=null;
            }
        }

        if(blackFade){
            blackFade.graphics.clear();
            instance.removeChild(blackFade)
        }

        if(currentHandler == "FooterLoadComplete"){
            instance.removeEventListener("backToTop", backToTopHandler);
        }

        if(hitProject){
            hitProject.removeEventListener("mouseover", handlerOver);
            hitProject.removeEventListener("mouseout", handlerOut);
            hitProject.removeEventListener("click", handlerClick);
        }

        if(bg){
            scrollContainer.removeChild(bg);
            bg=null;
        }

        for(var i=0;i<modules.length;i++){
            if(modules[i]){
                modules[i].kill();
                scrollContainer.removeChild(modules[i]);
                //modules[i] = null;
            }
        }

        if(containerInfo){
            instance.removeChild(containerInfo);
            containerInfo=null;
        }

        if(scrollContainer){
            instance.removeChild(scrollContainer);
            scrollContainer=null;
        }

        if(scrollBar){
            currentScrollY = 0
            scrollBar.kill()
            instance.removeChild(scrollBar)
            scrollBar=null
            instance.removeEventListener("scrollChange",scrollChangeHandler)
        }

        modules = [];
        totalHeight = 0;
        navResize = 0;
        nav = 0;
        dispatchedScroll = false;
        dispatchedScroll = false;

    } ;

    p.resetScrollBar = function() {
        if(scrollBar){
            scrollBar.updatePos(0)
            blackFade.alpha = 0;
        }
    }

    p.resize = function() {

        if(featureImg) {
            featureImg.x = stage.canvas.width/2
            featureImg.y = stage.canvas.height/2
            aspectRatio.resize(featureImg,1600,1000);

            maskfeatureImg.graphics.clear();
            maskfeatureImg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

        if(blackFade){
            blackFade.graphics.clear();
            blackFade.graphics.beginFill("#171820").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

        if(descText){

            descText.lineWidth = (stage.canvas.width-marginWidth*ratio)/ratio
            descText.y = (margin*2)*ratio;
            titleClient.y = descText.y + descText.getBounds().height*ratio+margin*ratio
            clientText.y = titleClient.y+30*ratio

            grid = ((stage.canvas.width-marginWidth*ratio)/ratio)/5*ratio

            titleRole.x = grid
            titleRole.y = titleClient.y

            roleText.x = titleRole.x
            roleText.y = titleRole.y+30*ratio

            titleIndustry.x = grid*2
            titleIndustry.y = titleClient.y

            industryText.x = titleIndustry.x
            industryText.y = titleIndustry.y+30*ratio

            labelDate.x = grid*3
            labelDate.y = titleClient.y-8*ratio

            labelDateText.x = labelDate.x+(68*ratio)/2-(labelDateText.getBounds().width*ratio)/2
            labelDateText.y = labelDate.y+labelDateText.getBounds().height*ratio+12*ratio

            buttonProject.x = grid*4
            buttonProject.y = titleClient.y-8*ratio

             visitText.x = buttonProject.x+190/2*ratio-visitText.getBounds().width/2*ratio;
            visitText.y = buttonProject.y+30/2*ratio+4*ratio;

            buttonProjectGhost.x = grid*4
            buttonProjectGhost.y = titleClient.y-8*ratio

            hitProject.x = grid*4
            hitProject.y = titleClient.y-8*ratio
        } 

        if(containerInfo){
            containerInfo.x = stage.canvas.width/2-(descText.getBounds().width*ratio)/2
            containerInfo.y = stage.canvas.height/2-stage.canvas.height/8;
        }

        

        if(scrollBar){
            scrollBar.x = stage.canvas.width-10*ratio;
        }

        if(bg){
            aspectRatio.resizeSquare(bg,1600,1600);
        }

        if(modules.length>0){
            totalHeight = 0;
            navResize = 0;
            for (var i=0;i<modules.length;i++){
                if(modules[i])modules[i].resize();
            }
        }
        
    } ;  

window.Project = createjs.promote(Project, "Container");
}());