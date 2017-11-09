(function () {

    function Main(Iratio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();

    }
    
    var ratio;
    var instance;
    var aspectRatio;

    var news;
    var loader;

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        aspectRatio = new AspectRatio();
        ratio = this.ratio;
        instance = this;

        news = new News(ratio,aspectRatio);
        instance.addChild(news);

    } ;

    p.resize = function() {

        if(news)news.resize();

    } ;  

window.Main = createjs.promote(Main, "Container");
}());