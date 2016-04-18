$().ready(function(){
	active.loadProduct();
});

var active = {
	loadProduct : function(){
		
		$('.video-section').empty(); // 清除原有视频
		var $body = '';
		
		loadData(function(list){
			
			if(list != null && list.length > 0){
				$.each(list,function(i,product){
					var imgName = getFileName(product.picLDUrl);
					var imgPath = getHostName() + '/product/img/' + imgName;
					
					// 价格 千分位显示
					var realPrice = Number(Number(product.servicePrice).toFixed(0)); // 折扣价
					var originalPrice = Number(Number(product.serviceRealPrice).toFixed(0)); // 原价格
					
					$body += '<a href="'+ getContextPath() + '/phone/play/' + product.productId +'" >';
					$body += '<div class="row">';
					$body += '<div class="video-poster-part">';
					$body += '<img alt="'+ product.productName +'_拍片网_1212活动页面_手机端" src="'+ imgPath +'">';
					$body += '</div>';
					$body += '<h3>'+ product.productName +'</h3>';
					$body += '<div class="video-desc-part">';
					$body += '<div class="video-price-active">';
					$body += '<label >1212价</label><span>￥<h5>' + thousandCount(originalPrice) + '</h5></span>';
					$body += '</div>';
					$body += '<div class="video-price-original">';
					$body += '<span>原价</span><label>￥<h5>'+ thousandCount(realPrice) +'</h5></label>';
					$body += '</div>';
					$body += '<div class="order-button">';
					$body += '<a href="'+ getContextPath() + '/phone/order/'+ product.teamId +'/'+ product.productId +'/'+ product.serviceId +'/'+ product.serviceRealPrice +'/' + encodeURI(encodeURI(product.productName)) +'"><span>立即拍片</span></a>';
					$body += '</div>';
					$body += '</div>';
					$body += '</div>';
					$body += '</a>';
				});
			}else {
				$body += '该活动已下架，更多活动即将来临，尽请期待!';
			}
			
			$('.video-section').append($body);
			
		}, getContextPath() + '/product/listWithCondition', $.toJSON({
			begin : 0,
			limit : 12,
			order : 'recommend',
			productType : 19
		}));
	},
	share : function(){ // 分享
		$('.share').click(function(){
			var title = '拍片网 12.12-拍片 盛典';
			var shareUrl = getHostName() + getContextPath() + '/phone/active/12';
			var imgUrl = getContextPath() + '/resources/img/active/d12/active-share-12.png'
			share.init(shareUrl,title,imgUrl);
		});
	}
}