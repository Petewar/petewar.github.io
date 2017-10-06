(function () {

    function Contatos(IdispatchInstance,Iratio,Isvg,IaspectRatio) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance
        this.ratio = Iratio;
        this.svg = Isvg;
        this.aspectRatio = IaspectRatio;
        this.setup();

    }
    
    var instance;
    var dispatchInstance;
    var instanceRefresh
    var ratio;
    var svg;
    var aspectRatio

    var preloadData;
    var data;
    var timer
    var bgImage;

    var p = createjs.extend(Contatos, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh = instance
        dispatchInstance = this.dispatchInstance
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        svg = this.svg;

    }

    p.init = function() {
        if(data==null){
            preloadDataJson("data/contact.json")
        }else{
            addElements();
            addAnimation();

            timer = setTimeout(show, 10);
        }
    }

    function show(){
        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);
    }

    function preloadDataJson(Ijson){

        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        data = event.result.contato[0]
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;
        
        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);

        loadImages([data.bgImage])
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles,ratio);
        loader.register(instance)
        instance.addEventListener("loaderComplete", loadImagesComplete);

    }

    function loadImagesComplete(evt) {

        console.log("Loader Images Homepage: "+evt.contentLoader.length);
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;

        bgImage = evt.contentLoader[0]
        
        instance = instanceRefresh;

        addElements();
        addAnimation();

        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);

    }

    function addElements(){

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);

        var closeIcon = svg.createSvg(data.shapeClose,"#333333");
        closeIcon.name="closeIcon";
        closeIcon.x = 40*ratio
        closeIcon.y = 66*ratio
        instance.addChild(closeIcon);

        var closeIconHit = new createjs.Shape();
        closeIconHit.name = "closeIconHit";
        closeIconHit.alpha = 0.01
        closeIconHit.graphics.beginFill("#FFFFFF").drawRect(0, 0, 22*ratio, 22*ratio);
        closeIconHit.x = 40*ratio
        closeIconHit.y = 66*ratio
        instance.addChild(closeIconHit);

        var contactTitleText = new createjs.Text();
        contactTitleText.name = "contactTitleText";
        contactTitleText.font = "36px BwModelica-ExtraBold";
        contactTitleText.textBaseline = "alphabetic";
        contactTitleText.color = "#333333"
        if(ratio==1)contactTitleText.lineWidth = 280*ratio
        if(ratio==2)contactTitleText.lineWidth = 140*ratio
        contactTitleText.lineHeight = 40;
        contactTitleText.text = data.contatoTitle;
        contactTitleText.scaleX = ratio;
        contactTitleText.scaleY = ratio;
        contactTitleText.x = stage.canvas.width/2-stage.canvas.width/4-contactTitleText.getBounds().width/2*ratio
        contactTitleText.y = stage.canvas.height/4+contactTitleText.getBounds().height/2*ratio
        instance.addChild(contactTitleText);

        var contactDescText = new createjs.Text();
        contactDescText.name = "contactDescText";
        contactDescText.font = "14px BwModelica-Regular";
        contactDescText.textBaseline = "alphabetic";
        contactDescText.color = "#333333"
        if(ratio==1)contactDescText.lineWidth = 280*ratio
        if(ratio==2)contactDescText.lineWidth = 140*ratio
        contactDescText.lineHeight = 30;
        contactDescText.text = data.contatoDesc;
        contactDescText.scaleX = ratio;
        contactDescText.scaleY = ratio;
        contactDescText.x = contactTitleText.x;
        contactDescText.y = contactTitleText.y+contactTitleText.getBounds().height*ratio-30*ratio+40*ratio;
        instance.addChild(contactDescText);
        
        var bgMask = new createjs.Shape();
        bgMask.name = "bgMask";
        bgMask.x = stage.canvas.width/2
        bgMask.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width/2, stage.canvas.height);
        instance.addChild(bgMask);

        bgImage.name = "bgImage"
        bgImage.x = stage.canvas.width/4
        aspectRatio.resize(bgImage,bgImage.getBounds().width,bgImage.getBounds().height,"halfFullWidth")
        instance.addChild(bgImage);

        bgImage.mask = bgMask

    }

    function addAnimation(){

       TweenMax.from(instance.getChildByName("bg"), 0.75, {scaleX:0,ease:Expo.easeInOut})
       TweenMax.from(instance.getChildByName("closeIcon"), 1, {alpha:0,rotation:180,ease:Expo.easeInOut,onComplete:addHits()});

       TweenMax.from(instance.getChildByName("contactTitleText"), 1, {y:instance.getChildByName("contactTitleText").y+100*ratio,alpha:0,ease:Expo.easeInOut});
       TweenMax.from(instance.getChildByName("contactDescText"), 1, {y:instance.getChildByName("contactDescText").y+300*ratio,alpha:0,ease:Expo.easeInOut});
       TweenMax.from(instance.getChildByName("bgMask"), 1, {delay:0.5,scaleX:0,ease:Expo.easeInOut});

    }

    function addHits(){

        instance.getChildByName("bg").cursor = "auto";
        instance.getChildByName("bg").type = "block";
        instance.getChildByName("bg").addEventListener("mouseover", handlerOver);

        instance.getChildByName("closeIconHit").cursor = "pointer";
        instance.getChildByName("closeIconHit").type = "close";
        instance.getChildByName("closeIconHit").addEventListener("mouseover", handlerOver);
        instance.getChildByName("closeIconHit").addEventListener("mouseout", handlerOut)
        instance.getChildByName("closeIconHit").addEventListener("click", handlerClick);

    }

    function handlerOver(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
                
            break;

        }
    }

    function handlerOut(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
                
            break;
        }
    }

    function handlerClick(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
                 SWFAddress.setValue("/home");
            break;
        }
    }

    p.kill = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").removeEventListener("mouseover", handlerOver);
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("closeIconHit").graphics.clear();
        instance.getChildByName("closeIconHit").removeEventListener("mouseover", handlerOver);
        instance.getChildByName("closeIconHit").removeEventListener("mouseout", handlerOut)
        instance.getChildByName("closeIconHit").removeEventListener("click", handlerClick);
        instance.removeChild(instance.getChildByName("closeIconHit"));

        instance.removeChild(instance.getChildByName("closeIcon"));

        instance.removeChild(instance.getChildByName("contactTitleText"));
        instance.removeChild(instance.getChildByName("contactDescText"));
        instance.removeChild(instance.getChildByName("bgMask"));
        instance.removeChild(instance.getChildByName("contactDescText"));

        instance.removeChild(instance.getChildByName("bgImage"));

    } ; 

    p.resize = function() {

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        instance.getChildByName("closeIcon").x = 40*ratio
        instance.getChildByName("closeIcon").y = 66*ratio

        instance.getChildByName("closeIconHit").x = 40*ratio
        instance.getChildByName("closeIconHit").y = 66*ratio

        instance.getChildByName("contactTitleText").x = stage.canvas.width/2-stage.canvas.width/4-instance.getChildByName("contactTitleText").getBounds().width/2*ratio
        instance.getChildByName("contactTitleText").y = stage.canvas.height/4+instance.getChildByName("contactTitleText").getBounds().height/2*ratio

        instance.getChildByName("contactDescText").x = instance.getChildByName("contactTitleText").x;
        instance.getChildByName("contactDescText").y = instance.getChildByName("contactTitleText").y+instance.getChildByName("contactTitleText").getBounds().height*ratio-30*ratio+40*ratio;

        instance.getChildByName("bgMask").graphics.clear();
        instance.getChildByName("bgMask").graphics.beginFill("#333333").drawRect(0, 0, Math.floor(stage.canvas.width/2), stage.canvas.height);
        instance.getChildByName("bgMask").x = stage.canvas.width/2

        instance.getChildByName("closeIconHit").x = 40*ratio
        instance.getChildByName("closeIconHit").y = 66*ratio

        instance.getChildByName("bgImage").x = stage.canvas.width/4
        aspectRatio.resize(instance.getChildByName("bgImage"),instance.getChildByName("bgImage").getBounds().width,instance.getChildByName("bgImage").getBounds().height,"halfFullWidth")

    } ; 


window.Contatos = createjs.promote(Contatos, "Container");
}());