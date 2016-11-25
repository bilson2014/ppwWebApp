var hasVideo = false;
var kaptcharInterValObj; // timer变量，控制时间
var successIntervalObj;
var initM = 3;
var counts = 120; // 间隔函数，1秒执行
var curCounts = 0; // 当前剩余秒数 - 注册
var InterValObj; // timer变量，控制时间 - 注册
$().ready(function() {
	playVideo();
	chickShowOrder();
	
	$('body').on('click',function(){
		$('.dropdown').find('ul').css('display');
		var ulArray = $('.dropdown').find('ul');
		for (var int = 0; int < ulArray.length; int++) {
			if($(ulArray[int]).css("display")!="none"){
				$(ulArray[int]).slideUp();
			}
		}
		return;
	});
	
    //下拉监听
	$(".dropdown").off('click').on('click',function(){
		var ul = $(this).find('ul');
		if(ul.css("display")!="none"){
			ul.slideUp();
		}else{
			$(this).find('ul').slideDown();
		}
		return false;
	});
	
});

function playVideo() {
	$('#showVideo')
			.on(
					'click',
					function() {
						$('#playVideo').removeClass('hide');
						if (!hasVideo) {
							var $body = ' <div class="openVideo" title="双击关闭视频" id="playVideo"><div></div>'
									+ '<video autoplay controls loop  name="media" id="header3Video">'
									+
									// '<source
									// src="/product/video/paipianwangMovie.mp4"
									// id="source" type="video/mp4">' +
									'<source  src="http://www.apaipian.com/product/video/paipianwangMovie.mp4"  id="source" type="video/mp4">'
									+ '</video>';
							$body += '</div>';
							$("body").append($body);
							hasVideo = true;
							initClose();
						} else {
							document.getElementById('header3Video').play();
						}
					});

}

function initClose() {
	$('#playVideo').on('dblclick', function() {
		$('#playVideo').addClass('hide');
		document.getElementById("header3Video").pause();
	});
}

function chickShowOrder() {
	$('#wantOrder').on('click', function() {
		showOrder('宣传片');
	});
}

function showOrder(typeName) {

    if ($('div').hasClass('comOrder')) {
    	$("#submit-indent-recomment").text(typeName);
        $('.comOrder').show();
    } else {

        var $body = '<div class="comOrder">' +
            '<div class="cOrder" id="cOrder">' +
            '<div class="cCloseBtn" id="closeBtn">' +
            ' 	<div></div>' +
            '</div>' +
            '<div class="cOrderTitle">立即下单,对接制作团队</div>' +
            '<form id="cOrder-form" role="form" method="post" autocomplete="off" accept-charset="UTF-8">'+
            ' <div class="cOrderItem">' +
            '<div class="dropdown dropdowns" id="selectType">' +
            '<div class="btn btn-default dropdown-toggle" type="button" id="commonOrderUlTogle" data-toggle="dropdown">' +
            '<span data-content="0" id="submit-indent-recomment">' + typeName + '</span>' +
            '<div class="carets"></div>' +
            '</div>' +
            '<ul class="dropdown-menu" id="commonOrderUl" role="menu" aria-labelledby="dropdownMenu1">' +
            '<li data-content="0">宣传片</li>' +
            '<li data-content="1">广告片</li>' +
            '<li data-content="2">动画片</li>' +
            '<li data-content="3">病毒视频</li>' +
            '<li data-content="4">微电影</li>' +
            '<li data-content="5">证言影片</li>' +
            '<li data-content="6">公益片</li>' +
            '<li data-content="7">MV</li>' +
            '<li data-content="8">预告片</li>' +
            '<li data-content="9">纪录片</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="cOrderItem" data-content="" id="indent_tele_error" >' +
            ' <input id="indent_tele" placeholder="您的电话号">' +
            '</div>' +
            '<div class="cOrderItem" data-content="" id="indent_code_error">' +
            ' <input id="phoneCode" placeholder="输入手机验证码">' +
            '<div id="getPhoneCode">获取验证码</div>' +
            ' </div>' +
            ' <div class="cOrderBtn" id="order-btn">确认下单</div>' +
            ' </form>' +
            '  <div class="cOrderBotTitle">下单后,专业顾问将在2小时之内与您致电确认具体需求</div>' +
            '</div>';
        $body += '</div>';
        $("body").append($body);
        initOrderClick();
    }

	$('.cCloseBtn').on('click', function() {
		$('.comOrder').remove();
	});
}


