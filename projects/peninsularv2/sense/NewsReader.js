(function () {

    function NewsReader(IinstanceDispatch,Iratio,IAspectRatio,Ititle,Idate,IgalleryN) {

        this.Container_constructor();
        this.ratio = Iratio;
        this.instanceDispatch = IinstanceDispatch;
        this.aspectRatio = IAspectRatio;
        this.title = Ititle;
        this.date = Idate;
        this.gallery = IgalleryN;
        this.setup();

    }
    
    var ratio;
    var instance;
    var instanceDispatch;
    var aspectRatio;
    var titleN;
    var dateN;
    var imageN;
    var contentN;
    var bg;
    var logo;
    var containerImage
    var titleField;
    var dateField;
    var line;
    var arrowShapeLeft = "M11.025,18.599 L9.665,20.001 L1.324,11.402 L-0.036,10.000 L1.324,8.598 L9.665,-0.001 L11.025,1.401 L2.684,10.000 L11.025,18.599 Z";
    var arrowShapeRight = "M-0.025,18.599 L1.335,20.001 L9.676,11.402 L11.036,10.000 L9.676,8.598 L1.335,-0.001 L-0.025,1.401 L8.316,10.000 L-0.025,18.599 Z";
    var closeSvg = "M40.000,38.598 L38.598,40.000 L20.000,21.402 L1.402,40.000 L0.000,38.598 L18.598,20.000 L0.000,1.402 L1.402,0.000 L20.000,18.598 L38.598,0.000 L40.000,1.402 L21.402,20.000 L40.000,38.598 Z"
    var logoSvg = "M171.247,66.946 C170.764,66.946 170.360,67.053 170.038,67.265 C169.701,67.485 169.528,67.814 169.519,68.251 C169.519,68.513 169.635,68.750 169.867,68.962 C170.100,69.178 170.472,69.328 170.984,69.411 C171.269,69.453 171.658,69.501 172.151,69.555 C173.123,69.671 173.842,69.977 174.306,70.472 C174.766,70.959 174.996,71.525 174.996,72.170 C174.944,73.909 173.730,74.791 171.354,74.816 C169.817,74.816 168.497,74.400 167.391,73.568 L168.423,72.532 C169.248,73.127 170.230,73.428 171.368,73.436 C172.715,73.420 173.398,72.998 173.417,72.170 C173.427,71.491 172.976,71.084 172.065,70.947 C171.648,70.897 171.190,70.840 170.692,70.778 C169.801,70.649 169.123,70.360 168.658,69.911 C168.179,69.449 167.939,68.887 167.939,68.226 C167.939,67.431 168.240,66.790 168.843,66.304 C169.426,65.821 170.254,65.576 171.326,65.567 C172.616,65.592 173.737,65.906 174.691,66.510 L173.816,67.645 C173.038,67.196 172.182,66.963 171.247,66.946 ZM169.653,62.000 L169.306,62.000 L169.306,61.653 L169.306,61.185 L169.306,60.838 L169.653,60.838 C169.608,60.866 169.543,60.655 169.313,60.339 L167.230,57.268 L167.326,57.421 L164.186,57.421 L164.199,60.795 C164.253,60.823 164.308,60.838 164.353,60.838 L164.700,60.838 L164.700,61.185 L164.700,61.653 L164.700,62.000 L164.353,62.000 L160.846,62.000 L160.499,62.000 L160.499,61.653 L160.499,61.185 L160.499,60.838 L160.846,60.838 C160.984,60.838 160.974,60.847 160.974,60.795 L160.974,51.063 C160.974,51.011 160.984,51.020 160.846,51.020 L160.499,51.020 L160.499,50.673 L160.499,50.204 L160.499,49.857 L160.846,49.857 L168.124,49.857 C169.745,49.857 171.025,50.125 171.964,50.672 C172.957,51.250 173.455,52.238 173.455,53.587 C173.455,54.106 173.356,54.573 173.157,54.987 C172.962,55.390 172.703,55.742 172.381,56.040 C172.065,56.333 171.714,56.570 171.330,56.750 C170.957,56.925 171.056,56.924 170.663,57.017 L172.965,60.329 C173.079,60.482 173.197,60.593 173.320,60.663 C173.460,60.743 173.613,60.805 173.778,60.850 L174.035,60.919 L174.035,61.185 L174.035,61.653 L174.035,62.000 L173.688,62.000 L169.653,62.000 ZM170.021,52.526 C169.608,52.274 168.953,52.148 168.057,52.148 L163.891,52.148 L163.891,55.167 L168.057,55.167 C169.780,55.167 170.641,54.629 170.641,53.553 C170.641,53.120 170.434,52.777 170.021,52.526 ZM152.841,65.567 L159.948,65.567 L159.948,67.158 L154.528,67.158 L154.528,69.401 L159.154,69.401 L159.154,70.893 L154.528,70.893 L154.528,73.226 L159.948,73.226 L159.948,74.817 L152.841,74.817 L152.841,65.567 ZM152.287,61.782 L151.938,61.782 L151.938,61.435 L151.938,61.045 L151.938,60.698 L152.287,60.698 C152.301,60.698 152.328,60.685 152.351,60.676 C152.351,60.678 152.352,60.679 152.352,60.681 C152.352,60.701 152.364,60.677 152.390,60.663 C152.373,60.672 152.365,60.671 152.351,60.676 C152.350,60.617 152.342,60.565 152.324,60.522 C152.289,60.432 152.245,60.318 152.204,60.203 L151.599,58.920 L146.463,58.920 L145.877,60.132 C145.813,60.261 145.663,60.620 145.663,60.620 C145.663,60.620 145.709,60.620 145.823,60.620 L146.172,60.620 L146.172,60.880 L146.172,60.967 L146.172,61.435 L146.172,61.782 L145.823,61.782 L142.358,61.782 L142.010,61.782 L142.010,61.435 L142.010,60.967 L142.010,60.673 L142.300,60.625 C142.421,60.604 142.512,60.551 142.588,60.454 C142.703,60.307 142.790,60.174 142.842,60.069 L146.691,51.620 C146.794,51.379 146.875,51.185 146.935,51.039 C146.974,50.943 146.989,50.856 146.993,50.772 C147.031,50.796 147.069,50.822 147.103,50.842 C147.014,50.788 147.000,50.746 147.000,50.741 C147.000,50.750 146.993,50.762 146.993,50.772 C146.977,50.761 146.963,50.753 146.947,50.742 L146.793,50.639 L146.793,50.454 L146.793,49.986 L146.793,49.639 L147.141,49.639 L151.046,49.639 L151.394,49.639 L151.394,49.986 L151.394,50.454 L151.394,50.639 L151.241,50.742 C151.211,50.762 151.177,50.770 151.146,50.786 C151.142,50.771 151.136,50.751 151.136,50.741 C151.136,50.756 151.104,50.828 150.974,50.866 C151.036,50.848 151.090,50.815 151.146,50.786 C151.155,50.829 151.173,50.882 151.212,50.957 C151.293,51.111 151.378,51.286 151.465,51.477 L155.643,60.305 C155.705,60.416 155.765,60.488 155.817,60.523 C155.890,60.572 155.969,60.609 156.055,60.633 L156.307,60.706 L156.307,60.967 L156.307,61.435 L156.307,61.782 L155.958,61.782 L152.287,61.782 ZM148.878,52.257 L147.042,56.629 L150.972,56.629 L148.878,52.257 ZM144.128,66.519 C144.805,67.148 145.232,67.927 145.410,68.856 L143.624,68.856 C143.487,68.409 143.237,68.029 142.876,67.714 C142.499,67.415 142.041,67.260 141.502,67.250 C141.105,67.260 140.764,67.338 140.479,67.486 C140.188,67.638 139.954,67.828 139.776,68.057 C139.557,68.295 139.412,68.602 139.341,68.978 C139.260,69.374 139.219,69.192 139.219,70.284 C139.219,71.375 139.260,71.188 139.341,71.574 C139.412,71.960 139.557,72.272 139.776,72.511 C139.954,72.739 140.188,72.924 140.479,73.066 C140.764,73.234 141.105,73.318 141.502,73.318 C142.448,73.318 143.156,72.813 143.624,71.803 L145.410,71.803 C145.166,72.833 144.700,73.625 144.013,74.178 C143.306,74.726 142.469,75.000 141.502,75.000 C140.626,74.980 139.896,74.767 139.310,74.361 C138.715,73.970 138.282,73.518 138.013,73.005 C137.931,72.838 137.857,72.678 137.791,72.526 C137.730,72.369 137.679,72.171 137.639,71.932 C137.562,71.485 137.524,71.553 137.524,70.284 C137.524,68.995 137.562,69.057 137.639,68.620 C137.720,68.184 137.845,67.831 138.013,67.562 C138.282,67.049 138.715,66.592 139.310,66.191 C139.896,65.786 140.626,65.577 141.502,65.567 C142.575,65.577 143.451,65.895 144.128,66.519 ZM137.070,62.238 L136.722,62.238 L136.722,61.976 C136.722,61.976 136.533,61.976 136.336,61.976 L126.056,61.976 L125.708,61.976 L125.708,61.629 L125.708,61.157 L125.708,60.810 L126.056,60.810 C126.344,60.810 126.390,60.784 126.390,60.764 L126.390,50.960 C126.390,50.940 126.344,50.914 126.056,50.914 L125.708,50.914 L125.708,50.567 L125.708,50.095 L125.708,49.748 L126.056,49.748 L129.859,49.748 L130.207,49.748 L130.207,50.095 L130.207,50.567 L130.207,50.914 L129.859,50.914 C129.719,50.914 129.632,50.933 129.597,50.956 C129.598,50.955 129.604,59.259 129.604,59.259 L136.336,59.342 C136.479,59.342 136.585,59.313 136.663,59.259 C136.708,59.229 136.722,59.200 136.722,59.139 L136.722,58.792 L137.070,58.792 L137.543,58.792 L137.891,58.792 L137.891,59.139 L137.891,61.891 L137.891,62.238 L137.543,62.238 L137.070,62.238 ZM116.033,74.817 L112.361,65.567 L114.147,65.567 L116.674,72.168 L116.705,72.168 L119.239,65.567 L121.026,65.567 L117.346,74.817 L116.033,74.817 ZM119.998,51.359 C120.001,51.357 120.007,51.345 120.007,51.363 L120.007,57.782 C120.007,58.360 119.875,58.915 119.612,59.443 C119.349,59.974 118.951,60.441 118.422,60.844 C117.897,61.245 117.234,61.555 116.432,61.777 C115.638,61.998 114.714,62.107 113.657,62.107 C112.601,62.107 111.676,61.998 110.882,61.777 C110.081,61.555 109.417,61.245 108.892,60.844 C108.364,60.441 107.966,59.974 107.702,59.443 C107.439,58.915 107.307,58.360 107.307,57.782 L107.307,51.363 C107.307,51.362 107.307,51.363 107.307,51.362 C107.261,51.343 107.125,51.323 106.904,51.323 L106.562,51.323 L106.562,50.982 L106.562,50.525 L106.562,50.185 L106.904,50.185 L110.576,50.185 L110.918,50.185 L110.918,50.525 L110.918,50.982 L110.918,51.323 L110.576,51.323 C110.450,51.323 110.372,51.340 110.344,51.359 C110.347,51.357 110.353,51.345 110.353,51.363 L110.353,57.173 C110.353,57.885 110.608,58.439 111.127,58.864 C111.656,59.297 112.497,59.522 113.657,59.522 C114.818,59.522 115.659,59.297 116.188,58.864 C116.707,58.439 116.962,57.885 116.962,57.173 L116.962,51.369 C116.963,51.369 116.967,51.369 116.968,51.370 C116.971,51.371 116.962,51.355 116.962,51.363 L116.962,51.369 C116.915,51.343 116.816,51.323 116.661,51.323 L116.320,51.323 L116.320,50.982 L116.320,50.525 L116.320,50.185 L116.661,50.185 L120.230,50.185 L120.572,50.185 L120.572,50.525 L120.572,50.982 L120.572,51.323 L120.230,51.323 C120.104,51.323 120.027,51.340 119.998,51.359 ZM103.620,74.817 L101.322,71.924 L99.169,71.924 L99.169,74.817 L97.482,74.817 L97.482,65.567 L101.826,65.567 C102.752,65.567 103.508,65.811 104.093,66.298 C104.801,66.851 105.170,67.641 105.200,68.666 C105.180,70.173 104.462,71.198 103.047,71.741 L105.628,74.817 L103.620,74.817 ZM103.139,69.884 C103.449,69.554 103.605,69.148 103.605,68.666 C103.594,68.087 103.409,67.668 103.047,67.410 C102.762,67.181 102.350,67.067 101.811,67.067 L99.169,67.067 L99.169,70.432 L101.719,70.432 C102.350,70.422 102.823,70.239 103.139,69.884 ZM100.875,53.847 L100.737,54.111 L100.454,54.015 L99.989,53.857 L99.791,53.790 L99.757,53.585 C99.744,53.506 99.744,53.506 99.731,53.427 C99.718,53.348 99.718,53.348 99.706,53.269 C99.705,53.265 99.679,53.230 99.588,53.160 C99.288,52.900 98.796,52.667 98.117,52.469 C97.426,52.269 96.649,52.168 95.785,52.168 C95.456,52.168 95.145,52.189 94.852,52.230 C94.572,52.270 94.326,52.336 94.116,52.428 C93.922,52.512 93.777,52.616 93.676,52.738 C93.592,52.840 93.549,52.967 93.549,53.135 C93.549,53.370 93.666,53.523 93.962,53.640 C94.357,53.795 94.862,53.921 95.475,54.013 C96.110,54.109 96.797,54.205 97.536,54.301 C98.301,54.401 99.014,54.568 99.676,54.805 C100.363,55.050 100.939,55.412 101.399,55.889 C101.888,56.397 102.130,57.087 102.130,57.942 C102.130,58.784 101.923,59.488 101.504,60.042 C101.102,60.575 100.600,60.995 100.001,61.299 C99.414,61.597 98.768,61.793 98.066,61.886 C97.388,61.975 96.748,62.020 96.147,62.020 C95.538,62.020 94.934,61.961 94.334,61.842 C93.745,61.726 93.207,61.592 92.721,61.439 C92.239,61.288 91.830,61.144 91.494,61.010 C91.223,60.901 91.032,60.838 91.029,60.838 C91.017,60.838 91.011,60.841 90.989,60.868 L90.781,61.122 L90.514,60.929 L90.152,60.666 L89.933,60.507 L90.034,60.256 L91.223,57.314 L91.338,57.028 L91.637,57.108 L92.128,57.240 L92.386,57.308 L92.386,57.575 C92.386,57.657 92.381,57.745 92.371,57.835 C92.364,57.901 92.360,57.972 92.360,58.047 C92.360,58.179 92.457,58.322 92.697,58.482 C92.996,58.682 93.360,58.852 93.787,58.992 C94.230,59.136 94.672,59.251 95.114,59.336 C95.551,59.419 95.889,59.461 96.121,59.461 C96.349,59.461 96.635,59.444 96.978,59.410 C97.306,59.377 97.629,59.308 97.950,59.203 C98.254,59.102 98.508,58.965 98.714,58.793 C98.875,58.659 98.951,58.489 98.951,58.258 C98.951,58.020 98.831,57.861 98.533,57.737 C98.139,57.574 97.636,57.445 97.025,57.353 C96.390,57.257 95.703,57.161 94.964,57.065 C94.201,56.965 93.489,56.803 92.828,56.576 C92.144,56.341 91.569,55.999 91.109,55.550 C90.614,55.068 90.371,54.396 90.371,53.555 C90.371,52.323 90.881,51.326 91.883,50.595 C92.863,49.881 94.218,49.530 95.940,49.530 C96.774,49.530 97.493,49.598 98.098,49.736 C98.692,49.871 99.196,50.020 99.610,50.185 C100.017,50.347 100.351,50.496 100.613,50.634 C100.816,50.741 100.957,50.791 101.006,50.791 C101.083,50.791 101.125,50.782 101.128,50.780 C101.208,50.729 101.303,50.676 101.416,50.619 L101.644,50.503 L101.823,50.685 L102.108,50.974 L102.284,51.154 L102.168,51.377 L100.875,53.847 ZM81.899,61.900 L81.553,61.900 L81.553,61.553 L81.553,61.084 L81.553,60.737 C81.553,60.737 81.228,60.454 81.020,60.229 L75.133,53.978 L75.133,60.694 C75.133,60.732 75.140,60.737 75.335,60.737 L75.682,60.737 L75.682,61.084 L75.682,61.553 L75.682,61.900 L75.335,61.900 L72.119,61.900 L71.772,61.900 L71.772,61.553 L71.772,61.084 L71.772,60.737 L72.119,60.737 C72.254,60.737 72.242,60.747 72.242,60.694 L72.242,50.955 C72.242,50.902 72.254,50.911 72.119,50.911 L71.772,50.911 L71.772,50.564 L71.772,50.095 L71.772,49.748 L72.119,49.748 L75.963,49.748 L76.310,49.748 L76.310,50.095 L76.310,50.564 L76.310,50.866 C76.310,50.866 76.416,50.968 76.607,51.158 L82.285,57.155 L82.285,50.955 C82.285,50.912 82.284,50.911 82.109,50.911 L81.762,50.911 L81.762,50.564 L81.762,50.095 L81.762,49.748 L82.109,49.748 L85.299,49.748 L85.646,49.748 L85.646,50.095 L85.646,50.564 L85.646,50.911 L85.299,50.911 C85.164,50.911 85.175,50.902 85.175,50.955 L85.175,60.694 C85.175,60.747 85.164,60.737 85.299,60.737 L85.646,60.737 L85.646,61.084 L85.646,61.553 L85.646,61.900 L85.299,61.900 L81.899,61.900 ZM75.256,66.546 L74.366,67.725 C73.575,67.259 72.704,67.017 71.754,67.000 C71.262,67.000 70.852,67.110 70.524,67.330 C70.182,67.559 70.006,67.900 69.996,68.354 C69.996,68.626 70.114,68.873 70.351,69.093 C70.587,69.318 70.966,69.473 71.487,69.560 C71.776,69.603 72.171,69.652 72.673,69.709 C73.662,69.830 74.392,69.990 74.865,70.504 C75.333,71.009 75.567,71.440 75.567,72.109 C75.514,73.915 74.279,74.831 71.863,74.857 C70.300,74.857 68.957,74.425 67.833,73.561 L68.882,72.485 C69.721,73.103 70.720,73.416 71.877,73.425 C73.247,73.408 73.941,72.969 73.961,72.109 C73.970,71.405 73.512,71.297 72.586,71.154 C72.162,71.102 71.696,71.044 71.190,70.979 C70.283,70.845 69.594,70.545 69.121,70.078 C68.634,69.598 68.390,69.015 68.390,68.328 C68.390,67.503 68.696,66.837 69.309,66.332 C69.902,65.831 70.744,65.576 71.834,65.567 C73.146,65.593 74.286,65.919 75.256,66.546 ZM63.042,61.900 L62.691,61.900 L62.691,61.553 L62.691,61.084 L62.691,60.737 L63.042,60.737 C63.269,60.737 63.413,60.716 63.466,60.693 L63.466,60.694 C63.466,60.710 63.476,60.692 63.480,60.690 C63.478,60.691 63.469,60.692 63.466,60.693 L63.466,50.956 C63.469,50.957 63.478,50.958 63.480,50.959 C63.476,50.956 63.466,50.938 63.466,50.955 L63.466,50.956 C63.413,50.933 63.269,50.911 63.042,50.911 L62.691,50.911 L62.691,50.564 L62.691,50.095 L62.691,49.748 L63.042,49.748 L67.247,49.748 L67.598,49.748 L67.598,50.095 L67.598,50.564 L67.598,50.911 L67.247,50.911 C66.899,50.911 66.823,50.950 66.823,50.955 L66.823,60.694 C66.823,60.699 66.899,60.737 67.247,60.737 L67.598,60.737 L67.598,61.084 L67.598,61.553 L67.598,61.900 L67.247,61.900 L63.042,61.900 ZM58.969,33.793 C57.050,35.582 54.659,37.008 51.802,38.074 C48.949,39.137 45.673,39.668 41.976,39.668 L22.072,39.668 L22.072,57.513 C22.072,57.840 22.164,58.076 22.356,58.267 C22.530,58.441 23.345,58.653 24.577,58.782 L24.935,58.819 L25.292,58.857 L25.292,59.214 L25.292,59.572 L25.292,60.944 L25.292,61.341 L25.292,61.738 L24.893,61.738 L24.494,61.738 L0.801,61.738 L0.402,61.738 L0.002,61.738 L0.002,61.341 L0.002,60.944 L0.002,59.572 L0.002,59.214 L0.002,58.857 L0.360,58.819 L0.717,58.782 C1.949,58.653 2.764,58.441 2.939,58.267 C3.131,58.076 3.223,57.840 3.223,57.513 L3.223,26.969 L3.404,26.969 L51.358,26.969 L51.757,26.969 L51.757,26.571 L51.757,24.997 L57.243,20.783 L58.125,20.074 L56.993,20.074 L47.475,20.074 L47.371,20.148 L46.767,20.664 L20.168,20.738 L20.168,19.882 L20.168,19.484 L19.769,19.484 L4.865,19.484 L4.466,19.484 L4.466,19.882 L3.404,19.878 L3.223,19.878 L3.223,4.225 C3.223,3.898 3.131,3.662 2.939,3.471 C2.764,3.297 1.949,3.085 0.717,2.956 L0.360,2.919 L0.002,2.881 L0.002,2.524 L0.002,2.166 L0.002,0.794 L0.002,0.397 L0.002,-0.000 L0.402,-0.000 L0.801,-0.000 L41.976,-0.000 C45.673,-0.000 48.949,0.530 51.802,1.594 C54.662,2.661 57.055,4.108 58.975,5.938 C60.899,7.771 62.344,9.907 63.306,12.339 C64.263,14.757 64.742,17.276 64.742,19.891 C64.742,22.506 64.263,25.025 63.306,27.443 C62.343,29.878 60.895,31.997 58.969,33.793 ZM13.020,14.626 L13.020,13.732 L13.020,13.413 L11.972,13.413 L10.708,13.413 L10.517,13.413 L10.447,13.616 L10.142,14.510 L9.994,14.945 L10.403,14.945 L11.972,14.945 L13.020,14.945 L13.020,14.626 ZM20.196,14.625 L20.196,13.015 L20.196,12.670 L19.796,12.670 L16.241,12.670 L15.952,12.670 L14.880,14.970 L19.796,14.970 L20.196,14.970 L20.196,14.625 ZM20.196,18.699 L20.196,15.727 L20.196,15.328 L19.796,15.328 L10.236,15.328 L9.956,15.328 L9.861,15.591 L9.301,17.155 L7.097,17.155 L6.875,17.155 L6.758,17.343 L5.667,19.098 L6.385,19.098 L19.796,19.098 L20.196,19.098 L20.196,18.699 ZM5.300,65.689 C5.708,65.796 6.120,66.014 6.537,66.344 C6.888,66.592 7.174,66.948 7.392,67.410 C7.621,67.856 7.736,68.384 7.736,68.993 C7.736,69.815 7.446,70.564 6.866,71.239 C6.270,71.950 5.400,72.315 4.255,72.335 L1.689,72.335 L1.689,74.817 L0.002,74.817 L0.002,65.567 L4.033,65.567 C4.471,65.567 4.893,65.608 5.300,65.689 ZM1.689,70.744 L4.186,70.744 C4.812,70.734 5.283,70.541 5.598,70.166 C5.899,69.800 6.049,69.394 6.049,68.947 C6.049,68.577 5.988,68.265 5.865,68.011 C5.738,67.783 5.560,67.602 5.331,67.471 C4.985,67.252 4.583,67.148 4.125,67.158 L1.689,67.158 L1.689,70.744 ZM15.698,67.562 C15.968,67.049 16.400,66.592 16.996,66.191 C17.581,65.786 18.312,65.577 19.187,65.567 C20.073,65.577 20.811,65.786 21.401,66.191 C21.986,66.592 22.409,67.049 22.668,67.562 C22.857,67.831 22.986,68.184 23.058,68.620 C23.124,69.057 23.157,68.995 23.157,70.284 C23.157,71.553 23.124,71.485 23.058,71.932 C22.986,72.379 22.857,72.736 22.668,73.005 C22.409,73.518 21.986,73.970 21.401,74.361 C20.811,74.767 20.073,74.980 19.187,75.000 C18.312,74.980 17.581,74.767 16.996,74.361 C16.400,73.970 15.968,73.518 15.698,73.005 C15.617,72.838 15.543,72.678 15.477,72.526 C15.416,72.369 15.365,72.171 15.324,71.932 C15.248,71.485 15.209,71.553 15.209,70.284 C15.209,68.995 15.248,69.057 15.324,68.620 C15.405,68.184 15.530,67.831 15.698,67.562 ZM17.026,71.759 C17.098,72.145 17.243,72.457 17.462,72.696 C17.640,72.924 17.874,73.109 18.164,73.251 C18.449,73.419 18.790,73.502 19.187,73.502 C19.589,73.502 19.938,73.419 20.233,73.251 C20.513,73.109 20.737,72.924 20.905,72.696 C21.124,72.457 21.274,72.145 21.355,71.759 C21.432,71.373 21.470,71.560 21.470,70.469 C21.470,69.377 21.432,69.374 21.355,68.978 C21.274,68.602 21.124,68.295 20.905,68.057 C20.737,67.828 20.513,67.638 20.233,67.486 C19.938,67.338 19.589,67.260 19.187,67.250 C18.790,67.260 18.449,67.338 18.164,67.486 C17.874,67.638 17.640,67.828 17.462,68.057 C17.243,68.295 17.098,68.602 17.026,68.978 C16.945,69.374 16.904,69.377 16.904,70.469 C16.904,71.560 16.945,71.373 17.026,71.759 ZM38.634,49.777 C38.848,49.777 38.994,49.749 39.068,49.708 C39.095,49.692 39.096,49.690 39.096,49.659 L39.096,49.312 L39.445,49.312 L39.916,49.312 L40.265,49.312 L40.265,49.659 L40.265,52.530 L40.265,52.877 L39.916,52.877 L39.445,52.877 L39.096,52.877 L39.096,52.530 C39.096,52.440 39.007,52.385 38.634,52.385 L32.597,52.385 L32.597,54.279 L36.278,54.279 C36.543,54.279 36.753,54.279 36.753,54.279 L36.753,53.865 L37.142,53.865 L37.613,53.865 L37.904,53.865 L37.962,53.865 L37.962,54.212 L37.962,56.954 L37.962,57.301 L37.613,57.301 L37.089,57.301 L36.753,57.301 L36.753,56.887 C36.753,56.887 36.394,56.887 36.069,56.887 L32.597,56.887 L32.597,59.247 L38.948,59.247 C39.090,59.247 39.196,59.218 39.274,59.165 C39.321,59.133 39.332,59.114 39.332,59.076 L39.332,58.729 L39.680,58.729 L40.151,58.729 L40.500,58.729 L40.500,59.076 L40.500,61.792 L40.500,62.139 L40.151,62.139 L39.680,62.139 L39.332,62.139 L39.332,61.855 C39.332,61.855 39.144,61.855 38.948,61.855 L29.343,61.855 L28.994,61.855 L28.994,61.508 L28.994,61.042 L28.994,60.695 L29.343,60.695 C29.355,60.695 29.374,60.689 29.406,60.667 C29.391,60.677 29.387,50.978 29.387,50.978 C29.374,50.943 29.355,50.937 29.343,50.937 L28.994,50.937 L28.994,50.590 L28.994,50.124 L28.994,49.777 L29.343,49.777 L38.634,49.777 ZM37.028,66.298 C37.736,66.851 38.105,67.641 38.135,68.666 C38.115,70.173 37.397,71.198 35.982,71.741 L38.563,74.817 L36.555,74.817 L34.257,71.924 L32.104,71.924 L32.104,74.817 L30.417,74.817 L30.417,65.567 L34.761,65.567 C35.687,65.567 36.443,65.811 37.028,66.298 ZM32.104,67.067 L32.104,70.432 L34.654,70.432 C35.285,70.422 35.758,70.239 36.074,69.884 C36.384,69.554 36.540,69.148 36.540,68.666 C36.529,68.087 36.344,67.668 35.982,67.410 C35.697,67.181 35.285,67.067 34.745,67.067 L32.104,67.067 ZM48.831,49.748 L49.177,49.748 L49.177,50.095 L49.177,50.564 L49.177,50.866 C49.177,50.866 49.283,50.968 49.474,51.158 L55.152,57.155 L55.152,50.955 C55.152,50.912 55.152,50.911 54.976,50.911 L54.629,50.911 L54.629,50.564 L54.629,50.095 L54.629,49.748 L54.976,49.748 L58.167,49.748 L58.514,49.748 L58.514,50.095 L58.514,50.564 L58.514,50.911 L58.167,50.911 C58.032,50.911 58.043,50.902 58.043,50.955 L58.043,60.694 C58.043,60.747 58.032,60.737 58.167,60.737 L58.514,60.737 L58.514,61.084 L58.514,61.553 L58.514,61.900 L58.167,61.900 L54.767,61.900 L54.420,61.900 L54.420,61.553 L54.420,61.084 L54.420,60.737 C54.420,60.737 54.095,60.454 53.887,60.229 L48.000,53.978 L48.000,60.694 C48.000,60.732 48.008,60.737 48.203,60.737 L48.550,60.737 L48.550,61.084 L48.550,61.553 L48.550,61.900 L48.203,61.900 L44.986,61.900 L44.639,61.900 L44.639,61.553 L44.639,61.084 L44.639,60.737 L44.986,60.737 C45.121,60.737 45.110,60.747 45.110,60.694 L45.110,50.955 C45.110,50.902 45.121,50.911 44.986,50.911 L44.639,50.911 L44.639,50.564 L44.639,50.095 L44.639,49.748 L44.986,49.748 L48.831,49.748 ZM53.083,67.067 L50.037,67.067 L50.037,74.817 L48.342,74.817 L48.342,67.067 L45.296,67.067 L45.296,65.567 L53.083,65.567 L53.083,67.067 ZM90.039,67.158 L84.618,67.158 L84.618,69.401 L89.245,69.401 L89.245,70.893 L84.618,70.893 L84.618,73.226 L90.039,73.226 L90.039,74.817 L82.931,74.817 L82.931,65.567 L90.039,65.567 L90.039,67.158 ZM130.240,74.817 L128.553,74.817 L128.553,65.567 L130.240,65.567 L130.240,74.817 Z"
    var closeButton;
    var contentLeftfield;
    var bgHeight;
    var loader;
    var arrowLeft;
    var arrowRight;
    var buttonShapeRight
    var buttonShapeLeft
    var nav = 0;
    var bgImage;

    var p = createjs.extend(NewsReader, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceDispatch = this.instanceDispatch;
        ratio = this.ratio;
        aspectRatio = this.aspectRatio;

        titleN = this.title;
        dateN = this.date;
        imageN = this.gallery;

        bgHeight = stage.canvas.height;
        bg = new createjs.Shape();
        bg.graphics.beginFill("#F4F6F9").drawRect(0, 0, stage.canvas.width,bgHeight);
        bg.scaleY = 0;
        createjs.Tween.get(bg).to({scaleY:1}, 800, createjs.Ease.circInOut)
        .call(function(){
            loader = new Loader(imageN,ratio,false);
            loader.register(instance);
            instance.addEventListener("loaderComplete", loadAssetsComplete);
        });

        instance.addChild(bg)

        logo = new createSvg(logoSvg,"#143483",1);
        logo.visible = false;
        logo.x = 100*ratio
        logo.y = 50*ratio;
        instance.addChild(logo);

        closeButton = new createSvg(closeSvg,"#143483",1);
        closeButton.visible = false;
        closeButton.regX = 10*ratio;
        closeButton.regY = 10*ratio;
        closeButton.x = stage.canvas.width-20*ratio-100*ratio
        closeButton.y = logo.y+40*ratio
        instance.addChild(closeButton);
        
        closeBox = new createjs.Shape();
        closeBox.visible = false;
        closeBox.alpha = 0.01
        closeBox.graphics.beginFill("#143483").drawRect(0, 0, 40*ratio,40*ratio);
        closeBox.x = stage.canvas.width-40*ratio-100*ratio
        closeBox.y = logo.y+20*ratio
        instance.addChild(closeBox);
        closeBox.cursor = "pointer"
        closeBox.addEventListener("mouseover", handlerOverNavigation);
        closeBox.addEventListener("mouseout", handlerOutNavigation);
        closeBox.addEventListener("click", handlerClickNavigation); 

       createjs.Tween.get(logo)
       .to({alpha:1}, 300, createjs.Ease.circInOut)
       .call(function(){
            
            logo.visible = true
            closeButton.visible = true
            closeBox.visible = true

       });

    } ;

    function loadAssetsComplete(evt) {

        instance.removeEventListener("loaderComplete", loadAssetsComplete);
        loader.kill();
        loader = null;
        loadedAssets = evt.contentLoader;

        arrowRight = createSvg(arrowShapeRight,"#143483");
        arrowRight.x = stage.canvas.width/2 + loadedAssets[nav].getBounds().width/2*ratio+ 50*ratio 
        arrowRight.y = stage.canvas.height/2
        instance.addChild(arrowRight);

        arrowLeft = createSvg(arrowShapeLeft,"#143483");
        arrowLeft.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio - 11*ratio - 50*ratio
        arrowLeft.y = stage.canvas.height/2
        instance.addChild(arrowLeft);

        bgImage = new createjs.Shape();
        instance.addChild(bgImage);

        buttonShapeLeft = new createjs.Shape();
        buttonShapeLeft.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,50*ratio);
        buttonShapeLeft.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio - 11*ratio - 50*ratio - 20*ratio
        buttonShapeLeft.y = stage.canvas.height/2- 15*ratio
        buttonShapeLeft.alpha = 0.01;
        instance.addChild(buttonShapeLeft);

        buttonShapeRight = new createjs.Shape();
        buttonShapeRight.x = stage.canvas.width/2 + loadedAssets[nav].getBounds().width/2*ratio + 11*ratio + 20*ratio
        buttonShapeRight.y = stage.canvas.height/2- 15*ratio;
        buttonShapeRight.graphics.beginFill("#FFFFFF").drawRect(0, 0, 50*ratio,50*ratio);
        buttonShapeRight.alpha = 0.01;
        instance.addChild(buttonShapeRight);

        buttonShapeRight.cursor = "pointer"
        buttonShapeRight.state = "next";
        buttonShapeRight.addEventListener("mouseover", handlerOver);
        buttonShapeRight.addEventListener("mouseout", handlerOut);
        buttonShapeRight.addEventListener("click", handlerClick);

        buttonShapeLeft.cursor = "pointer"
        buttonShapeLeft.state = "previous";
        buttonShapeLeft.addEventListener("mouseover", handlerOver);
        buttonShapeLeft.addEventListener("mouseout", handlerOut);
        buttonShapeLeft.addEventListener("click", handlerClick);

        titleField = new createjs.Text();
        titleField.font = "18px PT Sans";
        titleField.color = "#143483";
        titleField.lineHeight = 40;
        titleField.scaleX = ratio;
        titleField.scaleY = ratio;
        instance.addChild(titleField);

        addImage();
    }

    function handlerOver(event){

        if(event.target.state=="next")createjs.Tween.get(arrowRight).to({x:stage.canvas.width/2 + loadedAssets[nav].getBounds().width/2*ratio+50*ratio+10*ratio}, 400, createjs.Ease.circInOut)
        else createjs.Tween.get(arrowLeft).to({x:stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio - 11*ratio - 50*ratio-10*ratio}, 400, createjs.Ease.circInOut)
    }

    function handlerOut(event){
        if(event.target.state=="next")createjs.Tween.get(arrowRight).to({x:stage.canvas.width/2 + loadedAssets[nav].getBounds().width/2*ratio+50*ratio}, 400, createjs.Ease.circInOut)
        else createjs.Tween.get(arrowLeft).to({x:stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio - 11*ratio - 50*ratio}, 400, createjs.Ease.circInOut)
    }

    function handlerClick(event){
        
        if(event.target.state=="next"){
           if(nav<imageN.length-1)nav++
        }else{
           if(nav>0)nav--
        }

        removeImage();
        addImage();
    }

    function addImage(){

        containerImage = new createjs.Container();
        instance.addChild(containerImage);
        containerImage.addChild(loadedAssets[nav]);

        containerImage.scaleX = ratio;
        containerImage.scaleY = ratio;
        containerImage.alpha = 0;
        createjs.Tween.get(containerImage).to({alpha:1}, 1000, createjs.Ease.circInOut)
        containerImage.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio
        containerImage.y = stage.canvas.height/2 - loadedAssets[nav].getBounds().height/2*ratio

        var currentNav = nav+1
        var totalNav = imageN.length

        if(nav<9)titleField.text = "0"+currentNav+" / "+totalNav;
        else titleField.text = currentNav+" / "+totalNav;

        titleField.x = stage.canvas.width/2 - titleField.getBounds().width/2*ratio
        titleField.y = containerImage.y+loadedAssets[nav].getBounds().height*ratio+25*ratio

        bgImage.graphics.clear();
        bgImage.graphics.beginFill("#143483").drawRect(0, 0, loadedAssets[nav].getBounds().width*ratio+2*ratio,loadedAssets[nav].getBounds().height*ratio+2*ratio);
        bgImage.scaleY = 0;
        createjs.Tween.get(bgImage).to({scaleY:1}, 400, createjs.Ease.circInOut)
        bgImage.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio-1*ratio
        bgImage.y = stage.canvas.height/2- loadedAssets[nav].getBounds().height/2*ratio-1*ratio
    }

    function removeImage(){

        createjs.Tween.get(arrowRight).to({x:stage.canvas.width/2 + loadedAssets[nav].getBounds().width/2*ratio+ 50*ratio,y:stage.canvas.height/2}, 400, createjs.Ease.circInOut)
        createjs.Tween.get(arrowLeft).to({x:stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio - 11*ratio - 50*ratio,y:stage.canvas.height/2}, 400, createjs.Ease.circInOut)

        if(buttonShapeRight){
            buttonShapeRight.x = stage.canvas.width/2 + loadedAssets[nav].getBounds().width/2*ratio + 11*ratio + 20*ratio
            buttonShapeRight.y = stage.canvas.height/2- 15*ratio;
        }

        if(buttonShapeLeft){
            buttonShapeLeft.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio - 11*ratio - 50*ratio - 20*ratio
            buttonShapeLeft.y = stage.canvas.height/2- 15*ratio
        }

        instance.removeChild(containerImage);
        containerImage = null;

    }

    function addContent(){

        titleField = new createjs.Text();
        titleField.font = "bold 36px PT Serif";
        titleField.color = "#143483";
        titleField.lineHeight = 40;
        titleField.lineWidth = (stage.canvas.width-400*ratio)/ratio;
        titleField.scaleX = ratio;
        titleField.scaleY = ratio;
        titleField.text = titleN;
        titleField.x = 200*ratio;
        titleField.y = stage.canvas.height/2-150*ratio;
        instance.addChild(titleField);

        dateField = new createjs.Text();
        dateField.font = "bold 12px PT Sans";
        dateField.color = "#143483";
        dateField.text = dateN;
        dateField.scaleX = ratio;
        dateField.scaleY = ratio;
        dateField.x = 200*ratio;
        dateField.y = titleField.y+titleField.getBounds().height*ratio+50*ratio;
        dateField.alpha = 0.75;
        instance.addChild(dateField);

        line = new createjs.Shape();
        line.graphics.beginFill("#143483").drawRect(0, 0, 200*ratio,1*ratio);
        line.x = 200*ratio;
        line.y = dateField.y+dateField.getBounds().height*ratio+(50/4)*ratio;
        line.alpha = 0.5;
        instance.addChild(line);

         /*contentLeftfield = new createjs.Text();
        contentLeftfield.font = "16px PT Sans";
        //contentLeftfield.visible = false;
        contentLeftfield.color = "#143483";
        contentLeftfield.lineWidth = (stage.canvas.width-400*ratio)/ratio;
        contentLeftfield.lineHeight = 20;
        contentLeftfield.text = Icontent;
        contentLeftfield.x = 200*ratio;
        contentLeftfield.y = line.y+50*ratio;
        contentLeftfield.scaleX = ratio;
        contentLeftfield.scaleY = ratio;
        instance.addChild(contentLeftfield);*/
    }

    function handlerOverNavigation(event){
        createjs.Tween.get(closeButton).to({rotation:180}, 400, createjs.Ease.circInOut)
    }

    function handlerOutNavigation(event){
           createjs.Tween.get(closeButton).to({rotation:0}, 400, createjs.Ease.circInOut)
    }


    function handlerClickNavigation(event){
        
        closeBox.removeEventListener("mouseover", handlerOverNavigation);
       closeBox.removeEventListener("mouseout", handlerOutNavigation);
       closeBox.removeEventListener("click", handlerClickNavigation); 

       createjs.Tween.get(bg)
       .to({scaleY:0}, 500, createjs.Ease.circInOut)
       .call(function(){
            bg.graphics.clear();
            instance.removeChild(bg);

            var customEvent = new createjs.Event("closeOverlay");
            customEvent.state = "close"
            instanceDispatch.dispatchEvent(customEvent);

       });

        if(loader){
            instance.removeEventListener("loaderComplete", loadAssetsComplete);
            loader.kill();
            loader = null;
        }else{

           if(containerImage)instance.removeChild(containerImage);
           if(arrowRight)instance.removeChild(arrowRight);
           if(arrowLeft)instance.removeChild(arrowLeft);
           if(buttonShapeRight)instance.removeChild(buttonShapeRight);
           if(buttonShapeLeft)instance.removeChild(buttonShapeLeft);
           if(titleField)instance.removeChild(titleField);
           if(bgImage){
            bgImage.graphics.clear();
            instance.removeChild(bgImage);
            }

        }

        nav = 0;

        createjs.Tween.get(logo)
           .to({alpha:1}, 300, createjs.Ease.circInOut)
           .call(function(){
                instance.removeChild(closeBox);
                instance.removeChild(closeButton);
                instance.removeChild(logo);
             });

    }

     function createSvg(Isvg,Icolor){
        
        var color;
        if(Icolor==null)color = "#FFFFFF";
        else color = Icolor;

        var svg = new createjs.Shape();
        svg.graphics.beginFill(color);
        svg.graphics.decodeSVGPath(Isvg);
        svg.scaleX = ratio
        svg.scaleY = ratio
        return svg;
    }

    p.getHeight = function (){
       return bgHeight;
    } 

    p.resize = function() {
        
        closeButton.x = stage.canvas.width-20*ratio-100*ratio
        closeButton.y = logo.y+40*ratio

        closeBox.x = stage.canvas.width-40*ratio-100*ratio
        closeBox.y = logo.y+20*ratio

        bgHeight = stage.canvas.height;
        bg.graphics.clear();
        bg.graphics.beginFill("#F4F6F9").drawRect(0, 0, stage.canvas.width,bgHeight);

        if(titleField){
            titleField.y = stage.canvas.height/2-150*ratio;
            titleField.lineWidth = (stage.canvas.width-400*ratio)/ratio;
        }

        if(dateField){
            dateField.x = 200*ratio;
            dateField.y = titleField.y+titleField.getBounds().height*ratio+50*ratio;
        }

        if(line){
            line.x = 200*ratio;
            line.y = dateField.y+dateField.getBounds().height*ratio+(50/4)*ratio;
        }

        if(contentLeftfield){
            contentLeftfield.x = 200*ratio;
            contentLeftfield.y = line.y+50*ratio;
            contentLeftfield.lineWidth = (stage.canvas.width-400*ratio)/ratio;
        }

        if(loader)loader.resize()

        if(arrowRight){
            arrowRight.x = stage.canvas.width/2 + loadedAssets[nav].getBounds().width/2*ratio+ 50*ratio 
            arrowRight.y = stage.canvas.height/2
        }

        if(arrowLeft){
           arrowLeft.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio - 11*ratio - 50*ratio
            arrowLeft.y = stage.canvas.height/2
        }

        if(buttonShapeRight){
            buttonShapeRight.x = stage.canvas.width/2 + loadedAssets[nav].getBounds().width/2*ratio + 11*ratio + 20*ratio
            buttonShapeRight.y = stage.canvas.height/2- 15*ratio;
        }

        if(buttonShapeLeft){
            buttonShapeLeft.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio - 11*ratio - 50*ratio - 20*ratio
            buttonShapeLeft.y = stage.canvas.height/2- 15*ratio
        }

        if(containerImage){
            containerImage.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio
            containerImage.y = stage.canvas.height/2 - loadedAssets[nav].getBounds().height/2*ratio
        }

        if(titleField){
            titleField.x = stage.canvas.width/2 - titleField.getBounds().width/2*ratio
            titleField.y = containerImage.y+loadedAssets[nav].getBounds().height*ratio+25*ratio
        }

        if(bgImage){
            bgImage.x = stage.canvas.width/2 - loadedAssets[nav].getBounds().width/2*ratio-1*ratio
            bgImage.y = stage.canvas.height/2- loadedAssets[nav].getBounds().height/2*ratio-1*ratio
        }
    } ;  

window.NewsReader = createjs.promote(NewsReader, "Container");
}());