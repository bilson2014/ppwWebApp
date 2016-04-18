var critical = [3,10]; // 临界值
$().ready(function(){
	
	// 初始化数据
	index.init();
	
	// 分享
	index.share();
	
	// 闪铃-下单
	index.order();
	
	// 装载 视频
	index.loadVideo();
});

var index = {
		init : function() {
			// 注册 了解拍片网按钮
			$('#know-button').click(function(){
				$('.gride-index').slideToggle('normal');
				
				// 拍片网介绍隐藏
				headerRoll('recommend-section');

				// 注册 介绍关闭 按钮
				$('.gride-close').click(function(){
					$('.gride-index').slideUp('normal');
				});
			});
			
			// 轮播图
			$('.flexslider').flexslider({
				directionNav: true,
				pauseOnAction: false
			});
			
			headerRoll('know-button');
			
			// 微信
			$('.-mob-share-weixin').hover(function(){
				$(this).attr('src',getContextPath() + '/resources/img/icons/webcat.png');
			},function(){
				$(this).attr('src',getContextPath() + '/resources/img/icons/webcat_no.png');
			});
			
			// QQ
			$('.-mob-share-qq').hover(function(){
				$(this).attr('src',getContextPath() + '/resources/img/icons/qq.png');
			},function(){
				$(this).attr('src',getContextPath() + '/resources/img/icons/qq_no.png');
			});
			
			// 微博
			$('.-mob-share-weibo').hover(function(){
				$(this).attr('src',getContextPath() + '/resources/img/icons/weibo.png');
			},function(){
				$(this).attr('src',getContextPath() + '/resources/img/icons/weibo_no.png');
			});
			
			// qzone
			$('.-mob-share-qzone').hover(function(){
				$(this).attr('src',getContextPath() + '/resources/img/icons/qqzone.png');
			},function(){
				$(this).attr('src',getContextPath() + '/resources/img/icons/qqzone_no.png');
			});
		},
		share : function() {
			// 分享
			var title = $('#recomment-video-title').text();
			var shareUrl = getHostName() + getContextPath() + '/phone/play/7';
			// 团队分享
			imgPath = $('#recomment-video').attr('poster');
			share.init(shareUrl,title,imgPath);
		},
		order : function(){
			// 闪铃-下单
			$('#recomment-orderBtn').click(function(){
				var price = $('#price-tag').text() == '暂无报价' ? 0 : $('#price-tag').text();
				
				var url = getContextPath() + '/order'; 
				var condition = $.toJSON({
					teamId : 9,
					productId : 7,
					indentPrice : DisThousandCount(price),
					serviceId : 7,
					second : 188,
					product_name : '精致的智能硬件宣传影片'
				});
				
				var inputHtml = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
				
				$('<form action="' + url + '" method = "POST" autocomplete="off" accept-charset="UTF-8">' + inputHtml + '</form>').appendTo('body').submit().remove();
			});
		},
		loadVideo: function(){ // 装载视频
			
			loadData(function(productList){
				var first_section = new Array(); // 第一区域
				var second_section = new Array(); // 第二区域
				var third_section = new Array(); // 第三区域
				var lowerPrice = critical[0] * 10000;
				var higherPrice = critical[1] * 10000;
				// 按照价格区间 分配视频区域
				if (productList != null && productList.length > 0){
					$.each(productList,function(i,product){
						var price = Math.round(product.serviceRealPrice);
						if(price > 0 && price <= lowerPrice ){
							first_section.push(product);
						} else if(price > lowerPrice && price <= higherPrice ){
							second_section.push(product);
						} else if (price > higherPrice){
							third_section.push(product);
						}
					});
					// 装配第一块视频
					$('#first-video-section').empty();
					$('#first-video-section').append(composing(first_section));
					
					// 装配第二块视频
					$('#second-video-section').empty();
					$('#second-video-section').append(composing(second_section));
					
					// 装配第三块视频
					$('#third-video-section').empty();
					$('#third-video-section').append(composing(third_section));
				}
			}, getContextPath() + '/product/loadProduct', null);
		}
}

