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
    var currentView;

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        
        svg = new Svg(ratio);
        aspectRatio = new AspectRatio(ratio);

        homepage = new Homepage(ratio);
        menu = new Menu(ratio,svg,aspectRatio);
        calendar = new Calendar(ratio,svg);

        var content = new createjs.Container();
        content.name = "content";
        instance.addChild(content);

        var navigation = new Navigation(ratio,svg);
        navigation.name = "navigation";
        instance.addChild(navigation);

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
                        fontsLoaded = true;
                        createPath();
                    }
                }
            }, 3000);

            fontLoader.loadFonts();

        }else{
            createPath()
        }

    }

    function createPath(){

        if(currentView!=null)currentView.kill();

        switch(SWFAddress.getValue()){
            case "/":
                SWFAddress.setValue("/home");
            break;
            case "/home":
                currentView = homepage;
                currentView.init();
                instance.getChildByName("content").addChild(currentView);
                if(firstTime==false)instance.getChildByName("navigation").animate();
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
        }

        firstTime = false;
    }

    p.resize = function() {

        instance.getChildByName("navigation").resize();
        currentView.resize();

    } ; 


window.Main = createjs.promote(Main, "Container");
}());