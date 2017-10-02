(function () {

    function AcercaHistory(Iratio,IcertificationOne,IcertificationTwo,IqualidadeTitle,IqualidadeDesc,IhistoriaTitle,IhistoriaDesc,ItotalServices,ItotalServicesTitles,Iyear,IpercentDiagramColors,IpercentDiagramTitle,IpercentDesc,IdiagramPieces,IcertificadosTitle,Isvg,IposY) {

        this.Container_constructor();
        this.ratio = Iratio;

        this.qualidadeTitle = IqualidadeTitle;
        this.qualidadeDesc = IqualidadeDesc;

        this.historiaTitle = IhistoriaTitle;
        this.historiaDesc = IhistoriaDesc;
        
        this.totalServices = ItotalServices;
        this.totalServicesTitles = ItotalServicesTitles;
        this.year = Iyear;
        
        this.percentDiagramTitle = IpercentDiagramTitle;
        this.percentDesc = IpercentDesc;
        this.percentDiagramColors = IpercentDiagramColors
        this.diagramPieces = IdiagramPieces;
        
        this.certificadosTitle = IcertificadosTitle;

        this.certificadosOne = IcertificationOne;
        this.certificadosTwo = IcertificationTwo;

        this.svg = Isvg;
        this.posY = IposY;
        this.setup();
    }
    
    var instance;
    var ratio;

    var qualidadeTitle;
    var qualidadeDesc;
    var historiaTitle;
    var historiaDesc;
    var totalServices;
    var totalServicesTitles;
    var year;
    
    var percentDiagramTitle;
    var percentDiagramColors;
    var percentDesc;
    var diagramPieces;
    var certificadosTitle;
    var svg;
    var totalWidth

    var certificadosOne
    var certificadosTwo

    var posY;

    var p = createjs.extend(AcercaHistory, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        posY = this.posY;
        qualidadeTitle = this.qualidadeTitle;
        qualidadeDesc = this.qualidadeDesc;
        historiaTitle = this.historiaTitle;
        historiaDesc = this.historiaDesc;
        totalServices = this.totalServices;
        totalServicesTitles = this.totalServicesTitles;
        percentDiagramColors = this.percentDiagramColors;
        year = this.year;
       
        percentDiagramTitle = this.percentDiagramTitle;
        percentDesc = this.percentDesc;
        diagramPieces = this.diagramPieces;
        certificadosTitle = this.certificadosTitle;
        svg = this.svg;

        certificadosOne = this.certificadosOne;
        certificadosTwo = this.certificadosTwo;

        addElements();
        addAnimation();

    };

    function addElements(){

        var bgWhite = new createjs.Shape();
        bgWhite.y = posY
        bgWhite.name = "bgWhite";
        bgWhite.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width/2, 502*ratio);
        instance.addChild(bgWhite);

        var bgGrey = new createjs.Shape();
        bgGrey.y = posY+502*ratio
        bgGrey.name = "bgGrey";
        bgGrey.graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width/2, 467*ratio);
        instance.addChild(bgGrey);

        var bgGreen = new createjs.Shape();
        bgGreen.x = stage.canvas.width/2
        bgGreen.y = posY
        bgGreen.name = "bgGreen";
        bgGreen.graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width/2, 763*ratio);
        instance.addChild(bgGreen);

        var bgWhiteWhiteTwo = new createjs.Shape();
        bgWhiteWhiteTwo.x = stage.canvas.width/2
        bgWhiteWhiteTwo.y = posY+763*ratio
        bgWhiteWhiteTwo.name = "bgWhiteWhiteTwo";
        bgWhiteWhiteTwo.graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width/2, 206*ratio);
        instance.addChild(bgWhiteWhiteTwo);

        var qualidadeTitleText = new createjs.Text();
        qualidadeTitleText.name = "qualidadeTitleText";
        qualidadeTitleText.font = "36px BwModelica-ExtraBold";
        qualidadeTitleText.textBaseline = "alphabetic";
        qualidadeTitleText.color = "#333333";
        qualidadeTitleText.lineHeight = 30;
        qualidadeTitleText.text = qualidadeTitle
        qualidadeTitleText.scaleX = ratio;
        qualidadeTitleText.scaleY = ratio;
        qualidadeTitleText.x = 115*ratio
        qualidadeTitleText.y = bgWhite.y+qualidadeTitleText.getBounds().height*ratio+150*ratio;
        instance.addChild(qualidadeTitleText);

        var qualidadeDescText = new createjs.Text();
        qualidadeDescText.name = "qualidadeDescText";
        qualidadeDescText.font = "18px BwModelica-Regular";
        qualidadeDescText.textBaseline = "alphabetic";
        qualidadeDescText.color = "#333333";
        if(ratio==1)qualidadeDescText.lineWidth = stage.canvas.width/2-230*ratio
        if(ratio==2)qualidadeDescText.lineWidth = stage.canvas.width/2-410*ratio-115*ratio
        qualidadeDescText.lineHeight = 30;
        qualidadeDescText.text = qualidadeDesc
        qualidadeDescText.scaleX = ratio;
        qualidadeDescText.scaleY = ratio;
        qualidadeDescText.x = 115*ratio
        qualidadeDescText.y = bgWhite.y+qualidadeTitleText.getBounds().height*ratio+160*ratio+50*ratio;
        instance.addChild(qualidadeDescText);

        var historiaTitleText = new createjs.Text();
        historiaTitleText.name = "historiaTitleText";
        historiaTitleText.font = "36px BwModelica-Bold";
        historiaTitleText.textBaseline = "alphabetic";
        historiaTitleText.color = "#ffffff";
        historiaTitleText.lineHeight = 30;
        historiaTitleText.text = historiaTitle
        historiaTitleText.scaleX = ratio;
        historiaTitleText.scaleY = ratio;
        historiaTitleText.x = stage.canvas.width/2+115*ratio
        historiaTitleText.y = bgWhite.y+historiaTitleText.getBounds().height*ratio+150*ratio;
        instance.addChild(historiaTitleText);

        var historiaDescText = new createjs.Text();
        historiaDescText.name = "historiaDescText";
        historiaDescText.font = "18px BwModelica-Regular";
        historiaDescText.textBaseline = "alphabetic";
        historiaDescText.color = "#ffffff";
        if(ratio==1)historiaDescText.lineWidth = stage.canvas.width/2-230*ratio
        if(ratio==2)historiaDescText.lineWidth = stage.canvas.width/2-410*ratio-115*ratio
        historiaDescText.lineHeight = 30;
        historiaDescText.text = historiaDesc
        historiaDescText.scaleX = ratio;
        historiaDescText.scaleY = ratio;
        historiaDescText.x = stage.canvas.width/2+115*ratio
        historiaDescText.y = bgWhite.y+historiaTitleText.getBounds().height*ratio+160*ratio+50*ratio;
        instance.addChild(historiaDescText);

        var fillCircle = new createjs.Shape();
        fillCircle.name = "fillCircle"
        fillCircle.graphics.beginFill("#333333").drawCircle(0,0,160*ratio);
        fillCircle.alpha = 0.2;
        fillCircle.x = Math.floor(bgGreen.x+stage.canvas.width/4)
        fillCircle.y = Math.floor(historiaDescText.y+historiaDescText.getBounds().height*ratio+160*ratio+20*ratio)
        instance.addChild(fillCircle);

        var pieceOne = svg.createSvg(diagramPieces[1],"#708E46");
        pieceOne.name = "pieceOne"
        pieceOne.x = Math.floor(fillCircle.x-145*ratio)
        pieceOne.y = Math.floor(fillCircle.y-145*ratio+147*ratio)
        instance.addChild(pieceOne);

        var pieceTwo = svg.createSvg(diagramPieces[0],"#475139");
        pieceTwo.name = "pieceTwo"
        pieceTwo.x = Math.floor(fillCircle.x-145*ratio+72*ratio)
        pieceTwo.y = Math.floor(fillCircle.y-145*ratio)
        instance.addChild(pieceTwo);

        var pieceThree = svg.createSvg(diagramPieces[2],"#667F43");
        pieceThree.name = "pieceThree"
        pieceThree.x = Math.floor(fillCircle.x-145*ratio)
        pieceThree.y = Math.floor(fillCircle.y-145*ratio)
        instance.addChild(pieceThree);

        var fillWhiteCircle = new createjs.Shape();
        fillWhiteCircle.name = "fillWhiteCircle"
        fillWhiteCircle.graphics.beginFill("#ffffff").drawCircle(0,0,110*ratio);
        fillWhiteCircle.x = Math.floor(bgGreen.x+stage.canvas.width/4)
        fillWhiteCircle.y = Math.floor(historiaDescText.y+historiaDescText.getBounds().height*ratio+160*ratio+20*ratio)
        instance.addChild(fillWhiteCircle);

        var totalServicesText = new createjs.Text();
        totalServicesText.name = "totalServicesText";
        totalServicesText.font = "64px BwModelica-ExtraBold";
        totalServicesText.textBaseline = "alphabetic";
        totalServicesText.color = "#333333";
        totalServicesText.lineHeight = 30;
        totalServicesText.text = totalServices
        totalServicesText.scaleX = ratio;
        totalServicesText.scaleY = ratio;
        totalServicesText.x = fillWhiteCircle.x-totalServicesText.getBounds().width/2*ratio
        totalServicesText.y = fillWhiteCircle.y
        instance.addChild(totalServicesText);

        var totalServicesTitlesText = new createjs.Text();
        totalServicesTitlesText.name = "totalServicesTitlesText";
        totalServicesTitlesText.font = "12px BwModelica-ExtraBold";
        totalServicesTitlesText.textBaseline = "alphabetic";
        totalServicesTitlesText.color = "#333333";
        totalServicesTitlesText.lineHeight = 30;
        totalServicesTitlesText.text = totalServicesTitles
        totalServicesTitlesText.scaleX = ratio;
        totalServicesTitlesText.scaleY = ratio;
        totalServicesTitlesText.x = fillWhiteCircle.x-totalServicesTitlesText.getBounds().width/2*ratio
        totalServicesTitlesText.y = totalServicesText.y+totalServicesTitlesText.getBounds().height*ratio
        instance.addChild(totalServicesTitlesText);

        var yearText = new createjs.Text();
        yearText.name = "yearText";
        yearText.font = "12px BwModelica-ExtraBold";
        yearText.textBaseline = "alphabetic";
        yearText.color = "#333333";
        yearText.lineHeight = 30;
        yearText.text = year
        yearText.scaleX = ratio;
        yearText.scaleY = ratio;
        yearText.x = fillWhiteCircle.x-yearText.getBounds().width/2*ratio
        yearText.y = totalServicesTitlesText.y+yearText.getBounds().height*ratio
        instance.addChild(yearText);

        var containerTitlesPercent = new createjs.Container();
        containerTitlesPercent.name = "containerTitlesPercent"
        containerTitlesPercent.y = bgWhiteWhiteTwo.y+30*ratio
        instance.addChild(containerTitlesPercent)

        for(var i=0;i<percentDiagramTitle.length;i++){

            var percentDescText = new createjs.Text();
            percentDescText.name = "percentDescText"+i;
            percentDescText.font = "13px BwModelica-Regular";
            percentDescText.textBaseline = "alphabetic";
            percentDescText.color = percentDiagramColors[i]
            if(ratio==1)percentDescText.lineWidth = 138*ratio
            if(ratio==2)percentDescText.lineWidth = stage.canvas.width/2-300*ratio
            percentDescText.lineHeight = 18;
            percentDescText.text = percentDesc[i];
            percentDescText.scaleX = ratio;
            percentDescText.scaleY = ratio;
            if(i>0)percentDescText.x = instance.getChildByName("containerTitlesPercent").getChildByName("percentDescText"+(i-1)).x+instance.getChildByName("containerTitlesPercent").getChildByName("percentDescText"+(i-1)).getBounds().width*ratio+60*ratio
            percentDescText.y = 60*ratio+20*ratio
            containerTitlesPercent.addChild(percentDescText);

            var percentDiagramTitleText = new createjs.Text();
            percentDiagramTitleText.name = "percentDiagramTitleText"+i;
            percentDiagramTitleText.font = "36px BwModelica-ExtraBold";
            percentDiagramTitleText.textBaseline = "alphabetic";
            percentDiagramTitleText.color = percentDiagramColors[i]
            percentDiagramTitleText.lineHeight = 30;
            percentDiagramTitleText.text = percentDiagramTitle[i];
            percentDiagramTitleText.scaleX = ratio;
            percentDiagramTitleText.scaleY = ratio;
            percentDiagramTitleText.x = percentDescText.x
            percentDiagramTitleText.y = 50*ratio
            containerTitlesPercent.addChild(percentDiagramTitleText);

            var percentDiagramPercent = new createjs.Text();
            percentDiagramPercent.name = "percentDiagramPercent"+i;
            percentDiagramPercent.font = "18px BwModelica-Regular";
            percentDiagramPercent.textBaseline = "alphabetic";
            percentDiagramPercent.color = percentDiagramColors[i]
            percentDiagramPercent.lineHeight = 30;
            percentDiagramPercent.text = "%"
            percentDiagramPercent.scaleX = ratio;
            percentDiagramPercent.scaleY = ratio;
            percentDiagramPercent.x = percentDiagramTitleText.x + percentDiagramTitleText.getBounds().width*ratio+5*ratio
            percentDiagramPercent.y = 35*ratio
            containerTitlesPercent.addChild(percentDiagramPercent);

            var stroke = new createjs.Shape();
            stroke.name = "stroke"+i;
            stroke.graphics.beginFill(percentDiagramColors[i]).drawRect(0, 0, 44*ratio, 4*ratio);
            if(i>0)stroke.x = instance.getChildByName("containerTitlesPercent").getChildByName("percentDescText"+(i-1)).x+instance.getChildByName("containerTitlesPercent").getChildByName("percentDescText"+(i-1)).getBounds().width*ratio+60*ratio
            stroke.y = 100*ratio+15*ratio
            containerTitlesPercent.addChild(stroke);
        }

        totalWidth = percentDescText.x+percentDescText.getBounds().width*ratio
        containerTitlesPercent.x = (bgWhiteWhiteTwo.x+stage.canvas.width/4)-totalWidth/2
        
        var certiTileText = new createjs.Text();
        certiTileText.name = "certiTileText";
        certiTileText.font = "13px BwModelica-Bold";
        certiTileText.textBaseline = "alphabetic";
        certiTileText.color = "#333333";
        certiTileText.lineHeight = 30;
        certiTileText.text = certificadosTitle
        certiTileText.scaleX = ratio;
        certiTileText.scaleY = ratio;
        certiTileText.x = 115*ratio
        certiTileText.y = bgGrey.y+certiTileText.getBounds().height*ratio+50*ratio
        instance.addChild(certiTileText);

        var boxGreen = new createjs.Shape();
        boxGreen.name = "boxGreen";
        boxGreen.graphics.beginFill("#99CB53").drawRect(0, 0, 100*ratio, 100*ratio);
        boxGreen.x = 115*ratio
        boxGreen.y = certiTileText.y+certiTileText.getBounds().height*ratio-30*ratio+50*ratio
        instance.addChild(boxGreen);

        var boxGrey = new createjs.Shape();
        boxGrey.name = "boxGrey";
        boxGrey.graphics.beginFill("#333333").drawRect(0, 0, 100*ratio, 100*ratio);
        boxGrey.x = boxGreen.x+100*ratio+30*ratio
        boxGrey.y = certiTileText.y+certiTileText.getBounds().height*ratio-30*ratio+50*ratio
        instance.addChild(boxGrey);

        var certiOne = svg.createSvg(certificadosOne,"#ffffff");
        certiOne.x = 135*ratio
        certiOne.y = certiTileText.y+certiTileText.getBounds().height*ratio-30*ratio+60*ratio
        certiOne.scaleX = ratio/1.2
        certiOne.scaleY = ratio/1.2
        instance.addChild(certiOne);

        var certiTwo = svg.createSvg(certificadosTwo,"#ffffff");
        certiTwo.x = boxGreen.x+100*ratio+60*ratio
        certiTwo.y = certiTileText.y+certiTileText.getBounds().height*ratio-30*ratio+58*ratio
        instance.addChild(certiTwo);

    }
    

    function addAnimation(){
       
    }

    function addHits(){

    }

    p.kill = function() {

        instance.getChildByName("bgWhite").graphics.clear();
        instance.getChildByName("bgGrey").graphics.clear();
        instance.getChildByName("bgGreen").graphics.clear();
        instance.getChildByName("bgWhiteWhiteTwo").graphics.clear();

        instance.removeChild(instance.getChildByName("bgWhite"))
        instance.removeChild(instance.getChildByName("bgGrey"))
        instance.removeChild(instance.getChildByName("bgGreen"))
        instance.removeChild(instance.getChildByName("bgWhiteWhiteTwo"))

        instance.removeChild(instance.getChildByName("qualidadeTitleText"))
        instance.removeChild(instance.getChildByName("qualidadeDescText"))
        instance.removeChild(instance.getChildByName("historiaTitleText"))
        instance.removeChild(instance.getChildByName("historiaDescText"))
        instance.removeChild(instance.getChildByName("fillCircle"))
        instance.removeChild(instance.getChildByName("pieceOne"))
        instance.removeChild(instance.getChildByName("pieceTwo"))
        instance.removeChild(instance.getChildByName("pieceThree"))
        instance.removeChild(instance.getChildByName("fillWhiteCircle"))
        instance.removeChild(instance.getChildByName("totalServicesText"))
        instance.removeChild(instance.getChildByName("totalServicesTitlesText"))
        instance.removeChild(instance.getChildByName("yearText"))

        for(var i=0;i<percentDiagramTitle.length;i++){

        instance.getChildByName("containerTitlesPercent").removeChild(instance.getChildByName("containerTitlesPercent").getChildByName("percentDescText"+i))
        instance.getChildByName("containerTitlesPercent").removeChild(instance.getChildByName("containerTitlesPercent").getChildByName("percentDiagramTitleText"+i))
        instance.getChildByName("containerTitlesPercent").removeChild(instance.getChildByName("containerTitlesPercent").getChildByName("percentDiagramPercent"+i))
        instance.getChildByName("containerTitlesPercent").removeChild(instance.getChildByName("containerTitlesPercent").getChildByName("stroke"+i))

        }

        instance.removeChild(instance.getChildByName("containerTitlesPercent"))
        instance.removeChild(instance.getChildByName("certiTileText"));

        instance.removeChild(instance.getChildByName("certiTwo"));
        instance.removeChild(instance.getChildByName("certiOne"));
        instance.removeChild(instance.getChildByName("boxGrey"));
        instance.removeChild(instance.getChildByName("boxGreen"));
        
    } ; 

    p.getHeight = function() {
        return 969*ratio
    }

    p.resize = function() {
        
        instance.getChildByName("bgWhite").graphics.clear();
        instance.getChildByName("bgWhite").graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width/2, 502*ratio);

        instance.getChildByName("bgGrey").graphics.clear();
        instance.getChildByName("bgGrey").graphics.beginFill("#F1F3F0").drawRect(0, 0, stage.canvas.width/2, 467*ratio);

        instance.getChildByName("bgGreen").x = stage.canvas.width/2
        instance.getChildByName("bgGreen").graphics.clear();
        instance.getChildByName("bgGreen").graphics.beginFill("#8EC640").drawRect(0, 0, stage.canvas.width/2, 763*ratio);

        instance.getChildByName("bgWhiteWhiteTwo").x = stage.canvas.width/2
        instance.getChildByName("bgWhiteWhiteTwo").graphics.clear();
        instance.getChildByName("bgWhiteWhiteTwo").graphics.beginFill("#FFFFFF").drawRect(0, 0, stage.canvas.width/2, 206*ratio);

        instance.getChildByName("historiaTitleText").x = stage.canvas.width/2+115*ratio
        instance.getChildByName("historiaDescText").x = stage.canvas.width/2+115*ratio

        if(ratio==1)instance.getChildByName("qualidadeDescText").lineWidth = stage.canvas.width/2-230*ratio
        if(ratio==2)instance.getChildByName("qualidadeDescText").lineWidth = stage.canvas.width/2-410*ratio-115*ratio

        if(ratio==1)instance.getChildByName("historiaDescText").lineWidth = stage.canvas.width/2-230*ratio
        if(ratio==2)instance.getChildByName("historiaDescText").lineWidth = stage.canvas.width/2-410*ratio-115*ratio

        instance.getChildByName("fillCircle").x = Math.floor(instance.getChildByName("bgGreen").x+stage.canvas.width/4)
        instance.getChildByName("fillCircle").y = Math.floor(instance.getChildByName("historiaDescText").y+instance.getChildByName("historiaDescText").getBounds().height*ratio+160*ratio+20*ratio)

        instance.getChildByName("pieceOne").x = Math.floor(instance.getChildByName("fillCircle").x-145*ratio)
        instance.getChildByName("pieceOne").y = Math.floor(instance.getChildByName("fillCircle").y-145*ratio+147*ratio)

        instance.getChildByName("pieceTwo").x = Math.floor(instance.getChildByName("fillCircle").x-145*ratio+72*ratio)
        instance.getChildByName("pieceTwo").y = Math.floor(instance.getChildByName("fillCircle").y-145*ratio)

        instance.getChildByName("pieceThree").x = Math.floor(instance.getChildByName("fillCircle").x-145*ratio)
        instance.getChildByName("pieceThree").y = Math.floor(instance.getChildByName("fillCircle").y-145*ratio)

        instance.getChildByName("fillWhiteCircle").x = Math.floor(instance.getChildByName("fillCircle").x)
        instance.getChildByName("fillWhiteCircle").y = Math.floor(instance.getChildByName("fillCircle").y)

        instance.getChildByName("totalServicesText").x = instance.getChildByName("fillWhiteCircle").x-instance.getChildByName("totalServicesText").getBounds().width/2*ratio
        instance.getChildByName("totalServicesText").y = instance.getChildByName("fillWhiteCircle").y

        instance.getChildByName("totalServicesTitlesText").x = instance.getChildByName("fillWhiteCircle").x-instance.getChildByName("totalServicesTitlesText").getBounds().width/2*ratio
        instance.getChildByName("totalServicesTitlesText").y = instance.getChildByName("totalServicesText").y+instance.getChildByName("totalServicesTitlesText").getBounds().height*ratio
        
        instance.getChildByName("yearText").x = instance.getChildByName("fillWhiteCircle").x-instance.getChildByName("yearText").getBounds().width/2*ratio
        instance.getChildByName("yearText").y = instance.getChildByName("totalServicesTitlesText").y+instance.getChildByName("yearText").getBounds().height*ratio

         instance.getChildByName("containerTitlesPercent").x = (instance.getChildByName("bgWhiteWhiteTwo").x+stage.canvas.width/4)-totalWidth/2

    } ; 


window.AcercaHistory = createjs.promote(AcercaHistory, "Container");
}());