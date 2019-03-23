var RenderHtml = {
    imgSrcs: [],
    html: '',
    pages:[{"page":1,"spec":false},{"page":2,"spec":false},{"page":3,"spec":false},{"page":4,"spec":false},{"page":5,"spec":false},{"page":6,"spec":false},{"page":7,"spec":false},{"page":8,"spec":false},{"page":9,"spec":false},{"page":10,"spec":false},{"page":11,"spec":false},{"page":12,"spec":false},{"page":13,"spec":false},{"page":14,"spec":false},{"page":15,"spec":false},{"page":16,"spec":false},{"page":17,"spec":false},{"page":18,"spec":false},{"page":19,"spec":true,"pName":"spe19"},{"page":20,"spec":false},{"page":21,"spec":false},{"page":22,"spec":false},{"page":23,"spec":true,"pName":"spe23"},{"page":24,"spec":false},{"page":25,"spec":false},{"page":26,"spec":false},{"page":27,"spec":false},{"page":28,"spec":false},{"page":29,"spec":false},{"page":30,"spec":false},{"page":31,"spec":true,"pName":"spe31"},{"page":32,"spec":false},{"page":33,"spec":false},{"page":34,"spec":false},{"page":35,"spec":false},{"page":36,"spec":false},{"page":37,"spec":false},{"page":38,"spec":false},{"page":39,"spec":false},{"page":40,"spec":false},{"page":41,"spec":false},{"page":42,"spec":false},{"page":43,"spec":false},{"page":44,"spec":true,"pName":"spe44"},{"page":45,"spec":false},{"page":46,"spec":false},{"page":47,"spec":false},{"page":48,"spec":true,"pName":"spe48"},{"page":49,"spec":false},{"page":50,"spec":false},{"page":51,"spec":false},{"page":52,"spec":false},{"page":53,"spec":false},{"page":54,"spec":false},{"page":55,"spec":false},{"page":56,"spec":true,"pName":"spe56"},{"page":57,"spec":false},{"page":58,"spec":false},{"page":59,"spec":false},{"page":60,"spec":false},{"page":61,"spec":false},{"page":62,"spec":false},{"page":63,"spec":false},{"page":64,"spec":false},{"page":65,"spec":false},{"page":66,"spec":false},{"page":67,"spec":false},{"page":68,"spec":false},{"page":69,"spec":true,"pName":"spe69"},{"page":70,"spec":false},{"page":71,"spec":false},{"page":72,"spec":false},{"page":73,"spec":true,"pName":"spe73"},{"page":74,"spec":false},{"page":75,"spec":false},{"page":76,"spec":false},{"page":77,"spec":false},{"page":78,"spec":false},{"page":79,"spec":false},{"page":80,"spec":false},{"page":81,"spec":true,"pName":"spe81"},{"page":82,"spec":false},{"page":83,"spec":false},{"page":84,"spec":false},{"page":85,"spec":false},{"page":86,"spec":false},{"page":87,"spec":false},{"page":88,"spec":false},{"page":89,"spec":false},{"page":90,"spec":false},{"page":91,"spec":false},{"page":92,"spec":false},{"page":93,"spec":false},{"page":94,"spec":false},{"page":95,"spec":false},{"page":96,"spec":false},{"page":97,"spec":false},{"page":98,"spec":false},{"page":99,"spec":false},{"page":100,"spec":false},{"page":101,"spec":false},{"page":102,"spec":false},{"page":103,"spec":false},{"page":104,"spec":false},{"page":105,"spec":false},{"page":106,"spec":false},{"page":107,"spec":true,"pName":"spe107"},{"page":108,"spec":false},{"page":109,"spec":false},{"page":110,"spec":false},{"page":111,"spec":false},{"page":112,"spec":false},{"page":113,"spec":false},{"page":114,"spec":false},{"page":115,"spec":false},{"page":116,"spec":false}],
    render: function () {
        for (var n = 1; n <= 115; n++) {
            
            if (this.pages[n - 1].spec) {
                this.html += configAnimationHtml(this.pages[n - 1].pName).html;
            } else {
                this.imgSrcs.push('images/p%20(' + n + ').jpeg');
                this.html += '<div class="swiper-slide"><div class="hidden"></div><img src="./images/p (' + n + ').jpeg"></div>'
            }
        }
        $('.swiper-wrapper').append(this.html);
    },
    onCurrentPageAction: function (index) {
        if (this.pages[index].spec) {
            var ob = configAnimationHtml(this.pages[index].pName);
            ob.action();
        }
    },
}
RenderHtml.render();