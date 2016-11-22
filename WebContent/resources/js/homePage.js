
$().ready(function() {
    originTool();
    banner();
    client();
    initVideo();
    scrollBack();
    ourYouDian();

});

function scrollBack() {


    var top = $('#advan').position().top;
    //$('.advanBack').css('top',top);
    //var endPos = top + 822;
    // $(window).scroll(function(event) {
    //     var scrollTop = $(document).scrollTop() + 500;
    //     var pos = scrollTop - top - 500;
    //     console.info('top' + top + "scrollTop" + scrollTop + "pos" + pos);
    //     if (scrollTop > top && scrollTop < endPos) {
    //         $('#advan').css('background-position-y', pos);
    //     }
    //     if (scrollTop < top) {
    //         $('#advan').css('background-position-y', '-500');
    //     }
    // });

    //     $(window).scroll(function(event) {
    //     var scrollTop = $(document).scrollTop();
    //      $('.advanBack').css('top',scrollTop);
    // });

}


function client() {
    var num = $("#Clients .logo");
    num.hover(function() {  
        var top = $(this).position().top;
        var left = $(this).position().left;
        //    console.info('top=' + top + 'left' + left);
        // $('.noLi').css('left', left);
        // $('.noLi').css('top', top);
        // $('.noLi').css('opacity', '0.5');
        // $('.noLi').css('display', 'block');
    });

    $('#Clients').hover(function() {}, function() {
        $('.noLi').css('display', 'none');
    });
}

//特效优势
function ourYouDian() {


    $("#caLogo1").hover(function() {
        $('#caLogo1w').removeClass('oro');
        $('#caLogo1w').addClass('hoverLogo');
    }, function() {
        $('#caLogo1w').removeClass('hoverLogo');
        $('#caLogo1w').addClass('oro');
    });

    $("#caLogo2").hover(function() {
        $('#caLogo2w').removeClass('oro');
        $('#caLogo2w').addClass('hoverLogo');
    }, function() {
        $('#caLogo2w').removeClass('hoverLogo');
        $('#caLogo2w').addClass('oro');
    });

    $("#caLogo3").hover(function() {
        $('#caLogo3w').removeClass('oro');
        $('#caLogo3w').addClass('hoverLogo');
    }, function() {
        $('#caLogo3w').removeClass('hoverLogo');
        $('#caLogo3w').addClass('oro');
    });

}


function originTool() {

    // $('.flexslider').flexslider({
    //     directionNav: true,
    //     pauseOnAction: false,
    //     slideshowSpeed: 40000
    // });


    // 滚动监听 start
    $('.dropdown').waypoint(function(direction) {
        if (direction == "up") { // 了解 拍片网之前
            $('#header').removeClass('headerMove');
        } else {
            $('#header').addClass('headerMove');
        }

    $('#search').unbind('click');
        $('#search').bind('click', function() {
            searchOnclick();
        });

    });

    //下拉监听
    
	$(".dropdown").on('click',function(){
		$(this).find('ul').slideDown();
		return false;
	});

     $('li').on('click',function(){
          $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());
          $(this).parent().slideUp();
          return false;
     });

//    $("#selectType").hover(function() {
//        $('#selectUl').slideDown();
//    }, function() {
//        //   $('#selectUl').slideUp();
//    });

//    $("#selectType").find('ul').find('li').on('click', function() {
//        $(this).parent().parent().find('span').text($(this).text());
//        $('#selectUl').slideUp();
//    });
    // $('.dropdown').hover(function() {
    //     function() {
    //         alert(1);
    //         $('.dropdown-menu').sliderDown()
    //     },
    //     function() {
    //         $('.dropdown-menu').sliderUp()
    //     }
    // })

    $('#classical').waypoint(function() {
        $('.cardUl').find('li').addClass('topAnimaltion');
    }, { offset: 500 });

    $('.hereClients').waypoint(function() {
        $('#Clients').find('.up').css('top', '0');
        $('#Clients').find('.up').css('opacity', '1');
        $('#Clients').find('.down').css('top', '0');
        $('#Clients').find('.down').css('opacity', '1');
    }, { offset: 255 });

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
        autoplay: 3000,
        onSlideChangeEnd: function(swiper) {
            var number = swiper.activeIndex; //每次切换时，提示现在是第几个slide
            // switch (number) {
            //     case 0:
            //         $('#bannerTitleAn1').addClass('showTitle');
            //         $('#DescAn1').addClass('showTitle');
            //         break;
            //     case 1:
            //         $('#bannerTitleAn2').addClass('showTitle2');
            //         $('#DescAn2').addClass('showTitle2');
            //         break;
            //     case 2:
            //         $('#bannerLast').addClass('showTitle3');
            //         $('#DescLast').addClass('showTitle3');
            //         break;

            // }
        },
    });

}


