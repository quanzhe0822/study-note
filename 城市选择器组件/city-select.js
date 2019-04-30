;
(function (undefined) {
    "use strict"
    var _global;
    var $ = document.querySelector.bind(document);
    /**
     * 
     * @param {Function} subObj 子类构造函数 
     * @param {Array|Function} supers 父类构造函数
     */
    function inheritPrototype(subObj, supers) {
        if (supers) {
            if (supers instanceof Array) {
                for (var n = 0; n < supers.length; n++) {
                    for (var i in supers[n].prototype) {
                        subObj.prototype[i] = supers[n].prototype[i]
                    }
                }
            } else {
                for (var i in supers) {
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
    var $ev = new CustomEvent();

    var datas = {};
        // this.state = {
        //     regionsLen: 8,
        //     regionCheckedCount: 0,
        //     isAllChecked: false,
        //     regions: {
        //         '东北': {
        //             name: '东北',
        //             type: 'region',
        //             rid: 1,
        //             provincesLen: 10,
        //             provinceCheckedCount: 0,
        //             checked: false,
        //             eleClassName: '.region_1',
        //             childrens: {
        //                 '吉林省': {
        //                     name: '吉林省',
        //                     type: 'province',
        //                     pid: 10030,
        //                     rid: 1,
        //                     regionName: '东北',
        //                     citiesLen: 10,
        //                     cityCheckedCount: 0,
        //                     checked: false,
        //                     eleClassName = '.pro_100030',
        //                     childrens: {
        //                         '延边': {
        //                             name: '延边',
        //                             pid: 10030,
        //                             rid: 1,
        //                             id: 10030,
        //                             checked: false,
        //                             type: 'city',
        //                             eleClassName = '.city_10030'
        //                         }
        //                     }
        //                 }
        //             }
        //         }

        //     }
        // }


    /**
     * 区域类
     */
    function Region() {
        this.REGION_BOX_CLASS = 'region';
        this.regionBoxEle = '';
        this._init();
    }
    Region.prototype = {
        _init: function () {
            var listHTML = '<li><label class="region-all"><input type="checkbox" value="all-region" name="all-region"><span>全选</span></label></li>';
            var _this = this;
            var regionBox = document.createElement("ul");
            regionBox.className = _this.REGION_BOX_CLASS;
            datas.regions.forEach(function (d, i) {
                listHTML += '<li class="'+d.eleClassName+'"  data-name="' + d.name + '><input type="checkbox" class="checkbox" value="' + d.rName + '" name="region"><span  class="region">' + d.rName + '</span></li>'
            });
            regionBox.innerHTML = listHTML;
            _this.regionBoxEle = regionBox;
            $('#city-select').appendChild(_this.regionBoxEle);

            _this.regionBoxEle.addEventListner('click', function (e) {
                var region = datas.regions[e.parentNode.getAttribute('data-name')];
                if (e.target.className === 'checkbox') {
                    _this._changeRegionState(region, e);
                } else {}
            }, false);

            $ev.on('onProvinceSendDataToRegion',this._events[onProvinceSendDataToRegion])
            $ev.on('onSelectAll',this._events[onSelectAll])
        },

        _update: function (e) {
            var state = e.region.state;
            var ele = $(e.region.eleClassName);
            state?ele.classList.add('select'):ele.classList.remove('select');
        },
        _changeRegionState: function (region, nativeEvent) {
            region.state = !region.state;
            $ev.emit({
                type: 'onRegionSendDataToProvince',
                region,
                nativeEvent: event.nativeEvent
            }) //更新的数据传给省份;
            $ev.emit({
                type: 'onAllChecked',
                region,
                nativeEvent: event.nativeEvent,
            }); //更新数据传给全局
            _this._update({region,nativeEvent})
        },
        _events: {
            'onProvinceSendDataToRegion': function (event) {
                var state = event.province.state;
                var region = datas.regions[event.province.regionName];
                if (typeof (state) === 'boolean' && state) {
                    region.provinceCheckedCount++;
                    if (region.provinceCheckedCount === region.provincesLen) {
                        region.state = true;
                        $ev.emit({
                            type: 'onAllChecked',
                            region,
                            nativeEvent: event.nativeEvent,
                        }); //更新数据传给全局
                    }
                } else {
                    region.provinceCheckedCount--;
                    if (region.provinceCheckedCount === region.provincesLen - 1) {
                        region.state.state = false;
                        $ev.emit({
                            type: 'onAllChecked',
                            region,
                            nativeEvent: event.nativeEvent,
                        }); //更新数据传给全局
                    }
                }
            },
            'onSelectAll': function (event) {
                var regions = datas.regions;
                regions.forEach(function (region) {
                    region.state = this.isAllChecked.state;
                    if (region.state) {
                        region.prosCheckedCount = e.prosLength;
                    } else {
                        region.prosCheckedCount = 0;
                    }
                    emit({
                        type: 'onRegionSendDataToProvince',
                        regions,
                        nativeEvent: event.nativeEvent
                    }) //更新的数据传给省份;
                })
            }
        }
        

    }



    // /**
    //  * 省份类
    //  */
    // function Province() {
    //     this.provinces = [];
    //     this.provinceBoxEle = null;
    //     this.PROVINCE_BOX_CLASS = 'province';
    // }
    // Province.prototype.provinceInit = function (provinceDatas) {
    //     var _this = this;
    //     provinceDatas.forEach(function (p) {
    //         _this.provinces.push({
    //             citiesLength: p.citiesLength,
    //             isAllCityChecked: p.isAllCityChecked,
    //             isPartCityChecked: p.isPartCityChecked,
    //             provinceId: p.provinceId,
    //             provinceName: p.provinceName,
    //             rName: p.rName,
    //             rid: p.rid,
    //             cityCheckedCount: 0
    //         })
    //     })
    // }
    // Province.prototype._provinceRender = function () {
    //     var listHTML = '<li><label><input type="checkbox" value="all-province" name="all-province"><span>全选</span></label></li>';
    //     var _this = this;
    //     if (!$(_this.PROVINCE_BOX_CLASS)) {
    //         var provinceBox = document.createElement("ul");
    //         provinceBox.className = _this.PROVINCE_BOX_CLASS;
    //         _this.provinceBoxEle = provinceBox;
    //     }
    //     provinceDatas.forEach(function (d, i) {
    //         listHTML += '<li><input type="checkbox" value="' + d.pName + '" name="province"><span>' + d.pName + '</span></li>'
    //     });
    //     _this.provinceBoxEle.innerHTML = listHTML;
    //     return _this.provinceBoxEle;
    // }



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
        
        this._init(datas);

    }
    CitySelect.prototype._init = function (datas) {
        state=datas;
        
        



        new Region()
    };






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