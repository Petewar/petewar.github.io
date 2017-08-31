(function () {

    function Main(Iratio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();
    }
    
    var ratio;
    var instance;
    var aspectRatio;

    var preloadData;
    var preloadContent;

    var news
    var bg;
    var nav = 0;
    var line;
    var line2;
    var leftField;
    var rightField
    var totalNews;
    var bounds
    var bounds2
    var projectContainer;
    var project
    var lineLink

    var facebook
    var dribble
    var behance
    var soundCloud

    var boundLink
    var boundLink1
    var boundLink2
    var boundLink3
    var boundLink4
    var loaded;
    var aboutfield
    var boundAboutOpen;
    var about;
    var closeSvg
    var blackSvg;
    var arrow
    var box
    var contentfield;
    var buttonTittle

    var num;
    var minDamp = .08;
    var maxDamp = .04;
    var minAlpha = .1;
    var maxAlpha = .4;
    var c;
    var swarm

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {
        //
        ratio = this.ratio;
        instance = this;
        instance.mouseChildren = true
        news = [];
        svg = new Svg(ratio);
        aspectRatio = new AspectRatio();
        //
        preloadData = new createjs.LoadQueue(true);
        preloadData.addEventListener("fileload", preloadDataComplete);
        preloadData.loadFile("data/news.json", true);
        
    }

    function preloadDataComplete(event) {
        preloadData.removeEventListener("fileload", preloadDataComplete);
        preloadData = null;
        totalNews = event.result.news.length;
        var item = event.result.news;
        for(var i=0;i<totalNews;i++)news.push(item[i]);
        //
        projectContainer = new createjs.Container();
        instance.addChild(projectContainer);
        //
        bg = new createjs.Shape();
        instance.addChild(bg)
        //
         bounds = new createjs.Shape();
        bounds.action = 0
        //bounds.cursor = "pointer";
        bounds.graphics.beginFill(news[nav].color2).drawRect(0, 0, stage.canvas.width/2,stage.canvas.height);
        bounds.x = 0
        bounds.y = 0
        bounds.alpha = 0.01
        //bounds.mouseChildren = true;
        bounds.addEventListener("click", handlerClickNavigation);
        instance.addChild(bounds)

        bounds2 = new createjs.Shape();
        bounds2.action = 1
        //bounds2.cursor = "pointer";
        bounds2.graphics.beginFill(news[nav].color2).drawRect(0, 0, stage.canvas.width/2,stage.canvas.height);
        bounds2.x = stage.canvas.width/2
        bounds2.y = 0
        bounds2.alpha = 0.01
        //bounds2.mouseChildren = true;
        bounds2.addEventListener("click", handlerClickNavigation);
        instance.addChild(bounds2)
         //
        line = new createjs.Shape();
        line.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width/6,1*ratio);
        line.y = stage.canvas.height/2
        instance.addChild(line);

        leftField = new createjs.Text();
        leftField.font = "10px Montserrat";
        leftField.color = "#333333";
        leftField.text = "PREVIOUS";
        leftField.x= line.x+stage.canvas.width/6+5*ratio
        leftField.y= line.y-6*ratio
        leftField.scaleX = ratio;
        leftField.scaleY = ratio;
        instance.addChild(leftField);

        line2 = new createjs.Shape();
        line2.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width/6,1*ratio);
        line2.regX = stage.canvas.width/6
        line2.x = stage.canvas.width
        line2.y = stage.canvas.height/2
        instance.addChild(line2);

        rightField = new createjs.Text();
        rightField.font = "10px Montserrat";
        rightField.color = "#333333";
        rightField.text = "NEXT";
        rightField.x= line2.x-stage.canvas.width/6-rightField.getBounds().width*ratio-5*ratio
        rightField.y= line2.y-6*ratio
        rightField.scaleX = ratio;
        rightField.scaleY = ratio;
        instance.addChild(rightField);
        //
        closeSvg = svg.createSvg("M10.151,12.999 L0.006,2.855 L2.854,0.006 L12.999,10.151 L23.144,0.006 L25.992,2.855 L15.848,12.999 L25.992,23.144 L23.144,25.992 L12.999,15.848 L2.854,25.992 L0.006,23.144 L10.151,12.999 Z","#333333");
        blackSvg = svg.createSvg("M56.000,9.713 L39.805,19.813 L29.046,39.005 L20.265,24.350 L12.050,39.005 L-0.000,18.896 L16.996,18.896 L23.322,18.896 L39.339,18.896 L39.308,-0.006 L56.000,9.713 Z","#333333");
         //
        logo = svg.createSvg("M-0.000,0.000 L105.000,0.000 L105.000,29.000 L-0.000,29.000 L-0.000,0.000 ZM87.000,20.000 L89.000,20.000 L89.000,16.000 L92.000,16.000 L94.000,20.000 L96.733,20.000 L93.913,16.106 C95.326,15.589 96.032,14.444 95.850,12.671 C96.032,11.384 95.663,10.451 94.925,9.870 C94.187,9.290 92.952,9.000 91.221,9.000 L87.000,9.000 L87.000,20.000 ZM75.638,20.000 L76.671,17.000 L81.329,17.000 L82.362,20.000 L85.000,20.000 L80.200,9.000 L77.800,9.000 L73.000,20.000 L75.638,20.000 ZM61.809,20.000 L63.619,20.000 L65.992,12.374 L68.381,20.000 L70.191,20.000 L74.000,9.000 L71.362,9.000 L69.192,15.368 L67.272,9.000 L64.728,9.000 L62.792,15.368 L60.638,9.000 L58.000,9.000 L61.809,20.000 ZM41.000,20.000 L49.000,20.000 L49.000,18.000 L43.000,18.000 L43.019,15.576 L48.019,15.576 L48.019,13.576 L43.019,13.576 L43.000,11.000 L49.000,11.000 L49.000,9.000 L41.000,9.000 L41.000,20.000 ZM31.000,11.000 L34.000,11.000 L34.000,20.000 L36.000,20.000 L36.000,11.000 L39.000,11.000 L39.000,9.000 L31.000,9.000 L31.000,11.000 ZM21.000,20.000 L29.000,20.000 L29.000,18.000 L23.000,18.000 L23.019,15.576 L28.019,15.576 L28.019,13.576 L23.019,13.576 L23.000,11.000 L29.000,11.000 L29.000,9.000 L21.000,9.000 L21.000,20.000 ZM10.000,20.000 L12.000,20.000 L12.000,17.000 L14.912,17.000 C16.706,17.000 16.959,16.710 17.776,16.073 C18.592,15.435 19.000,14.429 19.000,13.054 C19.000,11.679 18.603,10.659 17.808,9.996 C17.013,9.332 15.746,9.000 14.005,9.000 L10.000,9.000 L10.000,20.000 ZM15.506,11.000 C15.955,11.000 17.039,11.922 16.994,13.000 C17.039,14.053 16.069,15.000 15.506,15.000 L14.055,15.000 L12.000,15.000 L12.000,11.000 L14.055,11.000 C14.665,11.000 15.150,11.000 15.506,11.000 ZM80.707,15.000 L77.299,15.000 L79.000,11.576 L80.707,15.000 ZM94.000,12.374 C94.000,12.999 93.528,14.000 92.470,14.000 L89.000,14.000 L89.000,11.000 L92.470,11.000 C93.462,11.000 94.000,11.748 94.000,12.374 ZM1.000,40.000 L-0.000,40.000 L-0.000,34.000 L1.000,34.000 L1.000,40.000 ZM6.167,38.481 L6.167,34.000 L7.000,34.000 L7.000,40.000 L6.003,40.000 L2.833,35.622 L2.833,40.000 L2.000,40.000 L2.000,34.000 L2.919,34.000 L6.167,38.481 ZM13.000,34.927 L11.000,34.927 L11.000,40.000 L10.000,40.000 L10.000,34.927 L8.000,34.927 L8.000,34.000 L13.000,34.000 L13.000,34.927 ZM18.000,34.953 L15.000,34.953 L15.000,36.553 L17.000,36.553 L17.000,37.553 L15.000,37.553 L15.000,39.047 L18.000,39.047 L18.000,40.000 L14.000,40.000 L14.000,34.000 L18.000,34.000 L18.000,34.953 ZM22.457,34.139 C22.738,34.215 22.968,34.324 23.144,34.463 C23.534,34.773 23.729,35.267 23.729,35.948 C23.729,36.938 23.302,37.562 22.449,37.820 L24.000,40.000 L23.063,40.000 L21.834,38.000 L20.000,38.000 L20.000,40.000 L19.000,40.000 L19.000,34.000 L21.203,34.000 C21.698,34.000 22.116,34.046 22.457,34.139 ZM20.000,37.013 L21.566,37.050 C22.193,37.050 22.543,36.498 22.543,36.094 C22.543,35.690 22.162,35.036 21.566,35.036 L20.000,35.000 L20.000,37.013 ZM29.000,34.000 L32.000,40.000 L30.727,40.000 L30.000,38.000 L27.000,38.000 L26.282,40.000 L25.000,40.000 L28.000,34.000 L29.000,34.000 ZM29.496,37.000 L28.452,35.021 L27.504,37.000 L29.496,37.000 ZM35.902,34.000 C36.739,34.000 37.438,34.332 38.000,34.995 L37.420,35.674 C37.163,35.409 36.919,35.224 36.690,35.119 C36.461,35.014 36.192,34.961 35.883,34.961 C35.336,34.961 34.878,35.150 34.507,35.529 C34.136,35.908 33.951,36.391 33.951,36.979 C33.951,37.568 34.135,38.059 34.503,38.454 C34.872,38.849 35.308,39.047 35.813,39.047 C36.127,39.047 36.398,38.990 36.625,38.877 C36.851,38.764 37.088,38.583 37.335,38.334 L37.923,38.981 C37.351,39.660 36.657,40.000 35.840,40.000 C35.023,40.000 34.346,39.718 33.808,39.155 C33.269,38.591 33.000,37.878 33.000,37.016 C33.000,36.155 33.274,35.437 33.823,34.862 C34.372,34.287 35.065,34.000 35.902,34.000 ZM44.000,34.927 L42.000,34.927 L42.000,40.000 L41.000,40.000 L41.000,34.927 L39.000,34.927 L39.000,34.000 L44.000,34.000 L44.000,34.927 ZM46.000,40.000 L45.000,40.000 L45.000,34.000 L46.000,34.000 L46.000,40.000 ZM50.000,38.500 L51.859,34.000 L53.000,34.000 L50.612,40.000 L49.426,40.000 L47.000,34.000 L48.141,34.000 L50.000,38.500 ZM58.000,34.953 L55.000,34.953 L55.000,36.553 L57.000,36.553 L57.000,37.553 L55.000,37.553 L55.000,39.047 L58.000,39.047 L58.000,40.000 L54.000,40.000 L54.000,34.000 L58.000,34.000 L58.000,34.953 ZM68.038,34.785 C68.679,35.309 69.000,36.037 69.000,36.970 C69.000,37.903 68.689,38.641 68.067,39.185 C67.445,39.728 66.492,40.000 65.210,40.000 L63.000,40.000 L63.000,34.000 L65.286,34.000 C66.479,34.000 67.397,34.262 68.038,34.785 ZM64.000,35.000 L64.000,39.000 L65.223,39.000 C65.543,39.000 65.776,39.043 65.991,39.043 C66.307,39.043 66.583,38.950 67.039,38.495 C67.420,38.114 68.000,37.657 68.000,37.000 C68.000,35.664 66.000,35.000 65.102,35.000 L64.000,35.000 ZM74.000,34.953 L71.000,34.953 L71.000,36.553 L73.000,36.553 L73.000,37.553 L71.000,37.553 L71.000,39.047 L74.000,39.047 L74.000,40.000 L70.000,40.000 L70.000,34.000 L74.000,34.000 L74.000,34.953 ZM77.347,37.451 C76.872,37.349 76.512,37.255 76.265,37.169 C76.019,37.084 75.800,36.972 75.609,36.834 C75.227,36.574 75.000,36.247 75.000,35.711 C75.000,35.175 75.253,34.691 75.688,34.401 C76.122,34.111 76.660,33.966 77.301,33.966 C77.713,33.966 78.123,34.027 78.530,34.148 C78.936,34.270 79.287,34.441 79.583,34.662 L79.001,35.400 C78.810,35.245 78.551,35.118 78.225,35.019 C77.898,34.919 77.576,34.870 77.259,34.870 C76.942,34.870 76.681,34.928 76.478,35.044 C76.275,35.160 76.173,35.335 76.173,35.570 C76.173,35.805 76.275,35.984 76.478,36.108 C76.681,36.233 77.114,36.367 77.776,36.510 C78.439,36.654 78.938,36.856 79.274,37.115 C79.609,37.375 80.000,37.791 80.000,38.297 C80.000,38.802 79.787,39.213 79.362,39.528 C78.937,39.842 78.380,40.000 77.689,40.000 C76.679,40.000 75.783,39.688 75.000,39.063 L75.684,38.326 C76.337,38.834 77.015,39.088 77.717,39.088 C78.068,39.088 78.347,39.021 78.554,38.885 C78.760,38.750 78.863,38.570 78.863,38.347 C78.863,38.123 78.544,37.915 78.349,37.791 C78.155,37.666 77.821,37.553 77.347,37.451 ZM82.000,40.000 L81.000,40.000 L81.000,34.000 L82.000,34.000 L82.000,40.000 ZM85.813,34.000 C86.591,34.000 87.603,34.297 88.118,34.783 L87.631,35.529 C87.420,35.336 86.842,35.148 86.628,35.073 C86.414,34.999 86.166,34.961 85.883,34.961 C85.336,34.961 84.878,35.150 84.507,35.529 C84.136,35.908 83.951,36.405 83.951,37.021 C83.951,37.637 84.131,38.131 84.492,38.504 C84.852,38.877 85.289,39.063 85.801,39.063 C86.314,39.063 86.743,38.945 87.000,38.707 L87.000,37.116 L88.000,37.116 L88.000,39.097 C87.490,39.699 86.761,40.000 85.813,40.000 C85.014,40.000 84.346,39.718 83.808,39.155 C83.269,38.591 83.000,37.878 83.000,37.016 C83.000,36.155 83.274,35.437 83.823,34.862 C84.372,34.287 85.035,34.000 85.813,34.000 ZM93.167,38.481 L93.167,34.000 L94.000,34.000 L94.000,40.000 L93.003,40.000 L89.833,35.622 L89.833,40.000 L89.000,40.000 L89.000,34.000 L89.919,34.000 L93.167,38.481 ZM99.000,34.953 L96.000,34.953 L96.000,36.553 L98.000,36.553 L98.000,37.553 L96.000,37.553 L96.000,39.047 L99.000,39.047 L99.000,40.000 L95.000,40.000 L95.000,34.000 L99.000,34.000 L99.000,34.953 ZM103.457,34.139 C103.739,34.215 103.968,34.324 104.144,34.463 C104.534,34.773 104.729,35.267 104.729,35.948 C104.729,36.938 104.302,37.562 103.449,37.820 L105.000,40.000 L104.063,40.000 L102.834,38.000 L101.000,38.000 L101.000,40.000 L100.000,40.000 L100.000,34.000 L102.203,34.000 C102.698,34.000 103.116,34.046 103.457,34.139 ZM101.000,37.013 L102.566,37.050 C103.193,37.050 103.543,36.498 103.543,36.094 C103.543,35.690 103.162,35.036 102.566,35.036 L101.000,35.000 L101.000,37.013 Z","#333333");
        logo.x = 50*ratio;
        logo.y = 50*ratio;
        instance.addChild(logo)

        facebook = svg.createSvg("M2.52675,24.48 L7.58475,24.48 L7.58475,12.2385 L10.959,12.2385 L11.406,8.0205 L7.58475,8.0205 L7.59,5.9085 C7.59,4.809 7.695,4.21875 9.273,4.21875 L11.382,4.21875 L11.382,0 L8.007,0 C3.95325,0 2.52675,2.04675 2.52675,5.48775 L2.52675,8.0205 L0,8.0205 L0,12.23925 L2.52675,12.23925 L2.52675,24.48 L2.52675,24.48 Z","#333333");
        dribble = svg.createSvg("M12.3592171,1.77635684e-15 C5.53340292,1.77635684e-15 0,5.53340292 0,12.3592171 C0,19.1850313 5.53340292,24.7184342 12.3592171,24.7184342 C19.1850313,24.7184342 24.7184342,19.1850313 24.7184342,12.3592171 C24.7184342,5.53340292 19.1850313,1.77635684e-15 12.3592171,1.77635684e-15 L12.3592171,1.77635684e-15 Z M20.5345616,5.62124217 C22.0225678,7.42894572 22.9225678,9.73625261 22.9468998,12.2514614 C22.7932985,12.2201775 19.2029749,11.4480376 15.5584447,11.9067745 C15.4840397,11.7247077 15.4076618,11.5432985 15.3304384,11.3570042 C15.1087265,10.8399269 14.8710438,10.3256681 14.6243424,9.81901879 C18.8131002,8.10864301 20.5137056,5.64980167 20.5345616,5.62124217 L20.5345616,5.62124217 Z M12.3426827,1.75293319 C15.0274635,1.75293319 17.4801044,2.75232777 19.348215,4.39872651 C19.3224739,4.43762004 17.8116388,6.73741127 13.8084238,8.23922756 C11.9951775,4.90744259 10.0019311,2.26371608 9.84212944,2.05036534 C10.6448017,1.85721294 11.4809186,1.75293319 12.3426827,1.75293319 L12.3426827,1.75293319 Z M7.81694154,2.76557411 C7.95804802,2.95393528 9.91925887,5.61569937 11.7547704,8.87805846 C6.66187891,10.2319102 2.24173278,10.1762944 1.9623382,10.1735699 C2.65039666,6.8882881 4.85830898,4.16245303 7.81694154,2.76557411 L7.81694154,2.76557411 Z M1.73508351,12.3592171 C1.73508351,12.245261 1.7406263,12.1354384 1.7441023,12.0214823 C1.9317119,12.0284342 7.1726618,12.146618 12.634572,10.5105532 C12.9382985,11.1068267 13.2287787,11.7108038 13.4950209,12.3133716 C13.354666,12.3543319 13.2149687,12.3953862 13.0766806,12.4412317 C7.35275574,14.292714 4.44908142,19.4418789 4.44908142,19.4418789 C4.44908142,19.4418789 4.45189979,19.4446973 4.45321503,19.4474217 C2.76294363,17.5688831 1.73508351,15.0849582 1.73508351,12.3592171 L1.73508351,12.3592171 Z M12.3420251,22.9661587 C9.88243215,22.9661587 7.6236952,22.1217745 5.82435282,20.7171921 C5.84379958,20.6754802 7.887119,16.2775992 14.1475678,14.0945825 C14.1711482,14.0869729 14.1941649,14.0800209 14.2163361,14.0710021 C15.7098852,17.9504906 16.3256054,21.1988518 16.4834342,22.1259081 C15.2102818,22.6673173 13.8104906,22.9661587 12.3420251,22.9661587 L12.3420251,22.9661587 Z M18.2702818,21.1571399 C18.1612109,20.5177453 17.5968789,17.4041962 16.2054489,13.5803236 C19.6290188,13.0319624 22.5965762,13.9716075 22.8148121,14.041785 C22.3436743,16.9982568 20.6513361,19.5502923 18.2702818,21.1571399 L18.2702818,21.1571399 Z","#333333")
        soundCloud = svg.createSvg ("M17.6625009,1.02318154e-14 C16.8627186,1.02318154e-14 16.0843644,0.15885 15.3967509,0.42525 C15.1285986,0.5286537 15.0570837,0.6318558 15.0547509,0.83925 L15.0547509,12.0824991 C15.0570819,12.2974875 15.225768,12.4787997 15.4372509,12.5009991 C15.4465983,12.5021691 25.1931564,12.5054991 25.25625,12.5054991 C27.2133495,12.5054991 28.8,10.9182645 28.8,8.9617491 C28.8,7.0052346 27.2127654,5.4224991 25.25625,5.4224991 C24.7713579,5.4224991 24.3072153,5.5211526 23.886,5.6969991 C23.6032425,2.5042986 20.9282265,0 17.6625009,0 L17.6625009,1.02318154e-14 Z M14.3302509,0.828 C14.118183,0.828 13.9445073,1.0028448 13.9410009,1.21725 C13.9410009,1.21725 13.7494971,7.3844244 13.7812509,9.1979991 C13.8130038,11.0115729 13.9410009,12.0937491 13.9410009,12.0937491 C13.9445109,12.3046488 14.118183,12.4784991 14.3302509,12.4784991 C14.5423188,12.4784991 14.7159945,12.3047343 14.7195009,12.0914991 C14.7195009,12.0914991 14.8765644,10.1646414 14.8950009,9.1979991 C14.9457339,6.5380086 14.7195009,1.21725 14.7195009,1.21725 C14.7165759,1.0028448 14.5429038,0.828 14.3302509,0.828 L14.3302509,0.828 Z M13.0860009,1.51875 C12.9044142,1.5373926 12.7607913,1.6925931 12.7575009,1.881 C12.7575009,1.881 12.5837145,6.7578192 12.6180009,9.1957491 C12.631797,10.1766798 12.7575009,12.1342482 12.7575009,12.1342482 C12.7610109,12.3328791 12.9211191,12.4987482 13.1197509,12.4987482 C13.3170066,12.4987482 13.4811585,12.3363594 13.4865009,12.1364982 L13.4865009,12.1342482 C13.4865009,12.1342482 13.6263069,10.1783979 13.6417509,9.1979982 C13.6801683,6.7592376 13.4865009,1.881 13.4865009,1.881 C13.4824059,1.6800318 13.3177977,1.51875 13.1197509,1.51875 C13.1073363,1.51875 13.0981068,1.517508 13.0860009,1.51875 L13.0860009,1.51875 Z M9.50400089,2.358 C9.34568099,2.358 9.21675689,2.4830055 9.21150089,2.646 C9.21150089,2.646 9.00564119,7.6023306 9.03150089,9.1957491 C9.05736059,10.7891685 9.21150089,12.1994991 9.21150089,12.1994991 C9.21675689,12.3607395 9.34568099,12.4897491 9.50400089,12.4897491 C9.66290579,12.4897491 9.79124489,12.3613245 9.79650089,12.1994991 C9.79650089,12.1994991 9.97170839,10.7895069 10.0012509,9.1957491 C10.0307943,7.6019913 9.79650089,2.646 9.79650089,2.646 C9.79124489,2.4830055 9.66290579,2.358 9.50400089,2.358 L9.50400089,2.358 Z M10.7010009,2.49975 C10.5274917,2.49975 10.3878405,2.6366535 10.3837509,2.8124991 C10.3837509,2.8124991 10.185552,7.0680105 10.2172509,9.1957491 C10.2320586,10.189647 10.3837509,12.1724991 10.3837509,12.1724991 C10.3872609,12.3471765 10.5274917,12.4874991 10.7010009,12.4874991 C10.8725616,12.4874991 11.0123901,12.3494652 11.0182509,12.1747491 L11.0182509,12.1724991 C11.0182509,12.1724991 11.1862755,10.1899908 11.2027509,9.1957491 C11.2380102,7.0678935 11.0182509,2.8124991 11.0182509,2.8124991 C11.0135799,2.6366535 10.8733419,2.49975 10.7010009,2.49975 L10.7010009,2.49975 Z M8.31825089,2.59425 C8.17278299,2.59425 8.05575689,2.7101961 8.05050089,2.8597491 C8.05050089,2.8597491 7.82597879,7.6345398 7.85250089,9.1957491 C7.87902389,10.7569575 8.05050089,12.2197491 8.05050089,12.2197491 C8.05518089,12.3669702 8.17278299,12.4852491 8.31825089,12.4852491 C8.46119879,12.4852491 8.57675249,12.3692517 8.58375089,12.2219991 L8.58375089,12.2197491 C8.58375089,12.2197491 8.78729939,10.2063411 8.80650089,9.1957491 C8.84663819,7.083243 8.58375089,2.8597491 8.58375089,2.8597491 C8.57790989,2.7101925 8.46196559,2.59425 8.31825089,2.59425 L8.31825089,2.59425 Z M11.9070009,2.70675 C11.7194697,2.70675 11.5690905,2.8582974 11.5650009,3.0487491 C11.5650009,3.0487491 11.3838741,7.1462691 11.4120009,9.1957491 C11.425563,10.183986 11.5672509,12.1567482 11.5672509,12.1567482 C11.5707609,12.3436953 11.7194697,12.4919991 11.9070009,12.4919991 C12.0933639,12.4919991 12.2420709,12.3427017 12.2467509,12.1522491 C12.2467509,12.1522491 12.4029378,10.182708 12.4177509,9.1957491 C12.4485147,7.1461413 12.2467509,3.0487491 12.2467509,3.0487491 C12.2420799,2.8594665 12.0933639,2.70675 11.9070009,2.70675 L11.9070009,2.70675 Z M7.13925089,3.1072491 C7.00897229,3.1072491 6.90434009,3.2124627 6.89850089,3.3479982 C6.89850089,3.3479982 6.65490779,7.2458046 6.68700089,9.1957491 C6.70379849,10.2163059 6.89850089,12.2489982 6.89850089,12.2489982 C6.90434189,12.3821982 7.00955639,12.4897482 7.13925089,12.4897482 C7.26818849,12.4897482 7.37694989,12.384504 7.38450089,12.2512482 L7.38450089,12.2489982 C7.38450089,12.2489982 7.59332879,10.6814259 7.62075089,9.1957491 C7.64817299,7.7100714 7.38450089,3.3479982 7.38450089,3.3479982 C7.37807489,3.2124627 7.26952859,3.1072491 7.13925089,3.1072491 L7.13925089,3.1072491 Z M5.97150089,4.2187491 C5.85524339,4.2187491 5.75968049,4.3138188 5.75325089,4.4347491 C5.75325089,4.4347491 5.51138309,7.8856695 5.52825089,9.1934991 C5.54511959,10.5013287 5.75325089,12.2692482 5.75325089,12.2692482 C5.75967689,12.3890112 5.85524339,12.4852482 5.97150089,12.4852482 C6.08717429,12.4852482 6.18332129,12.3901803 6.18975089,12.2692482 C6.18975089,12.2692482 6.42895199,10.2222306 6.44400089,9.1934991 C6.46723439,7.6053267 6.18975089,4.4347491 6.18975089,4.4347491 C6.18332489,4.3138188 6.08717429,4.2187491 5.97150089,4.2187491 L5.97150089,4.2187491 Z M3.66300089,5.8724991 C3.57361829,5.8724991 3.50126369,5.9431887 3.49425089,6.0389991 C3.49425089,6.0389991 3.23633699,8.1560853 3.23775089,9.1934991 C3.23916389,10.2309138 3.49425089,12.2422491 3.49425089,12.2422491 C3.50126189,12.3368904 3.57303239,12.4064991 3.66300089,12.4064991 C3.75063209,12.4064991 3.82357169,12.3368913 3.83175089,12.2422491 C3.83175089,12.2422491 4.11818129,10.214739 4.11975089,9.1934991 C4.12137089,8.1379962 3.83175089,6.0389991 3.83175089,6.0389991 C3.82356989,5.9431887 3.75063209,5.8724991 3.66300089,5.8724991 L3.66300089,5.8724991 Z M2.52225089,5.9827491 C2.44630439,5.9827491 2.38359599,6.0427107 2.37600089,6.1244991 C2.37600089,6.1256601 2.10655979,8.1666666 2.10825089,9.1934991 C2.10987989,10.1829402 2.37600089,12.1477491 2.37600089,12.1477491 C2.38359689,12.2301225 2.44630439,12.2894991 2.52225089,12.2894991 C2.59703009,12.2894991 2.65748759,12.2328693 2.66625089,12.1522491 C2.66625089,12.1522491 2.96818289,10.1849238 2.97000089,9.1934991 C2.97188189,8.1655038 2.66625089,6.1244991 2.66625089,6.1244991 C2.65690349,6.0421266 2.59703009,5.9827491 2.52225089,5.9827491 L2.52225089,5.9827491 Z M4.81275089,6.0772491 C4.70876129,6.0772491 4.62568049,6.1581699 4.61925089,6.2662491 C4.61925089,6.2662491 4.38043049,8.2149291 4.37850089,9.1934991 C4.37647589,10.2211803 4.61925089,12.2669991 4.61925089,12.2669991 C4.62567689,12.3768306 4.70817809,12.4582491 4.81275089,12.4582491 C4.91483789,12.4582491 4.99764689,12.3773175 5.00625089,12.2692482 L5.00625089,12.2669982 C5.00625089,12.2669982 5.28072569,10.1974914 5.27850089,9.1934982 C5.27627789,8.189505 5.00625089,6.2662482 5.00625089,6.2662482 C4.99923989,6.1575858 4.91557139,6.0772482 4.81275089,6.0772482 L4.81275089,6.0772491 Z M1.38825179,6.4889991 C1.32749369,6.4889991 1.27776419,6.5377332 1.26900179,6.6037491 C1.26900179,6.6049191 0.984422686,8.3354094 0.985501786,9.1934991 C0.986581786,10.0515879 1.26900179,11.7224991 1.26900179,11.7224991 C1.27776779,11.7896841 1.32974459,11.8372491 1.39050179,11.8372491 C1.45125899,11.8372491 1.50206939,11.7908514 1.51200179,11.7224991 C1.51200179,11.7224991 1.83029579,10.0433592 1.83150089,9.1934991 C1.83273389,8.3242404 1.51200179,6.6037491 1.51200179,6.6037491 C1.50206939,6.5353968 1.44900899,6.4889991 1.38825179,6.4889991 L1.38825179,6.4889991 Z M0.326251336,7.4789991 C0.266077426,7.4789991 0.217430536,7.5254841 0.209251336,7.5914991 C0.209251336,7.5914991 -0.000610664061,8.6602518 1.33593919e-06,9.1934991 C0.000613335939,9.7267464 0.209251336,10.7639991 0.209251336,10.7639991 C0.217430536,10.830015 0.266662246,10.8764991 0.326251336,10.8764991 C0.384672136,10.8764991 0.431653936,10.8288477 0.441001336,10.7639991 C0.441001336,10.7639991 0.690030616,9.7240086 0.690751336,9.1934991 C0.691480336,8.6537187 0.441001336,7.5914991 0.441001336,7.5914991 C0.432238036,7.5254841 0.384672136,7.4789991 0.326251336,7.4789991 L0.326251336,7.4789991 Z","#333333")
        behance = svg.createSvg("M20.9351323,2.04122283 L15.1265429,2.04122283 L15.1265429,0.598413041 L20.9356174,0.598413041 L20.9356174,2.04122283 L20.9351323,2.04122283 L20.9351323,2.04122283 Z M11.2596294,7.95771311 C11.6344258,8.53823251 11.8217162,9.24309117 11.8217162,10.0706183 C11.8217162,10.9263872 11.6105496,11.6940892 11.1809405,12.3722152 C10.9076312,12.8209037 10.5682988,13.1999579 10.1605716,13.5051739 C9.70131937,13.8580883 9.15771909,14.1000837 8.53273506,14.2294353 C7.90575687,14.3588948 7.22709191,14.4243252 6.49614733,14.4243252 L0,14.4243252 L0,2.04281037e-14 L6.96612497,2.04281037e-14 C8.72201963,0.0285651546 9.96686751,0.537294389 10.7019621,1.53637415 C11.1430512,2.14912366 11.3616016,2.88443386 11.3616016,3.73901705 C11.3616016,4.62087188 11.1404103,5.3264851 10.6950095,5.86259376 C10.4471933,6.16317464 10.081182,6.43653778 9.59670623,6.68338384 C10.3306151,6.95205798 10.8874739,7.37514565 11.2596294,7.95771311 L11.2596294,7.95771311 Z M3.32660089,5.68678332 L6.37886851,5.68678332 C7.00611619,5.68678332 7.51317463,5.56751032 7.9037088,5.32917992 C8.29397349,5.09122679 8.48870161,4.66824692 8.48870161,4.06099485 C8.48870161,3.39003709 8.23086067,2.94463627 7.71393916,2.73034371 C7.26961626,2.58142763 6.70111579,2.50473289 6.01129425,2.50473289 L3.32660089,2.50473289 L3.32660089,5.68678332 L3.32660089,5.68678332 Z M8.78259932,9.86457192 C8.78259932,9.11530253 8.47635931,8.59730309 7.86517279,8.31935875 C7.52330717,8.16133416 7.04109503,8.08059717 6.42268638,8.07488414 L3.32660089,8.07488414 L3.32660089,11.9188916 L6.37477237,11.9188916 C7.00099602,11.9188916 7.48568741,11.836915 7.83547581,11.6659014 C8.46628066,11.3514691 8.78259932,10.753056 8.78259932,9.86457192 L8.78259932,9.86457192 Z M23.0903463,7.51797142 C23.1605196,7.98988933 23.1922646,8.6745907 23.1793295,9.56948849 L15.6565612,9.56948849 C15.6981155,10.6079127 16.0565273,11.3340066 16.736378,11.7495487 C17.1463688,12.0101384 17.6434564,12.1373881 18.2255388,12.1373881 C18.8393662,12.1373881 19.3395798,11.98222 19.7246704,11.6632604 C19.9344896,11.494187 20.1195702,11.2555333 20.279589,10.9544134 L23.0369349,10.9544134 C22.9647135,11.5677019 22.632711,12.1897216 22.0360765,12.82182 C21.1116973,13.826505 19.8152705,14.3302218 18.1502992,14.3302218 C16.7748062,14.3302218 15.5626196,13.9053556 14.5105057,13.0586952 C13.4618411,12.2091783 12.9351644,10.8312599 12.9351644,8.91981986 C12.9351644,7.12738335 13.4079985,5.75544748 14.3568467,4.80050897 C15.3091982,3.84379188 16.5383083,3.36761614 18.0532855,3.36761614 C18.9512015,3.36761614 19.7607272,3.52811997 20.4828328,3.85079843 C21.2027285,4.17380026 21.7976922,4.68215222 22.2663224,5.38081279 C22.6903263,5.99609544 22.9630427,6.70752948 23.0903463,7.51797142 L23.0903463,7.51797142 Z M20.3762254,7.78713063 C20.3256705,7.06912122 20.0859388,6.52568262 19.6542816,6.15428172 C19.2261815,5.78185678 18.6913664,5.59488976 18.0532316,5.59488976 C17.3586672,5.59488976 16.8224507,5.79473804 16.4414023,6.18748197 C16.0577669,6.57947135 15.8190054,7.11240012 15.7212371,7.78718453 L20.3762254,7.78713063 L20.3762254,7.78713063 L20.3762254,7.78713063 Z","#333333")
        
        facebook.x = 50*ratio;
        facebook.y = stage.canvas.height-175*ratio-50*ratio;
        facebook.scaleX = ratio/1.5
        facebook.scaleY = ratio/1.5
        instance.addChild(facebook)

        dribble.scaleX = ratio/1.5
        dribble.scaleY = ratio/1.5
        dribble.x = 45*ratio;
        dribble.y = facebook.y+16*ratio+40*ratio
        instance.addChild(dribble)

        soundCloud.scaleX = ratio/1.1
        soundCloud.scaleY = ratio/1.1
        soundCloud.x = 41*ratio;
        soundCloud.y = dribble.y+16*ratio+40*ratio
        instance.addChild(soundCloud)

        behance.scaleX = ratio/1.1
        behance.scaleY = ratio/1.1
        behance.x = 45*ratio;
        behance.y = soundCloud.y+10*ratio+40*ratio
        instance.addChild(behance)

        boundLink = new createjs.Shape();
        boundLink.graphics.beginFill("#FFFFFF").drawRect(0, 0, 105*ratio,40*ratio);
        boundLink.alpha = 0.01
        boundLink.x = 50*ratio;
        boundLink.y = 50*ratio;
        instance.addChild(boundLink);

        boundLink1 = new createjs.Shape();
        boundLink1.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,50*ratio);
        boundLink1.alpha = 0.01
        boundLink1.x = 30*ratio
        boundLink1.y = facebook.y-15*ratio
        instance.addChild(boundLink1);

        boundLink2 = new createjs.Shape();
        boundLink2.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,50*ratio);
        boundLink2.alpha = 0.01
        boundLink2.x = 30*ratio
        boundLink2.y = facebook.y+36*ratio
        instance.addChild(boundLink2);

        boundLink3 = new createjs.Shape();
        boundLink3.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,50*ratio);
        boundLink3.alpha = 0.01
        boundLink3.x = 30*ratio
        boundLink3.y = facebook.y+87*ratio
        instance.addChild(boundLink3);

        boundLink4 = new createjs.Shape();
        boundLink4.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,50*ratio);
        boundLink4.alpha = 0.01
        boundLink4.x = 30*ratio
        boundLink4.y = facebook.y+138*ratio
        instance.addChild(boundLink4);

        boundLink1.cursor = "pointer"
        boundLink1.icon = facebook
        boundLink1.link = "https://www.facebook.com/Pete-War-791558340871956/"
        boundLink1.addEventListener("click", handlerClickNavigationSocial);
        boundLink1.addEventListener("mouseover", handlerOverNavigationSocial);
        boundLink1.addEventListener("mouseout", handlerOutNavigationSocial);

        boundLink2.cursor = "pointer"
        boundLink2.icon = dribble
        boundLink2.link = "https://dribbble.com/Pete_War"
        boundLink2.addEventListener("click", handlerClickNavigationSocial);
        boundLink2.addEventListener("mouseover", handlerOverNavigationSocial);
        boundLink2.addEventListener("mouseout", handlerOutNavigationSocial);

        boundLink3.cursor = "pointer"
        boundLink3.icon = soundCloud
        boundLink3.link = "https://soundcloud.com/bwcolors"
        boundLink3.addEventListener("click", handlerClickNavigationSocial);
        boundLink3.addEventListener("mouseover", handlerOverNavigationSocial);
        boundLink3.addEventListener("mouseout", handlerOutNavigationSocial);

        boundLink4.cursor = "pointer"
        boundLink4.icon = behance
        boundLink4.link = "https://www.behance.net/bwcolors_pt"
        boundLink4.addEventListener("click", handlerClickNavigationSocial);
        boundLink4.addEventListener("mouseover", handlerOverNavigationSocial);
        boundLink4.addEventListener("mouseout", handlerOutNavigationSocial);

        boundLink.cursor = "pointer"
        boundLink.icon = logo
        boundLink.link = "resetNav"
        boundLink.addEventListener("click", handlerClickNavigation);
        boundLink.addEventListener("mouseover", handlerOverNavigationSocial);
        boundLink.addEventListener("mouseout", handlerOutNavigationSocial);

        aboutfield = new createjs.Text();
        aboutfield.font = "bold 18px Montserrat";
        aboutfield.color = "#333333";
        aboutfield.text = "About";
        aboutfield.x= stage.canvas.width-aboutfield.getBounds().width*ratio-50*ratio
        aboutfield.y= 61*ratio
        aboutfield.scaleX = ratio;
        aboutfield.scaleY = ratio;
        instance.addChild(aboutfield);

        boundAbout = new createjs.Shape();
        boundAboutOpen = false;
        boundAbout.icon = aboutfield;
        boundAbout.graphics.beginFill("#FFFFFF").drawRect(0, 0, aboutfield.getBounds().width*ratio,aboutfield.getBounds().height*ratio);
        boundAbout.cursor = "pointer"
        boundAbout.alpha = 0.01
        boundAbout.x= aboutfield.x
        boundAbout.y= aboutfield.y
        instance.addChild(boundAbout);

        instance.addEventListener("closeAbout", handlerClickAboutClose);
        boundAbout.addEventListener("click", handlerClickAboutOpen);
        boundAbout.addEventListener("mouseover", handlerOverNavigationSocial);
        boundAbout.addEventListener("mouseout", handlerOutNavigationSocial);

        box = new createjs.Shape();
        box.x = stage.canvas.width/2+10*ratio
        box.y = stage.canvas.height/2+100*ratio
        instance.addChild(box);
        //
        contentfield = new createjs.Text();
        contentfield.font = "14px Source";
        contentfield.color = "#000000";
        contentfield.alpha=0.9
        contentfield.lineWidth = 125*ratio
        contentfield.text = news[nav].content
        contentfield.lineHeight = 20;
        contentfield.alpha = 0.8
        contentfield.x= box.x+20*ratio
        contentfield.y= box.y+20*ratio
        contentfield.scaleX = ratio;
        contentfield.scaleY = ratio;
        instance.addChild(contentfield);
        //
        buttonfield = new createjs.Text();
        buttonfield.font = "bold 14px Montserrat";
        buttonfield.color = news[nav].color2;
        buttonfield.alpha=0.9
        buttonfield.text = news[nav].buttonTittle;
        buttonfield.x= contentfield.x
        buttonfield.y= contentfield.y+contentfield.getBounds().height*ratio-12*ratio+30*ratio;
        buttonfield.scaleX = ratio;
        buttonfield.scaleY = ratio;
        instance.addChild(buttonfield)

        lineLink = new createjs.Shape();
        lineLink.graphics.beginFill(news[nav].color1).drawRect(0, 0, buttonfield.getBounds().width*ratio, 1*ratio);
        lineLink.x = buttonfield.x;
        lineLink.y = buttonfield.y+buttonfield.getBounds().height*ratio+3*ratio;
        lineLink.scaleX=0;
        instance.addChild(lineLink);

        boxBound = new createjs.Shape();
        boxBound.cursor = "pointer"
        boxBound.addEventListener("click", handlerClickNavigationBox);
        boxBound.addEventListener("mouseover", handlerOverNavigationBox);
        boxBound.addEventListener("mouseout", handlerOutNavigationBox);
        boxBound.x = stage.canvas.width/2+10*ratio
        boxBound.y = stage.canvas.height/2+100*ratio
        instance.addChild(boxBound);
        boxBound.alpha = 0.01

        box.graphics.beginFill("#FFFFFF").drawRect(0, 0, 300*ratio,contentfield.getBounds().height*ratio+buttonfield.getBounds().height*ratio+62*ratio);
        boxBound.graphics.beginFill("#FFFFFF").drawRect(0, 0, 300*ratio,contentfield.getBounds().height*ratio+buttonfield.getBounds().height*ratio+62*ratio);

        buttonfield.visible = false;
        contentfield.visible = false;
        box.visible = false;
        boxBound.visible = false;

        loadCurrentAssests([news[nav].image,news[nav].bg,news[nav].parallax1,news[nav].parallax2,news[nav].parallax3,news[nav].parallax4])  
        addFollowMouse("init");


    }

    function handlerClickNavigationBox(evt){
        window.open(news[nav].link,"_blank");
    }


    function handlerOverNavigationBox(evt){
        
        arrowLeft.visible = false
        arrowRight.visible = false
        createjs.Tween.get(lineLink).to({scaleX:1}, 400, createjs.Ease.circInOut)

    }


    function handlerOutNavigationBox(evt){

        arrowRight.visible = true
        arrowLeft.visible = true;
        createjs.Tween.get(lineLink).to({scaleX:0}, 300, createjs.Ease.circInOut)

    }

    function addFollowMouse(Iaction){

        if(Iaction=="init"){

            instance.cursor = 'none';

            arrowLeft = svg.createSvg("M32.808,0.005 L40.000,7.239 L14.385,32.999 L40.000,58.761 L32.808,65.993 L0.000,32.999 L32.808,0.005 Z",news[nav].color2)
            arrowLeft.mouseChildren =true
            instance.addChild(arrowLeft);
            arrowRight = svg.createSvg("M7.192,0.005 L0.000,7.239 L25.615,32.999 L0.000,58.761 L7.192,65.993 L40.000,32.999 L7.192,0.005 Z",news[nav].color2)
            arrowRight.mouseChildren =false
            instance.addChild(arrowRight);

            arrowRight.alpha = 0
            arrowLeft.alpha = 0
            
            swarm = new zim.Container(stage.canvas.width, stage.canvas.height);
            stage.addChild(swarm);
            // we will make a series of circles follow the mouse
            // each circle gets damped at a slightly higher damping
            // each circle gets a slightly higher alpha
            num = 1;
            minDamp = .08;
            maxDamp = .04;
            minAlpha = .1;
            maxAlpha = .4;
            c;

            for (var i=0; i<num; i++) {

                c = new zim.Circle(30);
                c.center(swarm);
                // each circle gets its own zim.Damp for x and y
                c.dX = new zim.Damp(null, minDamp+i*(maxDamp-minDamp)/num);
                c.dY = new zim.Damp(null, minDamp+i*(maxDamp-minDamp)/num);
                c.alpha = 0
            }

            zim.Ticker.add(animation, instance);
        
        }else {

            instance.removeChild(arrowLeft);
            arrowLeft = null;

            arrowLeft = svg.createSvg("M32.808,0.005 L40.000,7.239 L14.385,32.999 L40.000,58.761 L32.808,65.993 L0.000,32.999 L32.808,0.005 Z",news[nav].color2)
            instance.addChild(arrowLeft);

            instance.removeChild(arrowRight);
            arrowRight = null;

            arrowRight = svg.createSvg("M7.192,0.005 L0.000,7.239 L25.615,32.999 L0.000,58.761 L7.192,65.993 L40.000,32.999 L7.192,0.005 Z",news[nav].color2)
            instance.addChild(arrowRight);

            arrowRight.alpha = 0
            arrowLeft.alpha = 0

            bounds.graphics.clear();
            bounds.graphics.beginFill(news[nav].color2).drawRect(0, 0, stage.canvas.width/2,stage.canvas.height);

            bounds2.graphics.clear();
            bounds2.graphics.beginFill(news[nav].color2).drawRect(0, 0, stage.canvas.width/2,stage.canvas.height);

            buttonfield.text = news[nav].buttonTittle;
            buttonfield.color = news[nav].color2;
            contentfield.text = news[nav].content
            
            buttonfield.y= contentfield.y+contentfield.getBounds().height*ratio-12*ratio+30*ratio;

            lineLink.graphics.clear()
            lineLink.scaleX=0;
            lineLink.x = buttonfield.x;
            lineLink.y = buttonfield.y+buttonfield.getBounds().height*ratio+3*ratio;
            lineLink.graphics.beginFill(news[nav].color1).drawRect(0, 0, buttonfield.getBounds().width*ratio, 1*ratio);

            box.graphics.clear();
            box.graphics.beginFill("#FFFFFF").drawRect(0, 0, 300*ratio,contentfield.getBounds().height*ratio+buttonfield.getBounds().height*ratio+62*ratio)

            zim.Ticker.add(animation, stage);
       }
    }

    function animation(){
        var c;
                for (var i=0; i<num; i++) {
                    // access each circle
                    c = swarm.getChildAt(i);
                    // apply the damp converted value of the mouse position
                    c.x = c.dX.convert(stage.mouseX);
                    c.y = c.dY.convert(stage.mouseY);
                    
                    arrowLeft.x = c.x+25*ratio
                    arrowLeft.y = c.y-32*ratio
                    
                    arrowRight.x = c.x-50*ratio
                    arrowRight.y = c.y-32*ratio

                    if(arrowRight.x>stage.canvas.width/2-20*ratio){
                        arrowRight.alpha = 1
                        arrowLeft.alpha = 0
                        //bounds.alpha = 0.01
                        //bounds2.alpha = 0.02
                    }else{
                        arrowRight.alpha = 0
                        arrowLeft.alpha = 1
                        //bounds.alpha = 0.02
                        //bounds2.alpha = 0.01
                    }
                }
    }
    function loadCurrentAssests(IAssets){

        loaded = false;

        preloadContent = new Loader(IAssets,ratio,false);
        preloadContent.register(instance);
        instance.addEventListener("loaderComplete", loadCurrentAssestsComplete);
    }

    function loadCurrentAssestsComplete(evt) {

        buttonfield.visible = true;
        contentfield.visible = true;
        box.visible = true;
        boxBound.visible = true     

        loaded = true;

        instance.removeEventListener("loaderComplete", loadCurrentAssestsComplete);
        preloadContent.kill();
        preloadContent = null;
        
        project = new Project(ratio,aspectRatio,svg,evt.contentLoader,news[nav].shape,news[nav].color1,news[nav].color2,news[nav].content,news[nav].buttonTittle,news[nav].link,news[nav].title,news[nav].menuPos,nav,totalNews)
        //project.mouseChildren = true;
        projectContainer.addChild(project);

        bg.alpha = 0
        bg.graphics.clear();
        bg.graphics.beginFill(news[nav].color1).drawRect(0, 0, stage.canvas.width,stage.canvas.height);

        createjs.Tween.get(bg)
        .to({alpha:0.05}, 400, createjs.Ease.Linear)

        addFollowMouse("refresh");
    }
    
    

    function handlerClickAboutClose(evt){
        
        instance.cursor = 'none';

        bounds.visible=true
        bounds2.visible=true
        boundLink.visible=true
        boundAbout.visible=true

        createjs.Tween.get(leftField).to({alpha:1}, 400, createjs.Ease.circInOut)
        createjs.Tween.get(rightField).to({alpha:1}, 400, createjs.Ease.circInOut)
        createjs.Tween.get(line).to({alpha:1}, 400, createjs.Ease.circInOut)
        createjs.Tween.get(line2).to({alpha:1}, 400, createjs.Ease.circInOut)

        if(project)createjs.Tween.get(project).to({x:0}, 400, createjs.Ease.circInOut)
        createjs.Tween.get(about).to({x:500*ratio}, 300, createjs.Ease.circInOut)
        .call(function(){
            about.kill();
            instance.removeChild(about);
            about =  null
        })
    }

    function handlerClickAboutOpen(evt){

        instance.cursor = 'initial';

        bounds.visible=false
        bounds2.visible=false
        boundLink.visible=false
        boundAbout.visible=false

        createjs.Tween.get(leftField).to({alpha:0}, 400, createjs.Ease.circInOut)
        createjs.Tween.get(rightField).to({alpha:0}, 400, createjs.Ease.circInOut)
        createjs.Tween.get(line).to({alpha:0}, 400, createjs.Ease.circInOut)
        createjs.Tween.get(line2).to({alpha:0}, 400, createjs.Ease.circInOut)

        about = new About(instance,ratio,closeSvg,blackSvg)
        instance.addChild(about);

        about.x = 500*ratio
        if(project)createjs.Tween.get(project).to({x:-200*ratio}, 800, createjs.Ease.circInOut)
        createjs.Tween.get(about).to({x:0}, 400, createjs.Ease.circOut)
    }

    function handlerClickNavigation(evt){

        if(loaded){


            if(evt.target.link=="resetNav"){
                zim.Ticker.remove(animation);
                project.kill();
                projectContainer.removeChild(project);
                project = null;
                nav=0   
                loadCurrentAssests([news[nav].image,news[nav].bg,news[nav].parallax1,news[nav].parallax2,news[nav].parallax3,news[nav].parallax4])
                buttonfield.visible = false;
                contentfield.visible = false;
                box.visible = false;
                boxBound.visible = false;
            }


            if(evt.target.action==0){

                if(nav>0){

                    zim.Ticker.remove(animation);

                    createjs.Tween.get(project).to({x:0+stage.canvas.width}, 600, createjs.Ease.circInOut)
                    .call(function(){
                        project.kill();
                        projectContainer.removeChild(project);
                        project = null;
                        nav--    
                        loadCurrentAssests([news[nav].image,news[nav].bg,news[nav].parallax1,news[nav].parallax2,news[nav].parallax3,news[nav].parallax4])
                        
                    });

                    arrowLeft.scaleX = 0
                    arrowLeft.scaleY = 0
                    createjs.Tween.get(arrowLeft).to({scaleX:1*ratio,scaleY:1*ratio}, 300, createjs.Ease.backOut)
                    buttonfield.visible = false;
                    contentfield.visible = false;
                    box.visible = false;
                    boxBound.visible = false
                }
            }

            if(evt.target.action==1){

                if(nav<totalNews-1){

                    zim.Ticker.remove(animation);

                   createjs.Tween.get(project).to({x:0-stage.canvas.width}, 600, createjs.Ease.circInOut)
                    .call(function(){
                        project.kill();
                        projectContainer.removeChild(project);
                        project = null;
                        nav++   
                        loadCurrentAssests([news[nav].image,news[nav].bg,news[nav].parallax1,news[nav].parallax2,news[nav].parallax3,news[nav].parallax4])
                    });

                     arrowRight.scaleX = 0
                     arrowRight.scaleY = 0
                     createjs.Tween.get(arrowRight).to({scaleX:1*ratio,scaleY:1*ratio}, 300, createjs.Ease.backOut)
                     buttonfield.visible = false;
                    contentfield.visible = false;
                    box.visible = false; 
                    boxBound.visible = false;
                   
                 }

            }

        }
        
    }

    function handlerClickNavigationSocial(evt){
        window.open(evt.target.link,"_blank");
    }

    function handlerOverNavigationSocial(evt){
        arrowLeft.visible = false
        arrowRight.visible = false
        createjs.Tween.get(evt.target.icon).to({alpha:0.5}, 100, createjs.Ease.circInOut)
    }

    function handlerOutNavigationSocial(evt){
        arrowLeft.visible = true
        arrowRight.visible = true
       createjs.Tween.get(evt.target.icon).to({alpha:1}, 100, createjs.Ease.circInOut)
    }

    p.resize = function() {

        bg.graphics.clear();
        bg.graphics.beginFill(news[nav].color1).drawRect(0, 0, stage.canvas.width,stage.canvas.height);

        logo.x = 50*ratio;
        logo.y = 50*ratio;

        line.graphics.clear();
        line.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width/6,1*ratio);
        line.y = stage.canvas.height/2

        leftField.x= line.x+stage.canvas.width/6+5*ratio
        leftField.y= line.y-6*ratio

        line2.graphics.clear();
        line2.graphics.beginFill("#333333").drawRect(0, 0, stage.canvas.width/6,1*ratio);
        line2.regX = stage.canvas.width/6
        line2.x = stage.canvas.width
        line2.y = stage.canvas.height/2

        rightField.x= line2.x-stage.canvas.width/6-rightField.getBounds().width*ratio-5*ratio
        rightField.y= line2.y-6*ratio

        bounds.x = 0
        bounds.y = 0
        bounds.graphics.clear();
        bounds.graphics.beginFill(news[nav].color2).drawRect(0, 0, stage.canvas.width/2,stage.canvas.height);

        bounds2.x = stage.canvas.width/2
        bounds2.y = 0
        bounds2.graphics.clear();
        bounds2.graphics.beginFill(news[nav].color2).drawRect(0, 0, stage.canvas.width/2,stage.canvas.height);

        facebook.x = 50*ratio;
        facebook.y = stage.canvas.height-175*ratio-50*ratio;

        dribble.x = 45*ratio;
        dribble.y = facebook.y+16*ratio+40*ratio

        soundCloud.x = 41*ratio;
        soundCloud.y = dribble.y+16*ratio+40*ratio

        behance.x = 45*ratio;
        behance.y = soundCloud.y+10*ratio+40*ratio

        aboutfield.x= stage.canvas.width-aboutfield.getBounds().width*ratio-50*ratio
        aboutfield.y= 50*ratio

        boundAbout.x = aboutfield.x
        boundAbout.y = aboutfield.y

         boundLink1.x = 30*ratio
        boundLink1.y = facebook.y-15*ratio

        boundLink2.x = 30*ratio
        boundLink2.y = facebook.y+36*ratio

        boundLink3.x = 30*ratio
        boundLink3.y = facebook.y+87*ratio

        boundLink4.x = 30*ratio
        boundLink4.y = facebook.y+138*ratio
        
        boxBound.x = stage.canvas.width/2+10*ratio
        boxBound.y = stage.canvas.height/2+100*ratio

        box.x = stage.canvas.width/2+10*ratio
        box.y = stage.canvas.height/2+100*ratio

        contentfield.x= box.x+20*ratio
        contentfield.y= box.y+20*ratio

        buttonfield.x= contentfield.x
        buttonfield.y= contentfield.y+contentfield.getBounds().height*ratio-12*ratio+30*ratio;

        lineLink.x = buttonfield.x;
        lineLink.y = buttonfield.y+buttonfield.getBounds().height*ratio+3*ratio;

        if(about)about.resize();
        if(project)project.resize();
        if(preloadContent)preloadContent.resize();

    } ;  

window.Main = createjs.promote(Main, "Container");
}());