$().ready(function(){
	
	// -> 如果视频有优酷地址，那么使用UK播放器
	var hret = $('#yk-play').val();
	if(hret != '' && hret != null && hret != undefined){
		//var height = $('#player-wrap').find('video').height();
		var height = $('.info-wrap').height();
		$('#player-wrap').css('height',height);
		makePlayer('player-wrap', hret); // 创建视频浏览器
	}
	
	// -> 加载视频简介
	var pageDescription = $('.video-intro-wrap').text().trim();
	if(pageDescription != null && pageDescription != '' && pageDescription != undefined){
		// 自定义编辑 解码
		$.base64.utf8encode = true;
		var decodeContent = $.trim($.base64.atob(pageDescription,true));
		$('#video-intro-wrap').html(decodeContent);
	}
	
	// -> 注册 我要拍片按钮
	$('#order-btn').click(function(){
		var indentPrice = $('#vPrice').val();
		var serviceId = $('#service-unique').val();
		var second = $('#vLength').text().trim() == '' ? 0 : $('#vLength').text().trim().split(' 秒')[0];
		var productName = $('#pName').text();
		var tId = $('#company-unique').val();
		var pId = $('#play-unique').val();
		
		var url = getContextPath() + '/order'; 
		var condition = $.toJSON({
			teamId : $('#company-unique').val(),
			productId : $('#play-unique').val(),
			indentPrice : indentPrice,
			serviceId : serviceId,
			second : second,
			product_name : productName
		});
		
		var inputHtml = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
		
		$('<form action="' + url + '" method = "POST" autocomplete="off" accept-charset="UTF-8">' + inputHtml + '</form>').appendTo('body').submit().remove();
	});
	
	// -> 注册 分享按钮 
	$('.share').click(function(){
		var title = $('#pName').text();
		var url = 'http://www.apaipian.com/play/' + $('#company-unique').val() + '_' + $('#play-unique').val() + '.html';
		var img_path = $('#picPath').val();
		share.init(url,title,img_path);
	});

	// -> 加载 该团队的所有作品
	loadData(function(list){
		
		 // 此布局是一行3个
		if(list != null && list.length > 0){
			$('#video-content').empty(); // 清空区域
			var $body = '';
			var proId = $('#play-unique').val();
			
			// 删除重复元素
			$.each(list,function(i,productq){
				if(productq.productId == proId){
					list.splice(i,1);
					return false;
				}
			});
			
			$.each(list,function(i,product){
				//修改为DFS路径
				//var imgName = getFileName(product.picLDUrl);
				//var imgPath = getHostName() + '/product/img/' + imgName;
				var imgPath = getDfsHostName() + product.picLDUrl;
				//修改为DFS end
				if(i % 3 == 0){
					$body += '<div class="video-row">';
				}
				$body += '<div class="video-card video-col-3">';
				$body += '<a href="'+ getContextPath() +'/play/'+ product.teamId +'_'+ product.productId +'.html" target="_blank">';
				$body += '<img class="img-card-3" src="'+ imgPath +'" alt='+ product.productName + '_拍片网' +'/>';
				$body += '</a>';
				$body += '<div class="video-desc-section">';
				$body += '<h3>'+ product.productName +'</h3>';
				/*$body += '<h4>'+ product.teamName +'</h4>';*/
				$body += '<h4></h4>';
				$body += '<div class="video-desc" title="'+ product.pDescription +'">';
				$body += product.pDescription;
				$body += '</div>';
				$body += '</div>';
				$body += '<div class="video-price-section">';
				$body += '<div class="video-price">';
				if(product.serviceRealPrice < product.servicePrice){ // 如果折扣价 不小于 原价，则不显示原价
					$body += '<h2>￥'+ thousandCount(product.serviceRealPrice) +'</h2>&nbsp;&nbsp;';
					$body += '<h3>'+ thousandCount(product.servicePrice) +'</h3>';
				}else {
					$body += '<h2>￥'+ thousandCount(product.serviceRealPrice) +'</h2>&nbsp;&nbsp;';
				}
				
				$body += '</div>';
				$body += '<a href="'+ getContextPath() +'/play/'+ product.teamId +'_'+ product.productId +'.html" target="_blank">了解详情</a>';
				$body += '</div>';
				$body += '</div>';

				if(i % 3 == 2){
					$body += '</div>';
				}
			});

			$('#video-content').append($body); // 填充数据
		}
	

		// 初始化时，只显示一行
		$('.video-row').css('display','none');
		$('.video-row:first').css('display','block');

		// -> 注册 更多视频按钮
		$('#show-more-btn').click(function(){
			$('.video-row').slideDown('slow');
			$(this).unbind('click');
			$(this).hide('fast');
		});
	},getContextPath() + '/product/loadWithTeam/' + $('#company-unique').val(),null);
});
