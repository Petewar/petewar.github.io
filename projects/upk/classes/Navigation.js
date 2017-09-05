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

    var p = createjs.extend(Navigation, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        svg = this.svg;
        dispatchInstance = this.dispatchInstance

        if(data==null){
            preloadDataJson("data/navigation.json")
        }else{
            addElements();
            addAnimation();
        }

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

        var bgSideBar = new createjs.Shape();
        bgSideBar.name = "bgSideBar";
        bgSideBar.graphics.beginFill("#8EC640").drawRect(0, 0, 100*ratio, stage.canvas.height);
        instance.addChild(bgSideBar);

        var containerBurger = new createjs.Container();
        containerBurger.name = "containerBurger";
        containerBurger.x = 50*ratio-28/2*ratio
        containerBurger.y = 66*ratio
        instance.addChild(containerBurger);

        for(var i=0;i<3;i++){
            var shapeBurger = new createjs.Shape();
            shapeBurger.name = "shapeBurger"+i;
            shapeBurger.y = (9*ratio)*i
            shapeBurger.graphics.beginFill("#ffffff").drawRect(0, 0, 28*ratio, 3*ratio);
            containerBurger.addChild(shapeBurger);
        }

        var hitBurger = new createjs.Shape();
        hitBurger.name = "hitBurger";
        hitBurger.alpha = 0.01
        hitBurger.graphics.beginFill("#8EC640").drawRect(0, 0, 28*ratio, 21*ratio);
        containerBurger.addChild(hitBurger);

        var bgCalendar = new createjs.Shape();
        bgCalendar.name = "bgCalendar";
        bgCalendar.graphics.beginFill("#FFFFFF").drawRect(0, 0, 100*ratio, 122*ratio);
        bgCalendar.y = stage.canvas.height-122*ratio;
        instance.addChild(bgCalendar);

        var calendarIcon = svg.createSvg(data.shapeCalendar,"#333333");
        calendarIcon.name="calendarIcon";
        calendarIcon.x = Math.floor(50*ratio-45/2*ratio);
        calendarIcon.y = Math.floor(stage.canvas.height-122*ratio+30*ratio);
        instance.addChild(calendarIcon);

        var titleCalendar = new createjs.Text();
        titleCalendar.name = "titleCalendar";
        titleCalendar.font = "9px BwModelica-ExtraBold";
        titleCalendar.textBaseline = "alphabetic";
        titleCalendar.color = "#333333";
        titleCalendar.text = data.titleCalendar;
        titleCalendar.lineWidth = 62*ratio
        titleCalendar.scaleX = ratio;
        titleCalendar.scaleY = ratio;
        titleCalendar.x = 50*ratio-titleCalendar.getBounds().width/2*ratio
        titleCalendar.y = stage.canvas.height-122*ratio+30*ratio+36*ratio+7*ratio+10*ratio;
        instance.addChild(titleCalendar);

        var hitCalendar = new createjs.Shape();
        hitCalendar.name = "hitCalendar";
        hitCalendar.alpha = 0.01
        hitCalendar.graphics.beginFill("#FFFFFF").drawRect(0, 0, 100*ratio, 122*ratio);
        hitCalendar.y = stage.canvas.height-122*ratio;
        instance.addChild(hitCalendar);

        var containerQuickMenu = new createjs.Container();
        containerQuickMenu.name = "containerQuickMenu"
        containerQuickMenu.x = stage.canvas.width/2+100*ratio;
        containerQuickMenu.y = 60*ratio;
        instance.addChild(containerQuickMenu);

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
            strokeQuickMenu.x = (titleQuickMenu.getBounds().width*ratio+50*ratio)*i;
            strokeQuickMenu.y = titleQuickMenu.getBounds().height/2*ratio-3*ratio;
            strokeQuickMenu.scaleX = 0;
            containerQuickMenu.addChild(strokeQuickMenu);

            var hitQuickMenu = new createjs.Shape();
            hitQuickMenu.name = "hitQuickMenu"+i;
            hitQuickMenu.instance = i+1;
            hitQuickMenu.graphics.beginFill("#ffffff").drawRect(0, 0, titleQuickMenu.getBounds().width*ratio+25*ratio, titleQuickMenu.getBounds().height*ratio+25*ratio);
            hitQuickMenu.alpha = 0.01;
            hitQuickMenu.x = ((titleQuickMenu.getBounds().width*ratio+50*ratio)*i)-12*ratio;
            hitQuickMenu.y = -titleQuickMenu.getBounds().height*ratio
            containerQuickMenu.addChild(hitQuickMenu);

        }

    }

    function addAnimation(){

        TweenMax.from(instance.getChildByName("bgSideBar"), 1, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("bgCalendar"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("calendarIcon"), 1, {delay:1,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("titleCalendar"), 1, {delay:1.25,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerBurger"), 1, {delay:0.5,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerQuickMenu"), 1, {delay:0.5,alpha:0,ease:Expo.easeInOut,onComplete:addHits()});

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
                SWFAddress.setValue("/calendar");
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

    p.hide = function() {
        instance.getChildByName("containerQuickMenu").visible = false;
    }

    p.show = function() {
        instance.getChildByName("containerQuickMenu").visible = true;
        TweenMax.from(instance.getChildByName("containerQuickMenu"), 1, {alpha:0,ease:Expo.easeInOut})
    }

    p.animate = function() {

        TweenMax.from(instance.getChildByName("bgSideBar"), 1, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("bgCalendar"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("calendarIcon"), 1, {delay:1,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("titleCalendar"), 1, {delay:1.25,alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerBurger"), 1, {delay:0.5,alpha:0,ease:Expo.easeInOut});
        
    }

    p.resize = function() {

        instance.getChildByName("bgSideBar").graphics.clear();
        instance.getChildByName("bgSideBar").graphics.beginFill("#8EC640").drawRect(0, 0, 100*ratio, stage.canvas.height);

        instance.getChildByName("bgCalendar").y = stage.canvas.height-122*ratio;
        instance.getChildByName("hitCalendar").y = stage.canvas.height-122*ratio;

        instance.getChildByName("calendarIcon").x = Math.floor(50*ratio-45/2*ratio);
        instance.getChildByName("calendarIcon").y = Math.floor(stage.canvas.height-122*ratio+30*ratio);

        instance.getChildByName("titleCalendar").x = 50*ratio-instance.getChildByName("titleCalendar").getBounds().width/2*ratio
        instance.getChildByName("titleCalendar").y = stage.canvas.height-122*ratio+30*ratio+36*ratio+7*ratio+10*ratio;

        instance.getChildByName("containerBurger").x = 50*ratio-28/2*ratio
        instance.getChildByName("containerBurger").y = 66*ratio

        instance.getChildByName("containerQuickMenu").x = stage.canvas.width/2;
        instance.getChildByName("containerQuickMenu").y = 60*ratio;

    } ; 


window.Navigation = createjs.promote(Navigation, "Container");
}());