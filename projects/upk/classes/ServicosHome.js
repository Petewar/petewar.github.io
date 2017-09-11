(function () {

    function ServicosHome(Iratio,Images,IaspectRatio,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.images = Images
        this.aspectRatio = IaspectRatio;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var images;
    var aspectRatio;
    var posY;

    var p = createjs.extend(ServicosHome, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        images = this.images;
        aspectRatio  = this.aspectRatio;
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

    }

    function addAnimation(){

       TweenMax.from(images[0], 1, {delay:1.25,alpha:0,ease:Expo.easeInOut})
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