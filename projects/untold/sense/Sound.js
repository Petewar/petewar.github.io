(function () {

    function Sound(Ipath) {

        this.Container_constructor();
        this.Ipath = Ipath
        this.setup();

    }
    
    var menu;
    var contact;
    var arrow;

    var p = createjs.extend(Sound, createjs.Container);

    p.setup = function() {

        console.log("Load Sounds");

        if (!createjs.Sound.initializeDefaultPlugins()) {return;}

            //examples.showDistractor("content");
            var assetsPath = "sounds/";
            var sounds = [
                {src: "bolha1.wav", id: 1},
                {src: "bolha2.wav", id: 2},
                {src: "bolha3.wav", id: 3},
                {src: "noise_atck.wav", id: 4},
            ];

            createjs.Sound.alternateExtensions = ["mp3"];   // add other extensions to try loading if the src file extension is not supported
            createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
            createjs.Sound.registerSounds(sounds, assetsPath);

    } ;

    function soundLoaded(event) {

          console.log("Load Sounds Complete");

    }

    p.pause = function() {


    } ;

    p.menuIn = function() {

        menu = createjs.Sound.play("sounds/noise_atck.wav");

    } ;

    p.menuOut = function() {

        menu = createjs.Sound.play("sounds/noise_atck.wav");

    } ;

    p.contactIn = function() {

        contact = createjs.Sound.play("sounds/bolha2.wav");

    } ;

    p.contactOut = function() {

        contact = createjs.Sound.play("sounds/bolha2.wav");

    } ;
    

window.Sound = createjs.promote(Sound, "Container");
}());