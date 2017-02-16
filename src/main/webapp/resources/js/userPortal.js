var count = 120; // 间隔函数，1秒执行
var curCount; // 当前剩余秒数
var uploader;
var PopInterValObj, successIntervalObj, IntervalObj; // timer变量，控制时间
$().ready(function(){
	showPassInfo();
	initPage();
	getHeight(2);
	$('.infoItem div').on('click',function(){
		$("#content-frame").prop("src", getContextPath() + '/user/' + $(this).data('action'));
		$('.menu-content').find('li').removeClass('active');
		$(this).addClass('active');
		$('.infoItem').removeClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($(this).text());
		getHeight();
		if($(this).data('action')=='video-list'){
			$('.tooltip-wati').show();
		}
	});
	var p = $('#proLogo').attr('data-value');
	if(p!=null && p!=''){
		if(p.indexOf("/resources/")== -1){
			$('#proLogo').attr('src',getDfsHostName() + p);
		}
		if(p.indexOf("http")!= -1){
			$('#proLogo').attr('src',p);
		}
	}
	
	$('#falseCheck').on('click',function(){
		$(window.parent.document).find('#tooltip-check').hide();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        							
	});
	$('#closeCheck').on('click',function(){
		$(window.parent.document).find('#tooltip-check').hide();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        							
	});
	
	
});


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

function getHeight(){
	var screen = document.body.clientHeight - 200;
	$("#content-frame").css('height',screen);
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

function initPage(){
	
	var href = window.location.href;
    var state = href.substr(href.lastIndexOf("?")+1,href.length);
    if(state.trim() == "safeInfo"){
    	$("#content-frame").prop("src", getContextPath() + '/user/' + state);
    	$('.tooltip-wati').hide();
    	$('.menu-content').find('li').removeClass('active');
		$('#clickSafe div').addClass('active');
		$('.infoItem').removeClass('activeThis');
		$('#clickSafe').addClass('activeThis');
		$(this).parent().addClass('activeThis');
		$('#titleTop').text($('#clickSafe div').text());
    }
    
   
}