function initVideo() {
    $('#showVideoS').on('click', function() {
        $('#showVideo').click();
    });

}

var homePage = {
	init:function(){
		//点击帮我推荐提交订单
		this.clickHelpYou();
		//获取热门爆款和经典案例
		this.getRecommendProduct();
		//获取首页推荐导演
		this.getRecommendTeam();
		//获取推荐新闻
		this.getRecommendNews();
	},
	clickHelpYou:function(){
		$(".helpYou").off("click").on("click",function(){
			var phone = $("#help-phone").val();
			if(phone==''){
				alert("请输入手机号")
				return false;
			}
			if(!checkMobile(phone)){
				alert("请输入正确格式的手机号")
				return false;
			}else{
				$.ajax({
					url : '/order/submit',
					type : 'POST',
					data : {
						csrftoken:$("#csrftoken").val(),
						indent_tele:$("#help-phone").val(),
						phoneCode:'-1',
						indent_recomment:$("#indent_recomment").text(),
						indentName:'新订单',
						productId:-1,
						teamId:-1,
						serviceId:-1
					},
					dataType : 'json',
					success : function(data){
						window.location.href='/search?q='+$("#indent_recomment").text();
					}
				});
			}
		})
	},
	getRecommendProduct:function(){
		var _this = this;
		loadData(function(data){
			if(data.code==1){
				var result = data.result;
				var hot_section = new Array(); // 第一区域
				var classical_section = new Array(); // 第二区域
				$.each(result,function(i,solr){
					if(solr.recommend == 1){
						hot_section.push(solr);
					}
					if(solr.recommend == 2){
						classical_section.push(solr);
					}
				});
				$("#product-container").empty().html(juicer(homePage_tpl.hot_recommend,{list:hot_section}));
				//初始化爆款加载
				_this.cover();
				$(".cardUl").empty().html(juicer(homePage_tpl.classical_recommend,{list:classical_section}));
			}else{
				alert("数据加载错误")
			}
		}, getContextPath() + '/home/product/loadProduct/',null);
	},
	cover:function(){
		 var statues = true;
	    var nowIndex = 0;
	    var cover = new Swiper('.swiperCover', {
	        pagination: '.swiper-pagination-cover',
	        paginationClickable: true,
	        effect: 'coverflow',
	        grabCursor: true,
	        centeredSlides: true,
	        slidesPerView: 'auto',
	        loop: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        coverflow: {
	            rotate: 0,
	            stretch: 100,
	            depth: 00,
	            modifier: 1,
	            slideShadows: true
	        },
	        // onSlideChangeEnd: function(swiper) {
	        //     nowIndex = swiper.activeIndex;
	        //     console.info(nowIndex);
	        //     statues = true;
	        // },
	    });
	    $('.leftClick').on('click', function() {

	        // if (nowIndex == 0) {
	        //     cover.slideTo(6, 1000, false);
	        //     nowIndex = 6;
	        // } else {
	        //     //cover.slidePrev();
	        //     $('.backgroundCover .swiper-button-prev').click();
	        // }
	        //  cover.detachEvents();
	        cover.slidePrev();
	    });
	    $('.rightClick').on('click', function(e) {
	        //  cover.detachEvents();
	        cover.slideNext();
	    });
	},
	getRecommendTeam:function(){
		var _this = this;
		loadData(function(data){
			if(data.code==1){
				$("#directorContent").empty().html(juicer(homePage_tpl.team_recommend,data));
				//渲染team效果
				_this.director();
			}else{
				//TODO
				console.log("数据加载错误")
			}
		}, getContextPath() + '/home/team/recommend',null);
	},
	director:function(){

	    var director = new Swiper('.swiper-director', {
	        pagination: '.swiper-pagination',
	        slidesPerView: 5,
	        centeredSlides: true,
	        paginationClickable: true,
	        spaceBetween: 12,
	        grabCursor: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        loop: true
	    });

	    var images = new Array(
	        'url(/resources/images/index/db1.png) no-repeat',
	        'url(/resources/images/index/db2.png) no-repeat',
	        'url(/resources/images/index/db3.png) no-repeat',
	        'url(/resources/images/index/db4.png) no-repeat',
	        'url(/resources/images/index/db5.png) no-repeat',
	        'url(/resources/images/index/db6.png) no-repeat',
	        'url(/resources/images/index/db7.png) no-repeat',
	        'url(/resources/images/index/db8.png) no-repeat',
	        'url(/resources/images/index/db9.png) no-repeat',
	        'url(/resources/images/index/db10.png) no-repeat',
	        'url(/resources/images/index/db11.png) no-repeat',
	        'url(/resources/images/index/db12.png) no-repeat',
	        'url(/resources/images/index/db13.png) no-repeat',
	        'url(/resources/images/index/db14.png) no-repeat',
	        'url(/resources/images/index/db15.png) no-repeat',
	        'url(/resources/images/index/db16.png) no-repeat'
	    );


	    var initM = $('#directorContent .swiper-slide .m');
	    $.each(initM, function(i, item) {
	        //   var num = parseInt(Math.random() * 15) + 0;
	        $(this).css('background', images[i]);
	    });

	    var dirSwi = $('#directorContent .swiper-slide');

	    // dirSwi.hover(function() {

	    // }, function() {
	    //     var num = parseInt(Math.random() * 15) + 0;
	    //     $(this).find('.m').css('background', images[num]);
	    // });
	},
	getRecommendNews:function(){
		var _this = this;
		loadData(function(data){
			if(data.code==1){
				$("#news-container").empty().html(juicer(homePage_tpl.news_resommend,data));
				_this.getNewsDetail();
			}else{
				//TODO
				console.log("数据加载错误")
			}
		}, getContextPath() + '/home/news/recommend',null);
	},
	getNewsDetail:function(){
		$(".get-new-detail").off("click").on("click",function(){
			var id = $(this).parent("li").attr("data-id");
			window.location.href="home/news/info/"+id;
		})
	}
}
homePage.init();


