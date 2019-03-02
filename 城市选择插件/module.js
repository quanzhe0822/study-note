var showSelectedCities = {
    citiesListCaches:[],
    provincesNodeList:null,
    citiesNodelist:null,
    panelEle:null,
    panelItemEle:null,
    provinceList:{
        '吉林':{
            length:5,
            id:1111
        }
    },
    citiesLength:11,
    onShowCities:function(){
  
    },
    onCancelSelect:function(cities){
        var _this =this;
        var $provinceZone = _this.provincesNodeList;
        var $cityZone = _this.citiesNodelist; 
        //筛选未被选中状态的城市
        var selectedCities=citiesListCaches.filter(function(v,i){
            return v.state===0;
        });

        //所有城市为未选择状态时
        if (selectedCities.length === this.citiesLength) {
            //面板区域
           $('.show span').remove();
            //省份区域
            $provinceZone.removeClass('active');
            $provinceAllChecked.removeClass('active')


            //城市区域
            $cityZone.removeClass('active')

        //一部分城市为未选中状态时
        }else{
            //用来保存未选定城市所属的省份id
            var provincesId={}
            cities.forEach(function(v,i){
                //面板区域
                $('.show span[data-id='+v.id+']').remove();
                

                //城市区域
                $cityZone.filter('[data-id='+v.id+']').removeClass('active').attr('data-state',0);
                provincesId[v.pid]=[];

                
            })
            //省份区域
            for(var pid in provincesId){
                var province = $provinceZone.filter('[data-id='+pid+']');
                if(province){
                    province.removeClass('active')
                }
                
            }


            
        }
    },
    onSelectCity:function(cities){
        var _this =this;
        var $provinceZone = _this.provincesNodeList;
        var $cityZone = _this.citiesNodelist; 
        //筛选被选中状态的城市
        var selectedCities=citiesListCaches.filter(function(v,i){
            return v.state===1;
        });

        //所有城市都为选中状态时
        if (selectedCities.length === this.citiesLength) {
            //面板区域
            selectedCities.forEach(function(v,i){
                $('[data-id='+v.id+']').remove();
            })
            $('.show').append($('<span id="allCities">不限</span>'));

            //省份区域
            $provinceZone.addClass('active');
            $provinceAllChecked.addClass('active')

            //城市区域
            $cityZone.addClass('active')

        //一部分城市为选中状态时
        }else{
            //用来保存选定城市所属的省份id
            var provincesId={}
            cities.forEach(function(v,i){
                //面板区域
                if($('.show').has('[data-id='+v.id+']').length !== 0){
                    return false;
                }else{
                    $('.show').append($('<span data-pid='+v.pid+'  data-id=' + v.id + '>' + v.name + '</span>'))
                }

                //城市区域
                $cityZone.filter('[data-id='+v.id+']').addClass('active').attr('data-state',1);
                provincesId[v.pid]=[];

                
            })
            //省份区域
            for(var pid in provincesId){
                var province = $provinceZone.filter('[data-id='+pid+']');
                if(province)
                var total = _this.provinceList[p];
                var selected = $cityZone.filter('[data-pid='+pid+']').filter('[data-state=1]');
                total.length === selected.length?province.addClass('active'):province.removeClass('active')
            }


            
        }
    },
    recieveData:function(data){//接受状态发生变化的城市对象
        var _this =this;
        var checked=[];
        var unchecked=[];
        data.forEach(function(v,i,arr){
            var id = v.id;
            _this.citiesListCaches.forEach(function(v2,i2,arr2){
                if(v2.id === id){
                    arr2.splice(i2,1);   
                }
            });
            //
            v.state ===0?unchecked.push(v):checked.push(v);
            
        
        });
        _this.citiesList = _this.citiesListCaches.concat(data);
        _this.uncheckedCity(unchecked);
        _this.checkedCity(checked);
    },

};
$(function(){
   
    $('.show').click(function(e){
        if(e.target.nodeName === 'SPAN'){
            var id = $(e.target).attr('data-id');
            var pid = $(e.target).attr('data-pid');
            var name =$(e.target).text();
            showSelectedCities.recieveData([{
                id:id,
                pid:pid,
                name:name,
                state:0,
            }]);
        }
    })
})
