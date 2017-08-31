(function () {

    function Home(IinstanceDispatch,Iratio,IAspectRatio,Iassets) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.instanceDispatch = IinstanceDispatch;
        this.aspectRatio = IAspectRatio;
        this.assests = Iassets;
        this.setup();

    }
    
    var ratio;
    var instance;
    var instanceDispatch;
    var aspectRatio;

    var newsBlock;
    var aboutBlock;
    var servicesBlock;
    var contactBlock;
    var footerBlock;

    var wireframe;
    var assets;

    var p = createjs.extend(Home, createjs.Container);

    p.setup = function() {
        
        instance = this;
        instanceDispatch = this.instanceDispatch;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        wireframe = [0,0,0,0,0]
        assets = this.assests;
        pawn = this.pawn
        instance.addEventListener("servicesNavPosition",handlerDispatch);
        instance.addEventListener("openOverlayNews",handlerOpenOverlayNews);
        instance.addEventListener("openOverlayCredits",handlerOpenOverlayCredits);

        createBlocks();

   }

   function createBlocks(){

        newsBlock = new News(instance,ratio,aspectRatio);
        instance.addChild(newsBlock);

        aboutBlock = new About(ratio);
        aboutBlock.y = stage.canvas.height-1*ratio;
        instance.addChild(aboutBlock);
        wireframe[0] = aboutBlock.getHeight();

        var servicesAssets = assets.splice(0, 5);
        var officesAssets = assets.splice(0, 3);

        servicesBlock = new Services(ratio,instance,servicesAssets,aspectRatio);
        servicesBlock.y = aboutBlock.y+wireframe[0]-1*ratio;
        instance.addChild(servicesBlock);
        wireframe[1] = servicesBlock.getHeight();

        officesBlock = new Offices(ratio,officesAssets,aspectRatio);
        officesBlock.y = servicesBlock.y+wireframe[1]-1*ratio;
        instance.addChild(officesBlock);
        wireframe[2] = officesBlock.getHeight();

        contactBlock = new Contact(ratio,assets,aspectRatio);
        contactBlock.y = officesBlock.y+wireframe[2]-1*ratio;
        instance.addChild(contactBlock);
        wireframe[3] = contactBlock.getHeight();

        footerBlock = new Footer(ratio,instance);
        footerBlock.y = contactBlock.y+wireframe[3]-1*ratio;
        instance.addChild(footerBlock);
        wireframe[4] = footerBlock.getHeight();

   }

   function handlerOpenOverlayNews(event){
        var customEvent = new createjs.Event("openOverlay");
        customEvent.titleN = event.titleN
        customEvent.contentN = event.contentN
        customEvent.dateN = event.dateN
        customEvent.galleryN = event.galleryN
        instanceDispatch.dispatchEvent(customEvent);
   }

   function handlerOpenOverlayCredits(event){
        var customEvent = new createjs.Event("openOverlay");
        instanceDispatch.dispatchEvent(customEvent);
   }

    function handlerDispatch(event){
        
        wireframe[1] = servicesBlock.getHeight();
        officesBlock.y = servicesBlock.y+wireframe[1]-1*ratio;;
        
        wireframe[2] = officesBlock.getHeight();
        contactBlock.y = officesBlock.y+wireframe[2]-1*ratio;;
        
        wireframe[3] = contactBlock.getHeight();
        contactBlock.y = officesBlock.y+wireframe[2]-1*ratio;

        wireframe[4] = footerBlock.getHeight();
        footerBlock.y = contactBlock.y+wireframe[3]-1*ratio;

        var customEvent = new createjs.Event("changeToBlockScroll");
        customEvent.yPos = event.yPos;
        instanceDispatch.dispatchEvent(customEvent);

    }

    p.getWireframe = function() {
        return wireframe;
    }

    p.resize = function() {

        newsBlock.resize();

        aboutBlock.y = stage.canvas.height-1*ratio;;
        aboutBlock.resize();
        wireframe[0] = aboutBlock.getHeight();

        servicesBlock.y = aboutBlock.y+wireframe[0]-1*ratio;;
        servicesBlock.resize();
        wireframe[1] = servicesBlock.getHeight();

        officesBlock.y = servicesBlock.y+wireframe[1]-1*ratio;;
        officesBlock.resize();
        wireframe[2] = officesBlock.getHeight();

        contactBlock.y = officesBlock.y+wireframe[2]-1*ratio;;
        contactBlock.resize();
        wireframe[3] = contactBlock.getHeight();

        footerBlock.y = contactBlock.y+wireframe[3]-1*ratio;
        footerBlock.resize();
        wireframe[4] = footerBlock.getHeight();

        /*
        bgFooter.graphics.clear();
        bgFooter.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width,wireFrame[4]*ratio);
        bgFooter.y = stage.canvas.height+wireFrame[0]*ratio+wireFrame[1]*ratio+wireFrame[2]*ratio+wireFrame[3]*ratio*/

    } ;  

window.Home = createjs.promote(Home, "Container");
}());