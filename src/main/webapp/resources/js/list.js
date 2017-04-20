var itemId = null;
var price = ''; // 价格区间
var lengthBegin = 0; // 起始时长
var lengthEnd = 36000; // 结束时长(默认：10小时)
var priceBegin = 0; // 起始价格
var priceEnd = 1000000000; // 结束价格(默认：10亿)
var pageSize = 20;
var currentSize = 0;
$().ready(function(){
	
	mergeVideo(0); // 加载视频
	maxSize(); // 初始化分页
	list.itemToggle(); // 注册 更多 按钮
	list.loadItem(); // 加载 行业分类
	list.lengthToggle(); // 注册点击 价格区间
	
	// 绑定input 值变动事件
	$('#start-length').change(function(){
		// 判断输入格式
		if(!checkNumber($(this).val().trim())){
			// 如果不是数字，则清空
			$(this).val('');
		}else {
			$('#lengthBtn').removeClass('disabled');
		}
	});
	
	$('#end-length').change(function(){
		// 判断输入格式
		if(!checkNumber($(this).val().trim())){
			// 如果不是数字，则清空
			$(this).val('');
		}else {
			$('#lengthBtn').removeClass('disabled');
		}
	});
	
	$('#start-price').change(function(){
		// 判断输入格式
		if(!checkNumber($(this).val().trim())){
			// 如果不是数字，则清空
			$(this).val('');
		}else {
			$('#priceBtn').removeClass('disabled');
		}
	});
	
	$('#end-price').change(function(){
		// 判断输入格式
		if(!checkNumber($(this).val().trim())){
			// 如果不是数字，则清空
			$(this).val('');
		}else {
			$('#priceBtn').removeClass('disabled');
		}
	});
	
	list.lengthBtn(); // 注册 时长按钮 点击事件
	
	list.priceBtn(); // 注册 价格按钮 点击事件
	
	list.priceToggle(); // 注册 价格区间 点击事件	
	
});

var list = {
		loadItem : function(){
			// 加载 行业分类
			loadData(function(iList){
				$('#item-list').empty(); // 清除数据
				
				var $ul = '';
				$.each(iList,function(i,item){
					$ul += '<li>';
					$ul += '<a href="javascript:void(0)" class="itemAll" data-id="'+ item.itemId +'">'+ item.itemName +'</a>';
					$ul += '</li>';
				});
				
				$('#item-list').append($ul);
				
				// 注册 分类点击事件
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
					mergeVideo(0); // 装载 视频
					
					$(".pagination").initPage({
						
					}); // 重置分页
					maxSize();
				});
			}, getContextPath() + '/item/list', null);
		},
		itemToggle : function(){ // 注册 行业分类 点击事件
			$('#more-link').on('click',function(){
				if($('#item-list').hasClass('extend')){
					// 收起
					$('#item-list').removeClass('extend');
				}else {
					// 放下
					$('#item-list').addClass('extend');
				}
			});
		},
		lengthToggle : function(){ // 注册 视频长度 点击事件
			$('.lengthAll').on('click',function(){
				lengthBegin = $(this).data('begin');
				lengthEnd = $(this).data('end');
				// 选中 标识 高亮
				$('.lengthAll').removeClass('active');
				$(this).addClass('active');
				currentSize = 0;
				mergeVideo(0); // 装载 视频
				$(".pagination").initPage({
				}); // 重置分页
				maxSize();
			});
		},
		lengthBtn : function(){
			$('#lengthBtn').on('click',function(){
				if(!$(this).hasClass('disabled')){ // 按钮是否可用
					var startLength = $('#start-length').val().trim();
					var endLength = $('#end-length').val().trim();
					if(startLength == null || startLength == '' || startLength == undefined){
						// 开始时长为空时，赋值为0
						lengthBegin = 0;
					}
					if(endLength == null || endLength == '' || endLength == undefined){
						// 开始时长为空时，赋值为0
						lengthEnd = 36000;
					}
					lengthBegin = startLength;
					lengthEnd = endLength;
					// 选中 标识 高亮
					$('.lengthAll').removeClass('active');
					currentSize = 0;
					mergeVideo(0); // 装载 视频
					$(".pagination").initPage({
					}); // 重置分页
					maxSize();
				}
			});
		},
		priceBtn : function(){
			$('#priceBtn').on('click',function(){
				if(!$(this).hasClass('disabled')){ // 按钮是否可用
					var startPrice = $('#start-price').val().trim();
					var endPrice = $('#end-price').val().trim();
					if(startPrice == null || startPrice == '' || startPrice == undefined){
						// 开始时长为空时，赋值为0
						startPrice = 0;
					}
					if(endPrice == null || endPrice == '' || endPrice == undefined){
						// 开始时长为空时，赋值为0
						endPrice = 100000;
					}
					priceBegin = startPrice * 10000;
					priceEnd = endPrice * 10000;
					// 选中 标识 高亮
					$('.priceAll').removeClass('active');
					currentSize = 0;
					mergeVideo(0); // 装载 视频
					$(".pagination").initPage({
					}); // 重置分页
					maxSize();
				}
			});
		},
		priceToggle : function(){ // 时间区间 点击事件
			$('.priceAll').on('click',function(){
				priceBegin = $(this).data('begin');
				priceEnd = $(this).data('end');
				// 选中 标识 高亮
				$('.priceAll').removeClass('active');
				$(this).addClass('active');
				currentSize = 0;
				mergeVideo(0); // 装载 视频
				$(".pagination").initPage({
				}); // 重置分页
				maxSize();
			});
		}
}

