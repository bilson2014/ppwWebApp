$().ready(function(){
	
	
	$('.infoItem').on('click',function(){
		alert(1);
	});
	
	$('.infoItem div').on('click',function(){
		alert($(this).data('action'));
		$("#content-frame").prop("src", getContextPath() + '/provider/' + $(this).data('action'));
		$('.menu-content').find('li').removeClass('active');
		$(this).addClass('active');
	});
	
	
});


/*//加载头部
$('#header-content').prop('src',getContextPath() + '/provider/header');
var flag = $('#portal-flag').val();
if(flag == 4){
	// 幽灵模式，删除审核状态菜单
	$('.menu-content li:last-child').remove();
}
// 实例化menu
$('.menu-content li').on('click',function(){
	$("#content-frame").prop("src", getContextPath() + '/provider/' + $(this).data('action'));
	$('.menu-content').find('li').removeClass('active');
	$(this).addClass('active');
});

$('.active').click();*/