(function () {

    function Gif(Iratio) {

        this.ratio = Iratio;
        this.Container_constructor();
        this.setup();

    }

    var ratio;
    var out;
    var instance;
    var textLoading;
    var p = createjs.extend(Gif, createjs.Container);

    p.setup = function() {
        instance = this;
        ratio = this.ratio;
        getAnim();
    };

    function getAnim() {

    var ss = new createjs.SpriteSheet({
    "framerate":24,
    "images":["video/loading_black.png"],
    "frames":[
        [0, 0, 256, 128, 0, -6, -39],
        [256, 0, 256, 128, 0, -6, -39],
        [512, 0, 256, 128, 0, -6, -39],
        [768, 0, 256, 128, 0, -6, -39],
        [1024, 0, 256, 128, 0, -6, -39],
        [1280, 0, 256, 128, 0, -6, -39],
        [1536, 0, 256, 128, 0, -6, -39],
        [0, 128, 256, 128, 0, -6, -39]
    ],
    "animations":{}
    })

    out = new createjs.Sprite(ss); 
    out.scaleX = ratio/3
    out.scaleY = ratio/3

    out.gotoAndPlay("run");
    instance.addChild(out);

} ;

p.kill = function() {

    out.stop();
    instance.removeChild(out);

} ;


window.Gif = createjs.promote(Gif, "Container");
}());