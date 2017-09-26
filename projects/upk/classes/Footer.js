(function () {

    function Footer(Iratio,Ititles,IHeader,Ibutton,Iyear,IcertiOne,IcertiTwo,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.posY = IposY;
        this.titles = Ititles;
        this.header = IHeader;
        this.button = Ibutton;
        this.year = Iyear;
        this.certiOne = IcertiOne;
        this.certiTwo = IcertiTwo;
        this.setup();
    }
    
    var instance;
    var ratio;
    var posY;
    var titles;
    var header;
    var button;
    var year;
    var certiOne;
    var certiTwo;
    var totalWidth;

    var p = createjs.extend(Footer, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        posY =  this.posY
        titles = this.titles
        header = this.header
        button = this.button
        year = this.year
        certiOne = this.certiOne
        certiTwo = this.certiTwo

        addElements();
        addAnimation();

    };

    function addElements(){
        
        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width, 505*ratio);
        bg.y = posY
        instance.addChild(bg);

        var containerInfo = new createjs.Container();
        containerInfo.name = "containerInfo";
        instance.addChild(containerInfo);

        var titlesOne = new createjs.Text();
        titlesOne.name = "titleOne";
        titlesOne.font = "18px BwModelica-Bold";
        titlesOne.textBaseline = "alphabetic";
        titlesOne.color = "#ffffff";
        titlesOne.text = titles[0]
        titlesOne.scaleX = ratio;
        titlesOne.scaleY = ratio;
        titlesOne.y = bg.y+titlesOne.getBounds().height*ratio+100*ratio
        containerInfo.addChild(titlesOne);

        var headerOne = new createjs.Text();
        headerOne.name = "headerOne";
        headerOne.font = "14px BwModelica-Light";
        headerOne.lineWidth = 200
        headerOne.lineHeight = 30;
        headerOne.textBaseline = "alphabetic";
        headerOne.color = "#ffffff";
        headerOne.text = header
        headerOne.scaleX = ratio;
        headerOne.scaleY = ratio;
        headerOne.y = titlesOne.y+titlesOne.getBounds().height*ratio+40*ratio
        containerInfo.addChild(headerOne);

        var buttonText = new createjs.Text();
        buttonText.name = "buttonText";
        buttonText.font = "16px BwModelica-Bold";
        buttonText.textBaseline = "alphabetic";
        buttonText.color = "#ffffff";
        buttonText.text = button
        buttonText.scaleX = ratio;
        buttonText.scaleY = ratio;
        buttonText.y = headerOne.y+headerOne.getBounds().height*ratio+40*ratio
        containerInfo.addChild(buttonText);

        var strokeButton = new createjs.Shape();
        strokeButton.scaleX = 0;
        strokeButton.name = "strokeButton"
        strokeButton.y = buttonText.y+10*ratio
        strokeButton.graphics.beginFill("#ffffff").drawRect(0, 0, buttonText.getBounds().width*ratio, 4*ratio);
        containerInfo.addChild(strokeButton);

        var hitButton = new createjs.Shape();
        hitButton.name = "hitButton"
        hitButton.alpha = 0.01
        hitButton.y = buttonText.y-30*ratio
        hitButton.graphics.beginFill("#333333").drawRect(0, 0, buttonText.getBounds().width*ratio, 50*ratio);
        containerInfo.addChild(hitButton);

        var yearText = new createjs.Text();
        yearText.name = "buttonText";
        yearText.font = "12px BwModelica-Regular";
        yearText.textBaseline = "alphabetic";
        yearText.color = "#ffffff";
        yearText.text = year;
        yearText.alpha = 0.5;
        yearText.scaleX = ratio;
        yearText.scaleY = ratio;
        yearText.y = hitButton.y+50*ratio-10*ratio+70*ratio
        containerInfo.addChild(yearText);

        var titlesTwo = new createjs.Text();
        titlesTwo.name = "titlesTwo";
        titlesTwo.font = "18px BwModelica-Bold";
        titlesTwo.textBaseline = "alphabetic";
        titlesTwo.color = "#ffffff";
        titlesTwo.text = titles[1]
        titlesTwo.scaleX = ratio;
        titlesTwo.scaleY = ratio;
        titlesTwo.x = headerOne.x + headerOne.getBounds().width*ratio + 210*ratio
        titlesTwo.y = bg.y+titlesTwo.getBounds().height*ratio+100*ratio
        containerInfo.addChild(titlesTwo);

        certiOne.x = titlesTwo.x
        certiOne.y = headerOne.y = titlesOne.y+titlesOne.getBounds().height*ratio+40*ratio
        containerInfo.addChild(certiOne);

        certiTwo.x = titlesTwo.x+70*ratio+50*ratio
        certiTwo.y = headerOne.y = titlesOne.y+titlesOne.getBounds().height*ratio+40*ratio
        containerInfo.addChild(certiTwo);

        totalWidth = titlesTwo.x + 168*ratio
        containerInfo.x = stage.canvas.width/2-totalWidth/2;

    }

    function addAnimation(){
        addHits();
    }

    function addHits(){

        instance.getChildByName("containerInfo").getChildByName("hitButton").cursor = "pointer";
        instance.getChildByName("containerInfo").getChildByName("hitButton").addEventListener("mouseover", handlerOver);
        instance.getChildByName("containerInfo").getChildByName("hitButton").addEventListener("mouseout", handlerOut);
        instance.getChildByName("containerInfo").getChildByName("hitButton").addEventListener("click", handlerClick);

    }

    function handlerOver(event){
        TweenMax.to(instance.getChildByName("containerInfo").getChildByName("strokeButton"), 0.5, {scaleX:1,ease:Expo.easeInOut})
    }

    function handlerOut(event){
        TweenMax.to(instance.getChildByName("containerInfo").getChildByName("strokeButton"), 0.5, {scaleX:0,ease:Expo.easeInOut})   
    }

    function handlerClick(event){
        SWFAddress.setValue("/contatos");
    }

    p.kill = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.removeChild(instance.getChildByName("bg"))

        instance.getChildByName("containerInfo").getChildByName("hitButton").removeEventListener("mouseover", handlerOver);
        instance.getChildByName("containerInfo").getChildByName("hitButton").removeEventListener("mouseout", handlerOut);
        instance.getChildByName("containerInfo").getChildByName("hitButton").removeEventListener("click", handlerClick);

        instance.getChildByName("containerInfo").removeChild(instance.getChildByName("containerInfo").getChildByName("titlesOne"))
        instance.getChildByName("containerInfo").removeChild(instance.getChildByName("containerInfo").getChildByName("headerOne"))
        instance.getChildByName("containerInfo").removeChild(instance.getChildByName("containerInfo").getChildByName("buttonText"))
        instance.getChildByName("containerInfo").removeChild(instance.getChildByName("containerInfo").getChildByName("strokeButton"))
        instance.getChildByName("containerInfo").removeChild(instance.getChildByName("containerInfo").getChildByName("hitButton"))
        instance.getChildByName("containerInfo").removeChild(instance.getChildByName("containerInfo").getChildByName("yearText"))

        instance.removeChild(instance.getChildByName("containerInfo"));


    } ; 

    p.getHeight = function() {
        return 500*ratio
    }

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width, 500*ratio);

        instance.getChildByName("containerInfo").x = stage.canvas.width/2-totalWidth/2;
    
    } ; 


window.Footer = createjs.promote(Footer, "Container");
}());