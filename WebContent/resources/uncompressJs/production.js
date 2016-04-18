var itemId = null;
var order = 'recommend';
var pageSize = 20;
var currentSize = 0;
$().ready(function(){
	
	production.loadItem(); // 装载 类别
	
	production.orderChoose(); // 排序规则
	
	loadProduction(0); // 装配视频
	
	maxSize(); // 分页
});

var production = {
		// 装载  类别
		loadItem : function(){
			loadData(function(itemList){
				// 清除数据
				$('#classify-item').empty();
				$ul = '<ul class="list-inline">';
					
				$.each(itemList,function(i,item){
					$ul += '<li>';
					$ul += '<a href="javascript:void(0)" class="itemAll" data-id="'+ item.itemId +'">'+ item.itemName +'</a>';
					$ul += '</li>';
				});
				
				$ul += '</ul>';
				$('#classify-item').append($ul);
				
				$('.itemAll').on('click',function(){
					var iId = $(this).data('id');
					// 选中 标识 高亮
					$('.itemAll').removeClass('active');
					$(this).addClass('active');
					
					if(iId == undefined || iId == null){
						itemId = null;
					}else{
						itemId = iId;
					}
					
					currentSize = 0;
					loadProduction(0); // 装载 视频
					
					$(".pagination").initPage({
						
					}); // 重置分页
					maxSize();
					
				});
			}, getContextPath() + '/item/list', null);
		},
		// 排序选择
		orderChoose : function(){
			$('.orderAll').on('click',function(){
				var orderName = $(this).data('name');
				// 选中 标识 高亮
				$('.orderAll').removeClass('active');
				$(this).addClass('active');
				if(orderName == undefined){
					order = null;
				}else{
					order = orderName;
				}
				
				loadProduction(currentSize); // 装载 视频
			});
		}
}

function loadProduction(begin){
	loadData(function(productList){
		// 清除数据
		$('.video-wrap').empty();
		$body = '';
		if(productList.length > 0){
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
				$body += '<dt><label>￥</label> '+ thousandCount(product.serviceRealPrice);
				if(product.serviceRealPrice < product.servicePrice){
					$body += '<label class="decoration">'+ thousandCount(product.servicePrice) +'</label>';
				}
				$body += '</dt>';
				$body += '<dd><a href="'+ getContextPath() + '/product/view/' + product.teamId + '/' + product.productId +'" target="_blank">了解详情</a></dd>';
				$body += '</dl>';
				$body += '</div>';
				$body += '</div>';
				if(i % 4 == 3){
					$body += '</div>';
				}
			});
		}else{
			$body += '暂无相关视频';
		}
		
		$('.video-wrap').append($body);
	}, getContextPath() + '/product/listWithCondition', $.toJSON({
		begin : begin,
		limit : pageSize,
		order : order,
		productType : itemId
	}));
}

// 获取 数据总数
function maxSize(){
	loadData(function(size){
		$(".pagination").createPage({
			pageCount: Math.ceil(size / pageSize),
			current: 1,
			backFn:function(p){
				// 点击 翻页，查询符合条件的视频
				loadProduction((p - 1) * pageSize);
				currentSize = (p - 1) * pageSize;
			}
		});
	},getContextPath() + '/product/size', $.toJSON({
		productType : itemId
	}));
}