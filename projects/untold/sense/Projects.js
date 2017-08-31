(function () {

    function Projects(Iratio,Ithumbs,IthumbsInfo,IaspectRatio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.thumbs = Ithumbs;
        this.IthumbsInfo = IthumbsInfo;
        this.aspectRatio = IaspectRatio;
        this.setup();
    }
    
    var ratio;
    var instance;
    var thumbs;
    var lengthThumbs;
    var aspectRatio;
    var IthumbsInfo;
    var margin = 200;
    var bg;
    var nav=0;
    var currentX;
    var currentMaskWidth;
    var currentMaskHeight;
    var marginThumbs = 100

    var p = createjs.extend(Projects, createjs.Container);

    p.setup = function() {

        console.log("Projects")
        instance = this;
        ratio = this.ratio;
        thumbs = this.thumbs.slice(1,this.thumbs.length)
        lengthThumbs = thumbs.length;
        aspectRatio = this.aspectRatio;
        IthumbsInfo = this.IthumbsInfo;
    } ;

    p.killProjects = function() {

        console.log("Kill Projects");

        for(var i=0;i<lengthThumbs;i++){

            instance.getChildByName("hitProject"+i).removeEventListener("mouseover", projectOver);
            instance.getChildByName("hitProject"+i).removeEventListener("mouseout", projectOut);
            instance.getChildByName("hitProject"+i).removeEventListener("click", projectClick);
            if(i==0)instance.getChildByName("projectThumb"+i).visible=false;
            instance.getChildByName("hitProject"+i).visible=false;

            createjs.Tween.get(instance.getChildByName("maskProject"+i))
                .to({scaleX:0,scaleY:0}, 400, createjs.Ease.circInOut)
                 .call(function(){

                    for(var f=0;f<lengthThumbs;f++){
                        instance.removeChild(instance.getChildByName("projectThumb"+f));
                        instance.removeChild(instance.getChildByName("maskProject"+f));
                        instance.removeChild(instance.getChildByName("projectTitle"+f));
                        instance.removeChild(instance.getChildByName("rectangle"+f));
                        instance.removeChild(instance.getChildByName("projectName"+f));
                        instance.removeChild(instance.getChildByName("projectClient"+f));
                        instance.removeChild(instance.getChildByName("hitProject"+f));
                    }
                });

            createjs.Tween.get(instance.getChildByName("projectThumb"+i))
                .to({alpha:0}, 400, createjs.Ease.Linear)
               
        }

       nav = 0

    }

    p.createProjects = function() {

            console.log("Create Projects",lengthThumbs);

            for(var i=0;i<lengthThumbs;i++){

                var containerProject = new createjs.Container();
                containerProject.name = "projectThumb"+i
                aspectRatio.resize(thumbs[i],1600,1000);

                containerProject.regX = stage.canvas.width/2
                containerProject.regY = stage.canvas.height/2

                var maskProject = new createjs.Shape();
                maskProject.name = "maskProject"+i;
                maskProject.graphics.drawRect(0, 0, stage.canvas.width,stage.canvas.height);
                containerProject.mask = maskProject;

                maskProject.regX = stage.canvas.width/2
                maskProject.regY = stage.canvas.height/2

                var hitProject = new createjs.Shape();
                hitProject.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width,stage.canvas.height);

                hitProject.regX = stage.canvas.width/2
                hitProject.regY = stage.canvas.height/2
                
                containerProject.addChild(thumbs[i]);

                var titleProject = new createjs.Text();
                titleProject.name = "projectTitle"+i;
                titleProject.font = "bold 26px Montserrat";
                titleProject.color = "#FFFFFF";  
                titleProject.scaleX = ratio;
                titleProject.scaleY = ratio;
                titleProject.textBaseline = "alphabetic";
                titleProject.text = IthumbsInfo[i];

                var rectangle = new createjs.Shape();
                rectangle.name = "rectangle"+i;
                rectangle.graphics.beginFill("#FFFFFF").drawRect(0, 0, 25*ratio,1*ratio);
       
                var projectNumber = new createjs.Text();
                projectNumber.name = "projectName"+i;
                projectNumber.font = "36px Abril Fatface";
                projectNumber.color = "#FFFFFF";    
                projectNumber.scaleX = ratio;
                projectNumber.scaleY = ratio;
                projectNumber.textBaseline = "alphabetic";
                var currentNum = i+1
                projectNumber.text = "00"+currentNum;
                
                var projectClient = new createjs.Text();
                projectClient.name = "projectClient"+i;
                projectClient.font = "12px Abril Fatface";
                projectClient.color = "#FFFFFF";    
                projectClient.scaleX = ratio;
                projectClient.scaleY = ratio;
                projectClient.textBaseline = "alphabetic";
                projectClient.text = "CLIENT";
                
                instance.addChild(containerProject);
                instance.addChild(maskProject);
                instance.addChild(titleProject);
                instance.addChild(rectangle);
                instance.addChild(projectNumber);
                instance.addChild(projectClient);
                instance.addChild(hitProject);
                
                currentMaskWidth = (30*stage.canvas.width)/100
                currentMaskHeight = (30*stage.canvas.height)/100

                containerProject.x = (i)*(currentMaskWidth+marginThumbs*ratio)
                maskProject.x = (i)*(currentMaskWidth+marginThumbs*ratio)
                hitProject.x = (i)*(currentMaskWidth+marginThumbs*ratio) 

                containerProject.scaleX = 0.38
                containerProject.scaleY = 0.38
                createjs.Tween.get(containerProject)
                .to({scaleX:0.3,scaleY:0.3}, (i+1)*700, createjs.Ease.circInOut)

                createjs.Tween.get(containerProject)
                .wait(500)
                .to({alpha:0.25}, 200, createjs.Ease.Linear)
                .call(function(){

                    for(var f=0;f<lengthThumbs;f++){
                        instance.getChildByName("hitProject"+f).visible=true
                    }

                });
                

                hitProject.alpha = 0.01
                hitProject.scaleX = 0.3
                hitProject.scaleY = 0.3
                
                maskProject.scaleX = 0;
                maskProject.scaleY = 0;
                createjs.Tween.get(maskProject)
                .to({scaleX:0.3,scaleY:0.3}, (i+1)*400, createjs.Ease.circInOut)

                rectangle.x = (i)*(currentMaskWidth+marginThumbs*ratio)-currentMaskWidth/2
                rectangle.y = currentMaskHeight/2+25*ratio
                rectangle.alpha = 0.25;

                titleProject.x = (i)*(currentMaskWidth+marginThumbs*ratio)-currentMaskWidth/2+35*ratio
                titleProject.y = currentMaskHeight/2+20*ratio+50*ratio
                titleProject.alpha = 0.25;
                
                projectNumber.x = (i)*(currentMaskWidth+marginThumbs*ratio)-currentMaskWidth/2+18*ratio
                projectNumber.y = -currentMaskHeight/2-20*ratio
                projectNumber.alpha = 0.25;

                projectClient.x = (i)*(currentMaskWidth+marginThumbs*ratio)-currentMaskWidth/2+35*ratio
                projectClient.y = currentMaskHeight/2+30*ratio
                projectClient.alpha = 0.25;

                hitProject.visible = false;
                hitProject.cursor = "pointer";
                hitProject.instanceRef = i
                hitProject.name = "hitProject"+i
                hitProject.addEventListener("mouseover", projectOver);
                hitProject.addEventListener("mouseout", projectOut);
                hitProject.addEventListener("click", projectClick);
            }


    }

    p.getProjectTotalWidth = function() {
        return ((currentMaskWidth)*(lengthThumbs)+(marginThumbs*ratio)*(lengthThumbs))+stage.canvas.width/2+currentMaskWidth/2
     }

     p.getProjectWidth = function() {
        return currentMaskWidth
     }

     p.getMarginWidth = function() {
        return marginThumbs*ratio
     }
     
     p.getProjectHeight = function() {
        return currentProjectHeight
     }

    function projectOver(event){

        createjs.Tween.get(instance.getChildByName("projectTitle"+event.target.instanceRef))
        .to({alpha:1}, 200, createjs.Ease.Linear)

        createjs.Tween.get(instance.getChildByName("rectangle"+event.target.instanceRef))
        .to({alpha:1}, 200, createjs.Ease.Linear)

        createjs.Tween.get(instance.getChildByName("projectName"+event.target.instanceRef))
        .to({alpha:1}, 200, createjs.Ease.Linear)

        createjs.Tween.get(instance.getChildByName("projectClient"+event.target.instanceRef))
        .to({alpha:1}, 200, createjs.Ease.Linear)

        createjs.Tween.get(instance.getChildByName("maskProject"+event.target.instanceRef))
        .to({scaleX:0.28,scaleY:0.28}, 300, createjs.Ease.circInOut)

        createjs.Tween.get(instance.getChildByName("projectThumb"+event.target.instanceRef))
        .to({scaleX:0.38,scaleY:0.38,alpha:1}, 300, createjs.Ease.circInOut)
    }

    function projectOut(event){
       
      createjs.Tween.get(instance.getChildByName("projectTitle"+event.target.instanceRef))
        .to({alpha:0.25}, 200, createjs.Ease.Linear)

        createjs.Tween.get(instance.getChildByName("rectangle"+event.target.instanceRef))
        .to({alpha:0.25}, 200, createjs.Ease.Linear)

        createjs.Tween.get(instance.getChildByName("projectName"+event.target.instanceRef))
        .to({alpha:0.25}, 200, createjs.Ease.Linear)

        createjs.Tween.get(instance.getChildByName("projectClient"+event.target.instanceRef))
        .to({alpha:0.25}, 200, createjs.Ease.Linear)

        createjs.Tween.get(instance.getChildByName("maskProject"+event.target.instanceRef))
        .to({scaleX:0.3,scaleY:0.3}, 300, createjs.Ease.circInOut)

        createjs.Tween.get(instance.getChildByName("projectThumb"+event.target.instanceRef))
        .to({scaleX:0.3,scaleY:0.3,alpha:0.25}, 300, createjs.Ease.circInOut)


    }

    function projectClick(event){
       
    }

window.Projects = createjs.promote(Projects, "Container");
}());