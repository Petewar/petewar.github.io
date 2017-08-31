/**
 * Created by Andrew on 3/19/16.
 */
class TextInput extends createjs.Container {
  constructor() {
    super();
  }

  setRatio(Iratio,posX,posY){

    this.hitX = posX;
    this.hitY = posY;

    // Field Settings
    this.width = 390*Iratio;
    this.height = 12*Iratio;

    // Text Settings
    this.placeHolder = '';
    this.placeHolderTextColor = '#FFFFFF';
    this.textColor = '#FFFFFF';
    this.fontSize = 12*Iratio;
    this.cursorWidth = 1*Iratio;
    this.cursorColor = '#FFFFFF';

    this.ratio = Iratio

    // Private Settings
    this._hiddenInput = null;
    this._bg = null;
    this._placeHolderText = null;
    this._visiblePreCursorText = null;
    this._visiblePostCursorText = null;
    this._preCursorText = "";
    this._postCursorText = "";
    this._cursor = null;
    this._padding = 0;
    this._focused = false;
    this._selectedDuration = 0;

    this._setupDomNode();
    this._setupField();
    this._setupListeners();


  }

  updateResize(posX,posY) {
    this.hitX = posX
    this.hitY = posY
  }

  update() {
    this._setupField();
  }

  _getFontStyle() {
    return '14px BwModelicaLight';
  }

  _setupDomNode() {
    this._hiddenInput = document.createElement('input');
    this._hiddenInput.type = 'text';
    this._hiddenInput.style.display = 'none';
    this._hiddenInput.style.position = 'absolute';
    this._hiddenInput.style.zIndex = -100;
    document.body.appendChild(this._hiddenInput);
  }

  _setupField() {
    this._setupVariables();
    this._setupBg();
    this._setupPlaceHolderText();
    this._setupVisibleText();
    this._setupCursor();
  }

  _setupVariables() {
    this._padding = this.height - this.fontSize * 1.5;
  }

  _setupBg() {
    if (this._bg === null) {
      this._bg = new createjs.Shape();
      this.addChild(this._bg);
    } else {
      this._bg.graphics.clear();
    }
    this._bg.graphics.beginFill('#ccc').drawRect(-this.width/2, 0, this.width, this.height);
    this._bg.alpha = 0;
  }

  _setupPlaceHolderText() {

    if (this._placeHolderText === null) {

      this._placeHolderText = new createjs.Text(
        this.placeHolder,
        this._getFontStyle(),
        this.placeHolderTextColor
      );

      this._placeHolderText.scaleY = this.ratio
      this._placeHolderText.scaleX = this.ratio
      this._placeHolderText.alpha = 0.25
      this.addChild(this._placeHolderText);

    } else {

      this._placeHolderText.textAlign = "center";
      this._placeHolderText.text = this.placeHolder;
    }

  }

  _setupVisibleText() {

    if (this._visiblePreCursorText === null) {
      this._visiblePreCursorText = new createjs.Text(
        this._preCursorText,
        this._getFontStyle(),
        this.textColor
      );
      this._visiblePreCursorText.scaleY = this.ratio
      this._visiblePreCursorText.scaleX = this.ratio
      this.addChild(this._visiblePreCursorText);
    } else {
      this._visiblePreCursorText.textAlign = "center";
      this._visiblePreCursorText.text = this._preCursorText;
    }

    if (this._visiblePostCursorText === null) {
      this._visiblePostCursorText = new createjs.Text(
        this._postCursorText,
        this._getFontStyle(),
        this.textColor
      );
      this._visiblePostCursorText.scaleY = this.ratio
      this._visiblePostCursorText.scaleX = this.ratio
      this.addChild(this._visiblePostCursorText);
    } else {
      this._visiblePostCursorText.textAlign = "center";
      this._visiblePostCursorText.text = this._postCursorText;
    }
  }

  _setupCursor() {
    if (this._cursor === null) {
      this._cursor = new createjs.Shape();
      this._cursor.graphics
        .beginFill(this.cursorColor)
        .drawRect(0, 0, this.cursorWidth, 12*this.ratio);
      this._cursor.x = 0; // this will signify pure text offset
      this._cursor.visible = false;
      this.addChild(this._cursor);
    } else {

    }
  }

  _resetStrings(){
    this._visiblePreCursorText.text = ""
    this._visiblePostCursorText.text = ""
  }

  _kill(){
    this._visiblePreCursorText.text = ""
    this._visiblePostCursorText.text = ""
    this.removeChild(this._bg);
    this.removeChild(this._visiblePreCursorText);
    this.removeChild(this._visiblePostCursorText);
    this.removeChild(this._cursor);
    this.removeChild(this._placeHolderText)
    document.body.removeChild(this._hiddenInput);
  }

  _setupListeners() {

    window.addEventListener('click', (e) => {

      // Page
      const pX = e.pageX*this.ratio;
      const pY = e.pageY*this.ratio;

      // Canvas
      if (this.stage === null) return;
      const cX = this.hitX;
      const cY = this.hitY;

      // Local
      const lX = pX - cX - this.x;
      const lY = pY - cY - this.y;

      this._click({x: lX, y: lY});

    });

    this._hiddenInput.addEventListener('input', (e) => {
      if (this._focused) {
        e.preventDefault();
        this._preCursorText = this._hiddenInput.value;
        this.update();
        this._cursor.x = this._visiblePreCursorText.getMeasuredWidth()/2*this.ratio;
      }
    });

    this.on('tick', () => this._tick);
  }

  _click(localXY) {
    this._focused = (
      localXY.x > 0 &&
      localXY.y > 0 &&
      localXY.x < this.width &&
      localXY.y < this.height
    );
    this._selectedDuration = 0;

    this._placeHolderText.visible = !this._focused && this._hiddenInput.value === "";
    if (this._focused) {
      this._selectInput();
    } else {
      this._deSelectInput();
      this._cursor.visible = false;
    }
  }

  _tick() {
    if (this._focused) {
      if (this._selectedDuration % 100 === 0) {
        this._cursor.visible = !this._cursor.visible;
      }
      this._selectedDuration++;
    }
  }

  getText() {
      return this._preCursorText;
  }

  getTextCursor() {
      return this._placeHolderText.text;
  }

  _selectInput() {
    this._hiddenInput.style.display = 'block';
    this._hiddenInput.style.left = (this.x + this.stage.canvas.offsetLeft + this._padding) + 'px';
    this._hiddenInput.style.top = (this.y + this.stage.canvas.offsetTop + this._padding) + 'px';
    this._hiddenInput.focus();
  }

  _deSelectInput() {
    this._hiddenInput.style.display = 'none';
  }
}