(function () {

    function Footer(IinstanceRoot,Iinstance,Iratio,Imargin,ItweenTime,IaspectRatio,IdataToLoad,IshapeStroke,IshapeFill,IupArrow,IdownArrow,IsoundInstance) {

        this.Container_constructor();
        this.dispatchInstance = Iinstance;
        this.dispatchInstanceRoot = IinstanceRoot;
        this.ratio = Iratio;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.aspectRatio = IaspectRatio;
        this.dataToLoad = IdataToLoad;
        this.shapeStroke = IshapeStroke
        this.shapeFill = IshapeFill
        this.upArrow = IupArrow
        this.downArrow = IdownArrow
        this.soundInstance = IsoundInstance;
        this.setup();

    }

    //elements
    var aspectRatio;
    var margin;
    var dispatchInstance
    var dispatchInstanceRoot
    var tweenTime;
    var ratio;
    var dataToLoad;
    var preloadDataFooter;
    var shapeStroke
    var shapeFill
    var upArrow
    var downArrow
    var titleText;
    var titleNextText;
    var upHit
    var downHit
    var soundInstance;
    var maskUpArrow
    var maskDownArrow

    var strokeFill;
    var buttonsContainer;
    var socialTitles = [];
    var totalWidthSocialButtons

    var p = createjs.extend(Footer, createjs.Container);

    p.setup = function() {

    	instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        dataToLoad = this.dataToLoad
        shapeStroke = this.shapeStroke
        shapeFill = this.shapeFill
        upArrow = this.upArrow
        downArrow = this.downArrow;
        dispatchInstanceRoot = this.dispatchInstanceRoot
        soundInstance = this.soundInstance

        //Load Json File
        preloadDataFooter = new createjs.LoadQueue(true);
        preloadDataFooter.addEventListener("fileload", preloadDataComplete);
        preloadDataFooter.loadFile(dataToLoad, true);

    } ;

    function preloadDataComplete(event) {
 
        console.log("New Module Footer:"+dataToLoad);
        dataLoaded = event.result.footer[0];

        socialTitles = [dataLoaded.facebook,dataLoaded.twitter,dataLoaded.google]

        addElements();
        setCurrentDimensions("add");

        //remove preloadData
        preloadDataFooter.removeEventListener("fileload", preloadDataComplete);
        preloadDataFooter = null;
    }

    function addElements(){

        strokeFill = new createjs.Shape();
        strokeFill.graphics.beginFill("#8f929c").drawRect(0, 0, (stage.canvas.width-400*ratio),1*ratio);
        strokeFill.x = 200*ratio
        strokeFill.alpha = 0.25

        upArrow.x = stage.canvas.width/2-3*ratio
        upArrow.y = 160*ratio+10*ratio

        maskUpArrow = new createjs.Shape();
        maskUpArrow.graphics.beginFill("#171820").drawRect(0, 0, 7*ratio, 40*ratio);
        maskUpArrow.x = stage.canvas.width/2-3*ratio
        maskUpArrow.y = 160*ratio
        //instance.addChild(maskUpArrow);
        upArrow.mask = maskUpArrow

        upHit = new createjs.Shape();
        upHit.graphics.beginFill("#FFFFFF").drawRect(0, 0, 80*ratio,80*ratio);
        upHit.x = upArrow.x-40*ratio
        upHit.y = upArrow.y-20*ratio
        upHit.alpha = 0.01

        upHit.type = "Up";
        upHit.cursor = "pointer";
        upHit.addEventListener("mouseover", handlerOver);
        upHit.addEventListener("mouseout", handlerOut);
        upHit.addEventListener("click", handlerClick);

        titleText = new createjs.Text();
        titleText.textBaseline = "alphabetic";
        titleText.font = "14px BebasNeueBold";
        titleText.color = "#171820";
        titleText.text = dataLoaded.titleSocial;
        titleText.scaleX = ratio;
        titleText.scaleY = ratio;
        titleText.x = stage.canvas.width/2-titleText.getBounds().width/2*ratio
        titleText.y = upArrow.y+40*ratio+80*ratio

        buttonsContainer = new createjs.Container();

        for(var i=0;i<socialTitles.length;i++){

            var buttonSocial = new createjs.Container();
            buttonSocial.name = "buttonSocial"+i

            var buttonText = new createjs.Text();
            buttonText.name = "buttonText"+i
            buttonText.textBaseline = "alphabetic";
            buttonText.font = "14px BebasNeueLight";
            buttonText.color = "#171820";
            buttonText.text = socialTitles[i];
            buttonText.scaleX = ratio;
            buttonText.scaleY = ratio;

            buttonText.x = 180/2*ratio-buttonText.getBounds().width/2*ratio
            buttonText.y = 60/2*ratio+buttonText.getBounds().height/2*ratio

            var shapeFillClone = shapeFill.clone(true);
            shapeFillClone.name = "shapeFillClone"+i
            var shapeFillCloneHit = shapeFill.clone(true);
            shapeFillCloneHit.name = "shapeFillCloneHit"+i
            var shapeStrokeClone = shapeStroke.clone(true);
            shapeStrokeClone.name = "shapeStrokeClone"+i

            shapeFillCloneHit.alpha = 0.01;
            shapeFillCloneHit.type = "social";
            shapeFillCloneHit.instance = i;
            shapeFillCloneHit.cursor = "pointer";
            shapeFillCloneHit.addEventListener("mouseover", handlerOver);
            shapeFillCloneHit.addEventListener("mouseout", handlerOut);
            shapeFillCloneHit.addEventListener("click", handlerClick);

            shapeFillClone.alpha = 0
            buttonSocial.addChild(shapeFillClone);
            buttonSocial.addChild(shapeStrokeClone);
            buttonSocial.addChild(buttonText);
            buttonSocial.addChild(shapeFillCloneHit);
            buttonsContainer.addChild(buttonSocial)

            buttonSocial.x = (180*ratio)*i
        }
        
        totalWidthSocialButtons = (180*ratio)*i

        buttonsContainer.x = stage.canvas.width/2-totalWidthSocialButtons/2
        buttonsContainer.y = titleText.y+titleText.getBounds().height*ratio+20*ratio

        titleNextText = new createjs.Text();
        titleNextText.textBaseline = "alphabetic";
        titleNextText.font = "24px BebasNeueBold";
        titleNextText.color = "#171820";
        titleNextText.text = dataLoaded.nextProject;
        titleNextText.alpha = 0.5
        titleNextText.scaleX = ratio;
        titleNextText.scaleY = ratio;
        titleNextText.x = stage.canvas.width/2-titleNextText.getBounds().width/2*ratio
        titleNextText.y = buttonsContainer.y+60*ratio+titleNextText.getBounds().height*ratio+80*ratio;

        downArrow.x = stage.canvas.width/2-3*ratio
        downArrow.y = titleNextText.y+20+ratio-10*ratio

        maskDownArrow = new createjs.Shape();
        maskDownArrow.graphics.beginFill("#171820").drawRect(0, 0, 7*ratio, 40*ratio);
        maskDownArrow.x = stage.canvas.width/2-3*ratio
        maskDownArrow.y = titleNextText.y+20
        //instance.addChild(maskDownArrow);
        downArrow.mask = maskDownArrow

        downHit = new createjs.Shape();
        downHit.graphics.beginFill("#FFFFFF").drawRect(0, 0, 80*ratio,80*ratio);
        downHit.x = downArrow.x-40*ratio
        downHit.y = downArrow.y-20*ratio
        downHit.alpha = 0.01

        downHit.type = "Down";
        downHit.cursor = "pointer";
        downHit.addEventListener("mouseover", handlerOver);
        downHit.addEventListener("mouseout", handlerOut);
        downHit.addEventListener("click", handlerClick);

        instance.addChild(strokeFill);
        instance.addChild(upArrow);
        instance.addChild(upHit);
        instance.addChild(titleText);
        instance.addChild(buttonsContainer)
        instance.addChild(titleNextText)
        instance.addChild(downArrow);
        instance.addChild(downHit);

    }

    function handlerOut(event){
        switch(event.target.type){
            case "Up":
                TweenMax.to(upArrow, tweenTime/2, {y:160*ratio+10*ratio,ease:Expo.easeInOut})
            break;
            case "Down":
                TweenMax.to(titleNextText, tweenTime/2, {alpha:0.5,ease:Expo.easeInOut})
                TweenMax.to(downArrow, tweenTime/2, {y:titleNextText.y+20+ratio-10*ratio,ease:Expo.easeInOut})
            break;
            case "social":
                var target = buttonsContainer.getChildByName("buttonSocial"+event.target.instance)
                TweenMax.to(target.getChildByName("shapeFillClone"+event.target.instance), tweenTime/2, {alpha:0,ease:Expo.easeInOut})
                TweenMax.to(target.getChildByName("shapeStrokeClone"+event.target.instance), tweenTime/4, {alpha:1,ease:Expo.easeInOut})
                target.getChildByName("buttonText"+event.target.instance).color = "#171820";
            break;
        }
    }

    function handlerOver(event){

        switch(event.target.type){
            case "Up":
                soundInstance.textSound();
                TweenMax.to(upArrow, tweenTime/2, {y:160*ratio,ease:Expo.easeInOut})
            break;
            case "Down":
                soundInstance.textSound();
                TweenMax.to(titleNextText, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                TweenMax.to(downArrow, tweenTime/2, {y:titleNextText.y+20+ratio,ease:Expo.easeInOut})
            break;
            case "social":
                soundInstance.textSoundOther();
                var target = buttonsContainer.getChildByName("buttonSocial"+event.target.instance)
                TweenMax.to(target.getChildByName("shapeFillClone"+event.target.instance), tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                TweenMax.to(target.getChildByName("shapeStrokeClone"+event.target.instance), tweenTime/4, {alpha:0,ease:Expo.easeInOut})
                target.getChildByName("buttonText"+event.target.instance).color = "#FFFFFF";
            break;
        }
    }

    function handlerClick(event){

        switch(event.target.type){


            case "Up":
                var customEvent = new createjs.Event("backToTop");
                dispatchInstance.dispatchEvent(customEvent);
            break;
            case "Down":

                upHit.removeEventListener("mouseover", handlerOver);
                upHit.removeEventListener("mouseout", handlerOut);
                upHit.removeEventListener("click", handlerClick);
                
                downHit.removeEventListener("mouseover", handlerOver);
                downHit.removeEventListener("mouseout", handlerOut);
                downHit.removeEventListener("click", handlerClick);
            
                var customEvent = new createjs.Event("removeSticky");
                dispatchInstanceRoot.dispatchEvent(customEvent);

                timer = setTimeout(nextproject, 500);

            break;

            case "Social":
                
            break;
        }
    }

    function nextproject(){

        var customEvent = new createjs.Event("nextProject");
        dispatchInstanceRoot.dispatchEvent(customEvent);

    }

    function setCurrentDimensions(Itype){
        var customEvent = new createjs.Event("FooterLoadComplete");
        if(Itype=="add"){
           customEvent.currentType = "add"; 
        }else{
            customEvent.currentType = "resize";
        }

        customEvent.currentHeight = 515*ratio+160*ratio
        dispatchInstance.dispatchEvent(customEvent);
    }

     p.kill = function(){

        strokeFill.graphics.clear();
        instance.removeChild(strokeFill)

        instance.removeChild(upArrow)

        instance.removeChild(titleText)
        titleText = null

        instance.removeChild(titleText)
        titleText = null

        for(var i=0;i<socialTitles.length;i++){
            var target = buttonsContainer.getChildByName("buttonSocial"+i)
            target.getChildByName("shapeFillCloneHit"+i).removeEventListener("mouseover", handlerOver);
            target.getChildByName("shapeFillCloneHit"+i).removeEventListener("mouseout", handlerOut);
            target.getChildByName("shapeFillCloneHit"+i).removeEventListener("click", handlerClick);
        }

        instance.removeChild(buttonsContainer)
        buttonsContainer = null

        instance.removeChild(titleNextText)
        titleNextText = null

        instance.removeChild(downArrow)

        instance.removeChild(upHit)
        upHit = null

        instance.removeChild(downHit)
        downHit = null

    }

    p.resize = function() {

        if(strokeFill){
            strokeFill.graphics.clear();
            strokeFill.graphics.beginFill("#8f929c").drawRect(0, 0, (stage.canvas.width-400*ratio),1*ratio);
            strokeFill.x = 200*ratio
        }

        if(upArrow.x = stage.canvas.width/2){
            upArrow.x = stage.canvas.width/2-3*ratio
            upArrow.y = 160*ratio
        }
        
        if(titleText){
            titleText.x = stage.canvas.width/2-titleText.getBounds().width/2*ratio
            titleText.y = upArrow.y+40*ratio+80*ratio
        }

        if(buttonsContainer){
            buttonsContainer.x = stage.canvas.width/2-totalWidthSocialButtons/2
            buttonsContainer.y = titleText.y+titleText.getBounds().height*ratio+20*ratio
        }

        if(titleNextText){
            titleNextText.x = stage.canvas.width/2-titleNextText.getBounds().width/2*ratio
            titleNextText.y = buttonsContainer.y+60*ratio+titleNextText.getBounds().height*ratio+80*ratio;
        }

        if(downArrow){
            downArrow.x = stage.canvas.width/2-3*ratio
            downArrow.y = titleNextText.y+20+ratio
        }

        if(maskDownArrow){
             maskDownArrow.x = stage.canvas.width/2-3*ratio
            maskDownArrow.y = titleNextText.y+20+ratio
        }

        if(maskUpArrow){
             maskUpArrow.x = stage.canvas.width/2-3*ratio
            maskUpArrow.y = 160*ratio
        }

        if(upHit){
             upHit.x = upArrow.x-40*ratio
            upHit.y = upArrow.y-20*ratio
        }

        if(downHit){
            downHit.x = downArrow.x-40*ratio
            downHit.y = downArrow.y-20*ratio
        }

         setCurrentDimensions("resize")

    } ;

window.Footer = createjs.promote(Footer, "Container");
}());