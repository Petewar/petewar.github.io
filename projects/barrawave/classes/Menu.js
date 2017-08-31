(function () {

    function Menu(IdispatchInstance,Iratio,IaspectRatio,Ilang) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance;
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.lang = Ilang;
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var aspectRatio;
    var lang;
    
    var data;
    var containerBurger;
    var containerAbout;

    var shapeBurgerOne;
    var shapeBurgerTwo;
    var shapeBurgerThree;

    var menuTitleTxt;
    var close;
    var closeWhite;
    var logo;
    var containerItems;
    var containerColumn;
    var totalHeight;
    var totalWidth
    var stroke;
    var shapeSquareColorClose;
    var shapeSquareStroke;
    var bgNavigator;
    var shapeHitClose;
    var arrow;
    var arrowBack;
    var mouseIcon

    var gallery;
    var about;
    var loaderData;
    var logoLoading

    var p = createjs.extend(Menu, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        lang = this.lang;

        containerBurger = new createjs.Container();
        instance.addChild(containerBurger);

        containerAbout = new createjs.Container();
        instance.addChild(containerBurger);

    };

    p.addElements = function(Idata,Ilogo,Iclose,IcloseWhite,Iarrow,IarrowBack,IsplashData,Imouse) {

        data = Idata;
        close = Iclose;
        closeWhite = IcloseWhite;
        arrow = Iarrow;
        arrowBack = IarrowBack;
        logo = Ilogo;
        logoLoading = logo.clone(true)
        loaderData = IsplashData

        mouseIcon = Imouse;

        shapeBurgerOne = new createjs.Shape();
        shapeBurgerOne.graphics.beginFill("#4b7ea3").drawRect(0, 0, 25*ratio, 2*ratio);
        containerBurger.addChild(shapeBurgerOne)

        shapeBurgerTwo = new createjs.Shape();
        shapeBurgerTwo.graphics.beginFill("#4b7ea3").drawRect(0, 0, 20*ratio, 2*ratio);
        shapeBurgerTwo.x = 5*ratio;
        shapeBurgerTwo.y = 6*ratio;
        containerBurger.addChild(shapeBurgerTwo)

        shapeBurgerThree = new createjs.Shape();
        shapeBurgerThree.graphics.beginFill("#4b7ea3").drawRect(0, 0, 15*ratio, 2*ratio);
        shapeBurgerThree.x = 10*ratio;
        shapeBurgerThree.y = 12*ratio;
        containerBurger.addChild(shapeBurgerThree)

        menuTitleTxt = new createjs.Text();
        menuTitleTxt.font = "24px PathwayGothicOne-Regular";
        menuTitleTxt.textBaseline = "alphabetic";
        menuTitleTxt.color = "#4b7ea3";
        menuTitleTxt.text = data.title;
        menuTitleTxt.scaleX = ratio;
        menuTitleTxt.scaleY = ratio;
        menuTitleTxt.x = 35*ratio;
        menuTitleTxt.y = menuTitleTxt.getBounds().height*ratio;
        containerBurger.addChild(menuTitleTxt);

        shapeHit = new createjs.Shape();
        shapeHit.graphics.beginFill("#ffffff").drawRect(0, 0, 100*ratio, 50*ratio);
        shapeHit.x = -10*ratio
        shapeHit.y = -20*ratio
        shapeHit.alpha = 0.01
        containerBurger.addChild(shapeHit)

        containerBurger.x = stage.canvas.width-25*ratio-menuTitleTxt.getBounds().width*ratio-10*ratio-50*ratio;
        containerBurger.y = 50*ratio;

        addAnimation();
       
    }

    function addAnimation(){

        TweenMax.from(shapeBurgerOne, 0.5, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(shapeBurgerTwo, 0.7, {scaleX:0,ease:Expo.easeInOut})
        TweenMax.from(shapeBurgerThree, 0.9, {scaleX:0,ease:Expo.easeInOut,onComplete:addHits})

        TweenMax.from(menuTitleTxt, 0.7, {alpha:0,ease:Expo.easeInOut})

    }


    function addElementsMenu(){

        bgNavigator = new createjs.Shape();
        bgNavigator.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        bgNavigator.regX = stage.canvas.width
        bgNavigator.x = stage.canvas.width
        bgNavigator.alpha = 0.9;
        instance.addChild(bgNavigator);

        instance.addChild(containerAbout);

        shapeSquareStroke = new createjs.Shape();
        shapeSquareStroke.graphics.beginStroke("#4b7ea3").setStrokeStyle(1*ratio).drawRect(0, 0, 50*ratio, 50*ratio);
        shapeSquareStroke.x = stage.canvas.width-100*ratio
        shapeSquareStroke.y = 50*ratio
        instance.addChild(shapeSquareStroke);

        shapeSquareColorClose = new createjs.Shape();
        shapeSquareColorClose.scaleX = 0;
        shapeSquareColorClose.graphics.beginFill("#4b7ea3").drawRect(0, 0, 50*ratio, 50*ratio);
        shapeSquareColorClose.x = shapeSquareStroke.x
        shapeSquareColorClose.y = shapeSquareStroke.y
        instance.addChild(shapeSquareColorClose);

        shapeHitClose = new createjs.Shape();
        shapeHitClose.graphics.beginFill("#ffffff").drawRect(0, 0, 50*ratio, 50*ratio);
        shapeHitClose.x = shapeSquareStroke.x
        shapeHitClose.y = shapeSquareStroke.y
        shapeHitClose.alpha = 0.01
        instance.addChild(shapeHitClose);

        close.x = shapeSquareStroke.x+15*ratio;
        close.y = shapeSquareStroke.y+15*ratio;
        close.alpha = 1;
        instance.addChild(close);

        closeWhite.x = shapeSquareStroke.x+15*ratio;
        closeWhite.y = shapeSquareStroke.y+15*ratio;
        closeWhite.alpha = 0;
        instance.addChild(closeWhite);

        logo.x = 50*ratio;
        logo.y = 50*ratio;
        logo.alpha = 1;

        if(ratio>1){
            logo.scaleX = 2.3
            logo.scaleY = 2.3
        }else{
            logo.scaleX = 1.2
            logo.scaleY = 1.2
        }
        
        instance.addChild(logo);

        containerItems = new createjs.Container();
        instance.addChild(containerItems);

        containerColumn = new createjs.Container();
        instance.addChild(containerColumn);

        var widthItemList;

        for (var i=0;i<data.listItem[lang].length;i++){

            var listItemTxt = new createjs.Text();
            listItemTxt.name = "listItemTxt"+i;
            listItemTxt.font = "70px PathwayGothicOne-Regular";
            listItemTxt.textBaseline = "alphabetic";
            listItemTxt.color = "#4b7ea3";
            listItemTxt.text = data.listItem[lang][i];
            listItemTxt.scaleX = ratio;
            listItemTxt.scaleY = ratio;
            listItemColorTxt = new createjs.Text();
            
            if(ratio>1){
                listItemTxt.y = (listItemTxt.getBounds().height*ratio+35*ratio)*i+listItemTxt.getBounds().height*ratio;
            }else{
                listItemTxt.y = (listItemTxt.getBounds().height*ratio+45*ratio)*i+listItemTxt.getBounds().height*ratio;
            }
            
            containerItems.addChild(listItemTxt);

            var listItemColorTxt = new createjs.Text();
            listItemColorTxt.name = "listItemColorTxt"+i;
            listItemColorTxt.font = "70px PathwayGothicOne-Regular";
            listItemColorTxt.textBaseline = "alphabetic";
            listItemColorTxt.color = "#000000";
            listItemColorTxt.text = data.listItem[lang][i];
            listItemColorTxt.scaleX = ratio;
            listItemColorTxt.scaleY = ratio;
            
            if(ratio>1){
                listItemColorTxt.y = (listItemColorTxt.getBounds().height*ratio+35*ratio)*i+listItemColorTxt.getBounds().height*ratio;
            }else{
                listItemColorTxt.y = (listItemColorTxt.getBounds().height*ratio+45*ratio)*i+listItemColorTxt.getBounds().height*ratio;
            }
            
            containerItems.addChild(listItemColorTxt);

            var hitMenu = new createjs.Shape();
            hitMenu.name = "hitMenu"+i
            hitMenu.alpha = 0.01;
            hitMenu.graphics.beginFill("#FFFFFF").drawRect(0, 0, listItemTxt.getBounds().width*ratio, listItemTxt.getBounds().height*ratio);
            hitMenu.y = listItemColorTxt.y-listItemTxt.getBounds().height*ratio
            containerItems.addChild(hitMenu);

            var maskMenu = new createjs.Shape();
            maskMenu.alpha = 0.01;
            maskMenu.name = "maskMenu"+i
            maskMenu.scaleX=0;
            maskMenu.graphics.beginFill("#000000").drawRect(0, 0, listItemTxt.getBounds().width*ratio, listItemTxt.getBounds().height*ratio+12*ratio);
            maskMenu.y = listItemColorTxt.y-listItemTxt.getBounds().height*ratio-6*ratio
            containerItems.addChild(maskMenu);

            listItemColorTxt.mask = maskMenu;

            if(i==0){
                widthItemList = listItemTxt.getBounds().width*ratio
            }else{
                if(listItemTxt.getBounds().width*ratio>widthItemList)widthItemList = listItemTxt.getBounds().width*ratio
            }

        }

        var addressTitleTxt = new createjs.Text();
        addressTitleTxt.font = "12px OpenSans-Semibold";
        addressTitleTxt.textBaseline = "alphabetic";
        addressTitleTxt.color = "#000000";
        addressTitleTxt.text = data.titles[lang][0];
        addressTitleTxt.scaleX = ratio;
        addressTitleTxt.scaleY = ratio;
        addressTitleTxt.y = addressTitleTxt.getBounds().height*ratio
        containerColumn.addChild(addressTitleTxt);

        var addressTxt = new createjs.Text();
        addressTxt.font = "12px OpenSans-Regular";
        addressTxt.textBaseline = "alphabetic";
        
        if(ratio>1){
             addressTxt.lineWidth = 80*ratio;
             addressTxt.lineHeight = 10*ratio;
         }else{
             addressTxt.lineWidth = 180*ratio;
             addressTxt.lineHeight = 20*ratio;
         }

        addressTxt.color = "#000000";
        addressTxt.text = data.content[0];
        addressTxt.scaleX = ratio;
        addressTxt.scaleY = ratio;
        addressTxt.y = addressTitleTxt.y+20*ratio;
        containerColumn.addChild(addressTxt);

        var gmapsTitleTxt = new createjs.Text();
        gmapsTitleTxt.font = "12px OpenSans-Semibold";
        gmapsTitleTxt.textBaseline = "alphabetic";
        gmapsTitleTxt.color = "#000000";
        gmapsTitleTxt.text = data.titles[lang][1];
        gmapsTitleTxt.scaleX = ratio;
        gmapsTitleTxt.scaleY = ratio;
        gmapsTitleTxt.y = addressTxt.y+addressTxt.getBounds().height*ratio+13*ratio
        containerColumn.addChild(gmapsTitleTxt);

        var gmapsTxt = new createjs.Text();
        gmapsTxt.font = "12px OpenSans-Regular";
        gmapsTxt.textBaseline = "alphabetic";
        gmapsTxt.color = "#000000";
        gmapsTxt.text = data.content[1];
        gmapsTxt.scaleX = ratio;
        gmapsTxt.scaleY = ratio;
        gmapsTxt.y = gmapsTitleTxt.y+gmapsTxt.getBounds().height*ratio+10*ratio;
        containerColumn.addChild(gmapsTxt);

        var emailTitleTxt = new createjs.Text();
        emailTitleTxt.font = "12px OpenSans-Semibold";
        emailTitleTxt.textBaseline = "alphabetic";
        emailTitleTxt.color = "#000000";
        emailTitleTxt.text = data.titles[lang][2];
        emailTitleTxt.scaleX = ratio;
        emailTitleTxt.scaleY = ratio;
        emailTitleTxt.y = gmapsTxt.y+gmapsTxt.getBounds().height*ratio+20*ratio
        containerColumn.addChild(emailTitleTxt);

        var emailTxt = new createjs.Text();
        emailTxt.font = "12px OpenSans-Regular";
        emailTxt.textBaseline = "alphabetic";
        emailTxt.color = "#000000";
        emailTxt.text = data.content[2];
        emailTxt.scaleX = ratio;
        emailTxt.scaleY = ratio;
        emailTxt.y = emailTitleTxt.y+emailTitleTxt.getBounds().height*ratio+10*ratio;
        containerColumn.addChild(emailTxt);

        var phoneTitleTxt = new createjs.Text();
        phoneTitleTxt.font = "12px OpenSans-Semibold";
        phoneTitleTxt.textBaseline = "alphabetic";
        phoneTitleTxt.color = "#000000";
        phoneTitleTxt.text = data.titles[lang][3];
        phoneTitleTxt.scaleX = ratio;
        phoneTitleTxt.scaleY = ratio;
        phoneTitleTxt.y = emailTxt.y+emailTxt.getBounds().height*ratio+20*ratio
        containerColumn.addChild(phoneTitleTxt);

        var phoneTxt = new createjs.Text();
        phoneTxt.font = "12px OpenSans-Regular";
        phoneTxt.textBaseline = "alphabetic";
        phoneTxt.color = "#000000";
        phoneTxt.text = data.content[3];
        phoneTxt.scaleX = ratio;
        phoneTxt.scaleY = ratio;
        phoneTxt.y = phoneTitleTxt.y+phoneTitleTxt.getBounds().height*ratio+10*ratio;
        containerColumn.addChild(phoneTxt);

        for(var i=0;i<data.downloadTitle.length;i++){

            var downloadTitlePtTxt = new createjs.Text();
            downloadTitlePtTxt.font = "12px OpenSans-Semibold";
            downloadTitlePtTxt.textBaseline = "alphabetic";
            downloadTitlePtTxt.color = "#000000";
            downloadTitlePtTxt.text = data.downloadTitle[i];
            downloadTitlePtTxt.scaleX = ratio;
            downloadTitlePtTxt.scaleY = ratio;

            if(ratio>1){
             downloadTitlePtTxt.y = (phoneTxt.y+phoneTxt.getBounds().height*ratio+30*ratio)+240*i
            }else{
             downloadTitlePtTxt.y = (phoneTxt.y+phoneTxt.getBounds().height*ratio+30*ratio)+120*i
            }
            
            containerColumn.addChild(downloadTitlePtTxt);

            var button = new createjs.Shape();
            button.name = "button"+i
            button.graphics.beginFill("#4b7ea3").drawRect(0, 0, 260*ratio, 60*ratio);
            button.y = downloadTitlePtTxt.y+20*ratio
            containerColumn.addChild(button);

            var buttonColor = new createjs.Shape();
            buttonColor.name = "buttonColor"+i
            buttonColor.graphics.beginFill("#000000").drawRect(0, 0, 260*ratio, 60*ratio);
            buttonColor.scaleX = 0;
            buttonColor.y = button.y
            containerColumn.addChild(buttonColor);
     
            var titleButtonTxt = new createjs.Text();
            titleButtonTxt.font = "12px OpenSans-Semibold";
            titleButtonTxt.textBaseline = "alphabetic";
            titleButtonTxt.color = "#FFFFFF";
            titleButtonTxt.text = data.downloadButtonTitle[lang];
            titleButtonTxt.scaleX = ratio;
            titleButtonTxt.scaleY = ratio;
            titleButtonTxt.x = 130*ratio-titleButtonTxt.getBounds().width/2*ratio
            titleButtonTxt.y = buttonColor.y+titleButtonTxt.getBounds().height/2*ratio+28*ratio
            containerColumn.addChild(titleButtonTxt);

        }

        totalWidth = widthItemList+300*ratio+260*ratio;
        totalHeight = buttonColor.y+60*ratio;

        stroke = new createjs.Shape();
        stroke.graphics.beginFill("#000000").drawRect(0, 0, 1*ratio, totalHeight);
        stroke.x = widthItemList+150*ratio
        stroke.alpha = 0.1
        containerItems.addChild(stroke);

        containerColumn.x = widthItemList+300*ratio;
        containerItems.addChild(containerColumn);

        containerItems.x = stage.canvas.width/2-totalWidth/2;
        containerItems.y = stage.canvas.height/2-totalHeight/2+50*ratio;

        addElementsMenuAnimation();

    }

    function addElementsMenuAnimation(){

        TweenMax.from(bgNavigator, 0.7, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.from(logo, 1, {delay:0.7,alpha:0,y:-100*ratio,ease:Expo.easeInOut})
        TweenMax.from(shapeSquareStroke, 1, {delay:0.7,alpha:0})
        TweenMax.from(close, 1, {delay:0.7,alpha:0,onComplete:adddHitsMenu})

        for (var i=0;i<data.listItem[lang].length;i++){

            TweenMax.from(containerItems.getChildByName("listItemTxt"+i), 0.7+i/2, {delay:0.7,alpha:0,ease:Expo.easeInOut})
            
        }

        TweenMax.from(stroke, 1, {delay:1,scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(containerColumn, 1.5, {delay:0.7,alpha:0,ease:Expo.easeInOut})

         TweenMax.from(containerItems, 1, {delay:0.7,y:containerItems.y+100*ratio,ease:Expo.easeInOut})
    }

    function removeElementsMenuAnimation(){

        TweenMax.to(shapeSquareStroke, 0.7, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(close, 0.7, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(closeWhite, 0.7, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(shapeSquareColorClose, 0.7, {scaleX:0,ease:Expo.easeInOut})

        TweenMax.to(logo, 1, {delay:0.7,alpha:0,y:-100*ratio,ease:Expo.easeInOut})

        for (var i=0;i<data.listItem[lang].length;i++){

            TweenMax.to(containerItems.getChildByName("listItemTxt"+i), 0.5+i/2, {delay:0.5,alpha:0,ease:Expo.easeInOut})
            //TweenMax.from(containerItems.getChildByName("listItemColorTxt"+i), 0.5*i, {alpha:0,ease:Expo.easeInOut})
        }

        TweenMax.to(stroke, 1, {delay:1,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(containerColumn, 1.5, {delay:0.7,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(containerItems, 1, {delay:0.7,y:containerItems.y-100*ratio,ease:Expo.easeInOut})

        TweenMax.to(bgNavigator, 0.7, {delay:1.7,scaleX:0,ease:Expo.easeInOut,onComplete:killMenu})

        
    }

    function hideElementsMenuAnimation(){

        TweenMax.to(logo, 1, {delay:0.7,alpha:0,y:-100*ratio,ease:Expo.easeInOut})

        for (var i=0;i<data.listItem[lang].length;i++){

            TweenMax.to(containerItems.getChildByName("listItemTxt"+i), 0.5+i/2, {delay:0.5,alpha:0,ease:Expo.easeInOut})
            //TweenMax.from(containerItems.getChildByName("listItemColorTxt"+i), 0.5*i, {alpha:0,ease:Expo.easeInOut})
        }

        TweenMax.to(stroke, 1, {delay:1,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(containerColumn, 1.5, {delay:0.7,alpha:0,ease:Expo.easeInOut})

        TweenMax.to(containerItems, 1, {delay:0.7,y:containerItems.y-100*ratio,ease:Expo.easeInOut})
        
    }

    function killMenu(){

        instance.removeChild(shapeSquareStroke);
        
        shapeHitClose.graphics.clear();
        instance.removeChild(shapeHitClose);

        instance.removeChild(closeWhite);
        instance.removeChild(close);
        instance.removeChild(shapeSquareColorClose);

        instance.removeChild(containerColumn);
        instance.removeChild(containerItems);

        bgNavigator.graphics.clear();
        instance.removeChild(bgNavigator);

        addHits();
    }

    function addHits(){

        shapeHit.cursor = "pointer";
        shapeHit.type = "open";
        shapeHit.addEventListener("mouseover", handlerOver);
        //shapeHit.addEventListener("mouseout", handlerOut)
        shapeHit.addEventListener("click", handlerClick);

    }

    function removeHits(){

        shapeHit.cursor = "auto";
        shapeHit.removeEventListener("mouseover", handlerOver);
        shapeHit.removeEventListener("mouseout", handlerOut)
        shapeHit.removeEventListener("click", handlerClick);

    }

    function addOut(){
        
        shapeHit.addEventListener("mouseout", handlerOut)
    }

    function addOver(){
        
        shapeHit.addEventListener("mouseover", handlerOver);
    }

    function handlerOver(event){


        switch(event.target.type){
            case "open":
                
                shapeHit.removeEventListener("mouseover", handlerOver);

                TweenMax.from(shapeBurgerOne, 0.4, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.from(shapeBurgerTwo, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.from(shapeBurgerThree, 0.6, {scaleX:0,ease:Expo.easeInOut,onComplete:addOut})
                TweenMax.from(menuTitleTxt, 0.3, {alpha:0.5,ease:Expo.easeInOut})
            
            break;
            
            case "close":
                TweenMax.to(shapeSquareColorClose, 0.5, {scaleX:1,ease:Expo.easeInOut})
                TweenMax.to(closeWhite, 0.5, {alpha:1,ease:Expo.easeInOut})
            break;

            case "overlay":
                
            break;

            case "menu":
                TweenMax.to(containerItems.getChildByName("listItemColorTxt"+event.target.instance), 0.7, {alpha:1,ease:Expo.easeInOut})
                TweenMax.to(containerItems.getChildByName("maskMenu"+event.target.instance), 0.7, {scaleX:1,ease:Expo.easeInOut})
            break;

            case "download":

                TweenMax.to(containerColumn.getChildByName("buttonColor"+event.target.instance), 0.7, {scaleX:1,ease:Expo.easeInOut})
                
            break;
            
        }

    }

    function handlerOut(event){
        
        switch(event.target.type){
            case "open":
                
                shapeHit.removeEventListener("mouseout", handlerOut);

                TweenMax.from(shapeBurgerOne, 0.4, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.from(shapeBurgerTwo, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.from(shapeBurgerThree, 0.6, {scaleX:0,ease:Expo.easeInOut,onComplete:addOver})
                TweenMax.from(menuTitleTxt, 0.3, {alpha:0.5,ease:Expo.easeInOut})

            break;

            case "close":
                TweenMax.to(shapeSquareColorClose, 0.5, {scaleX:0,ease:Expo.easeInOut})
                TweenMax.to(closeWhite, 0.5, {alpha:0,ease:Expo.easeInOut})
            break;

            case "overlay":
                
            break;

            case "menu":
                TweenMax.to(containerItems.getChildByName("listItemColorTxt"+event.target.instance), 0.7, {alpha:0,ease:Expo.easeInOut})
                TweenMax.to(containerItems.getChildByName("maskMenu"+event.target.instance), 0.7, {scaleX:0,ease:Expo.easeInOut})
            break;

            case "download":
                TweenMax.to(containerColumn.getChildByName("buttonColor"+event.target.instance), 0.7, {scaleX:0,ease:Expo.easeInOut})
            break;
            
        }

        

    }

    function removeGallery(){
        if(gallery){
            console.log("Remove Gallery")
            instance.removeChild(gallery);
            gallery=null
        }
    }

    function removeAbout(){
        if(about){
            console.log("Remove About")
            instance.removeChild(about);
            about=null
        }
    }

    function handlerClick(event){
        
        switch(event.target.type){
            case "open":
                removeHits();
                addElementsMenu();
            break;

            case "close":
                
                if(gallery){
                    gallery.removeAnimation();
                    timer = setTimeout(removeGallery, 1500);
                }

                if(about){
                    
                    about.removeAnimation();
                    var customEvent = new createjs.Event("runParallaxView");
                    dispatchInstance.dispatchEvent(customEvent);
                    timer = setTimeout(removeAbout, 1500);
                }

                removeHitsMenu(false);
                removeElementsMenuAnimation();

            break;

            case "overlay":
                
            break;

            case "download":
                window.open(data.downloadLink[event.target.instance],"_blank");
            break;
            
             case "menu":

                TweenMax.to(containerItems.getChildByName("maskMenu"+event.target.instance), 0.7, {scaleX:0,ease:Expo.easeInOut})

                switch(event.target.instance){
                     case 0:

                        var customEvent = new createjs.Event("stopParallaxView");
                        dispatchInstance.dispatchEvent(customEvent);

                        about = new About(instance,ratio,aspectRatio,lang);
                        about.addElements(data.aboutData,arrow,mouseIcon);
                        containerAbout.addChild(about);

                        removeHitsMenu(true);
                        hideElementsMenuAnimation();

                     break;
                      case 1:

                        var customEvent = new createjs.Event("openBuy");
                        dispatchInstance.dispatchEvent(customEvent);

                        removeHitsMenu(false);
                        removeElementsMenuAnimation();

                     break;
                    case 2:


                        gallery = new Gallery(instance,ratio,aspectRatio,lang);
                        gallery.addElements(data.galleryData,arrow,arrowBack,logoLoading,loaderData);
                        instance.addChild(gallery);

                        removeHitsMenu(true);
                        hideElementsMenuAnimation();

                     break;
                }
                
            break;
        }
        
    }

    function adddHitsMenu(){

        for (var i=0;i<data.downloadTitle.length;i++){

            containerColumn.getChildByName("button"+i).cursor = "pointer";
            containerColumn.getChildByName("button"+i).type = "download";
            containerColumn.getChildByName("button"+i).instance = i;
            containerColumn.getChildByName("button"+i).addEventListener("mouseover", handlerOver);
            containerColumn.getChildByName("button"+i).addEventListener("mouseout", handlerOut);
            containerColumn.getChildByName("button"+i).addEventListener("click", handlerClick);

        }

        for (var k=0;k<data.listItem[lang].length;k++){
            containerItems.getChildByName("hitMenu"+k).cursor = "pointer";
            containerItems.getChildByName("hitMenu"+k).type = "menu";
            containerItems.getChildByName("hitMenu"+k).instance = k;
            containerItems.getChildByName("hitMenu"+k).addEventListener("mouseover", handlerOver);
            containerItems.getChildByName("hitMenu"+k).addEventListener("mouseout", handlerOut);
            containerItems.getChildByName("hitMenu"+k).addEventListener("click", handlerClick);        
        }

        shapeHitClose.type = "close"
        shapeHitClose.cursor = "pointer";
        shapeHitClose.addEventListener("mouseover", handlerOver);
        shapeHitClose.addEventListener("mouseout", handlerOut);
        shapeHitClose.addEventListener("click", handlerClick);

        bgNavigator.cursor = "auto";
        bgNavigator.type = "overlay";
        bgNavigator.addEventListener("mouseover", handlerOver);

    }

    function removeHitsMenu(Ihide){

        for (var i=0;i<data.downloadTitle.length;i++){

            containerColumn.getChildByName("button"+i).cursor = "auto";
            containerColumn.getChildByName("button"+i).removeEventListener("mouseover", handlerOver);
            containerColumn.getChildByName("button"+i).removeEventListener("mouseout", handlerOut);
            containerColumn.getChildByName("button"+i).removeEventListener("click", handlerClick);

        }

        for (var k=0;k<data.listItem[lang].length;k++){
            containerItems.getChildByName("hitMenu"+k).cursor = "auto";
            containerItems.getChildByName("hitMenu"+k).removeEventListener("mouseover", handlerOver);
            containerItems.getChildByName("hitMenu"+k).removeEventListener("mouseout", handlerOut);
            containerItems.getChildByName("hitMenu"+k).removeEventListener("click", handlerClick);        
        }

        if(Ihide!=true){

            shapeHitClose.cursor = "auto";
            shapeHitClose.removeEventListener("mouseover", handlerOver);
            shapeHitClose.removeEventListener("mouseout", handlerOut);
            shapeHitClose.removeEventListener("click", handlerClick);

            bgNavigator.removeEventListener("mouseover", handlerOver);    
        }
        
    }

    p.hide = function() {

        TweenMax.to(containerBurger, 0.5, {alpha:0,ease:Expo.easeInOut,onComplete:continueHide})
        
    } ;

    function continueHide(){
        containerBurger.visible = false
    }

    p.show = function() {

        containerBurger.visible = true;
        TweenMax.to(containerBurger, 0.5, {delay:1,alpha:1,ease:Expo.easeInOut})

    } ;

    p.resize = function() {

        if(containerBurger){
            containerBurger.x = stage.canvas.width-25*ratio-menuTitleTxt.getBounds().width*ratio-10*ratio-50*ratio;
            containerBurger.y = 50*ratio;
        }

        if(containerItems){
            containerItems.x = stage.canvas.width/2-totalWidth/2;
            containerItems.y = stage.canvas.height/2-totalHeight/2+50*ratio;
        }

        if(bgNavigator){
            bgNavigator.graphics.clear();
            bgNavigator.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
            bgNavigator.regX = stage.canvas.width
            bgNavigator.x = stage.canvas.width    
        }
        

        if(shapeSquareStroke){
            shapeSquareStroke.x = stage.canvas.width-100*ratio
            shapeSquareStroke.y = 50*ratio
        }

        if(shapeSquareColorClose){
            shapeSquareColorClose.x = stage.canvas.width-100*ratio
            shapeSquareColorClose.y = 50*ratio
        }

        if(shapeHitClose){
           shapeHitClose.x = stage.canvas.width-100*ratio
            shapeHitClose.y = 50*ratio
        }

        if(close){

            close.x = stage.canvas.width-100*ratio+15*ratio;
            close.y = 50*ratio+15*ratio;
        }

        if(closeWhite){
            closeWhite.x = stage.canvas.width-100*ratio+15*ratio;
            closeWhite.y = 50*ratio+15*ratio;
        }

        if(gallery)gallery.resize();

        if(about)about.resize();

    } ; 


window.Menu = createjs.promote(Menu, "Container");
}());