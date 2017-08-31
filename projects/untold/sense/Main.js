(function () {

    function Main(Iratio) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.setup();

    }
    
    var ratio;
    var instance;
    var home;
    var menu;

    var arrowViewProjectSvg = "M24.001,21.000 L26.002,21.000 L26.002,25.000 L24.001,25.000 L24.001,21.000 ZM25.000,29.000 L22.000,25.000 L28.000,25.000 L25.000,29.000 Z";
    var contactSvg = "M34.000,24.000 L42.995,16.000 L42.995,34.953 L34.000,24.000 ZM15.000,19.000 L42.926,15.000 L29.000,26.000 L15.000,19.000 ZM15.004,24.200 L7.000,25.000 L7.000,24.000 L15.004,23.200 L15.004,24.200 ZM17.000,23.000 L15.004,23.200 L15.004,20.000 L24.000,25.000 L15.004,34.953 L15.004,30.200 L17.000,30.000 L17.000,29.000 L15.004,29.200 L15.004,27.400 L19.000,27.000 L19.000,26.000 L15.004,26.400 L15.004,24.200 L17.000,24.000 L17.000,23.000 ZM7.000,31.000 L7.000,30.000 L15.004,29.200 L15.004,30.200 L7.000,31.000 ZM9.000,28.000 L9.000,27.000 L15.004,26.400 L15.004,27.400 L9.000,28.000 ZM29.015,27.843 L33.000,25.000 L41.957,34.963 L16.000,35.000 L25.000,26.000 L29.015,27.843 Z";
    var handDragSvg = "M18.272,20.175 C18.869,19.576 19.367,19.396 19.907,19.665 C20.058,19.816 20.210,19.968 20.361,20.120 C20.960,20.718 22.095,22.144 22.707,22.001 C22.830,21.983 22.950,21.905 23.077,21.792 C23.114,21.582 23.217,21.467 23.182,21.259 C23.125,20.691 21.918,20.108 21.637,19.540 C21.495,19.253 21.512,18.957 21.617,18.650 C21.678,18.471 21.817,18.088 22.147,17.906 C22.480,17.722 22.999,17.700 23.318,17.859 C23.434,17.975 23.550,18.091 23.666,18.207 C24.180,18.721 24.764,19.520 25.315,19.393 C25.439,19.375 25.558,19.296 25.685,19.183 C25.723,18.974 25.826,18.858 25.790,18.650 C25.751,18.285 25.239,18.124 25.048,17.734 C24.826,17.283 24.939,16.294 25.757,16.008 C26.029,15.913 26.470,15.923 26.729,16.053 C27.727,17.052 28.726,18.051 29.725,19.049 C30.430,19.754 31.134,20.458 31.839,21.163 C32.244,21.569 32.720,21.958 32.958,22.398 C34.206,24.709 34.200,26.920 32.875,29.329 C32.438,30.126 31.316,31.196 30.557,31.648 C30.174,31.876 29.962,32.126 29.585,32.299 C27.802,33.114 26.735,32.931 25.000,33.000 C24.109,33.036 22.869,33.251 22.000,33.000 C21.342,32.810 20.451,32.267 19.817,31.633 C19.594,31.410 19.371,31.187 19.148,30.964 C18.927,30.562 18.809,30.154 18.752,29.755 C18.715,29.505 18.628,29.201 18.756,28.948 C18.961,29.153 19.166,29.359 19.371,29.564 C19.579,29.584 19.686,29.678 19.898,29.626 C20.021,29.608 20.141,29.530 20.268,29.416 C20.305,29.207 20.408,29.092 20.372,28.884 C20.337,28.517 19.696,28.034 19.363,27.700 C18.382,26.719 17.401,25.738 16.420,24.757 C16.262,24.438 16.281,23.919 16.467,23.586 C16.646,23.264 17.030,23.104 17.211,23.056 C17.512,22.976 17.817,22.934 18.101,23.076 C18.217,23.192 18.333,23.308 18.449,23.424 C18.963,23.937 19.547,24.737 20.098,24.610 C20.222,24.592 20.341,24.513 20.468,24.400 C20.506,24.191 20.609,24.075 20.573,23.867 C20.549,23.612 20.238,23.358 19.991,23.112 C19.403,22.523 18.814,21.934 18.226,21.346 C18.017,20.925 18.235,20.600 18.272,20.175 Z";
    var menuSvg = "M22.000,37.000 L22.000,14.000 L36.000,18.124 L36.000,32.875 L22.000,37.000 ZM18.000,15.000 L21.000,17.000 L21.000,34.000 L18.000,36.000 L18.000,15.000 ZM14.000,16.000 L17.000,18.000 L17.000,33.000 L14.000,35.000 L14.000,16.000 Z";
    var closeSvg = "M18.922,18.042 L17.517,19.450 L9.437,11.357 L1.358,19.450 L-0.048,18.042 L8.032,9.950 L-0.045,1.859 L1.360,0.452 L9.437,8.542 L17.514,0.452 L18.920,1.859 L10.843,9.950 L18.922,18.042 Z";
    var menuTxtSvg = "M29.649,33.898 C27.215,33.898 26.039,32.531 26.039,30.564 L26.039,25.754 L27.766,25.754 L27.766,30.504 C27.766,31.619 28.414,32.387 29.649,32.387 C30.885,32.387 31.520,31.619 31.520,30.504 L31.520,25.754 L33.259,25.754 L33.259,30.552 C33.259,32.543 32.084,33.898 29.649,33.898 ZM27.552,14.754 L33.212,14.754 L33.212,16.253 L29.255,16.253 L29.255,17.945 L33.128,17.945 L33.128,19.444 L29.255,19.444 L29.255,21.255 L33.212,21.255 L33.212,22.754 L27.552,22.754 L27.552,14.754 ZM24.248,17.153 L21.993,22.754 L21.249,22.754 L18.995,17.153 L18.995,22.754 L17.292,22.754 L17.292,14.754 L19.678,14.754 L21.621,19.588 L23.564,14.754 L25.963,14.754 L25.963,22.754 L24.248,22.754 L24.248,17.153 ZM22.749,30.780 L22.749,25.754 L24.452,25.754 L24.452,33.754 L22.809,33.754 L18.995,28.537 L18.995,33.754 L17.292,33.754 L17.292,25.754 L19.043,25.754 L22.749,30.780 Z";
    var soundSvg = "M33,26 L33,24 L34,24 L34,26 L33,26 L33,26 Z M31,22 L32,22 L32,28 L31,28 L31,22 L31,22 Z M29,21 L30,21 L30,29 L29,29 L29,21 L29,21 Z M27,19 L28,19 L28,31 L27,31 L27,19 L27,19 Z M25,17 L26,17 L26,33 L25,33 L25,17 L25,17 Z M23,21 L24,21 L24,29 L23,29 L23,21 L23,21 Z M21,19 L22,19 L22,31 L21,31 L21,19 L21,19 Z M19,22 L20,22 L20,28 L19,28 L19,22 L19,22 Z M17,23 L18,23 L18,27 L17,27 L17,23 L17,23 Z";
    var allProjectsSvg = "M29.000,31.000 L29.000,29.000 L32.000,29.000 L32.000,30.000 L29.000,31.000 ZM29.000,24.000 L32.000,24.000 L32.000,27.000 L29.000,27.000 L29.000,24.000 ZM29.000,20.000 L32.000,21.000 L32.000,22.000 L29.000,22.000 L29.000,20.000 ZM24.000,29.000 L27.000,29.000 L27.000,31.000 L24.000,32.000 L24.000,29.000 ZM24.000,24.000 L27.000,24.000 L27.000,27.000 L24.000,27.000 L24.000,24.000 ZM24.000,19.000 L27.000,20.000 L27.000,22.000 L24.000,22.000 L24.000,19.000 ZM19.000,29.000 L22.000,29.000 L22.000,32.000 L19.000,33.000 L19.000,29.000 ZM19.000,24.000 L22.000,24.000 L22.000,27.000 L19.000,27.000 L19.000,24.000 ZM19.000,18.000 L22.000,19.000 L22.000,22.000 L19.000,22.000 L19.000,18.000 Z";
    var logoSvg = "M130,29 L120,29 L120,5 L130,5 C137.56,5 143,9.548 143,17 C143,24.452 137.524,29 130,29 L130,29 Z M130,10 L126,10 L126,24 L130,24 C134.212,24 137,20.564 137,17 C137,13.292 134.392,10 130,10 L130,10 Z M101,5 L107,5 L107,23 L117,23 L117,29 L101,29 L101,5 L101,5 Z M97.209,24.468 C96.702,26.09 95.991,27.821 94.59,29.705 C92.539,32.462 89.603,32.932 89.603,32.932 C89.603,32.932 92.338,30.461 92,28 L92.357,27.465 C90.384,28.621 88.022,29.275 85.418,29.275 C78.074,29.275 72.566,24.163 72.566,16.855 C72.566,15.697 72.719,14.601 72.981,13.565 C72.965,12.785 73.009,11.051 73.59,9.194 C74.098,7.572 74.809,5.841 76.21,3.957 C78.261,1.2 81.197,0.73 81.197,0.73 C81.197,0.73 78.7,3.5 78.997,5.949 C80.864,4.978 83.042,4.436 85.418,4.436 C92.761,4.436 98.233,9.547 98.233,16.855 C98.233,17.756 98.148,18.623 97.989,19.451 C97.954,20.371 97.811,22.547 97.209,24.468 L97.209,24.468 Z M85.418,9.908 C81.422,9.908 78.866,12.931 78.866,16.855 C78.866,20.743 81.422,23.803 85.418,23.803 C89.377,23.803 91.933,20.743 91.933,16.855 C91.933,12.931 89.377,9.908 85.418,9.908 L85.418,9.908 Z M63,29 L57,29 L57,11 L50,11 L50,5 L70,5 L70,11 L63,11 L63,29 L63,29 Z M31,15 L31,29 L25,29 L25,5 L31,5 L41,18 L41,5 L47,5 L47,29 L41,29 L31,15 L31,15 Z M11,29 C3.26,29 0,24.904 0,19 L0,5 L6,5 L6,19 C6,21.844 7.616,24 11,24 C14.312,24 16,21.844 16,19 L16,5 L22,5 L22,19 C22,24.976 18.668,29 11,29 L11,29 Z";
    var copyRight = "Copyright Untold Interactive 2016";
    var exploreText = "EXPLORE ALL PROJECTS";
    var logo = "M51.250,31.000 C51.250,31.000 51.228,38.329 49.656,43.354 C48.640,46.599 47.219,50.061 44.416,53.829 C40.314,59.342 32.750,62.500 32.750,62.500 C32.750,62.500 39.148,57.548 38.553,52.652 C34.778,54.672 30.350,55.807 25.499,55.807 C10.812,55.807 -0.204,45.584 -0.204,30.968 C-0.204,30.961 -0.203,30.955 -0.203,30.948 L-0.250,31.000 C-0.250,31.000 -0.228,23.671 1.344,18.646 C2.360,15.401 3.781,11.939 6.584,8.171 C10.686,2.658 18.250,-0.500 18.250,-0.500 C18.250,-0.500 11.920,4.403 12.443,9.275 C16.225,7.260 20.655,6.129 25.499,6.129 C40.187,6.129 51.130,16.353 51.130,30.968 C51.130,31.027 51.122,31.082 51.122,31.141 L51.250,31.000 ZM25.499,17.073 C17.507,17.073 12.396,23.121 12.396,30.968 C12.396,38.744 17.507,44.864 25.499,44.864 C33.419,44.864 38.531,38.744 38.531,30.968 C38.531,23.121 33.419,17.073 25.499,17.073 Z";
    var pleaseWait = "M439.606,11.614 L439.606,49.120 L427.219,49.120 L427.219,11.614 L413.752,11.614 L413.752,0.731 L453.000,0.731 L453.000,11.614 L439.606,11.614 ZM395.463,0.731 L407.849,0.731 L407.849,49.120 L395.463,49.120 L395.463,0.731 ZM375.521,42.156 L356.581,42.156 L354.205,49.120 L340.162,49.120 L358.237,0.731 L373.865,0.731 L391.940,49.120 L377.898,49.120 L375.521,42.156 ZM366.087,13.064 L359.966,31.274 L372.136,31.274 L366.087,13.064 ZM317.555,49.120 L310.282,18.796 L303.008,49.120 L289.901,49.120 L276.147,0.731 L290.045,0.731 L297.319,33.015 L305.528,0.731 L315.034,0.731 L323.244,33.015 L330.445,0.731 L344.416,0.731 L330.662,49.120 L317.555,49.120 ZM220.054,0.731 L255.269,0.731 L255.269,11.614 L232.440,11.614 L232.440,19.158 L254.765,19.158 L254.765,30.041 L232.440,30.041 L232.440,38.238 L255.269,38.238 L255.269,49.120 L220.054,49.120 L220.054,0.731 ZM194.277,49.991 C184.555,49.991 177.786,46.871 172.961,42.301 L179.514,32.580 C182.971,36.062 188.300,38.964 194.925,38.964 C199.102,38.964 201.694,37.513 201.694,35.119 C201.694,28.734 174.545,34.031 174.545,15.386 C174.545,7.261 181.314,0.006 193.629,0.006 C201.335,0.006 208.032,2.328 213.145,6.753 L206.375,16.112 C202.343,12.702 197.085,11.033 192.333,11.033 C188.732,11.033 187.148,12.267 187.148,14.370 C187.148,20.319 214.297,15.821 214.297,33.813 C214.297,43.534 207.167,49.991 194.277,49.991 ZM159.139,49.120 L156.762,42.156 L137.823,42.156 L135.446,49.120 L121.403,49.120 L139.479,0.731 L155.106,0.731 L173.182,49.120 L159.139,49.120 ZM147.329,13.064 L141.207,31.274 L153.378,31.274 L147.329,13.064 ZM84.104,0.731 L119.319,0.731 L119.319,11.614 L96.491,11.614 L96.491,19.158 L118.815,19.158 L118.815,30.041 L96.491,30.041 L96.491,38.238 L119.319,38.238 L119.319,49.120 L84.104,49.120 L84.104,0.731 ZM46.085,0.731 L58.471,0.731 L58.471,38.238 L77.771,38.238 L77.771,49.120 L46.085,49.120 L46.085,0.731 ZM24.053,32.870 L12.387,32.870 L12.387,49.120 L0.000,49.120 L0.000,0.731 L24.053,0.731 C34.855,0.731 40.760,8.059 40.760,16.837 C40.760,25.543 34.855,32.870 24.053,32.870 ZM22.181,11.614 L12.387,11.614 L12.387,21.988 L22.181,21.988 C25.493,21.988 28.158,20.102 28.158,16.837 C28.158,13.500 25.493,11.614 22.181,11.614 Z"
    var loadingSvg ="M325.293,4.622 L325.293,4.028 L329.000,4.028 L329.000,6.744 C328.292,7.514 327.224,8.038 325.964,8.038 C323.721,8.038 321.909,6.406 321.909,4.004 C321.909,1.603 323.721,-0.018 325.964,-0.018 C327.283,-0.018 328.244,0.496 328.975,1.311 L328.459,1.673 C327.896,1.020 326.984,0.589 325.964,0.589 C324.081,0.589 322.629,1.976 322.629,4.004 C322.629,6.010 324.081,7.432 325.964,7.432 C327.031,7.432 327.872,6.919 328.315,6.487 L328.315,4.622 L325.293,4.622 ZM302.501,1.207 L302.501,7.887 L301.817,7.887 L301.817,0.111 L302.513,0.111 L307.527,6.697 L307.527,0.111 L308.211,0.111 L308.211,7.887 L307.539,7.887 L302.501,1.207 ZM287.138,0.111 L287.822,0.111 L287.822,7.887 L287.138,7.887 L287.138,0.111 ZM269.385,7.887 L266.830,7.887 L266.830,0.111 L269.385,0.111 C271.868,0.111 273.428,1.871 273.428,4.004 C273.428,6.161 271.868,7.887 269.385,7.887 ZM269.385,0.717 L267.513,0.717 L267.513,7.280 L269.385,7.280 C271.497,7.280 272.708,5.823 272.708,4.004 C272.708,2.186 271.508,0.717 269.385,0.717 ZM252.064,5.975 L247.828,5.975 L247.037,7.887 L246.245,7.887 L249.520,0.111 L250.372,0.111 L253.647,7.887 L252.855,7.887 L252.064,5.975 ZM249.940,0.822 L248.057,5.368 L251.835,5.368 L249.940,0.822 ZM229.942,8.026 C227.591,8.026 226.056,6.278 226.056,4.004 C226.056,1.732 227.591,-0.018 229.942,-0.018 C232.282,-0.018 233.830,1.732 233.830,4.004 C233.830,6.278 232.282,8.026 229.942,8.026 ZM229.942,0.589 C228.000,0.589 226.776,2.023 226.776,4.004 C226.776,5.963 228.000,7.420 229.942,7.420 C231.862,7.420 233.110,5.963 233.110,4.004 C233.110,2.023 231.862,0.589 229.942,0.589 ZM208.748,0.111 L209.432,0.111 L209.432,7.280 L213.307,7.280 L213.307,7.887 L208.748,7.887 L208.748,0.111 ZM177.145,8.026 C175.825,8.026 174.829,7.514 174.217,6.791 L174.661,6.289 C175.176,6.873 176.016,7.420 177.156,7.420 C178.799,7.420 179.267,6.534 179.267,5.869 C179.267,3.585 174.469,4.774 174.469,2.057 C174.469,0.787 175.644,-0.018 177.096,-0.018 C178.296,-0.018 179.183,0.391 179.807,1.079 L179.351,1.569 C178.776,0.892 177.960,0.589 177.061,0.589 C175.993,0.589 175.189,1.183 175.189,2.023 C175.189,4.017 179.987,2.920 179.987,5.823 C179.987,6.825 179.303,8.026 177.145,8.026 ZM159.982,0.111 L160.666,0.111 L160.666,7.887 L159.982,7.887 L159.982,0.111 ZM126.099,0.111 L131.173,0.111 L131.173,0.717 L126.783,0.717 L126.783,3.596 L131.089,3.596 L131.089,4.203 L126.783,4.203 L126.783,7.280 L131.173,7.280 L131.173,7.887 L126.099,7.887 L126.099,0.111 ZM110.062,7.887 L109.366,7.887 L109.366,0.717 L106.751,0.717 L106.751,0.111 L112.678,0.111 L112.678,0.717 L110.062,0.717 L110.062,7.887 ZM92.648,0.111 L93.332,0.111 L93.332,7.887 L92.648,7.887 L92.648,0.111 ZM76.155,8.026 C74.835,8.026 73.840,7.514 73.228,6.791 L73.672,6.289 C74.188,6.873 75.027,7.420 76.167,7.420 C77.810,7.420 78.278,6.534 78.278,5.869 C78.278,3.585 73.480,4.774 73.480,2.057 C73.480,0.787 74.655,-0.018 76.107,-0.018 C77.306,-0.018 78.194,0.391 78.818,1.079 L78.362,1.569 C77.787,0.892 76.970,0.589 76.071,0.589 C75.003,0.589 74.199,1.183 74.199,2.023 C74.199,4.017 78.998,2.920 78.998,5.823 C78.998,6.825 78.314,8.026 76.155,8.026 ZM39.788,0.111 L44.863,0.111 L44.863,0.717 L40.472,0.717 L40.472,3.596 L44.779,3.596 L44.779,4.203 L40.472,4.203 L40.472,7.280 L44.863,7.280 L44.863,7.887 L39.788,7.887 L39.788,0.111 ZM25.106,4.191 L20.032,4.191 L20.032,7.887 L19.348,7.887 L19.348,0.111 L20.032,0.111 L20.032,3.585 L25.106,3.585 L25.106,0.111 L25.802,0.111 L25.802,7.887 L25.106,7.887 L25.106,4.191 ZM3.311,7.887 L2.615,7.887 L2.615,0.717 L0.000,0.717 L0.000,0.111 L5.926,0.111 L5.926,0.717 L3.311,0.717 L3.311,7.887 Z"
    var projectColor = ["#f04f3c","#8eb82f","#288ccc","#d19115","#526d80","#d3392d"];
    var projectThumbsImages = ["images/background.jpg","images/thumbs/001_Monster Energy.jpg","images/thumbs/002_Docola.jpg","images/thumbs/003_Java Monster Geaar.jpg","images/thumbs/004_AWT Dealers.jpg","images/thumbs/005_Burn Residency.jpg"];
    var projectThumbsTitles = ["MONSTER ENERGY","DOCOLA","JAVA MONSTER GEAR","AWT DEALERS","BURN RESIDENCY"];
    var projectThumbs;
    var closeContact;
    
    var containerBackground;
    var menuIcon;
    var pleaseWaitShape;
    var loadingShape;
    var logoIcon;
    var menuIconBlack;
    var menuHit;
    var contactIcon;
    var menuTxt;
    var copyRightTxt;
    var twitterTxt;
    var facebookTxt;
    var instagramTxt;
    var circle;
    var circleWhite;
    var rectangle;
    var rectangle_;
    var rectangle__;
    var allProjects;
    var soundIcon;
    var aspectRatio;
    var exploreTxt;
    var scrollBar

    var margin = 50;
    var marginTxt = 10;
    var allProjectIcondistance = 368
    var rectangle___width;
    var allProjectsIcon;
    var totalSizeWidth

    var containerCircle;
    var mainNavigation;

    var circleReposX;
    var circleRepos;
    var contactState;
    var menuState;
    var contactHit;
    var projectsHit;
    var projectState;
    var loader;
    var maskHome;
    var projects;
    var sound;
    var viewProjects = false;
    var contact
    var timer

    var p = createjs.extend(Main, createjs.Container);

    p.setup = function() {

        aspectRatio = new AspectRatio();

        console.log("Main")
        ratio = this.ratio;
        instance = this;
        rectangle___width = 200*ratio;

        circleReposX = 300;
        circleReposY = 750;
        contactState = "close"
        menuState = "close";
        projectState = "close";

        sound = new Sound();

        logoIcon = new createSvg(logo);
        if(ratio>1){
            logoIcon.regX = 11*ratio
            logoIcon.regY = 11*ratio
        }else{
            logoIcon.regX = 22*ratio
            logoIcon.regY = 22*ratio
            
        }
        
        logoIcon.x = stage.canvas.width/2
        logoIcon.y = stage.canvas.height/2
        instance.addChild(logoIcon);

        pleaseWaitShape = new createSvg(pleaseWait);
        pleaseWaitShape.x = stage.canvas.width/2-225*ratio
        pleaseWaitShape.y = stage.canvas.height-50*ratio-60*ratio
        instance.addChild(pleaseWaitShape);

        loadingShape = new createSvg(loadingSvg);
        loadingShape.x = stage.canvas.width/2-165*ratio
        loadingShape.y = stage.canvas.height
        loadingShape.alpha = 0;
        createjs.Tween.get(loadingShape)
        .to({alpha:1,y:stage.canvas.height-50*ratio-60*ratio+25*ratio}, 800, createjs.Ease.circInOut)
        instance.addChild(loadingShape);

        reanime()

        loadProjectThumbs(projectThumbsImages)
        instance.addEventListener("loaderComplete", loadProjectThumbsComplete);

    } ;

     function reanime(){

        logoIcon.alpha = 0;
        logoIcon.scaleX = 8;
        logoIcon.scaleY = 8;
        logoIcon.rotation = 0;
        createjs.Tween.get(logoIcon)
        .to({alpha:1,scaleX:2,scaleY:2,rotation:360}, 800, createjs.Ease.circInOut)
        .call(function(){
            createjs.Tween.get(logoIcon)
            .to({scaleX:1,scaleY:1}, 400, createjs.Ease.circInOut)
        });

        pleaseWaitShape.alpha = 0;
        createjs.Tween.get(pleaseWaitShape)
        .wait(800)
        .to({alpha:0.1}, 400, createjs.Ease.circInOut)

        timer = setTimeout(reanime, 1600);

    }

     function loadProjectThumbs(Ifiles){
        loader = new Loader(Ifiles,false);
        loader.register(instance);
    }

    function loadProjectThumbsComplete(evt) {

        clearTimeout(timer)

        projectThumbs = evt.contentLoader;
        lengthThumbs = projectThumbs.length;

        loader.kill();
        loader = null;
        instance.removeEventListener("loaderComplete", loadProjectThumbsComplete);
        
        console.log("Load Project Images Complete",lengthThumbs)

        createjs.Tween.get(logoIcon)
        .to({alpha:0}, 800, createjs.Ease.circInOut)
        .call(function(){
            instance.removeChild(logoIcon);
            logoIcon = null
            init()
        });

        createjs.Tween.get(pleaseWaitShape)
        .to({alpha:0}, 600, createjs.Ease.circInOut)
        .call(function(){
            instance.removeChild(pleaseWaitShape);
            pleaseWaitShape = null
        });

        createjs.Tween.get(loadingShape)
        .to({alpha:0,y:stage.canvas.height}, 600, createjs.Ease.circInOut)
        .call(function(){
            instance.removeChild(loadingShape);
            loadingShape = null
        });
        
        clearTimeout(timer);
    }

    function init(){

        containerBackground = new createjs.Container();
        containerBackground.alpha=0;
        containerBackground.addChild(projectThumbs[0]);
        instance.addChild(containerBackground);
        aspectRatio.resize(containerBackground,1600,1000);

        home = new Home(instance,ratio,aspectRatio,projectColor);
        instance.addEventListener("changeColor", changeColorHandler);
        instance.addEventListener("goToProject", gotoProjectHandler);
        instance.addEventListener("goToHome", gotoHomeHandler);
        instance.addEventListener("expandContact", expandContactHandler);
        instance.addChild(home);

        maskHome = new createjs.Shape();
        maskHome.graphics.drawRect(0, 0, stage.canvas.width,stage.canvas.height);
        home.mask = maskHome;

        projects = new Projects(ratio,projectThumbs,projectThumbsTitles,aspectRatio);
        instance.addChild(projects);

        rectangle__ = new createjs.Shape();
        rectangle__.regX = rectangle___width;
        rectangle__.graphics.beginFill("#FFFFFF").drawRect(0, 0, rectangle___width,1*ratio);
        rectangle__.x = stage.canvas.width;
        rectangle__.y = stage.canvas.height-160*ratio;
        rectangle__.alpha = 0;
        createjs.Tween.get(rectangle__)
        .wait(500)
        .to({alpha:1}, 800, createjs.Ease.linear)
        instance.addChild(rectangle__);

        allProjects = new createjs.Text();
        allProjects.font = "Bold 10px Montserrat";
        allProjects.color = "#FFFFFF";
        allProjects.text = exploreText;
        allProjects.scaleX = ratio;
        allProjects.scaleY = ratio;
        allProjects.textBaseline = "alphabetic";
        allProjects.alpha = 0;
        allProjects.regX = allProjects.getBounds().width;
        allProjects.x = stage.canvas.width-rectangle___width-marginTxt*ratio
        allProjects.y = rectangle__.y+3*ratio
        createjs.Tween.get(allProjects)
        .wait(500)
        .to({alpha:1}, 800, createjs.Ease.linear)
        instance.addChild(allProjects);

        allProjectsIcon = new createSvg(allProjectsSvg);
        allProjectsIcon.x = stage.canvas.width-allProjectIcondistance*ratio-marginTxt*ratio;
        allProjectsIcon.y = rectangle__.y-26*ratio
        allProjectsIcon.alpha = 0;
        createjs.Tween.get(allProjectsIcon)
        .wait(500)
        .to({alpha:1}, 800, createjs.Ease.linear)
        instance.addChild(allProjectsIcon);

        projectsHit = new createjs.Shape();
        projectsHit.alpha = 0.01;
        projectsHit.graphics.beginFill("#000000").drawRect(0, 0, 175*ratio,50*ratio);
        projectsHit.x = allProjectsIcon.x;
        projectsHit.y = allProjectsIcon.y;
        projectsHit.cursor = "pointer";
        projectsHit.state = "close";
        projectsHit.addEventListener("mouseover", handlerOverNavigation);
        projectsHit.addEventListener("mouseout", handlerOutNavigation);
        projectsHit.addEventListener("click", projectClickNavigation); 
        instance.addChild(projectsHit);

        containerCircle = new createjs.Container();
        instance.addChild(containerCircle);
        createCircle(projectColor[0]);

        contactIcon = new createSvg(contactSvg,"#141414");
        contactIcon.regX = 43;
        contactIcon.regY = 35;
        contactIcon.x = Math.abs(stage.canvas.width-25*ratio);
        contactIcon.y = Math.abs(stage.canvas.height-30*ratio);
        instance.addChild(contactIcon);

        contact = new Contact(ratio,aspectRatio,instance);
        instance.addChild(contact);

        closeContact = new createSvg(closeSvg,"#000000");
        closeContact.x = Math.abs(stage.canvas.width-48*ratio);
        closeContact.y = Math.abs(stage.canvas.height-48*ratio);
        closeContact.alpha = 0;
        instance.addChild(closeContact);

        contactHit = new createjs.Shape();
        contactHit.alpha = 0.01;
        contactHit.regX = 100*ratio;
        contactHit.regY = 100*ratio;
        contactHit.graphics.beginFill("#000000").drawRect(0, 0, 100*ratio,100*ratio);
        contactHit.x = stage.canvas.width;
        contactHit.y = stage.canvas.height;
        contactHit.cursor = "pointer";
        contactHit.state = "close";
        contactHit.addEventListener("mouseover", handlerOverNavigation);
        contactHit.addEventListener("mouseout", handlerOutNavigation);
        contactHit.addEventListener("click", contactClickNavigation); 
        instance.addChild(contactHit);

        menuHit = new createjs.Shape();
        menuHit.alpha = 0.01;
        menuHit.regX = 100*ratio;
        menuHit.graphics.beginFill("#FFFFFF").drawRect(0, 0, 100*ratio,50*ratio);
        menuHit.x = stage.canvas.width-margin*ratio+100/2;
        menuHit.y = margin*ratio-50/3;
        menuHit.cursor = "pointer";
        menuHit.state = "close";
        menuHit.addEventListener("mouseover", handlerOverNavigation);
        menuHit.addEventListener("mouseout", handlerOutNavigation);
        menuHit.addEventListener("click", menuClickNavigation); 
        instance.addChild(menuHit);

        menu = new Menu(instance,ratio,projectColor);
        instance.addChild(menu);

        menuIcon = new createSvg(menuSvg);
        menuIcon.regX = 36;
        menuIcon.x = Math.abs(stage.canvas.width-margin*ratio);
        menuIcon.y = Math.abs(41*ratio);
        menuIcon.alpha = 0;
        createjs.Tween.get(menuIcon)
        .wait(500)
        .to({alpha:1}, 800, createjs.Ease.linear)
        instance.addChild(menuIcon);

        menuIconBlack = new createSvg(closeSvg,"#000000");
        menuIconBlack.regX = 19;
        menuIconBlack.x = Math.abs(stage.canvas.width-margin*ratio);
        menuIconBlack.y = Math.abs(57*ratio);
        menuIconBlack.visible = 0;
        instance.addChild(menuIconBlack);

        menuTxt = new createSvg(menuTxtSvg);
        menuTxt.regX = 34;
        menuTxt.x = Math.abs(stage.canvas.width-82*ratio);
        menuTxt.y = Math.abs(42*ratio);
        menuTxt.alpha = 0;
        createjs.Tween.get(menuTxt)
        .wait(500)
        .to({alpha:1}, 800, createjs.Ease.linear)
        instance.addChild(menuTxt)

        copyRightTxt = new createjs.Text();
        copyRightTxt.font = "10px Montserrat";
        copyRightTxt.color = "#FFFFFF";
        copyRightTxt.text = copyRight;
        copyRightTxt.scaleX = ratio;
        copyRightTxt.scaleY = ratio;
        copyRightTxt.textBaseline = "alphabetic";
        copyRightTxt.x = Math.abs(margin*ratio);
        copyRightTxt.y = Math.abs(stage.canvas.height-margin*ratio);
        copyRightTxt.alpha = 0;
        createjs.Tween.get(copyRightTxt)
        .wait(500)
        .to({alpha:0.5}, 800, createjs.Ease.linear)
        instance.addChild(copyRightTxt);

        rectangle = new createjs.Shape();
        rectangle.graphics.beginFill("#FFFFFF").drawRect(0, 0, 1*ratio,16*ratio);
        rectangle.x = Math.abs(copyRightTxt.x+(copyRightTxt.getBounds().width*ratio+(marginTxt*ratio)))
        rectangle.y = Math.abs(copyRightTxt.y-11*ratio)
        rectangle.alpha = 0;
        createjs.Tween.get(rectangle)
        .wait(500)
        .to({alpha:0.5}, 800, createjs.Ease.linear)
        instance.addChild(rectangle);

        twitterTxt = new createjs.Text();
        twitterTxt.font = "10px Montserrat";
        twitterTxt.color = "#FFFFFF";
        twitterTxt.text = "Twitter";
        twitterTxt.scaleX = ratio;
        twitterTxt.scaleY = ratio;
        twitterTxt.textBaseline = "alphabetic";
        twitterTxt.alpha = 0;
        twitterTxt.x = Math.abs(rectangle.x+1*ratio+marginTxt*ratio);
        twitterTxt.y = Math.abs(copyRightTxt.y)
        createjs.Tween.get(twitterTxt)
        .wait(500)
        .to({alpha:0.5}, 800, createjs.Ease.linear)
        instance.addChild(twitterTxt);

        facebookTxt = new createjs.Text();
        facebookTxt.font = "10px Montserrat";
        facebookTxt.color = "#FFFFFF";
        facebookTxt.text = "Facebook";
        facebookTxt.scaleX = ratio;
        facebookTxt.scaleY = ratio;
        facebookTxt.textBaseline = "alphabetic";
        facebookTxt.x = Math.abs(twitterTxt.x+(twitterTxt.getBounds().width*ratio+(marginTxt*ratio)))
        facebookTxt.y = Math.abs(copyRightTxt.y);
        facebookTxt.alpha = 0;
        createjs.Tween.get(facebookTxt)
        .wait(500)
        .to({alpha:0.5}, 800, createjs.Ease.linear)
        instance.addChild(facebookTxt);

        instagramTxt = new createjs.Text();
        instagramTxt.font = "10px Montserrat";
        instagramTxt.color = "#FFFFFF";
        instagramTxt.text = "Instagram";
        instagramTxt.scaleX = ratio;
        instagramTxt.scaleY = ratio;
        instagramTxt.textBaseline = "alphabetic";
        instagramTxt.x = Math.abs(facebookTxt.x+(facebookTxt.getBounds().width*ratio+(marginTxt*ratio)))
        instagramTxt.y = Math.abs(copyRightTxt.y)
        instagramTxt.alpha = 0;
        createjs.Tween.get(instagramTxt)
        .wait(500)
        .to({alpha:0.5}, 800, createjs.Ease.linear)
        instance.addChild(instagramTxt);

        rectangle_ = new createjs.Shape();
        rectangle_.graphics.beginFill("#FFFFFF").drawRect(0, 0, 1*ratio,16*ratio);
        rectangle_.x = Math.abs(instagramTxt.x+(instagramTxt.getBounds().width*ratio+(marginTxt*ratio)))
        rectangle_.y = Math.abs(copyRightTxt.y-11*ratio)
        rectangle_.alpha = 0;
        createjs.Tween.get(rectangle_)
        .wait(500)
        .to({alpha:0.5}, 800, createjs.Ease.linear)
        instance.addChild(rectangle_);

        soundIcon = new createSvg(soundSvg);
        soundIcon.alpha = 0;
        soundIcon.x = Math.abs(rectangle_.x+(marginTxt*ratio)-17*ratio)
        soundIcon.y = Math.abs(copyRightTxt.y-11*ratio)-17*ratio
        createjs.Tween.get(soundIcon)
        .wait(500)
        .to({alpha:1}, 800, createjs.Ease.linear)
        instance.addChild(soundIcon);

         var logo = new createSvg(logoSvg);
        logo.x = margin*ratio;
        logo.y = margin*ratio;
        logo.alpha = 0;
        createjs.Tween.get(logo)
        .wait(500)
        .to({alpha:1}, 800, createjs.Ease.linear)
        instance.addChild(logo);
    }

    function createCircle(iColor){
       
       if(circle!=null) {
        circle.graphics.clear();
        containerCircle.removeChild(circle);
        }

       circle = new createjs.Shape();
       circle.x = stage.canvas.width
       circle.y = stage.canvas.height
       circle.graphics.beginFill(iColor).drawCircle(0, 0, 100*ratio);
       containerCircle.addChild(circle);

       circleWhite = new createjs.Shape();
       //circleWhite.alpha=0;
       circleWhite.x = stage.canvas.width+100*ratio
       circleWhite.y = stage.canvas.height+100*ratio

       circleWhite.graphics.beginFill("#FFFFFF").drawCircle(0, 0, 100*ratio);
       containerCircle.addChild(circleWhite);

    }

    function handlerOverNavigation(event){

    }

    function handlerOutNavigation(event){

    }

    function contactClickNavigation(event){
        checkContact(event)
    }
    
    function menuClickNavigation(event){

        if(contactState=="open")checkContact(null)

        contactHit.cursor = "cursor";
        contactHit.removeEventListener("click", contactClickNavigation); 

        if(event.target!=null) event.target.removeEventListener("click", menuClickNavigation); 

        if(event.target.state=="close"){
                
               sound.menuIn();
               menu.createMenu();
               home.clearMask();
               menuTxt.visible = 0;
               menuIconBlack.visible = 1;
               menuIcon.visible = 0;

                createjs.Tween.get(event.target)
               .to({x:event.target.x}, 0, createjs.Ease.circInOut)
               .wait(500)
               .call(function(){
                    event.target.state = "open";
                    menuState = event.target.state;
                    event.target.addEventListener("click", menuClickNavigation);
                });

        }else{

               sound.menuOut();
               menu.killMenu();
               home.reAnimMask();

                 createjs.Tween.get(event.target)
               .to({x:event.target.x}, 0, createjs.Ease.circInOut)
               .wait(400)
               .call(function(){
                    event.target.state = "close"; 
                    menuState = event.target.state;
                    menuTxt.visible = 1;
                    menuIcon.visible = 1;
                    menuIconBlack.visible = 0;
                    event.target.addEventListener("click", menuClickNavigation); 
                    contactHit.cursor = "pointer";
                    contactHit.addEventListener("click", contactClickNavigation);
                });
            }
    }

    function checkContact(iStateEvent){

        if(iStateEvent==null){

            contact.killContact();

            createjs.Tween.get(contactIcon)
            .wait(900)
            .to({alpha:1}, 200, createjs.Ease.Linear)

            createjs.Tween.get(closeContact)
            .wait(900)
            .to({alpha:0}, 200, createjs.Ease.Linear)
            
            createjs.Tween.get(circleWhite)
            .wait(750)
            .to({x:stage.canvas.width+100*ratio,y:stage.canvas.height+100*ratio}, 200, createjs.Ease.circIn)

            createjs.Tween.get(circle)
                   .to({scaleX:1,scaleY:1,x:stage.canvas.width,y:stage.canvas.height}, 800, createjs.Ease.circInOut)
                   .call(function(){
                        contactHit.state = "close";
                        contactState = contactHit.state;
                    });

        }else{

            if(iStateEvent.target!=null)iStateEvent.target.removeEventListener("click", contactClickNavigation); 

            if(iStateEvent.target.state=="close"){
                
                home.clearMask();
                
                 createjs.Tween.get(contactIcon)
                .to({alpha:0}, 200, createjs.Ease.Linear)

                 createjs.Tween.get(closeContact)
                .wait(200)
                .to({alpha:1}, 200, createjs.Ease.Linear)

                 createjs.Tween.get(circleWhite)
                .to({x:stage.canvas.width,y:stage.canvas.height}, 200, createjs.Ease.circInOut)
                
                sound.contactIn();

                var scaleCircle;

                if(ratio>1) scaleCircle = 12
                else scaleCircle = 10;
            
                createjs.Tween.get(circle)
                .wait(150)
                .to({scaleX:12,scaleY:12,x:stage.canvas.width-circleReposX*ratio,y:stage.canvas.height-circleReposY*ratio}, 800, createjs.Ease.circInOut)
                .call(function(){  
                    contact.createContact();                  
                    iStateEvent.target.state = "open";
                    contactState = iStateEvent.target.state;
                    iStateEvent.target.addEventListener("click", contactClickNavigation); 
                            });

            }else{

                home.reAnimMask();
                contact.killContact();
                sound.contactOut();

                  createjs.Tween.get(contactIcon)
                .wait(900)
                .to({alpha:1}, 200, createjs.Ease.Linear)

                 createjs.Tween.get(closeContact)
                .wait(800)
                .to({alpha:0}, 200, createjs.Ease.Linear)

                 createjs.Tween.get(circleWhite)
                 .wait(750)
                .to({x:stage.canvas.width+100*ratio,y:stage.canvas.height+100*ratio}, 200, createjs.Ease.circIn)

                createjs.Tween.get(circle)
                .to({scaleX:1,scaleY:1,x:stage.canvas.width,y:stage.canvas.height}, 800, createjs.Ease.circInOut)
                .call(function(){
                     iStateEvent.target.state = "close";
                     contactState = iStateEvent.target.state;
                    iStateEvent.target.addEventListener("click", contactClickNavigation); 
                });
            }
        }
    }

    function expandContactHandler(event){
        createjs.Tween.get(circle)
        .to({scaleX:20,scaleY:20,x:stage.canvas.width-circleReposX*ratio,y:stage.canvas.height-circleReposY*ratio}, 800, createjs.Ease.circInOut)
    }


    function gotoHomeHandler(event,Inull){

            if(Inull==undefined){
            Inull =false

               sound.menuOut();
               menu.killMenu();
               home.reAnimMask();

               createjs.Tween.get(menuHit)
               .to({x:menuHit.x}, 0, createjs.Ease.circInOut)
               .wait(400)
               .call(function(){
                    menuHit.state = "close"; 
                    menuState = "close";
                    menuTxt.visible = 1;
                    menuIcon.visible = 1;
                    menuIconBlack.visible = 0;
                    menuHit.addEventListener("click", menuClickNavigation); 
                    contactHit.cursor = "pointer";
                    contactHit.addEventListener("click", contactClickNavigation);
                });

            }

            viewProjects = false;

            menu.updateNav("0")

            createjs.Tween.get(rectangle__)
            .to({scaleX:1}, 400, createjs.Ease.circInOut)

            projectsHit.graphics.clear();
            projectsHit.graphics.beginFill("#000000").drawRect(0, 0, 175*ratio,50*ratio);
            projectsHit.x = allProjectsIcon.x;

            createjs.Tween.get(allProjectsIcon)
            .to({alpha:1}, 400, createjs.Ease.linear)
            .call(function(){
                 allProjects.text = exploreText;
            });

            createjs.Tween.get(allProjects)
            .to({x:stage.canvas.width-rectangle___width-marginTxt*ratio}, 500, createjs.Ease.circInOut)

            scrollBar.updatePos(stage.canvas.width/2);

            createjs.Tween.get(instance)
            .to({alpha:1}, 600, createjs.Ease.Linear)
            .call(function(){
                
                projects.killProjects();
                scrollBar.kill();
                instance.removeChild(scrollBar)
                scrollBar=null
                home.visible = true;
                home.playVideo();

             createjs.Tween.get(maskHome)
            .to({scaleX:1,scaleY:1}, 800, createjs.Ease.circInOut)
            .call(function(){
                maskHome.regX = 0
                maskHome.regY = 0
                home.regX = 0
                home.regY = 0
                maskHome.x = 0
                maskHome.y = 0
                home.x = 0
                home.y = 0
                event.state = "close"; 
                projectState = event.state;
                if(Inull)event.addEventListener("click", projectClickNavigation);
                    
            });

            createjs.Tween.get(home)
            .to({scaleX:1,scaleY:1}, 400, createjs.Ease.circInOut)
            
             createjs.Tween.get(containerBackground)
            .to({alpha:0}, 500, createjs.Ease.Linear);
            });
    }

    function gotoProjectHandler(event,Inull){

            if(Inull==undefined){

               Inull =false

               //close Menu
               sound.menuOut();
               menu.killMenu();
               home.reAnimMask();

                 createjs.Tween.get(menuHit)
               .to({x:menuHit.x}, 0, createjs.Ease.circInOut)
               .wait(400)
               .call(function(){
                    menuHit.state = "close"; 
                    menuState = "close";
                    menuTxt.visible = 1;
                    menuIcon.visible = 1;
                    menuIconBlack.visible = 0;
                    menuHit.addEventListener("click", menuClickNavigation); 
                    contactHit.cursor = "pointer";
                    contactHit.addEventListener("click", contactClickNavigation);
                });
               //
            }

            menu.updateNav("1")

            viewProjects = true;

            createjs.Tween.get(rectangle__)
            .to({scaleX:0.5}, 400, createjs.Ease.circInOut)

            projectsHit.graphics.clear();
            projectsHit.graphics.beginFill("#000000").drawRect(0, 0, 100*ratio,50*ratio);
            projectsHit.x = stage.canvas.width-200*ratio

             createjs.Tween.get(allProjectsIcon)
            .to({alpha:0}, 200, createjs.Ease.linear)

            createjs.Tween.get(allProjects)
            .to({x:stage.canvas.width-marginTxt*ratio-10*ratio}, 400, createjs.Ease.circInOut)

            allProjects.text = "CLOSE";
            
            home.pauseVideo();

            maskHome.regX = stage.canvas.width/2
            maskHome.regY = stage.canvas.height/2

            home.regX = stage.canvas.width/2
            home.regY = stage.canvas.height/2

            maskHome.x = stage.canvas.width/2
            maskHome.y = stage.canvas.height/2

            home.x = stage.canvas.width/2
            home.y = stage.canvas.height/2

            createjs.Tween.get(maskHome)
            .to({scaleX:0.3,scaleY:0.3}, 400, createjs.Ease.circInOut)

            createjs.Tween.get(home)
            .to({scaleX:0.3,scaleY:0.3}, 800, createjs.Ease.circInOut)
            .call(function(){
                    home.visible=false;
                    event.state = "open"; 
                    projectState = event.state;
                    if(Inull)event.addEventListener("click", projectClickNavigation);
            });

            createjs.Tween.get(containerBackground)
            .to({alpha:1}, 600, createjs.Ease.Linear);

            createjs.Tween.get(instance)
            .wait(300)
            .to({alpha:1}, 0, createjs.Ease.Linear)
            .call(function(){
                    projects.createProjects();
                    projects.y = stage.canvas.height/2
                    totalSizeWidth = projects.getProjectTotalWidth();
                    scrollBar = new ScrollBar(stage.canvas.width/2,instance,projects,totalSizeWidth);
                    instance.addChild(scrollBar)
            });
    }

    function projectClickNavigation(event){

        if(event.target!=null) event.target.removeEventListener("click", projectClickNavigation); 

        if(projectState=="close"){

            gotoProjectHandler(event.target,true);

        }else{

            gotoHomeHandler(event.target,true)
        } 
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

    function changeColorHandler(event){
       createCircle(projectColor[event.nav]);
    }

    p.resize = function() {
        
        if(menuIcon){
            menuIcon.x = Math.abs(stage.canvas.width-50*ratio);
            menuIcon.y = Math.abs(41*ratio);
        }
        
        if(menuIconBlack){
            menuIconBlack.x = Math.abs(stage.canvas.width-margin*ratio);
            menuIconBlack.y = Math.abs(57*ratio); 
        }
       
        if(menuTxt){
            menuTxt.x = Math.abs(menuIcon.x-33*ratio)
            menuTxt.y = Math.abs(42*ratio);
        }

        if(contactIcon){
            contactIcon.x = Math.abs(stage.canvas.width-margin/2*ratio);
            contactIcon.y = Math.abs(stage.canvas.height-margin/2*ratio);    
        }
        
        if(copyRightTxt){
            copyRightTxt.x = Math.abs(margin*ratio);
            copyRightTxt.y = Math.abs(stage.canvas.height-margin*ratio);
        }

        if(rectangle){
            rectangle.x = Math.abs(copyRightTxt.x+(copyRightTxt.getBounds().width*ratio+(marginTxt*ratio)))
            rectangle.y = Math.abs(copyRightTxt.y-11*ratio)
        }

        if(twitterTxt){
            twitterTxt.x = rectangle.x+1*ratio+marginTxt*ratio;
            twitterTxt.y = Math.abs(copyRightTxt.y)
        }

        if(facebookTxt){
            facebookTxt.x = Math.abs(twitterTxt.x+(twitterTxt.getBounds().width*ratio+(marginTxt*ratio)))
            facebookTxt.y = Math.abs(copyRightTxt.y)
        }

        if(instagramTxt){
             instagramTxt.x = Math.abs(facebookTxt.x+(facebookTxt.getBounds().width*ratio+(marginTxt*ratio)))
            instagramTxt.y = Math.abs(copyRightTxt.y)
        }
       
        if(rectangle_){
            rectangle_.x = Math.abs(instagramTxt.x+(instagramTxt.getBounds().width*ratio+(marginTxt*ratio)))
            rectangle_.y = Math.abs(copyRightTxt.y-11*ratio)
        }
        
        if(soundIcon){
            soundIcon.x = Math.abs(rectangle_.x+(marginTxt*ratio)-17*ratio)
            soundIcon.y = Math.abs(copyRightTxt.y-11*ratio)-17*ratio
        }

        if(rectangle__){
            rectangle__.x = stage.canvas.width;
            rectangle__.y = stage.canvas.height-160*ratio;
        }
        
        if(viewProjects){

             if(allProjects){

                allProjects.x = stage.canvas.width-marginTxt*ratio-10*ratio
                allProjects.y = rectangle__.y+3*ratio
            }

            if(projectsHit){
                 projectsHit.x = stage.canvas.width-200*ratio
                projectsHit.y = allProjectsIcon.y;
            }
           

        }else{

            if(allProjects){
                allProjects.x = stage.canvas.width-rectangle___width-marginTxt*ratio
                allProjects.y = rectangle__.y+3*ratio
            }
            
            if(projectsHit){
                projectsHit.x = allProjectsIcon.x;
                projectsHit.y = allProjectsIcon.y;
            }
            
        }

        if(allProjectsIcon){
            allProjectsIcon.x = stage.canvas.width-allProjectIcondistance*ratio-marginTxt*ratio;
            allProjectsIcon.y = rectangle__.y-26*ratio
        }
        

        if(menuHit)menuHit.x = stage.canvas.width-margin*ratio+100/2;

        if(contactHit){
            contactHit.x = stage.canvas.width;
            contactHit.y = stage.canvas.height;
        }
        
        if(closeContact){
            closeContact.x = Math.abs(stage.canvas.width-48*ratio);
            closeContact.y = Math.abs(stage.canvas.height-48*ratio);
        }

        if(contactState=="close"){
            if(circle){
                circle.x = stage.canvas.width
                circle.y = stage.canvas.height
            }
            if(circleWhite){
                circleWhite.x = stage.canvas.width+100*ratio
                circleWhite.y = stage.canvas.height+100*ratio
            }
            
        }else{
            if(circle){
                circle.x = stage.canvas.width-circleReposX*ratio;
                circle.y = stage.canvas.height-circleReposY*ratio;
            }
             if(circleWhite){
                circleWhite.x = stage.canvas.width
                circleWhite.y = stage.canvas.height
            }

            if(contact){
                contact.resize();
            }
        }

        if(containerBackground) aspectRatio.resize(containerBackground,1600,1000);

        if(maskHome){
             maskHome.graphics.clear();
            maskHome.graphics.drawRect(0, 0, stage.canvas.width,stage.canvas.height);
        }
       

        if(projects){
             projects.x = stage.canvas.width/2
            projects.y = stage.canvas.height/2
        }
       
        if(home)home.resize();
        if(menu)menu.resize();
        
        if(logoIcon) {
            logoIcon.x = stage.canvas.width/2-25*ratio
            logoIcon.y = stage.canvas.height/2-25*ratio
        }

        if(pleaseWaitShape) {
            pleaseWaitShape.x = stage.canvas.width/2-225*ratio
            pleaseWaitShape.y = stage.canvas.height-50*ratio-60*ratio
        }

        if(loadingShape){
           loadingShape.x = stage.canvas.width/2-165*ratio
            loadingShape.y = pleaseWaitShape.y+25*ratio 
        }
        
    } ;  

window.Main = createjs.promote(Main, "Container");
}());