!function(){function e(e,a,t){this.Container_constructor(),this.dispatchInstance=e,this.ratio=a,this.svg=t,this.setup()}function a(e){(s=new createjs.LoadQueue(!0)).addEventListener("fileload",t),s.loadFile(e,!0)}function t(e){m=e.result.navigation[0],s.removeEventListener("fileload",t),s=null,i(),n();var a=new createjs.Event("init");g.dispatchEvent(a)}function i(){var e=new createjs.Shape;e.name="bgQuickMenu",e.visible=!1,e.graphics.beginFill("#ffffff").drawRect(0,0,stage.canvas.width,142*o),h.addChild(e);var a=new createjs.Shape;a.name="bgSideBar",a.graphics.beginFill("#8EC640").drawRect(0,0,100*o,732*o),h.addChild(a),C=732*o;var t=new createjs.Container;t.name="containerBurger",t.x=50*o-14*o,t.y=62*o,h.addChild(t);for(M=0;M<3;M++){var i=new createjs.Shape;i.name="shapeBurger"+M,i.y=9*o*M,i.graphics.beginFill("#ffffff").drawRect(0,0,28*o,3*o),t.addChild(i)}var n=new createjs.Shape;n.mouseChildren=!1,n.name="hitBurger",n.alpha=.01,n.graphics.beginFill("#8EC640").drawRect(0,0,28*o,21*o),t.addChild(n);var d=new createjs.Shape;d.name="bgCalendar",d.graphics.beginFill("#FFFFFF").drawRect(0,0,100*o,122*o),d.y=C-122*o,h.addChild(d);var r=u.createSvg(m.shapeCalendar,"#333333");r.name="calendarIcon",r.x=Math.floor(50*o-22.5*o),r.y=Math.floor(C-122*o+30*o),h.addChild(r);var l=new createjs.Text;l.name="titleCalendar",l.font="9px BwModelica-ExtraBold",l.textBaseline="alphabetic",l.color="#333333",l.text=m.titleCalendar,1==o&&(l.lineWidth=62*o),2==o&&(l.lineWidth=42*o),l.scaleX=o,l.scaleY=o,l.x=50*o-l.getBounds().width/2*o,l.y=C-122*o+30*o+36*o+7*o+10*o,h.addChild(l);var c=new createjs.Shape;c.name="hitCalendar",c.alpha=.01,c.graphics.beginFill("#FFFFFF").drawRect(0,0,100*o,122*o),c.y=C-122*o,h.addChild(c);var g=new createjs.Container;g.name="containerQuickMenu",g.y=77*o,h.addChild(g);var s=new createjs.Container;s.name="containerLogo",s.x=177*o,s.y=32*o,h.addChild(s);var y=u.createSvg(m.shapeLogoLeft,"#808285"),N=u.createSvg(m.shapeLogoRight,"#8ec640");N.x=45*o,N.y=2*o,s.addChild(y),s.addChild(N);for(var M=0;M<m.menu.length;M++){var p=new createjs.Text;p.name="titleQuickMenu"+M,p.font="14px BwModelica-Bold",p.textBaseline="alphabetic",p.color="#333333",p.text=m.menu[M],p.scaleX=o,p.scaleY=o,p.x=(p.getBounds().width*o+50*o)*M,g.addChild(p);var f=new createjs.Shape;f.name="strokeQuickMenu"+M,f.graphics.beginFill("#8EC640").drawRect(0,0,p.getBounds().width*o,4*o),f.x=Math.floor((p.getBounds().width*o+50*o)*M),f.y=Math.floor(p.getBounds().height/2*o-3*o),f.scaleX=0,g.addChild(f);var k=new createjs.Shape;k.name="hitQuickMenu"+M,k.instance=M+1,k.graphics.beginFill("#FFFFFF").drawRect(0,0,p.getBounds().width*o+25*o,p.getBounds().height*o+25*o),k.alpha=.01,k.x=(p.getBounds().width*o+50*o)*M-12*o,k.y=-p.getBounds().height*o-10*o,g.addChild(k)}B=k.x+p.getBounds().width*o+100*o,g.x=stage.canvas.width/2+45*o}function n(){TweenMax.from(h.getChildByName("bgSideBar"),1,{scaleX:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("bgCalendar"),1,{delay:.5,scaleX:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("calendarIcon"),1,{delay:1,alpha:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("titleCalendar"),1,{delay:1.25,alpha:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("containerBurger"),1,{delay:.5,alpha:0,ease:Expo.easeInOut,onComplete:d()})}function d(){h.getChildByName("containerBurger").getChildByName("hitBurger").cursor="pointer",h.getChildByName("containerBurger").getChildByName("hitBurger").type="menu",h.getChildByName("containerBurger").getChildByName("hitBurger").addEventListener("mouseover",r),h.getChildByName("containerBurger").getChildByName("hitBurger").addEventListener("mouseout",l),h.getChildByName("containerBurger").getChildByName("hitBurger").addEventListener("click",c),h.getChildByName("hitCalendar").cursor="pointer",h.getChildByName("hitCalendar").type="calendar",h.getChildByName("hitCalendar").addEventListener("mouseover",r),h.getChildByName("hitCalendar").addEventListener("mouseout",l),h.getChildByName("hitCalendar").addEventListener("click",c);for(var e=0;e<m.menu.length;e++)h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).cursor="pointer",h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).type="hitQuickMenu",h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).name="hitQuickMenu"+e,h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).addEventListener("mouseover",r),h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).addEventListener("mouseout",l),h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).addEventListener("click",c)}function r(e){e.target.type}function l(e){e.target.type}function c(e){switch(e.target.type){case"menu":SWFAddress.setValue("/menu");break;case"calendar":SWFAddress.setValue("/agenda");break;case"hitQuickMenu":switch(e.target.name){case"hitQuickMenu0":SWFAddress.setValue("/home");break;case"hitQuickMenu1":SWFAddress.setValue("/servicos");break;case"hitQuickMenu2":SWFAddress.setValue("/contatos")}}}var h,o,u,g,s,m,C,B,y=0,N=!1,M=createjs.extend(e,createjs.Container);M.setup=function(){h=this,o=this.ratio,u=this.svg,g=this.dispatchInstance,a("data/navigation.json")},M.getNav=function(e){return y},M.setValue=function(e){-1!=y&&-2!=y&&(h.getChildByName("containerQuickMenu").getChildByName("strokeQuickMenu"+y).scaleX=0),-1!=(y=e)&&-2!=y&&TweenMax.to(h.getChildByName("containerQuickMenu").getChildByName("strokeQuickMenu"+y),1,{scaleX:1,ease:Expo.easeInOut})},M.colapse=function(){C=142*o+122*o,0==N&&(N=!0,TweenMax.to(h.getChildByName("bgSideBar"),1,{y:-732*o+142*o,ease:Expo.easeOut}),TweenMax.to(h.getChildByName("bgCalendar"),.5,{y:C-122*o,ease:Expo.easeInOut}),TweenMax.to(h.getChildByName("calendarIcon"),.5,{y:Math.floor(C-122*o+30*o),ease:Expo.easeInOut}),TweenMax.to(h.getChildByName("titleCalendar"),.5,{y:C-122*o+30*o+36*o+7*o+10*o,ease:Expo.easeInOut}),h.getChildByName("hitCalendar").y=C-122*o,1!=y&&-1!=y&&-2!=y||(h.getChildByName("bgQuickMenu").visible=!0,h.getChildByName("containerLogo").visible=!0,TweenMax.from(h.getChildByName("bgQuickMenu"),.5,{alpha:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("containerLogo"),.5,{alpha:0,ease:Expo.easeInOut})))},M.expand=function(){C=732*o,1==N&&(N=!1,TweenMax.to(h.getChildByName("bgSideBar"),1,{y:0,ease:Expo.easeInOut}),TweenMax.to(h.getChildByName("bgCalendar"),1,{y:C-122*o,ease:Expo.easeInOut}),TweenMax.to(h.getChildByName("calendarIcon"),1,{y:Math.floor(C-122*o+30*o),ease:Expo.easeInOut}),TweenMax.to(h.getChildByName("titleCalendar"),1,{y:C-122*o+30*o+36*o+7*o+10*o,ease:Expo.easeInOut}),h.getChildByName("hitCalendar").y=C-122*o,1!=y&&-1!=y&&-2!=y||(h.getChildByName("bgQuickMenu").visible=!1,h.getChildByName("containerLogo").visible=!1))},M.hide=function(){h.getChildByName("containerQuickMenu").visible=!1,h.getChildByName("bgQuickMenu").visible=!1,h.getChildByName("containerLogo").visible=!1},M.show=function(){1==y||-1==y||-2==y?(h.getChildByName("containerQuickMenu").visible=!0,TweenMax.from(h.getChildByName("containerQuickMenu"),1,{alpha:0,ease:Expo.easeInOut})):(h.getChildByName("containerQuickMenu").visible=!0,h.getChildByName("bgQuickMenu").visible=!0,h.getChildByName("containerLogo").visible=!0,TweenMax.from(h.getChildByName("containerQuickMenu"),1,{alpha:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("bgQuickMenu"),1,{delay:.5,alpha:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("containerLogo"),1,{delay:.5,alpha:0,ease:Expo.easeInOut}))},M.changeToLight=function(){for(var e=0;e<m.menu.length;e++)h.getChildByName("containerQuickMenu").getChildByName("titleQuickMenu"+e).color="#FFFFFF",h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).graphics.clear(),h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).graphics.beginFill("#333333").drawRect(0,0,h.getChildByName("containerQuickMenu").getChildByName("titleQuickMenu"+e).getBounds().width*o+25*o,h.getChildByName("containerQuickMenu").getChildByName("titleQuickMenu"+e).getBounds().height*o+25*o)},M.changeToDark=function(){for(var e=0;e<m.menu.length;e++)h.getChildByName("containerQuickMenu").getChildByName("titleQuickMenu"+e).color="#333333",h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).graphics.clear(),h.getChildByName("containerQuickMenu").getChildByName("hitQuickMenu"+e).graphics.beginFill("#ffffff").drawRect(0,0,h.getChildByName("containerQuickMenu").getChildByName("titleQuickMenu"+e).getBounds().width*o+25*o,h.getChildByName("containerQuickMenu").getChildByName("titleQuickMenu"+e).getBounds().height*o+25*o)},M.animate=function(){TweenMax.from(h.getChildByName("bgSideBar"),1,{scaleX:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("bgCalendar"),1,{delay:.5,scaleX:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("calendarIcon"),1,{delay:1,alpha:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("titleCalendar"),1,{delay:1.25,alpha:0,ease:Expo.easeInOut}),TweenMax.from(h.getChildByName("containerBurger"),1,{delay:.5,alpha:0,ease:Expo.easeInOut})},M.resize=function(){h.getChildByName("containerBurger").x=50*o-14*o,h.getChildByName("containerBurger").y=66*o,h.getChildByName("containerQuickMenu").x=stage.canvas.width/2+45*o,h.getChildByName("containerQuickMenu").y=77*o,h.getChildByName("bgQuickMenu").graphics.clear(),h.getChildByName("bgQuickMenu").graphics.beginFill("#ffffff").drawRect(0,0,stage.canvas.width,142*o)},window.Navigation=createjs.promote(e,"Container")}();