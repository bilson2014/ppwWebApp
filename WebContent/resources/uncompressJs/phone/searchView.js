$().ready(function(){
	$('label').on('click',function(){
		var q = $(this).text().trim();
		if(q != null && q != '' && q != undefined){
			$('#search-q').val($(this).text().trim());
			$('#s-form').submit();
		}
	});
});