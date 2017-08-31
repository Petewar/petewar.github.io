(function () {

    function Video(Ipath,Instance,Iloop) {

        this.Container_constructor();
        this.Ipath = Ipath;
        this.Instance = Instance;
        this.Iloop = Iloop;
        this.setup();

    }
    
    var lItem = null;
    var lVideo = null;
    var blackAndWhiteFilter;
    var instanceDispatch;
    var loopState;
    var iPath;

    var p = createjs.extend(Video, createjs.Container);

    p.setup = function() {

        instanceDispatch = this.Instance;
        loopState = this.Iloop;
        iPath = this.Ipath

        if(loopState==undefined) loopState =true;
        else loopState = false;
        
        if(iPath!=""){
            lItem = createVideoBitmap(this.Ipath);
            lItem.alpha = 0;
            createjs.Tween.get(lItem).to({alpha:1}, 200, createjs.Ease.linear)
            this.addChild(lItem);
        }

    } ;

    function createVideoBitmap(lVideoPath){
        // lets dynamically add a video element
        lVideo = document.createElement('video');
        lVideo.addEventListener("ended", onendedVideo);

        // Video element is not visible
        lVideo.style.display = "none";
        // Set the volume and controls
        //lVideo.volume = 1;
        lVideo.controls = false;
        // Now set the path to the video
        lVideo.src = lVideoPath;
        // Play the video
        lVideo.play();
        lVideo.loop = loopState;
        // Now lets create the bitmap
        var swVideoBM = new createjs.Bitmap(lVideo);

        return swVideoBM;
    }

    function onendedVideo(event){
        var customEvent = new createjs.Event("end");
        customEvent.state = "end";
        instanceDispatch.dispatchEvent(customEvent);
    }

    p.pause = function() {

       console.log("Pause Video")
       if(iPath!="")lVideo.pause();

    } ;

    p.play = function() {

       console.log("Play Video")
       if(iPath!="")lVideo.play();

    } ;

     p.kill = function() {

        console.log("Kill Video")
        if(iPath!=""){
            lVideo.pause();
            this.removeChild(lItem)
            lItem = null;
            lVideo = null;
        }
    } ;

window.Video = createjs.promote(Video, "Container");
}());