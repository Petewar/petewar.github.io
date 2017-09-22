(function () {

    function Navigation(IdispatchInstance,Iratio,Isvg) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.svg = Isvg;
        this.setup();
    }
    
    var instance;
    var ratio;
    var svg;
    var dispatchInstance;

    var preloadData;
    var data;
    var nav=0;
    var isColapse = false;

    var p = createjs.extend(Navigation, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        svg = this.svg;
        dispatchInstance = this.dispatchInstance

        preloadDataJson("data/navigation.json")
    }

    function preloadDataJson(Ijson){

        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        data = event.result.navigation[0]
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;
        
        addElements();
        addAnimation();

        var customEvent = new createjs.Event("init");
        dispatchInstance.dispatchEvent(customEvent);

    }

    function addElements(){

        var bgQuickMenu = new createjs.Shape();
        bgQuickMenu.name = "bgQuickMenu";
        bgQuickMenu.visible = false;
        bgQuickMenu.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 142*ratio);
        instance.addChild(bgQuickMenu);

        var bgSideBar = new createjs.Shape();
        bgSideBar.name = "bgSideBar";
        bgSideBar.graphics.beginFill("#8EC640").drawRect(0, 0, 100*ratio, 732*ratio);
        instance.addChild(bgSideBar);

        var containerBurger = new createjs.Container();
        containerBurger.name = "containerBurger";
        containerBurger.x = 50*ratio-28/2*ratio
        containerBurger.y = 62*ratio
        instance.addChild(containerBurger);

        for(var i=0;i<3;i++){
            var shapeBurger = new createjs.Shape();
            shapeBurger.name = "shapeBurger"+i;
            shapeBurger.y = (9*ratio)*i
            shapeBurger.graphics.beginFill("#ffffff").drawRect(0, 0, 28*ratio, 3*ratio);
            containerBurger.addChild(shapeBurger);
        }

        var hitBurger = new createjs.Shape();
        hitBurger.mouseChildren = false
        hitBurger.name = "hitBurger";
        hitBurger.alpha = 0.01
        hitBurger.graphics.beginFill("#8EC640").drawRect(0, 0, 28*ratio, 21*ratio);
        containerBurger.addChild(hitBurger);

        var bgCalendar = new createjs.Shape();
        bgCalendar.name = "bgCalendar";
        bgCalendar.graphics.beginFill("#FFFFFF").drawRect(0, 0, 100*ratio, 122*ratio);
        bgCalendar.y = 732*ratio-122*ratio;
        instance.addChild(bgCalendar);

        var calendarIcon = svg.createSvg(data.shapeCalendar,"#333333");
        calendarIcon.name="calendarIcon";
        calendarIcon.x = Math.floor(50*ratio-45/2*ratio);
        calendarIcon.y = Math.floor(732*ratio-122*ratio+30*ratio);
        instance.addChild(calendarIcon);

        var titleCalendar = new createjs.Text();
        titleCalendar.name = "titleCalendar";
        titleCalendar.font = "9px BwModelica-ExtraBold";
        titleCalendar.textBaseline = "alphabetic";
        titleCalendar.color = "#333333";
        titleCalendar.text = data.titleCalendar;
        if(ratio==1)titleCalendar.lineWidth = 62*ratio
        if(ratio==2)titleCalendar.lineWidth = 42*ratio
        titleCalendar.scaleX = ratio;
        titleCalendar.scaleY = ratio;
        titleCalendar.x = 50*ratio-titleCalendar.getBounds().width/2*ratio
        titleCalendar.y = 732*ratio-122*ratio+30*ratio+36*ratio+7*ratio+10*ratio;
        instance.addChild(titleCalendar);

        var hitCalendar = new createjs.Shape();
        hitCalendar.name = "hitCalendar";
        hitCalendar.alpha = 0.01
        hitCalendar.graphics.beginFill("#FFFFFF").drawRect(0, 0, 100*ratio, 122*ratio);
        hitCalendar.y = 732*ratio-122*ratio;
        instance.addChild(hitCalendar);

        var containerQuickMenu = new createjs.Container();
        containerQuickMenu.name = "containerQuickMenu"
        containerQuickMenu.x = stage.canvas.width/2+100*ratio+70*ratio;
        containerQuickMenu.y = 77*ratio;
        instance.addChild(containerQuickMenu);

        var containerLogo = new createjs.Container();
        containerLogo.name = "containerLogo";
        containerLogo.x = 177*ratio;
        containerLogo.y = 32*ratio;
        instance.addChild(containerLogo);

        var logoLeft = svg.createSvg(data.shapeLogoLeft,"#808285");
        var logoRight = svg.createSvg(data.shapeLogoRight,"#8ec640");

        logoRight.x = 45*ratio
        logoRight.y = 2*ratio
        containerLogo.addChild(logoLeft);
        containerLogo.addChild(logoRight);

        for (var i=0;i<data.menu.length;i++){
            
            var titleQuickMenu = new createjs.Text();
            titleQuickMenu.name = "titleQuickMenu"+i;
            titleQuickMenu.font = "14px BwModelica-Bold";
            titleQuickMenu.textBaseline = "alphabetic";
            titleQuickMenu.color = "#333333";
            titleQuickMenu.text = data.menu[i];
            titleQuickMenu.scaleX = ratio;
            titleQuickMenu.scaleY = ratio;
            titleQuickMenu.x = (titleQuickMenu.getBounds().width*ratio+50*ratio)*i;
            containerQuickMenu.addChild(titleQuickMenu);
                
            var strokeQuickMenu = new createjs.Shape();
            strokeQuickMenu.name = "strokeQuickMenu"+i;
            strokeQuickMenu.graphics.beginFill("#8EC640").drawRect(0, 0, titleQuickMenu.getBounds().width*ratio, 4*ratio);
            strokeQuickMenu.x = Math.floor((titleQuickMenu.getBounds().width*ratio+50*ratio)*i);
            strokeQuickMenu.y = Math.floor(titleQuickMenu.getBounds().height/2*ratio-3*ratio);
            strokeQuickMenu.scaleX = 0;
            containerQuickMenu.addChild(strokeQuickMenu);

            var hitQuickMenu = new createjs.Shape();
            hitQuickMenu.name = "hitQuickMenu"+i;
            hitQuickMenu.instance = i+1;
            hitQuickMenu.graphics.beginFill("#FFFFFF").drawRect(0, 0, titleQuickMenu.getBounds().width*ratio+25*ratio, titleQuickMenu.getBounds().height*ratio+25*ratio);
            hitQuickMenu.alpha = 0.01;
            hitQuickMenu.x = ((titleQuickMenu.getBounds().width*ratio+50*ratio)*i)-12*ratio;
            hitQuickMenu.y = -titleQuickMenu.getBounds().height*ratio-10*ratio;
            containerQuickMenu.addChild(hitQuickMenu);

        }

    }

    function addAnimation(){

        TweenMax.from(instance.getChildByName("bgSideBar"), 1, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("bgCalendar"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("calendarIcon"), 1, {delay:1,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("titleCalendar"), 1, {delay:1.25,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerBurger"), 1, {delay:0.5,alpha:0,ease:Expo.easeInOut,onComplete:addHits()});

    }

    function addHits(){
        
        instance.getChildByName("containerBurger").getChildByName("hitBurger").cursor = "pointer";
        instance.getChildByName("containerBurger").getChildByName("hitBurger").type = "menu";
        instance.getChildByName("containerBurger").getChildByName("hitBurger").addEventListener("mouseover", handlerOver);
        instance.getChildByName("containerBurger").getChildByName("hitBurger").addEventListener("mouseout", handlerOut)
        instance.getChildByName("containerBurger").getChildByName("hitBurger").addEventListener("click", handlerClick);
        
        instance.getChildByName("hitCalendar").cursor = "pointer";
        instance.getChildByName("hitCalendar").type = "calendar";
        instance.getChildByName("hitCalendar").addEventListener("mouseover", handlerOver);
        instance.getChildByName("hitCalendar").addEventListener("mouseout", handlerOut)
        instance.getChildByName("hitCalendar").addEventListener("click", handlerClick);

        for (var i=0;i<data.menu.length;i++){
            instance.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+i).cursor = "pointer";
            instance.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+i).type = "hitQuickMenu";
            instance.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+i).name = "hitQuickMenu"+i;
            instance.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+i).addEventListener("mouseover", handlerOver);
            instance.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+i).addEventListener("mouseout", handlerOut)
            instance.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+i).addEventListener("click", handlerClick);   
        }

    }

    function handlerOver(event){

        switch(event.target.type){
            case "menu":
                
            break;

            case "hitQuickMenu":
                
            break;

            case "calendar":
            
            break;

           
        }

    }

    function handlerOut(event){

        switch(event.target.type){
            case "menu":
            
            break;

            case "hitQuickMenu":
                
            break;

            case "calendar":
            
            break;

           
        }

    }

    function handlerClick(event){

        switch(event.target.type){
            case "menu":
                SWFAddress.setValue("/menu");
            break;

            case "calendar":
                SWFAddress.setValue("/agenda");
            break;
            case "hitQuickMenu":
                 switch(event.target.name){
                    case "hitQuickMenu"+0:
                        SWFAddress.setValue("/home");
                    break;
                    case "hitQuickMenu"+1:
                        SWFAddress.setValue("/servicos");
                    break;
                    case "hitQuickMenu"+2:
                        SWFAddress.setValue("/contatos");
                    break;
                }
            break;
        }
    }

     p.setValue = function(Inav) {
        instance.getChildByName("containerQuickMenu").getChildByName("strokeQuickMenu"+nav).scaleX = 0;
        nav = Inav;
        TweenMax.to(instance.getChildByName("containerQuickMenu").getChildByName("strokeQuickMenu"+nav), 1, {scaleX:1,ease:Expo.easeInOut})
    }

    p.colapse = function() {
        
        if(isColapse==false){
            console.log("collapse")
            isColapse = true
            TweenMax.to(instance.getChildByName("bgSideBar"), 0.5, {x:-100*ratio,ease:Expo.easeInOut})
            TweenMax.to(instance.getChildByName("bgCalendar"), 0.5, {x:-100*ratio,ease:Expo.easeInOut});
            TweenMax.to(instance.getChildByName("calendarIcon"), 0.25, {alpha:0,ease:Expo.easeInOut});
            TweenMax.to(instance.getChildByName("titleCalendar"), 0.25, {alpha:0,ease:Expo.easeInOut});

            for(var i=0;i<3;i++){
                instance.getChildByName("containerBurger").getChildByName("shapeBurger"+i).graphics.clear();
                instance.getChildByName("containerBurger").getChildByName("shapeBurger"+i).graphics.beginFill("#86C430").drawRect(0, 0, 28*ratio, 3*ratio);
            }
        }

        instance.getChildByName("hitCalendar").visible = false;
    }

    p.expand = function() {
        
        if(isColapse==true){
            isColapse = false

            TweenMax.to(instance.getChildByName("bgSideBar"), 0.5, {x:0,ease:Expo.easeInOut})
            TweenMax.to(instance.getChildByName("bgCalendar"), 0.5, {x:0,ease:Expo.easeInOut});
            TweenMax.to(instance.getChildByName("calendarIcon"), 0.75, {alpha:1,ease:Expo.easeInOut});
            TweenMax.to(instance.getChildByName("titleCalendar"), 0.75, {alpha:1,ease:Expo.easeInOut});

            for(var i=0;i<3;i++){
                instance.getChildByName("containerBurger").getChildByName("shapeBurger"+i).graphics.clear();
                instance.getChildByName("containerBurger").getChildByName("shapeBurger"+i).graphics.beginFill("#ffffff").drawRect(0, 0, 28*ratio, 3*ratio);
            }
        }

        instance.getChildByName("hitCalendar").visible = true;
    }

    p.hide = function() {
        instance.getChildByName("containerQuickMenu").visible = false;
        instance.getChildByName("bgQuickMenu").visible = false;
        instance.getChildByName("containerLogo").visible = false;

    }

    p.show = function() {
        instance.getChildByName("containerQuickMenu").visible = true;
        instance.getChildByName("bgQuickMenu").visible = true;
        instance.getChildByName("containerLogo").visible = true;
        TweenMax.from(instance.getChildByName("containerQuickMenu"), 1, {alpha:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("bgQuickMenu"), 1, {delay:0.5,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("containerLogo"), 1, {delay:0.5,alpha:0,ease:Expo.easeInOut});

    }

    p.animate = function() {

        TweenMax.from(instance.getChildByName("bgSideBar"), 1, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("bgCalendar"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("calendarIcon"), 1, {delay:1,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("titleCalendar"), 1, {delay:1.25,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerBurger"), 1, {delay:0.5,alpha:0,ease:Expo.easeInOut});
        
    }

    p.resize = function() {

        instance.getChildByName("containerBurger").x = 50*ratio-28/2*ratio
        instance.getChildByName("containerBurger").y = 66*ratio

        instance.getChildByName("containerQuickMenu").x = stage.canvas.width/2+100*ratio+70*ratio;
        instance.getChildByName("containerQuickMenu").y = 77*ratio;

        instance.getChildByName("bgQuickMenu").graphics.clear();
        instance.getChildByName("bgQuickMenu").graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 142*ratio);

    } ; 


window.Navigation = createjs.promote(Navigation, "Container");
}());