//视频排版
function composing(list){
	$body = '';
	if(list != null && list.length > 0) {
		var size = list.length;
		if(size == 1){ // 一行一个 布局
			var t_product = list[0];
			var imgName = getFileName(t_product.picLDUrl);
			var imgPath = getHostName() + '/product/img/' + imgName;
			$body += '<div class="contain-row">';
			$body += '<div class="video-col-1">';
			$body += '<div class="video-post">';
			$body += '<a href="'+ getContextPath() + '/product/view/' + t_product.teamId + '/' + t_product.productId +'" target="_blank">';
			$body += '<img src="'+ imgPath +'" />';
			$body += '</a>';
			$body += '</div>';
			$body += '<div class="video-desc">';
			$body += '<dl>';
			$body += '<dt><h3>'+ t_product.productName +'</h3></dt>';
			$body += '<dd>'+ t_product.pDescription +'</dd>';
			$body += '<dt><label>￥ </label> '+ thousandCount(t_product.serviceRealPrice) +' </dt>';
			$body += '<dd><a href="'+ getContextPath() + '/product/view/' + t_product.teamId + '/' + t_product.productId +'" target="_blank">了解详情</a></dd>';
			$body += '</dl>';
			$body += '</div>';
			$body += '</div>';
			$body += '</div>';
		} else if (size == 2 || size == 4){ // 一行两个 布局
			$.each(list,function(i,t_product){
				var imgName = getFileName(t_product.picLDUrl);
				var imgPath = getHostName() + '/product/img/' + imgName;
				if (i % 2 == 0){
					$body += '<div class="contain-row">';
				}
				
				var realPrice = thousandCount(t_product.serviceRealPrice);
				var originalPrice = thousandCount(t_product.servicePrice);
				
				$body += '<div class="video-col-2">';
				$body += '<div class="video-post">';
				$body += '<a href="'+ getContextPath() + '/product/view/' + t_product.teamId + '/' + t_product.productId +'" target="_blank">';
				$body += '<img src="'+ imgPath +'" />';
				$body += '</a>';
				$body += '</div>';
				$body += '<div class="video-desc">';
				$body += '<dl>';
				$body += '<dt><h3>'+ t_product.productName +'</h3></dt>';
				$body += '<dd>'+ t_product.pDescription +'</dd>';
				$body += '<dt><label>￥ </label> '+ realPrice;
				if(realPrice < originalPrice){
					$body += '<label class="decoration">'+ originalPrice +'</label>';
				}
				$body += '</dt>';
				$body += '<dd><a href="'+ getContextPath() + '/product/view/' + t_product.teamId + '/' + t_product.productId +'" target="_blank">了解详情</a></dd>';
				$body += '</dl>';
				$body += '</div>';
				$body += '</div>';
				if (i % 2 == 1){
					$body += '</div>';
				}
				
			});
		} else { // 一行三个
			$.each(list,function(i,t_product){
				var imgName = getFileName(t_product.picLDUrl);
				var imgPath = getHostName() + '/product/img/' + imgName;
				if(i % 3 == 0){
					$body += '<div class="contain-row">';
				}
				
				var realPrice = thousandCount(t_product.serviceRealPrice);
				var originalPrice = thousandCount(t_product.servicePrice);
				
				$body += '<div class="video-col-3">';
				$body += '<div class="video-post">';
				$body += '<a href="'+ getContextPath() + '/product/view/' + t_product.teamId + '/' + t_product.productId +'" target="_blank">';
				$body += '<img src="'+ imgPath +'" />';
				$body += '</a>';
				$body += '</div>';
				$body += '<div class="video-desc">';
				$body += '<dl>';
				$body += '<dt><h3>'+ t_product.productName +'</h3></dt>';
				$body += '<dd>'+ t_product.pDescription +'</dd>';
				$body += '<dt><label>￥ </label> '+ realPrice;
				if(t_product.productName == '时尚酷炫的App宣传片' || t_product.productName == '微信2.0版校园推广影片' || t_product.productName == '大众甲壳虫'){
					$body += '<label class="decoration">'+ originalPrice +'</label>';
				} else if(realPrice < originalPrice){
					$body += '<label class="decoration">'+ originalPrice +'</label>';
				}
				$body += '</dt>';
				$body += '<dd><a href="'+ getContextPath() + '/product/view/' + t_product.teamId + '/' + t_product.productId +'" target="_blank">了解详情</a></dd>';
				$body += '</dl>';
				$body += '</div>';
				$body += '</div>';
				//$body += '</a>';
				if(i % 3 == 2){
					$body += '</div>';
				}
			});
		}
		
	}
	return $body;
}

// 头部导航栏 滚动效果
function headerRoll(id){
	// 拍片网介绍隐藏时
	$('#' + id).waypoint(function (direction) {
		if (direction == "up") { // 了解 拍片网之前
			$('#header').css({position:'relative',top: '28px'});
			$('#header').addClass('header-opacity');
			$('#paipianwang_logo').attr('src',getContextPath() + '/resources/img/icons/logo.png');
			$('#toolbar-section').css({visibility: 'hidden'});
			$('#s-btn').removeClass('bk_gray').addClass('bk_white');
			$('#search-q').removeClass('i-opacity').addClass('i-lucency');
			$('#shelper').removeClass('shelper-opacity').addClass('shelper-lucency');
		}else { // 了解拍片网 之后
			$('#header').css({position:'fixed',top: 0});
			$('#header').removeClass('header-opacity');
			$('#paipianwang_logo').attr('src',getContextPath() + '/resources/img/icons/logo_red.png');
			$('#toolbar-section').css({visibility: 'visible'});
			$('#s-btn').removeClass('bk_white').addClass('bk_gray');
			$('#search-q').removeClass('i-lucency').addClass('i-opacity');
			$('#shelper').removeClass('shelper-lucency').addClass('shelper-opacity');
		}
	});
}