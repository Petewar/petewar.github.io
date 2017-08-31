(function () {

    function Video(Ipath,IdispatchInstance,Iloop) {

        this.Container_constructor();
        this.Ipath = Ipath
        this.IdispatchInstance = IdispatchInstance
        this.loop = Iloop
        this.setup();

    }
    
    var lItem = null;
    var lVideo = null;
    var dispatchInstance
    var loop;

    var p = createjs.extend(Video, createjs.Container);

    p.setup = function() {

        loop = this.loop
        lItem = createVideoBitmap(this.Ipath);
        this.addChild(lItem);
        dispatchInstance = this.IdispatchInstance;
        
        lVideo.addEventListener("ended", handlerVideoEnded);

    } ;

    function handlerVideoEnded(event){
        var customEvent = new createjs.Event("videoEnded");
        dispatchInstance.dispatchEvent(customEvent);
    }

    function createVideoBitmap(lVideoPath){

        // lets dynamically add a video element
        lVideo = document.createElement('video');
        // Video element is not visible
        lVideo.style.display = "none";
        // Set the volume and controls
        //lVideo.volume = 0.01;
        lVideo.controls = false;
        // Now set the path to the video
        lVideo.src = lVideoPath;

        // Play the video
        lVideo.play();
        lVideo.loop = loop;
        
        // Now lets create the bitmap
        var swVideoBM = new createjs.Bitmap(lVideo);

        return swVideoBM;
    }

    p.pause = function() {

       console.log("Pause Video")
       lVideo.pause();

    } ;

    p.play = function() {

       console.log("Play Video")
       lVideo.play();

    } ;

     p.kill = function() {

        console.log("Kill Video")
        lVideo.pause();
        this.removeChild(lItem)
        lVideo.removeEventListener("ended", handlerVideoEnded);
        lItem = null;
        lVideo = null;
        loop = null;

    } ;

window.Video = createjs.promote(Video, "Container");
}());