

$().ready(function() {
	loadVideoList();
	closeVideo();
});








function loadVideoList() {

	loadData(function(list) {
		var priceList = new Array();
		if (list != null && list.length > 0) {
			// 筛选
			$.each(list, function(i, product) {
				var price = Math.round(product.serviceRealPrice);
				if (priceList.length == 0) {
					priceList.push(price);
				} else {
					//检测到有重复的，退出循环，添加到价格集合中
					var hastrue = false;
					for (var j = 0; j < priceList.length; j++) {
						if (price == priceList[j]) {
							hastrue = true;
							break;
						} else {
							hastrue = false;
						}
					}
					if (!hastrue)
						priceList.push(price);
				}
			});
			// 排序
			priceList.sort(compare);
			//分组
			var allList=new Array();//map 结构
			$.each(priceList, function(i, item) {
				allList[item]=new Array(); 
			});
			
			$.each(list, function(i, product) {
				var currArray=allList[product.serviceRealPrice];
				currArray.push(product);
			});
			//数据分组填充
			var index=0;
			for(var item in allList){  
				var html = composing(allList[item]);
				fill(html,item,index);
				index++;
		    } 
			
		}
	}, getContextPath() + '/phone/salesman/load/product', null);

}
function compare(str1, str2) {
	if (str1 < str2) {
		return -1;
	} else if (str1 > str2) {
		return 1;
	} else {
		return 0;
	}
}

 function composing(list) {
	$body = '';
	 var uniqueId = $('#uniqueId').val();
	if (list != null && list.length > 0) {
		var listSize = list.length;
		for (var i = 0; i < listSize; i++) {

			var product = list[i];
			
			var url = getContextPath() + '/phone/salesman/order/'+product.productId+'/'+uniqueId+''; 	
			var imgName = getFileName(product.picLDUrl);
			//var imgPath = getHostName() + '/product/img/' + imgName;
			var imgPath =  'http://test.apaipian.com:8081/product/img/' + imgName;
			var realPrice = thousandCount(product.serviceRealPrice);
			$body += '<div class="video-area"   >';
			$body += '<div class="video-img" data-url="'+product.productName+'" id="playVideo" >';
			$body += '<img src="' + imgPath + '" alt="' + product.productName+ '_拍片网"  />';
			$body += '<input style="display:none"  id="videoUrl" value="'+product.videoUrl+'"  />';
			$body += '<input style="display:none"  id="videoPoster" value="'+product.picLDUrl+'"  />';
			$body += '<input style="display:none" id="videoHret" value="'+product.hret+'"  />';
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



function closeVideo(){

       $('.closeVideo').on('click',function(){
         $('#toolbar-modal').fadeOut();
         destroyPlayer('player-video');
         $('#recomment-video').attr('src','');
       });

       $('#closeBtn').on('click',function(){
         $('#toolbar-modal').fadeOut();
         destroyPlayer('player-video');
         $('#recomment-video').attr('src','');
       });
}


function playVideo(){
	$('.video-img').off('click');
	$('.video-img').on('click',function(){
    $('#toolbar-modal').fadeIn();
            
            var posterUrl = $('#videoPoster').val();
			if(posterUrl != undefined && posterUrl != null){
				var imgName = getFileName(posterUrl);
				var imgPath = getHostName() + '/product/img/' + imgName;
				imgUrl = imgPath;
			}
        	var videoHret = $(this).find('#videoHret').val();
        	
			if(videoHret != null && videoHret != '') {
				// 隐藏 video 标签，显示 embed 标签
				$('#recomment-video').hide('fast');
				$('.player-video').show('fast');
				makePlayer('player-video', videoHret); // 创建视频浏览器
			}else { // 未上传优酷，用本地视频代替
				// 隐藏 embed 标签，显示 video 标签
				$('#recomment-video').show('fast');
				$('.video-play').hide('fast');
				
				// 视频链接
				var videoUrl = $(this).find('#videoUrl').val();
				
				if(videoUrl != undefined && videoUrl != null){
					var videoName = getFileName(videoUrl);
					var videoPath = 'http://test.apaipian.com:8081' + '/product/video/' + videoName;
				
					$('#recomment-video').prop('src',videoPath);
				}
				
				$('#recomment-video').prop('poster',imgPath);
			}
	});
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

