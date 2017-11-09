$().ready(function(){
	controlEnglish();
	var title = new Swiper('.swiper-title-container', {
        slidesPerView: 8,
        paginationClickable: true,
        spaceBetween:0,
        nextButton : '.swiper-button-title-next',
		prevButton : '.swiper-button-title-prev'
    });
});
