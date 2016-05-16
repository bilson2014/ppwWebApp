var kaptcharInterValObj; // timer变量，控制时间
var InterValObj; // timer变量，控制时间 - 注册
var InterValRecoverObj; // timer变量，控制时间 - 密码找回
var count = 120; // 间隔函数，1秒执行 
var curCount; // 当前剩余秒数 - 注册
var recoverCount; // 当前剩余秒数 - 密码找回

var wb_uniqueId;
var qq_uniqueId;

$().ready(function(){
	var action = $('#action').val();
	
	// 登陆
	if(action == 'login'){ // 登陆
		$('.login-container').removeClass('hide');
		$('.register-container').addClass('hide');
		$('.recover-container').addClass('hide');
		$('.bind-container').addClass('hide');
		
		// 解绑 登陆 事件
		$('#registerBt').unbind('click');
		$('#recoverBt').unbind('click');
		$('#loginBt').unbind('click');
		$('#bindBt').unbind('click');
		
		// 绑定 注册 事件
		$('#loginBt').bind('click',login);
		$('#admin_password').keydown(function(e){
			if(e.keyCode == 13){
				$('#loginBt').click();
			}
		});
	}else if(action == 'register'){ // 注册
		$('.login-container').addClass('hide');
		$('.register-container').removeClass('hide');
		$('.recover-container').addClass('hide');
		$('.bind-container').addClass('hide');
		
		// 解绑 登陆 事件
		$('#loginBt').unbind('click');
		$('#recoverBt').unbind('click');
		$('#registerBt').unbind('click');
		$('#bindBt').unbind('click');
		
		// 绑定 注册 事件
		$('#registerBt').bind('click',register);
		
		// 初始化 验证码
		$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
		// 绑定  图片点击 事件
		$('#kaptcha_pic').unbind('click');
		$('#kaptcha_pic').bind('click',function(){
			$('#kaptcha_pic').hide().attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
		});
		
		// 注册 用户名 检验策略
		$('#user_name').on('change',function(){
			var userName = $('#user_name').val().trim();
			if(userName == '' || userName == null || userName == undefined){
				popshow('user_name','用户名不能为空!');
				$('#user_name').focus();
				return ;
			}
			
			if(checkUserName(userName)){
				
				loadData(function(flag){
					if(flag){
						$('#userGroup').removeClass('has-error');
						$('#userSpan').addClass('hide');
					}else{
						$('#userGroup').addClass('has-error');
						$('#userSpan').removeClass('hide');
					}
				}, getContextPath() + '/provider/checkExisting', $.toJSON({
					loginName : $('#user_name').val().trim()
				}));
			}else{
				popshow('user_name','请输入6-16位，以字母开头，带有数字和下划线的用户名');
				$('#user_name').focus();
			}
			
		});
		
		// 注册 手机号码 检验策略
		$('#user_phoneNumber').on('change',function(){
			var telephone = $('#user_phoneNumber').val().trim();
			if(telephone == '' || telephone == null || telephone == undefined){
				popshow('user_phoneNumber','请填写手机号码!');
				$('#user_phoneNumber').focus();
				return ;
			}
			
			if(checkMobile(telephone)){
				loadData(function(flag){
					if(flag){
						$('#phoneGroup').removeClass('has-error');
						$('#phoneSpan').addClass('hide');
					}else{
						$('#phoneGroup').addClass('has-error');
						$('#phoneSpan').removeClass('hide');
					}
				}, getContextPath() + '/provider/checkExisting', $.toJSON({
					phoneNumber : telephone
				}));
			}else{
				popshow('user_phoneNumber','请填写手机号码!');
				$('#user_phoneNumber').focus();
				return ;
			}
		});
		
		// 绑定验证码发送按钮
		$('#verification_code_btn').on('click',verification);
		
	}else if(action == 'recover'){ // 密码找回
		$('.recover-container').removeClass('hide');
		$('.login-container').addClass('hide');
		$('.register-container').addClass('hide');
		$('.bind-container').addClass('hide');
		
		// 解绑 登陆 事件
		$('#registerBt').unbind('click');
		$('#loginBt').unbind('click');
		$('#recoverBt').unbind('click');
		$('#bindBt').unbind('click');
		
		// 绑定 注册 事件
		$('#recoverBt').bind('click',recover);
		
		// 初始化 验证码
		$('#kaptcha_pic_recover').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
		// 绑定  图片点击 事件
		$('#kaptcha_pic_recover').unbind('click');
		$('#kaptcha_pic_recover').bind('click',function(){
			$('#kaptcha_pic_recover').hide().attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
		});
	}else if(action == 'bind') { // 账号绑定
		$('.bind-container').removeClass('hide');
		$('.recover-container').addClass('hide');
		$('.login-container').addClass('hide');
		$('.register-container').addClass('hide');
		
		// 解绑 登陆 事件
		$('#registerBt').unbind('click');
		$('#loginBt').unbind('click');
		$('#recoverBt').unbind('click');
		$('#bindBt').unbind('click');
		
		// 绑定 注册 事件
		$('#bindBt').bind('click',bind);
		
		// 初始化 验证码
		$('#kaptcha_pic_bind').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
		// 绑定  图片点击 事件
		$('#kaptcha_pic_bind').unbind('click');
		$('#kaptcha_pic_bind').bind('click',function(){
			$('#kaptcha_pic_bind').hide().attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100)).fadeIn();
		});
	}
	
	// 绑定验证码发送按钮
	$('#verification_code_recover_btn').on('click',verificationOnRecover);
	
	loginer.webcat(); // 微信登录
});

