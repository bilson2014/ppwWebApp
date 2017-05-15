$().ready(function() {
	initBanner();
	initScene();
	//initFeature();
    window.onresize = function(){
    	getBannerHeight();
    };
	product();

});

function getBannerHeight() {
	var screenWidth = document.documentElement.clientWidth;
	var videoHeight = screenWidth / 16 * 9;
	if (screenWidth <= 960) {
		videoHeight = 320;
		$('.swiper-banner').css('height', '960px');
		$('.swiper-banner').css('width', '540px');
	}
	$('.swiper-banner').css('height', videoHeight);
}

function banner() {
	$('#bannerTitleAn1').addClass('showTitle');
	$('#DescAn1').addClass('showTitle');
	var banner = new Swiper('.swiper-banner', {
		pagination : '.swiper-pagination-banner',
		paginationClickable : true,
		loop : true,
		grabCursor : true,
		nextButton : '.swiper-button-next',
		prevButton : '.swiper-button-prev',
		autoplay : 5000,
		pagination : '.swiper-pagination',
		paginationClickable : true,
		onSlideChangeEnd : function(swiper) {
			var number = swiper.activeIndex; // 每次切换时，提示现在是第几个slide
		},
	});
}

function product() {
	var product = new Swiper('.swiper-product', {
		loop : true,
		grabCursor : true,
		nextButton : '.swiper-button-next',
		prevButton : '.swiper-button-prev',
	});
}

/**
 * 主页业务处理部分
 */
var homePage = {
	init : function() {
	},
	search : function() {
	},
}

/** *********************************************4/5/wang******************************************************** */

function initBanner() {
	var str = $('#bannerArray').text().trim();
	var view = $('#bannerView');
	view.html('');
	var json = $.evalJSON(str);
	if (json != null && json.length > 0) {
		for (var int = 0; int < json.length; int++) {
			var jj = json[int];
			if (jj.type == 0) {
				var html = [ '<div class="swiper-slide">',
						'	<img src="' + getDfsHostName() + jj.url + '">',
						'</div>' ].join('');
				view.append(html);
			}
		}
		banner();
		getBannerHeight();
	}
}
function initScene() {
	var productId = $('#productId').val();
	loadData(
			function(res) {
				if (res.errorCode == 200) {
					var rows = res.result.rows;
					var view = $('#sceneView');
					view.html('');
					if (rows != null && rows.length > 0) {
						var v = $('.LiveContent');
						switch (rows.length) {
						case 1:
						case 2:
						case 3:
							v.addClass('content3');
							break;
						case 4:
							v.addClass('content4');
							break;
						case 5:
						case 6:
							v.addClass('content56');
							break;
						default:
							v.addClass('content78');
						}
						for (var int = 0; int < rows.length; int++) {
							var rr = rows[int];
							var html = [
									'<div class="cItem">',
									'	<img src="' + getDfsHostName()
											+ rr.scenenPicLDUrl + '">',
									'	<div>',
									'		<img src="/resources/images/projectLine/motion/cardBack.png">',
									'		<span>' + rr.sceneName + '</span>',
									'	</div>', '</div>' ].join('');
							view.append(html);
						}
					}
				}
			}, getContextPath() + '/product/scene/' + productId, null);
}

function initFeature() {
	var str = $('#featureArray').text().trim();
	var view = $('#featureView');
	view.html('');
	var json = $.evalJSON(str);
	if (json != null && json.length > 0) {
		for (var int = 0; int < json.length; int++) {
			var jj = json[int];
			var line = '<div class="line"></div>';
			if (int == (json.length - 1))
				line = '';
			var html = [ '<div class="item">',
					'<img src="' + getDfsHostName() + jj.picHDUrl + '">',
					'<div class="desc">', '     <div>' + jj.name + '</div>',
					'     <div>' + jj.description + '</div>', '</div>', line,
					'</div>' ].join('');
			view.append(html);
		}
	}

}
