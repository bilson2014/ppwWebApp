var  successIntervalObj; // timer变量，控制时间
$().ready(function() {
	$('.sexCheckItem').on('click', function() {
		$('.sexCheckItem').removeClass('selectItem');
		$(this).addClass('selectItem');
	});

	initUl();
	selfInfo();
	

});


function initUl(){
	$('.dropdown li').on('click',function(){
        $(this).parent().parent().find('.dropdown-toggle').find('span').text($(this).text());
        var info=parseInt($(this).attr('data-info'));
        $(this).parent().parent().find('.dropdown-toggle').find('span').attr("data-value",($(this).attr('data-value')));
        $(this).parent().slideUp();
        if($(this).hasClass('Province'))
        	Province($(this));
        return false;
   });
}

function selfInfo(){
	$('.self-info-content').slideDown('normal');
	$("#nickName").off("change").on("change",function(){
		validateNickName();
	})
	// 注册 个人资料-修改按钮点击事件
	$('#self-info-contentBt').unbind('click');
	$('#self-info-contentBt').bind('click',function(){
		validateNickName(function(){
			if($("#self-info-contentBt").attr("disabled")=='disabled'){
				return false;
			}
			if($('#nickName').val().trim() != ''){
				var ret = true;
				if($('#contact-email').val().trim() != ''){
					ret = checkEmail($('#contact-email').val().trim());
					if(!ret){
						showCommonError($('#contact-email-error'),"请输入正确的邮箱地址");
					}else{
						showCommonError($('#contact-email-error'),"");
					}
				}
				if(ret){
					loadData(function(flag){
						// 提示信息修改成功
						$('.tooltip-show').slideDown('normal');
						if(flag){
							$("#user-name").text($("#nickName").val());
							$(".header-name").text($("#trueName").val());
							successToolTipShow('信息修改成功!');
						}else{
							successErrorTipShow('信息修改失败，请刷新后再试!');
							alert('success');
						}
						window.setInterval(hideTooltip, 2000);
					}, getContextPath() + '/user/modify/info', $.toJSON({
						id : $('#user_unique').val(),
						userName : $('#nickName').val().trim(),
						sex : $('.selectItem').attr('data-content'),
						realName : $('#trueName').val().trim(),
						email : $('#contact-email').val().trim(),
						qq : $('#contact-qq').val().trim(),
						weChat : $('#contact-wechat').val().trim(),
						userCompany : $('#company').val().trim(),
						customerSource : $("#customerSource").text().trim()
					}))
				}
			}else{
				alert('error');
			}
		});
	});
}



function validateNickName(fun){
	loadData(function(flag){
		if(!flag){
			$("#self-info-contentBt").attr('disabled','disabled');
			showCommonError($('#nickName-error'),"昵称存在");
		}else{
			$("#self-info-contentBt").removeAttr('disabled');
			showCommonError($('.infoItem'),"");
			fun();
		}
	}, getContextPath() + '/user/unique/username', $.toJSON({
		id : $('#user_unique').val(),
		userName : $('#nickName').val().trim(),
	}))
}



function updateProvider(){}
//成功信息 提示框弹出方法
function successToolTipShow(msg){
	window.clearInterval(successIntervalObj);
	$(window.parent.document).find('.tooltip-success-show').slideDown();
	$(window.parent.document).find("#tooltip-success-messageSSSS").val(msg);
	successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
}
function hideSuccessTooltip(){
	$(window.parent.document).find('.tooltip-success-show').hide();
	location.reload();
}

function hideError(){
	$(window.parent.document).find('.tooltip-error-show').hide();
	location.reload();
}

// 成功信息 提示框弹出方法
function successErrorTipShow(msg){
	window.clearInterval(successIntervalObj);
	$(window.parent.document).find('.tooltip-error-show').slideDown();
	$(window.parent.document).find("#tooltip-success-messageEEEE").val(msg);
	successIntervalObj = window.setInterval(hideError(), 3000);
}
function showInfomation(title,body){
	$(window.parent.document).find('#infomation').slideDown();
	$(window.parent.document).find('#infomation_title').text(title);
	$(window.parent.document).find('#infomation_body').text(body);
	$(window.parent.document).find('#closeInfo').on('click',function(){
		hideInfomation();
	});
}
function hideInfomation(){
	$(window.parent.document).find('#infomation').hide();
}
