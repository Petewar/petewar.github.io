(function () {

    function Footer(Iratio,IinstanceDispatch) {

        this.ratio = Iratio;
        this.instanceDispatch = IinstanceDispatch;
        this.Container_constructor();
        this.setup();

    }
    
    var bgFooter
    var instance;
    var ratio;
    var bgHeight;
    var penisular;
    var blackSvg = "M56.000,9.713 L39.805,19.813 L29.046,39.005 L20.265,24.350 L12.050,39.005 L-0.000,18.896 L16.996,18.896 L23.322,18.896 L39.339,18.896 L39.308,-0.006 L56.000,9.713 Z"
    var idSvg = "M27.381,21.733 C26.467,21.733 25.751,21.010 25.751,20.086 C25.751,19.162 26.467,18.439 27.381,18.439 C28.293,18.439 29.009,19.162 29.009,20.086 C29.009,21.010 28.293,21.733 27.381,21.733 ZM27.381,18.655 C26.601,18.655 25.990,19.278 25.990,20.086 C25.990,20.894 26.601,21.517 27.381,21.517 C28.160,21.517 28.771,20.894 28.771,20.086 C28.771,19.278 28.160,18.655 27.381,18.655 ZM27.849,20.833 L27.376,20.117 L27.370,20.139 L26.765,20.139 L26.765,19.444 L27.066,19.444 L27.066,19.999 L27.353,19.999 C27.616,19.999 27.832,19.976 27.832,19.691 C27.832,19.561 27.772,19.492 27.689,19.454 C27.948,19.477 28.081,19.556 28.081,19.821 C28.081,20.090 27.930,20.137 27.644,20.173 L28.112,20.833 L27.849,20.833 ZM27.066,19.444 L27.066,19.411 L27.429,19.411 C27.519,19.411 27.613,19.420 27.689,19.454 C27.624,19.449 27.556,19.444 27.474,19.444 L27.066,19.444 ZM22.876,25.000 L1.810,25.000 C0.804,25.000 -0.013,24.192 -0.013,23.196 L-0.013,1.803 C-0.013,0.807 0.804,-0.000 1.810,-0.000 L22.876,-0.000 C23.884,-0.000 24.705,0.807 24.705,1.803 L24.705,23.196 C24.705,24.192 23.884,25.000 22.876,25.000 ZM3.420,21.528 L7.540,21.528 L7.540,9.028 L3.420,9.028 L3.420,21.528 ZM5.485,3.442 C4.308,3.442 3.358,4.405 3.358,5.592 C3.358,6.779 4.308,7.742 5.485,7.742 C6.658,7.742 7.610,6.779 7.610,5.592 C7.610,4.405 6.658,3.442 5.485,3.442 ZM21.272,14.760 C21.272,11.546 20.475,9.130 16.763,9.130 C14.980,9.130 13.672,9.722 13.184,11.111 L13.033,11.111 L13.033,9.028 L9.600,9.028 L9.600,21.528 L13.033,21.528 L13.033,15.402 C13.033,13.845 13.332,12.338 15.239,12.338 C17.121,12.338 17.152,14.117 17.152,15.501 L17.152,21.528 L21.272,21.528 L21.272,14.760 Z"
    var id
    var boundsId;
    var petewar;
    var instanceDispatch;
    var boundsPete;

    var p = createjs.extend(Footer, createjs.Container);

    p.setup = function() {

        instance = this;
        ratio = this.ratio;
        instanceDispatch = this.instanceDispatch

        bgAbout = new createjs.Shape();
        instance.addChild(bgAbout);

        bgHeight = 90*ratio;
        bgAbout.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width,bgHeight);

        penisular = new createjs.Text();
        penisular.font = "12px PT Sans";
        penisular.color = "#FFFFFF";
        penisular.text = "2016 - PENINSULAR PORT SERVICES";
        penisular.scaleX = ratio
        penisular.scaleY = ratio
        penisular.x = 100*ratio
        penisular.y = 30*ratio;
        instance.addChild(penisular);

        id = createSvg(idSvg,"#FFFFFF")
        id.x = stage.canvas.width-30*ratio-100*ratio
        id.y = 22*ratio
        instance.addChild(id)

        petewar = createSvg(blackSvg,"#FFFFFF")
        petewar.x = stage.canvas.width-30*ratio-100*ratio-35*ratio-15*ratio
        petewar.y = 22*ratio
        petewar.scaleX = 0.6*ratio;
        petewar.scaleY = 0.6*ratio;
        instance.addChild(petewar)
        
        boundsId = new createjs.Shape();
        boundsId.graphics.beginFill("#143483").drawRect(0, 0, 30*ratio,30*ratio);
        boundsId.x = stage.canvas.width-30*ratio-100*ratio
        boundsId.y = 22*ratio
        instance.addChild(boundsId)

        boundsPete = new createjs.Shape();
        boundsPete.graphics.beginFill("#143483").drawRect(0, 0, 30*ratio,30*ratio);
        boundsPete.x = stage.canvas.width-30*ratio-100*ratio-35*ratio-15*ratio
        boundsPete.y = 22*ratio
        instance.addChild(boundsPete)

        boundsPete.cursor = "pointer"
        boundsPete.alpha = 0.01
        boundsPete.addEventListener("mouseover", handlerOverId);
        boundsPete.addEventListener("mouseout", handlerOutId);
        boundsPete.addEventListener("click", handlerClickCredits); 

        boundsId.cursor = "pointer"
        boundsId.alpha = 0.01
        boundsId.addEventListener("mouseover", handlerOverId);
        boundsId.addEventListener("mouseout", handlerOutId);
        boundsId.addEventListener("click", handlerClickId); 

    };

    function handlerOverId(event){
        
    }

    function handlerOutId(event){
           
    }


    function handlerClickId(event){
        window.open("https://www.linkedin.com/in/marco-guerra-670537a0","_blank");
    }

    function handlerClickCredits(event){
        var customEvent = new createjs.Event("openOverlayCredits");
        instanceDispatch.dispatchEvent(customEvent);
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

    p.resize = function (){
        
        bgAbout.graphics.clear();
        bgAbout.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width,bgHeight);
        
        id.x = stage.canvas.width-30*ratio-100*ratio

        boundsId.x = stage.canvas.width-30*ratio-100*ratio
        boundsId.y = 22*ratio

        petewar.x = stage.canvas.width-30*ratio-100*ratio-35*ratio-15*ratio
        petewar.y = 22*ratio

        boundsPete.x = stage.canvas.width-30*ratio-100*ratio-35*ratio-15*ratio
        boundsPete.y = 22*ratio
    }

    p.getHeight = function (){
       return bgHeight;
    } 

window.Footer = createjs.promote(Footer, "Container");
}());