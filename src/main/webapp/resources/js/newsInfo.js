var categorys = -1; 
$().ready(function() {	
	initContent(1);
	initPageSize();
	initCategory();
});

function initContent(num) {	
	loadData(function(data){
		 $("#pageInfo").html('');
	    $.each(data.result, function(i,item) {	
	    	addMoreNews(item);
	    });
	    scrollTo(0,0);
	}, getContextPath() + '/news/pagelist',$.toJSON({
		page:num,
		rows:20,
		category:categorys
	}));
	
	
}

function initCategory(){
	$('.category').on('click',function(){
		categorys = $(this).attr('data-value');
		$('.category').removeClass('checkActive');
		$(this).addClass('checkActive');
		initContent(1);
		initPageSize();
	});
	
}

function initPageSize(){
	loadData(function(data){
        getPageSize(data.result);
	}, getContextPath() + '/news/pagesize',$.toJSON({
		category:categorys
	}));
}

function addMoreNews(item){
	
	 var hrefs = getHostName()+"/news/article-"+item.id+".html";
	 var tagsList = item.tags.split(" ");
	 
	  var $body = '<li class="videoModel">' +
                  '<a href="'+hrefs+'">'+	  
	              '<img src='+getDfsHostName()+item.picLDUrl+'>'+
	              '<div class="tagDiv">';
	             
		for(var i=0;i<tagsList.length;i++){
			if(i>0){
				 $body += '<div class="tags">'+"/"+tagsList[i]+'</div>';
			}else{
				 $body += '<div class="tags">'+tagsList[i]+'</div>';
			}
			
		}
		$body += '</div>';
		$body += '<div class="title">'+getTitleIndex(item.title)+'</div>';
		$body += '<div class="content">'+getContentIndex(item.discription)+'</div>';
		$body += '<div class="time">发表于 '+getTime(item.createTime)+'</div>';
		$body +='</a></li>';		 
	    $("#pageInfo").append($body);
}

function getPageSize(num){
	
//	if(num<=20){
//		$('#pagination').hide();
//	}else{
//		$('#pagination').show();
//	}
	
	$(".pagination").createPage({
		pageCount: Math.ceil(num / 20),
		current: 1,
		backFn:function(p){
			initContent(p);
		}
	});
}

function getTitleIndex(string){
	 var screenWidth = document.documentElement.clientWidth;
	 var num = 32;  
	    if(screenWidth<=1500){
	    	num = 25;
	    }
	    if(screenWidth<=1276){
	    	num = 20;
	    }
	if(string.length<=num){
		var content = string
	}else{
		var content = string.substr(0,num) +"..."
	}
	
	return  content;
}

function getContentIndex(string){
	
	 var screenWidth = document.documentElement.clientWidth;
	 var num = 55;  
	    if(screenWidth<=1500){
	    	num = 45;
	    }
	    if(screenWidth<=1276){
	    	num = 30;
	    }
	if(string.length<=num){
		var content = string
	}else{
		var content = string.substr(1,num) +"[...]"
	}
	
	return  content;
}


function getTime(string){
	var date = convert(string);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year+'年'+month+'月'+day+'日';

}

function convert(value) {
	if(value != null && value != undefined && value != ''){
		return new Date(Date.parse(value.replace(/-/g, "/")));
	}
	return '';
}







