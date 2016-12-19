$().ready(function(){
	$('.infoItem div').on('click',function(){
		$("#content-frame").prop("src", getContextPath() + '/provider/' + $(this).data('action'));
		$('.menu-content').find('li').removeClass('active');
		$(this).addClass('active');
	});
});