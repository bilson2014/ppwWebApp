$().ready(function(){
	// 加载头部
	$('#header-content').prop('src',getContextPath() + '/header');
	
	// 装配 team 头像、产品 高清图、视频url
	team.initIV();
	
	// 装配  相关视频
	team.loadProduct();
	
	// 我要拍片 功能
	team.order();
	
	// 初始化 team share
	team.share();
	
	$(".video-pic").on('click',function(){
		$("#mymodal").modal("toggle");
	});
	
	var pageDescription = $('.page-description').text().trim();
	if(pageDescription != null && pageDescription != '' && pageDescription != undefined){
		// 自定义编辑 解码
		$.base64.utf8encode = true;
		var decodeContent = $.trim($.base64.atob(pageDescription,true));
		$('.page-description').html(decodeContent);
	}else { // 没有自定义编辑，则隐藏
		$('.page-desc-wrap').css('display','none');
	}
	
});

var team = {
		initIV : function(){
			// 团队 logo
			var teamImg = $('#teamImg').val();
			var imgPath = '';
			if(teamImg != undefined && teamImg != null && teamImg != ''){
				var imgName = getFileName(teamImg);
				imgPath = getHostName() + '/team/img/' + imgName;
			}else{
				imgPath = getHostName() + '/team/img/default.png';
			}
			
			$('#userImage').prop('src',imgPath);
			
			// 视频高清图
			var picHDUrl = $('#picHDUrl').val();
			if(picHDUrl != undefined && picHDUrl != null){
				var imgName = getFileName(picHDUrl);
				var imgPath = getHostName() + '/product/img/' + imgName;
				$('#picHDUrlImg').prop('src',imgPath);
				$('#model-img').prop('src',imgPath);
			}
			
			var videoHret = $('#videoHret').val();
			if(videoHret != null && videoHret != ''){
				// 上传优酷，则更改优酷片源
				// 隐藏 video 标签
				$('#videoPlayer').css('display','none');
				$('.video-player').css('display','block');
				makePlayer('video-player', videoHret); // 创建视频浏览器
			}else {
				
				$('#videoPlayer').css('display','block');
				$('.video-player').css('display','none');
				
				// 视频链接
				var videoUrl = $('#videoUrl').val();
				if(videoUrl != undefined && videoUrl != null){
					var videoName = getFileName(videoUrl);
					var videoPath = getHostName() + '/product/video/' + videoName;
					$('#videoPlayer').prop('src',videoPath);
					// 加载视频缩略图 
					var picLDUrl = $('#picLDUrl').val();
					if(picLDUrl != undefined && picLDUrl != null){
						var imgName = getFileName(picLDUrl);
						var imgPath = getHostName() + '/product/img/' + imgName;
						$('#videoPlayer').prop('poster',imgPath);
					}
				}
			}
			
			// 装配 服务项
			loadService($('#productId').val());
		},
		order : function(){
			// 注册 我要拍片 按钮
			$('#orderBt').on('click',function(){
				var price = $('#priceColumn').text() == '暂无报价' ? 0 : $('#priceColumn').text();
				var serviceId = $('.team-descRight-bottom-mcoms option:selected').val() == -1 ? 0 : $('.team-descRight-bottom-mcoms option:selected').val();
				var second = $('.team-descRight-bottom-mcoms option:selected').text() == ' -- 无 -- ' ? 0 : $('.team-descRight-bottom-mcoms option:selected').text().split('秒')[0];
				var product_name = $('#product-title').val().trim();
				
				var url = getContextPath() + '/order'; 
				var condition = $.toJSON({
					teamId : $('#teamId').val(),
					productId : $('#productId').val(),
					indentPrice : DisThousandCount(price),
					serviceId : serviceId,
					second : second,
					product_name : product_name
				});
				
				var inputHtml = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
				
				$('<form action="' + url + '" method = "POST" autocomplete="off" accept-charset="UTF-8">' + inputHtml + '</form>').appendTo('body').submit().remove();
			});
		},
		share : function(){
			$('.share').on('click',function(){
				var no = $(this).data('no');
				var imgPath,share_title,shareUrl;
				if(no == 'team'){
					// 团队分享
					var img_Path = $('#teamImg').val();
					if(img_Path != undefined && img_Path != null){
						var img_Name = getFileName(img_Path);
						imgPath = getHostName() + '/team/img/' + img_Name;
					}
					// team 名称
					share_title = $('.team-banner-right').find('dt').text();
					
					// 分享链接
					shareUrl = getHostName() + getContextPath() + '/phone/author/' + $('#teamId').val();
				}else if(no == 'product'){
					var img_Path = $('#picLDUrl').val();
					if(img_Path != undefined && img_Path != null){
						var img_Name = getFileName(img_Path);
						imgPath = getHostName() + '/product/img/' + img_Name;
					}
					// 作品名称
					share_title = $('#product-title').val();
					
					// 分享链接
					shareUrl = getHostName() + getContextPath() + '/phone/play/' + $('#productId').val();
				}
				share.init(shareUrl,share_title,imgPath);
			});
		},
		 loadProduct : function(){
			 // 装配相关视频
			var teamId = $('#teamId').val();
			loadData(function(productList){
				// 装载 该team 相关视频信息
				// 清空数据
				$('.video-list').empty();
				$body = '';
				if (productList.length > 0){
					$.each(productList,function(i,product){
						var imgName = getFileName(product.picLDUrl);
						var imgPath = getHostName() + '/product/img/' + imgName;
						if(i % 4 == 0){
							$body += '<div class="contain-row">';
						}
						$body += '<div class="video-col-4">';
						$body += '<div class="video-post">';
						$body += '<a href="'+ getContextPath() + '/product/view/' + product.teamId + '/' + product.productId +'" target="_blank">';
						$body += '<img src="'+ imgPath +'" />';
						$body += '</a>';
						$body += '</div>';
						$body += '<div class="video-desc">';
						$body += '<dl>';
						$body += '<dt><h3>'+ product.productName +'</h3></dt>';
						$body += '<dd><label>￥</label> '+ thousandCount(product.serviceRealPrice);
						if(product.serviceRealPrice != product.servicePrice){
							$body += '<label class="decoration">'+ thousandCount(product.servicePrice) +'</label>';
						}
						$body += '</dd>';
						$body += '<dd><a href="'+ getContextPath() + '/product/view/' + product.teamId + '/' + product.productId +'" target="_blank">了解详情</a></dd>';
						$body += '</dl>';
						$body += '</div>';
						$body += '</div>';
						if(i % 4 == 3){
							$body += '</div>';
						}
					});
				} else {
					$body += '暂无相关视频';
				}
				$('.video-list').append($body);
				
			}, getContextPath() + '/product/loadWithTeam/' + teamId, null)
		}
}

