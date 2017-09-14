(function () {

    function ServicosHome(Iratio,Images,Ititle,Itext,IfeatureHeader,IfeatureTitle,IfeatureText,IFeatureButton,IfeatureImgTitle,IfeatureShape,IaspectRatio,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.images = Images
        this.title = Ititle;
        this.text = Itext;
        this.featureHeader = IfeatureHeader;
        this.featureTitle = IfeatureTitle;
        this.featureText = IfeatureText;
        this.featureShape = IfeatureShape;
        this.featureButton = IFeatureButton;
        this.featureImgTitle = IfeatureImgTitle;
        this.aspectRatio = IaspectRatio;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var images;
    var title;
    var text;
    var featureHeader;
    var featureTitle;
    var featureText;
    var featureShape;
    var featureButton;
    var featureImgTitle;
    var aspectRatio;
    var posY;

    var p = createjs.extend(ServicosHome, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        images = this.images;
        title = this.title;
        text = this.text;
        featureHeader = this.featureHeader;
        featureTitle = this.featureTitle
        featureText = this.featureText
        featureShape = this.featureShape
        featureButton = this.featureButton
        featureImgTitle = this.featureImgTitle;
        aspectRatio  = this.aspectRatio;
        posY = this.posY;

        addElements();
        addAnimation();

    };

    function addElements(){

        images[0].regX = images[0].getBounds().width/2
        images[0].x = stage.canvas.width/2;
        images[0].y = posY;
        aspectRatio.resize(images[0],images[0].getBounds().width,images[0].getBounds().height,"fullWidth")
        instance.addChild(images[0]);

        var titleServices = new createjs.Text();
        titleServices.name = "titleServices";
        titleServices.font = "48px BwModelica-ExtraBold";
        titleServices.textBaseline = "alphabetic";
        titleServices.color = "#333333";
        titleServices.text = title
        titleServices.scaleX = ratio;
        titleServices.scaleY = ratio;
        titleServices.x = 100*ratio+80*ratio
        titleServices.y = posY+150*ratio;
        instance.addChild(titleServices);

        var textServices = new createjs.Text();
        textServices.name = "textServices";
        textServices.font = "20px BwModelica-Light";
        textServices.textBaseline = "alphabetic";
        textServices.color = "#333333";
        if(ratio==1)textServices.lineWidth = stage.canvas.width/2
        if(ratio==2)textServices.lineWidth = stage.canvas.width/2-300*ratio
        textServices.lineHeight = 30;
        textServices.text = text
        textServices.scaleX = ratio;
        textServices.scaleY = ratio;
        textServices.x = 100*ratio+80*ratio
        textServices.y = titleServices.y+titleServices.getBounds().height*ratio
        instance.addChild(textServices);

        var titleHeaderFeature = new createjs.Text();
        titleHeaderFeature.name = "titleHeaderFeature";
        titleHeaderFeature.font = "13px BwModelica-Bold";
        titleHeaderFeature.textBaseline = "alphabetic";
        titleHeaderFeature.color = "#8EC640";
        titleHeaderFeature.lineWidth = 130
        titleHeaderFeature.lineHeight = 20;
        titleHeaderFeature.text = featureHeader
        titleHeaderFeature.scaleX = ratio;
        titleHeaderFeature.scaleY = ratio;
        titleHeaderFeature.x = 100*ratio+80*ratio
        titleHeaderFeature.y = titleServices.y+titleServices.getBounds().height*ratio+titleHeaderFeature.getBounds().height*ratio+140*ratio
        instance.addChild(titleHeaderFeature);

        var titleTextFeature = new createjs.Text();
        titleTextFeature.name = "titleTextFeature";
        titleTextFeature.font = "36px BwModelica-ExtraBold";
        titleTextFeature.textBaseline = "alphabetic";
        titleTextFeature.color = "#333333";
        titleTextFeature.lineWidth = 130
        titleTextFeature.lineHeight = 40;
        titleTextFeature.text = featureTitle
        titleTextFeature.scaleX = ratio;
        titleTextFeature.scaleY = ratio;
        titleTextFeature.x = 100*ratio+80*ratio
        titleTextFeature.y = titleHeaderFeature.y+titleHeaderFeature.getBounds().height*ratio+60*ratio
        instance.addChild(titleTextFeature);

        var textFeature = new createjs.Text();
        textFeature.name = "textFeature";
        textFeature.font = "14px BwModelica-Regular";
        textFeature.textBaseline = "alphabetic";
        textFeature.color = "#333333";
        textFeature.lineWidth = 200
        textFeature.lineHeight = 30;
        textFeature.text = featureText
        textFeature.scaleX = ratio;
        textFeature.scaleY = ratio;
        textFeature.x = 100*ratio+80*ratio
        textFeature.y = titleTextFeature.y+titleTextFeature.getBounds().height*ratio+30*ratio
        instance.addChild(textFeature);

        var containerButtonFeature = new createjs.Container();
        containerButtonFeature.name = "containerButtonFeature";
        containerButtonFeature.x = 100*ratio+80*ratio
        containerButtonFeature.y = textFeature.y+textFeature.getBounds().height*ratio+10*ratio
        instance.addChild(containerButtonFeature);

        containerButtonFeature.addChild(featureShape);
        featureShape.x = -20*ratio

        var maskButton = new createjs.Shape();
        maskButton.name = "maskButton"
        maskButton.graphics.beginFill("#FFFFFF").drawRect(0, 0, 120*ratio, 28*ratio);
        //maskButton.y = -8*ratio
        maskButton.alpha = 0.01;
        containerButtonFeature.addChild(maskButton);

        featureShape.mask = maskButton;

        var buttonFeatureTitle = new createjs.Text();
        buttonFeatureTitle.name = "buttonFeatureTitle";
        buttonFeatureTitle.font = "11px BwModelica-Bold";
        buttonFeatureTitle.textBaseline = "alphabetic";
        buttonFeatureTitle.color = "#8EC640";
        buttonFeatureTitle.text = featureButton
        buttonFeatureTitle.scaleX = ratio;
        buttonFeatureTitle.scaleY = ratio;
        buttonFeatureTitle.x = 44*ratio+15*ratio-20*ratio
        buttonFeatureTitle.y = 10*ratio
        containerButtonFeature.addChild(buttonFeatureTitle);

        var hitButton = new createjs.Shape();
        hitButton.name = "hitButton"
        hitButton.graphics.beginFill("#ffffff").drawRect(0, 0, 120*ratio, 28*ratio);
        hitButton.y = -8*ratio
        hitButton.alpha = 0.01;
        containerButtonFeature.addChild(hitButton);

        images[1].x = 100*ratio+80*ratio+titleTextFeature.getBounds().width*ratio+120*ratio
        images[1].y = titleHeaderFeature.y-50*ratio
        aspectRatio.resize(images[1],images[1].getBounds().width,images[1].getBounds().height,"area2")
        instance.addChild(images[1]);

        var bgMask = new createjs.Shape();
        bgMask.name = "bgMask";
        bgMask.graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width-632*ratio), 560*ratio);
        bgMask.x = Math.floor(100*ratio+80*ratio+titleTextFeature.getBounds().width*ratio+120*ratio)
        bgMask.y = titleHeaderFeature.y-50*ratio
        bgMask.alpha =0.01
        images[1].mask = bgMask;
        instance.addChild(bgMask);

        var strokeBgMask = new createjs.Shape();
        strokeBgMask.name = "strokeBgMask";
        strokeBgMask.graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width-632*ratio), 4*ratio);
        strokeBgMask.x = Math.floor(100*ratio+80*ratio+titleTextFeature.getBounds().width*ratio+120*ratio)
        strokeBgMask.y = titleHeaderFeature.y-50*ratio
        instance.addChild(strokeBgMask);

        var containerFeatureServices = new createjs.Container();
        containerFeatureServices.x = Math.floor(stage.canvas.width-632*ratio+275*ratio)
        containerFeatureServices.y = titleHeaderFeature.y-50*ratio+560*ratio-30*ratio
        containerFeatureServices.name = "containerFeatureServices";
        instance.addChild(containerFeatureServices);

        var bgFeatureServices = new createjs.Shape();
        bgFeatureServices.name = "bgFeatureServices";
        bgFeatureServices.graphics.beginFill("#FFFFFF").drawRect(0, 0, 256*ratio, 60*ratio);
        containerFeatureServices.addChild(bgFeatureServices);

        var imgTitleFeatureServices = new createjs.Text();
        imgTitleFeatureServices.name = "imgTitleFeatureServices";
        imgTitleFeatureServices.font = "12px BwModelica-Regular";
        imgTitleFeatureServices.textBaseline = "alphabetic";
        imgTitleFeatureServices.color = "#333333";
        imgTitleFeatureServices.text = featureImgTitle;
        imgTitleFeatureServices.x = 20*ratio;
        imgTitleFeatureServices.y = imgTitleFeatureServices.getBounds().height*ratio+20*ratio
        imgTitleFeatureServices.scaleX = ratio;
        imgTitleFeatureServices.scaleY = ratio;
        containerFeatureServices.addChild(imgTitleFeatureServices);

    }

    function addAnimation(){

       TweenMax.from(images[0], 1, {delay:1.25,alpha:0,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("titleServices"), 1, {delay:1.5,alpha:0,y:instance.getChildByName("titleServices").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("textServices"), 1, {delay:1.75,alpha:0,y:instance.getChildByName("textServices").y+100*ratio,ease:Expo.easeInOut,onComplete:addHits})
    }

    function addHits(){

        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").cursor = "pointer";
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").type = "viewMore";
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").addEventListener("mouseover", handlerOver);
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").addEventListener("mouseout", handlerOut)
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").addEventListener("click", handlerClick);

    }

    function handlerOver(event){

        switch(event.target.type){
            case "viewMore":
                TweenMax.to(instance.getChildByName("containerButtonFeature").getChildByName("buttonFeatureTitle"), 0.6, {x:44*ratio+15*ratio,ease:Expo.easeInOut})
                TweenMax.to(featureShape, 0.5, {x:0,ease:Expo.easeInOut})
            break;
        }

    }

    function handlerOut(event){
        switch(event.target.type){
            case "viewMore":
                TweenMax.to(instance.getChildByName("containerButtonFeature").getChildByName("buttonFeatureTitle"), 0.5, {x:44*ratio+15*ratio-20*ratio,ease:Expo.easeInOut})
                TweenMax.to(featureShape, 0.6, {x:-20*ratio,ease:Expo.easeInOut})

            break;
        }
    }

    function handlerClick(event){
        switch(event.target.type){
            case "viewMore":
                
            break;
        }
    }

    p.kill = function() {

        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").removeEventListener("mouseover", handlerOver);
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").removeEventListener("mouseout", handlerOut)
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").removeEventListener("click", handlerClick);

        instance.removeChild(images[0]);
        instance.removeChild(images[1]);
        instance.removeChild(instance.getChildByName("titleServices"));
        instance.removeChild(instance.getChildByName("textServices"));
        instance.removeChild(instance.getChildByName("bgMask"));
        instance.removeChild(instance.getChildByName("strokeBgMask"));
        instance.removeChild(instance.getChildByName("titleHeaderFeature"));
        instance.removeChild(instance.getChildByName("titleTextFeature"));
        instance.removeChild(instance.getChildByName("textFeature"));
        instance.getChildByName("containerButtonFeature").removeChild(featureShape);
        instance.getChildByName("containerButtonFeature").removeChild(instance.getChildByName("containerButtonFeature").getChildByName("buttonFeatureTitle"))
        instance.getChildByName("containerButtonFeature").removeChild(instance.getChildByName("containerButtonFeature").getChildByName("hitButton"))
        instance.getChildByName("containerButtonFeature").removeChild(instance.getChildByName("containerButtonFeature").getChildByName("maskButton"))
        
        instance.removeChild(instance.getChildByName("containerButtonFeature"));

    } ; 

    p.getHeight = function() {
        return images[0].getBounds().height*ratio
    }

    p.resize = function() {

        images[0].regX = images[0].getBounds().width/2
        images[0].x = stage.canvas.width/2;
        images[0].y = posY;
        aspectRatio.resize(images[0],images[0].getBounds().width,images[0].getBounds().height,"fullWidth")

        if(ratio==1)instance.getChildByName("textServices").lineWidth = stage.canvas.width/2
        if(ratio==2)instance.getChildByName("textServices").lineWidth = stage.canvas.width/2-300*ratio

        images[1].x = 100*ratio+80*ratio+instance.getChildByName("titleTextFeature").getBounds().width*ratio+120*ratio
        aspectRatio.resize(images[1],images[1].getBounds().width,images[1].getBounds().height,"area2")

        instance.getChildByName("bgMask").graphics.clear()
        instance.getChildByName("bgMask").x = Math.floor(100*ratio+80*ratio+instance.getChildByName("titleTextFeature").getBounds().width*ratio+120*ratio)
        instance.getChildByName("bgMask").graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width-632*ratio), 560*ratio);

        instance.getChildByName("strokeBgMask").graphics.clear()
        instance.getChildByName("strokeBgMask").x = Math.floor(100*ratio+80*ratio+instance.getChildByName("titleTextFeature").getBounds().width*ratio+120*ratio)
        instance.getChildByName("strokeBgMask").graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width-632*ratio), 4*ratio);

        instance.getChildByName("containerFeatureServices").x = Math.floor(stage.canvas.width-632*ratio+275*ratio)
        instance.getChildByName("containerFeatureServices").y = instance.getChildByName("titleHeaderFeature").y-50*ratio+560*ratio-30*ratio

    } ; 


window.ServicosHome = createjs.promote(ServicosHome, "Container");
}());