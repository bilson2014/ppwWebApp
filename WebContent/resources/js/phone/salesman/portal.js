var critical = [12800,28800]; // 临界值

$().ready(function() {
	loadVideoList();
});

function loadVideoList() {

	loadData(function(list) {
		
		if (list != null && list.length > 0) {
			var first_section = new Array(); // 第一区域
			var second_section = new Array(); // 第二区域
			var third_section = new Array(); // 第三区域
			var lowerPrice = critical[0];
			var higherPrice = critical[1];
			// 筛选
			$.each(list, function(i, product) {
				var price = Math.round(product.serviceRealPrice);
				if(price > 0 && price <= lowerPrice ){
					first_section.push(product);
				} else if(price > lowerPrice && price <= higherPrice ){
					second_section.push(product);
				} else if (price > higherPrice){
					third_section.push(product);
				}
			});
			
			// 填充数据
			$('#first-video-section').empty();
			$('#first-video-section').append(composing(first_section));
			
			// 装配第二块视频
			$('#second-video-section').empty();
			$('#second-video-section').append(composing(second_section));
			
			// 装配第三块视频
			$('#third-video-section').empty();
			$('#third-video-section').append(composing(third_section));
		}
	}, getContextPath() + '/phone/salesman/load/product', null);

}

 function composing(list) {
	$body = '';
	 var uniqueId = $('#uniqueId').val();
	if (list != null && list.length > 0) {
		var listSize = list.length;
		for (var i = 0; i < listSize; i++) {
			
			var product = list[i];
			var videoId = product.productId;
			var url = getContextPath() + '/phone/salesman/order/'+videoId+'/'+uniqueId+''; 
			var posterUrl = product.picLDUrl;
			var youkuId="videoYK"+videoId;
			var videoId="video"+videoId;
			
			if(posterUrl != undefined && posterUrl != null){
				var imgName = getFileName(posterUrl);
				var imgPath = getHostName() + '/product/img/' + imgName;
				imgUrl = imgPath;
			} 
			
			var realPrice = thousandCount(product.serviceRealPrice);
			$body += '<div class="video-area">';
			var videoHret = product.hret;
		
				$body += '<div class="video-img" id="'+youkuId+'" >';
				var videoUrl = product.videoUrl;
				if(videoUrl != undefined && videoUrl != null){
					
					var videoName = getFileName(videoUrl);
					var videoPath = getHostName() + '/product/video/' + videoName;
					$body += '<video class="player-video"  id="'+videoId+'"  src="'+videoPath+'"  poster="'+imgPath+'" controls preload="none" />';
				}
		
			$body += '</div>';
			$body += '<div class="video-content"  >' 
		    $body += '<ul>';	
			$body += '<li class="video-title"  >' + product.productName+ '</li>';
			$body += '<li class="video-title-content">' + product.pDescription+ '</li>';
			$body += '</ul>';
			$body += '</div>'
			$body += '<a href="'+url+'" class="btn-red-common video-btn">立即下单</a>';
			$body += '</div>';
			
		}
	}
	return $body;
}



 function fill(html,price,index){
	var element;
	switch (index) {
		case 0: //价格最低
			element= $('#first-video-section');
			$('#firstPrice').text(price);
			break;
		case 1://价格中等
			element= $('#second-video-section');
			$('#secondPrice').text(price);
			break;
		case 2://价格最高
			element=$('#third-video-section');
			$('#thirdPrice').text(price);
			break;
	}
	if(element!=null){
		element.empty();
		element.append(html);
		playVideo();
	}
 }

