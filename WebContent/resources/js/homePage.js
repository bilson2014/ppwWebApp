
$().ready(function() {
    originTool();
    banner();
    client();
    scrollBack();
    ourYouDian();
});

function scrollBack() {
    var top = $('#advan').position().top;
}


function client() {
    var num = $("#Clients .logo");
    num.hover(function() {  
        var top = $(this).position().top;
        var left = $(this).position().left;
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

    // 滚动监听 start
    $('.changeHideHeader').waypoint(function(direction) {
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
     $('.dropdown li').on('click',function(){
          $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());
          $(this).parent().slideUp();
          return false;
     });

    $('#classical').waypoint(function() {
        //$('.cardUl').find('li').addClass('topAnimaltion');
    }, { offset: 600 });
    $('.hereClients').waypoint(function() {
        $('#Clients').find('.up').css('top', '0');
        $('#Clients').find('.up').css('opacity', '1');
        $('#Clients').find('.down').css('top', '0');
        $('#Clients').find('.down').css('opacity', '1');
    }, { offset: 1500 });
    
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
        onSlideChangeEnd: function(swiper) {
            var number = swiper.activeIndex; //每次切换时，提示现在是第几个slide
        },
    });
}

/**
 * 主页业务处理部分
 */
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
		//案例找创意
		this.search();
		//立即下单
		this.deliverOrder();
		//初始化视频加载
		this.initVideo();
	},
	search:function(){
		$(".home-search").off("click").on("click",function(){
			var flag = $(this).attr("data-text");
			window.location.href='/search?q='+flag;
		})
	},
	deliverOrder:function(){
		$(".home-order").off("click").on("click",function(){
			var flag = $(this).attr("data-text");
			showOrder(flag);
		})
	},
	clickHelpYou:function(){
		$(".helpYou").off("click").on("click",function(){
			var phone = $("#help-phone").val();
			showError($('.bannerOut'),'');
			if(phone==''){
				showError($('.bannerOut'),'请填写手机号');
				return false;
			}
			if(!checkMobile(phone)){
				showError($('.bannerOut'),'手机格式不正确');
				return false;
			}else{
				$.ajax({
					url : '/order/deliver',
					type : 'POST',
					data : {
						csrftoken:$("#csrftoken").val(),
						indent_tele:$("#help-phone").val(),
						phoneCode:'-1',
						indent_recomment:$("#indent_recomment").text(),
						indentName:'新订单',
						productId:-1,
						teamId:-1,
						serviceId:-1,
						sendToStaff:true,
						sendToUser:false
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
				juicer.register('thousandCount', thousandCount);
				$("#product-container").empty().html(juicer(homePage_tpl.hot_recommend,{list:hot_section}));
				//初始化爆款加载
				_this.cover();
				$(".cardUl").empty().html(juicer(homePage_tpl.classical_recommend,{list:classical_section}));
			}else{
				alert("数据加载错误")
			}
		}, getContextPath() + '/home/product/loadProduct/',$.toJSON({
			sort:"supportCount"
		}));
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
	        }
	    });
	    $('.leftClick').on('click', function() {

	        cover.slidePrev();
	    });
	    $('.rightClick').on('click', function(e) {
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
//				 $('.dContent').each(function(i){ 
//               	  var node=document.getElementsByClassName('dContent')[i];  
//    			      $clamp(node,{clamp:3});     
//               	  }); 
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
	       // centeredSlides: true,
	        paginationClickable: true,
	        spaceBetween: 12,
	        grabCursor: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        loop: true
	    });

	    var images = new Array(
	        'url(/resources/images/index/db1.jpg) no-repeat',
	        'url(/resources/images/index/db2.jpg) no-repeat',
	        'url(/resources/images/index/db3.jpg) no-repeat',
	        'url(/resources/images/index/db4.jpg) no-repeat',
	        'url(/resources/images/index/db5.jpg) no-repeat',
	        'url(/resources/images/index/db6.jpg) no-repeat',
	        'url(/resources/images/index/db7.jpg) no-repeat',
	        'url(/resources/images/index/db8.jpg) no-repeat',
	        'url(/resources/images/index/db9.jpg) no-repeat',
	        'url(/resources/images/index/db10.jpg) no-repeat',
	        'url(/resources/images/index/db11.jpg) no-repeat',
	        'url(/resources/images/index/db12.jpg) no-repeat',
	        'url(/resources/images/index/db13.jpg) no-repeat',
	        'url(/resources/images/index/db14.jpg) no-repeat',
	        'url(/resources/images/index/db15.jpg) no-repeat',
	        'url(/resources/images/index/db16.jpg) no-repeat',
	        'url(/resources/images/index/db17.jpg) no-repeat',
	        'url(/resources/images/index/db18.jpg) no-repeat',
	        'url(/resources/images/index/db19.jpg) no-repeat'
	    );


	    var initM = $('#directorContent .swiper-slide .m');
	    $.each(initM, function(i, item) {
	        $(this).css('background', images[i]);
	    });

	    var dirSwi = $('#directorContent .swiper-slide');

	},
	getRecommendNews:function(){
		var _this = this;
		loadData(function(data){
			if(data.code==1){
				$("#news-container").empty().html(juicer(homePage_tpl.news_resommend,data));
				_this.getNewsDetail();
				
                  var hasNum = $('.Content').length;
//                  $('.Content').each(function(i){ 
//                	  var node=document.getElementsByClassName('Content')[i];  
//     			      $clamp(node,{clamp:3});     
//                	  }); 
			}else{
				//TODO
				console.log("数据加载错误")
			}
		}, getContextPath() + '/home/news/recommend',null);
	},
	getNewsDetail:function(){
		$(".get-new-detail").off("click").on("click",function(){
			var id = $(this).parent("li").attr("data-id");
			//window.location.href="/home/news/info/"+id;
			window.location.href="/news/article-"+id+".html";
		})
		
	    $(".get-new-detail").parent().off("click").on("click",function(){
			var id = $(this).attr("data-id");
			//window.location.href="/home/news/info/"+id;
			window.location.href="/news/article-"+id+".html";
		})
	},
	initVideo:function(){
		$('#showVideoS').off("click").on('click', function() {
	        $('#showVideo').click();
	    });
	}
}
homePage.init();

