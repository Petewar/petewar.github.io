(function () {

    function AspectRatio() {

        this.Container_constructor();
        this.setup();

    }
    
    var p = createjs.extend(AspectRatio, createjs.Container);

    p.setup = function() {

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

    p.resize = function (Icontainer,IcontainerW,IcontainerH){
        
        var scalingFactor = scaleSize(stage.canvas.width,stage.canvas.height,IcontainerW,IcontainerH);  
        Icontainer.scaleX = scalingFactor;
        Icontainer.scaleY = scalingFactor;
    } 

    p.resizeSquare = function (Icontainer,IcontainerW,IcontainerH){
        
        var scalingFactor = scaleSize(stage.canvas.width/2,stage.canvas.width/2,IcontainerW,IcontainerH);  
        Icontainer.scaleX = scalingFactor;
        Icontainer.scaleY = scalingFactor;
    } 

    p.resizeSquareHd = function (Icontainer,IcontainerW,IcontainerH){
        
        var scalingFactor = scaleSize(stage.canvas.width/1.5,stage.canvas.width/3.5,IcontainerW,IcontainerH);  
        Icontainer.scaleX = scalingFactor;
        Icontainer.scaleY = scalingFactor;
    } 

window.AspectRatio = createjs.promote(AspectRatio, "Container");
}());