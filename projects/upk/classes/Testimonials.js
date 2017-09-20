(function () {

    function Testimonials(Iratio,ItestimonialsTitles,ItestimonialsText,ItestimonialsStars,Istar,IStarStroke,Isvg,IposY) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.testimonialsTitles = ItestimonialsTitles;
        this.testimonialsText = ItestimonialsText;
        this.testimonialsStars = ItestimonialsStars;
        this.star = Istar;
        this.starStroke = IStarStroke;
        this.svg = Isvg;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;
    var testimonialsTitles;
    var testimonialsText;
    var testimonialsStars;
    var star;
    var strokeStar;
    var svg;
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
        svg = this.svg
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
            bgColor.graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width, 165*ratio);
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

            var titleTestimonials = new createjs.Text();
            titleTestimonials.name = "titleTestimonials"+i;
            titleTestimonials.font = "22px BwModelica-Bold";
            titleTestimonials.textBaseline = "alphabetic";
            titleTestimonials.color = "#8EC640";
            titleTestimonials.text = testimonialsTitles[i]
            titleTestimonials.scaleX = ratio;
            titleTestimonials.scaleY = ratio;
            titleTestimonials.x = stage.canvas.width/2-titleTestimonials.getBounds().width/2*ratio
            titleTestimonials.y = i*165*ratio+titleTestimonials.getBounds().height*ratio+30*ratio
            containerTestimonials.addChild(titleTestimonials);

            var textTestimonials = new createjs.Text();
            textTestimonials.name = "textTestimonials"+i;
            textTestimonials.font = "14px BwModelica-Regular";
            textTestimonials.textBaseline = "alphabetic";
            textTestimonials.color = "#333333";
            textTestimonials.alpha = 0.5
            textTestimonials.text = testimonialsText[i]
            textTestimonials.scaleX = ratio;
            textTestimonials.scaleY = ratio;
            textTestimonials.x = stage.canvas.width/2-textTestimonials.getBounds().width/2*ratio
            textTestimonials.y = i*165*ratio+titleTestimonials.getBounds().height*ratio+30*ratio+textTestimonials.getBounds().height*ratio+20*ratio-5*ratio
            containerTestimonials.addChild(textTestimonials);

            var containerStars = new createjs.Container();
            containerStars.name = "containerStars"+i;
            containerStars.x = -130/2*ratio+stage.canvas.width/2
            containerStars.y = textTestimonials.y+25*ratio;
            containerTestimonials.addChild(containerStars);

            for(var j=0;j<5;j++){

                var starStrokeTestimonials = svg.createSvg(starStroke,"#ECED73");
                starStrokeTestimonials.name = "starStroke"+j
                if(ratio==1)starStrokeTestimonials.x = j*30+ratio
                if(ratio==2)starStrokeTestimonials.x = j*60+ratio
                containerStars.addChild(starStrokeTestimonials);

                if(j<testimonialsStars[i]){

                    var starTestimonials = svg.createSvg(star,"#ECED73");
                    starTestimonials.name = "star"+j
                    if(ratio==1)starTestimonials.x = j*30+ratio
                    if(ratio==2)starTestimonials.x = j*60+ratio
                    containerStars.addChild(starTestimonials);

                }

            }
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
                instance.getChildByName("containerTestimonials").getChildByName("titleTestimonials"+event.target.instance).color = "#FFFFFF"
                instance.getChildByName("containerTestimonials").getChildByName("textTestimonials"+event.target.instance).alpha = 1;

                TweenMax.to(instance.getChildByName("containerTestimonials").getChildByName("bgColor"+event.target.instance), 0.5, {scaleY:1,ease:Expo.easeOut})
            break;
        }

    }

    function handlerOut(event){

        switch(event.target.type){
            case "testimonial":
                instance.getChildByName("containerTestimonials").getChildByName("titleTestimonials"+event.target.instance).color = "#8EC640"
                instance.getChildByName("containerTestimonials").getChildByName("textTestimonials"+event.target.instance).alpha = 0.5;

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

            instance.getChildByName("containerTestimonials").getChildByName("titleTestimonials"+i).x = stage.canvas.width/2-instance.getChildByName("containerTestimonials").getChildByName("titleTestimonials"+i).getBounds().width/2*ratio
            instance.getChildByName("containerTestimonials").getChildByName("textTestimonials"+i).x = stage.canvas.width/2-instance.getChildByName("containerTestimonials").getChildByName("textTestimonials"+i).getBounds().width/2*ratio
            instance.getChildByName("containerTestimonials").getChildByName("containerStars"+i).x = -130/2*ratio+stage.canvas.width/2
            
        }

    } ; 


window.Testimonials = createjs.promote(Testimonials, "Container");
}());