// 注册
function register(){
	
	if(validate('register')){
		// 检验用户名是否唯一
		loadData(function(flag){
			if(flag){
				$('#userGroup').removeClass('has-error');
				$('#userSpan').addClass('hide');
				
				// 检查 手机号是否可用
				loadData(function(flag){
					if(flag){
						// 注册
						loadData(function(info){
							if(info.key){
								//$('#register-form').attr('action',getContextPath() + '/provider/portal').submit().remove(); // 注册后跳转至供应商首页
								$('#register-form').attr('action',getContextPath() + '/provider/leader').submit().remove(); // 注册后跳转至供应商引导页
								$('#kaptchaGroup').removeClass('has-error');
								$('#kaptchaSpan').text('');
								$('#kaptchaSpan').addClass('hide');
							}else{
								$('#kaptchaGroup').addClass('has-error');
								$('#kaptchaSpan').text(info.value);
								$('#kaptchaSpan').removeClass('hide');
							}
							
						},  getContextPath() + '/provider/info/register', $.toJSON({
							loginName : $('#user_name').val().trim(),
							password : Encrypt($('#user_password').val().trim()),
							phoneNumber : $('#user_phoneNumber').val().trim(),
							verification_code : $('#verification_code').val().trim(),
							flag : 3
						}));
					}else{
						$('#phoneGroup').addClass('has-error');
						$('#phoneSpan').removeClass('hide');
						return ;
					}
				}, getContextPath() + '/provider/checkExisting', $.toJSON({
					phoneNumber : $('#user_phoneNumber').val().trim()
				}));
				
			}else{
				$('#userGroup').addClass('has-error');
				$('#userSpan').removeClass('hide');
				return ;
			}
		}, getContextPath() + '/provider/checkExisting', $.toJSON({
			loginName : $('#user_name').val().trim()
		}));
	}
}

// 登陆
function login(){
	if(validate('login')){
		loadData(function(info){
			if(info.key){
				$('#login-form').attr('action',getContextPath() + '/provider/portal').submit().remove();
				$('.tooltip-show').hide('normal');
				$('.tooltip-message').text('');
			}else{
				// 错误信息
				$('.tooltip-message').text(info.value);
				$('.tooltip-show').slideDown('normal');
				window.setInterval(hideTooltip, 4000);
			}
		}, getContextPath() + '/provider/doLogin', $.toJSON({
			loginName : $('#admin_name').val().trim(),
			password : Encrypt($('#admin_password').val().trim())
		}))
	}
}

/**
 * 密码找回
 */
function recover(){
	// 数据验证
	if(validate('recover')){
		
		// 验证手机号码是否注册
		loadData(function(flag){
			if(!flag){
				loadData(function(info){
					if(info.key){
						$('#recover-form').attr('action',getContextPath() + '/provider/login').submit().remove();
					}else{
						// 错误信息
						$('.tooltip-message-recover').text(info.value);
						$('.tooltip-show-recover').slideDown('normal');
						window.setInterval(hideTooltipRecover, 4000);
					}
				}, getContextPath() + '/provider/info/recover', $.toJSON({
					phoneNumber : $('#recover_phone').val().trim(),
					password : Encrypt($('#recover_password').val().trim()),
					verification_code : $('#verification_code_recover').val().trim()
				}));
			}else{
				// 错误信息
				$('.tooltip-message-recover').text('该手机号还未注册');
				$('.tooltip-show-recover').slideDown('normal');
				window.setInterval(hideTooltipRecover, 4000);
			}
		}, getContextPath() + '/provider/checkExisting', $.toJSON({
			phoneNumber : $('#recover_phone').val().trim()
		}));
	}
}

/**
 * 数据验证
 * @param type login/register
 * @returns {Boolean}
 */
