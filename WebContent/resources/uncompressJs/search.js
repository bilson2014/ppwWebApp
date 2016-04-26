var pageSize = 20;
var currentSize = 0;
$().ready(function(){
	search.loadItem(); // 装配视频类型
	search.itemToggle(); // 注册 行业分类 点击事件
	search.loadPrice(); // 装配价格
	search.loadLength(); // 装配时长
	search.pagination(); // 分页
	
});

var search = {
	loadItem : function(){
		loadData(function(itemList){
			// 清除数据
			$('#item-list').empty();
			$ul = '';
			var q = $('#q').val();
			var price = $('#price').val();
			var length = $('#length').val();
			
			var param = '?q=' + q;
			if(price != null && price != undefined && price != ''){
				param += '&price=' + price;
			}
			
			if(length != null && length != undefined && length != '') {
				param += '&length=' + length;
			}
			
			$('#item-all').attr('href',getContextPath() + '/search/' + param + '&item=*');
			
			$.each(itemList,function(i,item){
				$ul += '<li>';
				$ul += '<a href="'+ getContextPath() + '/search/' + param + '&item=' + item.itemId +'" class="itemAll" data-id="'+ item.itemId +'">'+ item.itemName +'</a>';
				$ul += '</li>';
			});
			
			$('#item-list').append($ul);
			
			// 标注选中状态
			var item = $('#item').val();
			if(item != null && item != undefined && item != '') {
				$('.itemAll').removeClass('active');
				
				$.each($('.itemAll'),function(){
					if($(this).data('id') == item){
						$(this).addClass('active');
					}
				});
			}
		}, getContextPath() + '/item/list', null);
	},
	loadPrice : function(){ // 装配价格
		$('#price-list').empty();
		var q = $('#q').val();
		var length = $('#length').val();
		var item = $('#item').val();
		
		var param = '?q=' + q;
		if(item != null && item != undefined && item != ''){
			param += '&item=' + item;
		}
		
		if(length != null && length != undefined && length != '') {
			param += '&length=' + length;
		}
		
		$('#price-all').attr('href',getContextPath() + '/search/' + param + '&price=[0 TO *]');
		
		var $priceLi = '<li><a href="'+ getContextPath() + '/search' + param + '&price=' + '[0 TO 30000]' +'" data-price="[0 TO 30000]" class="priceAll">0~3万</a></li>';
		$priceLi += '<li><a href="'+ getContextPath() + '/search' + param + '&price=' + '[30000 TO 60000]' +'" data-price="[30000 TO 60000]" class="priceAll">3~6万</a></li>';
		$priceLi += '<li><a href="'+ getContextPath() + '/search' + param + '&price=' + '[60000 TO 100000]' +'" data-price="[60000 TO 100000]" class="priceAll">6~10万</a></li>';
		$priceLi += '<li><a href="'+ getContextPath() + '/search' + param + '&price=' + '[100000 TO *]' +'" data-price="[100000 TO *]" class="priceAll">10万以上</a></li>';
		$priceLi += '<li><div class="price-section"><input type="text" id="start-price" /> 万 ~ <input type="text" id="end-price" /> 万 <a id="price-alink" href="javascript:void(0);" ><button id="price-btn" class="btn btn-primary" type="button" >确定</button></a></div></li>';
		$('#price-list').append($priceLi);
		
		// 绑定input 值变动事件
		$('#start-price').change(function(){
			// 判断输入格式
			if(!checkNumber($(this).val().trim())){
				// 如果不是数字，则清空
				$(this).val('');
			}
		});
		
		$('#end-price').change(function(){
			// 判断输入格式
			if(!checkNumber($(this).val().trim())){
				// 如果不是数字，则清空
				$(this).val('');
			}
		});
		
		// 注册 时长 确定按钮
		$('#price-btn').on('click',function(){
			var priceBegin = $('#start-price').val().trim();
			var priceEnd = $('#end-price').val().trim();
			if((priceBegin != null && priceBegin != '' && priceBegin != undefined) || (priceEnd != null && priceEnd != '' && priceEnd != undefined)){
				// 拼接搜索条件
				var condition = '&price=[';
				if(priceBegin != null && priceBegin != '' && priceBegin != undefined){
					condition += priceBegin * 10000 + ' TO ';
				}else {
					condition += '* TO ';
				}
				
				if(priceEnd != null && priceEnd != '' && priceEnd != undefined){
					condition += priceEnd * 10000 + ']';
				}else {
					condition += '*]';
				}
				$('#price-alink').attr('href',getContextPath() + '/search' + param + condition).click();
			}else {
				return false;
			}
		});
		
		// 标注选中状态
		var price = $('#price').val();
		if(price != null && price != undefined && price != '') {
			$('.priceAll').removeClass('active');
			
			$('.priceAll').each(function(){
				if($(this).data('price') == price){
					$(this).addClass('active');
				}
			});
		}
	},
	loadLength : function(){ // 装配时长
		$('#length-list').empty();
		
		var q = $('#q').val();
		var price = $('#price').val();
		var item = $('#item').val();
		
		var param = '?q=' + q;
		if(item != null && item != undefined && item != ''){
			param += '&item=' + item;
		}
		
		if(price != null && price != undefined && price != '') {
			param += '&price=' + price;
		}
		
		$('#length-all').attr('href',getContextPath() + '/search/' + param + '&length=[0 TO *]');
		
		var $lengthLi = '<li><a href="'+ getContextPath() + '/search' + param + '&length=' + '[0 TO 60]' +'" data-length="[0 TO 60]" class="lengthAll">0~60秒</a></li>';
		$lengthLi += '<li><a href="'+ getContextPath() + '/search' + param + '&length=' + '[60 TO 90]' +'" data-length="[60 TO 90]" class="lengthAll">60~90秒</a></li>';
		$lengthLi += '<li><a href="'+ getContextPath() + '/search' + param + '&length=' + '[90 TO 180]' +'" data-length="[90 TO 180]" class="lengthAll">90~180秒</a></li>';
		$lengthLi += '<li><a href="'+ getContextPath() + '/search' + param + '&length=' + '[180 TO *]' +'" data-length="[180 TO *]" class="lengthAll">180秒以上</a></li>';
		$lengthLi += '<li><div class="length-section"><input type="text" id="start-length" /> 秒 ~ <input type="text" id="end-length" /> 秒 <a id="length-alink" href="javascript:void(0);" ><button id="length-btn" type="button" class="btn btn-primary">确定</button></a></div></li>';
		
		$('#length-list').append($lengthLi);
		
		// 绑定input 值变动事件
		$('#start-length').change(function(){
			// 判断输入格式
			if(!checkNumber($(this).val().trim())){
				// 如果不是数字，则清空
				$(this).val('');
			}
		});
		
		$('#end-length').change(function(){
			// 判断输入格式
			if(!checkNumber($(this).val().trim())){
				// 如果不是数字，则清空
				$(this).val('');
			}
		});
		
		// 注册 时长 确定按钮
		$('#length-btn').on('click',function(){
			var lengthBegin = $('#start-length').val().trim();
			var lengthEnd = $('#end-length').val().trim();
			if((lengthBegin != null && lengthBegin != '' && lengthBegin != undefined) || (lengthEnd != null && lengthEnd != '' && lengthEnd != undefined)){
				// 拼接搜索条件
				var condition = '&length=[';
				if(lengthBegin != null && lengthBegin != '' && lengthBegin != undefined){
					condition += lengthBegin + ' TO ';
				}else {
					condition += '* TO ';
				}
				
				if(lengthEnd != null && lengthEnd != '' && lengthEnd != undefined){
					condition += lengthEnd + ']';
				}else {
					condition += '*]';
				}
				$('#length-alink').attr('href',getContextPath() + '/search' + param + condition).click();
			}else {
				return false;
			}
			
		});
		
		// 标注选中状态
		var length = $('#length').val();
		if(length != null && length != undefined && length != '') {
			$('.lengthAll').removeClass('active');
			
			$.each($('.lengthAll'),function(){
				if($(this).data('length') == length)
					$(this).addClass('active');
			});
		}
	},
	pagination : function(){
		$(".pagination").createPage({
			pageCount: Math.ceil($('#total').val() / pageSize),
			current: 1,
			backFn:function(p){
				// 点击 翻页，查询符合条件的视频
				loadProduction((p - 1) * pageSize);
				currentSize = (p - 1) * pageSize;
			}
		});
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
	}
}

