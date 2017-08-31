(function () {

    function Offices(Iratio,Iassets,IaspectRatio) {

        this.ratio = Iratio;
        this.assets = Iassets;
        this.iaspectRatio = IaspectRatio;
        this.Container_constructor();
        this.setup();

    }
    
    var bgOffice1;
    var bgOffice2;
    var bgOffice3;
    var instance;
    var ratio;
    var bgHeight;
    var assets;
    var margin = 20;
    var aspectRatio;
    var dateField;
    var line;

    var containerOffice1;
    var containerOffice2;
    var containerOffice3;

    var totalSizeOffice1;
    var totalSizeOffice2;
    var totalSizeOffice3;

    var p = createjs.extend(Offices, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        assets = this.assets
        aspectRatio = this.iaspectRatio;

        bgHeight = stage.canvas.width/2;
        
        containerOffice1 = new createjs.Container();
        containerOffice2 = new createjs.Container();
        containerOffice3 = new createjs.Container();

        bgOffice1 = new createjs.Shape();
        bgOffice1.alpha = 0.8
        bgOffice1.graphics.beginFill("#143483").drawRect(0, 0, bgHeight,bgHeight);
        
        bgOffice2 = new createjs.Shape();
        bgOffice2.x = stage.canvas.width/2
        bgOffice2.alpha = 0.6
        bgOffice2.graphics.beginFill("#143483").drawRect(0, 0, bgHeight,bgHeight/2);

        bgOffice3 = new createjs.Shape();
        bgOffice3.x = stage.canvas.width/2
        bgOffice3.y = stage.canvas.width/4
        bgOffice3.alpha = 0.4
        bgOffice3.graphics.beginFill("#143483").drawRect(0, 0, bgHeight,bgHeight/2);

        instance.addChild(bgOffice1);
        aspectRatio.resizeSquare(assets[0],960,960);
        instance.addChild(assets[0]);
        
        instance.addChild(bgOffice2);
        instance.addChild(assets[1]);
        aspectRatio.resizeSquareHd(assets[1],960,480);
        assets[1].x = bgOffice2.x

        instance.addChild(bgOffice3);
        instance.addChild(assets[2]);
        aspectRatio.resizeSquareHd(assets[2],960,480);
        assets[2].x = bgOffice2.x
        assets[2].y = bgOffice3.y

        instance.addChild(containerOffice1)
        instance.addChild(containerOffice2)
        instance.addChild(containerOffice3)

        assets[0].alpha = 0.8
        assets[1].alpha = 0.8
        assets[2].alpha = 0.8

        assets[0].addEventListener("mouseover", handlerOverNavigation);
        assets[0].addEventListener("mouseout", handlerOutNavigation);
        assets[1].addEventListener("mouseover", handlerOverNavigation);
        assets[1].addEventListener("mouseout", handlerOutNavigation);
        assets[2].addEventListener("mouseover", handlerOverNavigation);
        assets[2].addEventListener("mouseout", handlerOutNavigation);

        //--------------

        dateField = new createjs.Text();
        dateField.font = "bold 12px PT Sans";
        dateField.color = "#FFFFFF";
        dateField.scaleX = ratio
        dateField.scaleY = ratio
        dateField.text = "AVEIRO OFFICE";
        dateField.alpha = 0.75;
        containerOffice1.addChild(dateField);

        line = new createjs.Shape();
        line.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width/4,1*ratio);
        line.y = dateField.y+margin*ratio;
        line.alpha = 0.5;
        containerOffice1.addChild(line);

        titleField = new createjs.Text();
        titleField.font = "bold 36px PT Serif";
        titleField.color = "#FFFFFF";
        titleField.lineWidth = (stage.canvas.width/4)/ratio;
        titleField.lineHeight = 40;
        titleField.scaleX = ratio
        titleField.scaleY = ratio
        titleField.text = "Terminal TIR / Bloco Servicos - Sala 4\n3801-301 Aveiro";        
        titleField.y = line.y+margin*ratio;
        containerOffice1.addChild(titleField);

        //--------------

        dateField2 = new createjs.Text();
        dateField2.font = "bold 12px PT Sans";
        dateField2.color = "#FFFFFF";
        dateField2.scaleX = ratio
        dateField2.scaleY = ratio
        dateField2.text = "FIGUEIRA FOZ OFFICE";
        dateField2.alpha = 0.75;
        containerOffice2.addChild(dateField2);

        line2 = new createjs.Shape();
        line2.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width/4,1*ratio);
        line2.y = dateField2.y+margin*ratio;
        line2.alpha = 0.5;
        containerOffice2.addChild(line2);

        titleField2 = new createjs.Text();
        titleField2.font = "bold 24px PT Serif";
        titleField2.color = "#FFFFFF";
        titleField2.lineWidth = (stage.canvas.width/4)/ratio;
        titleField2.lineHeight = 30;
        titleField2.scaleX = ratio
        titleField2.scaleY = ratio
        titleField2.text = "Coming soon - (please contact our Aveiro office)";
        titleField2.y = line2.y+margin*ratio;
        containerOffice2.addChild(titleField2);

        //---------------------

        dateField3 = new createjs.Text();
        dateField3.font = "bold 12px PT Sans";
        dateField3.color = "#FFFFFF";
        dateField3.scaleX = ratio
        dateField3.scaleY = ratio
        dateField3.text = "LEIXOES OFFICE";
        dateField3.alpha = 0.75;
        containerOffice3.addChild(dateField3);

        line3 = new createjs.Shape();
        line3.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width/4,1*ratio);
        line3.y = dateField3.y+margin*ratio;
        line3.alpha = 0.5;
        containerOffice3.addChild(line3);

        titleField3 = new createjs.Text();
        titleField3.font = "bold 24px PT Serif";
        titleField3.color = "#FFFFFF";
        titleField3.lineWidth = (stage.canvas.width/4)/ratio;
        titleField3.lineHeight = 30;
        titleField3.scaleX = ratio
        titleField3.scaleY = ratio
        titleField3.text = "Av. da Boavista, 1167, 2 Andar, Sala 2.4\n4100-130 Porto";
        titleField3.y = line3.y+margin*ratio;
        containerOffice3.addChild(titleField3);

        //---------------------

        totalSizeOffice1 = titleField.y+titleField.getBounds().height;
        totalSizeOffice2 = titleField2.y+titleField2.getBounds().height;
        totalSizeOffice3 = titleField3.y+titleField3.getBounds().height;

        containerOffice1.x = 100*ratio 
        containerOffice1.y = bgHeight/2-20*ratio

        containerOffice2.x = stage.canvas.width/2+100*ratio
        containerOffice2.y = bgHeight/4-totalSizeOffice2/2

        containerOffice3.x = stage.canvas.width/2+100*ratio
        containerOffice3.y = bgHeight/2+bgHeight/4-totalSizeOffice3/2

    };

    function handlerOverNavigation(event){
        createjs.Tween.get(event.target).to({alpha:0.2}, 400, createjs.Ease.circInOut)
    }

    function handlerOutNavigation(event){
        createjs.Tween.get(event.target).to({alpha:0.8}, 400, createjs.Ease.circInOut)      
    }

    p.resize = function (){

        bgHeight = stage.canvas.width/2;

        bgOffice1.graphics.clear();
        bgOffice1.graphics.beginFill("#143483").drawRect(0, 0, bgHeight,bgHeight);
        
        bgOffice2.graphics.clear();
        bgOffice2.x = stage.canvas.width/2
        bgOffice2.alpha = 0.5
        bgOffice2.graphics.beginFill("#143483").drawRect(0, 0, bgHeight,bgHeight/2);

        bgOffice3.graphics.clear();
        bgOffice3.x = stage.canvas.width/2
        bgOffice3.y = stage.canvas.width/4
        bgOffice3.alpha = 0.7
        bgOffice3.graphics.beginFill("#143483").drawRect(0, 0, bgHeight,bgHeight/2);

        line.graphics.clear();
        line.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width/4,1*ratio);

        line2.graphics.clear();
        line2.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width/4,1*ratio);

        line3.graphics.clear();
        line3.graphics.beginFill("#ffffff").drawRect(0, 0, stage.canvas.width/4,1*ratio);

        titleField.lineWidth = (stage.canvas.width/4)/ratio;
        titleField2.lineWidth = (stage.canvas.width/4)/ratio;
        titleField3.lineWidth = (stage.canvas.width/4)/ratio;

        aspectRatio.resizeSquare(assets[0],960,960);
        aspectRatio.resizeSquareHd(assets[1],960,480);
        assets[1].x = bgOffice2.x

        aspectRatio.resizeSquareHd(assets[2],960,480);
        assets[2].x = bgOffice2.x
        assets[2].y = bgOffice3.y

        containerOffice1.x = 100*ratio 
        containerOffice1.y = bgHeight/2-20*ratio

         containerOffice2.x = stage.canvas.width/2+100*ratio
        containerOffice2.y = bgHeight/4-totalSizeOffice2/2

        containerOffice3.x = stage.canvas.width/2+100*ratio
        containerOffice3.y = bgHeight/2+bgHeight/4-totalSizeOffice3/2
    }

    p.getHeight = function (){
       return bgHeight;
    } 

window.Offices = createjs.promote(Offices, "Container");
}());