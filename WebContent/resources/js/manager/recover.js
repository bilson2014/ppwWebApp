var kaptcharInterValObj; // timer变量，控制时间
var InterValObj; // timer变量，控制时间 - 注册
var InterValRecoverObj; // timer变量，控制时间 - 密码找回
var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 - 注册
var recoverCount; // 当前剩余秒数 - 密码找回

$().ready(function(){
	// 图片验证码
	refreshValidateImage();
	// 点击获取短信验证码
	$('#verification_code_recover_btn').click(sendMsg);
	
	// 密码找回按钮
	$('#recoverBt').click(recover);
});

function refreshValidateImage(){
	
	// 初始化 验证码
	$('#kaptcha_pic_recover').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
	// 绑定  图片点击 事件
	$('#kaptcha_pic_recover').unbind('click');
	$('#kaptcha_pic_recover').bind('click',function(){
		$('#kaptcha_pic_recover').hide().attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
	});
}

function validate(){
	var phone = $('#recover_phone').val().trim();
	var password = $('#recover_password').val().trim();
	var vtcode = $('#verification_code_recover').val().trim();
	
	$('#recover_phoneId').addClass('hide');
	$('#recover_passwordId').addClass('hide');
	$('#verification_code_recoverId').addClass('hide');
	
	if(phone == null || phone == '' || phone == undefined){
	$('#recover_phoneId').text('请输入注册手机号码');
	$('#recover_phoneId').removeClass('hide');
	$('#recover_phone').focus();
	return false;
   }

if(password == null || password == '' || password == undefined){
	$('#recover_passwordId').text('请输入密码');
	$('#recover_passwordId').removeClass('hide');
	$('#recover_password').focus();
	return false;
}

if(vtcode == null || vtcode == '' || vtcode == undefined){
	$('#verification_code_recoverId').text('请输入短信验证码');
	$('#verification_code_recoverId').removeClass('hide');
	$('#verification_code_recover').focus();
	return false;
}

// 验证码密码
if(password.length < 6){
	$('#recover_passwordId').text('密码不能少于6位');
	$('#recover_passwordId').removeClass('hide');
	return false;
}

// 验证手机号码
if(!checkMobile(phone)){
	$('#recover_phoneId').text('请输入格式正确的手机号码');
	$('#recover_phoneId').removeClass('hide');
	return false;
}
	
//	if(phone == null || phone == '' || phone == undefined){
//		popshow('recover_phone','请输入注册手机号码');
//		$('#recover_phoneId').removeClass('hide');
//		$('#recover_phone').focus();
//		return false;
//	}
//	
//	if(password == null || password == '' || password == undefined){
//		popshow('recover_password','请输入不少于6位的密码');
//		$('#recover_password').focus();
//		return false;
//	}
//	
//	if(vtcode == null || vtcode == '' || vtcode == undefined){
//		popshow('verification_code_recover','请输入短信验证码');
//		$('#verification_code_recover').focus();
//		return false;
//	}
//	
//	// 验证码密码
//	if(password.length < 6){
//		popshow('recover_password','密码不能少于6位');
//		return false;
//	}
//	
//	// 验证手机号码
//	if(!checkMobile(phone)){
//		popshow('recover_phone','请输入格式正确的手机号码');
//		return false;
//	}
	return true;
}

//初始化弹出框
function popshow(id,content){
	window.clearInterval(kaptcharInterValObj); // 停止计时器
	$('#' + id).popover({
		placement : 'bottom',
		content : content,
		trigger : 'manual',
		delay: { show: 200, hide: 100 }
	}).popover('show');
	
	kaptcharInterValObj = window.setInterval(function(){
		$('#' + id).popover('hide');
	}, 2000);
}

