(function () {

    function Contact(Iratio,Iassets,IaspectRatio) {

        this.ratio = Iratio;
        this.assets = Iassets;
        this.iaspectRatio = IaspectRatio;
        this.Container_constructor();
        this.setup();

    }
    
    var instance;
    var ratio;
    var bg;
    var bgHeight;
    var bgContact;
    var assets;
    var aspectRatio;
    var margin = 100;

    var titleField;
    var subtitleField;
    var buttonShapeSoftBlue;

    var button;
    var buttonField;
    var buttonShape;
    
    var phoneTitle;
    var phoneText;

    var emailTitle;
    var emailText;

    var containerContent
    var totalSize;

    var p = createjs.extend(Contact, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        assets = this.assets
        aspectRatio = this.iaspectRatio;

        bg = new createjs.Shape();
        instance.addChild(bg);

        bgContact = new createjs.Shape();
        instance.addChild(bgContact);

        containerContent = new createjs.Container();
        instance.addChild(containerContent)

        titleField = new createjs.Text();
        titleField.font = "bold 32px PT Serif";
        titleField.color = "#ffffff";
        titleField.scaleX = ratio
        titleField.scaleY = ratio
        titleField.text = "Contact Us";
        titleField.x = stage.canvas.width/2-titleField.getBounds().width/2*ratio
        titleField.y = -10*ratio+margin*ratio;
        instance.addChild(titleField);

        subtitleField = new createjs.Text();
        subtitleField.font = "bold 12px PT Sans";
        subtitleField.alpha = 0.5
        subtitleField.color = "#ffffff";
        subtitleField.scaleX = ratio
        subtitleField.scaleY = ratio
        subtitleField.textAlign = "center"
        subtitleField.text = "LET'S WORK TOGETHER";
        subtitleField.x = stage.canvas.width/2
        subtitleField.y = titleField.y +titleField.getBounds().height*ratio+12*ratio
        instance.addChild(subtitleField);

        aspectRatio.resizeSquareHd(assets[0],960,480);
        instance.addChild(assets[0]);
        assets[0].y = subtitleField.y+subtitleField.getBounds().height+margin*ratio;

        https://www.google.pt/maps/dir//Alf%C3%A2ndega/@40.6376275,-8.7061204,12486m/data=!3m2!1e3!4b1!4m8!4m7!1m0!1m5!1m1!1s0xd2397fcaca37719:0x3ce8b178106b53c6!2m2!1d-8.6710152!2d40.6376328

        bgHeight = assets[0].y+stage.canvas.width/4
        bg.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width,bgHeight);
        
        bgContact.graphics.beginFill("#F4F6F9").drawRect(0, 0, stage.canvas.width,stage.canvas.width/4);
        bgContact.x = 0;
        bgContact.y = assets[0].y;

        phoneTitle= new createjs.Text();
        phoneTitle.font = "bold 18px PT Serif";
        phoneTitle.color = "#143483";
        phoneTitle.scaleX = ratio
        phoneTitle.scaleY = ratio
        phoneTitle.text = "Phone";
        containerContent.addChild(phoneTitle);

        phoneText = new createjs.Text();
        phoneText.font = "14px PT Sans";
        phoneText.color = "#143483";
        phoneText.scaleX = ratio
        phoneText.scaleY = ratio
        phoneText.text = "+351 234422829 / +351 939864348 / + 351 961950505";
        phoneText.y = phoneTitle.y+phoneTitle.getBounds().height+12*ratio
        containerContent.addChild(phoneText);

        emailTitle= new createjs.Text();
        emailTitle.font = "bold 18px PT Serif";
        emailTitle.color = "#143483";
        emailTitle.scaleX = ratio
        emailTitle.scaleY = ratio
        emailTitle.text = "Email";
        emailTitle.y = phoneText.y + phoneText.getBounds().height+margin/4*ratio
        containerContent.addChild(emailTitle);

        emailText = new createjs.Text();
        emailText.font = "14px PT Sans";
        emailText.color = "#143483";
        emailText.scaleX = ratio
        emailText.scaleY = ratio
        emailText.text = "info@peninsularps.pt";
        emailText.y = emailTitle.y+emailTitle.getBounds().height+12*ratio
        containerContent.addChild(emailText);

        button = new createjs.Container();
        button.y = emailText.y+emailText.getBounds().height+margin/4*ratio;
        containerContent.addChild(button)

        buttonShape = new createjs.Shape();
        buttonShape.graphics.beginFill("#143483").drawRect(0, 0, 160*ratio,50*ratio);
        button.addChild(buttonShape);

        buttonShapeSoftBlue = new createjs.Shape();
        buttonShapeSoftBlue.visible = false
        buttonShapeSoftBlue.graphics.beginFill("#97A6CA").drawRect(0, 0, 160*ratio,50*ratio);
        button.addChild(buttonShapeSoftBlue);

        buttonField = new createjs.Text();
        buttonField.font = "bold 12px PT Sans";
        buttonField.scaleX = ratio
        buttonField.scaleY = ratio
        buttonField.textAlign = "center"
        buttonField.color = "#FFFFFF";
        buttonField.text = "GET IN TOUCH";
        button.addChild(buttonField);

        buttonField.x = 80*ratio
        buttonField.y = 25*ratio-buttonField.getBounds().height/2*ratio;

        totalSize = button.y+50*ratio

        containerContent.x = stage.canvas.width/2+margin*ratio
        containerContent.y = assets[0].y+stage.canvas.width/8-totalSize/2

        
        assets[0].cursor = "pointer"
        assets[0].addEventListener("mouseover", handlerOverMap);
        assets[0].addEventListener("mouseout", handlerOutMap);
        assets[0].addEventListener("click", handlerClickMap);

        buttonShape.cursor = "pointer"
        buttonShape.addEventListener("mouseover", handlerOverNavigation);
        buttonShape.addEventListener("mouseout", handlerOutNavigation);
        buttonShape.addEventListener("click", handlerClickNavigation);

    };

    function handlerOverNavigation(event){
         buttonShapeSoftBlue.visible = true
        buttonShapeSoftBlue.scaleX = 0;
        createjs.Tween.get(buttonShapeSoftBlue).to({scaleX:1}, 400, createjs.Ease.circInOut)
    }

    function handlerOutNavigation(event){
        createjs.Tween.get(buttonShapeSoftBlue).to({scaleX:0}, 400, createjs.Ease.circInOut)
        .call(function(){
             buttonShapeSoftBlue.visible = false
         });
    }

    function handlerClickNavigation(event){
        window.open("mailto:mguerra@peninsularps.pt?Subject=Website Contact Information","_self");
    }

    function handlerClickMap(event){
       window.open("https://www.google.pt/maps/dir//Alf%C3%A2ndega/@40.6376275,-8.7061204,12486m/data=!3m2!1e3!4b1!4m8!4m7!1m0!1m5!1m1!1s0xd2397fcaca37719:0x3ce8b178106b53c6!2m2!1d-8.6710152!2d40.6376328","_blank");
    }

    function handlerOutNavigation(event){
        createjs.Tween.get(buttonShapeSoftBlue).to({scaleX:0}, 400, createjs.Ease.circInOut)
        .call(function(){
             buttonShapeSoftBlue.visible = false
         });
    }

    function handlerClickNavigation(event){
        window.open("mailto:mguerra@peninsularps.pt?Subject=Website Contact Information","_self");
    }

    function handlerOutMap(event){
       createjs.Tween.get( assets[0]).to({alpha:1}, 400, createjs.Ease.circInOut)
    }

    function handlerOverMap(event){
        createjs.Tween.get( assets[0]).to({alpha:0.8}, 400, createjs.Ease.circInOut)
    }

    p.resize = function (){

        titleField.x = stage.canvas.width/2-titleField.getBounds().width/2*ratio
        titleField.y = -10*ratio+margin*ratio;

        subtitleField.x = stage.canvas.width/2
        subtitleField.y = titleField.y +titleField.getBounds().height*ratio+12*ratio

        aspectRatio.resizeSquareHd(assets[0],960,480);

        bgHeight = assets[0].y+stage.canvas.width/4
        bg.graphics.clear();
        bg.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width,bgHeight);

        bgContact.graphics.clear();
        bgContact.graphics.beginFill("#F4F6F9").drawRect(0, 0, stage.canvas.width,stage.canvas.width/4);
        bgContact.x = 0;
        bgContact.y = assets[0].y;

        containerContent.x = stage.canvas.width/2+margin*ratio
        containerContent.y = assets[0].y+stage.canvas.width/8-totalSize/2

    }

    p.getHeight = function (){
       return bgHeight;
    } 

window.Contact = createjs.promote(Contact, "Container");
}());