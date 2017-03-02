var pageSize = 20;
$().ready(function() {	
	// 分类高亮
	newsInfo.initCategory();
	
	// 格式化标题和介绍
	newsInfo.formatContent();
	// TODO 窗口大小监听，format title and description
	
	// 初始化page
	newsInfo.initPagination();
});


var newsInfo = {
		// 分类高亮
		initCategory : function() {
			var q = $('#q').val();
			if(q != undefined && q != '' && q != null) {
				$.each($('.category'),function(i,model) {
					if($(model).data('value') == q) {
						$('.category').removeClass('checkActive');
						$(this).addClass('checkActive');
						return;
					}
				});
			}
		},
		// 格式化标题及介绍
		formatContent : function() {
			$.each($('.videoModel'), function(i,model) {
				var title = $(model).find('.title').text();
				var description = $(model).find('.content').text();
				$(model).find('.title').text(getTitleIndex(title));
				$(model).find('.content').text(getContentIndex(description))
			})
		},
		initPagination : function() {
			
			$(".pagination").createPage({
				pageCount: Math.ceil($('#total').val() / pageSize),
				current: 1,
				backFn:function(p){
					// 点击 翻页，查询符合条件的视频
					loadNews((p - 1) * pageSize);
					currentSize = (p - 1) * pageSize;
					scrollTo(0,0);
				}
			});
		}

}

// 加载新闻
function loadNews(page) {
	
	loadData(function(list){
		
		$("#pageInfo").empty();
	    $.each(list, function(i,news) {	
	    	var hrefs = getHostName()+"/news/article-"+news.id+".html";
	   	 	var tagsList = news.tags.split(" ");
	   	 
	   	  var $body = '<li class="videoModel">' +
	                     '<a href="'+hrefs+'">'+	  
	   	              '<img src='+getDfsHostName()+news.picLDUrl+'>'+
	   	              '<div class="tagDiv">';
	   	             
	   		for(var i=0;i<tagsList.length;i++){
	   			if(i>0){
	   				 $body += '<div class="tags">'+"/"+tagsList[i]+'</div>';
	   			}else{
	   				 $body += '<div class="tags">'+tagsList[i]+'</div>';
	   			}
	   			
	   		}
	   		$body += '</div>';
	   		$body += '<div class="title">'+getTitleIndex(news.title)+'</div>';
	   		$body += '<div class="content">'+getContentIndex(news.discription)+'</div>';
	   		$body += '<div class="time">发表于 '+getTime(news.creationTime)+'</div>';
	   		$body +='</a></li>';		 
	   	    $("#pageInfo").append($body);
	    });
	}, getContextPath() + '/search/news/pagination',$.toJSON({
		begin : page,
		limit : pageSize,
		condition : $('#q').val().trim()
	}));
	
	
}

// 标题缩略格式化
function getTitleIndex(str){
	 var screenWidth = document.documentElement.clientWidth;
	 var num = 32;  
	    if(screenWidth<=1500){
	    	num = 25;
	    }
	    if(screenWidth<=1276){
	    	num = 20;
	    }
	if(str.length<=num){
		var content = str;
	}else{
		var content = str.substr(0,num) +"..."
	}
	
	return  content;
}

// 描述缩略格式化
function getContentIndex(str){
	
	 var screenWidth = document.documentElement.clientWidth;
	 var num = 55;  
	    if(screenWidth<=1500){
	    	num = 45;
	    }
	    if(screenWidth<=1276){
	    	num = 30;
	    }
	if(str.length<=num){
		var content = str;
	}else{
		var content = str.substr(1,num) +"[...]"
	}
	
	return  content;
}

// 日期格式化
function getTime(str){
	var date = convert(str);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year+'年'+month+'月'+day+'日';

}

function convert(val) {
	if(val != null && val != undefined && val != ''){
		return new Date(Date.parse(val.replace(/-/g, "/")));
	}
	return '';
}







