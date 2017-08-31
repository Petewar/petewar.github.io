(function () {

    function Svg(Iratio) {

        this.ratio = Iratio;
        this.Container_constructor();
        this.setup();

    }

    var instance;
    var ratio;

    var p = createjs.extend(Svg, createjs.Container);

    p.setup = function() {
        
        ratio = this.ratio;
        instance = this;

    };

    p.createSvg = function (Isvg,Icolor,IregX,IregY){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        if(IregX) svg.regX = IregX;
        if(IregY) svg.regY = IregY;
        svg.scaleX = ratio;
        svg.scaleY = ratio;
        return svg;
    }

     p.changeColor = function (Isvg,Icolor){
        
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


window.Svg = createjs.promote(Svg, "Container");
}());