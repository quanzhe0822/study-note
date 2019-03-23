function Spage8 () {
    this.name = 'd';
    this.rendered=false;
    this.html = '<div class="swiper-slide">' +
        '<div class="hidden"></div>' +
        '<div class="img-box">' +
        '<img src="images/spe8/bg.jpeg" class="">' +
        '<div class="chartBox" id="graph-owners" style="width:60%;height:56%;top:28%;"></div>'+
        '<div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div>'+
        '</div>' +
        '</div>'
}
Spage8.prototype.currentPageAction = function () {
    var _this = this;
    if (_this.rendered) return;
    $('#graph-owners').next('.sk-spinner').show();
    let myChart = echarts.init(document.getElementById('graph-owners'));
    var webkitDep
    $.ajax({
        url: 'json/data.json',
        success: function (d) {
            webkitDep = d;
            var option = {
                color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3', '#009966', '#663366', '#CCCC33', '#996633', '#CC3366'],
                legend: {
                    data: ["餐饮美食", "房产", "服饰鞋帽/箱包", "互联网/电子产品", "教育", "旅游 ", "美容", "汽车", "体育运动", "医疗健康", "游戏", "娱乐休闲", "孕产育儿", "政务/法律服务", "金融", "商务服务"]
                },
                tooltip: {
                    formatter: function (d) {
                        if(!d.value) return;
                        return d.name + '</br>' + d.value
                    }
                },
                series: [{
                    type: 'graph',
                    layout: 'force',
                    animation: false,
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}',
                            show: false,
                        }
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    draggable: true,
                    data: webkitDep.nodes,
                    categories: webkitDep.categories,
                    force: {
                        initLayout: 'circular',
                        edgeLength: [0, 100],
                        repulsion: 50,
                        gravity: 0.1
                    },
                    edges: webkitDep.links
                }]
            };
            myChart.setOption(option);
            myChart.on('rendered', function () {
                _this.rendered = true;
                $('#graph-owners').next('.sk-spinner').hide();
                myChart.off('rendered');
            });
        }
    })
}

