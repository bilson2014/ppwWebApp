$().ready(function() {
    
    getVideoHeight();
    window.onresize = function(){
    	getVideoHeight();
    };
    banner();
    product();
    
});

function getVideoHeight(){
	    var screenWidth = document.documentElement.clientWidth;
	    var videoHeight = screenWidth/16*9*0.6;
	    if(screenWidth<=960){
	    	videoHeight = 320;
	    	  $('.swiper-banner').css('height','960px');
	    	  $('.swiper-banner').css('width','540px');
	    }
	    $('.swiper-banner').css('height',videoHeight);
}


function banner() {
    $('#bannerTitleAn1').addClass('showTitle');
    $('#DescAn1').addClass('showTitle');
    var banner = new Swiper('.swiper-banner', {
        pagination: '.swiper-pagination-banner',
        paginationClickable: true,
        loop: true,
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 5000,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        onSlideChangeEnd: function(swiper) {
            var number = swiper.activeIndex; //每次切换时，提示现在是第几个slide
        },
    });
}

function product(){
    var product = new Swiper('.swiper-product', {
        loop: true,
        grabCursor: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });
}

/**
 * 主页业务处理部分
 */
var homePage = {
	init:function(){
	
	},
	search:function(){
	
	},
	
}