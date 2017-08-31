(function () {

    function Loader(Ifiles) {

        this.Container_constructor();
        this.files = Ifiles;
        this.setup();

    }
    
    var files;
    var content;
    var preload;
    var dispatchInstanceLoader;

    var p = createjs.extend(Loader, createjs.Container);

    p.setup = function() {

        content = [];
        files = this.files;

    } ;

    function handleProgress(event) {
    }

    function handleFileLoad(event) {

        var bmp = new createjs.Bitmap(event.result);
        content.push(bmp)
    }

    function handleComplete(event) {
        var customEvent = new createjs.Event("loaderComplete");
        customEvent.contentLoader = content;
        dispatchInstanceLoader.dispatchEvent(customEvent);
    }

     /**
         *  event handlers
     */  

     p.register = function(Iinstance) {
        dispatchInstanceLoader = Iinstance;
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
        /*preload = null;
        content = null;
        files = null;
        dispatchInstanceLoader = null;
        instance = null;*/
    } ; 

window.Loader = createjs.promote(Loader, "Container");
}());