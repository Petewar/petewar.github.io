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

    p.resize = function (Icontainer,IcontainerW,IcontainerH,IbiggerFrame,Ivalue,Ivalue2){

        if(IbiggerFrame=="more"){
            scalingFactor = scaleSize(stage.canvas.width+Ivalue,stage.canvas.height+Ivalue,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="less"){
            scalingFactor = scaleSize(stage.canvas.width-Ivalue,stage.canvas.height-Ivalue,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaSlider"){
            scalingFactor = scaleSize(stage.canvas.width/2,560*ratio,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaCalendar"){
            scalingFactor = scaleSize(stage.canvas.width/2,stage.canvas.width/2,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaFeature"){
            scalingFactor = scaleSize(Math.floor(stage.canvas.width-632*ratio),560*ratio,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaSection"){
            scalingFactor = scaleSize(stage.canvas.width,240*ratio,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaTeam"){
            scalingFactor = scaleSize(Ivalue,632*ratio,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaGallery"){
            scalingFactor = scaleSize(stage.canvas.width,408*ratio,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaMenu"){
            scalingFactor = scaleSize(Ivalue+50*ratio,Ivalue2+50*ratio,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaClient"){
            scalingFactor = scaleSize(stage.canvas.width/2,190*ratio,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="fullWidth"){
            scalingFactor = scaleSize(stage.canvas.width,IcontainerH,IcontainerW,IcontainerH);  
        }

        if(IbiggerFrame=="areaServices"){
            scalingFactor = scaleSize(stage.canvas.width,512*ratio,IcontainerW,IcontainerH);  
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