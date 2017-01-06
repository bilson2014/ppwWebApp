
$().ready(function() {
	initContent();
});

function initContent() {
	var html = $('#newsValue').html().trim();
	if (html != '') {
	//	$.base64.utf8encode = true;
	//	var decodeContent = $.trim($.base64.atob(html, true));
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
	    
//	    $('.discription').each(function(i){ 
//	    	 var teamDescripti=document.getElementsByClassName('discription')[0];  
//	 	    $clamp(teamDescripti,{clamp:3}); 
//         	  }); 
		
		
	}, getContextPath() + '/news/info/recommend',null);
}

function addMoreNews(item){
	  var $body = '<div class="videoModel">' +
	  //'<a href="/home/news/info/'+item.id+'" target="_blank">'+
	  '<a href="/news/article-'+item.id+'.html" target="_blank">'+
      	'<label>' + item.title + '</label>' +
      '<label class="discription">' + item.discription + '</label>'+
      '<label>了解更多</label>' +
      '</a>'+
      '</div>';
	  $body += '</div>';
      $("#moreNews").append($body);
}


