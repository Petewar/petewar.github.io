(function () {

    function Main(Iratio,Icanvas) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.canvas = Icanvas
        this.setup();
    }
    
    var instance;
    var ratio;

    //sense library
    var aspectRatio;
    var loader;
    var svg;
    var gif


    //classes library
    var home;
    var menu;

    //Json file
    var preloadData
    var homepageData;
    var graphicsData;
    var menuData;
    var imagesData;
    var projectsData;
    var contactData
    var strokeIntro
    var burgerContainer
    var tempNav
    var interval
    
    var myCanvas
    var bottomIntroIntro;
    var topIntro;
    var logoDark

    var phonesPath = "M32.000,32.000 C29.204,36.093 27.276,38.844 25.000,36.000 C23.957,34.697 25.000,32.000 25.000,32.000 L28.000,19.000 L31.000,17.000 L31.000,14.000 L33.000,14.000 L33.000,17.000 L34.000,26.000 C34.000,26.000 33.718,29.486 32.000,32.000 ZM26.000,7.000 C19.514,2.977 14.500,3.000 8.000,7.000 C4.889,8.914 3.000,13.000 3.000,13.000 L1.000,13.000 C1.000,13.000 3.389,6.648 7.000,4.000 C14.030,-1.156 21.303,-0.178 27.000,4.000 C30.904,6.863 33.000,13.000 33.000,13.000 L31.000,13.000 C31.000,13.000 29.855,9.391 26.000,7.000 ZM1.000,14.000 L3.000,14.000 L3.000,17.000 L6.000,19.000 L9.000,32.000 C9.000,32.000 10.043,34.697 9.000,36.000 C6.724,38.844 4.796,36.093 2.000,32.000 C0.282,29.486 -0.000,26.000 -0.000,26.000 L1.000,17.000 L1.000,14.000 Z";
    var phonesSvg;

    //Fonts Files
    var fonts = ["BebasNeueLight", "BebasNeueBook", "BebasNeueBold"];
    var fontsOther = ["BwModelicaLight"];
    
    //elements
    var stickyHit
    var stickyText
    var strokeToSticky
    var logo;
    var burger;
    var facebook;
    var twitter;
    var instagram;
    var squareDivider;
    var sound;
    var triangle;
    var fingerPrint;
    var fingerPrintFx;
    var fingerPrintMask;
    var fingermask;
    var overlay;
    var logoGif;
    var menuHit;
    var squareHitLogo;
    var loadingTxt;
    var work;
    var viewWorkHit;
    var bgSticky;
    var containerSticky;
    var contact
    var agency;
    var triangleDark;
    var close
    var containerFace;
    var containerInsta
    var containerTwitter
    var contactIn = false
    var contactOpen = false
    var agencyOpen = false
    var closeSquareOne
    var closeSquareTwo
    var agencyData;
    var containerSound;
    var burgerMedDark
    var burgerTopDark
    var burgerbottomDark

    //Props
    var margin = 30;
    var tweenTime = 0.8;
    var menuOpen = false;
    var nav = 0;
    var today = new Date();
    var hours = today.getHours();
    var sounds;

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        
        myCanvas = this.canvas
        svg = new Svg(ratio);
        gif = new Gif(ratio);
        aspectRatio = new AspectRatio(ratio);

        sounds = new Sound();

        today = new Date();
        hours = today.getHours();

        var fontLoader = new FontLoader(fontsOther, {
            
            "fontLoaded": function(font) {
                // One of the fonts was loaded
                //console.log("Font Loaded: " + font.family);
            },

            "complete": function(error) {
                if (error !== null) {
                    // Reached the timeout but not all fonts were loaded
                    //console.log(error.message);
                    //console.log(error.notLoadedFonts);

                } else {
                    console.log("Fonts Loaded: "+fontsOther);
                    // All fonts were loaded
                    timer = setTimeout(loadOtherFonts, 1000);
                }
            }
        }, 3000);

        fontLoader.loadFonts();
        
    };

    function alphaUp(){
        TweenMax.to(loadingTxt, tweenTime*2, {alpha:1,ease:Expo.easeInOut,onComplete:alphaDown})
        TweenMax.to(phonesSvg, tweenTime*2, {alpha:1,ease:Expo.easeInOut})
    }

    function alphaDown(){
        TweenMax.to(loadingTxt, tweenTime*2, {alpha:0.25,ease:Expo.easeInOut,onComplete:alphaUp})
        TweenMax.to(phonesSvg, tweenTime*2, {alpha:0.25,ease:Expo.easeInOut})
    }

    function loadOtherFonts(){

        phonesSvg = svg.createSvg(phonesPath,"#FFFFFF")
        phonesSvg.x = Math.floor(stage.canvas.width/2)-17*ratio;
        phonesSvg.y = Math.floor(stage.canvas.height/2)-70*ratio;
        instance.addChild(phonesSvg);

        //create current time text box
        loadingTxt = new createjs.Text();
        loadingTxt.font = "14px BwModelicaLight";
        loadingTxt.color = "#FFFFFF";
        loadingTxt.text = "For a better experience connect your headphones or turn up the volume";
        loadingTxt.scaleX = ratio;
        loadingTxt.scaleY = ratio;
        loadingTxt.x = Math.floor(stage.canvas.width/2-(loadingTxt.getBounds().width/2)*ratio);
        loadingTxt.y = Math.floor(stage.canvas.height/2-(loadingTxt.getBounds().height/2)*ratio);
        instance.addChild(loadingTxt);

        loadingTxt.alpha = 0;
        phonesSvg.alpha = 0;
        TweenMax.to(loadingTxt, tweenTime, {alpha:1,ease:Expo.easeOut,onComplete:alphaDown})
        TweenMax.to(phonesSvg, tweenTime, {alpha:1,ease:Expo.easeOut})

        var fontLoader = new FontLoader(fonts, {
            
            "fontLoaded": function(font) {
                // One of the fonts was loaded
                //console.log("Font Loaded: " + font.family);
            },

            "complete": function(error) {
                if (error !== null) {
                    // Reached the timeout but not all fonts were loaded
                    //console.log(error.message);
                    //console.log(error.notLoadedFonts);

                } else {
                    console.log("Fonts Loaded: "+fonts);
                    // All fonts were loaded
                    preloadDataJson()
                }
            }
        }, 3000);

        fontLoader.loadFonts();

    }

    function preloadDataJson(){

        //Load Json File
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile("data/content.json", true);

    }

    function preloadDataComplete(event) {
        
        console.log("Loader Data: "+"data/content.json")

        //remove preloadData
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;

        homepageData = event.result.content[0]
        imagesData = event.result.content[1]
        projectsData = event.result.content[2]
        graphicsData = event.result.content[3]
        menuData = event.result.content[4]
        contactData = event.result.content[5]
        agencyData = event.result.content[6]

        var thumbsToLoad = imagesData.thumbsBW.concat(imagesData.thumbsColor);

        var allDataToLoad
        if((hours>0)&&(hours<5)){
            allDataToLoad = [homepageData.videoImageNight,imagesData.bg,imagesData.startProjectBg,imagesData.agencyBg].concat(thumbsToLoad);
        }else{
            allDataToLoad = [homepageData.videoImage,imagesData.bg,imagesData.startProjectBg,imagesData.agencyBg].concat(thumbsToLoad);
        }

        //load images for videos
        loadImages(allDataToLoad);
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

        TweenMax.killAll();
        TweenMax.to(phonesSvg, tweenTime, {alpha:0,ease:Expo.easeInOut})
        TweenMax.to(loadingTxt, tweenTime, {alpha:0,ease:Expo.easeInOut,onComplete:loadComplete(evt)})
        
    }

    function loadComplete(Ivent){
        instance.removeChild(loadingTxt);
        loadingTxt = null;

        instance.removeChild(phonesSvg);
        phonesSvg = null;
        init(Ivent);
    }

    function init(Ivent){

        sounds.bgSound();

        timer = setTimeout(waitForSound, 1000);

        instance.addEventListener("videoInit", initElementsHandler);
        instance.addEventListener("returningHome", returningHomeHandler);
        instance.addEventListener("addSticky", addStickyHandler);
        instance.addEventListener("openSticky", openStickyHandler);
        instance.addEventListener("closeSticky", closeStickyHandler);
        instance.addEventListener("removeSticky", removeStickyHandler);
        instance.addEventListener("goToProject", hideElements);
        instance.addEventListener("goToWork", showElements);
        instance.addEventListener("nextProject",moreProjectsHandler);
        instance.addEventListener("goToMenuWork",goToMenuWorkHandler);
        instance.addEventListener("goToMenuHome",goToMenuHomeHandler);
        instance.addEventListener("goToMenuTalk",goToMenuTalkHandler);
        instance.addEventListener("goToMenuTalkForm",changeColorsHandler);
        instance.addEventListener("goToMenuAgency",goToMenuAgencyHandler);

        //get the data thumbs
        var thumbs = new Object();
        thumbs.bw = [];
        thumbs.color = [];
        thumbs.date = [];
        thumbs.title = [];
        thumbs.animations = [];
        thumbs.frames = [];
        thumbs.projectData = [];

        var lengthProjects = projectsData.projectTitle.length;

        var cursorBw = 4
        var cursorColors = cursorBw+lengthProjects

        for(var i=0;i<lengthProjects;i++){
            thumbs.bw.push(Ivent.contentLoader[cursorBw])
            thumbs.color.push(Ivent.contentLoader[cursorColors])
            thumbs.date.push(projectsData.projectDate[i])
            thumbs.title.push(projectsData.projectTitle[i])
            thumbs.animations.push(imagesData.animations[i])
            thumbs.frames.push(imagesData.frames[i])
            thumbs.projectData.push(projectsData.projectData[i])
            cursorBw++
            cursorColors++
        }

        var video;
        var title;
        var subtitle;

        //Change the Home between hours
        if((hours>0)&&(hours<5)){
            video = homepageData.videoMovieNight;
            title = homepageData.titleNight;
            subtitle = homepageData.subtitleNight;
        }else{
            video = homepageData.videoMovie
            title = homepageData.title;
            subtitle = homepageData.subtitle;
        }

        //home
        home = new Home(instance,ratio,margin,tweenTime,aspectRatio,Ivent.contentLoader[0],video,title,subtitle,homepageData.workTitle);
        instance.addChild(home);

        //work
        work = new Work(gif,instance,ratio,margin,tweenTime,aspectRatio,projectsData.home,Ivent.contentLoader[1],thumbs,svg.createSvg(graphicsData.arrowLeft,"#FFFFFF"),svg.createSvg(graphicsData.arrowRight,"#FFFFFF"),svg.createSvg(graphicsData.arrowLeft,"#171820"),svg.createSvg(graphicsData.arrowRight,"#171820"),svg.createSvg(graphicsData.shapeStroke,"#FFFFFF"),svg.createSvg(graphicsData.shapeFill,"#171820"),svg.createSvg(graphicsData.upArrow,"#171820"),svg.createSvg(graphicsData.downArrow,"#171820"),sounds,projectsData.dragTitle)
        instance.addChild(work);

        //containerSticky
        containerSticky = new createjs.Container();
        instance.addChild(containerSticky);

        //work
        agency = new Agency(instance,ratio,margin,tweenTime,aspectRatio,Ivent.contentLoader[3],agencyData)
        instance.addChild(agency);

        //container Contact
        contact = new Contact(instance,ratio,margin,tweenTime,aspectRatio,svg.createSvg(graphicsData.triangle,"#ffffff",140,140),svg.createSvg(graphicsData.digitCode,"#FFFFFF",1600/2,1000/2),contactData,Ivent.contentLoader[2],svg.createSvg(graphicsData.arrowRight,"#171820"),svg.createSvg(graphicsData.arrowLeft,"#FFFFFF"),svg.createSvg(graphicsData.arrowRight,"#FFFFFF"),svg.createSvg(graphicsData.thankyou,"#FFFFFF"),sounds,svg.createSvg(graphicsData.digitCodePiece,"#171820",400,446));
        instance.addChild(contact);

        //overlay
        overlay = new createjs.Shape();
        overlay.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.width);
        instance.addChild(overlay);
        overlay.alpha = 0;

        //
        topIntro = new createjs.Shape();
        topIntro.graphics.beginFill("#171820").drawRect(0, 0, stage.canvas.width, stage.canvas.height/2);
        instance.addChild(topIntro);

        //
        bottomIntroIntro = new createjs.Shape();
        bottomIntroIntro.graphics.beginFill("#171820").drawRect(0, 0, stage.canvas.width, stage.canvas.height/2);
        bottomIntroIntro.regY = stage.canvas.height/2
        bottomIntroIntro.y = stage.canvas.height
        instance.addChild(bottomIntroIntro);

        //
        strokeIntro = new createjs.Shape();
        strokeIntro.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width, 1*ratio);
        strokeIntro.scaleX = 0;
        strokeIntro.y = stage.canvas.height/2
        instance.addChild(strokeIntro);
        
    }

    function waitForSound(){
        console.log("new Bg Sound")
        sounds.revealSound();
    }

    //Init after Video Playing dispatched
    function initElementsHandler(event){

        TweenMax.to(strokeIntro, tweenTime*1.5, {alpha:0,scaleX:1,ease:Expo.easeInOut})
        TweenMax.to(strokeIntro, tweenTime*1.5, {delay:tweenTime,alpha:0,ease:Expo.easeOut})
        TweenMax.to(topIntro, tweenTime, {delay:tweenTime,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(bottomIntroIntro, tweenTime, {delay:tweenTime,scaleY:0,ease:Expo.easeInOut,onComplete:run})
    }

    function run(){

        instance.removeChild(bottomIntroIntro);
        bottomIntroIntro = null
        instance.removeChild(topIntro);
        topIntro = null

        instance.removeEventListener("videoInit", initElementsHandler);
        addELements();
        addELementsAnimation();
        addHits();

        //Menu
        menu = new Menu(instance,ratio,margin,tweenTime,svg.createSvg(graphicsData.menuBg,"#ffffff"),svg.createSvg(graphicsData.close,"#000000"),menuData.menuTitle,menuData.menu1Label,menuData.menu1,menuData.menu2Label,menuData.menu2,menuData.menu3Label,menuData.menu3,menuData.menu4Label,menuData.menu4,menuData.email,menuData.phone,menuData.address,menuData.address2,menuData.privacy,menuData.terms,sounds);
        instance.addChild(menu);

    }

    function addELements(){

        //logo
        logo = svg.createSvg(graphicsData.logo,"#ffffff")
        logo.x = Math.floor(margin*ratio);
        logo.y = Math.floor(margin*ratio);
        instance.addChild(logo);

        logoDark = svg.createSvg(graphicsData.logo,"#171820")
        logoDark.x = Math.floor(margin*ratio);
        logoDark.y = Math.floor(margin*ratio);
        logoDark.visible = false
        instance.addChild(logoDark);

        logoSquare = new createjs.Shape();
        logoSquare.compositeOperation = "overlay";
        logoSquare.graphics.beginFill("#FFFFFF").drawRect(0, 0, 117*ratio+20*ratio, 21*ratio+5*ratio+20*ratio);
        logoSquare.x = logo.x-10*ratio
        logoSquare.y = logo.y-12*ratio
        instance.addChild(logoSquare);

        burgerTop = new createjs.Shape();
        burgerTop.regX = 30*ratio
        burgerTop.graphics.beginFill("#ffffff").drawRect(0, 0, 30*ratio, 2*ratio);

        burgerMed = new createjs.Shape();
        burgerMed.regX = 28*ratio
        burgerMed.graphics.beginFill("#ffffff").drawRect(0, 0, 28*ratio, 2*ratio);
        burgerMed.y = 5*ratio

        burgerbottom = new createjs.Shape();
        burgerbottom.regX = 26*ratio
        burgerbottom.graphics.beginFill("#ffffff").drawRect(0, 0, 26*ratio, 2*ratio);
        burgerbottom.y = 10*ratio

        burgerTopDark = new createjs.Shape();
        burgerTopDark.visible = false
        burgerTopDark.regX = 30*ratio
        burgerTopDark.graphics.beginFill("#171820").drawRect(0, 0, 30*ratio, 2*ratio);

        burgerMedDark = new createjs.Shape();
        burgerMedDark.regX = 28*ratio
        burgerMedDark.visible = false
        burgerMedDark.graphics.beginFill("#171820").drawRect(0, 0, 28*ratio, 2*ratio);
        burgerMedDark.y = 5*ratio

        burgerbottomDark = new createjs.Shape();
        burgerbottomDark.regX = 26*ratio
        burgerbottomDark.visible = false
        burgerbottomDark.graphics.beginFill("#171820").drawRect(0, 0, 26*ratio, 2*ratio);
        burgerbottomDark.y = 10*ratio
        
        burgerContainer = new createjs.Container();
        burgerContainer.x = Math.floor(stage.canvas.width-margin*ratio);
        burgerContainer.y = Math.floor(margin*ratio)
        instance.addChild(burgerContainer)

        burgerContainer.addChild(burgerTop);
        burgerContainer.addChild(burgerMed);
        burgerContainer.addChild(burgerbottom);
        burgerContainer.addChild(burgerTopDark);
        burgerContainer.addChild(burgerMedDark);
        burgerContainer.addChild(burgerbottomDark);
        
        containerFace = new createjs.Container();
        containerFace.x = Math.floor(margin*ratio)
        containerFace.y = Math.floor(stage.canvas.height-12*ratio-margin*ratio);
        instance.addChild(containerFace);

        containerTwitter = new createjs.Container();
        containerTwitter.x = Math.floor(containerFace.x+7*ratio+25*ratio);
        containerTwitter.y = Math.floor(stage.canvas.height-11*ratio-margin*ratio);
        instance.addChild(containerTwitter);

        containerInsta = new createjs.Container();
        containerInsta.x = Math.floor(containerTwitter.x+15*ratio+20*ratio);
        containerInsta.y = Math.floor(stage.canvas.height-13*ratio-margin*ratio+1*ratio);
        instance.addChild(containerInsta);

        containerSound = new createjs.Container();
        containerSound.x = Math.floor(containerInsta.x+13*ratio+25*ratio+40*ratio);
        containerSound.y = Math.floor(containerInsta.y);
        instance.addChild(containerSound);

        //facebook
        facebook = svg.createSvg(graphicsData.facebook,"#ffffff");
        containerFace.addChild(facebook);

        facebookDark = svg.createSvg(graphicsData.facebook,"#171820");
        facebookDark.visible = false;
        containerFace.addChild(facebookDark);

        faceHit = new createjs.Shape();
        faceHit.graphics.beginFill("#000000").drawRect(0, 0, 7*ratio, 12*ratio);
        faceHit.alpha = 0.01;
        containerFace.addChild(faceHit);
        
        //twitter
        twitter = svg.createSvg(graphicsData.twitter,"#ffffff");
        containerTwitter.addChild(twitter);

        twitterDark = svg.createSvg(graphicsData.twitter,"#171820");
        twitterDark.visible = false;
        containerTwitter.addChild(twitterDark);

        twitterHit = new createjs.Shape();
        twitterHit.graphics.beginFill("#000000").drawRect(0, 0, 14*ratio, 12*ratio);
        twitterHit.alpha = 0.01;
        containerTwitter.addChild(twitterHit);

        //instagram
        instagram = svg.createSvg(graphicsData.instagram,"#ffffff");
        containerInsta.addChild(instagram);

        instagramDark = svg.createSvg(graphicsData.instagram,"#171820");
        instagramDark.visible = false;
        containerInsta.addChild(instagramDark);

        instaHit = new createjs.Shape();
        instaHit.graphics.beginFill("#000000").drawRect(0, 0, 13*ratio, 12*ratio);
        instaHit.alpha = 0.01;
        containerInsta.addChild(instaHit);

        //stroke bottom
        squareDivider = new createjs.Shape();
        squareDivider.graphics.beginFill("#FFFFFF").drawRect(0, 0, 20*ratio, 1*ratio);
        squareDivider.alpha = 0.5;
        squareDivider.x = Math.floor(containerInsta.x+13*ratio+25*ratio);
        squareDivider.y = Math.floor(containerInsta.y+6*ratio);
        instance.addChild(squareDivider);

        squareDividerDark = new createjs.Shape();
        squareDividerDark.graphics.beginFill("#171820").drawRect(0, 0, 20*ratio, 1*ratio);
        squareDividerDark.alpha = 0.5;
        squareDividerDark.x = Math.floor(containerInsta.x+13*ratio+25*ratio);
        squareDividerDark.y = Math.floor(containerInsta.y+6*ratio);
        squareDividerDark.visible = false,
        instance.addChild(squareDividerDark);

        //sound
        sound = svg.createSvg(graphicsData.sound,"#ffffff");
        containerSound.addChild(sound);

        soundDark = svg.createSvg(graphicsData.sound,"#171820");
        soundDark.visible = false;
        containerSound.addChild(soundDark);

        soundHit = new createjs.Shape();
        soundHit.graphics.beginFill("#000000").drawRect(0, 0, 20*ratio, 12*ratio);
        soundHit.alpha = 0.01;
        containerSound.addChild(soundHit);

        //triangle contacts
        triangle = svg.createSvg(graphicsData.triangle,"#ffffff",140,140)
        triangle.x = stage.canvas.width
        triangle.y = stage.canvas.height
        instance.addChild(triangle);

        //fingerPrint contact
        fingerPrint = svg.createSvg(graphicsData.fingerPrint,"#171820")
        fingerPrint.x = Math.floor(stage.canvas.width-25*ratio-30*ratio);
        fingerPrint.y = Math.floor(stage.canvas.height-28*ratio-30*ratio);
        instance.addChild(fingerPrint);

        //triangle contacts
        triangleDark = svg.createSvg(graphicsData.triangle,"#171820",140,140)
        triangleDark.x = stage.canvas.width
        triangleDark.y = stage.canvas.height
        triangleDark.scaleX=0
        triangleDark.scaleY=0
        instance.addChild(triangleDark);

        closeSquareOne = new createjs.Shape();
        closeSquareOne.regX = 24/2*ratio
        closeSquareOne.regY = 1*ratio
        closeSquareOne.rotation = 45
        closeSquareOne.graphics.beginFill("#FFFFFF").drawRect(0, 0, 24*ratio, 2*ratio);
        closeSquareOne.x = stage.canvas.width-40*ratio
        closeSquareOne.y = stage.canvas.height-40*ratio
        closeSquareOne.alpha = 0
        instance.addChild(closeSquareOne);

        closeSquareTwo = new createjs.Shape();
        closeSquareTwo.regX = 24/2*ratio
        closeSquareTwo.regY = 1*ratio
        closeSquareTwo.rotation = -45
        closeSquareTwo.graphics.beginFill("#FFFFFF").drawRect(0, 0, 24*ratio, 2*ratio);
        closeSquareTwo.x = stage.canvas.width-40*ratio
        closeSquareTwo.y = stage.canvas.height-40*ratio
        closeSquareTwo.alpha = 0
        instance.addChild(closeSquareTwo);

        triangleHit = svg.createSvg(graphicsData.triangle,"#ffffff",140,140)
        triangleHit.x = stage.canvas.width
        triangleHit.y = stage.canvas.height
        triangleHit.alpha = 0.01;
        instance.addChild(triangleHit);

        menuHit = new createjs.Shape();
        menuHit.graphics.beginFill("#000000").drawRect(0, 0, 50*ratio, 50*ratio);
        menuHit.x = Math.floor(stage.canvas.width-50*ratio-20*ratio);
        menuHit.y = Math.floor(10*ratio);
        menuHit.alpha = 0.01
        instance.addChild(menuHit);

        squareHitLogo = new createjs.Shape();
        squareHitLogo.cursor = "pointer";
        squareHitLogo.graphics.beginFill("#000000").drawRect(0, 0, 117*ratio, 21*ratio);
        squareHitLogo.alpha = 0.01;
        squareHitLogo.x = Math.floor(margin*ratio);
        squareHitLogo.y = Math.floor(margin*ratio);
        instance.addChild(squareHitLogo);

        viewWorkHit = new createjs.Shape();
        viewWorkHit.cursor = "pointer";
        viewWorkHit.graphics.beginFill("#000000").drawRect(0, 0, 100*ratio, 43*ratio);
        viewWorkHit.alpha = 0.01;
        viewWorkHit.x = stage.canvas.width-100*ratio-margin*ratio-10*ratio;
        viewWorkHit.y = stage.canvas.height/2-22*ratio
        instance.addChild(viewWorkHit);
    }

    function addELementsAnimation(){
            
        //Animation Elements
        TweenMax.from(logo, tweenTime/2, {y:0-20*ratio,ease:Expo.easeOut, alpha:0})
        TweenMax.from(burgerContainer, tweenTime/2, {y:0-12*ratio,ease:Expo.easeOut, alpha:0,delay:tweenTime*tweenTime/5})

        TweenMax.from(containerFace, tweenTime/2, {y:stage.canvas.height,ease:Expo.easeOut, alpha:0})
        TweenMax.from(containerTwitter, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/5,ease:Expo.easeOut, alpha:0})
        TweenMax.from(containerInsta, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/4,ease:Expo.easeOut, alpha:0})
        TweenMax.from(squareDivider, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/3,ease:Expo.easeOut, alpha:0})
        TweenMax.from(containerSound, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/2,ease:Expo.easeOut, alpha:0})

        TweenMax.from(triangle, tweenTime/2, {scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(triangleHit, tweenTime/2, {scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(fingerPrint, tweenTime, {ease:Expo.easeOut,delay:tweenTime*tweenTime/2, alpha:0,onComplete:home.addTime()})
        
    }

    function hideElements(){

        console.log("Hide Elements")

        var customEvent = new createjs.Event("killNoise");
        stage.dispatchEvent(customEvent);

        TweenMax.to(containerFace, tweenTime/2, {y:stage.canvas.height,ease:Expo.easeOut, alpha:0})
        TweenMax.to(containerTwitter, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/5,ease:Expo.easeOut, alpha:0})
        TweenMax.to(containerInsta, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/4,ease:Expo.easeOut, alpha:0})
        TweenMax.to(squareDivider, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/3,ease:Expo.easeOut, alpha:0})
        TweenMax.to(containerSound, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/2,ease:Expo.easeOut, alpha:0})

        TweenMax.to(triangle, tweenTime, {scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(triangleHit, tweenTime, {scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.to(fingerPrint, tweenTime/2, {ease:Expo.easeOut,delay:tweenTime*tweenTime/2, alpha:0})
        
    }

    function showElements(){
        
        console.log("Show Elements")

        var customEvent = new createjs.Event("createNoise");
        stage.dispatchEvent(customEvent);

        containerFace.alpha=1
        containerFace.x = Math.floor(margin*ratio)
        containerFace.y = Math.floor(stage.canvas.height-12*ratio-margin*ratio);
        
        containerTwitter.alpha = 1
        containerTwitter.x = Math.floor(containerFace.x+7*ratio+25*ratio);
        containerTwitter.y = Math.floor(stage.canvas.height-11*ratio-margin*ratio);
        
        containerInsta.alpha = 1
        containerInsta.x = Math.floor(containerTwitter.x+15*ratio+20*ratio);
        containerInsta.y = Math.floor(stage.canvas.height-13*ratio-margin*ratio+1*ratio);
        
        squareDivider.alpha = 1
        squareDivider.x = Math.floor(containerInsta.x+13*ratio+25*ratio);
        squareDivider.y = Math.floor(containerInsta.y+6*ratio);

        containerSound.alpha = 1
        containerSound.x = Math.floor(containerInsta.x+13*ratio+25*ratio+40*ratio);
        containerSound.y = Math.floor(containerInsta.y);

        triangle.scaleX=ratio
        triangle.scaleY=ratio
        triangleHit.scaleX=ratio
        triangleHit.scaleY=ratio

        triangle.x = stage.canvas.width
        triangle.y = stage.canvas.height
        triangleHit.x = stage.canvas.width
        triangleHit.y = stage.canvas.height

        fingerPrint.alpha = 1
        fingerPrint.x = Math.floor(stage.canvas.width-25*ratio-30*ratio);
        fingerPrint.y = Math.floor(stage.canvas.height-28*ratio-30*ratio);

        TweenMax.from(containerFace, tweenTime/2, {y:stage.canvas.height,ease:Expo.easeOut, alpha:0})
        TweenMax.from(containerTwitter, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/5,ease:Expo.easeOut, alpha:0})
        TweenMax.from(containerInsta, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/4,ease:Expo.easeOut, alpha:0})
        TweenMax.from(squareDivider, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/3,ease:Expo.easeOut, alpha:0})
        TweenMax.from(containerSound, tweenTime/2, {y:stage.canvas.height,delay:tweenTime*tweenTime/2,ease:Expo.easeOut, alpha:0})

        TweenMax.from(triangle, tweenTime/2, {scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(triangleHit, tweenTime/2, {scaleX:0,scaleY:0,ease:Expo.easeInOut})
        TweenMax.from(fingerPrint, tweenTime, {ease:Expo.easeOut,delay:tweenTime*tweenTime/2, alpha:0})

        
    }

    function addHits(){


        menuHit.name = "menu"
        menuHit.cursor = "pointer";
        menuHit.addEventListener("mouseover", handlerOver);
        menuHit.addEventListener("mouseout", handlerOut);
        menuHit.addEventListener("click", handlerClick);

        squareHitLogo.name = "logo"
        squareHitLogo.cursor = "pointer";
        squareHitLogo.addEventListener("mouseover", handlerOver);
        squareHitLogo.addEventListener("mouseout", handlerOut);
        squareHitLogo.addEventListener("click", handlerClick);

        triangleHit.name = "contact"
        triangleHit.cursor = "pointer";
        triangleHit.addEventListener("mouseover", handlerOver);
        triangleHit.addEventListener("mouseout", handlerOut);
        triangleHit.addEventListener("click", handlerClick);

        viewWorkHit.name = "work"
        viewWorkHit.cursor = "pointer";
        viewWorkHit.addEventListener("mouseover", handlerOver);
        viewWorkHit.addEventListener("mouseout", handlerOut);
        viewWorkHit.addEventListener("click", handlerClick);

        faceHit.name = "face"
        faceHit.cursor = "pointer";
        faceHit.addEventListener("mouseover", handlerOver);
        faceHit.addEventListener("mouseout", handlerOut);
        faceHit.addEventListener("click", handlerClick);

        twitterHit.name = "twitter"
        twitterHit.cursor = "pointer";
        twitterHit.addEventListener("mouseover", handlerOver);
        twitterHit.addEventListener("mouseout", handlerOut);
        twitterHit.addEventListener("click", handlerClick);

        instaHit.name = "insta"
        instaHit.cursor = "pointer";
        instaHit.addEventListener("mouseover", handlerOver);
        instaHit.addEventListener("mouseout", handlerOut);
        instaHit.addEventListener("click", handlerClick);

        soundHit.name = "sound"
        soundHit.cursor = "pointer";
        soundHit.addEventListener("mouseover", handlerOver);
        soundHit.addEventListener("mouseout", handlerOut);
        soundHit.addEventListener("click", handlerClick);
    }

    function handlerOver(event){

        switch(event.target.name){
            case "menu":

                if(menuOpen==false){

                    sounds.textSoundOther();
                    
                    if(contactOpen){

                        if((contact.checkViewForm()==true)){
                            burgerTop.scaleX = 1
                            burgerMed.scaleX = 1
                            burgerbottom.scaleX = 1
                            TweenMax.from(burgerTop, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
                            TweenMax.from(burgerMed, tweenTime/2, {delay:tweenTime/8,scaleX:0,ease:Expo.easeInOut})
                            TweenMax.from(burgerbottom, tweenTime/2, {delay:tweenTime/4,scaleX:0,ease:Expo.easeInOut})
                        }else{
                            burgerTopDark.scaleX = 1
                            burgerMedDark.scaleX = 1
                            burgerbottomDark.scaleX = 1
                            TweenMax.from(burgerTopDark, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
                            TweenMax.from(burgerMedDark, tweenTime/2, {delay:tweenTime/8,scaleX:0,ease:Expo.easeInOut})
                            TweenMax.from(burgerbottomDark, tweenTime/2, {delay:tweenTime/4,scaleX:0,ease:Expo.easeInOut})
                        }

                        
                    }else{
                        burgerTop.scaleX = 1
                        burgerMed.scaleX = 1
                        burgerbottom.scaleX = 1
                        TweenMax.from(burgerTop, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
                        TweenMax.from(burgerMed, tweenTime/2, {delay:tweenTime/8,scaleX:0,ease:Expo.easeInOut})
                        TweenMax.from(burgerbottom, tweenTime/2, {delay:tweenTime/4,scaleX:0,ease:Expo.easeInOut})
                    }
                    
                    if((nav==1)&&(work.viewProject()==false))work.hideDrag();

                }else{
                    sounds.closeSound();
                    menu.overClose();
                }

            break;
             case "work":
                sounds.textSound();
                home.reveal();
            break;
             case "logo":
                if((nav==1)&&(work.viewProject()==false))work.hideDrag();
                sounds.textSoundOther();
                //play logo gif
    
            break;
            case "sticky":
                sounds.textSound();
                TweenMax.to(strokeToSticky, tweenTime/4, {scaleY:0.7,alpha:1,ease:Expo.easeInOut})
                TweenMax.to(stickyText, tweenTime/2, {alpha:1,y:23*ratio+stickyText.getBounds().height*ratio+10*ratio-5*ratio,ease:Expo.easeInOut})
            break;
            case "face":

            if((nav==1)&&(work.viewProject()==false))work.hideDrag();
            
            if(contactOpen){
                if(contact.checkViewForm()==false)TweenMax.to(facebookDark, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
                else TweenMax.to(facebook, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
             }else TweenMax.to(facebook, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
            
            sounds.textSoundOther();

            break;
            case "insta":
            
            if((nav==1)&&(work.viewProject()==false))work.hideDrag();
            sounds.textSoundOther();
            
            if(contactOpen){
                if(contact.checkViewForm()==false)TweenMax.to(instagramDark, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
                else TweenMax.to(instagram, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
            }else TweenMax.to(instagram, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
            
            break;
            case "twitter":
            
            if((nav==1)&&(work.viewProject()==false))work.hideDrag();
            sounds.textSoundOther();
            
            if(contactOpen){
                if(contact.checkViewForm()==false)TweenMax.to(twitterDark, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
                else TweenMax.to(twitter, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
            }else TweenMax.to(twitter, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
            
            break;
            case "sound":
            
            if((nav==1)&&(work.viewProject()==false))work.hideDrag();
            sounds.textSoundOther();

            if(contactOpen){
                if(contact.checkViewForm()==false)TweenMax.to(soundDark, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
                else TweenMax.to(sound, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
            }else TweenMax.to(sound, tweenTime/2, {alpha:.75,ease:Expo.easeInOut})
            
            break;
            case "contact":

                if(contactOpen==false){

                    contactIn = true;

                    if(fingerPrintFx){
                        fingerPrintFx.graphics.clear();
                        instance.removeChild(fingerPrintFx);
                    }

                    fingerPrintFx = new createjs.Shape();
                    fingerPrintFx.regX = 40/2*ratio
                    fingerPrintFx.regY = 40*ratio
                    fingerPrintFx.graphics.beginFill("#95969e").drawRect(0, 0, 40*ratio, 40*ratio);
                    fingerPrintFx.scaleY = 0;
                    fingerPrintFx.x = Math.floor(stage.canvas.width-25*ratio-30*ratio)-5*ratio+40/2*ratio
                    fingerPrintFx.y = Math.floor(stage.canvas.height-28*ratio-30*ratio)-5*ratio+40*ratio

                    instance.addChild(fingerPrintFx);

                     if(fingerPrintMask){
                        instance.removeChild(fingerPrintMask);
                    }

                    fingerPrintMask = svg.createSvg(graphicsData.fingerPrint,"#FFFFFF")
                    fingerPrintMask.x = Math.floor(stage.canvas.width-25*ratio-30*ratio)-5*ratio
                    fingerPrintMask.y = Math.floor(stage.canvas.height-28*ratio-30*ratio)-5*ratio
                    fingerPrintMask.scaleX = 1.3*ratio
                    fingerPrintMask.scaleY = 1.3*ratio

                    fingerPrintFx.mask = fingerPrintMask

                    sounds.closeSound();

                    fingerPrint.alpha=1
                    TweenMax.to(triangle, tweenTime/4, {scaleX:1.1*ratio,scaleY:1.1*ratio,ease:Expo.easeOut});
                    TweenMax.to(fingerPrint, tweenTime/2, {x:Math.floor(stage.canvas.width-25*ratio-30*ratio)-5*ratio,y:Math.floor(stage.canvas.height-28*ratio-30*ratio)-5*ratio,scaleX:1.3*ratio,scaleY:1.3*ratio,alpha:0,ease:Expo.easeInOut});
                    TweenMax.to(fingerPrintFx, tweenTime/4, {delay:tweenTime/4,scaleY:1,ease:Expo.easeOut});

                }else{
                    
                    sounds.closeSound();

                    closeSquareOne.scaleX = 3
                    closeSquareTwo.scaleX = 3
                    closeSquareOne.alpha = 0
                    closeSquareTwo.alpha = 0

                    TweenMax.to(closeSquareOne, tweenTime/4, {tease:Power2.easeInOut, scaleX:1,alpha:1})
                    TweenMax.to(closeSquareTwo, tweenTime/4, {delay:tweenTime/8,ease:Expo.easeInOut, scaleX:1,alpha:1})
                }

            break;
        }
    }

    function handlerOut(event){
        
        switch(event.target.name){
            case "menu":

            if(menuOpen==false){

                if(contactOpen){

                    if((contact.checkViewForm()==true)){
                            burgerTop.scaleX = 1
                            burgerMed.scaleX = 1
                            burgerbottom.scaleX = 1
                            TweenMax.from(burgerTop, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
                            TweenMax.from(burgerMed, tweenTime/2, {delay:tweenTime/8,scaleX:0,ease:Expo.easeInOut})
                            TweenMax.from(burgerbottom, tweenTime/2, {delay:tweenTime/4,scaleX:0,ease:Expo.easeInOut})
                        }else{
                            burgerTopDark.scaleX = 1
                            burgerMedDark.scaleX = 1
                            burgerbottomDark.scaleX = 1
                            TweenMax.from(burgerTopDark, tweenTime/2, {scaleX:0,ease:Expo.easeInOut})
                            TweenMax.from(burgerMedDark, tweenTime/2, {delay:tweenTime/8,scaleX:0,ease:Expo.easeInOut})
                            TweenMax.from(burgerbottomDark, tweenTime/2, {delay:tweenTime/4,scaleX:0,ease:Expo.easeInOut})
                        }
    
                }else{
                    burgerTop.scaleX = 1
                    burgerMed.scaleX = 1
                    burgerbottom.scaleX = 1
                    TweenMax.from(burgerTop, tweenTime/2, {scaleX:0,ease:Expo.easeOut})
                    TweenMax.from(burgerMed, tweenTime, {scaleX:0,ease:Expo.easeOut})
                    TweenMax.from(burgerbottom, tweenTime*2, {scaleX:0,ease:Expo.easeOut})    
                }
                

            }else{
                    menu.outClose();
                }

                if((nav==1)&&(work.viewProject()==false))work.showDrag();

            break;
            case "work":
                home.reset();
            break;
             case "logo":
                 if(work.viewProject()==false)work.showDrag();
                

            break;
            case "sticky":
                TweenMax.to(strokeToSticky, tweenTime/4, {scaleY:1,alpha:0.25,ease:Expo.easeInOut})
                TweenMax.to(stickyText, tweenTime/2, {alpha:0.5,y:23*ratio+stickyText.getBounds().height*ratio+10*ratio,ease:Expo.easeInOut}) 
            break;
            case "face":

                if((nav==1)&&(work.viewProject()==false))work.showDrag();

                if(contactOpen){
                    if(contact.checkViewForm()==false)TweenMax.to(facebookDark, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                    else TweenMax.to(facebook, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                }else TweenMax.to(facebook, tweenTime/2, {alpha:1,ease:Expo.easeInOut})

            break;
            case "insta":
                if((nav==1)&&(work.viewProject()==false))work.showDrag();
                
                if(contactOpen){
                    if(contact.checkViewForm()==false)TweenMax.to(instagramDark, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                    else TweenMax.to(instagram, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                }else TweenMax.to(instagram, tweenTime/2, {alpha:1,ease:Expo.easeInOut})

            break;
            case "twitter":
                if((nav==1)&&(work.viewProject()==false))work.showDrag();
                
                if(contactOpen){
                    if(contact.checkViewForm()==false)TweenMax.to(twitterDark, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                    else TweenMax.to(twitter, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                }else TweenMax.to(twitter, tweenTime/2, {alpha:1,ease:Expo.easeInOut})

            break;
            case "sound":
                if((nav==1)&&(work.viewProject()==false))work.showDrag();
                
                 if(contactOpen){
                    if(contact.checkViewForm()==false)TweenMax.to(soundDark, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                    else TweenMax.to(sound, tweenTime/2, {alpha:1,ease:Expo.easeInOut})
                }else TweenMax.to(sound, tweenTime/2, {alpha:1,ease:Expo.easeInOut})

            break;
            case "contact":
                
               if(contactOpen==false){
                    closeFingerPrint();
                }else{
                    closeSquareOne.scaleX = 2
                    closeSquareTwo.scaleX = 2
                    closeSquareOne.alpha = 0
                    closeSquareTwo.alpha = 0
                    TweenMax.to(closeSquareOne, tweenTime/4, {delay:tweenTime/8,tease:Power2.easeInOut, scaleX:1,alpha:1})
                    TweenMax.to(closeSquareTwo, tweenTime/4, {ease:Expo.easeInOut, scaleX:1,alpha:1})
                }
            
            break;
        }
    }

    function removeMask(){
        if(fingerPrintFx){
            instance.removeChild(fingerPrintFx)
            fingerPrintFx = null
            contactIn = false
        }
    }

    function closeFingerPrint(){
        fingerPrint.alpha=0
        if(fingerPrintFx)TweenMax.to(fingerPrintFx, tweenTime/2, {scaleY:0,ease:Expo.easeOut});
        TweenMax.to(triangle, tweenTime/2, {delay:tweenTime/4,scaleX:1*ratio,scaleY:1*ratio,ease:Expo.easeOut});
        TweenMax.to(fingerPrint, tweenTime/4, {delay:tweenTime/4,x:Math.floor(stage.canvas.width-25*ratio-30*ratio),alpha:1,y:Math.floor(stage.canvas.height-28*ratio-30*ratio),scaleX:1*ratio,scaleY:1*ratio,ease:Expo.easeOut,onComplete:removeMask});
    }

    function handlerClick(event){

        switch(event.target.name){
            case "menu":

                menuHit.removeEventListener("mouseover", handlerOver);
                menuHit.removeEventListener("mouseout", handlerOut);
                menuHit.removeEventListener("click", handlerClick);

                triangleHit.visible = false
                triangleHit.removeEventListener("mouseover", handlerOver);
                triangleHit.removeEventListener("mouseout", handlerOut);
                triangleHit.removeEventListener("click", handlerClick);

                if(menuOpen==false){

                    menuOpen = true
                    sounds.menuOpenSound();
                    menu.openMenu();
                    
                    overlay.cursor = "auto";
                    overlay.addEventListener("mouseover", handlerOver);
                    TweenMax.to(overlay, tweenTime, {ease:Expo.easeOut, alpha:0.8,onComplete:addMenuHit})

                    if(contactOpen==false){
                        
                        //remove
                        viewWorkHit.visible = false
                        viewWorkHit.cursor = "auto";
                        viewWorkHit.removeEventListener("mouseover", handlerOver);
                        viewWorkHit.removeEventListener("mouseout", handlerOut);
                        viewWorkHit.removeEventListener("click", handlerClick);

                        if(stickyHit){
                            stickyHit.cursor = "auto";
                            stickyHit.removeEventListener("mouseover", handlerOver);
                            stickyHit.removeEventListener("mouseout", handlerOut);
                            stickyHit.removeEventListener("click", handlerClick);
                        }
                    }

                }else{
                    sounds.menuCloseSound();
                    menu.killClose();
                    closeMenu();
                    if((nav==1)&&(work.viewProject()==false))work.showDrag();
                }

            break;
            case "logo":

                if(nav!=0){
                    if(stickyHit)removeSticky();
                    if(menuOpen==true)closeMenu();
                    closeContact();
                    backHome();
                }

            break;
            case "work":

                goToMenuWork("viaHome");

            break;
             case "sticky":

                nav=1;
                menu.updateNav(nav);
                removeSticky();
                work.close(instance,"Project");


            break;
            case "face":
                window.open("https://www.facebook.com","_blank");
            break;
            case "insta":
                window.open("https://www.instagram.com","_blank");
            break;
            case "twitter":
                 window.open("https://www.twitter.com","_blank");
                
            break;
             case "sound":
                 sounds.controllerSounds(nav);
            break;
            case "contact":

                gotoMenuTalk();
                if(contactOpen==true)closeFingerPrint();

            break;
        }
    }

    function closeMenu(){

        menuOpen = false
        menu.closeMenu();

        overlay.removeEventListener("mouseover", handlerOver);
        TweenMax.to(overlay, tweenTime/2, {ease:Expo.easeOut, alpha:0,onComplete:addMenuHit});

        
        //add
        if((contactOpen==false)&&(nav==0)){

            viewWorkHit.visible = true
            viewWorkHit.name = "work"
            viewWorkHit.cursor = "pointer";
            viewWorkHit.addEventListener("mouseover", handlerOver);
            viewWorkHit.addEventListener("mouseout", handlerOut);
            viewWorkHit.addEventListener("click", handlerClick);

        }

        if(contactOpen==false){
            if(stickyHit){
                stickyHit.name = "sticky";
                stickyHit.cursor = "pointer";
                stickyHit.addEventListener("mouseover", handlerOver);
                stickyHit.addEventListener("mouseout", handlerOut);
                stickyHit.addEventListener("click", handlerClick);
            }
        }

        triangleHit.visible = true
        triangleHit.name = "contact"
        triangleHit.cursor = "pointer";
        triangleHit.addEventListener("mouseover", handlerOver);
        triangleHit.addEventListener("mouseout", handlerOut);
        triangleHit.addEventListener("click", handlerClick);    

    }

    function goToMenuWork(Ianim){

        sounds.revealSound();

        nav=1;
        menu.updateNav(nav);
        work.open(instance);

        if(stickyHit)removeSticky();
        
        if(Ianim=="viaHome"){
            home.reset();
            work.x=0-stage.canvas.width
            home.x = 0
            TweenMax.to(work, tweenTime*2, {x:0,ease:Expo.easeInOut})
            TweenMax.to(home, tweenTime*2, {delay:0.1,x:0+stage.canvas.width,ease:Power3.easeInOut,onComplete:hideHome})
        }

        if(Ianim=="viaAgency"){
            work.x=0-stage.canvas.width
            agency.x = 0
            TweenMax.to(work, tweenTime*2, {x:0,ease:Expo.easeInOut})
            TweenMax.to(agency, tweenTime*2, {delay:0.1,x:0+stage.canvas.width,ease:Power3.easeInOut})
            agency.close();
        }
        
        var customEvent = new createjs.Event("createNoise");
        stage.dispatchEvent(customEvent);

        viewWorkHit.visible = false
        viewWorkHit.cursor = "auto";
        viewWorkHit.removeEventListener("mouseover", handlerOver);
        viewWorkHit.removeEventListener("mouseout", handlerOut);
        viewWorkHit.removeEventListener("click", handlerClick);
    }

    function gotoMenuTalk(){

            sounds.revealLongSound();

            if(contactOpen==false){

                    contactOpen=true
                    triangleDark.scaleX = ratio;
                    triangleDark.scaleY = ratio;
                    closeSquareOne.alpha = 0;
                    closeSquareTwo.alpha = 0;
                    closeSquareOne.scaleX = 4;
                    closeSquareTwo.scaleX = 4;
                    TweenMax.from(triangleDark, tweenTime/2, {scaleX:0,scaleY:0,ease:Expo.easeInOut})
                    
                    TweenMax.to(closeSquareOne, tweenTime/4, {delay:tweenTime/4,ease:Power2.easeInOut, scaleX:1,alpha:1})
                    TweenMax.to(closeSquareTwo, tweenTime/4, {delay:tweenTime/8,ease:Expo.easeInOut, scaleX:1,alpha:1})

                    timer = setTimeout(addContactHit, 2500);

                    if(work.viewProject()){
                        if(stickyHit)hideSticky();
                        triangleHit.scaleX=ratio
                        triangleHit.scaleY=ratio
                        triangle.x = stage.canvas.width
                        triangle.y = stage.canvas.height
                    }

                    tempNav = nav
                    nav = 3
                    menu.updateNav(nav);
                    contact.open();
                    
                    //remove
                    viewWorkHit.visible = false
                    viewWorkHit.cursor = "auto";
                    viewWorkHit.removeEventListener("mouseover", handlerOver);
                    viewWorkHit.removeEventListener("mouseout", handlerOut);
                    viewWorkHit.removeEventListener("click", handlerClick);

                    logo.visible = false
                    logoDark.visible = true
                    logoDark.alpha = 0
                    TweenMax.to(logoDark, tweenTime, {delay:0.1,ease:Expo.easeOut, alpha:1})

                    facebook.visible = false
                    facebookDark.visible = true
                    facebookDark.alpha = 0,
                    TweenMax.to(facebookDark, tweenTime, {delay:0.2,ease:Expo.easeOut, alpha:1})

                    twitter.visible = false
                    twitterDark.visible = true
                    twitterDark.alpha = 0
                    TweenMax.to(twitterDark, tweenTime, {delay:0.3,ease:Expo.easeOut, alpha:1})

                    instagram.visible = false
                    instagramDark.visible = true
                    TweenMax.to(instagramDark, tweenTime, {delay:0.4,ease:Expo.easeOut, alpha:1})

                    squareDivider.visible = false
                    squareDividerDark.visible = true
                    TweenMax.to(squareDividerDark, tweenTime, {delay:0.5,ease:Expo.easeOut, alpha:1})

                    sound.visible = false
                    soundDark.visible = true
                    soundDark.alpha = 0;
                    TweenMax.to(soundDark, tweenTime, {delay:0.8,ease:Expo.easeOut, alpha:1})

                    burgerbottom.visible = false
                    burgerMed.visible = false
                    burgerTop.visible = false
                    
                    burgerbottomDark.visible = true
                    burgerbottomDark.alpha = 0
                    TweenMax.to(burgerbottomDark, tweenTime, {delay:0.3,ease:Expo.easeOut, alpha:1})

                    burgerMedDark.visible = true
                    burgerMedDark.alpha = 0
                    TweenMax.to(burgerMedDark, tweenTime, {delay:0.2,ease:Expo.easeOut, alpha:1})
                    
                    burgerTopDark.visible = true
                    burgerTopDark.alpha = 0
                    TweenMax.to(burgerTopDark, tweenTime, {delay:0.1,ease:Expo.easeOut, alpha:1})

            }else{

                    if(work.viewProject()){
                        showSticky();
                        triangleHit.scaleX=0
                        triangleHit.scaleY=0
                        triangle.x = stage.canvas.width
                        triangle.y = stage.canvas.height
                    }

                    nav = tempNav
                    menu.updateNav(nav);
                    closeContact();

            }

                triangleHit.removeEventListener("mouseover", handlerOver);
                triangleHit.removeEventListener("mouseout", handlerOut);
                triangleHit.removeEventListener("click", handlerClick);
    }


    function gotoMenuAgency(Ianim){

        //sounds.revealSound();

        nav=2;
        menu.updateNav(nav);
        agency.open();
        
        if(stickyHit)removeSticky();
        
        if(Ianim=="viaHome"){
            agency.x=0+stage.canvas.width
            home.x = 0
            TweenMax.to(agency, tweenTime*2, {x:0,ease:Expo.easeInOut})
            TweenMax.to(home, tweenTime*2, {delay:0.1,x:0-stage.canvas.width,ease:Power3.easeInOut,onComplete:hideHome})
        }

        if(Ianim=="viaWork"){

            work.close(instance,"Home");

            agency.x=0+stage.canvas.width
            work.x = 0
            TweenMax.to(agency, tweenTime*2, {x:0,ease:Expo.easeInOut})
            TweenMax.to(work, tweenTime*2, {delay:0.1,x:0-stage.canvas.width,ease:Power3.easeInOut})
            //showElements();

            var customEvent = new createjs.Event("killNoise");
            stage.dispatchEvent(customEvent);
        }

        viewWorkHit.visible = false
        viewWorkHit.cursor = "auto";
        viewWorkHit.removeEventListener("mouseover", handlerOver);
        viewWorkHit.removeEventListener("mouseout", handlerOut);
        viewWorkHit.removeEventListener("click", handlerClick);

    }


    function closeContact(){

        if(contactOpen==true){
            
            contactOpen=false
            TweenMax.to(triangleDark, tweenTime/2, {scaleX:0,scaleY:0,ease:Expo.easeInOut})
            
            TweenMax.to(closeSquareOne, tweenTime/4, {tease:Expo.easeInOut,scaleX:2})
            TweenMax.to(closeSquareTwo, tweenTime/4, {ease:Expo.easeInOut,scaleX:2})

            contact.close();

            TweenMax.to(closeSquareOne, tweenTime/2, {ease:Expo.easeOut,alpha:0,onComplete:addContactHit})
            TweenMax.to(closeSquareTwo, tweenTime/2, {ease:Expo.easeOut,alpha:0,onComplete:reScale})

            if(nav==0){
                //add
                viewWorkHit.visible = true
                viewWorkHit.cursor = "pointer";
                viewWorkHit.addEventListener("mouseover", handlerOver);
                viewWorkHit.addEventListener("mouseout", handlerOut);
                viewWorkHit.addEventListener("click", handlerClick);

            }else if ((nav==1)&&(work.viewProject())){
                hideElements();
            }

            changeColors();
           
        }
    }

    function reScale(){
        closeSquareOne.scaleX = 1
        closeSquareTwo.scaleX = 1
    }

    function goToMenuWorkHandler(event){

        closeMenu();
        closeContact();

        if(nav==2){
            goToMenuWork("viaAgency");
        }else if(nav==0){
            goToMenuWork("viaHome");
        }else{

            if(tempNav==2){
                goToMenuWork("viaAgency");
            }
            if(tempNav==0){
                goToMenuWork("viaHome");
            }

            nav = 1
            
            menu.updateNav(nav);
        }
    }

    function goToMenuHomeHandler(event){
        closeMenu();
        closeContact();
        if(stickyHit)removeSticky();
        backHome();   
    }

    function goToMenuTalkHandler(event){
        closeMenu()
        gotoMenuTalk();
    }


    function changeColorsHandler(event){
        changeColors()
    }

    function changeColors(){

        console.log("changeColors")

        burgerbottom.visible = true
        burgerMed.visible = true
        burgerTop.visible = true
        logo.visible = true
        facebook.visible = true
        twitter.visible = true
        instagram.visible = true
        squareDivider.visible = true;
        sound.visible = true

        TweenMax.to(burgerbottomDark, tweenTime, {alpha:0,ease:Power3.easeInOut})
        TweenMax.to(burgerMedDark, tweenTime, {alpha:0,ease:Power3.easeInOut})
        TweenMax.to(burgerTopDark, tweenTime, {alpha:0,ease:Power3.easeInOut})
        TweenMax.to(facebookDark, tweenTime, {alpha:0,ease:Power3.easeInOut})
        TweenMax.to(twitterDark, tweenTime, {alpha:0,ease:Power3.easeInOut})
        TweenMax.to(squareDividerDark, tweenTime, {alpha:0,ease:Power3.easeInOut})
        TweenMax.to(instagramDark, tweenTime, {alpha:0,ease:Power3.easeInOut})
        TweenMax.to(soundDark, tweenTime, {alpha:0,ease:Power3.easeInOut})
        TweenMax.to(logoDark, tweenTime, {alpha:0,ease:Power3.easeInOut,onComplete:completeChangeColors})
    }

    function completeChangeColors(){
        burgerbottomDark.visible = false
        burgerMedDark.visible = false
        burgerTopDark.visible = false
        logoDark.visible = false
        facebookDark.visible = false
        twitterDark.visible = false
        instagramDark.visible = false
        squareDividerDark.visible = false;
        soundDark.visible = false
    }

    function goToMenuAgencyHandler(event){

        closeMenu();
        closeContact();

        if(nav==1){
            gotoMenuAgency("viaWork");
        }else if(nav==0){
            gotoMenuAgency("viaHome");
        }else{
            if(tempNav==1){
                gotoMenuAgency("viaWork");
            }
            if(tempNav==0){
                gotoMenuAgency("viaHome");
            }
            nav = 2
            menu.updateNav(nav);
        }
    }

    function addMenuHit(){
        menuHit.name = "menu"
        menuHit.cursor = "pointer";
        menuHit.addEventListener("mouseover", handlerOver);
        menuHit.addEventListener("mouseout", handlerOut);
        menuHit.addEventListener("click", handlerClick);
    }

    function addContactHit(){

        triangleHit.name = "contact"
        triangleHit.cursor = "pointer";
        triangleHit.addEventListener("mouseover", handlerOver);
        triangleHit.addEventListener("mouseout", handlerOut);
        triangleHit.addEventListener("click", handlerClick);
    }

    function returningHomeHandler(event){
        backHome();
    }

    function openStickyHandler(event){
        openSticky();
    }

    function closeStickyHandler(event){
        closeSticky();
    }

    function moreProjectsHandler(event){
        work.loadProjectDataMore(instance);
    }

    function addStickyHandler(event){
        addSticky();
    }

    function addSticky(){

        //stroke top
        strokeToSticky = new createjs.Shape();
        strokeToSticky.graphics.beginFill("#FFFFFF").drawRect(0, 0, 1*ratio, 23*ratio);
        strokeToSticky.alpha = 0.25;
        strokeToSticky.x = Math.floor(stage.canvas.width/2);
        strokeToSticky.y = 0;
        strokeToSticky.visible = true
        instance.addChild(strokeToSticky);

        stickyText = new createjs.Text();
        stickyText.textBaseline = "alphabetic";
        stickyText.font = "14px BebasNeueLight";
        stickyText.color = "#FFFFFF";
        stickyText.text = homepageData.stickyTitle;
        stickyText.alpha = 0.5;
        stickyText.scaleX = ratio;
        stickyText.scaleY = ratio;
        stickyText.x = stage.canvas.width/2-stickyText.getBounds().width/2*ratio
        stickyText.y = 23*ratio+stickyText.getBounds().height*ratio+10*ratio
        instance.addChild(stickyText);

        stickyHit = new createjs.Shape();
        stickyHit.graphics.beginFill("#171820").drawRect(0, 0, 100*ratio, 43*ratio);
        stickyHit.alpha = 0.01;
        stickyHit.x = Math.floor(stage.canvas.width/2-50*ratio);
        stickyHit.y = 23*ratio;
        instance.addChild(stickyHit);

        stickyHit.name = "sticky";
        stickyHit.cursor = "pointer";
        stickyHit.addEventListener("mouseover", handlerOver);
        stickyHit.addEventListener("mouseout", handlerOut);
        stickyHit.addEventListener("click", handlerClick);
    }

    function showSticky(){
        strokeToSticky.visible=true
        stickyText.visible = true
        stickyHit.visible = true
    }

    function hideSticky(){
        strokeToSticky.visible=false
        stickyText.visible = false
        stickyHit.visible = false
    }



    function openSticky(){
        bgSticky = new createjs.Shape();
        bgSticky.graphics.beginFill("#171820").drawRect(0, 0, stage.canvas.width, 80*ratio);
        containerSticky.addChild(bgSticky);
        TweenMax.from(bgSticky, tweenTime, {y:-80*ratio,ease:Power3.easeInOut})
    }

    function closeSticky(){
        TweenMax.to(bgSticky, tweenTime/2, {y:-80*ratio,ease:Power3.easeInOut})
    }

    function removeSticky(){

        instance.removeChild(stickyHit);
        stickyHit.removeEventListener("mouseover", handlerOver);
        stickyHit.removeEventListener("mouseout", handlerOut);
        stickyHit.removeEventListener("click", handlerClick);
        stickyHit = null;

        if(bgSticky){
            TweenMax.to(bgSticky, tweenTime/2, {y:-80*ratio,ease:Power3.easeInOut})
            TweenMax.to(strokeToSticky, tweenTime/4, {scaleY:1,alpha:0.25,ease:Expo.easeOut})
            TweenMax.to(stickyText, tweenTime/2, {alpha:0.5,y:23*ratio+stickyText.getBounds().height*ratio+10*ratio,ease:Expo.easeOut,onComplete:killSticky})
        }else{
            TweenMax.to(strokeToSticky, tweenTime/4, {scaleY:1,alpha:0.25,ease:Expo.easeOut})
            TweenMax.to(stickyText, tweenTime/2, {alpha:0.5,y:23*ratio+stickyText.getBounds().height*ratio+10*ratio,ease:Expo.easeOut,onComplete:killSticky})
        }
    }

    function removeStickyHandler(event){
        removeSticky()
    }

    function killSticky(){

        if(bgSticky){
            bgSticky.graphics.clear();
            containerSticky.removeChild(bgSticky);
            bgSticky = null;
        }
        
        if(strokeToSticky){
            strokeToSticky.graphics.clear();
            instance.removeChild(strokeToSticky);
            strokeToSticky = null;
        }
        
        if(stickyText){
             instance.removeChild(stickyText);
            stickyText = null;
        }

    }

    function backHome(){

        console.log("Return Home");

        sounds.revealSound();

        var customEvent = new createjs.Event("killNoise");
        stage.dispatchEvent(customEvent);

        if(contactIn){
            fingerPrint.alpha=1
            if(fingerPrintFx)TweenMax.to(fingerPrintFx, tweenTime/2, {scaleY:0,ease:Expo.easeOut});
            TweenMax.to(triangle, tweenTime/2, {delay:tweenTime/4,scaleX:1*ratio,scaleY:1*ratio,ease:Expo.easeOut});
            TweenMax.to(fingerPrint, tweenTime/2, {delay:tweenTime/4,x:Math.floor(stage.canvas.width-25*ratio-30*ratio),y:Math.floor(stage.canvas.height-28*ratio-30*ratio),scaleX:1*ratio,scaleY:1*ratio,ease:Expo.easeOut,onComplete:removeMask});
        }

        if(nav==1){

            if(work.viewProject()) {
                work.close(instance,"Project");
            }else{
                work.close(instance,"Home");
            }

            home.x = stage.canvas.width
            TweenMax.to(work, tweenTime*2, {delay:0.1,x:0-stage.canvas.width,ease:Expo.easeInOut})
        }
            
        if(nav==2){
            agency.close();
            home.x = -stage.canvas.width
            TweenMax.to(agency, tweenTime*2, {delay:0.1,x:stage.canvas.width,ease:Expo.easeInOut})
        }
        
        if(nav==3){
            if(tempNav==1){

                if(work.viewProject()) {
                work.close(instance,"Project");
                }else{
                    work.close(instance,"Home");
                }

                home.x = stage.canvas.width
                TweenMax.to(work, tweenTime*2, {delay:0.1,x:0-stage.canvas.width,ease:Expo.easeInOut})
            }

            if(tempNav==2){
                 agency.close();
                home.x = -stage.canvas.width
                TweenMax.to(agency, tweenTime*2, {delay:0.1,x:stage.canvas.width,ease:Expo.easeInOut})
            }
        }

        showHome();
        TweenMax.to(home, tweenTime*2, {x:0,ease:Power3.easeInOut})

        nav=0;
        menu.updateNav(nav);

        //add
        viewWorkHit.visible = true
        viewWorkHit.cursor = "pointer";
        viewWorkHit.addEventListener("mouseover", handlerOver);
        viewWorkHit.addEventListener("mouseout", handlerOut);
        viewWorkHit.addEventListener("click", handlerClick);


}

    function hideHome(){
        home.pauseVideo();
        home.visible=false
    };

    function showHome(){
        home.playVideo();
        home.visible=true
    };

    p.resize = function() {
        

        if(bottomIntroIntro){

            bottomIntroIntro.graphics.clear();
            bottomIntroIntro.graphics.beginFill("#171820").drawRect(0, 0, stage.canvas.width, stage.canvas.height/2);
            bottomIntroIntro.regY = stage.canvas.height/2
            bottomIntroIntro.y = stage.canvas.height
        }

        if(topIntro){
            topIntro.graphics.clear();
            topIntro.graphics.beginFill("#171820").drawRect(0, 0, stage.canvas.width, stage.canvas.height/2);
        }

        if(home){
            if((nav==0)||(tempNav==0)) home.x = 0;
            else if(nav==2) home.x = -stage.canvas.width
            else home.x = stage.canvas.width
            home.resize();
        }

        if(work){
            work.resize();
            if(nav==1) work.x = 0;
            else work.x = -stage.canvas.width
            work.resize();
        }

        if(agency){
            agency.resize();
            if(nav==2) agency.x = 0;
            else agency.x = stage.canvas.width
        }

        if(overlay){
            overlay.graphics.clear();
            overlay.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.width);
        }

        if(menu)menu.resize();

        if(contact)contact.resize();

        if(bgSticky){
            bgSticky.graphics.clear();
            bgSticky.graphics.beginFill("#171820").drawRect(0, 0, stage.canvas.width, 80*ratio);
        }

        if(strokeToSticky){
             strokeToSticky.x = Math.floor(stage.canvas.width/2);
             strokeToSticky.y = 0;
        }

        if(stickyText){
            stickyText.x = stage.canvas.width/2-stickyText.getBounds().width/2*ratio
            stickyText.y = 23*ratio+stickyText.getBounds().height*ratio+10*ratio

            stickyHit.x = Math.floor(stage.canvas.width/2-50*ratio);
            stickyHit.y = 23*ratio;
        }

        if(logo){
            logo.x = Math.floor(margin*ratio);
            logo.y = Math.floor(margin*ratio);
        }

        if(burgerContainer){
            burgerContainer.x = Math.floor(stage.canvas.width-margin*ratio);
            burgerContainer.y = Math.floor(margin*ratio);
        }

        if(containerFace){
            containerFace.x = Math.floor(margin*ratio);
            containerFace.y = Math.floor(stage.canvas.height-12*ratio-margin*ratio);
        }

        if(containerTwitter){
            containerTwitter.x = Math.floor(containerFace.x+7*ratio+25*ratio);
            containerTwitter.y = Math.floor(stage.canvas.height-11*ratio-margin*ratio);
        }

        if(containerInsta){
            containerInsta.x = Math.floor(containerTwitter.x+15*ratio+20*ratio);
            containerInsta.y = Math.floor(stage.canvas.height-13*ratio-margin*ratio+1*ratio);
        }

        if(squareDivider){
            squareDivider.x = Math.floor(containerInsta.x+13*ratio+25*ratio);
            squareDivider.y = Math.floor(containerInsta.y+6*ratio);
            squareDividerDark.x = Math.floor(containerInsta.x+13*ratio+25*ratio);
            squareDividerDark.y = Math.floor(containerInsta.y+6*ratio);
        }

        if(containerSound){
           containerSound.x = Math.floor(containerInsta.x+13*ratio+25*ratio+40*ratio);
            containerSound.y = Math.floor(containerInsta.y);
        }

        if(triangle){
            triangle.x = stage.canvas.width
            triangle.y = stage.canvas.height
            triangleHit.x = stage.canvas.width
            triangleHit.y = stage.canvas.height
            triangleDark.x = stage.canvas.width
            triangleDark.y = stage.canvas.height
            closeSquareOne.x = stage.canvas.width-40*ratio
            closeSquareOne.y = stage.canvas.height-40*ratio
            closeSquareTwo.x = stage.canvas.width-40*ratio
            closeSquareTwo.y = stage.canvas.height-40*ratio
        }

        if(fingerPrint){
            fingerPrint.x = Math.floor(stage.canvas.width-25*ratio-30*ratio);
            fingerPrint.y = Math.floor(stage.canvas.height-28*ratio-30*ratio);
        }

        if(fingerPrintMask){
            fingerPrintMask.x = fingerPrint.x
            fingerPrintMask.y = fingerPrint.y
        }

        if(fingerPrintFx){
            fingerPrintFx.x = fingerPrint.x
            fingerPrintFx.y = fingerPrint.y
        }

        if(menuHit){
            menuHit.x = Math.floor(stage.canvas.width-50*ratio-20*ratio);
            menuHit.y = Math.floor(10*ratio);
        }

        if(loadingTxt){
            loadingTxt.x = Math.floor(stage.canvas.width/2-(loadingTxt.getBounds().width/2)*ratio);
            loadingTxt.y = Math.floor(stage.canvas.height/2-(loadingTxt.getBounds().height/2)*ratio);
        }

        if(viewWorkHit){
            viewWorkHit.x = stage.canvas.width-100*ratio-margin*ratio-10*ratio;
            viewWorkHit.y = stage.canvas.height/2-22*ratio
        }

        if(logoDark){
            logoDark.x = Math.floor(margin*ratio);
            logoDark.y = Math.floor(margin*ratio);
        }


        if(phonesSvg){
             phonesSvg.x = Math.floor(stage.canvas.width/2)-17*ratio;
            phonesSvg.y = Math.floor(stage.canvas.height/2)-70*ratio;
        }
        
    } ;  

window.Main = createjs.promote(Main, "Container");
}());