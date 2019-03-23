function imgLoad(imgSrcs, callback) {
    var ar = 0;
    console.log(imgSrcs)
    imgSrcs.forEach(function (v, i) {
        var img = new Image();
        img.src = v;
        var timer = setInterval(function () {
            if (img.complete) {
                ar++;
                clearInterval(timer)
                if (ar === imgSrcs.length) {
                    callback()
                }
            }
        }, 50)
    });
}
imgLoad(RenderHtml.imgSrcs, function () {
    $('.swiper-container').show();
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        pagination: {
            type:'fraction',
            el: '.swiper-pagination',
            // dynamicBullets: true,
            // dynamicMainBullets: 10,
            // clickable: true,
        },
        keyboard: true,
        on: {
            slideChangeTransitionEnd: function () {
                RenderHtml.onCurrentPageAction(this.activeIndex);
            },
        },
        threshold:30,
        noSwipingSelector:'#treemap-civil-servent,#bar3d-civil-servent,#bar3d-owners,#graph-owners,#graph-civil-servent,#bar3d-adults,#graph-adults'
    });

    $('.cover').hide();
    $('.jump input').blur(function (e) {
        var val = $(this).val();
        mySwiper.slideTo(val, 500, false)
    })
});