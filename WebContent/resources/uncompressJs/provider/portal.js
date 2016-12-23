$().ready(function(){
	
	// 加载头部
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
	
	$('.active').click();
});


//提示框隐藏
function hideTooltip(){
	$('.tooltip-show').hide('normal');
}

function hideSuccessTooltip(){
	$('.tooltip-success-show').hide('normal');
}

// 成功信息 提示框弹出方法
function successToolTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-success-show').slideDown('normal');
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}