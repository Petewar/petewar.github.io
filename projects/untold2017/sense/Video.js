(function () {

    function Video(Ipath) {

        this.Container_constructor();
        this.Ipath = Ipath
        this.setup();

    }
    
    var lItem = null;
    var lVideo = null;
    var blackAndWhiteFilter;

    var p = createjs.extend(Video, createjs.Container);

    p.setup = function() {

        lItem = createVideoBitmap(this.Ipath);
        this.addChild(lItem);

    } ;

    function createVideoBitmap(lVideoPath){
        // lets dynamically add a video element
        lVideo = document.createElement('video');
        // Video element is not visible
        lVideo.style.display = "none";
        // Set the volume and controls
        lVideo.volume = 0.01;
        lVideo.controls = false;
        // Now set the path to the video
        lVideo.src = lVideoPath;
        // Play the video
        lVideo.play();
        lVideo.loop = true;
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
        lItem = null;
        lVideo = null;

    } ;

window.Video = createjs.promote(Video, "Container");
}());