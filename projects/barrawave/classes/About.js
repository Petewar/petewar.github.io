(function () {

    function About(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio
        this.lang = Ilang
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var aspectRatio;
    var data;
    var lang;
    var preloadData;
    var loader;
    var imagesLoaded;
    var instanceRefresh;
    var shapeBlue;
    var containerScroll;
    var containerTitle;
    var containerTable;
    var containerTableCompany;
    var containerTextIcon;
    var scrollBar;
    var totalHeight;
    var shapeBg;

    var buttonGmaps
    var buttonGmapsColor
    var buttonTitle;
    var buttonIcon;
    var gmapLink
    var mouseIcon;
    var containerMouse

    var p = createjs.extend(About, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceRefresh = instance;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio
        lang = this.lang;

    };

    p.addElements = function(Idata,Icon,Imouse) {

        buttonIcon = Icon;
        mouseIcon = Imouse;
        preloadDataJson(Idata)

    }

    function preloadDataJson(Ijson){

        //Load Json File
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        console.log("Loader Data: About")

        //remove preloadData
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        data = event.result.content[0];
        gmapLink = data.gmapLink

        loadImages([data.featureImage]);
        
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles);
        loader.register(instance);
        instance.addEventListener("loaderComplete", loadImagesComplete);
    }
    
    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;

        imagesLoaded = evt.contentLoader;
        instance = instanceRefresh;

        imagesLoaded[0].regX = 1920/2;
        imagesLoaded[0].regY = 1080/2;
        aspectRatio.resize(imagesLoaded[0],imagesLoaded[0].getBounds().width,imagesLoaded[0].getBounds().height);
        imagesLoaded[0].x = stage.canvas.width/2
        imagesLoaded[0].y = stage.canvas.height/2
        instance.addChild(imagesLoaded[0]);

        containerMouse = new createjs.Container();
        containerMouse.x = stage.canvas.width/2-21/2*ratio;
        containerMouse.y = stage.canvas.height-100*ratio

        shapeCircle = new createjs.Shape();
        shapeCircle.name = "shapeCircle";
        shapeCircle.graphics.beginFill("#4c7fa6").drawRect(0, 0, 3*ratio, 3*ratio);
        shapeCircle.x= 9*ratio
        shapeCircle.y= 6*ratio
        
        var titleMouse = new createjs.Text();
        titleMouse.name = "titleMouse"
        titleMouse.font = "12px OpenSans-Semibold";
        titleMouse.textBaseline = "alphabetic";
        titleMouse.color = "#ffffff";
        titleMouse.text = data.mouseTitle[lang];
        titleMouse.scaleX = ratio;
        titleMouse.scaleY = ratio;
        titleMouse.x = 21/2*ratio-titleMouse.getBounds().width/2*ratio;
        titleMouse.y = titleMouse.getBounds().height*ratio+9*ratio+31*ratio;
        
        containerMouse.addChild(mouseIcon);
        containerMouse.addChild(shapeCircle)
        containerMouse.addChild(titleMouse)

        instance.addChild(containerMouse);

        containerTitle = new createjs.Container();
        instance.addChild(containerTitle)

        containerScroll = new createjs.Container();
        containerScroll.y = 1080*ratio;
        instance.addChild(containerScroll)

        containerTable = new createjs.Container();
        containerTableCompany = new createjs.Container();
        containerTextIcon = new createjs.Container

        shapeBg = new createjs.Shape();
        shapeBg.name = "shapeBg";
        shapeBg.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 2680*ratio);
        shapeBg.y= 120*ratio
        containerScroll.addChild(shapeBg)

        shapeBlue = new createjs.Shape();
        shapeBlue.name = "shapeBlue"
        shapeBlue.graphics.beginFill("#4b7ea3").drawRect(0, 0, stage.canvas.width/2+414*ratio, 658*ratio);
        shapeBlue.x = 102*ratio;
        containerScroll.addChild(shapeBlue)

        buttonGmaps = new createjs.Shape();
        buttonGmaps.graphics.beginFill("#a49a88").drawRect(0, 0, 262*ratio, 50*ratio);
        buttonGmaps.x = shapeBlue.x+stage.canvas.width/2+414*ratio-262*ratio-100*ratio
        buttonGmaps.y = shapeBlue.y+658*ratio-25*ratio
        containerScroll.addChild(buttonGmaps);

        buttonGmapsColor = new createjs.Shape();
        buttonGmapsColor.graphics.beginFill("#000000").drawRect(0, 0, 262*ratio, 50*ratio);
        buttonGmapsColor.scaleX=0;
        buttonGmapsColor.x = buttonGmaps.x
        buttonGmapsColor.y = buttonGmaps.y
        containerScroll.addChild(buttonGmapsColor);        

        buttonTitle = new createjs.Text();
        buttonTitle.font = "12px OpenSans-Semibold";
        buttonTitle.textBaseline = "alphabetic";
        buttonTitle.color = "#FFFFFF";
        buttonTitle.text = data.buttonTitle[lang];
        buttonTitle.scaleX = ratio;
        buttonTitle.scaleY = ratio;
        buttonTitle.y = buttonTitle.getBounds().height*ratio
        containerTextIcon.addChild(buttonTitle);

        buttonIcon.x = buttonTitle.getBounds().width*ratio+20*ratio
        buttonIcon.y = 5*ratio
        containerTextIcon.addChild(buttonIcon);

        containerTextIcon.x = buttonGmaps.x+262/2*ratio-(buttonTitle.getBounds().width*ratio+20*ratio+14*ratio)/2
        containerTextIcon.y = buttonGmaps.y+50/2*ratio-buttonTitle.getBounds().height/2*ratio-2*ratio

        containerScroll.addChild(containerTextIcon)

        var titleOneTxt = new createjs.Text();
        titleOneTxt.name = "titleOneTxt"
        titleOneTxt.font = "72px PathwayGothicOne-Regular";
        titleOneTxt.textBaseline = "alphabetic";
        titleOneTxt.color = "#4b7ea3";
        titleOneTxt.text = data.title[lang];
        titleOneTxt.scaleX = ratio;
        titleOneTxt.scaleY = ratio;
        containerTitle.addChild(titleOneTxt)

        var shapeTitles = new createjs.Shape();
        shapeTitles.name = "shapeTitles"
        shapeTitles.graphics.beginFill("#4b7ea3").drawRect(0, 0, titleOneTxt.getBounds().width*ratio, 6*ratio);
        shapeTitles.y = 10*ratio
        containerTitle.addChild(shapeTitles)

        var locationTitleTxt = new createjs.Text();
        locationTitleTxt.font = "36px OpenSans-ExtraBold";
        locationTitleTxt.textBaseline = "alphabetic";
        locationTitleTxt.color = "#ffffff";
        locationTitleTxt.text = data.local[lang];
        locationTitleTxt.x = 152*ratio
        locationTitleTxt.y = 100*ratio;
        locationTitleTxt.scaleX = ratio;
        locationTitleTxt.scaleY = ratio;
        containerScroll.addChild(locationTitleTxt);

        var locationTxt = new createjs.Text();
        locationTxt.font = "18px OpenSans-Semibold";
        locationTxt.textBaseline = "alphabetic";
        locationTxt.color = "#ffffff";
        locationTxt.text = data.localName[lang];
        locationTxt.x = 152*ratio
        locationTxt.y = locationTitleTxt.y+locationTxt.getBounds().height*ratio+20*ratio;
        locationTxt.scaleX = ratio;
        locationTxt.scaleY = ratio;
        containerScroll.addChild(locationTxt);

        var columnOneTxt = new createjs.Text();
        columnOneTxt.name = "columnOneTxt"
        columnOneTxt.font = "18px OpenSans-Semibold";
        columnOneTxt.textBaseline = "alphabetic";
        columnOneTxt.color = "#ffffff";
        columnOneTxt.text = data.columnOne[lang];
        columnOneTxt.lineWidth = ((stage.canvas.width/2+414*ratio)/4+20*ratio)/ratio;
        columnOneTxt.lineHeight = 36;
        columnOneTxt.x = 152*ratio
        columnOneTxt.y = locationTxt.y+locationTxt.getBounds().height*ratio+40*ratio;
        columnOneTxt.scaleX = ratio;
        columnOneTxt.scaleY = ratio;
        containerScroll.addChild(columnOneTxt);

        var columnTwoTxt = new createjs.Text();
        columnTwoTxt.name = "columnTwoTxt"
        columnTwoTxt.font = "18px OpenSans-Regular";
        columnTwoTxt.textBaseline = "alphabetic";
        columnTwoTxt.color = "#ffffff";
        columnTwoTxt.text = data.columnTwo[lang];
        columnTwoTxt.lineWidth = ((stage.canvas.width/2+414*ratio)/2-20*ratio)/ratio;
        columnTwoTxt.lineHeight = 30;
        columnTwoTxt.x = columnOneTxt.x+columnOneTxt.getBounds().width*ratio+60*ratio
        columnTwoTxt.y = locationTxt.y+locationTxt.getBounds().height*ratio+40*ratio;
        columnTwoTxt.scaleX = ratio;
        columnTwoTxt.scaleY = ratio;
        containerScroll.addChild(columnTwoTxt);

        var companyTitleTxt = new createjs.Text();
        companyTitleTxt.name = "companyTitleTxt"
        companyTitleTxt.font = "36px OpenSans-ExtraBold";
        companyTitleTxt.textBaseline = "alphabetic";
        companyTitleTxt.color = "#305d7e";
        companyTitleTxt.text = data.company[lang];
        companyTitleTxt.x = stage.canvas.width/2-companyTitleTxt.getBounds().width/2*ratio;
        companyTitleTxt.y = shapeBlue.y+658*ratio+companyTitleTxt.getBounds().height*ratio+180*ratio;
        companyTitleTxt.scaleX = ratio;
        companyTitleTxt.scaleY = ratio;
        containerScroll.addChild(companyTitleTxt);

        var companyTextTxt = new createjs.Text();
        companyTextTxt.name = "companyTextTxt"
        companyTextTxt.font = "18px OpenSans-Bold";
        companyTextTxt.textBaseline = "alphabetic";
        companyTextTxt.color = "#305d7e";
        companyTextTxt.lineWidth = (520*ratio)/ratio;
        companyTextTxt.lineHeight = 36;
        companyTextTxt.text = data.companyText[lang];
        companyTextTxt.x = stage.canvas.width/2-520/2*ratio
        companyTextTxt.y = companyTitleTxt.y+60*ratio
        companyTextTxt.scaleX = ratio;
        companyTextTxt.scaleY = ratio;
        containerScroll.addChild(companyTextTxt);

        var tableTitleText = new createjs.Text();
        tableTitleText.name = "tableTitleText"
        tableTitleText.font = "18px OpenSans-Regular";
        tableTitleText.textBaseline = "alphabetic";
        tableTitleText.color = "#305d7e";
        tableTitleText.lineWidth = (727*ratio)/ratio;
        tableTitleText.lineHeight = 30;
        tableTitleText.text = data.tableTitle[lang];
        tableTitleText.x = stage.canvas.width/2-727/2*ratio
        tableTitleText.y = companyTextTxt.y+companyTextTxt.getBounds().height*ratio+100*ratio
        tableTitleText.scaleX = ratio;
        tableTitleText.scaleY = ratio;
        containerScroll.addChild(tableTitleText);

        var tableY = tableTitleText.y+tableTitleText.getBounds().height*ratio+50*ratio;

        containerTable.x = stage.canvas.width/2-727/2*ratio
        containerTable.y = tableY;

        var tableNUmber;
        var tableHeight;

        for(var i=0;i<data.tableContent[lang].length;i++){

            tableNumber = i+1;
            
            var numbers = new createjs.Text();
            numbers.font = "36px PathwayGothicOne-Regular";
            numbers.textBaseline = "alphabetic";
            numbers.color = "#4b7ea3";
            numbers.text = "0"+tableNumber
            
            if(ratio>1) numbers.y = numbers.getBounds().height*ratio+180*i
            else numbers.y = numbers.getBounds().height*ratio+90*i
            
            numbers.scaleX = ratio;
            numbers.scaleY = ratio;
            containerTable.addChild(numbers)

            var strokeNumbers = new createjs.Shape();
            strokeNumbers.graphics.beginFill("#cdcdcd").drawRect(0, 0, 727*ratio, 1*ratio);
            strokeNumbers.y = numbers.y+30*ratio
            if(i!=data.tableContent[lang].length-1)containerTable.addChild(strokeNumbers)

            var tableText = new createjs.Text();
            tableText.font = "16px OpenSans-Semibold";
            tableText.textBaseline = "alphabetic";
            tableText.textAlign = "right"
            tableText.color = "#305d7e";
            tableText.lineWidth = (727*ratio)/ratio;
            tableText.text = data.tableContent[lang][i];
            tableText.x = 727*ratio
            tableText.y = numbers.y-5*ratio;
            tableText.scaleX = ratio;
            tableText.scaleY = ratio;
            containerTable.addChild(tableText);

            tableHeight = strokeNumbers.y
        }

        containerScroll.addChild(containerTable);

        var companySubText = new createjs.Text();
        companySubText.name = "companySubText"
        companySubText.font = "18px OpenSans-ExtraBold";
        companySubText.textBaseline = "alphabetic";
        companySubText.color = "#305d7e";
        companySubText.textAlign = "center"
        companySubText.text = data.companySub[lang];
        companySubText.scaleX = ratio;
        companySubText.scaleY = ratio;
        companySubText.x = stage.canvas.width/2
        companySubText.y = containerTable.y+tableHeight+companySubText.getBounds().height*ratio+70*ratio;
        containerScroll.addChild(companySubText);

        containerTableCompany.x = stage.canvas.width/2-727/2*ratio
        containerTableCompany.y = companySubText.y+companySubText.getBounds().height*ratio+10*ratio;

        var tableCompanyHeight;

        for(var k=0;k<data.companySubDesc[lang].length;k++){

            var companySubDescText = new createjs.Text();
            companySubDescText.name = "companySubDescText"
            companySubDescText.font = "16px OpenSans-Regular";
            companySubDescText.textBaseline = "alphabetic";
            companySubDescText.lineWidth = (727*ratio)/ratio;
            companySubDescText.color = "#305d7e";
            companySubDescText.textAlign = "left"
            companySubDescText.text = data.companySubDesc[lang][k];
            companySubDescText.scaleX = ratio;
            companySubDescText.scaleY = ratio;
            if(ratio>1)companySubDescText.y = companySubText.getBounds().height*ratio+60*k
            else companySubDescText.y = companySubText.getBounds().height*ratio+30*k
            containerTableCompany.addChild(companySubDescText);
            tableCompanyHeight = companySubDescText.y+companySubDescText.getBounds().height*ratio;
        }

        containerScroll.addChild(containerTableCompany);

        var shapeInformative = new createjs.Shape();
        shapeInformative.name = "shapeInformative"
        shapeInformative.graphics.beginFill("#305d7e").drawRect(0, 0, 162*ratio, 28*ratio);
        shapeInformative.x = stage.canvas.width/2-162/2*ratio
        shapeInformative.y = containerTableCompany.y+tableCompanyHeight+140*ratio;
        containerScroll.addChild(shapeInformative)        

        var shapeInformativeTitleText = new createjs.Text();
        shapeInformativeTitleText.name = "shapeInformativeTitleText"
        shapeInformativeTitleText.font = "14px PathwayGothicOne-Regular";
        shapeInformativeTitleText.textBaseline = "alphabetic";
        shapeInformativeTitleText.color = "#FFFFFF";
        shapeInformativeTitleText.text = data.noteTitle[lang];
        shapeInformativeTitleText.x = stage.canvas.width/2-shapeInformativeTitleText.getBounds().width/2*ratio
        shapeInformativeTitleText.y = shapeInformative.y+28/2*ratio+shapeInformativeTitleText.getBounds().height/2*ratio
        shapeInformativeTitleText.scaleX = ratio;
        shapeInformativeTitleText.scaleY = ratio;
        containerScroll.addChild(shapeInformativeTitleText);

        var shapeInformativeText = new createjs.Text();
        shapeInformativeText.name = "shapeInformativeText"
        shapeInformativeText.font = "16px OpenSans-Regular";
        shapeInformativeText.textBaseline = "alphabetic";
        shapeInformativeText.color = "#000000";
        shapeInformativeText.alpha = 0.5;
        shapeInformativeText.lineWidth = (stage.canvas.width-320*ratio)/ratio;
        shapeInformativeText.lineHeight = 30;
        shapeInformativeText.text = data.noteText[lang];
        shapeInformativeText.scaleX = ratio;
        shapeInformativeText.scaleY = ratio;
        shapeInformativeText.x = stage.canvas.width/2-shapeInformativeText.getBounds().width/2*ratio
        shapeInformativeText.y = shapeInformative.y+28*ratio+40*ratio;
        containerScroll.addChild(shapeInformativeText);

        containerTitle.x = stage.canvas.width/2-titleOneTxt.getBounds().width/2*ratio;
        containerTitle.y = 150*ratio

        totalHeight = containerScroll.y+2680*ratio;

        addAnimation();

    }

    function addAnimation(){

        TweenMax.from(containerTitle.getChildByName("titleOneTxt"), 0.7, {delay:1.8,y:containerTitle.getChildByName("titleOneTxt").y+50*ratio,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerTitle.getChildByName("shapeTitles"), 0.7, {delay:2,scaleX:0,ease:Expo.easeInOut})

        TweenMax.from(imagesLoaded[0], 0.7, {delay:1.8,alpha:0,ease:Expo.easeInOut})
        TweenMax.from(containerMouse, 0.7, {delay:1.8,y:containerMouse.y-50*ratio,alpha:0,ease:Expo.easeInOut})

        TweenMax.from(containerTitle, 1, {delay:1.8,y:containerTitle.y-50*ratio,ease:Expo.easeInOut,onComplete:addHits})
    }

    function addHits(){
        
        scrollBar = new ScrollBar(ratio,containerScroll.y,instance,containerScroll,totalHeight,0.15);
        scrollBar.x = stage.canvas.width-10*ratio
        instance.addChild(scrollBar);
        
        buttonGmaps.cursor = "pointer"
        buttonGmaps.addEventListener("mouseover", handlerOver);
        buttonGmaps.addEventListener("mouseout", handlerOut)
        buttonGmaps.addEventListener("click", handlerClick);

    }

    function removeScrollHits(){
        
        scrollBar.kill()
        instance.removeChild(scrollBar)
        scrollBar=null

        buttonGmaps.removeEventListener("mouseover", handlerOver);
        buttonGmaps.removeEventListener("mouseout", handlerOut)
        buttonGmaps.removeEventListener("click", handlerClick);

    }

    function handlerOver(event){
        TweenMax.to(buttonGmapsColor, 0.7, {scaleX:1,ease:Expo.easeInOut})
    }

    function handlerOut(event){
        TweenMax.to(buttonGmapsColor, 0.7, {scaleX:0,ease:Expo.easeInOut})
    }

    function handlerClick(event){
        window.open(gmapLink,"_blank");
    }

     p.removeAnimation = function() {

        removeScrollHits();

        TweenMax.to(containerScroll, 1, {y:1080*ratio,ease:Expo.easeInOut})

        TweenMax.to(imagesLoaded[0], 1, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(containerMouse, 0.7, {y:containerMouse.y-50*ratio,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(containerTitle.getChildByName("titleOneTxt"), 0.7, {delay:1,y:containerTitle.getChildByName("titleOneTxt").y-50*ratio,alpha:0,ease:Expo.easeInOut,onComplete:killAbout})
        TweenMax.to(containerTitle.getChildByName("shapeTitles"), 0.5, {delay:0.5,scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(containerTitle, 1, {delay:0.7,y:containerTitle.y+100*ratio,ease:Expo.easeInOut})
     }
    

     function killAbout(){

        instance.removeChild(containerMouse);
        containerMouse=null

        instance.removeChild(containerScroll)
        containerScroll=null

        instance.removeChild(imagesLoaded[0]);

        instance.removeChild(containerTitle)
        containerTitle=null

        instance.removeChild(containerTable)
        containerTable=null

        instance.removeChild(containerTableCompany)
        containerTableCompany=null

        instance.removeChild(containerTextIcon)
        containerTextIcon=null
        
     }

    p.resize = function() {

         if(scrollBar){
            scrollBar.x = stage.canvas.width-10*ratio
            scrollBar.updateResize(totalHeight,1080*ratio,1080*ratio);
        }

        if(imagesLoaded[0]){
            imagesLoaded[0].regX = 1920/2;
            imagesLoaded[0].regY = 1080/2;
            aspectRatio.resize(imagesLoaded[0],imagesLoaded[0].getBounds().width,imagesLoaded[0].getBounds().height);
            imagesLoaded[0].x = stage.canvas.width/2
            imagesLoaded[0].y = stage.canvas.height/2
        }

        if(containerTitle){
            containerTitle.x = stage.canvas.width/2-containerTitle.getChildByName("titleOneTxt").getBounds().width/2*ratio;
            containerTitle.y = 150*ratio
        }

        if(containerMouse){
            containerMouse.x = stage.canvas.width/2-21/2*ratio;
            containerMouse.y = stage.canvas.height-100*ratio
        }
        if(containerScroll.getChildByName("shapeBg")){

            containerScroll.getChildByName("shapeBg").graphics.clear();
            containerScroll.getChildByName("shapeBg").graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, 2680*ratio);

            containerScroll.getChildByName("shapeBlue").graphics.clear();
            containerScroll.getChildByName("shapeBlue").graphics.beginFill("#4b7ea3").drawRect(0, 0, stage.canvas.width/2+414*ratio, 658*ratio);
            
            containerScroll.getChildByName("columnOneTxt").lineWidth = ((stage.canvas.width/2+414*ratio)/4+20*ratio)/ratio;
            containerScroll.getChildByName("columnTwoTxt").lineWidth = ((stage.canvas.width/2+414*ratio)/2-20*ratio)/ratio;

            containerScroll.getChildByName("companyTitleTxt").x = stage.canvas.width/2-containerScroll.getChildByName("companyTitleTxt").getBounds().width/2*ratio;

            containerScroll.getChildByName("companyTextTxt").x = stage.canvas.width/2-520/2*ratio

            containerScroll.getChildByName("tableTitleText").x = stage.canvas.width/2-727/2*ratio

            containerTable.x = stage.canvas.width/2-727/2*ratio

            containerScroll.getChildByName("companySubText").x = stage.canvas.width/2

            containerTableCompany.x = stage.canvas.width/2-727/2*ratio

            containerScroll.getChildByName("shapeInformative").x = stage.canvas.width/2-162/2*ratio

            containerScroll.getChildByName("shapeInformativeText").lineWidth = (stage.canvas.width-320*ratio)/ratio
            containerScroll.getChildByName("shapeInformativeText").x = stage.canvas.width/2-containerScroll.getChildByName("shapeInformativeText").getBounds().width/2*ratio

            containerScroll.getChildByName("shapeInformativeTitleText").x = stage.canvas.width/2-containerScroll.getChildByName("shapeInformativeTitleText").getBounds().width/2*ratio
            
            buttonGmaps.x = shapeBlue.x+stage.canvas.width/2+414*ratio-262*ratio-100*ratio
            buttonGmaps.y = shapeBlue.y+658*ratio-25*ratio

            buttonGmapsColor.x = buttonGmaps.x
            buttonGmapsColor.y = buttonGmaps.y

            containerTextIcon.x = buttonGmaps.x+262/2*ratio-(buttonTitle.getBounds().width*ratio+20*ratio+14*ratio)/2
            containerTextIcon.y = buttonGmaps.y+50/2*ratio-buttonTitle.getBounds().height/2*ratio-2*ratio
        }

    } ; 

window.About = createjs.promote(About, "Container");
}());