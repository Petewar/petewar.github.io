(function () {

    function Gallery(IdispatchInstance,Iratio,IaspectRatio,ImagesGallery,IgalleryTitle,IgalleryDesc,IshapeDrag,IposY) {
        this.Container_constructor();
        this.dispatchInstance = IdispatchInstance
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.imagesGallery = ImagesGallery;
        this.galleryTitle = IgalleryTitle;
        this.galleryDesc = IgalleryDesc;
        this.shapeDrag = IshapeDrag;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var dispatchInstance;
    var ratio;
    var aspectRatio;
    var imagesGallery;
    var galleryTitle;
    var galleryDesc;
    var maskWidth;
    var totalWidth;
    var posY;
    
    var offSet;
    var startX;
    var endX;
    var currentPos;
    var oldX;
    var timer;
    var direction;
    var frequency;
    var shapeDrag;
    var totalWidth;
    var nav = 0;

    var p = createjs.extend(Gallery, createjs.Container);

    p.setup = function() {

        instance = this;
        dispatchInstance = this.dispatchInstance;
        ratio = this.ratio
        aspectRatio = this.aspectRatio
        imagesGallery = this.imagesGallery
        galleryTitle = this.galleryTitle
        galleryDesc = this.galleryDesc
        shapeDrag = this.shapeDrag
        posY = this.posY

        addElements();
        addAnimation();
        addDrag();
    };

    function addElements(){

        maskWidth = Math.floor(stage.canvas.width);
        totalWidth = maskWidth*imagesGallery.length

        var bg = new createjs.Shape();
        bg.name = "bg";
        bg.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, 920*ratio);
        bg.y = posY
        instance.addChild(bg);

        var containerGalleryImages = new createjs.Container();
        containerGalleryImages.name = "containerGalleryImages"
        containerGalleryImages.y = posY
        instance.addChild(containerGalleryImages);

        shapeDrag.name = "shapeDrag"
        shapeDrag.x = stage.canvas.width/2-88/2*ratio
        shapeDrag.y = posY+408*ratio+55*ratio
        instance.addChild(shapeDrag);

        for(var i=0;i<imagesGallery.length;i++){

            var containerGalleryImage = new createjs.Container();
            containerGalleryImage.name = "containerGalleryImage"+i
            containerGalleryImage.x = maskWidth*i
            containerGalleryImages.addChild(containerGalleryImage);

            imagesGallery[i].regY = imagesGallery[i].getBounds().height/2

            imagesGallery[i].name = "imagesGallery"+i
            aspectRatio.resize(imagesGallery[i],imagesGallery[i].getBounds().width,imagesGallery[i].getBounds().height,"areaGallery")
            containerGalleryImage.addChild(imagesGallery[i]);

            var maskImage = new createjs.Shape();
            maskImage.name = "maskImage"+i
            maskImage.alpha = 0.01;
            maskImage.graphics.beginFill("#ffffff").drawRect(0, 0, maskWidth, 408*ratio);
            containerGalleryImage.addChild(maskImage);

            imagesGallery[i].mask = maskImage

        }

        var containerTitleDesc = new createjs.Container();
        containerTitleDesc.name = "containerTitleDesc";
        containerTitleDesc.x = stage.canvas.width/2
        containerTitleDesc.y = shapeDrag.y+24*ratio+28*ratio+50*ratio
        instance.addChild(containerTitleDesc);

        var titleGallery = new createjs.Text();
        titleGallery.name = "titleGallery";
        titleGallery.font = "36px BwModelica-ExtraBold";
        titleGallery.textBaseline = "alphabetic";
        titleGallery.textAlign = "center"
        titleGallery.color = "#333333";
        titleGallery.text = galleryTitle[nav];
        titleGallery.scaleX = ratio;
        titleGallery.scaleY = ratio;
        containerTitleDesc.addChild(titleGallery);

        var descGallery = new createjs.Text();
        descGallery.name = "descGallery";
        descGallery.font = "14px BwModelica-Regular";
        descGallery.textBaseline = "alphabetic";
        descGallery.textAlign = "center"
        descGallery.color = "#333333";
        descGallery.lineWidth = stage.canvas.width/2
        descGallery.lineHeight = 30;
        descGallery.y = 20*ratio+50*ratio
        descGallery.text = galleryDesc[nav];
        descGallery.scaleX = ratio;
        descGallery.scaleY = ratio;
        containerTitleDesc.addChild(descGallery);
    }

    function addDrag(){

        offset = new createjs.Point();
        instance.getChildByName("containerGalleryImages").cursor = "move";
        instance.getChildByName("containerGalleryImages").addEventListener("mousedown", startDrag);
        
    }

    function startDrag(event) {

        startX = stage.mouseX
        offset.x = Math.floor(stage.mouseX - instance.getChildByName("containerGalleryImages").x);
        instance.getChildByName("containerGalleryImages").addEventListener("pressmove", doDrag);

    }

    function doDrag(event) {

        endX = stage.mouseX;
        currentPos = Math.floor(event.stageX-offset.x)
        instance.getChildByName("containerGalleryImages").addEventListener("pressup", stopDrag);

        if (stage.mouseX < oldX)direction = 0 
        if (stage.mouseX > oldX) direction = 1

        instance.getChildByName("containerGalleryImages").x = currentPos;

        if(instance.getChildByName("containerGalleryImages").x>0)instance.getChildByName("containerGalleryImages").x=0
        if(Math.floor(Math.abs(instance.getChildByName("containerGalleryImages").x-stage.canvas.width))>totalWidth)instance.getChildByName("containerGalleryImages").x = stage.canvas.width-totalWidth

        oldX = stage.mouseX;
        frequency = Math.abs(startX-endX);
        
    }

    function stopDrag(Ianim){

        TweenMax.to(instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+nav).getChildByName("imagesGallery"+nav), 0.5, {x:0,ease:Expo.easeOut})

        if(frequency>100)frequency = 101;

        if(frequency>100){
            if(direction == 0){
                if(nav<imagesGallery.length){
                    if(Math.floor(Math.abs(instance.getChildByName("containerGalleryImages").x-stage.canvas.width))<totalWidth){
                        nav++ 
                        updateInfo();
                    }
                }
            }else if(direction == 1){
                if(nav>0){
                    nav--
                    updateInfo()
                }
            }
        }
        

        TweenMax.to(instance.getChildByName("containerGalleryImages"), 0.5, {x:(-maskWidth)*nav,ease:Expo.easeOut})

        direction = undefined;
        oldX = undefined;

        instance.getChildByName("containerGalleryImages").removeEventListener("mousedown", startDrag);
        instance.getChildByName("containerGalleryImages").removeEventListener("pressmove", doDrag);
        instance.getChildByName("containerGalleryImages").removeEventListener("pressup", stopDrag);

        addDrag();

        var customEvent = new createjs.Event("goToGalleryPos");
        dispatchInstance.dispatchEvent(customEvent);

    }

    function updateInfo(){
        instance.getChildByName("containerTitleDesc").x = stage.canvas.width/2

        instance.getChildByName("containerTitleDesc").getChildByName("titleGallery").textAlign = "center"
        instance.getChildByName("containerTitleDesc").getChildByName("titleGallery").lineWidth = stage.canvas.width/2
        instance.getChildByName("containerTitleDesc").getChildByName("titleGallery").text = galleryTitle[nav];

        instance.getChildByName("containerTitleDesc").getChildByName("descGallery").textAlign = "center"
        instance.getChildByName("containerTitleDesc").getChildByName("descGallery").lineWidth = stage.canvas.width/2
        instance.getChildByName("containerTitleDesc").getChildByName("descGallery").text = galleryDesc[nav];

        TweenMax.from(instance.getChildByName("containerTitleDesc").getChildByName("titleGallery"), 0.5, {alpha:0,y:instance.getChildByName("containerTitleDesc").getChildByName("titleGallery").y+50*ratio,ease:Expo.easeOut})
        TweenMax.from(instance.getChildByName("containerTitleDesc").getChildByName("descGallery"),1, {alpha:0,y:instance.getChildByName("containerTitleDesc").getChildByName("descGallery").y+50*ratio,ease:Expo.easeOut})
    }

    function addAnimation(){

    }

    function addHits(){


    }


    p.kill = function() {
        
        if(instance.getChildByName("containerGalleryImages").hasEventListener("mousedown", startDrag))instance.getChildByName("containerGalleryImages").removeEventListener("mousedown", startDrag);
        if(instance.getChildByName("containerGalleryImages").hasEventListener("pressmove", doDrag))instance.getChildByName("containerGalleryImages").removeEventListener("pressmove", doDrag);
        if(instance.getChildByName("containerGalleryImages").hasEventListener("pressup", stopDrag))instance.getChildByName("containerGalleryImages").removeEventListener("pressup", stopDrag);

        for(var i=0;i<imagesGallery.length;i++){

            instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+i).removeChild(instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+i).getChildByName("maskImage"+i))
            instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+i).removeChild(instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+i).getChildByName("imagesGallery"+i))
            instance.getChildByName("containerGalleryImages").removeChild(instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+i))
        }

        instance.getChildByName("containerTitleDesc").removeChild(instance.getChildByName("containerTitleDesc").getChildByName("descGallery"))
        instance.getChildByName("containerTitleDesc").removeChild(instance.getChildByName("containerTitleDesc").getChildByName("titleGallery"))

        instance.removeChild(instance.getChildByName("containerTitleDesc"))
        instance.removeChild(instance.getChildByName("containerGalleryImages"))
        instance.removeChild(instance.getChildByName("bg"))
        instance.removeChild(instance.getChildByName("shapeDrag"))
        
        
    } ; 

    p.getHeight = function() {

        return 920*ratio;        
    }

    p.resize = function() {

         maskWidth = Math.floor(stage.canvas.width);
         totalWidth = maskWidth*imagesGallery.length

         instance.getChildByName("bg").graphics.clear();
         instance.getChildByName("bg").graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width, 920*ratio);

         for(var i=0;i<imagesGallery.length;i++){

            aspectRatio.resize(imagesGallery[i],imagesGallery[i].getBounds().width,imagesGallery[i].getBounds().height,"areaGallery")

            instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+i).x = maskWidth*i
            instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+i).getChildByName("maskImage"+i).graphics.clear();
            instance.getChildByName("containerGalleryImages").getChildByName("containerGalleryImage"+i).getChildByName("maskImage"+i).graphics.beginFill("#ffffff").drawRect(0, 0, maskWidth, 408*ratio);

        }

        instance.getChildByName("shapeDrag").x = stage.canvas.width/2-88/2*ratio
        instance.getChildByName("containerTitleDesc").x = stage.canvas.width/2
        instance.getChildByName("containerTitleDesc").getChildByName("descGallery").lineWidth = stage.canvas.width/2

        nav=0
        instance.getChildByName("containerGalleryImages").x = (-maskWidth)*nav
        
    } ; 


window.Gallery = createjs.promote(Gallery, "Container");
}());