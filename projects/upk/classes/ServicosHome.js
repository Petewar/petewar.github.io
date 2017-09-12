(function () {

    function ServicosHome(Iratio,Images,Ititle,Itext,IaspectRatio,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.images = Images
        this.title = Ititle;
        this.text = Itext;
        this.aspectRatio = IaspectRatio;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var images;
    var title;
    var text;
    var aspectRatio;
    var posY;

    var p = createjs.extend(ServicosHome, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        images = this.images;
        aspectRatio  = this.aspectRatio;
        title = this.title;
        text = this.text;
        posY = this.posY;

        addElements();
        addAnimation();

    };

    function addElements(){

        images[0].regX = images[0].getBounds().width/2
        images[0].x = stage.canvas.width/2;
        images[0].y = posY;
        aspectRatio.resize(images[0],images[0].getBounds().width,images[0].getBounds().height,"fullWidth")
        instance.addChild(images[0]);

        var titleServices = new createjs.Text();
        titleServices.name = "titleServices";
        titleServices.font = "48px BwModelica-ExtraBold";
        titleServices.textBaseline = "alphabetic";
        titleServices.color = "#333333";
        titleServices.text = title
        titleServices.scaleX = ratio;
        titleServices.scaleY = ratio;
        titleServices.x = 100*ratio+80*ratio
        titleServices.y = posY+150*ratio;
        instance.addChild(titleServices);

        var textServices = new createjs.Text();
        textServices.name = "textServices";
        textServices.font = "20px BwModelica-Light";
        textServices.textBaseline = "alphabetic";
        textServices.color = "#333333";
        textServices.lineWidth = stage.canvas.width/2
        textServices.lineHeight = 30;
        textServices.text = text
        textServices.scaleX = ratio;
        textServices.scaleY = ratio;
        textServices.x = 100*ratio+80*ratio
        textServices.y = titleServices.y+titleServices.getBounds().height*ratio
        instance.addChild(textServices);

    }

    function addAnimation(){

       TweenMax.from(images[0], 1, {delay:1.25,alpha:0,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("titleServices"), 1, {delay:1.5,alpha:0,y:instance.getChildByName("titleServices").y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("textServices"), 1, {delay:1.75,alpha:0,y:instance.getChildByName("textServices").y+100*ratio,ease:Expo.easeInOut})
    }

    function addHits(){

        
    }

    function handlerOver(event){


    }

    function handlerOut(event){

    }

    function handlerClick(event){

    }

    p.kill = function() {

        instance.removeChild(images[0]);
        instance.removeChild(instance.getChildByName("titleServices"));
        instance.removeChild(instance.getChildByName("textServices"));

    } ; 

    p.getHeight = function() {
        return images[0].getBounds().height*ratio
    }

    p.resize = function() {

        images[0].regX = images[0].getBounds().width/2
        images[0].x = stage.canvas.width/2;
        images[0].y = posY;
        aspectRatio.resize(images[0],images[0].getBounds().width,images[0].getBounds().height,"fullWidth")

    } ; 


window.ServicosHome = createjs.promote(ServicosHome, "Container");
}());