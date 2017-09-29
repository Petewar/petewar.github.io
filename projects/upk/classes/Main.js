(function () {

    function Main(Iratio) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();
    }
    
    var instance;
    var ratio;
    var svg;
    var aspectRatio;

    var fontsLoaded = false;

    var homepage;
    var menu;
    var calendar;
    var contatos;
    var servicos;
    var acerca;
    var currentView;

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        
        svg = new Svg(ratio);
        aspectRatio = new AspectRatio(ratio);
        
        menu = new Menu(instance,ratio,svg,aspectRatio);
        calendar = new Calendar(instance,ratio,svg);
        contatos = new Contatos(instance,ratio,svg);
        homepage = new Homepage(instance,ratio,aspectRatio,svg);
        servicos = new Servicos(instance,ratio,aspectRatio,svg);
        acerca = new Acerca(instance,ratio,aspectRatio,svg);

        var content = new createjs.Container();
        content.name = "content";
        instance.addChild(content);

        SWFAddress.addEventListener(SWFAddressEvent.CHANGE,handlerSwfAddress);

    };

    function handlerSwfAddress(){

        if(fontsLoaded==false){

            var fonts = ["BwModelica-Bold","BwModelica-ExtraBold","BwModelica-Regular","BwModelica-Light"];
            var fontLoader = new FontLoader(fonts, {
            
                "fontLoaded": function(font) {},

                "complete": function(error) {
                    if (error !== null) {} else {

                        console.log("Fonts Loaded");

                        instance.addEventListener("init", initHandler);

                        var navigation = new Navigation(instance,ratio,svg);
                        navigation.name = "navigation";
                        instance.addChild(navigation);

                        fontsLoaded = true;
                    }
                }
            }, 3000);

            fontLoader.loadFonts();

        }else{

            createPath()
        
        }

    }

    function initHandler(event){

        instance.removeEventListener("init", initHandler);
        instance.addEventListener("show", showViewHandler);
        createPath();

    }

    function scrollChangeHandler(event){

       if(instance.getChildByName("navigation").getNav()==-1){
            
            if(event.yPos<-(190*ratio)){
                instance.getChildByName("navigation").colapse();
                instance.getChildByName("navigation").changeToDark();
            }else{
                instance.getChildByName("navigation").expand();
                instance.getChildByName("navigation").changeToLight();
            }

       }else{

            if(event.yPos<-(410*ratio)){
                instance.getChildByName("navigation").colapse();
            
            }else{
                instance.getChildByName("navigation").expand();
            }
       }

    }

    function createPath(){

        if(currentView!=null){
            currentView.kill();
            instance.getChildByName("navigation").expand();
            if(currentView.hasEventListener("scrollChange"))currentView.removeEventListener("scrollChange", scrollChangeHandler);
        }

        instance.getChildByName("navigation").hide();
        instance.visible = false

        switch(SWFAddress.getValue()){
            case "/":
                SWFAddress.setValue("/home");
            break;
            case "/home":
                currentView = homepage;
                currentView.addEventListener("scrollChange", scrollChangeHandler);
                currentView.init();
                instance.getChildByName("content").addChild(currentView);
                instance.getChildByName("navigation").setValue(0);
                instance.getChildByName("navigation").changeToDark();
            break;
            case "/menu":
                currentView = menu;
                currentView.init();
                instance.addChild(currentView);
            break;
            case "/agenda":
                currentView = calendar;
                currentView.init();
                instance.addChild(currentView);
            break;
             case "/servicos":
                currentView = servicos;
                currentView.addEventListener("scrollChange", scrollChangeHandler);
                currentView.init();
                instance.getChildByName("content").addChild(currentView);
                instance.getChildByName("navigation").setValue(1);
                instance.getChildByName("navigation").changeToDark();
            break;
             case "/contatos":
                currentView = contatos;
                currentView.init();
                instance.addChild(currentView);
                instance.getChildByName("navigation").setValue(2);
                instance.getChildByName("navigation").changeToDark();
            break;
             case "/acerca":
                currentView = acerca;
                currentView.addEventListener("scrollChange", scrollChangeHandler);
                currentView.init();
                instance.getChildByName("content").addChild(currentView);
                instance.getChildByName("navigation").setValue(-1);
                instance.getChildByName("navigation").changeToLight();
            break;
        }
    }

     function showViewHandler(event){
        instance.getChildByName("navigation").show();
        instance.visible = true
    }

    p.resize = function() {

        instance.getChildByName("navigation").resize();
        currentView.resize();

    } ; 


window.Main = createjs.promote(Main, "Container");
}());