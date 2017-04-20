var pageSize = 20;
var currentSize = 0;
var typeArray = new Array(' 宣传片','个人宣传片','活动宣传片','产品宣传片','企业宣传片','城市宣传片','品牌宣传片','场景宣传片','招商宣传片','形象宣传片','TVC',' 广告','创意广告','产品广告','品牌广告','活动广告','微电影','路演视频','病毒视频','公益片','社交媒体视频','花絮');
var busArray = new Array('智能硬件','互联网','电子产品','电商','通讯','服装纺织','金融','医疗保健','游戏','交通运输','汽车','文化','日用美妆','家居建材','政府机构','企业服务','餐饮美食','母婴','美容','美发','食品饮料','电器','影视','房地产');
var mark = 'tags='; // 特殊标记
var industry = 'industry='; // 行业
var genre = 'genre='; // 类型
$().ready(function(){
	search.showTitle(); // 在标题栏显示搜索内容
	search.initCrumbs(); // 初始化面包屑布局
	search.loadItem(); // 装配视频类型
	search.itemToggle(); // 注册 行业分类 点击事件
	search.loadPrice(); // 装配价格
	search.loadLength(); // 装配时长
	search.pagination(); // 分页
});

var search = {
	showTitle : function() {
		var q = $('#q').val();
		if(q != '' && q != undefined) {
			if(q.indexOf(industry) > -1 || q.indexOf(genre) > -1) {
				// 如果含有tags字样，那么证明只对tags字段进行搜索
				q.replace(industry,'');
				q.replace(genre,'');
			}
		}
		
		$('#search-q').val(q == '*' ? '' : q);
	},
	initCrumbs : function() {
		// 初始化面包屑布局 
		var q = $('#q').val();
		// var tags = $('#tags').val();
		var industry = $('#industry').val(); // 行业
		var genre = $('#genre').val(); // 类型
		
		var $tagBody ='';
		if(q != undefined  && q.trim() != '' && q.trim() != '*') {
			// 将搜索内容写入面包屑布局
			// 去除空格以及','
			var re2='(\\s*)(,)(\\s*)';	
		    var p = new RegExp(re2,["gm"]);
		    q = q.replace(p, ' ');
		    var qArray = q.split(/\s+/);
			if(qArray != '') {
				$.each(qArray,function(i,tag){
					if(tag.trim() != '' && tag.trim() != undefined) {
						$tagBody += '<div class="tag" id="tagType">';
						$tagBody += '<div class="controlCard">';
						$tagBody += '<span>'+ tag.trim() +'</span><span class="tagX" id="tagContentX" data-type="condition" data-text='+ tag.trim() +'>x</span></div>';
						$tagBody += '</div>';
					}
				});
			} else {
				// 全部
				$tagBody += '<div class="tag" id="tagType">';
				$tagBody += '<div class="controlCard">';
				$tagBody += '<span>全部</span><span class="tagX" id="tagContentX" data-text="全部">x</span></div>';
				$tagBody += '</div>';
			}
			
		}else {
			// q为空，则为全部
			$tagBody += '<div class="tag" id="tagType">';
			$tagBody += '<div class="controlCard">';
			$tagBody += '<span>全部</span><span class="tagX" id="tagContentX" data-text="全部">x</span></div>';
			$tagBody += '</div>';
		}
		
		// 行业
		if(industry != undefined  && industry != null && industry.trim() != '') {
			// 将搜索内容写入面包屑布局
			// 去除空格以及','
			var re2='(\\s*)(,)(\\s*)';	
		    var p = new RegExp(re2,["gm"]);
		    industry = industry.replace(p, ' ');
		    var qArray = industry.split(/\s+/);
			if(qArray != '') {
				$.each(qArray,function(i,tag){
					if(tag.trim() != '' && tag.trim() != undefined) {
						$tagBody += '<div class="tag" id="tagType">';
						$tagBody += '<div class="controlCard">';
						$tagBody += '<span>'+ tag.trim() +'</span><span class="tagX" id="tagContentX" data-type="indy" data-text='+ tag.trim() +'>x</span></div>';
						$tagBody += '</div>';
					}
				});
			}
		}
		
		// 类型
		if(genre != undefined  && genre != null && genre.trim() != '') {
			// 将搜索内容写入面包屑布局
			// 去除空格以及','
			var re2='(\\s*)(,)(\\s*)';	
		    var p = new RegExp(re2,["gm"]);
		    genre = genre.replace(p, ' ');
		    var qArray = genre.split(/\s+/);
			if(qArray != '') {
				$.each(qArray,function(i,tag){
					if(tag.trim() != '' && tag.trim() != undefined) {
						$tagBody += '<div class="tag" id="tagType">';
						$tagBody += '<div class="controlCard">';
						$tagBody += '<span>'+ tag.trim() +'</span><span class="tagX" id="tagContentX" data-type="gen" data-text='+ tag.trim() +'>x</span></div>';
						$tagBody += '</div>';
					}
				});
			}
		}
		
		// 价格
		var price = $('#price').val();
		if(price != undefined  && price != '') {
			price = parsePrice(price);
			if(price != null) {
				$tagBody += '<div class="tag" id="tagType">';
				$tagBody +='<div class="controlCard">';
				$tagBody +='<span>'+ price +'</span><span class="tagX" id="tagContentX" data-type="price">x</span></div>';
				$tagBody += '</div>';
			}
			
		}
		// 时长
		var length = $('#length').val();
		if(length != undefined  && length != '') {
			length = parseLength(length);
			if(length != null) {
				$tagBody += '<div class="tag" id="tagType">';
				$tagBody += '<div class="controlCard">';
				$tagBody += '<span>'+ length +'</span><span class="tagX" id="tagContentX" data-type="length">x</span></div>';
				$tagBody += '</div>';
			}
		}
		
		// 写入页面
		$("#videoTag").append($tagBody);
		
		// 注册面包屑布局的点击事件
		$('.tagX').unbind('click');
		$('.tagX').bind('click',crumbsClick);
	},
	loadItem : function(){
			// 清除数据
			$('#item-list').empty();
			$ul = '';
			$ulBus = '';
			var q = $('#q').val();
			// var tags = $('#tags').val();
			// TODO 行业、类型
			var industry = $('#industry').val(); // 行业
			var genre = $('#genre').val(); // 类型
			
			var price = $('#price').val();
			var length = $('#length').val();
			
			var param = '?q=' + q;
			if(price != null && price != undefined && price != ''){
				param += '&price=' + price;
			}
			
			if(length != null && length != undefined && length != '') {
				param += '&length=' + length;
			}
			
			var tParam = '&industry=@_@';
			
			var gParam = '&genre=@_@';
			
			if(industry != null && industry != undefined && industry != '')
				gParam += '&industry=' + industry;
			
			if(genre != null && genre != undefined && genre != '')
				tParam += '&genre=' + genre;
			
			$.each(typeArray,function(i,item){
				// 去除重复
				if(industry != undefined && industry != '' && industry != null) {
					if(industry.indexOf(item) > -1)
						tParam = tParam.replace('@_@',industry);
					else
						tParam = tParam.replace('@_@',industry + ' ' + item);
				}else {
					tParam = tParam.replace('@_@',item + ' ');
				}
				$ul += '<li>';
				$ul += '<a href="'+ getContextPath() + '/search' + param + tParam.trim() + '" class="itemAll" data-id="'+ item +'">'+ item +'</a>';
				$ul += '</li>';
				
				tParam = '&industry=@_@';
				if(genre != null && genre != undefined && genre != '')
					tParam += '&genre=' + genre;
			});
			
			$.each(busArray,function(i,item){
				// 去除重复
				if(genre != undefined && genre != '' && genre != null) {
					if(genre.indexOf(item) > -1) 
						gParam = gParam.replace('@_@',genre);
					else 
						gParam = gParam.replace('@_@',genre + ' ' + item);
				}else {
					gParam = gParam.replace('@_@',item + ' ');
				}
				$ulBus += '<li>';
				$ulBus += '<a href="'+ getContextPath() + '/search' + param + gParam.trim() + '" class="BusItemAll" data-id="'+ item +'">'+ item +'</a>';
				$ulBus += '</li>';
				
				gParam = '&genre=@_@';
				if(industry != null && industry != undefined && industry != '')
					gParam += '&industry=' + industry;
				
			});
			
			$('#item-list').append($ul);
			$('#bus-item-list').append($ulBus);
			
	},
	loadPrice : function(){ // 装配价格
		$('#price-list').empty();
		var q = $('#q').val();
		var length = $('#length').val();
		// var tags = $('#tags').val();
		// TODO 行业、类型
		var industry = $('#industry').val(); // 行业
		var genre = $('#genre').val(); // 类型
		
		var param = '?q=' + q;
		
		if(length != null && length != undefined && length != '') {
			param += '&length=' + length;
		}
		
		if(industry != null && industry != undefined && industry != '') {
			param += '&industry=' + industry.trim();
		}
		
		if(genre != null && genre != undefined && genre != '') {
			param += '&genre=' + genre.trim();
		}
		
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
				// 如果不是数字,则清空
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
		
	},
	loadLength : function(){ // 装配时长
		$('#length-list').empty();
		
		var q = $('#q').val();
		var price = $('#price').val();
		// var tags = $('#tags').val();
		
		var industry = $('#industry').val(); // 行业
		var genre = $('#genre').val(); // 类型
		
		var param = '?q=' + q;
		
		if(price != null && price != undefined && price != '') {
			param += '&price=' + price;
		}
		
		if(industry != null && industry != undefined && industry != '') {
			param += '&industry=' + industry.trim();
		}
		
		if(genre != null && genre != undefined && genre != '') {
			param += '&genre=' + genre.trim();
		}
		
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

// 面包布局项目点击事件
function crumbsClick() {
	// 类型
	var strType = $(this).data('type');
	// 文案
	var strText = $(this).data('text');
	// 搜索维度信息
	var q = $('#q').val();
	var length = $('#length').val();
	var price = $('#price').val();
	
	var industry = $('#industry').val(); // 行业
	var genre = $('#genre').val(); // 类型
	
	var param = '';
	if(strType != undefined && strType != '') {
		// 类型不为空时，排除了 “全部”的可能
		if(strType == 'condition'){
			// 点击标签时，移除这个标签
			if(strText != undefined && strText != '' && strText != null) {
				q = q.replace(strText,'');
			}
			param = recombineSearchCondition(q, industry, genre, price, length);
		} else if (strType == 'indy') {
			// 取消行业标签时
			// 点击标签时，移除这个标签
			if(strText != undefined && strText != '' && strText != null) {
				industry = industry.replace(strText,'');
			}
			param = recombineSearchCondition(q, industry, genre, price, length);
		} else if(strType == 'gen') {
			// 取消类型标签时
			// 点击标签时，移除这个标签
			if(strText != undefined && strText != '' && strText != null) {
				genre = genre.replace(strText,'');
			}
			param = recombineSearchCondition(q, industry, genre, price, length);
		} else if(strType == 'price') {
			// 取消价格时
			param = recombineSearchCondition(q, industry, genre, '', length);
		} else if(strType == 'length') {
			// 取消时长时
			param = recombineSearchCondition(q, industry, genre, price, '');
		}
	}else {
		// 类型为空时，则证明是“全部”，不做任何处理
		return ;
	}
	
	location.href = getContextPath() + '/search' + param;
}

// 重组url
function recombineSearchCondition(q,industry,genre,price,length) {
	var param = '';
	if(q != null && q != undefined && q != '') {
		param = '?q=' + q;
	}
	if(industry != null && industry != undefined && industry != '') {
		var indy = industry.split(' ');
		var temp = '';
		for(var i = 0;i < indy.length;i ++) {
			if(indy[i].trim() != '') {
				temp += indy[i].trim() + ' ';
			}
		}
		if(temp != '' && temp != null)
			param += '&industry=' + temp.trim();
	}
	
	if(genre != null && genre != undefined && genre != '') {
		var gen = genre.split(' ');
		var temp = '';
		for(var i = 0;i < gen.length;i ++) {
			if(gen[i].trim() != '') {
				temp += gen[i].trim() + ' ';
			}
		}
		if(temp != '' && temp != null)
			param += '&genre=' + temp.trim();
	}
	
	if(price != null && price != undefined && price != '') {
		param += '&price=' + price;
	}
	
	if(length != null && length != undefined && length != ''){
		param += '&length=' + item;
	}
	
	// 判断param中是否含有q
	if(param != '' && param != null) {
		if(param.indexOf('?q=') < 0) {
			// param不包含q,那么把&替换成?
			param = '?q=' + param;
		}
	}
	return param;
}

// 价格解析
function parsePrice(price) {
	if(price != undefined && price != '') {
		// 价钱不为空时
		if(price.indexOf('TO') > -1) {
			// 分解
			var pArray = price.split('TO');
			var startPrice = pArray[0].split('[')[1].trim();
			var endPrice = pArray[1].split(']')[0].trim();
			if(startPrice == '*') {
				// 开始价格如果为*，则认为只有结尾价格有效
				if(endPrice == '*') {
					// 开始、结束价格都为*则认为是查询全部价格
					return null;
				}
				
				return (Number(endPrice) / 10000) + '万以内';
			}
			
			if(endPrice == '*'){
				// 结尾价格如果为*，则认为只有开始价格有效
				if(startPrice == '*') {
					// 开始、结束价格都为*,则认为是查询全部价格
					return null;
				}
				
				return (Number(startPrice) / 10000) + '万以上';
			}
			
			return (Number(startPrice) / 10000) + '~' + (Number(endPrice) / 10000) + '万';
		}
	}
	return null;
}

// 解析时长
function parseLength(length) {
	if(length != undefined && length != '') {
		// 时长不为空时
		if(length.indexOf('TO') > -1) {
			// 分解
			var lArray = length.split('TO');
			var startLength = lArray[0].split('[')[1].trim();
			var endLength = lArray[1].split(']')[0].trim();
			if(startLength == '*') {
				// 开始价格如果为*，则认为只有结尾价格有效
				if(endLength == '*') {
					// 开始、结束价格都为*则认为是查询全部价格
					return null;
				}
				
				return (parseInt(endLength)) + '秒以内';
			}
			
			if(endLength == '*'){
				// 结尾价格如果为*，则认为只有开始价格有效
				if(startLength == '*') {
					// 开始、结束价格都为*则认为是查询全部价格
					return null;
				}
				
				return (parseInt(startLength)) + '秒以上';
			}
			return Number(startLength) + '~' + Number(endLength) + '秒';
		}
	}
	return null;
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
					
					var imgPath = '/resources/images/index/noImg.jpg';
					var imageUrl = solr.picLDUrl;
					if(imageUrl != undefined && imageUrl != null && imageUrl != ""){
						imgPath = getDfsHostName() + imageUrl;
					}
					
					if(i % 4 == 0){
						$body += '<div class="video-row">';
					}
					$body += '<div class="video-card video-col-4">';
					var targetHref = getContextPath() + '/play/' + solr.teamId + '_' + solr.productId + '.html';
					$body += '<a href="'+ targetHref +'" target="_blank">';
					$body += '<img class="img-card-4" src="'+ imgPath +'" alt="拍片网" />';
					$body += '</a>';
					$body += '<div class="video-desc-section">';
					$body += '<h3>'+ solr.productName +'</h3>';
					$body += '<div class="video-tags">';
					
					var tags = solr.tags;
					
					if(tags != '' && tags != null) {
						var re2='(\\s*)(,|，)(\\s*)';	
					    var p = new RegExp(re2,["gm"]);
					    tags = tags.replace(p, ' ');
					    var tagsArray = tags.split(/\s+/);
						$.each(tagsArray,function(i,tag) {
							if(i <= 2)
								$body += tag;
							if (i < 2 && i != tagsArray.length - 1)
								$body += ' / ';
						})
					}
					
					$body += '</div>';
					$body += '</div>';
					$body += '<div class="video-price-section">';
					$body += '<div class="video-price">';
					$body += '<h2>￥'+ ((solr.price == 0) ? '暂无报价' : thousandCount(solr.price)) +'</h2>&nbsp;&nbsp;';
					if(solr.price < solr.orignalPrice){
						$body += '<h3>原价&nbsp;￥&nbsp;'+ thousandCount(solr.orignalPrice) +'</h3>';
					}
					$body += '</div>';
					$body += '</div>';
					$body += '</div>';

					if(i % 4 == 3){
						$body += '</div>';
					}
				});

				$('#video-content').append($body); // 填充数据
			}else {
				// 如果没有数据，则显示 "对不起，没有查询到您想要的数据"
				$('#video-content').append('<div class="prompt-word">您找的影片遗落在外星球了！快 登录 拍片网飞船吧！</div>');
			}
		}
	}, getContextPath() + '/search/pagination', $.toJSON({
		begin : start,
		limit : pageSize,
		condition : $('#q').val().trim(),
		industry : $('#industry').val().trim(),
		genre : $('#genre').val().trim(),
		priceFq : $('#price').val(),
		lengthFq : $('#length').val()
	}));
}


