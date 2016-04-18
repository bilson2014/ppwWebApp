$().ready(function(){
	active.loadProduct();
});

var active = {
	loadProduct : function(){ // 装载视频
		$('.video-section-wrap').empty(); // 清空原有视频列表
		var $body = '';
		loadData(function(list){
			
			if(list != null && list.length > 0){
				
				$.each(list,function(i,product){
					var imgName = getFileName(product.picLDUrl);
					var imgPath = getHostName() + '/product/img/' + imgName;
					if(i % 3 == 0){ // 换行
						$body += '<div class="row">';
					}
						$body += '<a href="'+ getContextPath() + '/product/view/' + product.teamId + '/' + product.productId +'" target="_blank">';
						$body += '<div class="video-wrap">';
						$body += '<div class="video-poster-part">';
						$body += '<img alt="'+ product.productName +'_拍片网_1212会场" src="'+ imgPath +'">';
						$body += '</div>';
						$body += '<h3>'+ product.productName +'</h3>';
						$body += '<div class="video-desc-part">';
						$body += '<div class="video-price-active">';
						$body += '<label>1212价</label><span>￥<h5>'+ thousandCount(product.serviceRealPrice) +'</h5></span>';
						$body += '</div>';
						$body += '<div class="video-price-original">';
						$body += '<span>原价</span><label>￥<h5>'+ thousandCount(product.servicePrice) +'</h5></label>';
						$body += '</div>';
						$body += '<div class="order-button">';
						$body += '<a href="'+ getContextPath() + '/order/'+ product.teamId +'/'+ product.productId +'/'+ product.serviceId +'/'+ product.serviceRealPrice +'/' + encodeURI(encodeURI(product.productName)) +'"><span>立即拍片</span></a>';
						$body += '</div>';
						$body += '</div>';
						$body += '</div>';
						$body += '</a>';
						if(i % 3 == 2){
							$body += '</div>';
						}
					
				});
			}else {
				$body += '该活动已下架，更多活动即将来临，尽请期待!';
			}
			
			$('.video-section-wrap').append($body);
			
		}, getContextPath() + '/product/listWithCondition', $.toJSON({
			begin : 0,
			limit : 12,
			order : 'recommend',
			productType : 19
		}));
	}
}