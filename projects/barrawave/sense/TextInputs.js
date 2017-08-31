(function () {

    function TextInputs(Iratio) {

        this.ratio = Iratio;
        this.Container_constructor();
        this.setup();

    }

    var instance;
    var ratio;

    var hitX;
    var hitY;

    var width;
    var height;

    var placeHolder;
    var placeHolderTextColor;
    var textColor;
    var fontSize;
    var cursorWidth;
    var cursorColor;

    var hiddenInput;
    var bg;
    var placeHolderText
    var visiblePreCursorText
    var visiblePostCursorText
    var preCursorText;
    var postCursorText;
    var cursor;
    var padding
    var focused
    var selectedDuration

    var p = createjs.extend(TextInputs, createjs.Container);

    p.setup = function() {
        
        ratio = this.ratio;
        instance = this;

    };

     p.setRatio = function(posX,posY) {
        
        hitX = posX;
        hitY = posY;

        // Field Settings
        width = 380*ratio;
        height = 20*ratio;

        // Text Settings
        placeHolder = '';
        placeHolderTextColor = '#000000';
        textColor = '#000000';
        fontSize = 12*ratio;
        cursorWidth = 1*ratio;
        cursorColor = '#000000';

        // Private Settings
        hiddenInput = null;
        bg = null;
        placeHolderText = null;
        visiblePreCursorText = null;
        visiblePostCursorText = null;
        preCursorText = "";
        postCursorText = "";
        cursor = null;
        padding = 0;
        focused = false;
        selectedDuration = 0;

        setupDomNode();
        setupField();
        setupListeners();

    };

    p.updateResize = function(posX,posY) {
        hitX = posX
        hitY = posY
    }

    p.update = function() {
       setupField();
    }

    function getFontStyle() {
        return '12px OpenSans-Regular';
    }

    function setupDomNode() {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'text';
        hiddenInput.style.display = 'none';
        hiddenInput.style.position = 'absolute';
        hiddenInput.style.zIndex = -100;
        document.body.appendChild(hiddenInput);
    }


    function setupField() {
        
        setupVariables();
        setupBg();
        setupPlaceHolderText();
        setupVisibleText();
        setupCursor();

    }

    function setupVariables() {
        padding = height - fontSize * 1.5;
    }

    function setupBg() {
        
        if (bg === null) {
          bg = new createjs.Shape();
          instance.addChild(bg);
        } else {
          bg.graphics.clear();
        }

        bg.graphics.beginFill('#ccc').drawRect(0, 0, width, height);
        bg.alpha = 0;
    }

    function setupPlaceHolderText() {

        if (placeHolderText === null) {

            placeHolderText = new createjs.Text(placeHolder,getFontStyle(),placeHolderTextColor);

            placeHolderText.scaleY = ratio
            placeHolderText.scaleX = ratio
            placeHolderText.alpha = 0.25
            instance.addChild(placeHolderText);

        } else {

          placeHolderText.textAlign = "left";
          placeHolderText.text = placeHolder;
        }
    }

    function setupVisibleText() {

        if (visiblePreCursorText === null) {
            
            visiblePreCursorText = new createjs.Text(preCursorText,getFontStyle(),textColor);
            visiblePreCursorText.scaleY = ratio
            visiblePreCursorText.scaleX = ratio
            instance.addChild(visiblePreCursorText);

        } else {
            
            visiblePreCursorText.textAlign = "left";
            visiblePreCursorText.text = preCursorText;

        }

        if (visiblePostCursorText === null) {
            
            visiblePostCursorText = new createjs.Text(postCursorText,getFontStyle(),textColor);
            visiblePostCursorText.scaleY = ratio
            visiblePostCursorText.scaleX = ratio
            instance.addChild(visiblePostCursorText);

        } else {

            visiblePostCursorText.textAlign = "left";
            visiblePostCursorText.text = postCursorText;

        }
    }

    function setupCursor() {
        
        if (cursor === null) {
            
            cursor = new createjs.Shape();
            cursor.graphics.beginFill(cursorColor).drawRect(0, 0, cursorWidth, 12*ratio);
            cursor.x = 0; // this will signify pure text offset
            cursor.visible = false;
            instance.addChild(cursor);

        } else {

        }
    }

    function resetStrings(){
        visiblePreCursorText.text = ""
        visiblePostCursorText.text = ""
    }

    p.kill = function(){
        visiblePreCursorText.text = ""
        visiblePostCursorText.text = ""
        instance.removeChild(bg);
        instance.removeChild(visiblePreCursorText);
        instance.removeChild(visiblePostCursorText);
        instance.removeChild(cursor);
        instance.removeChild(placeHolderText)
        document.body.removeChild(hiddenInput);
    }

    p.setPlaceHolder = function(IText){
        placeHolder = IText
    }

    function setupListeners() {

        window.addEventListener('click', (e) => {

            // Page
            var pX = e.pageX*ratio;
            var pY = e.pageY*ratio;

            // Canvas
            if (stage === null) return;
            var cX = hitX;
            var cY = hitY;

            // Local
            var lX = pX - cX - instance.x;
            var lY = pY - cY - instance.y;

            click({x: lX, y: lY});

        });

        hiddenInput.addEventListener('input', (e) => {
        
            if (focused) {
                e.preventDefault();
                preCursorText = hiddenInput.value;
                instance.update();
                if(visiblePreCursorText)cursor.x = visiblePreCursorText.getBounds().width*ratio;
                cursor.y = 1*ratio;
            }

        });

        instance.on('tick', () => tick());

    }

    function click(localXY) {
        
        focused = (
          localXY.x > 0 &&
          localXY.y > 0 &&
          localXY.x < width &&
          localXY.y < height
        );

        selectedDuration = 0;

        placeHolderText.visible = !focused && hiddenInput.value === "";
        
        if (focused) {
            selectInput();
        } else {
          deSelectInput();
          cursor.visible = false;
        }
    }

    function tick(){

        if (focused) {
          if (selectedDuration % 100 === 0) {
            cursor.visible = !cursor.visible;
          }
          selectedDuration++;
        }
    }

    function getText() {
        return preCursorText;
    }

    function getTextCursor() {
        return placeHolderText.text;
    }

    function selectInput() {
        hiddenInput.style.display = 'block';
        hiddenInput.style.left = (instance.x + stage.canvas.offsetLeft + padding) + 'px';
        hiddenInput.style.top = (instance.y + stage.canvas.offsetTop + padding) + 'px';
        hiddenInput.focus();
    }

    function deSelectInput() {
        hiddenInput.style.display = 'none';
    }

window.TextInputs = createjs.promote(TextInputs, "Container");
}());