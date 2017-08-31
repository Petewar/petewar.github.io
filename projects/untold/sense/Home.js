(function () {

    function Home(IinstanceDispatch,Iratio,IAspectRatio,IprojectColor) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.instanceDispatch = IinstanceDispatch;
        this.aspectRatio = IAspectRatio;
        this.projectColor = IprojectColor;
        this.setup();

    }
    
    var ratio;
    var loader;
    var instance;
    var instanceDispatch;

    var aspectRatio;
    var fullDrag;

    var lengthFeature;

    var containerFeature;
    var containerFeatureHeadline;
    var containerFeatureNavigation;
    var containerNumbersNav;

    var firstLine;
    var secondLine;
    var rectangleHeadline;
    var rectangle;
    var buttonProject;
    var buttonProjectContainer;
    var tittleButton;
    var rectangleWidth;
    var currentNumbersNav;
    var totalNumbersNav;
    var strokeNavigation;

    var navFeature;

    var maskFeature = null;
    var maskNegativeWidth;
    var maskAngleBottom;
    var maskAngleTop;
    var isMaskClear;
    var pxAnim = -100;
    var circleARadius;
    var marginCircle = 7;
    
    var arrowDownBlack;
    var arrowUpBlack;
    var arrowDownWhite;
    var arrowUpWhite;
    var arrowDownProject
    var circleUpColor;
    var circleDownColor;
    var circleUpWhiteStroke;
    var circleDownWhiteStroke

    var maskSvg = ["M613.035,467.412 L613.035,288.697 L588.734,288.697 L520.928,297.998 L521.528,303.998 L554.531,299.797 L554.531,496.299 L523.028,496.299 L523.028,502.000 L599.200,502.000 L400.000,1000.000 L0.000,1000.000 L0.000,-0.000 L800.000,-0.000 L613.035,467.412 ZM217.617,288.697 C165.113,288.697 127.010,318.398 127.010,396.698 C127.010,459.399 154.612,505.000 217.617,505.000 C269.821,505.000 308.224,475.599 308.224,396.698 C308.224,317.798 270.721,288.697 217.617,288.697 ZM416.827,288.697 C364.322,288.697 326.219,318.398 326.219,396.698 C326.219,459.399 353.821,505.000 416.827,505.000 C469.030,505.000 507.433,475.599 507.433,396.698 C507.433,317.798 469.931,288.697 416.827,288.697 ZM416.827,498.700 C387.724,498.700 387.724,475.599 387.724,412.299 L387.724,385.598 C387.724,320.198 388.024,294.998 416.827,294.998 C446.229,294.998 446.229,317.498 446.229,388.298 L446.229,414.699 C446.229,475.899 445.328,498.700 416.827,498.700 ZM217.617,498.700 C188.514,498.700 188.514,475.599 188.514,412.299 L188.514,385.598 C188.514,320.198 188.815,294.998 217.617,294.998 C247.019,294.998 247.019,317.498 247.019,388.298 L247.019,414.699 C247.019,475.899 246.119,498.700 217.617,498.700 Z","M667.981,330.047 C663.116,301.983 637.407,288.697 596.234,288.697 C547.630,288.697 526.929,309.398 526.929,334.598 C526.929,349.298 535.029,362.498 553.631,362.498 C568.632,362.498 580.033,353.198 580.033,339.098 C580.033,333.398 579.133,329.498 577.632,325.598 L568.632,325.598 C567.432,322.298 566.832,319.298 566.832,316.898 C566.832,307.297 571.932,294.397 589.633,294.397 C610.335,294.397 616.035,307.297 616.035,336.998 C616.035,378.998 598.034,403.898 559.331,439.299 L529.028,467.199 L529.028,502.000 L599.200,502.000 L400.000,1000.000 L0.000,1000.000 L0.000,-0.000 L800.000,-0.000 L667.981,330.047 ZM217.617,288.697 C165.113,288.697 127.010,318.398 127.010,396.698 C127.010,459.399 154.612,505.000 217.617,505.000 C269.821,505.000 308.224,475.599 308.224,396.698 C308.224,317.798 270.721,288.697 217.617,288.697 ZM416.827,288.697 C364.322,288.697 326.219,318.398 326.219,396.698 C326.219,459.399 353.821,505.000 416.827,505.000 C469.030,505.000 507.433,475.599 507.433,396.698 C507.433,317.798 469.931,288.697 416.827,288.697 ZM416.827,498.700 C387.724,498.700 387.724,475.599 387.724,412.299 L387.724,385.598 C387.724,320.198 388.024,294.998 416.827,294.998 C446.229,294.998 446.229,317.498 446.229,388.298 L446.229,414.699 C446.229,475.899 445.328,498.700 416.827,498.700 ZM217.617,498.700 C188.514,498.700 188.514,475.599 188.514,412.299 L188.514,385.598 C188.514,320.198 188.815,294.998 217.617,294.998 C247.019,294.998 247.019,317.498 247.019,388.298 L247.019,414.699 C247.019,475.899 246.119,498.700 217.617,498.700 ZM572.532,442.899 C606.512,418.391 629.690,402.028 644.781,388.048 L617.560,456.099 L554.230,456.099 L572.532,442.899 Z","M668.404,328.989 C665.390,303.958 645.998,288.697 598.334,288.697 C552.131,288.697 529.028,309.398 529.028,334.598 C529.028,349.298 537.130,362.498 555.731,362.498 C570.733,362.498 582.133,353.198 582.133,339.098 C582.133,333.398 581.233,329.498 579.733,325.598 L571.032,325.598 C569.832,322.298 569.232,319.298 569.232,316.898 C569.232,307.297 574.033,294.097 590.234,294.097 C607.635,294.097 612.436,310.897 612.436,336.998 C612.436,376.898 604.634,385.598 569.532,389.198 L570.432,395.798 C582.433,394.599 586.933,393.999 596.534,391.898 C611.235,399.099 620.836,411.398 620.836,443.499 C620.836,445.031 620.821,446.526 620.799,448.003 L601.056,497.360 C597.932,498.437 594.352,498.999 590.234,498.999 C568.032,498.999 565.032,485.799 565.032,477.699 C565.032,474.099 565.632,471.099 566.832,467.799 L576.132,467.799 C577.632,463.899 578.533,459.999 578.533,454.299 C578.533,440.199 567.731,430.899 552.730,430.899 C534.129,430.899 525.429,444.099 525.429,459.699 C525.429,495.399 562.631,505.000 591.434,505.000 C593.684,505.000 595.881,504.945 598.054,504.866 L400.000,1000.000 L0.000,1000.000 L0.000,-0.000 L800.000,-0.000 L668.404,328.989 ZM217.617,288.697 C165.113,288.697 127.010,318.398 127.010,396.698 C127.010,459.399 154.612,505.000 217.617,505.000 C269.821,505.000 308.224,475.599 308.224,396.698 C308.224,317.798 270.721,288.697 217.617,288.697 ZM416.827,288.697 C364.322,288.697 326.219,318.398 326.219,396.698 C326.219,459.399 353.821,505.000 416.827,505.000 C469.030,505.000 507.433,475.599 507.433,396.698 C507.433,317.798 469.931,288.697 416.827,288.697 ZM416.827,498.700 C387.724,498.700 387.724,475.599 387.724,412.299 L387.724,385.598 C387.724,320.198 388.024,294.998 416.827,294.998 C446.229,294.998 446.229,317.498 446.229,388.298 L446.229,414.699 C446.229,475.899 445.328,498.700 416.827,498.700 ZM217.617,498.700 C188.514,498.700 188.514,475.599 188.514,412.299 L188.514,385.598 C188.514,320.198 188.815,294.998 217.617,294.998 C247.019,294.998 247.019,317.498 247.019,388.298 L247.019,414.699 C247.019,475.899 246.119,498.700 217.617,498.700 ZM606.735,386.498 C626.461,383.236 641.853,377.329 652.383,369.042 L642.412,393.970 C632.689,390.451 620.879,388.079 606.735,387.098 L606.735,386.498 Z","M599.234,441.100 L527.528,441.100 L599.234,314.797 L599.234,441.100 ZM654.438,363.904 L654.438,291.998 L602.535,291.998 L517.928,442.600 L517.928,448.299 L599.234,448.299 L599.234,496.299 L571.032,496.299 L571.032,502.000 L599.200,502.000 L400.000,1000.000 L0.000,1000.000 L0.000,-0.000 L800.000,-0.000 L654.438,363.904 ZM217.617,288.697 C165.113,288.697 127.010,318.398 127.010,396.698 C127.010,459.398 154.612,505.000 217.617,505.000 C269.821,505.000 308.224,475.600 308.224,396.698 C308.224,317.798 270.721,288.697 217.617,288.697 ZM416.827,288.697 C364.322,288.697 326.219,318.398 326.219,396.698 C326.219,459.398 353.821,505.000 416.827,505.000 C469.030,505.000 507.433,475.600 507.433,396.698 C507.433,317.798 469.931,288.697 416.827,288.697 ZM416.827,498.699 C387.724,498.699 387.724,475.600 387.724,412.299 L387.724,385.598 C387.724,320.197 388.024,294.998 416.827,294.998 C446.229,294.998 446.229,317.498 446.229,388.299 L446.229,414.699 C446.229,475.899 445.328,498.699 416.827,498.699 ZM217.617,498.699 C188.514,498.699 188.514,475.600 188.514,412.299 L188.514,385.598 C188.514,320.197 188.815,294.998 217.617,294.998 C247.019,294.998 247.019,317.498 247.019,388.299 L247.019,414.699 C247.019,475.899 246.119,498.699 217.617,498.699 Z","M645.434,386.415 C633.508,378.354 616.364,373.299 592.334,373.299 C574.632,373.299 558.731,377.799 545.230,384.998 L546.730,326.798 L612.136,343.898 C622.336,346.598 630.437,348.998 637.037,348.998 C648.738,348.998 654.139,338.798 658.939,289.898 L654.438,289.297 C652.039,298.297 649.338,301.898 642.438,301.898 C633.737,301.898 568.032,295.297 543.130,291.697 L538.330,295.297 L538.330,390.998 L543.430,393.398 C556.031,385.598 569.232,380.498 581.833,380.498 C605.835,380.498 608.835,396.099 608.835,433.599 C608.835,474.699 607.935,499.000 582.433,499.000 C564.131,499.000 559.931,487.600 559.931,479.500 C559.931,475.899 560.532,472.899 561.731,469.600 L571.632,469.600 C573.132,465.699 574.332,459.999 574.332,454.299 C574.332,438.999 563.532,430.898 548.530,430.898 C529.929,430.898 521.228,444.100 521.228,458.799 C521.228,495.699 559.331,505.000 583.333,505.000 C588.521,505.000 593.508,504.746 598.295,504.262 L400.000,1000.000 L0.000,1000.000 L0.000,-0.000 L800.000,-0.000 L645.434,386.415 ZM217.617,288.697 C165.113,288.697 127.010,318.398 127.010,396.698 C127.010,459.398 154.612,505.000 217.617,505.000 C269.821,505.000 308.224,475.600 308.224,396.698 C308.224,317.798 270.721,288.697 217.617,288.697 ZM416.827,288.697 C364.322,288.697 326.219,318.398 326.219,396.698 C326.219,459.398 353.821,505.000 416.827,505.000 C469.030,505.000 507.433,475.600 507.433,396.698 C507.433,317.798 469.931,288.697 416.827,288.697 ZM416.827,498.699 C387.724,498.699 387.724,475.600 387.724,412.299 L387.724,385.598 C387.724,320.197 388.024,294.998 416.827,294.998 C446.229,294.998 446.229,317.498 446.229,388.299 L446.229,414.699 C446.229,475.899 445.328,498.699 416.827,498.699 ZM217.617,498.699 C188.514,498.699 188.514,475.600 188.514,412.299 L188.514,385.598 C188.514,320.197 188.815,294.998 217.617,294.998 C247.019,294.998 247.019,317.498 247.019,388.299 L247.019,414.699 C247.019,475.899 246.119,498.699 217.617,498.699 Z","M677.337,306.656 C667.084,295.641 649.254,288.697 623.836,288.697 C564.432,288.697 526.629,331.298 526.629,409.599 C526.629,470.796 553.006,499.645 598.275,504.313 L400.000,1000.000 L0.000,1000.000 L0.000,-0.000 L800.000,-0.000 L677.337,306.656 ZM217.617,288.697 C165.112,288.697 127.010,318.398 127.010,396.698 C127.010,459.399 154.612,505.000 217.617,505.000 C269.821,505.000 308.224,475.600 308.224,396.698 C308.224,317.798 270.721,288.697 217.617,288.697 ZM416.827,288.697 C364.322,288.697 326.219,318.398 326.219,396.698 C326.219,459.399 353.821,505.000 416.827,505.000 C469.030,505.000 507.434,475.600 507.434,396.698 C507.434,317.798 469.930,288.697 416.827,288.697 ZM416.827,498.700 C387.723,498.700 387.723,475.600 387.723,412.299 L387.723,385.599 C387.723,320.198 388.024,294.998 416.827,294.998 C446.229,294.998 446.229,317.498 446.229,388.299 L446.229,414.699 C446.229,475.899 445.329,498.700 416.827,498.700 ZM217.617,498.700 C188.514,498.700 188.514,475.600 188.514,412.299 L188.514,385.599 C188.514,320.198 188.815,294.998 217.617,294.998 C247.019,294.998 247.019,317.498 247.019,388.299 L247.019,414.699 C247.019,475.899 246.119,498.700 217.617,498.700 ZM586.333,435.099 C586.333,422.199 586.333,414.398 588.434,405.699 C592.334,390.999 601.634,378.398 615.436,378.398 C630.382,378.398 634.557,387.978 635.707,410.732 L601.192,497.021 C586.547,491.035 586.333,469.255 586.333,435.099 ZM585.733,392.799 C586.333,318.698 599.834,294.697 626.536,294.697 C643.338,294.697 648.438,302.798 648.438,313.598 C648.438,315.998 647.839,321.098 646.637,324.398 L637.037,324.398 C635.537,328.598 634.637,332.498 634.637,338.198 C634.637,350.739 643.422,359.477 655.497,361.257 L651.740,370.651 C645.908,369.217 639.668,368.498 633.137,368.498 C608.835,368.498 594.733,378.698 585.733,392.799 Z"]
    var arrowDownSvg = "M21.000,22.000 L25.000,26.000 L29.000,22.000 L31.000,22.000 L25.000,28.000 L19.000,22.000 L21.000,22.000 Z";
    var arrowUpSvg = "M29.000,28.000 L25.000,24.000 L21.000,28.000 L19.000,28.000 L25.000,22.000 L31.000,28.000 L29.000,28.000 Z";
    var buttonSvg = "M24.000,-0.000 L205.000,-0.000 L181.000,60.000 L-0.000,60.000 L24.000,-0.000 Z"
    var arrowDownProjectSvg ="M2.001,-0.000 L4.002,-0.000 L4.002,4.000 L2.001,4.000 L2.001,-0.000 ZM3.000,8.000 L-0.000,4.000 L6.000,4.000 L3.000,8.000 Z"
    var videosFiles = ["video/Monster_intro_fade.mp4","video/Monster_intro_fade_final.mp4","video/Docola_intro_final.mp4","video/Java_intro_final.mp4","video/AWT_intro_final.mp4","video/Burn_intro_final.mp4"];
    var imageFiles = ["video/Monster_intro_fade_frame_1.jpg","video/Monster_intro_fade_frame_1.jpg","video/Docola_intro_fade_frame_1.jpg","video/Java_intro_fade_frame_1.jpg","video/AWT_intro_fade_frame_1.jpg","video/Burn_intro_frame_1.jpg"];
    var featureHeadline = ["WELCOME TO%UNTOLD","MONSTER ENERGY","DOCOLA","JAVA MONSTER GEAR","AWT DEALERS","BURN RESIDENCY"];
    var featureHeadlineStroke = ["D E S I G N I N G    F O R    F O R W A R D    T H I N K I N G    B R A N D S","A    C O M P L E T E T L Y    N E W    O N L I N E    E X P E R I E N C E","T H E    F U T U R E    O F    H E A L T H C A R E    E X P E R I E N C E","M O N S T E R    N E W    D R I N K    P R O M O T I O N A L    C A M P A I G N","U P G R A D I N G    T H E    A U T O M A T I V E    I N D U S T R Y","T H E    G R E A T E S T    G L O B A L    D J    C O M P E T I T I O N"];
    var buttonText = "VIEW PROJECT";
    var margin = 50;
    var marginHeadline = 60;

    var projectColor;

    var p = createjs.extend(Home, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceDispatch = this.instanceDispatch;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;
        projectColor = this.projectColor;
        rectangleWidth = 100*ratio;
        circleARadius = 22*ratio;
        
        navFeature = 0;
        lengthFeature = featureHeadline.length

        containerFeature = new createjs.Container();
        instance.addChild(containerFeature);

        fullDrag = new FullDrag(instance,ratio,aspectRatio,videosFiles,imageFiles,true);
        instance.addEventListener("Dragging", DraggingPosHandler);
        instance.addEventListener("DraggingStop", DraggingStopPosHandler);
        instance.addChild(fullDrag);

        containerFeatureNavigation = new createjs.Container();
        instance.addChild(containerFeatureNavigation);   

        containerFeatureMask = new createjs.Container();
        instance.addChild(containerFeatureMask);

        containerFeatureHeadline = new createjs.Container();
        instance.addChild(containerFeatureHeadline);

        createFeature(null,featureHeadline[navFeature],featureHeadlineStroke[navFeature]);
        createNavigation();

    } ;

    function createNavigation(){

        // strokes
        circleUpWhiteStroke = new createjs.Shape();
        circleUpWhiteStroke.graphics.setStrokeStyle(2).beginStroke("#FFFFFF").drawCircle(0, 0, circleARadius-1*ratio);
        containerFeatureNavigation.addChild(circleUpWhiteStroke);
        
        circleDownWhiteStroke = new createjs.Shape();
        circleDownWhiteStroke.graphics.setStrokeStyle(2).beginStroke("#FFFFFF").drawCircle(0, 0, circleARadius-1*ratio);
        circleDownWhiteStroke.y = circleARadius*2+marginCircle*ratio
        containerFeatureNavigation.addChild(circleDownWhiteStroke);

        //colors update
        circleUpColor = new createjs.Shape();
        circleUpColor.visible = 0;
        circleUpColor.graphics.beginFill("#FFFFFF").drawCircle(0, 0, circleARadius);
        containerFeatureNavigation.addChild(circleUpColor);

        circleDownColor = new createjs.Shape();
        circleDownColor.visible = 0;
        circleDownColor.graphics.beginFill("#FFFFFF").drawCircle(0, 0, circleARadius);
        circleDownColor.y = circleARadius*2+marginCircle*ratio;
        containerFeatureNavigation.addChild(circleDownColor);

        //Arrows
        arrowUpBlack = new createSvg(arrowUpSvg,"#000000");
        arrowUpBlack.visible = 0;
        arrowUpBlack.x = circleUpWhiteStroke.x-circleARadius-3*ratio;
        arrowUpBlack.y = circleUpWhiteStroke.y-circleARadius-3*ratio;
        containerFeatureNavigation.addChild(arrowUpBlack);

        arrowDownBlack = new createSvg(arrowDownSvg,"#000000");
        arrowDownBlack.visible = 0;
        arrowDownBlack.x = circleDownWhiteStroke.x-circleARadius-3*ratio;
        arrowDownBlack.y = circleDownWhiteStroke.y-circleARadius-2*ratio;
        containerFeatureNavigation.addChild(arrowDownBlack);

        arrowUpWhite = new createSvg(arrowUpSvg);
        arrowUpWhite.x = circleUpWhiteStroke.x-circleARadius-3*ratio;
        arrowUpWhite.y = circleUpWhiteStroke.y-circleARadius-3*ratio;
        containerFeatureNavigation.addChild(arrowUpWhite);

        arrowDownWhite = new createSvg(arrowDownSvg);
        arrowDownWhite.x = circleDownWhiteStroke.x-circleARadius-3*ratio;
        arrowDownWhite.y = circleDownWhiteStroke.y-circleARadius-2*ratio;
        containerFeatureNavigation.addChild(arrowDownWhite);

        //hit
        var circleUpHit = new createjs.Shape();
        circleUpHit.alpha = 0.01;
        circleUpHit.graphics.beginFill("#FFFFFF").drawCircle(0, 0, circleARadius);
        circleUpHit.graphics.drawCircle(0, 0, circleARadius);
        circleUpHit.cursor = "pointer";
        circleUpHit.orientation = "up"
        circleUpHit.addEventListener("mouseover", handlerOverNavigation);
        circleUpHit.addEventListener("mouseout", handlerOutNavigation);
        circleUpHit.addEventListener("click", handlerClickNavigation); 
        containerFeatureNavigation.addChild(circleUpHit);

        var circleDownHit = new createjs.Shape();
        circleDownHit.alpha = 0.01;
        circleDownHit.graphics.beginFill("#FFFFFF").drawCircle(0, 0, circleARadius);
        circleDownHit.y = circleARadius*2+marginCircle*ratio;
        circleDownHit.cursor = "pointer";
        circleDownHit.orientation = "down"
        circleDownHit.addEventListener("mouseover", handlerOverNavigation);
        circleDownHit.addEventListener("mouseout", handlerOutNavigation);
        circleDownHit.addEventListener("click", handlerClickNavigation); 
        containerFeatureNavigation.addChild(circleDownHit);

        //nav numbers
        containerNumbersNav = new createjs.Container();
        containerFeatureNavigation.addChild(containerNumbersNav);

        currentNumbersNav = new createjs.Text();
        currentNumbersNav.font = "36px Abril Fatface";    
        currentNumbersNav.textBaseline = "alphabetic";
        currentNumbersNav.color = projectColor[navFeature];
        currentNumbersNav.text = "00"+(navFeature+1);
        currentNumbersNav.y = 26*ratio;
        currentNumbersNav.scaleX = ratio;
        currentNumbersNav.scaleY = ratio;
        containerNumbersNav.addChild(currentNumbersNav);

        strokeNavigation = new createjs.Shape();
        strokeNavigation.graphics.beginFill("#FFFFFF").drawRect(0, 0, 1,40*ratio);
        strokeNavigation.alpha = 0.35;
        strokeNavigation.rotation = 25;
        strokeNavigation.x = currentNumbersNav.getBounds().width*ratio+15*ratio;
        strokeNavigation.y = 5*ratio;
        containerNumbersNav.addChild(strokeNavigation);

        totalNumbersNav = new createjs.Text();
        totalNumbersNav.font = "18px Abril Fatface";    
        totalNumbersNav.textBaseline = "alphabetic";
        totalNumbersNav.color = "#FFFFFF";
        totalNumbersNav.text = "00"+lengthFeature;
        totalNumbersNav.scaleX = ratio;
        totalNumbersNav.scaleY = ratio;
        totalNumbersNav.x = strokeNavigation.x-5*ratio;
        totalNumbersNav.y = 40*ratio;
        containerNumbersNav.addChild(totalNumbersNav);

        containerNumbersNav.x = -160*ratio;
        containerFeatureNavigation.x = stage.canvas.width-circleARadius-margin*ratio
        containerFeatureNavigation.y = stage.canvas.height/2-(containerFeatureNavigation.getBounds().height*ratio)/2;
    }

    function handlerOverNavigation(event){

        if(event.target.orientation=="up"){
            circleUpColor.visible = 1;
            arrowUpBlack.visible = 1;
            circleUpWhiteStroke.visible = 0;
            arrowUpWhite.visible = 0;
        }else{
            circleDownColor.visible = 1;
            arrowDownBlack.visible = 1;
            circleDownWhiteStroke.visible = 0;
            arrowDownWhite.visible = 0;
        }
        
    }

    function handlerOutNavigation(event){
        if(event.target.orientation=="up"){
            circleUpColor.visible = 0;
            arrowUpBlack.visible = 0;
            circleUpWhiteStroke.visible = 1;
            arrowUpWhite.visible = 1;
        }else{
            circleDownColor.visible = 0;
            arrowDownBlack.visible = 0;
            circleDownWhiteStroke.visible = 1;
            arrowDownWhite.visible = 1;
        }
    }

    function handlerClickNavigation(event){
        
        event.target.removeEventListener("click", handlerClickNavigation);
        createjs.Tween.get(event.target)
           .to({x:event.target.x}, 0, createjs.Ease.circInOut)
           .wait(1000)
           .call(function(){
                event.target.addEventListener("click", handlerClickNavigation); 
            });

        fullDrag.navigateFrom(event.target.orientation)
    }

    function createFeature(Ifeature,IfeatureHeadline,IfeatureHeadlineStroke){
        generateMask();
        addFeatureHeadline(IfeatureHeadline,IfeatureHeadlineStroke);
        updateMask("animIn");
    }

    function updateColorNavigation(){
        currentNumbersNav.text="";
        currentNumbersNav.color = projectColor[navFeature];
        currentNumbersNav.text = "00"+(navFeature+1);

        currentNumbersNav.y = 26*ratio;
        strokeNavigation.x = currentNumbersNav.getBounds().width*ratio+15*ratio;
        strokeNavigation.y = 5*ratio;
        totalNumbersNav.x = strokeNavigation.x-5*ratio;
        totalNumbersNav.y = 40*ratio;
    }

    function generateMask(){
        if(maskFeature!=null){
            containerFeatureMask.removeChild(maskFeature)
            maskFeatureSquare.graphics.clear();
        }

        maskFeature = new createSvg(maskSvg[navFeature],projectColor[navFeature]);
        containerFeatureMask.addChild(maskFeature)
        
        var scaleFactor = (((100)*stage.canvas.height)/(1000*ratio))/100

        containerFeatureMask.scaleX = scaleFactor
        containerFeatureMask.scaleY = scaleFactor

        maskFeatureSquare = new createjs.Shape();
        maskFeatureSquare.visible = false;
        maskFeatureSquare.graphics.beginFill(projectColor[navFeature]).drawRect(0, 0, 100*ratio,stage.canvas.height);
        instance.addChild(maskFeatureSquare)

    }

    function updateMask(Iaction,IeventNav){
        
        if(Iaction=="animIn"){
            
            isMaskClear = false;

            containerFeatureMask.x = -stage.canvas.width
            containerFeatureHeadline.y = 0;
            containerFeature.x = 0;

            createjs.Tween.get(containerFeatureMask).to({x:0}, 500, createjs.Ease.circInOut)

            createjs.Tween.get(containerFeature)
            .wait(100)
            .to({x:pxAnim}, 500, createjs.Ease.circInOut);

            containerFeatureHeadline.alpha = 0;
            containerFeatureHeadline.x = -stage.canvas.width;
            createjs.Tween.get(containerFeatureHeadline)
            .wait(200)
            .to({alpha:1,x:0}, 500, createjs.Ease.circInOut);

            createjs.Tween.get(fullDrag)
            .to({x:0}, 400, createjs.Ease.circInOut);

        }else if(Iaction=="animOut"){
            
            isMaskClear = false;

            createjs.Tween.get(containerFeatureMask).to({x:-stage.canvas.width}, 500, createjs.Ease.circInOut)
            .call(function(){

                navFeature = IeventNav;
                updateColorNavigation();
                createFeature(null,featureHeadline[navFeature],featureHeadlineStroke[navFeature]);
                
                var customEvent = new createjs.Event("changeColor");
                customEvent.nav = navFeature;
                instanceDispatch.dispatchEvent(customEvent);


            });

            createjs.Tween.get(maskFeatureSquare).to({scaleX:0}, 200, createjs.Ease.circInOut);

            createjs.Tween.get(containerFeatureHeadline)
            .wait(100)
            .to({x:-stage.canvas.width}, 500, createjs.Ease.circInOut);

            createjs.Tween.get(containerFeature)
            .to({x:0}, 500, createjs.Ease.circInOut);

        }else if(Iaction=="clear"){

            isMaskClear = true;

            createjs.Tween.get(containerFeatureMask).to({x:-stage.canvas.width}, 500, createjs.Ease.circInOut)
            
            createjs.Tween.get(containerFeatureHeadline)
            .wait(100)
            .to({x:-stage.canvas.width}, 800, createjs.Ease.circInOut);

            createjs.Tween.get(containerFeature)
            .to({x:0}, 500, createjs.Ease.circInOut);

            createjs.Tween.get(fullDrag)
            .wait(200)
            .to({x:-stage.canvas.width/4}, 400, createjs.Ease.circInOut);

        }else if(Iaction=="resize"){
           generateMask();
        }
    }

    function addFeatureHeadline(Ifeature,IfeatureStroke){

        var res = Ifeature.split("%");
        var lengthHeadline = res.length

        if(rectangle==null){
            rectangle = new createjs.Shape();
            rectangle.graphics.beginFill("#FFFFFF").drawRect(0, 0, rectangleWidth,1);
            containerFeatureHeadline.addChild(rectangle);
        }

        if(rectangleHeadline==null){
            rectangleHeadline = new createjs.Text();
            rectangleHeadline.font = "12px Abril Fatface";
            rectangleHeadline.color = "#FFFFFF";  
            rectangleHeadline.width = 400
            rectangleHeadline.scaleX = ratio;
            rectangleHeadline.scaleY = ratio;
            rectangleHeadline.textBaseline = "alphabetic";
            containerFeatureHeadline.addChild(rectangleHeadline);
        }

        if(firstLine==null){
            firstLine = new createjs.Text();
            firstLine.font = "bold 67px Montserrat";
            firstLine.color = "#FFFFFF";    
            firstLine.scaleX = ratio;
            firstLine.scaleY = ratio;
            firstLine.textBaseline = "alphabetic";
            containerFeatureHeadline.addChild(firstLine);
        }
        
        if(secondLine==null){
            secondLine = new createjs.Text();
            secondLine.font = "bold 60px Montserrat";
            secondLine.color = "#FFFFFF";    
            secondLine.scaleX = ratio;
            secondLine.scaleY = ratio;
            secondLine.textBaseline = "alphabetic";
            containerFeatureHeadline.addChild(secondLine);
        }

        if(buttonProject==null){
            buttonProjectContainer = new createjs.Container();
            buttonProjectContainer.cursor = "pointer";
            buttonProjectContainer.addEventListener("mouseover", handlerOverProject);
            buttonProjectContainer.addEventListener("mouseout", handlerOutProject);
            buttonProjectContainer.addEventListener("click", handlerClickProject); 

            buttonProject = new createSvg(buttonSvg,"#ffffff");
            buttonProjectContainer.addChild(buttonProject)
            containerFeatureHeadline.addChild(buttonProjectContainer);
        }

        if(tittleButton==null){
            tittleButton = new createjs.Text();
            tittleButton.font = "Bold 10px Montserrat"
            tittleButton.color = "#000000";    
            tittleButton.scaleX = ratio;
            tittleButton.scaleY = ratio;
            tittleButton.textBaseline = "alphabetic";
            buttonProjectContainer.addChild(tittleButton);
        }
        
        if(arrowDownProject==null){
            arrowDownProject = new createSvg(arrowDownProjectSvg,"#000000");
            buttonProjectContainer.addChild(arrowDownProject)
        }

        rectangle.x = 130*ratio;
        rectangle.y = stage.canvas.height/2+3*ratio+marginHeadline*ratio;

        rectangleHeadline.text = "";
        rectangleHeadline.text = IfeatureStroke;
        rectangleHeadline.x = rectangle.x+rectangleWidth+10*ratio;
        rectangleHeadline.y = rectangle.y+4*ratio;
        
        if(lengthHeadline==2){
            firstLine.text = "";
            firstLine.text = res[0];
            firstLine.x = rectangle.x;
            firstLine.y = rectangle.y+48*ratio+(marginHeadline-5)*ratio;
            startSecondLine = firstLine.getBounds().width/2*ratio
            secondLine.text = "";
            secondLine.text = res[1];
            secondLine.x = firstLine.x+startSecondLine;
            secondLine.y = firstLine.y+64*ratio;
            buttonProjectContainer.visible = false
        }else{
            firstLine.text = "";
            secondLine.text = "";
            firstLine.text = res[0];
            firstLine.x = rectangle.x;
            firstLine.y = rectangle.y+48*ratio+(marginHeadline-5)*ratio;
            buttonProjectContainer.visible = true
        }

        buttonProjectContainer.x = 130*ratio;
        buttonProjectContainer.y = firstLine.y+(marginHeadline-5)*ratio

        tittleButton.text = "";
        tittleButton.text = "VIEW PROJECT"
        tittleButton.x = 55*ratio
        tittleButton.y = 10*ratio+25*ratio
        
        arrowDownProject.x = tittleButton.x+tittleButton.getBounds().width*ratio+10*ratio
        arrowDownProject.y = tittleButton.y-7*ratio
        
    }

    function handlerOverProject(event){

    }

    function handlerOutProject(event){
        
    }

    function handlerClickProject(event){
        
    }

    function createSvg(Isvg,Icolor){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        svg.scaleX = ratio;
        svg.scaleY = ratio;
        return svg;
    }

    function DraggingPosHandler(event){

        maskFeature.x = -event.yPos/10;
        containerFeatureHeadline.y = -event.yPos/10;
        if(event.navigationOrientation=="less"){
            maskFeatureSquare.visible = false;
        }else{
            maskFeatureSquare.visible = true;
        }
    
    }

    function DraggingStopPosHandler(event){

        if(navFeature!=event.nav){
            
            updateMask("animOut",event.nav)

        }else{

            createjs.Tween.get(maskFeature)
            .to({x:0}, 250, createjs.Ease.circInOut);

             createjs.Tween.get(containerFeatureHeadline)
            .to({y:0}, 250, createjs.Ease.circInOut);
        }
    }

    function killFeature(Ifeature){
        
    }

    p.clearMask = function() {
         fullDrag.mouseChildren = false;
         containerFeatureNavigation.mouseChildren = false;
         updateMask("clear")
    }

     p.pauseVideo = function() {
         fullDrag.pauseVideo();
    }

     p.playVideo = function() {
         fullDrag.playVideo();
    }

    p.reAnimMask = function() {
        fullDrag.mouseChildren = true;
        containerFeatureNavigation.mouseChildren = true;
         updateMask("animIn")
    }
    
    p.resize = function() {

        updateMask("resize");

        rectangle.x = 130*ratio;
        rectangle.y = stage.canvas.height/2+3*ratio+marginHeadline*ratio;

        rectangleHeadline.x = rectangle.x+rectangleWidth+10*ratio;
        rectangleHeadline.y = rectangle.y+4*ratio;

        firstLine.x = rectangle.x;
        firstLine.y = rectangle.y+48*ratio+(marginHeadline-5)*ratio;

        secondLine.x = firstLine.x+startSecondLine;
        secondLine.y = firstLine.y+64*ratio;
        
        if(isMaskClear){
            maskFeature.x = -stage.canvas.width
            containerFeatureHeadline.x = -stage.canvas.width
            containerFeature.x = 0;
            fullDrag.x = -stage.canvas.width/4
        }else{
            maskFeature.x = 0;
            containerFeatureHeadline.x = 0;
            containerFeature.x = 0;
            fullDrag.x = 0;
        }

        rectangleHeadline.x = rectangle.x+rectangleWidth+10*ratio;
        rectangleHeadline.y = rectangle.y+4*ratio;

        firstLine.x = rectangle.x;
        firstLine.y = rectangle.y+48*ratio+(marginHeadline-5)*ratio;

         buttonProjectContainer.x = 130*ratio;
        buttonProjectContainer.y = firstLine.y+(marginHeadline-5)*ratio

        secondLine.x = firstLine.x+startSecondLine;
        secondLine.y = firstLine.y+64*ratio;

        containerFeatureNavigation.x = stage.canvas.width-circleARadius-margin*ratio
        containerFeatureNavigation.y = stage.canvas.height/2-(containerFeatureNavigation.getBounds().height*ratio)/2;
        
         var scaleFactor = (((100)*stage.canvas.height)/(1000*ratio))/100

        containerFeatureMask.scaleX = scaleFactor
        containerFeatureMask.scaleY = scaleFactor

        fullDrag.resize();

    } ;  

window.Home = createjs.promote(Home, "Container");
}());