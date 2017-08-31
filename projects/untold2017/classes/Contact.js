(function () {

    function Contact(Iinstance,Iratio,Imargin,ItweenTime,IaspectRatio,IShapeTriangle,IDigitCode,Idata,Ibg,IArrowRight,IArrowLeftWhite,IArrowRightWhite,Ithanks,Isound,IDigitCodePiece) {

        this.Container_constructor();
        this.dispatchInstance = Iinstance;
        this.ratio = Iratio;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.aspectRatio = IaspectRatio;
        this.shapeTriangle = IShapeTriangle;
        this.digitCode = IDigitCode;
        this.dataTo = Idata;
        this.bgImage = Ibg;
        this.arrowRight = IArrowRight;
        this.arrowLeftWhite = IArrowLeftWhite;
        this.arrowRightWhite = IArrowRightWhite;
        this.thankYou = Ithanks;
        this.soundInstance = Isound;
        this.digitCodePiece = IDigitCodePiece;
        this.setup();

    }

    //elements
    var aspectRatio;
    var margin;
    var tweenTime;
    var ratio;
    var dispatchInstance;
    var dataLoaded;
    var shapeTriangle;
    var digitCode;
    var containerContact
    var titleText;
    var descText
    var titleStartText;
    var numberText
    var ofText
    var totalWidthBudget
    var sucessText;
    var mySound
    var digitCodePiece

    var helloTitleText
    var helloDescText
    var workTitleText
    var workDescText
    var forwardTitleText
    var marginheight
    var bgImage
    var arrowRight;
    var hitStartProject
    var viewForm=false
    var containerBack;
    var clickText;
    var backText
    var backarrowText
    var backHit
    var nav = 0;
    var navLength = 5;
    var containerNavigation;
    var containerRadio
    var arrowLeftWhite;
    var arrowRightWhite;
    var clickHit;
    var nextHit
    var lengthText
    var descText
    var strokeInput
    var containerInput
    var dataToSend = [];
    var dataToGhost = [];
    var isBudget = "";
    var endForm = false
    var thankYou;

    var p = createjs.extend(Contact, createjs.Container);

    p.setup = function() {

    	instance = this;
        instanceRefresh= this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        margin = this.margin;
        tweenTime = this.tweenTime;
        aspectRatio = this.aspectRatio;
        dataToLoad = this.dataToLoad
        dispatchInstance = this.dispatchInstance;
        shapeTriangle = this.shapeTriangle;
        dataLoaded = this.dataTo;
        bgImage = this.bgImage;
        arrowRight = this.arrowRight
        arrowLeftWhite = this.arrowLeftWhite
        arrowRightWhite = this.arrowRightWhite
        thankYou = this.thankYou;
        mySound = this.soundInstance
        digitCodePiece = this.digitCodePiece

        if(ratio<2)marginheight = 200
        else marginheight = 100
    } ;

    p.open = function() {
        
        console.log("Open Contact");

        instance = instanceRefresh
        
        viewForm=false
        endForm = false
        nav = 0;
        dataToSend = [];
        dataToGhost = [];
        isBudget = "";

        addElements();
        addElementsAnimation();
        
        timer = setTimeout(addHits, 2500);

    }

    p.close = function() {
        
        console.log("Close Contact")

        bgImage.cursor = "auto"
        bgImage.removeEventListener("mouseover", handlerOver);

        shapeHit1.removeEventListener("mouseover", handlerOverContact);
        shapeHit1.removeEventListener("mouseout", handlerOutContact);
        shapeHit1.removeEventListener("click", handlerClickContact);

        
        shapeHit2.removeEventListener("mouseover", handlerOverContact);
        shapeHit2.removeEventListener("mouseout", handlerOutContact);
        shapeHit2.removeEventListener("click", handlerClickContact);

       
        shapeHit3.removeEventListener("mouseover", handlerOverContact);
        shapeHit3.removeEventListener("mouseout", handlerOutContact);
        shapeHit3.removeEventListener("click", handlerClickContact);

        if(viewForm==false){

            TweenMax.to(titleText, tweenTime, {alpha:0,ease:Expo.easeInOut})

            TweenMax.to(helloTitleText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(workTitleText, tweenTime, {alpha:0,ease:Expo.easeInOut})  
            TweenMax.to(forwardTitleText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(titleAddressText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(phoneTitleText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(skypeTitleText, tweenTime, {alpha:0,ease:Expo.easeInOut})

            TweenMax.to(helloDescText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(workDescText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(forwardDescText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(descAddressText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(descPhoneText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(descSkypeText, tweenTime, {alpha:0,ease:Expo.easeInOut})

            TweenMax.to(startProjectText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(arrowRight, tweenTime, {alpha:0,ease:Expo.easeInOut})

            TweenMax.to(containerContact, tweenTime, {y:stage.canvas.height/2,ease:Expo.easeInOut})

            TweenMax.to(digitCodePiece, tweenTime/2, {delay:tweenTime/2,alpha:0,ease:Expo.easeOut})
            TweenMax.to(shapeTriangle, tweenTime, {delay:tweenTime/2,scaleX:0,scaleY:0,ease:Expo.easeOut,onComplete:kill})

            instance.removeChild(bgImage);

        }else{

           if(endForm==false)killSteps();

           instance.removeChild(bgImage);

           if(sucessText)instance.removeChild(sucessText);
           if(thankYou)instance.removeChild(thankYou)
           
        }
    }

    function addElements(){

        instance.addChild(bgImage);
        aspectRatio.resize(bgImage,1600,1000);

        containerContact = new createjs.Container();

        shapeTriangle.x = stage.canvas.width;
        shapeTriangle.y = stage.canvas.height;
        instance.addChild(shapeTriangle)

        bgImage.cursor = "auto"
        bgImage.alpha = 0.01;
        bgImage.addEventListener("mouseover", handlerOver);

        digitCodePiece.x = stage.canvas.width/2;
        digitCodePiece.y = stage.canvas.height/2;
        instance.addChild(digitCodePiece);
        
        digitCodePiece.scaleX = 0
        digitCodePiece.scaleY = 0


        parallax = new zim.Parallax(stage, .1, [
                {obj:digitCodePiece, prop:"x", propChange:100}
                ]
            );

        titleTextSquare = new createjs.Shape();
        containerContact.addChild(titleTextSquare);

        titleText = new createjs.Text();
        //titleText.lineWidth = (stage.canvas.width-marginWidth*ratio)/ratio
        titleText.textBaseline = "alphabetic";
        titleText.font = "36px BebasNeueLight ";
        titleText.color = "#171820";
        //titleText.lineHeight = 30;
        titleText.text = dataLoaded.title;
        titleText.y = titleText.getBounds().height*ratio
        titleText.scaleX = ratio;
        titleText.scaleY = ratio;
        containerContact.addChild(titleText);

        titleTextSquare = new createjs.Shape();
        //titleTextSquare.compositeOperation = "overlay";
        titleTextSquare.graphics.beginFill("#171820").drawRect(0, 0, titleText.getBounds().width*ratio+20*ratio, titleText.getBounds().height*ratio+5*ratio+20*ratio);
        titleTextSquare.x = titleText.x-10*ratio
        titleTextSquare.y = titleText.y-titleText.getBounds().height*ratio-5*ratio-10*ratio
        containerContact.addChild(titleTextSquare);

        helloTitleText = new createjs.Text();
        helloTitleText.textBaseline = "alphabetic";
        helloTitleText.font = "62px BebasNeueBold ";
        helloTitleText.color = "#171820";
        helloTitleText.text = dataLoaded.hello;
        helloTitleText.y = titleText.getBounds().height*ratio+helloTitleText.getBounds().height*ratio+marginheight*ratio
        helloTitleText.scaleX = ratio;
        helloTitleText.scaleY = ratio;
        containerContact.addChild(helloTitleText);

        helloTitleTextSquare = new createjs.Shape();
        //helloTitleTextSquare.compositeOperation = "overlay";
        helloTitleTextSquare.graphics.beginFill("#171820").drawRect(0, 0, helloTitleText.getBounds().width*ratio+20*ratio, helloTitleText.getBounds().height*ratio+5*ratio+20*ratio);
        helloTitleTextSquare.x = helloTitleText.x-10*ratio
        helloTitleTextSquare.y = helloTitleText.y-helloTitleText.getBounds().height*ratio-5*ratio-10*ratio
        containerContact.addChild(helloTitleTextSquare);

        helloDescText = new createjs.Text();
        helloDescText.textBaseline = "alphabetic";
        helloDescText.font = "18px BwModelicaLight";
        helloDescText.color = "#171820";
        helloDescText.alpha = 0.5
        helloDescText.text = dataLoaded.emailHello;
        helloDescText.y = helloTitleText.y+ helloDescText.getBounds().height*ratio+marginheight/4*ratio
        helloDescText.scaleX = ratio;
        helloDescText.scaleY = ratio;
        containerContact.addChild(helloDescText);

        strokeHello = new createjs.Shape();
        strokeHello.graphics.beginFill("#171820").drawRect(0, 0, helloDescText.getBounds().width*ratio, 1*ratio);
        strokeHello.scaleX = 0;
        strokeHello.y = helloDescText.y+10*ratio
        containerContact.addChild(strokeHello);

        workTitleText = new createjs.Text();
        workTitleText.textBaseline = "alphabetic";
        workTitleText.font = "62px BebasNeueBold ";
        workTitleText.color = "#171820";
        workTitleText.text = dataLoaded.workWithUs;
        workTitleText.x = helloTitleText.getBounds().width*ratio+140*ratio
        workTitleText.y = titleText.getBounds().height*ratio+helloTitleText.getBounds().height*ratio+marginheight*ratio
        workTitleText.scaleX = ratio;
        workTitleText.scaleY = ratio;
        containerContact.addChild(workTitleText);

        workTitleTextSquare = new createjs.Shape();
        workTitleTextSquare.graphics.beginFill("#171820").drawRect(0, 0, workTitleText.getBounds().width*ratio+20*ratio, workTitleText.getBounds().height*ratio+5*ratio+20*ratio);
        //workTitleTextSquare.compositeOperation = "overlay";
        workTitleTextSquare.x = workTitleText.x-10*ratio
        workTitleTextSquare.y = workTitleText.y-workTitleText.getBounds().height*ratio-5*ratio-10*ratio
        containerContact.addChild(workTitleTextSquare);

        workDescText = new createjs.Text();
        workDescText.textBaseline = "alphabetic";
        workDescText.font = "18px BwModelicaLight";
        workDescText.color = "#171820";
        workDescText.alpha = 0.5
        workDescText.text = dataLoaded.emailWorkWithUs;
        workDescText.x = helloTitleText.getBounds().width*ratio+140*ratio
        workDescText.y = helloTitleText.y + helloDescText.getBounds().height*ratio+marginheight/4*ratio
        workDescText.scaleX = ratio;
        workDescText.scaleY = ratio;
        containerContact.addChild(workDescText);

        strokeWork = new createjs.Shape();
        strokeWork.graphics.beginFill("#171820").drawRect(0, 0, workDescText.getBounds().width*ratio, 1*ratio);
        strokeWork.scaleX = 0;
        strokeWork.x = workDescText.x
        strokeWork.y = workDescText.y+10*ratio
        containerContact.addChild(strokeWork);

        forwardTitleText = new createjs.Text();
        forwardTitleText.textBaseline = "alphabetic";
        forwardTitleText.font = "62px BebasNeueBold ";
        forwardTitleText.color = "#171820";
        forwardTitleText.text = dataLoaded.forward;
        forwardTitleText.x = workTitleText.x+workTitleText.getBounds().width*ratio+140*ratio
        forwardTitleText.y = titleText.getBounds().height*ratio+helloTitleText.getBounds().height*ratio+marginheight*ratio
        forwardTitleText.scaleX = ratio;
        forwardTitleText.scaleY = ratio;
        containerContact.addChild(forwardTitleText);

        forwardTitleTextSquare = new createjs.Shape();
        //forwardTitleTextSquare.compositeOperation = "overlay";
        forwardTitleTextSquare.graphics.beginFill("#171820").drawRect(0, 0, forwardTitleText.getBounds().width*ratio+20*ratio, forwardTitleText.getBounds().height*ratio+5*ratio+20*ratio);
        forwardTitleTextSquare.x = forwardTitleText.x-10*ratio
        forwardTitleTextSquare.y = forwardTitleText.y-forwardTitleText.getBounds().height*ratio-5*ratio-10*ratio
        containerContact.addChild(forwardTitleTextSquare);

        forwardDescText = new createjs.Text();
        forwardDescText.textBaseline = "alphabetic";
        forwardDescText.font = "18px BwModelicaLight";
        forwardDescText.color = "#171820";
        forwardDescText.text = dataLoaded.emailForward;
        forwardDescText.alpha = 0.5
        forwardDescText.x = workTitleText.x+workTitleText.getBounds().width*ratio+140*ratio
        forwardDescText.y = helloTitleText.y+ helloDescText.getBounds().height*ratio+marginheight/4*ratio
        forwardDescText.scaleX = ratio;
        forwardDescText.scaleY = ratio;
        containerContact.addChild(forwardDescText);

        strokeForward = new createjs.Shape();
        strokeForward.graphics.beginFill("#171820").drawRect(0, 0, forwardDescText.getBounds().width*ratio, 1*ratio);
        strokeForward.scaleX = 0;
        strokeForward.x = forwardDescText.x
        strokeForward.y = forwardDescText.y+10*ratio
        containerContact.addChild(strokeForward);

        titleAddressText = new createjs.Text();
        titleAddressText.textBaseline = "alphabetic";
        titleAddressText.font = "18px BebasNeueBold";
        titleAddressText.color = "#171820";
        titleAddressText.text = dataLoaded.addressTitle;
        titleAddressText.y = forwardDescText.y+ forwardDescText.getBounds().height*ratio+marginheight*ratio
        titleAddressText.scaleX = ratio;
        titleAddressText.scaleY = ratio;
        containerContact.addChild(titleAddressText);

        titleAddressTextSquare = new createjs.Shape();
        //titleAddressTextSquare.compositeOperation = "overlay";
        titleAddressTextSquare.graphics.beginFill("#171820").drawRect(0, 0, titleAddressText.getBounds().width*ratio+20*ratio, titleAddressText.getBounds().height*ratio+5*ratio+20*ratio);
        titleAddressTextSquare.x = titleAddressText.x-10*ratio
        titleAddressTextSquare.y = titleAddressText.y-titleAddressText.getBounds().height*ratio-5*ratio-10*ratio
        containerContact.addChild(titleAddressTextSquare);

        descAddressText = new createjs.Text();
        descAddressText.lineWidth = (125*ratio)/ratio
        descAddressText.textBaseline = "alphabetic";
        descAddressText.font = "14px BwModelicaLight";
        descAddressText.color = "#171820";
        descAddressText.text = dataLoaded.addressDesc;
        descAddressText.y = titleAddressText.y+titleAddressText.getBounds().height*ratio+15*ratio
        descAddressText.scaleX = ratio;
        descAddressText.scaleY = ratio;
        containerContact.addChild(descAddressText);

        phoneTitleText = new createjs.Text();
        phoneTitleText.textBaseline = "alphabetic";
        phoneTitleText.font = "18px BebasNeueBold";
        phoneTitleText.color = "#171820";
        phoneTitleText.text = dataLoaded.phoneTitle;
        phoneTitleText.x = descAddressText.getBounds().width*ratio+marginheight/4*ratio
        phoneTitleText.y = forwardDescText.y+ forwardDescText.getBounds().height*ratio+marginheight*ratio
        phoneTitleText.scaleX = ratio;
        phoneTitleText.scaleY = ratio;
        containerContact.addChild(phoneTitleText);

        phoneTitleTextSquare = new createjs.Shape();
        //phoneTitleTextSquare.compositeOperation = "overlay";
        phoneTitleTextSquare.graphics.beginFill("#171820").drawRect(0, 0, phoneTitleText.getBounds().width*ratio+20*ratio, phoneTitleText.getBounds().height*ratio+5*ratio+20*ratio);
        phoneTitleTextSquare.x = phoneTitleText.x-10*ratio
        phoneTitleTextSquare.y = phoneTitleText.y-phoneTitleText.getBounds().height*ratio-5*ratio-10*ratio
        containerContact.addChild(phoneTitleTextSquare);

        descPhoneText = new createjs.Text();
        descPhoneText.lineWidth = (125*ratio)/ratio
        descPhoneText.textBaseline = "alphabetic";
        descPhoneText.font = "14px BwModelicaLight";
        descPhoneText.color = "#171820";
        descPhoneText.text = dataLoaded.phoneDesc;
        descPhoneText.x = descAddressText.getBounds().width*ratio+marginheight/4*ratio
        descPhoneText.y = titleAddressText.y+titleAddressText.getBounds().height*ratio+15*ratio
        descPhoneText.scaleX = ratio;
        descPhoneText.scaleY = ratio;
        containerContact.addChild(descPhoneText);

        skypeTitleText = new createjs.Text();
        skypeTitleText.textBaseline = "alphabetic";
        skypeTitleText.font = "18px BebasNeueBold";
        skypeTitleText.color = "#171820";
        skypeTitleText.text = dataLoaded.skypeTitle;
        skypeTitleText.x = descPhoneText.x +descPhoneText.getBounds().width*ratio+marginheight/4*ratio
        skypeTitleText.y = forwardDescText.y+ forwardDescText.getBounds().height*ratio+marginheight*ratio
        skypeTitleText.scaleX = ratio;
        skypeTitleText.scaleY = ratio;
        containerContact.addChild(skypeTitleText);

        skypeTitleTextSquare = new createjs.Shape();
        skypeTitleTextSquare.graphics.beginFill("#171820").drawRect(0, 0, skypeTitleText.getBounds().width*ratio+20*ratio, skypeTitleText.getBounds().height*ratio+5*ratio+20*ratio);
        skypeTitleTextSquare.x = skypeTitleText.x-10*ratio
        //skypeTitleTextSquare.compositeOperation = "overlay";
        skypeTitleTextSquare.y = skypeTitleText.y-skypeTitleText.getBounds().height*ratio-5*ratio-10*ratio
        containerContact.addChild(skypeTitleTextSquare);

        descSkypeText = new createjs.Text();
        descSkypeText.lineWidth = (125*ratio)/ratio
        descSkypeText.textBaseline = "alphabetic";
        descSkypeText.font = "14px BwModelicaLight";
        descSkypeText.color = "#171820";
        descSkypeText.text = dataLoaded.skypeDesc;
        descSkypeText.x = descPhoneText.x +descPhoneText.getBounds().width*ratio+marginheight/4*ratio
        descSkypeText.y = titleAddressText.y+titleAddressText.getBounds().height*ratio+15*ratio
        descSkypeText.scaleX = ratio;
        descSkypeText.scaleY = ratio;
        containerContact.addChild(descSkypeText);

        totalWidth = forwardDescText.x+forwardDescText.getBounds().width*ratio

        arrowRight.alpha = 1;
        arrowRight.x = forwardTitleText.x+forwardTitleText.getBounds().width*ratio-10*ratio
        arrowRight.y = forwardDescText.y+ forwardDescText.getBounds().height*ratio+marginheight*ratio-8*ratio
        containerContact.addChild(arrowRight);

        maskArrow = new createjs.Shape();
        maskArrow.graphics.beginFill("#171820").drawRect(0, 0, 30*ratio, 5*ratio);
        maskArrow.x = forwardTitleText.x+forwardTitleText.getBounds().width*ratio
        maskArrow.y = arrowRight.y
        //containerContact.addChild(maskArrow);

        arrowRight.mask = maskArrow

        startProjectText = new createjs.Text();
        startProjectText.textBaseline = "alphabetic";
        startProjectText.font = "18px BebasNeueBold";
        startProjectText.color = "#171820";
        startProjectText.text = dataLoaded.startProject;
        startProjectText.x = arrowRight.x-startProjectText.getBounds().width*ratio-10*ratio
        startProjectText.y = forwardDescText.y+ forwardDescText.getBounds().height*ratio+marginheight*ratio
        startProjectText.scaleX = ratio;
        startProjectText.scaleY = ratio;
        containerContact.addChild(startProjectText);

        hitStartProject = new createjs.Shape();
        hitStartProject.graphics.beginFill("#FFFFFF").drawRect(0, 0, startProjectText.getBounds().width*ratio+40*ratio, (startProjectText.getBounds().height*4)*ratio);
        hitStartProject.x = startProjectText.x
        hitStartProject.y = startProjectText.y-(startProjectText.getBounds().height*2)*ratio
        hitStartProject.alpha = 0.01;
        containerContact.addChild(hitStartProject);

        containerContact.x = stage.canvas.width/2-totalWidth/2
        containerContact.y = stage.canvas.height/2-stage.canvas.height/4
        instance.addChild(containerContact);

        shapeHit1 = new createjs.Shape();
        shapeHit1.graphics.beginFill("#FFFFFF").drawRect(0, 0, helloDescText.getBounds().width*ratio, helloDescText.getBounds().height*ratio+20*ratio);
        shapeHit1.x = helloDescText.x
        shapeHit1.y = helloDescText.y-helloDescText.getBounds().height*ratio-10*ratio
        containerContact.addChild(shapeHit1);

        shapeHit2 = new createjs.Shape();
        shapeHit2.graphics.beginFill("#FFFFFF").drawRect(0, 0, workDescText.getBounds().width*ratio, workDescText.getBounds().height*ratio+20*ratio);
        shapeHit2.x = workDescText.x
        shapeHit2.y = workDescText.y-workDescText.getBounds().height*ratio-10*ratio
        containerContact.addChild(shapeHit2);

        shapeHit3 = new createjs.Shape();
        shapeHit3.graphics.beginFill("#FFFFFF").drawRect(0, 0, forwardDescText.getBounds().width*ratio, forwardDescText.getBounds().height*ratio+20*ratio);
        shapeHit3.x = forwardDescText.x
        shapeHit3.y = forwardDescText.y-forwardDescText.getBounds().height*ratio-10*ratio
        containerContact.addChild(shapeHit3);

        shapeHit1.alpha = 0.01
        shapeHit2.alpha = 0.01
        shapeHit3.alpha = 0.01
        
    }

    function handlerOverContact(event){

       mySound.textSound();

        switch(event.target.instance){
            case "1":
                TweenMax.to(strokeHello, tweenTime/2, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(helloDescText, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
            break;
            case "2":
                TweenMax.to(strokeWork, tweenTime/2, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(workDescText, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
            break;
            case "3":
                TweenMax.to(strokeForward, tweenTime/2, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(forwardDescText, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerOutContact(event){
        switch(event.target.instance){
            case "1":
                TweenMax.to(strokeHello, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(helloDescText, tweenTime/2, {alpha:0.5,ease:Expo.easeInOut})
            break;
            case "2":
                TweenMax.to(strokeWork, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(workDescText, tweenTime/2, {alpha:0.5,ease:Expo.easeInOut})
            break;
            case "3":
                TweenMax.to(strokeForward, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(forwardDescText, tweenTime/2, {alpha:0.5,ease:Expo.easeInOut})
            break;
        }
    }

    function handlerClickContact(event){
        switch(event.target.instance){
            case "1":
                window.open("mailto:hello@untoldinteractive.com?Subject=Let's Talk!","_self");
            break;
            case "2":
                window.open("mailto:wrk@untoldinteractive.com?Subject=Let's Talk!","_self");
            break;

            case "3":
                window.open("mailto:careers@untoldinteractive.com?Subject=Let's Talk!","_self");
            break;
        }
    }

    function addElementsAnimation(){

        titleText.alpha = 0;
        helloTitleText.alpha = 0;
        workTitleText.alpha = 0;
        forwardTitleText.alpha = 0
        titleAddressText.alpha = 0;
        phoneTitleText.alpha = 0;
        skypeTitleText.alpha = 0;

        TweenMax.to(shapeTriangle, tweenTime*2, {scaleX:ratio*30,scaleY:ratio*30,ease:Expo.easeOut})     
        
        TweenMax.from(titleTextSquare, tweenTime, {scaleX:0,delay:tweenTime/2,ease:Expo.easeInOut,onComplete:endAnimationTitleElements})
        
        TweenMax.from(helloTitleTextSquare, tweenTime, {scaleX:0,delay:tweenTime,ease:Expo.easeInOut,onComplete:endAnimationSubtitleElements})
        TweenMax.from(workTitleTextSquare, tweenTime, {scaleX:0,delay:tweenTime+0.1,ease:Expo.easeInOut,onComplete:endAnimationSubtitleSecondElements})
        TweenMax.from(forwardTitleTextSquare, tweenTime, {scaleX:0,delay:tweenTime+0.2,ease:Expo.easeInOut,onComplete:endAnimationSubtitleThirdElements})
        TweenMax.from(titleAddressTextSquare, tweenTime, {scaleX:0,delay:tweenTime+0.4,ease:Expo.easeInOut,onComplete:endAnimationSubtitleFourthElements})
        TweenMax.from(phoneTitleTextSquare, tweenTime, {scaleX:0,delay:tweenTime+0.5,ease:Expo.easeInOut,onComplete:endAnimationSubtitleFifthElements})
        TweenMax.from(skypeTitleTextSquare, tweenTime, {scaleX:0,delay:tweenTime+0.6,ease:Expo.easeInOut,onComplete:endAnimationSubtitleSixthElements})

        TweenMax.from(helloDescText, tweenTime, {delay:tweenTime*2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(workDescText, tweenTime, {delay:tweenTime*2+0.1,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(forwardDescText, tweenTime, {delay:tweenTime*2+0.2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(descAddressText, tweenTime, {delay:tweenTime*2+0.4,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(descPhoneText, tweenTime, {delay:tweenTime*2+0.5,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(descSkypeText, tweenTime, {delay:tweenTime*2+0.6,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(bgImage, tweenTime, {x:stage.canvas.width,ease:Expo.easeInOut})

        TweenMax.from(startProjectText, tweenTime, {delay:tweenTime*2+0.8,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(arrowRight, tweenTime, {delay:tweenTime*2+0.8,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(digitCodePiece, tweenTime, {alpha:0.05,scaleX:1*ratio,scaleY:1*ratio,ease:Expo.easeOut}) 
    }

    function endAnimationTitleElements(){

        titleTextSquare.regX = titleText.getBounds().width*ratio;
        titleTextSquare.x = titleText.x-10*ratio+titleText.getBounds().width*ratio
        TweenMax.to(titleTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(titleText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
        
    }

    function endAnimationSubtitleElements(){

        helloTitleTextSquare.regX = helloTitleText.getBounds().width*ratio;
        helloTitleTextSquare.x = helloTitleText.x-10*ratio+helloTitleText.getBounds().width*ratio
        TweenMax.to(helloTitleTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(helloTitleText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
        
    }

    function endAnimationSubtitleSecondElements(){

         workTitleTextSquare.regX = workTitleText.getBounds().width*ratio;
        workTitleTextSquare.x = workTitleText.x-10*ratio+workTitleText.getBounds().width*ratio
        TweenMax.to(workTitleTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(workTitleText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
    }

    function endAnimationSubtitleThirdElements(){

        forwardTitleTextSquare.regX = forwardTitleText.getBounds().width*ratio;
        forwardTitleTextSquare.x = forwardTitleText.x-10*ratio+forwardTitleText.getBounds().width*ratio
        TweenMax.to(forwardTitleTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(forwardTitleText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
    }

    function endAnimationSubtitleFourthElements(){

        titleAddressTextSquare.regX = titleAddressText.getBounds().width*ratio;
        titleAddressTextSquare.x = titleAddressText.x-10*ratio+titleAddressText.getBounds().width*ratio
        TweenMax.to(titleAddressTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(titleAddressText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
    }

    function endAnimationSubtitleFifthElements(){

        phoneTitleTextSquare.regX = phoneTitleText.getBounds().width*ratio;
        phoneTitleTextSquare.x = phoneTitleText.x-10*ratio+phoneTitleText.getBounds().width*ratio
        TweenMax.to(phoneTitleTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(phoneTitleText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut})
    }

    function endAnimationSubtitleSixthElements(){

        skypeTitleTextSquare.regX = skypeTitleText.getBounds().width*ratio;
        skypeTitleTextSquare.x = skypeTitleText.x-10*ratio+skypeTitleText.getBounds().width*ratio
        TweenMax.to(skypeTitleTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(skypeTitleText, tweenTime, {alpha:1,delay:tweenTime/2.5,ease:Expo.easeOut,onComplete:endAnimationElementsClean})
    }

    function endAnimationElementsClean(){
        
        instance.removeChild(titleTextSquare);
        instance.removeChild(helloTitleTextSquare);
        instance.removeChild(forwardTitleTextSquare);
        instance.removeChild(titleAddressTextSquare);
        instance.removeChild(phoneTitleTextSquare);
        instance.removeChild(skypeTitleTextSquare);
    }

    function addHits(){

        hitStartProject.name = "start"
        hitStartProject.cursor = "pointer";
        hitStartProject.addEventListener("mouseover", handlerOver);
        hitStartProject.addEventListener("mouseout", handlerOut);
        hitStartProject.addEventListener("click", handlerClick);

        shapeHit1.instance = "1"
        shapeHit1.cursor = "pointer";
        shapeHit1.addEventListener("mouseover", handlerOverContact);
        shapeHit1.addEventListener("mouseout", handlerOutContact);
        shapeHit1.addEventListener("click", handlerClickContact);

        shapeHit2.instance = "2"
        shapeHit2.cursor = "pointer";
        shapeHit2.addEventListener("mouseover", handlerOverContact);
        shapeHit2.addEventListener("mouseout", handlerOutContact);
        shapeHit2.addEventListener("click", handlerClickContact);

        shapeHit3.instance = "3"
        shapeHit3.cursor = "pointer";
        shapeHit3.addEventListener("mouseover", handlerOverContact);
        shapeHit3.addEventListener("mouseout", handlerOutContact);
        shapeHit3.addEventListener("click", handlerClickContact);

    }

    function addStepHits(){

        clickHit.name = "return";
        clickHit.cursor = "pointer";
        clickHit.addEventListener("mouseover", handlerOver);
        clickHit.addEventListener("mouseout", handlerOut);
        clickHit.addEventListener("click", handlerClick);

        nextHit.name = "forward";
        nextHit.cursor = "pointer";
        nextHit.addEventListener("mouseover", handlerOver);
        nextHit.addEventListener("mouseout", handlerOut);
        nextHit.addEventListener("click", handlerClick);

        backHit.name = "back";
        backHit.cursor = "pointer";
        backHit.addEventListener("mouseover", handlerOver);
        backHit.addEventListener("mouseout", handlerOut);
        backHit.addEventListener("click", handlerClick);

        window.addEventListener("keydown", moveKey);
    }

    function moveKey(e){
        
       if (e.keyCode == 13) { // next
            goForward();
       }
    }

    function handlerOver(event){

        switch(event.target.name){
            case "start":
                mySound.textSound();
                TweenMax.to(arrowRight, tweenTime/4, {x:forwardTitleText.x+forwardTitleText.getBounds().width*ratio,ease:Power3.easeInOut})
                TweenMax.to(startProjectText, tweenTime/2, {x:forwardTitleText.x+forwardTitleText.getBounds().width*ratio-10*ratio-startProjectText.getBounds().width*ratio,ease:Power3.easeInOut})
            break;
            case "return":
                mySound.textSound();
               TweenMax.to(strokeClick, tweenTime/2, {scaleX:1,ease:Power3.easeInOut})
            break;
            case "back":
                mySound.textSound();
               TweenMax.to(arrowLeftWhite, tweenTime/4, {x:0,ease:Power3.easeInOut})
               TweenMax.to(backarrowText, tweenTime/4, {alpha:1,ease:Power3.easeInOut})
            break;
            case "forward":
                mySound.textSound();
               TweenMax.to(arrowRightWhite, tweenTime/4, {x:nextText.x + nextText.getBounds().width*ratio+10*ratio,ease:Power3.easeInOut})
               TweenMax.to(nextText, tweenTime/4, {alpha:1,ease:Power3.easeInOut})
            break;

            case "budjet":
                mySound.textSound();
               //console.log(dataLoaded.values[event.target.instance],isBudget)
               if(dataLoaded.values[event.target.instance]!=dataLoaded.values[isBudget])TweenMax.to(containerRadio.getChildByName("circleStroke"+event.target.instance), tweenTime/2, {alpha:1,ease:Power3.easeInOut})
            break;
        }
    }

    function handlerOut(event){
        switch(event.target.name){
            case "start":
                TweenMax.to(startProjectText, tweenTime/2, {x:forwardTitleText.x+forwardTitleText.getBounds().width*ratio-10*ratio-startProjectText.getBounds().width*ratio-10*ratio,ease:Power3.easeInOut})
                TweenMax.to(arrowRight, tweenTime/4, {x:forwardTitleText.x+forwardTitleText.getBounds().width*ratio-10*ratio,ease:Power3.easeInOut})
             break;
            case "return":
                TweenMax.to(strokeClick, tweenTime/2, {scaleX:0,ease:Power3.easeInOut})
               
            break;
            case "back":
                TweenMax.to(arrowLeftWhite, tweenTime/4, {x:10*ratio,ease:Power3.easeInOut})
               TweenMax.to(backarrowText, tweenTime/4, {alpha:0.5,ease:Power3.easeInOut})
               
            break;
            case "forward":
                TweenMax.to(arrowRightWhite, tweenTime/4, {x:nextText.x + nextText.getBounds().width*ratio+10*ratio-10*ratio,ease:Power3.easeInOut})
               TweenMax.to(nextText, tweenTime/4, {alpha:0.5,ease:Power3.easeInOut})
            break;
            case "budjet":
               if(dataLoaded.values[event.target.instance]!=dataLoaded.values[isBudget])TweenMax.to(containerRadio.getChildByName("circleStroke"+event.target.instance), tweenTime/2, {alpha:0.5,ease:Power3.easeInOut})
            break;
        }
    }

    function handlerClick(event){

        switch(event.target.name){
            case "start": 

                bgImage.alpha=1
                hitStartProject.removeEventListener("mouseover", handlerOver);
                hitStartProject.removeEventListener("mouseout", handlerOut);
                hitStartProject.removeEventListener("click", handlerClick);

                 var customEvent = new createjs.Event("goToMenuTalkForm");
                dispatchInstance.dispatchEvent(customEvent);

                introStartProject();
                addStepElements();
                addStepElementsAnimation();
                addStepHits();

            break;
            case "return":
               window.open("mailto:wrk@untoldinteractive.com?Subject=Let's Talk!","_self");
            break;
            case "back":
                TweenMax.to(arrowLeftWhite, tweenTime/4, {x:10*ratio,ease:Power3.easeInOut})
               TweenMax.to(backarrowText, tweenTime/4, {alpha:0.5,ease:Power3.easeInOut})
                goBackward();

            break;
            case "forward":
                TweenMax.to(arrowRightWhite, tweenTime/4, {x:nextText.x + nextText.getBounds().width*ratio+10*ratio-10*ratio,ease:Power3.easeInOut})
               TweenMax.to(nextText, tweenTime/4, {alpha:0.5,ease:Power3.easeInOut})
                goForward();
               
            break;
            case "budjet":

                if(dataLoaded.values[event.target.instance]!=dataLoaded.values[isBudget]){


                for (var i=0;i<dataLoaded.values.length;i++){
                    if(i!=event.target.instance){;
                        containerRadio.getChildByName("circle"+i).alpha = 0;
                        containerRadio.getChildByName("circleStroke"+i).alpha = 0.5;
                    }
                }

                if(containerRadio.getChildByName("circle"+event.target.instance).alpha ==1){
                    containerRadio.getChildByName("circle"+event.target.instance).alpha = 0;
                    containerRadio.getChildByName("circleStroke"+event.target.instance).alpha = 0.5;
                }else{
                    isBudget = event.target.instance
                    containerRadio.getChildByName("circle"+event.target.instance).alpha = 1
                    containerRadio.getChildByName("circleStroke"+event.target.instance).alpha = 1;
                }

                TweenMax.from(containerRadio.getChildByName("circle"+event.target.instance), tweenTime/2, {scaleX:0,scaleY:0,ease:Power3.easeInOut})

                }

            break;
        }
    }

    function goForward(){

        if(nav==3){

            if(dataLoaded.values[isBudget]!=""){
                nav++
                dataToSend[nav-1] = dataLoaded.values[isBudget];
                dataToGhost[nav-1] = dataLoaded.values[isBudget];
                stepAnimationOut();
            }

        }else if(nav<dataLoaded.steps.length-1){

            if(inputText.getText()!=""){

                if(nav==1){
                    
                    if((inputText.getText().indexOf('.')!=-1)&&(inputText.getText().indexOf('@')!=-1)){
                        
                        nav++
                        dataToSend[nav-1] = inputText.getText()
                        dataToGhost[nav-1] = inputText.getText()
                        stepAnimationOut();
                    }

                }else{

                    nav++
                    dataToSend[nav-1] = inputText.getText()
                    dataToGhost[nav-1] = inputText.getText()
                    stepAnimationOut();
                }
            
            }
            
        }else{

            if(inputText.getText()!=""){
                dataToSend[nav] = inputText.getText()
                dataToGhost[nav] = inputText.getText()
                stepAnimationOutFinish();
                sentComplete();
            }
        }

        if(nav==1){
            backHit.visible = true
            backarrowText.alpha = 0.5
            backarrowText.visible = true
            arrowLeftWhite.visible = true
            TweenMax.to(containerNavigation, tweenTime/1.1, {x:stage.canvas.width/2-(arrowRightWhite.x+30*ratio)/2,ease:Power3.easeInOut})
        }
    }

    function goBackward(){

        if((nav<dataLoaded.steps.length)&&(nav>0)){

           nav--
           dataToSend[nav] = inputText.getText()
           stepAnimationOutBack(); 
        }

        if(nav==0){
            backHit.visible = false
            backarrowText.visible = false
            arrowLeftWhite.visible = false
            TweenMax.to(containerNavigation, tweenTime/1.1, {x:stage.canvas.width/2-(arrowRightWhite.x+30*ratio)/1.25,ease:Power3.easeInOut})
        }

    }

    function introStartProject(){

        viewForm=true
        
        TweenMax.to(containerContact, tweenTime/1.1, {x:-stage.canvas.width*2,ease:Power3.easeInOut})
        TweenMax.to(shapeTriangle, tweenTime/1.5, {delay:tweenTime/8,x:0,ease:Expo.easeInOut})
        TweenMax.to(digitCodePiece, tweenTime, {alpha:0,ease:Expo.easeOut})
        TweenMax.from(bgImage, tweenTime, {x:stage.canvas.width/6,ease:Expo.easeInOut})

    }

    function addStepElements(){

        containerBack = new createjs.Container();
        instance.addChild(containerBack);

        containerInput = new createjs.Container();
        instance.addChild(containerInput);

        containerNavigation = new createjs.Container();
        instance.addChild(containerNavigation);

        backText = new createjs.Text();
        //titleText.lineWidth = (stage.canvas.width-marginWidth*ratio)/ratio
        backText.textBaseline = "alphabetic";
        backText.font = "18px BebasNeueLight ";
        backText.color = "#FFFFFF";
        backText.alpha = 0.5;
        backText.text = dataLoaded.back;
        backText.y = backText.getBounds().height*ratio
        backText.scaleX = ratio;
        backText.scaleY = ratio;
        containerBack.addChild(backText);

        clickText = new createjs.Text();
        clickText.textBaseline = "alphabetic";
        clickText.font = "18px BebasNeueBold";
        clickText.color = "#FFFFFF";
        clickText.text = dataLoaded.click;
        clickText.x = backText.getBounds().width*ratio
        clickText.y = backText.getBounds().height*ratio
        clickText.scaleX = ratio;
        clickText.scaleY = ratio;
        containerBack.addChild(clickText);

        strokeClick = new createjs.Shape();
        strokeClick.graphics.beginFill("#FFFFFF").drawRect(0, 0, clickText.getBounds().width*ratio, 1*ratio);
        strokeClick.scaleX = 0;
        strokeClick.x = clickText.x
        strokeClick.y = clickText.y+5*ratio
        containerBack.addChild(strokeClick);

        clickHit = new createjs.Shape();
        clickHit.graphics.beginFill("#FFFFFF").drawRect(0, 0, clickText.getBounds().width*ratio, (clickText.getBounds().height*2)*ratio);
        clickHit.x = clickText.x
        clickHit.y = -clickText.getBounds().height/2*ratio
        clickHit.alpha = 0.01
        containerBack.addChild(clickHit);

        titleStartText = new createjs.Text();
        titleStartText.textBaseline = "alphabetic";
        titleStartText.font = "72px BebasNeueBold";
        titleStartText.alpha = 0.25;
        titleStartText.color = "#FFFFFF";
        titleStartText.text = dataLoaded.titleStart;
        titleStartText.x = stage.canvas.width/2-titleStartText.getBounds().width/2*ratio
        titleStartText.y = stage.canvas.height/2-50*ratio
        titleStartText.scaleX = ratio;
        titleStartText.scaleY = ratio;
        instance.addChild(titleStartText);

        titleStartTextSquare = new createjs.Shape();
        titleStartTextSquare.compositeOperation = "overlay";
        titleStartTextSquare.graphics.beginFill("#FFFFFF").drawRect(0, 0, titleStartText.getBounds().width*ratio+20*ratio, titleStartText.getBounds().height*ratio+5*ratio+20*ratio);
        titleStartTextSquare.x = titleStartText.x-10*ratio
        titleStartTextSquare.y = titleStartText.y-titleStartText.getBounds().height*ratio-5*ratio-10*ratio
        instance.addChild(titleStartTextSquare);

        descText = new createjs.Text();
        descText.textBaseline = "alphabetic";
        descText.font = "30px BebasNeueLight ";
        descText.color = "#FFFFFF";
        descText.text = dataLoaded.steps[nav];
        descText.x = stage.canvas.width/2-descText.getBounds().width/2*ratio
        descText.y = stage.canvas.height/2+descText.getBounds().height*ratio
        descText.scaleX = ratio;
        descText.scaleY = ratio;
        instance.addChild(descText);

        strokeInput = new createjs.Shape();
        strokeInput.graphics.beginFill("#FFFFFF").drawRect(0, 0, 390*ratio, 1*ratio);
        strokeInput.x = stage.canvas.width/2-390/2*ratio
        strokeInput.y = descText.y+60*ratio;
        instance.addChild(strokeInput);

        inputText = new TextInput();
        inputText.setRatio(ratio,strokeInput.x,strokeInput.y-20*ratio)
        inputText.placeHolder = "Type Here"
        inputText.update();
        containerInput.addChild(inputText);

        var navString = nav+1;

        numberText = new createjs.Text();
        numberText.textBaseline = "alphabetic";
        numberText.font = "300px BebasNeueBold";
        numberText.color = "#FFFFFF";
        numberText.text = "0"+navString;
        numberText.x = -60*ratio
        numberText.y = stage.canvas.height/2+numberText.getBounds().height/2*ratio
        numberText.scaleX = ratio;
        numberText.scaleY = ratio;
        instance.addChild(numberText);

        ofText = new createjs.Text();
        ofText.textBaseline = "alphabetic";
        ofText.font = "24px BebasNeueBold ";
        ofText.color = "#171820";
        ofText.text = "OF";
        ofText.x = numberText.x+numberText.getBounds().width*ratio
        ofText.y = numberText.y-numberText.getBounds().height*ratio
        ofText.scaleX = ratio;
        ofText.scaleY = ratio;
        instance.addChild(ofText);

        lengthText = new createjs.Text();
        lengthText.textBaseline = "alphabetic";
        lengthText.font = "72px BebasNeueBold ";
        lengthText.color = "#171820";
        lengthText.text = "0"+navLength;
        lengthText.x = ofText.x+ofText.getBounds().width*ratio+20*ratio
        lengthText.y = ofText.y-ofText.getBounds().height*ratio+lengthText.getBounds().height*ratio
        lengthText.scaleX = ratio;
        lengthText.scaleY = ratio;
        instance.addChild(lengthText);

        arrowLeftWhite.x = 10*ratio;
        arrowLeftWhite.y = -7*ratio;
        arrowLeftWhite.visible = false
        containerNavigation.addChild(arrowLeftWhite);

        maskArrowLeft = new createjs.Shape();
        maskArrowLeft.graphics.beginFill("#171820").drawRect(0, 0, 30*ratio, 5*ratio);
        maskArrowLeft.y = -7*ratio;
        //containerNavigation.addChild(maskArrowLeft);

        arrowLeftWhite.mask = maskArrowLeft

        backarrowText = new createjs.Text();
        backarrowText.textBaseline = "alphabetic";
        backarrowText.font = "14px BebasNeueLight ";
        backarrowText.color = "#ffffff";
        backarrowText.text = dataLoaded.backBt;
        backarrowText.x = 40*ratio
        backarrowText.scaleX = ratio;
        backarrowText.scaleY = ratio;
        backarrowText.visible = false;
        containerNavigation.addChild(backarrowText);

        backHit = new createjs.Shape();
        backHit.graphics.beginFill("#ffffff").drawRect(0, 0, (backarrowText.getBounds().width*ratio+10*ratio+30*ratio), (backarrowText.getBounds().height*3)*ratio);
        backHit.y = -(backarrowText.getBounds().height*2.5)*ratio
        backHit.alpha = 0.01
        backHit.visible = false;
        containerNavigation.addChild(backHit);

        nextText = new createjs.Text();
        nextText.textBaseline = "alphabetic";
        nextText.font = "14px BebasNeueLight ";
        nextText.color = "#ffffff";
        nextText.text = dataLoaded.nextBt;
        nextText.alpha = 0.5
        nextText.x = backarrowText.x + backarrowText.getBounds().width*ratio+40*ratio;
        nextText.scaleX = ratio;
        nextText.scaleY = ratio;
        containerNavigation.addChild(nextText);

        arrowRightWhite.x = nextText.x + nextText.getBounds().width*ratio+10*ratio-10*ratio;
        arrowRightWhite.y = -7*ratio;
        containerNavigation.addChild(arrowRightWhite);

        maskArrowRight = new createjs.Shape();
        maskArrowRight.graphics.beginFill("#171820").drawRect(0, 0, 30*ratio, 5*ratio);
        maskArrowRight.x = nextText.x + nextText.getBounds().width*ratio+10*ratio;
        maskArrowRight.y = -7*ratio;
        //containerNavigation.addChild(maskArrowRight);

        arrowRightWhite.mask = maskArrowRight

        nextHit = new createjs.Shape();
        nextHit.graphics.beginFill("#ffffff").drawRect(0, 0, (nextText.getBounds().width*ratio+10*ratio+30*ratio), (nextText.getBounds().height*3)*ratio);
        nextHit.x = nextText.x
        nextHit.y = -(nextText.getBounds().height*2.5)*ratio
        nextHit.alpha = 0.01
        containerNavigation.addChild(nextHit);

        containerBack.x = stage.canvas.width/2-(clickHit.x+clickText.getBounds().width*ratio)/2
        containerBack.y = margin*ratio+6*ratio;

        containerInput.x = stage.canvas.width/2
        containerInput.y = strokeInput.y-20*ratio

        containerNavigation.x = stage.canvas.width/2-(arrowRightWhite.x+30*ratio)/1.25
        containerNavigation.y = stage.canvas.height-margin*ratio

    }

     function addStepElementsAnimation(){

        titleStartText.alpha = 0;

        TweenMax.from(containerBack, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerInput, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerNavigation, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(titleStartTextSquare, tweenTime, {scaleX:0,delay:tweenTime,ease:Expo.easeInOut,onComplete:endAnimationStartElements})
        //TweenMax.from(titleStartText, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(descText, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(inputText, tweenTime, {delay:tweenTime/2,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(strokeInput, tweenTime, {delay:tweenTime/2,scaleX:0,ease:Expo.easeInOut})

        TweenMax.from(numberText, tweenTime, {delay:tweenTime/3*1.5,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.from(ofText, tweenTime, {delay:tweenTime/3*1.2,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.from(lengthText, tweenTime, {delay:tweenTime/3,x:-300*ratio,ease:Expo.easeInOut})        

    }
    
    function endAnimationStartElements(){

        titleStartTextSquare.regX = titleStartText.getBounds().width*ratio;
        titleStartTextSquare.x = titleStartText.x-10*ratio+titleStartText.getBounds().width*ratio
        TweenMax.to(titleStartTextSquare, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(titleStartText, tweenTime, {alpha:0.25,delay:tweenTime/2.5,ease:Expo.easeOut,onComplete:endAnimationStartElementsClean})
        
    }

    function endAnimationStartElementsClean(){
        
        instance.removeChild(titleStartTextSquare);
        
    }

    function getAjax() {
        try {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                } catch (try_again) {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
            }
        } catch (fail) {
            return null;
        }
    }

    function sendMail(from, name, company,budget, details) {
    

     var rq = getAjax();

     if (rq) {
         // Success; attempt to use an Ajax request to a PHP script to send the e-mail
         try {

             rq.open('GET', 'http://localhost:8888/untold2017/data/mail.php?myEmail=' + encodeURIComponent(from) + '&myName=' + encodeURIComponent(name) + '&myCompany=' + encodeURIComponent(company) + '&myBudget=' + encodeURIComponent(budget) + '&myDetails=' + encodeURIComponent(details), true);
             
             rq.onreadystatechange = function () {
                 if (this.readyState === 4) {
                     if (this.status >= 400) {
                         // The request failed; fall back to e-mail client
                         //window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
                     }
                 }
             };

             rq.send(null);

         } catch (fail) {
             // Failed to open the request; fall back to e-mail client
             //window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
         }
     } else {
         // Failed to create the request; fall back to e-mail client
         //window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
     }
}
    
    function stepAnimationOutBack(){

        if(nav==0){
            
            clickHit.addEventListener("mouseover", handlerOver);
            clickHit.addEventListener("mouseout", handlerOut);
            clickHit.addEventListener("click", handlerClick);

            TweenMax.to(containerBack, tweenTime, {alpha:1,ease:Expo.easeInOut})
        }

        nextHit.removeEventListener("mouseover", handlerOver);
        nextHit.removeEventListener("mouseout", handlerOut);
        nextHit.removeEventListener("click", handlerClick);

        backHit.removeEventListener("mouseover", handlerOver);
        backHit.removeEventListener("mouseout", handlerOut);
        backHit.removeEventListener("click", handlerClick);

        window.removeEventListener("keydown", moveKey);

        TweenMax.to(descText, tweenTime, {alpha:0,ease:Expo.easeInOut,onComplete:stepAnimationIn})
        
        if(nav==2){

            TweenMax.to(containerRadio, tweenTime, {alpha:0,ease:Expo.easeInOut,onComplete:killBudjet})
            
        }else{

            TweenMax.to(inputText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(strokeInput, tweenTime, {scaleX:0,ease:Expo.easeInOut})   
        }

        TweenMax.to(numberText, tweenTime, {delay:tweenTime/3,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.to(ofText, tweenTime, {delay:tweenTime/3*1.3,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.to(lengthText, tweenTime, {delay:tweenTime/3*1.5,x:-300*ratio,ease:Expo.easeInOut})        
        
    }

    function stepAnimationOut(){

        if(nav==1){
            
            clickHit.removeEventListener("mouseover", handlerOver);
            clickHit.removeEventListener("mouseout", handlerOut);
            clickHit.removeEventListener("click", handlerClick);

            TweenMax.to(containerBack, tweenTime, {alpha:0,ease:Expo.easeInOut})
        }

        nextHit.removeEventListener("mouseover", handlerOver);
        nextHit.removeEventListener("mouseout", handlerOut);
        nextHit.removeEventListener("click", handlerClick);

        backHit.removeEventListener("mouseover", handlerOver);
        backHit.removeEventListener("mouseout", handlerOut);
        backHit.removeEventListener("click", handlerClick);

        window.removeEventListener("keydown", moveKey);

        TweenMax.to(descText, tweenTime, {alpha:0,ease:Expo.easeInOut,onComplete:stepAnimationIn})

        if(nav==4){

            TweenMax.to(containerRadio, tweenTime, {alpha:0,ease:Expo.easeInOut,onComplete:killBudjet})
            
        }else{

            TweenMax.to(inputText, tweenTime, {alpha:0,ease:Expo.easeInOut})
            TweenMax.to(strokeInput, tweenTime, {scaleX:0,ease:Expo.easeInOut})   
        }

        TweenMax.to(numberText, tweenTime, {delay:tweenTime/3,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.to(ofText, tweenTime, {delay:tweenTime/3*1.3,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.to(lengthText, tweenTime, {delay:tweenTime/3*1.5,x:-300*ratio,ease:Expo.easeInOut})        
        
    }

    function stepAnimationIn(){

        nextHit.name = "forward";
        nextHit.cursor = "pointer";
        nextHit.addEventListener("mouseover", handlerOver);
        nextHit.addEventListener("mouseout", handlerOut);
        nextHit.addEventListener("click", handlerClick);

        backHit.name = "back";
        backHit.cursor = "pointer";
        backHit.addEventListener("mouseover", handlerOver);
        backHit.addEventListener("mouseout", handlerOut);
        backHit.addEventListener("click", handlerClick);

        descText.text = dataLoaded.steps[nav];
        descText.x = stage.canvas.width/2-descText.getBounds().width/2*ratio
        descText.y = stage.canvas.height/2+descText.getBounds().height*ratio

        var navString = nav+1;
        numberText.text = "0"+navString;
        numberText.x = -60*ratio
        numberText.y = stage.canvas.height/2+numberText.getBounds().height/2*ratio

        ofText.x = numberText.x+numberText.getBounds().width*ratio
        ofText.y = numberText.y-numberText.getBounds().height*ratio

        lengthText.x = ofText.x+ofText.getBounds().width*ratio+20*ratio
        lengthText.y = ofText.y-ofText.getBounds().height*ratio+lengthText.getBounds().height*ratio-10

        if(nav==3){

            reIntroNumberAnimationHack();
            addBudjetAndAnimate();

        }else{

            window.addEventListener("keydown", moveKey);

            inputText._kill();

            inputText = new TextInput();
            inputText.setRatio(ratio,strokeInput.x,strokeInput.y-20*ratio)
            
            if(dataToGhost[nav])inputText.placeHolder = dataToGhost[nav];
            else inputText.placeHolder = "Type Here";
            
            inputText.update();
            inputText.alpha = 0;
            containerInput.addChild(inputText);
            reIntroNumberAnimation();

        }
    }

    function addBudjetAndAnimate(){

        containerRadio = new createjs.Container();
        instance.addChild(containerRadio)
        
        var totalSize;

        for (var i=0;i<dataLoaded.values.length;i++){

            var circleStroke = new createjs.Shape();
            circleStroke.name = "circleStroke"+i;
            circleStroke.alpha = 0;
            circleStroke.x = i*150*ratio;
            circleStroke.graphics.setStrokeStyle(2).beginStroke("#FFFFFF").drawCircle(0, 0, 12*ratio);
            containerRadio.addChild(circleStroke);

            var circle = new createjs.Shape();
            if((i==isBudget)&&(isBudget!=""))TweenMax.from(circle, tweenTime/2*i, {alpha:0,ease:Expo.easeInOut})
            else circle.alpha = 0;
            circle.name = "circle"+i;
            circle.x = circleStroke.x
            circle.graphics.beginFill("#FFFFFF").drawCircle(0, 0, 4*ratio);
            containerRadio.addChild(circle);

            var circleHit = new createjs.Shape();
            circleHit.alpha = 0.01
            circleHit.x = circleStroke.x
            circleHit.graphics.beginFill("#FFFFFF").drawCircle(0, 0, 12*ratio);
            containerRadio.addChild(circleHit);

            var descBudjetText = new createjs.Text();
            descBudjetText.textBaseline = "alphabetic";
            descBudjetText.font = "16px BebasNeueLight ";
            descBudjetText.color = "#FFFFFF";
            descBudjetText.text = dataLoaded.values[i];
            descBudjetText.x = circleHit.x+22*ratio
            descBudjetText.y = descBudjetText.getBounds().height/2*ratio
            descBudjetText.scaleX = ratio;
            descBudjetText.scaleY = ratio;
            descBudjetText.alpha = 0;
            containerRadio.addChild(descBudjetText);

            circleHit.name = "budjet";
            circleHit.instance = i
            circleHit.cursor = "pointer";
            circleHit.addEventListener("mouseover", handlerOver);
            circleHit.addEventListener("mouseout", handlerOut);
            circleHit.addEventListener("click", handlerClick);
            
            if((i==isBudget)&&(isBudget!=""))TweenMax.to(circleStroke, tweenTime/2*i, {alpha:1,ease:Expo.easeInOut})
            else TweenMax.to(circleStroke, tweenTime/2*i, {alpha:0.5,ease:Expo.easeInOut})

            TweenMax.to(descBudjetText, tweenTime/2*i, {alpha:1,ease:Expo.easeInOut})

        }

        totalWidthBudget = descBudjetText.x+descBudjetText.getBounds().width*ratio
        containerRadio.x = stage.canvas.width/2-totalWidthBudget/2
        containerRadio.y = descText.y+60*ratio;
        
    }


    function reIntroNumberAnimation(){
        TweenMax.to(descText, tweenTime, {alpha:1,ease:Expo.easeInOut})
        
        TweenMax.to(inputText, tweenTime, {alpha:1,ease:Expo.easeInOut})
        TweenMax.to(strokeInput, tweenTime, {scaleX:1,ease:Expo.easeInOut})

        TweenMax.from(numberText, tweenTime, {delay:tweenTime/3*1.5,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.from(ofText, tweenTime, {delay:tweenTime/3*1.2,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.from(lengthText, tweenTime, {delay:tweenTime/3,x:-300*ratio,ease:Expo.easeInOut})    
    }

    function reIntroNumberAnimationHack(){

        TweenMax.to(descText, tweenTime, {alpha:1,ease:Expo.easeInOut})
        TweenMax.from(numberText, tweenTime, {delay:tweenTime/3*1.5,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.from(ofText, tweenTime, {delay:tweenTime/3*1.2,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.from(lengthText, tweenTime, {delay:tweenTime/3,x:-300*ratio,ease:Expo.easeInOut})    
    }
    


    function stepAnimationOutFinish(){

        nextHit.removeEventListener("mouseover", handlerOver);
        nextHit.removeEventListener("mouseout", handlerOut);
        nextHit.removeEventListener("click", handlerClick);

        backHit.removeEventListener("mouseover", handlerOver);
        backHit.removeEventListener("mouseout", handlerOut);
        backHit.removeEventListener("click", handlerClick);

        window.removeEventListener("keydown", moveKey);

        TweenMax.to(titleStartText, tweenTime, {alpha:0,ease:Expo.easeInOut,onComplete:killSteps})
        TweenMax.to(descText, tweenTime, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(inputText, tweenTime, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(strokeInput, tweenTime, {scaleX:0,ease:Expo.easeInOut})  

        TweenMax.to(containerNavigation, tweenTime, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(numberText, tweenTime, {delay:tweenTime/3,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.to(ofText, tweenTime, {delay:tweenTime/3*1.3,x:-300*ratio,ease:Expo.easeInOut})
        TweenMax.to(lengthText, tweenTime, {delay:tweenTime/3*1.5,x:-300*ratio,ease:Expo.easeInOut})
        
        sendMail(dataToSend[1],dataToSend[0],dataToSend[2],dataToSend[3],dataToSend[4])
        
    }

    function sentComplete(){

        scaleFactor = (((100)*stage.canvas.width)/(1600))/100
        thankYou.regY = 346/2
        thankYou.scaleX = scaleFactor;
        thankYou.scaleY = scaleFactor;
        thankYou.y = stage.canvas.height/2;
        thankYou.alpha = 0;
        instance.addChild(thankYou)

        sucessText = new createjs.Text();
        sucessText.textBaseline = "alphabetic";
        sucessText.font = "48px BebasNeueLight ";
        sucessText.color = "#FFFFFF";
        sucessText.text = dataLoaded.endMessage;
        sucessText.x = stage.canvas.width/2-sucessText.getBounds().width/2*ratio;
        sucessText.y = stage.canvas.height/2+200*ratio;
        sucessText.alpha = 0;
        sucessText.scaleX = ratio;
        sucessText.scaleY = ratio;
        instance.addChild(sucessText);

        TweenMax.to(thankYou, tweenTime, {delay:tweenTime,alpha:0.15,ease:Expo.easeInOut})
        TweenMax.to(sucessText, tweenTime, {delay:tweenTime,alpha:1,y:stage.canvas.height/2+sucessText.getBounds().height/2*ratio,ease:Expo.easeInOut})

        endForm = true;
    }

    function killBudjet(){

        instance.removeChild(containerRadio)
        containerRadio = null;

    }

   function kill(){
        
        if(parallax)parallax.dispose();
        
        if(shapeTriangle)instance.removeChild(shapeTriangle);
        if(shapeHit1)instance.removeChild(shapeHit1);
        if(shapeHit2)instance.removeChild(shapeHit2);
        if(shapeHit3)instance.removeChild(shapeHit3);
        if(digitCodePiece)instance.removeChild(digitCodePiece);
        if(containerContact)instance.removeChild(containerContact);

        containerContact = null;
        
    }

    function killSteps(){
        
        if(parallax){
            parallax.dispose();
            parallax= null
        }
        
        if(shapeTriangle)instance.removeChild(shapeTriangle);
        if(digitCodePiece)instance.removeChild(digitCodePiece);
        if(containerContact)instance.removeChild(containerContact);
        
        if(shapeHit1)instance.removeChild(shapeHit1);
        if(shapeHit2)instance.removeChild(shapeHit2);
        if(shapeHit3)instance.removeChild(shapeHit3);

        if(titleStartText)instance.removeChild(titleStartText);
        if(lengthText)instance.removeChild(lengthText);
        if(numberText)instance.removeChild(numberText);
        if(ofText)instance.removeChild(ofText);
        if(descText)instance.removeChild(descText);
        if(strokeInput)instance.removeChild(strokeInput);
       
        if(containerInput)instance.removeChild(containerInput);
        if(containerNavigation)instance.removeChild(containerNavigation);
        if(containerBack)instance.removeChild(containerBack);
        if(containerRadio)instance.removeChild(containerRadio);

        if(inputText)inputText._kill();
        if(inputText)containerInput.removeChild(inputText);

        

    }

    p.checkViewForm = function(){
        return viewForm
    }

    p.resize = function() {

        //if(parallax)parallax.dispose();
        
        if((shapeTriangle)&&(viewForm==false)){
            shapeTriangle.x = stage.canvas.width
            shapeTriangle.y = stage.canvas.height
        }

        if((containerContact)&&(viewForm==false)){
            containerContact.x = stage.canvas.width/2-totalWidth/2
            containerContact.y = stage.canvas.height/2-stage.canvas.height/4
        }

        if(bgImage){
            aspectRatio.resize(bgImage,1600,1000);
        }

        if(containerBack){
             containerBack.x = stage.canvas.width/2-(clickHit.x+clickText.getBounds().width*ratio)/2
            containerBack.y = margin*ratio+6*ratio;
        }

        if(titleStartText){
            titleStartText.x = stage.canvas.width/2-titleStartText.getBounds().width/2*ratio
            titleStartText.y = stage.canvas.height/2-50*ratio
        }

        if(numberText){
            numberText.x = -60*ratio
            numberText.y = stage.canvas.height/2+numberText.getBounds().height/2*ratio
        }

        if(ofText){
            ofText.x = numberText.x+numberText.getBounds().width*ratio
            ofText.y = numberText.y-numberText.getBounds().height*ratio
        }

        if(digitCodePiece){
            digitCodePiece.x = stage.canvas.width/2
            digitCodePiece.y = stage.canvas.height/2
        }

        if(lengthText){
            lengthText.x = ofText.x+ofText.getBounds().width*ratio+20*ratio
            lengthText.y = ofText.y-ofText.getBounds().height*ratio+lengthText.getBounds().height*ratio
        }

        if(descText){
            descText.x = stage.canvas.width/2-descText.getBounds().width/2*ratio
            descText.y = stage.canvas.height/2+descText.getBounds().height*ratio
        }

        if(strokeInput){
            strokeInput.graphics.clear();
            strokeInput.graphics.beginFill("#FFFFFF").drawRect(0, 0, 390*ratio, 1*ratio);
            strokeInput.x = stage.canvas.width/2-390/2*ratio
            strokeInput.y = descText.y+60*ratio;
        }

        if(containerInput){
            inputText.updateResize(strokeInput.x,strokeInput.y-20*ratio)
            containerInput.x = stage.canvas.width/2
            containerInput.y = strokeInput.y-20*ratio
        }

        if(containerNavigation){
            containerNavigation.x = stage.canvas.width/2-(arrowRightWhite.x+30*ratio)/2
            containerNavigation.y = stage.canvas.height-margin*ratio
        }

        if(containerRadio){
             containerRadio.x = stage.canvas.width/2-totalWidthBudget/2
            containerRadio.y = descText.y+60*ratio;
        }

        if(sucessText){
            sucessText.x = stage.canvas.width/2-sucessText.getBounds().width/2*ratio;
            sucessText.y = stage.canvas.height/2+sucessText.getBounds().height/2*ratio;
        }

        if(thankYou){
            scaleFactor = (((100)*stage.canvas.width)/(1600))/100
            thankYou.regY = 346/2
            thankYou.scaleX = scaleFactor;
            thankYou.scaleY = scaleFactor;
            thankYou.y = stage.canvas.height/2;
        }
    } ;

window.Contact = createjs.promote(Contact, "Container");
}());