var pageSize = 2; // 一次加载视频个数
var order = 'recommend'; // 排序规则
var preload = false; // 加载提示
$().ready(function(){
	classify.init();
});

var classify = {
	init : function(){
		// 加载视频
		loadData(function(list){
			$('#video-section').empty();
			loadProduct(list);
		}, getContextPath() + '/product/listWithCondition', $.toJSON({
			begin : 0,
			limit : pageSize,
			order : order,
			productType : $('#itemNo').val() == 0 ? null : $('#itemNo').val()
		}));
	}
}

function pullDownAction () {
	//setTimeout(function () {
		loadData(function(list){
			$('#video-section').empty();
			loadProduct(list);
			preload = false;
			$('.pullUpIcon').show();
			$('.pullUpLabel').text('上拉加载更多...');
		}, getContextPath() + '/product/listWithCondition', $.toJSON({
			begin : 0,
			limit : pageSize,
			order : order,
			productType : $('#itemNo').val() == 0 ? null : $('#itemNo').val()
		}));
	//}, 1000);
}
/**
* 滚动翻页 （自定义实现此方法）
* myScroll.refresh();		// 数据加载完成后，调用界面更新方法
*/
function pullUpAction () {
//setTimeout(function () {
	loadData(function(list){
		loadProduct(list);
	}, getContextPath() + '/product/listWithCondition', $.toJSON({
		begin : $('.contain-row').length,
		limit : pageSize,
		order : order,
		productType : $('#itemNo').val() == 0 ? null : $('#itemNo').val()
	}));
	
	//}, 1000);
}

// 动态装载视频
function loadProduct(list){
	$body = '';
	if(list.length > 0){
		$.each(list,function(i,product){
			var imgName = getFileName(product.picLDUrl);
			var imgPath = getHostName() + '/product/img/' + imgName;
			
			// 价格 千分位显示
			var realPrice = Number(Number(product.servicePrice).toFixed(0)); // 折扣价
			var originalPrice = Number(Number(product.serviceRealPrice).toFixed(0)); // 原价格
			
			$body += '<li class="contain-row">';
			$body += '<a href="'+ getContextPath() + '/phone/play/' + product.productId +'" >';
			$body += '<img src="'+ imgPath +'" alt="'+ product.productName +'_拍片网">';
			$body += '</a>';
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
			$body += '</li>';
		});
		preload = false;
		$('.pullUpIcon').show();
		$('#video-section').append($body);
	} else {
		preload = true;
		$('.pullUpIcon').hide();
	}
	myScroll.refresh();
}