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
        "framerate":40,
"images":["spritesheet/loading_fast_0.png", "spritesheet/loading_fast_1.png"],
"frames":[
    [0, 0, 128, 128, 0, -4, -5],
    [128, 0, 128, 128, 0, -4, -5],
    [256, 0, 128, 128, 0, -4, -5],
    [0, 128, 128, 128, 0, -4, -5],
    [128, 128, 128, 128, 0, -4, -5],
    [256, 128, 128, 128, 0, -4, -5],
    [0, 256, 128, 128, 0, -4, -5],
    [128, 256, 128, 128, 0, -4, -5],
    [256, 256, 128, 128, 0, -4, -5],
    [0, 384, 128, 128, 0, -4, -5],
    [128, 384, 128, 128, 0, -4, -5],
    [256, 384, 128, 128, 0, -4, -5],
    [0, 0, 128, 128, 1, -4, -5],
    [128, 0, 128, 128, 1, -4, -5]
],
"animations":{}
})
   
    out = new createjs.Sprite(ss); 
    out.alpha = 0.2
    out.x = 25*ratio
    out.y = 60*ratio
    out.scaleX = ratio/2
    out.scaleY = ratio/2

    textLoading = new createjs.Text();
    textLoading.font = "bold 10px PT Sans";
    textLoading.scaleX = ratio;
    textLoading.scaleY = ratio;
    textLoading.text = "L O A D I N G ...";
    textLoading.textAlign = "center"
    textLoading.x = 50*ratio
    textLoading.y = 125*ratio
    textLoading.color = "#FFFFFF";
    textLoading.alpha = 0.5
    instance.addChild(textLoading);


    out.gotoAndPlay("run");
    instance.addChild(out);

} ;

p.kill = function() {

    out.stop();
    instance.removeChild(textLoading);
    instance.removeChild(out);

} ;


window.Gif = createjs.promote(Gif, "Container");
}());