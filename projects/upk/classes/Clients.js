(function () {

    function Clients(Iratio,Image,Ititle,IaspectRatio,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.image = Image
        this.title = Ititle;
        this.aspectRatio = IaspectRatio;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var image;
    var title;
    var aspectRatio;
    var posY;

    var p = createjs.extend(Clients, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        image = this.image;
        title = this.title;
        posY =  this.posY
        aspectRatio = this.aspectRatio

        addElements();
        addAnimation();

    };

    function addElements(){
        
        var titleSection = new createjs.Text();
        titleSection.name = "titleSection";
        titleSection.font = "48px BwModelica-ExtraBold";
        titleSection.textBaseline = "alphabetic";
        titleSection.color = "#333333";
        titleSection.text = title
        titleSection.scaleX = ratio;
        titleSection.scaleY = ratio;
        titleSection.x = stage.canvas.width/2-titleSection.getBounds().width/2*ratio
        titleSection.y = posY+titleSection.getBounds().height*ratio+100*ratio
        instance.addChild(titleSection);

        var strokeTestimonial = new createjs.Shape();
        strokeTestimonial.name = "strokeTestimonial";
        strokeTestimonial.graphics.beginFill("#8EC640").drawRect(0, 0, 127*ratio, 4*ratio);
        strokeTestimonial.x = stage.canvas.width/2-127/2*ratio
        strokeTestimonial.y = titleSection.y+50*ratio
        instance.addChild(strokeTestimonial);

        image.regX = image.getBounds().width/2
        image.x = stage.canvas.width/2
        image.y = strokeTestimonial.y+60*ratio
        aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"areaClient")
        instance.addChild(image);


    }

    function addAnimation(){

    }

    function addHits(){

    }


    p.kill = function() {

        instance.removeChild(image);
        instance.removeChild(instance.getChildByName("strokeTestimonial"));
        instance.removeChild(instance.getChildByName("titleSection"));
    } ; 

    p.getHeight = function() {
        return 600*ratio
    }

    p.resize = function() {

        instance.getChildByName("titleSection").x = stage.canvas.width/2-instance.getChildByName("titleSection").getBounds().width/2*ratio
        instance.getChildByName("strokeTestimonial").x = stage.canvas.width/2-127/2*ratio

        image.regX = image.getBounds().width/2
        image.x = stage.canvas.width/2
        aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"areaClient")

    } ; 


window.Clients = createjs.promote(Clients, "Container");
}());