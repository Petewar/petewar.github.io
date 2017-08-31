(function () {

    function Sound(Ipath) {

        this.Container_constructor();
        this.Ipath = Ipath
        this.setup();

    }


    var sounds;
    var assetsPath;
    var ambient;
    var fx1
    var instance;
    var mute

    var p = createjs.extend(Sound, createjs.Container);

    p.setup = function() {

        instance = this;

        if (!createjs.Sound.initializeDefaultPlugins()) {return;}

            //examples.showDistractor("content");
            assetsPath = "sound/";
            sounds = [
                {src:"tema1.mp3", id: 0},
                {src:"tema2.mp3", id: 1},
                {src:"tema3.mp3", id: 2},
                {src:"tema4.wav", id: 3},
                {src:"tema5.mp3", id: 4},
                {src:"tema6.mp3", id: 5},
                {src:"fx.wav", id: 6},
            ];

            createjs.Sound.alternateExtensions = ["mp3"];   // add other extensions to try loading if the src file extension is not supported
            createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
            createjs.Sound.registerSounds(sounds, assetsPath);

    } ;

    function soundLoaded(event) {
        if(event.src=="sound/"+sounds[0].src) {
        ambient = createjs.Sound.play("sound/"+sounds[0].src,{loop:10});
        ambient.pan = 0.0001
        ambient.volume = 0.1
        }
    }

    p.play = function(Inav){

        ambient = createjs.Sound.play("sound/"+sounds[Inav].src,{loop:10});
        ambient.pan = 0.0001
        ambient.volume = 0.1
        if(mute==true)ambient.volume = 0
    }

    p.controleMute = function(){

        if(ambient.volume==0){
            ambient.volume = 1
            mute = false;
        }else{
          ambient.volume = 0  
            mute = true;
        }
    }

    p.fx = function(){

        fx1 = createjs.Sound.play("sound/"+sounds[6].src);
        fx1.volume = 0.1
        fx1.pan = 0.0001
       
    }

    p.getMute = function(){

        return mute;
    }

    p.kill = function() {

        ambient = createjs.Sound.stop();
        fx1 = createjs.Sound.stop();

    } ;
    

window.Sound = createjs.promote(Sound, "Container");
}());