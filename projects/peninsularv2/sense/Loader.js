(function () {

    function Loader(Ifiles,Iratio,Ibw) {

        this.Container_constructor();
        this.files = Ifiles;
        this.ratio = Iratio
        this.bw = Ibw;
        this.setup();

    }
    
    var files;
    var content;
    var preload;
    var instance;
    var bw;
    var ratio;
    var animation;

    var p = createjs.extend(Loader, createjs.Container);

    p.setup = function() {

        content = [];
        bw = this.bw;
        files = this.files;
        ratio = this.ratio;

    } ;

    function handleProgress(event) {
    }

    function handleFileLoad(event) {

        var bmp = new createjs.Bitmap(event.result);

        if(bw){
            var colorMatrix = new createjs.ColorMatrix();
            colorMatrix.adjustSaturation(-100);
            colorMatrix.adjustContrast(50);
            var blackAndWhiteFilter = new createjs.ColorMatrixFilter(colorMatrix);
            
            bmp.filters = [blackAndWhiteFilter];
            bmp.cache(0, 0, bmp.image.width, bmp.image.height); 
        }

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
        animation = null
        preload = null;
        content = null;
        instance = null;
        files = null;
        this.files = null;

    } ; 

window.Loader = createjs.promote(Loader, "Container");
}());