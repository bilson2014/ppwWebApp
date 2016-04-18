$().ready(function(){
	
	activity.share(); // 活动页面分享
	
	activity.loadVideoList(); // 装载视频列表
	
});

var activity = {
	share : function() { // 分享
		var title = '拍片网-1元拍大片活动';
		var shareUrl = getHostName() + getContextPath() + '/phone/activity';
		var imgUrl = getContextPath() + '/resources/img/phone/portal/activity.png';
		share.init(shareUrl,title,imgUrl);
	},
	loadVideoList : function() { // 加载视频列表
		loadData(function(list){
			// 清空list
			$('#video-content').empty();
			$body = '';
			if(list.length > 0){
				$.each(list,function(i,product){
					var imgName = getFileName(product.picLDUrl);
					var imgPath = getHostName() + '/product/img/' + imgName;
					
					// 价格 千分位显示
					var realPrice = Number(Number(product.servicePrice).toFixed(0)); // 折扣价
					var originalPrice = Number(Number(product.serviceRealPrice).toFixed(0)); // 原价格
					
					$body += '<a href="'+ getContextPath() + '/phone/play/' + product.productId +'" >';
					$body += '<div class="contain-row">';
					$body += '<div class="video-col">';
					$body += '<div class="video-post">';
					$body += '<img src="'+ imgPath +'" alt="'+ product.productName +'_拍片网">';
					$body += '</div>';
					$body += '<div class="video-desc">';
					$body += '<dl>';
					$body += '<dt><h2>'+ product.productName +'</h2></dt>';
					$body += '<dd>'+ product.pDescription +'</dd>';
					$body += '<dt><label>￥: </label>';
					if(realPrice == 0)
						$body += '暂无报价<label class="doraction">暂无报价</label>';
					else
						$body += thousandCount(realPrice) + '<label class="doraction">'+ thousandCount(originalPrice) +'</label>';
					$body += '</dt>';
					$body += '<dd>';
					$body += '<a href="'+ getContextPath() + '/phone/play/' + product.productId +'" >';
					$body += '<div class="detail-btn">查看详情</div>';
					$body += '</a>';
					$body += '</dd>';
					$body += '</dl>';
					$body += '</div>';
					$body += '</div>';
					$body += '</div>';
					$body += '</a>';
				});
				
				$('#video-content').append($body);
			}else{
				// 集合为空
				$('#video-content').text('暂无相关视频');
			}
		}, getContextPath() + '/product/loadProduct',null);
	}
}