$().ready(function(){
	controlEnglish();
	var nowNum = $('.swiper-title-active').attr('data-num');
	var title = new Swiper('.swiper-title-container', {
        slidesPerView: 8,
        paginationClickable: true,
        spaceBetween:0,
        initialSlide:nowNum,
        nextButton : '.swiper-button-title-next',
		prevButton : '.swiper-button-title-prev'
    });
});
