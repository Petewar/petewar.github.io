(function () {

    function Step3(Iratio,Iinstance) {

        this.ratio = Iratio;
        this.dispatchInstance = Iinstance;
        this.Container_constructor();
        this.setup();

    }

    var ratio;
    var numberOneTxt;
    var numberTwoTxt;
    var ofTxt;
    var numberOneText = "03";
    var numberTwoText = "06";
    var ofText = "of";
    var initValue = 400;
    var titleInputTxt;
    var titleInputText = "My Goal is to Conquer the World";
    var titleTxt;
    var titleText = "About Your Project";
    var strokeFill;
    var arrowLeftSvg = "M4.000,3.999 L4.000,1.998 L40.000,1.998 L40.000,3.999 L4.000,3.999 ZM4.000,0.000 L4.000,6.000 L0.000,3.000 L4.000,0.000 Z"
    var arrowRightSvg = "M36.000,6.000 L36.000,0.000 L40.000,3.000 L36.000,6.000 ZM-0.000,1.998 L36.000,1.998 L36.000,3.999 L-0.000,3.999 L-0.000,1.998 Z"
    var arrowBack;
    var arrowNext;
    var nextTxt;
    var backTxt;
    var arrowBackBlack;
    var arrowNextBlack;
    var nextTxtBlack;
    var backTxtBlack;
    var nextText = "Next";
    var backText = "Back";
    var containerInput;
    var containerNavigation;
    var nextHit;
    var backHit;
    var dispatchInstance;

    var p = createjs.extend(Step3, createjs.Container);

    p.setup = function() {
        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        console.log("Step3 Contact");
        createStep();
    };

    function createStep() {

        numberOneTxt = new createjs.Text();
        numberOneTxt.font = "300px Abril Fatface";
        numberOneTxt.color = "#FFFFFF";
        numberOneTxt.text = numberOneText;
        numberOneTxt.textBaseline = "alphabetic";
        numberOneTxt.scaleX = ratio;
        numberOneTxt.scaleY = ratio;
        numberOneTxt.alpha = 0;
        numberOneTxt.x = -(initValue)*ratio
        numberOneTxt.y = stage.canvas.height/2+numberOneTxt.getBounds().height/2*ratio
        instance.addChild(numberOneTxt);

        ofTxt = new createjs.Text();
        ofTxt.font = "24px Abril Fatface";
        ofTxt.color = "#000000";
        ofTxt.textBaseline = "alphabetic";
        ofTxt.text = ofText;
        ofTxt.scaleX = ratio;
        ofTxt.scaleY = ratio;
        ofTxt.alpha = 0;
        ofTxt.x = -(initValue)*ratio
        ofTxt.y = numberOneTxt.y-numberOneTxt.getBounds().height*ratio+108*ratio
        instance.addChild(ofTxt);

        numberTwoTxt = new createjs.Text();
        numberTwoTxt.font = "72px Abril Fatface";
        numberTwoTxt.color = "#000000";
        numberTwoTxt.text = numberTwoText;
        numberTwoTxt.scaleX = ratio;
        numberTwoTxt.scaleY = ratio;
        numberTwoTxt.x = -(initValue)*ratio
        numberTwoTxt.alpha = 0;
        numberTwoTxt.y = ofTxt.y+30*ratio
        numberTwoTxt.textBaseline = "alphabetic";
        instance.addChild(numberTwoTxt);

        containerInput = new createjs.Container();
        containerNavigation = new createjs.Container();

        titleTxt = new createjs.Text();
        titleTxt.font = "30px Montserrat";
        titleTxt.color = "#FFFFFF";
        titleTxt.text = titleText;
        titleTxt.scaleX = ratio;
        titleTxt.scaleY = ratio;
        titleTxt.textBaseline = "alphabetic";
        containerInput.addChild(titleTxt);

        strokeFill = new createjs.Shape();
        strokeFill.graphics.beginFill("#FFFFFF").drawRect(0,0, titleTxt.getBounds().width*ratio,2*ratio);
        strokeFill.y = 100*ratio
        strokeFill.scaleX = 0;
        containerInput.addChild(strokeFill)

        titleInputTxt = new createjs.Text();
        titleInputTxt.font = "16px Montserrat";
        titleInputTxt.color = "#FFFFFF";
        titleInputTxt.text = titleInputText;
        titleInputTxt.scaleX = ratio;
        titleInputTxt.scaleY = ratio;
        titleInputTxt.y = strokeFill.y-30*ratio
        containerInput.addChild(titleInputTxt);

        containerInput.alpha = 0;
        containerInput.x = stage.canvas.width/2- titleTxt.getBounds().width/2*ratio
        containerInput.y = stage.canvas.height/2
        instance.addChild(containerInput)

        backTxt = new createjs.Text();
        backTxt.font = "24px Abril Fatface";
        backTxt.color = "#FFFFFF";
        backTxt.text = backText;
        backTxt.scaleX = ratio;
        backTxt.scaleY = ratio;
        backTxt.x = 40*ratio+8*ratio;
        containerNavigation.addChild(backTxt);

        backTxtBlack = new createjs.Text();
        backTxtBlack.font = "24px Abril Fatface";
        backTxtBlack.color = "#000000";
        backTxtBlack.text = backText;
        backTxtBlack.scaleX = ratio;
        backTxtBlack.scaleY = ratio;
        backTxtBlack.alpha = 0;
        backTxtBlack.x = 40*ratio+8*ratio;
        containerNavigation.addChild(backTxtBlack);
        
        arrowBack = new createSvg(arrowLeftSvg,"#ffffff");
        arrowBack.y = backTxt.getBounds().height/2*ratio+3*ratio
        containerNavigation.addChild(arrowBack);

        arrowBackBlack = new createSvg(arrowLeftSvg,"#000000");
        arrowBackBlack.alpha = 0;
        arrowBackBlack.y = backTxt.getBounds().height/2*ratio+3*ratio
        containerNavigation.addChild(arrowBackBlack);

        backHit = new createjs.Shape();
        backHit.alpha = 0.01
        backHit.instance = "back"
        backHit.graphics.beginFill("#000000").drawRect(0, 0, backTxt.getBounds().width*ratio+8*ratio+40*ratio,(backTxt.getBounds().height*ratio)*2);
        backHit.y = -(backTxt.getBounds().height*ratio)/2
        backHit.cursor = "pointer";
        backHit.state = "close";
        backHit.addEventListener("mouseover", handlerOverNavigation);
        backHit.addEventListener("mouseout", handlerOutNavigation);
        backHit.addEventListener("click", handlerClickNavigation); 
        containerNavigation.addChild(backHit);

        nextTxt = new createjs.Text();
        nextTxt.font = "24px Abril Fatface";
        nextTxt.color = "#FFFFFF";
        nextTxt.text = nextText;
        nextTxt.x = backTxt.x + backTxt.getBounds().width*ratio + 60*ratio;
        nextTxt.scaleX = ratio;
        nextTxt.scaleY = ratio;
        containerNavigation.addChild(nextTxt);

        nextTxtBlack = new createjs.Text();
        nextTxtBlack.alpha = 0;
        nextTxtBlack.x = nextTxt.x
        nextTxtBlack.font = "24px Abril Fatface";
        nextTxtBlack.color = "#000000";
        nextTxtBlack.text = nextText;
        nextTxtBlack.scaleX = ratio;
        nextTxtBlack.scaleY = ratio;
        containerNavigation.addChild(nextTxtBlack);

        arrowNext = new createSvg(arrowRightSvg,"#ffffff");
        arrowNext.x = nextTxt.x + nextTxt.getBounds().width*ratio + 8*ratio;
        arrowNext.y = nextTxt.getBounds().height/2*ratio+3*ratio
        containerNavigation.addChild(arrowNext);

        arrowNextBlack = new createSvg(arrowRightSvg,"#000000");
        arrowNextBlack.alpha = 0;
        arrowNextBlack.x = nextTxt.x + nextTxt.getBounds().width*ratio + 8*ratio;
        arrowNextBlack.y = nextTxt.getBounds().height/2*ratio+3*ratio
        containerNavigation.addChild(arrowNextBlack);


        nextHit = new createjs.Shape();
        nextHit.instance = "next"
        nextHit.alpha = 0.01
        nextHit.graphics.beginFill("#000000").drawRect(0, 0, nextTxt.getBounds().width*ratio+8*ratio+40*ratio,(nextTxt.getBounds().height*ratio)*2);
        nextHit.x = nextTxt.x
        nextHit.y = -(nextTxt.getBounds().height*ratio)/2
        nextHit.cursor = "pointer";
        nextHit.state = "close";
        nextHit.addEventListener("mouseover", handlerOverNavigation);
        nextHit.addEventListener("mouseout", handlerOutNavigation);
        nextHit.addEventListener("click", handlerClickNavigation); 
        containerNavigation.addChild(nextHit);

        containerNavigation.x = stage.canvas.width/2-40*ratio-8*ratio-backTxt.getBounds().width*ratio-30*ratio
        containerNavigation.y = stage.canvas.height
        instance.addChild(containerNavigation);

        //Anim

        createjs.Tween.get(numberOneTxt)
        .to({alpha:1,x:-100*ratio}, 800, createjs.Ease.circInOut)

        createjs.Tween.get(ofTxt)
        .to({alpha:1,x:-100*ratio+numberOneTxt.getBounds().width*ratio+7*ratio}, 500, createjs.circInOut)

        createjs.Tween.get(numberTwoTxt)
        .to({alpha:1,x:-100*ratio+numberOneTxt.getBounds().width*ratio+7*ratio + ofTxt.getBounds().width*ratio +20*ratio}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(containerInput)
        .wait(800)
        .to({alpha:1,y:stage.canvas.height/2}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(containerNavigation)
        .wait(800)
        .to({alpha:1,y:stage.canvas.height-stage.canvas.height/5}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(strokeFill)
        .wait(800)
        .to({scaleX:1}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(titleInputTxt)
        .wait(800)
        .to({x:25*ratio}, 400, createjs.Ease.circInOut)

    }

    function handlerOverNavigation(event){

        if(event.target.instance=="next"){
             createjs.Tween.get(nextTxtBlack)
            .to({alpha:1}, 400, createjs.Ease.circInOut)

             createjs.Tween.get(arrowNextBlack)
            .to({alpha:1}, 400, createjs.Ease.circInOut)


             createjs.Tween.get(nextTxt)
            .to({alpha:0}, 400, createjs.Ease.circInOut)

             createjs.Tween.get(arrowNext)
            .to({alpha:0}, 400, createjs.Ease.circInOut)
        
        }else{

             createjs.Tween.get(backTxtBlack)
            .to({alpha:1}, 400, createjs.Ease.circInOut)

             createjs.Tween.get(arrowBackBlack)
            .to({alpha:1}, 400, createjs.Ease.circInOut)


             createjs.Tween.get(backTxt)
            .to({alpha:0}, 400, createjs.Ease.circInOut)

             createjs.Tween.get(arrowBack)
            .to({alpha:0}, 400, createjs.Ease.circInOut)
        }

    }

    function handlerOutNavigation(event){

        if(event.target.instance=="next"){
            createjs.Tween.get(nextTxtBlack)
            .to({alpha:0}, 400, createjs.Ease.circInOut)

             createjs.Tween.get(arrowNextBlack)
            .to({alpha:0}, 400, createjs.Ease.circInOut)


             createjs.Tween.get(nextTxt)
            .to({alpha:1}, 400, createjs.Ease.circInOut)

             createjs.Tween.get(arrowNext)
            .to({alpha:1}, 400, createjs.Ease.circInOut)
        
        }else{
            createjs.Tween.get(backTxtBlack)
            .to({alpha:0}, 400, createjs.Ease.circInOut)

             createjs.Tween.get(arrowBackBlack)
            .to({alpha:0}, 400, createjs.Ease.circInOut)


             createjs.Tween.get(backTxt)
            .to({alpha:1}, 400, createjs.Ease.circInOut)

             createjs.Tween.get(arrowBack)
            .to({alpha:1}, 400, createjs.Ease.circInOut)
        }
    }

    function handlerClickNavigation(event){
        
        var customEvent = new createjs.Event("Steps");

        if(event.target.instance=="next"){
            customEvent.action = "more"
        }else{
            customEvent.action = "less"
        }
        
        dispatchInstance.dispatchEvent(customEvent);

    }

    function createSvg(Isvg,Icolor){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        svg.scaleX = ratio;
        svg.scaleY = ratio;
        return svg;
    }

    p.resize = function() {

        numberOneTxt.x = -100*ratio
        numberOneTxt.y = stage.canvas.height/2+numberOneTxt.getBounds().height/2*ratio

        ofTxt.x = -100*ratio+numberOneTxt.getBounds().width*ratio+7*ratio
        ofTxt.y = numberOneTxt.y-numberOneTxt.getBounds().height*ratio+108*ratio

        numberTwoTxt.x = -100*ratio+numberOneTxt.getBounds().width*ratio+7*ratio + ofTxt.getBounds().width*ratio +20*ratio
        numberTwoTxt.y = ofTxt.y+30*ratio

        containerInput.x = stage.canvas.width/2- titleTxt.getBounds().width/2*ratio
        containerInput.y = stage.canvas.height/2

        containerNavigation.x = stage.canvas.width/2-40*ratio-8*ratio-backTxt.getBounds().width*ratio-30*ratio
        containerNavigation.y = stage.canvas.height-stage.canvas.height/5

    }

    p.killStep = function() {

        createjs.Tween.get(numberOneTxt)
        .to({alpha:0,x:-(initValue)*ratio}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(ofTxt)
        .wait(200)
        .to({alpha:0,x:-(initValue)*ratio}, 500, createjs.circInOut)

        createjs.Tween.get(numberTwoTxt)
        .wait(300)
        .to({alpha:0,x:-(initValue)*ratio}, 600, createjs.Ease.circOut)
        .call(function(){
           instance.removeChild(numberOneTxt);
           numberOneTxt = null
           instance.removeChild(ofTxt);
           ofTxt = null
           instance.removeChild(numberTwoTxt);
           numberTwoTxt = null
           instance.removeChild(titleTxt);
           titleTxt = null
           instance.removeChild(strokeFill);
           strokeFill = null
           instance.removeChild(titleInputTxt);
           titleInputTxt = null
           instance.removeChild(containerInput);
           containerInput = null
           instance.removeChild(arrowBack);
           arrowBack = null
           instance.removeChild(backTxt);
           backTxt = null
           instance.removeChild(arrowNext);
           arrowNext = null
           instance.removeChild(nextTxt);
           nextTxt = null
           instance.removeChild(containerNavigation);
           containerNavigation = null
        });


        createjs.Tween.get(titleTxt)
        .to({alpha:0}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(strokeFill)
        .to({scaleX:0}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(titleInputTxt)
        .to({alpha:0,x:0}, 400, createjs.Ease.circInOut)

         createjs.Tween.get(containerNavigation)
        .to({alpha:0}, 400, createjs.Ease.circInOut)

    }

window.Step3 = createjs.promote(Step3, "Container");
}());