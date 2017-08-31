(function () {

    function Tooltip(IdispatchInstance,Iratio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.lang = Ilang
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var data;
    var lang;
    var preloadData;

    //elements
    var hotSpot;
    var bgTip;
    var strokeTip;
    var bitmap;
    var maskBitmap;
    var title;
    var containerText;
    var containerTip;
    var buttonMore;
    var buttonMoreBlack;
    
    var p = createjs.extend(Tooltip, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        lang = this.lang;

    };

    p.addElements = function(Ihotspot,Idata) {

        data = Idata;
        
        hotSpot = Ihotspot
        hotSpot.x = Ihotspot.x
        hotSpot.y = Ihotspot.y
        instance.addChild(hotSpot);
        
        preloadDataJson(data[2])

    }

    function preloadDataJson(Ijson){

        //Load Json File
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        console.log("Loader Data: Tootip")

        //remove preloadData
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        strokeTip = new createjs.Shape();
        strokeTip.graphics.beginFill("#FFFFFF").drawRect(0, 0, 2*ratio, 70*ratio);
        strokeTip.x = hotSpot.x-2/2*ratio;
        if(data[3]=="down")strokeTip.y = hotSpot.y
        else strokeTip.y = hotSpot.y-70*ratio

        containerTip = new createjs.Container();
        containerTip.regX = 520/2*ratio
        containerTip.x = hotSpot.x
        if(data[3]=="down")containerTip.y = hotSpot.y+70*ratio;
        else containerTip.y = hotSpot.y-70*ratio-200*ratio;

        bgTip = new createjs.Shape();
        bgTip.graphics.beginFill("#FFFFFF").drawRect(0, 0, 520*ratio, 200*ratio);

        maskBitmap = new createjs.Shape();
        maskBitmap.graphics.beginFill("#b3153e").drawRect(0, 0, 200*ratio, 200*ratio);
        maskBitmap.regX = 200*ratio
        maskBitmap.x = bgTip.x+200*ratio

        var image = new Image();
        image.src = event.result.content[0].img;
        bitmap = new createjs.Bitmap(image);

        bitmap.x = bgTip.x+2*ratio;
        bitmap.y = bgTip.y+2*ratio

        bitmap.scaleX = ratio
        bitmap.scaleY = ratio

        bitmap.mask = maskBitmap;

        title = new createjs.Text();
        title.font = "18px PathwayGothicOne-Regular";
        title.textBaseline = "alphabetic";
        title.color = "#131313";
        title.text = event.result.content[0].title[lang];
        title.scaleX = ratio;
        title.scaleY = ratio;
        title.x = bgTip.x+220*ratio
        title.y = bgTip.y+title.getBounds().height*ratio+20*ratio

        var lengthProps = event.result.content[0].props[lang].length
        
        containerText = new createjs.Container();
        containerText.x = bgTip.x+220*ratio
        containerText.y = title.y+title.getBounds().height*ratio+20*ratio

        for (var i=0;i<lengthProps;i++){
            var propText = new createjs.Text();
            propText.font = "12px OpenSans-Regular";
            propText.textBaseline = "alphabetic";
            propText.color = "#131313";
            propText.text = event.result.content[0].props[lang][i];
            propText.alpha = 0.5;
            propText.scaleX = ratio;
            propText.scaleY = ratio;
            propText.y = (propText.getBounds().height*ratio+15*ratio)*i
            containerText.addChild(propText);
        }

        buttonMore = new createjs.Shape();
        buttonMore.graphics.beginFill("#4b7ea3").drawRect(0, 0, 282*ratio, 40*ratio);
        buttonMore.x =  bgTip.x+220*ratio
        buttonMore.y = 200*ratio-60*ratio

        buttonMoreBlack = new createjs.Shape();
        buttonMoreBlack.graphics.beginFill("#131313").drawRect(0, 0, 282*ratio, 40*ratio);
        buttonMoreBlack.scaleX = 0;
        buttonMoreBlack.x =  bgTip.x+220*ratio
        buttonMoreBlack.y = 200*ratio-60*ratio

        buttontext = new createjs.Text();
        buttontext.font = "11px OpenSans-Semibold";
        buttontext.textBaseline = "alphabetic";
        buttontext.color = "#ffffff";
        buttontext.text = event.result.content[0].buttonTitle[lang]
        buttontext.scaleX = ratio;
        buttontext.scaleY = ratio;
        buttontext.x = buttonMore.x+282/2*ratio-buttontext.getBounds().width/2*ratio
        buttontext.y = buttonMore.y+40/2*ratio+buttontext.getBounds().height/2*ratio-1*ratio

        instance.addChild(strokeTip);
        containerTip.addChild(bgTip)
        containerTip.addChild(bitmap);
        containerTip.addChild(title);
        containerTip.addChild(containerText);
        //containerTip.addChild(buttonMore);
        //containerTip.addChild(buttonMoreBlack);
        //containerTip.addChild(buttontext);
        instance.addChild(containerTip)

        addAnimation();
        addHits();
    }

    function addHits(){
        buttonMore.cursor = "pointer"
        buttonMore.addEventListener("mouseover", handlerOver);
        buttonMore.addEventListener("mouseout", handlerOut);
        buttonMore.addEventListener("click", handlerClick);
    }

    function handlerOver(event){
        TweenMax.to(buttonMoreBlack, 0.7, {scaleX:1,ease:Expo.easeInOut})
    }

    function handlerOut(event){
        TweenMax.to(buttonMoreBlack, 0.7, {scaleX:0,ease:Expo.easeInOut})   
    }

    function handlerClick(event){

        
    }

    function addAnimation(){

        TweenMax.from(strokeTip, 0.7, {scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(bgTip, 0.5, {delay:0.3,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(maskBitmap, 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(title, 1, {delay:0.5,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerText, 1, {delay:0.7,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(buttonMore, 0.5, {delay:0.7,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(buttontext, 0.5, {delay:0.7,alpha:0,ease:Expo.easeInOut})
        //TweenMax.from(hotSpot, 0.5, {alpha:0,ease:Expo.easeInOut})

    }

    function removeAnimation(){

        TweenMax.to(buttonMore, 0.5, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(buttonMoreBlack, 0.5, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(buttontext, 0.5, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(containerText, 0.5, {delay:0.3,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(title, 0.5, {delay:0.4,alpha:0,ease:Expo.easeInOut})
        TweenMax.to(bgTip, 0.7, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(maskBitmap, 0.7, {delay:0.3,scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(strokeTip, 0.5, {delay:0.5,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(hotSpot, 0.5, {delay:0.6,alpha:0,ease:Expo.easeInOut,onComplete:removeElements})

    }

    p.kill = function() {

        buttonMore.removeEventListener("mouseover", handlerOver);
        buttonMore.removeEventListener("mouseout", handlerOut);
        buttonMore.removeEventListener("click", handlerClick);

        removeAnimation();

    } ;

    function removeElements(){

        instance.removeChild(hotSpot);
        instance.removeChild(strokeTip);
        containerTip.removeChild(bgTip)
        containerTip.removeChild(bitmap);
        containerTip.removeChild(title);
        containerTip.removeChild(containerText);
        containerTip.removeChild(buttonMore);
        containerTip.removeChild(buttonMoreBlack);
        containerTip.removeChild(buttontext);
        instance.removeChild(containerTip)


    }

    p.resize = function() {

    } ; 

window.Tooltip = createjs.promote(Tooltip, "Container");
}());