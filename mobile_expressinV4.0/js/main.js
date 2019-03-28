function setImgSize(){
    var vW=$(window).width();
    var vH=$(window).height();

    if((vW/vH)>(1080/1920)){
        $('.bg_box>img').css('width','100%');
    }else{
        $('.bg_box>img').css('height','100%');
    }
}
setImgSize()