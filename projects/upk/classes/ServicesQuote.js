(function () {

    function ServicesQuote(Iratio,Image,IquoteShape,Iquote,IaspectRatio,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.image = Image
        this.quoteShape = IquoteShape;
        this.quote = Iquote;
        this.aspectRatio = IaspectRatio;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var image;
    var quoteShape;
    var quote;
    var aspectRatio;
    var posY;

    var p = createjs.extend(ServicesQuote, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        image = this.image;
        quoteShape = this.quoteShape;
        quote = this.quote;
        aspectRatio  = this.aspectRatio;
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

        quoteShape.x = 100*ratio+75*ratio
        quoteShape.y = image.y+260*ratio
        instance.addChild(quoteShape);

        var quoteText = new createjs.Text();
        quoteText.name = "quoteText";
        quoteText.font = "36px BwModelica-Regular";
        quoteText.textBaseline = "alphabetic";
        quoteText.color = "#333333";
        if(ratio==1)quoteText.lineWidth = stage.canvas.width/2
        if(ratio==2)quoteText.lineWidth = stage.canvas.width/2-400*ratio
        quoteText.lineHeight = 70;
        quoteText.text = quote
        quoteText.alpha = 0.8
        quoteText.scaleX = ratio;
        quoteText.scaleY = ratio;
        quoteText.x = 100*ratio+75*ratio+40*ratio+30*ratio
        quoteText.y = quoteShape.y+66*ratio
        instance.addChild(quoteText);

    }

    function addAnimation(){

       TweenMax.from(image, 1, {delay:1.25,alpha:0,ease:Expo.easeInOut})
       TweenMax.from(quoteShape, 1, {delay:1.5,alpha:0,y:quoteShape.y+100*ratio,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("quoteText"), 1, {delay:1.75,alpha:0,y:instance.getChildByName("quoteText").y+100*ratio,ease:Expo.easeInOut})
       
    }

    p.kill = function() {

        instance.removeChild(image);
        instance.removeChild(quoteShape);
        instance.removeChild(instance.getChildByName("quoteText"));

    } ; 

    p.getHeight = function() {
        return image.getBounds().height*ratio
    }

    p.resize = function() {

        image.regX = image.getBounds().width/2
        image.x = stage.canvas.width/2;
        image.y = posY;
        aspectRatio.resize(image,image.getBounds().width,image.getBounds().height,"fullWidth")

        if(ratio==1)instance.getChildByName("quoteText").lineWidth = stage.canvas.width/2
        if(ratio==2)instance.getChildByName("quoteText").lineWidth = stage.canvas.width/2-400*ratio

    } ; 


window.ServicesQuote = createjs.promote(ServicesQuote, "Container");
}());