function loadService(productId){
	loadData(function(serviceList){
		if(serviceList.length > 0){
			// 不为空
			$option = '';
			$('.team-descRight-bottom-mcoms').empty();
			$('#priceColumn').empty();
			$.each(serviceList,function(i,service){
				if(i == 0){
					// 加载 价格
					$('#priceColumn').append(thousandCount(service.serviceRealPrice));		
					$option += '<option value="'+ service.serviceId +'" selected="selected" data-id="'+ service.serviceRealPrice +'">';
					$option += service.mcoms + '秒';
					$option += '</option>';
				}else{
					
					$option += '<option value="'+ service.serviceId +'" data-id="'+ service.serviceRealPrice +'">';
					$option += service.mcoms + '秒';
					$option += '</option>';
				}
				
			});
			// 激活 服务项的选择 事件
			$('.team-descRight-bottom-mcoms').append($option);
			$('.team-descRight-bottom-mcoms').change(function(){
				var price = $('.team-descRight-bottom-mcoms :selected').data('id');
				$('#priceColumn').empty();
				$('#priceColumn').text(thousandCount(price));
			});
		}else{
			// 服务项为空
			$('.team-descRight-bottom-mcoms').empty();
			$('.team-descRight-bottom-mcoms').append('<option value="-1"> -- 无 -- </option>');
			$('#priceColumn').text('暂无报价');
		}
		
	}, getContextPath() + '/service/loadService/' + productId,null);
}