var searchVideo= {
		
		addType : function(word){
			
			if(word!="全部"){
			var formBody ='<div class="tag" id="tagType">';
			formBody +='<div class="controlCard">';
			formBody +='<span>'+word+'</span><span class="tagX">x</span></div>';
			$("#videoTag").append(formBody);
			this.typeClick();
			}
			if(word=="女性"||word=="体育健身"||word=="o2o"){
				$('#more-link').click();
			}
		},
		
		addPrice: function(word){
			if(word!="全部"){
			var formBody ='<div class="tag" id="tagPrice">';
			formBody +='<div class="controlCard">';
			formBody +='<span >'+word+'</span><span class="tagX">x</span></div>';
			$("#videoTag").append(formBody);
			this.priceClick();
			}
		},
		addTime: function(word){
			if(word!="全部"){
			var formBody ='<div class="tag" id="tagTime">';
			formBody +='<div class="controlCard"  >';
			formBody +='<span >'+word+'</span><span class="tagX">x</span></div>';
			$("#videoTag").append(formBody);
			this.timeClick();
			}
		},
		typeClick:function(){
			$('#tagType').on('click',function(){
				var url = $('#item-all').attr('href');
				location.href=url;
				
			});
		},
		priceClick:function(){
			$('#tagPrice').on('click',function(){
				var url = $('#price-all').attr('href');
				location.href=url;
				
			});
		},
		timeClick:function(){
			$('#tagTime').on('click',function(){
				var url = $('#length-all').attr('href');
				location.href=url;
				
			});
		}
}
