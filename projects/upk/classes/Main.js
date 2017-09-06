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
    var firstTime = true;

    var homepage;
    var menu;
    var calendar;
    var contatos;
    var servicos;
    var currentView;

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        
        svg = new Svg(ratio);
        aspectRatio = new AspectRatio(ratio);
        
        menu = new Menu(ratio,svg,aspectRatio);
        calendar = new Calendar(ratio,svg);
        contatos = new Contatos(ratio,svg);
        homepage = new Homepage(instance,ratio,svg);
        servicos = new Servicos(instance,ratio);

        var content = new createjs.Container();
        content.name = "content";
        instance.addChild(content);

        SWFAddress.addEventListener(SWFAddressEvent.CHANGE,handlerSwfAddress);

    };

    function handlerSwfAddress(){

        if(fontsLoaded==false){

            var fonts = ["BwModelica-Bold","BwModelica-ExtraBold"];
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

    function createPath(){

        if(currentView!=null){
            currentView.kill();
        }

        instance.getChildByName("navigation").hide();
        

        switch(SWFAddress.getValue()){
            case "/":
                SWFAddress.setValue("/home");
            break;
            case "/home":
                currentView = homepage;
                currentView.init();
                instance.getChildByName("content").addChild(currentView);
                instance.getChildByName("navigation").setValue(0);
            break;
            case "/menu":
                currentView = menu;
                currentView.init();
                instance.addChild(currentView);
            break;
            case "/calendar":
                currentView = calendar;
                currentView.init();
                instance.addChild(currentView);
            break;
             case "/servicos":
                currentView = servicos;
                currentView.init();
                instance.getChildByName("content").addChild(currentView);
                instance.getChildByName("navigation").setValue(1);
            break;
             case "/contatos":
                currentView = contatos;
                currentView.init();
                instance.addChild(currentView);
                instance.getChildByName("navigation").setValue(2);
            break;
        }

        firstTime = false;
    }

     function showViewHandler(event){
        instance.getChildByName("navigation").show();
    }

    p.resize = function() {

        instance.getChildByName("navigation").resize();
        currentView.resize();

    } ; 


window.Main = createjs.promote(Main, "Container");
}());