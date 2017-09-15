(function () {

    function Testimonials(Iratio,ItestimonialsTitles,ItestimonialsText,ItestimonialsStars,Istar,IstarStroke,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.testimonialsTitles = ItestimonialsTitles;
        this.testimonialsText = ItestimonialsText;
        this.testimonialsStars = ItestimonialsStars;
        this.star = Istar;
        this.starStroke = IstarStroke;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var testimonialsTitles;
    var testimonialsText;
    var testimonialsStars;
    var star;
    var starStroke;
    var posY;
    var total;

    var p = createjs.extend(Testimonials, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio
        testimonialsTitles = this.testimonialsTitles
        testimonialsText = this.testimonialsText
        testimonialsStars = this.testimonialsStars
        star = this.star
        starStroke = this.starStroke
        posY = this.posY

        total = testimonialsTitles.length;

        addElements();
        addAnimation();

    };

    function addElements(){

        var containerTestimonials = new createjs.Container();
        containerTestimonials.name = "containerTestimonials"
        containerTestimonials.y = posY;
        instance.addChild(containerTestimonials)

        for(var i=0;i<total;i++){

            var bgColor = new createjs.Shape();
            bgColor.regY = 165/2*ratio
            bgColor.name = "bgColor"+i;
            //bg.alpha = 0.01
            bgColor.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, 165*ratio);
            bgColor.y = i*165*ratio+165/2*ratio
            bgColor.scaleY = 0;
            containerTestimonials.addChild(bgColor);

            var bg = new createjs.Shape();
            bg.alpha = 0.01;
            bg.regY = 165/2*ratio
            bg.name = "bg"+i;
            //bg.alpha = 0.01
            bg.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 165*ratio);
            bg.y = i*165*ratio+165/2*ratio
            containerTestimonials.addChild(bg);

        }

    }

    function addAnimation(){

        addHits();

    }

    function addHits(){

        for(var i=0;i<total;i++){

            instance.getChildByName("containerTestimonials").getChildByName("bg"+i).cursor = "auto";
            instance.getChildByName("containerTestimonials").getChildByName("bg"+i).type = "testimonial";
            instance.getChildByName("containerTestimonials").getChildByName("bg"+i).instance = i;
            instance.getChildByName("containerTestimonials").getChildByName("bg"+i).addEventListener("mouseover", handlerOver);
            instance.getChildByName("containerTestimonials").getChildByName("bg"+i).addEventListener("mouseout", handlerOut)
            instance.getChildByName("containerTestimonials").getChildByName("bg"+i).addEventListener("click", handlerClick);

        }

    }

    function handlerOver(event){

        switch(event.target.type){
            case "testimonial":

                TweenMax.to(instance.getChildByName("containerTestimonials").getChildByName("bgColor"+event.target.instance), 0.5, {scaleY:1,ease:Expo.easeInOut})
            break;
        }

    }

    function handlerOut(event){

        switch(event.target.type){
            case "testimonial":
                TweenMax.to(instance.getChildByName("containerTestimonials").getChildByName("bgColor"+event.target.instance), 0.5, {scaleY:0,ease:Expo.easeInOut})
            break;
        }

    }

    function handlerClick(event){

        switch(event.target.type){
            case "testimonial":

            break;
        }
    }

    p.kill = function() {
        
    } ; 

    p.getHeight = function() {

        return total*165*ratio;
    }

    p.resize = function() {

        for(var i=0;i<total;i++){

            instance.getChildByName("containerTestimonials").getChildByName("bg"+i).graphics.clear();
            instance.getChildByName("containerTestimonials").getChildByName("bg"+i).graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 165*ratio);

            instance.getChildByName("containerTestimonials").getChildByName("bgColor"+i).graphics.clear();
            instance.getChildByName("containerTestimonials").getChildByName("bgColor"+i).graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width, 165*ratio);

        }

    } ; 


window.Testimonials = createjs.promote(Testimonials, "Container");
}());