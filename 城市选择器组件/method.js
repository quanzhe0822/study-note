var a={
     //城市
 clickCity: function () {
    this.state = !this.state;
    emit('onSelectCity', {
        city
    }) //触发省份 的监听
},
onSelectProvinceToCity: function (pro) { //监听省份的点击事件
    pro.childrens.forEach(function (e) {
        e.state = pro.state;
    });
},

//省份
clickProvince: function (pro) {
    this.state = !this.state;
    emit('onSelectProvinceToCity', {
        pro
    }); //触发城市的监听
    emit('onProvinceSendDataToRegion', {
        pro
    }); //触发大区的监听
},
onSelectCity: function (city) { //监听城市的点击事件
    if (city.state) {
        this.pro.citiesCheckedCount++;
        if (this.pro.citiesCheckedCount === this.pro.citiesLength) {
            this.pro.state = true;
            emit('onSelectProvinceToRegion', {
                pro
            }); //触发大区的监听事件
        }
    } else {
        this.pro.citiesCheckedCount--;
        if (this.pro.citiesCheckedCount === this.pro.citiesLength - 1) {
            this.pro.state = false;
            emit('onSelectProvinceToRegion', {
                pro
            }); //触发大区的监听事件
        }
    }
},
onRegionSendDataToProvince: function (reg) { //监听大区的点击事件
    reg.children.forEach(function (e) {
        e.state = reg.state;
        if (e.state) {
            e.citiesCheckedCount = e.citiesLength;
        } else {
            e.citiesCheckedCount = 0;
        }
        emit('onSelectProvinceToCity', {
            e
        }) //触发城市的监听事件;
    })

},


//大区
clickRegion: function (reg) {
    reg.state = !reg.state;
    emit('onSelectRegion', {
        reg
    });
    emit('onAllChecked', {
        reg
    }); //触发大区的监听事件
},
onSelectProvinceToRegion: function (pro) {
    if (pro.state) {
        this.regi.proCheckedCount++;
        if (this.regi.proCheckedCount === this.reg.prosLength) {
            this.regi.state = true;
            emit('onAllChecked', {
                reg
            }); 
        }
    } else {
        this.regi.proCheckedCount--;
        if (this.regi.proCheckedCount === this.reg.prosLength - 1) {
            this.pro.state = false;
            emit('onAllChecked', {
                reg
            }); //触发大区的监听事件
        }
    }
},
onSelectAll:function(isAllChecked){
    reg.forEach(function (e) {
        e.state = isAllChecked.state;
        if (e.state) {
            e.prosCheckedCount = e.prosLength;
        } else {
            e.prosCheckedCount = 0;
        }
        emit('onSelectRegion', {
            e
        }) //触发城市的监听事件;
    })
},
//所有
onAllChecked:function(reg){
    if(reg.state){
        this.regionCheckedCount++;
        if(this.regionCheckedCount===this.regionLengths){
            this.isAllChecked=true;
        }
    }else{
        this.regionCheckedCount--;
        if(this.regionCheckedCount===this.regionLengths-1){
            this.isAllChecked=false;
        }
    }
},
clickAll:function(){
    this.isAllChecked = !this.isAllChecked;
    emit('onSelectAll',{isAllChecked})
}



}