$().ready(function() {
	initContent();	    
    controlRightPos();
     
});


//右侧是否悬浮
function controlRightPos(){
	
	  $(window).scroll(function() {
		  var heights = $('.page').height() - 1000;
		  if($(document).scrollTop()>=heights){
			  $('.rightContent').removeClass('fixed');
			  $('.rightContent').addClass('nofixed');
		  }else{
			  $('.rightContent').removeClass('nofixed');
			  $('.rightContent').addClass('fixed');
		  }
                      
	  });
}

function initContent() {
	var html = $('#newsValue').html().trim();
	if (html != '') {
		var re2 = 'src="@.@([^"]*)"';
		var p = new RegExp(re2, [ "gm" ]);
		html = html.replace(p, "src='" + getDfsHostName()
				+ "$1" + "'");
		$('#newsValue').html(html);
	} else {
		$('#newsValue').text('');
	}
	
	loadData(function(data){
		
		var newsId =$('#newsId').val();
		var k=0;
	    $.each(data.result, function(i,item) {
	    	if(k<6 && item.id != newsId){
	    		addMoreNews(item);//排除自己
	    		k++;
	    	}
	    });
	}, getContextPath() + '/get/news/tag?q=最热资讯',null);
}

function addMoreNews(item){
	  var $body = '<div class="videoModel">' +
	  //'<a href="/home/news/info/'+item.id+'" target="_blank">'+
	  '<a href="/news/article-'+item.id+'.html" target="_blank">'+
	  '<img>'
      '<label>' + item.title + '</label>' +
      '<label class="discription">' + item.discription + '</label>'+
      '</a>'+
      '</div>';
	  $body += '</div>';
      $("#moreNews").append($body);
}