var homePage_tpl = {
	hot_recommend:[
	        '{@each list as item}',
			'<div class="swiper-slide coverSlide">',
			'	<div class="scaleDiv">',
			'		<img src="'+getDfsHostName()+'${item.picLDUrl}">',
			'		<div class="coverContent">',
			'			<div class="">${item.productName}</div>',
			'			<div>￥${item.price}</div>',
			'		</div>',
			'	</div>',
			'</div>',
			'{@/each}'
       	 ].join(""),
    classical_recommend:[
            '{@each list as item}',
			'<li class="topAnimaltion">',
			'	<div class="videoCard">',
			'		<img src="'+getDfsHostName()+'${item.picLDUrl}">',
			'		<div class="videoContet">',
			'			<div class="title">${item.productName}</div>',
			'			<div class="type">${item.tags}</div>',
		    '			<div class="price">￥${item.price}</div>',
		    '			{@if item.orignalPrice != null && item.orignalPrice != 0}',
		    '				<div class="realPrice">原价￥${item.orignalPrice}</div>',
			'			{@/if}',
			'		</div>',
			'	</div>',
			'</li>',
			'{@/each}'
         ].join(""),
     team_recommend:[
            '{@each result as item}',      
			'<div class="swiper-slide">',
			'	<div class="m"></div>',
			'	<div class="b"></div>',
			'	<div class="directorContent">',
			'		<img src="'+getDfsHostName()+'${item.teamPhotoUrl}">',
			'		<div class="title">${item.teamName}</div>',
			'		<div class="line"></div>',
			'		<div class="content">${item.description}</div>',
			'		<div class="toProduct">作品集</div>',
			'	</div>',
			'</div>',  
			'{@/each}'
         ].join(""),
     news_resommend:[
            '{@each result as item}',        
			'<li data-id=${item.id}>',
			'	<div class="get-new-detail newsTitle">${item.title}</div>',
			'	<div class="newsLine"></div>',
			'	<div class="Content">${item.discription}</div>',
			'	<div class="get-new-detail newsMore">',
			'		<span>了解更多</span>',
			'		<img src="/resources/images/index/newsMore.png">',
			'	</div>',
			'</li>',
			'{@/each}'
         ].join("")
		
}