// 加载视频
function loadProduction(start){
	// 清空 videowrap
	$('#video-content').empty();
	
	loadData(function(list){
		$body = '';
		if(list != null && list.length > 0){
			 // 此布局是一行4个
			$('#video-content').empty(); // 清空区域
			if(list != null && list.length > 0){
				var $body = '';
				$.each(list,function(i,solr){
					var imgName = getFileName(solr.picLDUrl);
					var imgPath = getHostName() + '/product/img/' + imgName;
					if(i % 4 == 0){
						$body += '<div class="video-row">';
					}
					$body += '<div class="video-card video-col-4">';
					var targetHref = getContextPath() + '/play/' + solr.teamId + '_' + solr.productId + '.html';
					$body += '<a href="'+ targetHref +'">';
					$body += '<img class="img-card-4" src="'+ imgPath +'" />';
					$body += '</a>';
					$body += '<div class="video-desc-section">';
					$body += '<h3>'+ solr.productName +'</h3>';
					$body += '<h4>'+ solr.teamName +'</h4>';
					$body += '<div class="video-desc">';
					$body += solr.pDescription;
					$body += '</div>';
					$body += '</div>';
					$body += '<div class="video-price-section">';
					$body += '<div class="video-price">';
					$body += '<h2>￥'+ thousandCount(solr.price) +'</h2>&nbsp;&nbsp;';
					if(solr.price < solr.orignalPrice){
						$body += '<h3>'+ thousandCount(solr.orignalPrice) +'</h3>';
					}
					$body += '</div>';
					$body += '<a href="javascript:void(0);">了解详情</a>';
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
		}
	}, getContextPath() + '/search/pagination', $.toJSON({
		begin : start,
		limit : pageSize,
		condition : $('#q').val().trim(),
		priceFq : $('#price').val(),
		itemFq : $('#item').val(),
		lengthFq : $('#length').val()
	}));
}