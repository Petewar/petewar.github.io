(function () {

    function DestaqueNews(Iratio,Inav,InavLength,IshapeArrow,Image,Inews,IaspectRatio,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.image = Image
        this.news = Inews;
        this.aspectRatio = IaspectRatio;
        this.shapeArrow = IshapeArrow;
        this.posY = IposY;
        this.nav = Inav;
        this.navLength = InavLength
        this.setup();
    }
    
    var instance;
    var ratio;
    var image;
    var news;
    var aspectRatio;
    var shapeArrow;
    var posY;
    var nav;
    var navLength;

    var p = createjs.extend(DestaqueNews, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        image = this.image;
        news = this.news;
        aspectRatio  = this.aspectRatio;
        shapeArrow  = this.shapeArrow;
        posY = this.posY;
        nav = this.nav
        navLength = this.navLength

        addElements();
        addAnimation();

    };

    function addElements(){

        image.regX = image.getBounds().width/2
        image.x = stage.canvas.width/2;
        image.y = posY;
        aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"fullWidth")
        instance.addChild(image);

        var destqueText = new createjs.Text();
        destqueText.name = "news";
        destqueText.font = "14px BwModelica-Regular";
        destqueText.textBaseline = "alphabetic";
        destqueText.color = "#333333";
        if(ratio==1)destqueText.lineWidth = stage.canvas.width-(100*ratio+40*ratio)*2
        if(ratio==2)destqueText.lineWidth = stage.canvas.width-(410*ratio+40*ratio)*2
        destqueText.lineHeight = 30;
        destqueText.text = news
        destqueText.alpha = 0.8
        destqueText.scaleX = ratio;
        destqueText.scaleY = ratio;
        destqueText.x = 100*ratio+80*ratio
        destqueText.y = posY+270*ratio
        instance.addChild(destqueText);

        var containerButton = new createjs.Container();
        containerButton.name = "containerButton";
        containerButton.x = stage.canvas.width/2
        containerButton.y = destqueText.y+destqueText.getBounds().height*ratio+30*ratio+70*ratio
        instance.addChild(containerButton);

        var greenCircle = new createjs.Shape();
        greenCircle.name = "greenCircle"
        greenCircle.graphics.beginFill("#8EC640").drawCircle(0,0,30*ratio);
        containerButton.addChild(greenCircle);

        var containerButtonFeature = new createjs.Container();
        containerButtonFeature.name = "containerButtonFeature";
        containerButtonFeature.x = -30*ratio
        containerButtonFeature.y = -5*ratio
        containerButton.addChild(containerButtonFeature);

        containerButtonFeature.addChild(shapeArrow);
        shapeArrow.x = -20*ratio

        var maskButton = new createjs.Shape();
        maskButton.name = "maskButton"
        maskButton.graphics.beginFill("#FFFFFF").drawRect(0, 0, 120*ratio, 28*ratio);
        //maskButton.y = -8*ratio
        maskButton.alpha = 0.01;
        containerButtonFeature.addChild(maskButton);

        shapeArrow.mask = maskButton;

    }

    function addAnimation(){

       TweenMax.from(image, 1, {delay:1.25,alpha:0,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("news"), 1, {delay:1.5,alpha:0,y:instance.getChildByName("news").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("containerButton"), 1, {delay:1.75,alpha:0,y:instance.getChildByName("containerButton").y+100*ratio,ease:Expo.easeInOut,onComplete:addHits})
       
    }

    function handlerOver(event){

        TweenMax.to(instance.getChildByName("containerButton").getChildByName("greenCircle"), 0.5, {scaleX:1.2,scaleY:1.2,ease:Expo.easeInOut})
        TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature"), 0.6, {x:-40*ratio,scaleY:1.2,ease:Expo.easeInOut})
        TweenMax.to(shapeArrow, 0.5, {x:0,ease:Expo.easeInOut})

    }

    function handlerOut(event){

        TweenMax.to(instance.getChildByName("containerButton").getChildByName("greenCircle"), 0.6, {scaleX:1,scaleY:1,ease:Expo.easeInOut})
        TweenMax.to(instance.getChildByName("containerButton").getChildByName("containerButtonFeature"), 0.6, {x:-30*ratio,scaleY:1.2,ease:Expo.easeInOut})
        TweenMax.to(shapeArrow, 0.6, {x:-20*ratio,ease:Expo.easeInOut})
    }

    function handlerClick(event){
       var next = Number(nav)+1
       if(next>navLength)next=0
       SWFAddress.setValue("/destaques/"+next);
    }

    function addHits(){

        instance.getChildByName("containerButton").cursor = "pointer";
        instance.getChildByName("containerButton").type = "viewMore";
        instance.getChildByName("containerButton").addEventListener("mouseover", handlerOver);
        instance.getChildByName("containerButton").addEventListener("mouseout", handlerOut)
        instance.getChildByName("containerButton").addEventListener("click", handlerClick);
       
    }

    p.kill = function() {

        instance.getChildByName("containerButton").removeEventListener("mouseover", handlerOver);
        instance.getChildByName("containerButton").removeEventListener("mouseout", handlerOut)
        instance.getChildByName("containerButton").removeEventListener("click", handlerClick);

        instance.removeChild(image);
        instance.removeChild(shapeArrow);
        instance.removeChild(instance.getChildByName("news"));
        instance.getChildByName("containerButton").getChildByName("containerButtonFeature").removeChild(instance.getChildByName("containerButton").getChildByName("containerButtonFeature").getChildByName("maskButton"));
        instance.getChildByName("containerButton").removeChild(instance.getChildByName("containerButton").getChildByName("containerButtonFeature"));
        instance.removeChild(instance.getChildByName("containerButton"));

    } ; 

    p.getHeight = function() {
        return image.getBounds().height*ratio
    }

    p.resize = function() {

        image.regX = image.getBounds().width/2
        image.x = stage.canvas.width/2;
        image.y = posY;
        aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"fullWidth")

        if(ratio==1)instance.getChildByName("news").lineWidth = stage.canvas.width-(100*ratio+40*ratio)*2
        if(ratio==2)instance.getChildByName("news").lineWidth = stage.canvas.width-(410*ratio+40*ratio)*2

        instance.getChildByName("containerButton").x = stage.canvas.width/2
        instance.getChildByName("containerButton").y = instance.getChildByName("news").y+instance.getChildByName("news").getBounds().height*ratio+30*ratio+70*ratio

    } ; 


window.DestaqueNews = createjs.promote(DestaqueNews, "Container");
}());