var count = 120; // 间隔函数，1秒执行
var curCount; // 当前剩余秒数
var uploader;
var PopInterValObj, successIntervalObj, IntervalObj; // timer变量，控制时间
$().ready(function(){
	$('.tooltip-wati').show();
	initPage();
	showPassInfo();
	getHeight(2);
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
		if($(this).data('action')=='video-list'){
			$('.tooltip-wati').show();
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
	
	var msg = $('#recommendation').val();
	var flag = $("#bean-flag").val();
	if(flag != null && flag !='' && flag == '0'){
		//var msg = $('#recommendation').val();
		showInfomation('您提交的资料正在审核中','官方将在1个工作日内联系您');
	}else if(flag != null && flag !='' && flag == '2'){
		showInfomation('您提交的资料审核未通过','审核失败原因：'+msg);
	}else{
		var a = $("#bean-checkStatus").val();//是否存在再次审核
		if(a != null && a !='' && a == '0'){
			//var msg = $('#recommendation').val();
			showInfomation('您提交的资料正在审核中','官方将在1个工作日内联系您');
		}else if(a != null && a !='' && a == '2'){
			var msg = $('#checkDetails').val();
			showInfomation('您提交的资料审核未通过','审核失败原因：'+msg);
		}else{
			hideInfomation();
		}
	}
	
});

function initPage(){
	
	var href = window.location.href;
    var state = href.substr(href.lastIndexOf("?")+1,href.length);
   /* if(state.trim() == "company-info" || state.trim() == "safe-info"){
    	$("#content-frame").prop("src", getContextPath() + '/provider/' + state);
    	$('.tooltip-wati').hide();
    }*/
    if(state.trim() == "company-info"){
    	$("#content-frame").prop("src", getContextPath() + '/provider/' + state);
    	$('.tooltip-wati').hide();
    	$('.menu-content').find('li').removeClass('active');
		$('#clickCompany div').addClass('active');
		$('.infoItem').removeClass('activeThis');
		$('#clickCompany').addClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($('#clickCompany div').text());
    }
    if(state.trim() == "safe-info"){
    	$("#content-frame").prop("src", getContextPath() + '/provider/' + state);
    	$('.tooltip-wati').hide();
    	$('.menu-content').find('li').removeClass('active');
		$('#clickSafe div').addClass('active');
		$('.infoItem').removeClass('activeThis');
		$('#clickSafe').addClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($('#clickSafe div').text());
    }
    
   
}

function showInfomation(title,body){
	$(document).find('#infomation').slideDown();
	$(document).find('#infomation_title').text(title);
	$(document).find('#infomation_body').text(body);
	$(document).find('#closeInfo').on('click',function(){
		hideInfomation();
	});
}

function hideInfomation(){
	$(document).find('#infomation').hide();
}

function getHeight(num){
	var screen = document.body.clientHeight - 180;
	var safe = 546;
	if(num == 1){
	$("#content-frame").css('height',safe);
	}else{
		$("#content-frame").css('height',screen);
	}
}

function showPassInfo(){
	var pass = $('.userProduct');
	pass.on('click',function(){
		if(pass.hasClass('showInfo')){
			var info = pass.attr('data-content');
			$('#tooltip-check').show();
			$('#checkInfo').text(info);
			$('#sureCheck').on('click',function(){
				$('#tooltip-check').hide();
			});
		}
	});

}


function hideSuccessTooltip(){
	$('.tooltip-success-show').hide();
}

// 成功信息 提示框弹出方法
function successToolTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-success-show').slideDown();
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}

function hideError(){
	$('.tooltip-error-show').hide();
}

// 成功信息 提示框弹出方法
function successErrorTipShow(){
	window.clearInterval(successIntervalObj);
	$('.tooltip-error-show').slideDown();
	successIntervalObj = window.setInterval(hideError(), 3000);
}