var homePage_tpl = {
	hot_recommend:[
	        '{@each list as item}',
			'<div class="swiper-slide coverSlide">',
			'	<div class="scaleDiv">',
			'		<a href="/play/${item.teamId}_${item.productId}.html" target="_blank">',
 			'            <div class="bg"></div>' ,
			'			<img src="'+getDfsHostName()+'${item.picLDUrl}">',
			'			<div class="coverContent">',
			'				<div class="">${item.productName}</div>',
			'				{@if item.price == 0}',
			'					<div>￥暂无报价</div>',
			'				{@else}',
			'					<div>￥${item.price|thousandCount}</div>',
			'				{@/if}',
			'			</div>',
			'		</a>',
			'	</div>',
			'</div>',
			'{@/each}'
       	 ].join(""),
    classical_recommend:[
			'{@each list as item, index}',
			'{@if index % 4 == 0}',
			'<div class="flow-div">',
			'{@/if}',
			' <div class="topAnimaltion oneFlow">',
			'	<div class="videoCard">',
			'		<a href="/play/${item.teamId}_${item.productId}.html" target="_blank">',
			'			<img src="'+getDfsHostName()+'${item.picLDUrl}">',
			'			<div class="videoContet">',
			'				<div class="title">${item.productName}</div>',
			'				<div class="type">${item.tags}</div>',
			'				{@if item.price == 0}',
			'					<div  class="price">￥暂无报价</div>',
			'				{@else}',
			'					<div  class="price">￥${item.price|thousandCount}</div>',
			'				{@/if}',
			'				{@if item.orignalPrice != null && item.orignalPrice != 0 && item.orignalPrice != item.price}',
			'					<div class="realPrice">原价￥${item.orignalPrice|thousandCount}</div>',
			'				{@/if}',
			'			</div>',
			'		</a>',
			'	</div>',
			'  </div>',
			'{@if index % 4 == 3}',
			'</div>',
			'{@/if}',
			'{@/each}'
         ].join(""),
     team_recommend:[
            '{@each result as item}',      
			'<div class="swiper-slide">',
			'	<div class="m"></div>',
			'	<div class="b"></div>',
			'	<div class="directorContent">',
			'		<a href="/provider/info_${item.teamId}.html" target="_blank">',
			'			<img src="'+getDfsHostName()+'${item.teamPhotoUrl}">',
			'			<div class="title">${item.teamName}</div>',
			'			<div class="line"></div>',
			'			<div class="content dContent">${item.description}</div>',
			'			<div class="toProduct">作品集</div>',
			'		</a>',
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
			'		<div class="moreIcon"></div>',
			'	</div>',
			'</li>',
			'{@/each}'
         ].join("")         
    
}


