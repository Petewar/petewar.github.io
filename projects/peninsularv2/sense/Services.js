(function () {

    function Services(Iratio,IstancetoDispatch,Iassests,IaspectRatio) {

        this.ratio = Iratio;
        this.istancetoDispatch = IstancetoDispatch;
        this.iassets = Iassests;
        this.iaspectRatio = IaspectRatio;
        this.Container_constructor();
        this.setup();

    }
    
    var bgServices;
    var instance;
    var ratio;
    var bgHeight;
    var titleField;
    var subtitleField;

    var solutionsSvg="M37.500,75.000 C16.789,75.000 -0.000,58.211 -0.000,37.500 C-0.000,16.789 16.789,-0.000 37.500,-0.000 C58.211,-0.000 75.000,16.789 75.000,37.500 C75.000,58.211 58.211,75.000 37.500,75.000 ZM37.500,2.500 C18.170,2.500 2.500,18.170 2.500,37.500 C2.500,56.830 18.170,72.500 37.500,72.500 C56.830,72.500 72.500,56.830 72.500,37.500 C72.500,18.170 56.830,2.500 37.500,2.500 ZM54.117,22.274 L55.947,24.203 C56.293,24.549 56.293,25.142 55.947,25.538 C55.749,25.736 55.502,25.835 55.304,25.835 C55.106,25.835 54.810,25.736 54.661,25.538 L52.732,23.609 L50.804,25.538 C50.606,25.736 50.359,25.835 50.161,25.835 C49.963,25.835 49.666,25.736 49.518,25.538 C49.172,25.192 49.172,24.598 49.518,24.203 L51.447,22.274 L49.518,20.345 C49.172,19.999 49.172,19.405 49.518,19.010 C49.864,18.663 50.458,18.663 50.853,19.010 L52.782,20.938 L54.711,19.010 C55.057,18.663 55.650,18.663 56.046,19.010 C56.392,19.356 56.392,19.949 56.046,20.345 L54.117,22.274 ZM36.857,25.488 C36.659,25.686 36.412,25.785 36.214,25.785 C36.016,25.785 35.720,25.686 35.571,25.488 L33.395,23.411 C33.049,23.065 33.049,22.472 33.395,22.076 C33.741,21.730 34.335,21.730 34.730,22.076 L36.165,23.510 L40.665,19.010 C41.011,18.663 41.605,18.663 42.001,19.010 C42.347,19.356 42.347,19.949 42.001,20.345 L36.857,25.488 ZM25.482,25.538 C25.284,25.736 25.037,25.835 24.839,25.835 C24.641,25.835 24.345,25.736 24.196,25.538 L22.169,23.609 L20.240,25.538 C20.042,25.736 19.795,25.835 19.597,25.835 C19.399,25.835 19.102,25.736 18.954,25.538 C18.608,25.192 18.608,24.598 18.954,24.203 L20.883,22.274 L18.954,20.345 C18.608,19.999 18.608,19.405 18.954,19.010 C19.300,18.663 19.894,18.663 20.289,19.010 L22.218,20.938 L24.147,19.010 C24.493,18.663 25.087,18.663 25.482,19.010 C25.828,19.356 25.828,19.949 25.482,20.345 L23.553,22.274 L25.482,24.203 C25.828,24.549 25.828,25.142 25.482,25.538 ZM22.218,27.664 C22.762,27.664 23.158,28.060 23.158,28.604 L23.158,33.995 L36.461,33.995 L36.461,28.604 C36.461,28.109 36.857,27.664 37.401,27.664 C37.945,27.664 38.341,28.060 38.341,28.604 L38.341,33.995 L51.842,33.995 L51.842,28.604 C51.842,28.109 52.238,27.664 52.782,27.664 C53.326,27.664 53.672,28.060 53.672,28.604 L53.672,34.934 C53.672,35.429 53.276,35.874 52.732,35.874 L37.401,35.874 L22.218,35.874 C21.724,35.874 21.278,35.478 21.278,34.934 L21.278,28.604 C21.278,28.109 21.674,27.664 22.218,27.664 ZM37.352,47.101 C36.857,47.051 36.412,46.655 36.412,46.161 C36.412,45.666 36.857,45.221 37.352,45.221 C37.846,45.221 38.291,45.617 38.291,46.161 C38.291,46.655 37.896,47.101 37.352,47.101 ZM36.412,38.644 C36.412,38.149 36.857,37.704 37.352,37.704 C37.846,37.704 38.291,38.100 38.291,38.644 C38.291,39.138 37.896,39.583 37.352,39.583 C36.857,39.583 36.412,39.188 36.412,38.644 ZM37.352,43.342 C36.857,43.342 36.412,42.897 36.412,42.402 C36.412,41.908 36.857,41.463 37.352,41.463 C37.846,41.463 38.291,41.908 38.291,42.402 C38.291,42.897 37.896,43.342 37.352,43.342 ZM37.352,49.029 C39.330,49.029 40.912,50.661 40.912,52.640 C40.912,54.618 39.330,56.250 37.352,56.250 C35.373,56.250 33.791,54.618 33.791,52.640 C33.791,50.661 35.373,49.029 37.352,49.029 ZM37.352,54.371 C38.291,54.371 39.083,53.579 39.083,52.640 C39.083,51.700 38.291,50.909 37.352,50.909 C36.412,50.909 35.621,51.700 35.621,52.640 C35.621,53.579 36.412,54.371 37.352,54.371 Z";
    var portServicesSvg="M37.500,75.000 C16.789,75.000 -0.000,58.211 -0.000,37.500 C-0.000,16.789 16.789,-0.000 37.500,-0.000 C58.211,-0.000 75.000,16.789 75.000,37.500 C75.000,58.211 58.211,75.000 37.500,75.000 ZM64.548,59.712 C63.964,60.422 63.347,61.103 62.710,61.765 C63.347,61.103 63.964,60.422 64.548,59.712 ZM72.036,43.170 C71.883,44.111 71.692,45.040 71.466,45.955 C71.693,45.040 71.883,44.111 72.036,43.170 ZM71.421,46.148 C71.189,47.059 70.915,47.953 70.613,48.834 C70.915,47.953 71.189,47.059 71.421,46.148 ZM70.482,49.221 C70.181,50.068 69.845,50.899 69.482,51.715 C69.845,50.899 70.181,50.069 70.482,49.221 ZM69.289,52.143 C68.916,52.950 68.516,53.742 68.085,54.515 C68.516,53.742 68.916,52.950 69.289,52.143 ZM67.872,54.886 C67.420,55.672 66.945,56.444 66.436,57.190 C66.945,56.443 67.420,55.672 67.872,54.886 ZM66.286,57.401 C65.763,58.157 65.213,58.893 64.633,59.604 C65.213,58.893 65.763,58.157 66.286,57.401 ZM62.448,62.040 C61.828,62.670 61.182,63.273 60.517,63.855 C61.182,63.273 61.828,62.670 62.448,62.040 ZM40.504,72.363 C39.513,72.447 38.513,72.500 37.500,72.500 C36.488,72.500 35.488,72.447 34.498,72.363 C35.488,72.447 36.488,72.500 37.500,72.500 C38.513,72.500 39.513,72.447 40.504,72.363 ZM60.168,64.157 C59.500,64.726 58.811,65.270 58.101,65.788 C58.811,65.270 59.500,64.726 60.168,64.157 ZM57.744,66.043 C57.012,66.563 56.262,67.061 55.490,67.524 C56.262,67.060 57.011,66.563 57.744,66.043 ZM55.232,67.672 C54.431,68.145 53.612,68.591 52.770,68.999 C53.612,68.591 54.431,68.145 55.232,67.672 ZM52.703,69.034 C51.859,69.441 50.992,69.808 50.112,70.148 C50.992,69.808 51.859,69.441 52.703,69.034 ZM49.774,70.282 C48.928,70.598 48.065,70.879 47.190,71.130 C48.065,70.879 48.928,70.598 49.774,70.282 ZM46.738,71.259 C45.868,71.496 44.985,71.701 44.089,71.872 C44.985,71.701 45.868,71.496 46.738,71.259 ZM43.629,71.954 C42.714,72.116 41.788,72.248 40.850,72.337 C41.789,72.248 42.714,72.116 43.629,71.954 ZM14.491,63.861 C13.825,63.280 13.178,62.676 12.559,62.047 C13.179,62.677 13.825,63.280 14.491,63.861 ZM34.151,72.337 C33.213,72.248 32.288,72.116 31.374,71.955 C32.288,72.116 33.213,72.248 34.151,72.337 ZM30.913,71.872 C30.018,71.702 29.135,71.497 28.265,71.260 C29.135,71.497 30.018,71.702 30.913,71.872 ZM27.814,71.131 C26.939,70.880 26.075,70.600 25.230,70.283 C26.076,70.600 26.939,70.880 27.814,71.131 ZM24.894,70.151 C24.013,69.810 23.146,69.444 22.301,69.036 C23.146,69.444 24.013,69.810 24.894,70.151 ZM22.242,69.006 C21.400,68.597 20.581,68.151 19.778,67.678 C20.581,68.151 21.400,68.597 22.242,69.006 ZM19.515,67.527 C18.744,67.064 17.996,66.568 17.265,66.048 C17.996,66.568 18.744,67.064 19.515,67.527 ZM16.905,65.793 C16.195,65.275 15.507,64.731 14.839,64.163 C15.507,64.731 16.195,65.275 16.905,65.793 ZM12.300,61.776 C11.661,61.113 11.043,60.430 10.457,59.719 C11.043,60.430 11.661,61.113 12.300,61.776 ZM10.383,59.624 C9.802,58.913 9.251,58.176 8.727,57.419 C9.251,58.176 9.802,58.913 10.383,59.624 ZM8.570,57.199 C8.062,56.454 7.587,55.685 7.137,54.900 C7.587,55.685 8.062,56.454 8.570,57.199 ZM6.921,54.526 C6.491,53.754 6.090,52.963 5.717,52.157 C6.090,52.963 6.491,53.754 6.921,54.526 ZM5.525,51.730 C5.161,50.914 4.824,50.082 4.522,49.234 C4.824,50.083 5.161,50.914 5.525,51.730 ZM4.394,48.856 C4.091,47.972 3.815,47.076 3.582,46.161 C3.815,47.076 4.091,47.972 4.394,48.856 ZM3.543,45.994 C3.315,45.077 3.125,44.146 2.970,43.203 C3.125,44.146 3.315,45.077 3.543,45.994 ZM37.500,2.500 C18.170,2.500 2.500,18.170 2.500,37.500 C2.500,39.385 2.653,41.233 2.940,43.037 C4.027,43.771 5.463,44.452 7.051,44.452 C7.051,44.452 7.048,44.459 7.043,44.471 C10.256,44.425 13.387,41.250 13.387,41.250 C13.387,41.250 15.578,44.452 18.984,44.452 C23.029,44.452 25.213,41.250 25.213,41.250 C25.213,41.250 27.941,44.452 31.386,44.452 C31.386,44.452 31.383,44.457 31.379,44.467 C35.022,44.452 37.591,41.250 37.591,41.250 C37.591,41.250 39.782,44.452 43.187,44.452 C47.233,44.452 49.416,41.250 49.416,41.250 C49.416,41.250 52.145,44.452 55.589,44.452 C55.589,44.452 55.586,44.459 55.581,44.471 C58.794,44.425 61.925,41.250 61.925,41.250 C61.925,41.250 64.116,44.452 67.522,44.452 C69.408,44.452 70.952,43.756 72.064,43.013 C72.348,41.217 72.500,39.376 72.500,37.500 C72.500,18.170 56.830,2.500 37.500,2.500 ZM38.333,34.520 L37.697,35.808 L37.060,34.517 C32.950,34.244 29.314,31.429 27.717,27.932 L26.625,28.175 L27.914,24.088 L30.810,27.247 L29.874,27.455 C31.153,29.852 33.702,30.987 36.623,31.204 L36.623,19.990 L33.781,19.990 C33.567,20.206 33.270,20.338 32.942,20.338 C32.290,20.338 31.758,19.809 31.758,19.155 C31.758,18.501 32.290,17.970 32.942,17.970 C33.270,17.970 33.567,18.104 33.781,18.320 L36.623,18.320 L36.623,17.051 C35.234,16.643 34.211,15.369 34.211,13.850 C34.211,12.004 35.714,10.500 37.562,10.500 C39.411,10.500 40.914,12.004 40.914,13.850 C40.914,15.270 40.022,16.480 38.772,16.967 L38.772,18.320 L41.342,18.320 C41.558,18.104 41.854,17.971 42.182,17.971 C42.834,17.971 43.367,18.502 43.367,19.155 C43.367,19.809 42.834,20.338 42.182,20.338 C41.854,20.338 41.558,20.206 41.342,19.991 L38.772,19.991 L38.772,31.211 C41.543,31.020 43.977,30.048 45.323,27.833 L44.384,27.560 L47.481,24.598 L48.499,28.763 L47.440,28.453 C45.718,31.689 42.241,34.258 38.333,34.520 ZM39.281,13.850 C39.281,12.902 38.510,12.133 37.563,12.133 C36.615,12.133 35.844,12.902 35.844,13.850 C35.844,14.797 36.615,15.568 37.563,15.568 C38.510,15.568 39.281,14.797 39.281,13.850 Z";
    var agencyServicesSvg="M37.500,75.000 C16.789,75.000 -0.000,58.211 -0.000,37.500 C-0.000,16.789 16.789,-0.000 37.500,-0.000 C58.211,-0.000 75.000,16.789 75.000,37.500 C75.000,58.211 58.211,75.000 37.500,75.000 ZM37.500,2.500 C18.170,2.500 2.500,18.170 2.500,37.500 C2.500,56.830 18.170,72.500 37.500,72.500 C56.830,72.500 72.500,56.830 72.500,37.500 C72.500,18.170 56.830,2.500 37.500,2.500 ZM54.807,52.500 L19.652,52.500 C19.098,52.500 18.500,52.100 18.500,51.624 L18.500,51.000 L56.000,51.000 L56.000,51.624 C56.000,52.100 55.361,52.500 54.807,52.500 ZM54.986,50.500 L19.513,50.500 C18.954,50.500 18.500,50.052 18.500,49.500 L18.500,34.000 C18.500,33.448 18.954,33.000 19.513,33.000 L54.986,33.000 C55.546,33.000 56.000,33.448 56.000,34.000 L56.000,49.500 C56.000,50.052 55.546,50.500 54.986,50.500 ZM22.619,35.445 C22.619,35.112 22.308,34.843 21.924,34.843 L21.809,34.843 C21.425,34.843 21.114,35.112 21.114,35.445 L21.114,48.154 C21.114,48.486 21.425,48.756 21.809,48.756 L21.924,48.756 C22.308,48.756 22.619,48.486 22.619,48.154 L22.619,35.445 ZM30.642,35.445 C30.642,35.112 30.331,34.843 29.947,34.843 L29.832,34.843 C29.449,34.843 29.138,35.112 29.138,35.445 L29.138,48.154 C29.138,48.486 29.449,48.756 29.833,48.756 L29.948,48.756 C30.331,48.756 30.642,48.486 30.642,48.154 L30.642,35.445 ZM37.663,35.445 C37.663,35.112 37.352,34.843 36.968,34.843 L36.853,34.843 C36.469,34.843 36.158,35.112 36.158,35.445 L36.158,48.154 C36.158,48.486 36.469,48.756 36.853,48.756 L36.968,48.756 C37.352,48.756 37.663,48.486 37.663,48.154 L37.663,35.445 ZM45.185,35.445 C45.185,35.112 44.874,34.843 44.489,34.843 L44.375,34.843 C43.991,34.843 43.680,35.112 43.680,35.445 L43.680,48.154 C43.680,48.486 43.991,48.756 44.375,48.756 L44.490,48.756 C44.874,48.756 45.185,48.486 45.185,48.154 L45.185,35.445 ZM52.205,35.445 C52.205,35.112 51.894,34.843 51.510,34.843 L51.395,34.843 C51.012,34.843 50.701,35.112 50.701,35.445 L50.701,48.154 C50.701,48.486 51.012,48.756 51.396,48.756 L51.511,48.756 C51.894,48.756 52.205,48.486 52.205,48.154 L52.205,35.445 ZM50.062,27.934 L48.106,29.984 C47.897,30.193 47.515,30.193 47.253,29.971 C47.043,29.754 47.044,29.372 47.271,29.112 L48.223,28.161 L31.026,28.161 C30.697,28.138 30.423,27.864 30.423,27.558 C30.445,27.229 30.720,26.955 31.026,26.955 L47.728,26.955 L48.193,26.955 L47.254,26.015 C47.037,25.799 47.037,25.411 47.267,25.149 C47.470,24.946 47.858,24.946 48.120,25.176 L50.067,27.123 C50.192,27.248 50.263,27.407 50.263,27.526 C50.263,27.658 50.188,27.835 50.098,27.903 L50.062,27.934 ZM47.244,29.966 C47.247,29.968 47.250,29.969 47.253,29.971 C47.256,29.973 47.256,29.977 47.258,29.979 L47.244,29.966 ZM43.934,23.685 L27.232,23.685 L26.767,23.685 L27.707,24.625 C27.923,24.841 27.923,25.229 27.694,25.492 C27.490,25.694 27.102,25.694 26.840,25.464 L24.893,23.517 C24.768,23.392 24.698,23.233 24.698,23.114 C24.698,22.982 24.772,22.805 24.862,22.737 L24.898,22.706 L26.854,20.657 C27.064,20.447 27.445,20.447 27.707,20.669 C27.917,20.886 27.916,21.268 27.689,21.528 L26.737,22.480 L43.934,22.480 C44.263,22.502 44.537,22.776 44.537,23.082 C44.515,23.411 44.240,23.685 43.934,23.685 ZM27.716,20.674 C27.713,20.672 27.710,20.671 27.707,20.669 C27.705,20.667 27.704,20.663 27.702,20.661 L27.716,20.674 Z"
    var containersServiceSvg="M37.500,75.000 C16.789,75.000 -0.000,58.211 -0.000,37.500 C-0.000,16.789 16.789,-0.000 37.500,-0.000 C58.211,-0.000 75.000,16.789 75.000,37.500 C75.000,58.211 58.211,75.000 37.500,75.000 ZM37.141,19.891 L37.141,19.866 L36.835,19.866 L36.472,20.230 L36.144,21.410 L37.660,19.891 L37.141,19.891 ZM39.058,24.447 L37.507,26.002 L38.356,26.002 L38.749,25.608 L38.748,24.976 L39.058,24.447 ZM39.486,23.167 L39.301,22.502 L36.392,25.418 L36.392,25.849 C36.392,25.933 36.460,26.002 36.545,26.002 L36.658,26.002 L39.486,23.167 ZM39.116,21.836 L38.931,21.171 L35.927,24.181 L36.241,24.717 L39.116,21.836 ZM38.745,20.505 L38.568,19.866 L38.534,19.866 L35.815,22.590 L35.551,23.541 L35.612,23.645 L38.745,20.505 ZM38.286,2.520 L38.286,19.748 L38.657,19.748 L39.717,23.558 L38.867,25.004 L38.867,25.849 C38.867,25.999 38.746,26.120 38.596,26.120 L37.793,26.120 C37.810,26.203 37.866,26.319 38.015,26.467 C38.203,26.656 39.135,27.184 39.135,28.026 C39.135,28.868 38.494,29.481 37.499,29.481 C36.504,29.481 36.165,28.654 36.135,28.270 C36.113,27.974 36.061,27.730 36.032,27.538 C36.003,27.346 35.958,27.154 36.157,27.125 C36.356,27.095 36.547,27.295 36.658,27.634 C36.745,27.899 36.907,28.241 37.233,28.329 C37.483,28.396 37.933,28.366 37.992,27.893 C38.051,27.420 37.539,27.143 37.317,26.920 C37.106,26.709 37.119,26.278 37.132,26.120 L36.545,26.120 C36.395,26.120 36.273,25.998 36.273,25.849 L36.273,25.004 L35.424,23.558 L36.484,19.748 L37.141,19.748 L37.141,2.509 C17.977,2.703 2.500,18.290 2.500,37.500 C2.500,56.830 18.170,72.500 37.500,72.500 C56.830,72.500 72.500,56.830 72.500,37.500 C72.500,18.434 57.252,2.939 38.286,2.520 ZM54.025,51.094 L22.106,51.094 C22.060,51.094 21.969,51.048 21.969,50.956 L21.969,34.743 C21.969,34.697 22.015,34.605 22.106,34.605 L28.735,34.605 C28.780,34.605 28.780,34.605 28.825,34.559 L34.864,29.231 C34.896,29.199 35.496,28.684 35.860,28.370 C35.863,28.402 35.867,28.435 35.870,28.467 C35.892,28.752 36.026,29.093 36.251,29.359 C36.435,29.577 36.674,29.729 36.954,29.819 C36.908,29.821 36.863,29.829 36.817,29.829 C36.726,29.829 36.590,29.783 36.454,29.783 C36.408,29.783 36.363,29.783 36.317,29.829 L31.187,34.329 C31.050,34.421 31.141,34.605 31.277,34.605 L44.036,34.605 C44.172,34.605 44.263,34.421 44.081,34.375 L38.573,29.644 C39.015,29.392 39.303,28.973 39.376,28.457 L46.533,34.559 C46.533,34.605 46.579,34.605 46.624,34.605 L54.070,34.605 C54.116,34.605 54.207,34.697 54.161,34.789 L54.161,50.956 C54.161,51.002 54.116,51.094 54.025,51.094 ZM26.108,38.085 C26.108,37.580 25.818,37.166 25.464,37.166 C25.110,37.166 24.820,37.580 24.820,38.085 L24.820,47.960 C24.820,48.465 25.110,48.878 25.464,48.878 C25.818,48.878 26.108,48.465 26.108,47.960 L26.108,38.085 ZM32.418,38.129 C32.418,37.623 32.128,37.210 31.774,37.210 C31.420,37.210 31.130,37.623 31.130,38.129 L31.130,48.003 C31.130,48.508 31.420,48.922 31.774,48.922 C32.128,48.922 32.418,48.508 32.418,48.003 L32.418,38.129 ZM38.716,38.129 C38.716,37.623 38.426,37.210 38.072,37.210 C37.717,37.210 37.427,37.623 37.427,38.129 L37.427,48.003 C37.427,48.508 37.717,48.922 38.072,48.922 C38.426,48.922 38.716,48.508 38.716,48.003 L38.716,38.129 ZM45.300,38.129 C45.300,37.623 45.010,37.210 44.656,37.210 C44.301,37.210 44.011,37.623 44.011,38.129 L44.011,48.003 C44.011,48.508 44.301,48.922 44.656,48.922 C45.010,48.922 45.300,48.508 45.300,48.003 L45.300,38.129 ZM51.597,38.129 C51.597,37.623 51.307,37.210 50.953,37.210 C50.599,37.210 50.309,37.623 50.309,38.129 L50.309,48.003 C50.309,48.508 50.599,48.922 50.953,48.922 C51.307,48.922 51.597,48.508 51.597,48.003 L51.597,38.129 Z";
    var charteringSvg = "M37.500,75.000 C16.789,75.000 -0.000,58.211 -0.000,37.500 C-0.000,16.789 16.789,-0.000 37.500,-0.000 C58.211,-0.000 75.000,16.789 75.000,37.500 C75.000,58.211 58.211,75.000 37.500,75.000 ZM37.500,2.500 C18.170,2.500 2.500,18.170 2.500,37.500 C2.500,56.830 18.170,72.500 37.500,72.500 C56.830,72.500 72.500,56.830 72.500,37.500 C72.500,18.170 56.830,2.500 37.500,2.500 ZM50.264,53.537 C50.264,54.586 49.411,55.441 48.363,55.444 L31.212,55.447 L31.211,55.447 C30.162,55.447 29.308,54.594 29.307,53.546 L29.306,49.609 C25.757,48.828 23.589,46.404 23.588,43.128 L23.587,42.175 L22.635,42.177 C21.059,42.177 19.778,40.896 19.777,39.322 C19.777,38.910 19.777,38.722 22.632,31.344 L22.631,30.748 C22.630,26.682 24.215,22.856 27.097,19.973 C29.977,17.090 33.802,15.501 37.867,15.500 C46.274,15.500 53.111,22.334 53.113,30.735 C53.115,33.944 52.129,37.003 50.259,39.604 L50.264,53.537 ZM51.132,30.734 C51.129,23.426 45.182,17.481 37.874,17.481 C34.333,17.482 31.006,18.864 28.499,21.372 C25.993,23.880 24.613,27.209 24.614,30.745 L24.615,31.527 C24.615,31.650 24.592,31.770 24.548,31.885 C23.891,33.580 21.914,38.687 21.760,39.346 C21.777,39.819 22.162,40.192 22.633,40.192 L24.578,40.192 L24.578,40.193 C24.841,40.193 25.093,40.298 25.279,40.483 C25.466,40.669 25.570,40.921 25.570,41.184 L25.570,43.129 C25.572,46.737 28.971,47.596 30.432,47.798 C30.922,47.865 31.288,48.284 31.288,48.778 L31.289,53.464 L48.281,53.459 L48.275,39.277 C48.275,39.063 48.345,38.853 48.475,38.681 C50.214,36.370 51.132,33.622 51.132,30.734 ZM41.864,33.875 C41.606,34.133 41.189,34.132 40.930,33.875 L38.162,31.107 L35.035,34.234 C34.777,34.493 34.359,34.493 34.101,34.234 L32.950,33.084 L30.183,35.852 C30.054,35.981 29.885,36.045 29.715,36.045 C29.546,36.045 29.377,35.981 29.248,35.852 C28.990,35.593 28.990,35.176 29.248,34.917 L32.483,31.682 C32.742,31.424 33.159,31.424 33.418,31.682 L34.568,32.833 L37.695,29.705 C37.954,29.447 38.371,29.448 38.630,29.705 L41.397,32.473 L45.692,28.178 C45.951,27.919 46.368,27.919 46.626,28.178 C46.884,28.436 46.884,28.854 46.626,29.112 L41.864,33.875 ZM43.264,27.390 L43.264,28.005 C43.264,28.370 42.968,28.666 42.603,28.666 C42.238,28.666 41.942,28.370 41.942,28.005 L41.942,27.390 C41.141,27.114 40.560,26.360 40.560,25.467 C40.560,24.341 41.476,23.424 42.603,23.424 C43.729,23.424 44.646,24.340 44.646,25.467 C44.646,26.360 44.065,27.113 43.264,27.390 ZM42.603,24.746 C42.205,24.746 41.882,25.069 41.882,25.467 C41.882,25.864 42.205,26.188 42.603,26.188 C43.001,26.188 43.324,25.864 43.324,25.467 C43.324,25.069 43.000,24.746 42.603,24.746 ZM35.423,29.888 L35.423,30.504 C35.423,30.868 35.127,31.165 34.762,31.165 C34.397,31.165 34.101,30.868 34.101,30.504 L34.101,29.888 C33.300,29.612 32.719,28.858 32.719,27.965 C32.719,26.839 33.635,25.922 34.762,25.922 C35.888,25.922 36.805,26.838 36.805,27.965 C36.805,28.859 36.224,29.612 35.423,29.888 ZM34.762,27.244 C34.364,27.244 34.041,27.567 34.041,27.965 C34.041,28.363 34.364,28.686 34.762,28.686 C35.160,28.686 35.483,28.362 35.483,27.965 C35.483,27.568 35.159,27.244 34.762,27.244 Z"

    var agencyContent = ["Harbour and Customs formalities","Ordering: Pilots, Berths, Tugboats, Shifting","Customs clearance in & out","Crew change in/off, transport to/from airports, hotel booking, crew support and assistance..."]
    var portContent = ["Peninsular Port Services manages the loading and unloading all types of cargo, being especially proficient and experienced in:","Bulk cargos: wood pellets, pine bark, expanded clay, salt, quicklime, waste wood","Steel products: wric, steel mesh , steel coils, plates, profiles, pipes, merchant  bars","Timber products: pallets ship boards, wood pulp","Project cargos: concrete parts, special steel projects"]
    var solutionsContent = ["Cargo insurance","Covered and uncovered storage","Road transport and barge transport","Customs clearance, transport documents, local regulations compliance","Draft surveyor","Load / offload supervision","Cargo inspections","Lashing and security cargos"];
    var containersContent = ["Export & Import","Full Container Loads (FCL), Less-than-Container Loads (LCL), Flat-rack, Open-top, ISO container, Flexi-tanks, ...","Door-to-door service, inland operations, ...","Operations monitoring","Cargo consolidation","Hazardous materials handling"]
    var charteringContent = ["Direct communication with ship owners","Fast response times","Special concern on cost control","Sea freight to Portugal an ex-Portugal","Full and part charter","Transhipment to barges"];

    var contentArr;
    var servicesArr;    
    var titlesArr = ["AGENCY SERVICES","PORT SERVICES","SOLUTIONS","CONTAINER SERVICES","CHARTERING DEPARTMENT"]

    var containerIcons;
    var containerIconsWidth = 0;
    var containerContent;
    var containerImageService;
    var nav = 2;
    var iconWidth=75;
    var marginWidth = 50;
    var margin = 100;
    var lineShape;
    var instanceDispatch;
    var assets;
    var aspectRatio;
    var overNav;

    var p = createjs.extend(Services, createjs.Container);

    p.setup = function() {

        instance = this;
        instanceDispatch = this.istancetoDispatch;
        ratio = this.ratio;
        assets = this.iassets
        aspectRatio = this.iaspectRatio;

        bgServices = new createjs.Shape();
        lineShape = new createjs.Shape();
        instance.addChild(bgServices);
        
        servicesArr = [agencyServicesSvg,portServicesSvg,solutionsSvg,containersServiceSvg,charteringSvg]
        contentArr = [agencyContent,portContent,solutionsContent,containersContent,charteringContent];

        containerImageService = new createjs.Container();
        containerImageService.alpha = 0.7
        instance.addChild(containerImageService);

        maskImageService = new createjs.Shape();
        instance.addChild(maskImageService);
        containerImageService.mask = maskImageService;

        titleField = new createjs.Text();
        titleField.font = "bold 32px PT Serif";
        titleField.color = "#143483";
        titleField.text = "What we Do";
        titleField.textAlign = "center"
        titleField.scaleX = ratio;
        titleField.scaleY = ratio;
        titleField.x = stage.canvas.width/2;
        titleField.y = -10*ratio+margin*ratio;
        instance.addChild(titleField);

        subtitleField = new createjs.Text();
        subtitleField.font = "bold 12px PT Sans";
        subtitleField.alpha = 0.5
        subtitleField.color = "#143483";
        subtitleField.text = "OUR SERVICES";
        subtitleField.textAlign = "center"
        subtitleField.scaleX = ratio
        subtitleField.scaleY = ratio
        subtitleField.x = stage.canvas.width/2
        subtitleField.y = titleField.y + titleField.getBounds().height*ratio+12*ratio
        instance.addChild(subtitleField);

        containerIcons = new createjs.Container()
        instance.addChild(containerIcons);

        for(var i=0;i<titlesArr.length;i++){
            
            var icon = new createSvg(servicesArr[i],"#143483");
            icon.name = "icon"+i
            icon.regX = iconWidth/2
            icon.regY = iconWidth/2
            containerIcons.addChild(icon);
            
            if(i!=nav){
               icon.scaleX= 1*ratio
               icon.scaleY= 1*ratio
               icon.alpha = 0.3;
            }else{
               icon.scaleX=1.5*ratio
               icon.scaleY=1.5*ratio
            }

            var boundBox = new createjs.Shape();
            boundBox.alpha = 0.01
            boundBox.instance = i;
            boundBox.name = "boundBox"+i
            boundBox.graphics.beginFill("#000000").drawCircle(0, 0, iconWidth);
            containerIcons.addChild(boundBox);
            boundBox.scaleX = ratio
            boundBox.scaleY = ratio

            boundBox.cursor = "pointer"
            boundBox.addEventListener("mouseover", handlerOverIcon);
            boundBox.addEventListener("mouseout", handlerOutIcon);
            boundBox.addEventListener("click", handlerClickIcon); 
        }

        for(var i=0;i<titlesArr.length;i++){
            containerIcons.getChildByName("icon"+i).x += i*(marginWidth*ratio+margin*ratio);
            containerIcons.getChildByName("boundBox"+i).x += i*(marginWidth*ratio+margin*ratio);
            containerIconsWidth = i*(marginWidth*ratio+margin*ratio)
        }

        containerIcons.x = stage.canvas.width/2 -containerIconsWidth/2
        containerIcons.y = subtitleField.y+subtitleField.getBounds().height*ratio+iconWidth/2*ratio-20*ratio+margin*ratio
        
        menuTitleField = new createjs.Text();
        menuTitleField.font = "bold 22px PT Serif";
        menuTitleField.color = "#143483";
        menuTitleField.textAlign = "center"
        menuTitleField.scaleX = ratio
        menuTitleField.scaleY = ratio
        menuTitleField.text = titlesArr[nav];
        menuTitleField.x = stage.canvas.width/2
        menuTitleField.y = containerIcons.y+(iconWidth/2)*ratio+12*ratio+(margin/2)*ratio
        instance.addChild(menuTitleField);

        createContent();
    };

    function createContent(){

        if(containerContent){
            for (var i=0;i<contentArr[nav].length;i++){
                containerContent.removeChild(containerContent.getChildByName("lineContent"+i));
                containerContent.removeChild(containerContent.getChildByName("contentText"+i));
            }
            
            instance.removeChild(containerContent)
        }

        containerContent = new createjs.Container();
        instance.addChild(containerContent)

        if(lineShape)lineShape.graphics.clear();
        lineShape.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width-(margin*2)*ratio,1);
        containerContent.addChild(lineShape)
        lineShape.alpha=0.5

        containerContent.x = margin*ratio;
        containerContent.y = menuTitleField.y+menuTitleField.getBounds().height*ratio+(margin/2)*ratio;

        for (var i=0;i<contentArr[nav].length;i++){

            var contentText = new createjs.Text();
            contentText.name = "contentText"+i
            contentText.font = "Bold 14px PT Sans";
            contentText.color = "#143483";
            contentText.textAlign = "center"
            contentText.scaleX = ratio;
            contentText.scaleY = ratio;
            contentText.text = contentArr[nav][i];
            contentText.x = stage.canvas.width/2-margin*ratio
            contentText.y = 20*ratio+i*(50*ratio)
            contentText.alpha = 0.5;
            containerContent.addChild(contentText);
            contentText.alpha = 0;
            createjs.Tween.get(contentText)
            .wait(400)
            .to({alpha:1}, 400*i, createjs.Ease.circInOut)

            var lineContent = new createjs.Shape();
            lineContent.name = "lineContent"+i
            lineContent.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width-(margin*2)*ratio,1);
            lineContent.y = 50*ratio+i*(50*ratio)
            containerContent.addChild(lineContent)
            lineContent.alpha=0.5
            lineContent.scaleX = 0;
            createjs.Tween.get(lineContent).to({scaleX:1}, 400*i, createjs.Ease.circInOut)
        }

        bgHeight = containerContent.y+i*50*ratio+margin*ratio;
        if(bgServices)bgServices.graphics.clear();
        bgServices.graphics.beginFill("#F4F6F9").drawRect(0, 0, stage.canvas.width,bgHeight);

    }

    function handlerOverIcon(event){
        if(event.target.instance!=nav){

            overNav = event.target.instance;
            containerIcons.getChildByName("icon"+nav).alpha = 0.25
            createjs.Tween.get(containerIcons.getChildByName("icon"+event.target.instance)).to({alpha:1,scaleX:1.5*ratio,scaleY:1.5*ratio}, 200, createjs.Ease.circInOut)
            menuTitleField.alpha = 0;
            createjs.Tween.get(menuTitleField).to({alpha:1}, 600, createjs.Ease.circInOut)
            menuTitleField.textAlign = "center";
            menuTitleField.text = titlesArr[event.target.instance];
            menuTitleField.x = stage.canvas.width/2
            menuTitleField.y = containerIcons.y+(iconWidth/2)*ratio+12*ratio+(margin/2)*ratio

            if(containerContent){
                for (var i=0;i<contentArr[nav].length;i++){
                    containerContent.removeChild(containerContent.getChildByName("lineContent"+i));
                    containerContent.removeChild(containerContent.getChildByName("contentText"+i));
                }
                instance.removeChild(containerContent)
            }

            maskImageService.graphics.drawRect(0, 0, stage.canvas.width,bgHeight);

            containerImageService.addChild(assets[overNav]);
            aspectRatio.resize(containerImageService,1920,960)

            containerImageService.y = bgHeight;
            createjs.Tween.get(containerImageService).to({y:bgHeight/4}, 500, createjs.Ease.circInOut)
        }
    }

    function handlerOutIcon(event){
        
        if(event.target.instance!=nav){
            containerIcons.getChildByName("icon"+nav).alpha = 1
            createjs.Tween.get(containerIcons.getChildByName("icon"+event.target.instance)).to({alpha:0.25,scaleX:1*ratio,scaleY:1*ratio}, 200, createjs.Ease.circInOut)
            maskImageService.graphics.clear();
            containerImageService.removeChild(assets[overNav]);
            menuTitleField.textAlign = "center";
            menuTitleField.text = titlesArr[nav];
            menuTitleField.x = stage.canvas.width/2
            menuTitleField.y = containerIcons.y+(iconWidth/2)*ratio+12*ratio+(margin/2)*ratio
            createContent();

        }
    }


    function handlerClickIcon(event){
       
        if(event.target.instance!=nav){

            menuTitleField.textAlign = "center";
            menuTitleField.x = stage.canvas.width/2
            menuTitleField.y = containerIcons.y+(iconWidth/2)*ratio+12*ratio+(margin/2)*ratio

            createjs.Tween.get(containerIcons.getChildByName("icon"+nav)).to({alpha:0.25,scaleX:1*ratio,scaleY:1*ratio}, 200, createjs.Ease.circInOut)
            nav = event.target.instance

            maskImageService.graphics.clear();
            containerImageService.removeChild(assets[overNav]);

            createContent();

            var customEvent = new createjs.Event("servicesNavPosition");
            customEvent.yPos = subtitleField.y+subtitleField.getBounds().height+margin/4*ratio;
            instanceDispatch.dispatchEvent(customEvent);

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

    p.resize = function (){
        
        aspectRatio.resize(containerImageService,1920,1080)

        containerIcons.x = stage.canvas.width/2 -containerIconsWidth/2
        containerIcons.y = subtitleField.y+subtitleField.getBounds().height*ratio+iconWidth/2*ratio-20*ratio+margin*ratio

        titleField.x = stage.canvas.width/2
        titleField.y = -10*ratio+margin*ratio;

        subtitleField.x = stage.canvas.width/2
        subtitleField.y = titleField.y + titleField.getBounds().height*ratio+12*ratio

        menuTitleField.x = stage.canvas.width/2
        menuTitleField.y = containerIcons.y+(iconWidth/2)*ratio+12*ratio+(margin/2)*ratio

        lineShape.graphics.clear();
        lineShape.graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width-(margin*2)*ratio,1);

         for (var i=0;i<contentArr[nav].length;i++){
           containerContent.getChildByName("lineContent"+i).graphics.clear();
           containerContent.getChildByName("lineContent"+i).graphics.beginFill("#143483").drawRect(0, 0, stage.canvas.width-(margin*2)*ratio,1);
           containerContent.getChildByName("contentText"+i).x = stage.canvas.width/2-margin*ratio
        }

        containerContent.x = margin*ratio;
        containerContent.y = menuTitleField.y+menuTitleField.getBounds().height*ratio+(margin/2)*ratio;

        bgHeight = containerContent.y+i*50*ratio+margin*ratio;
        bgServices.graphics.clear();
        bgServices.graphics.beginFill("#F4F6F9").drawRect(0, 0, stage.canvas.width,bgHeight);
       
    }

    p.getHeight = function (){
       return bgHeight;
    } 

window.Services = createjs.promote(Services, "Container");
}());