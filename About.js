(function () {

    function About(Iinstance,Iratio,ISvgClose,IBlackSvg) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.closeSvg = ISvgClose
        this.instanceDispatch = Iinstance
        this.blackSvg = IBlackSvg
        this.setup();

    }
    
    var ratio;
    var instance

    var bg;
    var aboutfield;
    var contentfield;
    var contactMe;
    var boundContact;
    var line;
    var boundCV;

    var closeSvg;
    var blackSvg;

    var instanceDispatch;

    var width = 500
    
    var p = createjs.extend(About, createjs.Container);

    p.setup = function() {
        //
        ratio = this.ratio;
        instance = this;
        closeSvg = this.closeSvg;
        blackSvg = this.blackSvg

        //Bg
        bg = new createjs.Shape();
        bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, width*ratio,stage.canvas.height);
        bg.x= stage.canvas.width-width*ratio;
        instance.addChild(bg);
        instanceDispatch = this.instanceDispatch;

        //About Title
        aboutfield = new createjs.Text();
        aboutfield.font = "bold 34px Montserrat";
        aboutfield.color = "#333333";
        aboutfield.text = "About";
        aboutfield.x= bg.x+50*ratio
        aboutfield.y= 44*ratio+6*ratio
        aboutfield.scaleX = ratio;
        aboutfield.scaleY = ratio;
        instance.addChild(aboutfield);

        //content
        contentfield = new createjs.Text();
        contentfield.font = "16px Source";
        contentfield.color = "#333333";
        contentfield.alpha=0.7
        contentfield.lineWidth = 400
        contentfield.text = "Hi,\n\nMy name is Pedro Guerra and i live in Portugal. I design and develop new media content.\n\nMy main goal in creative projects is the detail of animations and pixel perfect interfaces, using video, svg graphics, gifs or animated png sprites to create the all experience.\n\nWorking along 12 years in the creative industries, i worked for several companies such as Mega, Triworks and R3born designing and developing multimedia products. \n\nMy best achievement in the industry it was winning 2 Fwa SOTY Awards (Favourite website of the Day) some years ago when working for Triworks.net.";
        contentfield.lineHeight = 25;
        contentfield.x= aboutfield.x
        contentfield.y= aboutfield.y+aboutfield.getBounds().height*ratio+100
        contentfield.scaleX = ratio;
        contentfield.scaleY = ratio;
        instance.addChild(contentfield);

        //Contact Me & Bound
        contactMe = new createjs.Text();
        contactMe.font = "bold 18px Source";
        contactMe.color = "#333333";
        contactMe.lineWidth = 200
        contactMe.text = "Feel Free to contact me !";
        contactMe.lineHeight = 20;
        contactMe.x= contentfield.x
        contactMe.y= contentfield.y+contentfield.getBounds().height*ratio+50
        contactMe.alpha = 0.7
        contactMe.scaleX = ratio;
        contactMe.scaleY = ratio;
        instance.addChild(contactMe);

        boundContact = new createjs.Shape();
        boundContact.cursor = "pointer";
        boundContact.alpha = 0.01
        boundContact.graphics.beginFill("#FFFFFF").drawRect(0, 0, contactMe.getBounds().width*ratio,contactMe.getBounds().height*ratio);
        boundContact.x= contactMe.x
        boundContact.y= contactMe.y
        boundContact.action = "scale";
        boundContact.addEventListener("click", handlerClick);
        boundContact.addEventListener("mouseover", handlerOver);
        boundContact.addEventListener("mouseout", handlerOut);
        instance.addChild(boundContact);

        line = new createjs.Shape();
        line.graphics.beginFill("#333333").drawRect(0, 0, contactMe.getBounds().width*ratio,1*ratio);
        line.scaleX=0
        line.x= contactMe.x
        line.y= contactMe.y+contactMe.getBounds().height*ratio-2*ratio+5*ratio
        instance.addChild(line);

        //Cv & Bound
        blackSvg.x = aboutfield.x
        blackSvg.cursor = "pointer"
        blackSvg.scaleX = ratio/1.2
        blackSvg.scaleY = ratio/1.2
        blackSvg.y = boundContact.y+20*ratio+40*ratio
        instance.addChild(blackSvg);
       
        boundCV = new createjs.Shape();
        boundCV.cursor = "pointer";
        boundCV.alpha = 0.01
        boundCV.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,40*ratio);
        boundCV.x=  blackSvg.x
        boundCV.y= blackSvg.y
        boundCV.action = "alpha2";
        boundCV.addEventListener("click", handlerClick);
        boundCV.addEventListener("mouseover", handlerOver);
        boundCV.addEventListener("mouseout", handlerOut);
        instance.addChild(boundCV);
        
        //Close Svg & Bound
        closeSvg.x = stage.canvas.width-25*ratio-50*ratio
        closeSvg.y = aboutfield.y+5*ratio
        instance.addChild(closeSvg);

        boundClose = new createjs.Shape();
        boundClose.cursor = "pointer";
        boundClose.alpha = 0.01
        boundClose.graphics.beginFill("#FFFFFF").drawRect(0, 0, 25*ratio,25*ratio);
        boundClose.x=  closeSvg.x
        boundClose.y= closeSvg.y
        boundClose.action = "alpha";
        boundClose.addEventListener("click", handlerClick);
        boundClose.addEventListener("mouseover", handlerOver);
        boundClose.addEventListener("mouseout", handlerOut);
        instance.addChild(boundClose);
    }

    function handlerOver(evt){
        if(evt.target.action =="scale") createjs.Tween.get(line).to({scaleX:1}, 200, createjs.Ease.circInOut)
        if(evt.target.action =="alpha") createjs.Tween.get(closeSvg).to({alpha:0.5}, 200, createjs.Ease.circInOut)
        if(evt.target.action =="alpha2") createjs.Tween.get(blackSvg).to({alpha:0.7}, 200, createjs.Ease.circInOut)
    }


    function handlerOut(evt){
        if(evt.target.action =="scale") createjs.Tween.get(line).to({scaleX:0}, 200, createjs.Ease.circInOut)
        if(evt.target.action =="alpha") createjs.Tween.get(closeSvg).to({alpha:1}, 200, createjs.Ease.circInOut)
        if(evt.target.action =="alpha2") createjs.Tween.get(blackSvg).to({alpha:1}, 200, createjs.Ease.circInOut)
    }

    function handlerClick(evt){
        if(evt.target.action =="scale") window.open("mailto:petewar@icloud.com?Subject=Let's Talk, I'm accepting freelance jobs","_self");
        if(evt.target.action =="alpha") {
            var customEvent = new createjs.Event("closeAbout");
            instanceDispatch.dispatchEvent(customEvent);
        }
        if(evt.target.action =="alpha2"){
            window.open("http://www.petewar.com/data/pedroguerra_cv.pdf","_blank");
        }
    }

    p.kill = function() {

        boundContact.removeEventListener("click", handlerClick);
        boundContact.removeEventListener("mouseover", handlerOver);
        boundContact.removeEventListener("mouseout", handlerOut);

        boundClose.removeEventListener("click", handlerClick);
        boundClose.removeEventListener("mouseover", handlerOver);
        boundClose.removeEventListener("mouseout", handlerOut);

        boundCV.removeEventListener("click", handlerClick);
        boundCV.removeEventListener("mouseover", handlerOver);
        boundCV.removeEventListener("mouseout", handlerOut);
    }

    p.resize = function() {

        bg.graphics.clear();
        bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, width*ratio,stage.canvas.height);
        bg.x= stage.canvas.width-width*ratio;

        aboutfield.x= bg.x+50*ratio
        aboutfield.y= 44*ratio+6*ratio

        contentfield.x= aboutfield.x
        contentfield.y= aboutfield.y+aboutfield.getBounds().height*ratio+100

        contactMe.x= contentfield.x
        contactMe.y= contentfield.y+contentfield.getBounds().height*ratio+100

        boundContact.x= contactMe.x
        boundContact.y= contactMe.y

        line.x= contactMe.x
        line.y= contactMe.y+contactMe.getBounds().height*ratio-2*ratio+5*ratio

        closeSvg.x = stage.canvas.width-25*ratio-50*ratio
        closeSvg.y = aboutfield.y+5*ratio

        boundClose.x=  closeSvg.x
        boundClose.y= closeSvg.y

        blackSvg.x = aboutfield.x
        blackSvg.y = boundContact.y+20*ratio+25*ratio

    } ;  

window.About = createjs.promote(About, "Container");
}());