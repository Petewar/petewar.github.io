(function () {

    function Main(Iratio) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();
    }
    
    var instance;
    var ratio;

    //sense library
    var aspectRatio;
    var loader;
    var svg;
    var dataContent;
    var grid;
    var logo;

    //Fonts Files
    var fonts = ["BebasNeueBook","BebasNeueBold"];

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        aspectRatio = new AspectRatio(ratio);
        svg = new Svg(ratio);

        var fontLoader = new FontLoader(fonts, {
            
            "fontLoaded": function(font) {
                // One of the fonts was loaded
                //console.log("Font Loaded: " + font.family);
            },

            "complete": function(error) {
                if (error !== null) {
                    // Reached the timeout but not all fonts were loaded
                    //console.log(error.message);
                    //console.log(error.notLoadedFonts);

                } else {
                    console.log("Fonts Loaded: "+fonts);
                    // All fonts were loaded
                    preloadDataJson()
                }
            }
        }, 3000);

        fontLoader.loadFonts();

    };

    function preloadDataJson(){

        //Load Json File
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile("data/content.json", true);

    }

    function preloadDataComplete(event) {
        
        console.log("Loader Data: "+"data/content.json")

        //remove preloadData
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        var imageContent = event.result.content[0].projectImages
        dataContent = event.result.content[1]
        
        //load images for videos
        loadImages(imageContent);
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles);
        loader.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    }
    
    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;

        init(evt);

    }

    function init(Ivent){

        grid = new Grid(ratio,aspectRatio,Ivent,dataContent);
        instance.addChild(grid);
        
        logo = svg.createSvg("M50.000,8.777 L35.359,17.954 L25.354,35.000 L17.799,22.958 L10.828,35.000 L0.000,17.500 L14.375,17.500 L20.958,17.500 L35.029,17.500 L35.000,-0.000 L50.000,8.777 Z","#FFFFFF") 
        logo.x = 60*ratio
        logo.y = 96*ratio
        logo.alpha = 0;
        TweenMax.to(logo, 2, {alpha:1,ease:Power4.easeInOut})
        instance.addChild(logo);
    }

    p.resize = function() {
        
        if(grid)grid.resize();

        if(logo){
            logo.x = 60*ratio
            logo.y = 96*ratio
        }

    } ;  

window.Main = createjs.promote(Main, "Container");
}());