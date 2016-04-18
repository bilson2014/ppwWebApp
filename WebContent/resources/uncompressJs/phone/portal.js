var critical = [2,10]; // 临界值
$().ready(function(){
	// 装配分类数据
	portal.initData();
	
	// 轮播图
	portal.flexSlider();
	
	// 分享
	/*portal.share();*/
	
	// 分类
	portal.classify();
	
	// 加载视频
	portal.loadProduct();
	
});

var portal = {
	initData : function(){ // 加载分类信息
		
		loadData(function(itemList){
			var $ibody = '';
			$ibody += '<li><a href="'+ getContextPath() + '/phone/classify/' + 0 +'">全部</a></li>';
			$.each(itemList,function(i,item){
				$ibody += '<li>';
				$ibody += '<a href="'+ getContextPath() + '/phone/classify/' + item.itemId +'">';
				$ibody += item.itemName;
				$ibody += '</a>';
				$ibody += '</li>';
			});
			$('.mm-listview').append($ibody);
		}, getContextPath() + '/item/list', null);
	
	},
	flexSlider : function() { // 初始化轮播
		$('.flexslider').flexslider({
			directionNav: true,
			pauseOnAction: false
		});
	},
	share : function() { // 分享
		$('.share').click(function() {
			var title = '拍片网-中国领先的视频营销服务平台';
			var shareUrl = getHostName() + getContextPath() + '/phone/portal';
			var imgUrl = getHostName() + getContextPath() + '/resources/img/icons/logo_red.png';
			share.init(shareUrl,title,imgUrl);
		});
	},
	classify : function() { // 分类
		$('nav#menu').mmenu({
			navbar 		: {
				title	: '视频分类'
			}
		});
	},
	loadProduct : function(){ // 视频装配
		 // 装载视频
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

// 排版
function composing(list){
	$body = '';
	if(list != null && list.length > 0){
		var listSize = list.length;
		for(var i = 0;i < listSize;i ++){
			var product = list[i];
			
			var imgName = getFileName(product.picLDUrl);
			var imgPath = getHostName() + '/product/img/' + imgName;
			
			var realPrice = thousandCount(product.serviceRealPrice);
			var originalPrice = thousandCount(product.servicePrice);
			
			$body += '<div class="contain-row">';
			$body += '<a href="'+ getContextPath() + '/phone/play/' + product.productId +'" target="_self">';
			$body += '<div class="video-col">';
			$body += '<div class="video-post">';
			$body += '<img src="'+ imgPath +'" alt="'+ product.productName +'_拍片网" />';
			$body += '</div>';
			$body += '<div class="video-desc">';
			$body += '<dl>';
			$body += '<dt><h2>'+ product.productName +'</h2></dt>';
			$body += '<dd>'+ product.pDescription +'</dd>';
			$body += '<dt><label>￥</label>'+ realPrice +'<label class="doraction">'+ originalPrice +'</label></dt>';
			$body += '<dd><a href="'+ getContextPath() + '/phone/play/' + product.productId +'"><div class="detail-btn">查看详情</div></a></dd>';
			$body += '</dl>';
			$body += '</div>';
			$body += '</div>';
			$body += '</a>';
			$body += '</div>';
		}
	}
	return $body;
}