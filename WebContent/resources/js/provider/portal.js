var count = 120; // 间隔函数，1秒执行
var curCount; // 当前剩余秒数
var uploader;
var PopInterValObj, successIntervalObj, IntervalObj; // timer变量，控制时间
$().ready(function(){
	
	
	
	$('.infoItem div').on('click',function(){
		$("#content-frame").prop("src", getContextPath() + '/provider/' + $(this).data('action'));
		$('.menu-content').find('li').removeClass('active');
		$(this).addClass('active');
		$('.infoItem').removeClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($(this).text());
		if($(this).data('action')=='safe-info'){
			getHeight(1);
		}else{
			getHeight(2);
		}
	});
	var p = $('#proLogo').attr('data-value');
	if(p!=null && p!=''){
		$('#proLogo').attr('src',getDfsHostName() + p);
	}
	
	$('#falseCheck').on('click',function(){
		$(window.parent.document).find('#tooltip-check').hide();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        							
	});
	$('#closeCheck').on('click',function(){
		$(window.parent.document).find('#tooltip-check').hide();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        							
	});
	
});

function getHeight(num){
	var screen = document.body.clientHeight - 180;
	var safe = 546;
	if(num == 1){
	$("#content-frame").css('height',safe);
	}else{
		$("#content-frame").css('height',screen);
	}
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

function hideError(){
	$('.tooltip-error-show').hide('normal');
}

// 成功信息 提示框弹出方法
function successErrorTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-error-show').slideDown('normal');
	successIntervalObj = window.setInterval(hideError(), 3000);
}
