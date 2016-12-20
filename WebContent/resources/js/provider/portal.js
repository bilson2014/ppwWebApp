var count = 120; // 间隔函数，1秒执行
var curCount; // 当前剩余秒数
var uploader;
var PopInterValObj, successIntervalObj, IntervalObj; // timer变量，控制时间

$(function(){ 
    $("#content-frame").load(function(){ 
         var height = $(this).contents().find("body").height(); 
         //这样给以一个最小高度 
         alert(height);
         $(this).height( height < 900 ? 1024 : height ); 
    }); 
});

$().ready(function(){
	$('.infoItem div').on('click',function(){
		$("#content-frame").prop("src", getContextPath() + '/provider/' + $(this).data('action'));
		$('.menu-content').find('li').removeClass('active');
		$(this).addClass('active');
		$('.infoItem').removeClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($(this).text());
	});
	successErrorTipShow();
});



function hideSuccessTooltip(){
	$('.tooltip-success-show').hide('normal');
}

// 成功信息 提示框弹出方法
function successToolTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-success-show').slideDown('normal');
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}

function hideError(){
	$('.tooltip-error-show').hide('normal');
}

// 成功信息 提示框弹出方法
function successErrorTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-error-show').slideDown('normal');
	successIntervalObj = window.setInterval(hideError(), 3000);
}
