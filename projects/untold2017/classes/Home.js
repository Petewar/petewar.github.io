(function () {

    function Home(IdispatchInstance,Iratio,Imargin,ItweenTime,IaspectRatio,IvideoImage,IvideoMovie,Ititle,Isubtitle,IworkTitle) {

        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.videoImage = IvideoImage;
        this.videoMovie = IvideoMovie;
        this.title = Ititle;
        this.subtitle = Isubtitle;
        this.workTitle = IworkTitle;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.setup();

    }
    
    var instance;
    var aspectRatio;
    var ratio;
    var dispatchInstance;

    //clock
    var today;
    var hours;
    var minutes;
    var seconds;
    var timer;

    //elements
    var titleTxt;
    var subtitleTxt;
    var workTitleTxt;
    var triangle;
    var gradientSquareTop;
    var squareBottom;
    var currentHourTxt;
    var currentMinutesTxt;
    var currentSecondsTxt;
    var currentTimeContainer;
    var squareTopHours;
    var squareBottomHours;
    var squareTopMinutes;
    var squareBottomMinutes;
    var maskVideo;
    
    //source
    var containerVideo;
    var videoImage;
    var videoMovie;
    var title;
    var subtitle;
    var workTitle;

    //props
    var count = 0;
    var totalrand = 50;
    var marginClock = 50;
    var margin;
    var tweenTime;
    var randValue;
    var tiltTimer;
    var totalWidth;
    var totalHeight;
    var parallax;
    
    //sense library
    var video;

    var p = createjs.extend(Home, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        videoImage = this.videoImage;
        videoMovie = this.videoMovie;
        title = this.title;
        subtitle = this.subtitle;
        workTitle = this.workTitle;
        margin = this.margin;
        tweenTime = this.tweenTime;

        //elements
        addFullVideo();
        addAnimationFullVideo();

    };
    
    function addFullVideo(){
        
        console.log("Play Video: "+videoMovie);

        containerVideo = new createjs.Container();
        instance.addChild(containerVideo);
        videoImage.regX = 1600/2;
        videoImage.regY = 1000/2;
        containerVideo.addChild(videoImage);

        video = new Video(videoMovie);
        containerVideo.addChild(video);
        video.regX = 1600/2;
        video.regY = 1000/2;
        aspectRatio.resize(containerVideo,1600,1000,"more",100*ratio);

        maskVideo = new createjs.Shape();
        maskVideo.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        containerVideo.x = stage.canvas.width/2;    
        containerVideo.y = stage.canvas.height/2;

        containerVideo.mask = maskVideo
    }

    function addAnimationFullVideo(){

        TweenMax.from(containerVideo, tweenTime/2, {alpha:0,ease:Expo.easeInOut,onComplete:dispatchAnimationEnd})

    }

    function dispatchAnimationEnd(){

        var customEvent = new createjs.Event("videoInit");
        dispatchInstance.dispatchEvent(customEvent);

    }

    p.addTime = function() {

        addElements();
        addAnimationElements();

    }

    function addElements(){

        currentTimeContainer = new createjs.Container();
        instance.addChild(currentTimeContainer);

        //Hours
        currentHourTxt = new createjs.Text();
        currentHourTxt.font = "300px BebasNeueBold";
        currentHourTxt.textBaseline = "alphabetic";
        currentHourTxt.compositeOperation = "overlay";
        currentHourTxt.color = "#ffffff";
        currentHourTxt.text = "00"
        currentHourTxt.scaleX = ratio;
        currentHourTxt.scaleY = ratio;
        currentTimeContainer.addChild(currentHourTxt);

        //Minutes
        currentMinutesTxt = new createjs.Text();
        currentMinutesTxt.font = "300px BebasNeueBold";
        currentMinutesTxt.textBaseline = "alphabetic";
        currentMinutesTxt.color = "#ffffff";
        currentMinutesTxt.text = "00"
        currentMinutesTxt.compositeOperation = "overlay";
        currentMinutesTxt.scaleX = ratio;
        currentMinutesTxt.scaleY = ratio;
        currentTimeContainer.addChild(currentMinutesTxt);

        //Seconds
        currentSecondsTxt = new createjs.Text();
        currentSecondsTxt.compositeOperation = "overlay";
        currentSecondsTxt.textBaseline = "alphabetic";
        currentSecondsTxt.font = "300px BebasNeueBold";
        currentSecondsTxt.color = "#ffffff";
        currentSecondsTxt.text = "00"
        currentSecondsTxt.scaleX = ratio;
        currentSecondsTxt.scaleY = ratio;
        currentTimeContainer.addChild(currentSecondsTxt);

        var ooWidth = currentHourTxt.getBounds().width*ratio
        var ooHeight = currentHourTxt.getBounds().height*ratio

        var topSquare = ((currentHourTxt.y-ooHeight-18*ratio)-((currentHourTxt.y-ooHeight-18*ratio)/2)-15*ratio)-30*ratio;
        var bottomSquare = ((currentHourTxt.y-ooHeight-18*ratio)-((currentHourTxt.y-ooHeight-18*ratio)/2)-15*ratio)+30*ratio;
        
        //squareTopHours
        squareTopHours = new createjs.Shape();
        squareTopHours.compositeOperation = "overlay";
        squareTopHours.graphics.beginFill("#FFFFFF").drawRect(0, 0, 30*ratio, 30*ratio);
        squareTopHours.x = currentHourTxt.x+ooWidth-9*ratio+marginClock*ratio
        squareTopHours.y = topSquare
        currentTimeContainer.addChild(squareTopHours);

        squareBottomHours = new createjs.Shape();
        squareBottomHours.compositeOperation = "overlay";
        squareBottomHours.graphics.beginFill("#FFFFFF").drawRect(0, 0, 30*ratio, 30*ratio);
        squareBottomHours.x = currentHourTxt.x+ooWidth-9*ratio+marginClock*ratio
        squareBottomHours.y = bottomSquare
        currentTimeContainer.addChild(squareBottomHours);

        //currentMinutesTxt
        currentMinutesTxt.x = squareBottomHours.x+30*ratio-9*ratio+marginClock*ratio;
        currentMinutesTxt.y = currentHourTxt.y

        //squareTopMinutes
        squareTopMinutes = new createjs.Shape();
        squareTopMinutes.compositeOperation = "overlay";
        squareTopMinutes.graphics.beginFill("#FFFFFF").drawRect(0, 0, 30*ratio, 30*ratio);
        squareTopMinutes.x = currentMinutesTxt.x+ooWidth-9*ratio+50*ratio
        squareTopMinutes.y = topSquare
        currentTimeContainer.addChild(squareTopMinutes);

        squareBottomMinutes = new createjs.Shape();
        squareBottomMinutes.compositeOperation = "overlay";
        squareBottomMinutes.graphics.beginFill("#FFFFFF").drawRect(0, 0, 30*ratio, 30*ratio);
        squareBottomMinutes.x = currentMinutesTxt.x+ooWidth-9*ratio+50*ratio
        squareBottomMinutes.y = bottomSquare
        currentTimeContainer.addChild(squareBottomMinutes);

        //currentMinutesTxt
        currentSecondsTxt.x = squareBottomMinutes.x+30*ratio-9*ratio+marginClock*ratio;
        currentSecondsTxt.y = currentHourTxt.y

        totalWidth = currentSecondsTxt.x + ooWidth;
        totalHeight = ooHeight;

        currentTimeContainer.x = stage.canvas.width/2-totalWidth/2
        currentTimeContainer.y = stage.canvas.height/2+totalHeight/2

        //create current time text box
        titleTxt = new createjs.Text();
        titleTxt.textBaseline = "alphabetic";
        titleTxt.font = "30px BebasNeueLight";
        titleTxt.color = "#ffffff";
        titleTxt.text = title;
        titleTxt.scaleX = ratio;
        titleTxt.scaleY = ratio;
        instance.addChild(titleTxt);

        titleTxtSquare = new createjs.Shape();
        titleTxtSquare.compositeOperation = "overlay";
        titleTxtSquare.graphics.beginFill("#FFFFFF").drawRect(0, 0, titleTxt.getBounds().width*ratio+20*ratio, titleTxt.getBounds().height*ratio+5*ratio+20*ratio);
        //titleTxtSquare.alpha = 0.5
        instance.addChild(titleTxtSquare);

        //create current time text box
        subtitleTxt = new createjs.Text();
        subtitleTxt.textBaseline = "alphabetic";
        subtitleTxt.font = "30px BebasNeueLight ";
        subtitleTxt.color = "#ffffff";
        subtitleTxt.text = subtitle;
        subtitleTxt.scaleX = ratio;
        subtitleTxt.scaleY = ratio;
        instance.addChild(subtitleTxt);

        subtitleTxtSquare = new createjs.Shape();
        subtitleTxtSquare.compositeOperation = "overlay";
        subtitleTxtSquare.graphics.beginFill("#FFFFFF").drawRect(0, 0, subtitleTxt.getBounds().width*ratio+20*ratio, subtitleTxt.getBounds().height*ratio+5*ratio+20*ratio);
        instance.addChild(subtitleTxtSquare);

        //create current time text box
        workTitleTxt = new createjs.Text();
        workTitleTxt.textBaseline = "alphabetic";
        workTitleTxt.font = "14px BebasNeueLight ";
        workTitleTxt.color = "#ffffff";
        workTitleTxt.text = workTitle;
        workTitleTxt.alpha = 0.5
        workTitleTxt.scaleX = ratio;
        workTitleTxt.scaleY = ratio;
        instance.addChild(workTitleTxt);

        workTitleTxt.x = Math.floor(stage.canvas.width-workTitleTxt.getBounds().width*ratio-margin*ratio)-10*ratio;
        workTitleTxt.y = Math.floor(stage.canvas.height/2)+5*ratio;

        //gradient stroke top
        gradientSquareTop = new createjs.Shape();
        gradientSquareTop.graphics.beginLinearGradientFill(["#FFFFFF", "rgba(0, 0, 0, 0)"], [0, 1], 0, 0, 300*ratio, 1*ratio);
        gradientSquareTop.graphics.drawRect(0, 0, 300*ratio, 1*ratio);
        gradientSquareTop.alpha = 0.5
        gradientSquareTop.y = Math.floor(stage.canvas.height/2);
        instance.addChild(gradientSquareTop);

        //stroke bottom
        squareBottom = new createjs.Shape();
        squareBottom.graphics.beginFill("#FFFFFF").drawRect(0, 0, margin*ratio, 1*ratio);
        squareBottom.regX = margin*ratio
        squareBottom.alpha = 0.5;
        squareBottom.x = Math.floor(stage.canvas.width);
        squareBottom.y = stage.canvas.height/2
        instance.addChild(squareBottom);

        titleTxt.x = Math.floor(stage.canvas.width/2-titleTxt.getBounds().width/2*ratio);
        titleTxt.y = Math.floor(currentTimeContainer.y-totalHeight-18*ratio-marginClock*ratio)

        titleTxtSquare.x = titleTxt.x-10*ratio
        titleTxtSquare.y = titleTxt.y-titleTxt.getBounds().height*ratio-5*ratio-10*ratio

        subtitleTxt.x = Math.floor(stage.canvas.width/2-subtitleTxt.getBounds().width/2*ratio);
        subtitleTxt.y = Math.floor(currentTimeContainer.y+subtitleTxt.getBounds().height*ratio+5*ratio+marginClock*ratio)

        subtitleTxtSquare.x = subtitleTxt.x-10*ratio
        subtitleTxtSquare.y = subtitleTxt.y-subtitleTxt.getBounds().height*ratio-5*ratio-10*ratio
        
        TweenMax.from(currentTimeContainer, tweenTime*4, {alpha:0,ease:Expo.easeInOut})
    }

    p.reveal = function() {

        TweenMax.to(containerVideo, tweenTime/2, {x:stage.canvas.width/2+50*ratio,ease:Expo.easeInOut});
        TweenMax.to(workTitleTxt, tweenTime/2, {x:Math.floor(stage.canvas.width-workTitleTxt.getBounds().width*ratio-margin*ratio),alpha:1,ease:Expo.easeInOut})
        TweenMax.to(squareBottom, tweenTime/4, {scaleX:0.7,alpha:1,ease:Expo.easeInOut})
        
    }

    p.reset = function() {
       
       TweenMax.to(containerVideo, tweenTime/2, {x:stage.canvas.width/2,ease:Expo.easeInOut})
       TweenMax.to(workTitleTxt, tweenTime/2, {x:Math.floor(stage.canvas.width-workTitleTxt.getBounds().width*ratio-margin*ratio)-10*ratio,alpha:0.5,ease:Expo.easeInOut})
       TweenMax.to(squareBottom, tweenTime/4, {scaleX:1,alpha:0.5,ease:Expo.easeInOut})


    }

    p.pauseVideo = function(){
        video.pause();
    }
    
    p.playVideo = function(){
        video.play();
    }

    function addAnimationElements(){
        
        TweenMax.from(gradientSquareTop, tweenTime, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(squareBottom, tweenTime, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(workTitleTxt, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeOut})

        titleTxt.alpha = 0
        subtitleTxt.alpha = 0

        TweenMax.from(titleTxtSquare, tweenTime, {scaleX:0,delay:tweenTime/2,ease:Expo.easeInOut,onComplete:endAnimationTitleElements})
        TweenMax.from(subtitleTxtSquare, tweenTime, {scaleX:0,delay:tweenTime*1.5,ease:Expo.easeInOut,onComplete:endAnimationSubtitleElements})

        timer = setTimeout(addCurrentTime, 1800);
    }

    function endAnimationTitleElements(){

        titleTxtSquare.regX = titleTxt.getBounds().width*ratio;
        titleTxtSquare.x = titleTxt.x-10*ratio+titleTxt.getBounds().width*ratio
        TweenMax.to(titleTxtSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(titleTxt, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
        
    }

    function endAnimationSubtitleElements(){

        subtitleTxtSquare.regX = subtitleTxt.getBounds().width*ratio;
        subtitleTxtSquare.x = subtitleTxt.x-10*ratio+subtitleTxt.getBounds().width*ratio;
        TweenMax.to(subtitleTxtSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(subtitleTxt, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut,onComplete:endAnimationElementsClean})
        
    }

    function endAnimationElementsClean(){
        
        instance.removeChild(titleTxtSquare);
        instance.removeChild(subtitleTxtSquare);
    }

    function addCurrentTime(){

        today = new Date();
        hours = addZero(today.getHours());
        minutes = addZero(today.getMinutes());
        seconds = addZero(today.getSeconds());

        //create current time text box
        if(count==0){

            animateValue(currentHourTxt,0,hours,750);
            animateValue(currentMinutesTxt,0,minutes,750);
            animateValue(currentSecondsTxt,0,seconds,750);

            count++

        }else if(count>0){
            currentHourTxt.text = hours;
            currentMinutesTxt.text = minutes;
            currentSecondsTxt.text = seconds;
            timer = setTimeout(addCurrentTime, 500);           
        }
    }

    function startTiltAnimation(){
        tiltTimer = setTimeout(tiltAnimationCurrentTime, 2000);
    }

    function tiltAnimationCurrentTime(){
        
        randValue = Math.floor((Math.random() * totalrand) + 1);

        currentTimeContainer.alpha = 0;

        if(randValue>totalrand/2) {
            TweenLite.to(currentTimeContainer, tweenTime/6, { ease: RoughEase.ease.config({ template:  Expo.easeInOut, strength: 2, points: 100, randomize:  false, clamp: true}),alpha:1, y:Math.floor(stage.canvas.height/2)-(randValue)*ratio, x:Math.floor(stage.canvas.width/2)+(randValue)*ratio,onComplete:tiltAnimationTitleAndSubtitle });
        }else {
            TweenLite.to(currentTimeContainer, tweenTime/6, { ease: RoughEase.ease.config({ template:  Expo.easeInOut, strength: 2, points: 100, randomize:  false, clamp: true}),alpha:1, y:Math.floor(stage.canvas.height/2)+(randValue)*ratio, x:Math.floor(stage.canvas.width/2)-(randValue)*ratio,onComplete:tiltAnimationTitleAndSubtitle });
        }
    }

    function tiltAnimationTitleAndSubtitle(){

        randValue = Math.floor((Math.random() * totalrand) + 1);

        titleTxt.alpha = 0;
        subtitleTxt.alpha = 0;

        if(randValue>totalrand/2) {
            TweenLite.to(titleTxt, tweenTime/6, { ease: RoughEase.ease.config({ template:  Expo.easeInOut, strength: 2, points: 100, randomize:  false, clamp: true}),alpha:1, y: Math.floor(currentTimeContainer.y-currentTimeContainerHeight/2-margin*ratio)+(randValue)*ratio, x: Math.floor(stage.canvas.width/2)-(randValue)*ratio });
        }else {
            TweenLite.to(titleTxt, tweenTime/6, { ease: RoughEase.ease.config({ template:  Expo.easeInOut, strength: 2, points: 100, randomize:  false, clamp: true}),alpha:1, y: Math.floor(currentTimeContainer.y-currentTimeContainerHeight/2-margin*ratio)-(randValue)*ratio, x: Math.floor(stage.canvas.width/2)+(randValue)*ratio});
        }

        if(randValue>totalrand/2) {
            TweenLite.to(subtitleTxt, tweenTime/6, { ease: RoughEase.ease.config({ template:  Expo.easeInOut, strength: 2, points: 100, randomize:  false, clamp: true}),alpha:1, y: Math.floor(currentTimeContainer.y+(subtitleTxt.getBounds().height*2)*ratio+currentTimeContainerHeight/2+8*ratio+margin*ratio)+(randValue)*ratio, x: Math.floor(stage.canvas.width/2)-(randValue)*ratio,onComplete:restartTitleTimer });
        }else {
            TweenLite.to(subtitleTxt, tweenTime/6, { ease: RoughEase.ease.config({ template:  Expo.easeInOut, strength: 2, points: 100, randomize:  false, clamp: true}),alpha:1, y: Math.floor(currentTimeContainer.y+(subtitleTxt.getBounds().height*2)*ratio+currentTimeContainerHeight/2+8*ratio+margin*ratio)-(randValue)*ratio, x: Math.floor(stage.canvas.width/2)+(randValue)*ratio,onComplete:restartTitleTimer });
        }

        currentTimeContainer.regX = Math.floor(currentTimeContainerWidth/2);
        currentTimeContainer.regY = Math.floor(currentTimeContainerHeight/2);
        currentTimeContainer.x = Math.floor(stage.canvas.width/2);
        currentTimeContainer.y = Math.floor(stage.canvas.height/2);

    }

    function restartTitleTimer(){

        titleTxt.regX = titleTxt.getBounds().width/2
        titleTxt.regY = titleTxt.getBounds().height/2
        titleTxt.x = Math.floor(stage.canvas.width/2);
        titleTxt.y = Math.floor(currentTimeContainer.y-currentTimeContainerHeight/2-margin*ratio)

        subtitleTxt.regX = subtitleTxt.getBounds().width/2
        subtitleTxt.regY = subtitleTxt.getBounds().height/2
        subtitleTxt.x = Math.floor(stage.canvas.width/2);
        subtitleTxt.y = Math.floor(currentTimeContainer.y+(subtitleTxt.getBounds().height*2)*ratio+currentTimeContainerHeight/2+8*ratio+margin*ratio);
        
        tiltTimer = setTimeout(tiltAnimationCurrentTime, 5000);
    }

    function animateValue(id, start, end, duration) {
       
        var range = end - start;
        var current = start;
        var increment = end > start? 1 : 1;
        var stepTime = Math.abs(duration / range);
        var obj = id;
        var timerAnimation = setInterval(function() {
            current += increment;
            if(current<10){
                obj.text = "";
                obj.text = "0"+current;
            }else{
                obj.text = "";
                obj.text = current;
            }
            if (current >= end) {
                addCurrentTime();
                clearInterval(timerAnimation);
            }
        }, stepTime);
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    p.resize = function() {

        if(currentTimeContainer){
            currentTimeContainer.x = stage.canvas.width/2-totalWidth/2
            currentTimeContainer.y = stage.canvas.height/2+totalHeight/2
        }

        if(containerVideo){
            containerVideo.x = stage.canvas.width/2;    
            containerVideo.y = stage.canvas.height/2;
            aspectRatio.resize(containerVideo,1600,1000,"more",100*ratio);
        }

        if(titleTxt){
           titleTxt.x = Math.floor(stage.canvas.width/2-titleTxt.getBounds().width/2*ratio);
            titleTxt.y = Math.floor(currentTimeContainer.y-totalHeight-18*ratio-marginClock*ratio)
        }

        if(subtitleTxt){
           subtitleTxt.x = Math.floor(stage.canvas.width/2-subtitleTxt.getBounds().width/2*ratio);
            subtitleTxt.y = Math.floor(currentTimeContainer.y+subtitleTxt.getBounds().height*ratio+5*ratio+marginClock*ratio)

        }

        if(workTitleTxt){
          workTitleTxt.x = Math.floor(stage.canvas.width-workTitleTxt.getBounds().width*ratio-margin*ratio)-10*ratio;
         workTitleTxt.y = Math.floor(stage.canvas.height/2)+5*ratio;
        }

        if(squareBottom){
            squareBottom.x = Math.floor(stage.canvas.width);
            squareBottom.y = stage.canvas.height/2
        }

        if(gradientSquareTop){
            gradientSquareTop.y = Math.floor(stage.canvas.height/2);
        }


        if(maskVideo){
            maskVideo.graphics.clear();
            maskVideo.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

    } ;  

window.Home = createjs.promote(Home, "Container");
}());