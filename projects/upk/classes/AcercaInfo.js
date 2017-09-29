(function () {

    function AcercaInfo(Iratio,Image,ItitleOne,IdescOne,ItitleTwo,IdescTwo,IarrowShape,IaspectRatio,IposY) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.image = Image
        this.titleOne = ItitleOne;
        this.descOne = IdescOne;
        this.titleTwo = ItitleTwo;
        this.descTwo = IdescTwo;
        this.arrowShape = IarrowShape;
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

    var p = createjs.extend(AcercaInfo, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        image = this.image;
        titleOne = this.titleOne;
        descOne = this.descOne;
        titleTwo  = this.titleTwo;
        descTwo = this.podescTwosY;
        arrowShape = this.arrowShape;
        aspectRatio = this.aspectRatio;
        posY = this.posY;

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
        titleTextOne.x = 100*ratio+100*ratio
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
        descTextOne.x = 200*ratio
        descTextOne.y = 540*ratio+110*ratio+50*ratio
        instance.addChild(descTextOne);

    }

    function addAnimation(){

       TweenMax.from(image, 1, {delay:1,alpha:0,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("titleTextOne"), 1, {delay:1.25,alpha:0,y:instance.getChildByName("titleTextOne").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("descTextOne"), 1, {delay:1.75,alpha:0,y:instance.getChildByName("descTextOne").y+100*ratio,ease:Expo.easeInOut})
       
    }

    p.kill = function() {

        instance.removeChild(image);
        //instance.removeChild(quoteShape);
        //instance.removeChild(instance.getChildByName("quoteText"));

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

    } ; 


window.AcercaInfo = createjs.promote(AcercaInfo, "Container");
}());