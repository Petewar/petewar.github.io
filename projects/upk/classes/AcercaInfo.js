(function () {

    function AcercaInfo(Iratio,Image,ItitleOne,IdescOne,ItitleTwo,IdescTwo,IarrowShape,IbuttonOneTitle,IbuttonTwoTitle,IaspectRatio,IposY) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.image = Image
        this.titleOne = ItitleOne;
        this.descOne = IdescOne;
        this.titleTwo = ItitleTwo;
        this.descTwo = IdescTwo;
        this.arrowShape = IarrowShape;
        this.buttonOneTitle = IbuttonOneTitle;
        this.buttonTwoTitle = IbuttonTwoTitle;
        this.aspectRatio = IaspectRatio;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var image;
    var titleOne;
    var descOne;
    var titleTwo;
    var descTwo;
    var arrowShape;
    var aspectRatio;
    var posY;
    var arrowShapeTwo;
    var buttonOneTitle;
    var buttonTwoTitle;

    var p = createjs.extend(AcercaInfo, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        image = this.image;
        titleOne = this.titleOne;
        descOne = this.descOne;
        titleTwo  = this.titleTwo;
        descTwo = this.descTwo;
        arrowShape = this.arrowShape;
        aspectRatio = this.aspectRatio;
        posY = this.posY;
        buttonOneTitle = this.buttonOneTitle
        buttonTwoTitle = this.buttonTwoTitle

        addElements();
        addAnimation();

    };

    function addElements(){

        image.regX = image.getBounds().width/2
        image.x = stage.canvas.width/2;
        image.y = posY;
        aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"fullWidth")
        instance.addChild(image);

        var titleTextOne = new createjs.Text();
        titleTextOne.name = "titleTextOne";
        titleTextOne.font = "36px BwModelica-ExtraBold";
        titleTextOne.textBaseline = "alphabetic";
        titleTextOne.color = "#333333";
        if(ratio==1)titleTextOne.lineWidth = 264*ratio
        if(ratio==2)titleTextOne.lineWidth = 100*ratio
        titleTextOne.lineHeight = 40;
        titleTextOne.text = titleOne
        titleTextOne.scaleX = ratio;
        titleTextOne.scaleY = ratio;
        titleTextOne.x = 100*ratio+80*ratio
        titleTextOne.y = 540*ratio+60*ratio
        instance.addChild(titleTextOne);

        var descTextOne = new createjs.Text();
        descTextOne.name = "descTextOne";
        descTextOne.font = "12px BwModelica-Regular";
        descTextOne.textBaseline = "alphabetic";
        descTextOne.color = "#333333";
        if(ratio==1)descTextOne.lineWidth = stage.canvas.width-200*ratio-100*ratio
        if(ratio==2)descTextOne.lineWidth = stage.canvas.width-821*ratio-50*ratio
        descTextOne.lineHeight = 30;
        descTextOne.text = descOne
        descTextOne.scaleX = ratio;
        descTextOne.scaleY = ratio;
        descTextOne.x = 100*ratio+80*ratio
        descTextOne.y = 540*ratio+110*ratio+50*ratio
        instance.addChild(descTextOne);

        var stroke = new createjs.Shape();
        stroke.graphics.beginFill("#8EC640").drawRect(0, 0,  127*ratio, 4*ratio);
        stroke.name = "stroke"
        stroke.x = 100*ratio+80*ratio
        stroke.y = descTextOne.y+descTextOne.getBounds().height*ratio-25*ratio+50*ratio
        instance.addChild(stroke);

        var titleTextTwo = new createjs.Text();
        titleTextTwo.name = "titleTextTwo";
        titleTextTwo.font = "36px BwModelica-ExtraBold";
        titleTextTwo.textBaseline = "alphabetic";
        titleTextTwo.color = "#333333";
        if(ratio==1)titleTextTwo.lineWidth = 400*ratio
        if(ratio==2)titleTextTwo.lineWidth = 300*ratio
        titleTextTwo.lineHeight = 40;
        titleTextTwo.text = titleTwo
        titleTextTwo.scaleX = ratio;
        titleTextTwo.scaleY = ratio;
        titleTextTwo.x = 100*ratio+80*ratio
        titleTextTwo.y = stroke.y+30*ratio+60*ratio
        instance.addChild(titleTextTwo);

        var descTextTwo = new createjs.Text();
        descTextTwo.name = "descTextTwo";
        descTextTwo.font = "12px BwModelica-Regular";
        descTextTwo.textBaseline = "alphabetic";
        descTextTwo.color = "#333333";
        if(ratio==1)descTextTwo.lineWidth = stage.canvas.width-200*ratio-100*ratio
        if(ratio==2)descTextTwo.lineWidth = stage.canvas.width-821*ratio-50*ratio
        descTextTwo.lineHeight = 30;
        descTextTwo.text = descTwo
        descTextTwo.scaleX = ratio;
        descTextTwo.scaleY = ratio;
        descTextTwo.x = 100*ratio+80*ratio
        descTextTwo.y = titleTextTwo.y+titleTextTwo.getBounds().height*ratio-25*ratio+50*ratio
        instance.addChild(descTextTwo);

        var containerButtonFeature = new createjs.Container();
        containerButtonFeature.name = "containerButtonFeature";
        containerButtonFeature.x = 100*ratio+80*ratio
        containerButtonFeature.y = descTextTwo.y+descTextTwo.getBounds().height*ratio+20*ratio
        instance.addChild(containerButtonFeature);

        containerButtonFeature.addChild(arrowShape);
        arrowShape.x = -20*ratio

        arrowShapeTwo = arrowShape.clone(true)
        arrowShapeTwo.x = -20*ratio
        arrowShapeTwo.y = 13*ratio+20*ratio
        containerButtonFeature.addChild(arrowShapeTwo);

        var maskButton = new createjs.Shape();
        maskButton.name = "maskButton"
        maskButton.graphics.beginFill("#FFFFFF").drawRect(0, 0, 120*ratio, 28*ratio);
        maskButton.alpha = 0.01;
        containerButtonFeature.addChild(maskButton);

        var maskButtonTwo = new createjs.Shape();
        maskButtonTwo.name = "maskButtonTwo"
        maskButtonTwo.graphics.beginFill("#FFFFFF").drawRect(0, 0, 120*ratio, 28*ratio);
        maskButtonTwo.alpha = 0.01;
        maskButtonTwo.y = 20*ratio
        containerButtonFeature.addChild(maskButtonTwo);

        arrowShape.mask = maskButton;
        arrowShapeTwo.mask = maskButtonTwo;

        var buttonTitleOne = new createjs.Text();
        buttonTitleOne.name = "buttonTitleOne";
        buttonTitleOne.font = "11px BwModelica-Bold";
        buttonTitleOne.textBaseline = "alphabetic";
        buttonTitleOne.color = "#8EC640";
        buttonTitleOne.text = buttonOneTitle
        buttonTitleOne.scaleX = ratio;
        buttonTitleOne.scaleY = ratio;
        buttonTitleOne.x = 44*ratio+15*ratio-20*ratio
        buttonTitleOne.y = 10*ratio
        containerButtonFeature.addChild(buttonTitleOne);

        var buttonTitleTwo = new createjs.Text();
        buttonTitleTwo.name = "buttonTitleTwo";
        buttonTitleTwo.font = "11px BwModelica-Bold";
        buttonTitleTwo.textBaseline = "alphabetic";
        buttonTitleTwo.color = "#8EC640";
        buttonTitleTwo.text = buttonTwoTitle
        buttonTitleTwo.scaleX = ratio;
        buttonTitleTwo.scaleY = ratio;
        buttonTitleTwo.x = 44*ratio+15*ratio-20*ratio
        buttonTitleTwo.y = 43*ratio
        containerButtonFeature.addChild(buttonTitleTwo);

        var hitButton = new createjs.Shape();
        hitButton.name = "hitButton"
        hitButton.graphics.beginFill("#ffffff").drawRect(0, 0, 200*ratio, 28*ratio);
        hitButton.y = -8*ratio
        hitButton.alpha = 0.01;
        containerButtonFeature.addChild(hitButton);

        var hitButtonTwo = new createjs.Shape();
        hitButtonTwo.name = "hitButtonTwo"
        hitButtonTwo.graphics.beginFill("#ffffff").drawRect(0, 0, 260*ratio, 28*ratio);
        hitButtonTwo.y = 28*ratio
        hitButtonTwo.alpha = 0.01;
        containerButtonFeature.addChild(hitButtonTwo);

    }

    function addAnimation(){

       TweenMax.from(image, 1, {delay:1,alpha:0,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("titleTextOne"), 1, {delay:1.25,alpha:0,y:instance.getChildByName("titleTextOne").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("descTextOne"), 1, {delay:1.5,alpha:0,y:instance.getChildByName("descTextOne").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("stroke"), 1, {delay:1.75,scaleX:0,y:instance.getChildByName("stroke").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("titleTextTwo"), 1, {delay:2,alpha:0,y:instance.getChildByName("titleTextTwo").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("descTextTwo"), 1, {delay:2.25,alpha:0,y:instance.getChildByName("descTextTwo").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("containerButtonFeature"), 1, {delay:2.5,alpha:0,y:instance.getChildByName("containerButtonFeature").y+100*ratio,ease:Expo.easeInOut,onComplete:addHits})
       
    }

    function addHits(){

        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").cursor = "pointer";
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").type = "emprego";
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").addEventListener("mouseover", handlerOver);
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").addEventListener("mouseout", handlerOut)
        instance.getChildByName("containerButtonFeature").getChildByName("hitButton").addEventListener("click", handlerClick);

        instance.getChildByName("containerButtonFeature").getChildByName("hitButtonTwo").cursor = "pointer";
        instance.getChildByName("containerButtonFeature").getChildByName("hitButtonTwo").type = "ce";
        instance.getChildByName("containerButtonFeature").getChildByName("hitButtonTwo").addEventListener("mouseover", handlerOver);
        instance.getChildByName("containerButtonFeature").getChildByName("hitButtonTwo").addEventListener("mouseout", handlerOut)
        instance.getChildByName("containerButtonFeature").getChildByName("hitButtonTwo").addEventListener("click", handlerClick);
    }

    function handlerOver(event){

        switch(event.target.type){
            case "emprego":
                TweenMax.to(instance.getChildByName("containerButtonFeature").getChildByName("buttonTitleOne"), 0.6, {x:44*ratio+15*ratio,ease:Expo.easeInOut})
                TweenMax.to(arrowShape, 0.5, {x:0,ease:Expo.easeInOut})
            break;

            case "ce":
                TweenMax.to(instance.getChildByName("containerButtonFeature").getChildByName("buttonTitleTwo"), 0.6, {x:44*ratio+15*ratio,ease:Expo.easeInOut})
                TweenMax.to(arrowShapeTwo, 0.5, {x:0,ease:Expo.easeInOut})
            break;

        }
    }

    function handlerOut(event){

        switch(event.target.type){
            case "emprego":
                TweenMax.to(instance.getChildByName("containerButtonFeature").getChildByName("buttonTitleOne"), 0.5, {x:44*ratio+15*ratio-20*ratio,ease:Expo.easeInOut})
                TweenMax.to(arrowShape, 0.6, {x:-20*ratio,ease:Expo.easeInOut})
            break;

            case "ce":
                TweenMax.to(instance.getChildByName("containerButtonFeature").getChildByName("buttonTitleTwo"), 0.5, {x:44*ratio+15*ratio-20*ratio,ease:Expo.easeInOut})
                TweenMax.to(arrowShapeTwo, 0.6, {x:-20*ratio,ease:Expo.easeInOut})
            break;

        }
    }

    function handlerClick(event){

        switch(event.target.type){
            case "emprego":
                window.open("mailto:hello@load-interactive.com?Subject=Ofertas de Emprego!","_self");
            break;

            case "ce":
                window.open("mailto:hello@load-interactive.com?Subject=Candidatura Espontanea!","_self");
            break;

        }
    }

    p.kill = function() {

        instance.removeChild(image);
        instance.addChild(instance.getChildByName("titleTextOne"));
        instance.addChild(instance.getChildByName("descTextOne"));
        instance.addChild(instance.getChildByName("stroke"));
        instance.addChild(instance.getChildByName("titleTextTwo"));
        instance.addChild(instance.getChildByName("descTextTwo"));
        instance.addChild(instance.getChildByName("containerButtonFeature"));

    } ; 

    p.getHeight = function() {
        return image.getBounds().height*ratio
    }

    p.resize = function() {

        image.regX = image.getBounds().width/2
        image.x = stage.canvas.width/2;
        image.y = posY;
        aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"fullWidth")

        if(ratio==1)instance.getChildByName("titleTextOne").lineWidth = 264*ratio
        if(ratio==2)instance.getChildByName("titleTextOne").lineWidth = 100*ratio

        if(ratio==1)instance.getChildByName("descTextOne").lineWidth = stage.canvas.width-200*ratio-100*ratio
        if(ratio==2)instance.getChildByName("descTextOne").lineWidth = stage.canvas.width-821*ratio-50*ratio

        if(ratio==1)instance.getChildByName("titleTextTwo").lineWidth = 400*ratio
        if(ratio==2)instance.getChildByName("titleTextTwo").lineWidth = 300*ratio

        if(ratio==1)instance.getChildByName("descTextTwo").lineWidth = stage.canvas.width-200*ratio-100*ratio
        if(ratio==2)instance.getChildByName("descTextTwo").lineWidth = stage.canvas.width-821*ratio-50*ratio

        instance.getChildByName("stroke").y = instance.getChildByName("descTextOne").y+instance.getChildByName("descTextOne").getBounds().height*ratio-25*ratio+50*ratio
        instance.getChildByName("titleTextTwo").y = instance.getChildByName("stroke").y+30*ratio+50*ratio
        instance.getChildByName("descTextTwo").y = instance.getChildByName("titleTextTwo").y+instance.getChildByName("titleTextTwo").getBounds().height*ratio-25*ratio+50*ratio

        instance.getChildByName("containerButtonFeature").y = instance.getChildByName("descTextTwo").y+instance.getChildByName("descTextTwo").getBounds().height*ratio+20*ratio
       
    } ; 


window.AcercaInfo = createjs.promote(AcercaInfo, "Container");
}());