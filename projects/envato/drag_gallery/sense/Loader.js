(function () {

    function Loader(Ifiles,Iratio) {

        this.Container_constructor();
        this.files = Ifiles;
        this.ratio = Iratio
        this.setup();

    }
    
    var files;
    var content;
    var preload;
    var instance;
    var ratio;
    var animation;

    var p = createjs.extend(Loader, createjs.Container);

    p.setup = function() {

        content = [];
        files = this.files;
        ratio = this.ratio;

    } ;

    function handleProgress(event) {
    }

    function handleFileLoad(event) {

        var bmp = new createjs.Bitmap(event.result);

        if(content)content.push(bmp)
    }

    function handleComplete(event) {

        if(content){
            var customEvent = new createjs.Event("loaderComplete");
            customEvent.contentLoader = content;
            instance.dispatchEvent(customEvent);
        }
    }

     /**
         *  event handlers
     */  

     p.register = function(Iinstance) {

        instance = Iinstance;
        preload = new createjs.LoadQueue();
        preload.on("progress", handleProgress);
        preload.on("complete", handleComplete);
        preload.on("fileload", handleFileLoad);
        preload.loadManifest(files, true);

        animation = new Gif(ratio);
        animation.x = stage.canvas.width/2-75/1.5*ratio
        animation.y = stage.canvas.height/2-75/1.5*ratio-25*ratio
        instance.addChild(animation)

    } ; 

    p.resize = function() {
        
        animation.x = stage.canvas.width/2-75/1.5*ratio
        animation.y = stage.canvas.height/2-75/1.5*ratio-25*ratio

    } ;

     p.kill = function() {

        preload.removeEventListener("progress", handleProgress);
        preload.removeEventListener("complete", handleComplete);
        preload.removeEventListener("fileload", handleFileLoad);
        animation.kill();
        instance.removeChild(animation)
        

    } ; 

window.Loader = createjs.promote(Loader, "Container");
}());