(function () {

    function Grid(Iratio,IaspectRatio,Images,Idata) {
        this.Container_constructor();
        this.ratio = Iratio;
        this.aspectRatio = IaspectRatio;
        this.images = Images;
        this.data = Idata;
        this.setup();
    }
    
    var instance;
    var ratio;
    var aspectRatio;
    var images;
    
    //containers
    var containerImages;

    //navigation
    var nav;
    var gridNum = 5;
    var gridWidth;
    var timer;
    var overlayFill;
    var multiplyRightFill;
    var multiplyLeftFill;
    var data;

    var p = createjs.extend(Grid, createjs.Container);

    p.setup = function() {

        console.log("New Grid: ");

        instance = this;
        ratio = this.ratio;
        data = this.data;
        aspectRatio = this.aspectRatio;
        images = this.images.contentLoader;
        
        containerImages = new createjs.Container()
        instance.addChild(containerImages);

        addImages();
        addStrokeGrid();
        addHitGrid()
        timer = setTimeout(addHits, 3500);
    };

    function addHits(){
        for(var k=0;k<images.length;k++){

        instance.getChildByName("hit"+k).cursor = "pointer";
        instance.getChildByName("hit"+k).addEventListener("mouseover", handlerOver);
        instance.getChildByName("hit"+k).addEventListener("mouseout", handlerOut);
        instance.getChildByName("hit"+k).addEventListener("click", handlerClick);
    }

    }
    function addImages(){

        for(var i=0;i<images.length;i++){
            images[i].regX = 1920/2
            images[i].regY = 1080/2
            containerImages.addChild(images[i]);
            if(i==0){
                images[i].alpha = 0
                images[i].visible = true
                TweenMax.to(images[i], 5, {alpha:1,ease:Power4.easeInOut})
            }
            else images[i].visible = false
        }

       resizeImages();
       
    }

    function resizeImages(){
        aspectRatio.resize(containerImages,1920,1080,"more",10*ratio);
        containerImages.x = stage.canvas.width/2
        containerImages.y = stage.canvas.height/2
    }

    function addStrokeGrid(){

        gridWidth = Math.floor(stage.canvas.width/gridNum);

        for(var i=0;i<gridNum;i++){
            var strokeVertical = new createjs.Shape();
            if(i==0) strokeVertical.visible = false;
            strokeVertical.name = "strokeVertical"+i;
            strokeVertical.alpha = 0.1;
            strokeVertical.x = gridWidth*i;
            strokeVertical.graphics.beginFill("#FFFFFF").drawRect(0, 0, 1*ratio, stage.canvas.height);
            TweenMax.from(strokeVertical, 1*i, {scaleY:0,ease:Power4.easeInOut})
            instance.addChild(strokeVertical);
        }

    }

    function resizeStrokeGrid(){

        gridWidth = Math.floor(stage.canvas.width/gridNum);

        for(var i=0;i<gridNum;i++){
            instance.getChildByName("strokeVertical"+i).graphics.clear();
            instance.getChildByName("strokeVertical"+i).graphics.beginFill("#FFFFFF").drawRect(0, 0, 1*ratio, stage.canvas.height);
            instance.getChildByName("strokeVertical"+i).x = gridWidth*i;
        }

    }

    function addHitGrid(){
        
        var j=0

        for(var i=0;i<gridNum*2;i++){
            
            var hit = new createjs.Shape();
            hit.instance = i;
            hit.name = "hit"+i;
            hit.graphics.beginFill("#FFFFFF").drawRect(0, 0, gridWidth, stage.canvas.height/2);
            hit.alpha = 0.01

            var fill = new createjs.Shape();
            fill.name = "fill"+i;
            fill.graphics.beginFill("#FFFFFF").drawRect(0, 0, gridWidth, stage.canvas.height/2);
            fill.visible = false;

            var numText = new createjs.Text();
            numText.name = "numText"+i
            numText.font = "12px BebasNeueBook";
            numText.textBaseline = "alphabetic";
            numText.color = "#ffffff";

            if(i>9)numText.text = i
            else {
                if(i==0)numText.visible=false
                numText.text = "0"+(i)
            }

            numText.scaleX = ratio;
            numText.scaleY = ratio;
            
           if(i>=gridNum){
                if(i==gridNum)j=0
                hit.x = gridWidth*j;
                hit.y = stage.canvas.height/2;
                j++
            }else{
                hit.x = gridWidth*j;
                hit.y = 0;
                j++
            }

            fill.x = hit.x
            fill.y = hit.y

            numText.x = hit.x+60*ratio;
            numText.y = hit.y+numText.getBounds().height*ratio+100*ratio;
            numText.alpha = 0;
            TweenMax.to(numText, 0.5*i, {alpha:1,ease:Power4.easeInOut})
            
            instance.addChild(fill)
            instance.addChild(numText)
            instance.addChild(hit)

        }

        for(var k=0;k<images.length;k++){

            var stroke = new createjs.Shape();
            stroke.name = "stroke"+k;
            stroke.graphics.beginFill("#FFFFFF").drawRect(0, 0, 20*ratio, 1*ratio);
            stroke.x = instance.getChildByName("numText"+k).x
            stroke.y = instance.getChildByName("numText"+k).y+5*ratio
            if(k==0)stroke.visible=false;
            instance.addChild(stroke)
            stroke.scaleX = 0
            TweenMax.to(stroke, 0.1*i, {scaleX:1,ease:Power4.easeInOut})

            var strokeBlack = new createjs.Shape();
            strokeBlack.name = "strokeBlack"+k;
            strokeBlack.graphics.beginFill("#000000").drawRect(0, 0, 20*ratio, 1*ratio);
            strokeBlack.x = instance.getChildByName("numText"+k).x
            strokeBlack.y = instance.getChildByName("numText"+k).y+5*ratio
            strokeBlack.visible=false;
            instance.addChild(strokeBlack)

            var titleText = new createjs.Text();
            titleText.name = "titleText"+k
            titleText.font = "24px BebasNeueBold";
            titleText.lineWidth = 40*ratio
            titleText.lineHeight = 20
            titleText.textBaseline = "alphabetic";
            titleText.color = "#000000";
            titleText.x = instance.getChildByName("numText"+k).x
            titleText.y = instance.getChildByName("numText"+k).y+5*ratio+40*ratio
            titleText.visible=false;
            titleText.scaleX = ratio;
            titleText.scaleY = ratio;
            instance.addChild(titleText)

            var strokeBlackLong = new createjs.Shape();
            strokeBlackLong.name = "strokeBlackLong"+k;
            strokeBlackLong.graphics.beginFill("#000000").drawRect(0, 0, 20*ratio, 1*ratio);
            strokeBlackLong.x = instance.getChildByName("numText"+k).x
            strokeBlackLong.y = strokeBlack.y+100*ratio
            strokeBlackLong.visible=false;
            instance.addChild(strokeBlackLong)

            var shortText = new createjs.Text();
            shortText.name = "shortText"+k
            shortText.font = "14px BebasNeueBook";
            shortText.lineWidth = 60*ratio
            shortText.lineHeight = 20
            shortText.textBaseline = "alphabetic";
            shortText.color = "#000000";
            shortText.scaleX = ratio;
            shortText.scaleY = ratio;
            shortText.x = instance.getChildByName("numText"+k).x
            shortText.y = strokeBlackLong.y+10*ratio+20*ratio
            shortText.visible=false;
            instance.addChild(shortText)
        }

    }

    function resizeHitGrid(){

        gridWidth = Math.floor(stage.canvas.width/gridNum);

        var j=0

        for(var i=0;i<gridNum*2;i++){

            instance.getChildByName("hit"+i).graphics.clear();
            instance.getChildByName("hit"+i).graphics.beginFill("#FFFFFF").drawRect(0, 0, gridWidth, stage.canvas.height/2);

            instance.getChildByName("fill"+i).graphics.clear();
            instance.getChildByName("fill"+i).graphics.beginFill("#FFFFFF").drawRect(0, 0, gridWidth, stage.canvas.height/2);

            if(i>=gridNum){
                if(i==gridNum)j=0
                instance.getChildByName("hit"+i).x = gridWidth*j;
                instance.getChildByName("hit"+i).y = stage.canvas.height/2;
                j++
            }else{
                instance.getChildByName("hit"+i).x = gridWidth*j;
                instance.getChildByName("hit"+i).y = 0;
                j++
            }

            instance.getChildByName("fill"+i).x = instance.getChildByName("hit"+i).x;
            instance.getChildByName("fill"+i).y = instance.getChildByName("hit"+i).y;

            instance.getChildByName("numText"+i).x = instance.getChildByName("hit"+i).x+60*ratio;
            instance.getChildByName("numText"+i).y = instance.getChildByName("hit"+i).y+instance.getChildByName("numText"+i).getBounds().height*ratio+100*ratio;
           
        }

        for(var k=0;k<images.length;k++){
            instance.getChildByName("stroke"+k).x = instance.getChildByName("numText"+k).x
            instance.getChildByName("stroke"+k).y = instance.getChildByName("numText"+k).y+5*ratio

            instance.getChildByName("stroke"+k).x = instance.getChildByName("numText"+k).x
            instance.getChildByName("stroke"+k).y = instance.getChildByName("numText"+k).y+5*ratio

            instance.getChildByName("strokeBlack"+k).x = instance.getChildByName("numText"+k).x
            instance.getChildByName("strokeBlack"+k).y = instance.getChildByName("numText"+k).y+5*ratio

            instance.getChildByName("titleText"+k).x = instance.getChildByName("numText"+k).x
            instance.getChildByName("titleText"+k).y = instance.getChildByName("numText"+k).y+5*ratio+40*ratio

            instance.getChildByName("strokeBlackLong"+k).x = instance.getChildByName("numText"+k).x
            instance.getChildByName("strokeBlackLong"+k).y = instance.getChildByName("strokeBlack"+k).y+100*ratio

            instance.getChildByName("shortText"+k).x = instance.getChildByName("numText"+k).x
            instance.getChildByName("shortText"+k).y = instance.getChildByName("strokeBlackLong"+k).y+10*ratio+20*ratio

        }

    }

    function handlerOver(event){

        if(nav!=event.target.instance){
        
        var projectOver = false;

        if(overlayFill) {
            overlayFill.graphics.clear();
            instance.removeChild(overlayFill)
            overlayFill = null;
        }

        if(multiplyRightFill) {
            multiplyRightFill.graphics.clear();
            instance.removeChild(multiplyRightFill)
            multiplyRightFill = null;
        }

         if(multiplyLeftFill) {
            multiplyLeftFill.graphics.clear();
            instance.removeChild(multiplyLeftFill)
            multiplyLeftFill = null;
        }

        for(var i=0;i<images.length;i++){
           
           images[i].visible = false

           instance.getChildByName("fill"+i).visible = false
           instance.getChildByName("strokeBlack"+i).visible = false
           instance.getChildByName("strokeBlackLong"+i).visible = false
           instance.getChildByName("numText"+i).color = "#FFFFFF"
           instance.getChildByName("titleText"+i).visible = false
           instance.getChildByName("shortText"+i).visible = false
           projectOver = false

           if(i==event.target.instance) {

                TweenMax.killAll();

                if(images[event.target.instance]){

                    nav = event.target.instance

                    images[event.target.instance].visible = true;
                    images[event.target.instance].alpha = 0;
                    TweenMax.to(images[event.target.instance], 3, {alpha:1,ease:Power4.easeOut});

                    instance.getChildByName("fill"+event.target.instance).visible = true;
                    instance.getChildByName("fill"+event.target.instance).scaleY = 0;
                    instance.getChildByName("fill"+event.target.instance).alpha = 0;
                    TweenMax.to(instance.getChildByName("fill"+event.target.instance), 0.5, {alpha:1,scaleY:1,ease:Power4.easeInOut})
                    
                    instance.getChildByName("numText"+event.target.instance).color = "#000000"

                }
           }
        }

        overlayFill = new createjs.Shape();
        overlayFill.graphics.beginFill("#FFFFFF").drawRect(0, 0, gridWidth, stage.canvas.height/2);
        overlayFill.compositeOperation = "overlay";
        overlayFill.x = instance.getChildByName("fill"+event.target.instance).x
        
        if(event.target.instance>=gridNum){
            overlayFill.y = 0
        }else {
            overlayFill.y = stage.canvas.height/2
        }

        overlayFill.scaleY = 0;
        TweenMax.to(overlayFill, 0.5, {delay:0.4,scaleY:1,ease:Power4.easeInOut})

        multiplyRightFill = new createjs.Shape();
        multiplyRightFill.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        multiplyRightFill.compositeOperation = "saturation";
        multiplyRightFill.x = instance.getChildByName("fill"+event.target.instance).x+gridWidth
        multiplyRightFill.y = 0
        multiplyRightFill.scaleX = 0;
        
        TweenMax.to(multiplyRightFill, 1, {delay:0.2,scaleX:1,ease:Power4.easeInOut})

        multiplyLeftFill = new createjs.Shape();
        multiplyLeftFill.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
        multiplyLeftFill.compositeOperation = "saturation";
        multiplyLeftFill.regX = stage.canvas.width
        multiplyLeftFill.x = instance.getChildByName("fill"+event.target.instance).x
        multiplyLeftFill.y = 0
        
        multiplyLeftFill.scaleX = 0;
        TweenMax.to(multiplyLeftFill, 1, {delay:0.2,scaleX:1,ease:Power4.easeInOut})
        
        //if(nav!=0){
            instance.getChildByName("strokeBlack"+nav).visible = true;
            instance.getChildByName("strokeBlack"+nav).scaleX=0
            TweenMax.to(instance.getChildByName("strokeBlack"+nav), 0.5, {scaleX:1,ease:Power4.easeOut})

            instance.getChildByName("strokeBlackLong"+nav).visible = true;
            instance.getChildByName("strokeBlackLong"+nav).scaleX=0
            TweenMax.to(instance.getChildByName("strokeBlackLong"+nav), 0.5, {delay:0.5,scaleX:1,ease:Power4.easeOut})

            instance.getChildByName("titleText"+nav).text = data.titles[nav]
            instance.getChildByName("titleText"+nav).visible = true
            instance.getChildByName("titleText"+nav).alpha = 0;
            TweenMax.to(instance.getChildByName("titleText"+nav), 1, {delay:0.5,alpha:1,ease:Power4.easeOut})

            instance.getChildByName("shortText"+nav).text = data.shorts[nav]
            instance.getChildByName("shortText"+nav).visible = true
            instance.getChildByName("shortText"+nav).alpha = 0;
            TweenMax.to(instance.getChildByName("shortText"+nav), 1, {delay:0.75,alpha:1,ease:Power4.easeOut})
        //}

        instance.addChild(overlayFill)
        instance.addChild(multiplyRightFill)
        instance.addChild(multiplyLeftFill)

        }

    }

    function handlerOut(event){

    }

    function handlerClick(event){
        console.log(event.target.instance)
    }

    p.resize = function() {

        if(containerImages){
            resizeImages();
            resizeStrokeGrid();
            resizeHitGrid();
        }

        if(multiplyRightFill){
            multiplyRightFill.graphics.clear();
            multiplyRightFill.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
            multiplyRightFill.x = instance.getChildByName("fill"+nav).x+gridWidth
            multiplyRightFill.y = 0
        }
        
        if(multiplyLeftFill){
            multiplyLeftFill.graphics.clear();
            multiplyLeftFill.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
            multiplyLeftFill.regX = stage.canvas.width
            multiplyLeftFill.x = instance.getChildByName("fill"+nav).x
            multiplyLeftFill.y = 0
        }

        if(overlayFill) {
            overlayFill.graphics.clear();
            overlayFill.graphics.beginFill("#FFFFFF").drawRect(0, 0, gridWidth, stage.canvas.height/2);
            overlayFill.x = instance.getChildByName("fill"+nav).x
            if(nav>=gridNum){
                overlayFill.y = 0
            }else {
                overlayFill.y = stage.canvas.height/2
            }
        }

    } ;  

window.Grid = createjs.promote(Grid, "Container");
}());