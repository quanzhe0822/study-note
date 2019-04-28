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

    /**
     * 区域类
     */
    function Region() {
        this.REGION_BOX_CLASS = 'region';
        this.regionBoxEle = '';
        this.regions = [];
    }
    Region.prototype.regionInit = function (regionDatas) {
        var _this = this;
        regionDatas.forEach(function (r) {
            _this.regions.push({
                isAllProvinceChecked: r.isAllProvinceChecked,
                isPartProvinceChecked: r.isPartProvinceChecked,
                provinceLength: r.provinceLength,
                rName: r.rName,
                rid: r.rid,
                provinceCheckedCount: 0,
            })
        });
        _this.on('select', function (e) {
            console.log(e)
        });
        _this.on('open', function (e) {
            console.log(e)
        });
    }
    inheritPrototype(Region, CustomEvent);
    Region.prototype.regionRender = function () {
        var listHTML = '<li><label><input type="checkbox" value="all-region" name="all-region"><span>全选</span></label></li>';
        var _this = this;
        var regionBox = document.createElement("ul");
        regionBox.className = _this.REGION_BOX_CLASS;

        _this.regions.forEach(function (d, i) {
            listHTML += '<li><input type="checkbox" value="' + d.rName + '" data-rid="' + d.rid + '" name="region"><span class="item" data-rid="' + d.rid + '">' + d.rName + '</span></li>'
        });
        regionBox.innerHTML = listHTML;
        _this.regionBoxEle = regionBox;

        _this._afterRender();
        return regionBox;
    }
    Region.prototype._afterRender = function () {

        var _this = this;
        var arrs = Array.prototype.slice.call(_this.regionBoxEle.querySelectorAll('li span.item'));
        arrs.forEach(function (a) {
            a.onclick = function (e) {
                _this.emit({
                    type: 'open',
                    target: e.target
                });
            }
        })

    }


    var d =
        /**
         * 省份类
         */
        function Province() {0
            this.provinces = [];
            this.provinceBoxEle = null;
            this.PROVINCE_BOX_CLASS = 'province';
        }
    Province.prototype.provinceInit = function (provinceDatas) {
        var _this = this;
        provinceDatas.forEach(function (p) {
            _this.provinces.push({
                citiesLength: p.citiesLength,
                isAllCityChecked: p.isAllCityChecked,
                isPartCityChecked: p.isPartCityChecked,
                provinceId: p.provinceId,
                provinceName: p.provinceName,
                rName: p.rName,
                rid: p.rid,
                cityCheckedCount: 0
            })
        })
    }
    Province.prototype._provinceRender = function () {
        var listHTML = '<li><label><input type="checkbox" value="all-province" name="all-province"><span>全选</span></label></li>';
        var _this = this;
        if (!$(_this.PROVINCE_BOX_CLASS)) {
            var provinceBox = document.createElement("ul");
            provinceBox.className = _this.PROVINCE_BOX_CLASS;
            _this.provinceBoxEle = provinceBox;
        }
        provinceDatas.forEach(function (d, i) {
            listHTML += '<li><input type="checkbox" value="' + d.pName + '" name="province"><span>' + d.pName + '</span></li>'
        });
        _this.provinceBoxEle.innerHTML = listHTML;
        return _this.provinceBoxEle;
    }



    /**
     * 城市类
     */
    function City() {
        this.CITY_BOX_CLASS = 'city';
        this.cities = [];
        this.cityBoxEle = null;
    }
    City.prototype.cityInit = function (cityDatas) {
        var _this = this;
        if (cityDatas.length !== 0) {
            cityDatas.forEach(function (c) {
                _this.cities.push({
                    id: c.id,
                    isChecked: c.isChecked,
                    name: c.name,
                    pName: c.pName,
                    pid: c.pid,
                    rName: c.rName,
                    rid: c.rid
                })
            })
        }
    }
    City.prototype._cityRender = function (cityDatas) {
        var listHTML = '<li><label><input type="checkbox" value="all-city" name="all-city"><span>全选</span></label></li>';
        var _this = this;
        if (!_this.cityBoxEle) {
            var cityBox = document.createElement("ul");
            cityBox.className = _this.CITY_BOX_CLASS;
            _this.cityBoxEle = cityBox;
        }

        _this.cityBoxEle.forEach(function (d, i) {
            listHTML += '<li><input type="checkbox" value="' + d.name + '" name="city"><span>' + d.name + '</span></li>'
        });
        _this.cityBoxEle.innerHTML = listHTML;
        return _this.cityBoxEle;
    }


    /**
     * 选择器类，继承了区域类，省份呢类，城市类，自定义事件类
     */
    function CitySelect(datas) {
        Region.call(this);
        Province.call(this);
        City.call(this);
        CustomEvent.call(this);
        this.CITY_SELECT_ELE = $('#city-select');
        this.datas = datas;
        this.SELECT_BOX_CLASS = 'select-box';

        this._init();

    }
    inheritPrototype(CitySelect, [Region, Province, City, CustomEvent]);
    CitySelect.prototype._init = function () {

        var regions = [];
        var provinces = [];
        var cities = [];
        this.datas.forEach(function (d) {
            regions.push(d);
            if (d.children.length !== 0) {
                d.children.forEach(function (p, i) {
                    provinces.push(p);
                    if (p.children.length !== 0) {
                        p.children.forEach(function (c, i) {
                            cities.push(c);
                        })
                    }
                })
            }
        })

        this.regionInit(regions);
        this.provinceInit(provinces);
        this.cityInit(cities);

        this._render();
    };
    CitySelect.prototype._render = function (datas) {
        var _this = this;
        var selectBox = document.createElement("div");
        selectBox.className = _this.SELECT_BOX_CLASS;

        var regionBox = _this.regionRender(datas);
        selectBox.appendChild(regionBox);


        _this.CITY_SELECT_ELE.appendChild(selectBox);
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