function initOrderClick(){
	var flag = true;
	$('#order-btn').off("click").on("click",function(){
		if(checkDatas(1)){ // 检查数据完整性
				showError($('#indent_tele_error'),'');
				showError($('#indent_code_error'),'');
				// 提交表单
				if(flag){
					flag = false;
					loadData2(function(msg){
						$('.comOrder').hide();
						showSuccess();
						flag = true;
					}, getContextPath() + '/order/deliver', 
						{	
						csrftoken:$("#csrftoken").val(),
						indent_tele:$("#indent_tele").val(),
						phoneCode:'-1',
						indent_recomment:$("#submit-indent-recomment").text(),
						indentName:'新订单',
						productId:-1,
						teamId:-1,
						serviceId:-1,
						phoneCode : $('#phoneCode').val(),
					});	
				}
		}
	});
	$('#getPhoneCode').off("click").on('click',function(){
		if(curCounts == 0 && checkDatas(2)){
			curCounts = counts;
			var telephone = $('#indent_tele').val().trim();
			$('#getPhoneCode').text('已发送(' + curCounts + ')');
			$('#getPhoneCode').attr('disabled', 'disabled');
			InterValObj = window.setInterval(SetRemainTimes, 1000); // 启动计时器，1秒钟执行一次
			loadData(function(flag) {
				if (!flag) {
					// 发送不成功
					// 显示重新发送
					sendCode = true;
					$('#getPhoneCode').text('重新获取');
					$('#getPhoneCode').removeAttr('disabled');
				}
			}, getContextPath() + '/login/verification/' + telephone, null);
		}
	});

	$('#commonOrderUlTogle').blur(function() {
		alert(1);
		// $('#commonOrderUl').slideUp();
	});

	$('#commonOrderUlTogle').on('click', function() {
		$('#commonOrderUl').slideDown();
		return false;
	});

	
	$('#commonOrderUl li').on(
			'click',
			function() {
				$(this).parent().parent().find('.dropdown-toggle').find('span')
						.text($(this).text());
				var info = parseInt($(this).attr('data-info'));
				$(this).parent().parent().find('.dropdown-toggle').find('span')
						.attr("data-content", ($(this).attr('data-content')));
				$(this).parent().slideUp();
				return false;
			});
}

function SetRemainTimes() {
	if (curCounts == 0) {
		window.clearInterval(InterValObj); // 停止计时器
		sendCode = true;
		$('#getPhoneCode').text('重新获取');
		$('#getPhoneCode').removeAttr('disabled')
		// 清除session code
		getData(function(data) {
			// 清除session code
		}, getContextPath() + '/login/clear/code');
	} else {
		curCounts--;
		$("#getPhoneCode").text('已发送(' + curCounts + ')');
	}
}

// 检查数据完整性
function checkDatas(type) {
	// 检查数据

	showError($('#indent_tele_error'), '');
	showError($('#indent_code_error'), '');
	var contactTele = $('#indent_tele').val().trim();
	var phoneCode = $('#phoneCode').val().trim();
	var flag = true;

	if (contactTele == '' || contactTele == null || contactTele == undefined) {
		showError($('#indent_tele_error'), '请输入手机号码');
		flag = false;
		return flag;
	}

	if (!checkMobile(contactTele)) {
		showError($('#indent_tele_error'), '手机格式不正确');
		flag = false;
		return flag;
	}

	if ((phoneCode == '' || phoneCode == null || phoneCode == undefined)
			&& type == 1) {
		showError($('#indent_code_error'), '请输入手机验证码');
		flag = false;
		return flag;
	}
	return flag;
}

// 验证 手机号
function checkMobile(str) {
	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
	if (str.match(reg)) {
		return true;
	} else {
		return false;
	}
}

function showError(id, error) {
	if (error == "" || error == null) {
		id.attr('data-content', "");
	} else {
		id.attr('data-content', '*' + error);
	}
}

// 成功 提示框弹出方法

function showSuccess() {
	if ($('div').hasClass('showSuccess')) {
	} else {

		var $body = '<div class="showSuccess">'
				+ '<div class="successModal">'
	            +'<div class="cCloseBtn" id="closeSuccess">'
	            +' 	<div></div>'
	            +'</div>'
				+ ' 	<div class="show-zero2 zeromodal-icon zeromodal-success">'
				+ ' 		<span class="line tip"></span>'
				+ '   	<span class="line long"></span>'
				+ '   	<div class="placeholder"></div>'
				+ '	</div>'
				+ '   <div class="successWord" id="handClsoe">手动关闭</div>'
				+ '   <div class="successInfo">下单成功!<span id="toPortal"></span><span id="last3">3</span>秒后关闭</div>'
				+ '</div>';
		$body += '</div>';
		$("body").append($body);
		successToolTipShow();
	}
}

function successToolTipShow() {
	$('#toPortal').on('click', function() {
		//window.location.href = getContextPath() + '/';
		$('.showSuccess').remove();
	});
	$('#handClsoe').on('click', function() {
		//window.location.href = getContextPath() + '/';
		$('.showSuccess').remove();
	});
	$('#closeSuccess').on('click', function() {
		//window.location.href = getContextPath() + '/';
		$('.showSuccess').remove();
	});
	window.clearInterval(successIntervalObj);
	successIntervalObj = window.setInterval(firstSuccessTooltip, 1000);
}
function firstSuccessTooltip() {
	if (initM < 0) {
		$('#last3').text('0');
		//window.location.href = getContextPath() + '/';
		clearInterval(successIntervalObj);
	//	$('.showSuccess').remove();
	} else {
		$('#last3').text(initM--);
	}
}
