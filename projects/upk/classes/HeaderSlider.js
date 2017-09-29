(function () {

    function HeaderSlider(Iratio,IbgImage,Iheader,Ititle,IaspectRatio,IheaderShow) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.bgImage = IbgImage
        this.header = Iheader;
        this.headerShow = IheaderShow;
        this.title = Ititle;
        this.aspectRatio = IaspectRatio;
        this.setup();
    }
    
    var instance;
    var ratio;
    var bgImage;
    var header;
    var headerShow;
    var title;
    var aspectRatio;

    var p = createjs.extend(HeaderSlider, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        bgImage = this.bgImage;
        header = this.header;
        headerShow = this.headerShow;
        title = this.title;
        aspectRatio = this.aspectRatio

        addElements();
        addAnimation();

    };

    function addElements(){

        bgImage.regX = bgImage.getBounds().width/2
        bgImage.x = stage.canvas.width/2
        instance.addChild(bgImage);
        aspectRatio.resize(bgImage,bgImage.getBounds().width,bgImage.getBounds().height,"areaServices")

        if(headerShow){
            var bg = new createjs.Shape();
            bg.name = "bg";
            bg.graphics.beginFill("#F1F3F0").drawRect(0, 0, Math.floor(stage.canvas.width/2-100*ratio), 500*ratio);
            bg.x = 100*ratio;
            bg.y = 172*ratio
            instance.addChild(bg);

            var headerSlider = new createjs.Text();
            headerSlider.name = "headerSlider";
            headerSlider.font = "16px BwModelica-Regular";
            headerSlider.textBaseline = "alphabetic";
            headerSlider.color = "#333333";
            headerSlider.lineWidth = stage.canvas.width/2
            headerSlider.lineHeight = 30;
            headerSlider.text = header
            headerSlider.scaleX = ratio;
            headerSlider.scaleY = ratio;
            headerSlider.x = 100*ratio+80*ratio
            headerSlider.y = 172*ratio+headerSlider.getBounds().height*ratio+60*ratio;
            instance.addChild(headerSlider);

            var titleSlider = new createjs.Text();
            titleSlider.name = "titleSlider";
            titleSlider.font = "58px BwModelica-ExtraBold";
            titleSlider.textBaseline = "alphabetic";
            titleSlider.color = "#333333";
            if(ratio==1)titleSlider.lineWidth = stage.canvas.width/2
            if(ratio==2)titleSlider.lineWidth = stage.canvas.width/2-300*ratio
            titleSlider.lineHeight = 70;
            titleSlider.text = title
            titleSlider.scaleX = ratio;
            titleSlider.scaleY = ratio;
            titleSlider.x = 100*ratio+75*ratio
            titleSlider.y = headerSlider.y+headerSlider.getBounds().height*2*ratio+50*ratio;
            instance.addChild(titleSlider);

            var strokeButton = new createjs.Shape();
            strokeButton.name = "strokeButton"
            strokeButton.graphics.beginFill("#8EC640").drawRect(0, 0, 70*ratio, 4*ratio);
            strokeButton.x = 100*ratio+75*ratio
            strokeButton.y = titleSlider.y+titleSlider.getBounds().height*ratio
            instance.addChild(strokeButton);
        }

    }

    function addAnimation(){

        TweenMax.from(bgImage, 1, {delay:0.5,alpha:0,ease:Expo.easeInOut})

        if(headerShow){

            TweenMax.from(instance.getChildByName("bg"), 0.5, {delay:0.5,scaleX:0,ease:Expo.easeInOut})
            
            TweenMax.from(instance.getChildByName("headerSlider"), 0.75, {delay:1,alpha:0,y:instance.getChildByName("headerSlider").y+100*ratio,ease:Expo.easeInOut})
            TweenMax.from(instance.getChildByName("titleSlider"), 0.75, {delay:1.25,alpha:0,y:instance.getChildByName("titleSlider").y+100*ratio,ease:Expo.easeInOut})

            TweenMax.from(instance.getChildByName("strokeButton"), 0.75, {delay:1.25,scaleX:0,y:instance.getChildByName("titleSlider").y+100*ratio,ease:Expo.easeInOut})
        }
    }


    p.kill = function() {

        instance.removeChild(bgImage);

        if(headerShow){
            instance.removeChild(instance.getChildByName("headerSlider"));
            instance.removeChild(instance.getChildByName("titleSlider"));
            instance.removeChild(instance.getChildByName("strokeButton"));
        } 

    } ; 

    p.getHeight = function() {
        return 512*ratio
    }

    p.resize = function() {

        bgImage.regX = bgImage.getBounds().width/2
        bgImage.x = stage.canvas.width/2
        aspectRatio.resize(bgImage,bgImage.getBounds().width,bgImage.getBounds().height,"areaServices")

        if(headerShow){

            instance.getChildByName("bg").graphics.clear();
            instance.getChildByName("bg").graphics.beginFill("#F1F3F0").drawRect(0, 0, Math.floor(stage.canvas.width/2-100*ratio), 500*ratio);
            instance.getChildByName("bg").x = 100*ratio;
            instance.getChildByName("bg").y = 172*ratio

            if(ratio==1)instance.getChildByName("titleSlider").lineWidth = stage.canvas.width/2
            if(ratio==2)instance.getChildByName("titleSlider").lineWidth = stage.canvas.width/2-300*ratio

            instance.getChildByName("strokeButton").x = 100*ratio+75*ratio
            instance.getChildByName("strokeButton").y = instance.getChildByName("titleSlider").y+instance.getChildByName("titleSlider").getBounds().height*ratio

        }

    } ; 


window.HeaderSlider = createjs.promote(HeaderSlider, "Container");
}());