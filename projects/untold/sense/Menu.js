(function () {

    function Menu(Instance,Iratio,Icolors) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.colors = Icolors;
        this.instanceDispatch = Instance
        this.setup();

    }
    
    var ratio;
    var instance;
    var instanceDispatch
    var rectangle;
    var menuShape;
    var containerMenu;

    var rectangleNavigation;
    var rectangleMenu1;
    var rectangleMenu2;
    var rectangleMenu3;
    var rectangleMenu4;
    var menu1Number;
    var menu2Number;
    var menu3Number;
    var menu4Number;
    var menu1;
    var menu2;
    var menu3;
    var menu4;
    var navigationTxt;
    var navigationX;
    var infoTxt;
    var navigationMenu
    var margin = 60;
    var marginFromStrokeWidth = 10;
    var marginFromStrokeHeight = 20;
    var nav;
    var menuArr = [];
    var menuNumberArr = [];
    var menuStrokeArr = [];
    var colorsArr;
    var info = "EMAIL - INFO@UNTOLDINTERACTIVE.COM\n\n\nPHONE - +351 234 020 654\n\n\nRUA JOSE ESTEVAO N 83, 2 ESQ\n3800-202 AVEIRO, PORTUGAL"

    var p = createjs.extend(Menu, createjs.Container);

    p.setup = function() {

        console.log("Menu")
        instance = this;
        instanceDispatch = this.instanceDispatch
        ratio = this.ratio;
        colorsArr = this.colors;

        marginFromMenu = 150;
        nav = 0;

    } ;

    p.createMenu = function(){

        if((rectangle==null)&&(containerMenu==null)&&(menuShape==null)){

            rectangle = new createjs.Shape();
            rectangle.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width,stage.canvas.height);
            rectangle.alpha = 0;
            rectangle.mouseChildren=false
            createjs.Tween.get(rectangle)
            .to({alpha:0.8}, 400, createjs.Ease.linear)
            instance.addChild(rectangle);

            containerMenu = new createjs.Container();
            instance.addChild(containerMenu);

            navigationMenu = new createjs.Container();
            instance.addChild(navigationMenu);

            menuShape = createSvg("M936.989,-0.000 L410.000,-0.000 L0.000,1000.000 L936.989,1000.000 L936.989,-0.000 Z","#ffffff");            
            containerMenu.regX = 937*ratio;
            containerMenu.addChild(menuShape);
            
            var scaleFactor = (((100)*stage.canvas.height)/(1000*ratio))/100
            containerMenu.scaleX = scaleFactor
            containerMenu.scaleY = scaleFactor

            containerMenu.x = stage.canvas.width+937*ratio
            createjs.Tween.get(containerMenu)
            .to({x:stage.canvas.width}, 500, createjs.Ease.circInOut)
            .call(function(){
                addNavigation()
             });

            navigationMenu.addChild(rectangleNavigation);   
        }

    }

    function createSvg(Isvg,Icolor){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        svg.scaleX = ratio;
        svg.scaleY = ratio;
        return svg;
    }

    function addNavigation(){

            navigationX = stage.canvas.width-455*ratio

            rectangleNavigation = new createjs.Shape();
            rectangleNavigation.graphics.beginFill("#000000").drawRect(0, 0, 25*ratio,1*ratio);
            rectangleNavigation.x = navigationX;
            rectangleNavigation.y = margin*ratio+6*ratio;
            rectangleNavigation.alpha = 0;
            createjs.Tween.get(rectangleNavigation)
            .to({alpha:1}, 800, createjs.Ease.linear)
            navigationMenu.addChild(rectangleNavigation);

            navigationTxt = new createjs.Text();
            navigationTxt.font = "Bold 10px Montserrat";
            navigationTxt.color = "#000000";
            navigationTxt.text = "NAVIGATION";
            navigationTxt.scaleX = ratio;
            navigationTxt.scaleY = ratio;
            navigationTxt.x = rectangleNavigation.x+25*ratio+marginFromStrokeWidth*ratio;
            navigationTxt.y = margin*ratio;
            navigationTxt.alpha = 0;
            createjs.Tween.get(navigationTxt)
            .to({alpha:1}, 800, createjs.Ease.linear)
            navigationMenu.addChild(navigationTxt);

            //ELEMENTS

            rectangleMenu1 = new createjs.Shape();
            rectangleMenu1.name = "rectangleMenu1"
            rectangleMenu1.graphics.beginFill("#000000").drawRect(0, 0, 50*ratio,1*ratio);
            rectangleMenu1.x = navigationX;
            rectangleMenu1.y = navigationTxt.y+marginFromMenu*ratio;
            rectangleMenu1.alpha = 0;
            navigationMenu.addChild(rectangleMenu1);

            menu1Number = new createjs.Text();
            menu1Number.name = "menuNumber1"
            menu1Number.font = "12px Abril Fatface";
            menu1Number.color = "#000000";
            menu1Number.text = "001";
            menu1Number.scaleX = ratio;
            menu1Number.scaleY = ratio;
            menu1Number.x = rectangleMenu1.x+50*ratio+marginFromStrokeWidth*ratio;
            menu1Number.y = rectangleMenu1.y-8*ratio;
            menu1Number.alpha = 0;
            navigationMenu.addChild(menu1Number);

            menu1 = new createjs.Text();
            menu1.name = "menu1"
            menu1.font = "40px Abril Fatface";
            menu1.color = "#000000";
            menu1.text = "Home";
            menu1.scaleX = ratio;
            menu1.scaleY = ratio;
            menu1.x = rectangleMenu1.x;
            menu1.y = rectangleMenu1.y+marginFromStrokeHeight*ratio;
            menu1.alpha = 0;
            navigationMenu.addChild(menu1)

            menu1Hit = new createjs.Shape();
            menu1Hit = new createjs.Shape();
            menu1Hit.instance = "0"
            menu1Hit.alpha = 0.01
            menu1Hit.graphics.beginFill("#ffffff").drawRect(0, 0, menu1.getBounds().width*ratio,(menu1.getBounds().height*ratio)*2);
            menu1Hit.x = rectangleMenu1.x
            menu1Hit.y = rectangleMenu1.y
            navigationMenu.addChild(menu1Hit)

            menu1Hit.cursor = "pointer"
            menu1Hit.addEventListener("mouseover", handlerOverNavigation);
            menu1Hit.addEventListener("mouseout", handlerOutNavigation);
            menu1Hit.addEventListener("click", handlerClickNavigation); 

            rectangleMenu2 = new createjs.Shape();
            rectangleMenu2.name = "rectangleMenu2"
            rectangleMenu2.graphics.beginFill("#000000").drawRect(0, 0, 50*ratio,1*ratio);
            rectangleMenu2.x = navigationX+(marginFromMenu*ratio)*1.5;
            rectangleMenu2.y = navigationTxt.y+marginFromMenu*ratio;
            rectangleMenu2.alpha = 0;
            navigationMenu.addChild(rectangleMenu2);

            menu2Number = new createjs.Text();
            menu2Number.name = "menuNumber2";
            menu2Number.font = "12px Abril Fatface";
            menu2Number.color = "#000000";
            menu2Number.text = "002";
            menu2Number.scaleX = ratio;
            menu2Number.scaleY = ratio;
            menu2Number.x = rectangleMenu2.x+50*ratio+marginFromStrokeWidth*ratio;
            menu2Number.y = rectangleMenu2.y-8*ratio;
            menu2Number.alpha = 0;
            navigationMenu.addChild(menu2Number);

            menu2 = new createjs.Text();
            menu2.name = "menu2";
            menu2.font = "40px Abril Fatface";
            menu2.color = "#000000";
            menu2.text = "Projects";
            menu2.scaleX = ratio;
            menu2.scaleY = ratio;
            menu2.x = rectangleMenu2.x;
            menu2.y = rectangleMenu2.y+marginFromStrokeHeight*ratio;
            menu2.alpha = 0;
            navigationMenu.addChild(menu2) 

            menu2Hit = new createjs.Shape();
            menu2Hit = new createjs.Shape();
            menu2Hit.instance = "1"
            menu2Hit.alpha = 0.01
            menu2Hit.graphics.beginFill("#ffffff").drawRect(0, 0, menu2.getBounds().width*ratio,(menu2.getBounds().height*ratio)*2);
            menu2Hit.x = rectangleMenu2.x
            menu2Hit.y = rectangleMenu2.y
            navigationMenu.addChild(menu2Hit)

            menu2Hit.cursor = "pointer"
            menu2Hit.addEventListener("mouseover", handlerOverNavigation);
            menu2Hit.addEventListener("mouseout", handlerOutNavigation);
            menu2Hit.addEventListener("click", handlerClickNavigation); 

            rectangleMenu3 = new createjs.Shape();
            rectangleMenu3.name = "rectangleMenu3";
            rectangleMenu3.graphics.beginFill("#000000").drawRect(0, 0, 50*ratio,1*ratio);
            rectangleMenu3.x = navigationX;
            rectangleMenu3.y = navigationTxt.y+(marginFromMenu*ratio)*2
            rectangleMenu3.alpha = 0;
            navigationMenu.addChild(rectangleMenu3);

            menu3Number = new createjs.Text();
            menu3Number.name = "menuNumber3";
            menu3Number.font = "12px Abril Fatface";
            menu3Number.color = "#000000";
            menu3Number.text = "003";
            menu3Number.scaleX = ratio;
            menu3Number.scaleY = ratio;
            menu3Number.x = rectangleMenu3.x+50*ratio+marginFromStrokeWidth*ratio;
            menu3Number.y = rectangleMenu3.y-8*ratio
            menu3Number.alpha = 0;
            navigationMenu.addChild(menu3Number);

            menu3 = new createjs.Text();
            menu3.name = "menu3";
            menu3.font = "40px Abril Fatface";
            menu3.color = "#000000";
            menu3.text = "About";
            menu3.scaleX = ratio;
            menu3.scaleY = ratio;
            menu3.x = rectangleMenu3.x;
            menu3.y = rectangleMenu3.y+marginFromStrokeHeight*ratio;
            menu3.alpha = 0;
            navigationMenu.addChild(menu3) 

            menu3Hit = new createjs.Shape();
            menu3Hit = new createjs.Shape();
            menu3Hit.instance = "2"
            menu3Hit.alpha = 0.01
            menu3Hit.graphics.beginFill("#ffffff").drawRect(0, 0, menu3.getBounds().width*ratio,(menu3.getBounds().height*ratio)*2);
            menu3Hit.x = rectangleMenu3.x
            menu3Hit.y = rectangleMenu3.y
            navigationMenu.addChild(menu3Hit)

            menu3Hit.cursor = "pointer"
            menu3Hit.addEventListener("mouseover", handlerOverNavigation);
            menu3Hit.addEventListener("mouseout", handlerOutNavigation);
            //menu3Hit.addEventListener("click", handlerClickNavigation);

            rectangleMenu4 = new createjs.Shape();
            rectangleMenu4.name = "rectangleMenu4";
            rectangleMenu4.graphics.beginFill("#000000").drawRect(0, 0, 50*ratio,1*ratio);
            rectangleMenu4.x = navigationX+(marginFromMenu*ratio)*1.5;
            rectangleMenu4.y = navigationTxt.y+(marginFromMenu*ratio)*2
            rectangleMenu4.alpha = 0;
            navigationMenu.addChild(rectangleMenu4);

            menu4Number = new createjs.Text();
            menu4Number.name = "menuNumber4";
            menu4Number.font = "12px Abril Fatface";
            menu4Number.color = "#000000";
            menu4Number.text = "004";
            menu4Number.scaleX = ratio;
            menu4Number.scaleY = ratio;
            menu4Number.x = rectangleMenu4.x+50*ratio+marginFromStrokeWidth*ratio;
            menu4Number.y = rectangleMenu4.y-8*ratio
            menu4Number.alpha = 0;
            navigationMenu.addChild(menu4Number);

            menu4 = new createjs.Text();
            menu4.name = "menu4";
            menu4.font = "40px Abril Fatface";
            menu4.color = "#000000";
            menu4.text = "Talk to Us";
            menu4.scaleX = ratio;
            menu4.scaleY = ratio;
            menu4.x = rectangleMenu4.x;
            menu4.y = rectangleMenu4.y+marginFromStrokeHeight*ratio;
            menu4.alpha = 0;
            navigationMenu.addChild(menu4)

            menu4Hit = new createjs.Shape();
            menu4Hit = new createjs.Shape();
            menu4Hit.instance = "3"
            menu4Hit.alpha = 0.01
            menu4Hit.graphics.beginFill("#ffffff").drawRect(0, 0, menu4.getBounds().width*ratio,(menu4.getBounds().height*ratio)*2);
            menu4Hit.x = rectangleMenu4.x
            menu4Hit.y = rectangleMenu4.y
            navigationMenu.addChild(menu4Hit)

            menu4Hit.cursor = "pointer"
            menu4Hit.addEventListener("mouseover", handlerOverNavigation);
            menu4Hit.addEventListener("mouseout", handlerOutNavigation);
            //menu4Hit.addEventListener("click", handlerClickNavigation);

            infoTxt = new createjs.Text();
            infoTxt.name = "infotxt";
            infoTxt.font = "12px Montserrat";
            infoTxt.color = "#000000";
            infoTxt.text = info;
            infoTxt.textAlign = "right"
            infoTxt.scaleX = ratio;
            infoTxt.scaleY = ratio;
            infoTxt.x = rectangleMenu4.x+menu4.getBounds().width*ratio;
            infoTxt.y = rectangleMenu4.y+marginFromStrokeHeight*ratio+(marginFromMenu*ratio)
            infoTxt.alpha = 0;
            createjs.Tween.get(infoTxt)
            .to({alpha:1}, 800, createjs.Ease.linear)
            navigationMenu.addChild(infoTxt)

            menuArr.push(menu1,menu2,menu3,menu4);
            menuNumberArr.push(menu1Number,menu2Number,menu3Number,menu4Number);
            menuStrokeArr.push(rectangleMenu1,rectangleMenu2,rectangleMenu3,rectangleMenu4);

            updateColorMenu();

    }

    function handlerOverNavigation(event){

        if(event.target.instance!=nav){

            var currentX = menuNumberArr[event.target.instance].x;

            createjs.Tween.get(menuArr[event.target.instance])
            .to({alpha:1}, 400, createjs.Ease.circInOut)

            createjs.Tween.get(menuNumberArr[event.target.instance])
            .to({alpha:1,x:currentX-30*ratio}, 400, createjs.Ease.circInOut)

            createjs.Tween.get(menuStrokeArr[event.target.instance])
            .to({alpha:1,scaleX:0.5}, 400, createjs.Ease.circInOut)

        }
    }

    function handlerOutNavigation(event){

        if(event.target.instance!=nav){

            var currentX = menuNumberArr[event.target.instance].x;

            createjs.Tween.get(menuArr[event.target.instance])
            .to({alpha:0.3}, 400, createjs.Ease.circInOut)

            createjs.Tween.get(menuNumberArr[event.target.instance])
            .to({alpha:0.3,x:currentX+30*ratio}, 400, createjs.Ease.circInOut)

            createjs.Tween.get(menuStrokeArr[event.target.instance])
            .to({alpha:0.3,scaleX:1}, 400, createjs.Ease.circInOut)

        }
    }   

    function handlerClickNavigation(event){

        if(event.target.instance!=nav){

            var currentX = menuNumberArr[nav].x;

            createjs.Tween.get(menuArr[nav])
            .to({alpha:0.3}, 400, createjs.Ease.circInOut)

            createjs.Tween.get(menuNumberArr[nav])
            .to({alpha:0.3,x:currentX+30*ratio}, 400, createjs.Ease.circInOut)

            createjs.Tween.get(menuStrokeArr[nav])
            .to({alpha:0.3,scaleX:1}, 400, createjs.Ease.circInOut)

            nav = event.target.instance

            if(nav==1){
                var customEvent = new createjs.Event("goToProject");
                customEvent.state = "close";
                instanceDispatch.dispatchEvent(customEvent);
            }

            if(nav==0){
                var customEvent = new createjs.Event("goToHome");
                customEvent.state = "open";
                instanceDispatch.dispatchEvent(customEvent);
            }

        }
    }

    function removeNavigation(){

         createjs.Tween.get(rectangleNavigation)
        .to({alpha:0}, 300, createjs.Ease.linear)

        createjs.Tween.get(navigationTxt)
        .to({alpha:0}, 300, createjs.Ease.linear)

         createjs.Tween.get(rectangleMenu2)
        .to({alpha:0}, 300, createjs.Ease.linear)

         createjs.Tween.get(menu2Number)
        .to({alpha:0}, 300, createjs.Ease.linear)

          createjs.Tween.get(menu2)
        .to({alpha:0}, 300, createjs.Ease.linear)

         createjs.Tween.get(rectangleMenu3)
        .to({alpha:0}, 300, createjs.Ease.linear)

         createjs.Tween.get(menu3Number)
        .to({alpha:0}, 300, createjs.Ease.linear)

          createjs.Tween.get(menu3)
        .to({alpha:0}, 300, createjs.Ease.linear)

         createjs.Tween.get(rectangleMenu3)
        .to({alpha:0}, 300, createjs.Ease.linear)

         createjs.Tween.get(menu4Number)
        .to({alpha:0}, 300, createjs.Ease.linear)

          createjs.Tween.get(menu4)
        .to({alpha:0}, 300, createjs.Ease.linear)

        createjs.Tween.get(rectangleMenu1)
        .to({alpha:0}, 300, createjs.Ease.linear)

         createjs.Tween.get(menu1Number)
        .to({alpha:0}, 300, createjs.Ease.linear)

         createjs.Tween.get(infoTxt)
        .to({alpha:0}, 300, createjs.Ease.linear)


        createjs.Tween.get(menu1)
        .to({alpha:0}, 300, createjs.Ease.linear)
        .call(function(){

                containerMenu.removeChild(navigationTxt);
                containerMenu.removeChild(rectangleNavigation);
                containerMenu.removeChild(rectangleMenu1);
                containerMenu.removeChild(menu1Number);
                containerMenu.removeChild(menu1);
                containerMenu.removeChild(rectangleMenu2);
                containerMenu.removeChild(menu2Number);
                containerMenu.removeChild(menu2);
                containerMenu.removeChild(rectangleMenu3);
                containerMenu.removeChild(menu3Number);
                containerMenu.removeChild(menu3);
                containerMenu.removeChild(rectangleMenu4);
                containerMenu.removeChild(menu4Number);
                containerMenu.removeChild(menu4);
                containerMenu.removeChild(infoTxt);

                navigationTxt= null;
                rectangleNavigation=null
                rectangleMenu1=null
                menu1Number=null
                menu1=null
                rectangleMenu2=null
                menu2Number=null
                menu2=null
                rectangleMenu3=null
                menu3Number=null
                menu3=null
                rectangleMenu4=null
                menu4Number=null
                menu4=null
                infoTxt=null;

                menuArr = [];
                menuNumberArr = [];
                menuStrokeArr = [];

            });
    }   

    p.updateNav = function(Inav){
        nav = Inav;
    }

    p.killMenu = function(){
        
        removeNavigation();

        createjs.Tween.get(rectangle)
        .to({alpha:0}, 400, createjs.Ease.linear)
        .call(function(){
            rectangle.graphics.clear();
            instance.removeChild(rectangle);
            rectangle = null;
         });

        createjs.Tween.get(containerMenu)
        .to({x:stage.canvas.width+937*ratio}, 1000, createjs.Ease.circInOut)
        .call(function(){
            menuShape.graphics.clear();
            containerMenu.removeChild(menuShape);
            menuShape=null
            instance.removeChild(containerMenu);
            
            containerMenu = null;
         });

        instance.removeChild(navigationMenu);
            navigationMenu = null
    }

    function updateColorMenu(){

        for(var i=0;i<menuArr.length;i++){
            
            if(i==nav){

                console.log(nav)

                var currentX = menuNumberArr[nav].x;

                createjs.Tween.get(menuArr[nav])
                .to({alpha:1}, 400, createjs.Ease.circInOut)

                createjs.Tween.get(menuNumberArr[nav])
                .to({alpha:1,x:currentX-30*ratio}, 400, createjs.Ease.circInOut)

                createjs.Tween.get(menuStrokeArr[nav])
                .to({alpha:1,scaleX:0.5}, 400, createjs.Ease.circInOut)
            }

            else{

                createjs.Tween.get(menuArr[i])
                .to({alpha:0.3}, 800, createjs.Ease.linear)

                createjs.Tween.get(menuNumberArr[i])
                .to({alpha:0.3}, 800, createjs.Ease.linear)

                createjs.Tween.get(menuStrokeArr[i])
                .to({alpha:0.3}, 800, createjs.Ease.linear)

            }
        }

    }

    p.resize = function() {

        if(navigationMenu){
            
            navigationX = stage.canvas.width-455*ratio

            rectangleNavigation.x = navigationX;
            rectangleNavigation.y = margin*ratio+6*ratio;
            navigationTxt.x = rectangleNavigation.x+25*ratio+marginFromStrokeWidth*ratio;
            navigationTxt.y = margin*ratio;

            rectangleMenu1.x = navigationX;
            rectangleMenu1.y = navigationTxt.y+marginFromMenu*ratio;
            menu1Number.x = rectangleMenu1.x+50*ratio+marginFromStrokeWidth*ratio;
            menu1Number.y = rectangleMenu1.y-8*ratio;
            menu1.x = rectangleMenu1.x;
            menu1.y = rectangleMenu1.y+30*ratio;
            
            rectangleMenu2.x = navigationX+(marginFromMenu*ratio)*1.5;
            rectangleMenu2.y = navigationTxt.y+marginFromMenu*ratio;
            menu2Number.x = rectangleMenu2.x+50*ratio+marginFromStrokeWidth*ratio;
            menu2Number.y = rectangleMenu2.y-8*ratio;
            menu2.x = rectangleMenu2.x;
            menu2.y = rectangleMenu2.y+30*ratio;

            rectangleMenu3.x = navigationX;
            rectangleMenu3.y = navigationTxt.y+(marginFromMenu*ratio)*2
            menu3Number.x = rectangleMenu3.x+50*ratio+marginFromStrokeWidth*ratio;
            menu3Number.y = rectangleMenu3.y-8*ratio
            menu3.x = rectangleMenu3.x;
            menu3.y = rectangleMenu3.y+30*ratio;

            rectangleMenu4.x = navigationX+(marginFromMenu*ratio)*1.5;
            rectangleMenu4.y = navigationTxt.y+(marginFromMenu*ratio)*2
            menu4Number.x = rectangleMenu4.x+50*ratio+marginFromStrokeWidth*ratio;
            menu4Number.y = rectangleMenu4.y-8*ratio
            menu4.x = rectangleMenu4.x;
            menu4.y = rectangleMenu4.y+30*ratio;

            infoTxt.x = rectangleMenu4.x+menu4.getBounds().width*ratio;
            infoTxt.y = rectangleMenu4.y+30*ratio+(marginFromMenu*ratio)

        }

        if(containerMenu){
            var scaleFactor = (((100)*stage.canvas.height)/(1000*ratio))/100
            containerMenu.scaleX = scaleFactor
            containerMenu.scaleY = scaleFactor

            containerMenu.x = stage.canvas.width
        }
        

        if(rectangle!=null){
            rectangle.graphics.clear();
            rectangle.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width,stage.canvas.height);
        }
    } ;  

window.Menu = createjs.promote(Menu, "Container");
}());