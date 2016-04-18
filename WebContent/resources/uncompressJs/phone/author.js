var imgtPath;
$().ready(function(){
	
	author.initData(); // 初始化
	
	author.share(); // 分享
	
	author.loadVieoList(); // 加载视频列表
});

var author = {
		initData : function(){ // 初始化团队数据
			// 装载 团队图片
			var userPhoto = $('#cLogo').val();
			if(userPhoto != undefined && userPhoto != null && userPhoto != ''){
				var imgtName = getFileName(userPhoto);
				imgtPath = getHostName() + '/team/img/' + imgtName;
			}else{
				imgtPath = getHostName() + '/team/img/default.png';
			}
			$('#team-logo').attr('src',imgtPath);
			
			// 
			var desc = $('#company-description').text();
			if(desc == '' || desc == undefined || desc == null){
				$('#company-description').text('用最苛刻的效果满足最挑剔的客户')
			}
		},
		share : function(){ // 分享
			$('.share').click(function(){
				var title = $('#cName').val();
				// 分享链接
				var shareUrl = getHostName() + getContextPath() + '/phone/author/' + $('#cId').val();
				share.init(shareUrl,title,imgtPath);
			});
		},
		loadVieoList : function() { // 装载视频列表
			loadData(function(list){
				// 清空list
				$('#video-content').empty();
				$('#detail-right').text(list.length + '个作品');
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
						$body += '<dt><label>￥ </label>';
						if(originalPrice == 0)
							$body += '暂无报价<label class="doraction">暂无报价</label>';
						else {
							if(originalPrice == realPrice){ // 原价与折扣价相等，则不显示原价
								$body += thousandCount(originalPrice);
							}else {
								
								$body += thousandCount(originalPrice) + '<label class="doraction">'+ thousandCount(realPrice) +'</label>';
							}
						}
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
			}, getContextPath() + '/phone/team/product/list/' + $('#cId').val(),null);
		}
}