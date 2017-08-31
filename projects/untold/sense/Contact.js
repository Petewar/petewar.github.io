(function () {

    function Contact(Iratio,IaspectRatio,IdispatchInstance) {

        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.dispatchInstance = IdispatchInstance
        this.Container_constructor();
        this.setup();

    }

    var ratio;
    var aspectRatio;

    var titleTxt = "Let's Talk";
    var subtitleTxt = "Located in southern Europe very close to the Atlantic Ocean.\nA design studio based in Aveiro, Portugal.";
    var columnOneTitleTxt = "ADDRESS";
    var columnOneTxt = "RUA JOSE ESTEVAO N83, 2ESQ\n3800-202 AVEIRO, PORTUGAL";
    var columnTwoTxt = "INFO@UNTOLDINTERACTIVE.COM";
    var email = "info@untoldinteractive.com";
    var columnTwoTitleTxt = "EMAIL";
    var columnThreeTxt = "+351 234 020 654";
    var columnThreeTitleTxt = "PHONE";
    var bottomTxt = "Start your project";
    var longArrowSvg = "M36.000,6.000 L36.000,0.000 L40.000,3.000 L36.000,6.000 ZM-0.000,1.998 L36.000,1.998 L36.000,3.999 L-0.000,3.999 L-0.000,1.998 Z"
    var longArrow;
    var bottomHit;

    var title;
    var subtitle;
    var columnOneTitle;
    var columnOneText;
    var columnTwoTitle;
    var columnTwoText;
    var columnTwoTextStroke;
    var columnTwoHitText;
    var columnThreeTitle;
    var columnThreeText;
    var columnTwo;
    var columnThree;
    var bottom;
    var strokeEmail;
    var dispatchInstance;
    var instance;
    var nav
    var timer

    var step;

    var p = createjs.extend(Contact, createjs.Container);

    p.setup = function() {
        instance = this;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        dispatchInstance = this.dispatchInstance;
        nav = 0;
        console.log("Contact");
    } ;

    p.createContact = function() {
        
        title = new createjs.Text();
        title.font = "85px Abril Fatface";    
        title.color = "#FFFFFF";
        title.text = titleTxt;
        title.scaleX = ratio;
        title.scaleY = ratio;
        instance.addChild(title);
        title.x = stage.canvas.width/2-300*ratio;
        title.y = stage.canvas.height/2-240*ratio;

        title.alpha = 0;
        createjs.Tween.get(title)
        .to({alpha:1}, 400, createjs.Ease.linear)

        subtitle = new createjs.Text();
        subtitle.font = "25px Montserrat";
        subtitle.color = "#FFFFFF";
        subtitle.text = subtitleTxt;
        subtitle.scaleX = ratio;
        subtitle.scaleY = ratio;
        subtitle.x = title.x
        subtitle.y = title.y+140*ratio
        instance.addChild(subtitle);

        subtitle.alpha = 0;
         createjs.Tween.get(subtitle)
        .to({alpha:1}, 600, createjs.Ease.linear)

        columnOneTitle = new createjs.Text();
        columnOneTitle.font = "Bold 10px Montserrat";
        columnOneTitle.color = "#FFFFFF";
        columnOneTitle.text = columnOneTitleTxt;
        columnOneTitle.scaleX = ratio;
        columnOneTitle.scaleY = ratio;
        columnOneTitle.x = subtitle.x
        columnOneTitle.y = subtitle.y+150*ratio
        instance.addChild(columnOneTitle);

        columnOneTitle.alpha = 0;
        createjs.Tween.get(columnOneTitle)
        .to({alpha:1}, 800, createjs.Ease.linear)

        columnTwoTitle = new createjs.Text();
        columnTwoTitle.font = "Bold 10px Montserrat";
        columnTwoTitle.color = "#FFFFFF";
        columnTwoTitle.text = columnTwoTitleTxt;
        columnTwoTitle.scaleX = ratio;
        columnTwoTitle.scaleY = ratio;
        columnTwoTitle.x = subtitle.x+290*ratio;
        columnTwoTitle.y = subtitle.y+150*ratio
        instance.addChild(columnTwoTitle);

        columnTwoTitle.alpha = 0;
        createjs.Tween.get(columnTwoTitle)
        .to({alpha:1}, 800, createjs.Ease.linear)

        columnThreeTitle = new createjs.Text();
        columnThreeTitle.font = "Bold 10px Montserrat";
        columnThreeTitle.color = "#FFFFFF";
        columnThreeTitle.text = columnThreeTitleTxt;
        columnThreeTitle.scaleX = ratio;
        columnThreeTitle.scaleY = ratio;
        columnThreeTitle.x = columnTwoTitle.x+290*ratio;
        columnThreeTitle.y = subtitle.y+150*ratio
        instance.addChild(columnThreeTitle);

        columnThreeTitle.alpha = 0;
        createjs.Tween.get(columnThreeTitle)
        .to({alpha:1}, 800, createjs.Ease.linear)

        columnOneText = new createjs.Text();
        columnOneText.font = "10px Montserrat";
        columnOneText.color = "#FFFFFF";
        columnOneText.text = columnOneTxt;
        columnOneText.scaleX = ratio;
        columnOneText.scaleY = ratio;
        columnOneText.x = columnOneTitle.x;
        columnOneText.y = columnOneTitle.y+25*ratio
        instance.addChild(columnOneText);

        columnOneText.alpha = 0;
        createjs.Tween.get(columnOneText)
        .to({alpha:1}, 800, createjs.Ease.linear)

        columnTwoText = new createjs.Text();
        columnTwoText.font = "10px Montserrat";
        columnTwoText.color = "#000000";
        columnTwoText.text = columnTwoTxt;
        columnTwoText.scaleX = ratio;
        columnTwoText.scaleY = ratio;
        columnTwoText.x = columnTwoTitle.x;
        columnTwoText.y = columnOneTitle.y+25*ratio
        instance.addChild(columnTwoText);

        columnTwoText.alpha = 0;
        createjs.Tween.get(columnTwoText)
        .to({alpha:1}, 800, createjs.Ease.linear)

        columnTwoTextStroke = new createjs.Shape();
        columnTwoTextStroke.graphics.beginFill("#000000").drawRect(0,0, columnTwoText.getBounds().width*ratio,1*ratio);
        columnTwoTextStroke.x = columnTwoText.x
        columnTwoTextStroke.y = columnTwoText.y+columnTwoText.getBounds().height*ratio+3*ratio
        instance.addChild(columnTwoTextStroke)

        columnTwoTextStroke.alpha = 0;
        createjs.Tween.get(columnTwoTextStroke)
        .to({alpha:1}, 800, createjs.Ease.linear)

        columnTwoHitText = new createjs.Shape();
        columnTwoHitText.graphics.beginFill("#000000").drawRect(0,0, columnTwoText.getBounds().width*ratio,columnTwoText.getBounds().height*ratio+10*ratio);
        columnTwoHitText.x = columnTwoText.x
        columnTwoHitText.y = columnTwoText.y
        columnTwoHitText.alpha = 0.01;
        columnTwoHitText.cursor = "pointer"
        instance.addChild(columnTwoHitText)
        columnTwoHitText.addEventListener("click", handlerClickEmail);

        columnThreeText = new createjs.Text();
        columnThreeText.font = "10px Montserrat";
        columnThreeText.color = "#FFFFFF";
        columnThreeText.text = columnThreeTxt;
        columnThreeText.scaleX = ratio;
        columnThreeText.scaleY = ratio;
        columnThreeText.x = columnThreeTitle.x;
        columnThreeText.y = columnOneTitle.y+25*ratio
        instance.addChild(columnThreeText);

        columnThreeText.alpha = 0;
        createjs.Tween.get(columnThreeText)
        .to({alpha:1}, 800, createjs.Ease.linear)

        bottom = new createjs.Text();
        bottom.font = "60px Abril Fatface";    
        bottom.color = "#000000";
        bottom.text = bottomTxt;
        bottom.scaleX = ratio;
        bottom.scaleY = ratio;
        bottom.x = columnOneText.x;
        bottom.y = columnThreeText.y+100*ratio;
        instance.addChild(bottom);

        bottom.alpha = 0;
        createjs.Tween.get(bottom)
        .to({alpha:1}, 400, createjs.Ease.linear)

        bottomHit = new createjs.Shape();
        bottomHit.graphics.beginFill("#ffffff").drawRect(0,0, bottom.getBounds().width*ratio,bottom.getBounds().height*ratio+20*ratio);
        bottomHit.x = bottom.x;
        bottomHit.y = bottom.y;
        instance.addChild(bottomHit)
        bottomHit.alpha = 0.01;
        bottomHit.cursor = "pointer";
        bottomHit.addEventListener("mouseover", handlerOverStart);
        bottomHit.addEventListener("mouseout", handlerOutStart);
        bottomHit.addEventListener("click", handlerClickStart);

        longArrow = new createSvg(longArrowSvg,"#000000");
        longArrow.x = bottom.x+bottom.getBounds().width*ratio+12*ratio
        longArrow.y = bottom.y+(bottom.getBounds().height/2)*ratio+12*ratio
        longArrow.alpha = 0;
        instance.addChild(longArrow);

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

    function handlerOverStart(event){
       longArrow.x = bottom.x+bottom.getBounds().width*ratio
       createjs.Tween.get(longArrow)
        .to({alpha:1,x:bottom.x+bottom.getBounds().width*ratio+12*ratio}, 200, createjs.Ease.circInOut)
    }

    function handlerOutStart(event){
       createjs.Tween.get(longArrow)
        .to({alpha:0,x:bottom.x+bottom.getBounds().width*ratio}, 200, createjs.Ease.circInOut)
    }

    function handlerClickStart(event){
       startSteps();
    }

    function handlerClickEmail(event){
       window.open("mailto:"+email+"?Subject=Website Form!","_self");
    }

    p.resize = function() {

        if(nav == 0){
            var xPos = stage.canvas.width/2-300*ratio;
            var yPos = stage.canvas.height/2-240*ratio;

            title.x = xPos
            title.y = yPos

            subtitle.x = xPos
            subtitle.y = title.y+140*ratio

            columnOneTitle.x = subtitle.x
            columnOneTitle.y = subtitle.y+150*ratio

            columnTwoTitle.x = subtitle.x+290*ratio;
            columnTwoTitle.y = subtitle.y+150*ratio

            columnThreeTitle.x = columnTwoTitle.x+290*ratio;
            columnThreeTitle.y = subtitle.y+150*ratio

            columnOneText.x = columnOneTitle.x;
            columnOneText.y = columnOneTitle.y+25*ratio

            columnTwoText.x = columnTwoTitle.x;
            columnTwoText.y = columnOneTitle.y+25*ratio

            columnTwoHitText.x = columnTwoText.x
            columnTwoHitText.y = columnTwoText.y

            columnThreeText.x = columnThreeTitle.x;
            columnThreeText.y = columnOneTitle.y+25*ratio

            bottom.x = columnOneText.x;
            bottom.y = columnThreeText.y+100*ratio;

            bottomHit.x = columnOneText.x;
            bottomHit.y = columnThreeText.y+100*ratio;

            columnTwoTextStroke.x = columnTwoText.x
            columnTwoTextStroke.y = columnTwoText.y+columnTwoText.getBounds().height*ratio+3*ratio

            longArrow.x = bottom.x+bottom.getBounds().width*ratio+12*ratio
            longArrow.y = bottom.y+(bottom.getBounds().height/2)*ratio+12*ratio

        }else {

            step.resize();
            bottom.x = stage.canvas.width/2-bottom.getBounds().width/2*ratio
            bottom.y = stage.canvas.height/6
        }

    }

    function startSteps() {
        
        instance.removeChild(bottomHit);
        instance.removeChild(columnTwoHitText);

        bottomHit.removeEventListener("mouseover", handlerOverStart);
        bottomHit.removeEventListener("mouseout", handlerOutStart);
        bottomHit.removeEventListener("click", handlerClickStart);

        createjs.Tween.get(title)
        .to({alpha:0}, 200, createjs.Ease.linear)
         .call(function(){
           instance.removeChild(title);
           title = null
           instance.removeChild(subtitle);
           subtitle = null
           instance.removeChild(columnOneTitle);
           columnOneTitle = null
           instance.removeChild(columnTwoTitle);
           columnTwoTitle = null
           instance.removeChild(columnThreeTitle);
           columnThreeTitle = null
           instance.removeChild(columnOneText);
           columnOneText = null
           instance.removeChild(columnTwoText);
           columnTwoText = null
           instance.removeChild(columnThreeText);
           columnThreeText = null
           instance.removeChild(columnTwoTextStroke);
           columnTwoTextStroke = null;
           instance.removeChild(longArrow);
           longArrow = null;
        });

         createjs.Tween.get(subtitle)
        .to({alpha:0}, 200, createjs.Ease.linear)

         createjs.Tween.get(columnOneTitle)
        .to({alpha:0}, 200, createjs.Ease.linear)

         createjs.Tween.get(columnTwoTitle)
        .to({alpha:0}, 200, createjs.Ease.linear)

         createjs.Tween.get(columnThreeTitle)
        .to({alpha:0}, 200, createjs.Ease.linear)

         createjs.Tween.get(columnOneText)
        .to({alpha:0}, 200, createjs.Ease.linear)

         createjs.Tween.get(columnTwoText)
        .to({alpha:0}, 200, createjs.Ease.linear)

         createjs.Tween.get(columnThreeText)
        .to({alpha:0}, 200, createjs.Ease.linear)

         createjs.Tween.get(columnTwoTextStroke)
        .to({alpha:0}, 200, createjs.Ease.linear)

        createjs.Tween.get(longArrow)
        .to({alpha:0}, 200, createjs.Ease.linear)

         createjs.Tween.get(bottom)
        .to({x:stage.canvas.width/2-bottom.getBounds().width/2*ratio}, 400, createjs.Ease.circInOut)
        .call(function(){
             createjs.Tween.get(bottom)
            .to({y:stage.canvas.height/6}, 400, createjs.Ease.circInOut)
        });

        var customEvent = new createjs.Event("expandContact");
        dispatchInstance.dispatchEvent(customEvent);
        
        nav = 1
        createStep()
        
    }

    function createStep(){

        instance.addEventListener("Steps", stepsHandler);

        if(step!=null){
            instance.removeChild(step);
            step = null;
        }

        if(nav==1){
            step = new Step1(ratio,instance);
            instance.addChild(step);
        }

        if(nav==2){
            step = new Step2(ratio,instance);
            instance.addChild(step);
        }

        if(nav==3){
            step = new Step3(ratio,instance);
            instance.addChild(step);
        }

        if(nav==4){
            step = new Step4(ratio,instance);
            instance.addChild(step);
        }

        if(nav==5){
            step = new Step5(ratio,instance);
            instance.addChild(step);
        }

        if(nav==6){
            step = new Step6(ratio,instance);
            instance.addChild(step);
        }
    }

    function stepsHandler(event){
        
        step.killStep();
        instance.removeEventListener("Steps", stepsHandler);

        if(event.action=="more"){
            nav++
        }else{
            nav--
        }

        timer = setTimeout(createStep, 500);

    }

    p.killContact = function() {

        console.log("kill Contact");
        
        if(nav==0){

            instance.removeChild(bottomHit);
            instance.removeChild(columnTwoHitText);

            createjs.Tween.get(title)
            .to({alpha:0}, 200, createjs.Ease.linear)
             .call(function(){
                instance.removeChild(title);
               title = null
               instance.removeChild(subtitle);
               subtitle = null
               instance.removeChild(columnOneTitle);
               columnOneTitle = null
               instance.removeChild(columnTwoTitle);
               columnTwoTitle = null
               instance.removeChild(columnThreeTitle);
               columnThreeTitle = null
               instance.removeChild(columnOneText);
               columnOneText = null
               instance.removeChild(columnTwoText);
               columnTwoText = null
               instance.removeChild(columnThreeText);
               columnThreeText = null
               instance.removeChild(bottom);
               bottom = null
               instance.removeChild(columnTwoTextStroke);
               columnTwoTextStroke = null;
               instance.removeChild(longArrow);
               longArrow = null;

            });

             createjs.Tween.get(subtitle)
            .to({alpha:0}, 200, createjs.Ease.linear)

             createjs.Tween.get(columnOneTitle)
            .to({alpha:0}, 200, createjs.Ease.linear)

             createjs.Tween.get(columnTwoTitle)
            .to({alpha:0}, 200, createjs.Ease.linear)

             createjs.Tween.get(columnThreeTitle)
            .to({alpha:0}, 200, createjs.Ease.linear)

             createjs.Tween.get(columnOneText)
            .to({alpha:0}, 200, createjs.Ease.linear)

             createjs.Tween.get(columnTwoText)
            .to({alpha:0}, 200, createjs.Ease.linear)

             createjs.Tween.get(columnThreeText)
            .to({alpha:0}, 200, createjs.Ease.linear)

             createjs.Tween.get(columnTwoTextStroke)
            .to({alpha:0}, 200, createjs.Ease.linear)

             createjs.Tween.get(bottom)
            .to({alpha:0}, 200, createjs.Ease.linear)

            createjs.Tween.get(longArrow)
            .to({alpha:0}, 200, createjs.Ease.linear)

        }else{

            createjs.Tween.get(bottom)
            .to({alpha:0}, 200, createjs.Ease.linear)
            .call(function(){
                instance.removeChild(bottom);
                bottom = null
            });

            step.killStep();
        }

        nav=0

    }

window.Contact = createjs.promote(Contact, "Container");
}());