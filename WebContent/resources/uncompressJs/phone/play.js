var imgUrl;
$().ready(function(){
	
	play.initData(); // 初始化数据
	
	play.share(); // 分享
	
	play.order(); // 下单操作
	
});

var play = {
		initData : function(){
			
			// 加载视频海报图 
			var posterUrl = $('#videoPoster').val();
			if(posterUrl != undefined && posterUrl != null){
				var imgName = getFileName(posterUrl);
				var imgPath = getHostName() + '/product/img/' + imgName;
				imgUrl = imgPath;
			}
			
			var videoHret = $('#videoHret').val();
			if(videoHret != null && videoHret != '') {
				// 隐藏 video 标签，显示 embed 标签
				$('#recomment-video').hide('fast');
				$('.video-play').show('fast');
				
				makePlayer('video-play', videoHret); // 创建视频浏览器
			}else { // 未上传优酷，用本地视频代替
				// 隐藏 embed 标签，显示 video 标签
				$('#recomment-video').show('fast');
				$('.video-play').hide('fast');
				
				// 视频链接
				var videoUrl = $('#videoUrl').val();
				if(videoUrl != undefined && videoUrl != null){
					var videoName = getFileName(videoUrl);
					var videoPath = getHostName() + '/product/video/' + videoName;
					$('#recomment-video').prop('src',videoPath);
				}
				
				$('#recomment-video').prop('poster',imgPath);
			}
			
			// 团队logo
			var userPhoto = $('#teamPhotoUrl').val();
			var photoPath = getHostName() + '/team/img/default.png';
			if(userPhoto != undefined && userPhoto != null && userPhoto != ''){
				var photoName = getFileName(userPhoto);
				photoPath = getHostName() + '/team/img/' + photoName;
			}
			$('#teamPhoto').attr('src',photoPath);
			
			// 价格 千分位显示
			var realPrice = Number(Number($('#realPrice').val()).toFixed(0)); // 折扣价
			var originalPrice = Number(Number($('#originalPrice').val()).toFixed(0)); // 原价格
			
			var $col = '<label>￥</label>';
			if(originalPrice == 0)
				$col += '暂无报价<label class="doraction">暂无报价</label>';
			else {
				if(originalPrice == realPrice) {
					$col += thousandCount(originalPrice);
				} else {
					$col += thousandCount(originalPrice) + '<label class="doraction">'+ thousandCount(realPrice) +'</label>';
				}
			}
			
			$('#price-col').append($col);
		},
		share : function(){ // 分享
			// 初始化 分享空间
			$('.share').click(function(){
				if(typeof WeixinJSBridge != "undefined"){
					/*$('#qq').click(function(){
						$('#weixin').click();
					});*/
				}
				var title = $('#videoName').val();
				var shareUrl = getHostName() + getContextPath() + '/phone/play/' + $('#videoId').val();
				share.init(shareUrl,title,imgUrl);
			});
		},
		order : function(){
			// 下单操作
			$('#order-btn').on('click',function(){
				var price = $('#realPrice').val();
				var serviceId = $('#serviceId').val() == -1 ? 0 : $('#serviceId').val();
				var second = $('#second').val() == ' -- 无 -- ' ? 0 : $('#second').val();
				
				var url = getContextPath() + '/phone/order'; 
				var condition = $.toJSON({
					teamId : $('#teamId').val() == '' ? 0 : $('#teamId').val(),
					productId : $('#videoId').val(),
					indentPrice : price,
					serviceId : serviceId,
					second : second,
					product_name : $('#videoName').val().trim()
				});
				
				var inputHtml = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
				
				$('<form action="' + url + '" method = "POST" autocomplete="off" accept-charset="UTF-8">' + inputHtml + '</form>').appendTo('body').submit().remove();
			});
		}
}