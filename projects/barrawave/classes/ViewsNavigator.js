(function () {

    function ViewsNavigator(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.lang = Ilang;
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var aspectRatio;
    var lang

    //elements
    var buttonViews;
    var buttonViewsBlue;
    var viewsText;
    var viewsTextWhite;
    var containerTextIcon;
    var building;
    var buildingBlue;
    var bgNavigator;
    var containerImage;
    var scrollBar;
    var totalHeight;
    var shapeSquareStroke;
    var shapeHitClose;
    var shapeColorClose;
    var close;
    var closeWhite

    //props
    var totalWidth;
    var viewsNavigatorState = false;
    var imagesNavigation;
    var currentInstance;

    var p = createjs.extend(ViewsNavigator, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        lang = this.lang;

    };

    p.addElements = function(Idata,Ibuilding,IbuidingBlue,Images,IdataNavigator,Iclose,IcloseWhite) {

        containerTextIcon = new createjs.Container();
        imagesNavigation = Images;
        dataNavigator = IdataNavigator;
        close = Iclose;
        closeWhite = IcloseWhite

        buttonViews = new createjs.Shape();
        buttonViews.graphics.beginFill("#ffffff").drawRect(0, 0, 269*ratio, 50*ratio);
        buttonViews.x = Math.floor(stage.canvas.width/2-269/2*ratio);
        buttonViews.y = Math.floor(stage.canvas.height-50*ratio);
        instance.addChild(buttonViews);

        buttonViewsBlue = new createjs.Shape();
        buttonViewsBlue.graphics.beginFill("#4b7ea3").drawRect(0, 0, 269*ratio, 50*ratio);
        buttonViewsBlue.x = Math.floor(stage.canvas.width/2-269/2*ratio);
        buttonViewsBlue.y = Math.floor(stage.canvas.height-50*ratio);
        buttonViewsBlue.scaleX = 0;
        instance.addChild(buttonViewsBlue);

        viewsText = new createjs.Text();
        viewsText.font = "12px OpenSans-Semibold";
        viewsText.textBaseline = "alphabetic";
        viewsText.color = "#4b7ea3";
        viewsText.text = Idata.viewsNavigator[lang];
        viewsText.scaleX = ratio;
        viewsText.scaleY = ratio;
        viewsText.x = 40*ratio
        containerTextIcon.addChild(viewsText);

        totalWidth = 40*ratio+viewsText.getBounds().width*ratio

        buildingBlue = IbuidingBlue;
        buildingBlue.y = Math.floor(-14*ratio);
        containerTextIcon.addChild(buildingBlue);

        building = Ibuilding;
        building.y = Math.floor(-14*ratio);
        building.alpha = 0;
        containerTextIcon.addChild(building);

        viewsTextWhite = new createjs.Text();
        viewsTextWhite.font = "12px OpenSans-Semibold";
        viewsTextWhite.textBaseline = "alphabetic";
        viewsTextWhite.color = "#ffffff";
        viewsTextWhite.text = Idata.viewsNavigator[lang];
        viewsTextWhite.scaleX = ratio;
        viewsTextWhite.scaleY = ratio;
        viewsTextWhite.alpha = 0;
        viewsTextWhite.x = 40*ratio
        containerTextIcon.addChild(viewsTextWhite);
        
        containerTextIcon.x = stage.canvas.width/2-totalWidth/2
        containerTextIcon.y = stage.canvas.height-50*ratio+viewsText.getBounds().height/2*ratio+50/2*ratio;
        instance.addChild(containerTextIcon);

        addAnimation();

    }

    function addAnimation(){

        TweenMax.from(buttonViews, 0.7, {delay:3,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(buildingBlue, 0.7, {delay:3.25,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(viewsText, 0.7, {delay:3.25,alpha:0,ease:Expo.easeInOut})

        timer = setTimeout(addHits, 3500);
    }

    function addHits(){

        buttonViews.cursor = "pointer";
        buttonViews.type = "views"
        buttonViews.addEventListener("mouseover", handlerOver);
        buttonViews.addEventListener("mouseout", handlerOut);
        buttonViews.addEventListener("click", handlerClick);

    }

    function removeHits(){

        buttonViews.cursor = "auto";
        buttonViews.removeEventListener("mouseover", handlerOver);
        buttonViews.removeEventListener("mouseout", handlerOut);
        buttonViews.removeEventListener("click", handlerClick);

    }

    function handlerOver(event){

        switch(event.target.type){
            case "views":
                TweenMax.to(buttonViewsBlue, 0.5, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(viewsTextWhite, 0.5, {alpha:1,ease:Expo.easeInOut})
                TweenMax.to(building, 0.5, {alpha:1,ease:Expo.easeInOut})
            break;
            case "closeNavigator":
                TweenMax.to(shapeSquareColorClose, 0.5, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(closeWhite, 0.5, {alpha:1,ease:Expo.easeInOut})
            break;
        }  
    }

    function handlerOut(event){
        switch(event.target.type){
            case "views":
                TweenMax.to(buttonViewsBlue, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(viewsTextWhite, 0.5, {alpha:0,ease:Expo.easeInOut})
                TweenMax.to(building, 0.5, {alpha:0,ease:Expo.easeInOut})
            break;
            case "closeNavigator":
                TweenMax.to(shapeSquareColorClose, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(closeWhite, 0.5, {alpha:0,ease:Expo.easeInOut})
            break;
        } 
        
    }

    function handlerClick(event){

        switch(event.target.type){
            case "views":

                var customEvent = new createjs.Event("hideMenu");
                dispatchInstance.dispatchEvent(customEvent);

                var customEvent = new createjs.Event("hideBuy");
                dispatchInstance.dispatchEvent(customEvent);

                removeHits();
                removeAnimationButton();

            break;
            case "closeNavigator":

                var customEvent = new createjs.Event("showMenu");
                dispatchInstance.dispatchEvent(customEvent);

                var customEvent = new createjs.Event("showBuy");
                dispatchInstance.dispatchEvent(customEvent);

                TweenMax.to(buttonViewsBlue, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(viewsTextWhite, 0.5, {alpha:0,ease:Expo.easeInOut})
                TweenMax.to(building, 0.5, {alpha:0,ease:Expo.easeInOut})

                removeScrollAndHits();
                removeNavigatorElementsAnimation();

            break;
        }

    }

    function addNavigatorElements(){

        var customEvent = new createjs.Event("stopParallaxView");
        dispatchInstance.dispatchEvent(customEvent);

        bgNavigator = new createjs.Shape();
        bgNavigator.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        bgNavigator.regY = stage.canvas.height
        bgNavigator.x = 0
        bgNavigator.y = stage.canvas.height
        instance.addChild(bgNavigator);

        shapeSquareStroke = new createjs.Shape();
        shapeSquareStroke.graphics.beginStroke("#4b7ea3").setStrokeStyle(1*ratio).drawRect(0, 0, 50*ratio, 50*ratio);
        shapeSquareStroke.x = stage.canvas.width-100*ratio
        shapeSquareStroke.y = 50*ratio
        instance.addChild(shapeSquareStroke);

        shapeSquareColorClose = new createjs.Shape();
        shapeSquareColorClose.graphics.beginFill("#4b7ea3").drawRect(0, 0, 50*ratio, 50*ratio);
        shapeSquareColorClose.scaleX = 0;
        shapeSquareColorClose.x = shapeSquareStroke.x
        shapeSquareColorClose.y = shapeSquareStroke.y
        instance.addChild(shapeSquareColorClose);

        shapeHitClose = new createjs.Shape();
        shapeHitClose.graphics.beginFill("#ffffff").drawRect(0, 0, 50*ratio, 50*ratio);
        shapeHitClose.alpha = 0.01
        shapeHitClose.x = shapeSquareStroke.x
        shapeHitClose.y = shapeSquareStroke.y
        instance.addChild(shapeHitClose);

        close.x = shapeSquareStroke.x+15*ratio;
        close.y = shapeSquareStroke.y+15*ratio;
        close.alpha = 1;
        instance.addChild(close);

        closeWhite.x = shapeSquareStroke.x+15*ratio;
        closeWhite.y = shapeSquareStroke.y+15*ratio;
        closeWhite.alpha = 0;
        instance.addChild(closeWhite);

        containerImage = new createjs.Container();
        instance.addChild(containerImage);

        for(var i=0;i<imagesNavigation.length;i++){
            
            imagesNavigation[i].name = "image"+i;
            imagesNavigation[i].instance = i;
            imagesNavigation[i].regX = 800/2;
            imagesNavigation[i].y = 100*ratio+(450*i+(30*ratio)*i);
    
            totalHeight = imagesNavigation[i].y+450+(100*ratio)

            var rectangleBlueNavigator = new createjs.Shape();
            rectangleBlueNavigator.name = "rectangleBlue"+i;
            rectangleBlueNavigator.graphics.beginFill("#4b7ea3").drawRect(0, 0, stage.canvas.width/2, 332);
            rectangleBlueNavigator.x = -stage.canvas.width/2
            rectangleBlueNavigator.y = 100*ratio+(450*i+(30*ratio)*i)+58;
            rectangleBlueNavigator.scaleX = 0;

            var menuTextNumber = new createjs.Text();
            menuTextNumber.name = "menuTextNumber"+i
            
            if(ratio>1){
                menuTextNumber.font = "15px PathwayGothicOne-Regular";
            }else{
                menuTextNumber.font = "30px PathwayGothicOne-Regular";
            }

            menuTextNumber.alpha = 0;

            var currentNumber = i+1

            menuTextNumber.textBaseline = "alphabetic";
            menuTextNumber.color = "#ffffff";
            menuTextNumber.text = "0"+currentNumber;
            menuTextNumber.scaleX = ratio;
            menuTextNumber.scaleY = ratio;
            menuTextNumber.x = -835

            if(ratio>1){
                menuTextNumber.y = rectangleBlueNavigator.y+menuTextNumber.getBounds().height*ratio+65/2*ratio;
            }else{
                menuTextNumber.y = rectangleBlueNavigator.y+menuTextNumber.getBounds().height*ratio+65*ratio;
            }

            var menuTextOne = new createjs.Text();
            menuTextOne.name = "menuTextOne"+i
            
            if(ratio>1){
                menuTextOne.font = "60px PathwayGothicOne-Regular";
            }else{
                menuTextOne.font = "120px PathwayGothicOne-Regular";
            }

            menuTextOne.textBaseline = "alphabetic";
            menuTextOne.color = "#ffffff";
            menuTextOne.text = dataNavigator[i].titleOne[lang];
            menuTextOne.scaleX = ratio;
            menuTextOne.scaleY = ratio;
            menuTextOne.x = -800

            if(ratio>1){
                menuTextOne.y = rectangleBlueNavigator.y+menuTextOne.getBounds().height*ratio+70/2*ratio;
            }else{
                menuTextOne.y = rectangleBlueNavigator.y+menuTextOne.getBounds().height*ratio+70*ratio;
            }
            
            menuTextOne.alpha = 0;

            var menuTextTwo = new createjs.Text();
            menuTextTwo.name = "menuTextTwo"+i
            
            if(ratio>1){
                menuTextTwo.font = "60px PathwayGothicOne-Regular";
            }else{
                menuTextTwo.font = "120px PathwayGothicOne-Regular";
            }

            menuTextTwo.textBaseline = "alphabetic";
            menuTextTwo.color = "#ffffff";
            menuTextTwo.text = dataNavigator[i].titleTwo[lang];
            menuTextTwo.scaleX = ratio;
            menuTextTwo.scaleY = ratio;
            menuTextTwo.x = -800

            if(ratio>1){
                menuTextTwo.y = menuTextOne.y+menuTextTwo.getBounds().height*ratio+36/2*ratio;
            }else{
                menuTextTwo.y = menuTextOne.y+menuTextTwo.getBounds().height*ratio+36*ratio;
            }
           
            menuTextTwo.alpha = 0;

            containerImage.addChild(rectangleBlueNavigator);
            containerImage.addChild(imagesNavigation[i]);
            containerImage.addChild(menuTextNumber)
            containerImage.addChild(menuTextOne);
            containerImage.addChild(menuTextTwo);

        }

        containerImage.x = stage.canvas.width/2;
        addNavigatorElementsAnimation();

    }

    function addNavigatorElementsAnimation(){

        bgNavigator.type = "close";
        bgNavigator.cursor = "auto"
        bgNavigator.addEventListener("mouseover", handlerOver);

        TweenMax.from(bgNavigator, 0.7, {scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(containerImage, 1, {delay:0.7,y:stage.canvas.height,ease:Expo.easeInOut,onComplete:addScrollAndHits})
        TweenMax.from(shapeSquareStroke, 1, {delay:0.7,alpha:0})
        TweenMax.from(close, 1, {delay:0.7,alpha:0})

    }

    function removeNavigatorElementsAnimation(iType){

        bgNavigator.removeEventListener("mouseover", handlerOver);

        var customEvent = new createjs.Event("runParallaxView");
        dispatchInstance.dispatchEvent(customEvent);

        TweenMax.to(containerImage, 1, {y:stage.canvas.height,ease:Expo.easeInOut})
        
        TweenMax.to(shapeSquareStroke, 0.7, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(close, 0.7, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(closeWhite, 0.7, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(shapeSquareColorClose, 0.7, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(bgNavigator, 1, {delay:0.7,scaleY:0,ease:Expo.easeInOut,onComplete:killNavigator})

    }

    function killNavigator(){

        instance.removeChild(bgNavigator);
        instance.removeChild(shapeSquareStroke);
        instance.removeChild(shapeColorClose)
        instance.removeChild(shapeHitClose);
        instance.removeChild(close);
        instance.removeChild(closeWhite);
        instance.removeChild(containerImage);

        addAnimationButton();

    }

    function addScrollAndHits(){

        scrollBar = new ScrollBar(ratio,0,instance,containerImage,totalHeight,0.05);
        scrollBar.x = stage.canvas.width-10*ratio;
        instance.addChild(scrollBar);


        for(var i=0;i<imagesNavigation.length;i++){
            containerImage.cursor = "pointer";
            containerImage.getChildByName("image"+i).instance = i
            containerImage.getChildByName("image"+i).addEventListener("mouseover", handlerOverNavigation);
            containerImage.getChildByName("image"+i).addEventListener("mouseout", handlerOutNavigation);
            containerImage.getChildByName("image"+i).addEventListener("click", handlerClickNavigation);
        }

        shapeHitClose.type = "closeNavigator"
        shapeHitClose.cursor = "pointer";
        shapeHitClose.addEventListener("mouseover", handlerOver);
        shapeHitClose.addEventListener("mouseout", handlerOut);
        shapeHitClose.addEventListener("click", handlerClick);

    }

    function removeScrollAndHits(){

        scrollBar.kill()
        instance.removeChild(scrollBar)
        scrollBar=null

        for(var i=0;i<imagesNavigation.length;i++){
            containerImage.cursor = "auto";
            containerImage.getChildByName("image"+i).removeEventListener("mouseover", handlerOverNavigation);
            containerImage.getChildByName("image"+i).removeEventListener("mouseout", handlerOutNavigation);
            containerImage.getChildByName("image"+i).removeEventListener("click", handlerClickNavigation);
        }

        shapeHitClose.cursor = "auto";
        shapeHitClose.removeEventListener("mouseover", handlerOver);
        shapeHitClose.removeEventListener("mouseout", handlerOut);
        shapeHitClose.removeEventListener("click", handlerClick);

    }



    function handlerOverNavigation(event){

        currentInstance = event.target.instance
        TweenMax.to(containerImage.getChildByName("rectangleBlue"+event.target.instance), 0.7, {scaleX:1,ease:Expo.easeInOut})

        timer = setTimeout(continueOverNavigation, 250);
    }

    function continueOverNavigation(){

        containerImage.getChildByName("menuTextNumber"+currentInstance).alpha = 0;
        containerImage.getChildByName("menuTextOne"+currentInstance).alpha = 0;
        containerImage.getChildByName("menuTextTwo"+currentInstance).alpha = 0;

        containerImage.getChildByName("menuTextNumber"+currentInstance).x = containerImage.getChildByName("menuTextNumber"+currentInstance).x -100*ratio;
        containerImage.getChildByName("menuTextOne"+currentInstance).x = containerImage.getChildByName("menuTextOne"+currentInstance).x +100*ratio;
        containerImage.getChildByName("menuTextTwo"+currentInstance).x = containerImage.getChildByName("menuTextTwo"+currentInstance).x +100*ratio;

        TweenMax.to(containerImage.getChildByName("menuTextNumber"+currentInstance), 0.7, {x:containerImage.getChildByName("menuTextNumber"+currentInstance).x +100*ratio,ease:Expo.easeInOut})
        TweenMax.to(containerImage.getChildByName("menuTextNumber"+currentInstance), 0.7, {alpha:1,ease:Expo.easeInOut})

        TweenMax.to(containerImage.getChildByName("menuTextOne"+currentInstance), 0.5, {x:containerImage.getChildByName("menuTextOne"+currentInstance).x -100*ratio,ease:Expo.easeInOut})
        TweenMax.to(containerImage.getChildByName("menuTextOne"+currentInstance), 0.5, {alpha:1,ease:Expo.easeInOut})

        TweenMax.to(containerImage.getChildByName("menuTextTwo"+currentInstance), 0.5, {x:containerImage.getChildByName("menuTextTwo"+currentInstance).x -100*ratio,ease:Expo.easeInOut})
        TweenMax.to(containerImage.getChildByName("menuTextTwo"+currentInstance), 0.5, {alpha:1,ease:Expo.easeInOut})

       
    }

    function handlerOutNavigation(event){

       clearTimeout(timer)

       TweenMax.to(containerImage.getChildByName("rectangleBlue"+event.target.instance), 0.7, {scaleX:0,ease:Expo.easeInOut})
       
       containerImage.getChildByName("menuTextNumber"+event.target.instance).alpha = 0;
       containerImage.getChildByName("menuTextOne"+event.target.instance).alpha = 0;
       containerImage.getChildByName("menuTextTwo"+event.target.instance).alpha = 0;

    }

    function handlerClickNavigation(event){

        var customEvent = new createjs.Event("removeView");
        customEvent.nav = event.target.instance;
        dispatchInstance.dispatchEvent(customEvent);

        var customEvent = new createjs.Event("showMenu");
        dispatchInstance.dispatchEvent(customEvent);

        var customEvent = new createjs.Event("showBuy");
        dispatchInstance.dispatchEvent(customEvent);
        
        TweenMax.to(buttonViewsBlue, 0.5, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(viewsTextWhite, 0.5, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(building, 0.5, {alpha:0,ease:Expo.easeInOut})

        removeScrollAndHits();
        removeNavigatorElementsAnimation();

    }

    function removeAnimationButton(){

        viewsNavigatorState = true;

        TweenMax.to(buttonViewsBlue, 0.5, {y:stage.canvas.height+50*ratio,ease:Expo.easeInOut})
        TweenMax.to(buttonViews, 0.5, {y:stage.canvas.height+50*ratio,ease:Expo.easeInOut})
        TweenMax.to(containerTextIcon, 0.5, {y:stage.canvas.height+viewsText.getBounds().height*ratio+50/2*ratio,ease:Expo.easeInOut,onComplete:addNavigatorElements})
        
    }

    function addAnimationButton(){

        viewsNavigatorState = false;

        TweenMax.to(buttonViewsBlue, 0.5, {y:stage.canvas.height-50*ratio,ease:Expo.easeInOut})
        TweenMax.to(buttonViews, 0.5, {y:stage.canvas.height-50*ratio,ease:Expo.easeInOut})
        TweenMax.to(containerTextIcon, 0.5, {y:stage.canvas.height-50*ratio+viewsText.getBounds().height/2*ratio+50/2*ratio,ease:Expo.easeInOut,onComplete:addHits})
        

    }

    p.resize = function() {

        if(viewsNavigatorState==false){

            if(buttonViews){
               buttonViews.x = Math.floor(stage.canvas.width/2-269/2*ratio);
                buttonViews.y = Math.floor(stage.canvas.height-50*ratio);
            }

            if(buttonViewsBlue){
                buttonViewsBlue.x = Math.floor(stage.canvas.width/2-269/2*ratio);
                buttonViewsBlue.y = Math.floor(stage.canvas.height-50*ratio);
            }

            if(containerTextIcon){
                containerTextIcon.x = stage.canvas.width/2-totalWidth/2
                containerTextIcon.y = stage.canvas.height-50*ratio+viewsText.getBounds().height/2*ratio+50/2*ratio;
            }

        }else{

            if(buttonViews){
               buttonViews.x = stage.canvas.width/2-269/2*ratio;
                buttonViews.y = stage.canvas.height+50*ratio
            }

            if(buttonViewsBlue){
                buttonViewsBlue.x = stage.canvas.width/2-269/2*ratio;
                buttonViewsBlue.y = stage.canvas.height+50*ratio
            }

            if(containerTextIcon){
                containerTextIcon.x = stage.canvas.width/2-totalWidth/2
                containerTextIcon.y = stage.canvas.height+viewsText.getBounds().height*ratio+50/2*ratio;
            }

            if(bgNavigator){
                bgNavigator.graphics.clear();
                bgNavigator.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
                bgNavigator.regY = stage.canvas.height
                bgNavigator.x = 0
                bgNavigator.y = stage.canvas.height
            }

            if(shapeSquareStroke){
                shapeSquareStroke.x = stage.canvas.width-100*ratio
                shapeSquareStroke.y = 50*ratio
            }

            if(shapeHitClose){
               shapeHitClose.x = shapeSquareStroke.x
                shapeHitClose.y = shapeSquareStroke.y
            }

            if(shapeSquareColorClose){
                 shapeSquareColorClose.x = shapeSquareStroke.x
                shapeSquareColorClose.y = shapeSquareStroke.y
            }

            if(close){
                close.x = shapeSquareStroke.x+15*ratio;
                close.y = shapeSquareStroke.y+15*ratio;
            }

            if(closeWhite){
                closeWhite.x = shapeSquareStroke.x+15*ratio;
                closeWhite.y = shapeSquareStroke.y+15*ratio;
            }

            if(scrollBar){
                containerImage.x = stage.canvas.width/2;
                scrollBar.x = stage.canvas.width-10*ratio
                scrollBar.updateResize(totalHeight,0,0);
            }

            for(var i=0;i<imagesNavigation.length;i++){
                containerImage.getChildByName("rectangleBlue"+i).graphics.clear();
                containerImage.getChildByName("rectangleBlue"+i).graphics.beginFill("#4b7ea3").drawRect(0, 0, stage.canvas.width, 332);
                containerImage.getChildByName("rectangleBlue"+i).x = -stage.canvas.width/2
            }

        }
        
    } ; 


window.ViewsNavigator = createjs.promote(ViewsNavigator, "Container");
}());