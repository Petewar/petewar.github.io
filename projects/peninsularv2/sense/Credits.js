(function () {

    function Credits(Iratio,IinstanceDispatch) {

        this.ratio = Iratio;
        this.instanceDispatch = IinstanceDispatch;
        this.Container_constructor();
        this.setup();

    }
    
    var instance;
    var ratio;
    var instanceDispatch;
    var bg;
    var closeSvg = "M40.000,38.598 L38.598,40.000 L20.000,21.402 L1.402,40.000 L0.000,38.598 L18.598,20.000 L0.000,1.402 L1.402,0.000 L20.000,18.598 L38.598,0.000 L40.000,1.402 L21.402,20.000 L40.000,38.598 Z"
    var closeButton;
    var closeBox;
    var blackSvg = "M56.000,9.713 L39.805,19.813 L29.046,39.005 L20.265,24.350 L12.050,39.005 L-0.000,18.896 L16.996,18.896 L23.322,18.896 L39.339,18.896 L39.308,-0.006 L56.000,9.713 Z"
    var titleField;
    var subtitleField;
    var titleFieldPetewar;
    var line;
    var line2;
    var line3;
    var line4;
    var contentPhotos;
    var contentIcons;
    var contentSound;

    var p = createjs.extend(Credits, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        instanceDispatch = this.instanceDispatch

        bg = new createjs.Shape();
        bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width,stage.canvas.height);
        instance.addChild(bg);


        bg.scaleY = 0;
        createjs.Tween.get(bg).to({scaleY:1}, 800, createjs.Ease.circInOut)
        .call(function(){
            
            peteWar = createSvg(blackSvg,"#143483")
            peteWar.x = stage.canvas.width/2-25*ratio
            peteWar.y = stage.canvas.height/2-100*ratio
            instance.addChild(peteWar);

            titleFieldPetewar = new createjs.Text();
            titleFieldPetewar.font = "bold 32px PT Serif";
            titleFieldPetewar.color = "#143483";
            titleFieldPetewar.textAlign = "center"
            titleFieldPetewar.scaleX = ratio;
            titleFieldPetewar.scaleY = ratio;
            titleFieldPetewar.text = "petewar.com - Design + Code";
            titleFieldPetewar.x = stage.canvas.width/2
            titleFieldPetewar.y = peteWar.y+50*ratio
            instance.addChild(titleFieldPetewar);
            
            line = new createjs.Shape();
            line.graphics.beginFill("#143483").drawRect(0, 0, titleFieldPetewar.getBounds().width*ratio,1*ratio);
            line.x = stage.canvas.width/2-titleFieldPetewar.getBounds().width/2*ratio
            line.y = titleFieldPetewar.y+titleFieldPetewar.getBounds().height*ratio+25*ratio
            line.alpha = 0.5;
            instance.addChild(line);

            contentPhotos = new createjs.Text();
            contentPhotos.font = "14px PT Sans";
            contentPhotos.color = "#143483";
            contentPhotos.textAlign = "center"
            contentPhotos.lineHeight = 30;
            contentPhotos.text = "Photos in the tab services menu by PdsCunha";
            contentPhotos.scaleX = ratio;
            contentPhotos.scaleY = ratio;
            contentPhotos.x = stage.canvas.width/2
            contentPhotos.y = line.y+18*ratio
            instance.addChild(contentPhotos);

            line2 = new createjs.Shape();
            line2.graphics.beginFill("#143483").drawRect(0, 0, titleFieldPetewar.getBounds().width*ratio,1*ratio);
            line2.x = line.x
            line2.y = line.y+50*ratio
            line2.alpha = 0.5;
            instance.addChild(line2);

            contentIcons = new createjs.Text();
            contentIcons.font = "14px PT Sans";
            contentIcons.color = "#143483";
            contentIcons.textAlign = "center"
            contentIcons.lineHeight = 30;
            contentIcons.text = "Icons by Antar, Gerald W. , Gregor C. , Ivan C. , Lazar N.";
            contentIcons.scaleX = ratio;
            contentIcons.scaleY = ratio;
            contentIcons.x = stage.canvas.width/2
            contentIcons.y = line2.y+18*ratio
            instance.addChild(contentIcons);

            line3 = new createjs.Shape();
            line3.graphics.beginFill("#143483").drawRect(0, 0, titleFieldPetewar.getBounds().width*ratio,1*ratio);
            line3.x = line2.x
            line3.y = line2.y+50*ratio
            line3.alpha = 0.5;
            instance.addChild(line3);

            contentSound = new createjs.Text();
            contentSound.font = "14px PT Sans";
            contentSound.color = "#143483";
            contentSound.textAlign = "center"
            contentSound.lineHeight = 30;
            contentSound.text = "Sound Design by Diogo Ferreira";
            contentSound.scaleX = ratio;
            contentSound.scaleY = ratio;
            contentSound.x = stage.canvas.width/2
            contentSound.y = line3.y+18*ratio
            instance.addChild(contentSound);

            line4 = new createjs.Shape();
            line4.graphics.beginFill("#143483").drawRect(0, 0, titleFieldPetewar.getBounds().width*ratio,1*ratio);
            line4.x = line3.x
            line4.y = line3.y+50*ratio
            line4.alpha = 0.5;
            instance.addChild(line4);

        });

        createjs.Tween.get(instance).to({alpha:1}, 300, createjs.Ease.circInOut)
        .call(function(){
            
            closeButton = new createSvg(closeSvg,"#143483");
            //closeButton.visible = false;
            closeButton.regX = 10*ratio;
            closeButton.regY = 10*ratio;
            closeButton.x = stage.canvas.width-20*ratio-100*ratio
            closeButton.y = 50*ratio+40*ratio
            instance.addChild(closeButton);
            
            closeBox = new createjs.Shape();
            //closeBox.visible = false;
            closeBox.alpha = 0.01
            closeBox.graphics.beginFill("#FFFFFF").drawRect(0, 0, 40*ratio,40*ratio);
            closeBox.x = stage.canvas.width-40*ratio-100*ratio
            closeBox.y = 50*ratio+20*ratio
            instance.addChild(closeBox);
            closeBox.cursor = "pointer"
            closeBox.addEventListener("mouseover", handlerOverNavigation);
            closeBox.addEventListener("mouseout", handlerOutNavigation);
            closeBox.addEventListener("click", handlerClickNavigation); 

            titleField = new createjs.Text();
            titleField.font = "bold 32px PT Serif";
            titleField.color = "#143483";
            titleField.textAlign = "center"
            titleField.scaleX = ratio;
            titleField.scaleY = ratio;
            titleField.text = "Credits";
            titleField.x = stage.canvas.width/2;
            titleField.y = -10*ratio+100*ratio;
            instance.addChild(titleField);

            subtitleField = new createjs.Text();
            subtitleField.font = "bold 12px PT Sans";
            subtitleField.color = "#143483";
            subtitleField.textAlign = "center"
            subtitleField.text = "PENINSULAR PORT SERVICES";
            subtitleField.scaleX = ratio
            subtitleField.scaleY = ratio
            subtitleField.x = stage.canvas.width/2
            subtitleField.y = titleField.y +titleField.getBounds().height*ratio+12*ratio
            instance.addChild(subtitleField);
            subtitleField.alpha = 0.5

        });

        

    };

    function handlerOverNavigation(event){
        createjs.Tween.get(closeButton).to({rotation:180}, 400, createjs.Ease.circInOut)
    }

    function handlerOutNavigation(event){
           createjs.Tween.get(closeButton).to({rotation:0}, 400, createjs.Ease.circInOut)
    }

    function handlerClickNavigation(event){
        
       closeBox.removeEventListener("mouseover", handlerOverNavigation);
       closeBox.removeEventListener("mouseout", handlerOutNavigation);
       closeBox.removeEventListener("click", handlerClickNavigation); 

       createjs.Tween.get(bg)
       .to({scaleY:0}, 500, createjs.Ease.circInOut)
       .call(function(){

            bg.graphics.clear();
            instance.removeChild(bg);

            var customEvent = new createjs.Event("closeOverlay");
            customEvent.state = "close"
            instanceDispatch.dispatchEvent(customEvent);
       });

       createjs.Tween.get(instance)
       .to({alpha:1}, 200, createjs.Ease.circInOut)
       .call(function(){
           instance.removeChild(titleField);
           instance.removeChild(subtitleField);
           instance.removeChild(peteWar);
           instance.removeChild(closeBox);
           instance.removeChild(closeButton);
           instance.removeChild(titleFieldPetewar);
           instance.removeChild(contentPhotos);
           instance.removeChild(contentIcons);
           instance.removeChild(contentSound);
           instance.removeChild(line);
           instance.removeChild(line2);
           instance.removeChild(line3);
           instance.removeChild(line4);
         });

       
    }


    function createSvg(Isvg,Icolor){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        svg.scaleX = ratio
        svg.scaleY = ratio
        return svg;
    }

    p.resize = function (){

        if(titleField){
            titleField.x = stage.canvas.width/2;
            titleField.y = -10*ratio+100*ratio;
        }

        if(subtitleField){
            subtitleField.x = stage.canvas.width/2
            subtitleField.y = titleField.y +titleField.getBounds().height*ratio+12*ratio
        }

        if(peteWar){
            peteWar.x = stage.canvas.width/2-25*ratio
            peteWar.y = stage.canvas.height/2-100*ratio
        }

        if(closeBox){
            closeBox.x = stage.canvas.width-40*ratio-100*ratio
            closeBox.y = 50*ratio+20*ratio
        }

        if(closeButton){
            closeButton.x = stage.canvas.width-20*ratio-100*ratio
            closeButton.y = 50*ratio+40*ratio
        }

        if(bg){
            bg.graphics.clear();
            bg.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width,stage.canvas.width);  
        }

        if(line){
            line.x = stage.canvas.width/2-titleFieldPetewar.getBounds().width/2*ratio
            line.y = titleFieldPetewar.y+titleFieldPetewar.getBounds().height*ratio+25*ratio
            contentPhotos.x = stage.canvas.width/2
            contentPhotos.y = line.y+18*ratio
        }

           

        if(line2){
           line2.x = line.x
            line2.y = line.y+50*ratio
            contentIcons.x = stage.canvas.width/2
            contentIcons.y = line2.y+18*ratio
        }

        if(line3){
           line3.x = line2.x
            line3.y = line2.y+50*ratio
        }

        if(line4){
           line4.x = line3.x
            line4.y = line3.y+50*ratio
        }

        if(titleFieldPetewar){
           titleFieldPetewar.x = stage.canvas.width/2
            titleFieldPetewar.y = peteWar.y+50*ratio
        }

        if(contentSound){
            contentSound.x = stage.canvas.width/2
            contentSound.y = line3.y+18*ratio
        }
        
    }

window.Credits = createjs.promote(Credits, "Container");
}());