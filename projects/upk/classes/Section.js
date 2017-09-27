(function () {

    function Section(Iratio,Image,Ititle,IaspectRatio,IposY) {
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

    var p = createjs.extend(Section, createjs.Container);

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
        
        if(image!=null){

            image.regX = image.getBounds().width/2
            image.regY = image.getBounds().height/2
            image.x = stage.canvas.width/2
            image.y = posY+240/2*ratio
            aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"areaSection")
            instance.addChild(image);

            var bgMask = new createjs.Shape();
            bgMask.name = "bgMask";
            bgMask.alpha = 0.01
            bgMask.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width, 240*ratio);
            bgMask.y = posY
            instance.addChild(bgMask);

            image.mask = bgMask

        }else{

            var bg = new createjs.Shape();
            bg.name = "bg";
            bg.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, 240*ratio);
            bg.y = posY
            instance.addChild(bg);

        }

        var titleSection = new createjs.Text();
        titleSection.name = "titleSection";
        titleSection.font = "48px BwModelica-ExtraBold";
        titleSection.textBaseline = "alphabetic";
        titleSection.color = "#333333";
        titleSection.text = title
        titleSection.scaleX = ratio;
        titleSection.scaleY = ratio;
        titleSection.x = stage.canvas.width/2-titleSection.getBounds().width/2*ratio
        titleSection.y = posY+titleSection.getBounds().height*ratio-20*ratio+80*ratio
        instance.addChild(titleSection);

        var strokeTestimonial = new createjs.Shape();
        strokeTestimonial.name = "strokeTestimonial";
        strokeTestimonial.graphics.beginFill("#8EC640").drawRect(0, 0, 127*ratio, 4*ratio);
        strokeTestimonial.x = stage.canvas.width/2-127/2*ratio
        strokeTestimonial.y = posY+titleSection.getBounds().height*ratio-20*ratio+80*ratio+50*ratio
        instance.addChild(strokeTestimonial);

    }

    function addAnimation(){

    }

    function addHits(){

    }


    p.kill = function() {

        if(image!=null){
            instance.removeChild(image)
            instance.removeChild(instance.getChildByName("bgMask"))
        }else{
            instance.removeChild(instance.getChildByName("bg"))
        }

        instance.removeChild(instance.getChildByName("titleSection"))
        instance.removeChild(instance.getChildByName("strokeTestimonial"))
    } ; 

    p.getHeight = function() {
        return 240*ratio
    }

    p.resize = function() {

        if(image!=null){
            image.regX = image.getBounds().width/2
            image.regY = image.getBounds().height/2
            image.x = stage.canvas.width/2
            image.y = posY+240/2*ratio
            aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"areaSection")

            instance.getChildByName("bgMask").graphics.clear();
            instance.getChildByName("bgMask").graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width, 240*ratio);
            instance.getChildByName("bgMask").y = posY
        }else{

            instance.getChildByName("bg").graphics.clear();
            instance.getChildByName("bg").graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, 240*ratio);
            instance.getChildByName("bg").y = posY

        }

        instance.getChildByName("titleSection").x = stage.canvas.width/2-instance.getChildByName("titleSection").getBounds().width/2*ratio
        instance.getChildByName("titleSection").y = posY+instance.getChildByName("titleSection").getBounds().height*ratio-20*ratio+80*ratio

        instance.getChildByName("strokeTestimonial").x = stage.canvas.width/2-127/2*ratio
        instance.getChildByName("strokeTestimonial").y = posY+instance.getChildByName("titleSection").getBounds().height*ratio-20*ratio+80*ratio+50*ratio

    } ; 


window.Section = createjs.promote(Section, "Container");
}());