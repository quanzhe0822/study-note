
function Spage1() {
    this.html = '<div class="swiper-slide">' +
                    '<div class="hidden"></div>' +
                    '<div class="img-box p1">' +
                        '<img src="images/spe1/bg.jpeg" class="">' +
                        '<div class="chartBox" id="treemap-civil-servent" style="width:64%;height:60%;top:28%;"></div>'+
                    '</div>' +
                '</div>'
}
Spage1.prototype.currentPageAction=function(){
    var _this =this;
    if(_this.rendered) return;
    console.log(document.getElementById('treemap-civil-servent'))
    let myChart = echarts.init(document.getElementById('treemap-civil-servent'));
    var color = {
        '新闻': '#99CCFF',
        '游戏': '#333366',
        '视频': '#0099FF',
        '理财': '#00CC66',
        '体育': '#330033',
        '电影': '#336600',
        '健康': '#660033',
        '购物': '#663300',
        '音乐': '#00CC99',
        '旅游': '#990000',
        '美食': '#99CC33',
        '工作': '#66CC00',
        '阅读': '#6699CC',
        '科技': '#993333',
        '健身': '#CC6633',
        '摄影': '#6666FF',
        '明星': '#996666',
        '母婴': '#FF6666',
        '手机拍照': '#99CC99',
        '宠物': '#CCCC33'
    };
    var data = [
{name: '新闻', value: 62.04},
{name: '游戏', value: 20.7},
{name: '视频', value: 44.47},
{name: '理财', value: 53.17},
{name: '体育', value: 38.8},
{name: '电影', value: 17.4},
{name: '健康', value: 56.36},
{name: '购物', value: 5.29},
{name: '音乐', value: 11.62},
{name: '旅游', value: 40.11},
{name: '美食', value: 15.06},
{name: '工作', value: 14.21},
{name: '阅读', value: 33.25},
{name: '科技', value: 12.22},
{name: '健身', value: 10.35},
{name: '摄影', value: 18.54},
{name: '明星', value: 24.7},
{name: '母婴', value: 11.94},
{name: '手机拍照', value: 12.36},
{name: '宠物', value: 10.87}
]

    for (var n in data) {
        data[n].itemStyle={
            color:color[data[n].name]
        }
        data[n]['name'] = data[n]['name'] + ' ' + data[n]['value'] + '%';
       
    }

    var option = {
        // backgroundColor: "#000",
        title: {
            text: '',
            left: '50%',
            top: '0%',
            textAlign: 'center',
            textStyle: {
                color: "#000",
                fontWeight: 'normal',
                fontSize:40
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}"
        },
        series: [{
            type: 'treemap',
            width: '100%',
            roam: false, //是否开启拖拽漫游（移动和缩放）
            nodeClick: false, //点击节点后的行为,false无反应
            breadcrumb: {
                show: false
            },
            label: { //描述了每个矩形中，文本标签的样式。
                normal: {
                    show: true,
                    position: ['10%', '40%'],
                    fontSize:20
                }
            },
            itemStyle: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                    },
                    borderWidth: 1,
                    borderColor: '#fff',
                },

                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            data: data
        }]
    };

    myChart.setOption(option);
    myChart.on('rendered', function () {
        _this.rendered=true;
        myChart.off('rendered');
    });
}

