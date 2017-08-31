(function () {

    function About(Iratio) {

        this.ratio = Iratio;
        this.Container_constructor();
        this.setup();

    }
    
    var bgAbout
    var instance;
    var ratio;
    var bgHeight;
    var titleField;
    var contentLeftfield;
    var contentRightfield;
    var subtitleField;
    var line
    var line2
    
    var contentLeft = "Born in 2012, Peninsular Port Services is based in Aveiro, Figueira da Foz and Leix\xF5es sea ports. Pensinsular's staff counts with 23 years of experience in port operations. We make sure your cargo reaches the right place, at the right time and at the lowest cost!\n\nSince opening we have grown year after year in a sustainable direction, and stages new investment's infrastructure and human resources.\n\nThe best testimony of our partners has been very positive and challenging, we work every day to improve International presence with customers and / or similar companies. "
    var contentRight = "Our ambition is to offer our customers a range of integrated logistics for the most diverse types of cargo, granting sustainable, flexible and competitive solutions.\n\nA vast network of worldwide logistic operators allow our partners to source or place goods in and out of Portugal, counting on our reliability, promptness and accuracy.\n\nBuilding long lasting partnerships, our team works closely with the customers, offering cost-efficient and highly performance solutions."

    var p = createjs.extend(About, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;

        bgAbout = new createjs.Shape();
        instance.addChild(bgAbout);

        titleField = new createjs.Text();
        titleField.font = "bold 32px PT Serif";
        titleField.color = "#FFFFFF";
        titleField.textAlign = "center"
        titleField.scaleX = ratio;
        titleField.scaleY = ratio;
        titleField.text = "Know About Us";
        titleField.x = stage.canvas.width/2;
        titleField.y = -10*ratio+100*ratio;
        instance.addChild(titleField);

        subtitleField = new createjs.Text();
        subtitleField.font = "bold 12px PT Sans";
        subtitleField.color = "#FFFFFF";
        subtitleField.textAlign = "center"
        subtitleField.scaleX = ratio
        subtitleField.scaleY = ratio
        subtitleField.text = "PENINSULAR PORT SERVICES";
        subtitleField.x = stage.canvas.width/2
        subtitleField.y = titleField.y +titleField.getBounds().height*ratio+12*ratio
        instance.addChild(subtitleField);
        subtitleField.alpha = 0.5

        contentLeftfield = new createjs.Text();
        contentLeftfield.font = "14px PT Sans";
        contentLeftfield.color = "#FFFFFF";
        contentLeftfield.lineWidth = (stage.canvas.width/2-100*ratio)/ratio
        contentLeftfield.lineHeight = 30;
        contentLeftfield.text = contentLeft;
        contentLeftfield.scaleX = ratio;
        contentLeftfield.scaleY = ratio;
        instance.addChild(contentLeftfield);

        contentLeftfield.regX = contentLeftfield.getBounds().width
        contentLeftfield.x = stage.canvas.width/2-25*ratio
        contentLeftfield.y = subtitleField.y+10*ratio+100*ratio

        contentRightfield = new createjs.Text();
        contentRightfield.font = "bold 18px PT Serif";
        contentRightfield.color = "#FFFFFF";
        contentRightfield.lineWidth = (stage.canvas.width/2-100*ratio)/ratio
        contentRightfield.lineHeight = 24;
        contentRightfield.text = contentRight;
        contentRightfield.scaleX = ratio;
        contentRightfield.scaleY = ratio;
        instance.addChild(contentRightfield);

        contentRightfield.x = stage.canvas.width/2+25*ratio
        contentRightfield.y = contentLeftfield.y + contentLeftfield.getBounds().height/2*ratio - contentRightfield.getBounds().height/2*ratio

        line = new createjs.Shape();
        line.graphics.beginFill("#ffffff").drawRect(0, 0, contentRightfield.getBounds().width*ratio,1*ratio);
        line.x = contentRightfield.x;
        line.y = contentLeftfield.y;
        line.alpha = 0.5;
        instance.addChild(line);

        line2 = new createjs.Shape();
        line2.graphics.beginFill("#ffffff").drawRect(0, 0, contentRightfield.getBounds().width*ratio,1*ratio);
        line2.x = contentRightfield.x;
        line2.y = contentLeftfield.y+contentLeftfield.getBounds().height*ratio;
        line2.alpha = 0.5;
        instance.addChild(line2);

        bgHeight = contentLeftfield.y+contentLeftfield.getBounds().height*ratio+100*ratio;
        bgAbout.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width,bgHeight);

    };

    p.resize = function (){
        
        contentLeftfield.lineWidth = (stage.canvas.width/2-100*ratio)/ratio
        contentLeftfield.regX = contentLeftfield.getBounds().width
        contentLeftfield.x = stage.canvas.width/2-25*ratio
        contentLeftfield.y = subtitleField.y+10*ratio+100*ratio

        contentRightfield.lineWidth = (stage.canvas.width/2-100*ratio)/ratio
        contentRightfield.x = stage.canvas.width/2+25*ratio
        contentRightfield.y = contentLeftfield.y + contentLeftfield.getBounds().height/2*ratio - contentRightfield.getBounds().height/2*ratio

        line.graphics.clear();
        line.graphics.beginFill("#ffffff").drawRect(0, 0, contentRightfield.getBounds().width*ratio,1*ratio);
        line.alpha = 0.5
        line.x = contentRightfield.x;
        line.y = contentLeftfield.y;
        
        line2.graphics.clear();
        line2.graphics.beginFill("#ffffff").drawRect(0, 0, contentRightfield.getBounds().width*ratio,1*ratio);
        line2.alpha = 0.5
        
        line2.x = contentRightfield.x;
        line2.y = contentLeftfield.y+contentLeftfield.getBounds().height*ratio;

        bgHeight = contentLeftfield.y+contentLeftfield.getBounds().height*ratio+100*ratio;
        bgAbout.graphics.clear();
        bgAbout.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width,bgHeight);

        titleField.x = stage.canvas.width/2
        titleField.y = -10*ratio+100*ratio;

        subtitleField.x = stage.canvas.width/2
        subtitleField.y = titleField.y +titleField.getBounds().height*ratio+12*ratio
       
    }

    p.getHeight = function (){
       return bgHeight;
    } 

window.About = createjs.promote(About, "Container");
}());