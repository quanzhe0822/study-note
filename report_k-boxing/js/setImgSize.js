
if(1920/1080>vW/vH){
    $('img').css('width','100%');
    $('.img-box').css({
        width:vW,
        height:vW/(1920/1080)
    }); 
}else{
    $('img').css('height','100%')
    $('.img-box').css({
        width:vH*(1920/1080),
        height:vH
    })
}