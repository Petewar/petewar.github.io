!function(){function e(e){this.ratio=e,this.Container_constructor(),this.setup()}var t,r,a=createjs.extend(e,createjs.Container);a.setup=function(){r=this.ratio,t=this},a.createSvg=function(e,t,a,n){var c;c=null==t?"#FFFFFF":t;var i=new createjs.Shape;return i.graphics.beginFill(c),i.graphics.decodeSVGPath(e),a&&(i.regX=a),n&&(i.regY=n),i.scaleX=r,i.scaleY=r,i},a.changeColor=function(e,t){var a;a=null==t?"#FFFFFF":t;var n=new createjs.Shape;return n.graphics.beginFill(a),n.graphics.decodeSVGPath(e),n.scaleX=r,n.scaleY=r,n},window.Svg=createjs.promote(e,"Container")}();