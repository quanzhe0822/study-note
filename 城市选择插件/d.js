var allCities = {//显示面板模块
    _citiesList: {},
    ctx: null,
    citiesLength: 11,
    set citiesList(data) {
        
        this.onShowCites(data);
        this.onSendListToProvinceSelect(data);
    },
    get citiesList() {
        return this._citiesList;
    },
    onShowCites: function (data) {
        var count = 0;
        var l = []
        $('.show span').remove();
        for (var v in data) {
            if (data[v].state === 1) {
                count++;
                l.push(data[v]);
            }
        }
        if (count === this.citiesLength) {
            $('.show').append($('<span>不限</span>'));
        } else {
            l.forEach(function (v) {
                $('.show').append($('<span  data-value=' + v.name + '>' + v.name + ',,</span>'))
            })
        }


    },
    onSendListToProvinceSelect: function (data) {
        provinceSelect.recieveListFromAllCities(data);
    },
    recieveListFromProvinceSelect: function (data) {
        var l = this._citiesList;
        if (Array.isArray(data)) {
            data.forEach(function (v) {
                l[v.name] = {
                    name: v.name,
                    state: v.state,
                    pName: v.pName,
                    municipality:data.municipality||null
                }
            })
        } else {
            this._citiesList[data.name] = {
                name: data.name,
                state: data.state,
                pName: data.pName,
                municipality:data.municipality||null
            }
        }
        this.onShowCites(this._citiesList)

    },
}

var provinceSelect = {//总全选模块
    _state: 0,
    ctx: $('.all'),
    provinceLength: 3,
    set state(state) { //仅限于自己改变自己状态时触发
        this._state = state;
        this.onProvinceSelectChange(state, this.ctx);
        this.onSendDataToProvince(state);
        this.onSendDataToAllCities(state)
    },
    get state() {
        return this._state
    },
    onProvinceSelectChange: function (state, ctx) { //总全选逻辑处理
        ctx.attr('data-selected', state);
        this.state === 1 ? ctx.addClass('active') : ctx.removeClass('active');
    },
    onSendDataToProvince: function (data) { //给省份传递数据
        if (typeof data === 'object') {
            for (var v in province) {
                var pro = province[v];
                var p = []
                for (var d in data) {
                    if (data[d].pName === pro.pName) {
                        p.push([data[d]]);
                    }
                }
                console.log(p);
                province[v].recieveDataFromProvinceSelect(p);
            }
        } else {
            for (var v in province) {
                province[v].recieveDataFromProvinceSelect(data);
            }
        }

    },
    onSendDataToAllCities: function (data) { //给展示面板传送数据
        if (typeof data === 'object') {
            allCities.recieveListFromProvinceSelect(data);
        } else {
            var p = [];
            $('.city').each(function (i, v) {
                p.push({
                    state: data,
                    name: $(this).attr('data-value'),
                    pNam: $(this).attr('data-province')
                })
            });
            $('.province[data-municipality=true]').each(function (i, v) {
                p.push({
                    state: data,
                    name: $(this).attr('data-value'),
                    pName: $(this).attr('data-value'),
                })
            });
            allCities.recieveListFromProvinceSelect(p);
        }
    },
    recieveDataFromProvince: function (data) { //接受省份传过来的数据
        var s = [];
        for (var v in province) {
            s.push(province[v].state)
        }
        $('.province[data-municipality=true]').each(function(i,v){
            s.push($(v).attr('data-selected'))
        })
        var isAll = s.every(function (v) {
            return v == 1;
        });
        this._state = isAll===true?1:0;
        this.onProvinceSelectChange(this._state, this.ctx);
        this.onSendDataToAllCities(data);
    },
    recieveListFromAllCities: function (data) {//接受从展示面板传过来的数据
        this.onSendDataToProvince(data)
    }
}
var province = {};
var city = {};


