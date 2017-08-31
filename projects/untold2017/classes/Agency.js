(function () {

    function Agency(IdispatchInstance,Iratio,Imargin,ItweenTime,IaspectRatio,Ibg,Idata) {

        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.aspectRatio = IaspectRatio;
        this.bg = Ibg;
        this.data = Idata;
        this.setup();

    }

    //elements
    var ratio;
    var margin;
    var tweenTime;
    var aspectRatio;
    var instance
    var dispatchInstance
    var titleText;
    var weText;
    var weTextFirst;
    var weTextSecond;
    var servicesText;
    var container;
    var titleTextSquare
    var currentHeight;

    var bg;
    var data;
    
    var p = createjs.extend(Agency, createjs.Container);

    p.setup = function() {

    	instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        bg = this.bg;
        data = this.data;

    } ;

    p.open = function() {
        
        console.log("Agency Open")
        addElements();
        addAnimationElements();
    }

    function addElements(){

        instance.addChild(bg);
        aspectRatio.resize(bg,1600,1000);

        bg.alpha = 1;
        TweenMax.to(bg, tweenTime*2, {delay:tweenTime,alpha:0.8,ease:Expo.easeInOut})

        bg.cursor = "auto"
        bg.addEventListener("mouseover", handlerOver);

        container = new createjs.Container();
        instance.addChild(container)

        titleText = new createjs.Text();
        titleText.textBaseline = "alphabetic";
        titleText.font = "36px BebasNeueLight";
        titleText.color = "#FFFFFF";
        titleText.text = data.title;
        titleText.scaleX = ratio;
        titleText.scaleY = ratio;
        container.addChild(titleText);

        titleTextSquare = new createjs.Shape();
        titleTextSquare.compositeOperation = "overlay";
        titleTextSquare.graphics.beginFill("#FFFFFF").drawRect(0, 0, titleText.getBounds().width*ratio+20*ratio, titleText.getBounds().height*ratio+5*ratio+20*ratio);
        titleTextSquare.x = titleText.x-10*ratio
        titleTextSquare.y = titleText.y-titleText.getBounds().height*ratio-5*ratio-10*ratio
        container.addChild(titleTextSquare);

        weText = new createjs.Text();
        weText.textBaseline = "alphabetic";
        weText.font = "72px BebasNeueBold";
        weText.color = "#171820";
        weText.text = data.we;
        weText.scaleX = ratio;
        weText.scaleY = ratio;
        weText.y = weText.getBounds().height*ratio+80*ratio;
        container.addChild(weText);

        weTextSquare = new createjs.Shape();
        weTextSquare.compositeOperation = "overlay";
        weTextSquare.graphics.beginFill("#FFFFFF").drawRect(0, 0, weText.getBounds().width*ratio+20*ratio, weText.getBounds().height*ratio+5*ratio+20*ratio);
        weTextSquare.x = weText.x-10*ratio
        weTextSquare.y = weText.y-titleText.getBounds().height*ratio-5*ratio-10*ratio
        container.addChild(weTextSquare);

        weTextFirst = new createjs.Text();
        weTextFirst.lineWidth = (925*ratio)/ratio
        weTextFirst.textBaseline = "alphabetic";
        weTextFirst.font = "16px BwModelicaLight ";
        weTextFirst.color = "#ffffff";
        weTextFirst.lineHeight = 30;
        weTextFirst.text = data.weTextFirst;
        weTextFirst.scaleX = ratio;
        weTextFirst.scaleY = ratio;
        weTextFirst.y = weText.y+weTextFirst.getBounds().height*ratio
        container.addChild(weTextFirst);

        weTextSecond = new createjs.Text();
        weTextSecond.lineWidth = (925*ratio)/ratio
        weTextSecond.textBaseline = "alphabetic";
        weTextSecond.font = "16px BwModelicaLight ";
        weTextSecond.color = "#ffffff";
        weTextSecond.lineHeight = 30;
        weTextSecond.text = data.weTextSecond;
        weTextSecond.scaleX = ratio;
        weTextSecond.scaleY = ratio;
        weTextSecond.y = weTextFirst.y+weTextSecond.getBounds().height*ratio+40*ratio
        container.addChild(weTextSecond);

        servicesText = new createjs.Text();
        servicesText.textBaseline = "alphabetic";
        servicesText.font = "72px BebasNeueBold";
        servicesText.color = "#171820";
        servicesText.text = data.services;
        servicesText.scaleX = ratio;
        servicesText.scaleY = ratio;
        servicesText.y = weTextSecond.y+weTextSecond.getBounds().height*ratio+servicesText.getBounds().height*ratio+40*ratio;
        container.addChild(servicesText);

        servicesTextSquare = new createjs.Shape();
        servicesTextSquare.compositeOperation = "overlay";
        servicesTextSquare.graphics.beginFill("#FFFFFF").drawRect(0, 0, servicesText.getBounds().width*ratio+20*ratio, servicesText.getBounds().height*ratio+5*ratio+20*ratio);
        servicesTextSquare.x = servicesText.x-10*ratio
        servicesTextSquare.y = servicesText.y-servicesText.getBounds().height*ratio-5*ratio-10*ratio
        container.addChild(servicesTextSquare);

        brandingTitleText = new createjs.Text();
        brandingTitleText.textBaseline = "alphabetic";
        brandingTitleText.font = "16px BebasNeueBold";
        brandingTitleText.color = "#ffffff";
        brandingTitleText.text = data.branding;
        brandingTitleText.scaleX = ratio;
        brandingTitleText.scaleY = ratio;
        brandingTitleText.y = servicesText.y+servicesText.getBounds().height*ratio
        container.addChild(brandingTitleText);

        var lengthBradingServices = data.brandingServices.length
        
        for(var i=0;i<lengthBradingServices;i++){

            var brandingText = new createjs.Text();
            
            brandingText.textBaseline = "alphabetic";
            brandingText.name = "branding"+i
            brandingText.font = "16px BwModelicaLight ";
            brandingText.color = "#ffffff";
            brandingText.lineHeight = 30;
            brandingText.text = data.brandingServices[i];
            brandingText.scaleX = ratio;
            brandingText.scaleY = ratio;
            brandingText.y = (brandingTitleText.y+brandingText.getBounds().height*ratio)+i*30*ratio
            container.addChild(brandingText);
        }

        designDevTitleText = new createjs.Text();
        designDevTitleText.textBaseline = "alphabetic";
        designDevTitleText.font = "16px BebasNeueBold";
        designDevTitleText.color = "#ffffff";
        designDevTitleText.text = data.designAndDev;
        designDevTitleText.scaleX = ratio;
        designDevTitleText.scaleY = ratio;
        designDevTitleText.x = brandingTitleText.getBounds().width*ratio+215*ratio
        designDevTitleText.y = servicesText.y+servicesText.getBounds().height*ratio
        container.addChild(designDevTitleText);

        var lengthDesignServices = data.designAndDevServices.length

        for(var i=0;i<lengthDesignServices;i++){

            var designDevText = new createjs.Text();
            
            designDevText.textBaseline = "alphabetic";
            designDevText.font = "16px BwModelicaLight ";
            designDevText.name = "designDev"+i
            designDevText.color = "#ffffff";
            designDevText.lineHeight = 30;
            designDevText.text = data.designAndDevServices[i];
            designDevText.scaleX = ratio;
            designDevText.scaleY = ratio;
            designDevText.x = brandingTitleText.getBounds().width*ratio+215*ratio
            designDevText.y = (brandingTitleText.y+brandingText.getBounds().height*ratio)+i*30*ratio
            container.addChild(designDevText);
        }

        productionTitleText = new createjs.Text();
        productionTitleText.textBaseline = "alphabetic";
        productionTitleText.font = "16px BebasNeueBold";
        productionTitleText.color = "#ffffff";
        productionTitleText.text = data.contentProd;
        productionTitleText.scaleX = ratio;
        productionTitleText.scaleY = ratio;
        productionTitleText.x = designDevTitleText.x+designDevTitleText.getBounds().width*ratio+215*ratio
        productionTitleText.y = servicesText.y+servicesText.getBounds().height*ratio
        container.addChild(productionTitleText);
        
        var lengthContentProd = data.contentProdServices.length

        for(var i=0;i<lengthDesignServices;i++){

            var contentProdText = new createjs.Text();
            
            contentProdText.textBaseline = "alphabetic";
            contentProdText.font = "16px BwModelicaLight ";
            contentProdText.name = "contentProd"+i
            contentProdText.color = "#ffffff";
            contentProdText.lineHeight = 30;
            contentProdText.text = data.contentProdServices[i];
            contentProdText.scaleX = ratio;
            contentProdText.scaleY = ratio;
            contentProdText.x = productionTitleText.x
            contentProdText.y = (brandingTitleText.y+brandingText.getBounds().height*ratio)+i*30*ratio
            container.addChild(contentProdText);
        }

        currentHeight = contentProdText.y

        container.x = 192*ratio
        container.y = stage.canvas.height/2-currentHeight/2;

    }

    function addAnimationElements(){
        
        titleText.alpha = 0
        weText.alpha = 0
        servicesText.alpha = 0;

        
        var lengthBradingServices = data.brandingServices.length
        
        for(var i=0;i<lengthBradingServices;i++){

            TweenMax.from(container.getChildByName("branding"+i), tweenTime, {alpha:0,delay:(tweenTime*2+0.5),ease:Expo.easeInOut})
            
        }

        var lengthDesignServices = data.designAndDevServices.length

        for(var i=0;i<lengthDesignServices;i++){

            TweenMax.from(container.getChildByName("designDev"+i), tweenTime, {alpha:0,delay:(tweenTime*2+0.6),ease:Expo.easeInOut})
            
        }

        var lengthContentProd = data.contentProdServices.length

        for(var i=0;i<lengthDesignServices;i++){

            TweenMax.from(container.getChildByName("contentProd"+i), tweenTime, {alpha:0,delay:(tweenTime*2+0.7),ease:Expo.easeInOut})

        }

        TweenMax.from(weTextFirst, tweenTime, {delay:tweenTime*2+0.1,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(weTextSecond, tweenTime, {delay:tweenTime*2+0.2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(brandingTitleText, tweenTime, {delay:tweenTime*2+0.3,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(designDevTitleText, tweenTime, {delay:tweenTime*2+0.4,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(productionTitleText, tweenTime, {delay:tweenTime*2+0.5,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(titleTextSquare, tweenTime, {scaleX:0,delay:tweenTime*1.5,ease:Expo.easeInOut,onComplete:endAnimationTitleElements})
        TweenMax.from(weTextSquare, tweenTime, {scaleX:0,delay:tweenTime*1.5,ease:Expo.easeInOut,onComplete:endAnimationWeElements})
        TweenMax.from(servicesTextSquare, tweenTime, {scaleX:0,delay:tweenTime*1.5,ease:Expo.easeInOut,onComplete:endAnimationServicesElements})

    }

     function endAnimationTitleElements(){

        titleTextSquare.regX = titleText.getBounds().width*ratio;
        titleTextSquare.x = titleText.x-10*ratio+titleText.getBounds().width*ratio
        TweenMax.to(titleTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

       TweenMax.to(titleText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
        
    }

    function endAnimationWeElements(){

        weTextSquare.regX = weText.getBounds().width*ratio;
        weTextSquare.x = weText.x-10*ratio+weText.getBounds().width*ratio
        TweenMax.to(weTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

       TweenMax.to(weText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
        
    }

    function endAnimationServicesElements(){

        servicesTextSquare.regX = servicesText.getBounds().width*ratio;
        servicesTextSquare.x = servicesText.x-10*ratio+servicesText.getBounds().width*ratio
        TweenMax.to(servicesTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

       TweenMax.to(servicesText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
        
    }

    function handlerOver(event){

    }

    p.close = function() {

        bg.alpha = 0.8;
        TweenMax.to(bg, tweenTime/2, {alpha:1,ease:Expo.easeInOut})

        timer = setTimeout(kill, 2000);
       
    }

    function kill() {
        instance.removeChild(bg);
        instance.removeChild(container);
    }

    p.resize = function() {
        if(bg){
            aspectRatio.resize(bg,1600,1000);
        }

        if(container){
           container.x = 192*ratio
            container.y = stage.canvas.height/2-currentHeight/2;
        }
    } ;

window.Agency = createjs.promote(Agency, "Container");
}());