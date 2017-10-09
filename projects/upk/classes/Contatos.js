!function(){function e(e,t,a,i){this.Container_constructor(),this.dispatchInstance=e,this.ratio=t,this.svg=a,this.aspectRatio=i,this.setup()}function t(){var e=new createjs.Event("show");m.dispatchEvent(e)}function a(e){(v=new createjs.LoadQueue(!0)).addEventListener("fileload",i),v.loadFile(e,!0)}function i(e){u=e.result.contato[0],v.removeEventListener("fileload",i),v=null,n([u.bgImage])}function n(e){loader=new Loader(r,C,e),r.addChild(loader),r.addEventListener("loaderComplete",c)}function c(e){r.removeEventListener("loaderComplete",c),loader.kill(),r.removeChild(loader),loader=null,x=e.contentLoader[0],o(),l();var t=new createjs.Event("show");m.dispatchEvent(t)}function o(){var e=new createjs.Shape;e.name="bg",e.graphics.beginFill("#FFFFFF").drawRect(0,0,stage.canvas.width,stage.canvas.height),r.addChild(e);var t=y.createSvg(u.shapeClose,"#333333");t.name="closeIcon",t.x=40*C,t.y=66*C,r.addChild(t);var a=new createjs.Shape;a.name="closeIconHit",a.alpha=.01,a.graphics.beginFill("#FFFFFF").drawRect(0,0,22*C,22*C),a.x=40*C,a.y=66*C,r.addChild(a);var i=new createjs.Text;i.name="contactTitleText",i.font="36px BwModelica-ExtraBold",i.textBaseline="alphabetic",i.color="#333333",1==C&&(i.lineWidth=280*C),2==C&&(i.lineWidth=140*C),i.lineHeight=40,i.text=u.contatoTitle,i.scaleX=C,i.scaleY=C,i.x=stage.canvas.width/2-stage.canvas.width/4-i.getBounds().width/2*C,i.y=stage.canvas.height/4+i.getBounds().height/2*C,r.addChild(i);var n=new createjs.Text;n.name="contactDescText",n.font="14px BwModelica-Regular",n.textBaseline="alphabetic",n.color="#333333",1==C&&(n.lineWidth=280*C),2==C&&(n.lineWidth=140*C),n.lineHeight=30,n.text=u.contatoDesc,n.scaleX=C,n.scaleY=C,n.x=i.x,n.y=i.y+i.getBounds().height*C-30*C+40*C,r.addChild(n);var c=new createjs.Shape;c.name="bgMask",c.x=stage.canvas.width/2,c.graphics.beginFill("#333333").drawRect(0,0,stage.canvas.width/2,stage.canvas.height),r.addChild(c),x.name="bgImage",x.x=stage.canvas.width/8,B.resize(x,x.getBounds().width,x.getBounds().height,"halfFullWidth"),r.addChild(x),x.mask=c}function l(){TweenMax.from(r.getChildByName("bg"),.75,{scaleX:0,ease:Expo.easeInOut}),TweenMax.from(r.getChildByName("closeIcon"),1,{alpha:0,rotation:180,ease:Expo.easeInOut,onComplete:s()}),TweenMax.from(r.getChildByName("contactTitleText"),1,{y:r.getChildByName("contactTitleText").y+100*C,alpha:0,ease:Expo.easeInOut}),TweenMax.from(r.getChildByName("contactDescText"),1,{y:r.getChildByName("contactDescText").y+300*C,alpha:0,ease:Expo.easeInOut}),TweenMax.from(r.getChildByName("bgMask"),1,{delay:.5,scaleX:0,ease:Expo.easeInOut})}function s(){r.getChildByName("bg").cursor="auto",r.getChildByName("bg").type="block",r.getChildByName("bg").addEventListener("mouseover",d),r.getChildByName("closeIconHit").cursor="pointer",r.getChildByName("closeIconHit").type="close",r.getChildByName("closeIconHit").addEventListener("mouseover",d),r.getChildByName("closeIconHit").addEventListener("mouseout",h),r.getChildByName("closeIconHit").addEventListener("click",g)}function d(e){e.target.type}function h(e){e.target.type}function g(e){switch(e.target.type){case"block":break;case"close":SWFAddress.setValue("/home")}}var r,m,C,y,B,v,u,N,x,p=createjs.extend(e,createjs.Container);p.setup=function(){r=this,m=this.dispatchInstance,C=this.ratio,B=this.aspectRatio,y=this.svg},p.init=function(){null==u?a("data/contact.json"):(o(),l(),N=setTimeout(t,10))},p.kill=function(){r.getChildByName("bg").graphics.clear(),r.getChildByName("bg").removeEventListener("mouseover",d),r.removeChild(r.getChildByName("bg")),r.getChildByName("closeIconHit").graphics.clear(),r.getChildByName("closeIconHit").removeEventListener("mouseover",d),r.getChildByName("closeIconHit").removeEventListener("mouseout",h),r.getChildByName("closeIconHit").removeEventListener("click",g),r.removeChild(r.getChildByName("closeIconHit")),r.removeChild(r.getChildByName("closeIcon")),r.removeChild(r.getChildByName("contactTitleText")),r.removeChild(r.getChildByName("contactDescText")),r.removeChild(r.getChildByName("bgMask")),r.removeChild(r.getChildByName("contactDescText")),r.removeChild(r.getChildByName("bgImage"))},p.resize=function(){loader&&loader.resize(),r.getChildByName("bg")&&(r.getChildByName("bg").graphics.clear(),r.getChildByName("bg").graphics.beginFill("#FFFFFF").drawRect(0,0,stage.canvas.width,stage.canvas.height),r.getChildByName("closeIcon").x=40*C,r.getChildByName("closeIcon").y=66*C,r.getChildByName("closeIconHit").x=40*C,r.getChildByName("closeIconHit").y=66*C,r.getChildByName("contactTitleText").x=stage.canvas.width/2-stage.canvas.width/4-r.getChildByName("contactTitleText").getBounds().width/2*C,r.getChildByName("contactTitleText").y=stage.canvas.height/4+r.getChildByName("contactTitleText").getBounds().height/2*C,r.getChildByName("contactDescText").x=r.getChildByName("contactTitleText").x,r.getChildByName("contactDescText").y=r.getChildByName("contactTitleText").y+r.getChildByName("contactTitleText").getBounds().height*C-30*C+40*C,r.getChildByName("bgMask").graphics.clear(),r.getChildByName("bgMask").graphics.beginFill("#333333").drawRect(0,0,Math.floor(stage.canvas.width/2),stage.canvas.height),r.getChildByName("bgMask").x=stage.canvas.width/2,r.getChildByName("closeIconHit").x=40*C,r.getChildByName("closeIconHit").y=66*C,r.getChildByName("bgImage").x=stage.canvas.width/8,B.resize(r.getChildByName("bgImage"),r.getChildByName("bgImage").getBounds().width,r.getChildByName("bgImage").getBounds().height,"halfFullWidth"))},window.Contatos=createjs.promote(e,"Container")}();