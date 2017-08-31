(function () {

    function SideBar(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.lang = Ilang
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var aspectRatio;
    var lang;

    var buttonBuy;
    var buttonBuyColor;
    var buttonTitle;
    var containerTextIcon;
    var data;
    var overlayBlock;
    var containerSideBar;
    var containerForm;
    var buttonForm;
    var buttonFormColor;
    var titleButtonTxt;
    var aveiroButtonHit
    var aveiroButtonTitle;

    var buttonFormClose;
    var buttonFormColorClose
    var titleButtonCloseTxt

    var buttonIcon;
    var buttonIconClose;

    var buttonIconStepForward;
    var buttonIconStepBack;
    
    var buttonIconStepForwardColor;
    var buttonIconStepBackColor;

    var hitBackNavigation;
    var hitFrontkNavigation;
    
    var containerInput;
    var navStep;
    var totalNavStep;
    var containerInput;
    var totalHeightForm;
    var inputText;
    var formData;

    var navigationCursor;

    var p = createjs.extend(SideBar, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        lang = this.lang

    };

    p.addElements = function(Idata,IbuttonIcon,IbuttonIconBack,IbuttonIconFrontForm,IbuttonIconBackForm,IbuttonIconFrontFormColor,IbuttonIconBackFormColor){

        data = Idata
        buttonIcon = IbuttonIcon
        buttonIconClose = IbuttonIconBack

        buttonIconStepBack = IbuttonIconBackForm;
        buttonIconStepForward = IbuttonIconFrontForm;

        buttonIconStepBackColor = IbuttonIconBackFormColor;
        buttonIconStepForwardColor = IbuttonIconFrontFormColor;

        buttonBuy = new createjs.Shape();
        buttonBuy.graphics.beginFill("#a49a88").drawRect(0, 0, 232*ratio, 50*ratio);
        buttonBuy.x = stage.canvas.width-232*ratio
        buttonBuy.y = stage.canvas.height-50*ratio
        instance.addChild(buttonBuy);

        buttonBuyColor = new createjs.Shape();
        buttonBuyColor.graphics.beginFill("#151618").drawRect(0, 0, 232*ratio, 50*ratio);
        buttonBuyColor.scaleX=0;
        buttonBuyColor.x = buttonBuy.x
        buttonBuyColor.y = buttonBuy.y
        instance.addChild(buttonBuyColor);        

        containerTextIcon = new createjs.Container()

        buttonTitle = new createjs.Text();
        buttonTitle.font = "12px OpenSans-Semibold";
        buttonTitle.textBaseline = "alphabetic";
        buttonTitle.color = "#FFFFFF";
        buttonTitle.text = data.title[lang];
        buttonTitle.scaleX = ratio;
        buttonTitle.scaleY = ratio;
        buttonTitle.y = buttonTitle.getBounds().height*ratio
        containerTextIcon.addChild(buttonTitle);

        buttonIcon.x = buttonTitle.getBounds().width*ratio+20*ratio
        buttonIcon.y = 5*ratio
        containerTextIcon.addChild(buttonIcon);

        containerTextIcon.x = buttonBuy.x+232/2*ratio-(buttonTitle.getBounds().width*ratio+20*ratio+14*ratio)/2
        containerTextIcon.y = buttonBuy.y+50/2*ratio-buttonTitle.getBounds().height/2*ratio-2*ratio

        instance.addChild(containerTextIcon);
        addAnimation();

    }

    p.hide = function() {

        TweenMax.to(buttonBuy, 1, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(buttonBuyColor, 1, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(containerTextIcon, 1, {alpha:0,ease:Expo.easeInOut,onComplete:continueHide})

    } ;

    function continueHide(){

        buttonBuy.visible = false
        buttonBuyColor.visible = false
        containerTextIcon.visible = false

    }

    p.show = function() {

        buttonBuy.visible = true;
        buttonBuyColor.visible = true;
        containerTextIcon.visible = true;

        TweenMax.to(buttonBuy, 1, {delay:1,alpha:1,ease:Expo.easeInOut})
        TweenMax.to(buttonBuyColor, 1, {delay:1,alpha:1,ease:Expo.easeInOut})
        TweenMax.to(containerTextIcon, 1, {delay:1,alpha:1,ease:Expo.easeInOut})

    } ;

    function addAnimation(){
        TweenMax.from(buttonBuy, 1, {delay:3,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(buttonTitle, 1, {delay:3.3,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(buttonIcon, 1, {delay:3.3,alpha:0,ease:Expo.easeInOut,onComplete:addHits})
    }

    function addHits(){

        buttonBuy.cursor = "pointer";
        buttonBuy.type = "open"
        buttonBuy.addEventListener("mouseover", handlerOver);
        buttonBuy.addEventListener("mouseout", handlerOut);
        buttonBuy.addEventListener("click", handlerClick);
        
    }

    function handlerOver(event){

        switch(event.target.type){
            case "open":
                TweenMax.to(buttonBuyColor, 0.5, {scaleX:1,ease:Expo.easeInOut})
            break;
            case "close":
                TweenMax.to(buttonFormColorClose, 0.7, {scaleX:1,ease:Expo.easeInOut})
            break;
            case "overlayBlock":
                console.log("overlayBlock")
            break;
            case "sendForm":
                TweenMax.to(buttonFormColor, 0.7, {scaleX:1,ease:Expo.easeInOut})
            break;
            case "next":
                if(navStep<totalNavStep-1)TweenMax.to(buttonIconStepForwardColor, 0.7, {alpha:1,ease:Expo.easeInOut})
            break;
            case "back":
                if(navStep>0)TweenMax.to(buttonIconStepBackColor, 0.7, {alpha:1,ease:Expo.easeInOut})
            break;
        }  
    }

    function handlerOut(event){
        switch(event.target.type){
            case "open":
                TweenMax.to(buttonBuyColor, 0.7, {scaleX:0,ease:Expo.easeInOut})
            break;
            case "close":
                TweenMax.to(buttonFormColorClose, 0.7, {scaleX:0,ease:Expo.easeInOut})
            break;
            case "overlayBlock":
                
            break;
            case "next":
               if(navStep<totalNavStep-1) TweenMax.to(buttonIconStepForwardColor, 0.7, {alpha:0,ease:Expo.easeInOut})
            break;
            case "back":
                if(navStep>0)TweenMax.to(buttonIconStepBackColor, 0.7, {alpha:0,ease:Expo.easeInOut})
            break;
            case "sendForm":
                TweenMax.to(buttonFormColor, 0.7, {scaleX:0,ease:Expo.easeInOut})
            break;
        } 
        
    }

    function sendForm(){

        if(inputText.getText()!=""){

            formData[navStep] = inputText.getText();

            sendMail(formData[1],formData[0],formData[2],formData[3])

            inputText._kill()
            containerInput.removeChild(inputText);

            inputText = new TextInput(ratio);
            inputText.name = "inputText";
            inputText.setRatio(ratio,stage.canvas.width - 480*ratio+50*ratio,328*ratio)
            inputText.update();
            containerInput.addChild(inputText);

            navStep = 0;
            totalNavStep = 4;
            formData = ["","","",""];

            navigationCursor = "0"+(navStep+1)+" / "+"0"+totalNavStep
            textNavigation.text = navigationCursor
            containerForm.getChildByName("titleFormTxt").text = data.form[lang][navStep];
            TweenMax.to(containerForm.getChildByName("lineForm"), 0.7, {scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(containerForm.getChildByName("lineForm"), 0.7, {delay:0.7,scaleX:1,ease:Expo.easeInOut})
            
            TweenMax.to(buttonForm, 1, {scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(titleButtonTxt, 0.7, {alpha:0,ease:Expo.easeInOut,onComplete:killFormButton})

            buttonIconStepForward.alpha = 1;

            var finalMessage = new createjs.Text();
            finalMessage.name = "finalMessage"
            finalMessage.font = "16px OpenSans-Regular";
            finalMessage.textBaseline = "alphabetic";
            finalMessage.color = "#000000";
            finalMessage.text = data.finalMessage[lang];
            finalMessage.scaleX = ratio;
            finalMessage.scaleY = ratio;
            finalMessage.x = 50*ratio
            finalMessage.y = Math.floor(containerForm.y+totalHeightForm+70*ratio+finalMessage.getBounds().height*ratio);
            containerSideBar.addChild(finalMessage);

            TweenMax.from(finalMessage, 0.7, {delay:1,alpha:0,ease:Expo.easeInOut,onComplete:exitMessage})
        }

    }

    function exitMessage(){
            TweenMax.to(containerSideBar.getChildByName("finalMessage"), 0.7, {delay:2,alpha:0,ease:Expo.easeInOut,onComplete:killMessage})
    }

    function killMessage(){
            containerSideBar.removeChild(containerSideBar.getChildByName("finalMessage"));
    }

    function handlerClick(event){

        switch(event.target.type){
            case "open":
                openSideBar();
            break;
            case "close":
                closeSideBar();
            break;
            case "overlayBlock":
                closeSideBar();
            break;
            case "sendForm":
                
                sendForm();

            break;
            case "next":

                checkForm();

            break;
            case "back":
                if(navStep>0){
                    goBackForm();
                }
            break;
        }

    }

    function checkForm(){

        if(inputText.getText()!=""){
                    
            if((inputText.getText().indexOf('.')!=-1)&&(inputText.getText().indexOf('@')!=-1)&&(navStep==1)){
                
                goForwardForm();

            }else if((navStep!=1)&&(navStep<totalNavStep-1)){
                
                goForwardForm();

            }

            if(navStep==totalNavStep-1){

                if(containerSideBar.getChildByName("buttonForm")==null){

                    buttonForm = new createjs.Shape();
                    buttonForm.name = "buttonForm"
                    buttonForm.graphics.beginFill("#151618").drawRect(0, 0, 380*ratio, 50*ratio);
                    buttonForm.x = 50*ratio
                    buttonForm.y = Math.floor(containerForm.y+totalHeightForm+70*ratio);
                    containerSideBar.addChild(buttonForm)

                    buttonFormColor = new createjs.Shape();
                    buttonFormColor.graphics.beginFill("#a49a88").drawRect(0, 0, 380*ratio, 50*ratio);
                    buttonFormColor.scaleX = 0;
                    buttonFormColor.x = 50*ratio
                    buttonFormColor.y = Math.floor(containerForm.y+totalHeightForm+70*ratio);
                    containerSideBar.addChild(buttonFormColor)

                    titleButtonTxt = new createjs.Text();
                    titleButtonTxt.font = "12px OpenSans-Semibold";
                    titleButtonTxt.textBaseline = "alphabetic";
                    titleButtonTxt.color = "#FFFFFF";
                    titleButtonTxt.text = data.buttonForm[lang];
                    titleButtonTxt.scaleX = ratio;
                    titleButtonTxt.scaleY = ratio;
                    titleButtonTxt.x = buttonForm.x+380/2*ratio-titleButtonTxt.getBounds().width/2*ratio
                    titleButtonTxt.y = buttonForm.y+titleButtonTxt.getBounds().height/2*ratio+50/2*ratio;
                    containerSideBar.addChild(titleButtonTxt);

                    TweenMax.from(buttonForm, 1, {delay:0.7,scaleX:0,ease:Expo.easeInOut})
                    TweenMax.from(titleButtonTxt, 1, {delay:1,alpha:0,ease:Expo.easeInOut})

                    buttonForm.cursor = "pointer";
                    buttonForm.type = "sendForm"
                    buttonForm.addEventListener("mouseover", handlerOver);
                    buttonForm.addEventListener("mouseout", handlerOut);
                    buttonForm.addEventListener("click", handlerClick);

                }
            }
        }
    }

    function killFormButton(){

        buttonForm.cursor = "pointer";
        buttonForm.removeEventListener("mouseover", handlerOver);
        buttonForm.removeEventListener("mouseout", handlerOut);
        buttonForm.removeEventListener("click", handlerClick);

        containerSideBar.removeChild(buttonForm)
        containerSideBar.removeChild(buttonFormColor)
        containerSideBar.removeChild(titleButtonTxt);

    }

    function goBackForm(){

        if(navStep==totalNavStep-1){

            TweenMax.to(buttonForm, 1, {scaleX:0,ease:Expo.easeInOut})
            TweenMax.to(titleButtonTxt, 0.7, {alpha:0,ease:Expo.easeInOut,onComplete:killFormButton})

        }
       
        inputText._kill()
        containerInput.removeChild(inputText);

        inputText = new TextInput(ratio);
        inputText.name = "inputText";
        inputText.setRatio(ratio,stage.canvas.width - 480*ratio+50*ratio,328*ratio)
        inputText.update();
        containerInput.addChild(inputText);

        navStep--
        formData[navStep] = "";
        buttonIconStepForward.alpha = 1

        if(navStep==0){
            TweenMax.killAll()
            buttonIconStepBackColor.alpha = 0;
            buttonIconStepBack.alpha = 0.5;
        }else{
            buttonIconStepForwardColor.alpha = 0;
        }

        navigationCursor = "0"+(navStep+1)+" / "+"0"+totalNavStep
        textNavigation.text = navigationCursor
        containerForm.getChildByName("titleFormTxt").text = data.form[lang][navStep];
        TweenMax.to(containerForm.getChildByName("lineForm"), 0.7, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(containerForm.getChildByName("lineForm"), 0.7, {delay:0.7,scaleX:1,ease:Expo.easeInOut})

    }

    function goForwardForm(){

        formData[navStep] = inputText.getText();
        inputText._kill()
        containerInput.removeChild(inputText);

        inputText = new TextInput(ratio);
        inputText.name = "inputText";
        inputText.setRatio(ratio,stage.canvas.width - 480*ratio+50*ratio,328*ratio)
        inputText.update();
        containerInput.addChild(inputText);

        navStep++
        
        if(navStep>0)buttonIconStepBack.alpha = 1;
        if(navStep==totalNavStep-1){
            buttonIconStepForward.alpha = 0.5;
            buttonIconStepForwardColor.alpha = 0;
        }

        navigationCursor = "0"+(navStep+1)+" / "+"0"+totalNavStep
        textNavigation.text = navigationCursor
        containerForm.getChildByName("titleFormTxt").text = data.form[lang][navStep];
        TweenMax.to(containerForm.getChildByName("lineForm"), 0.7, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.to(containerForm.getChildByName("lineForm"), 0.7, {delay:0.7,scaleX:1,ease:Expo.easeInOut})

    }

    p.openFromSideBar = function(){
        openSideBar();
    }


    function openSideBar(){


        if(overlayBlock==null){

            var customEvent = new createjs.Event("hideMenu");
            dispatchInstance.dispatchEvent(customEvent);

            overlayBlock = new createjs.Shape();
            overlayBlock.alpha = 0.35;
            overlayBlock.cursor = "auto"
            overlayBlock.type = "overlayBlock";
            overlayBlock.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
            overlayBlock.addEventListener("click", handlerClick);
            instance.addChild(overlayBlock)

            containerSideBar = new createjs.Container();
            instance.addChild(containerSideBar);

            var bgSideBar = new createjs.Shape();
            bgSideBar.name = "bgSideBar"
            bgSideBar.graphics.beginFill("#FFFFFF").drawRect(0, 0, 480*ratio, stage.canvas.height);
            containerSideBar.addChild(bgSideBar)

            bgSideBar.cursor = "auto"
            bgSideBar.addEventListener("mouseover", handlerOver);

            var titleOneTxt = new createjs.Text();
            titleOneTxt.name = "titleOneTxt";
            titleOneTxt.font = "60px PathwayGothicOne-Regular";
            titleOneTxt.textBaseline = "alphabetic";
            titleOneTxt.color = "#a49a88";
            titleOneTxt.text = data.title[lang];
            titleOneTxt.scaleX = ratio;
            titleOneTxt.scaleY = ratio;
            titleOneTxt.x = 50*ratio;
            titleOneTxt.y = titleOneTxt.getBounds().height*ratio+50*ratio
            containerSideBar.addChild(titleOneTxt);

            var shapeTitles = new createjs.Shape();
            shapeTitles.name = "shapeTitles";
            shapeTitles.graphics.beginFill("#a49a88").drawRect(0, 0, titleOneTxt.getBounds().width*ratio, 6*ratio);
            shapeTitles.x = 50*ratio;
            shapeTitles.y = titleOneTxt.y+10*ratio
            containerSideBar.addChild(shapeTitles)

            var descText = new createjs.Text();
            descText.name = "descText"
            descText.font = "16px OpenSans-Regular";
            descText.textBaseline = "alphabetic";
            descText.color = "#000000";
            descText.lineWidth = (386*ratio)/ratio;
            descText.lineHeight = 30;
            descText.text = data.desc[lang];
            descText.scaleX = ratio;
            descText.scaleY = ratio;
            descText.x = 50*ratio;
            descText.y = shapeTitles.y+18*ratio+40*ratio;
            containerSideBar.addChild(descText);

            buttonFormClose = new createjs.Shape();
            buttonFormClose.graphics.beginFill("#a49a88").drawRect(0, 0, 480*ratio, 50*ratio);
            buttonFormClose.y = stage.canvas.height-50*ratio
            containerSideBar.addChild(buttonFormClose)

            buttonFormColorClose = new createjs.Shape();
            buttonFormColorClose.graphics.beginFill("#151618").drawRect(0, 0, 480*ratio, 50*ratio);
            buttonFormColorClose.scaleX = 0;
            buttonFormColorClose.y = stage.canvas.height-50*ratio
            containerSideBar.addChild(buttonFormColorClose)

            buttonIconClose.x = 50*ratio;
            buttonIconClose.y = buttonFormClose.y+50/2*ratio-3*ratio
            containerSideBar.addChild(buttonIconClose);

            titleButtonCloseTxt = new createjs.Text();
            titleButtonCloseTxt.font = "12px OpenSans-Semibold";
            titleButtonCloseTxt.textBaseline = "alphabetic";
            titleButtonCloseTxt.color = "#FFFFFF";
            titleButtonCloseTxt.text = data.titleClose[lang];
            titleButtonCloseTxt.scaleX = ratio;
            titleButtonCloseTxt.scaleY = ratio;
            titleButtonCloseTxt.x = 50*ratio+14*ratio+20*ratio
            titleButtonCloseTxt.y = buttonFormColorClose.y+titleButtonCloseTxt.getBounds().height/2*ratio+50/2*ratio;
            containerSideBar.addChild(titleButtonCloseTxt);

            containerSideBar.x = stage.canvas.width-480*ratio
            
            addForm();
            addNavigationForm();
            addAnimationSideBar();

        }
        
    }

    function addForm(){

        navStep = 0;
        totalNavStep = 4;
        formData = ["","","",""];

        containerForm = new createjs.Container();
        containerForm.x = 50*ratio;
        containerForm.y = containerSideBar.getChildByName("descText").y+containerSideBar.getChildByName("descText").getBounds().height*ratio-32*ratio+60*ratio
        containerSideBar.addChild(containerForm);

        var titleFormTxt = new createjs.Text();
        titleFormTxt.alpha = 0.5
        titleFormTxt.name = "titleFormTxt";
        titleFormTxt.font = "10px OpenSans-Bold";
        titleFormTxt.textBaseline = "alphabetic";
        titleFormTxt.color = "#151618";
        titleFormTxt.text = data.form[lang][navStep];
        titleFormTxt.scaleX = ratio;
        titleFormTxt.scaleY = ratio;
        titleFormTxt.y = titleFormTxt.getBounds().height*ratio
        containerForm.addChild(titleFormTxt);

        var lineForm = new createjs.Shape();
        lineForm.alpha = 0.5
        lineForm.name = "lineForm";
        lineForm.graphics.beginFill("#151618").drawRect(0, 0, 380*ratio, 2*ratio);
        lineForm.y = Math.floor(titleFormTxt.y+30*ratio)
        containerForm.addChild(lineForm)

        totalHeightForm = lineForm.y + 2*ratio;

        containerInput = new createjs.Container();
        containerInput.x = stage.canvas.width - 480*ratio+50*ratio;
        containerInput.y = 326*ratio
        instance.addChild(containerInput);

        inputText = new TextInput(ratio);
        inputText.name = "inputText";
        inputText.setRatio(ratio,stage.canvas.width - 480*ratio+50*ratio,328*ratio)
        inputText.update();
        containerInput.addChild(inputText);

        addAnimationSideBarForm();

    }

    function addNavigationForm(){

        buttonIconStepBack.alpha = 0.5
        buttonIconStepBack.y = totalHeightForm+30*ratio
        containerForm.addChild(buttonIconStepBack)

        buttonIconStepBackColor.alpha = 0
        buttonIconStepBackColor.y = totalHeightForm+30*ratio
        containerForm.addChild(buttonIconStepBackColor)

        hitBackNavigation = new createjs.Shape();
        hitBackNavigation.alpha = 0.01;
        hitBackNavigation.graphics.beginFill("#FFFFFF").drawRect(0, 0, 14*ratio, 14*ratio);
        hitBackNavigation.y = totalHeightForm+30*ratio-5*ratio
        containerForm.addChild(hitBackNavigation)

        navigationCursor = "0"+(navStep+1)+" / "+"0"+totalNavStep

        textNavigation = new createjs.Text();
        textNavigation.font = "12px OpenSans-Semibold";
        textNavigation.textBaseline = "alphabetic";
        textNavigation.color = "#a49a88";
        textNavigation.text = navigationCursor
        textNavigation.scaleX = ratio;
        textNavigation.scaleY = ratio;
        textNavigation.x = 14*ratio+20*ratio;
        textNavigation.y = totalHeightForm+30*ratio+textNavigation.getBounds().height/2*ratio+2*ratio;
        containerForm.addChild(textNavigation)

        buttonIconStepForward.x = textNavigation.x+textNavigation.getBounds().width*ratio+20*ratio
        buttonIconStepForward.y = totalHeightForm+30*ratio
        containerForm.addChild(buttonIconStepForward)

        buttonIconStepForwardColor.alpha = 0
        buttonIconStepForwardColor.x = textNavigation.x+textNavigation.getBounds().width*ratio+20*ratio
        buttonIconStepForwardColor.y = totalHeightForm+30*ratio
        containerForm.addChild(buttonIconStepForwardColor)

        hitFrontkNavigation = new createjs.Shape();
        hitFrontkNavigation.alpha = 0.01;
        hitFrontkNavigation.graphics.beginFill("#FFFFFF").drawRect(0, 0, 14*ratio, 14*ratio);
        hitFrontkNavigation.x = textNavigation.x+textNavigation.getBounds().width*ratio+20*ratio
        hitFrontkNavigation.y = totalHeightForm+30*ratio-5*ratio
        containerForm.addChild(hitFrontkNavigation)

    }

    function addAnimationSideBarForm(){

        TweenMax.from(containerForm, 0.7, {delay:1,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerInput, 0.7, {delay:1,alpha:0,ease:Expo.easeInOut,onComplete:addHitsNavigation})

    }

    function addAnimationSideBar(){

        TweenMax.from(overlayBlock, 1, {alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerSideBar, 0.7, {x:stage.canvas.width,ease:Expo.easeInOut})

        TweenMax.from(containerSideBar.getChildByName("titleOneTxt"), 0.7, {delay:0.5,y:containerSideBar.getChildByName("titleOneTxt").y+50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerSideBar.getChildByName("shapeTitles"), 0.7, {delay:0.8,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(containerSideBar.getChildByName("descText"), 0.7, {delay:0.8,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(buttonFormClose, 0.7, {delay:1.6,scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(titleButtonCloseTxt, 0.7, {delay:1.8,alpha:0,ease:Expo.easeInOut,onComplete:addHitsClose})
        
    }

    function addHitsNavigation(){
        
        hitBackNavigation.cursor = "pointer";
        hitBackNavigation.type = "back"
        hitBackNavigation.addEventListener("mouseover", handlerOver);
        hitBackNavigation.addEventListener("mouseout", handlerOut);
        hitBackNavigation.addEventListener("click", handlerClick);

        hitFrontkNavigation.cursor = "pointer";
        hitFrontkNavigation.type = "next"
        hitFrontkNavigation.addEventListener("mouseover", handlerOver);
        hitFrontkNavigation.addEventListener("mouseout", handlerOut);
        hitFrontkNavigation.addEventListener("click", handlerClick);

        window.addEventListener("keydown", moveKey);

    }


    function moveKey(e){
        
       if (e.keyCode == 13) { // next

           checkForm();

        }
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

    function sendMail(from, name, phone, details) {
    

     var rq = getAjax();

     if (rq) {
         // Success; attempt to use an Ajax request to a PHP script to send the e-mail
         try {

             rq.open('GET', 'http://localhost:8888/barrawavev2/data/mail.php?myEmail=' + encodeURIComponent(from) + '&myName=' + encodeURIComponent(name) + '&myPhone=' + encodeURIComponent(phone) + '&myDetails=' + encodeURIComponent(details), true);
             
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

    function addHitsClose(){

        buttonFormClose.cursor = "pointer";
        buttonFormClose.type = "close"
        buttonFormClose.addEventListener("mouseover", handlerOver);
        buttonFormClose.addEventListener("mouseout", handlerOut);
        buttonFormClose.addEventListener("click", handlerClick);

    }

    function removeHitsForm(){

        if(buttonForm){
            buttonForm.cursor = "auto";
        buttonForm.removeEventListener("mouseover", handlerOver);
        buttonForm.removeEventListener("mouseout", handlerOut);
        buttonForm.removeEventListener("click", handlerClick);    
        }
        

        buttonFormClose.cursor = "auto";
        buttonFormClose.removeEventListener("mouseover", handlerOver);
        buttonFormClose.removeEventListener("mouseout", handlerOut);
        buttonFormClose.removeEventListener("click", handlerClick);

        hitBackNavigation.cursor = "auto";
        hitBackNavigation.removeEventListener("mouseover", handlerOver);
        hitBackNavigation.removeEventListener("mouseout", handlerOut);
        hitBackNavigation.removeEventListener("click", handlerClick);

        hitFrontkNavigation.cursor = "auto";
        hitFrontkNavigation.removeEventListener("mouseover", handlerOver);
        hitFrontkNavigation.removeEventListener("mouseout", handlerOut);
        hitFrontkNavigation.removeEventListener("click", handlerClick);

         window.removeEventListener("keydown", moveKey);
    }

    function closeSideBar(){
        
        var customEvent = new createjs.Event("showMenu");
        dispatchInstance.dispatchEvent(customEvent);

        containerSideBar.getChildByName("bgSideBar").removeEventListener("mouseover", handlerOver);
        overlayBlock.removeEventListener("click", handlerClick);

        removeAnimationSideBar();
    }

    function removeAnimationSideBar(){

        TweenMax.to(overlayBlock, 1.5, {alpha:0,ease:Expo.easeInOut,onComplete:kill})
        TweenMax.to(containerSideBar, 0.5, {x:stage.canvas.width,ease:Expo.easeInOut})
        
        containerInput.getChildByName("inputText")._kill();
        instance.removeChild(containerInput);
        containerInput = null;

    }

    function kill(){

        removeHitsForm();

        containerSideBar.removeChild(containerForm);
        containerForm = null;

        containerSideBar.removeChild(containerInput);
        containerInput = null;

        instance.removeChild(containerSideBar);
        containerSideBar = null;

        instance.removeChild(overlayBlock);
        overlayBlock = null;

    }

    p.resize = function() {
        
        if(buttonBuy){
            buttonBuy.x = stage.canvas.width-232*ratio
            buttonBuy.y = stage.canvas.height-50*ratio
        }

        if(buttonBuyColor){
            buttonBuyColor.x = buttonBuy.x
            buttonBuyColor.y = buttonBuy.y
        }

        if(containerTextIcon){
            containerTextIcon.x = buttonBuy.x+232/2*ratio-(buttonTitle.getBounds().width*ratio+20*ratio+14*ratio)/2
            containerTextIcon.y = buttonBuy.y+50/2*ratio-buttonTitle.getBounds().height/2*ratio-2*ratio
        }

        if(containerSideBar){
            containerSideBar.getChildByName("bgSideBar").graphics.clear();
            containerSideBar.getChildByName("bgSideBar").graphics.beginFill("#FFFFFF").drawRect(0, 0, 480*ratio, stage.canvas.height);
            containerSideBar.x = stage.canvas.width-480*ratio
        }

        if(overlayBlock){
            overlayBlock.graphics.clear();
            overlayBlock.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        }

        if(buttonFormClose){
            buttonFormClose.y = stage.canvas.height-50*ratio
            buttonFormColorClose.y = stage.canvas.height-50*ratio
            buttonIconClose.y = buttonFormClose.y+50/2*ratio-3*ratio
            titleButtonCloseTxt.y = buttonFormColorClose.y+titleButtonCloseTxt.getBounds().height/2*ratio+50/2*ratio;
        }

        if(containerInput){
            containerInput.x = stage.canvas.width - 480*ratio+50*ratio;
            containerInput.y = 326*ratio
            containerInput.getChildByName("inputText").updateResize(stage.canvas.width - 480*ratio+50*ratio,326*ratio)
        }

    } ;  

window.SideBar = createjs.promote(SideBar, "Container");
}());