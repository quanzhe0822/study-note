function Spage2() {
    this.name='b',
    this.html = '<script src="plugins/echarts2.0.js"></script><div class="swiper-slide">' +
        '<div class="hidden"></div>' +
        '<div class="img-box b">' +
        '<img src="images/spe2/bg.jpeg" class="">' +
        '<div class="chartBox" id="chord-civil-servent" style="width:60%;height:56%;top:28%;"></div>'+
        '</div>' +
        '</div>'
}
Spage2.prototype.currentPageAction=function(){
    
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });

    // 使用
    require(
        [
            'echarts',
            'echarts/chart/chord' // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('chord-civil-servent'));
            var links =[
{source: '499元以下', target: '休闲裤', weight: 34.93},
{source: '499元以下', target: '衬衫', weight: 17.63},
{source: '499元以下', target: 'POLO衫', weight: 54},
{source: '499元以下', target: 'T恤', weight: 56.47},
{source: '499元以下', target: '夹克', weight: 28.15},
{source: '499元以下', target: '外套', weight: 53.27},
{source: '499元以下', target: '针织衫', weight: 19.94},
{source: '499元以下', target: '西服', weight: 12.56},
{source: '499元以下', target: '牛仔裤', weight: 86.69},
{source: '499元以下', target: '卫衣', weight: 77.75},
{source: '500-999元', target: '休闲裤', weight: 69.85},
{source: '500-999元', target: '衬衫', weight: 52.9},
{source: '500-999元', target: 'POLO衫', weight: 72},
{source: '500-999元', target: 'T恤', weight: 70.59},
{source: '500-999元', target: '夹克', weight: 42.22},
{source: '500-999元', target: '外套', weight: 71.02},
{source: '500-999元', target: '针织衫', weight: 39.89},
{source: '500-999元', target: '西服', weight: 37.69},
{source: '500-999元', target: '牛仔裤', weight: 65.01},
{source: '500-999元', target: '卫衣', weight: 33.55},
{source: '1000-1499元', target: '休闲裤', weight: 34.93},
{source: '1000-1499元', target: '衬衫', weight: 70.53},
{source: '1000-1499元', target: 'POLO衫', weight: 18},
{source: '1000-1499元', target: 'T恤', weight: 28.24},
{source: '1000-1499元', target: '夹克', weight: 56.29},
{source: '1000-1499元', target: '外套', weight: 35.51},
{source: '1000-1499元', target: '针织衫', weight: 79.77},
{source: '1000-1499元', target: '西服', weight: 62.82},
{source: '1000-1499元', target: '牛仔裤', weight: 0},
{source: '1000-1499元', target: '卫衣', weight: 0},
{source: '1500元以上', target: '休闲裤', weight: 0},
{source: '1500元以上', target: '衬衫', weight: 17.63},
{source: '1500元以上', target: 'POLO衫', weight: 0},
{source: '1500元以上', target: 'T恤', weight: 0},
{source: '1500元以上', target: '夹克', weight: 28.15},
{source: '1500元以上', target: '外套', weight: 0},
{source: '1500元以上', target: '针织衫', weight: 0},
{source: '1500元以上', target: '西服', weight: 25.13},
{source: '1500元以上', target: '牛仔裤', weight: 0},
{source: '1500元以上', target: '卫衣', weight: 0},




{target: '499元以下',   source: '休闲裤', weight: 34.93},
{target: '499元以下',   source: '衬衫', weight: 17.63},
{target: '499元以下',   source: 'POLO衫', weight: 54},
{target: '499元以下',   source: 'T恤', weight: 56.47},
{target: '499元以下',   source: '夹克', weight: 28.15},
{target: '499元以下',   source: '外套', weight: 53.27},
{target: '499元以下',   source: '针织衫', weight: 19.94},
{target: '499元以下',   source: '西服', weight: 12.56},
{target: '499元以下',   source: '牛仔裤', weight: 86.69},
{target: '499元以下',   source: '卫衣', weight: 77.75},
{target: '500-999元',   source: '休闲裤', weight: 69.85},
{target: '500-999元',   source: '衬衫', weight: 52.9},
{target: '500-999元',   source: 'POLO衫', weight: 72},
{target: '500-999元',   source: 'T恤', weight: 70.59},
{target: '500-999元',   source: '夹克', weight: 42.22},
{target: '500-999元',   source: '外套', weight: 71.02},
{target: '500-999元',   source: '针织衫', weight: 39.89},
{target: '500-999元',   source: '西服', weight: 37.69},
{target: '500-999元',   source: '牛仔裤', weight: 65.01},
{target: '500-999元',   source: '卫衣', weight: 33.55},
{target: '1000-1499元', source: '休闲裤', weight: 34.93},
{target: '1000-1499元', source: '衬衫', weight: 70.53},
{target: '1000-1499元', source: 'POLO衫', weight: 18},
{target: '1000-1499元', source: 'T恤', weight: 28.24},
{target: '1000-1499元', source: '夹克', weight: 56.29},
{target: '1000-1499元', source: '外套', weight: 35.51},
{target: '1000-1499元', source: '针织衫', weight: 79.77},
{target: '1000-1499元', source: '西服', weight: 62.82},
{target: '1000-1499元', source: '牛仔裤', weight: 0},
{target: '1000-1499元', source: '卫衣', weight: 0},
{target: '1500元以上',  source: '休闲裤', weight: 0},
{target: '1500元以上',  source: '衬衫', weight: 17.63},
{target: '1500元以上',  source: 'POLO衫', weight: 0},
{target: '1500元以上',  source: 'T恤', weight: 0},
{target: '1500元以上',  source: '夹克', weight: 28.15},
{target: '1500元以上',  source: '外套', weight: 0},
{target: '1500元以上',  source: '针织衫', weight: 0},
{target: '1500元以上',  source: '西服', weight: 25.13},
{target: '1500元以上',  source: '牛仔裤', weight: 0},
{target: '1500元以上',  source: '卫衣', weight: 0}
];
            var linkDatas =links.filter(function(v,i,arr){
                return v.weight !==0;
            });
            var left=$(window).width()*0.1;
            var top=$(window).height()*0.2;
            var option = {
                title: {
                    show: true,
                    text: '',
                    x:left,
                    y:top,
                    textStyle:{
                        fontSize:22
                    }
                },

                tooltip: {
                    show: false,
                    trigger: 'item',
                    formatter: function (params) {
                        if (params.indicator2) { // is edge
                            return params.indicator2 + ' ' + params.indicator + ' ' + params.name;
                        } else { // is node
                            return params.name
                        }
                    }
                },
                series: [{
                    type: 'chord',
                    sort: 'none',
                    sortSub: 'none',
                    padding: 0,
                    showScale: false,

                    itemStyle: {
                        normal: {
                            label: {
                                rotate: false,
                                textStyle: {
                                    fontSize: 20
                                },
                                distance:20
                            }
                        }
                    },
                    nodes:[{name:'休闲裤'},{name:'POLO衫'},{name:'T恤'},{name:'衬衫'},{name:'夹克'},{name:'外套'},{name:'针织衫'},{name:'西服'},{name:'牛仔裤'},{name:'卫衣'},{name:'499元以下',itemStyle:{normal:{label:{textStyle:{color:'red',fontSize:25}}}}},{name:'500-999元',itemStyle:{normal:{label:{textStyle:{color:'red',fontSize:25}}}}},{name:'1000-1499元',itemStyle:{normal:{label:{textStyle:{color:'red',fontSize:25}}}}},{name:'1500元以上',itemStyle:{normal:{label:{textStyle:{color:'red',fontSize:25}}}}},],
                    links:linkDatas
                }]
            };

            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}
