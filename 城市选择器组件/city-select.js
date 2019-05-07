;
(function (undefined) {
    "use strict"
    var _global;
    var $ = document.querySelector.bind(document);

    function siblings(el) {
        return Array.prototype.filter.call(el.parentNode.children, function (child) {
            return child !== el;
        });
    };

    function toArrs(likeArrs) {
        return Array.prototype.slice.call(likeArrs)
    }
    /**
     * 
     * @param {Function} subObj 子类构造函数 
     * @param {Array|Function} supers 父类构造函数
     */
    function inheritPrototype(subObj,supers) {
        if (supers) {
            if (supers instanceof Array) {
                for (var n = 0; n < supers.length; n++) {
                    for (var i in supers[n].prototype) {
                        subObj.prototype[i] = supers[n].prototype[i]
                    }
                }
            } else {
                for (var i in supers.prototype) {
                    subObj.prototype[i] = supers.prototype[i]
                }
            }
        }
        
    }

    function CustomEvent() {
        this.handlers = {};
    }
    CustomEvent.prototype = {
        on: function (type, handler) {
            var _this = this;
            if (_this.handlers[type] === undefined) {
                _this.handlers[type] = [];
            }
            _this.handlers[type].push(handler);
            return _this;
        },
        off: function (type, handler) {
            var _this = this;

            if (_this.handlers[type] instanceof Array) {
                var handlers = _this.handlers[type];
                for (var i = 0; i < handlers.length; i++) {
                    if (handlers[i] === handler) {
                        handlers.splice(i, 1);
                        break;
                    }
                }
            }
        },
        emit: function (event) {
            var _this = this;

            if (!event.target) {
                event.target = this;
            }
            if (!!event.type && _this.handlers[event.type] instanceof Array) {
                var handlers = _this.handlers[event.type];
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i](event)
                }
                return true;
            }
            return false;
        }
    }




    /**
     * 区域类
     */
    function Region() {
        this.REGION_BOX_CLASS = 'region_box';
        this.regionBoxEle = null;
        this._init();
    }
    Region.prototype = {
        _init: function () {
            var listHTML = '<li><label class="region-all"><input type="checkbox" value="all-region" name="all-region"><span>全选</span></label></li>';
            var _this = this;
            var regionBox = document.createElement("ul");
            regionBox.className = _this.REGION_BOX_CLASS;
            for (var r in datas.regions) {
                var d = datas.regions[r];
                listHTML += '<li class="' + d.eleClassName + '"  data-name="' + d.name + '" ><input type="checkbox" class="checkbox" value="' + d.name + '" name="region"><span  class="region">' + d.name + '</span></li>';
            }

            regionBox.innerHTML = listHTML;
            _this.regionBoxEle = regionBox;
            $('#city-select').appendChild(_this.regionBoxEle);
            //使用事件委托处理区域的点击事件
            _this.regionBoxEle.addEventListener('click', function (e) {
                var region = datas.regions[e.target.parentNode.getAttribute('data-name')];
                if (e.target.className === 'checkbox') {
                    _this._toggleRegionState({
                        region: region,
                        nativeEvent: e
                    });

                } else if (e.target.className === 'region') {
                    _this._toggleProvinceBoxDisplay({
                        region: region,
                        nativeEvent: e
                    });
                }
            }, false);

            //监听省份点击事件和全选按钮点击事件
            $ev.on('onProvinceSendDataToRegion', _this.onProvinceSendDataToRegion.bind(this));
            $ev.on('onSelectAll', _this.onSelectAll);
        },

        _toggleProvinceBoxDisplay: function (e) {
            var region = e.region;
            var nativeEvent = e.nativeEvent;
            var ele = $('.' + region.eleClassName);
            $ev.emit({
                type: 'onToggleProvinceboxDisplay',
                region: region,
                nativeEvent: nativeEvent
            });

            if (ele.classList.contains('open')) {
                ele.classList.remove('open');
            } else {
                ele.classList.add('open');
                toArrs(siblings(ele)).forEach(function (e) {
                    e.classList.remove('open')
                })
            }
        },
        _changeCheckboxStyle: function (region) {
            var ele = $('.' + region.eleClassName);
            region.checked ? ele.classList.add('select') : ele.classList.remove('select');
            ele.querySelector('input').checked = region.checked;
        },
        //切换大区选定状态
        _toggleRegionState: function (e) {
            var region = e.region;
            region.checked = !region.checked;
            var nativeEvent = e.nativeEvent;

            //更新的数据传给省份模块;
            $ev.emit({
                type: 'onRegionSendDataToProvince',
                region: region,
                nativeEvent: nativeEvent,
            })
            //更新的数据传给全选模块
            $ev.emit({
                type: 'onAllChecked',
                region: region,
                nativeEvent: nativeEvent,
            });
            this._changeCheckboxStyle(region)

        },



        onProvinceSendDataToRegion: function (event) {
            var state = event.province.checked;
            var region = datas.regions[event.province.regionName];
            if (typeof (state) === 'boolean' && state) {
                region.provinceCheckedCount++;
                if (region.provinceCheckedCount === region.provincesLen) {
                    region.checked = true;
                    $ev.emit({
                        type: 'onAllChecked',
                        region,
                        nativeEvent: event.nativeEvent,
                    }); //更新数据传给全局
                }
            } else {
                region.provinceCheckedCount--;
                if (region.provinceCheckedCount === region.provincesLen - 1) {
                    region.checked = false;
                    $ev.emit({
                        type: 'onAllChecked',
                        region,
                        nativeEvent: event.nativeEvent,
                    }); //更新数据传给全局
                }
            }
            this._changeCheckboxStyle(region)
        },
        onSelectAll: function (event) {
            var regions = datas.regions;
            regions.forEach(function (region) {
                region.checked = this.isAllChecked.state;
                if (region.state) {
                    region.prosCheckedCount = e.prosLength;
                } else {
                    region.prosCheckedCount = 0;
                }
                emit({
                    type: 'onRegionSendDataToProvince',
                    region,
                    nativeEvent: event.nativeEvent
                }) //更新的数据传给省份;
            })
        }



    }



    // /**0
    //  * 省份类
    //  */
    function Province() {
        this.provinceBoxEle = null;
        this.PROVINCE_BOX_CLASS = 'province_box';
        this.isOpen = false;
        this.currentRegion = null;
        this._init();
    }
    Province.prototype = {
        _init: function () {
            var _this = this;
            _this.provinceBoxEle = document.createElement("ul");
            _this.provinceBoxEle.className = _this.PROVINCE_BOX_CLASS;
            $('#city-select').appendChild(_this.provinceBoxEle);

            $ev.on('onToggleProvinceboxDisplay', _this.onToggleProvinceboxDisplay.bind(_this));
            $ev.on('onRegionSendDataToProvince', _this.onRegionSendDataToProvince.bind(_this));


        },
        _updateEle: function (event) {
            var listHTML = '';
            var region = event.region;
            var provinces = region.children;

            for (var p in provinces) {
                var province = provinces[p];
                listHTML += '<li class="' + province.eleClassName + '"  data-name="' + province.name + '" ><input type="checkbox"  class="checkbox" value="' + province.name + '" name="province"><span  class="province">' + province.name + '</span></li>';
            }
            this.provinceBoxEle.innerHTML = listHTML;
            for (var p in provinces) {
                var province = provinces[p];
                this._toggleProvinceState(province)
            }
        },
        _toggleProvinceState: function (province) {


            var ele = $('.' + province.eleClassName);
            if (!ele) return;
            province.checked ? ele.classList.add('select') : ele.classList.remove('select');
            ele.querySelector('input').checked = province.checked;



        },
        onToggleProvinceboxDisplay: function (event) {
            var _this = this;
            var region = event.region.name;
            if (region === _this.currentRegion) {
                if (_this.isOpen) {
                    _this.provinceBoxEle.classList.remove('show');
                    _this.isOpen = false;
                } else {
                    _this.provinceBoxEle.classList.add('show');
                    _this.isOpen = true;
                }
            } else {
                _this.provinceBoxEle.classList.add('show');
                _this.currentRegion = region;
                _this.isOpen = true;
                _this._updateEle(event);
            }

        },
        onRegionSendDataToProvince: function (event) {
            var _this = this;
            var region = event.region;
            var provinces = region.children;
            var state = region.checked;
            for (var p in provinces) {
                var province = provinces[p];
                province.checked = state;
                if (state === true) {
                    province.cityCheckedCount = province.citiesLen;
                } else {
                    province.cityCheckedCount = 0;
                }
                _this._toggleProvinceState(province)
                //更新的数据传给城市
                $ev.emit({
                    type: 'onProvinceSendDataToCity',
                    province,
                    nativeEvent: event.nativeEvent
                })
            }

        }
    }




    // /**
    //  * 城市类
    //  */
    // function City() {
    //     this.CITY_BOX_CLASS = 'city';
    //     this.cities = [];
    //     this.cityBoxEle = null;
    // }
    // City.prototype.cityInit = function (cityDatas) {
    //     var _this = this;
    //     if (cityDatas.length !== 0) {
    //         cityDatas.forEach(function (c) {
    //             _this.cities.push({
    //                 id: c.id,
    //                 isChecked: c.isChecked,
    //                 name: c.name,
    //                 pName: c.pName,
    //                 pid: c.pid,
    //                 rName: c.rName,
    //                 rid: c.rid
    //             })
    //         })
    //     }
    // }
    // City.prototype._cityRender = function (cityDatas) {
    //     var listHTML = '<li><label><input type="checkbox" value="all-city" name="all-city"><span>全选</span></label></li>';
    //     var _this = this;
    //     if (!_this.cityBoxEle) {
    //         var cityBox = document.createElement("ul");
    //         cityBox.className = _this.CITY_BOX_CLASS;
    //         _this.cityBoxEle = cityBox;
    //     }

    //     _this.cityBoxEle.forEach(function (d, i) {
    //         listHTML += '<li><input type="checkbox" value="' + d.name + '" name="city"><span>' + d.name + '</span></li>'
    //     });
    //     _this.cityBoxEle.innerHTML = listHTML;
    //     return _this.cityBoxEle;
    // }



    /**
     * 选择器类，继承了区域类，省份呢类，城市类，自定义事件类
     */
    function CitySelect(datas) {
        CustomEvent.call(this)
        this.datas = {};
        this.currentOpenRegion = null;
        this.currentOpenProvince = null;
        this.regionBoxEle=null;
        this.REGION_BOX_CLASS='region-box';

        this._init(datas);

    }
    inheritPrototype(CitySelect,CustomEvent);
    CitySelect.prototype._init = function (d) {
        var _this =this;
        this.datas = {
            regionsLen: d.length,
            regionCheckedCount: 0,
            isAllChecked: false,
        };
        var n = {};
        d.forEach(function (d) {
            n[d.rName] = {
                name: d.rName,
                type: 'region',
                rid: d.rid,
                provincesLen: d.children.length,
                provinceCheckedCount: 0,
                checked: false,
                eleClassName: 'region_' + d.rid,
                children: {},
            }
            d.children.forEach(function (p) {
                n[d.rName].children[p.provinceName] = {
                    name: p.provinceName,
                    type: 'province',
                    pid: p.provinceId,
                    rid: d.rid,
                    regionName: d.rName,
                    citiesLen: p.children.length,
                    cityCheckedCount: 0,
                    checked: false,
                    eleClassName: 'pro_' + p.provinceId,
                    children: {},
                }
                p.children.forEach(function (c) {
                    n[d.rName].children[p.provinceName].children[c.name] = {
                        name: '延边',
                        pid: 10030,
                        rid: 1,
                        id: 10030,
                        checked: false,
                        type: 'city',
                        eleClassName: 'city_10030'
                    }
                })
            })
        })
        this.datas.regions = n;

        new Jsonob(this.datas,this.update.bind(this))

        var listHTML = '<li><label class="region-all"><input type="checkbox" value="all-region" name="all-region"><span>全选</span></label></li>';
        var regionBox = document.createElement("ul");
        regionBox.className = this.REGION_BOX_CLASS;
        for (var r in this.datas.regions) {
            var d = this.datas.regions[r];
            listHTML += '<li class="' + d.eleClassName + '"  data-name="' + d.name + '" ><input type="checkbox" class="checkbox" value="' + d.name + '" name="region"><span  class="region">' + d.name + '</span></li>';
        }
        regionBox.innerHTML = listHTML;
        this.regionBoxEle = regionBox;
        $('#city-select').appendChild(this.regionBoxEle);

        _this.regionBoxEle.addEventListener('click', function (e) {
            if (e.target.className === 'checkbox') {
                _this.checkRegionItem(e);
                _this.emit({
                    type:'onCheckRegionItem',
                    target:_this
                })

            } else if (e.target.className === 'region') {
               
            }
        }, false);


    };
    CitySelect.prototype.update=function(ne,ol,paths){
        var datas =this.datas;
        console.log(paths[paths.length-1])
        
    };
    CitySelect.prototype.checkRegionItem = function (e) {
        var datas = this.datas;
        var regionName = e.target.parentNode.getAttribute('data-name');
        var region = datas.regions[regionName];
        region.checked = !region.checked;
        if (region.checked) {
            region.provinceCheckedCount = region.provincesLen;
            if (++datas.regionCheckedCount === datas.regionsLen) {
                isAllChecked = true;
            }
        } else {
            region.provinceCheckedCount = 0
            datas.regionCheckedCount--;
            isAllChecked = false;
        }
        for (var p in region.children) {
            var province = region.children[p];
            province.checked = region.checked;
            province.checked ? province.cityCheckedCount = province.citiesLen : province.cityCheckedCount = 0;
            for (var c in province.children) {
                var city = province.children[c];
                if (city) {
                    city.checked = region.checked;
                }

            }
        }
        console.log(datas)

    };
    CitySelect.prototype.checkProvinceItem = function (e) {
        var datas = this.datas;
        var region = this.currentOpenRegion;
        var provinceName = e.target.parentNode.getAttribute('data-name');
        var province = region.children[provinceName];
        province.checked = !province.checked;
        if (province.checked) {
            province.cityCheckedCount = province.citiesLen;
            if (++region.provinceCheckedCount === region.provincesLen) {
                region.checked = true;
                if (++datas.regionCheckedCount === datas.regionsLen) {
                    isAllChecked = true;
                }
            }
        } else {
            province.cityCheckedCount = 0;
            region.checked = false;
            if (--region.provinceCheckedCount === region.provincesLen - 1) {
                datas.regionCheckedCount--;
            }
            isAllChecked = false;
        }
        for (var c in province.children) {
            var city = province.children[c];
            if (city) {
                city.checked = province.checked;
            }

        }
        console.log(datas)
    }
    CitySelect.prototype.checkCityItem = function (e) {
        var data = this.datas;
        var region = this.currentOpenRegion;
        var province = this.currentOpenProvince;
        var cityName = e.target.parentNode.getAttribute('data-name');
        var city = province.children[cityName];
        city.checked = !city.checked;
        if (city.checked) {
            if (++province.cityCheckedCount === province.citiesLen) {
                province.checked =true;
                if(++regin.provinceCheckedCount === region.provincesLen){
                    region.checked=  true;
                    if(++datas.regionCheckedCount === region.regionsLen){
                        datas.isAllChecked = true;
                    }
                }
            }
        }else{
            if(--province.cityCheckedCount === province.citiesLen -1){
               if(--region.provinceCheckedCount === region.provincesLen-1){
                    datas.regionCheckedCount--;
                }
            }
            province.checked =false;
            region.checked =false;
            isAllChecked = false;
        }
        console.log(datas)
    }





    _global = (function () {
        return this || (1, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = CitySelect;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return CitySelect;
        });
    } else {
        !('CitySelect' in _global) && (_global.CitySelect = CitySelect);
    }
}())