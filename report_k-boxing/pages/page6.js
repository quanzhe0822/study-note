function Spage6 () {
    this.name = 'd';
    this.rendered=false;
    this.html = '<div class="swiper-slide">' +
        '<div class="hidden"></div>' +
        '<div class="img-box d">' +
        '<img src="images/spe6/bg.jpeg" class="">' +
        '<div class="chartBox" id="chord-owners" style="width:60%;height:56%;top:28%;"></div>'+
        '</div>' +
        '</div>'
}
Spage6.prototype.currentPageAction = function () {
     
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
            var myChart = ec.init(document.getElementById('chord-owners'));
            var links =[
                {source: '休闲裤', target: '499元以下', weight: 22.9},
                {source: 'POLO衫', target: '499元以下', weight: 0},
                {source: 'T恤', target: '499元以下', weight: 22.81428571},
                {source: '衬衫', target: '499元以下', weight: 0},
                {source: '牛仔裤', target: '499元以下', weight: 80.93},
                {source: '外套', target: '499元以下', weight: 0},
                {source: '短裤', target: '499元以下', weight: 79.79},
                {source: '卫衣', target: '499元以下', weight: 81.48},
                {source: '夹克', target: '499元以下', weight: 0},
                {source: '运动裤', target: '499元以下', weight: 78.6},
                {source: '休闲裤', target: '500-999元', weight: 68.7},
                {source: 'POLO衫', target: '500-999元', weight: 69.51111111},
                {source: 'T恤', target: '500-999元', weight: 68.44285714},
                {source: '衬衫', target: '500-999元', weight: 67.5},
                {source: '牛仔裤', target: '500-999元', weight: 53.33333333},
                {source: '外套', target: '500-999元', weight: 50.1375},
                {source: '短裤', target: '500-999元', weight: 45.2},
                {source: '卫衣', target: '500-999元', weight: 56.24},
                {source: '夹克', target: '500-999元', weight: 39.84545455},
                {source: '运动裤', target: '500-999元', weight: 50.93333333},
                {source: '休闲裤', target: '1000-1499元', weight: 45.8},
                {source: 'POLO衫', target: '1000-1499元', weight: 52.13333333},
                {source: 'T恤', target: '1000-1499元', weight: 45.62857143},
                {source: '衬衫', target: '1000-1499元', weight: 50.625},
                {source: '牛仔裤', target: '1000-1499元', weight: 0},
                {source: '外套', target: '1000-1499元', weight: 50.1375},
                {source: '短裤', target: '1000-1499元', weight: 0},
                {source: '卫衣', target: '1000-1499元', weight: 0},
                {source: '夹克', target: '1000-1499元', weight: 66.40909091},
                {source: '运动裤', target: '1000-1499元', weight: 0},
                {source: '休闲裤', target: '1500元以上', weight: 22.9},
                {source: 'POLO衫', target: '1500元以上', weight: 34.75555556},
                {source: 'T恤', target: '1500元以上', weight: 22.81428571},
                {source: '衬衫', target: '1500元以上', weight: 16.875},
                {source: '牛仔裤', target: '1500元以上', weight: 0},
                {source: '外套', target: '1500元以上', weight: 33.425},
                {source: '短裤', target: '1500元以上', weight: 0},
                {source: '卫衣', target: '1500元以上', weight: 0},
                {source: '夹克', target: '1500元以上', weight: 39.84545455},
                {source: '运动裤', target: '1500元以上', weight: 0},
            
            
            
                {target: '休闲裤', source: '499元以下', weight: 22.9},
                {target: 'POLO衫', source: '499元以下', weight: 0},
                {target: 'T恤', source: '499元以下', weight: 22.81428571},
                {target: '衬衫', source: '499元以下', weight: 0},
                {target: '牛仔裤', source: '499元以下', weight: 80.93},
                {target: '外套', source: '499元以下', weight: 0},
                {target: '短裤', source: '499元以下', weight: 79.79},
                {target: '卫衣', source: '499元以下', weight: 81.48},
                {target: '夹克', source: '499元以下', weight: 0},
                {target: '运动裤', source: '499元以下', weight: 78.6},
                {target: '休闲裤', source: '500-999元', weight: 68.7},
                {target: 'POLO衫', source: '500-999元', weight: 69.51111111},
                {target: 'T恤', source: '500-999元', weight: 68.44285714},
                {target: '衬衫', source: '500-999元', weight: 67.5},
                {target: '牛仔裤', source: '500-999元', weight: 53.33333333},
                {target: '外套',source: '500-999元', weight: 50.1375},
                {target: '短裤',source: '500-999元', weight: 45.2},
                {target: '卫衣',source: '500-999元', weight: 56.24},
                {target: '夹克',source: '500-999元', weight: 39.84545455},
                {target: '运动裤', source: '500-999元', weight: 50.93333333},
                {target: '休闲裤', source: '1000-1499元', weight: 45.8},
                {target: 'POLO衫', source: '1000-1499元', weight: 52.13333333},
                {target: 'T恤', source: '1000-1499元', weight: 45.62857143},
                {target: '衬衫', source: '1000-1499元', weight: 50.625},
                {target: '牛仔裤', source: '1000-1499元', weight: 0},
                {target: '外套', source: '1000-1499元', weight: 50.1375},
                {target: '短裤', source: '1000-1499元', weight: 0},
                {target: '卫衣', source: '1000-1499元', weight: 0},
                {target: '夹克', source: '1000-1499元', weight: 66.40909091},
                {target: '运动裤', source: '1000-1499元', weight: 0},
                {target: '休闲裤', source: '1500元以上', weight: 22.9},
                {target: 'POLO衫', source: '1500元以上', weight: 34.75555556},
                {target: 'T恤', source: '1500元以上', weight: 22.81428571},
                {target: '衬衫', source: '1500元以上', weight: 16.875},
                {target: '牛仔裤', source: '1500元以上', weight: 0},
                {target: '外套', source: '1500元以上', weight: 33.425},
                {target: '短裤', source: '1500元以上', weight: 0},
                {target: '卫衣', source: '1500元以上', weight: 0},
                {target: '夹克', source: '1500元以上', weight: 39.84545455},
                {target: '运动裤', source: '1500元以上', weight: 0}
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
