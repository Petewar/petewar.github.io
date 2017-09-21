(function () {

    function Team(Iratio,IaspectRatio,ImagesTeam,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.imagesTeam = ImagesTeam;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var aspectRatio;
    var imagesTeam;
    var maskWidth;
    var totalWidth;
    var posY;
    
    var offSet;
    var startX;
    var endX;
    var currentPos;
    var oldX;
    var timer;

    var p = createjs.extend(Team, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio
        aspectRatio = this.aspectRatio
        imagesTeam = this.imagesTeam
        posY = this.posY

        addElements();
        addAnimation();
        addDrag();
    };

    function addElements(){

        maskWidth = Math.floor(stage.canvas.width/4);
        totalWidth = maskWidth*imagesTeam.length

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width, 632*ratio);
        bg.y = posY
        instance.addChild(bg);

        var containerTeamImages = new createjs.Container();
        containerTeamImages.name = "containerTeamImages"
        containerTeamImages.y = posY
        instance.addChild(containerTeamImages);

        for(var i=0;i<imagesTeam.length;i++){

            var containerTeamImage = new createjs.Container();
            containerTeamImage.name = "containerTeamImage"+i
            containerTeamImage.x = maskWidth*i
            containerTeamImages.addChild(containerTeamImage);

            imagesTeam[i].regX = imagesTeam[i].getBounds().width/2

            aspectRatio.resize(imagesTeam[i],imagesTeam[i].getBounds().width,imagesTeam[i].getBounds().height,"areaTeam",maskWidth)
            containerTeamImage.addChild(imagesTeam[i]);

            var maskImage = new createjs.Shape();
            maskImage.name = "maskImage"+i
            maskImage.alpha = 0.01;
            maskImage.graphics.beginFill("#ffffff").drawRect(0, 0, maskWidth, 632*ratio);
            containerTeamImage.addChild(maskImage);

            imagesTeam[i].mask = maskImage
        }
    }

    function addDrag(){

        offset = new createjs.Point();
        instance.getChildByName("containerTeamImages").cursor = "move";
        instance.getChildByName("containerTeamImages").addEventListener("mousedown", startDrag);
        
    }

    function startDrag(event) {

        startX = stage.mouseX
        offset.x = Math.floor(stage.mouseX - instance.getChildByName("containerTeamImages").x);
        instance.getChildByName("containerTeamImages").addEventListener("pressmove", doDrag);

    }

    function doDrag(event) {

        endX = stage.mouseX;
        currentPos = Math.floor(event.stageX-offset.x)
        instance.getChildByName("containerTeamImages").addEventListener("pressup", stopDrag);

        TweenMax.to(instance.getChildByName("containerTeamImages"), 0.25, {x:currentPos,ease:Expo.easeOut})

        timer = setTimeout(anim, 150);
        oldX = stage.mouseX;
        frequency = Math.abs(startX-endX);
    }

    function stopDrag(Ianim){

        oldX = undefined;

        instance.getChildByName("containerTeamImages").removeEventListener("mousedown", startDrag);
        instance.getChildByName("containerTeamImages").removeEventListener("pressmove", doDrag);
        instance.getChildByName("containerTeamImages").removeEventListener("pressup", stopDrag);

        addDrag();
        
        if(currentPos>instance.getChildByName("containerTeamImages").x){
            TweenMax.to(instance.getChildByName("containerTeamImages"), 1, {x:(currentPos)+frequency/2*ratio,ease:Expo.easeOut})
        }else{
            TweenMax.to(instance.getChildByName("containerTeamImages"), 1, {x:(currentPos)-frequency/2*ratio,ease:Expo.easeOut})
        }

    }

    function anim(){

        if(instance.getChildByName("containerTeamImages").x>0){
            stopDrag();
            TweenMax.to(instance.getChildByName("containerTeamImages"), 1, {x:0,ease:Expo.easeOut});
        }else{
            if(Math.floor(Math.abs(instance.getChildByName("containerTeamImages").x-stage.canvas.width))>totalWidth){
                stopDrag();
                TweenMax.to(instance.getChildByName("containerTeamImages"), 1, {x:stage.canvas.width-totalWidth,ease:Expo.easeOut});
            }
        }
    }

    function addAnimation(){

    }

    function addHits(){


    }


    p.kill = function() {
        
        if(instance.getChildByName("containerTeamImages").hasEventListener("mousedown", startDrag))instance.getChildByName("containerTeamImages").removeEventListener("mousedown", startDrag);
        if(instance.getChildByName("containerTeamImages").hasEventListener("pressmove", doDrag))instance.getChildByName("containerTeamImages").removeEventListener("pressmove", doDrag);
        if(instance.getChildByName("containerTeamImages").hasEventListener("pressup", stopDrag))instance.getChildByName("containerTeamImages").removeEventListener("pressup", stopDrag);

        for(var i=0;i<imagesTeam.length;i++){

            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).removeChild(imagesTeam[i])
            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).removeChild(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("maskImage"+i))
            instance.getChildByName("containerTeamImages").removeChild(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i))
        }

        instance.removeChild(instance.getChildByName("containerTeamImages"))
        instance.removeChild(instance.getChildByName("bg"))
        
    } ; 

    p.getHeight = function() {

        return 756*ratio;        
    }

    p.resize = function() {

         maskWidth = Math.floor(stage.canvas.width/4);
         totalWidth = maskWidth*imagesTeam.length

         instance.getChildByName("bg").graphics.clear();
         instance.getChildByName("bg").graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width, 632*ratio);

         for(var i=0;i<imagesTeam.length;i++){

            imagesTeam[i].regX = imagesTeam[i].getBounds().width/2
            aspectRatio.resize(imagesTeam[i],imagesTeam[i].getBounds().width,imagesTeam[i].getBounds().height,"areaTeam",maskWidth)

            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).x = maskWidth*i
            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("maskImage"+i).graphics.clear();
            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("maskImage"+i).graphics.beginFill("#ffffff").drawRect(0, 0, maskWidth, 632*ratio);

        }

    } ; 


window.Team = createjs.promote(Team, "Container");
}());