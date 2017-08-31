(function () {

    function Gif(Iratio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();

    }

    var ratio;
    var animation;
    var animationPath;
    var instance;
    var frames;
    var animFrames = [];
    var animate;
    var framerate = 60
    
    var p = createjs.extend(Gif, createjs.Container);

    p.setup = function() {

        instance   = this;
        ratio = this.ratio;

    };

    p.getAnim = function(Ipath,Iframes,Iloop) {

        animationPath = Ipath;
        frames = Iframes;

        if(Iloop==true){
                
           
                 var ss = new createjs.SpriteSheet({
            "framerate":framerate,
            "images":animationPath,
            "frames":frames,
            "animations":{}
            })

            animation = new createjs.Sprite(ss);
            instance.addChild(animation);

        }else{
            
            for (var i=0;i<frames.length;i++){
                animFrames.push(i);
            }

             var ss = new createjs.SpriteSheet({
            "framerate":framerate,
            "images":animationPath,
            "frames":frames,
            "animations":{ show: { frames: animFrames, next: false, frequency: 1 }
            }
            })

            animation = new createjs.Sprite(ss);
            instance.addChild(animation);

        }

    } ;

    p.playAnimation = function() {
        animate = true;
        animation.gotoAndPlay("show");
    } ;

    p.stopAnimation = function() {
        animate = false;
        animation.gotoAndStop(0);
    } ;

    p.getAnimate = function() {
        return animate;
    }

    p.kill = function() {
        animation.stop();
        instance.removeChild(animation);
        animation = null;
        animFrames = [];
        frames = null;
        animationPath= null
        framerate = 60/4
    } ;


    window.Gif = createjs.promote(Gif, "Container");
}());