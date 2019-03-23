function Spage9 () {
    this.name = 'd';
    this.rendered=false;
    this.html = '<div class="swiper-slide">' +
        '<div class="hidden"></div>' +
        '<div class="img-box d">' +
        '<img src="images/spe9/bg.jpeg" class="">' +
        '<div class="chartBox" id="bar3d-adults" style="width:60%;height:56%;top:28%;"></div>'+
        '<div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div>'+
        '</div>' +
        '</div>'
}
Spage9.prototype.currentPageAction = function () {
    var _this = this;
    if (_this.rendered) return;
    $('#bar3d-adults').next('.sk-spinner').css('display', 'block');
    let myChart = echarts.init(document.getElementById('bar3d-adults'));
    let geoCoordMap = {
        "阜新": [121.676407, 42.028022],
        "保山": [99.177276, 25.139039],
        "白城": [122.845587, 45.625506],
        "晋城": [112.858577, 35.496284],
        "临沧": [100.095443, 23.890468],
        "沧州": [116.84558, 38.310215],
        "乌海": [106.800395, 39.662006],
        "石河子": [86.08689, 44.311975],
        "通辽": [122.250523, 43.65798],
        "昌吉回族自治州": [87.314999, 44.016853],
        "峨眉山": [103.356274, 29.574322],
        "红河哈尼族彝族自治州": [103.38215, 23.369914],
        "自贡": [104.784445, 29.345585],
        "长春": [125.330606, 43.821954],
        "图木舒克": [79.075615, 39.87121],
        "包头": [109.84654, 40.662929],
        "张家界": [110.485532, 29.122817],
        "四平": [124.356483, 43.171995],
        "池州": [117.498424, 30.670885],
        "通化": [125.94661, 41.733816],
        "鹤岗": [130.304433, 47.356056],
        "辽阳": [123.243366, 41.274162],
        "日喀则": [88.893699, 29.275658],
        "楚雄彝族自治州": [101.534412, 25.051773],
        "焦作": [113.248549, 35.220964],
        "佳木斯": [130.327358, 46.805691],
        "潜江": [112.905477, 30.408357],
        "伊犁": [81.330697, 43.922815],
        "淮北": [116.804536, 33.961657],
        "玉溪": [102.553557, 24.35771],
        "东方": [108.658567, 19.101105],
        "阿拉善盟": [105.735373, 38.858277],
        "宁德": [119.55451, 26.672242],
        "白沙黎族自治县": [109.458142, 19.231702],
        "营口": [122.241575, 40.673138],
        "亳州": [115.784466, 33.850642],
        "锦州": [121.132599, 41.100933],
        "锡林郭勒盟": [116.054388, 43.939424],
        "塔城地区": [82.987233, 46.750947],
        "玉林": [110.188453, 22.659831],
        "资阳": [104.634437, 30.134956],
        "阿里地区": [80.112781, 32.506866],
        "蚌埠": [117.395514, 32.921523],
        "呼伦贝尔": [119.772367, 49.218446],
        "神农架林区": [110.682522, 31.750497],
        "琼海": [110.480547, 19.264255],
        "黔南布依族苗族自治州": [107.528663, 26.260586],
        "五家渠": [87.549933, 44.172445],
        "晋中": [112.759593, 37.692841],
        "天津": [117.20952, 39.093669],
        "黔东南苗族侗族自治州": [107.990602, 26.589858],
        "呼和浩特": [111.755512, 40.848422],
        "乌鲁木齐": [87.624438, 43.830763],
        "绵阳": [104.68556, 31.473663],
        "铁岭": [123.732367, 42.22995],
        "淄博": [118.061455, 36.819085],
        "日照": [119.533418, 35.422839],
        "山南": [91.778679, 29.243027],
        "唐山": [118.186463, 39.636585],
        "大兴安岭地区": [124.59866, 51.92993],
        "连云港": [119.228623, 34.602249],
        "曲靖": [103.802436, 25.496407],
        "德阳": [104.404417, 31.133116],
        "天门": [113.172409, 30.669621],
        "淮南": [117.006386, 32.631847],
        "盐城": [120.167541, 33.355101],
        "雅安": [103.049539, 30.016792],
        "广安": [106.639554, 30.461747],
        "三亚": [109.51856, 18.258736],
        "迪庆藏族自治州": [99.70948, 27.825264],
        "朔州": [112.439374, 39.33711],
        "临高县": [109.69744, 19.919475],
        "博尔塔拉蒙古自治州": [82.073064, 44.912168],
        "乌兰察布": [113.139468, 41.00075],
        "哈密": [93.521212, 42.825826],
        "白银": [104.144447, 36.550827],
        "普洱": [100.981653, 22.805256],
        "铜陵": [117.818481, 30.951233],
        "常州": [119.981484, 31.815796],
        "抚顺": [123.964373, 41.885968],
        "乐东黎族自治县": [109.180119, 18.755925],
        "琼中黎族苗族自治县": [109.844902, 19.039198],
        "沈阳": [123.455986, 41.720915],
        "承德": [117.969396, 40.957856],
        "湖州": [120.094518, 30.898964],
        "儋州": [109.58746, 19.527145],
        "阿勒泰地区": [88.147926, 47.850729],
        "德宏傣族景颇族自治州": [98.591419, 24.438031],
        "丹东": [124.36155, 40.006408],
        "大理白族自治州": [100.274583, 25.612129],
        "嘉峪关": [98.2962, 39.777961],
        "成都": [104.08153, 30.655823],
        "达州": [107.474592, 31.214307],
        "株洲": [113.140474, 27.833568],
        "阿拉尔": [81.287351, 40.553264],
        "泸州": [105.448526, 28.877668],
        "大连": [121.621628, 38.918953],
        "巴彦淖尔": [107.3944, 40.749358],
        "南充": [106.117504, 30.843783],
        "兰州": [103.840524, 36.067235],
        "宣城": [118.765537, 30.946601],
        "襄阳": [112.128533, 32.014797],
        "兴安盟": [122.044361, 46.088464],
        "赤峰": [118.895522, 42.261688],
        "广元": [105.850419, 32.441617],
        "邢台": [114.511459, 37.076685],
        "益阳": [112.361517, 28.559712],
        "宿迁": [118.281575, 33.96775],
        "克孜勒苏柯尔克孜自治州": [76.173127, 39.721257],
        "那曲地区": [91.13444, 29.673397],
        "安康": [109.035604, 32.690513],
        "昌江黎族自治县": [109.062055, 19.304371],
        "廊坊": [116.690577, 39.543367],
        "白山": [126.429628, 41.939629],
        "泰州": [119.929571, 32.460675],
        "遂宁": [105.599424, 30.539097],
        "昌都": [97.171919, 31.151102],
        "南京": [118.802422, 32.064652],
        "鹰潭": [117.075573, 28.265787],
        "南平": [118.18437, 26.647772],
        "保亭黎族苗族自治县": [109.709086, 18.645177],
        "周口": [114.703481, 33.631829],
        "七台河": [131.011544, 45.7763],
        "昭通": [103.72351, 27.344083],
        "黔西南布依族苗族自治州": [104.910858, 25.095974],
        "南阳": [112.534504, 32.996561],
        "六盘水": [104.837553, 26.598834],
        "鸡西": [130.97562, 45.300874],
        "延边朝鲜族自治州": [129.515602, 42.897211],
        "巴音郭楞蒙古自治州": [86.151584, 41.770226],
        "景德镇": [117.184574, 29.274248],
        "赣州": [114.940508, 25.835176],
        "大同": [113.306436, 40.08247],
        "济源": [112.608578, 35.072908],
        "昆明": [102.852451, 24.873998],
        "十堰": [110.804529, 32.635063],
        "郑州": [113.631416, 34.75344],
        "陵水黎族自治县": [110.043664, 18.51229],
        "信阳": [114.097484, 32.153014],
        "贵阳": [106.63658, 26.653324],
        "铜仁": [109.187436, 27.696773],
        "吉林": [126.555634, 43.843566],
        "伊春": [128.847544, 47.733319],
        "保定": [115.47146, 38.879989],
        "澄迈县": [110.013508, 19.74435],
        "鞍山": [123.001371, 41.115052],
        "镇江": [119.43049, 32.194717],
        "娄底": [112.001503, 27.703208],
        "定西": [104.632416, 35.586834],
        "长治": [113.122562, 36.201267],
        "安顺": [105.954416, 26.259253],
        "吕梁": [111.150449, 37.524499],
        "湘潭": [112.950464, 27.835703],
        "双鸭山": [131.165342, 46.653185],
        "驻马店": [114.028467, 33.017842],
        "枣庄": [117.330539, 34.815994],
        "本溪": [123.69251, 41.492915],
        "武威": [102.644556, 37.934378],
        "天水": [105.731421, 34.587412],
        "宜宾": [104.649403, 28.758007],
        "上海": [121.48054, 31.235929],
        "鄂尔多斯": [109.787441, 39.614483],
        "文昌": [110.804511, 19.549062],
        "安阳": [114.399503, 36.10594],
        "丽水": [119.929571, 28.473278],
        "辽源": [125.150423, 42.894055],
        "乐山": [103.77254, 29.55794],
        "常德": [111.705449, 29.03775],
        "屯昌县": [110.108576, 19.357376],
        "湘西土家族苗族自治州": [109.745507, 28.317399],
        "宜昌": [111.292552, 30.697446],
        "临汾": [111.525527, 36.093743],
        "齐齐哈尔": [123.924569, 47.359978],
        "开封": [114.314595, 34.802885],
        "张家口": [114.892574, 40.773238],
        "牡丹江": [129.639544, 44.556247],
        "徐州": [117.290574, 34.212666],
        "苏州": [120.592412, 31.303565],
        "新乡": [113.933597, 35.30964],
        "海南藏族自治州": [100.62662, 36.292103],
        "五指山": [109.523537, 18.780994],
        "永州": [111.619454, 26.425864],
        "岳阳": [113.135488, 29.363177],
        "扬州": [119.419423, 32.400676],
        "盘锦": [122.077491, 41.125874],
        "商洛": [109.924415, 33.878633],
        "定安县": [110.365536, 19.68712],
        "渭南": [109.516593, 34.505715],
        "滁州": [118.339408, 32.261271],
        "松原": [124.83148, 45.147403],
        "汉中": [107.029427, 33.0738],
        "潮州": [116.629466, 23.662623],
        "济南": [117.126399, 36.656554],
        "阜阳": [115.820434, 32.896062],
        "忻州": [112.74062, 38.422382],
        "毕节": [105.29859, 27.290214],
        "鄂州": [114.901611, 30.396571],
        "南昌": [115.864585, 28.689455],
        "抚州": [116.364537, 27.954893],
        "衡阳": [112.578449, 26.899575],
        "金昌": [102.194603, 38.525821],
        "丽江": [100.232462, 26.860657],
        "孝感": [113.922512, 30.93069],
        "福州": [119.30347, 26.080429],
        "合肥": [117.233441, 31.826578],
        "遵义": [106.933426, 27.731701],
        "陇南": [104.928578, 33.406621],
        "汕尾": [115.381549, 22.791262],
        "漯河": [114.023419, 33.58771],
        "许昌": [113.858472, 34.041433],
        "衢州": [118.866597, 28.975546],
        "济宁": [116.593614, 35.420177],
        "咸宁": [114.328519, 29.847056],
        "上饶": [117.949463, 28.460626],
        "揭阳": [116.378515, 23.555741],
        "舟山": [122.213557, 29.990911],
        "葫芦岛": [120.843399, 40.717363],
        "海东": [102.110441, 36.508512],
        "咸阳": [108.715421, 34.335476],
        "三门峡": [111.20653, 34.778326],
        "芜湖": [118.439435, 31.358537],
        "泰安": [117.094492, 36.205857],
        "温州": [120.706479, 28.001086],
        "荆州": [112.245519, 30.340843],
        "重庆": [106.558437, 29.568996],
        "运城": [111.013385, 35.032706],
        "韶关": [113.603524, 24.81588],
        "烟台": [121.454417, 37.47004],
        "龙岩": [117.023445, 25.08122],
        "武汉": [114.311586, 30.598467],
        "仙桃": [113.461591, 30.368271],
        "石家庄": [114.521529, 38.048312],
        "荆门": [112.206389, 31.041733],
        "阿克苏地区": [80.266939, 41.175029],
        "西双版纳傣族自治州": [100.803836, 22.013792],
        "阿坝藏族羌族自治州": [102.231186, 31.905609],
        "长沙": [112.94547, 28.23489],
        "平顶山": [113.199529, 33.77205],
        "杭州": [120.21551, 30.253082],
        "文山壮族苗族自治州": [104.221606, 23.404187],
        "宿州": [116.970543, 33.652096],
        "绍兴": [120.585477, 30.03637],
        "台州": [121.427432, 28.662193],
        "马鞍山": [118.513581, 31.676265],
        "茂名": [110.931541, 21.669064],
        "厦门": [118.096435, 24.485408],
        "怀化": [110.008514, 27.575161],
        "九江": [116.007533, 29.71134],
        "北京": [116.413387, 39.910924],
        "西宁": [101.784446, 36.623385],
        "酒泉": [98.500681, 39.738468],
        "濮阳": [115.035593, 35.767593],
        "黄山": [118.168089, 30.13039],
        "恩施土家族苗族自治州": [109.494763, 30.277908],
        "攀枝花": [101.725544, 26.588034],
        "临沂": [118.363537, 35.110672],
        "喀什地区": [75.996395, 39.476098],
        "无锡": [120.318582, 31.49881],
        "黄冈": [114.878489, 30.459359],
        "张掖": [100.456409, 38.932065],
        "拉萨": [91.120823, 29.65004],
        "秦皇岛": [119.608534, 39.941747],
        "怒江傈僳族自治州": [98.863189, 25.823736],
        "平凉": [106.671444, 35.549232],
        "梅州": [116.129541, 24.294177],
        "西安": [108.946465, 34.347269],
        "凉山彝族自治州": [102.273502, 27.887752],
        "郴州": [113.021458, 25.776683],
        "惠州": [114.42356, 23.116359],
        "商丘": [115.662449, 34.420202],
        "吐鲁番": [89.197299, 42.956984],
        "衡水": [115.675402, 37.745191],
        "阳泉": [113.587615, 37.862362],
        "萍乡": [113.861499, 27.628393],
        "石嘴山": [106.390597, 38.989683],
        "滨州": [117.9774, 37.388197],
        "洛阳": [112.459424, 34.624264],
        "黄石": [115.045529, 30.205208],
        "六安": [116.526412, 31.741452],
        "内江": [105.064591, 29.585886],
        "三明": [117.645521, 26.269736],
        "巴中": [106.751582, 31.872889],
        "东营": [118.588463, 37.454848],
        "莆田": [119.014521, 25.459865],
        "汕头": [116.688529, 23.359091],
        "太原": [112.556396, 37.87699],
        "金华": [119.653441, 29.08464],
        "青岛": [120.389458, 36.072227],
        "铜川": [108.952403, 34.902638],
        "吉安": [115.000514, 27.119727],
        "随州": [113.389448, 31.696516],
        "清远": [113.062465, 23.688229],
        "邵阳": [111.474432, 27.245271],
        "克拉玛依": [84.895898, 45.585674],
        "榆林": [109.741618, 38.290882],
        "泉州": [118.682444, 24.879952],
        "宜春": [114.42356, 27.820856],
        "崇左": [107.37152, 22.383117],
        "朝阳": [120.457496, 41.579822],
        "黑河": [127.535487, 50.251273],
        "肇庆": [112.471488, 23.052889],
        "甘孜藏族自治州": [101.968545, 30.055278],
        "新余": [114.923539, 27.823579],
        "海北藏族自治州": [100.90743, 36.960664],
        "河源": [114.707442, 23.749685],
        "大庆": [125.108661, 46.593635],
        "宁波": [121.628572, 29.866034],
        "银川": [106.238496, 38.492462],
        "防城港": [108.36042, 21.693005],
        "佛山": [113.128509, 23.027759],
        "菏泽": [115.487549, 35.239408],
        "哈尔滨": [126.541611, 45.808824],
        "延安": [109.496579, 36.591112],
        "中卫": [105.203568, 37.5057],
        "鹤壁": [114.303591, 35.752359],
        "宝鸡": [107.244572, 34.368915],
        "漳州": [117.653579, 24.51893],
        "聊城": [115.991588, 36.462759],
        "德州": [116.365553, 37.441308],
        "珠海": [113.582557, 22.276564],
        "中山": [113.39942, 22.522314],
        "嘉兴": [120.763549, 30.750974],
        "和田地区": [79.928511, 37.120447],
        "安庆": [117.063608, 30.530957],
        "庆阳": [107.649384, 35.715216],
        "广州": [113.271429, 23.135336],
        "桂林": [110.203545, 25.242887],
        "深圳": [114.064552, 22.548456],
        "江门": [113.088552, 22.584604],
        "海西蒙古族藏族自治州": [97.377823, 37.382839],
        "莱芜": [117.666591, 36.208841],
        "邯郸": [114.54563, 36.631263],
        "贵港": [109.605516, 23.117448],
        "潍坊": [119.168374, 36.71265],
        "东莞": [113.758418, 23.027308],
        "北海": [109.126531, 21.486836],
        "甘南藏族自治州": [102.917587, 34.989139],
        "吴忠": [106.205367, 38.003713],
        "南通": [120.901591, 31.986549],
        "威海": [122.127545, 37.516431],
        "绥化": [126.975358, 46.660032],
        "固原": [106.248575, 36.021619],
        "南宁": [108.373454, 22.822607],
        "林芝": [94.368054, 29.654042],
        "果洛藏族自治州": [100.251596, 34.477193],
        "海口": [110.325526, 20.04405],
        "钦州": [108.66058, 21.986593],
        "贺州": [111.573524, 24.40945],
        "淮安": [119.021483, 33.616295],
        "柳州": [109.434425, 24.331961],
        "河池": [108.091503, 24.698912],
        "来宾": [109.227455, 23.756546],
        "湛江": [110.365554, 21.276724],
        "梧州": [111.285518, 23.482746],
        "黄南藏族自治州": [102.022425, 35.525804],
        "云浮": [112.051512, 22.920911],
        "百色": [106.624588, 23.908187],
        "阳江": [111.988487, 21.864339],
        "玉树藏族自治州": [97.013177, 33.01098],
        "临夏回族自治州": [103.21639, 35.607562]
    };

    var alirl = [
        [
            [121.15, 31.89],
            [109.781327, 39.608266]
        ],
        [
            [120.38, 37.35],
            [122.207216, 29.985295]
        ],
        [
            [123.97, 47.33],
            [120.13, 33.38]
        ],
        [
            [118.87, 42.28],
            [120.33, 36.07]
        ],
        [
            [121.52, 36.89],
            [117.93, 40.97]
        ],
        [
            [102.188043, 38.520089],
            [122.1, 37.5]
        ],
        [
            [118.58, 24.93],
            [101.718637, 26.582347]
        ],
        [
            [120.53, 36.86],
            [121.48, 31.22]
        ],
        [
            [119.46, 35.42],
            [122.05, 37.2]
        ],
        [
            [119.97, 35.88],
            [116.1, 24.55]
        ],
        [
            [121.05, 32.08],
            [112.02, 22.93]
        ],
        [
            [91.11, 29.97],
            [118.1, 24.46]
        ]
    ]
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        // console.log(res)
        return res;
    };
    var option = {
        title: {
            text: '',
            x: 'left',
            top: "10",
            textStyle: {
                color: '#000',
                fontSize: 14
            }
        },
        tooltip: {
            show: true,
            formatter: (params) => {
                let data = params.name + "<br/>" + (params.value[2] / 100).toFixed(2) + "%<br/>";
                return data;
            },
        },
        visualMap: [{
            type: 'continuous',
            seriesIndex: 0,
            calculable: true,
            max: 120,
            inRange: {
                color: ['#892bec', '#2b6eec', '#07a4e2', '#1ae677', '#e0ff40', '#eca12b', '#ec2b2b']
            },
            formatter: function (d) {
                if (d >= 120) {
                    return (d / 100).toFixed(2) + '%以上'
                } else {
                    return (d / 100).toFixed(2) + '%'

                }
            }
        }],
        geo3D: {
            map: 'china',
            roam: true,
            regionHeight: 1,
            itemStyle: {
                areaColor: '#1d5e98',
                opacity: 1,
                borderWidth: 0.4,
                borderColor: '#000'
            },
            boxWidth:140,
            boxHeight:15,
            label: {
                show: true,
                textStyle: {
                    color: '#000', //地图初始化区域字体颜色
                    fontSize: 8,
                    opacity: 1,
                    backgroundColor: 'rgba(0,23,11,0)'
                },
            },
            emphasis: { //当鼠标放上去  地区区域是否显示名称
                label: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 3,
                        backgroundColor: 'rgba(0,23,11,0)'
                    }
                }
            },
            //shading: 'lambert',
            light: { //光照阴影
                main: {
                    color: '#fff', //光照颜色
                    intensity: 1.2, //光照强度
                    //shadowQuality: 'high', //阴影亮度
                    shadow: false, //是否显示阴影
                    alpha: 55,
                    beta: 10

                },
                ambient: {
                    intensity: 0.3
                }
            }
        },
        series: [
            //柱状图
            {
                name: 'bar3D',
                type: "bar3D",
                coordinateSystem: 'geo3D',
                barSize: 1, //柱子粗细
                shading: 'lambert',
                opacity: 1,
                bevelSize: 0.3,
                label: {
                    show: false,
                    formatter: '{b}'
                },
                data: convertData([
                    {name: '武汉', value: 307.24},
                    {name: '贵阳', value: 234.78},
                    {name: '郑州', value: 191.42},
                    {name: '泉州', value: 170.37},
                    {name: '重庆', value: 156.63},
                    {name: '乌鲁木齐', value: 153.94},
                    {name: '长沙', value: 145.45},
                    {name: '济南', value: 131.35},
                    {name: '南昌', value: 130.26},
                    {name: '西安', value: 124.37},
                    {name: '徐州', value: 121.94},
                    {name: '上海', value: 121.44},
                    {name: '北京', value: 121.31},
                    {name: '苏州', value: 119},
                    {name: '成都', value: 118.22},
                    {name: '长春', value: 115.29},
                    {name: '南京', value: 115.15},
                    {name: '兰州', value: 113.77},
                    {name: '南宁', value: 111.42},
                    {name: '榆林', value: 106.55},
                    {name: '保定', value: 105.41},
                    {name: '海口', value: 103.55},
                    {name: '遵义', value: 101.54},
                    {name: '常州', value: 94.91},
                    {name: '天津', value: 91.16},
                    {name: '合肥', value: 90.06},
                    {name: '厦门', value: 87.54},
                    {name: '廊坊', value: 87.22},
                    {name: '盐城', value: 84.13},
                    {name: '沧州', value: 84.12},
                    {name: '东莞', value: 78.46},
                    {name: '无锡', value: 78.23},
                    {name: '毕节', value: 77.54},
                    {name: '昆明', value: 77.13},
                    {name: '福州', value: 73.73},
                    {name: '沈阳', value: 70.89},
                    {name: '哈尔滨', value: 70.71},
                    {name: '济宁', value: 70.37},
                    {name: '唐山', value: 67.97},
                    {name: '临沂', value: 65.98},
                    {name: '包头', value: 64.97},
                    {name: '南充', value: 63.44},
                    {name: '呼和浩特', value: 62.44},
                    {name: '广州', value: 60.34},
                    {name: '赣州', value: 59.54},
                    {name: '铜仁', value: 57.85},
                    {name: '大连', value: 57.16},
                    {name: '株洲', value: 56.94},
                    {name: '宁波', value: 56.44},
                    {name: '杭州', value: 55.34},
                    {name: '石家庄', value: 53.79},
                    {name: '深圳', value: 53.33},
                    {name: '太原', value: 49.81},
                    {name: '佛山', value: 48.05},
                    {name: '新乡', value: 47.6},
                    {name: '宜春', value: 45.49},
                    {name: '柳州', value: 44},
                    {name: '延安', value: 42.77},
                    {name: '焦作', value: 42.71},
                    {name: '连云港', value: 40.97},
                    {name: '百色', value: 40.45},
                    {name: '烟台', value: 38.3},
                    {name: '黔东南苗族侗族自治州', value: 38.09},
                    {name: '怀化', value: 37.65},
                    {name: '桂林', value: 37.3},
                    {name: '抚州', value: 37.02},
                    {name: '鄂尔多斯', value: 36.72},
                    {name: '亳州', value: 36.42},
                    {name: '定西', value: 36.33},
                    {name: '九江', value: 35.9},
                    {name: '洛阳', value: 35.28},
                    {name: '绵阳', value: 34.36},
                    {name: '宿迁', value: 33.36},
                    {name: '邯郸', value: 33.31},
                    {name: '中山', value: 32.89},
                    {name: '钦州', value: 32.44},
                    {name: '温州', value: 31.86},
                    {name: '南阳', value: 31.85},
                    {name: '邵阳', value: 31.06},
                    {name: '德阳', value: 30.92},
                    {name: '泸州', value: 30.9},
                    {name: '荆门', value: 30.75},
                    {name: '黔南布依族苗族自治州', value: 30.53},
                    {name: '六盘水', value: 30.11},
                    {name: '开封', value: 29.92},
                    {name: '西宁', value: 29.51},
                    {name: '恩施土家族苗族自治州', value: 29.24},
                    {name: '漳州', value: 29.19},
                    {name: '黔西南布依族苗族自治州', value: 29.1},
                    {name: '龙岩', value: 28.87},
                    {name: '平顶山', value: 28.49},
                    {name: '陇南', value: 28.48},
                    {name: '吉安', value: 28.38},
                    {name: '周口', value: 28.25},
                    {name: '南通', value: 27.91},
                    {name: '赤峰', value: 27.86},
                    {name: '荆州', value: 27.73},
                    {name: '宁德', value: 27.58},
                    {name: '商丘', value: 27.31},
                    {name: '岳阳', value: 27.06},
                    {name: '黄冈', value: 27},
                    {name: '襄阳', value: 26.72},
                    {name: '咸宁', value: 25.96},
                    {name: '承德', value: 25.89},
                    {name: '上饶', value: 25.62},
                    {name: '青岛', value: 25.35},
                    {name: '衡阳', value: 24.65},
                    {name: '吉林', value: 24.19},
                    {name: '汉中', value: 24.07},
                    {name: '吕梁', value: 24.07},
                    {name: '贵港', value: 24.07},
                    {name: '信阳', value: 23.91},
                    {name: '湖州', value: 23.74},
                    {name: '梧州', value: 23.66},
                    {name: '驻马店', value: 23.6},
                    {name: '金华', value: 23.42},
                    {name: '潍坊', value: 23.03},
                    {name: '遂宁', value: 23.01},
                    {name: '镇江', value: 22.8},
                    {name: '黄石', value: 22.77},
                    {name: '马鞍山', value: 22.28},
                    {name: '阜阳', value: 22.05},
                    {name: '菏泽', value: 21.75},
                    {name: '渭南', value: 21.36},
                    {name: '商洛', value: 21.36},
                    {name: '白银', value: 21.35},
                    {name: '鞍山', value: 21.22},
                    {name: '台州', value: 20.74},
                    {name: '红河哈尼族彝族自治州', value: 20.58},
                    {name: '宜昌', value: 20.55},
                    {name: '濮阳', value: 20.24},
                    {name: '曲靖', value: 19.99},
                    {name: '河池', value: 19.97},
                    {name: '大同', value: 19.91},
                    {name: '池州', value: 19.82},
                    {name: '齐齐哈尔', value: 19.77},
                    {name: '营口', value: 19.61},
                    {name: '安康', value: 19.59},
                    {name: '巴彦淖尔', value: 19.57},
                    {name: '常德', value: 19.55},
                    {name: '临夏回族自治州', value: 19.49},
                    {name: '嘉兴', value: 19.37},
                    {name: '淮南', value: 19.3},
                    {name: '张家界', value: 19.21},
                    {name: '湘潭', value: 19.01},
                    {name: '雅安', value: 18.98},
                    {name: '益阳', value: 18.82},
                    {name: '阳泉', value: 18.74},
                    {name: '聊城', value: 18.73},
                    {name: '北海', value: 18.7},
                    {name: '运城', value: 18.6},
                    {name: '张掖', value: 18.56},
                    {name: '娄底', value: 18.53},
                    {name: '佳木斯', value: 18.37},
                    {name: '泰州', value: 18.17},
                    {name: '自贡', value: 17.87},
                    {name: '银川', value: 17.86},
                    {name: '萍乡', value: 17.68},
                    {name: '乌兰察布', value: 17.66},
                    {name: '武威', value: 17.6},
                    {name: '白山', value: 17.38},
                    {name: '平凉', value: 17.34},
                    {name: '滨州', value: 17.34},
                    {name: '昌吉回族自治州', value: 17.31},
                    {name: '韶关', value: 17.22},
                    {name: '安顺', value: 17.2},
                    {name: '巴音郭楞蒙古自治州', value: 17.17},
                    {name: '惠州', value: 16.73},
                    {name: '十堰', value: 16.73},
                    {name: '珠海', value: 16.69},
                    {name: '石嘴山', value: 16.66},
                    {name: '绥化', value: 16.63},
                    {name: '达州', value: 16.61},
                    {name: '通化', value: 16.47},
                    {name: '衡水', value: 16.35},
                    {name: '滁州', value: 16.3},
                    {name: '庆阳', value: 16.04},
                    {name: '昭通', value: 15.98},
                    {name: '四平', value: 15.93},
                    {name: '新余', value: 15.78},
                    {name: '咸阳', value: 15.72},
                    {name: '晋中', value: 15.7},
                    {name: '固原', value: 15.52},
                    {name: '扬州', value: 15.4},
                    {name: '淄博', value: 15.33},
                    {name: '绍兴', value: 15.28},
                    {name: '孝感', value: 15.09},
                    {name: '大庆', value: 14.75},
                    {name: '揭阳', value: 14.72},
                    {name: '邢台', value: 14.61},
                    {name: '鹤壁', value: 14.58},
                    {name: '郴州', value: 14.5},
                    {name: '乐山', value: 14.36},
                    {name: '广安', value: 14.35},
                    {name: '六安', value: 14.18},
                    {name: '永州', value: 14.18},
                    {name: '保山', value: 14.16},
                    {name: '河源', value: 14.13},
                    {name: '铁岭', value: 14.14},
                    {name: '阜新', value: 14.11},
                    {name: '玉溪', value: 14.01},
                    {name: '辽阳', value: 13.98},
                    {name: '鸡西', value: 13.93},
                    {name: '辽源', value: 13.91},
                    {name: '泰安', value: 13.86},
                    {name: '宜宾', value: 13.84},
                    {name: '三明', value: 13.63},
                    {name: '抚顺', value: 13.48},
                    {name: '枣庄', value: 13.41},
                    {name: '锦州', value: 13.33},
                    {name: '宿州', value: 13.26},
                    {name: '黑河', value: 13.02},
                    {name: '攀枝花', value: 12.99},
                    {name: '阿勒泰地区', value: 12.88},
                    {name: '巴中', value: 12.85},
                    {name: '湘西土家族苗族自治州', value: 12.75},
                    {name: '海东', value: 12.67},
                    {name: '南平', value: 12.66},
                    {name: '莆田', value: 12.63},
                    {name: '梅州', value: 12.59},
                    {name: '安阳', value: 12.52},
                    {name: '景德镇', value: 12.49},
                    {name: '天水', value: 12.46},
                    {name: '吴忠', value: 12.31},
                    {name: '贺州', value: 12.29},
                    {name: '临汾', value: 12.25},
                    {name: '芜湖', value: 12.25},
                    {name: '防城港', value: 12.23},
                    {name: '许昌', value: 12.16},
                    {name: '酒泉', value: 11.94},
                    {name: '蚌埠', value: 11.75},
                    {name: '汕头', value: 11.72},
                    {name: '三门峡', value: 11.4},
                    {name: '阿克苏地区', value: 11.36},
                    {name: '安庆', value: 11.31},
                    {name: '黄山', value: 11.27},
                    {name: '本溪', value: 11.25},
                    {name: '德州', value: 11.22},
                    {name: '白城', value: 11.03},
                    {name: '汕尾', value: 10.97},
                    {name: '丹东', value: 10.8},
                    {name: '漯河', value: 10.79},
                    {name: '张家口', value: 10.76},
                    {name: '玉林', value: 10.68},
                    {name: '中卫', value: 10.61},
                    {name: '牡丹江', value: 10.49},
                    {name: '肇庆', value: 10.25},
                    {name: '铜陵', value: 10.25},
                    {name: '崇左', value: 10.23},
                    {name: '鹰潭', value: 10.23},
                    {name: '潮州', value: 10.13},
                    {name: '随州', value: 10.08},
                    {name: '舟山', value: 10.05},
                    {name: '葫芦岛', value: 10.02},
                    {name: '来宾', value: 9.87},
                    {name: '金昌', value: 9.83},
                    {name: '大理白族自治州', value: 9.82},
                    {name: '通辽', value: 9.81},
                    {name: '淮安', value: 9.73},
                    {name: '资阳', value: 9.44},
                    {name: '江门', value: 9.33},
                    {name: '淮北', value: 9.23},
                    {name: '长治', value: 9.14},
                    {name: '喀什地区', value: 9.12},
                    {name: '甘南藏族自治州', value: 9.06},
                    {name: '丽水', value: 9.02},
                    {name: '和田地区', value: 8.88},
                    {name: '广元', value: 8.86},
                    {name: '呼伦贝尔', value: 8.85},
                    {name: '东营', value: 8.75},
                    {name: '延边朝鲜族自治州', value: 8.72},
                    {name: '鄂州', value: 8.59},
                    {name: '秦皇岛', value: 8.57},
                    {name: '忻州', value: 8.54},
                    {name: '拉萨', value: 8.51},
                    {name: '玉树藏族自治州', value: 8.35},
                    {name: '朔州', value: 8.34},
                    {name: '鹤岗', value: 8.3},
                    {name: '德宏傣族景颇族自治州', value: 8.27},
                    {name: '七台河', value: 8.2},
                    {name: '丽江', value: 8.08},
                    {name: '伊春', value: 7.93},
                    {name: '松原', value: 7.72},
                    {name: '锡林郭勒盟', value: 7.71},
                    {name: '阿坝藏族羌族自治州', value: 7.67},
                    {name: '临沧', value: 7.51},
                    {name: '海南藏族自治州', value: 7.31},
                    {name: '凉山彝族自治州', value: 7.18},
                    {name: '茂名', value: 7.15},
                    {name: '威海', value: 7.12},
                    {name: '湛江', value: 7.05},
                    {name: '海西蒙古族藏族自治州', value: 6.99},
                    {name: '宣城', value: 6.98},
                    {name: '文山壮族苗族自治州', value: 6.9},
                    {name: '宝鸡', value: 6.86},
                    {name: '晋城', value: 6.82},
                    {name: '塔城地区', value: 6.79},
                    {name: '双鸭山', value: 6.66},
                    {name: '内江', value: 6.64},
                    {name: '衢州', value: 6.61},
                    {name: '迪庆藏族自治州', value: 6.53},
                    {name: '楚雄彝族自治州', value: 6.45},
                    {name: '阳江', value: 6.43},
                    {name: '西双版纳傣族自治州', value: 6.35},
                    {name: '普洱', value: 6.27},
                    {name: '盘锦', value: 6.25},
                    {name: '云浮', value: 6.24},
                    {name: '清远', value: 6.24},
                    {name: '莱芜', value: 6.08},
                    {name: '大兴安岭地区', value: 5.99},
                    {name: '克拉玛依', value: 5.78},
                    {name: '日照', value: 5.77},
                    {name: '铜川', value: 5.65},
                    {name: '嘉峪关', value: 5.58},
                    {name: '吐鲁番', value: 5.45},
                    {name: '博尔塔拉蒙古自治州', value: 5.44},
                    {name: '怒江傈僳族自治州', value: 5.3},
                    {name: '乌海', value: 5.11},
                    {name: '伊犁哈萨克自治州', value: 4.93},
                    {name: '黄南藏族自治州', value: 4.92},
                    {name: '甘孜藏族自治州', value: 4.82},
                    {name: '哈密', value: 4.5},
                    {name: '日喀则', value: 4.42},
                    {name: '果洛藏族自治州', value: 4.36},
                    {name: '朝阳', value: 4.31},
                    {name: '儋州', value: 4.2},
                    {name: '三亚', value: 3.81},
                    {name: '兴安盟', value: 3.7},
                    {name: '海北藏族自治州', value: 2.63},
                    {name: '阿拉善盟', value: 2.58},
                    {name: '昌都', value: 2.27},
                    {name: '山南', value: 2.25},
                    {name: '那曲地区', value: 1.74},
                    {name: '林芝', value: 1.47},
                    {name: '克孜勒苏柯尔克孜自治州', value: 0.78},
                    {name: '阿里地区', value: 0.42}
                ])
            },


            //画线

            {
                type: 'lines3D',

                coordinateSystem: 'geo3D',

                effect: {
                    show: true,
                    trailWidth: 1,
                    trailOpacity: 0.5,
                    trailLength: 0.2,
                    constantSpeed: 5
                },

                blendMode: 'lighter',

                lineStyle: {
                    width: 0.2,
                    opacity: 0.05
                },

                data: alirl
            }
        ]
    };


    myChart.setOption(option);
    myChart.on('rendered', function () {
        _this.rendered = true;
        $('#bar3d-adults').next('.sk-spinner').hide();
        myChart.off('rendered');
    });
}
