$().ready(function(){
	
	loadData(function(list){
		var $body = '';
		$.each(list,function(i,product){
			var imgName = getFileName(product.picLDUrl);
			var imgPath = getHostName() + '/product/img/' + imgName;
			
			var realPrice = thousandCount(product.serviceRealPrice);
			var originalPrice = thousandCount(product.servicePrice);
			
			$body += '<div class="contain-row">';
			
			$body += '<div class="video-col">';
			$body += '<div class="video-post">';
			$body += '<img src="'+ imgPath +'" alt="'+ product.productName +'_拍片网" />';
			$body += '</div>';
			$body += '<div class="video-desc">';
			$body += '<dl>';
			$body += '<dt><h2>'+ product.productName +'</h2></dt>';
			$body += '<dd>'+ product.pDescription +'</dd>';
			$body += '<dt><label>￥</label>'+ realPrice +'<label class="doraction">'+ originalPrice +'</label></dt>';
			$body += '<dd><a href="'+ getContextPath() + '/phone/salesman/order/' + product.productId + '/' + $('#uniqueId').val() +'"><div class="detail-btn">立即下单</div></a></dd>';
			$body += '</dl>';
			$body += '</div>';
			$body += '</div>';
			
			$body += '</div>';
		});
		
		$('#first-video-section').append($body);
	}, getContextPath() + '/phone/salesman/load/product', null);
});