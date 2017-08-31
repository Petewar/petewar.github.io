(function () {

    function Project(Iratio,IaspectRatio,Isvg,IcontentLoaded,Ishape,Icolor1,Icolor2,IcontentTxt,IButtonTxt,Ititle,ImenuPos,Inav,ItotalNav,IshapeWidth,IshapeHeight) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.svg = Isvg;
        this.shape = Ishape;
        this.color1 = Icolor1;
        this.color2 = Icolor2;
        this.contentLoaded = IcontentLoaded;
        this.contentTxt = IcontentTxt;
        this.titleTxt = Ititle;
        this.menuPos = ImenuPos
        this.buttonText = IButtonTxt
        this.nav = Inav
        this.totalNav = ItotalNav
        this.shapeWidth = IshapeWidth
        this.shapeHeight = IshapeHeight
        this.setup();

    }
    
    var instance;
    var ratio;
    var aspectRatio;
    var svg;
    
    var imageWidth
    var imageHeight
    var shapeWidth;
    var shapeHeight;
    var menuPos;

    var contentLoaded;
    var timer;

    var shapeSvg;
    
    var color1;
    var color2;
    
    var nav;
    var totalNav;
    var spaceBetweenNav;

    var contentTxt;
    var contentfield
    var shape;
    var bg;
    var maskImage;
    var parallax;
    var parallax1;
    var parallax2;
    var parallax3;
    var parallax4;
    var titleTxt;
    var titlefield;
    var buttonText;
    var line;
    var line3;
    var numberField;

    var bottomLineY;
    var bottomLineX;

    var p = createjs.extend(Project, createjs.Container);

    p.setup = function() {
        //
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        svg = this.svg;
        contentLoaded = this.contentLoaded;
        contentTxt = this.contentTxt;
        titleTxt = this.titleTxt
        menuPos = this.menuPos;
        buttonText = this.buttonText
        totalNav = this.totalNav
        nav = this.nav
        shape = this.shape;
        color1 = this.color1;
        color2 = this.color2;
        instance = this;
        shapeWidth = this.shapeWidth
        shapeHeight = this.shapeHeight
        
        //Bg Image
        bg = new createjs.Container();
        bg.addChild(contentLoaded[1]);
        instance.addChild(bg);
        aspectRatio.resize(bg,1680,1000);
        bg.alpha = 0;
        createjs.Tween.get(bg)
        .to({alpha:1}, 800, createjs.Ease.circInOut)
        
        //Parallax1
        parallax1 = new createjs.Container();
        parallax1.addChild(contentLoaded[2]);
        instance.addChild(parallax1);
        parallax1.x = Math.floor((Math.random() * stage.canvas.width))
        parallax1.y = Math.floor((Math.random() * stage.canvas.height))
        parallax1.scaleX = 0;
        parallax1.scaleY = 0;
        createjs.Tween.get(parallax1)
        .wait(400)
        .to({scaleX:ratio/2,scaleY:ratio/2}, 600, createjs.Ease.circInOut)
        
        //Parallax2
        parallax2 = new createjs.Container();
        parallax2.addChild(contentLoaded[3]);
        instance.addChild(parallax2);
        parallax2.scaleX = 0;
        parallax2.scaleY = 0;
        parallax2.x = Math.floor((Math.random() * stage.canvas.width))
        parallax2.y = Math.floor((Math.random() * stage.canvas.height))
        createjs.Tween.get(parallax2)
        .wait(400)
        .to({scaleX:ratio/2,scaleY:ratio/2}, 300, createjs.Ease.circInOut)

        //Parallax3
        parallax3 = new createjs.Container();
        parallax3.addChild(contentLoaded[4]);
        instance.addChild(parallax3);
        parallax3.scaleX = 0;
        parallax3.scaleY = 0;
        parallax3.x = Math.floor((Math.random() * stage.canvas.width))
        parallax3.y = Math.floor((Math.random() * stage.canvas.height))
        createjs.Tween.get(parallax3)
        .wait(400)
        .to({scaleX:ratio/2,scaleY:ratio/2}, 400, createjs.Ease.circInOut)

        //Parallax4
        parallax4 = new createjs.Container();
        parallax4.addChild(contentLoaded[5]);
        instance.addChild(parallax4);
        parallax4.x = Math.floor((Math.random() * stage.canvas.width))
        parallax4.y = Math.floor((Math.random() * stage.canvas.height))
        parallax4.scaleX = 0;
        parallax4.scaleY = 0;
        createjs.Tween.get(parallax4)
        .wait(400)
        .to({scaleX:ratio/2,scaleY:ratio/2}, 800, createjs.Ease.circInOut)

        //Mask Image
        maskImage = new createjs.Container();
        maskImage.addChild(contentLoaded[0]);
        aspectRatio.resize(maskImage,1680,1000);
        maskImage.scaleX = ratio/1.7
        maskImage.scaleY = ratio/1.7
        imageWidth = maskImage.getBounds().width*(ratio/1.7);
        imageHeight = maskImage.getBounds().height*(ratio/1.7);
        maskImage.x = stage.canvas.width/2-imageWidth/2
        maskImage.y = stage.canvas.height/2-imageHeight/2
        instance.addChild(maskImage);

        //Line project Number
        line = new createjs.Shape();
        line.graphics.beginFill("#333333").drawRect(0, 0, 1*ratio, stage.canvas.width/6);
        line.alpha = 0.2
        instance.addChild(line);
        
        //Shape Project
        shapeSvg = svg.createSvg(shape);
        shapeSvg.x = stage.canvas.width/2-(shapeWidth/2)*ratio
        shapeSvg.y = stage.canvas.height/2-(shapeHeight/2)*ratio
        shapeSvg.scaleX = 0;
        shapeSvg.scaleY = 0;
        createjs.Tween.get(shapeSvg).to({scaleX:1*ratio,scaleY:1*ratio}, 500, createjs.Ease.backOut)
        maskImage.mask = shapeSvg;

        //Title project 
        titlefield = new createjs.Text();
        titlefield.font = "bold 48px Montserrat";
        titlefield.color = color2;
        titlefield.alpha=0.9
        titlefield.lineHeight = 40;
        titlefield.text = titleTxt;
        titlefield.scaleX = ratio;
        titlefield.scaleY = ratio;
        instance.addChild(titlefield);
        
        //Line project Number
        line3 = new createjs.Shape();
        line3.graphics.beginFill("#333333").drawRect(0, 0, 20*ratio, 1*ratio);
        instance.addChild(line3);
        

        //Current Project Number
        var currentNav = nav+1
        numberField = new createjs.Text();
        numberField.font = "10px Montserrat";
        numberField.color = "#333333";
        numberField.text = "0"+currentNav;
        numberField.textAlign = "center"
        numberField.scaleX = ratio;
        numberField.scaleY = ratio;
        instance.addChild(numberField);
        
        //Position project Component
        spaceBetweenNav = Math.floor((stage.canvas.height/6)/totalNav)/2;
        switch(menuPos) {
            case "TL":
               
            break;
            case "TR":
                bottomLineX = Math.floor(stage.canvas.width/2+stage.canvas.width/8)
                bottomLineY = Math.floor(stage.canvas.height/2-(stage.canvas.width/6));
                line.x = bottomLineX
                line.y = bottomLineY-(stage.canvas.width/6)/4
                line3.x = bottomLineX-20*ratio-5*ratio
                line3.y = bottomLineY-(stage.canvas.width/6)/4 + stage.canvas.width/6-1*ratio-(spaceBetweenNav*ratio)*nav;
                numberField.x = bottomLineX-15*ratio
                numberField.y = bottomLineY-(stage.canvas.width/6)/4 + stage.canvas.width/6-1*ratio-(spaceBetweenNav*ratio)*nav-15*ratio;;
                titlefield.x= bottomLineX+20*ratio
                titlefield.y= numberField.y-titlefield.getBounds().height/2-50*ratio
            break;
            case "BL":
                bottomLineX = Math.floor(stage.canvas.width/2-stage.canvas.width/4)
                bottomLineY = Math.floor(stage.canvas.height/2+(stage.canvas.width/6)/4)
                line.x = bottomLineX
                line.y = bottomLineY
                line3.x = bottomLineX-20*ratio-5*ratio
                line3.y = bottomLineY+(stage.canvas.width/6)-1*ratio-(spaceBetweenNav*ratio)*nav;
                numberField.x = bottomLineX-15*ratio
                numberField.y = bottomLineY+(stage.canvas.width/6)-1*ratio-(spaceBetweenNav*ratio)*nav-15*ratio;
                titlefield.x= bottomLineX+20*ratio
                titlefield.y= numberField.y-titlefield.getBounds().height/2-50*ratio
            break;
            case "BR":
                
            break;
        }

        start();
    }

    function start() {
        timer = setTimeout(createParallax(), 5000);
    }

    function stop() {
     if(parallax){
        parallax.dispose();
        parallax = null
        clearTimeout(timer);
        //start();  
     }
     
    }

    function createParallax(){
            
            if(parallax==null){
            parallax = new zim.Parallax(stage, .2, [
                {obj:bg, prop:"y", propChange:10},
                {obj:maskImage, prop:"y", propChange:20},
                {obj:shapeSvg, prop:"x", propChange:300},
                {obj:parallax1, prop:"y", propChange:50},
                {obj:parallax2, prop:"y", propChange:200},
                {obj:parallax3, prop:"y", propChange:400},
                {obj:parallax4, prop:"y", propChange:600},
                {obj:titlefield, prop:"x", propChange:25}]
            );

            // 3. decide if you need to set the object to the starting properties
            parallax.immediate([bg.y,maskImage.x, shapeSvg.x,parallax1.y,parallax2.y,parallax3.y,parallax4.y,titlefield.x]);
        }
    }

    p.kill = function() {

        stop();

        bg.removeChild(contentLoaded[1]);
        instance.removeChild(bg);
        instance.removeChild(parallax4);
        instance.removeChild(parallax3);
        instance.removeChild(parallax2);
        instance.removeChild(parallax1);
        maskImage.removeChild(contentLoaded[0]);
        instance.removeChild(maskImage);
        instance.removeChild(shapeSvg);
        instance.removeChild(titlefield)
        instance.removeChild(line);
        instance.removeChild(line3);
        instance.removeChild(numberField);
        
        bg = null;
        parallax4 = null;
        parallax3 = null;
        parallax2 = null;
        parallax1 = null;
        maskImage = null;
        shapeSvg = null;
        line = null;
        titlefield = null;
        line3 = null
        numberField = null

    }

    p.resize = function() {
        
        stop();

        if(maskImage){
            aspectRatio.resize(maskImage,1680,1000);
            maskImage.scaleX = ratio/1.7
            maskImage.scaleY = ratio/1.7
            width = maskImage.getBounds().width*(ratio/1.7);
            height = maskImage.getBounds().height*(ratio/1.7);
            maskImage.x = stage.canvas.width/2-width/2
            maskImage.y = stage.canvas.height/2-height/2
        }

        if(shapeSvg){
            shapeSvg.x = stage.canvas.width/2-(shapeWidth/2)*ratio
            shapeSvg.y = stage.canvas.height/2-(shapeHeight/2)*ratio
        }

        if(bg)aspectRatio.resize(bg,1680,1000);

        switch(menuPos) {
            case "TL":
               
            break;
            case "TR":
                bottomLineX = Math.floor(stage.canvas.width/2+stage.canvas.width/8)
                bottomLineY = Math.floor(stage.canvas.height/2-(stage.canvas.width/6));
                line.x = bottomLineX
                line.y = bottomLineY-(stage.canvas.width/6)/4
                line3.x = bottomLineX-20*ratio-5*ratio
                line3.y = bottomLineY-(stage.canvas.width/6)/4 + stage.canvas.width/6-1*ratio-(spaceBetweenNav*ratio)*nav;
                numberField.x = bottomLineX-15*ratio
                numberField.y = bottomLineY-(stage.canvas.width/6)/4 + stage.canvas.width/6-1*ratio-(spaceBetweenNav*ratio)*nav-15*ratio;;
                titlefield.x= bottomLineX+20*ratio
                titlefield.y= numberField.y-titlefield.getBounds().height/2-50*ratio
            break;
            case "BL":
                bottomLineX = Math.floor(stage.canvas.width/2-stage.canvas.width/4)
                bottomLineY = Math.floor(stage.canvas.height/2+(stage.canvas.width/6)/4)
                line.x = bottomLineX
                line.y = bottomLineY
                line3.x = bottomLineX-20*ratio-5*ratio
                line3.y = bottomLineY+(stage.canvas.width/6)-1*ratio-(spaceBetweenNav*ratio)*nav;
                numberField.x = bottomLineX-15*ratio
                numberField.y = bottomLineY+(stage.canvas.width/6)-1*ratio-(spaceBetweenNav*ratio)*nav-15*ratio;
                titlefield.x= bottomLineX+20*ratio
                titlefield.y= numberField.y-titlefield.getBounds().height/2-50*ratio
            break;
            case "BR":
                
            break;
            }
    } ;  

window.Project = createjs.promote(Project, "Container");
}());