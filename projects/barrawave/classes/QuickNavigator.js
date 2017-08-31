(function () {

    function QuickNavigator(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
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
    var lang;
    var containerMenu;
    var totalWidth;
    var data
    var nav;

    var p = createjs.extend(QuickNavigator, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        lang = this.lang;

        containerMenu = new createjs.Container();
        instance.addChild(containerMenu)

    };

    p.addElements = function(Idata) {

        data = Idata.quickNavigator;

        for (var i=0;i<data[lang].length;i++){
            
            var shapeAlpha = new createjs.Shape();
            shapeAlpha.instance = i+2
            shapeAlpha.name = "shapeAlpha"+i;
            shapeAlpha.graphics.beginFill("#FFFFFF").drawRect(0, 0, 200*ratio, 58*ratio);
            shapeAlpha.alpha = 0.3;
            shapeAlpha.x = (201*ratio)*i
            containerMenu.addChild(shapeAlpha)

            var shapeWhite = new createjs.Shape();
            shapeWhite.name = "shapeWhite"+i
            shapeWhite.graphics.beginFill("#FFFFFF").drawRect(0, 0, 200*ratio, 58*ratio);
            shapeWhite.x = (201*ratio)*i
            shapeWhite.scaleX = 0;
            containerMenu.addChild(shapeWhite)

            var titleTxt = new createjs.Text();
            titleTxt.name = "titleTxt"+i;
            titleTxt.font = "12px OpenSans-Semibold";
            titleTxt.textBaseline = "alphabetic";
            titleTxt.color = "#FFFFFF";
            titleTxt.text = data[lang][i];
            titleTxt.scaleX = ratio;
            titleTxt.scaleY = ratio;
            titleTxt.x = (200*ratio)*i+100*ratio-titleTxt.getBounds().width/2*ratio
            titleTxt.y = 58/2*ratio+titleTxt.getBounds().height/2*ratio-1*ratio
            containerMenu.addChild(titleTxt);

            var titleTxtColor = new createjs.Text();
            titleTxtColor.name = "titleTxtColor"+i;
            titleTxtColor.font = "12px OpenSans-Semibold";
            titleTxtColor.textBaseline = "alphabetic";
            titleTxtColor.color = "#4b7ea3";
            titleTxtColor.text = data[lang][i];
            titleTxtColor.scaleX = ratio;
            titleTxtColor.scaleY = ratio;
            titleTxtColor.alpah = 0;
            titleTxtColor.x = (200*ratio)*i+100*ratio-titleTxt.getBounds().width/2*ratio
            titleTxtColor.y = 58/2*ratio+titleTxt.getBounds().height/2*ratio-1*ratio
            containerMenu.addChild(titleTxtColor);


        }

        totalWidth = shapeAlpha.x+200*ratio;
        containerMenu.x = Math.floor(stage.canvas.width/2-totalWidth/2)

        containerMenu.visible = false;
        addHits();

    }

    p.addAnimation = function(Inav){

        containerMenu.visible = true;
        nav = Inav;

        for (var i=0;i<data[lang].length;i++){
            TweenMax.from(containerMenu.getChildByName("shapeAlpha"+i), 0.7*(i+1), {scaleX:0,ease:Expo.easeInOut})
            TweenMax.from(containerMenu.getChildByName("titleTxt"+i), 0.5*(i+1), {delay:0.7,alpha:0,ease:Expo.easeInOut})

            if(containerMenu.getChildByName("shapeAlpha"+i).instanceNav==nav){
                containerMenu.getChildByName("titleTxtColor"+i).alpha = 0;
                containerMenu.getChildByName("shapeWhite"+i).scaleX = 0;
                TweenMax.to(containerMenu.getChildByName("shapeWhite"+i), 0.7*(i+1), {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(containerMenu.getChildByName("titleTxtColor"+i), 0.5*(i+1), {delay:0.7,alpha:1,ease:Expo.easeInOut})
            }else{
                containerMenu.getChildByName("titleTxtColor"+i).alpha = 0;
                containerMenu.getChildByName("shapeWhite"+i).scaleX = 0;
            }
        }
        
    }

    p.refresh = function(Inav){

        containerMenu.visible = true;
        nav = Inav;

        for (var i=0;i<data[lang].length;i++){
            if(containerMenu.getChildByName("shapeAlpha"+i).instanceNav==nav){
                containerMenu.getChildByName("titleTxtColor"+i).alpha = 1;
                containerMenu.getChildByName("shapeWhite"+i).scaleX = 1;
            }else{
                containerMenu.getChildByName("titleTxtColor"+i).alpha = 0;
                containerMenu.getChildByName("shapeWhite"+i).scaleX = 0;
            }
        }

    }


    p.hide = function(){
        containerMenu.visible = false;
    }

    function addHits(){

        for (var i=0;i<data[lang].length;i++){
            
            containerMenu.getChildByName("shapeAlpha"+i).cursor = "pointer"
            containerMenu.getChildByName("shapeAlpha"+i).instance = i
            containerMenu.getChildByName("shapeAlpha"+i).instanceNav = 2+i
            containerMenu.getChildByName("shapeAlpha"+i).addEventListener("mouseover", handlerOver);
            containerMenu.getChildByName("shapeAlpha"+i).addEventListener("mouseout", handlerOut);
            containerMenu.getChildByName("shapeAlpha"+i).addEventListener("click", handlerClick);
        
        }

    }

    function handlerOver(event){

        if(event.target.instanceNav!=nav){
            TweenMax.to(containerMenu.getChildByName("shapeWhite"+event.target.instance), 0.5, {scaleX:1,ease:Expo.easeInOut})
            TweenMax.to(containerMenu.getChildByName("titleTxtColor"+event.target.instance), 0.7, {alpha:1,ease:Expo.easeInOut})
        }
    }

    function handlerOut(event){
        if(event.target.instanceNav!=nav){
            TweenMax.to(containerMenu.getChildByName("shapeWhite"+event.target.instance), 0.7, {scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(containerMenu.getChildByName("titleTxtColor"+event.target.instance), 0.5, {alpha:0,ease:Expo.easeInOut})
        }
    }

    function handlerClick(event){
        
        if(event.target.instanceNav!=nav){

            var customEvent = new createjs.Event("removeView");
            customEvent.nav = event.target.instanceNav;
            dispatchInstance.dispatchEvent(customEvent);

        }
    }

    p.resize = function() {

        containerMenu.x = Math.floor(stage.canvas.width/2-totalWidth/2);

    } ; 


window.QuickNavigator = createjs.promote(QuickNavigator, "Container");
}());