(function () {

    function Menu(IdispatchInstance,Iratio,Isvg,IaspectRatio) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance
        this.ratio = Iratio;
        this.svg = Isvg;
        this.aspectRatio = IaspectRatio;
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var instanceRefresh;
    var ratio;
    var aspectRatio;
    var svg;

    var preloadData;
    var loader;

    var data;
    var bImage;
    var heightFactor
    var heightFactorTwo
    var maxWidth = 500;
    var currentWidth;
    var parallax;

    var p = createjs.extend(Menu, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        instanceRefresh = instance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        svg = this.svg;

    }

     p.init = function() {

        if(data==null){
            preloadDataJson("data/menu.json")
        }else{
            
            addElements();
            addAnimation();
            addParallax();

            var customEvent = new createjs.Event("show");
            dispatchInstance.dispatchEvent(customEvent);
        }
     }

    function preloadDataJson(Ijson){

        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile(Ijson, true);

    }

    function preloadDataComplete(event) {
        
        data = event.result.menu[0]
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        var imagesToLoad = [data.bg].concat(data.menuImg)
        loadImages(imagesToLoad)
    }

    function loadImages(iFiles){
        
        //New Loader
        loader = new Loader(iFiles);
        loader.register(instance)
        instance.addEventListener("loaderComplete", loadImagesComplete);

    }

    function loadImagesComplete(evt) {

        console.log("Loader Images: "+evt.contentLoader.length);
        
        //remove Loader
        instance.removeEventListener("loaderComplete", loadImagesComplete);
        loader.kill();
        loader = null;

        bImage = evt.contentLoader[0];
        imageMenu = evt.contentLoader.slice(1,data.menu.length+1)

        instance = instanceRefresh;

        addElements();
        addAnimation();
        addParallax();

        var customEvent = new createjs.Event("show");
        dispatchInstance.dispatchEvent(customEvent);

    }

    function addElements(){

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        instance.addChild(bg);

        bImage.regX = 1690/2;
        bImage.regY = 1050/2;
        bImage.x = stage.canvas.width/2
        bImage.y = stage.canvas.height/2
        aspectRatio.resize(bImage,1680,1050,"more",100*ratio);
        instance.addChild(bImage);

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

        var containerMenu = new createjs.Container();
        containerMenu.name="containerMenu"
        instance.addChild(containerMenu)

        currentWidth = stage.canvas.width-75*ratio-600*ratio-50*ratio;
        if(currentWidth>maxWidth)currentWidth = maxWidth

        for(var i=0;i<imageMenu.length;i++){

            var menu = new createjs.Shape();
            menu.name = "menu"+i;

            var bg = new createjs.Shape();
            bg.compositeOperation = "multiply";
            bg.name = "bg"+i;

            var titleMenu = new createjs.Text();
            titleMenu.name = "titleMenu"+i;
            titleMenu.font = "36px BwModelica-ExtraBold";
            titleMenu.textBaseline = "alphabetic";
            titleMenu.text = data.menu[i]
            titleMenu.scaleX = ratio;
            titleMenu.scaleY = ratio;

            var headerMenu = new createjs.Text();
            headerMenu.name = "headerMenu"+i;
            headerMenu.font = "11px BwModelica-Regular";
            headerMenu.textBaseline = "alphabetic";
            headerMenu.text = data.menuHeader[i]
            headerMenu.scaleX = ratio;
            headerMenu.scaleY = ratio;

            var maskArrow = new createjs.Shape();
            maskArrow.name = "maskArrow"+i
            maskArrow.alpha = 0.01;

            if(i==0){

                menu.graphics.beginFill("#ffffff").drawRect(0, 0,  currentWidth, 177*ratio);
                menu.y = 160*ratio

                imageMenu[i].name = "imageMenu"+i
                imageMenu[i].regX = imageMenu[i].getBounds().width/2
                imageMenu[i].regY = imageMenu[i].getBounds().height/2
                imageMenu[i].x = currentWidth/2
                imageMenu[i].y = menu.y+(177*ratio)/2
                imageMenu[i].alpha = 0.1
                aspectRatio.resize(imageMenu[i],imageMenu[i].getBounds().width,imageMenu[i].getBounds().height,"areaMenu",currentWidth,177*ratio)

                bg.graphics.beginFill("#ffffff").drawRect(0, 0,  currentWidth, 177*ratio);
                bg.y = 160*ratio

                titleMenu.color = "#8EC640";
                titleMenu.x = 40*ratio
                titleMenu.y = bg.y+177*ratio-40*ratio

                headerMenu.color = "#8EC640";
                headerMenu.x = 80*ratio
                headerMenu.y = titleMenu.y-titleMenu.getBounds().height*ratio-5*ratio;

                maskArrow.graphics.beginFill("#FFFFFF").drawRect(0, 0, 120*ratio, 28*ratio);
                maskArrow.x = 40*ratio
                maskArrow.y = headerMenu.y-35/2*ratio

                var arrow = svg.createSvg(data.shapeArrow,"#333333");
                arrow.name="arrow"+i;
                arrow.x = Math.floor(40*ratio-20*ratio);
                arrow.y = Math.floor(headerMenu.y-9*ratio)

            }

            if(i==1){

                heightFactor = stage.canvas.height-(160*ratio+177*ratio+50*ratio)

                menu.graphics.beginFill("#333333").drawRect(0, 0, currentWidth, heightFactor-50*ratio);
                menu.y = 160*ratio+177*ratio+50*ratio

                imageMenu[i].name = "imageMenu"+i
                imageMenu[i].regX = imageMenu[i].getBounds().width/2
                imageMenu[i].regY = imageMenu[i].getBounds().height/2
                imageMenu[i].x = currentWidth/2
                imageMenu[i].y = menu.y+(heightFactor-50*ratio)/2
                aspectRatio.resize(imageMenu[i],imageMenu[i].getBounds().width,imageMenu[i].getBounds().height,"areaMenu",currentWidth,heightFactor-50*ratio)

                bg.graphics.beginFill("#333333").drawRect(0, 0, currentWidth, heightFactor-50*ratio);
                bg.y = 160*ratio+177*ratio+50*ratio

                titleMenu.color = "#ffffff";
                titleMenu.x = 40*ratio
                titleMenu.y = bg.y+heightFactor-100*ratio

                headerMenu.color = "#FFFFFF";
                headerMenu.x = 80*ratio
                headerMenu.y = titleMenu.y-titleMenu.getBounds().height*ratio-5*ratio;

                maskArrow.graphics.beginFill("#333333").drawRect(0, 0, 120*ratio, 28*ratio);
                maskArrow.x = 40*ratio
                maskArrow.y = headerMenu.y-35/2*ratio

                var arrow = svg.createSvg(data.shapeArrow,"#8EC640");
                arrow.name="arrow"+i;
                arrow.x = Math.floor(40*ratio-20*ratio);
                arrow.y = Math.floor(headerMenu.y-9*ratio)

            }

            if(i==2){

                heightFactorTwo = stage.canvas.height-100*ratio-177*ratio

                menu.graphics.beginFill("#333333").drawRect(0, 0, currentWidth, heightFactorTwo-50*ratio);
                menu.x = currentWidth+50*ratio
                menu.y = 50*ratio

                imageMenu[i].name = "imageMenu"+i
                imageMenu[i].regX = imageMenu[i].getBounds().width/2
                imageMenu[i].regY= imageMenu[i].getBounds().height/2
                imageMenu[i].x = menu.x+currentWidth/2
                imageMenu[i].y = menu.y+(heightFactorTwo-50*ratio)/2
                aspectRatio.resize(imageMenu[i],imageMenu[i].getBounds().width,imageMenu[i].getBounds().height,"areaMenu",currentWidth,heightFactorTwo-50*ratio)

                bg.graphics.beginFill("#333333").drawRect(0, 0, currentWidth, heightFactorTwo-50*ratio);
                bg.x = currentWidth+50*ratio
                bg.y = 50*ratio

                titleMenu.color = "#FFFFFF";
                titleMenu.x = currentWidth+50*ratio+40*ratio
                titleMenu.y = bg.y+heightFactorTwo-100*ratio

                headerMenu.color = "#FFFFFF";
                headerMenu.x = currentWidth+50*ratio+80*ratio
                headerMenu.y = titleMenu.y-titleMenu.getBounds().height*ratio-5*ratio;

                maskArrow.graphics.beginFill("#333333").drawRect(0, 0, 120*ratio, 28*ratio);
                maskArrow.x = currentWidth+50*ratio+40*ratio
                maskArrow.y = headerMenu.y-35/2*ratio

                var arrow = svg.createSvg(data.shapeArrow,"#8EC640");
                arrow.name="arrow"+i;
                arrow.x = Math.floor(currentWidth+50*ratio+40*ratio-20*ratio);
                arrow.y = Math.floor(headerMenu.y-9*ratio)
            }

            if(i==3){
               
                menu.graphics.beginFill("#ffffff").drawRect(0, 0,  currentWidth, 177*ratio);
                menu.x = currentWidth+50*ratio
                menu.y = stage.canvas.height-177*ratio-50*ratio

                imageMenu[i].name = "imageMenu"+i
                imageMenu[i].alpha = 0.1
                imageMenu[i].regX = imageMenu[i].getBounds().width/2
                imageMenu[i].regY= imageMenu[i].getBounds().height/2
                imageMenu[i].x = menu.x+currentWidth/2
                imageMenu[i].y = menu.y+(177*ratio)/2
                aspectRatio.resize(imageMenu[i],imageMenu[i].getBounds().width,imageMenu[i].getBounds().height,"areaMenu",currentWidth,177*ratio)

                bg.graphics.beginFill("#ffffff").drawRect(0, 0,  currentWidth, 177*ratio);
                bg.x = currentWidth+50*ratio
                bg.y = stage.canvas.height-177*ratio-50*ratio
                
                titleMenu.color = "#8EC640";
                titleMenu.x = currentWidth+50*ratio+40*ratio
                titleMenu.y = stage.canvas.height-100*ratio

                headerMenu.color = "#8EC640";
                headerMenu.x = currentWidth+50*ratio+80*ratio
                headerMenu.y = titleMenu.y-titleMenu.getBounds().height*ratio-5*ratio;

                maskArrow.graphics.beginFill("#ffffff").drawRect(0, 0, 120*ratio, 28*ratio);
                maskArrow.x = currentWidth+50*ratio+40*ratio
                maskArrow.y = headerMenu.y-35/2*ratio

                var arrow = svg.createSvg(data.shapeArrow,"#333333");
                arrow.name="arrow"+i;
                
                arrow.x = Math.floor(currentWidth+50*ratio+40*ratio-20*ratio);
                arrow.y = Math.floor(headerMenu.y-9*ratio)
            }
        
            arrow.mask = maskArrow;

            containerMenu.addChild(menu);
            containerMenu.addChild(imageMenu[i]);
            containerMenu.addChild(bg);
            containerMenu.addChild(titleMenu);
            containerMenu.addChild(headerMenu);
            containerMenu.addChild(arrow);
            containerMenu.addChild(maskArrow);

            imageMenu[i].mask = menu;

        }

        containerMenu.x = Math.floor(stage.canvas.width/2-currentWidth-25*ratio)

        var containerLogo = new createjs.Container();
        containerLogo.name = "containerLogo";
        containerLogo.x = stage.canvas.width/2-currentWidth-25*ratio
        containerLogo.y = 32*ratio;
        instance.addChild(containerLogo);

        var logoLeft = svg.createSvg(data.shapeLogoLeft,"#808285");
        var logoRight = svg.createSvg(data.shapeLogoRight,"#8ec640");

        logoRight.x = 45*ratio
        logoRight.y = 2*ratio
        containerLogo.addChild(logoLeft);
        containerLogo.addChild(logoRight);

    }

    function addParallax(){
        stage.setBounds(0,0,stage.canvas.width,stage.canvas.height);
        parallax = new zim.Parallax(stage, .1, [{obj:bImage, prop:"x", propChange:-15},{obj:imageMenu[0], prop:"x", propChange:20},{obj:imageMenu[1], prop:"x",propChange:25},{obj:imageMenu[2], prop:"x", propChange:30},{obj:imageMenu[3], prop:"x", propChange:35}]);
    }

    function addAnimation(){

        timer = setTimeout(addHits, 2000);

        TweenMax.from(instance.getChildByName("bg"), 0.75, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(instance.getChildByName("closeIcon"), 1, {alpha:0,rotation:180,ease:Expo.easeInOut});
        TweenMax.from(bImage, 1, {alpha:0,ease:Expo.easeInOut});
        TweenMax.from(instance.getChildByName("containerLogo"), 1, {delay:0.75,y:-200*ratio,ease:Expo.easeOut});
        
        for(var i=0;i<imageMenu.length;i++){

            TweenMax.from(instance.getChildByName("containerMenu").getChildByName("menu"+i), 0.5*(i+0.75), {delay:0.75,scaleX:0,ease:Expo.easeInOut})
            TweenMax.from(instance.getChildByName("containerMenu").getChildByName("bg"+i), 0.5*(i+0.75), {delay:0.75,scaleX:0,ease:Expo.easeInOut})

            TweenMax.from(instance.getChildByName("containerMenu").getChildByName("titleMenu"+i), 0.5*(i+1), {delay:0.75,x:instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).x+100*ratio,alpha:0,ease:Expo.easeInOut})
            TweenMax.from(instance.getChildByName("containerMenu").getChildByName("maskArrow"+i), 0.5*(i+1), {delay:0.75,x:instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).x-150*ratio,ease:Expo.easeInOut})

            TweenMax.from(instance.getChildByName("containerMenu").getChildByName("headerMenu"+i), 0.5*(i+1), {delay:0.75,x:instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).x+100*ratio,alpha:0,ease:Expo.easeInOut})

        }

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

        for(var i=0;i<imageMenu.length;i++){

            instance.getChildByName("containerMenu").getChildByName("bg"+i).cursor = "pointer";
            instance.getChildByName("containerMenu").getChildByName("bg"+i).type = "menu";
            instance.getChildByName("containerMenu").getChildByName("bg"+i).instance = i;
            instance.getChildByName("containerMenu").getChildByName("bg"+i).defaultScaleX = instance.getChildByName("containerMenu").getChildByName("bg"+i).scaleX
            instance.getChildByName("containerMenu").getChildByName("bg"+i).defaultScaleY = instance.getChildByName("containerMenu").getChildByName("bg"+i).scaleY
            instance.getChildByName("containerMenu").getChildByName("bg"+i).addEventListener("mouseover", handlerOver);
            instance.getChildByName("containerMenu").getChildByName("bg"+i).addEventListener("mouseout", handlerOut)
            instance.getChildByName("containerMenu").getChildByName("bg"+i).addEventListener("click", handlerClick);

        }

    }

    function handlerOver(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
                
            break;

            case "menu":
                
            break;

        }
    }

    function handlerOut(event){

        switch(event.target.type){
            case "block":
                
            break;

            case "close":
                
            break;

            case "menu":
                
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

        if(parallax!=undefined){
            parallax.dispose();
            parallax = undefined
        }

        instance.removeChild(bImage);

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").removeEventListener("mouseover", handlerOver);
        instance.removeChild(instance.getChildByName("bg"));

        instance.getChildByName("closeIconHit").graphics.clear();
        instance.getChildByName("closeIconHit").removeEventListener("mouseover", handlerOver);
        instance.getChildByName("closeIconHit").removeEventListener("mouseout", handlerOut)
        instance.getChildByName("closeIconHit").removeEventListener("click", handlerClick);
        instance.removeChild(instance.getChildByName("closeIconHit"));

        instance.removeChild(instance.getChildByName("closeIcon"));

        for(var i=0;i<imageMenu.length;i++){

            instance.getChildByName("containerMenu").getChildByName("menu"+i).graphics.clear();
            instance.getChildByName("containerMenu").getChildByName("bg"+i).graphics.clear();

            instance.getChildByName("containerMenu").removeChild(instance.getChildByName("containerMenu").getChildByName("menu"+i))
            instance.getChildByName("containerMenu").removeChild(instance.getChildByName("containerMenu").getChildByName("bg"+i))

            instance.getChildByName("containerMenu").removeChild(instance.getChildByName("containerMenu").getChildByName("titleMenu"+i))
            instance.getChildByName("containerMenu").removeChild(instance.getChildByName("containerMenu").getChildByName("headerMenu"+i))

            instance.getChildByName("containerMenu").removeChild(instance.getChildByName("containerMenu").getChildByName("maskArrow"+i))
            instance.getChildByName("containerMenu").removeChild(instance.getChildByName("containerMenu").getChildByName("arrow"+i))

            instance.getChildByName("containerMenu").removeChild(instance.getChildByName("containerMenu").getChildByName("imageMenu"+i))

        }

        instance.removeChild(instance.getChildByName("containerMenu"))
        instance.removeChild(instance.getChildByName("containerLogo"))

    } ; 

    p.resize = function() {

        if(parallax!=undefined){
            parallax.dispose();
            parallax = undefined
            timer = setTimeout(addParallax, 500);
        }

        instance.getChildByName("bg").graphics.clear();
        instance.getChildByName("bg").graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        instance.getChildByName("closeIcon").x = 40*ratio
        instance.getChildByName("closeIcon").y = 66*ratio

        instance.getChildByName("closeIconHit").x = 40*ratio
        instance.getChildByName("closeIconHit").y = 66*ratio
        
        bImage.x.regX = 1690/2;
        bImage.y.regY = 1050/2;
        bImage.x = stage.canvas.width/2
        bImage.y = stage.canvas.height/2
        aspectRatio.resize(bImage,1680,1050,"more",100*ratio);

        currentWidth = stage.canvas.width-75*ratio-600*ratio-50*ratio;
        if(currentWidth>maxWidth)currentWidth = maxWidth

        for(var i=0;i<imageMenu.length;i++){

            instance.getChildByName("containerMenu").getChildByName("menu"+i).graphics.clear();
            instance.getChildByName("containerMenu").getChildByName("bg"+i).graphics.clear();

            if(i==0){
                instance.getChildByName("containerMenu").getChildByName("menu"+i).graphics.beginFill("#ffffff").drawRect(0, 0,  currentWidth, 177*ratio);
                instance.getChildByName("containerMenu").getChildByName("menu"+i).y = 160*ratio

                instance.getChildByName("containerMenu").getChildByName("bg"+i).graphics.beginFill("#ffffff").drawRect(0, 0,  currentWidth, 177*ratio);
                instance.getChildByName("containerMenu").getChildByName("bg"+i).y = 160*ratio

                instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).x = 40*ratio
                instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("bg"+i).y+177*ratio-40*ratio

                instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).x = 80*ratio
                instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).y-instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).getBounds().height*ratio-5*ratio;

                instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).x = 40*ratio
                instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).y = instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y-35/2*ratio

                instance.getChildByName("containerMenu").getChildByName("arrow"+i).x = Math.floor(40*ratio-20*ratio);
                instance.getChildByName("containerMenu").getChildByName("arrow"+i).y = Math.floor(instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y-9*ratio)

                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).regX = instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().width/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).regY = instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().height/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).x = currentWidth/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("menu"+i).y+(177*ratio)/2
                aspectRatio.resize(instance.getChildByName("containerMenu").getChildByName("imageMenu"+i),instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().width,instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().height,"areaMenu",currentWidth,177*ratio)
            }

            if(i==1){

                heightFactor = stage.canvas.height-(160*ratio+177*ratio+50*ratio)
                instance.getChildByName("containerMenu").getChildByName("menu"+i).graphics.beginFill("#ffffff").drawRect(0, 0, currentWidth, heightFactor-50*ratio);
                instance.getChildByName("containerMenu").getChildByName("menu"+i).y = 160*ratio+177*ratio+50*ratio

                instance.getChildByName("containerMenu").getChildByName("bg"+i).graphics.beginFill("#333333").drawRect(0, 0, currentWidth, heightFactor-50*ratio);
                instance.getChildByName("containerMenu").getChildByName("bg"+i).y = 160*ratio+177*ratio+50*ratio

                instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).x = 40*ratio
                instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("bg"+i).y+heightFactor-100*ratio

                instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).x = 80*ratio
                instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).y-instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).getBounds().height*ratio-5*ratio;

                instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).x = 40*ratio
                instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).y = instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y-35/2*ratio

                instance.getChildByName("containerMenu").getChildByName("arrow"+i).x = Math.floor(40*ratio-20*ratio);
                instance.getChildByName("containerMenu").getChildByName("arrow"+i).y = Math.floor(instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y-9*ratio)

                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).regX = instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().width/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).regY = instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().height/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).x = currentWidth/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("menu"+i).y+(heightFactor-50*ratio)/2
                aspectRatio.resize(instance.getChildByName("containerMenu").getChildByName("imageMenu"+i),instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().width,instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().height,"areaMenu",currentWidth,heightFactor-50*ratio)
            }

            if(i==2){

                heightFactorTwo = stage.canvas.height-100*ratio-177*ratio

                instance.getChildByName("containerMenu").getChildByName("menu"+i).graphics.beginFill("#ffffff").drawRect(0, 0, currentWidth, heightFactorTwo-50*ratio);
                instance.getChildByName("containerMenu").getChildByName("menu"+i).x = currentWidth+50*ratio
                instance.getChildByName("containerMenu").getChildByName("menu"+i).y = 50*ratio

                instance.getChildByName("containerMenu").getChildByName("bg"+i).graphics.beginFill("#333333").drawRect(0, 0, currentWidth, heightFactorTwo-50*ratio);
                instance.getChildByName("containerMenu").getChildByName("bg"+i).x = currentWidth+50*ratio
                instance.getChildByName("containerMenu").getChildByName("bg"+i).y = 50*ratio

                instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).x = currentWidth+50*ratio+40*ratio
                instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("bg"+i).y+heightFactorTwo-100*ratio

                instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).x = currentWidth+50*ratio+80*ratio
                instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).y-instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).getBounds().height*ratio-5*ratio;

                instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).x = currentWidth+50*ratio+40*ratio
                instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).y = instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y-35/2*ratio

                instance.getChildByName("containerMenu").getChildByName("arrow"+i).x = Math.floor(currentWidth+50*ratio+40*ratio-20*ratio);
                instance.getChildByName("containerMenu").getChildByName("arrow"+i).y = Math.floor(instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y-9*ratio)

                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).regX = instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().width/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).regY= instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().height/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).x = instance.getChildByName("containerMenu").getChildByName("menu"+i).x+currentWidth/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("menu"+i).y+(heightFactorTwo-50*ratio)/2
                aspectRatio.resize(instance.getChildByName("containerMenu").getChildByName("imageMenu"+i),instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().width,instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().height,"areaMenu",currentWidth,heightFactorTwo-50*ratio)

            }

            if(i==3){
               
                instance.getChildByName("containerMenu").getChildByName("menu"+i).graphics.beginFill("#ffffff").drawRect(0, 0,  currentWidth, 177*ratio);
                instance.getChildByName("containerMenu").getChildByName("menu"+i).x = currentWidth+50*ratio
                instance.getChildByName("containerMenu").getChildByName("menu"+i).y = stage.canvas.height-177*ratio-50*ratio

                instance.getChildByName("containerMenu").getChildByName("bg"+i).graphics.beginFill("#ffffff").drawRect(0, 0,  currentWidth, 177*ratio);
                instance.getChildByName("containerMenu").getChildByName("bg"+i).x = currentWidth+50*ratio
                instance.getChildByName("containerMenu").getChildByName("bg"+i).y = stage.canvas.height-177*ratio-50*ratio

                instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).x = currentWidth+50*ratio+40*ratio
                instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).y = stage.canvas.height-100*ratio

                instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).x = currentWidth+50*ratio+80*ratio
                instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).y-instance.getChildByName("containerMenu").getChildByName("titleMenu"+i).getBounds().height*ratio-5*ratio;

                instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).x = currentWidth+50*ratio+40*ratio
                instance.getChildByName("containerMenu").getChildByName("maskArrow"+i).y = instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y-35/2*ratio

                instance.getChildByName("containerMenu").getChildByName("arrow"+i).x = Math.floor(currentWidth+50*ratio+40*ratio-20*ratio);
                instance.getChildByName("containerMenu").getChildByName("arrow"+i).y = Math.floor(instance.getChildByName("containerMenu").getChildByName("headerMenu"+i).y-9*ratio)

                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).regX = instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().width/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).regY= instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().height/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).x = instance.getChildByName("containerMenu").getChildByName("menu"+i).x+currentWidth/2
                instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).y = instance.getChildByName("containerMenu").getChildByName("menu"+i).y+(177*ratio)/2
                aspectRatio.resize(instance.getChildByName("containerMenu").getChildByName("imageMenu"+i),instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().width,instance.getChildByName("containerMenu").getChildByName("imageMenu"+i).getBounds().height,"areaMenu",currentWidth,177*ratio)
                
            }

        }

        instance.getChildByName("containerMenu").x = Math.floor(stage.canvas.width/2-currentWidth-25*ratio)
        instance.getChildByName("containerLogo").x = Math.floor(stage.canvas.width/2-currentWidth-25*ratio)
    

    } ; 


window.Menu = createjs.promote(Menu, "Container");
}());