$('.province').each(function (i, v) {//单个省份模块
    var pro = $(this).attr('data-value');
    var municipality = $(this).attr('data-municipality') || null;
    var children = $('.city[data-province=' + pro + ']');
    province[pro] = {
        ctx: $(v),
        children: children,
        municipality: municipality,
        _state: 0,
        pName: $(this).attr('data-value'),
        set state(state) { //仅限于自己改变自己状态时触发
            if (this._state === state) return;

            this._state = state;
            this.onProvinceStateChange(state, this.ctx);
            this.onSendDataToProvinceSelect(state);
            this.onSendDataToCity(state);

        },
        get state() {
            return this._state
        },
        onProvinceStateChange: function (state, ctx) { //省份逻辑业务
            ctx.attr('data-selected', state);
            this.state === 1 ? ctx.addClass('active') : ctx.removeClass('active');
        },
        onSendDataToProvinceSelect: function (data) { //向 所有 传递数据
           
            if (typeof data === 'object') {
                
                provinceSelect.recieveDataFromProvince(data);
            } else {
                if (this.municipality) { //如果为直辖市
                   
                    provinceSelect.recieveDataFromProvince({
                        state: data,
                        name: pro,
                        pName: pro,
                        municipality:true
                    });
                    return;
                }
                var d = [];
                children.each(function (i, v) {
                    d.push({
                        state: data,
                        name: $(v).attr('data-value'),
                        pName: pro
                    })
                });
                provinceSelect.recieveDataFromProvince(d);

            }

        },
        onSendDataToCity: function (data) { //向城市传递数据
            if (this.municipality) return; //如果为直辖市返回

            var cities = city[this.pName];
            for (var a = 0; a < cities.length; a++) {
                cities[a].recieveDataFromProvince(data);
            }


        },
        recieveDataFromProvinceSelect: function (data) {//接受从 all  传过来的数据
            
            if (typeof data === 'object') {
                if(data.length !==1) return;
                if(data[0].municipality){
                    this._state = data[0].state;
                    this.onProvinceStateChange(data[0].state, this.ctx);
                }
                this.onSendDataToCity(data);
            } else {
                this._state = data;
                this.onProvinceStateChange(data, this.ctx);
                this.onSendDataToCity(data);
            }

        },
        recieveDataFromCity: function (data) { //接受从 城市传过来的数据
            var isAllChecked = city[data.pName].every(function (v) {
                return v.state === 1;
            });
            
            if (isAllChecked) {
                this._state = 1;
            } else {
                this._state = 0;
            }
            this.onProvinceStateChange(this._state, this.ctx);
            this.onSendDataToProvinceSelect(data);
        },
    }
    city[pro] = [];
    $('.city[data-province=' + pro + ']').each(function (i, v) {
        city[pro].push({//单个城市模块
            ctx: $(v),
            pName: pro,
            cName: $(v).attr('data-value'),
            _state: 0,
            set state(state) { //仅限于 自己改变自己状态时触发
                if (state === this._state) return;
                this._state = state;
                this.onSendDataToProvince({
                    state: this.state,
                    name: this.cName,
                    pName: this.pName
                });
                this.onCityStateChange(state, this.ctx);
            },
            get state() {
                return this._state;
            },
            onCityStateChange: function (state, ctx) { //城市逻辑业务
                ctx.attr('data-selected', state);
                this.state === 1 ? ctx.addClass('active') : ctx.removeClass('active');
            },
            onSendDataToProvince: function (data) { //向父级传递数据
                province[this.pName].recieveDataFromCity(data);
            },
            recieveDataFromProvince: function (data) { //接受省份传过来的数据
                var _this = this;
                if (typeof data === 'object') {
                    data.forEach(function (v) {
                        if (v.name && v.name === _this.cName) {
                            _this._state = v.state;
                            _this.onCityStateChange(v.state, _this.ctx);
                            _this.onSendDataToProvince({
                                state: _this.state,
                                name: _this.cName,
                                pName: _this.pName
                            });
                        }
                    })
                } else {
                    this._state = data;
                    this.onCityStateChange(data, this.ctx);
                }

            }
        })
    })
});

var provinceOpen = {};
var cityOpen = {};
$('.province').each(function (i, v) {
    var pro = $(this).attr('data-value');
    var municipality = $(this).attr('data-municipality') || null;
    provinceOpen[pro] = {
        ctx: $(v),
        _isOpen: false,
        municipality: municipality,
        pName: pro,
        set isOpen(isOpen) {
            this._isOpen = isOpen
            this.onProvinceOpenChange(isOpen, this.ctx);
            this.onSendDataToCity(this.isOpen)
        },
        get isOpen() {
            return this._isOpen
        },
        onProvinceOpenChange: function (isOpen, ctx) { //省份逻辑业务
            $('.province').attr('data-open', 0);
            $('.province').removeClass('open');
            ctx.attr('data-open', isOpen);
            this.isOpen === 1 ? ctx.addClass('open') : ctx.removeClass('open');
        },
        onSendDataToCity: function (isOpen) { //向城市传递数据
            for (var v in cityOpen) {
                if (cityOpen[v].pName === this.pName) {
                    cityOpen[v].recieveDataFromProvince(isOpen)
                } else {
                    cityOpen[v].recieveDataFromProvince(0)
                }
            }


        },
    }
    cityOpen[pro] = [];
    var ctx = $('.city-box[data-province=' + pro + ']')
    cityOpen[pro] = {
        ctx: ctx,
        pName: pro,
        _isOpen: false,
        set isOpen(isOpen) { //仅限于 自己改变自己状态时触发
            this._isOpen = isOpen;
            this.onSendDataToProvince(isOpen, this.pName);
            this.onCityStateChange(isOpen, this.ctx);
        },
        get isOpen() {
            return this._isOpen;
        },
        onCityOpenChange: function (isOpen, ctx) { //城市逻辑业务
            ctx.attr('data-open', isOpen);
            this.isOpen === 1 ? ctx.addClass('open') : ctx.removeClass('open');
        },
        recieveDataFromProvince: function (isOpen) { //接受省份传过来的数据
            this._isOpen = isOpen;
            this.onCityOpenChange(isOpen, this.ctx);
        }
    }
});