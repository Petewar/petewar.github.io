(function () {

    function ScrollBar(Iratio,Ialign,IinstanceTodispatch,IContentScroll,IContentScrollY) {

        this.Container_constructor();
        this.IContentScroll = IContentScroll
        this.IContentScrollY = IContentScrollY
        this.IinstanceTodispatch = IinstanceTodispatch
        this.Ialign = Ialign;
        this.ratio = Iratio;
        this.setup();

    }
    
    var contentScroll;
    var contentScrollY;
    var ratio;
    var scrollbar2;
    var button2;
    var desiredY;
    var lastY = 0;
    var damp;
    var instance;
    var instanceTodispatch;
    var mousewheelevt;
    var align;

    var p = createjs.extend(ScrollBar, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceTodispatch = instance.IinstanceTodispatch;
        contentScroll = instance.IContentScroll;
        contentScrollY = instance.IContentScrollY;
        align = instance.Ialign
        ratio = this.ratio

        createScroll();

        //FF doesn't recognize mousewheel as of FF3.x
        mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"
        if (document.attachEvent) { //if IE (and Opera depending on user setting)
            document.attachEvent("on"+mousewheelevt, displaywheel);
        } else if (document.addEventListener) { //WC3 browsers
            document.addEventListener(mousewheelevt, displaywheel, false);
        }

        window.addEventListener("keydown", moveKey);

    } ;

    function moveKey(e){

        var arrowAmount = 200;
            var pageAmount = stage.canvas.width*.95;
            if (e.keyCode == 37) { // up
                scrollbar2.currentValue += arrowAmount;
            } else if (e.keyCode == 39) { // down
                scrollbar2.currentValue -= arrowAmount;
            } else if (e.keyCode == 33) { // page up
                scrollbar2.currentValue += pageAmount;
            } else if (e.keyCode == 34) { // page down
                scrollbar2.currentValue -= pageAmount;
            }
            doScroll2()
    }

    function createScroll(){

        viewerW = stage.canvas.width
        viewerH = stage.canvas.height;
        var scrollW = 12*ratio;

        // width, height, label, color, rollColor, borderColor, borderThickness, corner, shadowColor, shadowBlur, hitPadding
        button2 = new zim.Button({
            width:scrollW,
            height:viewerH/contentScrollY*viewerH, /// note the proportion of viewable height / total height (then * viewable height)
            label:"",
            color:"#3a3c4a",
            rollColor:"#3f4150",
            corner:scrollW*.1,
            shadowBlur:false,
        })

        // min, max, step, button, barLength, barWidth, barColor, vertical, useTicks, inside
        scrollbar2 = new zim.Slider({
            min:0,
            max:-(contentScrollY-viewerH),
            step:0,
            button:button2,
            barLength:viewerH,
            barWidth:scrollW,
            barColor:"#FFFFFF",
            vertical:true,
            inside:true
        });
        
        scrollbar2.bar.alpha = 0.01
        damp = new zim.Damp(desiredY, .1);
        zim.expand(scrollbar2.button); // helps on mobile

        scrollbar2.currentValue = lastY;
        desiredY = align + scrollbar2.currentValue;
        damp.immediate(desiredY);
        doScroll2();

        scrollbar2.addEventListener("change", doScroll2);
        instance.addChild(scrollbar2);
        
        zim.Ticker.add(function() {
            contentScroll.y = damp.convert(desiredY);
        }, stage);
    }

    function displaywheel(e){

            var wheelAmount = 50;

            var evt=window.event || e;
            //check for detail first so Opera uses that instead of wheelDelta
            var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta;
             
            if (delta >= 0) {
                scrollbar2.currentValue += wheelAmount;
            } else {
                scrollbar2.currentValue -= wheelAmount;
            }  

            doScroll2();
    }

    function doScroll2() {

        desiredY = align+scrollbar2.currentValue;

        var customEvent = new createjs.Event("scrollChange");
        customEvent.yPos = scrollbar2.currentValue;
        instanceTodispatch.dispatchEvent(customEvent);
    };

    p.updateResize = function(newY,Ialign,Ivalue) {
        
        contentScrollY = newY;
        align = Ialign
        
        if(scrollbar2){
            scrollbar2.removeEventListener("change", doScroll2);
            instance.removeChild(scrollbar2);
            button2 = null;
            scrollbar2 = null;
            zim.Ticker.dispose(stage);
            damp = null;
            lastY = Ivalue;
        }

        createScroll()
    } ;

    p.kill = function(newY) {
        
        scrollbar2.removeEventListener("change", doScroll2);
        instance.removeChild(scrollbar2);
        
        document.removeEventListener(mousewheelevt, displaywheel, false);
        window.removeEventListener("keydown", moveKey);

        button2 = null;
        scrollbar2 = null;
        lastY = 0;
        damp.immediate(lastY);
        zim.Ticker.dispose(stage);
        damp = null;

    } ;

    p.updatePos = function(Iamount) {
        scrollbar2.currentValue = Iamount;
        desiredY = align + scrollbar2.currentValue;
        //damp.immediate(desiredY);
        doScroll2();
    } ; 


window.ScrollBar = createjs.promote(ScrollBar, "Container");
}());