function sendMsg(){

	var telephone = $('#recover_phone').val().trim();
	if(telephone != '' && telephone != null && telephone != undefined){
		if(checkMobile(telephone)){
			// 检验是否存在
			loadData(function(flag){
				if(flag){ // 该电话已经注册
					recoverCount = count;
					var kaptchaCode = $('#kaptcha_code_recover').val().trim();
					if(kaptchaCode != null && kaptchaCode != '' && kaptchaCode != undefined){
						// 判断 图片验证码 是否正确
						getData(function(info){
							if(!info.key){
								// 图片验证码 不一致 
								// 重置图片验证码
								$('#kaptcha_code_recover').val(''); // 重置 图片验证码 信息
								// 初始化 验证码
								$('#kaptcha_pic_recover').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
//								$('#kaptcha_code_recover').focus();
//								popshow('kaptcha_code_recover', info.value);
								$('#kaptcha_pic_recoverId').text(info.value);
								$('#kaptcha_pic_recoverId').removeClass('hide');
								$('#kaptcha_code_recover').focus();
							}else{
								// 验证通过,发送验证码
								loadData(function(flag){
									if(flag){
										// 发送成功
										// 设置 button 效果为禁用
										$('#verification_code_recover_btn').text('已发送('+ recoverCount +')');
										$('#verification_code_recover_btn').attr('disabled','disabled');
										InterValRecoverObj = window.setInterval(SetRemainTime_recover, 1000); // 启动计时器，1秒钟执行一次
										// 倒计时
									}else{
										// 发送不成功
										// 显示重新发送
										$('#verification_code_recover_btn').text('重新获取');
										$('#verification_code_recover_btn').removeAttr('disabled');
									}
								}, getContextPath() + '/login/verification/' + telephone, null);
							}
						}, getContextPath() + '/login/kaptcha/compare/' + kaptchaCode);
					}else{ // 图片验证码为空
						$('#kaptcha_code_recover').val('');// 重置图片验证码
						// 初始化 验证码
						$('#kaptcha_pic_recover').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
//						$('#kaptcha_code_recover').focus();
//						popshow('kaptcha_code_recover', '请输入验证码');
						$('#kaptcha_pic_recoverId').text('请输入验证码');
						$('#kaptcha_pic_recoverId').removeClass('hide');
						$('#kaptcha_code_recover').focus();
					}
				
				}else{
					// 该号码未注册，提醒用户先注册
					// 错误信息
//					$('.tooltip-message-recover').text('该手机号未注册');
//					$('.tooltip-show-recover').slideDown('normal');
//					window.setInterval(hideTooltipRecover, 4000);
					$('#recover_phoneId').text('该手机号未注册');
					$('#recover_phoneId').removeClass('hide');
					$('#recover_phone').focus();
				}
			}, getContextPath() + '/mgr/recover/check/' + telephone, null);
		}else{
		//	popshow('recover_phone', '请输入正确格式的手机号码');
			$('#recover_phoneId').text('请输入正确格式的手机号码');
			$('#recover_phoneId').removeClass('hide');
			$('#recover_phone').focus();
		}
	}else{
		//popshow('recover_phone', '请输入注册时使用的手机号码');
		$('#recover_phoneId').text('请输入注册时使用的手机号码');
		$('#recover_phoneId').removeClass('hide');
		$('#recover_phone').focus();
	}

}


/**
 * 密码找回
 */
function recover(){
	// 数据验证
	if(validate()){
		
		// 验证手机号码是否注册
		loadData(function(flag){
			if(flag){
				loadData(function(info){
					if(info.key){
						$('#recover-form').attr('action',getContextPath() + '/mgr/login').submit().remove();
					}else{
						// 错误信息
//						$('.tooltip-message-recover').text(info.value);
//						$('.tooltip-show-recover').slideDown('normal');
//						window.setInterval(hideTooltipRecover, 4000);
						$('#recover_phoneId').text(info.value);
						$('#recover_phoneId').removeClass('hide');
						$('#recover_phone').focus();
					}
				}, getContextPath() + '/mgr/recover/pwd', $.toJSON({
					phoneNumber : $('#recover_phone').val().trim(),
					employeePassword : Encrypt($('#recover_password').val().trim()),
					verification_code : $('#verification_code_recover').val().trim()
				}));
			}else{
				// 错误信息
//				$('.tooltip-message-recover').text('该手机号还未注册');
//				$('.tooltip-show-recover').slideDown('normal');
//				window.setInterval(hideTooltipRecover, 4000);
				$('#recover_phoneId').text('该手机号还未注册');
				$('#recover_phoneId').removeClass('hide');
				$('#recover_phone').focus();
				
			}
		}, getContextPath() + '/mgr/recover/check/' + $('#recover_phone').val().trim(), null);
	}
}

function hideTooltip(){
	$('.tooltip-show').hide('normal');
}

function hideTooltipRecover(){
	$('.tooltip-show-recover').hide('normal');
}


//timer 处理函数 - 密码重置
function SetRemainTime_recover(){
	if(recoverCount == 0){
		window.clearInterval(InterValRecoverObj); // 停止计时器
		$('#verification_code_recover_btn').text('重新获取');
		$('#verification_code_recover_btn').removeAttr('disabled')
		// 清除session code
		getData(function(data){
			// 清除session code
		}, getContextPath() + '/login/clear/code');
		
	}else{
		recoverCount--;  
		$("#verification_code_recover_btn").text('已发送('+ recoverCount +')');
	}
}
