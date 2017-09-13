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
        textServices.lineWidth = stage.canvas.width/2
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
        titleHeaderFeature.lineWidth = 130*ratio
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
        titleTextFeature.lineWidth = 256*ratio
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
        textFeature.lineWidth = 200*ratio
        textFeature.lineHeight = 30;
        textFeature.text = featureText
        textFeature.scaleX = ratio;
        textFeature.scaleY = ratio;
        textFeature.x = 100*ratio+80*ratio
        textFeature.y = titleTextFeature.y+titleTextFeature.getBounds().height*ratio+30*ratio
        instance.addChild(textFeature);

        images[1].x = 100*ratio+80*ratio+titleTextFeature.getBounds().width*ratio+120*ratio
        images[1].y = titleHeaderFeature.y-50*ratio
        aspectRatio.resize(images[1],images[1].getBounds().width,images[1].getBounds().height,"area2")
        instance.addChild(images[1]);

        var bgMask = new createjs.Shape();
        bgMask.name = "bgMask";
        bgMask.graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width-100*ratio-80*ratio-titleTextFeature.getBounds().width*ratio-120*ratio-100*ratio), 560*ratio);
        bgMask.x = Math.floor(100*ratio+80*ratio+titleTextFeature.getBounds().width*ratio+120*ratio)
        bgMask.y = titleHeaderFeature.y-50*ratio
        bgMask.alpha =0.01
        images[1].mask = bgMask;
        instance.addChild(bgMask);

        var strokeBgMask = new createjs.Shape();
        strokeBgMask.name = "strokeBgMask";
        strokeBgMask.graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width-100*ratio-80*ratio-titleTextFeature.getBounds().width*ratio-120*ratio-100*ratio), 4*ratio);
        strokeBgMask.x = Math.floor(100*ratio+80*ratio+titleTextFeature.getBounds().width*ratio+120*ratio)
        strokeBgMask.y = titleHeaderFeature.y-50*ratio
        instance.addChild(strokeBgMask);

    }

    function addAnimation(){

       TweenMax.from(images[0], 1, {delay:1.25,alpha:0,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("titleServices"), 1, {delay:1.5,alpha:0,y:instance.getChildByName("titleServices").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("textServices"), 1, {delay:1.75,alpha:0,y:instance.getChildByName("textServices").y+100*ratio,ease:Expo.easeInOut})
    }

    function addHits(){

        
    }

    function handlerOver(event){


    }

    function handlerOut(event){

    }

    function handlerClick(event){

    }

    p.kill = function() {

        instance.removeChild(images[0]);
        instance.removeChild(images[1]);
        instance.removeChild(instance.getChildByName("titleServices"));
        instance.removeChild(instance.getChildByName("textServices"));
        instance.removeChild(instance.getChildByName("bgMask"));
        instance.removeChild(instance.getChildByName("strokeBgMask"));
        instance.removeChild(instance.getChildByName("titleHeaderFeature"));
        instance.removeChild(instance.getChildByName("textFeature"));

    } ; 

    p.getHeight = function() {
        return images[0].getBounds().height*ratio
    }

    p.resize = function() {

        images[0].regX = images[0].getBounds().width/2
        images[0].x = stage.canvas.width/2;
        images[0].y = posY;
        aspectRatio.resize(images[0],images[0].getBounds().width,images[0].getBounds().height,"fullWidth")

        instance.getChildByName("textServices").lineWidth = stage.canvas.width/2

        images[1].x = 100*ratio+80*ratio+instance.getChildByName("titleTextFeature").getBounds().width*ratio+120*ratio
        aspectRatio.resize(images[1],images[1].getBounds().width,images[1].getBounds().height,"area2")

        instance.getChildByName("bgMask").graphics.clear()
        instance.getChildByName("bgMask").x = Math.floor(100*ratio+80*ratio+instance.getChildByName("titleTextFeature").getBounds().width*ratio+120*ratio)
        instance.getChildByName("bgMask").graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width-100*ratio-80*ratio-instance.getChildByName("titleTextFeature").getBounds().width*ratio-120*ratio-100*ratio), 560*ratio);

        instance.getChildByName("strokeBgMask").graphics.clear()
        instance.getChildByName("strokeBgMask").x = Math.floor(100*ratio+80*ratio+instance.getChildByName("titleTextFeature").getBounds().width*ratio+120*ratio)
        instance.getChildByName("strokeBgMask").graphics.beginFill("#8EC640").drawRect(0, 0, Math.floor(stage.canvas.width-100*ratio-80*ratio-instance.getChildByName("titleTextFeature").getBounds().width*ratio-120*ratio-100*ratio), 4*ratio);



    } ; 


window.ServicosHome = createjs.promote(ServicosHome, "Container");
}());