(function () {

    function News(IinstanceDispatch,Iratio,IAspectRatio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.instanceDispatch = IinstanceDispatch;
        this.aspectRatio = IAspectRatio;
        this.setup();

    }
    
    var ratio;
    var instance;
    var instanceDispatch;
    var aspectRatio;

    var fullDrag;
    var dateField;
    var line;
    var titleField;
    var button;
    var buttonShape;
    var buttonShapeWhite;
    var buttonShape2;
    var buttonShapeWhite2;

    var dateNews = [];
    var titleNews = [];
    var imageFiles = [];
    var videosFiles = [];
    var contentNews = [];
    var contentGallery = [];

    var imagesLoaded;

    var titleField;
    var margin = 50
    var nav = 0;

    var arrowShapeLeft = "M11.025,18.599 L9.665,20.001 L1.324,11.402 L-0.036,10.000 L1.324,8.598 L9.665,-0.001 L11.025,1.401 L2.684,10.000 L11.025,18.599 Z";
    var arrowShapeRight = "M-0.025,18.599 L1.335,20.001 L9.676,11.402 L11.036,10.000 L9.676,8.598 L1.335,-0.001 L-0.025,1.401 L8.316,10.000 L-0.025,18.599 Z";
    
    var arrowRight;
    var arrowLeft;

    var arrowLeftColor;
    var arrowRightColor;
    var totalNews;
    var containerCircleNav;
    var gallery;
    var buttonShapeGallery

    var p = createjs.extend(News, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceDispatch = this.instanceDispatch;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;

        var preload = new createjs.LoadQueue(true);
        preload.on("fileload", handleFileLoaded);
        preload.on("error", handleError);
        preload.loadFile("data/news.json", true);
    }

    function handleFileLoaded(event) {
        totalNews = event.result.news.length;
        var item = event.result.news;

        for(var i=0;i<totalNews;i++){
            dateNews.push(item[i].date);
            titleNews.push(item[i].title);
            imageFiles.push(item[i].image);
            videosFiles.push(item[i].video);
            contentNews.push(item[i].content);
            contentGallery.push(item[i].gallery);
        }

        createFullDrag(dateNews,titleNews,imageFiles,videosFiles,contentNews);

    }

    function handleError(event) {
        
    }

    function createFullDrag(){
        fullDrag = new FullDrag(instance,ratio,aspectRatio,videosFiles,imageFiles,true);
        fullDrag.cursor = "move"
        instance.addEventListener("fullDragLoadComplete", fullDragLoadCompleteHandler);
        instance.addEventListener("Dragging", draggingPosHandler);
        instance.addEventListener("DraggingStop", DraggingStopPosHandler);
        instance.addChild(fullDrag);
    }

    function fullDragLoadCompleteHandler(event){
        imagesLoaded = event.contentLoaded;
        createBoxNews();
        animBoxNews()
    }
    
    function draggingPosHandler(event){
        dateField.x = 200*ratio-event.posX/2.5;
        titleField.x = 200*ratio-event.posX/2;
        button.x = 200*ratio-event.posX;
    }

    function DraggingStopPosHandler(event){

        dateField.text = dateNews[event.nav];
        titleField.text = titleNews[event.nav];
        navigateHandler(event.nav);
            
        createjs.Tween.get(dateField).to({x:200*ratio,alpha:1}, 600, createjs.Ease.circInOut)
        createjs.Tween.get(line).to({x:200*ratio}, 600, createjs.Ease.circInOut)
        createjs.Tween.get(titleField).to({x:200*ratio}, 600, createjs.Ease.circInOut)
        createjs.Tween.get(button).to({x:200*ratio}, 600, createjs.Ease.circInOut)

        dateField.y = stage.canvas.height/2-150*ratio;
        line.y = dateField.y+dateField.getBounds().height*ratio+margin/4*ratio;
        titleField.y = line.y+margin/2*ratio;
        button.y = titleField.y+titleField.getBounds().height*ratio+margin*ratio
        
    }

    function createBoxNews(){

        dateField = new createjs.Text();
        dateField.font = "bold 12px PT Sans";
        dateField.color = "#FFFFFF";
        dateField.text = dateNews[nav];
        dateField.scaleX = ratio;
        dateField.scaleY = ratio;
        dateField.x = 200*ratio;
        dateField.y = stage.canvas.height/2-150*ratio;
        dateField.alpha = 0.75;
        instance.addChild(dateField);

        line = new createjs.Shape();
        line.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width/2-100*ratio,1*ratio);
        line.x = 200*ratio;
        line.y = dateField.y+dateField.getBounds().height*ratio+margin/4*ratio;
        line.alpha = 0.5;
        instance.addChild(line);

        titleField = new createjs.Text();
        titleField.font = "bold 72px PT Serif";
        titleField.color = "#FFFFFF";
        titleField.lineHeight = 75;
        titleField.lineWidth = (stage.canvas.width/2)/ratio;
        titleField.scaleX = ratio;
        titleField.scaleY = ratio;
        titleField.text = titleNews[nav];
        titleField.x = 200*ratio;
        titleField.y = line.y+margin/2*ratio;
        instance.addChild(titleField);

        button = new createjs.Container();
        button.x = 200*ratio;
        button.y = titleField.y+titleField.getBounds().height*ratio+margin*ratio
        instance.addChild(button)

        buttonShape = new createjs.Shape();
        buttonShape.graphics.beginFill("#143483").drawRect(0, 0, 50*ratio,50*ratio);
        button.addChild(buttonShape);

        buttonShapeWhite = new createjs.Shape();
        buttonShapeWhite.scaleX = 0;
        buttonShapeWhite.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,50*ratio);
        button.addChild(buttonShapeWhite);

        buttonShape2 = new createjs.Shape();
        buttonShape2.graphics.beginFill("#143483").drawRect(0, 0, 50*ratio,50*ratio);
        buttonShape2.x = 50*ratio+5*ratio;
        button.addChild(buttonShape2);

        buttonShapeWhite2 = new createjs.Shape();
        buttonShapeWhite2.scaleX = 0;
        buttonShapeWhite2.x = 50*ratio+5*ratio;
        buttonShapeWhite2.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,50*ratio);
        button.addChild(buttonShapeWhite2);

        buttonShape.cursor = "pointer"
        buttonShape.state = "previous";
        buttonShape.addEventListener("mouseover", handlerOverNavigation);
        buttonShape.addEventListener("mouseout", handlerOutNavigation);
        buttonShape.addEventListener("click", handlerClickNavigation);

        buttonShape2.cursor = "pointer"
        buttonShape2.state = "next";
        buttonShape2.addEventListener("mouseover", handlerOverNavigation);
        buttonShape2.addEventListener("mouseout", handlerOutNavigation);
        buttonShape2.addEventListener("click", handlerClickNavigation);

        arrowRight = createSvg(arrowShapeRight,"#FFFFFF");
        arrowRight.x = buttonShape2.x+20*ratio
        arrowRight.y = 15*ratio
        button.addChild(arrowRight);

        arrowRightColor = createSvg(arrowShapeRight,"#143483");
        arrowRightColor.x = buttonShape2.x+20*ratio
        arrowRightColor.y = 15*ratio
        arrowRightColor.visible = false;
        button.addChild(arrowRightColor);

        arrowLeft = createSvg(arrowShapeLeft,"#FFFFFF");
        arrowLeft.x = 20*ratio
        arrowLeft.y = 15*ratio
        button.addChild(arrowLeft);

        arrowLeftColor = createSvg(arrowShapeLeft,"#143483");
        arrowLeftColor.x = 20*ratio
        arrowLeftColor.y = 15*ratio
        arrowLeftColor.visible = false;
        button.addChild(arrowLeftColor);

        containerCircleNav = new createjs.Container();
        instance.addChild(containerCircleNav);

        for (var i=0;i<totalNews;i++){

            var circle = new createjs.Shape();
            circle.instance = i;
            circle.name = "circleNav"+i;
            circle.graphics.beginFill("#FFFFFF").drawCircle(0,0,10*ratio);
            circle.x = i*(20*ratio+10*ratio);
            containerCircleNav.addChild(circle);
            
            circle.cursor = "pointer"
            circle.addEventListener("mouseover", handlerOverNavigationCircles);
            circle.addEventListener("mouseout", handlerOutNavigationCircles);
            circle.addEventListener("click", handlerClickNavigationCircles);

            var circleBlue = new createjs.Shape();
            circleBlue.name = "circleBlue"+i;
            circleBlue.graphics.beginFill("#143483").drawCircle(0,0,5*ratio);
            circleBlue.x = i*(20*ratio+10*ratio);
            containerCircleNav.addChild(circleBlue);

            if(nav==i)circleBlue.visible = true
            else circleBlue.visible = false
           
        }

        containerCircleNav.x = stage.canvas.width/2-(totalNews*(20*ratio))/2
        containerCircleNav.y = stage.canvas.height-50*ratio

        buttonShapeGallery = new createjs.Shape();
        buttonShapeGallery.graphics.beginFill("#1E94B8").drawRect(0, 75*ratio, 50*ratio,50*ratio);
        button.addChild(buttonShapeGallery);

        buttonShapeGalleryWhite = new createjs.Shape();
        buttonShapeGalleryWhite.graphics.beginFill("#FFFFFF").drawRect(0, 75*ratio, 50*ratio,50*ratio);
        buttonShapeGalleryWhite.visible = false;
        button.addChild(buttonShapeGalleryWhite);

        buttonShapeGallery.cursor = "pointer"
        buttonShapeGallery.addEventListener("mouseover", handlerOverGallery);
        buttonShapeGallery.addEventListener("mouseout", handlerOutGallery);
        buttonShapeGallery.addEventListener("click", handlerClickGallery);

        gallery = createSvg("M29.000,20.000 L29.000,18.000 L30.000,18.000 L30.000,2.000 L6.000,2.000 L6.000,3.000 L4.000,3.000 L4.000,-0.000 L32.000,-0.000 L32.000,20.000 L29.000,20.000 ZM28.000,24.000 L25.000,24.000 L25.000,22.000 L26.000,22.000 L26.000,6.000 L4.000,6.000 L4.000,7.000 L2.000,7.000 L2.000,4.000 L28.000,4.000 L28.000,24.000 ZM24.000,25.000 L0.000,25.000 L0.000,8.000 L24.000,8.000 L24.000,25.000 ZM22.000,10.000 L2.000,10.000 L2.000,23.022 L22.000,23.022 L22.000,10.000 ZM8.358,15.970 L11.291,19.304 L15.562,14.000 L20.445,22.000 L3.445,22.000 L8.303,15.812 L8.358,15.970 ZM5.000,14.500 C4.172,14.500 3.500,13.828 3.500,13.000 C3.500,12.172 4.172,11.500 5.000,11.500 C5.828,11.500 6.500,12.172 6.500,13.000 C6.500,13.828 5.828,14.500 5.000,14.500 Z","#FFFFFF");
        gallery.x = 9*ratio
        gallery.y = 75*ratio+13*ratio
        button.addChild(gallery);

        galleryBlue = createSvg("M29.000,20.000 L29.000,18.000 L30.000,18.000 L30.000,2.000 L6.000,2.000 L6.000,3.000 L4.000,3.000 L4.000,-0.000 L32.000,-0.000 L32.000,20.000 L29.000,20.000 ZM28.000,24.000 L25.000,24.000 L25.000,22.000 L26.000,22.000 L26.000,6.000 L4.000,6.000 L4.000,7.000 L2.000,7.000 L2.000,4.000 L28.000,4.000 L28.000,24.000 ZM24.000,25.000 L0.000,25.000 L0.000,8.000 L24.000,8.000 L24.000,25.000 ZM22.000,10.000 L2.000,10.000 L2.000,23.022 L22.000,23.022 L22.000,10.000 ZM8.358,15.970 L11.291,19.304 L15.562,14.000 L20.445,22.000 L3.445,22.000 L8.303,15.812 L8.358,15.970 ZM5.000,14.500 C4.172,14.500 3.500,13.828 3.500,13.000 C3.500,12.172 4.172,11.500 5.000,11.500 C5.828,11.500 6.500,12.172 6.500,13.000 C6.500,13.828 5.828,14.500 5.000,14.500 Z","#1E94B8");
        galleryBlue.x = 9*ratio;
        galleryBlue.y = 75*ratio+13*ratio;
        button.addChild(galleryBlue);

        buttonShapeGallery.visible = false;
        buttonShapeGalleryWhite.visible = false;
        gallery.visible = false;
        galleryBlue.visible = false;
    }

    function createSvg(Isvg,Icolor){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        svg.scaleX = ratio;
        svg.scaleY = ratio;
        return svg;
    }
    
    function navigateHandler(INav){

         containerCircleNav.getChildByName("circleBlue"+nav).visible = false
         nav = INav
         containerCircleNav.getChildByName("circleBlue"+nav).visible = true
         containerCircleNav.getChildByName("circleBlue"+nav).alpha = 1

        if(nav==1){
            buttonShapeGallery.visible = true;
            gallery.visible = true;
        }else{
            buttonShapeGallery.visible = false;
            gallery.visible = false;
        }

        if(nav==2){
            line.visible = false;
            button.visible = false;
        }else{
            line.visible = true;
            button.visible = true;
        }

    }

    function handlerOverNavigation(event){

        if(event.target.state=="next"){
            buttonShapeWhite2.scaleX = 0;
            arrowRightColor.visible = true;
            createjs.Tween.get(buttonShapeWhite2).to({scaleX:1}, 200, createjs.Ease.circInOut)
        }else{
            buttonShapeWhite.scaleX = 0;
            arrowLeftColor.visible = true;
            createjs.Tween.get(buttonShapeWhite).to({scaleX:1}, 200, createjs.Ease.circInOut)
        }
    }

    function handlerOutNavigation(event){
        if(event.target.state=="next"){
            arrowRightColor.visible = false;
            createjs.Tween.get(buttonShapeWhite2).to({scaleX:0}, 200, createjs.Ease.circInOut)
        }else{
            arrowLeftColor.visible = false;
            createjs.Tween.get(buttonShapeWhite).to({scaleX:0}, 200, createjs.Ease.circInOut)
        }
    }

    function handlerClickNavigation(event){
        
        if(event.target.state=="next"){
           fullDrag.navigateFrom("down")
        }else{
           fullDrag.navigateFrom("up")
        }
    }

    function handlerOutGallery(event){

        galleryBlue.visible = false;
        createjs.Tween.get(buttonShapeGalleryWhite).to({scaleX:0}, 200, createjs.Ease.circInOut)
       
    }

    function handlerOverGallery(event){

        galleryBlue.visible = true;
        buttonShapeGalleryWhite.visible = true
        buttonShapeGalleryWhite.scaleX = 0;
        createjs.Tween.get(buttonShapeGalleryWhite).to({scaleX:1}, 200, createjs.Ease.circInOut)

    }

    function handlerClickGallery(event){
        
        var customEvent = new createjs.Event("openOverlayNews");
        customEvent.titleN = titleNews[nav]
        customEvent.contentN = contentNews[nav]
        customEvent.dateN = dateNews[nav]
        customEvent.galleryN = contentGallery[nav]
        instanceDispatch.dispatchEvent(customEvent);
    }

    function handlerOverNavigationCircles(event){
        if(event.target.instance!=nav){
            containerCircleNav.getChildByName("circleBlue"+event.target.instance).visible = true
            containerCircleNav.getChildByName("circleBlue"+event.target.instance).alpha = 0.5
        }
    }

    function handlerOutNavigationCircles(event){
        if(event.target.instance!=nav){
            containerCircleNav.getChildByName("circleBlue"+event.target.instance).visible = false
            containerCircleNav.getChildByName("circleBlue"+event.target.instance).alpha = 1
        }
    }

    function handlerClickNavigationCircles(event){
        if(event.target.instance!=nav){
            var position;
            if(event.target.instance>nav){
                 position = "more";     
            }else{
                position = "less";     
            }
           
            containerCircleNav.getChildByName("circleBlue"+nav).visible = false
            nav = event.target.instance
            containerCircleNav.getChildByName("circleBlue"+event.target.instance).visible = true
            containerCircleNav.getChildByName("circleBlue"+event.target.instance).alpha = 1
            fullDrag.navigateTo(nav,200,position)
        }
    }

    function animBoxNews(){

        var from = 50;

        dateField.alpha = 0;
        dateField.y += from*ratio;
        line.scaleX = 0;
        titleField.alpha = 0;
        titleField.y += from*ratio;
        button.alpha = 0;
        button.y += from*ratio;
        containerCircleNav.alpha = 0;
        containerCircleNav.y += from*ratio;

        createjs.Tween.get(dateField)
        .wait(200)
        .to({alpha:1,y:dateField.y-from*ratio}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(line)
        .wait(400)
        .to({scaleX:1}, 800, createjs.Ease.circInOut)

        createjs.Tween.get(titleField)
        .wait(600)
        .to({alpha:1,y:titleField.y-from*ratio}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(button)
        .wait(800)
        .to({alpha:1,y:button.y-from*ratio}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(button)
        .wait(800)
        .to({alpha:1,y:button.y-from*ratio}, 400, createjs.Ease.circInOut)

        createjs.Tween.get(containerCircleNav)
        .wait(800)
        .to({alpha:1,y:containerCircleNav.y-from*ratio}, 400, createjs.Ease.circInOut)

   }
    
    
    p.resize = function() {
        
        if(dateField){
            dateField.x = 200*ratio;
            dateField.y = stage.canvas.height/2-150*ratio;
        }

        if(line){
        line.graphics.clear();
        line.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width/2,1*ratio);
        line.x = 200*ratio;
        line.y = dateField.y+dateField.getBounds().height*ratio+margin/4*ratio;
        }

        if(titleField){
            titleField.lineWidth = (stage.canvas.width/2)/ratio;
            titleField.x = 200*ratio;
            titleField.y = line.y+margin/2*ratio;    
        }
        
        if(button){
            button.x = 200*ratio;
         button.y = titleField.y+titleField.getBounds().height*ratio+margin*ratio
        }
        
        if(containerCircleNav){
            containerCircleNav.x = stage.canvas.width/2-(totalNews*(20*ratio))/2
            containerCircleNav.y = stage.canvas.height-50*ratio
        }
        

        if(fullDrag)fullDrag.resize();

    } ;  

window.News = createjs.promote(News, "Container");
}());