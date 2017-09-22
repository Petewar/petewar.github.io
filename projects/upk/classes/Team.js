(function () {

    function Team(Iratio,IaspectRatio,ImagesTeam,IteamNames,IteamPosition,IshapeDrag,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.imagesTeam = ImagesTeam;
        this.imagesTeam = ImagesTeam;
        this.teamNames = IteamNames;
        this.teamPosition = IteamPosition;
        this.shapeDrag = IshapeDrag;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var aspectRatio;
    var imagesTeam;
    var teamNames;
    var teamPosition;
    var maskWidth;
    var totalWidth;
    var posY;
    
    var offSet;
    var startX;
    var endX;
    var currentPos;
    var oldX;
    var timer;
    var direction;
    var frequency;
    var shapeDrag

    var p = createjs.extend(Team, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio
        aspectRatio = this.aspectRatio
        imagesTeam = this.imagesTeam
        teamNames = this.teamNames
        teamPosition = this.teamPosition
        shapeDrag = this.shapeDrag
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

        shapeDrag.name = "shapeDrag"
        shapeDrag.x = stage.canvas.width/2-88/2*ratio
        shapeDrag.y = posY+632*ratio+55*ratio
        instance.addChild(shapeDrag);

        for(var i=0;i<imagesTeam.length;i++){

            var containerTeamImage = new createjs.Container();
            containerTeamImage.name = "containerTeamImage"+i
            containerTeamImage.x = maskWidth*i
            containerTeamImages.addChild(containerTeamImage);

            imagesTeam[i].regX = imagesTeam[i].getBounds().width/2

            imagesTeam[i].name = "imagesTeam"+i
            aspectRatio.resize(imagesTeam[i],imagesTeam[i].getBounds().width,imagesTeam[i].getBounds().height,"areaTeam",maskWidth)
            containerTeamImage.addChild(imagesTeam[i]);

            var maskImage = new createjs.Shape();
            maskImage.name = "maskImage"+i
            maskImage.alpha = 0.01;
            maskImage.graphics.beginFill("#ffffff").drawRect(0, 0, maskWidth, 632*ratio);
            containerTeamImage.addChild(maskImage);

            imagesTeam[i].mask = maskImage

            var textTeamNAme = new createjs.Text();
            textTeamNAme.name = "textTeamNAme"+i;
            textTeamNAme.font = "24px BwModelica-Bold";
            textTeamNAme.textBaseline = "alphabetic";
            textTeamNAme.color = "#FFFFFF";
            textTeamNAme.lineWidth = 100*ratio
            textTeamNAme.lineHeight = 30;
            textTeamNAme.text = teamNames[i]
            textTeamNAme.scaleX = ratio;
            textTeamNAme.scaleY = ratio;
            textTeamNAme.x = 60*ratio
            textTeamNAme.y = 632*ratio-170*ratio
            containerTeamImage.addChild(textTeamNAme);

            var stroke = new createjs.Shape();
            stroke.name = "stroke"+i
            stroke.graphics.beginFill("#ffffff").drawRect(0, 0, textTeamNAme.getBounds().width*ratio, 4*ratio);
            stroke.x = 60*ratio
            stroke.y = 632*ratio-140*ratio+25*ratio
            containerTeamImage.addChild(stroke);

            var textPositionName = new createjs.Text();
            textPositionName.name = "textPositionName"+i;
            textPositionName.font = "14px BwModelica-Regular";
            textPositionName.textBaseline = "alphabetic";
            textPositionName.color = "#FFFFFF";
            textPositionName.text = teamPosition[i]
            textPositionName.scaleX = ratio;
            textPositionName.scaleY = ratio;
            textPositionName.x = 60*ratio
            textPositionName.y = 632*ratio-140*ratio+25*ratio+textPositionName.getBounds().height*ratio+25*ratio
            containerTeamImage.addChild(textPositionName);

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

        if (stage.mouseX < oldX)direction = 0 
        if (stage.mouseX > oldX) direction = 1

        instance.getChildByName("containerTeamImages").x = currentPos;

        if(instance.getChildByName("containerTeamImages").x>0)instance.getChildByName("containerTeamImages").x=0
        if(Math.floor(Math.abs(instance.getChildByName("containerTeamImages").x-stage.canvas.width))>totalWidth)instance.getChildByName("containerTeamImages").x = stage.canvas.width-totalWidth

        timer = setTimeout(anim, 150);
        oldX = stage.mouseX;
        frequency = Math.abs(startX-endX);
        
    }

    function stopDrag(Ianim){

        //Easing Speed
        /*if((instance.getChildByName("containerTeamImages").x<0)&&(Math.floor(Math.abs(instance.getChildByName("containerTeamImages").x-stage.canvas.width))<totalWidth)){
            if(direction == 1)TweenMax.to(instance.getChildByName("containerTeamImages"),0.5, {x:(currentPos)+frequency*ratio})
            if(direction == 0)TweenMax.to(instance.getChildByName("containerTeamImages"), 0.5, {x:(currentPos)-frequency*ratio})
        }*/

        //Reset Images Anim
        for(var i=0;i<imagesTeam.length;i++){
            TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("imagesTeam"+i), 0.5, {x:0,ease:Expo.easeOut})
            TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("textTeamNAme"+i), 0.5, {x:60*ratio,ease:Expo.easeOut})
            TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("stroke"+i), 0.5, {x:60*ratio,ease:Expo.easeOut})
            TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("textPositionName"+i), 0.5, {x:60*ratio,ease:Expo.easeOut})
        }

        direction = undefined;
        oldX = undefined;

        instance.getChildByName("containerTeamImages").removeEventListener("mousedown", startDrag);
        instance.getChildByName("containerTeamImages").removeEventListener("pressmove", doDrag);
        instance.getChildByName("containerTeamImages").removeEventListener("pressup", stopDrag);

        addDrag();

    }

    function anim(){

        //Reset
        if(instance.getChildByName("containerTeamImages").x>0)TweenMax.to(instance.getChildByName("containerTeamImages"), 1, {x:0,ease:Expo.easeInOut})
        if(Math.floor(Math.abs(instance.getChildByName("containerTeamImages").x-stage.canvas.width))>totalWidth)TweenMax.to(instance.getChildByName("containerTeamImages"), 1, {x:stage.canvas.width-totalWidth,ease:Expo.easeInOut})

        //Images Anim
        for(var i=0;i<imagesTeam.length;i++){
            if(direction == 0)TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("imagesTeam"+i),0.5*(i+0.5), {x:50*ratio,ease:Expo.easeOut})   
            if(direction == 1)TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("imagesTeam"+i), 0.5*(i+0.5), {x:-50*ratio,ease:Expo.easeOut})

            if(direction == 0)TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("textTeamNAme"+i),0.5*(i+0.5), {x:70*ratio,ease:Expo.easeOut})   
            if(direction == 1)TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("textTeamNAme"+i), 0.5*(i+0.5), {x:50*ratio,ease:Expo.easeOut})

            if(direction == 0)TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("stroke"+i),0.5*(i+0.5), {x:80*ratio,ease:Expo.easeOut})   
            if(direction == 1)TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("stroke"+i), 0.5*(i+0.5), {x:40*ratio,ease:Expo.easeOut}) 

            if(direction == 0)TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("textPositionName"+i),0.5*(i+0.5), {x:90*ratio,ease:Expo.easeOut})   
            if(direction == 1)TweenMax.to(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("textPositionName"+i), 0.5*(i+0.5), {x:30*ratio,ease:Expo.easeOut}) 
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

            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).removeChild(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("maskImage"+i))
            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).removeChild(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("imagesTeam"+i))
            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).removeChild(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("textTeamNAme"+i))
            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).removeChild(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("stroke"+i))
            instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).removeChild(instance.getChildByName("containerTeamImages").getChildByName("containerTeamImage"+i).getChildByName("textPositionName"+i))
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

         instance.getChildByName("shapeDrag").x = stage.canvas.width/2-88/2*ratio

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