(function () {

    function AspectRatio(Iratio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();

    }
    
    var ratio;
    var scalingFactor

    var p = createjs.extend(AspectRatio, createjs.Container);

    p.setup = function() {
            ratio = this.ratio;
    };

    function scaleSize(maxW, maxH, currW, currH){

        var screenWidth = maxW;
        var screenHeight = maxH;
        var screenAspectRatio = screenWidth / screenHeight;

        var imageWidth = currW;
        var imageHeight = currH;
        var imageAspectRatio = imageWidth / imageHeight;
        
        var scalingFactor;

        if (screenAspectRatio > imageAspectRatio) {
            scalingFactor = screenWidth / imageWidth;
        } else {
            scalingFactor = screenHeight / imageHeight;
        }
        
        return scalingFactor
    }

    p.resize = function (Icontainer,IcontainerW,IcontainerH,IbiggerFrame,Ivalue){

        if(IbiggerFrame=="more"){
            scalingFactor = scaleSize(stage.canvas.width+Ivalue,stage.canvas.height+Ivalue,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="less"){
            scalingFactor = scaleSize(stage.canvas.width-Ivalue,stage.canvas.height-Ivalue,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="area"){
            scalingFactor = scaleSize(stage.canvas.width/2,560*ratio,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="fullWidth"){
            scalingFactor = scaleSize(stage.canvas.width,IcontainerH,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame==undefined){
            scalingFactor = scaleSize(stage.canvas.width,stage.canvas.height,IcontainerW,IcontainerH);  
        }
        
        Icontainer.scaleX = scalingFactor;
        Icontainer.scaleY = scalingFactor;
    }

    p.getScalingFactor = function(){
        return scalingFactor
    }

    p.resizeSquare = function (Icontainer,IcontainerW,IcontainerH){
        
        var scalingFactor = scaleSize(stage.canvas.width,stage.canvas.width,IcontainerW,IcontainerH);  
        Icontainer.scaleX = scalingFactor;
        Icontainer.scaleY = scalingFactor;
    }

window.AspectRatio = createjs.promote(AspectRatio, "Container");
}());