var selectCity = {
    citiesListCaches: [],
    provincesNodeList:null,
    citiesNodelist:null,
    panelEle:null,
    panelItemEle:null,
    provinceAllChecked:null,
    citiesLength:null,
    setChartOption:function(){},

    init:function(object){
        this.provincesNodeList=object.provincesNodeList;
        this.citiesNodelist=object.citiesNodelist;
        this.panelEle=object.panelEle;
        this.panelItemEle=object.panelItemEle;
        this.provinceAllChecked=object.provinceAllChecked;
        this.citiesLength=object.citiesLength;
        this.setChartOption=object.setChartOption;
    },

    /*
    *收集城市信息（id，pid,name,state)
    */
    collectCiteisInfo:function(citiesList,state){
        var citiesObjList = [];
        citiesList.each(function (i, v) {
            citiesObjList.push({
                id: $(v).attr('data-id'),
                pid: $(v).attr('data-pid'),
                rid:$(v).attr('data-rid'),
                name: $(v).attr('data-name'),
                state: state
            });
        });
        return citiesObjList
    },
    /*
     *监听点击取消事件
     *获取要选择的城市信息列表
     *调用选择事件并且传入城市信息列表
     */
    onSelect: function (citiesEleList) {
        var citiesObjList=this.collectCiteisInfo(citiesEleList,1)
        this.selectCities(citiesObjList);
    },
    /*
     *监听点击取消事件
     *获取要取消城市的信息列表
     *调用取消事件并且传入城市信息列表
     */
    onCancelSelect: function (citiesEleList) {
        var citiesObjList=this.collectCiteisInfo(citiesEleList,0)
        console.log(citiesObjList)
        this.cancelSelectCities(citiesObjList);
    },

    /*
     *取消事件
     *根据传过来的城市信息列表
     *取消城市的选中态样式
     */
    cancelSelectCities: function (cities) {
        var _this = this;

        //去重，合并缓存中的城市
        _this.concatCities(cities);

        var $provinceZone = _this.provincesNodeList;
        var $cityZone = _this.citiesNodelist;
        //隐藏城市面板中的‘不限’字符
        $('.show .unlimited').css('display', 'none');
        var provincesId = {};
        var regionId={};
        cities.forEach(function (v, i) {
            //面板模块
            _this.panelEle.find('span').css('display', 'block');
            _this.panelEle.find('span').filter('[data-id=' + v.id + ']').remove();


            //城市模块
            $cityZone.filter('[data-id=' + v.id + ']').removeClass('active').attr('data-state', 0);

            //保存取消选择城市所属的省份id,区域id
            //为了去重以对象的属性名形式保存省份id
            provincesId[v.pid] = '省份';
            regionId[v.rid]='区域';


        })
        //省份模块
        //取消全选按钮的选中态
        _this.provinceAllChecked.removeClass('active')
        console.log(provincesId)

        for (var pid in provincesId) {
            var province = $provinceZone.filter('[data-id=' + pid + ']');
            if (province) {
                province.removeClass('active')
            }

        }

        //区域模块
        for(var rid in regionId){
            var currentRegionCities = $cityZone.filter('[data-rid=' + rid + ']')     
            var citiesObjList = _this.collectCiteisInfo(currentRegionCities);
            _this.setChartOption(citiesObjList);
            
        }

    },
      /*
     *选择事件
     *根据传过来的城市信息列表
     *设置城市的选中态样式
     */
    selectCities: function (cities) {
        var _this = this;

         //去重，合并缓存中的城市
        _this.concatCities(cities);

        var $provinceZone = _this.provincesNodeList;
        var $cityZone = _this.citiesNodelist;

        //筛选选中态的城市
        var selectedCities = _this.citiesListCaches.filter(function (v, i) {
            return v.state === 1;
        });

        var provincesId = {};
        var regionId={};
        cities.forEach(function (v, i) {
            //城市模块
            $cityZone.filter('[data-id=' + v.id + ']').addClass('active').attr('data-state', 1);


            //保存选中城市所属的省份id,区域id
            //为了去重以对象的属性名形式保存省份id
            provincesId[v.pid] = '省份';
            regionId[v.rid]='区域'

            //面板模块
            if (_this.panelEle.has('[data-id=' + v.id + ']').length !== 0) {
                return false;
            } else {
                _this.panelEle.append($('<span data-name=' + v.name + ' data-pid=' + v.pid +'  dat-rid='+v.rid+'  data-id=' + v.id + '>' + v.name + '</span>'))
            }
        })
        //省份模块
        for (var pid in provincesId) {
            //该省份包含的城市数量
            var totalLength = $cityZone.filter('[data-pid='+pid+']').length;

            //如果当前省份为直辖市就跳出当前遍历，继续下一个遍历
            if (totalLength === 0) continue;

            var province = $provinceZone.filter('[data-id=' + pid + ']');
            var selected = $cityZone.filter('[data-pid=' + pid + ']').filter('[data-state=1]');
            totalLength === selected.length ? province.addClass('active') : province.removeClass('active')
        }

        //区域模块
        for(var rid in regionId){
            var totalLength=$cityZone.filter('[data-rid='+rid+']').length;
            var selected = $cityZone.filter('[data-rid=' + rid + ']').filter('[data-state=1]');        
            if(selected.length === totalLength){
                var citiesObjList = _this.collectCiteisInfo(selected);
                _this.setChartOption(citiesObjList);
            }
        }

        //判断是否选中所有城市
        if (selectedCities.length === this.citiesLength) {
            //隐藏面板中的所有城市，显示‘不限’字符
            _this.panelEle.find('span').css('display', 'none');
            $('.show .unlimited').css('display', 'block');

            //设置全选按钮为选中态
            _this.provinceAllChecked.addClass('active')
        } else {
            //显示面板中的所有城市
            //隐藏‘不限’字符
            _this.panelEle.find('span').css('display', 'block');
            $('.show .unlimited').css('display', 'none');

            //取消全选按钮的选中态
            _this.provinceAllChecked.removeClass('active')
        }
    },
    /*
     *去重，合并缓存中的城市
     */
    concatCities: function (data) {
        var _this = this;
        data.forEach(function (v, i, arr) {
            var id = v.id;
            _this.citiesListCaches.forEach(function (v2, i2, arr2) {
                if (v2.id === id) {
                    arr2.splice(i2, 1);
                }
            });
        });
        _this.citiesListCaches = _this.citiesListCaches.concat(data);

    },

};
$(function () {
    selectCity.init({
        provincesNodeList:$('.province'),
        citiesNodelist:$('.city'),
        panelEle:$('.show'),
        panelItemEle:$('.show').find('span'),
        provinceAllChecked:$('.all'),
        citiesLength:$('.city').length,
        setChartOption:function(data){
            var option = {
                geo:{
                    regions:data
                }
            }
            // myChart.setChartOption(option)
        },
    })

    $('.show').click(function (e) {
        if (e.target.nodeName === 'SPAN') {
            selectCity.onCancelSelect($(e.target));
        }
    });

    $('.city').click(function () {
        if ($(this).hasClass('active')) {
            selectCity.onCancelSelect($(this))
        } else {
            selectCity.onSelect($(this));
        }
    })
    $('.province').click(function (e) {
        if ($(e.target).hasClass('check')) {
            var pid = $(this).attr('data-id');
            var citiesList = $('.city[data-pid=' + pid + ']');
            if ($(this).hasClass('active')) {
                selectCity.onCancelSelect(citiesList)
            } else {
                selectCity.onSelect(citiesList);
            }
        }
    })
    $('.all').click(function () {
        if ($(this).hasClass('active')) {
            selectCity.onCancelSelect($('.city'))
        } else {
            selectCity.onSelect($('.city'));
        }
    })
    $('.province-name').click(function () {
        var pid = $(this).parent().attr('data-id');
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.city-box[data-pid=' + pid + ']').removeClass('open');
        } else {
            $(this).addClass('open').parent().siblings().find('.province-name').removeClass('open');
            $('.city-box[data-pid=' + pid + ']').addClass('open').siblings().removeClass('open')
        }
    })
})