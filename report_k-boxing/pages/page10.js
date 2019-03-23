function Spage10 () {
    this.name = 'd';
    this.rendered=false;
    this.html = '<div class="swiper-slide">' +
        '<div class="hidden"></div>' +
        '<div class="img-box">' +
        '<img src="images/spe10/bg.jpeg" class="">' +
        '<div class="chartBox" id="chord-adults" style="width:60%;height:56%;top:28%;"></div>'+
        '</div>' +
        '</div>'
}
Spage10.prototype.currentPageAction = function () {
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
            var myChart = ec.init(document.getElementById('chord-adults'));
            var links =[
                {source: '499元以下', target: 'T恤', weight: 46.87},
                {source: '499元以下', target: '卫衣', weight: 56.59},
                {source: '499元以下', target: '运动裤', weight: 80.31},
                {source: '499元以下', target: '牛仔裤', weight: 84.17},
                {source: '499元以下', target: '短裤', weight: 83.75},
                {source: '499元以下', target: '外套', weight: 35.19},
                {source: '499元以下', target: '休闲裤', weight: 85.77},
                {source: '499元以下', target: '衬衫', weight: 46.11},
                {source: '499元以下', target: 'POLO衫', weight: 54},
                {source: '499元以下', target: '九分裤', weight: 84.31},
                {source: '500-999元', target: 'T恤', weight: 62.49},
                {source: '500-999元', target: '卫衣', weight: 75.45},
                {source: '500-999元', target: '运动裤', weight: 40.13},
                {source: '500-999元', target: '牛仔裤', weight: 42.09},
                {source: '500-999元', target: '短裤', weight: 50.25},
                {source: '500-999元', target: '外套', weight: 58.65},
                {source: '500-999元', target: '休闲裤', weight: 42.89},
                {source: '500-999元', target: '衬衫', weight: 76.85},
                {source: '500-999元', target: 'POLO衫', weight: 40.5},
                {source: '500-999元', target: '九分裤', weight: 50.59},
                {source: '1000-1499元', target: 'T恤', weight: 31.24},
                {source: '1000-1499元', target: '卫衣', weight: 18.86},
                {source: '1000-1499元', target: '运动裤', weight: 20.06},
                {source: '1000-1499元', target: '牛仔裤', weight: 21.04},
                {source: '1000-1499元', target: '短裤', weight: 0},
                {source: '1000-1499元', target: '外套', weight: 46.92},
                {source: '1000-1499元', target: '休闲裤', weight: 21.44},
                {source: '1000-1499元', target: '衬衫', weight: 30.74},
                {source: '1000-1499元', target: 'POLO衫', weight: 27},
                {source: '1000-1499元', target: '九分裤', weight: 0},
                {source: '1500元以上', target: 'T恤', weight: 0},
                {source: '1500元以上', target: '卫衣', weight: 0},
                {source: '1500元以上', target: '运动裤', weight: 0},
                {source: '1500元以上', target: '牛仔裤', weight: 0},
                {source: '1500元以上', target: '短裤', weight: 0},
                {source: '1500元以上', target: '外套', weight: 11.73},
                {source: '1500元以上', target: '休闲裤', weight: 0},
                {source: '1500元以上', target: '衬衫', weight: 7.24},
                {source: '1500元以上', target: 'POLO衫', weight: 13.5},
                {source: '1500元以上', target: '九分裤', weight: 0},
            
            
                {target: '499元以下', source: 'T恤', weight: 46.87},
                {target: '499元以下', source: '卫衣', weight: 56.59},
                {target: '499元以下', source: '运动裤', weight: 80.31},
                {target: '499元以下', source: '牛仔裤', weight: 84.17},
                {target: '499元以下', source: '短裤', weight: 83.75},
                {target: '499元以下', source: '外套', weight: 35.19},
                {target: '499元以下', source: '休闲裤', weight: 85.77},
                {target: '499元以下', source: '衬衫', weight: 46.11},
                {target: '499元以下', source: 'POLO衫', weight: 54},
                {target: '499元以下', source: '九分裤', weight: 84.31},
                {target: '500-999元', source: 'T恤', weight: 62.49},
                {target: '500-999元', source: '卫衣', weight: 75.45},
                {target: '500-999元', source: '运动裤', weight: 40.13},
                {target: '500-999元', source: '牛仔裤', weight: 42.09},
                {target: '500-999元', source: '短裤', weight: 50.25},
                {target: '500-999元', source: '外套', weight: 58.65},
                {target: '500-999元', source: '休闲裤', weight: 42.89},
                {target: '500-999元', source: '衬衫', weight: 76.85},
                {target: '500-999元', source: 'POLO衫', weight: 40.5},
                {target: '500-999元', source: '九分裤', weight: 50.59},
                {target: '1000-1499元', source: 'T恤', weight: 31.24},
                {target: '1000-1499元', source: '卫衣', weight: 18.86},
                {target: '1000-1499元', source: '运动裤', weight: 20.06},
                {target: '1000-1499元', source: '牛仔裤', weight: 21.04},
                {target: '1000-1499元', source: '短裤', weight: 0},
                {target: '1000-1499元', source: '外套', weight: 46.92},
                {target: '1000-1499元', source: '休闲裤', weight: 21.44},
                {target: '1000-1499元', source: '衬衫', weight: 30.74},
                {target: '1000-1499元', source: 'POLO衫', weight: 27},
                {target: '1000-1499元', source: '九分裤', weight: 0},
                {target: '1500元以上', source: 'T恤', weight: 0},
                {target: '1500元以上', source: '卫衣', weight: 0},
                {target: '1500元以上', source: '运动裤', weight: 0},
                {target: '1500元以上', source: '牛仔裤', weight: 0},
                {target: '1500元以上', source: '短裤', weight: 0},
                {target: '1500元以上', source: '外套', weight: 11.73},
                {target: '1500元以上', source: '休闲裤', weight: 0},
                {target: '1500元以上', source: '衬衫', weight: 7.24},
                {target: '1500元以上', source: 'POLO衫', weight: 13.5},
                {target: '1500元以上', source: '九分裤', weight: 0}
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
