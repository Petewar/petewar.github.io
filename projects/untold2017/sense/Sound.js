(function () {

    function Sound(Ipath) {

        this.Container_constructor();
        this.Ipath = Ipath
        this.setup();

    }
    
    var txtSound_
    var txtSoundOther_
    var bgSound_
    var menuSound_
    var thumbSound_
    var revealSound_
    var revealLongSound_;
    var drums_
    var close_
    
    var familyText = [];
    var familyBg = []
    var menu = []
    var thumbs = []
    var randValue = 2;
    var randValueOther = 3;
    var instance
    var isMute = false


    var p = createjs.extend(Sound, createjs.Container);

    p.setup = function() {

        instance = this;
        console.log("Load Sounds");

        if (!createjs.Sound.initializeDefaultPlugins()) {return;}

            //examples.showDistractor("content");
            var assetsPath = "sounds/";
            var sounds = [
                {src: "botaofx.wav", id: 1},
                {src: "melodia.wav", id: 5},
                {src: "drumm.wav", id: 6},
                {src: "sopro.wav", id: 7},
                {src: "soprolongo.wav", id: 8},
                {src: "soproquimico.wav", id: 9},
                {src: "gota1.wav", id: 10},
                {src: "gota2.wav", id: 11},
                {src: "gota3.wav", id: 12},
                {src: "botaofx2.wav", id: 13},
                {src: "novo2.wav", id: 14},
                
            ];

            createjs.Sound.alternateExtensions = ["mp3"];   // add other extensions to try loading if the src file extension is not supported
            createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
            createjs.Sound.registerSounds(sounds, assetsPath);

    } ;

    function soundLoaded(event) {

          familyText = ["botaofx.wav","botaofx.wav"]
          familyTextOther = ["gota1.wav","gota2.wav","gota3.wav"]
          
          familyBg = ["melodia.wav","drumm.wav"];
          
          menu = ["sopro.wav","soprolongo.wav","soproquimico.wav"];
          
          thumbs = ["botaofx2.wav"];

          close = ["novo2.wav"]

          console.log("Load Sounds Complete");

    }

    p.pause = function() {


    } ;

    p.bgSound = function() {

        bgSound_ = createjs.Sound.play("sounds/"+familyBg[0],{loop:100});
        bgSound_.pan = 0.0001
        bgSound_.volume = 0.1

    } ;

    p.controllerSounds = function(Inav) {
        if(isMute){
            isMute = false;
            instance.bgSound();
            if(Inav==1)instance.drumsSound();
        }else {
            isMute = true;
            if(bgSound_)bgSound_.stop();
            if(drums_)drums_.stop();
        }
    }

    p.closeSound = function() {

        close_ = createjs.Sound.play("sounds/"+close[0]);
        close_.pan = 0.0001
        close_.volume = 0.2

    } ;

     p.drumsSound = function() {

        if(isMute==false){
            drums_ = createjs.Sound.play("sounds/"+familyBg[1],{loop:100});
            drums_.pan = 0.0001
            drums_.volume = 0.1
        }

    } ;

    p.stopDrumsSound = function() {

        if(drums_)drums_.stop();

    } ;

    p.revealSound = function() {

        revealSound_ = createjs.Sound.play("sounds/"+menu[2]);
        revealSound_.pan = 0.0001
        revealSound_.volume = 0.2

    } ;

    p.revealLongSound = function() {

        revealLongSound_ = createjs.Sound.play("sounds/"+menu[1]);
        revealLongSound_.pan = 0.0001
        revealLongSound_.volume = 0.1

    } ;

    p.textSound = function() {

        random = Math.floor((Math.random() * randValue));
        txtSound_ = createjs.Sound.play("sounds/"+familyText[random]);
        txtSound_.pan = 0.0001
        txtSound_.volume = 0.028

    } ;

     p.textSoundOther = function() {

        random = Math.floor((Math.random() * randValueOther));
        txtSoundOther_ = createjs.Sound.play("sounds/"+familyTextOther[random]);
        txtSoundOther_.pan = 0.0001
        txtSoundOther_.volume = 0.1

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


    p.menuHoverThumbs = function() {

        thumbSound_ = createjs.Sound.play("sounds/"+thumbs[0]);
        thumbSound_.pan = 0.0001
        thumbSound_.volume = 0.1

    } ;


    
    

window.Sound = createjs.promote(Sound, "Container");
}());