function validate(type){
	if(type == 'login'){
		var loginName = $('#admin_name').val();
		var loginPassword = $('#admin_password').val();
		
		if(loginName == null || loginName == '' || loginName == undefined){
			popshow('admin_name','请输入用户名!');
			$('#admin_name').focus();
			return false;
		}
		
		if(loginPassword == null || loginPassword == '' || loginPassword == undefined){
			popshow('admin_password','请输入密码!');
			$('#admin_password').focus();
			return false;
		}
		return true;
	}
	if(type == 'register'){
		var userName = $('#user_name').val().trim();
		var password = $('#user_password').val().trim();
		var telephone = $('#user_phoneNumber').val().trim();
		var validationCode = $('#verification_code').val().trim();
	
		if(userName == null || userName == '' || userName == undefined){
			popshow('user_name','用户名需包含6-16位包含字母数字和下划线');
			$('#user_name').focus();
			return false;
		}
		
		if(password == null || password == '' || password == undefined){
			popshow('user_password','密码不能少于6位');
			$('#user_password').focus();
			return false;
		}
	
	
		if(telephone == null || telephone == '' || telephone == undefined){
			popshow('user_phoneNumber','请输入正确的手机号码');
			$('#user_phoneNumber').focus();
			return false;
		}
		
		if(validationCode == null || validationCode == '' || validationCode == undefined){
			
			popshow('verification_code','请输入短信验证码');
			$('#verification_code').focus();
			return false;
		}
		
		// 验证码用户名
		if(!checkUserName(userName)){
			popshow('user_name','请输入6-16位，以字母开头，带有数字和下划线的用户名');
			return false;
		}
		// 验证码密码
		if(password.length < 6){
			popshow('user_password','请输入不少于6位的密码');
			return false;
		}
		
		// 验证手机号码
		if(!checkMobile(telephone)){
			popshow('user_phoneNumber','请输入正确的手机号码');
			return false;
		}
		return true;
	}
	if(type = 'recover'){ // 重置密码
		var phone = $('#recover_phone').val().trim();
		var password = $('#recover_password').val().trim();
		var vtcode = $('#verification_code_recover').val().trim();
		
		if(phone == null || phone == '' || phone == undefined){
			popshow('recover_phone','请输入注册手机号码');
			$('#recover_phone').focus();
			return false;
		}
		
		if(password == null || password == '' || password == undefined){
			popshow('recover_password','请输入不少于6位的密码');
			$('#recover_password').focus();
			return false;
		}
		
		if(vtcode == null || vtcode == '' || vtcode == undefined){
			popshow('verification_code_recover','请输入短信验证码');
			$('#verification_code_recover').focus();
			return false;
		}
		
		// 验证码密码
		if(password.length < 6){
			popshow('recover_password','密码不能少于6位');
			return false;
		}
		
		// 验证手机号码
		if(!checkMobile(phone)){
			popshow('recover_phone','请输入格式正确的手机号码');
			return false;
		}
		return true;
	}
	
	if(type == 'bind'){
		var loginName = $('#bind_loginName').val();
		var loginPassword = $('#bind_password').val();
		
		if(loginName == null || loginName == '' || loginName == undefined){
			popshow('bind_loginName','请输入用户名!');
			$('#bind_loginName').focus();
			return false;
		}
		
		if(loginPassword == null || loginPassword == '' || loginPassword == undefined){
			popshow('bind_password','请输入密码!');
			$('#bind_password').focus();
			return false;
		}
		return true;
	}
}

// 初始化弹出框
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

// 点击 获取  按钮验证事件 - 注册
function verification(){
	var telephone = $('#user_phoneNumber').val().trim();
	if(telephone != '' && telephone != null && telephone != undefined){
		// 检验手机号是否注册
		loadData(function(flag){
			if(flag){
				// 未注册，则发送验证码
				$('#phoneGroup').removeClass('has-error');
				$('#phoneSpan').addClass('hide');
				
				curCount = count;
				var kaptchaCode = $('#kaptcha_code').val().trim();
				if(kaptchaCode != null && kaptchaCode != '' && kaptchaCode != undefined){
					// 判断 图片验证码 是否正确
					getData(function(info){
						if(!info.key){
							// 图片验证码 不一致 
							// 重置图片验证码
							$('#kaptcha_code').val(''); // 重置 图片验证码 信息
							// 初始化 验证码
							$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
							$('#kaptcha_code').focus();
							popshow('kaptcha_code', info.value)
						}else{
							// 验证通过,发送验证码
							loadData(function(flag){
								if(flag){
									// 发送成功
									// 设置 button 效果为禁用
									$('#verification_code_btn').text('已发送('+ curCount +')');
									$('#verification_code_btn').attr('disabled','disabled');
									InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒钟执行一次
									// 倒计时
								}else{
									// 发送不成功
									// 显示重新发送
									$('#verification_code_btn').text('重新获取');
									$('#verification_code_btn').removeAttr('disabled');
								}
							}, getContextPath() + '/login/verification/' + telephone, null);
						}
					}, getContextPath() + '/login/kaptcha/compare/' + kaptchaCode);
				}else{ // 图片验证码为空
					$('#kaptcha_code').val('');// 重置图片验证码
					// 初始化 验证码
					$('#kaptcha_pic').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
					$('#kaptcha_code').focus();
					alert('图片验证码为空!');
				}

			}else{
				// 已注册
				$('#phoneGroup').addClass('has-error');
				$('#phoneSpan').removeClass('hide');
			}
		}, getContextPath() + '/provider/checkExisting', $.toJSON({
			phoneNumber : telephone
		}));
	}else{
		// 手机号码为空
		popshow('user_phoneNumber', '请输入手机号码');
	}
}

