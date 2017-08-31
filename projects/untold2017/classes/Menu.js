(function () {

    function Menu(IdispatchInstance,Iratio,Imargin,ItweenTime,Ibg,Iclose,ImenuTitle,Imenu1Label,Imenu1,Imenu2Label,Imenu2,Imenu3Label,Imenu3,Imenu4Label,Imenu4,Iemail,Iphone,Iaddress,Iaddress2,Iprivacy,Iterms,Isounds) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.bg = Ibg;
        this.close = Iclose;
        this.margin = Imargin;
        this.tweenTime = ItweenTime;
        this.menuTitle = ImenuTitle;
        this.menu1 = Imenu1;
        this.menu2 = Imenu2;
        this.menu3 = Imenu3;
        this.menu4 = Imenu4;
        this.menu1Label = Imenu1Label;
        this.menu2Label = Imenu2Label;
        this.menu3Label = Imenu3Label;
        this.menu4Label = Imenu4Label;
        this.email = Iemail;
        this.phone = Iphone;
        this.address = Iaddress;
        this.address2 = Iaddress2;
        this.privacy = Iprivacy;
        this.terms = Iterms;
        this.dispatchInstance = IdispatchInstance;
        this.soundInstance = Isounds;
        this.setup();
    }
    
    var instance;
    var ratio;
    var dispatchInstance;
    
    //props
    var scaleFactor
    var margin;
    var tweenTime;
    var nav = 0;

    //elements
    var containerBg
    var bg;
    var close;
    var squareHit1;
    var squareHit2;
    var squareHit3;
    var squareHit4;
    var closeSquareOne
    var closeSquareTwo

    var squareHitEmail;
    var squareHitPrivacy;
    var squareHitTerms;

    var menuTitleText;
    var menu1Text;
    var menu2Text;
    var menu3Text;
    var menu4Text;
    var menu1LabelText;
    var menu2LabelText;
    var menu3LabelText;
    var menu4LabelText;
    var emailText;
    var phoneText;
    var addressText;
    var address2Text;
    var termsText;
    var privacyText;

    var squareMenu1;
    var squareMenu2;
    var squareMenu3;
    var squareMenu4;
    var squareTerms;
    var squarePolicy;
    var squareTitle;
    var mySounds

    //text
    var menuTitleTxt;
    var menu1Txt;
    var menu2Txt;
    var menu3Txt;
    var menu4Txt;

    var menu1LabelTxt;
    var menu2LabelTxt;
    var menu3LabelTxt;
    var menu4LabelTxt;

    var emailTxt;
    var phoneTxt;
    var addressTxt;
    var address2Txt;
    var termsTxt;
    var privacyTxt;

    var p = createjs.extend(Menu, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        bg = this.bg;
        margin = this.margin;
        tweenTime = this.tweenTime;
        close = this.close;
        dispatchInstance = this.dispatchInstance;

        menuTitleTxt = this.menuTitle;

        menu1Txt = this.menu1;
        menu2Txt = this.menu2;
        menu3Txt = this.menu3;
        menu4Txt = this.menu4;

        menu1LabelTxt = this.menu1Label;
        menu2LabelTxt = this.menu2Label;
        menu3LabelTxt = this.menu3Label;
        menu4LabelTxt = this.menu4Label;

        emailTxt = this.email;
        phoneTxt = this.phone;
        addressTxt = this.address
        address2Txt = this.address2
        mySounds = this.soundInstance;
        
        termsTxt = this.terms;
        privacyTxt = this.privacy;

    };

    p.updateNav = function(Inav) {
        nav = Inav;
    }

    p.openMenu = function() {

        console.log("Open Menu");

        containerBg = new createjs.Container();
        containerBg.regX = 1030*ratio;
        scaleFactor = (((100)*stage.canvas.height)/(1000*ratio))/100
        containerBg.scaleX = scaleFactor;
        containerBg.scaleY = scaleFactor;
        containerBg.x = stage.canvas.width;
        containerBg.addChild(bg);
        instance.addChild(containerBg);

        closeSquareOne = new createjs.Shape();
        closeSquareOne.regX = 24/2*ratio
        closeSquareOne.regY = 1*ratio
        closeSquareOne.rotation = 45
        closeSquareOne.graphics.beginFill("#171820").drawRect(0, 0, 24*ratio, 2*ratio);
        closeSquareOne.x = Math.floor(stage.canvas.width-19*ratio-margin*ratio)+10*ratio
        closeSquareOne.y = Math.floor(margin*ratio)+10*ratio
        instance.addChild(closeSquareOne);

        closeSquareTwo = new createjs.Shape();
        closeSquareTwo.regX = 24/2*ratio
        closeSquareTwo.regY = 1*ratio
        closeSquareTwo.rotation = -45
        closeSquareTwo.graphics.beginFill("#171820").drawRect(0, 0, 24*ratio, 2*ratio);
        closeSquareTwo.x = Math.floor(stage.canvas.width-19*ratio-margin*ratio)+10*ratio
        closeSquareTwo.y = Math.floor(margin*ratio)+10*ratio
        instance.addChild(closeSquareTwo);

        //menu4
        menu4Text = new createjs.Text();
        menu4Text.font = "48px BebasNeueBold";
        menu4Text.color = "#171820";
        menu4Text.text = menu4Txt;
        menu4Text.scaleX = ratio;
        menu4Text.scaleY = ratio;
        menu4Text.x = Math.floor(stage.canvas.width-menu4Text.getBounds().width*ratio-margin*ratio);
        menu4Text.y = Math.floor(stage.canvas.height/2);
        instance.addChild(menu4Text);

        squareMenu4 = new createjs.Shape();
        squareMenu4.graphics.beginFill("#171820").drawRect(0, 0, 50*ratio, 1*ratio);
        squareMenu4.x = Math.floor(menu4Text.x);
        squareMenu4.y = Math.floor(menu4Text.y+17*ratio-30*ratio);
        instance.addChild(squareMenu4);

        menu4LabelText = new createjs.Text();
        menu4LabelText.font = "12px BebasNeueBold";
        menu4LabelText.color = "#171820";
        menu4LabelText.text = menu4LabelTxt;
        menu4LabelText.scaleX = ratio;
        menu4LabelText.scaleY = ratio;
        menu4LabelText.x = Math.floor(squareMenu4.x+50*ratio+10*ratio);
        menu4LabelText.y = Math.floor(squareMenu4.y-menu4LabelText.getBounds().height/2*ratio);
        instance.addChild(menu4LabelText);

        //menu3
        menu3Text = new createjs.Text();
        menu3Text.font = "48px BebasNeueBold";
        menu3Text.color = "#171820";
        menu3Text.text = menu3Txt;
        menu3Text.scaleX = ratio;
        menu3Text.scaleY = ratio;
        menu3Text.x = Math.floor(stage.canvas.width-menu4Text.getBounds().width*ratio-menu3Text.getBounds().width*ratio-margin*ratio-70*ratio);
        menu3Text.y = Math.floor(stage.canvas.height/2);
        instance.addChild(menu3Text);

        squareMenu3 = new createjs.Shape();
        squareMenu3.graphics.beginFill("#171820").drawRect(0, 0, 50*ratio, 1*ratio);
        squareMenu3.x = Math.floor(menu3Text.x);
        squareMenu3.y = Math.floor(menu3Text.y+17*ratio-30*ratio);
        instance.addChild(squareMenu3);

        menu3LabelText = new createjs.Text();
        menu3LabelText.font = "12px BebasNeueBold";
        menu3LabelText.color = "#171820";
        menu3LabelText.text = menu3LabelTxt;
        menu3LabelText.scaleX = ratio;
        menu3LabelText.scaleY = ratio;
        menu3LabelText.x = Math.floor(squareMenu3.x+50*ratio+10*ratio);
        menu3LabelText.y = Math.floor(squareMenu3.y-menu3LabelText.getBounds().height/2*ratio);
        instance.addChild(menu3LabelText);

        //menu2
        menu2Text = new createjs.Text();
        menu2Text.font = "48px BebasNeueBold";
        menu2Text.color = "#171820";
        menu2Text.text = menu2Txt;
        menu2Text.scaleX = ratio;
        menu2Text.scaleY = ratio;
        menu2Text.x = Math.floor(menu4Text.x);
        menu2Text.y = Math.floor(squareMenu4.y-menu2Text.getBounds().height*ratio-3*ratio-100*ratio);
        instance.addChild(menu2Text);

        squareMenu2 = new createjs.Shape();
        squareMenu2.graphics.beginFill("#171820").drawRect(0, 0, 50*ratio, 1*ratio);
        squareMenu2.x = Math.floor(menu2Text.x);
        squareMenu2.y = Math.floor(menu2Text.y+17*ratio-30*ratio);
        instance.addChild(squareMenu2);

        menu2LabelText = new createjs.Text();
        menu2LabelText.font = "12px BebasNeueBold";
        menu2LabelText.color = "#171820";
        menu2LabelText.text = menu2LabelTxt;
        menu2LabelText.scaleX = ratio;
        menu2LabelText.scaleY = ratio;
        menu2LabelText.x = Math.floor(squareMenu2.x+50*ratio+10*ratio);
        menu2LabelText.y = Math.floor(squareMenu2.y-menu2LabelText.getBounds().height/2*ratio);
        instance.addChild(menu2LabelText);

        //menu1
        menu1Text = new createjs.Text();
        menu1Text.font = "48px BebasNeueBold";
        menu1Text.color = "#171820";
        menu1Text.text = menu1Txt;
        menu1Text.scaleX = ratio;
        menu1Text.scaleY = ratio;
        menu1Text.x = Math.floor(menu3Text.x);
        menu1Text.y = Math.floor(squareMenu3.y-menu1Text.getBounds().height*ratio-3*ratio-100*ratio);
        instance.addChild(menu1Text);

        squareMenu1 = new createjs.Shape();
        squareMenu1.graphics.beginFill("#171820").drawRect(0, 0, 50*ratio, 1*ratio);
        squareMenu1.x = Math.floor(menu1Text.x);
        squareMenu1.y = Math.floor(menu1Text.y+17*ratio-30*ratio);
        instance.addChild(squareMenu1);

        menu1LabelText = new createjs.Text();
        menu1LabelText.font = "12px BebasNeueBold";
        menu1LabelText.color = "#171820";
        menu1LabelText.text = menu1LabelTxt;
        menu1LabelText.scaleX = ratio;
        menu1LabelText.scaleY = ratio;
        menu1LabelText.x = Math.floor(squareMenu1.x+50*ratio+10*ratio);
        menu1LabelText.y = Math.floor(squareMenu1.y-menu1LabelText.getBounds().height/2*ratio);
        instance.addChild(menu1LabelText);

        //square title
        squareTitle = new createjs.Shape();
        squareTitle.graphics.beginFill("#171820").drawRect(0, 0, 25*ratio, 1*ratio);
        squareTitle.x = Math.floor(squareMenu1.x);
        squareTitle.y = Math.floor(margin*ratio+8*ratio);
        instance.addChild(squareTitle);

        //tittle
        menuTitleText = new createjs.Text();
        menuTitleText.font = "12px BebasNeueBold";
        menuTitleText.color = "#171820";
        menuTitleText.text = menuTitleTxt;
        menuTitleText.scaleX = ratio;
        menuTitleText.scaleY = ratio;
        menuTitleText.x = Math.floor(squareTitle.x+25*ratio+10*ratio);
        menuTitleText.y = Math.floor(squareTitle.y-menuTitleText.getBounds().height/2*ratio);
        instance.addChild(menuTitleText);

        //email
        emailText = new createjs.Text();
        emailText.font = "14px BebasNeueBold";
        emailText.alpha = 0.35;
        emailText.color = "#171820";
        emailText.text = emailTxt;
        emailText.scaleX = ratio;
        emailText.scaleY = ratio;
        emailText.x = Math.floor(stage.canvas.width-emailText.getBounds().width*ratio-margin*ratio);
        emailText.y = Math.floor(menu4Text.y+menu4Text.getBounds().height*ratio+100*ratio);
        instance.addChild(emailText);

        //phone
        phoneText = new createjs.Text();
        phoneText.alpha = 0.35;
        phoneText.font = "14px BebasNeueBold";
        phoneText.color = "#171820";
        phoneText.text = phoneTxt;
        phoneText.scaleX = ratio;
        phoneText.scaleY = ratio;
        phoneText.x = Math.floor(stage.canvas.width-phoneText.getBounds().width*ratio-margin*ratio);
        phoneText.y = Math.floor(emailText.y+phoneText.getBounds().height*ratio+margin*ratio);
        instance.addChild(phoneText);

        //phone
        addressText = new createjs.Text();
        addressText.alpha = 0.35;
        addressText.font = "14px BebasNeueBold";
        addressText.color = "#171820";
        addressText.text = addressTxt;
        addressText.scaleX = ratio;
        addressText.scaleY = ratio;
        addressText.x = Math.floor(stage.canvas.width-addressText.getBounds().width*ratio-margin*ratio);
        addressText.y = Math.floor(phoneText.y+addressText.getBounds().height*ratio+margin*ratio);
        instance.addChild(addressText);

        //phone
        address2Text = new createjs.Text();
        address2Text.alpha = 0.35;
        address2Text.font = "14px BebasNeueBold";
        address2Text.color = "#171820";
        address2Text.text = address2Txt;
        address2Text.scaleX = ratio;
        address2Text.scaleY = ratio;
        address2Text.x = Math.floor(stage.canvas.width-address2Text.getBounds().width*ratio-margin*ratio);
        address2Text.y = Math.floor(addressText.y+addressText.getBounds().height*ratio+5*ratio);
        instance.addChild(address2Text);

        //terms
        termsText = new createjs.Text();
        termsText.alpha = 0.35;
        termsText.font = "12px BebasNeueBold";
        termsText.color = "#171820";
        termsText.text = termsTxt;
        termsText.scaleX = ratio;
        termsText.scaleY = ratio;
        termsText.x = Math.floor(stage.canvas.width-termsText.getBounds().width*ratio-margin*ratio);
        termsText.y = Math.floor(stage.canvas.height-termsText.getBounds().height*ratio-margin*ratio);
        instance.addChild(termsText);

        //square terms
        squareTerms = new createjs.Shape();
        squareTerms.alpha = 0.35;
        squareTerms.graphics.beginFill("#171820").drawRect(0, 0, 25*ratio, 1*ratio);
        squareTerms.x = Math.floor(termsText.x-25*ratio-10*ratio);
        squareTerms.y = Math.floor(termsText.y+termsText.getBounds().height/2*ratio);
        instance.addChild(squareTerms);

        //policy
        privacyText = new createjs.Text();
        privacyText.alpha = 0.35;
        privacyText.font = "12px BebasNeueBold";
        privacyText.color = "#171820";
        privacyText.text = privacyTxt;
        privacyText.scaleX = ratio;
        privacyText.scaleY = ratio;
        privacyText.x = Math.floor(squareTerms.x-privacyText.getBounds().width*ratio-50*ratio);
        privacyText.y = Math.floor(stage.canvas.height-privacyText.getBounds().height*ratio-margin*ratio);
        instance.addChild(privacyText);

        //square policy
        squarePolicy = new createjs.Shape();
        squarePolicy.alpha = 0.35;
        squarePolicy.graphics.beginFill("#171820").drawRect(0, 0, 25*ratio, 1*ratio);
        squarePolicy.x = Math.floor(privacyText.x-25*ratio-10*ratio);
        squarePolicy.y = Math.floor(privacyText.y+privacyText.getBounds().height/2*ratio);
        instance.addChild(squarePolicy);

        checkNavigation();
        addHitsMenu();
        addAnimationMenu();

    }

    function addHitsMenu(){

        //square 1
        squareHit1 = new createjs.Shape();
        squareHit1.cursor = "pointer";
        squareHit1.alpha = 0.01;
        squareHit1.graphics.beginFill("#FFFFFF").drawRect(0, 0, menu1Text.getBounds().width*ratio, menu1Text.getBounds().height*ratio+50*ratio);
        squareHit1.x = Math.floor(squareMenu1.x);
        squareHit1.y = Math.floor(squareMenu1.y);
        instance.addChild(squareHit1);

        //square 2
        squareHit2 = new createjs.Shape();
        squareHit2.cursor = "pointer";
        squareHit2.alpha = 0.01;
        squareHit2.graphics.beginFill("#FFFFFF").drawRect(0, 0, menu2Text.getBounds().width*ratio, menu2Text.getBounds().height*ratio+50*ratio);
        squareHit2.x = Math.floor(squareMenu2.x);
        squareHit2.y = Math.floor(squareMenu2.y);
        instance.addChild(squareHit2);

        //square 3
        squareHit3 = new createjs.Shape();
        squareHit3.cursor = "pointer";
        squareHit3.alpha = 0.01;
        squareHit3.graphics.beginFill("#FFFFFF").drawRect(0, 0, menu3Text.getBounds().width*ratio, menu3Text.getBounds().height*ratio+50*ratio);
        squareHit3.x = Math.floor(squareMenu3.x);
        squareHit3.y = Math.floor(squareMenu3.y);
        instance.addChild(squareHit3);

        //square 4
        squareHit4 = new createjs.Shape();
        squareHit4.cursor = "pointer";
        squareHit4.alpha = 0.01;
        squareHit4.graphics.beginFill("#FFFFFF").drawRect(0, 0, menu4Text.getBounds().width*ratio, menu4Text.getBounds().height*ratio+50*ratio);
        squareHit4.x = Math.floor(squareMenu4.x);
        squareHit4.y = Math.floor(squareMenu4.y);
        instance.addChild(squareHit4);

        //square email
        squareHitEmail = new createjs.Shape();
        squareHitEmail.cursor = "pointer";
        squareHitEmail.alpha = 0.01;
        squareHitEmail.graphics.beginFill("#FFFFFF").drawRect(0, 0, emailText.getBounds().width*ratio, emailText.getBounds().height*ratio+10*ratio);
        squareHitEmail.x = Math.floor(emailText.x);
        squareHitEmail.y = Math.floor(emailText.y);
        instance.addChild(squareHitEmail);

        //square terms
        squareHitPrivacy = new createjs.Shape();
        squareHitPrivacy.cursor = "pointer";
        squareHitPrivacy.alpha = 0.01;
        squareHitPrivacy.graphics.beginFill("#FFFFFF").drawRect(0, 0, 25*ratio+privacyText.getBounds().width*ratio+10*ratio, privacyText.getBounds().height*ratio+10*ratio);
        squareHitPrivacy.x = Math.floor(squarePolicy.x);
        squareHitPrivacy.y = Math.floor(privacyText.y);
        instance.addChild(squareHitPrivacy);

        //square terms
        squareHitTerms = new createjs.Shape();
        squareHitTerms.cursor = "pointer";
        squareHitTerms.alpha = 0.01;
        squareHitTerms.graphics.beginFill("#FFFFFF").drawRect(0, 0, 25*ratio+termsText.getBounds().width*ratio+10*ratio, termsText.getBounds().height*ratio+10*ratio);
        squareHitTerms.x = Math.floor(squareTerms.x);
        squareHitTerms.y = Math.floor(termsText.y);
        instance.addChild(squareHitTerms);

        squareHit1.name = "0";
        squareHit1.addEventListener("mouseover", handlerOver);
        squareHit1.addEventListener("mouseout", handlerOut);
        squareHit1.addEventListener("click", handlerClick);

        squareHit2.name = "1";
        squareHit2.addEventListener("mouseover", handlerOver);
        squareHit2.addEventListener("mouseout", handlerOut);
        squareHit2.addEventListener("click", handlerClick);

        squareHit3.name = "2";
        squareHit3.addEventListener("mouseover", handlerOver);
        squareHit3.addEventListener("mouseout", handlerOut);
        squareHit3.addEventListener("click", handlerClick);

        squareHit4.name = "3";
        squareHit4.addEventListener("mouseover", handlerOver);
        squareHit4.addEventListener("mouseout", handlerOut);
        squareHit4.addEventListener("click", handlerClick);
    }



    function handlerOver(event){

        if(event.target.name!=nav){
             event.target.cursor = "pointer"
        }else{
            event.target.cursor = "auto"
        }

        switch(event.target.name){

            case "0":
                if(event.target.name!=nav){

                    mySounds.textSound();

                    TweenMax.to(menu1Text, tweenTime/4, {ease:Expo.easeInOut, alpha:1})
                    TweenMax.to(squareMenu1, tweenTime/2, {scaleX:0.4,ease:Expo.easeInOut, alpha:1})
                    TweenMax.to(menu1LabelText, tweenTime/2, {x:Math.floor(squareMenu1.x+50*ratio+10*ratio)-30*ratio,ease:Expo.easeInOut, alpha:1})
                }
            break;
            case "1":
                if(event.target.name!=nav){

                    mySounds.textSound();

                    TweenMax.to(menu2Text, tweenTime/2, {ease:Expo.easeInOut, alpha:1})
                    TweenMax.to(squareMenu2, tweenTime/2, {scaleX:0.4,ease:Expo.easeInOut, alpha:1})
                    TweenMax.to(menu2LabelText, tweenTime/2, {x:Math.floor(squareMenu2.x+50*ratio+10*ratio)-30*ratio,ease:Expo.easeInOut, alpha:1})
                }
            break;
            case "2":
                if(event.target.name!=nav){

                    mySounds.textSound();

                    TweenMax.to(menu3Text, tweenTime/2, {ease:Expo.easeInOut, alpha:1})
                    TweenMax.to(squareMenu3, tweenTime/2, {scaleX:0.4,ease:Expo.easeInOut, alpha:1})
                    TweenMax.to(menu3LabelText, tweenTime/2, {x:Math.floor(squareMenu3.x+50*ratio+10*ratio)-30*ratio,ease:Expo.easeInOut, alpha:1})
                }
            break;
            case "3":
                if(event.target.name!=nav){

                    mySounds.textSound();
                    
                    TweenMax.to(menu4Text, tweenTime/2, {ease:Expo.easeInOut, alpha:1})
                    TweenMax.to(squareMenu4, tweenTime/2, {scaleX:0.4,ease:Expo.easeInOut, alpha:1})
                    TweenMax.to(menu4LabelText, tweenTime/2, {x:Math.floor(squareMenu4.x+50*ratio+10*ratio)-30*ratio,ease:Expo.easeInOut, alpha:1})
                }
            break;
        }
    }

    function handlerClick(event){

        instance.killClose();

        switch(event.target.name){
            case "0":
                if(event.target.name!=nav){
                    var customEvent = new createjs.Event("goToMenuHome");
                    dispatchInstance.dispatchEvent(customEvent);
                } 
            break;
            case "1":
                
                if(event.target.name!=nav){
                    var customEvent = new createjs.Event("goToMenuWork");
                    dispatchInstance.dispatchEvent(customEvent);
                }

            break;
            case "2":
                
                if(event.target.name!=nav){
                    var customEvent = new createjs.Event("goToMenuAgency");
                    dispatchInstance.dispatchEvent(customEvent);
                }

            break;
            case "3":
                if(event.target.name!=nav){
                    var customEvent = new createjs.Event("goToMenuTalk");
                    dispatchInstance.dispatchEvent(customEvent);
                }
            break;
        }
    }

    function handlerOut(event){

        switch(event.target.name){
            case "0":
                if(event.target.name!=nav){
                    TweenMax.to(menu1Text, tweenTime/4, {ease:Expo.easeInOut, alpha:0.35})
                    TweenMax.to(squareMenu1, tweenTime/2, {scaleX:1,ease:Expo.easeInOut, alpha:0.35})
                    TweenMax.to(menu1LabelText, tweenTime/2, {x:Math.floor(squareMenu1.x+50*ratio+10*ratio),ease:Expo.easeInOut, alpha:0.35})
                }
            break;
            case "1":
                if(event.target.name!=nav){
                    TweenMax.to(menu2Text, tweenTime/2, {ease:Expo.easeInOut, alpha:0.35})
                    TweenMax.to(squareMenu2, tweenTime/2, {scaleX:1,ease:Expo.easeInOut, alpha:0.35})
                    TweenMax.to(menu2LabelText, tweenTime/2, {x:Math.floor(squareMenu2.x+50*ratio+10*ratio),ease:Expo.easeInOut, alpha:0.35})
                }
            break;
            case "2":
                if(event.target.name!=nav){
                    TweenMax.to(menu3Text, tweenTime/2, {ease:Expo.easeInOut, alpha:0.35})
                    TweenMax.to(squareMenu3, tweenTime/2, {scaleX:1,ease:Expo.easeInOut, alpha:0.35})
                    TweenMax.to(menu3LabelText, tweenTime/2, {x:Math.floor(squareMenu3.x+50*ratio+10*ratio),ease:Expo.easeInOut, alpha:0.35})
                }
            break;
            case "3":
                if(event.target.name!=nav){
                    TweenMax.to(menu4Text, tweenTime/2, {ease:Expo.easeInOut, alpha:0.35})
                    TweenMax.to(squareMenu4, tweenTime/2, {scaleX:1,ease:Expo.easeInOut, alpha:0.35})
                    TweenMax.to(menu4LabelText, tweenTime/2, {x:Math.floor(squareMenu4.x+50*ratio+10*ratio),ease:Expo.easeInOut, alpha:0.35})
                }
            break;
        }
    }

    function checkNavigation(){

        console.log("Nav: "+nav)

        switch(nav){
            case 0:

                menu4Text.alpha = 0.35
                squareMenu4.alpha = 0.35
                menu4LabelText.alpha = 0.35

                menu3Text.alpha = 0.35
                squareMenu3.alpha = 0.35
                menu3LabelText.alpha = 0.35

                menu2Text.alpha = 0.35
                squareMenu2.alpha = 0.35
                menu2LabelText.alpha = 0.35

            break;

            case 1:
            
                menu3Text.alpha = 0.35
                squareMenu3.alpha = 0.35
                menu3LabelText.alpha = 0.35

                menu1Text.alpha = 0.35
                squareMenu1.alpha = 0.35
                menu1LabelText.alpha = 0.35

                menu4Text.alpha = 0.35
                squareMenu4.alpha = 0.35
                menu4LabelText.alpha = 0.35

            break;

            case 2:
            
                menu2Text.alpha = 0.35
                squareMenu2.alpha = 0.35
                menu2LabelText.alpha = 0.35

                menu4Text.alpha = 0.35
                squareMenu4.alpha = 0.35
                menu4LabelText.alpha = 0.35

                menu1Text.alpha = 0.35
                squareMenu1.alpha = 0.35
                menu1LabelText.alpha = 0.35

            break;

            case 3:
            
                menu2Text.alpha = 0.35
                squareMenu2.alpha = 0.35
                menu2LabelText.alpha = 0.35

                menu3Text.alpha = 0.35
                squareMenu3.alpha = 0.35
                menu3LabelText.alpha = 0.35

                menu1Text.alpha = 0.35
                squareMenu1.alpha = 0.35
                menu1LabelText.alpha = 0.35

            break;
        }
    }

    p.killClose = function(){

        
        TweenMax.to(closeSquareOne, tweenTime/4, {tease:Expo.easeInOut,scaleX:2})
        TweenMax.to(closeSquareTwo, tweenTime/4, {ease:Expo.easeInOut,scaleX:2})

        TweenMax.to(closeSquareOne, tweenTime/2, {ease:Expo.easeOut,alpha:0})
        TweenMax.to(closeSquareTwo, tweenTime/2, {ease:Expo.easeOut,alpha:0})
    }

    p.overClose = function(){
        closeSquareOne.scaleX = 3
        closeSquareTwo.scaleX = 3
        closeSquareOne.alpha = 0
        closeSquareTwo.alpha = 0
        TweenMax.to(closeSquareOne, tweenTime/4, {tease:Power2.easeInOut, scaleX:1,alpha:1})
        TweenMax.to(closeSquareTwo, tweenTime/4, {delay:tweenTime/8,ease:Expo.easeInOut, scaleX:1,alpha:1})
    }

    p.outClose = function(){

        closeSquareOne.scaleX = 2
        closeSquareTwo.scaleX = 2
        closeSquareOne.alpha = 0
        closeSquareTwo.alpha = 0

        TweenMax.to(closeSquareOne, tweenTime/4, {delay:tweenTime/8,tease:Power2.easeInOut, scaleX:1,alpha:1})
        TweenMax.to(closeSquareTwo, tweenTime/4, {ease:Expo.easeInOut, scaleX:1,alpha:1})
    }

    p.closeMenu = function() {

        console.log("Close Menu");
       
        squareHit1.removeEventListener("mouseover", handlerOver);
        squareHit1.removeEventListener("mouseout", handlerOut);
        squareHit1.removeEventListener("click", handlerClick);

        squareHit2.name = "1";
        squareHit2.removeEventListener("mouseover", handlerOver);
        squareHit2.removeEventListener("mouseout", handlerOut);
        squareHit2.removeEventListener("click", handlerClick);

        squareHit3.name = "2";
        squareHit3.removeEventListener("mouseover", handlerOver);
        squareHit3.removeEventListener("mouseout", handlerOut);
        squareHit3.removeEventListener("click", handlerClick);

        squareHit4.name = "3";
        squareHit4.removeEventListener("mouseover", handlerOver);
        squareHit4.removeEventListener("mouseout", handlerOut);
        squareHit4.removeEventListener("click", handlerClick);

        //animation
        TweenMax.to(containerBg, tweenTime/2, {delay:tweenTime/4,ease:Expo.easeInOut, x:stage.canvas.width+1030*ratio,onComplete:kill});
        
        TweenMax.to(close, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0})
        
        TweenMax.to(menu4Text, tweenTime/4, {ease:Expo.easeOut, alpha:0, x:menu4Text.x-margin*ratio})
        TweenMax.to(squareMenu4, tweenTime/4, {ease:Expo.easeOut, scaleX:0})
        TweenMax.to(menu4LabelText, tweenTime/4, {ease:Expo.easeOut, alpha:0, x:menu4LabelText.x-margin*ratio})

        TweenMax.to(menu3Text, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:menu3Text.x-margin*ratio})
        TweenMax.to(squareMenu3, tweenTime/2, {ease:Expo.easeOut, scaleX:0})
        TweenMax.to(menu3LabelText, tweenTime/2, {ease:Expo.easeOut, alpha:0,x:menu3LabelText.x-margin*ratio})

        TweenMax.to(menu2Text, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:menu2Text.x-margin*ratio})
        TweenMax.to(squareMenu2, tweenTime/2, {ease:Expo.easeOut, scaleX:0})
        TweenMax.to(menu2LabelText, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:menu2LabelText.x-margin*ratio})

        TweenMax.to(menu1Text, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:menu1Text.x-margin*ratio})
        TweenMax.to(squareMenu1, tweenTime/2, {ease:Expo.easeOut, scaleX:0})
        TweenMax.to(menu1LabelText, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:menu1LabelText.x-margin*ratio})

        TweenMax.to(squareTitle, tweenTime/2, {ease:Expo.easeOut, scaleX:0})
        TweenMax.to(menuTitleText, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:menuTitleText.x-margin*ratio})

        TweenMax.to(emailText, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:emailText.x-margin*ratio})
        TweenMax.to(phoneText, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:phoneText.x-margin*ratio})
        TweenMax.to(addressText, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:addressText.x-margin*ratio})
        TweenMax.to(address2Text, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:address2Text.x-margin*ratio})

        TweenMax.to(squareTerms, tweenTime/2, {ease:Expo.easeOut, scaleX:0})
        TweenMax.to(termsText, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:termsText.x-margin*ratio})

        TweenMax.to(squarePolicy, tweenTime/2, {ease:Expo.easeOut, scaleX:0})
        TweenMax.to(privacyText, tweenTime/2, {ease:Expo.easeOut, alpha:0, x:privacyText.x-margin*ratio})
        
    }

    function addAnimationMenu(){

        //animation
        TweenMax.from(containerBg, tweenTime/2, {ease:Expo.easeOut, x:stage.canvas.width+1030*ratio})
        
        TweenMax.from(closeSquareOne, tweenTime/4, {tease:Power2.easeInOut, scaleX:4,alpha:0})
        TweenMax.from(closeSquareTwo, tweenTime/4, {delay:tweenTime/8,ease:Expo.easeInOut, scaleX:4,alpha:0})
        
        TweenMax.from(menu4Text, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:menu4Text.x-margin*ratio})
        TweenMax.from(squareMenu4, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, scaleX:0})
        TweenMax.from(menu4LabelText, tweenTime/2, {delay:tweenTime/6, ease:Expo.easeOut, alpha:0, x:menu4LabelText.x-margin*ratio})

        TweenMax.from(menu3Text, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:menu3Text.x-margin*ratio})
        TweenMax.from(squareMenu3, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, scaleX:0})
        TweenMax.from(menu3LabelText, tweenTime/2, {delay:tweenTime/6, ease:Expo.easeOut, alpha:0,x:menu3LabelText.x-margin*ratio})

        TweenMax.from(menu2Text, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:menu2Text.x-margin*ratio})
        TweenMax.from(squareMenu2, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, scaleX:0})
        TweenMax.from(menu2LabelText, tweenTime/2, {delay:tweenTime/6, ease:Expo.easeOut, alpha:0, x:menu2Text.x-margin*ratio})

        TweenMax.from(menu1Text, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:menu1Text.x-margin*ratio})
        TweenMax.from(squareMenu1, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, scaleX:0})
        TweenMax.from(menu1LabelText, tweenTime/2, {delay:tweenTime/6, ease:Expo.easeOut, alpha:0, x:menu1Text.x-margin*ratio})

        TweenMax.from(squareTitle, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, scaleX:0})
        TweenMax.from(menuTitleText, tweenTime/2, {delay:tweenTime/6, ease:Expo.easeOut, alpha:0, x:menuTitleText.x-margin*ratio})

        TweenMax.from(emailText, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:emailText.x-margin*ratio})
        TweenMax.from(phoneText, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:phoneText.x-margin*ratio})
        TweenMax.from(addressText, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:addressText.x-margin*ratio})
        TweenMax.from(address2Text, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:address2Text.x-margin*ratio})

        TweenMax.from(squareTerms, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, scaleX:0})
        TweenMax.from(termsText, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:termsText.x-margin*ratio})

        TweenMax.from(squarePolicy, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, scaleX:0})
        TweenMax.from(privacyText, tweenTime/2, {delay:tweenTime/4, ease:Expo.easeOut, alpha:0, x:privacyText.x-margin*ratio})
    }

    function kill(){

        containerBg.removeChild(bg);
        instance.removeChild(containerBg);
        containerBg = null;

        instance.removeChild(closeSquareOne);
        instance.removeChild(closeSquareTwo)

        //menu4
        instance.removeChild(menu4Text);
        menu4Text = null;

        instance.removeChild(squareMenu4);
        squareMenu4 = null;

        instance.removeChild(menu4LabelText);
        menu4LabelText = null;

        //menu3
        instance.removeChild(menu3Text);
        menu3Text = null;

        instance.removeChild(squareMenu3);
        squareMenu3 = null;

        instance.removeChild(menu3LabelText);
        menu3LabelText = null;

        //menu2
        instance.removeChild(menu2Text);
        menu2Text = null;

        instance.removeChild(squareMenu2);
        squareMenu2 = null;

        instance.removeChild(menu2LabelText);
        menu2LabelText = null;

        //menu1
        instance.removeChild(menu1Text);
        menu1Text = null;

        instance.removeChild(squareMenu1);
        squareMenu1 = null;

        instance.removeChild(menu1LabelText);
        menu1LabelText = null;

        //square title
        instance.removeChild(squareTitle);
        squareTitle = null;

        //tittle
        instance.removeChild(menuTitleText);
        menuTitleText = null;

        //email
        instance.removeChild(emailText);
        emailText = null;

        //phone
        instance.removeChild(phoneText);
        phoneText = null;

        //phone
        instance.removeChild(addressText);
        addressText = null;

        //phone
        instance.removeChild(address2Text);
        address2Text = null;

        //terms
        instance.removeChild(termsText);
        termsText = null;

        //square terms
        instance.removeChild(squareTerms);
        squareTerms = null;

        //policy
        instance.removeChild(privacyText);
        privacyText = null;

        //square policy
        instance.removeChild(squarePolicy);
        squarePolicy = null;

        instance.removeChild(squareHit1);
        squareHit1 = null;

        instance.removeChild(squareHit2);
        squareHit2 = null;

        instance.removeChild(squareHit3);
        squareHit3 = null;

        instance.removeChild(squareHit4);
        squareHit4 = null;

        instance.removeChild(squareHitEmail);
        squareHitEmail = null;

        instance.removeChild(squareHitPrivacy);
        squareHitPrivacy = null;

        instance.removeChild(squareHitTerms);
        squareHitTerms = null;

    }

    p.resize = function() {


        if(closeSquareOne){
            closeSquareOne.x = Math.floor(stage.canvas.width-19*ratio-margin*ratio)+10*ratio
            closeSquareOne.y = Math.floor(margin*ratio)+10*ratio
        }

        if(closeSquareTwo){
            closeSquareTwo.x = Math.floor(stage.canvas.width-19*ratio-margin*ratio)+10*ratio
            closeSquareTwo.y = Math.floor(margin*ratio)+10*ratio
        }

        if(containerBg){
            scaleFactor = (((100)*stage.canvas.height)/(1000*ratio))/100
            containerBg.scaleX = scaleFactor;
            containerBg.scaleY = scaleFactor;
            containerBg.x = stage.canvas.width;
        }

        if(menu4Text){
            menu4Text.x = Math.floor(stage.canvas.width-menu4Text.getBounds().width*ratio-margin*ratio);
            menu4Text.y = Math.floor(stage.canvas.height/2);
        }

        if(squareMenu4){
            squareMenu4.x = Math.floor(menu4Text.x);
            squareMenu4.y = Math.floor(menu4Text.y+17*ratio-30*ratio);
        }

        if(menu4LabelText){
            menu4LabelText.x = Math.floor(squareMenu4.x+50*ratio+10*ratio);
            menu4LabelText.y = Math.floor(squareMenu4.y-menu4LabelText.getBounds().height/2*ratio);
        }

        if(menu3Text){
            menu3Text.x = Math.floor(stage.canvas.width-menu4Text.getBounds().width*ratio-menu3Text.getBounds().width*ratio-margin*ratio-70*ratio);
            menu3Text.y = Math.floor(stage.canvas.height/2);
        }

        if(squareMenu3){
            squareMenu3.x = Math.floor(menu3Text.x);
            squareMenu3.y = Math.floor(menu3Text.y+17*ratio-30*ratio);
        }

        if(menu3LabelText){
            menu3LabelText.x = Math.floor(squareMenu3.x+50*ratio+10*ratio);
            menu3LabelText.y = Math.floor(squareMenu3.y-menu3LabelText.getBounds().height/2*ratio);
        }

        if(menu2Text){
            menu2Text.x = Math.floor(menu4Text.x);
            menu2Text.y = Math.floor(squareMenu4.y-menu2Text.getBounds().height*ratio-3*ratio-100*ratio);
        }

        if(squareMenu2){
            squareMenu2.x = Math.floor(menu2Text.x);
            squareMenu2.y = Math.floor(menu2Text.y+17*ratio-30*ratio);
        }

        if(menu2LabelText){
            menu2LabelText.x = Math.floor(squareMenu2.x+50*ratio+10*ratio);
            menu2LabelText.y = Math.floor(squareMenu2.y-menu2LabelText.getBounds().height/2*ratio);
        }

        if(menu1Text){
            menu1Text.x = Math.floor(menu3Text.x);
            menu1Text.y = Math.floor(squareMenu3.y-menu1Text.getBounds().height*ratio-3*ratio-100*ratio);
        }

        if(squareMenu1){
            squareMenu1.x = Math.floor(menu1Text.x);
            squareMenu1.y = Math.floor(menu1Text.y+17*ratio-30*ratio);
        }

        if(menu1LabelText){
            menu1LabelText.x = Math.floor(squareMenu1.x+50*ratio+10*ratio);
            menu1LabelText.y = Math.floor(squareMenu1.y-menu1LabelText.getBounds().height/2*ratio);
        }

        if(emailText){
            emailText.x = Math.floor(stage.canvas.width-emailText.getBounds().width*ratio-margin*ratio);
            emailText.y = Math.floor(menu4Text.y+menu4Text.getBounds().height*ratio+100*ratio);
        }

        if(phoneText){
            phoneText.x = Math.floor(stage.canvas.width-phoneText.getBounds().width*ratio-margin*ratio);
            phoneText.y = Math.floor(emailText.y+phoneText.getBounds().height*ratio+margin*ratio);
        }

        if(addressText){
            addressText.x = Math.floor(stage.canvas.width-addressText.getBounds().width*ratio-margin*ratio);
            addressText.y = Math.floor(phoneText.y+addressText.getBounds().height*ratio+margin*ratio);
        }

        if(address2Text){
            address2Text.x = Math.floor(stage.canvas.width-address2Text.getBounds().width*ratio-margin*ratio);
            address2Text.y = Math.floor(addressText.y+addressText.getBounds().height*ratio+5*ratio);
        }

        if(termsText){
            termsText.x = Math.floor(stage.canvas.width-termsText.getBounds().width*ratio-margin*ratio);
            termsText.y = Math.floor(stage.canvas.height-termsText.getBounds().height*ratio-margin*ratio);
        }

        if(squareTerms){
            squareTerms.x = Math.floor(termsText.x-25*ratio-10*ratio);
            squareTerms.y = Math.floor(termsText.y+termsText.getBounds().height/2*ratio);  
        }

        if(privacyText){
            privacyText.x = Math.floor(squareTerms.x-privacyText.getBounds().width*ratio-50*ratio);
            privacyText.y = Math.floor(stage.canvas.height-privacyText.getBounds().height*ratio-margin*ratio);
        }

        if(squarePolicy){
           squarePolicy.x = Math.floor(privacyText.x-25*ratio-10*ratio);
           squarePolicy.y = Math.floor(privacyText.y+privacyText.getBounds().height/2*ratio);
        }

        if(squareTitle){
            squareTitle.x = Math.floor(squareMenu1.x);
            squareTitle.y = Math.floor(margin*ratio+8*ratio);
        }

        if(menuTitleText){
            menuTitleText.x = Math.floor(squareTitle.x+25*ratio+10*ratio);
            menuTitleText.y = Math.floor(squareTitle.y-menuTitleText.getBounds().height/2*ratio);
        }

        if(squareHit1){
            squareHit1.x = Math.floor(squareMenu1.x);
            squareHit1.y = Math.floor(squareMenu1.y);
        }

        if(squareHit2){
            squareHit2.x = Math.floor(squareMenu2.x);
            squareHit2.y = Math.floor(squareMenu2.y);
        }

        if(squareHit3){
            squareHit3.x = Math.floor(squareMenu3.x);
            squareHit3.y = Math.floor(squareMenu3.y);
        }

        if(squareHit4){
            squareHit4.x = Math.floor(squareMenu4.x);
            squareHit4.y = Math.floor(squareMenu4.y);
        }

        if(squareHitEmail){
            squareHitEmail.x = Math.floor(emailText.x);
            squareHitEmail.y = Math.floor(emailText.y);
        }

        if(squareHitPrivacy){
            squareHitPrivacy.x = Math.floor(squarePolicy.x);
            squareHitPrivacy.y = Math.floor(privacyText.y);
        }

        if(squareHitTerms){
            squareHitTerms.x = Math.floor(squareTerms.x);
            squareHitTerms.y = Math.floor(termsText.y);
        }
    } ;  

window.Menu = createjs.promote(Menu, "Container");
}());