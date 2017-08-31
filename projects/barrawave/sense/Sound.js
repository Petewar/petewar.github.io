(function () {

    function Sound(Ipath) {

        this.Container_constructor();
        this.Ipath = Ipath
        this.setup();

    }
    
    var txtSound_
    var bgSound_
    var menuSound_
    var thumbSound_
    var revealSound_
    var revealLongSound_;
    
    var familyText = [];
    var familyBg = []
    var menu = []
    var thumbs = []
    var randValue = 2;
    var instance


    var p = createjs.extend(Sound, createjs.Container);

    p.setup = function() {

        instance = this;
        console.log("Load Sounds");

        if (!createjs.Sound.initializeDefaultPlugins()) {return;}

            //examples.showDistractor("content");
            var assetsPath = "sounds/";
            var sounds = [
                {src: "botao7.wav", id: 1},
                {src: "botao10.wav", id: 2},                
                {src: "botao9.wav", id: 4},
                {src: "loop1base.wav", id: 5},
                {src: "sopro.wav", id: 6},
                {src: "soprolongo.wav", id: 7},
                {src: "soproquimico.wav", id: 8},
            ];

            createjs.Sound.alternateExtensions = ["mp3"];   // add other extensions to try loading if the src file extension is not supported
            createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
            createjs.Sound.registerSounds(sounds, assetsPath);

    } ;

    function soundLoaded(event) {

          familyText = ["botao7.wav","botao10.wav"]
          familyBg = ["loop1base.wav"];
          menu = ["sopro.wav","soprolongo.wav","soproquimico.wav"];
          thumbs = ["botao9.wav"];

          console.log("Load Sounds Complete");

    }

    p.pause = function() {


    } ;

    p.bgSound = function() {

        //random = Math.floor((Math.random() * randValue) + 1);

        bgSound_ = createjs.Sound.play("sounds/"+familyBg[0],{loop:10});
        bgSound_.pan = 0.0001
        bgSound_.volume = 0.4

    } ;

    p.revealSound = function() {

        //random = Math.floor((Math.random() * randValue) + 1);

        revealSound_ = createjs.Sound.play("sounds/"+menu[2]);
        revealSound_.pan = 0.0001
        revealSound_.volume = 0.2

    } ;

    p.revealLongSound = function() {

        //random = Math.floor((Math.random() * randValue) + 1);

        revealLongSound_ = createjs.Sound.play("sounds/"+menu[1]);
        revealLongSound_.pan = 0.0001
        revealLongSound_.volume = 0.1

    } ;

    p.textSound = function() {

        random = Math.floor((Math.random() * randValue));
        txtSound_ = createjs.Sound.play("sounds/"+familyText[random]);
        txtSound_.pan = 0.0001
        txtSound_.volume = 0.02

    } ;

    p.menuOpenSound = function() {

        menuSound_ = createjs.Sound.play("sounds/"+menu[1]);
        menuSound_.pan = 0.0001
        menuSound_.volume = 0.1

    } ;

    p.menuCloseSound = function() {

        menuSound_ = createjs.Sound.play("sounds/"+menu[1]);
        menuSound_.pan = 0.0001
        menuSound_.volume = 0.1

    } ;

    p.menuHoverSound = function() {

        instance.textSound();

    } ;

    p.menuHoverThumbs = function() {

        thumbSound_ = createjs.Sound.play("sounds/"+thumbs[0]);
        thumbSound_.pan = 0.0001
        thumbSound_.volume = 0.02

    } ;


    
    

window.Sound = createjs.promote(Sound, "Container");
}());