//点击 获取  按钮验证事件 - 密码找回
function verificationOnRecover(){
	var telephone = $('#recover_phone').val().trim();
	if(telephone != '' && telephone != null && telephone != undefined){
		if(checkMobile(telephone)){
			// 检验是否存在
			loadData(function(flag){
				if(!flag){ // 该电话已经注册
					recoverCount = count;
					// TODO DD
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
								$('#kaptcha_code_recover').focus();
								popshow('kaptcha_code_recover', info.value);
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
						$('#kaptcha_code_recover').focus();
						popshow('kaptcha_code_recover', '请输入验证码');
					}
				
				}else{
					// 该号码未注册，提醒用户先注册
					// 错误信息
					$('.tooltip-message-recover').text('该手机号未注册');
					$('.tooltip-show-recover').slideDown('normal');
					window.setInterval(hideTooltipRecover, 4000);
				}
			}, getContextPath() + '/provider/checkExisting', $.toJSON({
				phoneNumber : telephone
			}));
		}else{
			popshow('recover_phone', '请输入正确格式的手机号码');
		}
	}else{
		popshow('recover_phone', '请输入注册时使用的手机号码');
	}
}

//timer 处理函数 - 注册
function SetRemainTime(){
	if(curCount == 0){
		window.clearInterval(InterValObj); // 停止计时器
		$('#verification_code_btn').text('重新获取');
		$('#verification_code_btn').removeAttr('disabled')
		// 清除session code
		getData(function(data){
			// 清除session code
		}, getContextPath() + '/login/clear/code');
		
	}else{
		curCount--;  
		$("#verification_code_btn").text('已发送('+ curCount +')');
	}
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

function hideTooltip(){
	$('.tooltip-show').hide('normal');
}

function hideTooltipRecover(){
	$('.tooltip-show-recover').hide('normal');
}

var loginer = {
	sina : function(){
		
	},
	webcat : function(){
		// open model
		$('#webcat').on('click',function(){
			
			var url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx513aa29222bef371&redirect_uri=http%3A%2F%2Fwww.apaipian.com%2Fprovider%2Flogin%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login';
			window.open (url,'_self','height=560,width=400,top=60,left=450,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
		})
	},
	qq : function(){
		
	}
}

/**
 * 账号绑定
 */
function bind(){
	// 数据校验
	if(validate('bind')){
		var kaptchaCode = $('#kaptcha_pic_bind').val().trim();
		if(kaptchaCode != null && kaptchaCode != '' && kaptchaCode != undefined){
			// 校验验证码
			getData(function(info){
				if(!info.key){
					// 图片验证码 不一致 
					// 重置图片验证码
					$('#kaptcha_pic_bind').val(''); // 重置 图片验证码 信息
					// 初始化 验证码
					$('#kaptcha_pic_bind').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
					$('#kaptcha_pic_bind').focus();
					popshow('kaptcha_pic_bind', info.value);
				}else{
					// 绑定账号
					loadData(function(result){
						if(result){
							//TODO 绑定成功，进入供应商系统
						}else {
							//TODO 绑定失败，提示用户
						}
					}, getContextPath() + '/provider/bind', $.toJSON({
						loginName : $('#bind_loginName').val().trim(),
						password : $('#bind_password').val(),
						uniqueId : $('#uniqueId').val(),
						thirdLoginType : $('#thirdLoginType').val()
					}));
				}
			}, getContextPath() + '/login/kaptcha/compare/' + kaptchaCode);
		} else {	// 图片验证码为空
			$('#kaptcha_pic_bind').val('');// 重置图片验证码
			// 初始化 验证码
			$('#kaptcha_pic_bind').attr('src',getContextPath() + '/login/kaptcha.png?' + Math.floor(Math.random()*100));
			$('#kaptcha_pic_bind').focus();
			popshow('kaptcha_pic_bind', '请输入验证码');
		}
	}
}