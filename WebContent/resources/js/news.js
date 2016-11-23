
$().ready(function() {
	initContent();
});

function initContent() {
	var html = $('#newsValue').text().trim();
	if (html != '') {
		$.base64.utf8encode = true;
		var decodeContent = $.trim($.base64.atob(html, true));
		var re2 = 'src="@.@([^"]*)"';
		var p = new RegExp(re2, [ "gm" ]);
		decodeContent = decodeContent.replace(p, "src='" + getDfsHostName()
				+ "$1" + "'");
		$('#newsValue').html(decodeContent);
	} else {
		$('#newsValue').text('');
	}
	
	
	
	loadData(function(data){
		
        
		var newsId =$('#newsId').val();
		
	    $.each(data.result, function(i,item) {
	    	if(item.id != newsId)
	    		addMoreNews(item);  
	    });
		
		
	}, getContextPath() + '/home/news/recommend',null);
}

function addMoreNews(item){
	  var $body = '<div class="videoModel">' +
	  '<a href="/home/news/info/'+item.id+'" target="_blank">'+
      	'<label>' + item.title + '</label>' +
      '</a>'+
      '<label>' + item.discription + '</label>'+
      ' <label>了解更多</label>' +
      '</div>';
	  $body += '</div>';
      $("#moreNews").append($body);
}


