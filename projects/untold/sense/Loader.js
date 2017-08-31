(function () {

    function Loader(Ifiles,Ibw) {

        this.Container_constructor();
        this.files = Ifiles;
        this.bw = Ibw;
        this.setup();

    }
    
    var files;
    var content;
    var preload;
    var instance;
    var bw;

    var p = createjs.extend(Loader, createjs.Container);

    p.setup = function() {

        content = [];
        bw = this.bw;
        files = this.files;
        console.log("Loader",this.files)

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

        content.push(bmp)
    }

    function handleComplete(event) {
        var customEvent = new createjs.Event("loaderComplete");
        customEvent.contentLoader = content;
        instance.dispatchEvent(customEvent);
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
    } ; 

     p.kill = function() {
        preload.removeEventListener("progress", handleProgress);
        preload.removeEventListener("complete", handleComplete);
        preload.removeEventListener("fileload", handleFileLoad);
        preload = null;
        content = null;
        instance = null;
        files = null;
        this.files = null;
        console.log("Kill Loader")
    } ; 

window.Loader = createjs.promote(Loader, "Container");
}());