function mergeVideo(begin){
	loadData(function(list){
		 // 此布局是一行4个
		$('#video-content').empty(); // 清空区域
		if(list != null && list.length > 0){
			var $body = '';
			$.each(list,function(i,product){
				//修改为DFS路径
				var imgPath = getDfsHostName() + product.picLDUrl;
				//修改为DFS end
				if(i % 4 == 0){
					$body += '<div class="video-row">';
				}
				$body += '<div class="video-card video-col-4">';
				$body += '<a href="'+ getContextPath() + '/play/' + product.teamId + '_' + product.productId +'.html">';
				$body += '<img class="img-card-4" src="'+ imgPath +'" />';
				$body += '</a>';
				$body += '<div class="video-desc-section">';
				$body += '<h3>'+ product.productName +'</h3>';
				$body += '<h4></h4>';
				$body += '<div class="video-desc">';
				$body += product.pDescription;
				$body += '</div>';
				$body += '</div>';
				$body += '<div class="video-price-section">';
				$body += '<div class="video-price">';
				$body += '<h2>￥'+ thousandCount(product.serviceRealPrice) +'</h2>&nbsp;&nbsp;';
				if(product.serviceRealPrice < product.servicePrice){
					$body += '<h3>'+ thousandCount(product.servicePrice) +'</h3>';
				}
				$body += '</div>';
				$body += '<a href="'+ getContextPath() + '/play/' + product.teamId + '_' + product.productId +'.html">了解详情</a>';
				$body += '</div>';
				$body += '</div>';
				if(i % 4 == 3){
					$body += '</div>';
				}
			});
			$('#video-content').append($body); // 填充数据
		}else {
			// 如果没有数据，则显示 "对不起，没有查询到您想要的数据"
			$('#video-content').append('<div class="prompt-word">对不起，没有查询到您想要的数据!</div>');
		}
	}, getContextPath() + '/product/listWithCondition', $.toJSON({
		begin : begin,
		limit : pageSize,
		productType : itemId,
		lengthBegin : lengthBegin,
		lengthEnd : lengthEnd,
		priceBegin : priceBegin,
		priceEnd : priceEnd
	}));
}

//获取 数据总数
function maxSize(){
	loadData(function(size){
		$(".pagination").createPage({
			pageCount: Math.ceil(size / pageSize),
			current: 1,
			backFn:function(p){
				// 点击 翻页，查询符合条件的视频
				mergeVideo((p - 1) * pageSize);
				currentSize = (p - 1) * pageSize;
			}
		});
	},getContextPath() + '/product/size', $.toJSON({
		productType : itemId,
		lengthBegin : lengthBegin,
		lengthEnd : lengthEnd,
		priceBegin : priceBegin,
		priceEnd : priceEnd
	}));
}