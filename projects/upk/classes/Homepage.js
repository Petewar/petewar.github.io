!function(){function e(e,t,i,a){this.Container_constructor(),this.dispatchInstance=e,this.ratio=t,this.aspectRatio=i,this.svg=a,this.setup()}function t(){var e=new createjs.Event("show");m.dispatchEvent(e)}function i(e){(B=new createjs.LoadQueue(!0)).addEventListener("fileload",a),B.loadFile(e,!0)}function a(e){N=e.result.homepage[0],B.removeEventListener("fileload",a),B=null,H=N.imagesSlider.length,S=N.imagesTeam.length,N.imagesSlider.push(N.bgServices),N.imagesSlider.push(N.imgFeatureServices),N.imagesSlider.push(N.sectionTestimonialsImage),N.imagesSlider.push(N.sectionTeamImage),N.imagesSlider.push(N.clientImage),n(N.imagesSlider.concat(N.imagesTeam))}function n(e){y=new Loader(s,d,e),s.addChild(y),s.addEventListener("loaderComplete",o)}function o(e){s.removeEventListener("loaderComplete",o),y.kill(),s.removeChild(y),y=null,v=e.contentLoader.slice(0,H),f=[e.contentLoader[H],e.contentLoader[H+1]],u=[e.contentLoader[H+2],e.contentLoader[H+3]],T=e.contentLoader[H+4],p=e.contentLoader.slice(H+5,H+5+S),g(),h(),l();var t=new createjs.Event("show");m.dispatchEvent(t)}function g(){var e=new createjs.Shape;e.name="bg",e.graphics.beginFill("#ffffff").drawRect(0,0,stage.canvas.width,stage.canvas.height),s.addChild(e);var t=new createjs.Container;t.name="containerContent",s.addChild(t);var i=new Slider(d,v,N.titleSlider,N.headerSlider,N.button,C.createSvg(N.shapePlay,"#333333"),C.createSvg(N.shapePause,"#333333"),c);i.name="slider";var a=new ServicosHome(d,f,N.titleServices,N.textServices,N.headerFeatureServices,N.titleFeatureServices,N.textFeatureServices,N.buttonCaps,N.imgTitleFeatureServices,C.createSvg(N.shapeArrow,"#8EC640"),c,i.getHeight());a.name="servicosHome";var n=new Section(d,u[0],N.sectionTestimonialsTitle,c,i.getHeight()+a.getHeight());n.name="sectionTestimonials";var o=new Testimonials(d,N.testimonialsTitles,N.testimonialsText,N.testimonialsStars,N.shapeStar,N.shapeStarStroke,C,i.getHeight()+a.getHeight()+n.getHeight());o.name="testimonials";var g=new SectionColor(d,u[1],N.sectionTeamTitle,c,i.getHeight()+a.getHeight()+n.getHeight()+o.getHeight());g.name="sectionTeam";var l=new Team(s,d,c,p,N.teamNames,N.teamPosition,C.createSvg(N.shapeDrag,"#8EC640"),i.getHeight()+a.getHeight()+n.getHeight()+o.getHeight()+g.getHeight());l.name="team";var h=new Clients(d,T,N.titleClients,c,i.getHeight()+a.getHeight()+n.getHeight()+o.getHeight()+g.getHeight()+l.getHeight());h.name="clients";var r=new Footer(d,N.titleFooter,N.headerFooter,N.buttonFooter,N.yearFooter,C.createSvg(N.certificationOne,"#ffffff"),C.createSvg(N.certificationTwo,"#ffffff"),i.getHeight()+a.getHeight()+n.getHeight()+o.getHeight()+g.getHeight()+l.getHeight()+h.getHeight());r.name="footer",t.addChild(a),t.addChild(i),t.addChild(n),t.addChild(o),t.addChild(g),t.addChild(l),t.addChild(h),t.addChild(r)}function l(){TweenMax.from(s.getChildByName("bg"),.75,{scaleX:0,ease:Expo.easeInOut}),TweenMax.from(m.getChildByName("scrollBar"),1,{delay:.75,alpha:0,ease:Expo.easeInOut})}function h(){s.addEventListener("goToTeamPos",r),w=s.getChildByName("containerContent").getChildByName("slider").getHeight()+s.getChildByName("containerContent").getChildByName("servicosHome").getHeight()+s.getChildByName("containerContent").getChildByName("sectionTestimonials").getHeight()+s.getChildByName("containerContent").getChildByName("testimonials").getHeight()+s.getChildByName("containerContent").getChildByName("sectionTeam").getHeight()+s.getChildByName("containerContent").getChildByName("team").getHeight()+s.getChildByName("containerContent").getChildByName("clients").getHeight()+s.getChildByName("containerContent").getChildByName("footer").getHeight();var e=new ScrollBar(d,s.getChildByName("containerContent").y,s,s.getChildByName("containerContent"),w,.15);e.name="scrollBar",e.y=2*d,e.x=stage.canvas.width-7*d,m.addChild(e)}function r(e){m.getChildByName("scrollBar").updatePos(-(s.getChildByName("containerContent").getChildByName("slider").getHeight()+s.getChildByName("containerContent").getChildByName("servicosHome").getHeight()+s.getChildByName("containerContent").getChildByName("sectionTestimonials").getHeight()+s.getChildByName("containerContent").getChildByName("testimonials").getHeight()+s.getChildByName("containerContent").getChildByName("sectionTeam").getHeight()-140*d))}var s,d,m,C,c,B,y,N,v,H,f,u,p,S,T,w,L,E=createjs.extend(e,createjs.Container);E.setup=function(){s=this,d=this.ratio,c=this.aspectRatio,m=this.dispatchInstance,C=this.svg},E.init=function(){null==N?i("data/homepage.json"):(g(),h(),l(),L=setTimeout(t,10))},E.kill=function(){s.removeEventListener("goToTeamPos",r),s.getChildByName("bg").graphics.clear(),s.removeChild(s.getChildByName("bg")),s.getChildByName("containerContent").getChildByName("slider").kill(),s.getChildByName("containerContent").getChildByName("servicosHome").kill(),s.getChildByName("containerContent").getChildByName("sectionTestimonials").kill(),s.getChildByName("containerContent").getChildByName("testimonials").kill(),s.getChildByName("containerContent").getChildByName("sectionTeam").kill(),s.getChildByName("containerContent").getChildByName("team").kill(),s.getChildByName("containerContent").getChildByName("clients").kill(),s.getChildByName("containerContent").getChildByName("footer").kill(),m.getChildByName("scrollBar").kill(),m.removeChild(m.getChildByName("scrollBar")),s.removeChild(s.getChildByName("containerContent"))},E.resize=function(){y&&y.resize(),s.getChildByName("bg")&&(s.getChildByName("bg").graphics.clear(),s.getChildByName("bg").graphics.beginFill("#ffffff").drawRect(0,0,stage.canvas.width,stage.canvas.height)),s.getChildByName("containerContent")&&(s.getChildByName("containerContent").getChildByName("slider").resize(),s.getChildByName("containerContent").getChildByName("servicosHome").resize(),s.getChildByName("containerContent").getChildByName("sectionTestimonials").resize(),s.getChildByName("containerContent").getChildByName("testimonials").resize(),s.getChildByName("containerContent").getChildByName("sectionTeam").resize(),s.getChildByName("containerContent").getChildByName("team").resize(),s.getChildByName("containerContent").getChildByName("clients").resize(),s.getChildByName("containerContent").getChildByName("footer").resize(),w=s.getChildByName("containerContent").getChildByName("slider").getHeight()+s.getChildByName("containerContent").getChildByName("servicosHome").getHeight()+s.getChildByName("containerContent").getChildByName("sectionTestimonials").getHeight()+s.getChildByName("containerContent").getChildByName("testimonials").getHeight()+s.getChildByName("containerContent").getChildByName("sectionTeam").getHeight()+s.getChildByName("containerContent").getChildByName("team").getHeight()+s.getChildByName("containerContent").getChildByName("clients").getHeight()+s.getChildByName("containerContent").getChildByName("footer").getHeight(),m.getChildByName("scrollBar")&&(m.getChildByName("scrollBar").y=2*d,m.getChildByName("scrollBar").x=stage.canvas.width-7*d,m.getChildByName("scrollBar").updateResize(w,s.getChildByName("containerContent").x,s.getChildByName("containerContent").y)))},window.Homepage=createjs.promote(e,"Container")}();